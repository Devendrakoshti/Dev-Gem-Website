
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, ArrowUpDown, ArrowUp, ArrowDown, Users, Eye, Trash2 } from 'lucide-react';
import { mockStore } from '../../../services/mockStore';
import { ClientStatus, ClientStage, UserRole, Client, User } from '../../../types';
import { Badge } from '../../../components/ui/Badge';
import { authService } from '../../../services/authService';
import { useToast } from '../../../components/layout/AppLayout';
import { Modal } from '../../../components/ui/Modal';

type SortKey = 'name' | 'companyName' | 'stage' | 'assignedToName' | 'createdAt';
type SortOrder = 'asc' | 'desc';

export const ClientsListPage: React.FC<{ archived?: boolean }> = ({ archived = false }) => {
  const user = authService.getCurrentUser()!;
  const [clients, setClients] = useState(archived ? mockStore.getArchivedClients(user) : mockStore.getActiveClients(user));
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('ALL');
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; order: SortOrder }>({ key: 'createdAt', order: 'desc' });
  
  // Modals
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [transferClient, setTransferClient] = useState<Client | null>(null);
  const [transferTargetId, setTransferTargetId] = useState<string>('');
  
  const employees = mockStore.getEmployees();
  const { showToast } = useToast();

  // Optimized Debounce
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearchTerm(searchTerm), 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    return mockStore.subscribe(() => {
      setClients(archived ? mockStore.getArchivedClients(user) : mockStore.getActiveClients(user));
    });
  }, [archived, user]);

  const handleDeleteToTrash = (id: string) => {
    mockStore.deleteClientToTrash(id, user);
    showToast('Client moved to Trash repository', 'info');
  };

  const handleTransfer = () => {
    if (!transferClient || !transferTargetId) return;
    try {
      mockStore.transferClient(transferClient.id, transferTargetId, user);
      showToast('Client ownership transferred successfully');
      setTransferClient(null);
      setTransferTargetId('');
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  const handleSort = (key: SortKey) => {
    setSortConfig(prev => ({
      key,
      order: prev.key === key && prev.order === 'asc' ? 'desc' : 'asc'
    }));
  };

  // HIGH PERFORMANCE FILTERING ENGINE
  const filteredAndSortedClients = useMemo(() => {
    const filtered = clients.filter(client => {
      if (stageFilter !== 'ALL' && client.stage !== stageFilter) return false;
      
      if (debouncedSearchTerm) {
        const lowerSearch = debouncedSearchTerm.toLowerCase();
        return (
          client.name.toLowerCase().includes(lowerSearch) || 
          client.mobile.includes(debouncedSearchTerm) ||
          client.companyName.toLowerCase().includes(lowerSearch)
        );
      }
      return true;
    });

    return filtered.sort((a, b) => {
      const aVal = a[sortConfig.key] || '';
      const bVal = b[sortConfig.key] || '';
      if (aVal < bVal) return sortConfig.order === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.order === 'asc' ? 1 : -1;
      return 0;
    });
  }, [clients, debouncedSearchTerm, stageFilter, sortConfig]);

  const SortIcon = ({ column }: { column: SortKey }) => {
    if (sortConfig.key !== column) return <svg className="w-3 h-3 opacity-20" fill="currentColor" viewBox="0 0 20 20"><path d="M5 10l5-5 5 5H5zM5 12l5 5 5-5H5z"/></svg>;
    return sortConfig.order === 'asc' ? 
      <svg className="w-3 h-3 text-indigo-500" fill="currentColor" viewBox="0 0 20 20"><path d="M5 10l5-5 5 5H5z"/></svg> :
      <svg className="w-3 h-3 text-indigo-500" fill="currentColor" viewBox="0 0 20 20"><path d="M5 12l5 5 5-5H5z"/></svg>;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div className="relative flex-1 max-w-md w-full">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
            <Search className="w-5 h-5" />
          </span>
          <input 
            type="text" 
            placeholder="Search within my portfolio..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/50 font-medium text-sm transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <select 
            className="px-4 py-3 rounded-xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/50 text-sm font-bold text-slate-600 shadow-sm transition-all"
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
          >
            <option value="ALL">All Stages</option>
            {Object.values(ClientStage).map(s => <option key={s} value={s}>{s}</option>)}
          </select>

          {!archived && (
            <Link to="/app/clients/new" className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-lg shadow-indigo-100">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
              <span>Onboard Client</span>
            </Link>
          )}
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Mobile Grid View */}
        <div className="grid grid-cols-1 gap-4 p-4 md:hidden">
          {filteredAndSortedClients.slice(0, 100).map(client => (
            <div key={client.id} className="bg-slate-50 border border-slate-100 p-5 rounded-2xl space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-bold text-slate-900 leading-tight">{client.name}</div>
                  <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{client.companyName}</div>
                </div>
                <Badge color={
                  client.stage === ClientStage.CONVERTED ? 'green' : 
                  client.stage === ClientStage.LOST ? 'red' : 
                  client.stage === ClientStage.NEW ? 'blue' : 'indigo'
                }>{client.stage}</Badge>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <div className="flex items-center gap-2">
                   <div className="w-6 h-6 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[10px] font-black text-indigo-600 uppercase">
                      {client.assignedToName.charAt(0)}
                   </div>
                   <span className="text-xs font-bold text-slate-600">{client.assignedToName}</span>
                </div>
                <div className="flex gap-2">
                   <button onClick={() => setTransferClient(client)} className="p-2 text-slate-400 hover:text-indigo-600 transition-all"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg></button>
                   <Link to={`/app/clients/${client.id}`} className="p-2 text-slate-400 hover:text-slate-900 transition-all"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg></Link>
                   <button onClick={() => setDeleteId(client.id)} className="p-2 text-slate-400 hover:text-rose-600 transition-all"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                </div>
              </div>
            </div>
          ))}
          {filteredAndSortedClients.length === 0 && <div className="p-10 text-center text-slate-400 italic font-medium">No results found.</div>}
          {filteredAndSortedClients.length > 100 && <div className="p-4 text-center text-slate-400 text-xs font-medium">Displaying first 100 results for performance. Use search to find specific records.</div>}
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">
                  <button onClick={() => handleSort('name')} className="flex items-center gap-1.5 text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-slate-900 transition-colors">
                    Client & Entity <SortIcon column="name" />
                  </button>
                </th>
                <th className="px-6 py-4">
                  <button onClick={() => handleSort('stage')} className="flex items-center gap-1.5 text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-slate-900 transition-colors">
                    Pipeline <SortIcon column="stage" />
                  </button>
                </th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Owner</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAndSortedClients.slice(0, 200).map(client => (
                <tr key={client.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="font-bold text-slate-900 leading-tight mb-0.5">{client.name}</div>
                    <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{client.companyName}</div>
                  </td>
                  <td className="px-6 py-5">
                    <Badge color={
                      client.stage === ClientStage.CONVERTED ? 'green' : 
                      client.stage === ClientStage.LOST ? 'red' : 
                      client.stage === ClientStage.NEW ? 'blue' : 'indigo'
                    }>{client.stage}</Badge>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                       <div className="w-6 h-6 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[10px] font-black text-indigo-600 uppercase">
                          {client.assignedToName.charAt(0)}
                       </div>
                       <span className="text-xs font-bold text-slate-600">{client.assignedToName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-0 translate-x-1">
                       <button 
                          onClick={() => setTransferClient(client)}
                          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="Transfer Client"
                       >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                       </button>
                       <Link to={`/app/clients/${client.id}/edit`} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="Edit">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-5M18.414 2.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l9.414-9.414z" /></svg>
                       </Link>
                       <Link to={`/app/clients/${client.id}`} className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all" title="View Detail">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                       </Link>
                       <button 
                          onClick={() => setDeleteId(client.id)}
                          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                          title="Move to Trash"
                       >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredAndSortedClients.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-24 text-center">
                    <p className="text-slate-400 font-bold italic text-sm">No clients found matching these criteria.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {filteredAndSortedClients.length > 200 && (
            <div className="p-4 bg-slate-50 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest border-t border-slate-100">
              Only showing top 200 results for speed. Refine your search for more specific results.
            </div>
          )}
        </div>
      </div>

      <Modal 
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => { if(deleteId) handleDeleteToTrash(deleteId); }}
        title="Move to Trash"
        message="This will remove the client from active/archived lists and place them in the system trash. Records will be preserved."
        confirmLabel="Move to Trash"
        isDestructive={true}
      />

      <Modal 
        isOpen={!!transferClient}
        onClose={() => setTransferClient(null)}
        onConfirm={handleTransfer}
        title="Transfer Client Portfolio"
        message={`Assign [${transferClient?.name}] to another executive. You will lose access to this record immediately after transfer.`}
        confirmLabel="Transfer Ownership"
      >
        <div className="mt-6">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Select New Executive</label>
          <select 
            className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-bold text-sm bg-slate-50/50"
            value={transferTargetId}
            onChange={(e) => setTransferTargetId(e.target.value)}
          >
            <option value="">Choose Executive...</option>
            {employees.filter(emp => emp.id !== user.id).map(emp => (
              <option key={emp.id} value={emp.id}>{emp.name} ({emp.employeeId})</option>
            ))}
          </select>
          <div className="mt-6 flex justify-end gap-3">
             <button onClick={() => setTransferClient(null)} className="px-6 py-3 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-100">Cancel</button>
             <button 
                onClick={handleTransfer}
                disabled={!transferTargetId}
                className="px-6 py-3 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg disabled:opacity-50"
             >
                Transfer Now
             </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
