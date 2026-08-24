import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AppProvider } from '@/contexts/AppContext';

export const metadata: Metadata = {
  title: 'AMGYM – Train. Track. Transform.',
  description: 'Your AI-powered training companion. Train smarter, track everything, transform your lifestyle.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'AMGYM',
  },
  icons: {
    icon: '/app-icon.png',
    apple: '/app-icon.png',
    shortcut: '/app-icon.png',
  },
  openGraph: {
    title: 'AMGYM – Train. Track. Transform.',
    description: 'Your AI-powered training companion.',
    type: 'website',
    images: [{ url: '/app-icon.png' }],
  },
};

export const viewport: Viewport = {
  themeColor: '#7C5CFF',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" data-theme="dark">
      <head>
        {/* Explicit viewport with safe-area support */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" type="image/png" href="/app-icon.png" />
        <link rel="apple-touch-icon" href="/app-icon.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        {/* black-translucent = status bar overlays the app; safe-area CSS handles the gap */}
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="AMGYM" />
        <meta name="theme-color" content="#0F1221" />
      </head>
      <body>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
