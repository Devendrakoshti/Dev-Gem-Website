import api from './api';
import { Client, ClientStatus, ClientStage, BillingItem, PaymentReceived, User, Note, FollowUp, FollowUpType } from '../types';

export interface ClientFilters {
    status?: 'active' | 'archived' | 'deleted';
}

class ClientService {
    async getClients(filter: 'active' | 'archived' | 'deleted' = 'active'): Promise<Client[]> {
        const response = await api.get('/clients', { params: { filter } });
        return response.data.data.map(this.transformClient);
    }

    async getClientById(id: string): Promise<Client | null> {
        try {
            const response = await api.get(`/clients/${id}`);
            return this.transformClient(response.data.data);
        } catch (error) {
            return null;
        }
    }

    async createClient(data: Partial<Client>): Promise<Client> {
        const response = await api.post('/clients', this.transformToBackend(data));
        return this.transformClient(response.data.data);
    }

    async updateClient(id: string, data: Partial<Client>): Promise<Client> {
        const response = await api.put(`/clients/${id}`, this.transformToBackend(data));
        return this.transformClient(response.data.data);
    }

    async deleteClient(id: string): Promise<void> {
        await api.delete(`/clients/${id}`);
    }

    async restoreClient(id: string): Promise<void> {
        await api.post(`/clients/${id}/restore`);
    }

    async forceDeleteClient(id: string): Promise<void> {
        await api.delete(`/clients/${id}/force`);
    }

    async transferClient(id: string, toEmployeeId: string): Promise<void> {
        await api.post(`/clients/${id}/transfer`, { to_employee_id: toEmployeeId });
    }

    async archiveClient(id: string): Promise<void> {
        // Determine if we should use update or a custom endpoint. 
        // Backend doesn't have specific 'archive' endpoint, but 'index' filters by is_archived.
        // So we update the client.
        await this.updateClient(id, { isArchived: true });
    }

    async getAssignableUsers(): Promise<User[]> {
        const response = await api.get('/clients/assignees');
        // Backend returns minimal user objects. Transform if necessary or cast.
        // Backend returns: id, name, employee_id.
        // Frontend User type requires: role, etc. 
        // We'll return what we have and cast, or map.
        // Frontend uses: id, name, employeeId for dropdown.
        return response.data.data.map((u: any) => ({
            id: u.id,
            name: u.name,
            employeeId: u.employee_id,
            // Defaults for minimal mock
            firstName: u.name.split(' ')[0],
            lastName: u.name.split(' ')[1] || '',
            email: '',
            role: 'EMPLOYEE'
        }));
    }

    // --- Finance ---

    async getBilling(clientId: string): Promise<BillingItem[]> {
        const response = await api.get(`/clients/${clientId}/billing`);
        return response.data.map((item: any) => ({
            id: item.id,
            clientId: item.client_id,
            serviceName: item.service_name,
            description: item.description,
            amountToCollect: parseFloat(item.amount), // Backend 'amount'
            billingDate: item.billing_date,
            createdBy: item.created_by_user?.name || 'System', // Backend might need to return this
            createdAt: item.created_at
        }));
    }

    async addBilling(data: Partial<BillingItem>): Promise<BillingItem> {
        const payload = {
            client_id: data.clientId,
            service_name: data.serviceName,
            description: data.description,
            amount: data.amountToCollect,
            billing_date: data.billingDate
        };
        const response = await api.post('/billing', payload);
        // Backend returns the created item
        const item = response.data.data;
        return {
            id: item.id,
            clientId: item.client_id,
            serviceName: item.service_name,
            description: item.description,
            amountToCollect: parseFloat(item.amount),
            billingDate: item.billing_date,
            createdBy: 'Me', // We don't get creator name in response immediately usually
            createdAt: item.created_at
        };
    }

    async getPayments(clientId: string): Promise<PaymentReceived[]> {
        const response = await api.get(`/clients/${clientId}/payments`);
        return response.data.map((item: any) => ({
            id: item.id,
            clientId: item.client_id,
            amountReceived: parseFloat(item.amount),
            receivedDate: item.payment_date,
            paymentMode: item.payment_mode, // UP/BANK/CASH
            notes: item.notes,
            createdBy: item.created_by_user?.name || 'System',
            createdAt: item.created_at
        }));
    }

    async addPayment(data: Partial<PaymentReceived>): Promise<PaymentReceived> {
        const payload = {
            client_id: data.clientId,
            amount: data.amountReceived,
            payment_date: data.receivedDate,
            payment_mode: data.paymentMode,
            notes: data.notes
        };
        const response = await api.post('/payments', payload);
        const item = response.data.data;
        return {
            id: item.id,
            clientId: item.client_id,
            amountReceived: parseFloat(item.amount),
            receivedDate: item.payment_date,
            paymentMode: item.payment_mode,
            notes: item.notes,
            createdBy: 'Me',
            createdAt: item.created_at
        };
    }

    // --- Interactions (Notes & FollowUps) ---

    async getNotes(clientId: string): Promise<Note[]> {
        const response = await api.get(`/clients/${clientId}/notes`);
        return response.data.data;
    }

    async addNote(data: Partial<Note>): Promise<Note> {
        const response = await api.post('/notes', {
            client_id: data.clientId,
            content: data.content
        });
        return response.data.data;
    }

    async getFollowUps(clientId: string): Promise<FollowUp[]> {
        const response = await api.get(`/clients/${clientId}/followups`);
        return response.data.data;
    }

    async addFollowUp(data: Partial<FollowUp>): Promise<FollowUp> {
        const response = await api.post('/followups', {
            client_id: data.clientId,
            date: data.date,
            next_date: data.nextDate,
            type: data.type,
            notes: data.notes
        });
        return response.data.data;
    }

    // --- Admin / Trash (Employees) ---

    async getDeletedEmployees(): Promise<User[]> {
        const response = await api.get('/employees/trash/all');
        return response.data.data.map((u: any) => ({
            id: u.id,
            name: u.name,
            employeeId: u.employee_id,
            email: u.email,
            role: u.role,
            firstName: u.first_name || u.name.split(' ')[0], // Fallback
            lastName: u.last_name || u.name.split(' ')[1] || '',
            isDeleted: true
        }));
    }

    async restoreEmployee(id: string): Promise<void> {
        await api.post(`/employees/${id}/restore`);
    }

    async forceDeleteEmployee(id: string): Promise<void> {
        await api.delete(`/employees/${id}/force`);
    }

    // --- Helpers ---

    private transformClient(data: any): Client {
        return {
            id: data.id,
            name: data.name,
            mobile: data.mobile,
            companyName: data.company_name,
            companyAddress: data.company_address,
            email: data.email,
            status: data.status,
            stage: data.stage,
            assignedToId: data.assigned_to_id,
            assignedToName: data.assigned_to_name || 'Unknown',
            createdByEmployeeId: data.created_by_employee_id,
            isArchived: Boolean(data.is_archived),
            isDeleted: Boolean(data.deleted_at),
            createdAt: data.created_at
        };
    }

    private transformToBackend(data: Partial<Client>): any {
        return {
            name: data.name,
            mobile: data.mobile,
            company_name: data.companyName,
            company_address: data.companyAddress,
            email: data.email,
            status: data.status,
            stage: data.stage,
            assigned_to_id: data.assignedToId,
            is_archived: data.isArchived
        };
    }
}

export const clientService = new ClientService();
