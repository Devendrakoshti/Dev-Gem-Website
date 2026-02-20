import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { apiService } from '../../../services/apiService';
import { ClientStatus, ClientStage, FollowUpType, BillingItem, PaymentReceived, Client, FollowUp } from '../../../types';
import { Badge } from '../../../components/ui/Badge';
import { authService } from '../../../services/authService';
import { useToast } from '../../../components/layout/AppLayout';
import { Modal } from '../../../components/ui/Modal';
import { Loader } from '../../../components/ui/Loader';

export const ClientDetailsPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'FOLLOWUPS' | 'PAYMENTS'>('FOLLOWUPS');
  
  const [client, setClient] = useState<Client | null>(null);
  const [followups, setFollowups] = useState<FollowUp[]>([]);
  const [billing, setBilling] = useState<BillingItem[]>([]);
  const [payments, setPayments] = useState<PaymentReceived[]>([]);
  const [summary, setSummary] = useState({ total_billed: 0, total_received: 0, outstanding_balance: 0 });

  const [showBillModal, setShowBillModal] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{ id: string | number, type: 'BILL' | 'PAY', label: string } | null>(null);

  const user = authService.getCurrentUser()!;

  useEffect(() => {
    loadAllData();
  }, [id]);

  const loadAllData = async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const [c, f, b, p, s] = await Promise.all([
        apiService.getClientById(id),
        apiService.getFollowUps(id),
        apiService.getBilling(id),
        apiService.getPayments(id),
        apiService.getLedgerSummary(id)
      ]);
      setClient(c);
      setFollowups(f);
      setBilling(b);
      setPayments(p);
      setSummary(s);
    } catch (err: any) {
      showToast(err.message || "Failed to load client details", "error");
      navigate('/app/clients');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBillSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      client_id: id,
      service_name: fd.get('serviceName'),
      amount_to_collect: Number(fd.get('amountToCollect')),
      billing_date: fd.get('billingDate'),
      description: fd.get('description')
    };

    try {
      await apiService.addBilling(payload);
      showToast('Ledger updated');
      setShowBillModal(false);
      loadAllData();
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  const handlePaySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    try {
      await apiService.addPayment({
        client_id: id,
        amount_received: Number(fd.get('amountReceived')),
        received_date: fd.get('receivedDate'),
        payment_mode: fd.get('paymentMode'),
        notes: fd.get('notes')
      });
      showToast('Payment recorded');
      setShowPayModal(false);
      loadAllData();
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteConfirmation) return;
    try {
      if (deleteConfirmation.type === 'BILL') {
        await apiService.deleteBilling(deleteConfirmation.id as string);
      } else {
        await apiService.deletePayment(deleteConfirmation.id as string);
      }
      showToast('Entry removed');
      loadAllData();
    } catch (err: any) {
      showToast(err.message, 'error');
    }
    setDeleteConfirmation(null);
  };

  if (isLoading) return <Loader size="lg" />;
  if (!client) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-3xl shadow-xl shadow-indigo-100">
            {client?.name?.charAt(0) || 'C'}
          </div>
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-1">{client.name}</h2>
            <div className="flex items-center gap-3">
              <p className="text-slate-500 font-medium">{client.company_name}</p>
              <Badge color="indigo">{client.stage}</Badge>
            </div>
          </div>
        </div>
        <Link to={`/app/clients/${client.id}/edit`} className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold">Edit Profile</Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-6">
           <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Partner Info</h3>
              <div className="space-y-4">
                <div><p className="text-[10px] text-slate-400 font-black uppercase">Email</p><p className="font-bold text-slate-900">{client.email}</p></div>
                <div><p className="text-[10px] text-slate-400 font-black uppercase">Mobile</p><p className="font-bold text-slate-900">{client.mobile}</p></div>
              </div>
           </div>

           <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Balance Due</p>
              <p className="text-3xl font-bold text-rose-400 mb-6">₹{(summary?.outstanding_balance || 0).toLocaleString()}</p>
              <div className="flex justify-between border-t border-slate-800 pt-4 text-xs font-bold uppercase tracking-widest">
                <div><p className="text-slate-500 mb-1">Billed</p><p>₹{(summary?.total_billed || 0).toLocaleString()}</p></div>
                <div className="text-right"><p className="text-slate-500 mb-1">Paid</p><p>₹{(summary?.total_received || 0).toLocaleString()}</p></div>
              </div>
           </div>
        </div>

        <div className="lg:col-span-3 space-y-6">
          <div className="flex gap-10 border-b border-slate-200">
            {['FOLLOWUPS', 'PAYMENTS'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab as any)} className={`pb-4 text-[10px] font-black uppercase tracking-widest relative ${activeTab === tab ? 'text-indigo-600' : 'text-slate-400'}`}>
                {tab}
                {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-600 rounded-full" />}
              </button>
            ))}
          </div>

          {activeTab === 'PAYMENTS' && (
            <div className="space-y-8 animate-in fade-in duration-300">
               <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold">Client Ledger</h3>
                  <div className="flex gap-2">
                    <button onClick={() => setShowBillModal(true)} className="px-4 py-2 bg-slate-100 text-[10px] font-black uppercase tracking-widest rounded-lg">Bill Service</button>
                    <button onClick={() => setShowPayModal(true)} className="px-4 py-2 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg">Log Payment</button>
                  </div>
               </div>

               <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                 <table className="w-full text-left">
                    <thead className="bg-slate-50">
                      <tr><th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400">Date</th><th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400">Service</th><th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400">Amount</th><th className="px-6 py-4 text-right"></th></tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {billing.map(item => (
                        <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 text-sm font-medium text-slate-500">{item.billing_date}</td>
                          <td className="px-6 py-4 text-sm font-bold">{item.service_name}</td>
                          <td className="px-6 py-4 text-sm font-black text-indigo-600">₹{item.amount_to_collect?.toLocaleString()}</td>
                          <td className="px-6 py-4 text-right"><button onClick={() => setDeleteConfirmation({id: item.id, type: 'BILL', label: item.service_name})} className="text-slate-400 hover:text-rose-500"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button></td>
                        </tr>
                      ))}
                    </tbody>
                 </table>
               </div>
            </div>
          )}

          {activeTab === 'FOLLOWUPS' && (
            <div className="space-y-6 animate-in fade-in duration-300">
               <form onSubmit={async (e) => {
                 e.preventDefault();
                 const fd = new FormData(e.currentTarget);
                 try {
                   await apiService.addFollowUp({
                     client_id: id,
                     type: fd.get('type'),
                     next_date: fd.get('nextDate'),
                     notes: fd.get('notes')
                   });
                   showToast('Interaction logged');
                   e.currentTarget.reset();
                   loadAllData();
                 } catch (err: any) { showToast(err.message, 'error'); }
               }} className="bg-slate-50 p-6 rounded-3xl border border-slate-200 grid grid-cols-2 gap-4">
                  <select name="type" className="p-3 rounded-xl border border-slate-200 font-bold text-xs"><option value="CALL">Call</option><option value="WHATSAPP">WhatsApp</option></select>
                  <input type="date" name="nextDate" required className="p-3 rounded-xl border border-slate-200 font-bold text-xs" />
                  <textarea name="notes" required className="col-span-2 p-4 rounded-xl border border-slate-200 text-sm h-20" placeholder="Summary..."></textarea>
                  <button className="col-span-2 bg-indigo-600 text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg">Log Activity</button>
               </form>
               
               <div className="space-y-4">
                 {followups.map(f => (
                   <div key={f.id} className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm">
                      <div className="flex justify-between mb-2"><Badge color="indigo">{f.type}</Badge><span className="text-[10px] font-black text-slate-400 uppercase">{f.date}</span></div>
                      <p className="text-sm text-slate-600 font-medium">"{f.notes}"</p>
                   </div>
                 ))}
               </div>
            </div>
          )}
        </div>
      </div>

      <Modal isOpen={!!deleteConfirmation} onClose={() => setDeleteConfirmation(null)} onConfirm={handleConfirmDelete} title="Purge Transaction" message={`Delete "${deleteConfirmation?.label}" permanently?`} confirmLabel="Delete Forever" isDestructive={true} />
      
      <Modal isOpen={showBillModal} onClose={() => setShowBillModal(false)} onConfirm={() => {}} title="New Billing" message="Add a service charge to the client ledger.">
         <form onSubmit={handleBillSubmit} className="space-y-4 mt-4">
            <input name="serviceName" required placeholder="Service Name" className="w-full p-3 rounded-xl border border-slate-200 text-sm font-bold" />
            <input name="amountToCollect" type="number" required placeholder="Amount (₹)" className="w-full p-3 rounded-xl border border-slate-200 text-sm font-bold" />
            <input name="billingDate" type="date" required defaultValue={new Date().toISOString().split('T')[0]} className="w-full p-3 rounded-xl border border-slate-200 text-sm font-bold" />
            <button type="submit" className="w-full bg-slate-900 text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-widest">Bill Client</button>
         </form>
      </Modal>

      <Modal isOpen={showPayModal} onClose={() => setShowPayModal(false)} onConfirm={() => {}} title="Record Payment" message="Update ledger with incoming funds.">
         <form onSubmit={handlePaySubmit} className="space-y-4 mt-4">
            <input name="amountReceived" type="number" required placeholder="Amount (₹)" className="w-full p-3 rounded-xl border border-slate-200 text-sm font-bold" />
            <select name="paymentMode" className="w-full p-3 rounded-xl border border-slate-200 text-sm font-bold"><option value="UPI">UPI</option><option value="BANK">Bank</option><option value="CASH">Cash</option></select>
            <input name="receivedDate" type="date" required defaultValue={new Date().toISOString().split('T')[0]} className="w-full p-3 rounded-xl border border-slate-200 text-sm font-bold" />
            <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-widest">Post Payment</button>
         </form>
      </Modal>
    </div>
  );
};