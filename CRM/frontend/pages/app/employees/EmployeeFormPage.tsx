
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockStore } from '../../../services/mockStore';
import { UserRole } from '../../../types';
import { authService } from '../../../services/authService';

export const EmployeeFormPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  // Get the current user to pass as an actor for auditing
  const currentUser = authService.getCurrentUser();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    employeeId: '',
    password: 'password123',
    role: UserRole.EMPLOYEE,
    email: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit) {
      const user = mockStore.getUserById(id!);
      if (user) {
        setFormData({
          firstName: user.firstName,
          lastName: user.lastName,
          employeeId: user.employeeId,
          password: user.password || 'password123',
          role: user.role,
          email: user.email || ''
        });
      }
    }
  }, [id, isEdit]);

  // Pass the currentUser as the actor for auditing in mockStore
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    setError('');
    setIsLoading(true);
    
    await new Promise(r => setTimeout(r, 600));

    try {
      if (isEdit) {
        // Corrected: passing currentUser as the required actor argument
        mockStore.updateUser(id!, formData, currentUser);
      } else {
        // Corrected: passing currentUser as the required actor argument
        mockStore.addUser(formData, currentUser);
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
              <input 
                required
                className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium bg-slate-50/50"
                value={formData.firstName}
                onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                placeholder="John"
              />
            </div>
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Last Name</label>
              <input 
                required
                className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium bg-slate-50/50"
                value={formData.lastName}
                onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                placeholder="Doe"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Employee ID (Must be Unique)</label>
            <input 
              required
              className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium bg-slate-50/50"
              value={formData.employeeId}
              onChange={e => setFormData({ ...formData, employeeId: e.target.value })}
              placeholder="e.g. EMP005"
            />
          </div>

          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Access Password</label>
            <input 
              required
              type="text" // Shown as text for demo convenience, typically password
              className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium bg-slate-50/50"
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
            />
            <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-widest">Default: password123</p>
          </div>
          
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Corporate Email (Optional)</label>
            <input 
              type="email"
              className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 transition-all font-medium bg-slate-50/50"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              placeholder="name@company.com"
            />
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
