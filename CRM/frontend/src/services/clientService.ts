
import { Client, User, UserRole } from '../types';
import { apiClient } from './apiClient';
import { USE_DEMO_AUTH } from '../config/appConfig';
import { mockStore } from './mockStore';
import { authService } from './authService';

export class ClientService {
    private mapClient(c: any): Client {
        return {
            ...c,
            companyName: c.companyName || c.company_name || '',
            companyAddress: c.companyAddress || c.company_address || '',
            assignedToId: c.assignedToId || c.assigned_to_id || '',
            assignedToName: c.assignedToName || c.assigned_to_name || '',
            isArchived: c.isArchived || !!c.is_archived,
            isDeleted: c.isDeleted || !!c.is_deleted || !!c.deleted_at,
            createdAt: c.createdAt || c.created_at,
            updatedAt: c.updatedAt || c.updated_at
        };
    }

    async getClients(user: User, filter?: 'active' | 'archived' | 'trash'): Promise<Client[]> {
        if (USE_DEMO_AUTH) {
            if (filter === 'archived') return mockStore.getArchivedClients(user);
            if (filter === 'trash') return mockStore.getDeletedClients(user);
            return mockStore.getActiveClients(user);
        }
        const response = await apiClient.get<any>('/clients', filter ? { filter } : undefined);
        const data = response.data || response;
        return Array.isArray(data) ? data.map((c: any) => this.mapClient(c)) : [];
    }

    async getClientById(id: string): Promise<Client | undefined> {
        if (USE_DEMO_AUTH) {
            return mockStore.getClientById(id);
        }
        const response = await apiClient.get<any>(`/clients/${id}`);
        const c = response.data || response;
        return c ? this.mapClient(c) : undefined;
    }

    async createClient(data: Partial<Client>): Promise<Client> {
        if (USE_DEMO_AUTH) {
            const currentUser = authService.getCurrentUser()!;
            mockStore.addClient(data, currentUser);
            // Return the newly created client (mock ID generated in store)
            const clients = mockStore.getActiveClients(currentUser);
            return clients[clients.length - 1];
        }
        const response = await apiClient.post<any>('/clients', data);
        return response.data || response;
    }

    async updateClient(id: string, updates: Partial<Client>): Promise<Client> {
        if (USE_DEMO_AUTH) {
            const currentUser = authService.getCurrentUser()!;
            mockStore.updateClient(id, updates, currentUser);
            return mockStore.getClientById(id)!;
        }
        const response = await apiClient.put<any>(`/clients/${id}`, updates);
        return response.data || response;
    }

    async deleteClient(id: string): Promise<void> {
        if (USE_DEMO_AUTH) {
            const currentUser = authService.getCurrentUser()!;
            mockStore.deleteClientToTrash(id, currentUser);
            return;
        }
        await apiClient.delete(`/clients/${id}`);
    }

    async transferClient(clientId: string, targetId: string): Promise<void> {
        if (USE_DEMO_AUTH) {
            const currentUser = authService.getCurrentUser()!;
            mockStore.transferClient(clientId, targetId, currentUser);
            return;
        }
        await apiClient.post(`/clients/${clientId}/transfer`, { target_id: targetId });
    }

    async getPendingPayments(): Promise<any[]> {
        if (USE_DEMO_AUTH) {
            const user = authService.getCurrentUser()!;
            return mockStore.getPendingPaymentsForUser(user);
        }
        const response = await apiClient.get<any>('/payments/pending');
        return response.data || response;
    }

    // Billing
    async addBillingItem(data: any): Promise<any> {
        if (USE_DEMO_AUTH) {
            const currentUser = authService.getCurrentUser()!;
            return mockStore.addBillingItem(data, currentUser);
        }
        return apiClient.post('/billing', data);
    }
    async deleteBillingItem(id: string): Promise<void> {
        if (USE_DEMO_AUTH) {
            const currentUser = authService.getCurrentUser()!;
            mockStore.deleteBillingItem(id, currentUser);
            return;
        }
        await apiClient.delete(`/billing/${id}`);
    }

    // Payments
    async addPayment(data: any): Promise<any> {
        if (USE_DEMO_AUTH) {
            const currentUser = authService.getCurrentUser()!;
            return mockStore.addPaymentReceived(data, currentUser);
        }
        return apiClient.post('/payments', data);
    }
    async deletePayment(id: string): Promise<void> {
        if (USE_DEMO_AUTH) {
            const currentUser = authService.getCurrentUser()!;
            mockStore.deletePaymentReceived(id, currentUser);
            return;
        }
        await apiClient.delete(`/payments/${id}`);
    }

    // Interactions
    async addFollowUp(data: any): Promise<any> {
        if (USE_DEMO_AUTH) {
            const currentUser = authService.getCurrentUser()!;
            return mockStore.addFollowUp(data, currentUser);
        }
        return apiClient.post('/follow-ups', data);
    }
    async addNote(data: any): Promise<any> {
        if (USE_DEMO_AUTH) {
            const currentUser = authService.getCurrentUser()!;
            return mockStore.addNote(data, currentUser);
        }
        return apiClient.post('/notes', data);
    }
}

export const clientService = new ClientService();
