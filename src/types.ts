export type MainCategory = 'all' | 'android_apps' | 'files_docs' | 'source_code';

export type AppPlatform = 'Android' | 'iOS' | 'Windows' | 'macOS' | 'Linux' | 'Web';

export interface Review {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  comment: string;
  verifiedDownload?: boolean;
}

export interface AppItem {
  id: string;
  type: 'app';
  title: string;
  titleBn?: string;
  subtitle: string;
  subtitleBn?: string;
  description: string;
  descriptionBn?: string;
  icon: string; // Lucide icon name or image URL
  logoUrl?: string;
  iconBg?: string;
  iconColor?: string;
  category: string;
  subCategory: string;
  platforms: AppPlatform[];
  downloadCount: string;
  rawDownloads?: number;
  rating?: number;
  reviewCount?: number;
  size: string;
  version: string;
  developer: string;
  developerVerified?: boolean;
  price: 'Free' | 'Free (In-app)' | string;
  promoTag?: string; // 'Free', 'Official', 'Open Source', 'Verified'
  isNew?: boolean;
  priceNum?: number;
  downloadUrl: string;
  packageName?: string;
  tags: string[];
  features: string[];
  keyHighlights?: string[];
  screenshots: string[];
  changelog?: string;
  minReqs?: string;
  installGuide?: string;
  reviews?: Review[];
  featured?: boolean;
  trending?: boolean;
}

export interface PromptDocItem {
  id: string;
  type: 'prompt_doc';
  title: string;
  titleBn?: string;
  subtitle: string;
  subtitleBn?: string;
  description: string;
  descriptionBn?: string;
  icon?: string;
  logoUrl?: string;
  category: 'AI Prompts' | 'Developer Docs' | 'Cheatsheets' | 'System Architecture' | 'Guides' | string;
  format: 'prompt' | 'markdown' | 'pdf' | 'doc';
  modelSupport: string[];
  promptText?: string;
  variables?: { name: string; label: string; placeholder: string; defaultValue: string }[];
  copyCount: number;
  downloadCount?: string;
  rawDownloads?: number;
  rating?: number;
  reviewCount?: number;
  author: string;
  authorVerified?: boolean;
  promoTag?: string;
  isNew?: boolean;
  tags: string[];
  fileSize?: string;
  downloadUrl?: string;
  previewSnippet?: string;
  readTime?: string;
  installGuide?: string;
  featured?: boolean;
  trending?: boolean;
}

export interface SourceCodeItem {
  id: string;
  type: 'source_code';
  title: string;
  titleBn?: string;
  subtitle: string;
  subtitleBn?: string;
  description: string;
  descriptionBn?: string;
  icon?: string;
  logoUrl?: string;
  category: 'Full-Stack Web' | 'Mobile Apps (Flutter/React Native)' | 'SaaS Boilerplates' | 'UI Kits & Design' | 'AI & LLM Tools' | 'Backend & APIs' | string;
  price: number;
  originalPrice: number;
  currency: string;
  promoTag?: string;
  isNew?: boolean;
  salesCount: number;
  downloadCount?: string;
  rawDownloads?: number;
  rating?: number;
  reviewCount?: number;
  techStack: string[];
  tags?: string[];
  liveDemoUrl?: string;
  githubPreviewUrl?: string;
  bundleSize: string;
  license: string;
  includedFiles: string[];
  previewImages: string[];
  installGuide?: string;
  codePreview?: {
    filename: string;
    language: string;
    code: string;
  };
  features: string[];
  author: string;
  authorVerified?: boolean;
  updatedAt: string;
  downloadUrl?: string;
  featured?: boolean;
  trending?: boolean;
}

export type StoreItem = AppItem | PromptDocItem | SourceCodeItem;

export interface DownloadTask {
  id: string;
  itemId: string;
  name: string;
  type: 'app' | 'doc' | 'source_code';
  size: string;
  progress: number;
  status: 'downloading' | 'completed' | 'failed';
  downloadDate: string;
  fileUrl?: string;
}

export interface ToastMessage {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'warning' | 'error';
}
