'use client';

import { useState, useRef, useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';

// ── Types ────────────────────────────────────────────────────

interface Exercise {
  name: string;
  sets: string;
  reps: string;
  kg: string;
}

interface Session {
  dayIndex: number;
  dayLabel: string;
  date: string;
  exercises: Exercise[];
  rating?: number;
  notes?: string;
}

type Tab = 'log' | 'ask';

// ── Constants ────────────────────────────────────────────────

const SPLIT = [
  { label: 'Day 1', muscles: 'Chest + Tris' },
  { label: 'Day 2', muscles: 'Back + Bis' },
  { label: 'Day 3', muscles: 'Shoulders' },
  { label: 'Day 4', muscles: 'Bis + Tris' },
  { label: 'Day 5', muscles: 'Legs' },
];

const STORAGE_KEY = 'amgym_agent_sessions';

function loadSessions(): Session[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
  } catch {
    return [];
  }
}

function saveSessions(sessions: Session[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions.slice(-20)));
  } catch {}
}

// ── Sub-components ───────────────────────────────────────────

function DayPill({
  day,
  index,
  selected,
  done,
  onClick,
}: {
  day: (typeof SPLIT)[0];
  index: number;
  selected: boolean;
  done: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1,
        padding: '7px 2px',
        borderRadius: 10,
        border: selected
          ? '1.5px solid #7C5CFF'
          : done
            ? '1.5px solid #3dd6f5'
            : '1px solid var(--bg4)',
        background: selected
          ? 'rgba(124,92,255,0.15)'
          : done
            ? 'rgba(61,214,245,0.10)'
            : 'var(--bg2)',
        cursor: 'pointer',
        textAlign: 'center',
        transition: 'all 0.15s',
      }}
    >
      <div style={{ fontSize: 9, color: 'var(--gray3)', marginBottom: 2 }}>{day.label}</div>
      <div
        style={{
          fontSize: 10,
          fontWeight: 600,
          color: selected ? '#A78BFA' : done ? '#3dd6f5' : 'var(--gray2)',
          lineHeight: 1.2,
        }}
      >
        {day.muscles}
      </div>
    </button>
  );
}

function ExerciseRow({
  onRemove,
  exRef,
}: {
  onRemove: () => void;
  exRef: React.RefObject<HTMLDivElement>;
}) {
  const inputStyle: React.CSSProperties = {
    background: 'var(--bg3)',
    border: '1px solid var(--bg4)',
    borderRadius: 8,
    padding: '5px 8px',
    fontSize: 12,
    color: 'var(--gray1)',
    outline: 'none',
    width: '100%',
  };

  return (
    <div ref={exRef} style={{ display: 'flex', gap: 5, marginBottom: 6, alignItems: 'center' }}>
      <input
        className="agent-ex-name"
        type="text"
        placeholder="Exercise"
        style={{ ...inputStyle, flex: 2 }}
      />
      <input
        className="agent-ex-sets"
        type="number"
        placeholder="Sets"
        min={1}
        max={20}
        style={{ ...inputStyle, width: 46 }}
      />
      <input
        className="agent-ex-reps"
        type="number"
        placeholder="Reps"
        min={1}
        max={50}
        style={{ ...inputStyle, width: 46 }}
      />
      <input
        className="agent-ex-kg"
        type="number"
        placeholder="kg"
        min={0}
        step={0.5}
        style={{ ...inputStyle, width: 44 }}
      />
      <button
        onClick={onRemove}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--gray3)',
          fontSize: 16,
          cursor: 'pointer',
          padding: '0 2px',
          lineHeight: 1,
          flexShrink: 0,
        }}
        aria-label="Remove exercise"
      >
        ×
      </button>
    </div>
  );
}

// ── Main component ───────────────────────────────────────────

export default function FitnessAgent() {
  const { t } = useApp();

  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>('log');

  // Log tab state
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [exRows, setExRows] = useState<React.RefObject<HTMLDivElement>[]>([]);
  const [logError, setLogError] = useState('');
  const [logLoading, setLogLoading] = useState(false);
  const [logReply, setLogReply] = useState('');

  // Ask tab state
  const [question, setQuestion] = useState('');
  const [askError, setAskError] = useState('');
  const [askLoading, setAskLoading] = useState(false);
  const [askReply, setAskReply] = useState('');

  // Sessions (persisted)
  const [sessions, setSessions] = useState<Session[]>([]);
  const notesRef = useRef<HTMLTextAreaElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSessions(loadSessions());
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  // ── Exercise rows ──────────────────────────────────────────

  function addRow() {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    setExRows((prev) => [...prev, ref]);
  }

  function removeRow(index: number) {
    setExRows((prev) => prev.filter((_, i) => i !== index));
  }

  function getExercises(): Exercise[] {
    return exRows
      .map((ref) => {
        if (!ref.current) return null;
        const inputs = ref.current.querySelectorAll('input');
        return {
          name: (inputs[0] as HTMLInputElement).value.trim(),
          sets: (inputs[1] as HTMLInputElement).value,
          reps: (inputs[2] as HTMLInputElement).value,
          kg: (inputs[3] as HTMLInputElement).value,
        };
      })
      .filter((e): e is Exercise => !!e?.name);
  }

  // ── Today check ────────────────────────────────────────────

  const todayStr = new Date().toLocaleDateString();

  function isDone(dayIndex: number) {
    return sessions.some((s) => s.dayIndex === dayIndex && s.date === todayStr);
  }

  // ── Log + AI ───────────────────────────────────────────────

  async function logAndAnalyze() {
    setLogError('');
    if (selectedDay === null) { setLogError(t('Select a day first.', 'اختر اليوم أولاً.')); return; }
    const exercises = getExercises();
    if (!exercises.length) { setLogError(t('Add at least one exercise.', 'أضف تمريناً واحداً على الأقل.')); return; }

    const session: Session = {
      dayIndex: selectedDay,
      dayLabel: `${SPLIT[selectedDay].label} — ${SPLIT[selectedDay].muscles}`,
      date: todayStr,
      exercises,
      rating: rating ?? undefined,
      notes: notesRef.current?.value.trim() || '',
    };

    const updated = [...sessions, session];
    setSessions(updated);
    saveSessions(updated);

    const exText = exercises.map((e) => `${e.name} ${e.sets}×${e.reps} @${e.kg}kg`).join(', ');
    const feel = ['', 'Brutal', 'OK', 'Great'][rating ?? 0] ?? 'not rated';
    const q = `I just finished ${session.dayLabel}.\nExercises: ${exText}.\nFeel: ${feel}.\nNotes: ${session.notes || 'none'}.\nGive me short specific feedback and what to focus on next session.`;

    setLogLoading(true);
    setLogReply('');

    try {
      const res = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q, history: updated.slice(-6) }),
      });
      const data = await res.json();
      setLogReply(data.reply ?? data.error ?? 'No response.');
    } catch (err) {
      setLogReply(t('Network error. Try again.', 'خطأ في الشبكة. حاول مجدداً.'));
    } finally {
      setLogLoading(false);
    }
  }

  // ── Free question ──────────────────────────────────────────

  async function askAgent() {
    setAskError('');
    if (!question.trim()) { setAskError(t('Enter a question first.', 'اكتب سؤالاً أولاً.')); return; }

    setAskLoading(true);
    setAskReply('');

    try {
      const res = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, history: sessions.slice(-6) }),
      });
      const data = await res.json();
      setAskReply(data.reply ?? data.error ?? 'No response.');
    } catch {
      setAskReply(t('Network error. Try again.', 'خطأ في الشبكة. حاول مجدداً.'));
    } finally {
      setAskLoading(false);
    }
  }

  // ── Styles ─────────────────────────────────────────────────

  const labelStyle: React.CSSProperties = {
    fontSize: 10,
    fontWeight: 600,
    color: 'var(--gray3)',
    textTransform: 'uppercase',
    letterSpacing: '0.07em',
    marginBottom: 6,
  };

  const replyBoxStyle: React.CSSProperties = {
    background: 'var(--bg3)',
    borderRadius: 10,
    padding: '10px 12px',
    fontSize: 12,
    color: 'var(--gray1)',
    lineHeight: 1.7,
    whiteSpace: 'pre-wrap',
    marginTop: 10,
    border: '1px solid var(--bg4)',
  };

  const tabBtnStyle = (active: boolean): React.CSSProperties => ({
    flex: 1,
    padding: '7px 0',
    fontSize: 12,
    fontWeight: active ? 600 : 400,
    border: active ? '1.5px solid #7C5CFF' : '1px solid var(--bg4)',
    borderRadius: 10,
    background: active ? 'rgba(124,92,255,0.15)' : 'var(--bg2)',
    color: active ? '#A78BFA' : 'var(--gray2)',
    cursor: 'pointer',
    transition: 'all 0.12s',
  });

  const primaryBtn: React.CSSProperties = {
    width: '100%',
    padding: '9px 0',
    fontSize: 13,
    fontWeight: 600,
    border: 'none',
    borderRadius: 10,
    background: 'linear-gradient(135deg, #7C5CFF, #4D8BFF)',
    color: '#fff',
    cursor: 'pointer',
    marginTop: 10,
    opacity: logLoading || askLoading ? 0.6 : 1,
  };

  const ratingBtn = (n: number): React.CSSProperties => ({
    flex: 1,
    padding: '6px 0',
    fontSize: 11,
    border: rating === n ? '1.5px solid #7C5CFF' : '1px solid var(--bg4)',
    borderRadius: 8,
    background: rating === n ? 'rgba(124,92,255,0.18)' : 'var(--bg3)',
    color: rating === n ? '#A78BFA' : 'var(--gray2)',
    cursor: 'pointer',
    transition: 'all 0.1s',
  });

  // ── Render ─────────────────────────────────────────────────

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={t('Open fitness agent', 'فتح المساعد الرياضي')}
        style={{
          position: 'fixed',
          bottom: 80, // above the mobile tab bar
          right: 16,
          width: 52,
          height: 52,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #7C5CFF, #4D8BFF)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 24px rgba(124,92,255,0.5)',
          zIndex: 200,
          transition: 'transform 0.15s, box-shadow 0.15s',
          transform: open ? 'scale(0.92)' : 'scale(1)',
        }}
      >
        {/* Dumbbell icon */}
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6.5 6.5h11v11h-11z" />
          <path d="M4 9h2M18 9h2M4 15h2M18 15h2M9 4v2M9 18v2M15 4v2M15 18v2" />
        </svg>
      </button>

      {/* Panel */}
      {open && (
        <div
          ref={panelRef}
          style={{
            position: 'fixed',
            bottom: 144,
            right: 16,
            width: 320,
            maxHeight: '72vh',
            overflowY: 'auto',
            background: 'var(--bg2)',
            borderRadius: 18,
            border: '1px solid var(--bg4)',
            boxShadow: '0 0 40px rgba(77,139,255,0.25)',
            zIndex: 199,
            padding: '14px 14px 16px',
            fontFamily: 'var(--font-body)',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 12,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  background: 'linear-gradient(135deg,#7C5CFF,#4D8BFF)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6.5 6.5h11v11h-11z" />
                  <path d="M4 9h2M18 9h2M4 15h2M18 15h2M9 4v2M9 18v2M15 4v2M15 18v2" />
                </svg>
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--gray1)' }}>
                {t('Training Agent', 'المساعد التدريبي')}
              </span>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{ background: 'none', border: 'none', color: 'var(--gray3)', fontSize: 18, cursor: 'pointer', lineHeight: 1 }}
              aria-label="Close"
            >
              ×
            </button>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
            <button style={tabBtnStyle(tab === 'log')} onClick={() => setTab('log')}>
              {t('Log session', 'تسجيل')}
            </button>
            <button style={tabBtnStyle(tab === 'ask')} onClick={() => setTab('ask')}>
              {t('Ask agent', 'اسأل')}
            </button>
          </div>

          {/* ── LOG TAB ── */}
          {tab === 'log' && (
            <>
              <div style={labelStyle}>{t("Today's session", 'جلسة اليوم')}</div>
              <div style={{ display: 'flex', gap: 4, marginBottom: 12 }}>
                {SPLIT.map((d, i) => (
                  <DayPill
                    key={i}
                    day={d}
                    index={i}
                    selected={selectedDay === i}
                    done={isDone(i)}
                    onClick={() => {
                      setSelectedDay(i);
                      if (exRows.length === 0) addRow();
                    }}
                  />
                ))}
              </div>

              {selectedDay !== null && (
                <>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: '#A78BFA',
                      marginBottom: 8,
                    }}
                  >
                    {SPLIT[selectedDay].label} — {SPLIT[selectedDay].muscles}
                  </div>

                  <div style={labelStyle}>{t('Exercises', 'التمارين')}</div>
                  {exRows.map((ref, i) => (
                    <ExerciseRow key={i} exRef={ref} onRemove={() => removeRow(i)} />
                  ))}
                  <button
                    onClick={addRow}
                    style={{
                      fontSize: 11,
                      color: '#7C5CFF',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '2px 0',
                      marginBottom: 10,
                    }}
                  >
                    + {t('Add exercise', 'أضف تمريناً')}
                  </button>

                  <div style={labelStyle}>{t('How did it feel?', 'كيف كانت الجلسة؟')}</div>
                  <div style={{ display: 'flex', gap: 5, marginBottom: 10 }}>
                    <button style={ratingBtn(1)} onClick={() => setRating(1)}>😓 {t('Brutal', 'صعبة')}</button>
                    <button style={ratingBtn(2)} onClick={() => setRating(2)}>😐 {t('OK', 'عادية')}</button>
                    <button style={ratingBtn(3)} onClick={() => setRating(3)}>💪 {t('Great', 'رائعة')}</button>
                  </div>

                  <div style={labelStyle}>{t('Notes', 'ملاحظات')}</div>
                  <textarea
                    ref={notesRef}
                    placeholder={t('Energy, injuries, what to improve...', 'الطاقة، إصابات، ما تريد تحسينه...')}
                    style={{
                      width: '100%',
                      minHeight: 60,
                      resize: 'vertical',
                      fontSize: 12,
                      fontFamily: 'inherit',
                      background: 'var(--bg3)',
                      border: '1px solid var(--bg4)',
                      borderRadius: 8,
                      padding: '7px 9px',
                      color: 'var(--gray1)',
                      outline: 'none',
                    }}
                  />

                  {logError && (
                    <div style={{ fontSize: 11, color: 'var(--red)', marginTop: 5 }}>{logError}</div>
                  )}

                  <button
                    style={primaryBtn}
                    onClick={logAndAnalyze}
                    disabled={logLoading}
                  >
                    {logLoading ? t('Thinking...', 'جاري التحليل...') : t('Log + get AI advice', 'سجّل واحصل على تحليل')}
                  </button>

                  {logReply && <div style={replyBoxStyle}>{logReply}</div>}
                </>
              )}
            </>
          )}

          {/* ── ASK TAB ── */}
          {tab === 'ask' && (
            <>
              <div style={labelStyle}>{t('Ask your training agent', 'اسأل مساعدك التدريبي')}</div>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder={t(
                  'e.g. My chest is lagging — what should I change?',
                  'مثال: صدري ضعيف — ماذا أغير؟',
                )}
                style={{
                  width: '100%',
                  minHeight: 72,
                  resize: 'vertical',
                  fontSize: 12,
                  fontFamily: 'inherit',
                  background: 'var(--bg3)',
                  border: '1px solid var(--bg4)',
                  borderRadius: 8,
                  padding: '7px 9px',
                  color: 'var(--gray1)',
                  outline: 'none',
                }}
              />

              {askError && (
                <div style={{ fontSize: 11, color: 'var(--red)', marginTop: 5 }}>{askError}</div>
              )}

              <button
                style={primaryBtn}
                onClick={askAgent}
                disabled={askLoading}
              >
                {askLoading ? t('Thinking...', 'جاري التفكير...') : t('Ask agent', 'اسأل المساعد')}
              </button>

              {askReply && <div style={replyBoxStyle}>{askReply}</div>}
            </>
          )}
        </div>
      )}
    </>
  );
}
