'use client';

import { useApp } from '@/contexts/AppContext';

export default function Header() {
  const { lang, toggleLang, gender, setGender, t } = useApp();

  return (
    <header className="app-header">
      <div className="logo-wrap">
        <div 
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: '#111',
            border: '2px solid var(--green)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-display)',
            fontSize: '16px',
            color: 'var(--green)',
            flexShrink: 0
          }}
        >
          AM
        </div>
        <span className="logo-text">AM-GYM</span>
      </div>
      <div className="header-actions">
        <button className="lang-btn" onClick={toggleLang}>
          {lang === 'ar' ? 'English' : 'عربي'}
        </button>
        <div className="gender-toggle">
          <button 
            className={`gender-btn ${gender === 'male' ? 'active' : ''}`}
            onClick={() => setGender('male')}
          >
            {t('♂ Male', '♂ ذكر')}
          </button>
          <button 
            className={`gender-btn ${gender === 'female' ? 'active' : ''}`}
            onClick={() => setGender('female')}
          >
            {t('♀ Female', '♀ أنثى')}
          </button>
        </div>
      </div>
    </header>
  );
}
