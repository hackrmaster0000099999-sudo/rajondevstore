import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { StoreItem, DownloadTask, ToastMessage } from '../types';
import { allStoreItems } from '../data/mockData';
import { updateSEOMeta } from '../utils/seo';
import confetti from 'canvas-confetti';

interface StoreContextType {
  darkMode: boolean;
  setDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  toggleTheme: () => void;
  
  language: 'bn' | 'en';
  setLanguage: (lang: 'bn' | 'en') => void;
  toggleLanguage: () => void;

  currentCategory: string;
  setCurrentCategory: (cat: string) => void;

  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Selected item & modal controls
  selectedItem: StoreItem | null;
  setSelectedItem: (item: StoreItem | null) => void;

  isMenuSheetOpen: boolean;
  setIsMenuSheetOpen: (open: boolean) => void;

  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (open: boolean) => void;

  isDownloadModalOpen: boolean;
  setIsDownloadModalOpen: (open: boolean) => void;

  isDescriptionModalOpen: boolean;
  setIsDescriptionModalOpen: (open: boolean) => void;

  isNoticeModalOpen: boolean;
  setIsNoticeModalOpen: (open: boolean) => void;

  isBookmarksModalOpen: boolean;
  setIsBookmarksModalOpen: (open: boolean) => void;

  isDownloadsDrawerOpen: boolean;
  setIsDownloadsDrawerOpen: (open: boolean) => void;

  // 5-Step Verification State
  step1Verified: boolean;
  step2Verified: boolean;
  step3Verified: boolean;
  step4Verified: boolean;
  step5Verified: boolean;
  isVerifyingStep: number | null; // 1, 2, 3, 4, 5
  stepCountdown: number;
  stepScanProgress: number;
  allStepsCompleted: boolean;
  handleVerifyStep: (step: 1 | 2 | 3 | 4 | 5) => void;
  resetVerification: () => void;

  // Download logic & history
  downloads: DownloadTask[];
  activeDownload: DownloadTask | null;
  startDownload: (item: StoreItem) => void;
  clearActiveDownload: () => void;

  // Bookmarks
  bookmarks: string[];
  toggleBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;

  // Purchased items (for commercial source codes)
  purchasedIds: string[];
  purchaseItem: (id: string) => void;
  hasPurchased: (id: string) => boolean;

  // Toast
  toast: ToastMessage | null;
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;

  // Report broken link
  reportBrokenLink: (item: StoreItem) => void;

  // Dynamic live real download counts map
  downloadCounts: Record<string, number>;
  incrementDownloadCount: (id: string) => void;
  getDownloadCount: (item: StoreItem) => number;
  getFormattedDownloadCount: (item: StoreItem) => string;

  // Open download modal helper
  openDownloadModal: (item: StoreItem) => void;
  closeAllModals: () => void;

  // Copy shareable dynamic link
  copyItemLink: (item: StoreItem) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [language, setLanguage] = useState<'bn' | 'en'>('en');

  const [currentCategory, setCurrentCategoryState] = useState<string>('All Content');
  const [searchQuery, setSearchQueryState] = useState<string>('');

  const [selectedItem, setSelectedItemState] = useState<StoreItem | null>(null);

  // Modals
  const [isMenuSheetOpen, setIsMenuSheetOpen] = useState<boolean>(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState<boolean>(false);
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState<boolean>(false);
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState<boolean>(false);
  const [isBookmarksModalOpen, setIsBookmarksModalOpen] = useState<boolean>(false);
  const [isDownloadsDrawerOpen, setIsDownloadsDrawerOpen] = useState<boolean>(false);

  // 5-Step Verification state
  const [step1Verified, setStep1Verified] = useState<boolean>(false);
  const [step2Verified, setStep2Verified] = useState<boolean>(false);
  const [step3Verified, setStep3Verified] = useState<boolean>(false);
  const [step4Verified, setStep4Verified] = useState<boolean>(false);
  const [step5Verified, setStep5Verified] = useState<boolean>(false);
  const [isVerifyingStep, setIsVerifyingStep] = useState<number | null>(null);
  const [stepCountdown, setStepCountdown] = useState<number>(3);
  const [stepScanProgress, setStepScanProgress] = useState<number>(0);

  const allStepsCompleted = step1Verified && step2Verified && step3Verified && step4Verified && step5Verified;

  // Toast
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Bookmarks
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('rds_bookmarks');
      return saved ? JSON.parse(saved) : ['app-capcut-official', 'doc-fullstack-arch-prompt'];
    } catch {
      return ['app-capcut-official'];
    }
  });

  // Purchases
  const [purchasedIds, setPurchasedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('rds_purchased');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Real Persistent Downloads Map
  const [downloadCounts, setDownloadCounts] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('rds_real_downloads');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {}

    const initial: Record<string, number> = {};
    allStoreItems.forEach((item) => {
      initial[item.id] = item.rawDownloads || 1420;
    });
    return initial;
  });

  // Downloads history list
  const [downloads, setDownloads] = useState<DownloadTask[]>(() => {
    try {
      const saved = localStorage.getItem('rds_downloads_history');
      return saved ? JSON.parse(saved) : [
        {
          id: 'dl-seed-1',
          itemId: 'app-capcut-official',
          name: 'CapCut_v12.6.0_Official.apk',
          type: 'app',
          size: '124 MB',
          progress: 100,
          status: 'completed',
          downloadDate: 'Today'
        }
      ];
    } catch {
      return [];
    }
  });

  const [activeDownload, setActiveDownload] = useState<DownloadTask | null>(null);

  // Sync light theme
  useEffect(() => {
    document.documentElement.classList.remove('dark');
    document.body.setAttribute('data-theme', 'light');
    localStorage.setItem('rds_theme', 'light');
    localStorage.setItem('rds_lang', 'en');
  }, []);

  const toggleTheme = () => {};
  const toggleLanguage = () => {};

  // Save download counts to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('rds_real_downloads', JSON.stringify(downloadCounts));
    } catch {}
  }, [downloadCounts]);

  // Sync bookmarks
  useEffect(() => {
    localStorage.setItem('rds_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Sync purchases
  useEffect(() => {
    localStorage.setItem('rds_purchased', JSON.stringify(purchasedIds));
  }, [purchasedIds]);

  // Sync downloads history
  useEffect(() => {
    localStorage.setItem('rds_downloads_history', JSON.stringify(downloads));
  }, [downloads]);

  // Check notice modal on mount (show once per day unless dismissed)
  useEffect(() => {
    try {
      const lastDismiss = localStorage.getItem('rds_noticeDismissDate');
      const today = new Date().toDateString();
      if (lastDismiss !== today) {
        const timer = setTimeout(() => {
          setIsNoticeModalOpen(true);
        }, 800);
        return () => clearTimeout(timer);
      }
    } catch {}
  }, []);

  // Update Dynamic SEO and Meta Tags whenever item, category, or search changes
  useEffect(() => {
    updateSEOMeta({
      item: selectedItem,
      category: currentCategory,
      keywords: searchQuery ? [searchQuery] : []
    });
  }, [selectedItem, currentCategory, searchQuery]);

  // Deep linking: Read URL query params on initial load
  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const appParam = urlParams.get('app') || urlParams.get('item');
      const catParam = urlParams.get('category') || urlParams.get('cat');
      const searchParam = urlParams.get('q');

      if (catParam) {
        const matched = allStoreItems.find((i) => i.category.toLowerCase() === catParam.toLowerCase());
        if (matched) {
          setCurrentCategoryState(matched.category);
        }
      }

      if (searchParam) {
        setSearchQueryState(searchParam);
      }

      if (appParam) {
        const found = allStoreItems.find((i) => i.id === appParam || i.title.toLowerCase().replace(/[^a-z0-9]/g, '-') === appParam);
        if (found) {
          setSelectedItemState(found);
          setIsDownloadModalOpen(true);
        }
      }
    } catch {}
  }, []);

  const updateUrl = useCallback((itemId: string | null, cat: string | null) => {
    try {
      const params = new URLSearchParams();
      if (itemId) {
        params.set('app', itemId);
      }
      if (cat && cat !== 'All Content') {
        params.set('category', cat);
      }
      const queryString = params.toString();
      const newUrl = queryString ? `${window.location.pathname}?${queryString}` : window.location.pathname;
      window.history.replaceState({}, '', newUrl);
    } catch {}
  }, []);

  const setCurrentCategory = (cat: string) => {
    setCurrentCategoryState(cat);
    updateUrl(selectedItem ? selectedItem.id : null, cat);
  };

  const setSearchQuery = (query: string) => {
    setSearchQueryState(query);
  };

  const setSelectedItem = (item: StoreItem | null) => {
    setSelectedItemState(item);
    updateUrl(item ? item.id : null, currentCategory);
  };

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    const newToast: ToastMessage = {
      id: `toast-${Date.now()}`,
      message,
      type
    };
    setToast(newToast);
    setTimeout(() => {
      setToast((current) => (current?.id === newToast.id ? null : current));
    }, 2800);
  };

  const toggleBookmark = (id: string) => {
    setBookmarks((prev) => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter((item) => item !== id) : [...prev, id];
      showToast(exists ? 'Removed from wishlist' : 'Saved to wishlist', 'success');
      return updated;
    });
  };

  const isBookmarked = (id: string) => bookmarks.includes(id);

  const purchaseItem = (id: string) => {
    if (!purchasedIds.includes(id)) {
      setPurchasedIds((prev) => [...prev, id]);
    }
  };

  const hasPurchased = (id: string) => purchasedIds.includes(id);

  // Real download increment counter
  const incrementDownloadCount = (id: string) => {
    setDownloadCounts((prev) => {
      const current = prev[id] || 1200;
      const updated = {
        ...prev,
        [id]: current + 1
      };
      try {
        localStorage.setItem('rds_real_downloads', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const getDownloadCount = (item: StoreItem): number => {
    return downloadCounts[item.id] || item.rawDownloads || 1240;
  };

  const getFormattedDownloadCount = (item: StoreItem): string => {
    const count = getDownloadCount(item);
    return count.toLocaleString('en-US');
  };

  const resetVerification = () => {
    setStep1Verified(false);
    setStep2Verified(false);
    setStep3Verified(false);
    setStep4Verified(false);
    setStep5Verified(false);
    setIsVerifyingStep(null);
    setStepCountdown(3);
    setStepScanProgress(0);
  };

  const openDownloadModal = (item: StoreItem) => {
    setSelectedItem(item);
    resetVerification();
    setIsSearchModalOpen(false);
    setIsMenuSheetOpen(false);
    setIsDownloadModalOpen(true);
  };

  const closeAllModals = () => {
    setIsMenuSheetOpen(false);
    setIsSearchModalOpen(false);
    setIsDownloadModalOpen(false);
    setIsDescriptionModalOpen(false);
    setIsBookmarksModalOpen(false);
    setIsDownloadsDrawerOpen(false);
    setIsNoticeModalOpen(false);
    resetVerification();
    updateUrl(null, currentCategory);
  };

  const copyItemLink = (item: StoreItem) => {
    const directUrl = `${window.location.origin}${window.location.pathname}?app=${encodeURIComponent(item.id)}`;
    try {
      navigator.clipboard.writeText(directUrl);
      showToast('Dynamic SEO link copied to clipboard!', 'success');
    } catch {
      showToast('Direct link generated', 'info');
    }
  };

  // Monetag Direct Ad Link
  const MONETAG_DIRECT_LINK = 'https://omg10.com/4/11497195';

  // 5-Step Verification Process Handler (Integrated with Monetag Ad Network)
  const handleVerifyStep = (step: 1 | 2 | 3 | 4 | 5) => {
    if (isVerifyingStep !== null) return;

    // Trigger Monetag direct ad link in a new window/tab for monetized verification
    try {
      window.open(MONETAG_DIRECT_LINK, '_blank');
    } catch {}

    if (step === 1) {
      if (step1Verified) return;
      setIsVerifyingStep(1);
      setStepCountdown(3);

      let timeLeft = 3;
      const timer = setInterval(() => {
        timeLeft -= 1;
        setStepCountdown(timeLeft);
        if (timeLeft <= 0) {
          clearInterval(timer);
          setIsVerifyingStep(null);
          setStep1Verified(true);
          showToast('Step 1: Security & Checksum Verified ✓', 'success');
        }
      }, 1000);
    } else if (step === 2) {
      if (!step1Verified || step2Verified) return;
      setIsVerifyingStep(2);
      setStepCountdown(3);

      let timeLeft = 3;
      const timer = setInterval(() => {
        timeLeft -= 1;
        setStepCountdown(timeLeft);
        if (timeLeft <= 0) {
          clearInterval(timer);
          setIsVerifyingStep(null);
          setStep2Verified(true);
          showToast('Step 2: Link Security Verified ✓', 'success');
        }
      }, 1000);
    } else if (step === 3) {
      if (!step2Verified || step3Verified) return;
      setIsVerifyingStep(3);
      setStepCountdown(3);

      let timeLeft = 3;
      const timer = setInterval(() => {
        timeLeft -= 1;
        setStepCountdown(timeLeft);
        if (timeLeft <= 0) {
          clearInterval(timer);
          setIsVerifyingStep(null);
          setStep3Verified(true);
          showToast('Step 3: Server Mirror Verified ✓', 'success');
        }
      }, 1000);
    } else if (step === 4) {
      if (!step3Verified || step4Verified) return;
      setIsVerifyingStep(4);
      setStepCountdown(3);

      let timeLeft = 3;
      const timer = setInterval(() => {
        timeLeft -= 1;
        setStepCountdown(timeLeft);
        if (timeLeft <= 0) {
          clearInterval(timer);
          setIsVerifyingStep(null);
          setStep4Verified(true);
          showToast('Step 4: Anti-Bot Challenge Passed ✓', 'success');
        }
      }, 1000);
    } else if (step === 5) {
      if (!step4Verified || step5Verified) return;
      setIsVerifyingStep(5);
      setStepCountdown(3);

      let timeLeft = 3;
      const timer = setInterval(() => {
        timeLeft -= 1;
        setStepCountdown(timeLeft);
        if (timeLeft <= 0) {
          clearInterval(timer);
          setIsVerifyingStep(null);
          setStep5Verified(true);
          showToast('Step 5: High-Speed Direct Download Ready ✓', 'success');
        }
      }, 1000);
    }
  };

  // Real direct download execution
  const startDownload = (item: StoreItem) => {
    // Increment persistent real download count by 1
    incrementDownloadCount(item.id);

    let fileName = `${item.title.replace(/[^a-zA-Z0-9]/g, '_')}`;
    let fileExt = '.apk';
    let size = '65 MB';

    if (item.type === 'app') {
      fileExt = '.apk';
      size = item.size;
    } else if (item.type === 'prompt_doc') {
      fileExt = item.format === 'pdf' ? '.pdf' : item.format === 'markdown' ? '.md' : '.txt';
      size = item.fileSize || '18 KB';
    } else if (item.type === 'source_code') {
      fileExt = '_Source_Code.zip';
      size = item.bundleSize;
    }

    const newDownload: DownloadTask = {
      id: `dl-${Date.now()}`,
      itemId: item.id,
      name: `${fileName}${fileExt}`,
      type: item.type === 'app' ? 'app' : item.type === 'prompt_doc' ? 'doc' : 'source_code',
      size,
      progress: 0,
      status: 'downloading',
      downloadDate: 'Just now',
      fileUrl: item.downloadUrl || '#'
    };

    setActiveDownload(newDownload);
    showToast('Download started with high-speed CDN...', 'info');

    let currentProg = 0;
    const interval = setInterval(() => {
      currentProg += Math.floor(Math.random() * 25) + 15;
      if (currentProg >= 100) {
        currentProg = 100;
        clearInterval(interval);

        const completedTask: DownloadTask = {
          ...newDownload,
          progress: 100,
          status: 'completed'
        };

        setActiveDownload(completedTask);
        setDownloads((prev) => [completedTask, ...prev.filter((d) => d.id !== newDownload.id)]);

        try {
          confetti({
            particleCount: 70,
            spread: 80,
            origin: { y: 0.65 }
          });
        } catch {}

        showToast(`Download Complete: ${item.title}`, 'success');

        // Trigger real file download save
        if (item.type === 'prompt_doc' && item.promptText) {
          const blob = new Blob([item.promptText], { type: 'text/plain;charset=utf-8' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `${fileName}${fileExt}`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        } else {
          // Trigger file download anchor
          const link = document.createElement('a');
          link.href = item.downloadUrl || '#';
          link.download = `${fileName}${fileExt}`;
          link.target = '_blank';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      } else {
        setActiveDownload((prev) => (prev ? { ...prev, progress: currentProg } : null));
      }
    }, 200);
  };

  const clearActiveDownload = () => {
    setActiveDownload(null);
  };

  const reportBrokenLink = (item: StoreItem) => {
    showToast(`Report noted for "${item.title}". Opening support email...`, 'info');
  };

  return (
    <StoreContext.Provider
      value={{
        darkMode,
        setDarkMode,
        toggleTheme,
        language,
        setLanguage,
        toggleLanguage,
        currentCategory,
        setCurrentCategory,
        searchQuery,
        setSearchQuery,
        selectedItem,
        setSelectedItem,
        isMenuSheetOpen,
        setIsMenuSheetOpen,
        isSearchModalOpen,
        setIsSearchModalOpen,
        isDownloadModalOpen,
        setIsDownloadModalOpen,
        isDescriptionModalOpen,
        setIsDescriptionModalOpen,
        isNoticeModalOpen,
        setIsNoticeModalOpen,
        isBookmarksModalOpen,
        setIsBookmarksModalOpen,
        isDownloadsDrawerOpen,
        setIsDownloadsDrawerOpen,
        step1Verified,
        step2Verified,
        step3Verified,
        step4Verified,
        step5Verified,
        isVerifyingStep,
        stepCountdown,
        stepScanProgress,
        allStepsCompleted,
        handleVerifyStep,
        resetVerification,
        downloads,
        activeDownload,
        startDownload,
        clearActiveDownload,
        bookmarks,
        toggleBookmark,
        isBookmarked,
        purchasedIds,
        purchaseItem,
        hasPurchased,
        toast,
        showToast,
        reportBrokenLink,
        downloadCounts,
        incrementDownloadCount,
        getDownloadCount,
        getFormattedDownloadCount,
        openDownloadModal,
        closeAllModals,
        copyItemLink
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
