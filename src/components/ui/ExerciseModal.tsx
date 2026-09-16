'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useApp } from '@/contexts/AppContext';
import { Exercise } from '@/data/exercises';
import { getLastRecord, saveRecord, calc1RM, getWarmupSets, ExerciseRecord } from '@/lib/exerciseHistory';

interface ExerciseModalProps {
  exercise: Exercise | null;
  sets?: string;
  onClose: () => void;
}

const GIF_CACHE: Record<string, string> = {};

export default function ExerciseModal({ exercise, sets, onClose }: ExerciseModalProps) {
  const { t, showToast } = useApp();
  const [gifUrl, setGifUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [lastRecord, setLastRecord] = useState<ExerciseRecord | null>(null);
  const [logWeight, setLogWeight] = useState('');
  const [logReps, setLogReps] = useState('');
  const [logSaved, setLogSaved] = useState(false);

  useEffect(() => {
    if (!exercise) return;

    if (scrollRef.current) scrollRef.current.scrollTop = 0;

    // Load last record for this exercise
    const rec = getLastRecord(exercise.name);
    setLastRecord(rec);
    setLogWeight(rec ? String(rec.weight) : '');
    setLogReps(rec ? String(rec.reps) : '');
    setLogSaved(false);

    const key = (exercise.gifKey || exercise.name).toLowerCase();

    if (GIF_CACHE[key]) {
      setGifUrl(GIF_CACHE[key]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const searchName = exercise.gifKey || exercise.name;

    fetch(`/api/exercise?name=${encodeURIComponent(searchName)}`)
      .then(r => r.json())
      .then(d => {
        if (d?.gifUrl) {
          const proxied = `/api/gif?url=${encodeURIComponent(d.gifUrl)}`;
          GIF_CACHE[key] = proxied;
          setGifUrl(proxied);
        } else {
          setGifUrl(null);
        }
        setLoading(false);
      })
      .catch(() => {
        setGifUrl(null);
        setLoading(false);
      });
  }, [exercise]);

  if (!exercise) return null;

  const setsArr = sets ? sets.split('×') : ['3', '10'];

  const handleLogSet = () => {
    const w = parseFloat(logWeight);
    const r = parseInt(logReps);
    if (!w || !r || w <= 0 || r <= 0) return;
    saveRecord(exercise.name, w, r);
    setLastRecord({ weight: w, reps: r, date: new Date().toDateString() });
    setLogSaved(true);
    showToast(t('Set logged ✓', 'تم تسجيل الجولة ✓'));
  };

  const w = lastRecord?.weight ?? 0;
  const r = lastRecord?.reps ?? 0;
  const oneRM = w && r ? calc1RM(w, r) : null;
  const warmup = w ? getWarmupSets(w) : null;

  return createPortal(
    <div className="modal-overlay open" onClick={onClose}>
      <div className="modal-sheet" onClick={e => e.stopPropagation()}>

        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '16px', right: '16px',
            width: '36px', height: '36px', borderRadius: '50%',
            background: 'var(--bg3)', border: '1px solid var(--bg4)',
            color: 'var(--gray1)', fontSize: '20px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', zIndex: 10, transition: 'all 0.2s',
          }}
          aria-label="Close"
        >✕</button>

        {/* Video */}
        <div className="modal-top">
          <div className="modal-handle" />
          <div className="modal-video">
            <div style={{
              borderRadius: '14px', overflow: 'hidden', background: '#0a0a0a',
              height: '42vh', maxHeight: '320px', minHeight: '180px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexDirection: 'column', gap: '10px',
            }}>
              {loading ? (
                <>
                  <div style={{
                    width: '36px', height: '36px',
                    border: '3px solid var(--violet)', borderTopColor: 'transparent',
                    borderRadius: '50%', animation: 'spin 1s linear infinite',
                  }} />
                  <div style={{ fontSize: '11px', color: '#444' }}>
                    {t('Loading...', 'جاري التحميل...')}
                  </div>
                </>
              ) : gifUrl ? (
                <img
                  src={gifUrl}
                  alt={exercise.name}
                  style={{ width: '100%', height: '100%', display: 'block', objectFit: 'contain', background: '#0a0a0a' }}
                  onError={() => setGifUrl(null)}
                />
              ) : (
                <>
                  <div style={{
                    width: '72px', height: '72px', borderRadius: '50%',
                    background: 'var(--violet-dim)', border: '2px solid var(--violet)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '32px', color: 'var(--violet)',
                  }}>
                    {exercise.name.charAt(0).toUpperCase()}
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#fff', textAlign: 'center', padding: '0 20px' }}>
                    {exercise.name}
                  </div>
                  <div style={{ fontSize: '11px', color: '#444' }}>
                    {t('Image not available', 'الصورة غير متاحة')}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Scrollable details */}
        <div className="modal-scroll" ref={scrollRef}>
          <div className="modal-title">{exercise.name}</div>
          <div className="modal-muscle">
            {exercise.muscle ? `${t('Primary:', 'العضلة الرئيسية:')} ${exercise.muscle}` : ''}
          </div>

          <div className="modal-sets-info">
            <div className="set-badge">Sets: <span>{setsArr[0]?.trim() || '3'}</span></div>
            <div className="set-badge">Reps: <span>{setsArr[1]?.trim() || '10'}</span></div>
            {lastRecord && (
              <div className="set-badge" style={{ background: 'rgba(124,92,255,0.15)', borderColor: 'rgba(124,92,255,0.3)' }}>
                Last: <span style={{ color: 'var(--violet)' }}>{lastRecord.weight}kg×{lastRecord.reps}</span>
              </div>
            )}
          </div>

          {/* 1RM + Warm-up */}
          {oneRM && (
            <div style={{
              background: 'linear-gradient(135deg, rgba(124,92,255,0.12), rgba(77,139,255,0.08))',
              border: '1px solid rgba(124,92,255,0.25)',
              borderRadius: 12, padding: '12px 14px', marginBottom: 14,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: warmup ? 10 : 0 }}>
                <div style={{ fontSize: 12, color: 'var(--gray2)' }}>{t('Est. 1RM', 'الحد الأقصى المقدّر')}</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--violet)', fontFamily: 'var(--font-mono)' }}>{oneRM} kg</div>
              </div>
              {warmup && (
                <>
                  <div style={{ fontSize: 11, color: 'var(--gray3)', marginBottom: 7 }}>{t('Warm-up sets', 'إحماء')}</div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {warmup.map((wu, i) => (
                      <div key={i} style={{
                        flex: 1, background: 'var(--bg3)', borderRadius: 8,
                        padding: '6px', textAlign: 'center',
                      }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--white)' }}>{wu.kg}kg</div>
                        <div style={{ fontSize: 10, color: 'var(--gray3)' }}>{wu.pct}% × {wu.reps}</div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Log set */}
          <div style={{
            background: 'var(--bg3)', border: '1px solid var(--bg4)',
            borderRadius: 12, padding: '12px 14px', marginBottom: 14,
          }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--gray2)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '.5px' }}>
              {t('Log This Set', 'سجّل هذه الجولة')}
            </div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, color: 'var(--gray3)', marginBottom: 4 }}>{t('Weight (kg)', 'الوزن (كجم)')}</div>
                <input
                  type="number"
                  value={logWeight}
                  onChange={e => { setLogWeight(e.target.value); setLogSaved(false); }}
                  placeholder="0"
                  style={{
                    width: '100%', background: 'var(--bg2)', border: '1px solid var(--bg4)',
                    borderRadius: 8, padding: '8px 10px', color: 'var(--white)',
                    fontSize: 16, textAlign: 'center',
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, color: 'var(--gray3)', marginBottom: 4 }}>{t('Reps', 'التكرارات')}</div>
                <input
                  type="number"
                  value={logReps}
                  onChange={e => { setLogReps(e.target.value); setLogSaved(false); }}
                  placeholder="0"
                  style={{
                    width: '100%', background: 'var(--bg2)', border: '1px solid var(--bg4)',
                    borderRadius: 8, padding: '8px 10px', color: 'var(--white)',
                    fontSize: 16, textAlign: 'center',
                  }}
                />
              </div>
            </div>
            <button
              onClick={handleLogSet}
              style={{
                width: '100%', padding: '10px',
                background: logSaved ? 'var(--bg2)' : 'linear-gradient(135deg,#7C5CFF,#4D8BFF)',
                border: logSaved ? '1px solid var(--green)' : 'none',
                borderRadius: 8, color: logSaved ? 'var(--green)' : '#fff',
                fontSize: 13, fontWeight: 700, cursor: 'pointer',
              }}
            >
              {logSaved ? `✓ ${t('Logged', 'تم التسجيل')}` : t('Log Set', 'سجّل')}
            </button>
          </div>

          {/* Form Cues */}
          <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--gray2)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '.5px' }}>
            {t('Form Cues', 'إرشادات الأداء')}
          </div>

          <div className="form-cue-list">
            {exercise.cues.map((cue, i) => (
              <div key={i} className="form-cue">
                <div className="form-cue-num">{i + 1}</div>
                <span>{cue}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>,
    document.body
  );
}
