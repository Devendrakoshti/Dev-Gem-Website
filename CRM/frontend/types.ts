
export enum UserRole {
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE'
}

export enum ClientStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

export enum ClientStage {
  NEW = 'NEW',
  CONTACTED = 'CONTACTED',
  INTERESTED = 'INTERESTED',
  CONVERTED = 'CONVERTED',
  LOST = 'LOST'
}

export enum FollowUpType {
  CALL = 'CALL',
  WHATSAPP = 'WHATSAPP',
  EMAIL = 'EMAIL',
  MEETING = 'MEETING'
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  email?: string;
  password?: string;
  role: UserRole;
  employeeId: string;
  isDeleted?: boolean;
}

export interface Client {
  id: string;
  name: string;
  mobile: string;
  companyName: string;
  companyAddress: string;
  email: string;
  status: ClientStatus;
  stage: ClientStage;
  assignedToId: string; // Current Owner (Assigned Employee)
  assignedToName: string;
  createdByEmployeeId: string; // Original Creator
  isArchived: boolean;
  isDeleted?: boolean;
  createdAt: string;
}

export interface BillingItem {
  id: string;
  clientId: string;
  serviceName: string;
  description: string;
  amountToCollect: number;
  billingDate: string;
  createdBy: string;
  createdAt: string;
}

export interface PaymentReceived {
  id: string;
  clientId: string;
  amountReceived: number;
  receivedDate: string;
  paymentMode: 'CASH' | 'UPI' | 'BANK';
  notes: string;
  createdBy: string;
  createdAt: string;
}

export interface FollowUp {
  id: string;
  clientId: string;
  date: string;
  nextDate: string;
  type: FollowUpType;
  notes: string;
  employeeId: string;
  employeeName: string;
}

export interface Note {
  id: string;
  clientId: string;
  content: string;
  employeeId: string;
  employeeName: string;
  createdAt: string;
}

export interface ActivityLog {
  id: string;
  actorId: string;
  actorName: string;
  action: string;
  targetId: string;
  targetType: 'CLIENT' | 'FOLLOWUP' | 'BACKUP' | 'EMPLOYEE' | 'SYSTEM' | 'PAYMENT' | 'CLIENT_TRANSFER';
  timestamp: string;
  metadata?: {
    fromId?: string;
    toId?: string;
    fromName?: string;
    toName?: string;
  };
}

export interface BackupHistory {
  id: string;
  filename: string;
  createdAt: string;
  size: string;
  createdBy: string;
  data?: string;
}
