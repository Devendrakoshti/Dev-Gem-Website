import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiService } from '../../../services/apiService';
import { ClientStatus, ClientStage, UserRole, User } from '../../../types';
import { authService } from '../../../services/authService';
import { useToast } from '../../../components/layout/AppLayout';
import { Loader } from '../../../components/ui/Loader';

export const ClientFormPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const currentUser = authService.getCurrentUser() as User;
  const { showToast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    company_name: '',
    company_address: '',
    email: '',
    status: ClientStatus.ACTIVE,
    stage: ClientStage.NEW,
    assigned_to_id: currentUser?.id || '',
    is_archived: false
  });

  const [staffList, setStaffList] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(isEdit);
  const [error, setError] = useState('');

  useEffect(() => {
    const init = async () => {
      try {
        if (currentUser?.role === UserRole.ADMIN) {
          const staff = await apiService.getStaff();
          setStaffList(staff);
        }

        if (isEdit) {
          const client = await apiService.getClientById(id!);
          setFormData({ ...client } as any);
        }
      } catch (err: any) {
        showToast(err.message || "Failed to load record", "error");
        navigate('/app/clients');
      } finally {
        setIsFetching(false);
      }
    };
    init();
  }, [id, isEdit, currentUser, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (isEdit) {
        await apiService.updateClient(id!, formData);
        showToast('Client profile updated');
      } else {
        await apiService.createClient(formData);
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
    setFormData(prev => ({
      ...prev,
      assigned_to_id: e.target.value
    }));
  };

  if (isFetching) return <Loader size="lg" />;

  return (
    <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">{isEdit ? 'Edit Client Profile' : 'Register New Client'}</h2>
          <p className="text-slate-500">Enter business details for the relationship pipeline.</p>
        </div>
        <button onClick={() => navigate(-1)} className="text-slate-500 hover:text-slate-800 font-semibold text-sm">Cancel</button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-600 text-sm rounded-xl flex items-center gap-2 font-bold">
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
              value={formData.company_name}
              onChange={e => setFormData({ ...formData, company_name: e.target.value })}
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

          {currentUser?.role === UserRole.ADMIN && (
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Account Ownership</label>
              <select 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-semibold"
                value={formData.assigned_to_id}
                onChange={handleAssignChange}
              >
                <option value={currentUser.id}>Assign to Self ({currentUser.first_name})</option>
                {staffList.map(emp => (
                  <option key={emp.id} value={emp.id}>{emp.first_name} {emp.last_name}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        <button 
          type="submit"
          disabled={isLoading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg disabled:opacity-50"
        >
          {isLoading ? 'Processing...' : isEdit ? 'Update Client Record' : 'Onboard Client'}
        </button>
      </form>
    </div>
  );
};