import React from 'react';
import { 
  X, 
  Bookmark, 
  Trash2, 
  ArrowRight, 
  FolderHeart 
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { allStoreItems } from '../data/mockData';

export const BookmarksModal: React.FC = () => {
  const { 
    isBookmarksModalOpen, 
    setIsBookmarksModalOpen, 
    bookmarks, 
    toggleBookmark,
    openDownloadModal
  } = useStore();

  if (!isBookmarksModalOpen) return null;

  const savedItems = allStoreItems.filter((item) => bookmarks.includes(item.id));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-2.5 sm:p-4 animate-in fade-in duration-200">
      
      <div 
        id="bookmarks-modal"
        className="relative w-full max-w-md rounded-3xl bg-white border border-slate-200 shadow-2xl shadow-slate-900/20 p-5 space-y-4 my-auto max-h-[85vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300 text-slate-900"
      >
        {/* Sheet Handle */}
        <div className="w-9 h-1 rounded-full bg-slate-300 mx-auto -mt-2 mb-2" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            <Bookmark size={17} className="text-amber-500 fill-amber-500" />
            <h3 className="font-extrabold text-sm text-slate-900">
              Saved Wishlist ({savedItems.length})
            </h3>
          </div>

          <button
            onClick={() => setIsBookmarksModalOpen(false)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X size={17} />
          </button>
        </div>

        {/* List of saved items */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {savedItems.length === 0 ? (
            <div className="text-center py-12 space-y-2 text-slate-400">
              <FolderHeart size={36} className="mx-auto opacity-50" />
              <p className="text-xs font-semibold">
                No items saved yet!
              </p>
            </div>
          ) : (
            savedItems.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3"
              >
                <div 
                  onClick={() => {
                    setIsBookmarksModalOpen(false);
                    openDownloadModal(item);
                  }}
                  className="flex items-center gap-2.5 min-w-0 flex-1 cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0 bg-indigo-600 text-white font-bold text-xs">
                    {item.logoUrl ? (
                      <img src={item.logoUrl} alt={item.title} className="w-full h-full object-cover" />
                    ) : (
                      <span>{item.title.charAt(0)}</span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 truncate hover:text-indigo-600">
                      {item.title}
                    </h4>
                    <p className="text-[10px] text-slate-500 truncate">{item.category}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button
                    onClick={() => {
                      setIsBookmarksModalOpen(false);
                      openDownloadModal(item);
                    }}
                    className="p-1.5 px-2.5 rounded-xl bg-indigo-100 text-indigo-700 hover:bg-indigo-200 text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <span>Get</span>
                    <ArrowRight size={12} />
                  </button>

                  <button
                    onClick={() => toggleBookmark(item.id)}
                    className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
