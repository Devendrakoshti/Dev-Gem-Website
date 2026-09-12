
import React, { useState, useEffect } from 'react';
import { dashboardService } from '../../../services/dashboardService';
import { mockStore } from '../../../services/mockStore';
import { authService } from '../../../services/authService';
import { USE_DEMO_AUTH } from '../../../config/appConfig';
import { ActivityLog } from '../../../types';
import { useRealTime } from '../../../hooks/useRealTime';

export const ActivityLogPage: React.FC = () => {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const data = await dashboardService.getActivity();
      setLogs(data);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
    if (USE_DEMO_AUTH) {
      return mockStore.subscribe(() => fetchLogs());
    }
  }, []);

  useRealTime('ActivityLoggedEvent', () => {
    fetchLogs();
  });

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
                  <div className="font-bold text-slate-900">{log.actorName}</div>
                </td>
                <td className="px-6 py-5">
                  <p className="text-sm text-slate-600 font-medium">{log.action}</p>
                </td>
                <td className="px-6 py-5 text-xs text-slate-400 font-bold uppercase tracking-tighter">
                  {new Date(log.timestamp).toLocaleString()}
                </td>
                <td className="px-6 py-5 text-right">
                  <span className="text-[10px] font-black text-indigo-500 uppercase bg-indigo-50 px-2 py-1 rounded-md">{log.targetType}</span>
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
