
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
  }
];

export const MOCK_CLIENTS: Client[] = [];

export const MOCK_FOLLOWUPS: FollowUp[] = [];

export const MOCK_NOTES: Note[] = [];

export const MOCK_ACTIVITY: ActivityLog[] = [];
