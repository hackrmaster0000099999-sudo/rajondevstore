import React, { useState, useEffect } from 'react';
import { ShieldAlert } from 'lucide-react';

export const AdBlockDetector: React.FC = () => {
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    let adbDetected = false;
    let adbCheckInterval: NodeJS.Timeout | null = null;
    
    // 1. Bait Classes (CSS Based Blocking)
    const adbBaitClasses = [
      'adsbox', 'ad-banner', 'banner_ad', 'text-ad', 'textAd', 
      'ad-container', 'adsbygoogle', 'pub_300x250', 'ad-slot-inner', 'adSlot'
    ];
    
    // 2. Network DNS/Extension Blocking Probes
    const ADB_AD_SCRIPT_URLS = [
      'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
      'https://quge5.com/88/tag.min.js'
    ];
    
    const ADB_PROBE_TIMEOUT_MS = 2500;
    const ADB_BAIT_CHECK_DELAY_MS = 500;
    const ADB_BAIT_BLOCK_RATIO = 0.5;

    function createBaitElements() {
      const baits: HTMLDivElement[] = [];
      adbBaitClasses.forEach(cls => {
        const el = document.createElement('div');
        el.className = cls;
        el.setAttribute('style', 'position:absolute !important;left:-9999px !important;top:-9999px !important;height:32px !important;width:32px !important;pointer-events:none !important;');
        el.innerHTML = '&nbsp;';
        document.body.appendChild(el);
        baits.push(el);
      });
      return baits;
    }

    function isElementBlocked(el: HTMLDivElement) {
      if (!el || !document.body.contains(el)) return true;
      if (el.offsetParent === null && window.getComputedStyle(el).position !== 'fixed') return true;
      if (el.offsetHeight === 0 || el.offsetWidth === 0) return true;
      const cs = window.getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden' || cs.opacity === '0') return true;
      return false;
    }

    function checkBaitBlocked(baits: HTMLDivElement[]) {
      let blockedCount = 0;
      baits.forEach(el => {
        if (isElementBlocked(el)) blockedCount++;
      });
      return (blockedCount / baits.length) >= ADB_BAIT_BLOCK_RATIO;
    }

    function probeSingleUrl(url: string, callback: (blocked: boolean) => void) {
      let settled = false;
      const finish = (blocked: boolean) => {
        if (settled) return;
        settled = true;
        callback(blocked);
      };

      const timeoutId = setTimeout(() => { finish(false); }, ADB_PROBE_TIMEOUT_MS);

      try {
        fetch(url, {
          method: 'HEAD',
          mode: 'no-cors',
          cache: 'no-store'
        }).then(() => {
          clearTimeout(timeoutId);
          finish(false);
        }).catch(() => {
          clearTimeout(timeoutId);
          finish(true);
        });
      } catch (e) {
        clearTimeout(timeoutId);
        finish(false);
      }
    }

    function probeAdNetwork(callback: (blocked: boolean) => void) {
      const results: boolean[] = [];
      let pending = ADB_AD_SCRIPT_URLS.length;
      ADB_AD_SCRIPT_URLS.forEach(url => {
        probeSingleUrl(url, (blocked) => {
          results.push(blocked);
          pending--;
          if (pending === 0) {
            callback(results.indexOf(true) !== -1);
          }
        });
      });
    }

    function runAdbCheck() {
      if (adbDetected) return;
      const baits = createBaitElements();
      let baitBlocked = false;
      let probeBlocked = false;
      let resolvedCount = 0;

      function finalizeCheck() {
        resolvedCount++;
        if (resolvedCount >= 2) {
          baits.forEach(el => { if (el && el.parentNode) el.parentNode.removeChild(el); });
          if (baitBlocked || probeBlocked) {
            adbDetected = true;
            setIsBlocked(true);
          }
        }
      }

      setTimeout(() => {
        baitBlocked = checkBaitBlocked(baits);
        finalizeCheck();
      }, ADB_BAIT_CHECK_DELAY_MS);

      probeAdNetwork((blocked) => {
        probeBlocked = blocked;
        finalizeCheck();
      });
    }

    // Initial check
    runAdbCheck();

    // Check every 5 seconds as per your code
    adbCheckInterval = setInterval(() => {
      if (!adbDetected) {
        runAdbCheck();
      }
    }, 5000);

    return () => {
      if (adbCheckInterval) clearInterval(adbCheckInterval);
    };
  }, []);

  if (!isBlocked) return null;

  return (
    <div className="fixed inset-0 z-[999999] bg-[#F3F4F6]/95 backdrop-blur-[24px] flex items-center justify-center p-6 select-none">
      <div className="bg-white max-w-[420px] w-full rounded-[28px] py-[28px] px-[25px] pt-[38px] text-center shadow-[0_25px_55px_rgba(239,68,68,0.18),0_0_40px_rgba(79,70,229,0.12)] border border-red-500/35 relative overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="absolute top-0 left-0 right-0 h-[5px] bg-gradient-to-r from-red-600 via-amber-500 to-red-600"></div>
        
        <div className="w-[88px] h-[88px] rounded-full flex items-center justify-center mx-auto mb-[18px] bg-red-500/10 border border-red-500/20 relative animate-[pulse_1.6s_ease-in-out_infinite]">
          <ShieldAlert size={44} className="text-red-500 drop-shadow-[0_6px_16px_rgba(239,68,68,0.35)]" />
        </div>
        
        <h2 className="text-[1.4rem] font-extrabold text-slate-900 mb-[10px] tracking-[-0.3px]">
          অ্যাডব্লকার সনাক্ত করা হয়েছে!
        </h2>
        
        <p className="text-slate-500 text-[0.9rem] font-medium mb-[14px] leading-[1.6]">
          আমাদের ফ্রি সার্ভিস চালু রাখতে এবং ফাইলটি নিরাপদে ডাউনলোড করতে অনুগ্রহ করুন আপনার ব্রাউজারের AdBlocker সম্পূর্ণভাবে বন্ধ করুন।
        </p>

        <div className="bg-black/5 rounded-[14px] py-[12px] px-[14px] mb-[18px] text-left">
          <ul className="text-[0.8rem] text-slate-500 space-y-1 font-medium leading-[1.8]">
            <li className="relative pl-[20px] before:content-['✓'] before:absolute before:left-0 before:text-emerald-600 before:font-extrabold">ব্রাউজারের AdBlock/AdGuard এক্সটেনশন বন্ধ করুন</li>
            <li className="relative pl-[20px] before:content-['✓'] before:absolute before:left-0 before:text-emerald-600 before:font-extrabold">VPN বা সিস্টেম-লেভেল অ্যাড ফিল্টার অ্যাপ থাকলে বন্ধ করুন</li>
            <li className="relative pl-[20px] before:content-['✓'] before:absolute before:left-0 before:text-emerald-600 before:font-extrabold">এরপর নিচের বাটনে চাপ দিয়ে পেজটি রিফ্রেশ করুন</li>
          </ul>
        </div>

        <div className="text-[0.78rem] text-slate-500/75 mb-[18px] flex items-center justify-center gap-[6px] font-medium">
          <div className="w-[7px] h-[7px] rounded-full bg-red-600 animate-[pulse_1.2s_infinite]"></div>
          লাইভ চেক চলছে...
        </div>

        <button 
          onClick={() => window.location.reload()}
          className="w-full py-[14px] px-[20px] rounded-[14px] bg-gradient-to-br from-indigo-600 to-indigo-800 text-white font-extrabold text-[0.95rem] transition-transform active:scale-[0.96] shadow-[0_8px_20px_rgba(79,70,229,0.25)]"
        >
          অ্যাডব্লকার বন্ধ করে রিফ্রেশ দিন
        </button>
      </div>
    </div>
  );
};
