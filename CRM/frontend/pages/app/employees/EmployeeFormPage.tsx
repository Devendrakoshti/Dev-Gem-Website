import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiService } from '../../../services/apiService';
import { UserRole, UserStatus } from '../../../types';
import { useToast } from '../../../components/layout/AppLayout';
import { Loader } from '../../../components/ui/Loader';

export const EmployeeFormPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const { showToast } = useToast();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    employeeId: '',
    password: '',
    role: UserRole.EMPLOYEE,
    email: '',
    status: UserStatus.ACTIVE
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(isEdit);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit) {
      const loadUser = async () => {
        try {
          const staff = await apiService.getStaff();
          const user: any = staff.find(u => u.id == id);
          if (user) {
            setFormData({
              firstName: user.first_name || user.firstName || '',
              lastName: user.last_name || user.lastName || '',
              employeeId: user.employee_id || user.employeeId || '',
              password: '', 
              role: user.role,
              email: user.email || '',
              status: user.status || UserStatus.ACTIVE
            });
          }
        } catch (err) {
          showToast("Failed to fetch user data", "error");
        } finally {
          setIsFetching(false);
        }
      };
      loadUser();
    }
  }, [id, isEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Data mapping to match Laravel strict requirements
      const payload: any = {
          first_name: formData.firstName,
          last_name: formData.lastName,
          employee_id: formData.employeeId,
          email: formData.email,
          role: formData.role,
          status: formData.status
      };

      if (formData.password) {
          payload.password = formData.password;
      }

      if (isEdit) {
        await apiService.updateStaff(id!, payload);
        showToast('Staff credentials updated');
      } else {
        if (!payload.password) throw new Error("Password is required for new staff");
        await apiService.createStaff(payload);
        showToast('New staff member onboarded');
      }
      navigate('/app/employees');
    } catch (err: any) {
      setError(err.message);
      showToast(err.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) return <Loader size="lg" />;

  return (
    <div className="max-w-xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{isEdit ? 'Update Staff Permissions' : 'Onboard New Staff'}</h2>
        <p className="text-slate-500 mt-2 font-medium">Configure platform credentials and corporate identity.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-xl shadow-slate-100 space-y-8">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">First Name</label>
              <input required className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium bg-slate-50/50" value={formData.firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Last Name</label>
              <input required className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium bg-slate-50/50" value={formData.lastName} onChange={e => setFormData({ ...formData, lastName: e.target.value })} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Email Address</label>
              <input required type="email" className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium bg-slate-50/50" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Employee ID</label>
              <input required className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium bg-slate-50/50" value={formData.employeeId} onChange={e => setFormData({ ...formData, employeeId: e.target.value })} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">{isEdit ? 'New Password (Optional)' : 'Access Password'}</label>
            <input required={!isEdit} type="password" placeholder="••••••••" className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium bg-slate-50/50" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} />
          </div>

          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">User Role</label>
            <select className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium bg-slate-50/50" value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value as UserRole })}>
              <option value={UserRole.EMPLOYEE}>Employee</option>
              <option value={UserRole.ADMIN}>Administrator</option>
            </select>
          </div>
        </div>

        <div className="flex gap-4">
          <button type="button" onClick={() => navigate(-1)} className="flex-1 bg-white border border-slate-200 text-slate-600 font-bold py-4 rounded-2xl">Cancel</button>
          <button type="submit" disabled={isLoading} className="flex-1 bg-slate-900 text-white font-bold py-4 rounded-2xl shadow-lg disabled:opacity-50">
            {isLoading ? 'Processing...' : 'Save Record'}
          </button>
        </div>
      </form>
    </div>
  );
};