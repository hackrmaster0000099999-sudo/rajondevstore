import React from 'react';
import { 
  X, 
  Layers, 
  Smartphone, 
  FileText, 
  Code2, 
  CheckCircle2 
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CategorySheet: React.FC = () => {
  const { 
    isMenuSheetOpen, 
    setIsMenuSheetOpen, 
    currentCategory, 
    setCurrentCategory
  } = useStore();

  if (!isMenuSheetOpen) return null;

  const categories = [
    {
      id: 'All Content',
      name: 'All Content',
      desc: 'All official apps, AI prompts, and source code files',
      icon: Layers
    },
    {
      id: 'Android Apps',
      name: 'Android Apps',
      desc: 'Official & verified Android applications and tools',
      icon: Smartphone
    },
    {
      id: 'Files & Docs',
      name: 'Files & Docs',
      desc: 'AI prompts, cheatsheets, and developer guides',
      icon: FileText
    },
    {
      id: 'Source Code',
      name: 'Source Code',
      desc: 'Turnkey Next.js, React, and Flutter codebases',
      icon: Code2
    }
  ];

  const handleSelect = (catId: string) => {
    setCurrentCategory(catId);
    setIsMenuSheetOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-2.5 sm:p-4 animate-in fade-in duration-200">
      
      {/* Sheet Container */}
      <div 
        id="sheet"
        className="relative w-full max-w-md rounded-3xl bg-white border border-slate-200 shadow-2xl shadow-slate-900/20 p-5 space-y-4 animate-in slide-in-from-bottom-5 duration-300 text-slate-900"
      >
        {/* Sheet Handle */}
        <div className="w-9 h-1 rounded-full bg-slate-300 mx-auto -mt-2 mb-2" />

        {/* Title */}
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-sm text-slate-900">
            Select Category
          </h3>

          <button
            onClick={() => setIsMenuSheetOpen(false)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X size={17} />
          </button>
        </div>

        {/* Categories List */}
        <div className="space-y-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = currentCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => handleSelect(cat.id)}
                className={`w-full p-3 rounded-2xl flex items-center justify-between gap-3 text-left transition-all active:scale-[0.98] border cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 border-transparent text-white shadow-lg shadow-indigo-600/20'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-indigo-300 hover:bg-indigo-50/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl ${isActive ? 'bg-white/20 text-white' : 'bg-indigo-100 text-indigo-600'}`}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold">
                      {cat.name}
                    </h4>
                    <p className={`text-[10px] ${isActive ? 'text-indigo-100' : 'text-slate-500'}`}>
                      {cat.desc}
                    </p>
                  </div>
                </div>

                {isActive && (
                  <CheckCircle2 size={18} className="text-white flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Telegram Channel Shortcut */}
        <div className="pt-2 border-t border-slate-200">
          <a
            href="https://t.me/+pExk2rGN3JJiMWI1"
            target="_blank"
            rel="noreferrer"
            className="w-full py-2.5 px-3.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>✈️ Join Telegram Community</span>
          </a>
        </div>

      </div>
    </div>
  );
};
