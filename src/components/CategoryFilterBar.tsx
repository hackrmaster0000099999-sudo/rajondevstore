import React from 'react';
import { 
  Layers, 
  Smartphone, 
  FileText, 
  Code2, 
  Filter, 
  X
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CategoryFilterBar: React.FC = () => {
  const { 
    currentCategory, 
    setCurrentCategory,
    searchQuery,
    setSearchQuery,
    setIsMenuSheetOpen
  } = useStore();

  const categories = [
    {
      id: 'All Content',
      label: 'All Content',
      icon: Layers
    },
    {
      id: 'Android Apps',
      label: 'Android Apps',
      icon: Smartphone
    },
    {
      id: 'Files & Docs',
      label: 'Files & Docs',
      icon: FileText
    },
    {
      id: 'Source Code',
      label: 'Source Code',
      icon: Code2
    }
  ];

  const getHeaderTitle = () => {
    if (searchQuery.trim() !== '') {
      return `Search Results for "${searchQuery}"`;
    }
    if (currentCategory === 'Android Apps' || currentCategory === 'অ্যান্ড্রয়েড অ্যাপস') {
      return 'Android Applications & Tools';
    }
    if (currentCategory === 'Files & Docs' || currentCategory === 'ফাইলস ও ডকুমেন্ট') {
      return 'Documents & AI Prompt Library';
    }
    if (currentCategory === 'Source Code' || currentCategory === 'সোর্স কোড') {
      return 'Turnkey Full-Stack Source Codes';
    }
    return 'Popular Apps & Resources';
  };

  return (
    <div className="space-y-3.5 my-4">
      {/* Category Pills Bar (Horizontal Scrollable) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = currentCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setCurrentCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap active:scale-95 shadow-xs cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-indigo-500/25'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              <Icon size={14} className={isActive ? 'text-white' : 'text-indigo-600'} />
              <span>{cat.label}</span>
            </button>
          );
        })}

        {/* More categories trigger */}
        <button
          onClick={() => setIsMenuSheetOpen(true)}
          className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 hover:bg-slate-50 transition-all whitespace-nowrap cursor-pointer shadow-xs"
        >
          <Filter size={13} />
          <span>Filter</span>
        </button>
      </div>

      {/* Active Search Query Bar (if any) */}
      {searchQuery && (
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-indigo-50 border border-indigo-200 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-indigo-700">
              Active Search Filter:
            </span>
            <span className="font-semibold text-slate-800">
              "{searchQuery}"
            </span>
          </div>

          <button
            onClick={() => setSearchQuery('')}
            className="p-1 text-slate-400 hover:text-slate-700"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Section Header */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2 font-black text-sm sm:text-base text-slate-900">
          <div className="w-1.5 h-4 rounded-full bg-gradient-to-b from-indigo-600 to-violet-600" />
          <h2>{getHeaderTitle()}</h2>
        </div>
      </div>
    </div>
  );
};
