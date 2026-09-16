'use client';

import { useEffect, useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { AgentSession } from '@/types/agent';

export default function HistoryPage() {
  const { t } = useApp();
  const [sessions, setSessions] = useState<AgentSession[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('amgym_agent_sessions');
      if (raw) {
        const parsed: AgentSession[] = JSON.parse(raw);
        setSessions([...parsed].reverse());
      }
    } catch {
      setSessions([]);
    }
  }, []);

  const RATING_LABEL: Record<number, string> = { 1: 'Brutal 💀', 2: 'OK 😐', 3: 'Great 💪' };

  return (
    <div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--violet)', letterSpacing: 1, marginBottom: 4, textShadow: '0 0 16px rgba(124,92,255,0.45)' }}>
        {t('HISTORY', 'السجل')}
      </div>
      <div style={{ fontSize: 13, color: 'var(--gray2)', marginBottom: 20 }}>
        {t('Your past workout sessions', 'جلسات التمرين السابقة')}
      </div>

      {sessions.length === 0 ? (
        <div style={{
          background: 'var(--bg2)', border: '1px solid var(--bg4)',
          borderRadius: 'var(--r-xl)', padding: '40px 20px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>📋</div>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>
            {t('No sessions logged yet', 'لم يتم تسجيل جلسات بعد')}
          </div>
          <div style={{ fontSize: 13, color: 'var(--gray2)' }}>
            {t('Log a workout using the AI Coach to see your history here.', 'سجّل تمريناً باستخدام المدرب الذكي لعرض سجلك هنا.')}
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {sessions.map((s, i) => (
            <div key={i} style={{
              background: 'var(--bg2)', border: '1px solid var(--bg4)',
              borderRadius: 'var(--r-xl)', padding: '14px 16px',
            }}>
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--white)' }}>{s.dayLabel}</div>
                  <div style={{ fontSize: 12, color: 'var(--gray3)', marginTop: 2 }}>{s.date}</div>
                </div>
                {s.rating ? (
                  <span style={{
                    fontSize: 11, fontWeight: 700,
                    background: s.rating === 3 ? 'rgba(124,92,255,0.2)' : s.rating === 2 ? 'rgba(77,139,255,0.2)' : 'rgba(255,80,80,0.2)',
                    color: s.rating === 3 ? 'var(--violet)' : s.rating === 2 ? '#4D8BFF' : '#FF5050',
                    padding: '3px 10px', borderRadius: 20,
                  }}>{RATING_LABEL[s.rating]}</span>
                ) : null}
              </div>

              {/* Exercise list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                {s.exercises.map((ex, ei) => (
                  <div key={ei} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    background: 'var(--bg3)', borderRadius: 8, padding: '7px 10px',
                  }}>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{ex.name}</span>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <span style={{ fontSize: 11, color: 'var(--violet)', background: 'rgba(124,92,255,0.15)', padding: '2px 7px', borderRadius: 8 }}>
                        {ex.sets}×{ex.reps}
                      </span>
                      {ex.kg && ex.kg !== '0' && (
                        <span style={{ fontSize: 11, color: 'var(--gray2)', background: 'var(--bg4)', padding: '2px 7px', borderRadius: 8 }}>
                          {ex.kg}kg
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {s.notes ? (
                <div style={{ marginTop: 10, fontSize: 12, color: 'var(--gray2)', fontStyle: 'italic' }}>
                  📝 {s.notes}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
