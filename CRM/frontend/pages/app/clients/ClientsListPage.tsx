import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { apiService } from '../../../services/apiService';
import { ClientStage, Client } from '../../../types';
import { Badge } from '../../../components/ui/Badge';
import { useToast } from '../../../components/layout/AppLayout';
import { Modal } from '../../../components/ui/Modal';
import { Loader } from '../../../components/ui/Loader';

interface ClientsListPageProps {
  archived?: boolean;
}

export const ClientsListPage: React.FC<ClientsListPageProps> = ({ archived = false }) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('ALL');
  const [deleteId, setDeleteId] = useState<string | number | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    setIsLoading(true);
    try {
      const data = await apiService.getClients(archived);
      setClients(data);
    } catch (err) {
      showToast('Failed to load portfolio', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await apiService.deleteClient(deleteId as string);
      showToast('Client record deleted');
      loadClients();
    } catch (err) {
      showToast('Action failed', 'error');
    }
    setDeleteId(null);
  };

  const filteredClients = useMemo(() => {
    return clients.filter(c => {
      const matchesArchive = !!c.is_archived === !!archived;
      const matchesStage = stageFilter === 'ALL' || c.stage === stageFilter;
      const matchesSearch = c.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            c.company_name?.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesArchive && matchesStage && matchesSearch;
    });
  }, [clients, searchTerm, stageFilter, archived]);

  if (isLoading) return <Loader size="lg" />;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div className="relative flex-1 max-w-md w-full">
          <input 
            type="text" 
            placeholder={archived ? "Search within archived partners..." : "Search within my portfolio..."}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/50 font-medium text-sm transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-3">
          <select 
            className="px-4 py-3 rounded-xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/50 text-sm font-bold text-slate-600 shadow-sm"
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
          >
            <option value="ALL">All Stages</option>
            {Object.values(ClientStage).map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          {!archived && <Link to="/app/clients/new" className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-indigo-100">Onboard</Link>}
          {archived ? 
             <Link to="/app/clients" className="bg-slate-100 text-slate-700 px-6 py-3 rounded-xl font-bold border border-slate-200">Active Portfolio</Link> :
             <Link to="/app/clients/archived" className="bg-slate-100 text-slate-700 px-6 py-3 rounded-xl font-bold border border-slate-200">View Archives</Link>
          }
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Client & Entity</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Pipeline</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredClients.map(client => (
              <tr key={client.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-5">
                  <div className="font-bold text-slate-900 leading-tight mb-0.5">{client.name}</div>
                  <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{client.company_name}</div>
                </td>
                <td className="px-6 py-5">
                  <Badge color="indigo">{client.stage}</Badge>
                </td>
                <td className="px-6 py-5 text-right">
                  <div className="flex justify-end gap-1">
                    <Link to={`/app/clients/${client.id}`} className="p-2 text-slate-400 hover:text-indigo-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg></Link>
                    <button onClick={() => setDeleteId(client.id)} className="p-2 text-slate-400 hover:text-rose-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredClients.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-20 text-center text-slate-400 italic">No {archived ? 'archived' : 'active'} clients found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal 
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Record"
        message="Are you sure? This action is permanent."
        confirmLabel="Confirm"
        isDestructive={true}
      />
    </div>
  );
};