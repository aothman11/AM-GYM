'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Header from '@/components/layout/Header';
import TabBar from '@/components/layout/TabBar';
import Toast from '@/components/ui/Toast';
import { useApp } from '@/contexts/AppContext';

/** AMGYM brand mark — gradient arch/peak logo */
export function AmgymMark({ size = 36 }: { size?: number }) {
  const r = size * 112 / 512; // proportional corner radius
  return (
    <svg width={size} height={size} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <rect width="512" height="512" rx={r} fill="#0F1221"/>
      <defs>
        <linearGradient id="amgym-g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7C5CFF"/>
          <stop offset="100%" stopColor="#4D8BFF"/>
        </linearGradient>
      </defs>
      {/* Outer arch */}
      <path d="M96 400 L256 112 L416 400" stroke="url(#amgym-g)" strokeWidth="52" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Inner cutout */}
      <path d="M160 400 L256 220 L352 400" stroke="#0F1221" strokeWidth="52" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Accent dot */}
      <circle cx="148" cy="310" r="32" fill="url(#amgym-g)"/>
    </svg>
  );
}

const NAV_ITEMS = [
  {
    path: '/',
    labelEn: 'Home',
    labelAr: 'الرئيسية',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    path: '/programs',
    labelEn: 'Programs',
    labelAr: 'البرامج',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
  },
  {
    path: '/exercises',
    labelEn: 'Exercises',
    labelAr: 'التمارين',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6.5 6.5h11v11h-11z"/>
        <path d="M4 9h2M18 9h2M4 15h2M18 15h2M9 4v2M9 18v2M15 4v2M15 18v2"/>
      </svg>
    ),
  },
  {
    path: '/calories',
    labelEn: 'Calories',
    labelAr: 'السعرات',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z"/>
        <path d="M12 6v6l4 2"/>
      </svg>
    ),
  },
  {
    path: '/profile',
    labelEn: 'Profile',
    labelAr: 'الملف',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
  },
];

function Sidebar() {
  const pathname = usePathname();
  const { t, lang, setLang, gender, setGender, theme, toggleTheme } = useApp();

  const isActive = (path: string) =>
    path === '/' ? pathname === '/' : pathname.startsWith(path);

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <AmgymMark size={36} />
        <div className="logo-text">AM<span className="logo-green">GYM</span></div>
      </div>

      {/* Nav */}
      <nav className="sidebar-nav">
        {NAV_ITEMS.map(item => (
          <Link
            key={item.path}
            href={item.path}
            className={`sidebar-link ${isActive(item.path) ? 'active' : ''}`}
          >
            {item.icon}
            <span>{t(item.labelEn, item.labelAr)}</span>
          </Link>
        ))}
      </nav>

      {/* Controls */}
      <div className="sidebar-controls">
        {/* Theme */}
        <button className="theme-toggle sidebar-theme-btn" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'dark' ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="5"/>
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          )}
          <span>{theme === 'dark' ? t('Light', 'فاتح') : t('Dark', 'داكن')}</span>
        </button>

        {/* Lang */}
        <div className="control-pill sidebar-pill">
          <button className={`pill-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>EN</button>
          <button className={`pill-btn ${lang === 'ar' ? 'active' : ''}`} onClick={() => setLang('ar')}>ع</button>
        </div>

        {/* Gender */}
        <div className="control-pill sidebar-pill">
          <button className={`pill-btn icon ${gender === 'male' ? 'active' : ''}`} onClick={() => setGender('male')} aria-label="Male">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <circle cx="10" cy="14" r="5"/><path d="M19 5l-5.4 5.4M19 5h-4M19 5v4"/>
            </svg>
          </button>
          <button className={`pill-btn icon ${gender === 'female' ? 'active' : ''}`} onClick={() => setGender('female')} aria-label="Female">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <circle cx="12" cy="9" r="5"/><path d="M12 14v6M9 17h6"/>
            </svg>
          </button>
        </div>
      </div>
    </aside>
  );
}

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <div className="app-shell">
      {/* Desktop sidebar */}
      <Sidebar />

      {/* Mobile header */}
      <Header />

      {/* Main content */}
      <div className="main-area">
        <main className="page-content animate-fadeUp">
          {children}
        </main>
      </div>

      {/* Mobile tab bar */}
      <TabBar />
      <Toast />
    </div>
  );
}
