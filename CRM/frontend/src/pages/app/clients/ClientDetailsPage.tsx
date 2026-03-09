
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Phone, Users, Mail, MessageSquare, Calendar, FileText, Briefcase, IndianRupee, CreditCard, Activity, Plus, Trash2, Edit2, History } from 'lucide-react';
import { mockStore } from '../../../services/mockStore';
import { ClientStatus, ClientStage, FollowUpType, BillingItem, PaymentReceived, UserRole, Client, FollowUp, Note } from '../../../types';
import { Badge } from '../../../components/ui/Badge';
import { authService } from '../../../services/authService';
import { useToast } from '../../../components/layout/AppLayout';
import { Modal } from '../../../components/ui/Modal';
import { clientService } from '../../../services/clientService';
import { USE_DEMO_AUTH } from '../../../config/appConfig';

export const ClientDetailsPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  // Focused tabs: Only Follow-ups and Payments
  const [activeTab, setActiveTab] = useState<'FOLLOWUPS' | 'PAYMENTS'>('FOLLOWUPS');

  // Payment Modals
  const [showBillModal, setShowBillModal] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);
  const [editingBill, setEditingBill] = useState<BillingItem | null>(null);
  const [editingPay, setEditingPay] = useState<PaymentReceived | null>(null);

  // Deletion Modal State
  const [deleteConfirmation, setDeleteConfirmation] = useState<{ id: string, type: 'BILL' | 'PAY', label: string } | null>(null);

  const user = authService.getCurrentUser()!;
  const [client, setClient] = useState<Client | null>(null);
  const [followups, setFollowups] = useState<FollowUp[]>([]);
  const [billing, setBilling] = useState<BillingItem[]>([]);
  const [payments, setPayments] = useState<PaymentReceived[]>([]);
  const [loading, setLoading] = useState(true);

  const [summary, setSummary] = useState({ totalBilled: 0, totalPaid: 0, balance: 0 });

  const fetchData = async () => {
    if (!id) return;
    setLoading(true);
    try {
      if (USE_DEMO_AUTH) {
        const targetClient = mockStore.getClientById(id, user);
        if (!targetClient) throw new Error("Not found");
        setClient(targetClient);
        setFollowups(mockStore.getFollowUpsByClientId(id, user));
        setBilling(mockStore.getBillingByClientId(id, user));
        setPayments(mockStore.getPaymentsByClientId(id, user));
        setSummary(mockStore.getClientPaymentSummary(id, user));
      } else {
        const data: any = await clientService.getClientById(id);
        if (!data) throw new Error("Client not found");
        setClient(data);
        setFollowups(data.follow_ups || []);
        setBilling(data.billing_items || []);
        setPayments(data.payments || []);

        const billed = (data.billing_items || []).reduce((sum: number, b: any) => sum + Number(b.amount_to_collect), 0);
        const paid = (data.payments || []).reduce((sum: number, p: any) => sum + Number(p.amount_received), 0);
        setSummary({ totalBilled: billed, totalPaid: paid, balance: billed - paid });
      }
    } catch (err: any) {
      showToast(err.message, 'error');
      navigate('/app/dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    if (USE_DEMO_AUTH) {
      return mockStore.subscribe(() => {
        fetchData();
      });
    }
  }, [id, user, navigate]);

  if (loading) return (
    <div className="p-20 text-center">
      <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
      <p className="text-slate-500 font-bold">Accessing Dossier...</p>
    </div>
  );

  if (!client) return null;

  // --- Billing Handlers ---
  const handleBillSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const amount = Number(fd.get('amountToCollect'));

    if (amount <= 0) {
      showToast("Amount must be greater than zero", "error");
      return;
    }

    const payload = {
      client_id: client.id,
      service_name: fd.get('serviceName') as string,
      description: fd.get('description') as string,
      amount_to_collect: amount,
      billing_date: fd.get('billingDate') as string,
    };

    try {
      if (USE_DEMO_AUTH) {
        if (editingBill) {
          mockStore.updateBillingItem(editingBill.id, payload, user);
        } else {
          mockStore.addBillingItem(payload, user);
        }
      } else {
        await clientService.addBillingItem(payload);
        fetchData();
      }
      showToast(editingBill ? 'Billing item updated' : 'Billing item generated');
      setShowBillModal(false);
      setEditingBill(null);
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteConfirmation) return;

    try {
      if (USE_DEMO_AUTH) {
        if (deleteConfirmation.type === 'BILL') {
          mockStore.deleteBillingItem(deleteConfirmation.id, user);
        } else {
          mockStore.deletePaymentReceived(deleteConfirmation.id, user);
        }
      } else {
        if (deleteConfirmation.type === 'BILL') {
          await clientService.deleteBillingItem(deleteConfirmation.id);
        } else {
          await clientService.deletePayment(deleteConfirmation.id);
        }
        fetchData();
      }
      showToast(`${deleteConfirmation.type === 'BILL' ? 'Billing' : 'Payment'} record removed`, 'info');
      setDeleteConfirmation(null);
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  // --- Payment Handlers ---
  const handlePaySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const amount = Number(fd.get('amountReceived'));

    if (amount <= 0) {
      showToast("Amount must be greater than zero", "error");
      return;
    }

    const payload = {
      client_id: client.id,
      amount_received: amount,
      received_date: fd.get('receivedDate') as string,
      payment_mode: fd.get('paymentMode') as string,
      notes: fd.get('notes') as string,
    };

    try {
      if (USE_DEMO_AUTH) {
        if (editingPay) {
          mockStore.updatePaymentReceived(editingPay.id, payload, user);
        } else {
          mockStore.addPaymentReceived(payload, user);
        }
      } else {
        await clientService.addPayment(payload);
        fetchData();
      }
      showToast(editingPay ? 'Payment record updated' : 'Payment received logged');
      setShowPayModal(false);
      setEditingPay(null);
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Profile */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-3xl shadow-xl shadow-indigo-100">
            {client.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-1">{client.name}</h2>
            <div className="flex items-center gap-3">
              <p className="text-slate-500 font-medium">{client.companyName}</p>
              <Badge color={client.status === ClientStatus.ACTIVE ? 'green' : 'gray'}>{client.status}</Badge>
              <Badge color="indigo">{client.stage}</Badge>
              {client.isArchived && <Badge color="gray">ARCHIVED</Badge>}
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Link to={`/app/clients/${client.id}/edit`} className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all text-sm shadow-lg shadow-indigo-100">Edit Profile</Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Stats Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
            <h3 className="font-black text-[10px] text-slate-400 uppercase tracking-widest mb-6">Partner Dossier</h3>
            <div className="space-y-6">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Email</p>
                <p className="text-slate-900 font-bold break-all">{client.email}</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Mobile</p>
                <p className="text-slate-900 font-bold">{client.mobile}</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Assigned Executive</p>
                <p className="text-indigo-600 font-black">{client.assignedToName}</p>
              </div>
            </div>
          </div>

          {/* Quick Financial Summary */}
          <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl shadow-indigo-500/10">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Financial Status</h3>
            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-black text-slate-500 uppercase">Balance Due</p>
                <p className={`text-2xl font-bold ${summary.balance > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                  ₹{summary.balance.toLocaleString()}
                </p>
              </div>
              <div className="flex justify-between border-t border-slate-800 pt-4">
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase">Total Bill</p>
                  <p className="font-bold text-sm">₹{summary.totalBilled.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-slate-500 uppercase">Collected</p>
                  <p className="font-bold text-sm">₹{summary.totalPaid.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Dynamic Content */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex gap-10 border-b border-slate-200">
            {['FOLLOWUPS', 'PAYMENTS'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`pb-4 text-[10px] font-black tracking-widest uppercase transition-all relative ${activeTab === tab ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {tab}
                {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-600 rounded-full" />}
              </button>
            ))}
          </div>

          <div className="min-h-[400px]">
            {activeTab === 'PAYMENTS' && (
              <div className="space-y-10 animate-in fade-in zoom-in-95 duration-300">
                {/* Action Header */}
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-slate-900">Client Ledger</h3>
                  <div className="flex gap-3">
                    <button
                      onClick={() => { setEditingBill(null); setShowBillModal(true); }}
                      className="bg-slate-100 text-slate-700 px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-slate-200 transition-all flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                      New Billing Item
                    </button>
                    <button
                      onClick={() => { setEditingPay(null); setShowPayModal(true); }}
                      className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-lg shadow-indigo-100"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                      Log Payment
                    </button>
                  </div>
                </div>

                {/* Billing History */}
                <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                  <div className="p-4 bg-slate-50 border-b border-slate-100"><h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Billing History (+)</h4></div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-white text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-50">
                        <tr>
                          <th className="px-6 py-4">Date</th>
                          <th className="px-6 py-4">Service</th>
                          <th className="px-6 py-4">Amount</th>
                          <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50 font-medium">
                        {billing.map(item => (
                          <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                            <td className="px-6 py-4 text-slate-500">{item.billingDate}</td>
                            <td className="px-6 py-4">
                              <p className="text-slate-900 font-bold">{item.serviceName}</p>
                              <p className="text-[10px] text-slate-400 truncate max-w-[200px]">{item.description}</p>
                            </td>
                            <td className="px-6 py-4 text-indigo-600 font-bold">₹{item.amountToCollect.toLocaleString()}</td>
                            <td className="px-6 py-4 text-right space-x-2">
                              <button onClick={() => { setEditingBill(item); setShowBillModal(true); }} className="text-slate-400 hover:text-indigo-600 transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg></button>
                              <button
                                onClick={() => setDeleteConfirmation({ id: item.id, type: 'BILL', label: item.serviceName })}
                                className="text-slate-400 hover:text-rose-600 transition-colors"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                              </button>
                            </td>
                          </tr>
                        ))}
                        {billing.length === 0 && <tr><td colSpan={4} className="px-6 py-12 text-center text-slate-300 italic font-medium">No billing history found.</td></tr>}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Payment History */}
                <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                  <div className="p-4 bg-slate-50 border-b border-slate-100"><h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Payments Collected (-)</h4></div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-white text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-50">
                        <tr>
                          <th className="px-6 py-4">Date</th>
                          <th className="px-6 py-4">Mode</th>
                          <th className="px-6 py-4">Amount</th>
                          <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50 font-medium">
                        {payments.map(item => (
                          <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                            <td className="px-6 py-4 text-slate-500">{item.receivedDate}</td>
                            <td className="px-6 py-4"><Badge color="indigo">{item.paymentMode}</Badge></td>
                            <td className="px-6 py-4 text-emerald-600 font-bold">₹{item.amountReceived.toLocaleString()}</td>
                            <td className="px-6 py-4 text-right space-x-2">
                              <button onClick={() => { setEditingPay(item); setShowPayModal(true); }} className="text-slate-400 hover:text-indigo-600 transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg></button>
                              <button
                                onClick={() => setDeleteConfirmation({ id: item.id, type: 'PAY', label: `₹${item.amountReceived.toLocaleString()} received via ${item.paymentMode}` })}
                                className="text-slate-400 hover:text-rose-600 transition-colors"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                              </button>
                            </td>
                          </tr>
                        ))}
                        {payments.length === 0 && <tr><td colSpan={4} className="px-6 py-12 text-center text-slate-300 italic font-medium">No payments logged yet.</td></tr>}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'FOLLOWUPS' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget);
                  const payload = {
                    client_id: client.id,
                    date: new Date().toISOString().split('T')[0],
                    next_date: fd.get('nextDate') as string,
                    type: fd.get('type') as FollowUpType,
                    notes: fd.get('notes') as string,
                  };

                  try {
                    if (USE_DEMO_AUTH) {
                      mockStore.addFollowUp({
                        ...payload,
                        clientId: client.id,
                        employeeId: user.id,
                        employeeName: user.name
                      }, user);
                    } else {
                      await clientService.addFollowUp(payload);
                      fetchData();
                    }
                    showToast('Interaction logged');
                    (e.target as HTMLFormElement).reset();
                  } catch (err: any) {
                    showToast(err.message, 'error');
                  }
                }} className="bg-slate-50 p-8 rounded-3xl border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2"><h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-2">New Pipeline Interaction</h4></div>
                  <div className="relative">
                    <Activity className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                    <select name="type" className="w-full pl-12 pr-4 p-3.5 rounded-xl border border-slate-200 bg-white text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-500 transition-all appearance-none">
                      <option value="CALL">Call</option>
                      <option value="MEETING">Meeting</option>
                      <option value="EMAIL">Email</option>
                    </select>
                  </div>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                    <input type="date" name="nextDate" required className="w-full pl-12 pr-4 p-3.5 rounded-xl border border-slate-200 bg-white text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
                  </div>
                  <div className="md:col-span-2 relative">
                    <FileText className="absolute left-4 top-4 w-5 h-5 text-slate-400 pointer-events-none" />
                    <textarea name="notes" required className="w-full pl-12 pr-4 p-4 rounded-xl border border-slate-200 bg-white text-sm font-medium outline-none focus:ring-2 focus:ring-indigo-500 transition-all h-24" placeholder="Summary of discussion..."></textarea>
                  </div>
                  <button className="md:col-span-2 bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all">Log Interaction</button>
                </form>

                <div className="space-y-4">
                  {followups.map(fu => (
                    <div key={fu.id} className="bg-white border border-slate-100 p-6 rounded-[2rem] shadow-sm">
                      <div className="flex justify-between items-center mb-4">
                        <Badge color="indigo">{fu.type}</Badge>
                        <span className="text-[10px] font-black text-slate-400 uppercase">{fu.date}</span>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed font-medium">"{fu.notes}"</p>
                      <p className="mt-4 text-[10px] font-black text-indigo-500 uppercase tracking-widest">— Logged by {fu.employeeName}</p>
                    </div>
                  ))}
                  {followups.length === 0 && (
                    <div className="p-12 text-center text-slate-400 italic">No historical interactions recorded.</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Ledger Item Modal */}
      <Modal
        isOpen={!!deleteConfirmation}
        onClose={() => setDeleteConfirmation(null)}
        onConfirm={handleConfirmDelete}
        title="Remove Transaction Record"
        message={`Are you sure you want to permanently delete "${deleteConfirmation?.label}"? This action will immediately update the ledger balance and cannot be undone.`}
        confirmLabel="Confirm Deletion"
        isDestructive={true}
      />

      {/* New/Edit Billing Modal */}
      <Modal
        isOpen={showBillModal}
        onClose={() => { setShowBillModal(false); setEditingBill(null); }}
        onConfirm={() => { }} // Not used as form handles submission
        title={editingBill ? "Modify Billing Entry" : "New Service Billing"}
        message="Generate a new billing item to update the client's balance due."
      >
        <form onSubmit={handleBillSubmit} className="space-y-4 mt-4">
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Service Name</label>
            <div className="relative">
              <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              <input name="serviceName" required defaultValue={editingBill?.serviceName} className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-bold text-sm bg-slate-50/50" placeholder="e.g. Website Development" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount (₹)</label>
              <div className="relative">
                <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                <input type="number" min="0.01" step="0.01" name="amountToCollect" required defaultValue={editingBill?.amountToCollect} className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-bold text-sm bg-slate-50/50" />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Billing Date</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                <input type="date" name="billingDate" required defaultValue={editingBill?.billingDate || new Date().toISOString().split('T')[0]} className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-bold text-sm bg-slate-50/50" />
              </div>
            </div>
          </div>
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Notes</label>
            <div className="relative">
              <FileText className="absolute left-4 top-4 w-5 h-5 text-slate-400 pointer-events-none" />
              <textarea name="description" defaultValue={editingBill?.description} className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium text-sm bg-slate-50/50 h-20" placeholder="Description of deliverables..."></textarea>
            </div>
          </div>
          <button type="submit" className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-indigo-600 transition-all uppercase tracking-widest text-[10px]">
            {editingBill ? 'Save Changes' : 'Generate Invoice Entry'}
          </button>
        </form>
      </Modal>

      {/* New/Edit Payment Modal */}
      <Modal
        isOpen={showPayModal}
        onClose={() => { setShowPayModal(false); setEditingPay(null); }}
        onConfirm={() => { }}
        title={editingPay ? "Modify Payment Record" : "Log Incoming Payment"}
        message="Update the ledger with payment received from this partner."
      >
        <form onSubmit={handlePaySubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount (₹)</label>
              <div className="relative">
                <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                <input type="number" min="0.01" step="0.01" name="amountReceived" required defaultValue={editingPay?.amountReceived} className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-bold text-sm bg-slate-50/50" />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Received Date</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                <input type="date" name="receivedDate" required defaultValue={editingPay?.receivedDate || new Date().toISOString().split('T')[0]} className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-bold text-sm bg-slate-50/50" />
              </div>
            </div>
          </div>
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Payment Mode</label>
            <div className="relative">
              <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              <select name="paymentMode" required defaultValue={editingPay?.paymentMode || 'UPI'} className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-bold text-sm bg-slate-50/50 appearance-none">
                <option value="UPI">UPI / Digital</option>
                <option value="BANK">Bank Transfer</option>
                <option value="CASH">Cash Deposit</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Internal Notes</label>
            <div className="relative">
              <FileText className="absolute left-4 top-4 w-5 h-5 text-slate-400 pointer-events-none" />
              <textarea name="notes" defaultValue={editingPay?.notes} className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium text-sm bg-slate-50/50 h-20" placeholder="Reference ID, bank details..."></textarea>
            </div>
          </div>
          <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-indigo-700 transition-all uppercase tracking-widest text-[10px]">
            {editingPay ? 'Save Changes' : 'Record Transaction'}
          </button>
        </form>
      </Modal>
    </div>
  );
};
