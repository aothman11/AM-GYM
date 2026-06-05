'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/contexts/AppContext';

const tabs = [
  {
    id: 'home',
    path: '/',
    labelEn: 'Home',
    labelAr: 'الرئيسية',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    id: 'programs',
    path: '/programs',
    labelEn: 'Programs',
    labelAr: 'البرامج',
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="3" y="3" width="7" height="7"/>
        <rect x="14" y="3" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/>
        <rect x="3" y="14" width="7" height="7"/>
      </svg>
    ),
  },
  {
    id: 'exercises',
    path: '/exercises',
    labelEn: 'Exercises',
    labelAr: 'التمارين',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M6.5 6.5h11v11h-11z"/>
        <path d="M4 9h2M18 9h2M4 15h2M18 15h2M9 4v2M9 18v2M15 4v2M15 18v2"/>
      </svg>
    ),
  },
  {
    id: 'calories',
    path: '/calories',
    labelEn: 'Calories',
    labelAr: 'السعرات',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z"/>
        <path d="M12 6v6l4 2"/>
      </svg>
    ),
  },
  {
    id: 'profile',
    path: '/profile',
    labelEn: 'Profile',
    labelAr: 'الملف',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
  },
];

export default function TabBar() {
  const pathname = usePathname();
  const { t } = useApp();

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <nav className="tab-bar">
      {tabs.map((tab) => (
        <Link
          key={tab.id}
          href={tab.path}
          className={`tab-btn ${isActive(tab.path) ? 'active' : ''}`}
        >
          {tab.icon}
          <span>{t(tab.labelEn, tab.labelAr)}</span>
        </Link>
      ))}
    </nav>
  );
}
