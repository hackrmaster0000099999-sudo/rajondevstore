import React from 'react';
import { Layers } from 'lucide-react';
import { StoreItem } from '../types';
import { useStore } from '../context/StoreContext';

interface AppCardProps {
  item: StoreItem;
}

export const AppCard: React.FC<AppCardProps> = ({ item }) => {
  const { openDownloadModal } = useStore();

  return (
    <div 
      id={`card-${item.id}`}
      onClick={() => openDownloadModal(item)}
      className="group relative rounded-2xl p-3 sm:p-3.5 flex flex-col justify-between gap-2.5 bg-white border border-slate-200/90 shadow-sm hover:border-indigo-400 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 active:scale-[0.98] transition-all duration-200 cursor-pointer overflow-hidden"
    >
      {/* Glow background accent on hover */}
      <div className="absolute -top-12 -right-12 w-28 h-28 bg-indigo-50 rounded-full blur-2xl group-hover:bg-indigo-100/60 transition-all duration-300 pointer-events-none" />

      {/* Top: Icon with clean status indicator */}
      <div className="flex items-center justify-between gap-2">
        <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-indigo-500 via-indigo-600 to-violet-600 text-white font-black text-lg sm:text-xl shadow-md border border-white/40 group-hover:scale-105 group-hover:shadow-indigo-500/25 transition-all duration-200">
          {item.logoUrl ? (
            <img 
              src={item.logoUrl} 
              alt={item.title} 
              className="w-full h-full object-cover" 
              loading="lazy"
            />
          ) : (
            <span>{item.title.charAt(0)}</span>
          )}
        </div>

        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] flex-shrink-0" />
      </div>

      {/* Box 1: Beautiful Application Name Container (Light Theme) */}
      <div className="w-full rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 group-hover:border-indigo-300 group-hover:bg-indigo-50/40 p-2.5 transition-all duration-200">
        <span className="text-[9px] uppercase font-extrabold tracking-wider text-indigo-600 block mb-0.5 select-none">
          Application
        </span>
        <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug break-words">
          {item.title}
        </h3>
      </div>

      {/* Box 2: Beautiful Category Name Container (Light Theme) */}
      <div className="w-full rounded-xl bg-indigo-50/80 border border-indigo-200/80 group-hover:border-indigo-300 px-2.5 py-1.5 flex items-center justify-between gap-1.5 transition-all duration-200">
        <div className="flex items-center gap-1.5 min-w-0">
          <Layers size={13} className="text-indigo-600 flex-shrink-0" />
          <span className="text-[11px] font-bold text-indigo-700 truncate">
            {item.category}
          </span>
        </div>
      </div>

    </div>
  );
};
