
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { LoginPage } from './pages/auth/LoginPage';
import { DashboardPage } from './pages/app/dashboard/DashboardPage';
import { ClientsListPage } from './pages/app/clients/ClientsListPage';
import { ClientDetailsPage } from './pages/app/clients/ClientDetailsPage';
import { ClientFormPage } from './pages/app/clients/ClientFormPage';
import { EmployeesPage } from './pages/app/employees/EmployeesPage';
import { EmployeeFormPage } from './pages/app/employees/EmployeeFormPage';
import { ActivityLogPage } from './pages/app/activity/ActivityLogPage';
import { BackupPage } from './pages/app/backup/BackupPage';
import { TrashPage } from './pages/app/trash/TrashPage';
import { TransferHistoryPage } from './pages/app/transferHistory/TransferHistoryPage';
import { PendingPaymentsPage } from './pages/app/pendingPayments/PendingPaymentsPage';
import { UserRole } from './types';
import { authService } from './services/authService';

const ProtectedRoute: React.FC<{ children: React.ReactNode, adminOnly?: boolean }> = ({ children, adminOnly = false }) => {
  const isAuthenticated = authService.isAuthenticated();
  const role = authService.getUserRole();

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  
  if (adminOnly && role !== UserRole.ADMIN) {
    return <Navigate to="/app/dashboard" replace />;
  }

  return <AppLayout>{children}</AppLayout>;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        {/* Shared Dashboard */}
        <Route path="/app/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        
        {/* Client Management (Shared) */}
        <Route path="/app/clients" element={<ProtectedRoute><ClientsListPage /></ProtectedRoute>} />
        <Route path="/app/clients/archived" element={<ProtectedRoute><ClientsListPage archived={true} /></ProtectedRoute>} />
        <Route path="/app/clients/new" element={<ProtectedRoute><ClientFormPage /></ProtectedRoute>} />
        <Route path="/app/clients/:id" element={<ProtectedRoute><ClientDetailsPage /></ProtectedRoute>} />
        <Route path="/app/clients/:id/edit" element={<ProtectedRoute><ClientFormPage /></ProtectedRoute>} />
        
        {/* Payments Tracking */}
        <Route path="/app/pending-payments" element={<ProtectedRoute><PendingPaymentsPage /></ProtectedRoute>} />
        
        {/* Transfer History (Shared) */}
        <Route path="/app/transfer-history" element={<ProtectedRoute><TransferHistoryPage /></ProtectedRoute>} />

        {/* Shared Trash */}
        <Route path="/app/trash" element={<ProtectedRoute><TrashPage /></ProtectedRoute>} />
        
        {/* Admin Only Modules */}
        <Route path="/app/employees" element={<ProtectedRoute adminOnly={true}><EmployeesPage /></ProtectedRoute>} />
        <Route path="/app/employees/new" element={<ProtectedRoute adminOnly={true}><EmployeeFormPage /></ProtectedRoute>} />
        <Route path="/app/employees/:id/edit" element={<ProtectedRoute adminOnly={true}><EmployeeFormPage /></ProtectedRoute>} />
        <Route path="/app/activity" element={<ProtectedRoute adminOnly={true}><ActivityLogPage /></ProtectedRoute>} />
        <Route path="/app/backup" element={<ProtectedRoute adminOnly={true}><BackupPage /></ProtectedRoute>} />
        
        {/* Redirection Logic */}
        <Route path="/" element={<Navigate to="/app/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/app/dashboard" replace />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
