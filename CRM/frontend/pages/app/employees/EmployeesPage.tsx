import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiService } from '../../../services/apiService';
import { Badge } from '../../../components/ui/Badge';
import { Modal } from '../../../components/ui/Modal';
import { useToast } from '../../../components/layout/AppLayout';
import { Loader } from '../../../components/ui/Loader';

export const EmployeesPage: React.FC = () => {
  const [employees, setEmployees] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deactivateId, setDeactivateId] = useState<{id: string, name: string} | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await apiService.getStaff();
      setEmployees(data);
    } catch (err: any) {
      showToast(err.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeactivate = async () => {
    if (deactivateId) {
      try {
        await apiService.deleteStaff(deactivateId.id);
        showToast('Access revoked');
        loadData();
      } catch (err: any) {
        showToast(err.message, 'error');
      }
      setDeactivateId(null);
    }
  };
  
  if (isLoading) return <Loader size="lg" />;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold">Staff Directory</h2>
          <p className="text-sm text-slate-500">Manage corporate identity and platform access.</p>
        </div>
        <Link to="/app/employees/new" className="bg-slate-900 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg">Register Staff</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map(emp => {
          const fName = emp.first_name || emp.firstName || 'U';
          const lName = emp.last_name || emp.lastName || '';
          const empId = emp.employee_id || emp.employeeId || '';
          
          return (
          <div key={emp.id} className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:border-indigo-300 transition-all flex flex-col justify-between min-h-[200px]">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center font-black uppercase text-slate-400 border border-slate-100">
                  {fName.charAt(0)}{lName.charAt(0)}
                </div>
                <Badge color="indigo">{empId}</Badge>
              </div>
              <h4 className="text-xl font-bold">{fName} {lName}</h4>
              <p className="text-xs text-slate-500 font-medium">{emp.email}</p>
            </div>
            
            <div className="flex items-center gap-4 pt-6 border-t border-slate-50">
               <Link to={`/app/employees/${emp.id}/edit`} className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Edit</Link>
               <button onClick={() => setDeactivateId({id: emp.id, name: `${fName} ${lName}`})} className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-red-500">Revoke</button>
            </div>
          </div>
        )})}
      </div>

      <Modal isOpen={!!deactivateId} onClose={() => setDeactivateId(null)} onConfirm={handleDeactivate} title="Revoke Access" message={`Terminate access for ${deactivateId?.name}?`} confirmLabel="Deactivate" isDestructive={true} />
    </div>
  );
};