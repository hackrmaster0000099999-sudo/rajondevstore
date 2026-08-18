import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  Download, 
  FileText, 
  Sparkles, 
  Bookmark, 
  Eye, 
  Bot,
  Layers,
  ArrowRight
} from 'lucide-react';
import { PromptDocItem } from '../types';
import { useStore } from '../context/StoreContext';

interface PromptCardProps {
  item: PromptDocItem;
}

export const PromptCard: React.FC<PromptCardProps> = ({ item }) => {
  const { 
    language, 
    toggleBookmark, 
    isBookmarked, 
    startDownload, 
    setSelectedItemModal 
  } = useStore();

  const [copied, setCopied] = useState(false);
  const bookmarked = isBookmarked(item.id);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.promptText) {
      navigator.clipboard.writeText(item.promptText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getFormatBadge = (fmt: string) => {
    switch (fmt) {
      case 'prompt':
        return { text: 'AI Prompt', bg: 'bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800' };
      case 'pdf':
        return { text: 'PDF Doc', bg: 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800' };
      case 'markdown':
        return { text: 'Markdown Guide', bg: 'bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800' };
      default:
        return { text: 'Document', bg: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700' };
    }
  };

  const badgeInfo = getFormatBadge(item.format);

  return (
    <div 
      id={`prompt-card-${item.id}`}
      className="group relative flex flex-col justify-between rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 shadow-xs hover:shadow-md hover:border-purple-500/40 transition-all duration-200"
    >
      <div>
        {/* Top Format & Bookmark Row */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${badgeInfo.bg}`}>
              {badgeInfo.text}
            </span>
            <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
              {item.readTime || item.fileSize}
            </span>
          </div>

          <button
            onClick={() => toggleBookmark(item.id)}
            title={bookmarked ? 'Remove bookmark' : 'Bookmark resource'}
            className={`p-1.5 rounded-lg border transition-colors ${
              bookmarked
                ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-300 dark:border-amber-700 text-amber-500'
                : 'bg-zinc-50 dark:bg-zinc-800/60 border-zinc-200 dark:border-zinc-700 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'
            }`}
          >
            <Bookmark size={15} className={bookmarked ? 'fill-current' : ''} />
          </button>
        </div>

        {/* Title */}
        <h3 
          onClick={() => setSelectedItemModal(item)}
          className="font-bold text-base text-zinc-900 dark:text-zinc-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 cursor-pointer transition-colors line-clamp-1 mb-1.5"
        >
          {language === 'bn' ? item.titleBn || item.title : item.title}
        </h3>

        {/* Subtitle / Description */}
        <p className="text-xs text-zinc-600 dark:text-zinc-300 line-clamp-2 mb-3 leading-relaxed">
          {language === 'bn' ? item.descriptionBn || item.description : item.description}
        </p>

        {/* Model Support Badges */}
        <div className="mb-3">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 block mb-1.5">
            {language === 'bn' ? 'মডেল সাপোর্ট:' : 'Target Models:'}
          </span>
          <div className="flex flex-wrap gap-1">
            {item.modelSupport.map((model) => (
              <span 
                key={model}
                className="text-[10px] px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 font-medium border border-zinc-200/60 dark:border-zinc-700/60 flex items-center gap-1"
              >
                <Bot size={10} className="text-purple-500" />
                {model}
              </span>
            ))}
          </div>
        </div>

        {/* Code/Prompt Preview Snippet Box */}
        {item.previewSnippet && (
          <div 
            onClick={() => setSelectedItemModal(item)}
            className="p-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-950 border border-zinc-800 font-mono text-[11px] text-zinc-300 mb-4 cursor-pointer hover:border-purple-500/40 transition-colors relative overflow-hidden"
          >
            <div className="line-clamp-2 leading-relaxed opacity-90">
              {item.previewSnippet}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent flex items-end justify-end p-1.5">
              <span className="text-[10px] text-purple-400 font-sans font-semibold flex items-center gap-1 bg-zinc-900/90 px-1.5 py-0.5 rounded border border-purple-500/30">
                {language === 'bn' ? 'সম্পূর্ণ দেখুন' : 'View Full'} <Eye size={10} />
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between gap-2">
        <button
          onClick={() => setSelectedItemModal(item)}
          className="text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:text-purple-600 dark:hover:text-purple-400 flex items-center gap-1 transition-colors px-1"
        >
          <span>{item.variables ? (language === 'bn' ? 'কাস্টমাইজ প্রম্পট' : 'Customize') : (language === 'bn' ? 'রিভিউ' : 'Details')}</span>
          <ArrowRight size={12} />
        </button>

        <div className="flex items-center gap-1.5">
          {/* Copy Prompt Button */}
          {item.promptText && (
            <button
              onClick={handleCopy}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 hover:bg-purple-100 dark:hover:bg-purple-950/60 hover:text-purple-600 dark:hover:text-purple-300'
              }`}
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
              <span>{copied ? (language === 'bn' ? 'কপি হয়েছে!' : 'Copied!') : (language === 'bn' ? 'কপি' : 'Copy')}</span>
            </button>
          )}

          {/* Download File Button */}
          <button
            id={`btn-dl-prompt-${item.id}`}
            onClick={() => startDownload(item)}
            title="Download Document"
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 active:scale-95 text-white text-xs font-bold transition-all shadow-xs shadow-purple-600/30"
          >
            <Download size={13} />
            <span>{item.format === 'pdf' ? 'PDF' : (language === 'bn' ? 'ফাইল' : 'Save')}</span>
          </button>
        </div>
      </div>

    </div>
  );
};
