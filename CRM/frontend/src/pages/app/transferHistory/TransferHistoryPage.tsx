
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, History, ArrowRightLeft, User, Calendar, Eye } from 'lucide-react';
import { dashboardService } from '../../../services/dashboardService';
import { clientService } from '../../../services/clientService';
import { USE_DEMO_AUTH } from '../../../config/appConfig';
import { authService } from '../../../services/authService';
import { UserRole, ActivityLog, Client } from '../../../types';
import { useToast } from '../../../components/layout/ToastContext';
import { mockStore } from '../../../services/mockStore';

type TransferFilter = 'ALL' | 'SENT' | 'RECEIVED';

export const TransferHistoryPage: React.FC = () => {
  const user = authService.getCurrentUser()!;
  const isAdmin = user.role === UserRole.ADMIN;
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [transfers, setTransfers] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<TransferFilter>('ALL');

  const fetchTransfers = async () => {
    setLoading(true);
    try {
      const allLogs = await dashboardService.getActivity();
      const transferLogs = allLogs.filter(l => l.targetType === 'CLIENT_TRANSFER');
      setTransfers(transferLogs);
    } catch (err: any) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransfers();
    if (USE_DEMO_AUTH) {
      return mockStore.subscribe(() => fetchTransfers());
    }
  }, []);

  const filteredTransfers = transfers
    .filter(t => {
      // With live API, t.metadata might contain the clientName directly, or we fall back.
      const clientName = t.metadata?.clientName || 'Unknown Client';
      const fromName = t.metadata?.fromName || 'System';
      const toName = t.metadata?.toName || 'Unknown';

      const matchesSearch =
        clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fromName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        toName.toLowerCase().includes(searchTerm.toLowerCase());

      let matchesFilter = true;
      if (!isAdmin) {
        if (filter === 'SENT') matchesFilter = String(t.metadata?.fromId) === String(user.id);
        if (filter === 'RECEIVED') matchesFilter = String(t.metadata?.toId) === String(user.id);
      }

      return matchesSearch && matchesFilter;
    });

  const handleViewClient = (clientId: string) => {
    navigate(`/app/clients/${clientId}`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex-1 max-w-md w-full relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
            <Search className="w-5 h-5" />
          </span>
          <input
            type="text"
            placeholder="Search clients or staff..."
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
                className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${filter === f ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
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
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Client Name</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">From</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">To</th>
                {isAdmin && <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Performed By</th>}
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTransfers.map((log) => {
                const clientName = log.metadata?.clientName || 'Unknown Client';
                const isMySent = String(log.metadata?.fromId) === String(user.id);
                const isMyReceived = String(log.metadata?.toId) === String(user.id);

                return (
                  <tr key={log.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="text-xs text-slate-400 font-bold uppercase tracking-tighter">
                        {new Date(log.timestamp).toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="font-bold text-slate-900">{clientName}</div>
                    </td>
                    <td className="px-6 py-5">
                      <div className={`text-sm font-medium ${isMySent ? 'text-indigo-600 font-bold' : 'text-slate-600'}`}>
                        {log.metadata?.fromName}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className={`text-sm font-medium ${isMyReceived ? 'text-indigo-600 font-bold' : 'text-slate-600'}`}>
                        {log.metadata?.toName}
                      </div>
                    </td>
                    {isAdmin && (
                      <td className="px-6 py-5">
                        <div className="text-sm text-slate-500">{log.actorName}</div>
                      </td>
                    )}
                    <td className="px-6 py-5 text-right">
                      <button
                        onClick={() => handleViewClient(log.targetId)}
                        className="text-[10px] font-black text-indigo-500 uppercase tracking-widest hover:text-indigo-700 transition-all opacity-0 group-hover:opacity-100"
                      >
                        View Client
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filteredTransfers.length === 0 && (
                <tr>
                  <td colSpan={isAdmin ? 6 : 5} className="px-6 py-20 text-center text-slate-400 italic">
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
