
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { clientService } from '../../../services/clientService';
import { ClientStatus, ClientStage, UserRole, User } from '../../../types';
import { authService } from '../../../services/authService';
import { useToast } from '../../../components/layout/AppLayout';

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
    // Load employees for assignment
    if (currentUser?.role === UserRole.ADMIN) {
      clientService.getAssignableUsers().then(setEmployees).catch(console.error);
    }

    if (isEdit) {
      setIsLoading(true);
      clientService.getClientById(id!).then(client => {
        if (client) {
          if (currentUser?.role !== UserRole.ADMIN && client.assignedToId !== currentUser?.id) {
            showToast("Permission denied: You can only edit your own clients.", "error");
            navigate('/app/clients');
            return;
          }
          // Ensure status/stage are cast correctly if needed
          setFormData({
            ...client,
            status: client.status as ClientStatus,
            stage: client.stage as ClientStage
          });
        } else {
          showToast("Client not found", "error");
          navigate('/app/clients');
        }
      }).catch(err => {
        showToast("Failed to load client: " + err.message, "error");
        navigate('/app/clients');
      }).finally(() => setIsLoading(false));
    }
  }, [id, isEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    setError('');

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
      setError(err.message || "Failed to save client.");
      showToast("Operation failed", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAssignChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const empId = e.target.value;
    const emp = employees.find(u => u.id === empId) || (empId === currentUser?.id ? currentUser : null);
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
            <input
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 transition-all outline-none bg-slate-50/30"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Robert Deniro"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Email Address</label>
            <input
              required
              type="email"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 transition-all outline-none bg-slate-50/30"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Mobile Number</label>
            <input
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 transition-all outline-none bg-slate-50/30"
              value={formData.mobile}
              onChange={e => setFormData({ ...formData, mobile: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Company Name</label>
            <input
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 transition-all outline-none bg-slate-50/30"
              value={formData.companyName}
              onChange={e => setFormData({ ...formData, companyName: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Pipeline Stage</label>
            <select
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 transition-all outline-none bg-slate-50/30"
              value={formData.stage}
              onChange={e => setFormData({ ...formData, stage: e.target.value as ClientStage })}
            >
              {Object.values(ClientStage).map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Business Address</label>
            <textarea
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 transition-all outline-none bg-slate-50/30"
              value={formData.companyAddress}
              onChange={e => setFormData({ ...formData, companyAddress: e.target.value })}
            />
          </div>

          {currentUser?.role === UserRole.ADMIN && (
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Account Ownership</label>
              <select
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 transition-all outline-none bg-slate-50/30 font-semibold"
                value={formData.assignedToId}
                onChange={handleAssignChange}
              >
                <option value={currentUser.id}>Assign to Self ({currentUser.name})</option>
                {employees.map(emp => (
                  <option key={emp.id} value={emp.id}>{emp.name}</option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Relationship Status</label>
            <select
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 transition-all outline-none bg-slate-50/30"
              value={formData.status}
              onChange={e => setFormData({ ...formData, status: e.target.value as ClientStatus })}
            >
              <option value={ClientStatus.ACTIVE}>Active Partner</option>
              <option value={ClientStatus.INACTIVE}>Inactive</option>
            </select>
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
