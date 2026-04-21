'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/contexts/AppContext';
import { getCurrentChallenge, getWeekNumber } from '@/data/challenges';

export default function HomePage() {
  const { t, streak, weekWorkouts, totalWorkouts, challengeProgress, setChallengeProgress, showToast } = useApp();
  const router = useRouter();
  
  // Timer state
  const [timerMode, setTimerMode] = useState<'rest' | 'tabata' | 'custom'>('rest');
  const [timerSeconds, setTimerSeconds] = useState(90);
  const [timerMax, setTimerMax] = useState(90);
  const [timerRunning, setTimerRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Challenge state
  const [challenge, setChallenge] = useState(getCurrentChallenge());
  const [localProgress, setLocalProgress] = useState(0);
  
  // Load challenge progress from localStorage
  useEffect(() => {
    const c = getCurrentChallenge();
    setChallenge(c);
    const key = `amgym_challenge_${c.year}_${c.weekNum}`;
    const saved = parseInt(localStorage.getItem(key) || '0');
    setLocalProgress(saved);
  }, []);
  
  // Timer logic
  useEffect(() => {
    if (timerRunning && timerSeconds > 0) {
      timerRef.current = setTimeout(() => {
        setTimerSeconds(prev => prev - 1);
      }, 1000);
    } else if (timerRunning && timerSeconds === 0) {
      setTimerRunning(false);
      if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
      showToast(t("⏰ Time's up!", "⏰ انتهى الوقت!"));
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timerRunning, timerSeconds, showToast, t]);
  
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };
  
  const timerToggle = () => {
    if (timerRunning) {
      setTimerRunning(false);
    } else {
      if (timerSeconds <= 0) setTimerSeconds(timerMax);
      setTimerRunning(true);
    }
  };
  
  const timerReset = () => {
    setTimerRunning(false);
    setTimerSeconds(timerMax);
  };
  
  const timerAdjust = (delta: number) => {
    const newVal = Math.max(0, timerSeconds + delta);
    setTimerSeconds(newVal);
    if (newVal > timerMax) setTimerMax(newVal);
  };
  
  const setTimerPreset = (seconds: number) => {
    if (timerRunning) timerReset();
    setTimerSeconds(seconds);
    setTimerMax(seconds);
  };
  
  const handleTimerModeChange = (mode: 'rest' | 'tabata' | 'custom') => {
    setTimerMode(mode);
    setTimerRunning(false);
    if (mode === 'tabata') {
      setTimerSeconds(20);
      setTimerMax(20);
    } else {
      setTimerSeconds(90);
      setTimerMax(90);
    }
  };
  
  // Challenge logic
  const challengeLog = (dir: number) => {
    const c = getCurrentChallenge();
    const key = `amgym_challenge_${c.year}_${c.weekNum}`;
    let cur = parseInt(localStorage.getItem(key) || '0');
    cur = Math.max(0, Math.min(c.target, cur + dir * c.step));
    localStorage.setItem(key, String(cur));
    setLocalProgress(cur);
    
    if (dir > 0 && cur >= c.target) {
      showToast(t('🏆 Challenge complete!', '🏆 أكملت التحدي!'));
    } else if (dir > 0) {
      showToast(`+${c.step} ${c.unit} ✓`);
    }
  };
  
  const daysLeft = (() => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    return dayOfWeek === 0 ? 0 : 7 - dayOfWeek;
  })();
  
  const challengePct = Math.min((localProgress / challenge.target) * 100, 100);
  const challengeDone = localProgress >= challenge.target;
  
  return (
    <div>
      {/* Hero Card */}
      <div style={{
        background: 'linear-gradient(135deg, var(--bg2) 0%, #0f1f12 100%)',
        border: '1px solid rgba(34,255,68,0.2)',
        borderRadius: 'var(--r-xl)',
        padding: '28px 24px',
        marginBottom: '16px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          content: '',
          position: 'absolute',
          top: '-40px',
          right: '-40px',
          width: '180px',
          height: '180px',
          background: 'radial-gradient(circle, rgba(34,255,68,0.15) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />
        <p style={{ fontSize: '13px', color: 'var(--gray2)', marginBottom: '4px' }}>
          {t('Welcome back 💪', 'أهلاً بك 💪')}
        </p>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '36px',
          color: 'var(--white)',
          lineHeight: 1.1,
          marginBottom: '8px'
        }}>
          {t('Ready to ', 'جاهز ')}
          <span style={{ color: 'var(--green)', textShadow: '0 0 15px rgba(34,255,68,0.5)' }}>
            {t('Train?', 'للتمرين؟')}
          </span>
        </h1>
        <div style={{
          fontSize: '13px',
          color: 'var(--gray2)',
          marginBottom: '16px',
          lineHeight: 1.5,
          padding: '12px',
          background: 'var(--green-dim)',
          borderRadius: 'var(--r-md)',
          borderLeft: '3px solid var(--green)'
        }}>
          <strong style={{ color: 'var(--green)', display: 'block', fontSize: '15px', marginBottom: '4px' }}>
            {t("🍚 Don't know how to count Kabsa calories?", '🍚 ما تعرف كيف تحسب سعرات الكبسة؟')}
          </strong>
          <span>{t('Track your favorite local meals easily in the Calories tab →', 'تتبع وجباتك المحلية المفضلة بسهولة في تبويب السعرات ←')}</span>
        </div>
        <button 
          onClick={() => router.push('/programs')}
          className="animate-glow"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'var(--green)',
            color: 'var(--bg)',
            fontWeight: 700,
            fontSize: '14px',
            padding: '13px 24px',
            borderRadius: 'var(--r-lg)',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <span>⚡</span>
          <span>{t('Start Training', 'ابدأ التمرين')}</span>
        </button>
      </div>
      
      {/* Quick Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '10px',
        marginBottom: '16px'
      }}>
        <div style={{
          background: 'var(--bg2)',
          border: '1px solid var(--bg4)',
          borderRadius: 'var(--r-lg)',
          padding: '14px 12px',
          textAlign: 'center'
        }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: 'var(--green)', lineHeight: 1 }}>
            {streak}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--gray2)', marginTop: '4px' }}>
            {t('Day Streak', 'أيام متتالية')}
          </div>
        </div>
        <div style={{
          background: 'var(--bg2)',
          border: '1px solid var(--bg4)',
          borderRadius: 'var(--r-lg)',
          padding: '14px 12px',
          textAlign: 'center'
        }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: 'var(--green)', lineHeight: 1 }}>
            {weekWorkouts}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--gray2)', marginTop: '4px' }}>
            {t('This Week', 'هذا الأسبوع')}
          </div>
        </div>
        <div style={{
          background: 'var(--bg2)',
          border: '1px solid var(--bg4)',
          borderRadius: 'var(--r-lg)',
          padding: '14px 12px',
          textAlign: 'center'
        }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: 'var(--green)', lineHeight: 1 }}>
            {totalWorkouts}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--gray2)', marginTop: '4px' }}>
            {t('Total Done', 'إجمالي')}
          </div>
        </div>
      </div>
      
      {/* Weekly Challenge */}
      <div style={{
        background: 'var(--bg2)',
        border: challengeDone ? '1px solid var(--green)' : '1px solid rgba(34,255,68,0.25)',
        borderRadius: 'var(--r-xl)',
        padding: '20px',
        marginBottom: '16px',
        boxShadow: challengeDone ? '0 0 20px rgba(34,255,68,0.15)' : 'none'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'var(--green-dim)',
            border: '1px solid rgba(34,255,68,0.3)',
            borderRadius: '20px',
            padding: '4px 12px',
            fontSize: '11px',
            color: 'var(--green)',
            fontWeight: 600
          }}>
            🏆 <span>{t('Weekly Challenge', 'تحدي الأسبوع')}</span>
          </div>
          <div style={{ fontSize: '11px', color: 'var(--gray2)' }}>
            {t(`Week ${challenge.weekNum}`, `الأسبوع ${challenge.weekNum}`)}
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '10px', marginBottom: '12px' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '17px', fontWeight: 700, marginBottom: '4px' }}>
              {challenge.emoji} {challenge.exercise}
            </div>
            <div style={{ fontSize: '13px', color: 'var(--gray2)' }}>
              {t(challenge.en, challenge.ar)}
            </div>
          </div>
          {challengeDone && (
            <div style={{
              background: 'var(--green)',
              color: '#000',
              fontSize: '11px',
              fontWeight: 700,
              padding: '4px 10px',
              borderRadius: '12px',
              whiteSpace: 'nowrap',
              flexShrink: 0
            }}>
              ✓ Done!
            </div>
          )}
        </div>
        
        <div style={{
          height: '6px',
          background: 'var(--bg4)',
          borderRadius: '3px',
          overflow: 'hidden',
          marginBottom: '8px'
        }}>
          <div style={{
            height: '100%',
            background: 'linear-gradient(90deg, var(--green2), var(--green))',
            borderRadius: '3px',
            transition: 'width 0.5s ease',
            width: `${challengePct}%`
          }} />
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '13px', color: 'var(--gray2)' }}>
            {localProgress} / {challenge.target} {challenge.unit}
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              onClick={() => challengeLog(-1)}
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: 'var(--bg3)',
                border: '1px solid var(--bg4)',
                color: 'var(--white)',
                fontSize: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              −
            </button>
            <button
              onClick={() => challengeLog(1)}
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: 'var(--green)',
                border: '1px solid var(--green)',
                color: '#000',
                fontSize: '16px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              +
            </button>
          </div>
        </div>
        
        <div style={{ marginTop: '10px', fontSize: '11px', color: 'var(--gray3)', textAlign: 'center' }}>
          {challengeDone
            ? t('🎉 Challenge completed this week!', '🎉 أكملت التحدي هذا الأسبوع!')
            : daysLeft === 0
              ? t('Last day today!', 'آخر يوم اليوم!')
              : t(`${daysLeft} days left · Each + = ${challenge.step} ${challenge.unit}`, `${daysLeft} أيام متبقية · كل + = ${challenge.step} ${challenge.unit}`)}
        </div>
      </div>
      
      {/* Timer */}
      <div style={{
        background: 'var(--bg2)',
        border: '1px solid var(--bg4)',
        borderRadius: 'var(--r-xl)',
        padding: '20px',
        marginBottom: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <span style={{ fontSize: '14px', fontWeight: 600 }}>
            {t('⏱ Rest Timer', '⏱ مؤقت الراحة')}
          </span>
          <div style={{ display: 'flex', gap: '6px' }}>
            {(['rest', 'tabata', 'custom'] as const).map(mode => (
              <button
                key={mode}
                onClick={() => handleTimerModeChange(mode)}
                style={{
                  fontSize: '11px',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  color: timerMode === mode ? 'var(--bg)' : 'var(--gray2)',
                  background: timerMode === mode ? 'var(--green)' : 'var(--bg3)',
                  border: timerMode === mode ? '1px solid var(--green)' : '1px solid var(--bg4)',
                  fontWeight: 500,
                  cursor: 'pointer'
                }}
              >
                {mode === 'rest' ? t('Rest', 'راحة') : mode === 'tabata' ? t('Tabata', 'تاباتا') : t('Custom', 'مخصص')}
              </button>
            ))}
          </div>
        </div>
        
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '72px',
            color: 'var(--green)',
            letterSpacing: '4px',
            lineHeight: 1,
            textShadow: '0 0 20px rgba(34,255,68,0.4)'
          }}>
            {formatTime(timerSeconds)}
          </div>
          <div style={{ fontSize: '13px', color: 'var(--gray2)', marginTop: '4px' }}>
            {timerMode === 'tabata' ? t('Work Phase', 'مرحلة العمل') : t('Rest Period', 'فترة الراحة')}
          </div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
          <button
            onClick={timerReset}
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              border: '2px solid var(--bg4)',
              color: 'var(--white)',
              background: 'var(--bg3)',
              cursor: 'pointer'
            }}
          >
            ↺
          </button>
          <button
            onClick={timerToggle}
            className="animate-glow"
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px',
              background: 'var(--green)',
              border: '2px solid var(--green)',
              color: 'var(--bg)',
              cursor: 'pointer'
            }}
          >
            {timerRunning ? '⏸' : '▶'}
          </button>
          <button
            onClick={() => timerAdjust(-15)}
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              border: '2px solid var(--bg4)',
              color: 'var(--white)',
              background: 'var(--bg3)',
              cursor: 'pointer'
            }}
          >
            -15s
          </button>
        </div>
        
        <div style={{ display: 'flex', gap: '8px', marginTop: '14px' }}>
          {[
            { label: t('Short', 'قصير'), val: '1:00', sec: 60 },
            { label: t('Medium', 'متوسط'), val: '1:30', sec: 90 },
            { label: t('Long', 'طويل'), val: '3:00', sec: 180 }
          ].map(preset => (
            <button
              key={preset.sec}
              onClick={() => setTimerPreset(preset.sec)}
              style={{
                flex: 1,
                background: 'var(--bg3)',
                border: '1px solid var(--bg4)',
                borderRadius: 'var(--r-md)',
                padding: '8px',
                textAlign: 'center',
                cursor: 'pointer'
              }}
            >
              <span style={{ fontSize: '10px', color: 'var(--gray2)', display: 'block' }}>{preset.label}</span>
              <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--white)' }}>{preset.val}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
