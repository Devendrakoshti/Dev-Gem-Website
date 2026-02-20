import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../../../services/apiService';
import { authService } from '../../../services/authService';
import { UserRole } from '../../../types';
import { useToast } from '../../../components/layout/AppLayout';
import { Loader } from '../../../components/ui/Loader';
import { Badge } from '../../../components/ui/Badge';

export const PendingPaymentsPage: React.FC = () => {
  const user = authService.getCurrentUser()!;
  const isAdmin = user.role === UserRole.ADMIN;
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [pendingData, setPendingData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await apiService.getPendingPayments();
        setPendingData(data);
      } catch (err) {
        showToast("Financial data sync failed", "error");
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const filteredData = pendingData.filter(item => 
    item.client?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.client?.company_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPendingAmount = filteredData.reduce((sum, item) => sum + (item.outstanding_balance || 0), 0);

  if (isLoading) return <Loader size="lg" />;

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-32">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex-1 max-w-md w-full relative">
          <input 
            type="text" 
            placeholder="Search partners..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/50 font-medium text-sm transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Active Receivables</div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Partner Identity</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Billed</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-rose-600">Pending Balance</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.map((item) => (
                <tr key={item.client?.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="font-bold text-slate-900 leading-tight mb-0.5">{item.client?.name}</div>
                    <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{item.client?.company_name}</div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-slate-600">₹{item.total_billed?.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-black text-rose-600">₹{item.outstanding_balance?.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button onClick={() => navigate(`/app/clients/${item.client?.id}`)} className="text-[10px] font-black text-indigo-500 uppercase tracking-widest hover:text-indigo-700">View Profile</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 px-4 w-full max-w-2xl">
        <div className="bg-slate-900 text-white p-6 rounded-[2rem] shadow-2xl flex items-center justify-between border border-slate-800">
           <div><p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Exposure</p><p className="text-3xl font-black text-indigo-400">₹{totalPendingAmount.toLocaleString()}</p></div>
           <Badge color="red">Unpaid Portfolio</Badge>
        </div>
      </div>
    </div>
  );
};