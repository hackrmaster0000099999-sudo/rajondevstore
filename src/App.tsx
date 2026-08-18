import React from 'react';
import { StoreProvider } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { CategoryFilterBar } from './components/CategoryFilterBar';
import { ItemGrid } from './components/ItemGrid';
import { CategorySheet } from './components/CategorySheet';
import { SearchModal } from './components/SearchModal';
import { DownloadModal } from './components/DownloadModal';
import { DescriptionModal } from './components/DescriptionModal';
import { NoticeModal } from './components/NoticeModal';
import { BookmarksModal } from './components/BookmarksModal';
import { DownloadsDrawer } from './components/DownloadsDrawer';
import { ToastNotification } from './components/ToastNotification';
import { Footer } from './components/Footer';
import { AdBlockDetector } from './components/AdBlockDetector';

export function App() {
  return (
    <StoreProvider>
      <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 selection:bg-indigo-500 selection:text-white relative">
        {/* AdBlocker Hard Lock Component */}
        <AdBlockDetector />

        {/* Sticky Header Navigation */}
        <Navbar />

        {/* Main Content Viewport Container */}
        <main className="flex-1 w-full max-w-4xl mx-auto px-3 sm:px-4 py-2">
          {/* Category Filter Pills & Section Header */}
          <CategoryFilterBar />

          {/* Responsive 2-Column Product Cards Grid */}
          <ItemGrid />

          {/* Footer with Telegram & Safety Badges */}
          <Footer />
        </main>

        {/* Global Modals, Drawers & Toasts */}
        <CategorySheet />
        <SearchModal />
        <DownloadModal />
        <DescriptionModal />
        <NoticeModal />
        <BookmarksModal />
        <DownloadsDrawer />
        <ToastNotification />
      </div>
    </StoreProvider>
  );
}

export default App;
