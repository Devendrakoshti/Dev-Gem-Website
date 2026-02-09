
import React, { useState, useEffect } from 'react';
import { clientService } from '../../../services/clientService';
import { authService } from '../../../services/authService';
import { Badge } from '../../../components/ui/Badge';
import { UserRole, Client, User } from '../../../types';
import { useToast } from '../../../components/layout/AppLayout';
import { Modal } from '../../../components/ui/Modal';

export const TrashPage: React.FC = () => {
  const user = authService.getCurrentUser()!;
  const isAdmin = user.role === UserRole.ADMIN;
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'CLIENTS' | 'EMPLOYEES'>('CLIENTS');
  const [deletedClients, setDeletedClients] = useState<Client[]>([]);
  const [deletedEmployees, setDeletedEmployees] = useState<User[]>([]);

  const [purgeId, setPurgeId] = useState<{ id: string, type: 'CLIENT' | 'EMPLOYEE' } | null>(null);

  const fetchData = async () => {
    try {
      const clients = await clientService.getClients('deleted');
      setDeletedClients(clients);
      if (isAdmin) {
        const employees = await clientService.getDeletedEmployees();
        setDeletedEmployees(employees);
      }
    } catch (e: any) {
      showToast(e.message, 'error');
    }
  };

  useEffect(() => {
    fetchData();
  }, [isAdmin, user]);

  const handleRestoreClient = async (id: string) => {
    try {
      await clientService.restoreClient(id);
      showToast('Client restored');
      fetchData();
    } catch (e: any) {
      showToast(e.message, 'error');
    }
  };

  const handleRestoreEmployee = async (id: string) => {
    try {
      await clientService.restoreEmployee(id);
      showToast('Employee access restored');
      fetchData();
    } catch (e: any) {
      showToast(e.message, 'error');
    }
  };

  const handleConfirmPurge = async () => {
    if (!purgeId) return;
    try {
      if (purgeId.type === 'CLIENT') {
        await clientService.forceDeleteClient(purgeId.id);
        showToast('Client deleted forever');
      } else {
        await clientService.forceDeleteEmployee(purgeId.id);
        showToast('Employee deleted forever');
      }
      setPurgeId(null);
      fetchData();
    } catch (e: any) {
      showToast(e.message, 'error');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">System Trash</h2>
            <p className="text-slate-500 font-medium text-sm">Recover soft-deleted records or purge them permanently.</p>
          </div>
          <div className="bg-rose-50 text-rose-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-rose-100">
            Compliance Restricted
          </div>
        </div>

        {isAdmin && (
          <div className="flex gap-8 border-b border-slate-100 mt-8">
            <button
              onClick={() => setActiveTab('CLIENTS')}
              className={`pb-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative ${activeTab === 'CLIENTS' ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Partner Archive ({deletedClients.length})
              {activeTab === 'CLIENTS' && <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-600 rounded-full" />}
            </button>
            <button
              onClick={() => setActiveTab('EMPLOYEES')}
              className={`pb-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative ${activeTab === 'EMPLOYEES' ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Inactive Staff ({deletedEmployees.length})
              {activeTab === 'EMPLOYEES' && <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-600 rounded-full" />}
            </button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
        {activeTab === 'CLIENTS' ? (
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-8 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Client Identity</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Company</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {deletedClients.map(client => (
                <tr key={client.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-8 py-5 font-bold text-slate-900">{client.name}</td>
                  <td className="px-8 py-5 text-sm text-slate-500 font-medium">{client.companyName}</td>
                  <td className="px-8 py-5 text-right space-x-6">
                    <button
                      onClick={() => handleRestoreClient(client.id)}
                      className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:text-indigo-800 transition-all"
                    >
                      Restore
                    </button>
                    <button
                      onClick={() => setPurgeId({ id: client.id, type: 'CLIENT' })}
                      className="text-[10px] font-black text-rose-500 uppercase tracking-widest hover:text-rose-700 transition-all"
                    >
                      Delete Forever
                    </button>
                  </td>
                </tr>
              ))}
              {deletedClients.length === 0 && (
                <tr><td colSpan={3} className="px-8 py-24 text-center text-slate-400 font-bold italic">Trash repository is empty.</td></tr>
              )}
            </tbody>
          </table>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-8 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Staff Name</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Employee ID</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {deletedEmployees.map(emp => (
                <tr key={emp.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-8 py-5 font-bold text-slate-900">{emp.name}</td>
                  <td className="px-8 py-5"><Badge color="gray">{emp.employeeId}</Badge></td>
                  <td className="px-8 py-5 text-right space-x-6">
                    <button
                      onClick={() => handleRestoreEmployee(emp.id)}
                      className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:text-indigo-800 transition-all"
                    >
                      Restore Access
                    </button>
                    <button
                      onClick={() => setPurgeId({ id: emp.id, type: 'EMPLOYEE' })}
                      className="text-[10px] font-black text-rose-500 uppercase tracking-widest hover:text-rose-700 transition-all"
                    >
                      Purge Data
                    </button>
                  </td>
                </tr>
              ))}
              {deletedEmployees.length === 0 && (
                <tr><td colSpan={3} className="px-8 py-24 text-center text-slate-400 font-bold italic">Directory is currently healthy.</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      <Modal
        isOpen={!!purgeId}
        onClose={() => setPurgeId(null)}
        onConfirm={handleConfirmPurge}
        title="Purge Record Permanently"
        message="This will permanently delete the client. This cannot be undone."
        confirmLabel="Confirm Purge"
        isDestructive={true}
      />
    </div>
  );
};
