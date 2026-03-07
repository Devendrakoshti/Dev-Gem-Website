
import { User, UserRole, UserStatus } from '../types';
import { mockStore, hashPassword } from './mockStore';

export class UserService {
  static async getUsers(): Promise<User[]> {
    return mockStore.getCollection('users');
  }

  static async getActiveUsers(): Promise<User[]> {
    const users = await this.getUsers();
    return users.filter(u => !u.isDeleted);
  }

  /**
   * FIX: Returns all staff (Admin and Employees).
   */
  static async getEmployees(): Promise<User[]> {
    const users = await this.getActiveUsers();
    return users.filter(u => u.role === UserRole.EMPLOYEE || u.role === UserRole.ADMIN);
  }

  static async getAdmins(): Promise<User[]> {
    const users = await this.getActiveUsers();
    return users.filter(u => u.role === UserRole.ADMIN);
  }

  static async getUserById(id: string): Promise<User | undefined> {
    const users = await this.getUsers();
    return users.find(u => u.id === id);
  }

  static async findUserByIdentifier(identifier: string): Promise<User | undefined> {
    const users = await this.getActiveUsers();
    return users.find(u => u.email === identifier || u.employeeId === identifier);
  }

  static async createEmployee(data: Partial<User>, actorId: string): Promise<User> {
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
      createdBy: actorId
    };

    mockStore.setCollection('users', [...users, newUser]);
    return newUser;
  }

  static async updateUser(id: string, updates: Partial<User>): Promise<void> {
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
  }

  static async softDeleteUser(id: string, actorId: string): Promise<void> {
    if (id === actorId) throw new Error("Self-Protection: You cannot deactivate your own account.");
    
    const users = await this.getUsers();
    const user = users.find(u => u.id === id);
    
    if (user?.role === UserRole.ADMIN) {
      const activeAdmins = users.filter(u => u.role === UserRole.ADMIN && !u.isDeleted);
      if (activeAdmins.length <= 1) {
        throw new Error("Security Guard: Cannot deactivate the last remaining Administrator.");
      }
    }

    await this.updateUser(id, { isDeleted: true, status: UserStatus.SUSPENDED });
  }
}
