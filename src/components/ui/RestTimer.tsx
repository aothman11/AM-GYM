'use client';

import { useState, useEffect, useRef } from 'react';
import { useApp } from '@/contexts/AppContext';

export default function RestTimer() {
  const { restTimer, dismissRestTimer, showToast, t } = useApp();
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (restTimer.active) setSeconds(restTimer.max);
  }, [restTimer.active, restTimer.max]);

  useEffect(() => {
    if (!restTimer.active) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setSeconds(s => {
        if (s <= 1) {
          clearInterval(intervalRef.current!);
          if (typeof navigator !== 'undefined' && navigator.vibrate) {
            navigator.vibrate([200, 100, 200]);
          }
          showToast(t("⏰ Rest done — go!", '⏰ انتهت الراحة — هيا!'));
          dismissRestTimer();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restTimer.active]);

  if (!restTimer.active) return null;

  const pct = restTimer.max > 0 ? seconds / restTimer.max : 0;
  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
  const r = 26;
  const circ = 2 * Math.PI * r;

  return (
    <div style={{
      position: 'fixed',
      bottom: '76px',
      right: '12px',
      zIndex: 490,
      background: 'var(--bg2)',
      border: '1px solid rgba(124,92,255,0.45)',
      borderRadius: '18px',
      padding: '10px 14px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.45)',
      minWidth: '155px',
    }}>
      <svg width="52" height="52" viewBox="0 0 60 60">
        <circle cx="30" cy="30" r={r} fill="none" stroke="var(--bg4)" strokeWidth="4"/>
        <circle
          cx="30" cy="30" r={r}
          fill="none"
          stroke="var(--violet)"
          strokeWidth="4"
          strokeDasharray={`${circ}`}
          strokeDashoffset={`${circ * (1 - pct)}`}
          strokeLinecap="round"
          transform="rotate(-90 30 30)"
          style={{ transition: 'stroke-dashoffset 1s linear' }}
        />
        <text x="30" y="35" textAnchor="middle" fill="var(--white)" fontSize="12" fontWeight="700" fontFamily="monospace">
          {fmt(seconds)}
        </text>
      </svg>

      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '10px', color: 'var(--gray3)', marginBottom: '1px' }}>
          {t('Rest Timer', 'مؤقت الراحة')}
        </div>
        <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--white)', fontFamily: 'var(--font-mono)', lineHeight: 1 }}>
          {fmt(seconds)}
        </div>
      </div>

      <button
        onClick={dismissRestTimer}
        style={{
          width: '26px', height: '26px', borderRadius: '50%',
          background: 'var(--bg3)', border: '1px solid var(--bg4)',
          color: 'var(--gray2)', fontSize: '13px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
        }}
        aria-label="Dismiss timer"
      >✕</button>
    </div>
  );
}
