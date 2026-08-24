'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/contexts/AppContext';
import { getCurrentChallenge } from '@/data/challenges';

export default function HomePage() {
  const { t, streak, weekWorkouts, totalWorkouts, showToast, profile } = useApp();
  const router = useRouter();

  // Greeting — client-only to avoid SSR timezone mismatch (React #418)
  const [greeting, setGreeting] = useState('');
  useEffect(() => {
    const h = new Date().getHours();
    if (h < 12) setGreeting(t('Good morning', 'صباح الخير'));
    else if (h < 17) setGreeting(t('Good afternoon', 'مساء الخير'));
    else if (h < 21) setGreeting(t('Good evening', 'مساء الخير'));
    else setGreeting(t('Good night', 'مساء الخير'));
  }, [t]);

  const userName = profile?.name || '';

  // ── Timer ────────────────────────────────────────────────────────────────
  const [timerMode, setTimerMode] = useState<'rest' | 'tabata' | 'custom'>('rest');
  const [timerSeconds, setTimerSeconds] = useState(90);
  const [timerMax, setTimerMax] = useState(90);
  const [timerRunning, setTimerRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timerRunning && timerSeconds > 0) {
      timerRef.current = setTimeout(() => setTimerSeconds(p => p - 1), 1000);
    } else if (timerRunning && timerSeconds === 0) {
      setTimerRunning(false);
      if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
      showToast(t("⏰ Time's up!", '⏰ انتهى الوقت!'));
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [timerRunning, timerSeconds, showToast, t]);

  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
  const timerToggle = () => { if (timerRunning) { setTimerRunning(false); } else { if (timerSeconds <= 0) setTimerSeconds(timerMax); setTimerRunning(true); } };
  const timerReset = () => { setTimerRunning(false); setTimerSeconds(timerMax); };
  const timerAdjust = (d: number) => { const v = Math.max(0, timerSeconds + d); setTimerSeconds(v); if (v > timerMax) setTimerMax(v); };
  const setPreset = (s: number) => { if (timerRunning) { setTimerRunning(false); } setTimerSeconds(s); setTimerMax(s); };
  const changeMode = (m: 'rest' | 'tabata' | 'custom') => {
    setTimerMode(m); setTimerRunning(false);
    setTimerSeconds(m === 'tabata' ? 20 : 90); setTimerMax(m === 'tabata' ? 20 : 90);
  };

  // ── Weekly Challenge ──────────────────────────────────────────────────────
  const [challenge] = useState(getCurrentChallenge());
  const [localProgress, setLocalProgress] = useState(0);
  useEffect(() => {
    const c = getCurrentChallenge();
    const key = `amgym_challenge_${c.year}_${c.weekNum}`;
    setLocalProgress(parseInt(localStorage.getItem(key) || '0'));
  }, []);

  const challengeLog = (dir: number) => {
    const c = getCurrentChallenge();
    const key = `amgym_challenge_${c.year}_${c.weekNum}`;
    let cur = Math.max(0, Math.min(c.target, parseInt(localStorage.getItem(key) || '0') + dir * c.step));
    localStorage.setItem(key, String(cur));
    setLocalProgress(cur);
    if (dir > 0 && cur >= c.target) showToast(t('🏆 Challenge complete!', '🏆 أكملت التحدي!'));
    else if (dir > 0) showToast(`+${c.step} ${c.unit} ✓`);
  };

  const daysLeft = 6 - new Date().getDay();
  const challengePct = Math.min((localProgress / challenge.target) * 100, 100);
  const challengeDone = localProgress >= challenge.target;
  const timerPct = timerMax > 0 ? timerSeconds / timerMax : 0;

  // ── Stats data ────────────────────────────────────────────────────────────
  const stats = [
    { value: streak,        label: t('Day Streak',    'أيام متتالية'),  icon: '🔥' },
    { value: weekWorkouts,  label: t('This Week',     'هذا الأسبوع'),  icon: '📅' },
    { value: totalWorkouts, label: t('Total Workouts','مجموع التمارين'), icon: '💪' },
  ];

  return (
    <div className="home-grid">

      {/* ══ LEFT COLUMN ═══════════════════════════════════════════════════ */}
      <div className="home-col-left">

        {/* Hero */}
        <div className="home-hero">
          {/* Ambient glow orbs */}
          <div className="hero-orb hero-orb-1" />
          <div className="hero-orb hero-orb-2" />

          <div className="hero-body">
            <p className="hero-greeting">{greeting}{userName ? `, ${userName}` : ''} 💪</p>

            <h1 className="hero-headline">
              <span className="hero-line-white">{t('Ready to', 'جاهز')}</span>
              <span className="hero-line-violet">{t('Train?', 'للتمرين؟')}</span>
            </h1>

            {/* Kabsa promo */}
            <div className="hero-promo">
              <strong className="hero-promo-title">
                {t("🍚 Don't know how to count Kabsa calories?", '🍚 ما تعرف كيف تحسب سعرات الكبسة؟')}
              </strong>
              <span className="hero-promo-body">
                {t('Track your favorite local meals in the Calories tab →', 'تتبع وجباتك المحلية في تبويب السعرات ←')}
              </span>
            </div>

            {/* CTA */}
            <button onClick={() => router.push('/programs')} className="hero-cta animate-glow">
              <span>⚡</span>
              <span>{t('Start Training', 'ابدأ التمرين')}</span>
            </button>
          </div>
        </div>

        {/* Weekly Challenge */}
        <div className="challenge-card" style={{ boxShadow: challengeDone ? '0 0 24px rgba(112,132,255,0.25)' : 'none', borderColor: challengeDone ? 'var(--violet)' : 'rgba(112,132,255,0.25)' }}>
          <div className="challenge-header">
            <div className="challenge-badge">🏆 <span>{t('Weekly Challenge', 'تحدي الأسبوع')}</span></div>
            <span className="challenge-week">{t(`Week ${challenge.weekNum}`, `الأسبوع ${challenge.weekNum}`)} · {daysLeft === 0 ? t('Last day!', 'آخر يوم!') : t(`${daysLeft}d left`, `${daysLeft} أيام`)}</span>
          </div>

          <div className="challenge-body">
            <div className="challenge-info">
              <div className="challenge-name">{challenge.emoji} {challenge.exercise}</div>
              <div className="challenge-desc">{t(challenge.en, challenge.ar)}</div>
            </div>
            {challengeDone && <div className="challenge-done-badge">✓ {t('Done!', 'أنجز!')}</div>}
          </div>

          {/* Progress */}
          <div className="challenge-progress-bar">
            <div className="challenge-progress-fill" style={{ width: `${challengePct}%` }} />
          </div>

          <div className="challenge-footer">
            <span className="challenge-count">{localProgress} / {challenge.target} {challenge.unit}</span>
            <div className="challenge-btns">
              <button className="challenge-btn-minus" onClick={() => challengeLog(-1)}>−</button>
              <button className="challenge-btn-plus"  onClick={() => challengeLog(+1)}>+{challenge.step}</button>
            </div>
          </div>
        </div>

      </div>{/* end home-col-left */}

      {/* ══ RIGHT COLUMN ══════════════════════════════════════════════════ */}
      <div className="home-col-right">

        {/* Stats panel */}
        <div className="stats-panel">
          <div className="stats-panel-title">{t('Your Stats', 'إحصائياتك')}</div>
          <div className="stats-list">
            {stats.map(s => (
              <div key={s.label} className="stats-row">
                <span className="stats-icon">{s.icon}</span>
                <span className="stats-label">{s.label}</span>
                <span className="stats-value">{s.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Timer */}
        <div className="timer-card">
          {/* Mode tabs */}
          <div className="timer-modes">
            {(['rest', 'tabata', 'custom'] as const).map(m => (
              <button
                key={m}
                onClick={() => changeMode(m)}
                className={`timer-mode-btn ${timerMode === m ? 'active' : ''}`}
              >
                {m === 'rest' ? t('Rest', 'راحة') : m === 'tabata' ? 'Tabata' : t('Custom', 'مخصص')}
              </button>
            ))}
          </div>

          {/* Ring + time display */}
          <div className="timer-display">
            <svg className="timer-ring" viewBox="0 0 120 120">
              <defs>
                <linearGradient id="timerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#405bff"/>
                  <stop offset="100%" stopColor="#7084ff"/>
                </linearGradient>
              </defs>
              <circle cx="60" cy="60" r="52" fill="none" stroke="var(--bg4)" strokeWidth="6"/>
              <circle
                cx="60" cy="60" r="52"
                fill="none"
                stroke="url(#timerGrad)"
                strokeWidth="6"
                strokeDasharray={`${2 * Math.PI * 52}`}
                strokeDashoffset={`${2 * Math.PI * 52 * (1 - timerPct)}`}
                strokeLinecap="round"
                transform="rotate(-90 60 60)"
                style={{ transition: timerRunning ? 'stroke-dashoffset 1s linear' : 'stroke-dashoffset 0.3s ease' }}
              />
            </svg>
            <div className="timer-time-overlay">
              <span className="timer-time">{fmt(timerSeconds)}</span>
              <span className="timer-sublabel">
                {timerMode === 'tabata' ? t('Work Phase', 'مرحلة العمل') : t('Rest Period', 'فترة الراحة')}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="timer-controls">
            <button className="timer-btn-sec" onClick={timerReset} title="Reset">↺</button>
            <button className="timer-btn-main animate-glow" onClick={timerToggle}>
              {timerRunning ? '⏸' : '▶'}
            </button>
            <button className="timer-btn-sec" onClick={() => timerAdjust(-15)}>-15s</button>
          </div>

          {/* Presets */}
          <div className="timer-presets">
            {[
              { label: t('1 min', 'دقيقة'),     sec: 60  },
              { label: t('1:30',  '1:30'),       sec: 90  },
              { label: t('3 min', '3 دقائق'),    sec: 180 },
            ].map(p => (
              <button key={p.sec} className="timer-preset-btn" onClick={() => setPreset(p.sec)}>
                <span className="timer-preset-time">{fmt(p.sec)}</span>
                <span className="timer-preset-label">{p.label}</span>
              </button>
            ))}
          </div>
        </div>

      </div>{/* end home-col-right */}
    </div>
  );
}
