import React, { useState, useEffect } from 'react';
import { apiService } from '../../../services/apiService';
import { authService } from '../../../services/authService';
import { Badge } from '../../../components/ui/Badge';
import { UserRole } from '../../../types';
import { useToast } from '../../../components/layout/AppLayout';
import { Modal } from '../../../components/ui/Modal';
import { Loader } from '../../../components/ui/Loader';

export const TrashPage: React.FC = () => {
  const user = authService.getCurrentUser()!;
  const isAdmin = user.role === UserRole.ADMIN;
  const { showToast } = useToast();
  
  const [activeTab, setActiveTab] = useState<'CLIENTS' | 'EMPLOYEES'>('CLIENTS');
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [purgeId, setPurgeId] = useState<{id: string | number, type: 'CLIENT' | 'EMPLOYEE'} | null>(null);

  useEffect(() => {
    loadTrash();
  }, [activeTab]);

  const loadTrash = async () => {
    setIsLoading(true);
    try {
      const data = await apiService.getTrash(activeTab);
      setItems(data);
    } catch (err) {
      showToast("Could not fetch trash repository", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestore = async (id: string | number, type: 'CLIENT' | 'EMPLOYEE') => {
    try {
      await apiService.restoreFromTrash(id as string, type);
      showToast(`${type} record restored successfully`);
      loadTrash();
    } catch (err) {
      showToast("Restoration failed", "error");
    }
  };

  const handleConfirmPurge = async () => {
    if (!purgeId) return;
    try {
      await apiService.permanentDelete(purgeId.id as string, purgeId.type);
      showToast('Record permanently scrubbed', 'error');
      loadTrash();
    } catch (err) {
      showToast("Purge operation failed", "error");
    }
    setPurgeId(null);
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
              Partner Archive
              {activeTab === 'CLIENTS' && <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-600 rounded-full" />}
            </button>
            <button 
              onClick={() => setActiveTab('EMPLOYEES')}
              className={`pb-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative ${activeTab === 'EMPLOYEES' ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Inactive Staff
              {activeTab === 'EMPLOYEES' && <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-600 rounded-full" />}
            </button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
        {isLoading ? <Loader size="lg" /> : (
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-8 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  {activeTab === 'CLIENTS' ? 'Client Identity' : 'Staff Name'}
                </th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Details</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map(item => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-8 py-5 font-bold text-slate-900">
                    {activeTab === 'CLIENTS' ? item.name : `${item.first_name || ''} ${item.last_name || ''}`}
                  </td>
                  <td className="px-8 py-5 text-sm text-slate-500 font-medium">
                    {activeTab === 'CLIENTS' ? item.company_name : <Badge color="gray">{item.employee_id}</Badge>}
                  </td>
                  <td className="px-8 py-5 text-right space-x-6">
                    <button 
                      onClick={() => handleRestore(item.id, activeTab === 'CLIENTS' ? 'CLIENT' : 'EMPLOYEE')} 
                      className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:text-indigo-800 transition-all"
                    >
                      Restore
                    </button>
                    <button 
                      onClick={() => setPurgeId({id: item.id, type: activeTab === 'CLIENTS' ? 'CLIENT' : 'EMPLOYEE'})} 
                      className="text-[10px] font-black text-rose-500 uppercase tracking-widest hover:text-rose-700 transition-all"
                    >
                      Purge
                    </button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr><td colSpan={3} className="px-8 py-24 text-center text-slate-400 font-bold italic">Trash repository is empty.</td></tr>
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
        message="This will permanently delete the record from the database. This action is irreversible."
        confirmLabel="Confirm Purge"
        isDestructive={true}
      />
    </div>
  );
};