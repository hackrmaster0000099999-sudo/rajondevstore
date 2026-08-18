import React from 'react';
import { Send, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-10 pt-6 pb-12 border-t border-slate-200 text-center space-y-4">
      
      {/* Telegram Channel / Community Callout */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-50 via-purple-50 to-indigo-50 border border-indigo-200/80 max-w-lg mx-auto space-y-2">
        <div className="flex items-center justify-center gap-1.5 text-xs sm:text-sm font-bold text-indigo-700">
          <Send size={15} />
          <span>Join Official Telegram Community</span>
        </div>
        <p className="text-[11px] text-slate-600">
          Get instant notifications whenever new official apps or developer resources are published.
        </p>
        <a
          href="https://t.me/+pExk2rGN3JJiMWI1"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-bold shadow-md shadow-indigo-600/20 active:scale-95 transition-all cursor-pointer"
        >
          <Send size={13} />
          <span>Join Telegram Channel</span>
        </a>
      </div>

      {/* Support / Contact Email for Broken Links */}
      <div className="text-xs text-slate-600 flex items-center justify-center gap-2 flex-wrap pt-1">
        <span className="text-slate-500">Need help or report broken links?</span>
        <a 
          href="mailto:zetamod.business@gmail.com?subject=Rajon%20Dev%20Store%20Support%20Request" 
          className="text-indigo-600 hover:text-indigo-700 font-semibold underline underline-offset-2 flex items-center gap-1 transition-colors"
        >
          <Mail size={13} />
          <span>zetamod.business@gmail.com</span>
        </a>
      </div>

      {/* Copyright */}
      <div className="text-xs text-slate-500 flex items-center justify-center gap-1.5 flex-wrap">
        <span>© {new Date().getFullYear()}</span>
        <span className="font-bold text-slate-800">Rajon Dev Store</span>
        <span className="text-sm">🇧🇩</span>
        <span>• All rights reserved.</span>
      </div>

    </footer>
  );
};
