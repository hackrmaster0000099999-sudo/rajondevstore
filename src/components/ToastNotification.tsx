import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const ToastNotification: React.FC = () => {
  const { toast } = useStore();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-[90%] sm:max-w-md animate-in slide-in-from-bottom-3 duration-200">
      <div className="px-4 py-2.5 rounded-2xl bg-white border border-slate-200 shadow-xl shadow-slate-900/10 flex items-center gap-2.5 text-xs sm:text-sm font-bold text-slate-900">
        {toast.type === 'success' ? (
          <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
        ) : toast.type === 'error' || toast.type === 'warning' ? (
          <AlertCircle size={16} className="text-amber-600 flex-shrink-0" />
        ) : (
          <Info size={16} className="text-indigo-600 flex-shrink-0" />
        )}
        <span>{toast.message}</span>
      </div>
    </div>
  );
};
