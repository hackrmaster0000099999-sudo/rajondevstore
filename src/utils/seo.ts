import { StoreItem } from '../types';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  url?: string;
  item?: StoreItem | null;
  category?: string;
}

const PRIMARY_STORE_NAME = 'Rajon Dev Store';
const PRIMARY_STORE_TAG = 'Rajon Dev Store 🇧🇩';

// Core top priority keywords to dominate SEO for the store name
const CORE_KEYWORDS = [
  'Rajon Dev Store',
  'Rajon Dev Store 🇧🇩',
  'Rajon Dev',
  'Rajon Ai Dev',
  'Rajon Dev Apps',
  'Rajon Store APK',
  'Rajon Dev Store Mod',
  'Rajon Dev Store Download',
  'RajonDevStore',
  'rajon dev store',
  'rajondevstore.com',
  'Rajon Dev Official',
  'Rajon Dev Hub',
  'Verified Android Apps',
  'APK Downloads Bangladesh',
  'Free APK 2026',
  'AI Prompts Store',
  'Developer Source Code',
  'Clean APK Direct Download',
  'Zeta Mod Business'
];

export function updateSEOMeta(props: SEOProps) {
  const { title, description, keywords = [], ogImage, url, item, category } = props;

  // 1. Build Title
  let pageTitle = `${PRIMARY_STORE_TAG} | Official Apps, Prompts & Source Code`;
  if (item) {
    pageTitle = `${item.title} (${item.type === 'app' ? item.version || 'Latest' : item.category}) - Free Download | ${PRIMARY_STORE_NAME} 🇧🇩`;
  } else if (category && category !== 'All Content') {
    pageTitle = `${category} - Download & Explore | ${PRIMARY_STORE_NAME} 🇧🇩`;
  } else if (title) {
    pageTitle = `${title} | ${PRIMARY_STORE_TAG}`;
  }
  document.title = pageTitle;

  // 2. Build Description
  let pageDescription = `${PRIMARY_STORE_NAME} is Bangladesh's premier verified developer repository for safe Android apps, AI prompts, technical documentation, and turnkey source codes with real-time download verification.`;
  if (item) {
    pageDescription = `Download ${item.title} safely on ${PRIMARY_STORE_NAME}. ${item.description.slice(0, 160)}... 100% verified checksum and direct fast link.`;
  } else if (description) {
    pageDescription = `${description} - ${PRIMARY_STORE_NAME}`;
  }

  // 3. Build Keyword Array (Prioritizing Rajon Dev Store heavily)
  const itemKeywords: string[] = [];
  if (item) {
    itemKeywords.push(
      item.title,
      `${item.title} download`,
      `${item.title} ${PRIMARY_STORE_NAME}`,
      `${item.title} latest version`,
      `${item.title} apk`,
      item.category
    );
    if ('tags' in item && Array.isArray(item.tags)) {
      itemKeywords.push(...item.tags);
    }
    if ('developer' in item && item.developer) {
      itemKeywords.push(item.developer);
    }
  }

  const allKeywords = Array.from(
    new Set([...CORE_KEYWORDS, ...itemKeywords, ...keywords])
  ).join(', ');

  const currentUrl = url || window.location.href;
  const image = ogImage || (item && item.logoUrl) || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80';

  // Update or create standard meta tags
  setMetaTag('description', pageDescription);
  setMetaTag('keywords', allKeywords);
  setMetaTag('author', 'Rajon Dev Store');
  setMetaTag('publisher', 'Rajon Dev Store');
  setMetaTag('robots', 'index, follow, max-image-preview:large');

  // OpenGraph Tags
  setMetaProperty('og:title', pageTitle);
  setMetaProperty('og:description', pageDescription);
  setMetaProperty('og:type', item ? 'product' : 'website');
  setMetaProperty('og:url', currentUrl);
  setMetaProperty('og:site_name', PRIMARY_STORE_TAG);
  setMetaProperty('og:image', image);
  setMetaProperty('og:locale', 'en_US');

  // Twitter Card Tags
  setMetaTag('twitter:card', 'summary_large_image');
  setMetaTag('twitter:title', pageTitle);
  setMetaTag('twitter:description', pageDescription);
  setMetaTag('twitter:image', image);
  setMetaTag('twitter:site', '@RajonDevStore');

  // Canonical Link
  let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', currentUrl);

  // JSON-LD Structured Data Schema for Google Search Engine Optimization
  updateJSONLD(item, pageTitle, pageDescription, currentUrl, image);
}

function setMetaTag(name: string, content: string) {
  let element = document.querySelector(`meta[name="${name}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('name', name);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function setMetaProperty(property: string, content: string) {
  let element = document.querySelector(`meta[property="${property}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('property', property);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function updateJSONLD(
  item: StoreItem | null | undefined, 
  title: string, 
  description: string, 
  url: string, 
  image: string
) {
  const scriptId = 'rajon-dev-store-jsonld';
  let script = document.getElementById(scriptId) as HTMLScriptElement;
  if (!script) {
    script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }

  let schemaData: any = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': PRIMARY_STORE_TAG,
    'alternateName': ['Rajon Dev Store', 'RajonDevStore', 'Rajon Ai Dev Hub'],
    'url': window.location.origin,
    'description': 'Official repository for verified Android applications, AI prompts, and developer source code.',
    'potentialAction': {
      '@type': 'SearchAction',
      'target': `${window.location.origin}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    },
    'publisher': {
      '@type': 'Organization',
      'name': PRIMARY_STORE_NAME,
      'url': window.location.origin,
      'email': 'zetamod.business@gmail.com'
    }
  };

  if (item && item.type === 'app') {
    schemaData = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      'name': item.title,
      'operatingSystem': 'Android',
      'applicationCategory': item.subCategory || 'UtilityApplication',
      'softwareVersion': item.version,
      'fileSize': item.size,
      'description': item.description,
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD'
      },
      'publisher': {
        '@type': 'Organization',
        'name': PRIMARY_STORE_NAME,
        'url': window.location.origin
      },
      'image': item.logoUrl || image,
      'url': url
    };
  }

  script.textContent = JSON.stringify(schemaData);
}
