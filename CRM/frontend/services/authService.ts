
import { User, UserRole } from '../types';
import { apiService } from './apiService';

const STORAGE_KEY = 'nexus_auth_session';

export interface AuthSession extends User {
  token: string;
}

class AuthService {
  async login(identifier: string, password: string): Promise<AuthSession> {
    const response = await apiService.login(identifier, password);
    // Assuming backend returns { user, token }
    const session: AuthSession = {
      ...response.user,
      token: response.token
    };
    this.setSession(session);
    return session;
  }

  logout(): void {
    localStorage.removeItem(STORAGE_KEY);
  }

  getCurrentUser(): AuthSession | null {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;
    try {
      return JSON.parse(data) as AuthSession;
    } catch (e) {
      this.logout();
      return null;
    }
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
}

export const authService = new AuthService();

export const DEMO_CREDENTIALS = {
  ADMIN: { identifier: 'admin@nexus.com', password: 'password123' },
  EMPLOYEE: { identifier: 'EMP001', password: 'password123' }
};
