import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../../../services/apiService';
import { authService } from '../../../services/authService';
import { UserRole, ActivityLog } from '../../../types';
import { useToast } from '../../../components/layout/AppLayout';
import { Loader } from '../../../components/ui/Loader';

type TransferFilter = 'ALL' | 'SENT' | 'RECEIVED';

export const TransferHistoryPage: React.FC = () => {
  const user = authService.getCurrentUser()!;
  const isAdmin = user.role === UserRole.ADMIN;
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [transfers, setTransfers] = useState<ActivityLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<TransferFilter>('ALL');

  useEffect(() => {
    loadTransfers();
  }, []);

  const loadTransfers = async () => {
    setIsLoading(true);
    try {
      const data = await apiService.getTransferHistory();
      setTransfers(data);
    } catch (err) {
      showToast("Transfer sync failed", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredTransfers = transfers
    .filter(t => {
      const fromName = t.metadata?.from_name || 'System';
      const toName = t.metadata?.to_name || 'Unknown';
      
      const matchesSearch = 
        fromName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        toName.toLowerCase().includes(searchTerm.toLowerCase());

      let matchesFilter = true;
      if (!isAdmin) {
        if (filter === 'SENT') matchesFilter = t.metadata?.from_id === user.id;
        if (filter === 'RECEIVED') matchesFilter = t.metadata?.to_id === user.id;
      }

      return matchesSearch && matchesFilter;
    });

  if (isLoading) return <Loader size="lg" />;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex-1 max-w-md w-full relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </span>
          <input 
            type="text" 
            placeholder="Search transfers..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/50 font-medium text-sm transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {!isAdmin && (
          <div className="flex bg-slate-100 p-1 rounded-xl">
            {(['ALL', 'SENT', 'RECEIVED'] as TransferFilter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${
                  filter === f ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {f === 'ALL' ? 'Everything' : f === 'SENT' ? 'Sent' : 'Received'}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Timestamp</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Entity</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">From</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">To</th>
                {isAdmin && <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Performed By</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTransfers.map((log) => {
                const isMySent = log.metadata?.from_id === user.id;
                const isMyReceived = log.metadata?.to_id === user.id;

                return (
                  <tr key={log.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="text-xs text-slate-400 font-bold uppercase tracking-tighter">
                        {new Date(log.timestamp || log.metadata?.created_at || Date.now()).toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="font-bold text-slate-900">{log.action}</div>
                    </td>
                    <td className="px-6 py-5">
                      <div className={`text-sm font-medium ${isMySent ? 'text-indigo-600 font-bold' : 'text-slate-600'}`}>
                        {log.metadata?.from_name || 'Unknown'}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className={`text-sm font-medium ${isMyReceived ? 'text-indigo-600 font-bold' : 'text-slate-600'}`}>
                        {log.metadata?.to_name || 'Unknown'}
                      </div>
                    </td>
                    {isAdmin && (
                      <td className="px-6 py-5 text-right">
                        <div className="text-sm text-slate-500">{log.metadata?.actor_name || 'System'}</div>
                      </td>
                    )}
                  </tr>
                );
              })}
              {filteredTransfers.length === 0 && (
                <tr>
                  <td colSpan={isAdmin ? 5 : 4} className="px-6 py-20 text-center text-slate-400 italic">
                    No client transfer history found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};