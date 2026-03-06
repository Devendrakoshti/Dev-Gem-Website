
import { 
  Client, User, FollowUp, Note, ActivityLog, BackupHistory, BillingItem, PaymentReceived, UserRole, UserStatus 
} from '../types';
import { MOCK_CLIENTS, MOCK_USERS, MOCK_FOLLOWUPS, MOCK_NOTES, MOCK_ACTIVITY } from './mockData';
import { CRM_STORAGE_KEY, CRM_SCHEMA_VERSION } from '../config/appConfig';

/**
 * Encrypts a password using a simple base64 scheme for mock purposes.
 */
export const hashPassword = (password: string): string => {
  return `nexus_v1_${btoa(password)}`;
};

interface StoreData {
  version: string;
  users: User[];
  clients: Client[];
  followups: FollowUp[];
  notes: Note[];
  activity: ActivityLog[];
  backups: BackupHistory[];
  billingItems: BillingItem[];
  paymentsReceived: PaymentReceived[];
}

type Listener = () => void;

class MockStore {
  private state: StoreData = this.getDefaultState();
  private listeners: Set<Listener> = new Set();
  private persistTimeout: number | null = null;
  private isInitialLoad: boolean = true;

  constructor() {
    this.init();
    window.addEventListener('storage', (e) => {
      if (e.key === CRM_STORAGE_KEY) {
        this.init();
      }
    });
  }

  private init() {
    const saved = localStorage.getItem(CRM_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        this.state = {
          ...this.getDefaultState(),
          ...parsed,
          users: Array.isArray(parsed.users) ? parsed.users : MOCK_USERS,
          clients: Array.isArray(parsed.clients) ? parsed.clients : MOCK_CLIENTS,
          followups: Array.isArray(parsed.followups) ? parsed.followups : MOCK_FOLLOWUPS,
          notes: Array.isArray(parsed.notes) ? parsed.notes : MOCK_NOTES,
          activity: Array.isArray(parsed.activity) ? parsed.activity : MOCK_ACTIVITY,
          billingItems: Array.isArray(parsed.billingItems) ? parsed.billingItems : [],
          paymentsReceived: Array.isArray(parsed.paymentsReceived) ? parsed.paymentsReceived : [],
          backups: Array.isArray(parsed.backups) ? parsed.backups : []
        };
        if (this.isInitialLoad) {
          console.log('%c🚀 Nexus Engine: Quantum Persistence Loaded.', 'color: #6366f1; font-weight: bold;');
          this.isInitialLoad = false;
        }
      } catch (e) {
        this.resetToDefault();
      }
    } else {
      this.resetToDefault();
    }
    this.notify();
  }

  private getDefaultState(): StoreData {
    return {
      version: CRM_SCHEMA_VERSION,
      users: MOCK_USERS,
      clients: MOCK_CLIENTS,
      followups: MOCK_FOLLOWUPS,
      notes: MOCK_NOTES,
      activity: MOCK_ACTIVITY,
      backups: [],
      billingItems: [],
      paymentsReceived: []
    };
  }

  private resetToDefault() {
    this.state = this.getDefaultState();
    this.persistImmediate();
  }

  private persist() {
    if (this.persistTimeout) return;
    this.persistTimeout = window.setTimeout(() => {
      this.persistImmediate();
      this.persistTimeout = null;
    }, 1500);
  }

  private persistImmediate() {
    try {
      if (this.state.activity.length > 2000) {
        this.state.activity = this.state.activity.slice(0, 2000);
      }
      localStorage.setItem(CRM_STORAGE_KEY, JSON.stringify(this.state));
      this.notify();
    } catch (e) {
      console.error('CRITICAL: Storage limit reached.', e);
    }
  }

  private notify() {
    this.listeners.forEach(l => l());
  }

  subscribe(listener: Listener) {
    this.listeners.add(listener);
    return () => { this.listeners.delete(listener); };
  }

  getCollection<T extends keyof StoreData>(key: T): StoreData[T] {
    return this.state[key] || ([] as any);
  }

  setCollection<T extends keyof StoreData>(key: T, data: StoreData[T]): void {
    this.state[key] = data;
    this.persist();
  }

  private logActivity(actor: User, action: string, targetId: string, targetType: ActivityLog['targetType'], metadata?: any) {
    const newLog: ActivityLog = {
      id: Math.random().toString(36).substr(2, 9),
      actorId: actor.id,
      actorName: actor.name,
      action,
      targetId,
      targetType,
      timestamp: new Date().toISOString(),
      metadata
    };
    this.state.activity = [newLog, ...this.state.activity];
  }

  // --- Search Optimized Accessor ---
  searchClients(user: User, query: string, stage: string, archived: boolean): Client[] {
    const base = archived ? this.getArchivedClients(user) : this.getActiveClients(user);
    const q = query.toLowerCase();
    
    return base.filter(c => {
      if (stage !== 'ALL' && c.stage !== stage) return false;
      if (!q) return true;
      return (
        c.name.toLowerCase().includes(q) || 
        c.mobile.includes(q) || 
        c.companyName.toLowerCase().includes(q)
      );
    });
  }

  // User Methods
  getUserById(id: string): User | undefined {
    return this.state.users.find(u => u.id === id);
  }
  getEmployees(): User[] {
    return this.state.users.filter(u => (u.role === UserRole.EMPLOYEE || u.role === UserRole.ADMIN) && !u.isDeleted);
  }
  getActiveEmployees(): User[] { return this.getEmployees(); }
  getDeletedEmployees(): User[] { return this.state.users.filter(u => u.isDeleted); }

  addUser(data: any, actor: User) {
    const newUser: User = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      name: `${data.firstName} ${data.lastName}`,
      password: hashPassword(data.password || 'password123'),
      isDeleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: actor.id
    };
    this.state.users.push(newUser);
    this.logActivity(actor, `Registered New Staff: ${newUser.name}`, newUser.id, 'EMPLOYEE');
    this.persist();
  }

  updateUser(id: string, updates: any, actor: User) {
    const index = this.state.users.findIndex(u => u.id === id);
    if (index !== -1) {
      const oldUser = this.state.users[index];
      this.state.users[index] = { ...oldUser, ...updates, updatedAt: new Date().toISOString() };
      this.logActivity(actor, `Updated Staff: ${this.state.users[index].name}`, id, 'EMPLOYEE');
      this.persist();
    }
  }

  softDeleteUser(id: string, actor: User) {
    const user = this.getUserById(id);
    if (user) {
      user.isDeleted = true;
      user.status = UserStatus.SUSPENDED;
      this.logActivity(actor, `Deactivated: ${user.name}`, id, 'EMPLOYEE');
      this.persist();
    }
  }

  restoreUser(id: string, actor: User) {
    const user = this.state.users.find(u => u.id === id);
    if (user) {
      user.isDeleted = false;
      user.status = UserStatus.ACTIVE;
      this.logActivity(actor, `Restored Access: ${user.name}`, id, 'EMPLOYEE');
      this.persist();
    }
  }

  permanentlyDeleteUser(id: string, actor: User) {
    this.state.users = this.state.users.filter(u => u.id !== id);
    this.persist();
  }

  // Client Methods
  canUserAccessClient(user: User, client: Client): boolean {
    if (user.role === UserRole.ADMIN) return true;
    return client.assignedToId === user.id;
  }
  getClients(user: User): Client[] {
    return this.state.clients.filter(c => this.canUserAccessClient(user, c) && !c.isDeleted);
  }
  getActiveClients(user: User): Client[] { return this.getClients(user).filter(c => !c.isArchived); }
  getArchivedClients(user: User): Client[] { return this.getClients(user).filter(c => c.isArchived); }
  getDeletedClients(user: User): Client[] {
    return this.state.clients.filter(c => c.isDeleted && (user.role === UserRole.ADMIN || c.assignedToId === user.id));
  }
  getClientById(id: string, user?: User): Client | undefined {
    const client = this.state.clients.find(c => c.id === id);
    if (client && user && !this.canUserAccessClient(user, client)) return undefined;
    return client;
  }
  isDuplicateClient(email: string, mobile: string, excludeId?: string): { type: string } | null {
    const clients = this.state.clients.filter(c => !c.isDeleted && c.id !== excludeId);
    if (clients.some(c => c.email === email)) return { type: 'Email' };
    if (clients.some(c => c.mobile === mobile)) return { type: 'Mobile' };
    return null;
  }

  addClient(data: any, actor: User) {
    const newClient: Client = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      createdByEmployeeId: actor.id,
      isArchived: false,
      isDeleted: false,
      createdAt: new Date().toISOString()
    };
    this.state.clients.push(newClient);
    this.logActivity(actor, `Onboarded: ${newClient.name}`, newClient.id, 'CLIENT');
    this.persist();
  }

  updateClient(id: string, updates: any, actor: User) {
    const index = this.state.clients.findIndex(c => c.id === id);
    if (index !== -1) {
      this.state.clients[index] = { ...this.state.clients[index], ...updates };
      this.persist();
    }
  }

  archiveClient(id: string, actor: User) {
    const client = this.getClientById(id);
    if (client) { client.isArchived = true; this.persist(); }
  }

  deleteClientToTrash(id: string, actor: User) {
    const client = this.getClientById(id);
    if (client) { client.isDeleted = true; this.persist(); }
  }

  restoreClient(id: string, actor: User) {
    const client = this.state.clients.find(c => c.id === id);
    if (client) { client.isDeleted = false; this.persist(); }
  }

  permanentlyDeleteClient(id: string, actor: User) {
    this.state.clients = this.state.clients.filter(c => c.id !== id);
    this.state.billingItems = this.state.billingItems.filter(b => b.clientId !== id);
    this.state.paymentsReceived = this.state.paymentsReceived.filter(p => p.clientId !== id);
    this.state.followups = this.state.followups.filter(f => f.clientId !== id);
    this.state.notes = this.state.notes.filter(n => n.clientId !== id);
    this.persist();
  }

  transferClient(clientId: string, targetId: string, actor: User) {
    const client = this.getClientById(clientId);
    const target = this.getUserById(targetId);
    if (client && target) {
      const oldName = client.assignedToName;
      client.assignedToId = target.id;
      client.assignedToName = target.name;
      this.logActivity(actor, `Transferred ${client.name} from ${oldName} to ${target.name}`, clientId, 'CLIENT_TRANSFER', {
        fromId: actor.id, fromName: oldName, toId: target.id, toName: target.name
      });
      this.persist();
    }
  }

  // Financial Methods
  getBillingByClientId(clientId: string, user: User): BillingItem[] {
    return (this.state.billingItems || []).filter(b => b.clientId === clientId).sort((a, b) => b.billingDate.localeCompare(a.billingDate));
  }
  addBillingItem(data: any, actor: User) {
    const newItem = { ...data, id: Math.random().toString(36).substr(2, 9), createdAt: new Date().toISOString() };
    this.state.billingItems.push(newItem);
    this.persist();
  }
  updateBillingItem(id: string, updates: any, actor: User) {
    const idx = this.state.billingItems.findIndex(b => b.id === id);
    if (idx !== -1) { this.state.billingItems[idx] = { ...this.state.billingItems[idx], ...updates }; this.persist(); }
  }
  deleteBillingItem(id: string, actor: User) {
    this.state.billingItems = this.state.billingItems.filter(b => b.id !== id);
    this.persist();
  }

  getPaymentsByClientId(clientId: string, user: User): PaymentReceived[] {
    return (this.state.paymentsReceived || []).filter(p => p.clientId === clientId).sort((a, b) => b.receivedDate.localeCompare(a.receivedDate));
  }
  addPaymentReceived(data: any, actor: User) {
    const newItem = { ...data, id: Math.random().toString(36).substr(2, 9), createdAt: new Date().toISOString() };
    this.state.paymentsReceived.push(newItem);
    this.persist();
  }
  updatePaymentReceived(id: string, updates: any, actor: User) {
    const idx = this.state.paymentsReceived.findIndex(p => p.id === id);
    if (idx !== -1) { this.state.paymentsReceived[idx] = { ...this.state.paymentsReceived[idx], ...updates }; this.persist(); }
  }
  deletePaymentReceived(id: string, actor: User) {
    this.state.paymentsReceived = this.state.paymentsReceived.filter(p => p.id !== id);
    this.persist();
  }

  getClientPaymentSummary(clientId: string, user: User) {
    const billed = this.getBillingByClientId(clientId, user).reduce((sum, b) => sum + b.amountToCollect, 0);
    const paid = this.getPaymentsByClientId(clientId, user).reduce((sum, p) => sum + p.amountReceived, 0);
    return { totalBilled: billed, totalPaid: paid, balance: billed - paid };
  }
  getPendingPaymentsForUser(user: User) {
    return this.getActiveClients(user).map(client => {
      const summary = this.getClientPaymentSummary(client.id, user);
      const payments = this.getPaymentsByClientId(client.id, user);
      return { client, ...summary, lastPaymentDate: payments.length > 0 ? payments[0].receivedDate : null };
    }).filter(item => item.balance > 0);
  }

  // History Methods
  getFollowUps(): FollowUp[] { return this.state.followups || []; }
  getFollowUpsByClientId(clientId: string, user: User): FollowUp[] {
    return this.state.followups.filter(f => f.clientId === clientId).sort((a, b) => b.date.localeCompare(a.date));
  }
  addFollowUp(data: any, actor: User) {
    const newFU = { ...data, id: Math.random().toString(36).substr(2, 9) };
    this.state.followups = [newFU, ...this.state.followups];
    this.persist();
  }
  getNotesByClientId(clientId: string, user: User): Note[] {
    return this.state.notes.filter(n => n.clientId === clientId).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }
  addNote(data: any, actor: User) {
    const newNote = { ...data, id: Math.random().toString(36).substr(2, 9), createdAt: new Date().toISOString() };
    this.state.notes = [newNote, ...this.state.notes];
    this.persist();
  }
  getActivity(user: User): ActivityLog[] {
    if (user.role === UserRole.ADMIN) return this.state.activity;
    return this.state.activity.filter(log => log.actorId === user.id);
  }
  getTransferHistory(user: User): ActivityLog[] {
    const logs = this.state.activity.filter(l => l.targetType === 'CLIENT_TRANSFER');
    if (user.role === UserRole.ADMIN) return logs;
    return logs.filter(l => l.metadata?.fromId === user.id || l.metadata?.toId === user.id);
  }

  // Backup Methods
  getBackups(): BackupHistory[] { return this.state.backups || []; }
  createBackup(actorName: string, actor: User) {
    const data = JSON.stringify(this.state);
    const newBackup = {
      id: Math.random().toString(36).substr(2, 9),
      filename: `nexus_backup_${Date.now()}.json`,
      createdAt: new Date().toISOString(),
      size: `${(data.length / 1024).toFixed(2)} KB`,
      createdBy: actorName,
      data
    };
    this.state.backups = [newBackup, ...this.state.backups];
    this.persist();
  }
  deleteBackup(id: string, actor: User) {
    this.state.backups = this.state.backups.filter(b => b.id !== id);
    this.persist();
  }
  restoreFromJSON(json: string, actor: User) {
    try {
      const data = JSON.parse(json);
      this.state = {
        ...this.getDefaultState(),
        ...data,
        version: CRM_SCHEMA_VERSION
      };
      this.persistImmediate();
      this.logActivity(actor, 'Restored system from backup', 'SYSTEM', 'BACKUP');
    } catch (e) {
      console.error('Failed to restore:', e);
      throw new Error('Invalid backup file format');
    }
  }
}

export const mockStore = new MockStore();
