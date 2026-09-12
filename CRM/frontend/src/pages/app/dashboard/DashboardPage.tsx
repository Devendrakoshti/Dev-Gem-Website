import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { UserRole, ClientStage, ClientStatus, FollowUpType, User, Client, FollowUp, BillingItem, PaymentReceived } from '../../../types';
import { mockStore } from '../../../services/mockStore';
import { Badge } from '../../../components/ui/Badge';
import { authService } from '../../../services/authService';
import { USE_DEMO_AUTH } from '../../../config/appConfig';
import { dashboardService } from '../../../services/dashboardService';
import { useRealTime } from '../../../hooks/useRealTime';

// --- Visual Components ---

const StatCard = ({ label, value, trend, color = "indigo", icon }: any) => {
   const colorMap: any = {
      indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
      emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
      rose: "bg-rose-50 text-rose-600 border-rose-100",
      amber: "bg-amber-50 text-amber-600 border-amber-100"
   };

   return (
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
         <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-2xl border ${colorMap[color]}`}>
               {icon}
            </div>
            {trend && (
               <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${trend.startsWith('+') ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                  {trend}
               </span>
            )}
         </div>
         <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-1">{label}</p>
         <p className="text-2xl font-black text-slate-900 tracking-tight">{value}</p>
      </div>
   );
};

export const DashboardPage: React.FC = () => {
   const user = authService.getCurrentUser()!;
   const isAdmin = user?.role === UserRole.ADMIN;

   const [clients, setClients] = useState<Client[]>([]);
   const [employees, setEmployees] = useState<User[]>([]);
   const [followups, setFollowups] = useState<FollowUp[]>([]);
   const [billing, setBilling] = useState<BillingItem[]>([]);
   const [payments, setPayments] = useState<PaymentReceived[]>([]);
   const [loading, setLoading] = useState(true);

   // Stats State
   const [liveStats, setLiveStats] = useState<any>(null);

   const fetchDashboardData = async () => {
      setLoading(true);
      try {
         if (USE_DEMO_AUTH) {
            setClients(mockStore.getCollection('clients'));
            setEmployees(mockStore.getEmployees());
            setFollowups(mockStore.getFollowUps());
            setBilling(mockStore.getCollection('billingItems'));
            setPayments(mockStore.getCollection('paymentsReceived'));
         } else {
            const data = await dashboardService.getDashboardData();
            setLiveStats(data);
            setClients([]); // We'll use stats from data mostly, but some parts need clients
            setFollowups(data.activity || []);
         }
      } catch (err: any) {
         console.error("Dashboard error", err);
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      fetchDashboardData();
      if (USE_DEMO_AUTH) {
         return mockStore.subscribe(() => {
            fetchDashboardData();
         });
      }
   }, []);

   useRealTime(['ClientDataChanged', 'PaymentRecorded', 'ActivityLoggedEvent'], () => {
      fetchDashboardData();
   });

   // --- Common Calculations ---
   const myClients = useMemo(() => {
      if (USE_DEMO_AUTH) return clients.filter(c => c.assignedToId === user.id && !c.isDeleted);
      return [];
   }, [clients, user.id]);

   const { stats, funnel, myFunnel, leaderboard } = useMemo(() => {
      if (!USE_DEMO_AUTH && liveStats) {
         return {
            stats: {
               tcv: `₹${(liveStats.tcv / 100000).toFixed(2)}L`,
               collected: `₹${(liveStats.collected / 100000).toFixed(2)}L`,
               pending: `₹${(liveStats.pending / 100000).toFixed(2)}L`,
               activeLeads: liveStats.active_leads,
               conversionRate: liveStats.conversion_rate,
               workforce: liveStats.workforce,
               myTCV: `₹${(liveStats.my_tcv / 100000).toFixed(2)}L`,
               myCollected: `₹${(liveStats.my_collected / 100000).toFixed(2)}L`,
               myConversions: liveStats.my_conversions,
               myActive: liveStats.my_active,
               myConversionRate: liveStats.my_conversion_rate
            },
            funnel: liveStats.funnel || [],
            myFunnel: liveStats.my_funnel || [],
            leaderboard: liveStats.leaderboard || []
         };
      }

      const totalTCV = billing.reduce((sum, b) => sum + b.amountToCollect, 0);
      const totalCollected = payments.reduce((sum, p) => sum + p.amountReceived, 0);
      const activePipeline = clients.filter(c => !c.isArchived && !c.isDeleted);
      const conversions = clients.filter(c => c.stage === ClientStage.CONVERTED && !c.isDeleted).length;

      const funnelData = Object.values(ClientStage).map(stage => ({
         label: stage,
         count: clients.filter(c => c.stage === stage && !c.isDeleted).length
      }));

      const myFunnelData = Object.values(ClientStage).map(stage => ({
         label: stage,
         count: myClients.filter(c => c.stage === stage).length
      }));

      const leaderboardData = employees
         .map(emp => ({
            ...emp,
            converted: clients.filter(c => c.assignedToId === emp.id && c.stage === ClientStage.CONVERTED && !c.isDeleted).length
         }))
         .sort((a, b) => b.converted - a.converted)
         .slice(0, 5);

      const myInvoices = billing.filter(b => myClients.some(c => c.id === b.clientId));
      const myPayments = payments.filter(p => myClients.some(c => c.id === p.clientId));
      const myTCV = myInvoices.reduce((sum, b) => sum + b.amountToCollect, 0);
      const myCollected = myPayments.reduce((sum, p) => sum + p.amountReceived, 0);
      const myConversions = myClients.filter(c => c.stage === ClientStage.CONVERTED).length;

      const statsResult = {
         tcv: `₹${(totalTCV / 100000).toFixed(2)}L`,
         collected: `₹${(totalCollected / 100000).toFixed(2)}L`,
         pending: `₹${((totalTCV - totalCollected) / 100000).toFixed(2)}L`,
         activeLeads: activePipeline.length,
         conversionRate: activePipeline.length > 0 ? `${((conversions / clients.length) * 100).toFixed(1)}%` : '0%',
         workforce: employees.length,
         myTCV: `₹${(myTCV / 100000).toFixed(2)}L`,
         myCollected: `₹${(myCollected / 100000).toFixed(2)}L`,
         myConversions,
         myActive: myClients.filter(c => !c.isArchived).length,
         myConversionRate: myClients.length > 0 ? `${((myConversions / myClients.length) * 100).toFixed(1)}%` : '0%'
      };

      return { stats: statsResult, funnel: funnelData, myFunnel: myFunnelData, leaderboard: leaderboardData };
   }, [clients, billing, payments, employees, myClients, liveStats]);

   const greeting = useMemo(() => {
      const hour = new Date().getHours();
      if (hour < 12) return 'Good Morning';
      if (hour < 18) return 'Good Afternoon';
      return 'Good Evening';
   }, []);

   if (!isAdmin) {
      // --- EXECUTIVE WORKSTATION VIEW ---
      const today = new Date().toISOString().split('T')[0];
      const tasksToday = followups.filter(f => f.employeeId === user.id && f.nextDate === today);
      const stalledClients = myClients.filter(c => c.stage !== ClientStage.CONVERTED && c.stage !== ClientStage.LOST).slice(0, 3);

      return (
         <div className="space-y-10 animate-in fade-in duration-700 pb-20">
            {/* Personalized Welcome Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
               <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-indigo-600 rounded-[2rem] flex items-center justify-center text-white font-black text-3xl shadow-xl shadow-indigo-100">
                     {user.firstName.charAt(0)}
                  </div>
                  <div>
                     <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-tight mb-2">
                        {greeting}, <span className="text-indigo-600">{user.firstName}</span>
                     </h2>
                     <p className="text-slate-500 font-medium">You have <span className="text-indigo-600 font-bold">{tasksToday.length} interactions</span> scheduled for today.</p>
                  </div>
               </div>
               <Link to="/app/clients/new" className="w-full lg:w-auto text-center bg-slate-900 text-white px-10 py-5 rounded-2xl font-bold hover:bg-indigo-600 transition-all shadow-xl shadow-slate-900/10">Register Partner</Link>
            </div>

            {/* Executive Stats Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
               <StatCard label="My Portfolio Value" value={stats.myTCV} trend="+5.4%" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
               <StatCard label="Realized Revenue" value={stats.myCollected} color="emerald" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
               <StatCard label="Active Pipeline" value={stats.myActive} color="amber" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>} />
               <StatCard label="Success Rate" value={stats.myConversionRate} trend="+2.1%" color="indigo" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>} />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
               {/* Action List: Today's Followups */}
               <div className="xl:col-span-2 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                  <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                     <div>
                        <h4 className="text-xl font-bold text-slate-900">Today's Focus</h4>
                        <p className="text-xs text-slate-400 font-medium">Critical interactions for {new Date().toLocaleDateString()}</p>
                     </div>
                     <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                     </div>
                  </div>
                  <div className="divide-y divide-slate-50 overflow-y-auto max-h-[400px]">
                     {tasksToday.map(task => {
                        const client = clients.find(c => c.id === task.clientId);
                        return (
                           <Link to={`/app/clients/${task.clientId}`} key={task.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                              <div className="flex items-center gap-4">
                                 <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                                    {client?.name.charAt(0)}
                                 </div>
                                 <div>
                                    <p className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{client?.name}</p>
                                    <div className="flex items-center gap-2 mt-0.5">
                                       <Badge color="indigo">{task.type}</Badge>
                                       <span className="text-[10px] text-slate-400 font-bold truncate max-w-[200px]">{task.notes}</span>
                                    </div>
                                 </div>
                              </div>
                              <div className="text-right">
                                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Status</span>
                                 <div className="w-2 h-2 rounded-full bg-emerald-500 ml-auto" />
                              </div>
                           </Link>
                        );
                     })}
                     {tasksToday.length === 0 && (
                        <div className="p-20 text-center">
                           <p className="text-slate-300 font-bold italic text-sm">No scheduled interactions for today.</p>
                           <Link to="/app/clients" className="mt-4 inline-block text-[10px] font-black text-indigo-600 uppercase tracking-widest">Prospect New Leads</Link>
                        </div>
                     )}
                  </div>
               </div>

               {/* Personal Pipeline Distribution (Replaced Growth Target) */}
               <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                  <div className="p-8 border-b border-slate-50">
                     <h4 className="text-xl font-bold text-slate-900">My Pipeline</h4>
                     <p className="text-xs text-slate-400 font-medium">Stage-by-stage distribution</p>
                  </div>
                  <div className="p-10 flex-1 flex flex-col justify-center space-y-6">
                     {myFunnel.map((item, idx) => {
                        const percentage = myClients.length > 0 ? (item.count / myClients.length) * 100 : 0;
                        const barWidth = Math.max(percentage, 5); // Ensure small sliver for visibility

                        return (
                           <div key={item.label} className="group">
                              <div className="flex justify-between items-end mb-2">
                                 <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{item.label}</span>
                                 <span className="text-sm font-black text-slate-900">{item.count}</span>
                              </div>
                              <div className="w-full bg-slate-50 rounded-full h-3 overflow-hidden border border-slate-100 p-0.5">
                                 <div
                                    className={`h-full rounded-full transition-all duration-1000 group-hover:brightness-110 ${idx === 4 ? 'bg-emerald-500' : idx === 0 ? 'bg-indigo-500' : 'bg-slate-300'}`}
                                    style={{ width: `${barWidth}%` }}
                                 />
                              </div>
                           </div>
                        );
                     })}
                     {myClients.length === 0 && (
                        <p className="text-center text-slate-300 italic text-sm py-10">No active pipeline data.</p>
                     )}
                  </div>
               </div>
            </div>

            {/* Stalled Pipeline & Personal Feed */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
               <div className="bg-white rounded-[3rem] border border-slate-200 shadow-sm p-10">
                  <div className="flex justify-between items-center mb-8">
                     <h4 className="text-xl font-bold text-slate-900">Priority Follow-ups</h4>
                     <div className="px-3 py-1 bg-rose-50 text-rose-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-rose-100">Dormant Leads</div>
                  </div>
                  <div className="space-y-4">
                     {stalledClients.map(c => (
                        <Link to={`/app/clients/${c.id}`} key={c.id} className="flex items-center justify-between p-5 bg-slate-50 hover:bg-white border border-transparent hover:border-slate-200 rounded-2xl transition-all">
                           <div>
                              <p className="text-sm font-bold text-slate-900">{c.name}</p>
                              <p className="text-[10px] text-slate-400 font-bold uppercase">{c.companyName}</p>
                           </div>
                           <Badge color="red">No Activity</Badge>
                        </Link>
                     ))}
                     {stalledClients.length === 0 && <p className="text-slate-300 font-bold italic text-center py-10">All pipeline leads are active.</p>}
                  </div>
               </div>

               <div className="bg-white rounded-[3rem] border border-slate-200 shadow-sm p-10">
                  <h4 className="text-xl font-bold text-slate-900 mb-8">My Activity</h4>
                  <div className="space-y-6">
                     {(USE_DEMO_AUTH ? mockStore.getActivity(user) : followups).slice(0, 3).map((log: any) => (
                        <div key={log.id} className="flex gap-4">
                           <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center flex-shrink-0 text-indigo-600">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                           </div>
                           <div>
                              <p className="text-xs font-black text-slate-900 mb-1">{new Date(log.timestamp || log.created_at).toLocaleTimeString()}</p>
                              <p className="text-sm text-slate-500 font-medium leading-relaxed">{log.action || log.notes}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      );
   }

   // --- MASTER ADMIN DASHBOARD ---
   return (
      <div className="space-y-10 animate-in fade-in duration-700 pb-20">
         {/* Strategic Header */}
         <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
               <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-tight mb-2">
                  Master <span className="text-indigo-600">Command</span> Center
               </h2>
               <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-900 text-white rounded-lg text-[9px] font-black uppercase tracking-widest">
                     <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                     Live Network Active
                  </div>
                  <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Fiscal Cycle: Q1 2024</p>
               </div>
            </div>
            <div className="flex gap-4 w-full lg:w-auto">
               <Link to="/app/backup" className="flex-1 lg:flex-none text-center px-6 py-4 bg-white border border-slate-200 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all">Export System Data</Link>
               <Link to="/app/employees/new" className="flex-1 lg:flex-none text-center px-6 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl shadow-slate-900/10">Register Executive</Link>
            </div>
         </div>

         {/* Main Stats Grid */}
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            <StatCard label="Total Contract Value" value={stats.tcv} trend="+12.5%" color="indigo" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
            <StatCard label="Revenue Collected" value={stats.collected} trend="+8.2%" color="emerald" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
            <StatCard label="Pending Receivables" value={stats.pending} trend="-4.1%" color="rose" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
            <StatCard label="Pipeline Velocity" value={stats.conversionRate} trend="+0.8%" color="amber" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>} />
            <StatCard label="Active Partners" value={stats.activeLeads} trend="+14" color="indigo" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>} />
            <StatCard label="Executive Team" value={stats.workforce} color="indigo" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>} />
         </div>

         <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">

            {/* Pipeline Funnel Visual */}
            <div className="xl:col-span-2 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
               <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                  <div>
                     <h4 className="text-xl font-bold text-slate-900">Pipeline Distribution</h4>
                     <p className="text-xs text-slate-400 font-medium">Stage-by-stage lead concentration</p>
                  </div>
               </div>
               <div className="p-10 flex-1 flex flex-col justify-center space-y-6">
                  {funnel.map((item, idx) => {
                     const percentage = clients.length > 0 ? (item.count / clients.length) * 100 : 0;
                     const barWidth = Math.max(percentage, 5);

                     return (
                        <div key={item.label} className="group">
                           <div className="flex justify-between items-end mb-2">
                              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{item.label}</span>
                              <span className="text-sm font-black text-slate-900">{item.count}</span>
                           </div>
                           <div className="w-full bg-slate-50 rounded-full h-3 overflow-hidden border border-slate-100 p-0.5">
                              <div
                                 className={`h-full rounded-full transition-all duration-1000 group-hover:brightness-110 ${idx === 0 ? 'bg-indigo-500' : idx === 4 ? 'bg-emerald-500' : 'bg-slate-300'}`}
                                 style={{ width: `${barWidth}%` }}
                              />
                           </div>
                        </div>
                     );
                  })}
               </div>
            </div>

            {/* Staff Performance Leaderboard */}
            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
               <div className="p-8 border-b border-slate-50">
                  <h4 className="text-xl font-bold text-slate-900">Top Performers</h4>
                  <p className="text-xs text-slate-400 font-medium">Ranked by conversion success</p>
               </div>
               <div className="divide-y divide-slate-50 overflow-y-auto">
                  {leaderboard.map((emp, idx) => (
                     <div key={emp.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-4">
                           <div className="relative">
                              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center font-black text-indigo-600 text-xs uppercase">
                                 {emp.firstName.charAt(0)}{emp.lastName.charAt(0)}
                              </div>
                              {idx === 0 && <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full border-2 border-white flex items-center justify-center text-[8px] text-white">🏆</div>}
                           </div>
                           <div>
                              <p className="text-sm font-bold text-slate-900">{emp.name}</p>
                              <p className="text-[10px] text-slate-400 font-bold uppercase">{emp.employeeId}</p>
                           </div>
                        </div>
                        <div className="text-right">
                           <p className="text-sm font-black text-slate-900">{emp.converted}</p>
                           <p className="text-[9px] text-emerald-500 font-black uppercase tracking-tighter">Conversions</p>
                        </div>
                     </div>
                  ))}
               </div>
               <Link to="/app/employees" className="p-6 bg-slate-50 border-t border-slate-100 text-center text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:bg-white transition-all">View All Staff Resources</Link>
            </div>

         </div>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Critical Alerts Command Tile */}
            <div className="bg-white rounded-[3rem] border border-slate-200 shadow-sm p-10 flex flex-col h-full">
               <div className="flex justify-between items-center mb-8">
                  <div>
                     <h4 className="text-xl font-bold text-slate-900">System Exceptions</h4>
                     <p className="text-xs text-slate-500 font-medium">Risk points requiring executive override</p>
                  </div>
                  <div className="px-3 py-1 bg-rose-50 text-rose-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-rose-100">Action Required</div>
               </div>
               <div className="space-y-4 flex-1">
                  {USE_DEMO_AUTH ? clients.filter(c => {
                     const summary = mockStore.getClientPaymentSummary(c.id, user);
                     return summary.balance >= 100000;
                  }).slice(0, 3).map(c => (
                     <Link to={`/app/clients/${c.id}`} key={c.id} className="block p-5 bg-slate-50 hover:bg-white border border-transparent hover:border-slate-200 rounded-2xl transition-all">
                        <div className="flex justify-between items-center">
                           <div>
                              <p className="font-bold text-slate-900 text-sm mb-1">{c.name}</p>
                              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{c.companyName}</p>
                           </div>
                           <div className="text-right">
                              <p className="text-rose-600 font-black text-sm">₹{mockStore.getClientPaymentSummary(c.id, user).balance.toLocaleString()}</p>
                              <p className="text-[9px] text-slate-500 font-black uppercase">Outstanding</p>
                           </div>
                        </div>
                     </Link>
                  )) : (
                     <p className="text-slate-500 italic text-sm text-center py-10">Live exception monitoring is active in the background.</p>
                  )}
                  {USE_DEMO_AUTH && clients.length > 0 && (
                     <Link to="/app/pending-payments" className="block text-center pt-4 text-[10px] font-black text-indigo-400 uppercase tracking-widest hover:text-indigo-300">Review Full Ledger Exposure</Link>
                  )}
               </div>
            </div>

            {/* Global Activity Feed */}
            <div className="bg-white rounded-[3rem] border border-slate-200 shadow-sm p-10">
               <div className="flex justify-between items-center mb-8">
                  <div>
                     <h4 className="text-xl font-bold text-slate-900">Global Activity</h4>
                     <p className="text-xs text-slate-400 font-medium">Real-time system telemetry</p>
                  </div>
               </div>
               <div className="space-y-6">
                  {(USE_DEMO_AUTH ? mockStore.getActivity(user) : followups).slice(0, 4).map((log: any) => (
                     <div key={log.id} className="flex gap-4 relative">
                        <div className="w-px h-full bg-slate-100 absolute left-4 top-8" />
                        <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0 z-10">
                           <div className="w-2 h-2 rounded-full bg-indigo-500" />
                        </div>
                        <div className="flex-1 pb-6">
                           <div className="flex justify-between items-center mb-1">
                              <p className="text-xs font-black text-slate-900">{log.actorName || log.employee_name || 'System'}</p>
                              <span className="text-[9px] font-black text-slate-400 uppercase">{new Date(log.timestamp || log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                           </div>
                           <p className="text-sm text-slate-500 font-medium leading-relaxed">{log.action || log.notes}</p>
                        </div>
                     </div>
                  ))}
                  <Link to="/app/activity" className="block text-center pt-2 text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:text-indigo-800">Audit Complete Event Log</Link>
               </div>
            </div>
         </div>
      </div>
   );
};
