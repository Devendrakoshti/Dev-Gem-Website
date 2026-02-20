
import { 
  User, UserRole, UserStatus, Client, ClientStatus, ClientStage, 
  BillingItem, PaymentReceived, ActivityLog 
} from '../types';
import { hashPassword } from './mockStore';
import { MOCK_USERS } from './mockData';
import { CRM_STORAGE_KEY, CRM_SCHEMA_VERSION } from '../config/appConfig';

const FIRST_NAMES = ['Aarav', 'Advait', 'Vihaan', 'Arjun', 'Sai', 'Ishaan', 'Ayaan', 'Krishna', 'Ananya', 'Diya', 'Ishani', 'Aadhya', 'Saanvi', 'Myra', 'Anvi', 'Pari', 'Anika', 'Navya'];
const LAST_NAMES = ['Sharma', 'Patel', 'Verma', 'Gupta', 'Iyer', 'Reddy', 'Choudhury', 'Nair', 'Singh', 'Mistri', 'Joshi', 'Kulkarni'];
const COMPANIES = ['Tata Consultancy', 'Reliance Industries', 'Infosys Tech', 'Wipro Digital', 'HCL Enterprise', 'Adani Group', 'Mahindra & Mahindra', 'ICICI Bank'];

const randomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const randomRange = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export class DataSimulator {
  private users: User[] = [...MOCK_USERS]; // FIX: Preserve Demo Users
  private clients: Client[] = [];
  private invoices: BillingItem[] = [];
  private payments: PaymentReceived[] = [];

  public async runLoadTest() {
    console.log('%c🚀 Generating Synthetic CRM Environment...', 'color: #6366f1; font-weight: bold;');
    const startTime = performance.now();

    // 1. Add 47 more employees (to reach 50 total)
    this.generateEmployees(47);
    
    // 2. Generate 300 Clients
    this.generateClients(300);

    // 3. Financial Ledger
    this.generateFinancialLedger();

    // 4. Persistence
    this.commitToStorage();

    const endTime = performance.now();
    console.log(`✅ Simulation Complete in ${(endTime - startTime).toFixed(2)}ms`);
    console.table({
      'Clients': this.clients.length,
      'Users': this.users.length,
      'Invoices': this.invoices.length,
      'Active Sessions': 'Sarah Chen (EMP001), Admin User (ADM001)'
    });
  }

  private generateEmployees(count: number) {
    for (let i = 0; i < count; i++) {
      const fName = randomItem(FIRST_NAMES);
      const lName = randomItem(LAST_NAMES);
      this.users.push({
        id: `u-sim-${i}`,
        firstName: fName,
        lastName: lName,
        name: `${fName} ${lName}`,
        email: `${fName.toLowerCase()}${i}@nexus-sim.in`,
        password: hashPassword('password123'),
        role: UserRole.EMPLOYEE,
        employeeId: `SIM${100 + i}`,
        status: UserStatus.ACTIVE,
        isDeleted: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }
  }

  private generateClients(count: number) {
    const employees = this.users.filter(u => u.role === UserRole.EMPLOYEE);
    
    for (let i = 0; i < count; i++) {
      const fName = randomItem(FIRST_NAMES);
      const lName = randomItem(LAST_NAMES);
      const assignedEmp = randomItem(employees); // Will include Sarah Chen!
      const id = `c-sim-${i}`;

      this.clients.push({
        id,
        name: `${fName} ${lName}`,
        mobile: `+91 ${randomRange(7000, 9999)}${randomRange(100000, 999999)}`,
        companyName: `${randomItem(COMPANIES)} Staging`,
        companyAddress: 'Industrial Zone, Sector 4, Mumbai',
        email: `client${i}@example.com`,
        status: ClientStatus.ACTIVE,
        stage: randomItem(Object.values(ClientStage)),
        assignedToId: assignedEmp.id,
        assignedToName: assignedEmp.name,
        createdByEmployeeId: assignedEmp.id,
        isArchived: Math.random() > 0.9,
        isDeleted: false,
        createdAt: new Date().toISOString()
      });
    }
  }

  private generateFinancialLedger() {
    this.clients.forEach(client => {
      const amount = randomRange(5, 100) * 1000;
      const invoice: BillingItem = {
        id: `inv-sim-${client.id}`,
        clientId: client.id,
        serviceName: 'Consulting Services',
        description: 'Synthetic load test record.',
        amountToCollect: amount,
        paidAmount: Math.random() > 0.5 ? amount : 0,
        remainingAmount: 0, // Calculated in real store summary
        status: 'PAID',
        billingDate: '2024-01-01',
        dueDate: '2024-02-01',
        createdBy: 'System',
        createdAt: new Date().toISOString()
      };
      invoice.remainingAmount = invoice.amountToCollect - invoice.paidAmount;
      invoice.status = invoice.remainingAmount === 0 ? 'PAID' : invoice.paidAmount > 0 ? 'PARTIAL' : 'UNPAID';
      this.invoices.push(invoice);
    });
  }

  private commitToStorage() {
    const state = {
      version: CRM_SCHEMA_VERSION,
      users: this.users,
      clients: this.clients,
      billingItems: this.invoices,
      paymentsReceived: [],
      activity: [],
      followups: [],
      notes: [],
      backups: []
    };
    localStorage.setItem(CRM_STORAGE_KEY, JSON.stringify(state));
    // Trigger storage event for current tab as well
    window.dispatchEvent(new Event('storage'));
  }
}

export const dataSimulator = new DataSimulator();
