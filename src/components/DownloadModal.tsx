import React from 'react';
import { 
  X, 
  BookOpen, 
  Unlock, 
  CheckCircle2, 
  CloudDownload, 
  AlertTriangle, 
  Loader2, 
  ShieldCheck
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const DownloadModal: React.FC = () => {
  const { 
    selectedItem, 
    isDownloadModalOpen, 
    setIsDownloadModalOpen,
    setIsDescriptionModalOpen,
    step1Verified,
    step2Verified,
    step3Verified,
    step4Verified,
    step5Verified,
    isVerifyingStep,
    stepCountdown,
    allStepsCompleted,
    handleVerifyStep,
    startDownload
  } = useStore();

  if (!isDownloadModalOpen || !selectedItem) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-2.5 sm:p-4 animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div 
        id="download-modal"
        className="relative w-full max-w-md rounded-3xl bg-white border border-slate-200 shadow-2xl shadow-slate-900/20 p-5 sm:p-6 space-y-4 my-auto overflow-hidden animate-in slide-in-from-bottom-5 duration-300 text-slate-900"
      >
        {/* Sheet Handle */}
        <div className="w-9 h-1 rounded-full bg-slate-300 mx-auto -mt-2 mb-3" />

        {/* Close Button */}
        <button
          onClick={() => setIsDownloadModalOpen(false)}
          className="absolute top-4 right-4 p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* App Header info */}
        <div className="flex items-center gap-3.5 pr-6">
          <div className="w-14 h-14 rounded-2xl overflow-hidden flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-indigo-500 to-violet-600 text-white font-black text-xl shadow-md border border-white/50">
            {selectedItem.logoUrl ? (
              <img 
                src={selectedItem.logoUrl} 
                alt={selectedItem.title} 
                className="w-full h-full object-cover" 
              />
            ) : (
              <span>{selectedItem.title.charAt(0)}</span>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-base font-extrabold text-slate-900 line-clamp-1">
              {selectedItem.title}
            </h3>
            <div className="flex items-center gap-1.5 mt-0.5 text-xs text-slate-500">
              <span>{selectedItem.category}</span>
              <span>•</span>
              <span className="text-emerald-600 font-bold flex items-center gap-0.5">
                <ShieldCheck size={13} />
                Verified Secure
              </span>
            </div>
          </div>
        </div>

        {/* Description & Guide Button */}
        <button
          onClick={() => setIsDescriptionModalOpen(true)}
          className="w-full py-2.5 px-4 rounded-xl bg-indigo-50 hover:bg-indigo-100/80 active:scale-[0.98] border border-indigo-200 text-indigo-700 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
        >
          <BookOpen size={16} />
          <span>📄 View Description & Install Guide</span>
        </button>

        {/* 5-Step Link Unlock Section */}
        <div className="space-y-2.5 pt-1">
          
          {/* Step 1 Button */}
          <button
            onClick={() => handleVerifyStep(1)}
            disabled={step1Verified || isVerifyingStep !== null}
            className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 ${
              step1Verified
                ? 'bg-emerald-600 text-white cursor-default shadow-emerald-600/20'
                : isVerifyingStep === 1
                ? 'bg-indigo-600 text-white cursor-wait'
                : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-indigo-600/20 cursor-pointer'
            }`}
          >
            {isVerifyingStep === 1 ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Please wait... {stepCountdown}s</span>
              </>
            ) : step1Verified ? (
              <>
                <CheckCircle2 size={16} />
                <span>Step 1 Verified ✓</span>
              </>
            ) : (
              <>
                <Unlock size={16} />
                <span>Verify Link (Step 1/5)</span>
              </>
            )}
          </button>

          {/* Step 2 Button */}
          <button
            onClick={() => handleVerifyStep(2)}
            disabled={!step1Verified || step2Verified || isVerifyingStep !== null}
            className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 ${
              step2Verified
                ? 'bg-emerald-600 text-white cursor-default shadow-emerald-600/20'
                : isVerifyingStep === 2
                ? 'bg-indigo-600 text-white cursor-wait'
                : !step1Verified
                ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed shadow-none'
                : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-indigo-600/20 cursor-pointer'
            }`}
          >
            {isVerifyingStep === 2 ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Please wait... {stepCountdown}s</span>
              </>
            ) : step2Verified ? (
              <>
                <CheckCircle2 size={16} />
                <span>Step 2 Verified ✓</span>
              </>
            ) : (
              <>
                <Unlock size={16} />
                <span>Verify Link (Step 2/5)</span>
              </>
            )}
          </button>

          {/* Step 3 Button */}
          <button
            onClick={() => handleVerifyStep(3)}
            disabled={!step2Verified || step3Verified || isVerifyingStep !== null}
            className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 ${
              step3Verified
                ? 'bg-emerald-600 text-white cursor-default shadow-emerald-600/20'
                : isVerifyingStep === 3
                ? 'bg-indigo-600 text-white cursor-wait'
                : !step2Verified
                ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed shadow-none'
                : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-indigo-600/20 cursor-pointer'
            }`}
          >
            {isVerifyingStep === 3 ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Please wait... {stepCountdown}s</span>
              </>
            ) : step3Verified ? (
              <>
                <CheckCircle2 size={16} />
                <span>Step 3 Verified ✓</span>
              </>
            ) : (
              <>
                <Unlock size={16} />
                <span>Verify Link (Step 3/5)</span>
              </>
            )}
          </button>

          {/* Step 4 Button */}
          <button
            onClick={() => handleVerifyStep(4)}
            disabled={!step3Verified || step4Verified || isVerifyingStep !== null}
            className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 ${
              step4Verified
                ? 'bg-emerald-600 text-white cursor-default shadow-emerald-600/20'
                : isVerifyingStep === 4
                ? 'bg-indigo-600 text-white cursor-wait'
                : !step3Verified
                ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed shadow-none'
                : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-indigo-600/20 cursor-pointer'
            }`}
          >
            {isVerifyingStep === 4 ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Please wait... {stepCountdown}s</span>
              </>
            ) : step4Verified ? (
              <>
                <CheckCircle2 size={16} />
                <span>Step 4 Verified ✓</span>
              </>
            ) : (
              <>
                <Unlock size={16} />
                <span>Verify Link (Step 4/5)</span>
              </>
            )}
          </button>

          {/* Step 5 Button */}
          <button
            onClick={() => handleVerifyStep(5)}
            disabled={!step4Verified || step5Verified || isVerifyingStep !== null}
            className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 ${
              step5Verified
                ? 'bg-emerald-600 text-white cursor-default shadow-emerald-600/20'
                : isVerifyingStep === 5
                ? 'bg-indigo-600 text-white cursor-wait'
                : !step4Verified
                ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed shadow-none'
                : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-indigo-600/20 cursor-pointer'
            }`}
          >
            {isVerifyingStep === 5 ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Unlocking link... {stepCountdown}s</span>
              </>
            ) : step5Verified ? (
              <>
                <CheckCircle2 size={16} />
                <span>Step 5 Unlocked ✓</span>
              </>
            ) : (
              <>
                <Unlock size={16} />
                <span>Unlock Link (Step 5/5)</span>
              </>
            )}
          </button>

          {/* Final Secure Download Button */}
          <button
            onClick={() => {
              if (allStepsCompleted) {
                startDownload(selectedItem);
                setIsDownloadModalOpen(false);
              }
            }}
            disabled={!allStepsCompleted}
            className={`w-full py-3.5 px-4 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2.5 transition-all shadow-lg active:scale-98 ${
              allStepsCompleted
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-emerald-500/25 animate-pulse cursor-pointer'
                : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed shadow-none'
            }`}
          >
            <CloudDownload size={18} />
            <span>⚡ Secure Download Now</span>
          </button>
        </div>

        {/* Report broken link / Support Email */}
        <div className="pt-2 border-t border-slate-200 flex flex-col items-center justify-center gap-1 text-center">
          <a
            href={`mailto:zetamod.business@gmail.com?subject=${encodeURIComponent(`Broken Link Report: ${selectedItem.title}`)}&body=${encodeURIComponent(`Hello Support,\n\nI am reporting a broken download link or issue with: ${selectedItem.title}\nID: ${selectedItem.id}\n\nIssue details:\n`)}`}
            className="inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-700 hover:text-amber-800 underline underline-offset-2 transition-colors cursor-pointer"
          >
            <AlertTriangle size={13} className="text-amber-600" />
            <span>⚠️ Link broken? Report here</span>
          </a>
          <a 
            href={`mailto:zetamod.business@gmail.com?subject=${encodeURIComponent(`Issue Report: ${selectedItem.title}`)}`}
            className="text-[10px] text-slate-500 hover:text-indigo-600 transition-colors font-mono font-medium"
          >
            zetamod.business@gmail.com
          </a>
        </div>

      </div>
    </div>
  );
};
