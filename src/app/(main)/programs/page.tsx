'use client';

import { useState, useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';
import ExerciseModal from '@/components/ui/ExerciseModal';
import { EXERCISES, Exercise } from '@/data/exercises';

// ── 5-Day Hypertrophy Split ────────────────────────────────────────────────

const PROGRAM = {
  name: '5-Day Hypertrophy',
  tagline: 'Chest · Back · Shoulders · Arms · Legs',
  days: [
    {
      label: 'Day 1',
      focus: 'Chest + Triceps',
      emoji: '🏋️',
      color: '#7C5CFF',
      exercises: [
        { name: 'Barbell Bench Press',       sets: '4×8'  },
        { name: 'Incline Dumbbell Press',    sets: '3×10' },
        { name: 'Cable Fly',                 sets: '3×12' },
        { name: 'Skull Crushers',            sets: '3×12' },
        { name: 'Tricep Pushdown',           sets: '4×15' },
      ],
    },
    {
      label: 'Day 2',
      focus: 'Back + Biceps',
      emoji: '🔝',
      color: '#4D8BFF',
      exercises: [
        { name: 'Pull-Ups',           sets: '4×8'  },
        { name: 'Barbell Row',        sets: '4×8'  },
        { name: 'Lat Pulldown',       sets: '3×12' },
        { name: 'Seated Cable Row',   sets: '3×12' },
        { name: 'Barbell Curl',       sets: '3×12' },
        { name: 'Hammer Curl',        sets: '3×15' },
      ],
    },
    {
      label: 'Day 3',
      focus: 'Shoulders',
      emoji: '⬆️',
      color: '#3dd6f5',
      exercises: [
        { name: 'Overhead Press',       sets: '4×8'  },
        { name: 'Arnold Press',         sets: '3×12' },
        { name: 'Lateral Raise',        sets: '4×15' },
        { name: 'Front Raise',          sets: '3×15' },
        { name: 'Reverse Pec Deck',     sets: '3×15' },
        { name: 'Shrug',                sets: '3×15' },
      ],
    },
    {
      label: 'Day 4',
      focus: 'Arms',
      emoji: '💪',
      color: '#A78BFA',
      exercises: [
        { name: 'Barbell Curl',                  sets: '4×12' },
        { name: 'Incline Dumbbell Curl',         sets: '3×12' },
        { name: 'Preacher Curl',                 sets: '3×12' },
        { name: 'Skull Crushers',                sets: '4×12' },
        { name: 'Rope Pushdown',                 sets: '4×15' },
        { name: 'Overhead Tricep Extension',     sets: '3×15' },
      ],
    },
    {
      label: 'Day 5',
      focus: 'Legs',
      emoji: '🦵',
      color: '#F472B6',
      exercises: [
        { name: 'Barbell Back Squat',       sets: '4×8'  },
        { name: 'Romanian Deadlift',        sets: '4×10' },
        { name: 'Leg Press',                sets: '3×12' },
        { name: 'Bulgarian Split Squat',    sets: '3×12' },
        { name: 'Leg Curl',                 sets: '4×15' },
        { name: 'Standing Calf Raise',      sets: '4×20' },
      ],
    },
  ],
};

// Day index: Mon=0 Day1, Tue=1 Day2, Wed=2 Day3, Thu=3 Day4, Fri=4 Day5, Sat/Sun = rest
function getTodayDayIndex(): number {
  const dow = new Date().getDay(); // 0=Sun,1=Mon..6=Sat
  const map: Record<number, number> = { 1: 0, 2: 1, 3: 2, 4: 3, 5: 4 };
  return map[dow] ?? -1; // -1 = rest day
}

export default function ProgramsPage() {
  const { t, logWorkout, lastWorkoutDate, completedExercises, toggleExercise } = useApp();
  const todayIndex = getTodayDayIndex();
  const [expandedDay, setExpandedDay] = useState<number | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<{ ex: Exercise; sets: string } | null>(null);

  // Auto-expand today's day on mount
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

  const workoutDoneToday = lastWorkoutDate === new Date().toDateString();

  return (
    <div>
      {/* ── Page header ── */}
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--violet)', letterSpacing: 1, marginBottom: 4, textShadow: '0 0 16px rgba(124,92,255,0.45)' }}>
        {t('PROGRAMS', 'البرامج')}
      </div>
      <div style={{ fontSize: 13, color: 'var(--gray2)', marginBottom: 20 }}>
        {t('Your 5-day hypertrophy split', 'برنامجك الخماسي لبناء العضلات')}
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
            <div style={{ fontSize: 11, color: 'var(--gray3)', marginTop: 1 }}>{PROGRAM.tagline}</div>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
          {[
            { label: t('Days', 'أيام'), val: '5' },
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

        {/* Complete workout button */}
        <button
          onClick={logWorkout}
          style={{
            width: '100%',
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
                {/* Colored dot */}
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
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 7, paddingTop: 12 }}>
                    {day.exercises.map((ex, exIdx) => {
                      const key = `${dayIdx}-${exIdx}-${ex.name}`;
                      const done = !!completedExercises[key];

                      return (
                        <div
                          key={exIdx}
                          style={{
                            display: 'flex', alignItems: 'center', gap: 10,
                            padding: '10px 12px',
                            background: done ? 'rgba(124,92,255,0.10)' : 'var(--bg3)',
                            borderRadius: 'var(--r-md)',
                            border: done ? `1px solid ${day.color}44` : '1px solid transparent',
                            opacity: done ? 0.8 : 1,
                            transition: 'all 0.2s',
                          }}
                        >
                          {/* Checkbox */}
                          <button
                            onClick={e => { e.stopPropagation(); toggleExercise(key); }}
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
                            onClick={() => openModal(ex.name, ex.sets)}
                            style={{ flex: 1, cursor: 'pointer' }}
                          >
                            <div style={{
                              fontSize: 13, fontWeight: 600,
                              textDecoration: done ? 'line-through' : 'none',
                              opacity: done ? 0.6 : 1,
                            }}>{ex.name}</div>
                            <div style={{ fontSize: 11, color: 'var(--gray2)', marginTop: 1 }}>{ex.sets}</div>
                          </div>

                          {/* Info arrow */}
                          <span
                            onClick={() => openModal(ex.name, ex.sets)}
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

        {/* Weekend rest card */}
        {todayIndex === -1 && (
          <div style={{
            background: 'var(--bg2)', border: '1px solid var(--bg4)',
            borderRadius: 'var(--r-lg)', padding: '20px 16px',
            display: 'flex', alignItems: 'center', gap: 14, marginTop: 4,
          }}>
            <span style={{ fontSize: 32 }}>😴</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>{t('Rest Day', 'يوم راحة')}</div>
              <div style={{ fontSize: 12, color: 'var(--gray2)', marginTop: 2 }}>
                {t('Recover well — training resumes Monday.', 'استرح جيداً — التدريب يستأنف الإثنين.')}
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
    </div>
  );
}
