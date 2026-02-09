
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockStore } from '../../../services/mockStore';
import { Badge } from '../../../components/ui/Badge';
import { authService } from '../../../services/authService';
import { Modal } from '../../../components/ui/Modal';
import { useToast } from '../../../components/layout/AppLayout';

export const AdminListPage: React.FC = () => {
  const [admins, setAdmins] = useState(mockStore.getActiveAdmins());
  const [deactivateId, setDeactivateId] = useState<{id: string, name: string} | null>(null);
  const user = authService.getCurrentUser()!;
  const { showToast } = useToast();

  useEffect(() => {
    return mockStore.subscribe(() => setAdmins(mockStore.getActiveAdmins()));
  }, []);

  const handleDeactivate = () => {
    if (deactivateId) {
      if (deactivateId.id === user.id) {
        showToast('Self-deactivation is prohibited for safety.', 'error');
        setDeactivateId(null);
        return;
      }
      mockStore.softDeleteUser(deactivateId.id, user);
      showToast('Administrator privileges revoked.', 'info');
      setDeactivateId(null);
    }
  };
  
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Privileged Accounts</h2>
          <p className="text-sm text-slate-500 font-medium">Manage system administrators and high-level platform access.</p>
        </div>
        <Link to="/app/admins/new" className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-600 transition-all flex items-center gap-2 shadow-lg text-sm">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
          <span>Create Admin</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {admins.map(emp => (
          <div key={emp.id} className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:border-indigo-300 transition-all group flex flex-col justify-between min-h-[220px]">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-400 border border-indigo-100 font-black uppercase shadow-inner">
                  {emp.firstName.charAt(0)}{emp.lastName.charAt(0)}
                </div>
                <div className="flex gap-2">
                   {emp.id === user.id && <Badge color="green">Active Session</Badge>}
                   <Badge color="red">{emp.employeeId}</Badge>
                </div>
              </div>
              
              <h4 className="text-xl font-bold text-slate-900 mb-1">{emp.firstName} {emp.lastName}</h4>
              <p className="text-sm text-slate-500 font-medium">{emp.email || 'Internal Identifier'}</p>
            </div>
            
            <div className="flex items-center gap-4 pt-6 border-t border-slate-50">
               <Link to={`/app/admins/${emp.id}/edit`} className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:text-indigo-800 transition-colors">Settings</Link>
               {emp.id !== user.id && (
                  <>
                    <div className="w-1 h-1 bg-slate-200 rounded-full"></div>
                    <button 
                        onClick={() => setDeactivateId({id: emp.id, name: emp.name})}
                        className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-red-600 transition-colors"
                    >
                      Revoke Access
                    </button>
                  </>
               )}
            </div>
          </div>
        ))}
      </div>

      <Modal 
        isOpen={!!deactivateId}
        onClose={() => setDeactivateId(null)}
        onConfirm={handleDeactivate}
        title="Revoke Administrator Rights"
        message={`Are you sure you want to strip ${deactivateId?.name} of all administrative privileges? This action is immediate and will be logged in the system audit trail.`}
        confirmLabel="Confirm Revocation"
        isDestructive={true}
      />
    </div>
  );
};
