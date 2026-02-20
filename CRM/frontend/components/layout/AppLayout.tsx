import React, { useState, useEffect, createContext, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserRole } from '../../types';
import { authService } from '../../services/authService';
import { Toast, ToastType } from '../ui/Toast';

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  adminOnly?: boolean;
}

// Yahan humne saare tabs wapas add kar diye hain!
const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', path: '/app/dashboard', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
  { label: 'Clients', path: '/app/clients', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg> },
  { label: 'Pending Payments', path: '/app/pending-payments', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
  { label: 'Staff Management', path: '/app/employees', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>, adminOnly: true },
  { label: 'Transfer History', path: '/app/transfers', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg> },
  { label: 'Activity Log', path: '/app/activity', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>, adminOnly: true },
  { label: 'System Backups', path: '/app/backup', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" /></svg>, adminOnly: true },
  { label: 'Trash', path: '/app/trash', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>, adminOnly: true },
];

const ToastContext = createContext<{ showToast: (msg: string, type?: ToastType) => void } | null>(null);
export const useToast = () => useContext(ToastContext)!;

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [toast, setToast] = useState<{ msg: string; type: ToastType } | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const user = authService.getCurrentUser() as any;

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  if (!user) return null;

  const showToast = (msg: string, type: ToastType = 'success') => setToast({ msg, type });
  
  const filteredNav = NAV_ITEMS.filter(item => {
    if (item.adminOnly) return user.role === UserRole.ADMIN;
    return true;
  });

  return (
    <ToastContext.Provider value={{ showToast }}>
      <div className="min-h-screen flex bg-slate-50 overflow-x-hidden">
        {!isSidebarOpen && (
          <div className="md:hidden fixed inset-0 bg-slate-900/40 z-20 backdrop-blur-sm" onClick={() => setIsSidebarOpen(true)} />
        )}

        <aside className={`${isSidebarOpen ? 'w-64 translate-x-0' : 'w-20 translate-x-0'} bg-slate-900 text-white transition-all duration-300 flex flex-col fixed h-full z-30 shadow-2xl`}>
          <div className="p-6 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center font-bold text-xl flex-shrink-0 shadow-lg shadow-indigo-500/20">N</div>
              {isSidebarOpen && <span className="font-bold text-xl tracking-tight">NexusCRM</span>}
            </div>
          </div>
          
          <nav className="flex-1 mt-4 px-3 space-y-1 overflow-y-auto">
            {filteredNav.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
                    isActive 
                    ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <span className={`${isActive ? 'text-white' : 'text-slate-500 group-hover:text-indigo-400'}`}>
                    {item.icon}
                  </span>
                  {isSidebarOpen && <span className="font-semibold text-sm">{item.label}</span>}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-slate-800">
             <div className={`flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 mb-4 ${!isSidebarOpen && 'justify-center'}`}>
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs uppercase shadow-sm">
                  {user?.first_name?.charAt(0) || 'U'}{user?.last_name?.charAt(0) || ''}
                </div>
                {isSidebarOpen && (
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold truncate">{user?.first_name} {user?.last_name}</p>
                    <p className="text-[10px] text-slate-500 uppercase font-black tracking-tighter">{user?.role}</p>
                  </div>
                )}
             </div>
            <button 
              onClick={() => { authService.logout(); navigate('/login'); }}
              className={`flex items-center gap-3 px-3 py-2 text-slate-500 hover:text-red-400 w-full transition-all group ${!isSidebarOpen && 'justify-center'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7" /></svg>
              {isSidebarOpen && <span className="text-xs font-bold uppercase tracking-widest">Logout</span>}
            </button>
          </div>
        </aside>

        <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'} flex flex-col min-w-0`}>
          <div className="p-8 max-w-7xl mx-auto w-full flex-1">
            {children}
          </div>
        </main>

        {toast && (
          <Toast 
            message={toast.msg} 
            type={toast.type} 
            onClose={() => setToast(null)} 
          />
        )}
      </div>
    </ToastContext.Provider>
  );
};