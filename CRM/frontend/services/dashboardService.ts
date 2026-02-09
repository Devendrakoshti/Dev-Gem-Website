import api from './api';
import { Client, FollowUp } from '../types';

export interface DashboardSummary {
    counts: {
        total_clients: number;
        active_clients: number;
        archived_clients: number;
        employees: number;
        today_actions: number;
        critical_alerts: number;
    };
    widgets: {
        today_actions: (FollowUp & { client?: { id: string, name: string, company_name: string } })[];
        overdue_actions: (FollowUp & { client?: { id: string, name: string, company_name: string } })[];
        high_exposure_clients: { id: string, name: string, balance: number }[];
    };
}

class DashboardService {
    async getSummary(): Promise<DashboardSummary> {
        const response = await api.get('/dashboard');
        return response.data.data;
    }
}

export const dashboardService = new DashboardService();
