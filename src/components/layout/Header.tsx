'use client';

import { useApp } from '@/contexts/AppContext';

export default function Header() {
  const { lang, setLang, gender, setGender, theme, toggleTheme } = useApp();

  return (
    <header className="header">
      {/* Logo */}
      <div className="header-logo">
        <div className="logo-badge">
          <span>AM</span>
        </div>
        <div className="logo-text">
          AM<span className="logo-green">GYM</span>
        </div>
      </div>

      {/* Controls - Pill Style Tabs */}
      <div className="header-controls">
        {/* Theme Toggle */}
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
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
        </button>

        {/* Language Pill */}
        <div className="control-pill">
          <button
            className={`pill-btn ${lang === 'en' ? 'active' : ''}`}
            onClick={() => setLang('en')}
          >
            EN
          </button>
          <button
            className={`pill-btn ${lang === 'ar' ? 'active' : ''}`}
            onClick={() => setLang('ar')}
          >
            ع
          </button>
        </div>

        {/* Gender Pill */}
        <div className="control-pill">
          <button
            className={`pill-btn icon ${gender === 'male' ? 'active' : ''}`}
            onClick={() => setGender('male')}
            aria-label="Male"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <circle cx="10" cy="14" r="5"/>
              <path d="M19 5l-5.4 5.4M19 5h-4M19 5v4"/>
            </svg>
          </button>
          <button
            className={`pill-btn icon ${gender === 'female' ? 'active' : ''}`}
            onClick={() => setGender('female')}
            aria-label="Female"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <circle cx="12" cy="9" r="5"/>
              <path d="M12 14v6M9 17h6"/>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
