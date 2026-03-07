
import React, { useState, useEffect, createContext, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  IndianRupee, 
  ArrowRightLeft, 
  Trash2, 
  ShieldCheck, 
  Activity, 
  Database,
  ChevronLeft,
  Menu,
  LogOut
} from 'lucide-react';
import { UserRole } from '../../types';
import { authService } from '../../services/authService';
import { mockStore } from '../../services/mockStore';
import { Toast, ToastType } from '../ui/Toast';

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  adminOnly?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', path: '/app/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
  { label: 'Clients', path: '/app/clients', icon: <Users className="w-5 h-5" /> },
  { label: 'Pending Payments', path: '/app/pending-payments', icon: <IndianRupee className="w-5 h-5" /> },
  { label: 'Transfer History', path: '/app/transfer-history', icon: <ArrowRightLeft className="w-5 h-5" /> },
  { label: 'Trash', path: '/app/trash', icon: <Trash2 className="w-5 h-5" /> },
  { label: 'Staff Management', path: '/app/employees', icon: <ShieldCheck className="w-5 h-5" />, adminOnly: true },
  { label: 'Activity Log', path: '/app/activity', icon: <Activity className="w-5 h-5" />, adminOnly: true },
  { label: 'Backup', path: '/app/backup', icon: <Database className="w-5 h-5" />, adminOnly: true },
];

const ToastContext = createContext<{ showToast: (msg: string, type?: ToastType) => void } | null>(null);
export const useToast = () => useContext(ToastContext)!;

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [toast, setToast] = useState<{ msg: string; type: ToastType } | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  // DIAGNOSTIC LOGS
  useEffect(() => {
    if (user) {
      const staff = mockStore.getEmployees();
      const admins = staff.filter(s => s.role === UserRole.ADMIN);
      console.group('NexusCRM Session Debug');
      console.log('User Identity:', user.name);
      console.log('Assigned Role:', user.role);
      console.log('Is Authorized Admin:', user.role === UserRole.ADMIN);
      console.log('Total Staff Loaded:', staff.length);
      console.log('Admins in DB:', admins.length);
      console.groupEnd();
    }
  }, [user]);

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  if (!user) return null;

  const showToast = (msg: string, type: ToastType = 'success') => setToast({ msg, type });
  
  // SECURE NAVIGATION FILTERING
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
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-1.5 hover:bg-slate-800 rounded-lg transition-colors text-slate-400">
               {isSidebarOpen ? (
                 <ChevronLeft className="w-5 h-5" />
               ) : (
                 <Menu className="w-5 h-5" />
               )}
            </button>
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
                <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center font-bold text-xs uppercase shadow-sm">
                  {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                </div>
                {isSidebarOpen && (
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold truncate">{user.name}</p>
                    <p className="text-[10px] text-slate-500 uppercase font-black tracking-tighter">{user.role}</p>
                  </div>
                )}
             </div>
            <button 
              onClick={() => { authService.logout(); navigate('/login'); }}
              className={`flex items-center gap-3 px-3 py-2 text-slate-500 hover:text-red-400 w-full transition-all group ${!isSidebarOpen && 'justify-center'}`}
            >
              <LogOut className="w-5 h-5" />
              {isSidebarOpen && <span className="text-xs font-bold uppercase tracking-widest">Logout</span>}
            </button>
          </div>
        </aside>

        <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'} flex flex-col min-w-0`}>
          <header className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-10 md:hidden flex items-center px-6">
             <button onClick={() => setIsSidebarOpen(true)} className="p-2 -ml-2 text-slate-500">
                <Menu className="w-6 h-6" />
             </button>
             <span className="ml-4 font-bold text-lg text-slate-900">NexusCRM</span>
          </header>
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
