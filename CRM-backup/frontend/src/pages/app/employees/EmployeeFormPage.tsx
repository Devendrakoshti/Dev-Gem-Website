
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { User, IdCard, Lock, Mail, Shield, Activity } from 'lucide-react';
import { userService } from '../../../services/userService';
import { mockStore } from '../../../services/mockStore';
import { USE_DEMO_AUTH } from '../../../config/appConfig';
import { UserRole, UserStatus } from '../../../types';
import { authService } from '../../../services/authService';

export const EmployeeFormPage: React.FC = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const currentUser = authService.getCurrentUser();

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
  const [error, setError] = useState('');

  useEffect(() => {
    const loadUser = async () => {
      if (!isEdit) {
        const roleParam = searchParams.get('role');
        if (roleParam === 'ADMIN') {
          setFormData(prev => ({ ...prev, role: UserRole.ADMIN }));
        } else if (roleParam === 'EMPLOYEE') {
          setFormData(prev => ({ ...prev, role: UserRole.EMPLOYEE }));
        }
        return;
      }

      try {
        const user = await userService.getUserById(id!);
        if (user) {
          setFormData({
            firstName: user.firstName || (user as any).first_name,
            lastName: user.lastName || (user as any).last_name,
            employeeId: user.employeeId || (user as any).employee_id,
            password: '',
            role: user.role,
            email: user.email || '',
            status: user.status || UserStatus.ACTIVE
          });
        }
      } catch (err: any) {
        setError(err.message);
      }
    };

    loadUser();
  }, [id, isEdit, searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    setError('');
    setIsLoading(true);

    try {
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
        await userService.updateUser(id!, payload);
      } else {
        await userService.createEmployee(payload);
      }
      setIsLoading(false);
      navigate('/app/employees');
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{isEdit ? 'Update Staff Permissions' : 'Onboard New Staff'}</h2>
        <p className="text-slate-500 mt-2 font-medium">Configure secure platform credentials and corporate identity.</p>
      </div>

      {error && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-2xl font-bold flex items-center gap-3">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-xl shadow-slate-100 space-y-8">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">First Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  required
                  className="w-full pl-12 pr-5 py-3.5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium bg-slate-50/50"
                  value={formData.firstName}
                  onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                  placeholder="John"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Last Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  required
                  className="w-full pl-12 pr-5 py-3.5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium bg-slate-50/50"
                  value={formData.lastName}
                  onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                  placeholder="Doe"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Employee ID (Must be Unique)</label>
            <div className="relative">
              <IdCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                required
                className="w-full pl-12 pr-5 py-3.5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium bg-slate-50/50"
                value={formData.employeeId}
                onChange={e => setFormData({ ...formData, employeeId: e.target.value })}
                placeholder="e.g. EMP005"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">
              {isEdit ? 'New Password (Leave blank to keep current)' : 'Access Password'}
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                required={!isEdit}
                type="text"
                className="w-full pl-12 pr-5 py-3.5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium bg-slate-50/50"
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
                placeholder={isEdit ? '••••••••' : 'password123'}
              />
            </div>
            {!isEdit && <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-widest">Default: password123</p>}
          </div>

          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Corporate Email (Optional)</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="email"
                className="w-full pl-12 pr-5 py-3.5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 transition-all font-medium bg-slate-50/50"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                placeholder="name@company.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">User Role</label>
            <div className="relative">
              <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              <select
                className="w-full pl-12 pr-5 py-3.5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium bg-slate-50/50 appearance-none"
                value={formData.role}
                onChange={e => setFormData({ ...formData, role: e.target.value as UserRole })}
              >
                <option value={UserRole.EMPLOYEE}>Employee</option>
                <option value={UserRole.ADMIN}>Administrator</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Account Status</label>
            <div className="relative">
              <Activity className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              <select
                className="w-full pl-12 pr-5 py-3.5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium bg-slate-50/50 appearance-none"
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value as UserStatus })}
              >
                <option value={UserStatus.ACTIVE}>Active</option>
                <option value={UserStatus.SUSPENDED}>Suspended</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button type="button" onClick={() => navigate(-1)} className="flex-1 bg-white border border-slate-200 text-slate-600 font-bold py-4 rounded-2xl hover:bg-slate-50 transition-all">Cancel</button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-indigo-600 transition-all shadow-lg disabled:opacity-50"
          >
            {isLoading ? 'Authorizing...' : isEdit ? 'Save Changes' : 'Grant Access'}
          </button>
        </div>
      </form>
    </div>
  );
};
