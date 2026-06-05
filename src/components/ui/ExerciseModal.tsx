'use client';

import { useState, useEffect, useRef } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Exercise } from '@/data/exercises';

interface ExerciseModalProps {
  exercise: Exercise | null;
  sets?: string;
  onClose: () => void;
}

const GIF_CACHE: Record<string, string> = {};

// Speed options: 0.25x, 0.5x, 1x
const SPEED_OPTIONS = [
  { label: '0.25x', value: 0.25 },
  { label: '0.5x', value: 0.5 },
  { label: '1x', value: 1 },
];

export default function ExerciseModal({ exercise, sets, onClose }: ExerciseModalProps) {
  const { t, lang } = useApp();
  const [gifUrl, setGifUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gifFrames, setGifFrames] = useState<ImageData[]>([]);
  const [frameIndex, setFrameIndex] = useState(0);
  const animationRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number>(0);

  useEffect(() => {
    if (!exercise) return;
    
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
        if (d && d.gifUrl) {
          GIF_CACHE[key] = d.gifUrl;
          setGifUrl(d.gifUrl);
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

  return (
    <div className="modal-overlay open" onClick={onClose}>
      <div className="modal-sheet" onClick={e => e.stopPropagation()}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'var(--bg3)',
            border: '1px solid var(--bg4)',
            color: 'var(--gray1)',
            fontSize: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            transition: 'all 0.2s'
          }}
          aria-label="Close"
        >
          ✕
        </button>
        
        <div className="modal-handle" />
        <div className="modal-inner">
          <div className="modal-title">{exercise.name}</div>
          <div className="modal-muscle">
            {exercise.muscle ? `${t('Primary:', 'العضلة الرئيسية:')} ${exercise.muscle}` : ''}
          </div>
          
          <div className="modal-video">
            <div 
              style={{
                borderRadius: '14px',
                overflow: 'hidden',
                background: '#0a0a0a',
                minHeight: '200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '10px',
                position: 'relative'
              }}
            >
              {loading ? (
                <>
                  <div 
                    style={{
                      width: '36px',
                      height: '36px',
                      border: '3px solid #22ff44',
                      borderTopColor: 'transparent',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }}
                  />
                  <div style={{ fontSize: '11px', color: '#444' }}>
                    {t('Loading...', 'جاري التحميل...')}
                  </div>
                </>
              ) : gifUrl ? (
                <>
                  <img 
                    src={gifUrl} 
                    alt={exercise.name}
                    style={{
                      width: '100%',
                      display: 'block',
                      borderRadius: '14px',
                      objectFit: 'contain',
                      background: '#0a0a0a',
                      animationDuration: speed === 1 ? 'initial' : `${1 / speed}s`,
                    }}
                    onError={() => setGifUrl(null)}
                  />
                  
                  {/* Speed Control */}
                  <div style={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    gap: '6px',
                    background: 'rgba(0,0,0,0.8)',
                    padding: '6px 10px',
                    borderRadius: '20px',
                    backdropFilter: 'blur(10px)'
                  }}>
                    <span style={{ 
                      fontSize: '10px', 
                      color: 'var(--gray2)', 
                      display: 'flex', 
                      alignItems: 'center',
                      marginRight: '4px'
                    }}>
                      {t('Speed:', 'السرعة:')}
                    </span>
                    {SPEED_OPTIONS.map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => {
                          setSpeed(opt.value);
                          // Force reload the GIF to apply new speed
                          const currentUrl = gifUrl;
                          setGifUrl(null);
                          setTimeout(() => setGifUrl(currentUrl + (currentUrl.includes('?') ? '&' : '?') + 't=' + Date.now()), 50);
                        }}
                        style={{
                          padding: '4px 10px',
                          fontSize: '11px',
                          fontWeight: 600,
                          borderRadius: '12px',
                          border: 'none',
                          background: speed === opt.value ? 'var(--green)' : 'var(--bg3)',
                          color: speed === opt.value ? 'var(--bg)' : 'var(--gray1)',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                  
                  {/* Slow motion indicator */}
                  {speed < 1 && (
                    <div style={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      background: 'rgba(34,255,68,0.9)',
                      color: '#000',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontSize: '10px',
                      fontWeight: 700,
                      textTransform: 'uppercase'
                    }}>
                      🔍 {t('Slow Motion', 'حركة بطيئة')} {speed}x
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div 
                    style={{
                      width: '72px',
                      height: '72px',
                      borderRadius: '50%',
                      background: 'rgba(34,255,68,.12)',
                      border: '2px solid #22ff44',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '32px',
                      color: '#22ff44'
                    }}
                  >
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

          <div className="modal-sets-info">
            <div className="set-badge">
              Sets: <span>{setsArr[0]?.trim() || '3'}</span>
            </div>
            <div className="set-badge">
              Reps: <span>{setsArr[1]?.trim() || '10'}</span>
            </div>
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
    </div>
  );
}
