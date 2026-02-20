
import { 
  User, UserRole, UserStatus, Client, ClientStatus, ClientStage, 
  FollowUp, FollowUpType, Note, ActivityLog, BackupHistory 
} from '../types';

// Password 'password123' in its mock hashed form: nexus_v1_cGFzc3dvcmQxMjM=
const MOCK_HASHED_PWD = 'nexus_v1_cGFzc3dvcmQxMjM=';

export const MOCK_USERS: User[] = [
  { 
    id: '1', 
    firstName: 'Admin', 
    lastName: 'Global', 
    name: 'Admin User', 
    email: 'admin@nexus.com', 
    password: MOCK_HASHED_PWD, 
    role: UserRole.ADMIN, 
    status: UserStatus.ACTIVE,
    employeeId: 'ADM001',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
    createdBy: 'SYSTEM'
  },
  { 
    id: '2', 
    firstName: 'Sarah', 
    lastName: 'Chen', 
    name: 'Sarah Chen', 
    email: 'sarah@nexus.com', 
    password: MOCK_HASHED_PWD, 
    role: UserRole.EMPLOYEE, 
    status: UserStatus.ACTIVE,
    employeeId: 'EMP001',
    createdAt: '2023-02-01T10:00:00Z',
    updatedAt: '2023-02-01T10:00:00Z',
    createdBy: '1'
  },
  { 
    id: '3', 
    firstName: 'Mike', 
    lastName: 'Ross', 
    name: 'Mike Ross', 
    email: 'mike@nexus.com', 
    password: MOCK_HASHED_PWD, 
    role: UserRole.EMPLOYEE, 
    status: UserStatus.ACTIVE,
    employeeId: 'EMP002',
    createdAt: '2023-03-01T14:30:00Z',
    updatedAt: '2023-03-01T14:30:00Z',
    createdBy: '1'
  },
];

export const MOCK_CLIENTS: Client[] = [
  {
    id: 'c1',
    name: 'John Smith',
    mobile: '123-456-7890',
    companyName: 'Tech Innovations LLC',
    companyAddress: '123 Silicon Valley, CA',
    email: 'john@techinn.com',
    status: ClientStatus.ACTIVE,
    stage: ClientStage.NEW,
    assignedToId: '2',
    assignedToName: 'Sarah Chen',
    createdByEmployeeId: '2',
    isArchived: false,
    createdAt: '2023-10-01T10:00:00Z'
  },
  {
    id: 'c2',
    name: 'Alice Johnson',
    mobile: '987-654-3210',
    companyName: 'Global Logistics',
    companyAddress: '45 harbor Dr, NY',
    email: 'alice@gl-log.com',
    status: ClientStatus.ACTIVE,
    stage: ClientStage.CONTACTED,
    assignedToId: '2',
    assignedToName: 'Sarah Chen',
    createdByEmployeeId: '2',
    isArchived: false,
    createdAt: '2023-11-15T14:30:00Z'
  }
];

export const MOCK_FOLLOWUPS: FollowUp[] = [
  {
    id: 'f1',
    clientId: 'c1',
    date: '2023-11-20',
    nextDate: new Date().toISOString().split('T')[0],
    type: FollowUpType.CALL,
    notes: 'Initial introduction call successful.',
    employeeId: '2',
    employeeName: 'Sarah Chen'
  }
];

export const MOCK_NOTES: Note[] = [
  {
    id: 'n1',
    clientId: 'c1',
    content: 'Client prefers afternoon calls after 3 PM.',
    employeeId: '2',
    employeeName: 'Sarah Chen',
    createdAt: '2023-10-02T15:00:00Z'
  }
];

export const MOCK_ACTIVITY: ActivityLog[] = [
  {
    id: 'a1',
    actorId: '2',
    actorName: 'Sarah Chen',
    action: 'Created Client: John Smith',
    targetId: 'c1',
    targetType: 'CLIENT',
    timestamp: '2023-10-01T10:00:00Z'
  }
];
