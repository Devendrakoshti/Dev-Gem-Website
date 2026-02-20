import { 
  Client, User, FollowUp, ActivityLog, BillingItem, PaymentReceived, BackupHistory 
} from '../types';

// FIX 1: Hum yahan seedha aapki .env file se URL le rahe hain. 
// Agar .env fail ho jaye, toh ye default localhost:8000 use karega.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

class ApiService {
  private getHeaders() {
    const session = localStorage.getItem('nexus_auth_session');
    const token = session ? JSON.parse(session).token : '';
    
    const headers: any = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: { ...this.getHeaders(), ...options?.headers }
      });

      const jsonResponse = await response.json();

      if (!response.ok) {
        throw new Error(jsonResponse.message || 'System Error');
      }

      // FIX 2: Laravel apna response 'data' object ke andar bhejta hai.
      // Hum yahan usko theek se return kar rahe hain taaki React ko data mil jaye.
      return jsonResponse.data !== undefined ? jsonResponse.data : jsonResponse;

    } catch (error: any) {
      console.error("API Request Failed:", error);
      throw new Error(error.message || 'Failed to fetch. Is Laravel backend running?');
    }
  }

  // Auth
  async login(identifier: string, pass: string): Promise<any> {
    // FIX 3: Laravel ko 'email' ki zarurat hai, isliye hum 'identifier' variable ko 'email' key ke naam se bhej rahe hain.
    return this.request('/login', {
      method: 'POST',
      body: JSON.stringify({ email: identifier, password: pass })
    });
  }

  // Clients
  async getClients(archived: boolean = false): Promise<Client[]> { 
    return this.request(`/clients?archived=${archived ? 1 : 0}`); 
  }
  async getClientById(id: string): Promise<Client> { return this.request(`/clients/${id}`); }
  async createClient(data: Partial<Client>): Promise<Client> {
    return this.request('/clients', { method: 'POST', body: JSON.stringify(data) });
  }
  async updateClient(id: string, data: Partial<Client>): Promise<Client> {
    return this.request(`/clients/${id}`, { method: 'PUT', body: JSON.stringify(data) });
  }
  async deleteClient(id: string): Promise<void> {
    return this.request(`/clients/${id}`, { method: 'DELETE' });
  }

  // Follow-ups
  async getFollowUps(clientId: string): Promise<FollowUp[]> {
    return this.request(`/followups/${clientId}`);
  }
  async addFollowUp(data: any): Promise<void> {
    return this.request('/followups', { method: 'POST', body: JSON.stringify(data) });
  }

  // Financials
  async getLedgerSummary(clientId: string): Promise<any> {
    return this.request(`/finance/summary/${clientId}`);
  }
  async getBilling(clientId: string): Promise<BillingItem[]> {
    return this.request(`/finance/billing/${clientId}`);
  }
  async addBilling(data: any): Promise<void> {
    return this.request('/finance/billing', { method: 'POST', body: JSON.stringify(data) });
  }
  async getPayments(clientId: string): Promise<PaymentReceived[]> {
    return this.request(`/finance/payments/${clientId}`);
  }
  async addPayment(data: any): Promise<void> {
    return this.request('/finance/payments', { method: 'POST', body: JSON.stringify(data) });
  }
  async deleteBilling(id: string): Promise<void> { return this.request(`/finance/billing/${id}`, { method: 'DELETE' }); }
  async deletePayment(id: string): Promise<void> { return this.request(`/finance/payments/${id}`, { method: 'DELETE' }); }

  // Dashboard & Misc
  async getDashboardStats(): Promise<any> { return this.request('/dashboard'); } // Fixed endpoint name
  async getPendingPayments(): Promise<any[]> { return this.request('/finance/pending'); }
  async getActivityLogs(): Promise<ActivityLog[]> { return this.request('/activity'); }
  async getStaff(): Promise<User[]> { return this.request('/staff'); }
  async createStaff(data: any): Promise<void> { return this.request('/staff', { method: 'POST', body: JSON.stringify(data) }); }
  async updateStaff(id: string, data: any): Promise<void> { return this.request(`/staff/${id}`, { method: 'PUT', body: JSON.stringify(data) }); }
  async deleteStaff(id: string): Promise<void> { return this.request(`/staff/${id}`, { method: 'DELETE' }); }
  async getTransferHistory(): Promise<ActivityLog[]> { return this.request('/transfers'); }

  // Backups
  async getBackups(): Promise<BackupHistory[]> { return this.request('/backups'); }
  async createBackup(): Promise<void> { return this.request('/backups', { method: 'POST' }); }
  async deleteBackup(id: string): Promise<void> { return this.request(`/backups/${id}`, { method: 'DELETE' }); }
  async restoreBackup(data: string): Promise<void> { return this.request('/backups/restore', { method: 'POST', body: JSON.stringify({ data }) }); }

  // Trash
  async getTrash(type: 'CLIENTS' | 'EMPLOYEES'): Promise<any[]> {
    return this.request(`/trash?type=${type}`);
  }
  async restoreFromTrash(id: string, type: 'CLIENT' | 'EMPLOYEE'): Promise<void> {
    return this.request(`/trash/restore`, { method: 'POST', body: JSON.stringify({ id, type }) });
  }
  async permanentDelete(id: string, type: 'CLIENT' | 'EMPLOYEE'): Promise<void> {
    return this.request(`/trash/purge`, { method: 'POST', body: JSON.stringify({ id, type }) });
  }
}

export const apiService = new ApiService();