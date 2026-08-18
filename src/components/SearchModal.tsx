import React, { useState } from 'react';
import { 
  X, 
  Search, 
  Sparkles, 
  ArrowRight,
  Download
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { allStoreItems } from '../data/mockData';
import { StoreItem } from '../types';

export const SearchModal: React.FC = () => {
  const { 
    isSearchModalOpen, 
    setIsSearchModalOpen, 
    searchQuery, 
    setSearchQuery,
    openDownloadModal
  } = useStore();

  const [localQuery, setLocalQuery] = useState('');

  if (!isSearchModalOpen) return null;

  // Real items from store
  const trendingBubbles = allStoreItems.map((item) => {
    let shortName = item.title.split(' ').slice(0, 2).join(' ');
    return {
      id: item.id,
      name: shortName,
      item
    };
  });

  const currentQuery = (localQuery || searchQuery).toLowerCase().trim();

  const searchResults: StoreItem[] = currentQuery === '' 
    ? allStoreItems.filter(item => item.trending || item.featured).slice(0, 6)
    : allStoreItems.filter((item) => {
        const titleMatch = item.title.toLowerCase().includes(currentQuery);
        const descMatch = item.description.toLowerCase().includes(currentQuery);
        const catMatch = item.category.toLowerCase().includes(currentQuery);
        const tagMatch = 'tags' in item && Array.isArray(item.tags) && item.tags.some((t) => t.toLowerCase().includes(currentQuery));
        return titleMatch || descMatch || catMatch || tagMatch;
      });

  const handleSelectBubble = (bubbleName: string) => {
    setLocalQuery(bubbleName);
    setSearchQuery(bubbleName);
  };

  const handleClear = () => {
    setLocalQuery('');
    setSearchQuery('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-sm flex items-start justify-center p-3 sm:p-4 pt-16 sm:pt-20 animate-in fade-in duration-200">
      
      {/* Search Modal Box */}
      <div 
        id="search-modal"
        className="relative w-full max-w-lg rounded-3xl bg-white border border-slate-200 shadow-2xl shadow-slate-900/20 p-5 space-y-4 animate-in slide-in-from-top-4 duration-300 text-slate-900"
      >
        {/* Sheet Handle */}
        <div className="w-9 h-1 rounded-full bg-slate-300 mx-auto -mt-2 mb-2" />

        {/* Title */}
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
            <Search size={16} className="text-indigo-600" />
            <span>Search Store Items</span>
          </h3>

          <button
            onClick={() => {
              setIsSearchModalOpen(false);
              handleClear();
            }}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X size={17} />
          </button>
        </div>

        {/* Search input field */}
        <div className="relative flex items-center">
          <Search size={16} className="absolute left-3.5 text-slate-400 pointer-events-none" />
          <input
            type="text"
            autoFocus
            value={localQuery || searchQuery}
            onChange={(e) => {
              setLocalQuery(e.target.value);
              setSearchQuery(e.target.value);
            }}
            placeholder="Search apps, documents, or source code..."
            className="w-full pl-10 pr-9 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white focus:outline-none text-slate-900 placeholder:text-slate-400 transition-all"
          />
          {(localQuery || searchQuery) && (
            <button
              onClick={handleClear}
              className="absolute right-3 text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Search Bubbles (Quick suggestions) */}
        {trendingBubbles.length > 0 && (
          <div className="space-y-1.5">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              TRENDING SUGGESTIONS:
            </div>
            <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto pr-1">
              {trendingBubbles.map((bubble) => {
                const isSelected = currentQuery === bubble.name.toLowerCase();
                return (
                  <button
                    key={bubble.id}
                    onClick={() => handleSelectBubble(bubble.name)}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1 shadow-xs ${
                      isSelected 
                        ? 'bg-indigo-600 text-white border border-indigo-600 shadow-indigo-500/20' 
                        : 'bg-slate-100 border border-slate-200 text-slate-700 hover:border-indigo-300 hover:text-indigo-600 active:scale-95'
                    }`}
                  >
                    <Sparkles size={11} className="text-amber-500" />
                    <span>{bubble.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Real Live Search / Results */}
        <div className="space-y-2 pt-2 border-t border-slate-200">
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-500">
            <span>
              {currentQuery === '' ? 'Available Items:' : `${searchResults.length} Matches found:`}
            </span>
          </div>

          {searchResults.length === 0 ? (
            <div className="py-8 text-center text-slate-500 text-xs">
              {allStoreItems.length === 0 
                ? 'Store is ready for your real data import.' 
                : `No items matching "${currentQuery}".`}
            </div>
          ) : (
            <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
              {searchResults.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setIsSearchModalOpen(false);
                    openDownloadModal(item);
                  }}
                  className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/40 flex items-center justify-between gap-3 cursor-pointer transition-all active:scale-[0.99] group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-9 h-9 rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0 bg-indigo-100 border border-indigo-200 text-indigo-600 font-bold text-xs">
                      {item.logoUrl ? (
                        <img src={item.logoUrl} alt={item.title} className="w-full h-full object-cover" />
                      ) : (
                        <span>{item.title.charAt(0)}</span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
                        {item.title}
                      </h4>
                      <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-0.5">
                        <span className="text-indigo-600 font-bold">{item.category}</span>
                        <span>•</span>
                        <span className="flex items-center gap-0.5 text-slate-600 font-medium">
                          <Download size={10} className="text-indigo-600" />
                          {item.downloadCount || 'Direct'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-100 text-indigo-700 group-hover:bg-indigo-600 group-hover:text-white font-bold text-xs flex-shrink-0 transition-all">
                    <span>View</span>
                    <ArrowRight size={12} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
