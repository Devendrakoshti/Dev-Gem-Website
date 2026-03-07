
import React, { useEffect, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  isDestructive?: boolean;
  children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ 
  isOpen, onClose, onConfirm, title, message, 
  confirmLabel = 'Confirm', isDestructive = false,
  children
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.focus();
      
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };

      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-200 overflow-y-auto">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div 
        ref={modalRef}
        tabIndex={-1}
        className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 overflow-hidden animate-in zoom-in-95 duration-200 outline-none my-auto"
      >
        <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
        <p className="text-slate-500 text-sm mb-4 leading-relaxed font-medium">{message}</p>
        
        {children ? (
          <div className="animate-in fade-in slide-in-from-top-2">
            {children}
          </div>
        ) : (
          <div className="flex gap-3 justify-end mt-8">
            <button 
              onClick={onClose}
              className="px-6 py-3 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-100 transition-all focus:ring-2 focus:ring-slate-200"
            >
              Cancel
            </button>
            <button 
              onClick={() => { onConfirm(); onClose(); }}
              className={`px-6 py-3 rounded-xl text-sm font-bold text-white shadow-lg transition-all focus:ring-2 focus:ring-offset-2 ${isDestructive ? 'bg-rose-600 hover:bg-rose-700 focus:ring-rose-500' : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'}`}
            >
              {confirmLabel}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
