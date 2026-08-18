import { AppItem, PromptDocItem, SourceCodeItem, StoreItem } from '../types';

export const mockApps: AppItem[] = [
  {
    id: 'app-android-code-studio',
    type: 'app',
    title: 'Android Code Studio (ACS)',
    titleBn: 'Android Code Studio (ACS)',
    subtitle: 'On-Device Android IDE: Build, Compile & Run Java/Kotlin APKs on Mobile',
    subtitleBn: 'মোবাইলেই ফুলস্ট্যাক অ্যান্ড্রয়েড অ্যাপ কোডিং ও সরাসরি APK বিল্ড করার প্রফেশনাল IDE',
    description: 'Android Code Studio is a full-featured on-device Integrated Development Environment (IDE) built for Android devices. Develop native Android applications with Java and Kotlin, compile real APK binaries on-device, preview XML layouts in real time, and debug using integrated terminal and Logcat tools.',
    descriptionBn: 'Android Code Studio মোবাইলে সরাসরি জাভা ও কোটলিন দিয়ে প্রোজেক্ট কোডিং, লাইভ লেআউট প্রিভিউ এবং অন-ডিভাইস APK কম্পাইল করার সম্পূর্ণ ফ্রি IDE টুল।',
    icon: 'Code2',
    logoUrl: 'https://i.ibb.co.com/HpCf7GZ1/234419170.png',
    iconBg: 'from-emerald-500 to-teal-700',
    category: 'Android Apps',
    subCategory: 'Developer Tools & IDE',
    platforms: ['Android'],
    rating: 5.0,
    reviewCount: 128,
    downloadCount: '24K+',
    rawDownloads: 24350,
    size: '48 MB',
    version: 'v1.0.0+gh.r04',
    developer: 'AndroidCS Official',
    developerVerified: true,
    price: 'Free',
    promoTag: 'Official Release',
    isNew: true,
    downloadUrl: 'https://github.com/AndroidCSOfficial/android-code-studio/releases/download/v1.0.0%2Bgh.r4/android-code-studio-arm64-v8a-1.0.0+gh.r04.apk',
    packageName: 'com.androidcs.code.studio',
    tags: ['Android Code Studio', 'IDE', 'Compiler', 'Java', 'Kotlin', 'APK Builder', 'arm64', 'Developer Tools'],
    features: [
      'On-device native Android compilation and instant APK packaging',
      'Intelligent Java & Kotlin syntax highlighting and auto-completion',
      'Live visual XML Layout Designer with split-screen preview',
      'Integrated Terminal emulator, Git version control, and Logcat live logs',
      'Pre-configured Android SDK build tools with Android 14/15 support'
    ],
    keyHighlights: [
      'Official arm64-v8a Optimized Release',
      '100% Virus-Free & Safe Binary',
      'Full Offline Coding & Compiling Support'
    ],
    installGuide: `### 📱 Android Code Studio (ACS) Installation Guide:
1. Complete the 5-step verification process to unlock the direct download link.
2. Tap the downloaded file: **android-code-studio-arm64-v8a-1.0.0+gh.r04.apk**.
3. If prompted by your system, enable **"Install unknown apps"** in your Android device settings.
4. Open Android Code Studio, grant storage permission, and begin building and compiling your Android apps directly on your phone!`,
    screenshots: [
      'https://i.ibb.co.com/HpCf7GZ1/234419170.png'
    ],
    changelog: 'Official v1.0.0+gh.r04 release: Enhanced arm64-v8a compilation pipeline, fixed Gradle dependency indexing, and optimized memory usage.',
    minReqs: 'Android 7.0 or higher, 64-bit ARM architecture (arm64-v8a), 3GB+ RAM recommended.',
    featured: true,
    trending: true,
    reviews: [
      {
        id: 'r-acs-1',
        userName: 'Raihan Developer',
        rating: 5,
        date: 'Today',
        comment: 'Best IDE for compiling native Android apps right from an Android phone. Runs super fast!',
        verifiedDownload: true
      },
      {
        id: 'r-acs-2',
        userName: 'Tanvir Hossain',
        rating: 5,
        date: 'Yesterday',
        comment: 'The on-device APK compiler and XML preview work flawlessly on arm64.',
        verifiedDownload: true
      }
    ]
  }
];

export const mockPromptDocs: PromptDocItem[] = [];

export const mockSourceCode: SourceCodeItem[] = [];

export const allStoreItems: StoreItem[] = [
  ...mockApps,
  ...mockPromptDocs,
  ...mockSourceCode
];
