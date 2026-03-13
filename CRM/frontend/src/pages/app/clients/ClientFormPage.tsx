
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { User as UserIcon, Mail, Phone, Building2, BarChart3, MapPin, UserCheck, Activity } from 'lucide-react';
import { clientService } from '../../../services/clientService';
import { userService } from '../../../services/userService';
import { USE_DEMO_AUTH } from '../../../config/appConfig';
import { ClientStatus, ClientStage, UserRole, User } from '../../../types';
import { authService } from '../../../services/authService';
import { useToast } from '../../../components/layout/ToastContext';
import { mockStore } from '../../../services/mockStore';

export const ClientFormPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const currentUser = authService.getCurrentUser();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    companyName: '',
    companyAddress: '',
    email: '',
    status: ClientStatus.ACTIVE,
    stage: ClientStage.NEW,
    assignedToId: currentUser?.id || '',
    assignedToName: currentUser?.name || '',
    isArchived: false
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [employees, setEmployees] = useState<User[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const emps = await userService.getEmployees();
        setEmployees(emps);

        if (isEdit) {
          const client = await clientService.getClientById(id!);
          if (client) {
            if (currentUser?.role !== UserRole.ADMIN && client.assignedToId !== currentUser?.id) {
              showToast("Permission denied: You can only edit your own clients.", "error");
              navigate('/app/clients');
              return;
            }
            setFormData({ ...client });
          }
        }
      } catch (err: any) {
        showToast(err.message, 'error');
      }
    };
    loadData();
  }, [id, isEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    setError('');

    // Duplicate Check (P1) - Still using mockStore logic for now if in demo
    if (USE_DEMO_AUTH) {
      const duplicate = mockStore.isDuplicateClient(formData.email, formData.mobile, id);
      if (duplicate) {
        setError(`A client with this ${duplicate.type} already exists in the system.`);
        showToast(`Duplicate ${duplicate.type} detected.`, 'error');
        return;
      }
    }

    setIsLoading(true);
    try {
      if (isEdit) {
        await clientService.updateClient(id!, formData);
        showToast('Client profile updated');
      } else {
        await clientService.createClient(formData);
        showToast('New client registered');
      }
      navigate('/app/clients');
    } catch (err: any) {
      setError(err.message);
      showToast(err.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAssignChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const empId = e.target.value;
    const emp = employees.find(u => u.id === empId);
    setFormData(prev => ({
      ...prev,
      assignedToId: empId,
      assignedToName: emp?.name || ''
    }));
  };

  return (
    <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">{isEdit ? 'Edit Client Profile' : 'Register New Client'}</h2>
          <p className="text-slate-500">Enter comprehensive business details for the relationship pipeline.</p>
        </div>
        <button onClick={() => navigate(-1)} className="text-slate-500 hover:text-slate-800 font-semibold text-sm">Cancel</button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-600 text-sm rounded-xl flex items-center gap-2 font-bold animate-in fade-in zoom-in-95">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Full Client Name</label>
            <div className="relative">
              <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                required
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 transition-all outline-none bg-slate-50/30"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Robert Deniro"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                required
                type="email"
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 transition-all outline-none bg-slate-50/30"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Mobile Number</label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                required
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 transition-all outline-none bg-slate-50/30"
                value={formData.mobile}
                onChange={e => setFormData({ ...formData, mobile: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Company Name</label>
            <div className="relative">
              <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                required
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 transition-all outline-none bg-slate-50/30"
                value={formData.companyName}
                onChange={e => setFormData({ ...formData, companyName: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Pipeline Stage</label>
            <div className="relative">
              <BarChart3 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              <select
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 transition-all outline-none bg-slate-50/30 appearance-none"
                value={formData.stage}
                onChange={e => setFormData({ ...formData, stage: e.target.value as ClientStage })}
              >
                {Object.values(ClientStage).map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Business Address</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
              <textarea
                rows={3}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 transition-all outline-none bg-slate-50/30"
                value={formData.companyAddress}
                onChange={e => setFormData({ ...formData, companyAddress: e.target.value })}
              />
            </div>
          </div>

          {currentUser?.role === UserRole.ADMIN && (
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Account Ownership</label>
              <div className="relative">
                <UserCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                <select
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 transition-all outline-none bg-slate-50/30 font-semibold appearance-none"
                  value={formData.assignedToId}
                  onChange={handleAssignChange}
                >
                  <option value={currentUser.id}>Assign to Self ({currentUser.name})</option>
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.id}>{emp.name}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Relationship Status</label>
            <div className="relative">
              <Activity className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              <select
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 transition-all outline-none bg-slate-50/30 appearance-none"
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value as ClientStatus })}
              >
                <option value={ClientStatus.ACTIVE}>Active Partner</option>
                <option value={ClientStatus.INACTIVE}>Inactive</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-indigo-200 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading && <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
            <span>{isLoading ? 'Processing Record...' : isEdit ? 'Update Client Record' : 'Onboard Client'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
