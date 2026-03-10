
import { apiClient } from './apiClient';
import { USE_DEMO_AUTH } from '../config/appConfig';
import { mockStore } from './mockStore';
import { ActivityLog } from '../types';

export interface DashboardStats {
    tcv: number;
    collected: number;
    pending: number;
    active_leads: number;
    conversion_rate: string;
    workforce: number;
    my_tcv: number;
    my_collected: number;
    my_conversions: number;
    my_active: number;
    my_conversion_rate: string;
    funnel: Array<{ label: string, count: number }>;
    my_funnel: Array<{ label: string, count: number }>;
    leaderboard: Array<any>;
    activity: Array<any>;
}

export class DashboardService {
    async getDashboardData(): Promise<DashboardStats> {
        if (USE_DEMO_AUTH) {
            throw new Error("DashboardService data not available in Demo Mode");
        }
        const response = await apiClient.get<any>('/dashboard');
        return response.data || response;
    }

    async getActivity(): Promise<ActivityLog[]> {
        if (USE_DEMO_AUTH) {
            return mockStore.getCollection('activity');
        }
        const response = await apiClient.get<any>('/dashboard/activity');
        return response.data || response;
    }
}

export const dashboardService = new DashboardService();
