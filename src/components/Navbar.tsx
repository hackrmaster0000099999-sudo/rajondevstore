import React from 'react';
import { Search } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Navbar: React.FC = () => {
  const { 
    setIsMenuSheetOpen,
    setIsSearchModalOpen
  } = useStore();

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/90 border-b border-slate-200/90 shadow-xs transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 h-14 flex items-center justify-between">
        
        {/* Left: Custom hamburger menu & Brand */}
        <div className="flex items-center gap-2.5">
          <button
            id="nav-menu-btn"
            aria-label="Open category menu"
            onClick={() => setIsMenuSheetOpen(true)}
            className="w-9 h-9 rounded-xl flex flex-col items-center justify-center gap-1 bg-slate-100 border border-slate-200 active:scale-90 transition-all cursor-pointer shadow-xs hover:border-indigo-400 hover:bg-indigo-50/50"
          >
            <span className="block w-4 h-0.5 rounded-full bg-slate-700" />
            <span className="block w-3 h-0.5 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 -ml-1" />
            <span className="block w-4 h-0.5 rounded-full bg-slate-700" />
          </button>

          <a 
            href="#" 
            className="text-base sm:text-lg font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 via-violet-600 to-sky-600 bg-clip-text text-transparent select-none whitespace-nowrap"
          >
            Rajon Dev Store
          </a>
        </div>

        {/* Right: Quick action buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Search Trigger */}
          <button
            id="nav-search-btn"
            aria-label="Search apps"
            onClick={() => setIsSearchModalOpen(true)}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center text-slate-700 bg-slate-100 border border-slate-200 active:scale-90 transition-all hover:text-indigo-600 hover:bg-indigo-50/80 cursor-pointer shadow-xs"
          >
            <Search size={15} />
          </button>
        </div>

      </div>
    </header>
  );
};
