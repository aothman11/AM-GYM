'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useApp } from '@/contexts/AppContext';
import ExerciseModal from '@/components/ui/ExerciseModal';
import { EXERCISES, Exercise } from '@/data/exercises';

// ── 6-Day Hypertrophy Split ────────────────────────────────────────────────

const PROGRAM = {
  name: '6-Day Hypertrophy',
  tagline: 'Sun · Mon · Tue · Wed · Thu · Sat',
  days: [
    {
      label: 'Day 1',
      focus: 'Chest + Triceps',
      emoji: '🏋️',
      color: '#7C5CFF',
      exercises: [
        { name: 'Barbell Bench Press',        sets: '4×8'  },
        { name: 'Incline Barbell Press',      sets: '3×8'  },
        { name: 'Incline Dumbbell Press',     sets: '3×10' },
        { name: 'Dumbbell Bench Press',       sets: '3×10' },
        { name: 'Cable Fly',                  sets: '3×12' },
        { name: 'Dumbbell Fly',               sets: '3×12' },
        { name: 'Pec Deck Fly',               sets: '3×12' },
        { name: 'Decline Bench Press',        sets: '3×10' },
        { name: 'Push-Ups',                   sets: '3×15' },
        { name: 'Skull Crushers',             sets: '4×12' },
        { name: 'Close-Grip Bench Press',     sets: '3×10' },
        { name: 'Tricep Pushdown',            sets: '4×15' },
        { name: 'Rope Pushdown',              sets: '3×15' },
        { name: 'Overhead Tricep Extension',  sets: '3×15' },
        { name: 'Tricep Dips',                sets: '3×12' },
      ],
    },
    {
      label: 'Day 2',
      focus: 'Back + Biceps',
      emoji: '🔝',
      color: '#4D8BFF',
      exercises: [
        { name: 'Pull-Ups',                 sets: '4×8'  },
        { name: 'Chin-Ups',                 sets: '3×8'  },
        { name: 'Barbell Row',              sets: '4×8'  },
        { name: 'T-Bar Row',                sets: '3×10' },
        { name: 'Dumbbell Row',             sets: '3×10' },
        { name: 'Chest-Supported Row',      sets: '3×12' },
        { name: 'Lat Pulldown',             sets: '3×12' },
        { name: 'Seated Cable Row',         sets: '3×12' },
        { name: 'Straight-Arm Pulldown',    sets: '3×15' },
        { name: 'Face Pull',                sets: '3×15' },
        { name: 'Barbell Curl',             sets: '4×12' },
        { name: 'EZ-Bar Curl',              sets: '3×12' },
        { name: 'Dumbbell Curl',            sets: '3×12' },
        { name: 'Hammer Curl',              sets: '3×15' },
        { name: 'Cable Curl',               sets: '3×15' },
      ],
    },
    {
      label: 'Day 3',
      focus: 'Shoulders',
      emoji: '⬆️',
      color: '#3dd6f5',
      exercises: [
        { name: 'Overhead Press',           sets: '4×8'  },
        { name: 'Dumbbell Shoulder Press',  sets: '3×10' },
        { name: 'Arnold Press',             sets: '3×12' },
        { name: 'Lateral Raise',            sets: '4×15' },
        { name: 'Cable Lateral Raise',      sets: '3×15' },
        { name: 'Front Raise',              sets: '3×15' },
        { name: 'Upright Row',              sets: '3×12' },
        { name: 'Reverse Pec Deck',         sets: '4×15' },
        { name: 'Face Pull',                sets: '3×15' },
        { name: 'Shrug',                    sets: '4×15' },
      ],
    },
    {
      label: 'Day 4',
      focus: 'Arms',
      emoji: '💪',
      color: '#A78BFA',
      exercises: [
        { name: 'Barbell Curl',              sets: '4×12' },
        { name: 'EZ-Bar Curl',              sets: '3×12' },
        { name: 'Dumbbell Curl',            sets: '3×12' },
        { name: 'Incline Dumbbell Curl',    sets: '3×12' },
        { name: 'Preacher Curl',            sets: '3×12' },
        { name: 'Concentration Curl',       sets: '3×15' },
        { name: 'Hammer Curl',              sets: '3×15' },
        { name: 'Cable Curl',               sets: '3×15' },
        { name: 'Skull Crushers',           sets: '4×12' },
        { name: 'Close-Grip Bench Press',   sets: '3×10' },
        { name: 'Rope Pushdown',            sets: '4×15' },
        { name: 'Tricep Pushdown',          sets: '3×15' },
        { name: 'Overhead Tricep Extension',sets: '3×15' },
        { name: 'Tricep Dips',              sets: '3×12' },
      ],
    },
    {
      label: 'Day 5',
      focus: 'Legs',
      emoji: '🦵',
      color: '#F472B6',
      exercises: [
        { name: 'Barbell Back Squat',     sets: '4×8'  },
        { name: 'Front Squat',            sets: '3×8'  },
        { name: 'Hack Squat',             sets: '3×10' },
        { name: 'Leg Press',              sets: '3×12' },
        { name: 'Bulgarian Split Squat',  sets: '3×12' },
        { name: 'Walking Lunge',          sets: '3×12' },
        { name: 'Romanian Deadlift',      sets: '4×10' },
        { name: 'Leg Curl',               sets: '4×15' },
        { name: 'Leg Extension',          sets: '3×15' },
        { name: 'Standing Calf Raise',    sets: '4×20' },
        { name: 'Seated Calf Raise',      sets: '3×20' },
        { name: 'Barbell Hip Thrust',     sets: '3×12' },
        { name: 'Sumo Squat',             sets: '3×12' },
        { name: 'Cable Kickback',         sets: '3×15' },
      ],
    },
    {
      label: 'Day 6',
      focus: 'Abs & Core',
      emoji: '🔥',
      color: '#F59E0B',
      exercises: [
        { name: 'Plank',                   sets: '4×45s' },
        { name: 'Cable Crunch',            sets: '4×15'  },
        { name: 'Hanging Leg Raise',       sets: '4×15'  },
        { name: 'Decline Crunch',          sets: '3×20'  },
        { name: 'Bicycle Crunch',          sets: '3×20'  },
        { name: 'Ab Wheel Rollout',        sets: '3×12'  },
        { name: 'Russian Twist',           sets: '3×20'  },
        { name: 'Leg Raise',               sets: '4×15'  },
        { name: 'Mountain Climbers',       sets: '3×30'  },
        { name: 'V-Up',                    sets: '3×15'  },
        { name: 'Toe Touch Crunch',        sets: '3×20'  },
        { name: 'Side Plank',              sets: '3×30s' },
        { name: 'Dragon Flag',             sets: '3×8'   },
        { name: 'Pallof Press',            sets: '3×12'  },
      ],
    },
  ],
};

// ── Schedule ───────────────────────────────────────────────────────────────
// Sun=Day1, Mon=Day2, Tue=Day3, Wed=Day4, Thu=Day5(Legs), Fri=REST, Sat=Day6(Abs)
function getTodayDayIndex(): number {
  const dow = new Date().getDay(); // 0=Sun,1=Mon..6=Sat
  const map: Record<number, number> = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 6: 5 };
  return map[dow] ?? -1; // -1 = rest (Friday)
}

// ── Exercise swap helpers ──────────────────────────────────────────────────
function getMuscleAlts(dayFocus: string, currentName: string): Exercise[] {
  const focus = dayFocus.toLowerCase();
  let keyword = '';
  if (focus.includes('chest') || focus.includes('tricep')) keyword = focus.includes('chest') ? 'Chest' : 'Triceps';
  else if (focus.includes('back') || focus.includes('bicep')) keyword = focus.includes('back') ? 'Back' : 'Biceps';
  else if (focus.includes('shoulder')) keyword = 'Shoulder';
  else if (focus.includes('arm')) keyword = '';
  else if (focus.includes('leg')) keyword = 'Quad';
  else if (focus.includes('abs') || focus.includes('core')) keyword = 'Abs';

  // Filter exercises by muscle keyword, excluding the current exercise
  const matches = EXERCISES.filter(e =>
    e.name !== currentName &&
    (keyword ? (e.muscle?.includes(keyword) || e.muscle?.includes(focus.split('+')[0].trim())) : true)
  );

  // If no matches with keyword, return any exercises from DB
  return (matches.length > 0 ? matches : EXERCISES.filter(e => e.name !== currentName)).slice(0, 5);
}

export default function ProgramsPage() {
  const { t, logWorkout, lastWorkoutDate, completedExercises, toggleExercise, startRestTimer, showToast } = useApp();
  const todayIndex = getTodayDayIndex();
  const [expandedDay, setExpandedDay] = useState<number | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<{ ex: Exercise; sets: string } | null>(null);
  const [swappedExercises, setSwappedExercises] = useState<Record<string, string>>({});
  const [swapModal, setSwapModal] = useState<{ key: string; dayFocus: string; currentName: string } | null>(null);

  useEffect(() => {
    if (todayIndex >= 0) setExpandedDay(todayIndex);
  }, [todayIndex]);

  const openModal = (name: string, sets: string) => {
    const ex = EXERCISES.find(e => e.name.toLowerCase() === name.toLowerCase());
    setSelectedExercise({
      ex: ex ?? {
        id: 0, name, muscle: '', type: 'Compound', equip: 'Barbell',
        emoji: '💪', gifKey: name,
        cues: ['Maintain proper form', 'Control the weight', 'Breathe steadily'],
      },
      sets,
    });
  };

  const handleCheck = (key: string) => {
    const wasChecked = !!completedExercises[key];
    toggleExercise(key);
    if (!wasChecked) {
      // Starting rest after completing a set
      startRestTimer(90);
    }
  };

  const handleSwap = (key: string, dayFocus: string, currentName: string) => {
    setSwapModal({ key, dayFocus, currentName });
  };

  const applySwap = (key: string, newName: string) => {
    setSwappedExercises(prev => ({ ...prev, [key]: newName }));
    setSwapModal(null);
    showToast(t('Exercise swapped ⇄', 'تم تبديل التمرين ⇄'));
  };

  const handleShare = async (day: typeof PROGRAM.days[0]) => {
    const text = `${day.emoji} ${day.label}: ${day.focus}\n${day.exercises.map(e => `• ${e.name} ${e.sets}`).join('\n')}\n\nvia AM-GYM 💪`;
    try {
      if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share({ title: `AM-GYM: ${day.label}`, text });
      } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        showToast(t('Workout copied to clipboard!', 'تم نسخ التمرين!'));
      }
    } catch { /* user cancelled */ }
  };

  const workoutDoneToday = lastWorkoutDate === new Date().toDateString();

  return (
    <div>
      {/* ── Page header ── */}
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--violet)', letterSpacing: 1, marginBottom: 4, textShadow: '0 0 16px rgba(124,92,255,0.45)' }}>
        {t('PROGRAMS', 'البرامج')}
      </div>
      <div style={{ fontSize: 13, color: 'var(--gray2)', marginBottom: 20 }}>
        {t('Your 6-day hypertrophy split', 'برنامجك السداسي لبناء العضلات')}
      </div>

      {/* ── Program banner ── */}
      <div style={{
        background: 'linear-gradient(135deg, var(--bg2), #141729)',
        border: '1px solid rgba(124,92,255,0.22)',
        borderRadius: 'var(--r-xl)',
        padding: '18px 20px',
        marginBottom: 16,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: 'linear-gradient(135deg,#7C5CFF,#4D8BFF)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22, flexShrink: 0,
          }}>⚡</div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--white)', fontWeight: 700 }}>
              {PROGRAM.name}
            </div>
            <div style={{ fontSize: 11, color: 'var(--gray3)', marginTop: 1 }}>Sun · Mon · Tue · Wed · Thu · Sat &nbsp;|&nbsp; Fri REST</div>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
          {[
            { label: t('Days', 'أيام'), val: '6' },
            { label: t('Goal', 'الهدف'), val: t('Hypertrophy', 'ضخامة') },
            { label: t('Level', 'المستوى'), val: t('All levels', 'كل المستويات') },
          ].map(s => (
            <div key={s.label} style={{
              flex: 1, background: 'var(--bg3)', border: '1px solid var(--bg4)',
              borderRadius: 10, padding: '8px 6px', textAlign: 'center',
            }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--violet)' }}>{s.val}</div>
              <div style={{ fontSize: 10, color: 'var(--gray3)', marginTop: 1 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Complete workout + Share buttons */}
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={logWorkout}
            style={{
              flex: 1,
              padding: '13px 20px',
              background: workoutDoneToday
                ? 'var(--bg3)'
                : 'linear-gradient(135deg,#7C5CFF,#4D8BFF)',
              border: 'none',
              borderRadius: 'var(--r-lg)',
              color: workoutDoneToday ? 'var(--gray2)' : '#fff',
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              boxShadow: workoutDoneToday ? 'none' : '0 4px 20px rgba(124,92,255,0.30)',
            }}
          >
            {workoutDoneToday
              ? <>{t('✓ Workout Logged Today', '✓ تم تسجيل التمرين اليوم')}</>
              : <>{t('🔥 Complete Today\'s Workout', '🔥 إنهاء تمرين اليوم')}</>}
          </button>
          {todayIndex >= 0 && (
            <button
              onClick={() => handleShare(PROGRAM.days[todayIndex])}
              style={{
                width: 46, height: 46,
                background: 'var(--bg3)', border: '1px solid var(--bg4)',
                borderRadius: 'var(--r-lg)',
                color: 'var(--gray1)', fontSize: 20,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', flexShrink: 0,
              }}
              title={t('Share today\'s workout', 'مشاركة التمرين')}
            >⬆</button>
          )}
        </div>
      </div>

      {/* ── Day cards ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {PROGRAM.days.map((day, dayIdx) => {
          const isToday = dayIdx === todayIndex;
          const isExpanded = expandedDay === dayIdx;

          return (
            <div
              key={dayIdx}
              style={{
                background: 'var(--bg2)',
                border: isToday
                  ? `1px solid ${day.color}55`
                  : '1px solid var(--bg4)',
                borderRadius: 'var(--r-lg)',
                overflow: 'hidden',
                boxShadow: isToday ? `0 0 20px ${day.color}18` : 'none',
              }}
            >
              {/* Day header */}
              <div
                onClick={() => setExpandedDay(isExpanded ? null : dayIdx)}
                style={{
                  padding: '14px 16px',
                  display: 'flex', alignItems: 'center', gap: 12,
                  cursor: 'pointer',
                }}
              >
                <div style={{
                  width: 10, height: 10, borderRadius: '50%',
                  background: isToday ? day.color : 'var(--bg4)',
                  boxShadow: isToday ? `0 0 8px ${day.color}` : 'none',
                  flexShrink: 0,
                }} />

                <div style={{ fontSize: 20, flexShrink: 0 }}>{day.emoji}</div>

                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                    {day.label}
                    {isToday && (
                      <span style={{
                        fontSize: 9, fontWeight: 700, letterSpacing: '0.05em',
                        background: day.color, color: '#fff',
                        padding: '2px 7px', borderRadius: 20,
                      }}>TODAY</span>
                    )}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--gray2)', marginTop: 1 }}>{day.focus}</div>
                </div>

                <div style={{ fontSize: 11, color: 'var(--gray3)' }}>
                  {day.exercises.length} {t('exercises', 'تمارين')}
                </div>

                <span style={{
                  color: 'var(--gray3)', fontSize: 11,
                  transition: 'transform 0.25s',
                  transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                }}>▼</span>
              </div>

              {/* Expanded exercise list */}
              {isExpanded && (
                <div style={{ padding: '0 14px 14px', borderTop: '1px solid var(--bg4)' }}>
                  {/* Share day button */}
                  <button
                    onClick={() => handleShare(day)}
                    style={{
                      marginTop: 10, marginBottom: 2, width: '100%',
                      background: 'var(--bg3)', border: '1px solid var(--bg4)',
                      borderRadius: 8, padding: '7px',
                      color: 'var(--gray2)', fontSize: 12, cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                    }}
                  >
                    <span>⬆</span> {t('Share this workout', 'مشاركة هذا التمرين')}
                  </button>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 7, paddingTop: 10 }}>
                    {day.exercises.map((ex, exIdx) => {
                      const key = `${dayIdx}-${exIdx}-${ex.name}`;
                      const done = !!completedExercises[key];
                      const displayName = swappedExercises[key] || ex.name;
                      const isSwapped = !!swappedExercises[key];

                      return (
                        <div
                          key={exIdx}
                          style={{
                            display: 'flex', alignItems: 'center', gap: 10,
                            padding: '10px 12px',
                            background: done ? 'rgba(124,92,255,0.10)' : 'var(--bg3)',
                            borderRadius: 'var(--r-md)',
                            border: done ? `1px solid ${day.color}44` : isSwapped ? '1px solid rgba(61,214,245,0.25)' : '1px solid transparent',
                            opacity: done ? 0.8 : 1,
                            transition: 'all 0.2s',
                          }}
                        >
                          {/* Checkbox */}
                          <button
                            onClick={e => { e.stopPropagation(); handleCheck(key); }}
                            style={{
                              width: 26, height: 26, borderRadius: '50%',
                              background: done ? day.color : 'var(--bg2)',
                              border: done ? 'none' : '2px solid var(--bg4)',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              fontSize: 13, color: done ? '#fff' : 'transparent',
                              flexShrink: 0, cursor: 'pointer',
                              transition: 'all 0.2s',
                            }}
                          >✓</button>

                          {/* Name + sets */}
                          <div
                            onClick={() => openModal(displayName, ex.sets)}
                            style={{ flex: 1, cursor: 'pointer' }}
                          >
                            <div style={{
                              fontSize: 13, fontWeight: 600,
                              textDecoration: done ? 'line-through' : 'none',
                              opacity: done ? 0.6 : 1,
                              color: isSwapped ? 'var(--accent)' : 'var(--white)',
                            }}>{displayName}</div>
                            <div style={{ fontSize: 11, color: 'var(--gray2)', marginTop: 1 }}>{ex.sets}</div>
                          </div>

                          {/* Swap button */}
                          <button
                            onClick={e => { e.stopPropagation(); handleSwap(key, day.focus, displayName); }}
                            style={{
                              width: 26, height: 26, borderRadius: 6,
                              background: 'var(--bg2)', border: '1px solid var(--bg4)',
                              color: 'var(--gray3)', fontSize: 12,
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              cursor: 'pointer', flexShrink: 0,
                            }}
                            title={t('Swap exercise', 'استبدل التمرين')}
                          >⇄</button>

                          {/* Info arrow */}
                          <span
                            onClick={() => openModal(displayName, ex.sets)}
                            style={{ fontSize: 14, color: 'var(--gray3)', cursor: 'pointer' }}
                          >▶</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Friday rest card */}
        {todayIndex === -1 && (
          <div style={{
            background: 'var(--bg2)', border: '1px solid var(--bg4)',
            borderRadius: 'var(--r-lg)', padding: '20px 16px',
            display: 'flex', alignItems: 'center', gap: 14, marginTop: 4,
          }}>
            <span style={{ fontSize: 32 }}>😴</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>{t('Rest Day — Friday', 'يوم راحة — الجمعة')}</div>
              <div style={{ fontSize: 12, color: 'var(--gray2)', marginTop: 2 }}>
                {t('Recover well — Legs tomorrow, Abs on Saturday.', 'استرح جيداً — الأرجل غداً، والبطن السبت.')}
              </div>
            </div>
          </div>
        )}
      </div>

      {selectedExercise && (
        <ExerciseModal
          exercise={selectedExercise.ex}
          sets={selectedExercise.sets}
          onClose={() => setSelectedExercise(null)}
        />
      )}

      {/* Swap modal */}
      {swapModal && typeof document !== 'undefined' && createPortal(
        <div
          onClick={() => setSwapModal(null)}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.8)', zIndex: 300,
            display: 'flex', alignItems: 'flex-end',
            backdropFilter: 'blur(4px)',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: 'var(--bg2)', borderRadius: 'var(--r-xl) var(--r-xl) 0 0',
              width: '100%', maxHeight: '70vh', overflowY: 'auto',
              borderTop: '1px solid var(--bg4)', padding: '20px 16px',
            }}
          >
            <div style={{ width: 40, height: 4, background: 'var(--bg4)', borderRadius: 2, margin: '0 auto 16px' }} />
            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--white)', marginBottom: 4 }}>
              {t('Swap Exercise', 'استبدال التمرين')}
            </div>
            <div style={{ fontSize: 12, color: 'var(--gray2)', marginBottom: 16 }}>
              {t('Currently', 'حالياً')}: <span style={{ color: 'var(--violet)' }}>{swapModal.currentName}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {getMuscleAlts(swapModal.dayFocus, swapModal.currentName).map((alt, i) => (
                <button
                  key={i}
                  onClick={() => applySwap(swapModal.key, alt.name)}
                  style={{
                    width: '100%', background: 'var(--bg3)',
                    border: '1px solid var(--bg4)', borderRadius: 12,
                    padding: '12px 14px', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 12,
                    textAlign: 'left',
                  }}
                >
                  <span style={{ fontSize: 20, flexShrink: 0 }}>{alt.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--white)' }}>{alt.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--gray3)', marginTop: 2 }}>{alt.muscle}</div>
                  </div>
                  <span style={{ color: 'var(--violet)', fontSize: 18 }}>→</span>
                </button>
              ))}
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
