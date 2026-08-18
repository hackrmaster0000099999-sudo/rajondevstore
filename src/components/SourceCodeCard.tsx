import React from 'react';
import { 
  Code2, 
  ExternalLink, 
  ShoppingCart, 
  Download, 
  Star, 
  Bookmark, 
  CheckCircle2, 
  Layers, 
  Sparkles,
  DollarSign
} from 'lucide-react';
import { SourceCodeItem } from '../types';
import { useStore } from '../context/StoreContext';

interface SourceCodeCardProps {
  item: SourceCodeItem;
}

export const SourceCodeCard: React.FC<SourceCodeCardProps> = ({ item }) => {
  const { 
    language, 
    toggleBookmark, 
    isBookmarked, 
    hasPurchased, 
    startDownload, 
    setSelectedItemModal,
    setCheckoutItem
  } = useStore();

  const isBought = hasPurchased(item.id);
  const bookmarked = isBookmarked(item.id);

  return (
    <div 
      id={`source-code-card-${item.id}`}
      className="group relative flex flex-col justify-between rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 shadow-xs hover:shadow-md hover:border-amber-500/40 transition-all duration-200"
    >
      <div>
        {/* Top Price Tag & Bookmark */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100">
                ${item.price}
              </span>
              <span className="text-xs text-zinc-400 line-through">
                ${item.originalPrice}
              </span>
            </div>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
            </span>
          </div>

          <div className="flex items-center gap-1">
            {isBought && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <CheckCircle2 size={11} />
                {language === 'bn' ? 'আনলকড' : 'Unlocked'}
              </span>
            )}
            
            <button
              onClick={() => toggleBookmark(item.id)}
              title={bookmarked ? 'Remove bookmark' : 'Bookmark codebase'}
              className={`p-1.5 rounded-lg border transition-colors ${
                bookmarked
                  ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-300 dark:border-amber-700 text-amber-500'
                  : 'bg-zinc-50 dark:bg-zinc-800/60 border-zinc-200 dark:border-zinc-700 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'
              }`}
            >
              <Bookmark size={15} className={bookmarked ? 'fill-current' : ''} />
            </button>
          </div>
        </div>

        {/* Title */}
        <h3 
          onClick={() => setSelectedItemModal(item)}
          className="font-bold text-base text-zinc-900 dark:text-zinc-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 cursor-pointer transition-colors line-clamp-1 mb-1"
        >
          {language === 'bn' ? item.titleBn || item.title : item.title}
        </h3>

        {/* Subtitle */}
        <p className="text-xs text-zinc-600 dark:text-zinc-300 line-clamp-2 mb-3 leading-relaxed">
          {language === 'bn' ? item.subtitleBn || item.subtitle : item.subtitle}
        </p>

        {/* Tech Stack Chips */}
        <div className="mb-3.5">
          <div className="flex flex-wrap gap-1.5">
            {item.techStack.slice(0, 4).map((tech) => (
              <span 
                key={tech}
                className="text-[10px] px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800/90 text-zinc-700 dark:text-zinc-300 font-medium border border-zinc-200/70 dark:border-zinc-700/70"
              >
                {tech}
              </span>
            ))}
            {item.techStack.length > 4 && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                +{item.techStack.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Sales & Bundle meta */}
        <div className="flex items-center gap-3 text-xs text-zinc-400 mb-3">
          <div className="flex items-center gap-1 font-semibold text-emerald-400">
            <CheckCircle2 size={12} />
            <span>{item.salesCount} {language === 'bn' ? 'বিক্রয়' : 'orders'}</span>
          </div>
          <span>•</span>
          <span>{item.bundleSize}</span>
          <span>•</span>
          <span className="text-zinc-500 font-mono">ZIP</span>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between gap-2">
        <button
          onClick={() => setSelectedItemModal(item)}
          className="text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:text-amber-600 dark:hover:text-amber-400 flex items-center gap-1 transition-colors px-1"
        >
          <Code2 size={13} />
          <span>{language === 'bn' ? 'কোড প্রিভিউ' : 'Code Preview'}</span>
        </button>

        {isBought ? (
          <button
            onClick={() => startDownload(item)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold transition-all shadow-xs shadow-emerald-600/30"
          >
            <Download size={13} />
            <span>{language === 'bn' ? 'সোর্স ডাউনলোড' : 'Download ZIP'}</span>
          </button>
        ) : (
          <button
            id={`btn-buy-code-${item.id}`}
            onClick={() => setCheckoutItem(item)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 active:scale-95 text-white text-xs font-bold transition-all shadow-xs shadow-amber-500/30"
          >
            <ShoppingCart size={13} />
            <span>{language === 'bn' ? 'কিনুন' : 'Get Code'} (${item.price})</span>
          </button>
        )}
      </div>

    </div>
  );
};
