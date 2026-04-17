
import { User, UserRole, UserStatus } from '../types';
import { mockStore, hashPassword } from './mockStore';
import { USE_DEMO_AUTH } from '../config/appConfig';
import { apiClient } from './apiClient';

export class UserService {
  private mapUser(u: any): User {
    return {
      ...u,
      id: String(u.id || ''),
      firstName: u.firstName || u.first_name || '',
      lastName: u.lastName || u.last_name || '',
      employeeId: String(u.employeeId || u.employee_id || ''),
      name: u.name || `${u.first_name || ''} ${u.last_name || ''}`.trim() || 'User',
      isDeleted: !!u.deleted_at || u.status === 'SUSPENDED' || u.isDeleted
    };
  }

  async getUsers(): Promise<User[]> {
    if (USE_DEMO_AUTH) {
      return mockStore.getCollection('users');
    }
    const response = await apiClient.get<any>('/employees');
    const data = response.data || response;
    return Array.isArray(data) ? data.map(u => this.mapUser(u)) : [];
  }

  async getTrashedUsers(): Promise<User[]> {
    if (USE_DEMO_AUTH) {
      const users = await this.getUsers();
      return users.filter(u => u.isDeleted);
    }
    const response = await apiClient.get<any>('/employees', { trashed: '1' });
    const data = response.data || response;
    return Array.isArray(data) ? data.map(u => this.mapUser(u)) : [];
  }

  async getActiveUsers(): Promise<User[]> {
    const users = await this.getUsers();
    return users.filter(u => !u.isDeleted);
  }

  /**
   * FIX: Returns all staff (Admin and Employees).
   */
  async getEmployees(): Promise<User[]> {
    const users = await this.getActiveUsers();
    return users.filter(u => u.role === UserRole.EMPLOYEE || u.role === UserRole.ADMIN);
  }

  async getAdmins(): Promise<User[]> {
    const users = await this.getActiveUsers();
    return users.filter(u => u.role === UserRole.ADMIN);
  }

  async getUserById(id: string): Promise<User | undefined> {
    if (USE_DEMO_AUTH) {
      const users = await this.getUsers();
      return users.find(u => u.id === id);
    }
    const response = await apiClient.get<any>(`/employees/${id}`);
    const u = response.data || response;
    return u ? this.mapUser(u) : undefined;
  }

  async findUserByIdentifier(identifier: string): Promise<User | undefined> {
    const users = await this.getActiveUsers();
    return users.find(u => u.email === identifier || u.employeeId === identifier);
  }

  async createEmployee(data: Partial<User>): Promise<User> {
    if (USE_DEMO_AUTH) {
      const users = await this.getUsers();

      if (users.some(u => u.employeeId === data.employeeId)) {
        throw new Error(`Employee ID ${data.employeeId} is already registered.`);
      }
      if (data.email && users.some(u => u.email === data.email)) {
        throw new Error(`Email ${data.email} is already in use.`);
      }

      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        name: `${data.firstName} ${data.lastName}`,
        email: data.email || '',
        password: hashPassword(data.password || 'password123'),
        role: data.role || UserRole.EMPLOYEE,
        employeeId: data.employeeId || '',
        status: data.status || UserStatus.ACTIVE,
        isDeleted: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: 'system'
      };

      mockStore.setCollection('users', [...users, newUser]);
      return newUser;
    } else {
      const response = await apiClient.post<any>('/employees', data);
      return response.data || response;
    }
  }

  async updateUser(id: string, updates: Partial<User>): Promise<void> {
    if (USE_DEMO_AUTH) {
      const users = await this.getUsers();
      const index = users.findIndex(u => u.id === id);
      if (index === -1) throw new Error("User not found.");

      const oldUser = users[index];

      if (oldUser.role === UserRole.ADMIN && updates.role === UserRole.EMPLOYEE) {
        const activeAdmins = users.filter(u => u.role === UserRole.ADMIN && !u.isDeleted);
        if (activeAdmins.length <= 1) {
          throw new Error("Security Guard: Cannot demote the last remaining Administrator.");
        }
      }

      const updatedUser = {
        ...oldUser,
        ...updates,
        name: updates.firstName || updates.lastName
          ? `${updates.firstName || oldUser.firstName} ${updates.lastName || oldUser.lastName}`
          : oldUser.name,
        updatedAt: new Date().toISOString()
      };

      if (updates.password && updates.password !== oldUser.password) {
        updatedUser.password = hashPassword(updates.password);
      }

      const nextUsers = [...users];
      nextUsers[index] = updatedUser;
      mockStore.setCollection('users', nextUsers);
    } else {
      await apiClient.put(`/employees/${id}`, updates);
    }
  }

  async softDeleteUser(id: string): Promise<void> {
    if (USE_DEMO_AUTH) {
      const users = await this.getUsers();
      const user = users.find(u => u.id === id);

      if (user?.role === UserRole.ADMIN) {
        const activeAdmins = users.filter(u => u.role === UserRole.ADMIN && !u.isDeleted);
        if (activeAdmins.length <= 1) {
          throw new Error("Security Guard: Cannot deactivate the last remaining Administrator.");
        }
      }

      await this.updateUser(id, { isDeleted: true, status: UserStatus.SUSPENDED });
    } else {
      await apiClient.delete(`/employees/${id}`);
    }
  }

  async restoreUser(id: string): Promise<void> {
    if (USE_DEMO_AUTH) {
      await this.updateUser(id, { isDeleted: false, status: UserStatus.ACTIVE });
    } else {
      await apiClient.post(`/employees/${id}/restore`, {});
    }
  }

  async purgeUser(id: string): Promise<void> {
    if (USE_DEMO_AUTH) {
       const users = await this.getUsers();
       const nextUsers = users.filter(u => u.id !== id);
       mockStore.setCollection('users', nextUsers);
    } else {
      await apiClient.delete(`/employees/${id}/purge`);
    }
  }
}

export const userService = new UserService();
