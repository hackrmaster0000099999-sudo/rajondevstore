import React, { useState, useMemo } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Download, 
  Bot, 
  Sliders, 
  FileText, 
  Sparkles, 
  Share2, 
  Terminal,
  Layers,
  ArrowRight
} from 'lucide-react';
import { PromptDocItem } from '../types';
import { useStore } from '../context/StoreContext';

interface PromptDetailModalProps {
  item: PromptDocItem;
  onClose: () => void;
}

export const PromptDetailModal: React.FC<PromptDetailModalProps> = ({ item, onClose }) => {
  const { language, startDownload } = useStore();

  // State for dynamic variable customizer
  const [variableValues, setVariableValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    if (item.variables) {
      item.variables.forEach((v) => {
        initial[v.name] = v.defaultValue;
      });
    }
    return initial;
  });

  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'prompt' | 'customize' | 'guide'>('prompt');

  // Compute final interpolated prompt
  const compiledPrompt = useMemo(() => {
    let raw = item.promptText || item.previewSnippet || '';
    if (item.variables) {
      item.variables.forEach((v) => {
        const val = variableValues[v.name] || `[${v.name}]`;
        raw = raw.split(`[${v.name}]`).join(val);
      });
    }
    return raw;
  }, [item, variableValues]);

  const handleCopyCompiled = () => {
    navigator.clipboard.writeText(compiledPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVariableChange = (name: string, value: string) => {
    setVariableValues((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        id="prompt-detail-modal"
        className="relative w-full max-w-3xl rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden my-6 transition-all"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md flex-shrink-0">
              <Bot size={24} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
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

        {/* Action Header Banner */}
        <div className="p-4 sm:p-5 bg-zinc-100/60 dark:bg-zinc-900/60 border-b border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap text-xs">
            <span className="text-zinc-500 font-medium">{language === 'bn' ? 'মডেল সাপোর্ট:' : 'Optimized for:'}</span>
            {item.modelSupport.map((m) => (
              <span key={m} className="px-2 py-0.5 rounded-md bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 font-semibold text-[11px]">
                {m}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={handleCopyCompiled}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white shadow-indigo-600/30'
              }`}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              <span>{copied ? (language === 'bn' ? 'কপি সফল হয়েছে!' : 'Prompt Copied!') : (language === 'bn' ? 'প্রম্পট কপি করুন' : 'Copy Prompt')}</span>
            </button>

            <button
              onClick={() => startDownload(item)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-bold transition-all"
            >
              <Download size={14} />
              <span>{language === 'bn' ? 'ডাউনলোড' : 'Download'}</span>
            </button>
          </div>
        </div>

        {/* Tab Switcher (if variables exist) */}
        {item.variables && (
          <div className="px-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-6 text-sm font-semibold">
            <button
              onClick={() => setActiveTab('prompt')}
              className={`py-3.5 border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'prompt'
                  ? 'border-purple-600 text-purple-600 dark:text-purple-400'
                  : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
              }`}
            >
              <Terminal size={15} />
              <span>{language === 'bn' ? 'কমপ্লিট প্রম্পট টেক্সট' : 'Compiled Output'}</span>
            </button>

            <button
              onClick={() => setActiveTab('customize')}
              className={`py-3.5 border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'customize'
                  ? 'border-purple-600 text-purple-600 dark:text-purple-400'
                  : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
              }`}
            >
              <Sliders size={15} />
              <span>{language === 'bn' ? 'প্যারামিটার কাস্টমাইজার' : 'Customize Variables'}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 font-bold">
                {item.variables.length}
              </span>
            </button>
          </div>
        )}

        {/* Body Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6">
          
          {/* Customizer view */}
          {activeTab === 'customize' && item.variables && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/60 text-xs text-purple-800 dark:text-purple-300">
                {language === 'bn'
                  ? 'নিচের ফিল্ডগুলোতে আপনার প্রজেক্ট বা চাহিদার তথ্য দিন। উপরের প্রম্পটটি স্বয়ংক্রিয়ভাবে আপডেট হয়ে যাবে।'
                  : 'Fill in your project requirements below. The master prompt will automatically update with your custom values.'}
              </div>

              <div className="space-y-3">
                {item.variables.map((v) => (
                  <div key={v.name} className="space-y-1">
                    <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center justify-between">
                      <span>{v.label}</span>
                      <span className="text-[10px] font-mono text-zinc-400">[{v.name}]</span>
                    </label>
                    <input
                      type="text"
                      value={variableValues[v.name] || ''}
                      onChange={(e) => handleVariableChange(v.name, e.target.value)}
                      placeholder={v.placeholder}
                      className="w-full px-3.5 py-2 text-xs bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 text-zinc-900 dark:text-zinc-100"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Prompt output view */}
          {activeTab === 'prompt' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                  {language === 'bn' ? 'ব্যবহার নির্দেশিকা' : 'Overview & Instruction'}
                </h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {language === 'bn' ? item.descriptionBn || item.description : item.description}
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                    {language === 'bn' ? 'প্রম্পট কোড / টেক্সট' : 'Prompt / Code Content'}
                  </h4>
                  <span className="text-[11px] font-mono text-zinc-500">
                    {compiledPrompt.length} characters
                  </span>
                </div>

                <div className="relative rounded-2xl bg-zinc-950 p-4 border border-zinc-800 overflow-x-auto">
                  <pre className="font-mono text-xs text-emerald-400 dark:text-emerald-300 whitespace-pre-wrap leading-relaxed">
                    {compiledPrompt}
                  </pre>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
