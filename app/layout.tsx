import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import NavigationBar from '@/components/ui/NavigationBar';
import Footer from '@/components/ui/Footer';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'EzzAds.ai — Military-Grade Ad Generation Engine',
    template: '%s | EzzAds.ai',
  },
  description:
    'Generate high-converting marketing ads using AI-driven frameworks. Conversion-optimized. Platform-specific. Framework-driven.',
  keywords: ['ad generation', 'AI ads', 'marketing automation', 'conversion optimization', 'ad copy generator', 'facebook ads', 'google ads'],
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    title: 'EzzAds.ai — Military-Grade Ad Generation Engine',
    description: 'Generate high-converting marketing ads using AI-driven frameworks. Deploy across Meta, Google, TikTok, YouTube, and LinkedIn.',
    siteName: 'EzzAds.ai',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EzzAds.ai — Military-Grade Ad Generation Engine',
    description: 'AI-powered ad copy generation with AIDA, PAS, and emotional trigger frameworks.',
  },
};

export const viewport = {
  themeColor: '#020408',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          background: 'var(--color-bg-primary)',
          color: 'var(--color-text-primary)',
          fontFamily: 'var(--font-display)',
        }}
      >
        {/* Skip to content — accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:text-sm"
          style={{
            background: 'var(--color-accent-blue)',
            color: '#fff',
            borderRadius: 'var(--radius-sharp)',
          }}
        >
          Skip to content
        </a>
        <NavigationBar />
        <main id="main-content" className="relative z-10 min-h-screen pt-[52px]" role="main">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
