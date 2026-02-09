
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService, DEMO_CREDENTIALS } from '../../services/authService';
import { mockStore } from '../../services/mockStore';
import { SHOW_DEMO_CREDENTIALS } from '../../config/appConfig';

export const LoginPage: React.FC = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [employees, setEmployees] = useState(mockStore.getEmployees());
  const navigate = useNavigate();

  useEffect(() => {
    // Only subscribe to employee list if demo panel is visible to optimize resources
    if (SHOW_DEMO_CREDENTIALS) {
      return mockStore.subscribe(() => setEmployees(mockStore.getEmployees()));
    }
  }, []);

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await authService.login(identifier, password);
      navigate('/app/dashboard');
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
      setIsLoading(false);
    }
  };

  const quickLogin = (id: string, pwd: string) => {
    setIdentifier(id);
    setPassword(pwd);
    setIsLoading(true);
    authService.login(id, pwd)
      .then(() => navigate('/app/dashboard'))
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-200 p-10 animate-in fade-in zoom-in duration-500">
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-indigo-200">
            <span className="text-white text-3xl font-bold">N</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Enterprise Access</h2>
          <p className="text-slate-500 mt-1 text-center font-medium">Log in with Email or Employee ID</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl flex items-center gap-2 font-bold animate-pulse">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Identifier (Email or ID)</label>
            <input 
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
              placeholder="e.g. EMP001"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Password</label>
            <input 
              type="password"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center disabled:opacity-50 shadow-lg shadow-indigo-100"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : 'Sign In to Dashboard'}
          </button>
        </form>

        {SHOW_DEMO_CREDENTIALS && (
          <div className="mt-10 pt-8 border-t border-slate-100 animate-in fade-in slide-in-from-top-4 duration-700">
            <p className="text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Demo Credentials Panel</p>
            
            <div className="space-y-4">
               <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div>
                     <p className="text-xs font-black text-indigo-600 uppercase">Administrator</p>
                     <p className="text-[10px] text-slate-400 font-bold">admin@nexus.com / password123</p>
                  </div>
                  <button 
                     onClick={() => quickLogin(DEMO_CREDENTIALS.ADMIN.identifier, DEMO_CREDENTIALS.ADMIN.password)}
                     className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-black uppercase hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                  >
                     Quick Access
                  </button>
               </div>

               <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-xs font-black text-slate-600 uppercase mb-3">Employee Selector</p>
                  <div className="flex flex-wrap gap-2">
                     {employees.slice(0, 3).map(emp => (
                        <button 
                           key={emp.id}
                           onClick={() => quickLogin(emp.employeeId, 'password123')}
                           className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-black uppercase hover:border-indigo-500 transition-all"
                        >
                           {emp.employeeId}
                        </button>
                     ))}
                  </div>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
