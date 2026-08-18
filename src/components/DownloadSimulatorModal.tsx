import React from 'react';
import { 
  DownloadCloud, 
  CheckCircle2, 
  X, 
  FolderDown, 
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const DownloadSimulatorModal: React.FC = () => {
  const { 
    language, 
    activeDownload, 
    clearActiveDownload, 
    setIsDownloadsDrawerOpen 
  } = useStore();

  if (!activeDownload) return null;

  const isComplete = activeDownload.progress >= 100;

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-sm w-full animate-in slide-in-from-bottom-5 duration-300">
      <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl space-y-3">
        
        {/* Title row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
              isComplete
                ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400'
                : 'bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 animate-pulse'
            }`}>
              {isComplete ? <CheckCircle2 size={16} /> : <DownloadCloud size={16} />}
            </div>

            <div className="min-w-0">
              <h4 className="font-bold text-xs text-zinc-900 dark:text-zinc-100 truncate">
                {activeDownload.name}
              </h4>
              <p className="text-[10px] text-zinc-500">
                {isComplete 
                  ? (language === 'bn' ? 'ডাউনলোড সফল হয়েছে' : 'Download Complete') 
                  : (language === 'bn' ? `ডাউনলোড হচ্ছে... ${activeDownload.progress}%` : `Downloading... ${activeDownload.progress}%`)}
              </p>
            </div>
          </div>

          <button
            onClick={clearActiveDownload}
            className="p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
          >
            <X size={15} />
          </button>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden">
          <div 
            className={`h-full transition-all duration-200 ${
              isComplete ? 'bg-emerald-500' : 'bg-indigo-600'
            }`}
            style={{ width: `${activeDownload.progress}%` }}
          />
        </div>

        {/* Bottom footer status */}
        <div className="flex items-center justify-between text-[11px] text-zinc-500 pt-1">
          <span className="flex items-center gap-1">
            <ShieldCheck size={11} className="text-emerald-500" />
            <span>SHA-256 Verified</span>
          </span>

          <button
            onClick={() => {
              clearActiveDownload();
              setIsDownloadsDrawerOpen(true);
            }}
            className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-0.5"
          >
            <span>{language === 'bn' ? 'ম্যানেজার খুলুন' : 'View Library'}</span>
            <ExternalLink size={10} />
          </button>
        </div>

      </div>
    </div>
  );
};
