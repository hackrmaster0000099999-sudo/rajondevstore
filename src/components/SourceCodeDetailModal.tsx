import React, { useState } from 'react';
import { 
  X, 
  Code2, 
  ShoppingCart, 
  Download, 
  Star, 
  CheckCircle2, 
  ExternalLink, 
  FolderTree, 
  FileCode, 
  ShieldCheck,
  Layers,
  Copy,
  Check
} from 'lucide-react';
import { SourceCodeItem } from '../types';
import { useStore } from '../context/StoreContext';

interface SourceCodeDetailModalProps {
  item: SourceCodeItem;
  onClose: () => void;
}

export const SourceCodeDetailModal: React.FC<SourceCodeDetailModalProps> = ({ item, onClose }) => {
  const { 
    language, 
    hasPurchased, 
    startDownload, 
    setCheckoutItem 
  } = useStore();

  const isBought = hasPurchased(item.id);
  const [activeTab, setActiveTab] = useState<'overview' | 'code' | 'files'>('overview');
  const [codeCopied, setCodeCopied] = useState(false);

  const handleCopyCode = () => {
    if (item.codePreview) {
      navigator.clipboard.writeText(item.codePreview.code);
      setCodeCopied(true);
      setTimeout(() => setCodeCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        id="source-code-detail-modal"
        className="relative w-full max-w-3xl rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden my-6 transition-all"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold shadow-md flex-shrink-0">
              <Code2 size={24} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                  {item.category}
                </span>
                <span className="text-xs text-zinc-400">by {item.author}</span>
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-zinc-900 dark:text-zinc-100 truncate mt-0.5">
                {language === 'bn' ? item.titleBn || item.title : item.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-200/60 dark:hover:bg-zinc-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Pricing & Buy CTA Bar */}
        <div className="p-5 bg-gradient-to-r from-amber-500/10 via-zinc-900/5 to-transparent dark:from-amber-500/15 dark:via-zinc-900/20 border-b border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-baseline gap-2.5">
            <span className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white">
              ${item.price}
            </span>
            <span className="text-sm text-zinc-400 line-through">
              ${item.originalPrice}
            </span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
              Save ${item.originalPrice - item.price}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {item.liveDemoUrl && (
              <a
                href={item.liveDemoUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 px-3.5 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-bold transition-all"
              >
                <span>{language === 'bn' ? 'লাইভ ডেমো' : 'Live Demo'}</span>
                <ExternalLink size={13} />
              </a>
            )}

            {isBought ? (
              <button
                onClick={() => startDownload(item)}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/30"
              >
                <Download size={15} />
                <span>{language === 'bn' ? 'সোর্স কোড ডাউনলোড করুন' : 'Download Codebase ZIP'}</span>
              </button>
            ) : (
              <button
                id="btn-buy-modal-trigger"
                onClick={() => {
                  onClose();
                  setCheckoutItem(item);
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 active:scale-95 text-white text-xs font-bold transition-all shadow-md shadow-amber-500/30"
              >
                <ShoppingCart size={15} />
                <span>{language === 'bn' ? 'সোর্স কোড কিনুন' : 'Purchase Source Code'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Tab Header */}
        <div className="px-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-6 text-sm font-semibold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3.5 border-b-2 transition-colors ${
              activeTab === 'overview'
                ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
            }`}
          >
            {language === 'bn' ? 'বিবরণ ও ফিচারস' : 'Overview & Features'}
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`py-3.5 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'code'
                ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
            }`}
          >
            <FileCode size={15} />
            <span>{language === 'bn' ? 'কোড আর্কিটেকচার' : 'Code Snippet'}</span>
          </button>

          <button
            onClick={() => setActiveTab('files')}
            className={`py-3.5 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'files'
                ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
            }`}
          >
            <FolderTree size={15} />
            <span>{language === 'bn' ? 'ফাইল ও লাইসেন্স' : 'Files & License'}</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6">
          
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                  {language === 'bn' ? 'কোডবেস বিস্তারিত' : 'Project Summary'}
                </h4>
                <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  {language === 'bn' ? item.descriptionBn || item.description : item.description}
                </p>
              </div>

              {/* Tech Stack List */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
                  {language === 'bn' ? 'টেকনোলজি স্ট্যাক' : 'Technology Stack & Libraries'}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {item.techStack.map((tech) => (
                    <span 
                      key={tech}
                      className="px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 text-zinc-800 dark:text-zinc-200 text-xs font-bold border border-zinc-200 dark:border-zinc-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Features */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
                  {language === 'bn' ? 'প্রজেক্ট ফিচারস' : 'Key Capabilities'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {item.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-zinc-700 dark:text-zinc-300">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 size={11} />
                      </div>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'code' && item.codePreview && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-xs text-zinc-500">
                  <FileCode size={14} className="text-amber-500" />
                  <span>{item.codePreview.filename}</span>
                </div>

                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                >
                  {codeCopied ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
                  <span>{codeCopied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 font-mono text-xs text-zinc-300 overflow-x-auto leading-relaxed">
                <pre className="text-sky-300">
                  {item.codePreview.code}
                </pre>
              </div>
            </div>
          )}

          {activeTab === 'files' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
                  {language === 'bn' ? 'প্যাকেজের সাথে যা যা অন্তর্ভুক্ত রয়েছে' : 'Included Assets in ZIP Bundle'}
                </h4>
                <div className="space-y-2">
                  {item.includedFiles.map((file, i) => (
                    <div key={i} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-800 dark:text-zinc-200 font-medium">
                      <FolderTree size={14} className="text-amber-500 flex-shrink-0" />
                      <span>{file}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700">
                <div className="flex items-center gap-2 font-bold text-xs text-zinc-900 dark:text-zinc-100 mb-1">
                  <ShieldCheck size={16} className="text-emerald-500" />
                  <span>{item.license}</span>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {language === 'bn' 
                    ? 'এই লাইসেন্সের মাধ্যমে আপনি আনলিমিটেড পার্সোনাল ও কমার্শিয়াল প্রজেক্ট বা ক্লায়েন্ট সাইটে কোড ব্যবহার ও মডিফাই করতে পারবেন।'
                    : 'Permits unlimited personal and commercial use. You may modify, rebrand, and deploy SaaS products derived from this codebase.'}
                </p>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
