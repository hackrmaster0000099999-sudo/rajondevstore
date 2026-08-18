import React from 'react';
import { 
  X, 
  DownloadCloud, 
  CheckCircle2, 
  Loader2, 
  FileText
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const DownloadsDrawer: React.FC = () => {
  const { 
    isDownloadsDrawerOpen, 
    setIsDownloadsDrawerOpen, 
    downloads, 
    activeDownload
  } = useStore();

  if (!isDownloadsDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-2.5 sm:p-4 animate-in fade-in duration-200">
      
      <div 
        id="downloads-drawer"
        className="relative w-full max-w-md rounded-3xl bg-white border border-slate-200 shadow-2xl shadow-slate-900/20 p-5 space-y-4 my-auto max-h-[85vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300 text-slate-900"
      >
        {/* Sheet Handle */}
        <div className="w-9 h-1 rounded-full bg-slate-300 mx-auto -mt-2 mb-2" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            <DownloadCloud size={18} className="text-emerald-600" />
            <h3 className="font-extrabold text-sm text-slate-900">
              Download Manager
            </h3>
          </div>

          <button
            onClick={() => setIsDownloadsDrawerOpen(false)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X size={17} />
          </button>
        </div>

        {/* Active downloading task banner */}
        {activeDownload && activeDownload.status === 'downloading' && (
          <div className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-indigo-700">
              <span className="flex items-center gap-1.5 truncate pr-2">
                <Loader2 size={13} className="animate-spin" />
                {activeDownload.name}
              </span>
              <span>{activeDownload.progress}%</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-200 rounded-full"
                style={{ width: `${activeDownload.progress}%` }}
              />
            </div>
            <p className="text-[10px] text-slate-500 text-right">
              {activeDownload.size} • Downloading High Speed
            </p>
          </div>
        )}

        {/* Downloaded history list */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Completed Downloads:
          </div>

          {downloads.length === 0 ? (
            <div className="text-center py-10 space-y-2 text-slate-400">
              <FileText size={32} className="mx-auto opacity-50" />
              <p className="text-xs">
                No downloads yet
              </p>
            </div>
          ) : (
            downloads.map((task) => (
              <div
                key={task.id}
                className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 font-bold">
                    <CheckCircle2 size={18} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 truncate">
                      {task.name}
                    </h4>
                    <p className="text-[10px] text-slate-500">
                      {task.size} • {task.downloadDate}
                    </p>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded-lg text-[9px] font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">
                  Ready
                </span>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
