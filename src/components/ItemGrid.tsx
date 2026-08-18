import React from 'react';
import { AppCard } from './AppCard';
import { useStore } from '../context/StoreContext';
import { allStoreItems } from '../data/mockData';
import { FolderPlus } from 'lucide-react';

export const ItemGrid: React.FC = () => {
  const { currentCategory, searchQuery } = useStore();

  let filteredList = allStoreItems;

  // Filter by category
  if (currentCategory !== 'All Content') {
    filteredList = filteredList.filter((item) => {
      if (currentCategory === 'Android Apps' || currentCategory === 'অ্যান্ড্রয়েড অ্যাপস') {
        return item.category === 'Android Apps' || item.category === 'অ্যান্ড্রয়েড অ্যাপস' || item.type === 'app';
      }
      if (currentCategory === 'Files & Docs' || currentCategory === 'ফাইলস ও ডকুমেন্ট') {
        return item.category === 'Files & Docs' || item.category === 'ফাইলস ও ডকুমেন্ট' || item.type === 'prompt_doc';
      }
      if (currentCategory === 'Source Code' || currentCategory === 'সোর্স কোড') {
        return item.category === 'Source Code' || item.category === 'সোর্স কোড' || item.type === 'source_code';
      }
      return item.category === currentCategory;
    });
  }

  // Filter by search query
  if (searchQuery.trim() !== '') {
    const q = searchQuery.toLowerCase();
    filteredList = filteredList.filter((item) => {
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchCategory = item.category.toLowerCase().includes(q);
      const matchTags = 'tags' in item && Array.isArray(item.tags) && item.tags.some((t) => t.toLowerCase().includes(q));
      return matchTitle || matchDesc || matchCategory || matchTags;
    });
  }

  if (filteredList.length === 0) {
    return (
      <div className="text-center py-16 px-4 space-y-3 bg-white rounded-2xl border border-slate-200 shadow-sm my-6">
        <FolderPlus size={44} className="mx-auto text-indigo-500 opacity-70" />
        <h3 className="font-bold text-sm text-slate-800">
          Ready for Real Data Import
        </h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          All demo items have been cleared. You can now provide your real app listings and they will appear here instantly.
        </p>
      </div>
    );
  }

  return (
    <div 
      id="apps-container"
      className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3.5 my-3"
    >
      {filteredList.map((item) => (
        <AppCard key={item.id} item={item} />
      ))}
    </div>
  );
};
