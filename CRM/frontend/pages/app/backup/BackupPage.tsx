import React, { useState, useEffect, useRef } from 'react';
import { apiService } from '../../../services/apiService';
import { authService } from '../../../services/authService';
import { Modal } from '../../../components/ui/Modal';
import { useToast } from '../../../components/layout/AppLayout';
import { Loader } from '../../../components/ui/Loader';
import { BackupHistory } from '../../../types';

export const BackupPage: React.FC = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [backups, setBackups] = useState<BackupHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | number | null>(null);
  const [selectedImportFile, setSelectedImportFile] = useState<File | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [showRestoreConfirm, setShowRestoreConfirm] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();

  useEffect(() => {
    loadBackups();
  }, []);

  const loadBackups = async () => {
    setIsLoading(true);
    try {
      const data = await apiService.getBackups();
      setBackups(data);
    } catch (err) {
      showToast("Failed to fetch backup registry", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateBackup = async () => {
    setIsCreating(true);
    try {
      await apiService.createBackup();
      showToast("System snapshot generated successfully.");
      loadBackups();
    } catch (err: any) {
      showToast(err.message, "error");
    } finally {
      setIsCreating(false);
    }
  };

  const handleDownload = (id: string | number) => {
    const backup = backups.find(b => b.id === id);
    if (!backup?.data) {
        showToast("Backup data missing", "error");
        return;
    }
    const blob = new Blob([backup.data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url; link.download = backup.filename;
    document.body.appendChild(link); link.click();
    document.body.removeChild(link); URL.revokeObjectURL(url);
    showToast("Download initiated.");
  };

  const handleConfirmDelete = async () => {
    if (deleteId) {
      try {
        await apiService.deleteBackup(deleteId as string);
        showToast("Backup snapshot purged successfully", "info");
        loadBackups();
      } catch (err: any) {
        showToast(err.message, "error");
      }
      setDeleteId(null);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/json" && !file.name.endsWith('.json')) {
        showToast("Invalid file type. Please select a .json backup file.", "error");
        return;
      }
      setSelectedImportFile(file);
    }
  };

  const handleExecuteRestore = () => {
    if (!selectedImportFile) return;
    
    setIsImporting(true);
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        await apiService.restoreBackup(event.target?.result as string);
        showToast("System database restored successfully");
        setSelectedImportFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        window.location.reload(); // Force reload to sync new data state
      } catch (err: any) { 
        showToast(err.message || "Restoration failed", "error");
      } finally {
        setIsImporting(false);
        setShowRestoreConfirm(false);
      }
    };
    reader.readAsText(selectedImportFile);
  };

  if (isLoading) return <Loader size="lg" />;

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="bg-slate-900 rounded-[3rem] p-12 text-white flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl shadow-indigo-500/10">
        <div className="max-w-xl">
           <h3 className="text-3xl font-bold mb-4 tracking-tight">System Continuity</h3>
           <p className="text-slate-400 font-medium text-sm leading-relaxed">Encrypted workspace snapshots. Use manual backups to export your database for offline storage or system migration.</p>
        </div>
        <button 
          onClick={handleCreateBackup} disabled={isCreating}
          className="bg-indigo-600 text-white px-10 py-5 rounded-2xl font-bold hover:bg-indigo-500 shadow-xl shadow-indigo-600/20 disabled:opacity-50 flex items-center gap-3 whitespace-nowrap transition-all"
        >
          {isCreating ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 4v12m0 0l-4-4m4 4l4-4" /></svg>}
          {isCreating ? 'Snapshotting...' : 'Create Backup'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center"><h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Snapshot Registry</h4></div>
            <div className="divide-y divide-slate-50">
               {backups.map(b => (
                 <div key={b.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-all">
                    <div className="flex items-center gap-4">
                       <div className="p-3 bg-slate-100 rounded-xl text-slate-400"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg></div>
                       <div>
                          <p className="font-bold text-slate-900 text-sm">{b.filename}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">{b.size} • {new Date(b.created_at).toLocaleString()}</p>
                       </div>
                    </div>
                    <div className="flex gap-2">
                       <button onClick={() => handleDownload(b.id)} className="p-2 hover:bg-indigo-50 text-indigo-600 rounded-lg transition-colors" title="Download Snapshot"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg></button>
                       <button onClick={() => setDeleteId(b.id)} className="p-2 hover:bg-red-50 text-red-400 rounded-lg transition-colors" title="Delete Snapshot"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                    </div>
                 </div>
               ))}
               {backups.length === 0 && (
                <div className="p-20 text-center">
                   <p className="text-slate-300 font-bold italic text-sm mb-2">Registry is currently empty.</p>
                   <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Perform a backup to generate initial snapshots</p>
                </div>
               )}
            </div>
         </div>

         <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm flex flex-col items-center text-center h-fit">
            <h4 className="font-bold mb-2">Import Data</h4>
            <p className="text-xs text-slate-400 font-medium mb-8">Restore a Nexus-compliant JSON backup file to overwrite existing data.</p>
            
            <div className="w-full space-y-4">
              <label className={`w-full py-4 rounded-xl font-bold text-sm cursor-pointer transition-all flex items-center justify-center gap-2 border-2 border-dashed ${selectedImportFile ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'}`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                {selectedImportFile ? 'Change File' : 'Select Backup File'}
                <input ref={fileInputRef} type="file" className="hidden" accept=".json" onChange={onFileChange} />
              </label>

              {selectedImportFile && (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-left animate-in fade-in slide-in-from-top-2">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Staged for Import</p>
                   <p className="text-xs font-bold text-slate-700 truncate">{selectedImportFile.name}</p>
                   <p className="text-[9px] font-bold text-slate-400">Size: {(selectedImportFile.size / 1024).toFixed(2)} KB</p>
                   
                   <button 
                    onClick={() => setShowRestoreConfirm(true)}
                    className="w-full mt-4 bg-indigo-600 text-white py-3 rounded-xl font-bold text-xs hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-2"
                   >
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                     Execute Restoration
                   </button>
                </div>
              )}
            </div>
         </div>
      </div>

      <Modal 
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleConfirmDelete}
        title="Purge Snapshot"
        message="Are you sure you want to permanently delete this system backup? This action cannot be undone and the snapshot metadata will be scrubbed from the registry."
        confirmLabel="Purge Snapshot"
        isDestructive={true}
      />

      <Modal
        isOpen={showRestoreConfirm}
        onClose={() => setShowRestoreConfirm(false)}
        onConfirm={handleExecuteRestore}
        title="Critical System Restore"
        message="WARNING: This operation will overwrite all current clients, users, and financial records with data from the selected backup file. Your current session data will be replaced immediately. Do you wish to proceed?"
        confirmLabel={isImporting ? "Processing..." : "Overwrite and Restore"}
        isDestructive={true}
      />
    </div>
  );
};