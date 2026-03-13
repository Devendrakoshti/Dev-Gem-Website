
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userService } from '../../../services/userService';
import { mockStore } from '../../../services/mockStore';
import { USE_DEMO_AUTH } from '../../../config/appConfig';
import { Badge } from '../../../components/ui/Badge';
import { authService } from '../../../services/authService';
import { Modal } from '../../../components/ui/Modal';
import { useToast } from '../../../components/layout/ToastContext';

export const EmployeesPage: React.FC = () => {
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deactivateId, setDeactivateId] = useState<{ id: string, name: string } | null>(null);
  const user = authService.getCurrentUser()!;
  const { showToast } = useToast();

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const data = await userService.getUsers();
      setEmployees(data);
    } catch (err: any) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
    if (USE_DEMO_AUTH) {
      return mockStore.subscribe(() => fetchEmployees());
    }
  }, []);

  const handleDeactivate = async () => {
    if (deactivateId) {
      try {
        await userService.softDeleteUser(deactivateId.id);
        showToast('Employee access revoked and moved to Trash', 'info');
        fetchEmployees();
        setDeactivateId(null);
      } catch (err: any) {
        showToast(err.message, 'error');
      }
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Corporate Directory</h2>
          <p className="text-sm text-slate-500 font-medium">Manage corporate identity and platform access.</p>
        </div>
        <Link to="/app/employees/new" className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-600 transition-all flex items-center gap-2 shadow-lg text-sm">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
          <span>Register Staff</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map(emp => (
          <div key={emp.id} className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:border-indigo-300 transition-all group flex flex-col justify-between min-h-[220px]">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 border border-slate-100 font-black uppercase shadow-inner">
                  {emp.firstName.charAt(0)}{emp.lastName.charAt(0)}
                </div>
                <Badge color="indigo">{emp.employeeId}</Badge>
              </div>

              <h4 className="text-xl font-bold text-slate-900 mb-1">{emp.firstName} {emp.lastName}</h4>
              <p className="text-sm text-slate-500 font-medium">{emp.email || 'Internal Identifier'}</p>
            </div>

            <div className="flex items-center gap-4 pt-6 border-t border-slate-50">
              <Link to={`/app/employees/${emp.id}/edit`} className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:text-indigo-800 transition-colors">Modify Access</Link>
              <div className="w-1 h-1 bg-slate-200 rounded-full"></div>
              <button
                onClick={() => setDeactivateId({ id: emp.id, name: emp.name })}
                className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-red-600 transition-colors"
              >
                Deactivate
              </button>
            </div>
          </div>
        ))}
        {employees.length === 0 && (
          <div className="col-span-full py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-300 text-center">
            <p className="text-slate-400 font-bold italic">No active employees found.</p>
          </div>
        )}
      </div>

      <Modal
        isOpen={!!deactivateId}
        onClose={() => setDeactivateId(null)}
        onConfirm={handleDeactivate}
        title="Revoke Staff Access"
        message={`Are you sure you want to deactivate ${deactivateId?.name}? Access to the CRM will be immediately terminated. Records will be preserved in System Trash.`}
        confirmLabel="Deactivate Staff"
        isDestructive={true}
      />
    </div>
  );
};
