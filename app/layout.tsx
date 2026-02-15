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
  title: 'EzzAds.ai — Military-Grade Ad Generation Engine',
  description:
    'Generate high-converting marketing ads using AI-driven frameworks. Conversion-optimized. Platform-specific. Framework-driven.',
  keywords: ['ad generation', 'AI ads', 'marketing automation', 'conversion optimization'],
  robots: 'index, follow',
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
        <NavigationBar />
        <main className="relative z-10 min-h-screen pt-[52px]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
