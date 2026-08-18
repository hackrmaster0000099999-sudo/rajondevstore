import React, { useState, useEffect } from 'react';
import { ShieldAlert, AlertOctagon } from 'lucide-react';

export const AdBlockDetector: React.FC = () => {
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    const checkAdBlock = () => {
      // 1. Create a bait element with common ad class names
      // These classes are aggressively targeted by AdBlock, uBlock Origin, AdGuard, etc.
      const bait = document.createElement('div');
      bait.innerHTML = '&nbsp;';
      bait.className = 'adsbox ad-banner ad-placement doubleclick pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links sponsor-ad';
      bait.style.position = 'absolute';
      bait.style.top = '-9999px';
      bait.style.left = '-9999px';
      bait.style.height = '10px';
      bait.style.width = '10px';
      
      document.body.appendChild(bait);

      // 2. Detect if the bait was hidden by CSS injection (Standard AdBlock behavior)
      const isHiddenByCSS = window.getComputedStyle(bait).display === 'none';
      const isHiddenByHeight = bait.offsetHeight === 0;

      if (isHiddenByCSS || isHiddenByHeight) {
        setIsBlocked(true);
      } else {
        setIsBlocked(false);
      }

      // Cleanup bait
      document.body.removeChild(bait);
    };

    // Run initial check
    checkAdBlock();

    // Aggressive real-time check every 1 second
    const interval = setInterval(checkAdBlock, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!isBlocked) return null;

  return (
    <div className="fixed inset-0 z-[99999] bg-slate-900/95 backdrop-blur-xl flex items-center justify-center p-4 select-none">
      <div className="bg-white max-w-md w-full rounded-[32px] p-8 text-center shadow-[0_0_80px_rgba(220,38,38,0.4)] animate-in zoom-in-95 duration-200">
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 relative">
          <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-20"></div>
          <AlertOctagon size={48} className="text-red-600 relative z-10" />
        </div>
        
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4 tracking-tight">
          অ্যাড ব্লকার ডিটেক্টেড!
        </h2>
        
        <p className="text-slate-600 text-sm sm:text-base font-medium mb-6 leading-relaxed">
          আমরা লক্ষ্য করেছি আপনি একটি <strong className="text-red-600">Ad Blocker</strong> ব্যবহার করছেন। <span className="text-slate-900 font-bold">Rajon Dev Store</span> সম্পূর্ণ ফ্রি এবং এর হাই-স্পিড সার্ভার সচল রাখতে আমরা অ্যাডের উপর নির্ভরশীল।
        </p>

        <div className="bg-red-50 border border-red-100 rounded-2xl p-5 mb-6 text-left">
          <h3 className="font-bold text-red-900 text-sm flex items-center gap-2 mb-3">
            <ShieldAlert size={16} className="text-red-600" />
            কিভাবে সাইট আনলক করবেন:
          </h3>
          <ol className="text-sm text-red-800 space-y-2.5 list-decimal list-inside font-medium">
            <li>আপনার Ad Blocker এক্সটেনশনে ক্লিক করুন।</li>
            <li><strong>"Pause on this site"</strong> বা <strong>"Disable"</strong> অপশনটি বেছে নিন।</li>
            <li>অ্যাড ব্লকার বন্ধ করলেই সাইটটি সাথে সাথে আনলক হয়ে যাবে!</li>
          </ol>
        </div>

        <button 
          onClick={() => window.location.reload()}
          className="w-full py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition-all active:scale-95 shadow-xl shadow-slate-900/20"
        >
          আমি বন্ধ করেছি, রিলোড করুন
        </button>
      </div>
    </div>
  );
};
