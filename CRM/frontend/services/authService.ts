
import { User, UserRole } from '../types';
import { USE_DEMO_AUTH } from '../config/appConfig';
import { mockStore, hashPassword } from './mockStore';
import { UserService } from './userService';

const STORAGE_KEY = 'nexus_auth_session';

export interface AuthSession extends User {
  token: string;
}

class AuthService {
  async login(identifier: string, password: string): Promise<AuthSession> {
    if (USE_DEMO_AUTH) {
      await new Promise((resolve) => setTimeout(resolve, 600));

      const userMatch = await UserService.findUserByIdentifier(identifier);
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
      throw new Error('Live API Authentication not configured.');
    }
  }

  logout(): void {
    localStorage.removeItem(STORAGE_KEY);
  }

  getCurrentUser(): AuthSession | null {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;
    try {
      const session = JSON.parse(data);
      // Synchronous access to store for rapid UI checks
      const users = mockStore.getCollection('users');
      const latest = users.find(u => u.id === session.id);
      
      if (!latest || latest.isDeleted) {
        this.logout();
        return null;
      }
      return { ...latest, token: session.token } as AuthSession;
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
