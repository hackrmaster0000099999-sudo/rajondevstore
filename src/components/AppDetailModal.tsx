import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Star, 
  ShieldCheck, 
  Share2, 
  Check, 
  Monitor, 
  Smartphone, 
  Globe, 
  MessageSquare, 
  Send,
  Layers,
  Sparkles,
  Info,
  Calendar
} from 'lucide-react';
import { AppItem, Review } from '../types';
import { useStore } from '../context/StoreContext';

interface AppDetailModalProps {
  app: AppItem;
  onClose: () => void;
}

export const AppDetailModal: React.FC<AppDetailModalProps> = ({ app, onClose }) => {
  const { 
    language, 
    startDownload, 
    allReviews, 
    addReview 
  } = useStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'reviews'>('overview');
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const reviews = allReviews[app.id] || app.reviews || [];

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !reviewerName.trim()) return;

    addReview(app.id, {
      userName: reviewerName.trim(),
      rating: newRating,
      comment: newComment.trim()
    });

    setReviewSubmitted(true);
    setNewComment('');
    setReviewerName('');
    setTimeout(() => setReviewSubmitted(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        id="app-detail-modal"
        className="relative w-full max-w-3xl rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden my-6 transition-all"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50">
          <div className="flex items-center gap-4 min-w-0">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${app.iconBg || 'from-indigo-500 to-blue-600'} flex items-center justify-center text-white text-xl font-bold shadow-md flex-shrink-0`}>
              {app.title.slice(0, 2)}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 truncate">
                  {language === 'bn' ? app.titleBn || app.title : app.title}
                </h2>
                {app.developerVerified && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold border border-indigo-200 dark:border-indigo-800 flex items-center gap-1">
                    <ShieldCheck size={12} />
                    Verified
                  </span>
                )}
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                {app.developer} • {app.category} • {app.version}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-200/60 dark:hover:bg-zinc-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Action Callout & Quick Stats */}
        <div className="p-5 sm:p-6 bg-zinc-100/40 dark:bg-zinc-900/40 border-b border-zinc-200/80 dark:border-zinc-800/80 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-xs text-zinc-600 dark:text-zinc-300">
            <div>
              <span className="text-zinc-400 block text-[10px] uppercase font-bold tracking-wider">
                {language === 'bn' ? 'রেটিং' : 'Rating'}
              </span>
              <div className="flex items-center gap-1 font-bold text-sm text-zinc-900 dark:text-white mt-0.5">
                <Star size={14} className="text-amber-500 fill-amber-500" />
                <span>{app.rating}</span>
                <span className="text-zinc-400 font-normal">({app.reviewCount})</span>
              </div>
            </div>

            <div>
              <span className="text-zinc-400 block text-[10px] uppercase font-bold tracking-wider">
                {language === 'bn' ? 'ডাউনলোড' : 'Downloads'}
              </span>
              <span className="font-bold text-sm text-zinc-900 dark:text-white mt-0.5 block">
                {app.downloadCount}
              </span>
            </div>

            <div>
              <span className="text-zinc-400 block text-[10px] uppercase font-bold tracking-wider">
                {language === 'bn' ? 'সাইজ' : 'Size'}
              </span>
              <span className="font-bold text-sm text-zinc-900 dark:text-white mt-0.5 block">
                {app.size}
              </span>
            </div>

            <div>
              <span className="text-zinc-400 block text-[10px] uppercase font-bold tracking-wider">
                {language === 'bn' ? 'লাইসেন্স' : 'License'}
              </span>
              <span className="font-bold text-sm text-emerald-600 dark:text-emerald-400 mt-0.5 block">
                {app.price}
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              startDownload(app);
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-sm shadow-md shadow-indigo-600/30 transition-all"
          >
            <Download size={16} />
            <span>{language === 'bn' ? 'ফ্রি ডাউনলোড' : 'Download Now'}</span>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-6 text-sm font-semibold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3.5 border-b-2 transition-colors ${
              activeTab === 'overview'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
            }`}
          >
            {language === 'bn' ? 'বিবরণ ও স্ক্রিনশট' : 'Overview & Screenshots'}
          </button>
          <button
            onClick={() => setActiveTab('features')}
            className={`py-3.5 border-b-2 transition-colors ${
              activeTab === 'features'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
            }`}
          >
            {language === 'bn' ? 'ফিচার্স ও চেইঞ্জলগ' : 'Features & Changelog'}
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`py-3.5 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'reviews'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
            }`}
          >
            <span>{language === 'bn' ? 'ব্যবহারকারীর রিভিউ' : 'User Reviews'}</span>
            <span className="text-xs px-1.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
              {reviews.length}
            </span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6">
          {activeTab === 'overview' && (
            <>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                  {language === 'bn' ? 'অ্যাপ সম্পর্কে' : 'About Application'}
                </h4>
                <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  {language === 'bn' ? app.descriptionBn || app.description : app.description}
                </p>
              </div>

              {/* Screenshots Gallery */}
              {app.screenshots && app.screenshots.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
                    {language === 'bn' ? 'ইন্টারফেস প্রিভিউ' : 'Interface Screenshots'}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {app.screenshots.map((img, idx) => (
                      <div key={idx} className="rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 aspect-video bg-zinc-100 dark:bg-zinc-950">
                        <img 
                          src={img} 
                          alt={`${app.title} preview ${idx + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Supported OS Direct Packages */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
                  {language === 'bn' ? 'সাপোর্টেড অপারেটিং সিস্টেম প্যাকেজ' : 'Supported OS Installers'}
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {app.platforms.map((plat) => (
                    <div 
                      key={plat}
                      className="p-3 rounded-xl bg-zinc-100/70 dark:bg-zinc-800/70 border border-zinc-200 dark:border-zinc-700/60 text-xs font-medium text-zinc-800 dark:text-zinc-200 flex items-center justify-between"
                    >
                      <span className="flex items-center gap-1.5">
                        <Monitor size={14} className="text-indigo-500" />
                        {plat}
                      </span>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                        Ready
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'features' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
                  {language === 'bn' ? 'মূল সুবিধাসমূহ' : 'Key Capabilities'}
                </h4>
                <ul className="space-y-2.5">
                  {app.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-700 dark:text-zinc-300">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check size={12} />
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {app.changelog && (
                <div className="p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/80">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5 flex items-center gap-1.5">
                    <Calendar size={13} />
                    {language === 'bn' ? 'সর্বশেষ ভার্সন পরিবর্তন (Changelog)' : `Version Changelog (${app.version})`}
                  </h4>
                  <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed font-mono">
                    {app.changelog}
                  </p>
                </div>
              )}

              {app.minReqs && (
                <div className="text-xs text-zinc-500 dark:text-zinc-400">
                  <span className="font-semibold">{language === 'bn' ? 'সিস্টেম রিকোয়ারমেন্টস: ' : 'System Requirements: '}</span>
                  {app.minReqs}
                </div>
              )}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              {/* Add a Review Form */}
              <form onSubmit={handleAddReview} className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                  {language === 'bn' ? 'আপনার মতামত দিন' : 'Leave a Review'}
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      value={reviewerName}
                      onChange={(e) => setReviewerName(e.target.value)}
                      placeholder={language === 'bn' ? 'আপনার নাম' : 'Your name'}
                      className="w-full px-3 py-2 text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 text-zinc-900 dark:text-zinc-100"
                      required
                    />
                  </div>

                  <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-300">
                    <span>{language === 'bn' ? 'রেটিং:' : 'Rating:'}</span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          type="button"
                          key={num}
                          onClick={() => setNewRating(num)}
                          className="p-1 text-amber-500 hover:scale-110 transition-transform"
                        >
                          <Star size={16} className={num <= newRating ? 'fill-amber-500' : 'text-zinc-300 dark:text-zinc-700'} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <textarea
                  rows={2}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder={language === 'bn' ? 'অ্যাপটি সম্পর্কে আপনার অভিজ্ঞতা লিখুন...' : 'Write your experience with this app...'}
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 text-zinc-900 dark:text-zinc-100"
                  required
                />

                <div className="flex items-center justify-between">
                  {reviewSubmitted && (
                    <span className="text-xs text-emerald-500 font-semibold flex items-center gap-1">
                      <Check size={13} />
                      {language === 'bn' ? 'রিভিউ যুক্ত হয়েছে!' : 'Review posted successfully!'}
                    </span>
                  )}
                  <button
                    type="submit"
                    className="ml-auto px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5"
                  >
                    <Send size={12} />
                    <span>{language === 'bn' ? 'সাবমিট করুন' : 'Submit Review'}</span>
                  </button>
                </div>
              </form>

              {/* Reviews List */}
              <div className="space-y-3">
                {reviews.map((rev) => (
                  <div key={rev.id} className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 font-bold text-zinc-900 dark:text-zinc-100">
                        <span>{rev.userName}</span>
                        {rev.verifiedDownload && (
                          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-1.5 py-0.2 rounded font-normal">
                            Verified Download
                          </span>
                        )}
                      </div>
                      <span className="text-zinc-400 text-[11px]">{rev.date}</span>
                    </div>

                    <div className="flex items-center gap-0.5 text-amber-500">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} size={11} className="fill-amber-500" />
                      ))}
                    </div>

                    <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                      {rev.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
