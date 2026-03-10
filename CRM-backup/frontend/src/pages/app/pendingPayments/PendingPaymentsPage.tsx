
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, IndianRupee, User, Calendar, ExternalLink } from 'lucide-react';
import { clientService } from '../../../services/clientService';
import { mockStore } from '../../../services/mockStore';
import { USE_DEMO_AUTH } from '../../../config/appConfig';
import { authService } from '../../../services/authService';
import { UserRole } from '../../../types';
import { useToast } from '../../../components/layout/AppLayout';

type BalanceFilter = 'ALL' | 'HIGH';

export const PendingPaymentsPage: React.FC = () => {
  const user = authService.getCurrentUser()!;
  const isAdmin = user.role === UserRole.ADMIN;
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [pendingData, setPendingData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<BalanceFilter>('ALL');

  const fetchPending = async () => {
    setLoading(true);
    try {
      const data = await clientService.getPendingPayments();
      setPendingData(data);
    } catch (err: any) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPending();
    if (USE_DEMO_AUTH) {
      return mockStore.subscribe(() => fetchPending());
    }
  }, []);

  const filteredData = pendingData
    .filter(item => {
      const matchesSearch =
        item.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.client.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.client.mobile.includes(searchTerm);

      const matchesFilter = filter === 'ALL' || (filter === 'HIGH' && item.balance >= 50000);

      return matchesSearch && matchesFilter;
    });

  const totalPendingAmount = filteredData.reduce((sum, item) => sum + item.balance, 0);

  const handleViewClient = (clientId: string) => {
    navigate(`/app/clients/${clientId}`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-32">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex-1 max-w-md w-full relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
            <Search className="w-5 h-5" />
          </span>
          <input
            type="text"
            placeholder="Search partners or contact numbers..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/50 font-medium text-sm transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex bg-slate-100 p-1 rounded-xl w-full md:w-auto">
          <button
            onClick={() => setFilter('ALL')}
            className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${filter === 'ALL' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
          >
            All Pending
          </button>
          <button
            onClick={() => setFilter('HIGH')}
            className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${filter === 'HIGH' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
          >
            High Exposure
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Mobile View */}
        <div className="md:hidden divide-y divide-slate-100">
          {filteredData.map(item => (
            <div key={item.client.id} className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-bold text-slate-900 leading-tight">{item.client.name}</div>
                  <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{item.client.companyName}</div>
                </div>
                <div className={`text-sm font-black ${item.balance >= 50000 ? 'text-rose-600' : 'text-slate-900'}`}>
                  ₹{item.balance.toLocaleString()}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-[10px] font-bold uppercase text-slate-500 tracking-widest">
                <div>
                  <p className="mb-1 text-slate-400 font-black">Total Paid</p>
                  <p className="text-emerald-600">₹{item.totalPaid.toLocaleString()}</p>
                </div>
                <div>
                  <p className="mb-1 text-slate-400 font-black">Last Payment</p>
                  <p>{item.lastPaymentDate || 'None'}</p>
                </div>
              </div>
              <button
                onClick={() => handleViewClient(item.client.id)}
                className="w-full py-2.5 rounded-xl bg-slate-100 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] hover:bg-indigo-50 hover:text-indigo-600 transition-all"
              >
                Go to Profile
              </button>
            </div>
          ))}
          {filteredData.length === 0 && <div className="p-20 text-center text-slate-400 italic">No outstanding payments.</div>}
        </div>

        {/* Desktop View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Partner Identity</th>
                {isAdmin && <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Executive</th>}
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Billed</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Paid</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Pending Balance</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Last Transaction</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.map((item) => (
                <tr key={item.client.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="font-bold text-slate-900 leading-tight mb-0.5">{item.client.name}</div>
                    <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{item.client.companyName}</div>
                  </td>
                  {isAdmin && (
                    <td className="px-6 py-5">
                      <div className="text-xs font-bold text-slate-600">{item.client.assignedToName}</div>
                    </td>
                  )}
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-slate-600">₹{item.totalBilled.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-emerald-600">₹{item.totalPaid.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-5">
                    <div className={`text-sm font-black ${item.balance >= 50000 ? 'text-rose-600' : 'text-slate-900'}`}>
                      ₹{item.balance.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-xs text-slate-400 font-bold uppercase tracking-tighter">
                      {item.lastPaymentDate || 'No record'}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button
                      onClick={() => handleViewClient(item.client.id)}
                      className="text-[10px] font-black text-indigo-500 uppercase tracking-widest hover:text-indigo-700 transition-all opacity-0 group-hover:opacity-100"
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={isAdmin ? 7 : 6} className="px-6 py-20 text-center text-slate-400 italic">
                    No outstanding payments found in this view.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Floating Summary Bar */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 px-4 w-full max-w-2xl">
        <div className="bg-slate-900 text-white p-4 md:p-6 rounded-2xl md:rounded-[2rem] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4 md:gap-10 border border-slate-800">
          <div className="text-center md:text-left">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Portfolio Exposure</p>
            <p className="text-xs text-slate-400 font-medium">Calculated for {filteredData.length} active debtors</p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Total Outstanding</p>
            <p className="text-2xl md:text-3xl font-black text-indigo-400">₹{totalPendingAmount.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
