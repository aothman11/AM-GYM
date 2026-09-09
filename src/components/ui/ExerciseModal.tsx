'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useApp } from '@/contexts/AppContext';
import { Exercise } from '@/data/exercises';

interface ExerciseModalProps {
  exercise: Exercise | null;
  sets?: string;
  onClose: () => void;
}

const GIF_CACHE: Record<string, string> = {};

export default function ExerciseModal({ exercise, sets, onClose }: ExerciseModalProps) {
  const { t } = useApp();
  const [gifUrl, setGifUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!exercise) return;

    // Always reset scroll so the video is at the top when a new exercise opens
    if (scrollRef.current) scrollRef.current.scrollTop = 0;

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
          // Proxy through our server to bypass hotlink protection on the GIF host
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
        >
          ✕
        </button>

        {/* Video — always visible at the top, never scrolls away */}
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
                  style={{
                    width: '100%', height: '100%',
                    display: 'block', objectFit: 'contain', background: '#0a0a0a',
                  }}
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

        {/* Scrollable details below the video */}
        <div className="modal-scroll" ref={scrollRef}>
          <div className="modal-title">{exercise.name}</div>
          <div className="modal-muscle">
            {exercise.muscle ? `${t('Primary:', 'العضلة الرئيسية:')} ${exercise.muscle}` : ''}
          </div>

          <div className="modal-sets-info">
            <div className="set-badge">Sets: <span>{setsArr[0]?.trim() || '3'}</span></div>
            <div className="set-badge">Reps: <span>{setsArr[1]?.trim() || '10'}</span></div>
          </div>

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
