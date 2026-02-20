import React, { useState, useEffect } from 'react';
import { apiService } from '../../../services/apiService';
import { ActivityLog } from '../../../types';
import { Loader } from '../../../components/ui/Loader';
import { useToast } from '../../../components/layout/AppLayout';

export const ActivityLogPage: React.FC = () => {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    const loadLogs = async () => {
      try {
        const data = await apiService.getActivityLogs();
        setLogs(data);
      } catch (err) {
        showToast("Failed to sync activity stream", "error");
      } finally {
        setIsLoading(false);
      }
    };
    loadLogs();
  }, []);

  if (isLoading) return <Loader size="lg" />;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
       <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">User</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Action</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Timestamp</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Entity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {logs.map(log => (
                <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                   <td className="px-6 py-5">
                      {/* Using metadata actor_name with fallback */}
                      <div className="font-bold text-slate-900">{log.metadata?.actor_name || 'System User'}</div>
                   </td>
                   <td className="px-6 py-5">
                      <p className="text-sm text-slate-600 font-medium">{log.action}</p>
                   </td>
                   <td className="px-6 py-5 text-xs text-slate-400 font-bold uppercase tracking-tighter">
                      {new Date(log.timestamp || log.metadata?.created_at || Date.now()).toLocaleString()}
                   </td>
                   <td className="px-6 py-5 text-right">
                      <span className="text-[10px] font-black text-indigo-500 uppercase bg-indigo-50 px-2 py-1 rounded-md">{log.target_type}</span>
                   </td>
                </tr>
              ))}
              {logs.length === 0 && (
                <tr><td colSpan={4} className="px-6 py-20 text-center text-slate-400 italic">No activity logs recorded yet.</td></tr>
              )}
            </tbody>
          </table>
       </div>
    </div>
  );
};