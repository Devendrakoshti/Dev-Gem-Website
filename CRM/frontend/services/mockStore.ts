
import { Client, User, UserRole, ClientStatus, ClientStage, FollowUp, Note, ActivityLog, BackupHistory, BillingItem, PaymentReceived } from '../types';
import { MOCK_CLIENTS, MOCK_USERS, MOCK_FOLLOWUPS, MOCK_NOTES, MOCK_ACTIVITY, MOCK_BACKUPS } from './mockData';

const STORAGE_KEY = 'nexus_crm_master_store_v3';

interface StoreData {
  clients: Client[];
  users: User[];
  followups: FollowUp[];
  notes: Note[];
  activity: ActivityLog[];
  backups: BackupHistory[];
  billingItems: BillingItem[];
  paymentsReceived: PaymentReceived[];
}

type Listener = () => void;

class MockStore {
  private state: StoreData = {
    clients: [],
    users: [],
    followups: [],
    notes: [],
    activity: [],
    backups: [],
    billingItems: [],
    paymentsReceived: []
  };
  
  // Enterprise Hardening: Indexed Maps for O(1) Lookups
  private userIndex: Map<string, User> = new Map();
  private clientIndex: Map<string, Client> = new Map();
  
  private listeners: Set<Listener> = new Set();

  constructor() {
    this.init();
  }

  private init() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        this.state = {
          ...this.state,
          ...parsed,
          billingItems: parsed.billingItems || [],
          paymentsReceived: parsed.paymentsReceived || []
        };
      } catch (e) {
        console.error("Storage corruption detected. Resetting to initial state.");
        this.loadInitialData();
      }
    } else {
      this.loadInitialData();
    }
    this.rebuildIndexes();
  }

  private loadInitialData() {
    const clientsWithOwnership = MOCK_CLIENTS.map(c => ({
      ...c,
      createdByEmployeeId: c.assignedToId,
      assignedToId: c.assignedToId,
      assignedToName: c.assignedToName
    }));

    this.state = {
      clients: clientsWithOwnership,
      users: MOCK_USERS,
      followups: MOCK_FOLLOWUPS,
      notes: MOCK_NOTES,
      activity: MOCK_ACTIVITY,
      backups: MOCK_BACKUPS,
      billingItems: [],
      paymentsReceived: []
    };
    this.persist();
  }

  private rebuildIndexes() {
    this.userIndex.clear();
    this.state.users.forEach(u => this.userIndex.set(u.id, u));
    
    this.clientIndex.clear();
    this.state.clients.forEach(c => this.clientIndex.set(c.id, c));
  }

  private persist() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    this.rebuildIndexes();
    this.notify();
  }

  private notify() {
    this.listeners.forEach(l => l());
  }

  subscribe(listener: Listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  // --- Search & Performance Helpers ---
  isDuplicateClient(email: string, mobile: string, excludeId?: string) {
    const clients = this.state.clients.filter(c => !c.isDeleted && c.id !== excludeId);
    const emailMatch = clients.find(c => c.email.toLowerCase() === email.toLowerCase());
    if (emailMatch) return { type: 'Email Address' };
    const mobileMatch = clients.find(c => c.mobile === mobile);
    if (mobileMatch) return { type: 'Mobile Number' };
    return undefined;
  }

  logActivity(actor: { id: string, name: string }, action: string, targetId: string, targetType: ActivityLog['targetType'], metadata?: any) {
    const log: ActivityLog = {
      id: `a${Date.now()}`,
      actorId: actor.id,
      actorName: actor.name,
      action,
      targetId,
      targetType,
      timestamp: new Date().toISOString(),
      metadata
    };
    this.state.activity.unshift(log);
    this.persist();
  }

  canUserAccessClient(user: User, client: Client): boolean {
    if (user.role === UserRole.ADMIN) return true;
    return client.assignedToId === user.id;
  }

  // --- Data Access Selectors ---
  getClients(user: User) { 
    if (user.role === UserRole.ADMIN) return [...this.state.clients];
    return this.state.clients.filter(c => c.assignedToId === user.id);
  }
  
  getActiveClients(user: User) { 
    return this.getClients(user).filter(c => !c.isDeleted && !c.isArchived); 
  }

  getArchivedClients(user: User) { 
    return this.getClients(user).filter(c => !c.isDeleted && c.isArchived); 
  }
  
  getDeletedClients(user: User) { 
    return this.getClients(user).filter(c => c.isDeleted); 
  }
  
  getClientById(id: string, user?: User) { 
    const client = this.clientIndex.get(id);
    if (user && client && !this.canUserAccessClient(user, client)) return undefined;
    return client;
  }
  
  // --- Mutations ---
  addClient(client: Omit<Client, 'id' | 'createdAt' | 'createdByEmployeeId'>, actor: { id: string, name: string }) {
    const newClient: Client = { 
      ...client, 
      id: `c${Date.now()}`, 
      createdAt: new Date().toISOString(), 
      createdByEmployeeId: actor.id,
      isDeleted: false, 
      isArchived: false 
    };
    this.state.clients.unshift(newClient);
    this.logActivity(actor, `Created client: ${newClient.name}`, newClient.id, 'CLIENT');
    this.persist();
    return newClient;
  }

  updateClient(id: string, updates: Partial<Client>, actor: { id: string, name: string }) {
    this.state.clients = this.state.clients.map(c => c.id === id ? { ...c, ...updates } : c);
    this.logActivity(actor, `Updated client record: ${id}`, id, 'CLIENT');
    this.persist();
  }

  transferClient(clientId: string, toEmployeeId: string, actor: User) {
    const client = this.getClientById(clientId, actor);
    const targetEmployee = this.getUserById(toEmployeeId);
    if (!client || !targetEmployee) throw new Error("Invalid transfer parameters.");
    
    if (actor.role !== UserRole.ADMIN && client.assignedToId !== actor.id) {
      throw new Error("Permission Denied: Unauthorized transfer attempt.");
    }
    
    const fromId = client.assignedToId;
    const fromName = client.assignedToName;
    
    this.state.clients = this.state.clients.map(c => 
      c.id === clientId ? { ...c, assignedToId: toEmployeeId, assignedToName: targetEmployee.name } : c
    );
    
    this.logActivity(actor, `Transferred client [${client.name}] to ${targetEmployee.name}`, clientId, 'CLIENT_TRANSFER', { fromId, toId: toEmployeeId, fromName, toName: targetEmployee.name });
    this.persist();
  }

  archiveClient(id: string, actor: User) {
    const client = this.getClientById(id, actor);
    if (!client) return;
    this.state.clients = this.state.clients.map(c => c.id === id ? { ...c, isArchived: true, isDeleted: false } : c);
    this.logActivity(actor, `Archived client: ${client.name}`, id, 'CLIENT');
    this.persist();
  }

  deleteClientToTrash(id: string, actor: User) {
    const client = this.getClientById(id, actor);
    if (!client) return;
    this.state.clients = this.state.clients.map(c => c.id === id ? { ...c, isDeleted: true } : c);
    this.logActivity(actor, `Moved to Trash: ${client.name}`, id, 'CLIENT');
    this.persist();
  }

  // Added restoreClient method to recover from trash
  restoreClient(id: string, actor: User) {
    const client = this.getClientById(id);
    if (!client) return;
    this.state.clients = this.state.clients.map(c => c.id === id ? { ...c, isDeleted: false } : c);
    this.logActivity(actor, `Restored from Trash: ${client.name}`, id, 'CLIENT');
    this.persist();
  }

  // Added permanentlyDeleteClient method to purge from system
  permanentlyDeleteClient(id: string, actor: User) {
    const client = this.getClientById(id);
    this.state.clients = this.state.clients.filter(c => c.id !== id);
    this.logActivity(actor, `Permanently Deleted: ${client?.name || id}`, id, 'CLIENT');
    this.persist();
  }

  // --- Ledger / Payments ---
  getBillingByClientId(clientId: string, user: User) {
    const client = this.getClientById(clientId, user);
    if (!client) return [];
    return (this.state.billingItems || []).filter(b => b.clientId === clientId);
  }

  getPaymentsByClientId(clientId: string, user: User) {
    const client = this.getClientById(clientId, user);
    if (!client) return [];
    return (this.state.paymentsReceived || []).filter(p => p.clientId === clientId);
  }

  getClientPaymentSummary(clientId: string, user: User) {
    const billing = this.getBillingByClientId(clientId, user);
    const payments = this.getPaymentsByClientId(clientId, user);
    const totalBilled = billing.reduce((sum, item) => sum + item.amountToCollect, 0);
    const totalPaid = payments.reduce((sum, item) => sum + item.amountReceived, 0);
    return {
      totalBilled,
      totalPaid,
      balance: totalBilled - totalPaid
    };
  }

  getPendingPaymentsForUser(user: User) {
    const clients = this.state.clients.filter(c => !c.isDeleted && (user.role === UserRole.ADMIN || c.assignedToId === user.id));
    
    return clients.map(client => {
      const summary = this.getClientPaymentSummary(client.id, user);
      const payments = this.getPaymentsByClientId(client.id, user);
      const lastPayment = payments.length > 0 
        ? payments.sort((a, b) => new Date(b.receivedDate).getTime() - new Date(a.receivedDate).getTime())[0].receivedDate 
        : null;

      return {
        client,
        ...summary,
        lastPaymentDate: lastPayment
      };
    }).filter(item => item.balance > 0);
  }

  addBillingItem(payload: Omit<BillingItem, 'id' | 'createdAt'>, actor: { id: string, name: string }) {
    const newItem: BillingItem = { ...payload, id: `bill_${Date.now()}`, createdAt: new Date().toISOString() };
    if (!this.state.billingItems) this.state.billingItems = [];
    this.state.billingItems.unshift(newItem);
    this.logActivity(actor, `Added billing: ${payload.serviceName}`, newItem.id, 'PAYMENT');
    this.persist();
    return newItem;
  }

  // Added updateBillingItem method
  updateBillingItem(id: string, updates: Partial<BillingItem>, actor: { id: string, name: string }) {
    this.state.billingItems = (this.state.billingItems || []).map(item => item.id === id ? { ...item, ...updates } : item);
    this.logActivity(actor, `Updated billing item: ${id}`, id, 'PAYMENT');
    this.persist();
  }

  // Added deleteBillingItem method
  deleteBillingItem(id: string, actor: { id: string, name: string }) {
    this.state.billingItems = (this.state.billingItems || []).filter(item => item.id !== id);
    this.logActivity(actor, `Deleted billing item: ${id}`, id, 'PAYMENT');
    this.persist();
  }

  addPaymentReceived(payload: Omit<PaymentReceived, 'id' | 'createdAt'>, actor: { id: string, name: string }) {
    const newItem: PaymentReceived = { ...payload, id: `pay_${Date.now()}`, createdAt: new Date().toISOString() };
    if (!this.state.paymentsReceived) this.state.paymentsReceived = [];
    this.state.paymentsReceived.unshift(newItem);
    this.logActivity(actor, `Payment logged: ₹${payload.amountReceived}`, newItem.id, 'PAYMENT');
    this.persist();
    return newItem;
  }

  // Added updatePaymentReceived method
  updatePaymentReceived(id: string, updates: Partial<PaymentReceived>, actor: { id: string, name: string }) {
    this.state.paymentsReceived = (this.state.paymentsReceived || []).map(item => item.id === id ? { ...item, ...updates } : item);
    this.logActivity(actor, `Updated payment record: ${id}`, id, 'PAYMENT');
    this.persist();
  }

  // Added deletePaymentReceived method
  deletePaymentReceived(id: string, actor: { id: string, name: string }) {
    this.state.paymentsReceived = (this.state.paymentsReceived || []).filter(item => item.id !== id);
    this.logActivity(actor, `Deleted payment record: ${id}`, id, 'PAYMENT');
    this.persist();
  }

  // --- User Management ---
  getActiveEmployees() { 
    return this.state.users.filter(u => !u.isDeleted && u.role === UserRole.EMPLOYEE); 
  }

  // Added getDeletedEmployees for trash management
  getDeletedEmployees() {
    return this.state.users.filter(u => u.isDeleted && u.role === UserRole.EMPLOYEE);
  }

  getActiveAdmins() {
    return this.state.users.filter(u => !u.isDeleted && u.role === UserRole.ADMIN);
  }

  getUsers() { return [...this.state.users]; }
  getEmployees() { return this.getActiveEmployees(); }
  getUserById(id: string) { return this.userIndex.get(id); }

  addUser(user: Omit<User, 'id' | 'name'>, actor: { id: string, name: string }) {
    if (this.state.users.some(u => u.employeeId === user.employeeId)) {
      throw new Error(`Employee ID ${user.employeeId} is already assigned.`);
    }
    const newUser: User = { 
      ...user, 
      id: `u${Date.now()}`, 
      name: `${user.firstName} ${user.lastName}`,
      isDeleted: false
    };
    this.state.users.push(newUser);
    this.logActivity(actor, `User provisioned: ${newUser.name}`, newUser.id, 'EMPLOYEE');
    this.persist();
    return newUser;
  }

  updateUser(id: string, updates: Partial<User>, actor: { id: string, name: string }) {
    this.state.users = this.state.users.map(u => u.id === id ? { ...u, ...updates } : u);
    this.logActivity(actor, `User profile updated: ${id}`, id, 'EMPLOYEE');
    this.persist();
  }

  softDeleteUser(id: string, actor: { id: string, name: string }) {
    this.state.users = this.state.users.map(u => u.id === id ? { ...u, isDeleted: true } : u);
    const user = this.getUserById(id);
    this.logActivity(actor, `User account suspended: ${user?.name || id}`, id, 'EMPLOYEE');
    this.persist();
  }

  // Added restoreUser to recover employee/admin access
  restoreUser(id: string, actor: { id: string, name: string }) {
    this.state.users = this.state.users.map(u => u.id === id ? { ...u, isDeleted: false } : u);
    const user = this.getUserById(id);
    this.logActivity(actor, `User access restored: ${user?.name || id}`, id, 'EMPLOYEE');
    this.persist();
  }

  // Added permanentlyDeleteUser to purge account from system
  permanentlyDeleteUser(id: string, actor: { id: string, name: string }) {
    this.state.users = this.state.users.filter(u => u.id !== id);
    this.logActivity(actor, `User account purged: ${id}`, id, 'EMPLOYEE');
    this.persist();
  }

  // --- Follow Ups & Notes ---
  getFollowUps() { return [...this.state.followups]; }
  
  getFollowUpsByClientId(clientId: string, user: User) {
    const client = this.getClientById(clientId, user);
    if (!client) return [];
    return this.state.followups.filter(f => f.clientId === clientId);
  }
  
  getNotesByClientId(clientId: string, user: User) {
    const client = this.getClientById(clientId, user);
    if (!client) return [];
    return this.state.notes.filter(n => n.clientId === clientId);
  }

  addFollowUp(followup: Omit<FollowUp, 'id'>, actor: { id: string, name: string }) {
    const newFu: FollowUp = { ...followup, id: `f${Date.now()}` };
    this.state.followups.unshift(newFu);
    this.logActivity(actor, `Logged interaction for client ${followup.clientId}`, newFu.id, 'FOLLOWUP');
    this.persist();
  }

  addNote(note: Omit<Note, 'id' | 'createdAt'>, actor: { id: string, name: string }) {
    const newNote: Note = { ...note, id: `n${Date.now()}`, createdAt: new Date().toISOString() };
    this.state.notes.unshift(newNote);
    this.persist();
  }

  getActivity(user: User) { 
    if (user.role === UserRole.ADMIN) return [...this.state.activity];
    return this.state.activity.filter(a => a.actorId === user.id);
  }

  getTransferHistory(user: User) {
    const transfers = this.state.activity.filter(a => a.targetType === 'CLIENT_TRANSFER');
    if (user.role === UserRole.ADMIN) return transfers;
    return transfers.filter(a => a.metadata?.fromId === user.id || a.metadata?.toId === user.id);
  }

  getBackups() { return [...this.state.backups]; }

  createBackup(createdBy: string, actor: { id: string, name: string }) {
    const snapshot = {
      clients: this.state.clients,
      users: this.state.users,
      followups: this.state.followups,
      notes: this.state.notes,
      activity: this.state.activity,
      billingItems: this.state.billingItems,
      paymentsReceived: this.state.paymentsReceived
    };
    const backupData = JSON.stringify(snapshot);

    const newBackup: BackupHistory = {
      id: `b${Date.now()}`,
      filename: `nexus_backup_${new Date().toISOString().replace(/[:.]/g, '-')}.json`,
      createdAt: new Date().toISOString(),
      size: `${(backupData.length / 1024).toFixed(2)} KB`,
      createdBy,
      data: backupData
    };

    this.state.backups.unshift(newBackup);
    this.logActivity(actor, `System backup generated: ${newBackup.filename}`, newBackup.id, 'BACKUP');
    this.persist();
    return newBackup;
  }

  deleteBackup(id: string, actor: { id: string, name: string }) {
    this.state.backups = this.state.backups.filter(b => b.id !== id);
    this.logActivity(actor, `Backup snapshot purged: ${id}`, id, 'BACKUP');
    this.persist();
  }

  restoreFromJSON(jsonString: string, actor: { id: string, name: string }) {
    try {
      const data = JSON.parse(jsonString);
      this.state = { ...this.state, ...data };
      this.logActivity(actor, `System restored from external backup`, 'SYSTEM', 'SYSTEM');
      this.persist();
    } catch (e) {
      throw new Error("Failed to restore: Invalid backup file format.");
    }
  }
}

export const mockStore = new MockStore();
