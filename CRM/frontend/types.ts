export enum UserRole {
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE'
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED'
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
  id: string | number;
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  role: UserRole;
  employee_id: string;
  status: UserStatus;
  is_deleted?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Client {
  id: string | number;
  name: string;
  mobile: string;
  company_name: string;
  company_address: string;
  email: string;
  status: ClientStatus;
  stage: ClientStage;
  assigned_to_id?: string | number; 
  created_by_id?: string | number; 
  is_archived: boolean;
  is_deleted?: boolean;
  created_at?: string;
}

export interface BillingItem {
  id: string | number;
  client_id: string | number;
  service_name: string;
  description?: string;
  amount_to_collect: number;
  status: string;
  billing_date: string;     
  created_at?: string;
}

export interface PaymentReceived {
  id: string | number;
  client_id: string | number;
  amount_received: number;
  received_date: string;
  payment_mode: 'CASH' | 'UPI' | 'BANK';
  notes?: string;
  created_at?: string;
}

export interface FollowUp {
  id: string | number;
  client_id: string | number;
  date: string;
  next_date: string;
  type: FollowUpType;
  notes: string;
  employee_id: string | number;
}

export interface ActivityLog {
  id: string | number;
  actor_id: string | number;
  action: string;
  target_id: string | number;
  target_type: string;
  timestamp: string;
  metadata?: any;
}

export interface BackupHistory {
  id: string | number;
  filename: string;
  created_at: string;
  size: string;
}