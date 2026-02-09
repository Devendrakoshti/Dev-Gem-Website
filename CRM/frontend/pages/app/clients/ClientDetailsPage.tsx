
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { clientService } from '../../../services/clientService';
import { ClientStatus, ClientStage, FollowUpType, BillingItem, PaymentReceived, UserRole, Client, Note, FollowUp } from '../../../types';
import { Badge } from '../../../components/ui/Badge';
import { authService } from '../../../services/authService';
import { useToast } from '../../../components/layout/AppLayout';
import { Modal } from '../../../components/ui/Modal';

export const ClientDetailsPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'DETAILS' | 'FOLLOWUPS' | 'NOTES' | 'PAYMENTS'>('DETAILS');
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);

  // Payment Modals
  const [showBillModal, setShowBillModal] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);
  // Editing restricted - state kept for modal titles/defaults if needed, but actions disabled
  const [editingBill, setEditingBill] = useState<BillingItem | null>(null);
  const [editingPay, setEditingPay] = useState<PaymentReceived | null>(null);

  // Deletion Modal State
  const [deleteConfirmation, setDeleteConfirmation] = useState<{ id: string, type: 'BILL' | 'PAY', label: string } | null>(null);

  const user = authService.getCurrentUser()!;
  const [client, setClient] = useState<Client | null>(null);
  const [followups, setFollowups] = useState<FollowUp[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);

  const [billing, setBilling] = useState<BillingItem[]>([]);
  const [payments, setPayments] = useState<PaymentReceived[]>([]);
  const [summary, setSummary] = useState({ totalBilled: 0, totalPaid: 0, balance: 0 });

  const fetchData = async () => {
    if (!id) return;
    try {
      const [c, f, n, b, p] = await Promise.all([
        clientService.getClientById(id),
        clientService.getFollowUps(id),
        clientService.getNotes(id),
        clientService.getBilling(id),
        clientService.getPayments(id)
      ]);

      if (!c) {
        showToast("Client not found or access denied.", "error");
        navigate('/app/clients');
        return;
      }

      setClient(c);
      setFollowups(f);
      setNotes(n);
      setBilling(b);
      setPayments(p);

      // Calculate summary
      const totalBilled = b.reduce((acc, item) => acc + item.amountToCollect, 0);
      const totalPaid = p.reduce((acc, item) => acc + item.amountReceived, 0);
      setSummary({
        totalBilled,
        totalPaid,
        balance: totalBilled - totalPaid
      });

    } catch (e: any) {
      showToast("Error loading client details: " + e.message, "error");
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, user, navigate]);

  if (!client) return null;

  const handleArchive = async () => {
    try {
      await clientService.archiveClient(client.id);
      showToast('Client moved to Archive successfully');
      navigate('/app/clients');
    } catch (e: any) {
      showToast("Archive failed: " + e.message, "error");
    }
  };

  // --- Billing Handlers ---
  const handleBillSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const amount = Number(fd.get('amountToCollect'));

    if (amount <= 0) {
      showToast("Amount must be greater than zero", "error");
      return;
    }

    if (editingBill) {
      showToast("Updates to billing items are restricted for audit purposes.", "error");
      return;
    }

    try {
      await clientService.addBilling({
        clientId: client.id,
        serviceName: fd.get('serviceName') as string,
        description: fd.get('description') as string,
        amountToCollect: amount,
        billingDate: fd.get('billingDate') as string
      });
      showToast('Billing item generated');
      setShowBillModal(false);
      fetchData();
    } catch (e: any) {
      showToast("Failed to add billing: " + e.message, "error");
    }
  };

  const handleConfirmDelete = () => {
    if (!deleteConfirmation) return;
    showToast("Deletion of financial records is restricted.", "error");
    setDeleteConfirmation(null);
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

    if (editingPay) {
      showToast("Updates to payment records are restricted.", "error");
      return;
    }

    try {
      await clientService.addPayment({
        clientId: client.id,
        amountReceived: amount,
        receivedDate: fd.get('receivedDate') as string,
        paymentMode: fd.get('paymentMode') as any,
        notes: fd.get('notes') as string
      });
      showToast('Payment received logged');
      setShowPayModal(false);
      fetchData();
    } catch (e: any) {
      showToast("Failed to add payment: " + e.message, "error");
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
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Link to={`/app/clients/${client.id}/edit`} className="px-6 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-all text-sm">Edit</Link>
          {!client.isArchived && (
            <button onClick={() => setIsArchiveModalOpen(true)} className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all text-sm shadow-lg">Archive</button>
          )}
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
            {['DETAILS', 'FOLLOWUPS', 'NOTES', 'PAYMENTS'].map(tab => (
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
              <div className="space-y-8">
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget);
                  try {
                    await clientService.addFollowUp({
                      clientId: client.id,
                      date: new Date().toISOString().split('T')[0],
                      nextDate: fd.get('nextDate') as string,
                      type: fd.get('type') as FollowUpType,
                      notes: fd.get('notes') as string
                    });
                    showToast('Interaction logged');
                    (e.target as HTMLFormElement).reset();
                    fetchData();
                  } catch (e: any) {
                    showToast("Failed to log interaction: " + e.message, "error");
                  }
                }} className="bg-slate-50 p-8 rounded-3xl border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2"><h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-2">New Pipeline Interaction</h4></div>
                  <select name="type" className="p-3.5 rounded-xl border border-slate-200 bg-white text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-500 transition-all"><option value="CALL">Call</option><option value="MEETING">Meeting</option><option value="EMAIL">Email</option></select>
                  <input type="date" name="nextDate" required className="p-3.5 rounded-xl border border-slate-200 bg-white text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
                  <textarea name="notes" required className="md:col-span-2 p-4 rounded-xl border border-slate-200 bg-white text-sm font-medium outline-none focus:ring-2 focus:ring-indigo-500 transition-all h-24" placeholder="Summary of discussion..."></textarea>
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
                </div>
              </div>
            )}

            {activeTab === 'NOTES' && (
              <div className="space-y-6">
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget);
                  try {
                    await clientService.addNote({
                      clientId: client.id,
                      content: fd.get('content') as string
                    });
                    showToast('Internal note posted');
                    (e.target as HTMLFormElement).reset();
                    fetchData();
                  } catch (e: any) {
                    showToast("Failed to post note: " + e.message, "error");
                  }
                }} className="flex gap-4">
                  <input name="content" required className="flex-1 p-4 rounded-2xl border border-slate-200 text-sm font-medium outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm" placeholder="Add internal note..." />
                  <button className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold text-sm shadow-lg hover:bg-slate-800 transition-all">Post</button>
                </form>
                <div className="space-y-4">
                  {notes.map(note => (
                    <div key={note.id} className="bg-white border border-slate-100 p-6 rounded-[2rem] shadow-sm">
                      <p className="text-slate-700 text-sm font-medium mb-4 leading-relaxed">{note.content}</p>
                      <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest border-t border-slate-50 pt-4">
                        <span className="text-indigo-500">{note.employeeName}</span>
                        <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'DETAILS' && (
              <div className="bg-white p-12 rounded-[2.5rem] border border-slate-100 text-center space-y-4">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mx-auto">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h4 className="font-bold text-slate-900">Enterprise CRM Metadata</h4>
                <p className="text-sm text-slate-500 max-w-sm mx-auto font-medium">Behavioral analytics, conversion velocity, and audit logs are available in the Nexus Pro Tier.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Archive Client Modal */}
      <Modal
        isOpen={isArchiveModalOpen}
        onClose={() => setIsArchiveModalOpen(false)}
        onConfirm={handleArchive}
        title="Archive Partner"
        message="Moving this client to Archive will remove them from your active pipeline. History and notes remain accessible in the Archived tab."
        confirmLabel="Confirm Archive"
      />

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
            <input name="serviceName" required defaultValue={editingBill?.serviceName} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-bold text-sm bg-slate-50/50" placeholder="e.g. Website Development" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount (₹)</label>
              <input type="number" min="0.01" step="0.01" name="amountToCollect" required defaultValue={editingBill?.amountToCollect} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-bold text-sm bg-slate-50/50" />
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Billing Date</label>
              <input type="date" name="billingDate" required defaultValue={editingBill?.billingDate || new Date().toISOString().split('T')[0]} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-bold text-sm bg-slate-50/50" />
            </div>
          </div>
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Notes</label>
            <textarea name="description" defaultValue={editingBill?.description} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium text-sm bg-slate-50/50 h-20" placeholder="Description of deliverables..."></textarea>
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
              <input type="number" min="0.01" step="0.01" name="amountReceived" required defaultValue={editingPay?.amountReceived} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-bold text-sm bg-slate-50/50" />
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Received Date</label>
              <input type="date" name="receivedDate" required defaultValue={editingPay?.receivedDate || new Date().toISOString().split('T')[0]} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-bold text-sm bg-slate-50/50" />
            </div>
          </div>
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Payment Mode</label>
            <select name="paymentMode" required defaultValue={editingPay?.paymentMode || 'UPI'} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-bold text-sm bg-slate-50/50">
              <option value="UPI">UPI / Digital</option>
              <option value="BANK">Bank Transfer</option>
              <option value="CASH">Cash Deposit</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Internal Notes</label>
            <textarea name="notes" defaultValue={editingPay?.notes} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium text-sm bg-slate-50/50 h-20" placeholder="Reference ID, bank details..."></textarea>
          </div>
          <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-indigo-700 transition-all uppercase tracking-widest text-[10px]">
            {editingPay ? 'Save Changes' : 'Record Transaction'}
          </button>
        </form>
      </Modal>
    </div>
  );
};
