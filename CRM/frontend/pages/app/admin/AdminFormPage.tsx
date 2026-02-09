
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockStore } from '../../../services/mockStore';
import { UserRole } from '../../../types';
import { authService } from '../../../services/authService';
import { useToast } from '../../../components/layout/AppLayout';

export const AdminFormPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const currentUser = authService.getCurrentUser();
  const { showToast } = useToast();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    employeeId: '',
    password: '',
    password_confirmation: '',
    role: UserRole.ADMIN,
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
          password: '',
          password_confirmation: '',
          role: user.role,
          email: user.email || ''
        });
      }
    }
  }, [id, isEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    setError('');

    // Strict Validation Logic
    if (!isEdit && formData.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (formData.password !== formData.password_confirmation) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    await new Promise(r => setTimeout(r, 800)); // Simulate API latency

    try {
      if (isEdit) {
        const updatePayload = { ...formData };
        if (!updatePayload.password) delete (updatePayload as any).password;
        delete (updatePayload as any).password_confirmation;
        
        mockStore.updateUser(id!, updatePayload, currentUser);
        showToast('Administrative account updated successfully.');
        navigate('/app/admins');
      } else {
        const createPayload = { ...formData };
        delete (createPayload as any).password_confirmation;

        mockStore.addUser(createPayload, currentUser);
        showToast('Admin created successfully. For security, please sign in with the new credentials.');
        
        // Specific requirement: Redirect to Login page after success
        setTimeout(() => {
           authService.logout();
           navigate('/login');
        }, 1500);
      }
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{isEdit ? 'Update Root Permissions' : 'Onboard System Admin'}</h2>
        <p className="text-slate-500 mt-2 font-medium">Provision a high-privilege account. Admins can manage employees, backups, and system activity.</p>
      </div>

      {error && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-2xl font-bold flex items-center gap-3 animate-in shake duration-300">
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
                placeholder="Admin"
              />
            </div>
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Last Name</label>
              <input 
                required
                className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium bg-slate-50/50"
                value={formData.lastName}
                onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                placeholder="User"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Corporate Email</label>
            <input 
              required
              type="email"
              className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 transition-all font-medium bg-slate-50/50"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              placeholder="admin@nexus-crm.com"
            />
          </div>

          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">System Identity (Employee ID)</label>
            <input 
              required
              className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium bg-slate-50/50"
              value={formData.employeeId}
              onChange={e => setFormData({ ...formData, employeeId: e.target.value })}
              placeholder="e.g. ROOT-002"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
             <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Password</label>
                <input 
                  required={!isEdit}
                  type="password"
                  className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium bg-slate-50/50"
                  value={formData.password}
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                />
             </div>
             <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Confirm Password</label>
                <input 
                  required={!isEdit}
                  type="password"
                  className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium bg-slate-50/50"
                  value={formData.password_confirmation}
                  onChange={e => setFormData({ ...formData, password_confirmation: e.target.value })}
                  placeholder="••••••••"
                />
             </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button type="button" onClick={() => navigate(-1)} className="flex-1 bg-white border border-slate-200 text-slate-600 font-bold py-4 rounded-2xl hover:bg-slate-50 transition-all">Cancel</button>
          <button 
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-indigo-600 text-white font-bold py-4 rounded-2xl hover:bg-indigo-700 transition-all shadow-lg disabled:opacity-50 flex items-center justify-center gap-3"
          >
            {isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : null}
            <span>{isLoading ? 'Encrypting Account...' : isEdit ? 'Update Root Access' : 'Onboard Administrator'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
