
import { User, UserRole } from '../types';
import { USE_DEMO_AUTH } from '../config/appConfig';
import { mockStore, hashPassword } from './mockStore';
import { userService } from './userService';
import { apiClient } from './apiClient';

const STORAGE_KEY = 'nexus_auth_session';

export interface AuthSession extends User {
  token: string;
}

class AuthService {
  async login(identifier: string, password: string): Promise<AuthSession> {
    if (USE_DEMO_AUTH) {
      await new Promise((resolve) => setTimeout(resolve, 600));

      const userMatch = await userService.findUserByIdentifier(identifier);
      const inputHash = hashPassword(password);

      if (userMatch && userMatch.password === inputHash) {
        if (userMatch.isDeleted) {
          throw new Error('This account has been deactivated. Please contact HR.');
        }

        const session: AuthSession = {
          ...userMatch,
          token: `demo-jwt-${btoa(userMatch.employeeId)}-${Date.now()}`
        };
        this.setSession(session);
        return session;
      }
      throw new Error('Invalid Credentials: User identity or password mismatch.');
    } else {
      const response = await apiClient.post<any>('/login', {
        email: identifier, // Assuming email is used as identifier
        password: password
      });

      const session: AuthSession = {
        ...response.user,
        firstName: response.user.first_name,
        lastName: response.user.last_name,
        employeeId: response.user.employee_id,
        token: response.access_token
      };

      this.setSession(session);
      return session;
    }
  }

  async logout(): Promise<void> {
    if (!USE_DEMO_AUTH) {
      try {
        await apiClient.post('/logout', {});
      } catch (e) {
        console.error('Logout API failed', e);
      }
    }
    localStorage.removeItem(STORAGE_KEY);
    window.location.reload(); // Refresh to clear state
  }

  getCurrentUser(): AuthSession | null {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;
    try {
      const session = JSON.parse(data);
      if (USE_DEMO_AUTH) {
        const users = mockStore.getCollection('users');
        const latest = users.find(u => u.id === session.id);

        if (!latest || latest.isDeleted) {
          this.logout();
          return null;
        }
        return { ...latest, token: session.token } as AuthSession;
      }
      return session;
    } catch (e) {
      localStorage.removeItem(STORAGE_KEY);
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
