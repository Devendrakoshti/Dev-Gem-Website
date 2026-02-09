
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserRole } from '../../../types';
import { Badge } from '../../../components/ui/Badge';
import { authService } from '../../../services/authService';
import { dashboardService, DashboardSummary } from '../../../services/dashboardService';
import { useToast } from '../../../components/layout/AppLayout';

interface CriticalAlert {
  type: 'FOLLOWUP' | 'PAYMENT';
  label: string;
  sublabel: string;
  clientId: string;
  badge: string;
}

export const DashboardPage: React.FC = () => {
  const user = authService.getCurrentUser()!;
  const isAdmin = user?.role === UserRole.ADMIN;
  const { showToast } = useToast();

  const [data, setData] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const result = await dashboardService.getSummary();
        setData(result);
      } catch (e: any) {
        showToast("Failed to load dashboard analytics: " + e.message, "error");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="p-10 text-center animate-pulse">
        <div className="h-8 bg-slate-200 rounded w-1/4 mx-auto mb-6"></div>
        <div className="grid grid-cols-6 gap-6 mb-10">
          {[...Array(6)].map((_, i) => <div key={i} className="h-24 bg-slate-100 rounded-2xl"></div>)}
        </div>
      </div>
    );
  }

  if (!data) return null;

  // Transform widgets to alerts
  const alerts: CriticalAlert[] = [
    ...(data.widgets.overdue_actions || []).map(fu => ({
      type: 'FOLLOWUP' as const,
      label: fu.client?.name || 'Assigned Record',
      sublabel: `Missed on ${fu.next_date || fu.nextDate}`, // Backend uses next_date usually, type is strict so check casing
      clientId: fu.client_id || fu.clientId,
      badge: 'Overdue Interaction'
    })),
    ...(data.widgets.high_exposure_clients || []).map(c => ({
      type: 'PAYMENT' as const,
      label: c.name,
      sublabel: `Pending: ₹${c.balance.toLocaleString()}`,
      clientId: c.id,
      badge: 'High Exposure'
    }))
  ];

  const stats = [
    { label: isAdmin ? 'Global Clients' : 'My Clients', value: data.counts.total_clients },
    { label: 'Active Pipeline', value: data.counts.active_clients },
    { label: 'Archived', value: data.counts.archived_clients },
    { label: 'Upcoming Actions', value: data.counts.today_actions }, // Changed label to reflect it might catch future too if logic changed, but basically 'Actions'
    { label: 'Critical Alerts', value: alerts.length },
    ...(isAdmin ? [{ label: 'Workforce', value: data.counts.employees }] : [])
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 group-hover:text-indigo-500 transition-colors">{stat.label}</p>
            <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Today's Focus */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></div>
              <h3 className="font-bold text-slate-900">Today's Focus</h3>
            </div>
            <span className="bg-yellow-100 text-yellow-800 text-[10px] px-2.5 py-1 rounded-md font-black uppercase tracking-wider">Priority</span>
          </div>
          <div className="divide-y divide-slate-50 overflow-y-auto max-h-[400px]">
            {data.widgets.today_actions && data.widgets.today_actions.length > 0 ? (
              data.widgets.today_actions.map((fu: any) => (
                <Link to={`/app/clients/${fu.client_id || fu.clientId}`} key={fu.id} className="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div>
                    <p className="font-semibold text-slate-900">{fu.client?.name || 'Assigned Record'}</p>
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-tighter">{fu.client?.company_name || 'Corporate Entity'}</p>
                  </div>
                  <Badge color="yellow">{fu.type}</Badge>
                </Link>
              ))
            ) : (
              <div className="p-20 text-center">
                <p className="text-slate-300 font-bold italic text-sm">No tasks assigned for today</p>
              </div>
            )}
          </div>
        </div>

        {/* Critical Alerts */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></div>
              <h3 className="font-bold text-slate-900">Critical Alerts</h3>
            </div>
            <span className="bg-red-100 text-red-800 text-[10px] px-2.5 py-1 rounded-md font-black uppercase tracking-wider">Risk Level: High</span>
          </div>
          <div className="divide-y divide-slate-50 overflow-y-auto max-h-[400px]">
            {alerts.length > 0 ? (
              alerts.map((alert, idx) => (
                <Link to={`/app/clients/${alert.clientId}`} key={`${alert.clientId}-${idx}`} className="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div>
                    <p className="font-semibold text-slate-900">{alert.label}</p>
                    <p className={`text-xs font-bold uppercase tracking-tighter ${alert.type === 'FOLLOWUP' ? 'text-rose-500' : 'text-indigo-600'}`}>{alert.sublabel}</p>
                  </div>
                  <Badge color={alert.type === 'FOLLOWUP' ? 'red' : 'indigo'}>{alert.badge}</Badge>
                </Link>
              ))
            ) : (
              <div className="p-20 text-center">
                <p className="text-slate-300 font-bold italic text-sm">Zero critical risk points</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {!isAdmin && (
        <div className="bg-indigo-600 rounded-[2.5rem] p-12 flex flex-col md:flex-row items-center justify-between gap-8 text-white shadow-2xl shadow-indigo-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="max-w-md relative z-10">
            <h3 className="text-3xl font-bold mb-4">Ready to expand?</h3>
            <p className="text-indigo-100 font-medium text-lg leading-relaxed opacity-80">Capture high-intent leads immediately and initialize your conversion workflow.</p>
          </div>
          <Link
            to="/app/clients/new"
            className="bg-white text-indigo-600 px-10 py-5 rounded-2xl font-bold hover:scale-105 active:scale-95 transition-all shadow-xl whitespace-nowrap relative z-10"
          >
            Register Partner
          </Link>
        </div>
      )}
    </div>
  );
};
