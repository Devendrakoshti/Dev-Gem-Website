
import { User, UserRole } from '../types';
import { USE_DEMO_AUTH, API_BASE_URL } from '../config/appConfig';
import { mockStore } from './mockStore';
import api from './api';

const STORAGE_KEY = 'nexus_auth_session';
const SESSION_TTL = 4 * 60 * 60 * 1000; // 4 Hours in milliseconds

export interface AuthSession extends User {
  token: string;
  expiresAt: number;
}

class AuthService {
  async login(identifier: string, password: string): Promise<AuthSession> {
    if (USE_DEMO_AUTH) {
      throw new Error('Demo mode disabled');
    }

    try {
      // 1. CSRF Cookie
      await api.get('/sanctum/csrf-cookie', { baseURL: API_BASE_URL.replace('/api', '') });

      // 2. Login
      const loginResponse = await api.post('/login', { email: identifier, password });

      // Backend returns { success: true, data: { user: {...}, token: "..." } }
      const { user, token } = loginResponse.data.data;

      const session = this.transformUser(user, token);

      this.setSession(session);
      return session;

    } catch (error: any) {
      console.error('Login Failed:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  }

  async logout(): Promise<void> {
    try {
      await api.post('/logout');
    } catch (e) {
      console.error('Logout failed', e);
    } finally {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  async getCurrentUserAsync(): Promise<AuthSession | null> {
    try {
      const { data } = await api.get('/me');
      // Backend returns { success: true, data: {...user} }

      const session = this.transformUser(data.data, 'active-session');
      this.setSession(session);
      return session;
    } catch (e) {
      this.logout();
      return null;
    }
  }

  private transformUser(backendUser: any, token: string): AuthSession {
    const names = (backendUser.name || '').split(' ');
    const firstName = names[0] || '';
    const lastName = names.slice(1).join(' ') || '';

    return {
      id: backendUser.id,
      name: backendUser.name,
      firstName,
      lastName,
      email: backendUser.email,
      role: backendUser.role,
      employeeId: backendUser.employee_id, // Map snake_case to camelCase
      token,
      expiresAt: Date.now() + SESSION_TTL
    } as AuthSession;
  }

  getCurrentUser(): AuthSession | null {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;
    return JSON.parse(data);
  }

  isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  }

  getUserRole(): UserRole | null {
    const user = this.getCurrentUser();
    return user ? user.role : null;
  }

  private setSession(session: AuthSession): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  }

  private refreshSession(session: AuthSession): void {
    // Backend handles session slide
  }
}

export const authService = new AuthService();

export const DEMO_CREDENTIALS = {
  ADMIN: { identifier: 'admin@nexus.com', password: 'password123' },
  EMPLOYEE: { identifier: 'EMP001', password: 'password123' }
};
