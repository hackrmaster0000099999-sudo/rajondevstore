import React from 'react';
import { 
  X, 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles, 
  Cpu, 
  Layers, 
  ShieldCheck,
  CloudDownload 
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const DescriptionModal: React.FC = () => {
  const { 
    selectedItem, 
    isDescriptionModalOpen, 
    setIsDescriptionModalOpen,
    getFormattedDownloadCount
  } = useStore();

  if (!isDescriptionModalOpen || !selectedItem) return null;

  const realDownloads = getFormattedDownloadCount(selectedItem);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-2.5 sm:p-4 animate-in fade-in duration-200">
      
      {/* Modal Card */}
      <div 
        id="description-modal"
        className="relative w-full max-w-lg rounded-3xl bg-white border border-slate-200 shadow-2xl shadow-slate-900/20 p-5 sm:p-6 space-y-4 my-auto max-h-[85vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300 text-slate-900"
      >
        {/* Sheet Handle */}
        <div className="w-9 h-1 rounded-full bg-slate-300 mx-auto -mt-2 mb-2" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2 min-w-0 pr-4">
            <span className="text-base sm:text-lg">📖</span>
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900 truncate">
              {selectedItem.title} - Overview & Guide
            </h3>
          </div>

          <button
            onClick={() => setIsDescriptionModalOpen(false)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors flex-shrink-0 cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Body Content */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 text-xs sm:text-sm text-slate-700">
          
          {/* Security & Downloads Header */}
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-emerald-600 font-bold">
              <ShieldCheck size={18} />
              <div>
                <span className="block text-xs text-slate-900 font-extrabold">100% Tested & Verified Clean</span>
                <span className="block text-[10px] text-slate-500 font-normal">Scanned on Rajon Dev Store Cloud</span>
              </div>
            </div>
            <div className="text-right flex items-center gap-1 text-indigo-600 font-bold">
              <CloudDownload size={15} />
              <span className="text-xs">{realDownloads}</span>
            </div>
          </div>

          {/* Main Description */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 leading-relaxed text-slate-800">
            <p>{selectedItem.description}</p>
          </div>

          {/* Key Features */}
          {'features' in selectedItem && selectedItem.features && selectedItem.features.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-extrabold text-xs uppercase tracking-wider text-indigo-700 flex items-center gap-1.5">
                <Sparkles size={14} />
                <span>Key Features:</span>
              </h4>
              <div className="space-y-1.5">
                {selectedItem.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs">
                    <CheckCircle2 size={14} className="text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-800">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Highlights & Security if any */}
          {'keyHighlights' in selectedItem && selectedItem.keyHighlights && selectedItem.keyHighlights.length > 0 && (
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1.5">
              <h4 className="font-extrabold text-xs text-emerald-800 flex items-center gap-1.5">
                <ShieldCheck size={14} />
                <span>Key Highlights:</span>
              </h4>
              <ul className="list-disc list-inside text-xs space-y-1 text-emerald-900 font-medium">
                {selectedItem.keyHighlights.map((hl, i) => (
                  <li key={i}>{hl}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Installation & Setup Guide */}
          {selectedItem.installGuide && (
            <div className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-200 space-y-2">
              <h4 className="font-extrabold text-xs text-indigo-800 flex items-center gap-1.5">
                <Layers size={14} />
                <span>Installation & Usage Guide:</span>
              </h4>
              <div className="text-xs whitespace-pre-line leading-relaxed text-slate-800 font-medium">
                {selectedItem.installGuide}
              </div>
            </div>
          )}

          {/* System Requirements / Min Reqs */}
          {'minReqs' in selectedItem && selectedItem.minReqs && (
            <div className="flex items-center gap-2 text-xs text-slate-600 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <Cpu size={14} className="text-indigo-600 flex-shrink-0" />
              <span><strong>Requirements:</strong> {selectedItem.minReqs}</span>
            </div>
          )}

        </div>

        {/* Back button */}
        <div className="pt-2 border-t border-slate-200">
          <button
            onClick={() => setIsDescriptionModalOpen(false)}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-indigo-600/20 active:scale-98 cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>Back to Download</span>
          </button>
        </div>

      </div>
    </div>
  );
};
