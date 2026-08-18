import React, { useState } from 'react';
import { 
  X, 
  Megaphone
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const NoticeModal: React.FC = () => {
  const { 
    isNoticeModalOpen, 
    setIsNoticeModalOpen
  } = useStore();

  const [dontShowToday, setDontShowToday] = useState(false);

  if (!isNoticeModalOpen) return null;

  const handleClose = () => {
    if (dontShowToday) {
      try {
        localStorage.setItem('rds_noticeDismissDate', new Date().toDateString());
      } catch {}
    }
    setIsNoticeModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      
      {/* Notice Card */}
      <div 
        id="notice-box"
        className="relative w-full max-w-sm rounded-3xl bg-white border border-slate-200 shadow-2xl shadow-slate-900/20 p-6 space-y-4 my-auto overflow-hidden animate-in zoom-in-95 duration-200 text-slate-900"
      >
        {/* Glow backdrop decorative */}
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-indigo-50 blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X size={17} />
        </button>

        {/* Notice Icon */}
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white flex items-center justify-center text-xl shadow-md shadow-indigo-600/25">
          <Megaphone size={22} />
        </div>

        {/* Notice Title */}
        <div>
          <h3 className="text-base sm:text-lg font-black text-slate-900">
            📢 Welcome & Important Notice
          </h3>
        </div>

        {/* Notice Body (English) */}
        <div className="text-xs text-slate-600 space-y-2.5 leading-relaxed">
          <p className="font-semibold text-slate-800">
            Hello & Welcome, Developers & Creators! 👋
          </p>
          <p>
            From Rajon Dev Store, you can safely browse and download verified Android applications, developer AI prompts, and turnkey source codes with verified security and fast speeds.
          </p>
          <p>
            All files are tested for safety and performance. Enjoy fast, direct downloads with our simple 5-step verification system!
          </p>
        </div>

        {/* Checkbox "Don't show today" */}
        <label className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={dontShowToday}
            onChange={(e) => setDontShowToday(e.target.checked)}
            className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer accent-indigo-600"
          />
          <span>Don't show again today</span>
        </label>

        {/* Confirm OK Button */}
        <button
          onClick={handleClose}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 active:scale-98 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-indigo-600/25 transition-all cursor-pointer"
        >
          Got it, Continue
        </button>

      </div>
    </div>
  );
};
