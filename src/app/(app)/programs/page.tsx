'use client';

import { useState, useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';
import { EXERCISE_PROGRAMS } from '@/data/programs';
import ExerciseModal from '@/components/ui/ExerciseModal';
import { EXERCISES, Exercise } from '@/data/exercises';

const PROGRAMS = {
  ppl: {
    name: 'Push / Pull / Legs',
    emoji: '🔄',
    days: [
      { name: 'Day 1', focus: 'Push', rest: false },
      { name: 'Day 2', focus: 'Pull', rest: false },
      { name: 'Day 3', focus: 'Legs', rest: false },
      { name: 'Day 4', focus: 'Rest', rest: true },
      { name: 'Day 5', focus: 'Push', rest: false },
      { name: 'Day 6', focus: 'Pull', rest: false },
      { name: 'Day 7', focus: 'Legs', rest: false },
    ]
  },
  hybrid: {
    name: '5-Day Hybrid',
    emoji: '⚡',
    days: [
      { name: 'Day 1', focus: 'Upper Body', rest: false },
      { name: 'Day 2', focus: 'Lower Body', rest: false },
      { name: 'Day 3', focus: 'Push', rest: false },
      { name: 'Day 4', focus: 'Pull', rest: false },
      { name: 'Day 5', focus: 'Legs', rest: false },
      { name: 'Day 6', focus: 'Rest', rest: true },
      { name: 'Day 7', focus: 'Rest', rest: true },
    ]
  },
  arms: {
    name: '5-Day Arms Focus',
    emoji: '💪',
    days: [
      { name: 'Day 1', focus: 'Chest + Biceps', rest: false },
      { name: 'Day 2', focus: 'Back + Triceps', rest: false },
      { name: 'Day 3', focus: 'Shoulders', rest: false },
      { name: 'Day 4', focus: 'Arms Specialization', rest: false },
      { name: 'Day 5', focus: 'Legs', rest: false },
      { name: 'Day 6', focus: 'Rest', rest: true },
      { name: 'Day 7', focus: 'Rest', rest: true },
    ]
  },
  bodyweight: {
    name: 'Bodyweight Only',
    emoji: '🤸',
    days: [
      { name: 'Day 1', focus: 'Upper Body', rest: false },
      { name: 'Day 2', focus: 'Lower Body', rest: false },
      { name: 'Day 3', focus: 'Rest', rest: true },
      { name: 'Day 4', focus: 'Upper Body', rest: false },
      { name: 'Day 5', focus: 'Lower Body', rest: false },
      { name: 'Day 6', focus: 'Rest', rest: true },
      { name: 'Day 7', focus: 'Rest', rest: true },
    ]
  },
  dumbbell: {
    name: 'Dumbbell Only',
    emoji: '🏠',
    days: [
      { name: 'Day 1', focus: 'Upper Body', rest: false },
      { name: 'Day 2', focus: 'Lower Body', rest: false },
      { name: 'Day 3', focus: 'Rest', rest: true },
      { name: 'Day 4', focus: 'Upper Body', rest: false },
      { name: 'Day 5', focus: 'Lower Body', rest: false },
      { name: 'Day 6', focus: 'Rest', rest: true },
      { name: 'Day 7', focus: 'Rest', rest: true },
    ]
  }
};

type SplitType = keyof typeof PROGRAMS;

const SPLIT_OPTIONS = [
  { id: 'ppl', icon: '🔄', name: 'Push / Pull / Legs', desc: { en: '6 days · Classic split · Gym', ar: '6 أيام · تقسيم كلاسيكي · صالة' } },
  { id: 'hybrid', icon: '⚡', name: '5-Day Hybrid', desc: { en: 'Upper · Lower · Push · Pull · Legs', ar: 'علوي · سفلي · دفع · سحب · أرجل' } },
  { id: 'arms', icon: '💪', name: '5-Day Arms Focus', desc: { en: 'Chest/Bi · Back/Tri · Shoulders · Arms · Legs', ar: 'صدر/ثنائية · ظهر/ثلاثية · أكتاف · أذرع · أرجل' } },
  { id: 'bodyweight', icon: '🤸', name: 'Bodyweight Only', desc: { en: 'No equipment · Home friendly', ar: 'بدون معدات · مناسب للمنزل' } },
  { id: 'dumbbell', icon: '🏠', name: 'Dumbbell Only', desc: { en: 'Home gym · Minimal equipment', ar: 'صالة منزلية · معدات بسيطة' } },
];

const LEVEL_OPTIONS = [
  { id: 'beginner', icon: '🌱', name: { en: 'Beginner', ar: 'مبتدئ' }, desc: { en: 'Less than 1 year of training', ar: 'أقل من سنة تدريب' } },
  { id: 'intermediate', icon: '🔥', name: { en: 'Intermediate', ar: 'متوسط' }, desc: { en: '1–3 years of consistent training', ar: '1-3 سنوات تدريب منتظم' } },
  { id: 'advanced', icon: '⚡', name: { en: 'Advanced', ar: 'محترف' }, desc: { en: '3+ years · High intensity programs', ar: '3+ سنوات · برامج شدة عالية' } },
];

const GOAL_OPTIONS = [
  { id: 'muscle', icon: '💪', name: { en: 'Build Muscle', ar: 'بناء عضلات' }, desc: { en: 'Hypertrophy · 8-12 reps · Heavy', ar: 'ضخامة عضلية · 8-12 تكرار · ثقيل' } },
  { id: 'fatloss', icon: '🔥', name: { en: 'Lose Fat', ar: 'خسارة دهون' }, desc: { en: 'Circuit · 12-15 reps · Superset', ar: 'دوائر · 12-15 تكرار · سوبر سيت' } },
  { id: 'fitness', icon: '🏃', name: { en: 'General Fitness', ar: 'لياقة عامة' }, desc: { en: 'Balanced · Variety · Endurance', ar: 'متوازن · تنوع · تحمل' } },
];

const EQUIP_OPTIONS = [
  { id: 'gym', icon: '🏋️', name: { en: 'Full Gym', ar: 'نادي متكامل' }, desc: { en: 'All machines, barbells, cables', ar: 'كل الأجهزة، أوزان، كابلات' } },
  { id: 'dumbbells', icon: '🏠', name: { en: 'Dumbbells Only', ar: 'دمبل فقط' }, desc: { en: 'Home gym · Pair of dumbbells', ar: 'صالة منزلية · دمبل فقط' } },
  { id: 'bodyweight', icon: '🤸', name: { en: 'Bodyweight', ar: 'وزن الجسم' }, desc: { en: 'No equipment needed', ar: 'لا تحتاج معدات' } },
];

export default function ProgramsPage() {
  const { t, wizard, setWizard, resetWizard, hasPlan, gender } = useApp();
  const [wizStep, setWizStep] = useState(0);
  const [expandedDay, setExpandedDay] = useState<number | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<{ ex: Exercise; sets: string } | null>(null);

  // Auto-expand today's workout
  useEffect(() => {
    if (hasPlan && wizard.split) {
      const prog = PROGRAMS[wizard.split as SplitType];
      const today = new Date().getDay();
      const dayOfWeek = today === 0 ? 6 : today - 1;
      if (dayOfWeek < prog.days.length && !prog.days[dayOfWeek].rest) {
        setExpandedDay(dayOfWeek);
      }
    }
  }, [hasPlan, wizard.split]);

  const wizSelect = (step: number, key: string, value: string) => {
    const keys = ['split', 'level', 'goal', 'equip'];
    setWizard({ ...wizard, [keys[step]]: value });
  };

  const wizNext = () => setWizStep(prev => prev + 1);
  const wizBack = () => setWizStep(prev => prev - 1);

  const getExercisesForDay = (focus: string) => {
    const lvl = (wizard.level || 'beginner') as 'beginner' | 'intermediate' | 'advanced';
    const g = gender as 'male' | 'female';
    
    if (EXERCISE_PROGRAMS[focus]?.[g]?.[lvl]) {
      return EXERCISE_PROGRAMS[focus][g][lvl];
    }
    // Fallback
    const fallbackKey = Object.keys(EXERCISE_PROGRAMS)[0];
    return EXERCISE_PROGRAMS[fallbackKey]?.[g]?.[lvl] || [];
  };

  const openExerciseModal = (name: string, sets: string) => {
    const ex = EXERCISES.find(e => e.name.toLowerCase() === name.toLowerCase());
    if (ex) {
      setSelectedExercise({ ex, sets });
    } else {
      // Create a placeholder exercise
      setSelectedExercise({
        ex: {
          id: 999,
          name,
          muscle: '',
          type: 'Compound',
          equip: 'Other',
          emoji: '💪',
          gifKey: name,
          cues: ['Maintain proper form throughout', 'Control the weight', 'Breathe steadily', 'Start with lighter weight']
        },
        sets
      });
    }
  };

  const renderWizard = () => {
    const steps = [
      { q: { en: 'Choose Your Split', ar: 'اختر نظام التقسيم' }, sub: { en: 'What training structure fits your week?', ar: 'ما هيكل التدريب الذي يناسب أسبوعك؟' }, key: 'split', options: SPLIT_OPTIONS },
      { q: { en: 'Experience Level?', ar: 'ما مستوى خبرتك؟' }, sub: { en: 'Your level determines your exercises', ar: 'مستواك يحدد التمارين المناسبة لك' }, key: 'level', options: LEVEL_OPTIONS },
      { q: { en: 'Primary Goal?', ar: 'ما هدفك الأساسي؟' }, sub: { en: 'We tailor your rep ranges and focus', ar: 'سنعدّل نطاق التكرارات والتركيز بناءً على هدفك' }, key: 'goal', options: GOAL_OPTIONS },
      { q: { en: 'Available Equipment?', ar: 'ما المعدات المتاحة لديك؟' }, sub: { en: 'Only exercises matching your equipment will show', ar: 'ستظهر فقط التمارين المناسبة لمعداتك' }, key: 'equip', options: EQUIP_OPTIONS },
    ];

    const currentStep = steps[wizStep];
    const currentValue = wizard[currentStep.key as keyof typeof wizard];

    return (
      <div style={{ minHeight: '60vh' }}>
        {/* Progress dots */}
        <div style={{ display: 'flex', gap: '4px', marginBottom: '24px', padding: '0 4px' }}>
          {steps.map((_, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: '3px',
                background: i <= wizStep ? 'var(--green)' : 'var(--bg4)',
                borderRadius: '2px',
                transition: 'all 0.3s'
              }}
            />
          ))}
        </div>

        <div className="animate-fadeUp">
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '26px', color: 'var(--white)', marginBottom: '6px', letterSpacing: '0.5px' }}>
            {t(currentStep.q.en, currentStep.q.ar)}
          </div>
          <div style={{ fontSize: '13px', color: 'var(--gray2)', marginBottom: '20px' }}>
            {t(currentStep.sub.en, currentStep.sub.ar)}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
            {currentStep.options.map(opt => {
              const optId = opt.id;
              const isSelected = currentValue === optId;
              const optName = typeof opt.name === 'string' ? opt.name : t(opt.name.en, opt.name.ar);
              const optDesc = t(opt.desc.en, opt.desc.ar);

              return (
                <div
                  key={optId}
                  onClick={() => wizSelect(wizStep, currentStep.key, optId)}
                  style={{
                    background: 'var(--bg2)',
                    border: isSelected ? '1.5px solid var(--green)' : '1.5px solid var(--bg4)',
                    borderRadius: 'var(--r-lg)',
                    padding: '16px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: isSelected ? '0 0 0 1px var(--green)' : 'none'
                  }}
                >
                  {isSelected && (
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'var(--green-dim)',
                      opacity: 1
                    }} />
                  )}
                  <div style={{
                    width: '44px',
                    height: '44px',
                    background: isSelected ? 'var(--green-dim)' : 'var(--bg3)',
                    borderRadius: 'var(--r-md)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    flexShrink: 0,
                    position: 'relative',
                    zIndex: 1
                  }}>
                    {opt.icon}
                  </div>
                  <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '2px' }}>{optName}</div>
                    <div style={{ fontSize: '12px', color: 'var(--gray2)' }}>{optDesc}</div>
                  </div>
                  <div style={{
                    width: '22px',
                    height: '22px',
                    border: isSelected ? 'none' : '2px solid var(--bg4)',
                    borderRadius: '50%',
                    background: isSelected ? 'var(--green)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '11px',
                    color: isSelected ? 'var(--bg)' : 'transparent',
                    flexShrink: 0,
                    position: 'relative',
                    zIndex: 1
                  }}>
                    ✓
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            {wizStep > 0 && (
              <button
                onClick={wizBack}
                style={{
                  flex: 1,
                  background: 'var(--bg3)',
                  color: 'var(--gray2)',
                  border: '1px solid var(--bg4)',
                  borderRadius: 'var(--r-lg)',
                  padding: '14px',
                  fontWeight: 600,
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                {t('← Back', '← السابق')}
              </button>
            )}
            <button
              onClick={wizStep === 3 ? () => {} : wizNext}
              disabled={!currentValue}
              style={{
                flex: wizStep > 0 ? 2 : 1,
                background: currentValue ? 'var(--green)' : 'var(--bg4)',
                color: currentValue ? 'var(--bg)' : 'var(--gray3)',
                borderRadius: 'var(--r-lg)',
                padding: '14px',
                fontWeight: 700,
                fontSize: '14px',
                cursor: currentValue ? 'pointer' : 'not-allowed',
                border: 'none'
              }}
            >
              {wizStep === 3 ? t('Generate My Plan ⚡', 'إنشاء خطتي ⚡') : t('Next →', 'التالي →')}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderPlan = () => {
    if (!wizard.split) return null;
    const prog = PROGRAMS[wizard.split as SplitType];
    const today = new Date().getDay();
    const dayOfWeek = today === 0 ? 6 : today - 1;

    return (
      <div>
        {/* Plan Header */}
        <div style={{
          background: 'linear-gradient(135deg, var(--bg2), #0f1f12)',
          border: '1px solid rgba(34,255,68,0.2)',
          borderRadius: 'var(--r-xl)',
          padding: '20px',
          marginBottom: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: 'var(--green)' }}>
              {prog.emoji} {prog.name}
            </div>
            <button
              onClick={resetWizard}
              style={{
                background: 'var(--bg3)',
                border: '1px solid var(--bg4)',
                color: 'var(--gray2)',
                fontSize: '12px',
                padding: '6px 14px',
                borderRadius: '20px',
                cursor: 'pointer'
              }}
            >
              {t('✏ Edit', '✏ تعديل')}
            </button>
          </div>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {wizard.level && (
              <span style={{
                fontSize: '11px',
                padding: '3px 10px',
                borderRadius: '10px',
                background: 'var(--green-dim)',
                color: 'var(--green)',
                border: '1px solid rgba(34,255,68,0.2)',
                fontWeight: 600
              }}>
                {wizard.level.charAt(0).toUpperCase() + wizard.level.slice(1)}
              </span>
            )}
            {wizard.goal && (
              <span style={{
                fontSize: '11px',
                padding: '3px 10px',
                borderRadius: '10px',
                background: 'var(--green-dim)',
                color: 'var(--green)',
                border: '1px solid rgba(34,255,68,0.2)',
                fontWeight: 600
              }}>
                {wizard.goal}
              </span>
            )}
            {wizard.equip && (
              <span style={{
                fontSize: '11px',
                padding: '3px 10px',
                borderRadius: '10px',
                background: 'var(--green-dim)',
                color: 'var(--green)',
                border: '1px solid rgba(34,255,68,0.2)',
                fontWeight: 600
              }}>
                {wizard.equip}
              </span>
            )}
          </div>
        </div>

        {/* Day Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {prog.days.map((day, i) => {
            const isToday = i === dayOfWeek;
            const isExpanded = expandedDay === i;

            if (day.rest) {
              return (
                <div
                  key={i}
                  style={{
                    background: 'var(--bg2)',
                    border: isToday ? '1px solid rgba(34,255,68,0.4)' : '1px solid var(--bg4)',
                    borderRadius: 'var(--r-lg)',
                    overflow: 'hidden'
                  }}
                >
                  <div style={{
                    padding: '14px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <div style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: isToday ? 'var(--green)' : 'var(--bg4)',
                      boxShadow: isToday ? '0 0 8px rgba(34,255,68,0.5)' : 'none',
                      flexShrink: 0
                    }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: '14px' }}>
                        {day.name}
                        {isToday && <span style={{ color: 'var(--green)', fontSize: '10px', marginLeft: '8px' }}>● TODAY</span>}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--gray2)', marginTop: '1px' }}>{day.focus}</div>
                    </div>
                    <span>😴</span>
                  </div>
                </div>
              );
            }

            const exercises = getExercisesForDay(day.focus);

            return (
              <div
                key={i}
                style={{
                  background: 'var(--bg2)',
                  border: isToday ? '1px solid rgba(34,255,68,0.4)' : '1px solid var(--bg4)',
                  borderRadius: 'var(--r-lg)',
                  overflow: 'hidden'
                }}
              >
                <div
                  onClick={() => setExpandedDay(isExpanded ? null : i)}
                  style={{
                    padding: '14px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: isToday ? 'var(--green)' : 'var(--bg4)',
                    boxShadow: isToday ? '0 0 8px rgba(34,255,68,0.5)' : 'none',
                    flexShrink: 0
                  }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: '14px' }}>
                      {day.name}
                      {isToday && <span style={{ color: 'var(--green)', fontSize: '10px', marginLeft: '8px' }}>● TODAY</span>}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--gray2)', marginTop: '1px' }}>{day.focus}</div>
                  </div>
                  <span style={{
                    color: 'var(--gray3)',
                    fontSize: '12px',
                    transition: 'transform 0.25s',
                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'
                  }}>
                    ▼
                  </span>
                </div>

                {isExpanded && (
                  <div style={{ padding: '0 16px 16px', borderTop: '1px solid var(--bg4)' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '14px' }}>
                      {exercises.map((ex, j) => (
                        <div
                          key={j}
                          onClick={() => openExerciseModal(ex.n, ex.s)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '10px 12px',
                            background: 'var(--bg3)',
                            borderRadius: 'var(--r-md)',
                            cursor: 'pointer',
                            border: '1px solid transparent'
                          }}
                        >
                          <div style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            background: 'var(--green-dim)',
                            border: '1px solid rgba(34,255,68,0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '11px',
                            fontWeight: 700,
                            color: 'var(--green)',
                            flexShrink: 0
                          }}>
                            {j + 1}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '13px', fontWeight: 600, fontFamily: 'var(--font)' }}>{ex.n}</div>
                            <div style={{ fontSize: '11px', color: 'var(--gray2)', marginTop: '1px' }}>{ex.s}</div>
                          </div>
                          <span style={{ fontSize: '16px', color: 'var(--gray3)' }}>▶</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: 'var(--green)', letterSpacing: '1px', marginBottom: '4px', textShadow: '0 0 10px rgba(34,255,68,0.3)' }}>
        {t('PROGRAMS', 'البرامج')}
      </div>
      <div style={{ fontSize: '13px', color: 'var(--gray2)', marginBottom: '20px' }}>
        {t('Choose your training plan', 'اختر خطتك التدريبية')}
      </div>

      {hasPlan ? renderPlan() : renderWizard()}

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
