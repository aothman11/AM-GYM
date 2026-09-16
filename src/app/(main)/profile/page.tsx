'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/contexts/AppContext';

interface Measurement {
  date: string;
  weight?: number;
  waist?: number;
  chest?: number;
  arms?: number;
}

const MEAS_KEY = 'amgym_measurements';

type ProfileField = 'name' | 'weight' | 'height' | 'age' | 'goal' | 'calories';

// Achievement definitions
const ACHIEVEMENTS = [
  { id: 'first_workout', icon: '🎯', title: { en: 'First Step', ar: 'الخطوة الأولى' }, desc: { en: 'Complete your first workout', ar: 'أكمل أول تمرين' } },
  { id: 'week_streak', icon: '🔥', title: { en: '7-Day Streak', ar: 'سلسلة 7 أيام' }, desc: { en: 'Work out 7 days in a row', ar: 'تمرن 7 أيام متتالية' } },
  { id: 'month_streak', icon: '⚡', title: { en: '30-Day Streak', ar: 'سلسلة 30 يوم' }, desc: { en: 'Work out 30 days in a row', ar: 'تمرن 30 يوم متتالي' } },
  { id: 'ten_workouts', icon: '💪', title: { en: 'Getting Strong', ar: 'تزداد قوة' }, desc: { en: 'Complete 10 workouts', ar: 'أكمل 10 تمارين' } },
  { id: 'fifty_workouts', icon: '🏆', title: { en: 'Dedicated', ar: 'متفاني' }, desc: { en: 'Complete 50 workouts', ar: 'أكمل 50 تمرين' } },
  { id: 'hundred_workouts', icon: '👑', title: { en: 'Legend', ar: 'أسطورة' }, desc: { en: 'Complete 100 workouts', ar: 'أكمل 100 تمرين' } },
];

export default function ProfilePage() {
  const { t, profile, updateProfile, gender, wizard, calorieTarget, setCalorieTarget, showToast, achievements, streak, totalWorkouts } = useApp();
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingField, setEditingField] = useState<ProfileField | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [measOpen, setMeasOpen] = useState(false);
  const [measForm, setMeasForm] = useState({ weight: '', waist: '', chest: '', arms: '' });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(MEAS_KEY);
      if (raw) setMeasurements(JSON.parse(raw));
    } catch { setMeasurements([]); }
  }, []);

  const saveMeasurement = () => {
    const entry: Measurement = {
      date: new Date().toDateString(),
      weight: measForm.weight ? parseFloat(measForm.weight) : undefined,
      waist: measForm.waist ? parseFloat(measForm.waist) : undefined,
      chest: measForm.chest ? parseFloat(measForm.chest) : undefined,
      arms: measForm.arms ? parseFloat(measForm.arms) : undefined,
    };
    const updated = [entry, ...measurements].slice(0, 30);
    setMeasurements(updated);
    try { localStorage.setItem(MEAS_KEY, JSON.stringify(updated)); } catch { /* ignore */ }
    setMeasOpen(false);
    setMeasForm({ weight: '', waist: '', chest: '', arms: '' });
    showToast(t('Measurements saved ✓', 'تم حفظ القياسات ✓'));
  };

  const latest = measurements[0];

  const openModal = (field: ProfileField) => {
    setEditingField(field);
    if (field === 'calories') {
      setInputValue(String(calorieTarget));
    } else if (field === 'goal') {
      setInputValue(profile.goal || '');
    } else {
      setInputValue(profile[field] !== undefined ? String(profile[field]) : '');
    }
    setModalOpen(true);
  };

  const saveField = () => {
    if (!editingField) return;
    
    if (editingField === 'calories') {
      setCalorieTarget(parseInt(inputValue) || 2000);
    } else if (editingField === 'goal') {
      updateProfile('goal', inputValue);
    } else {
      updateProfile(editingField, editingField === 'name' ? inputValue : parseInt(inputValue) || 0);
    }
    
    setModalOpen(false);
    showToast(t('Saved ✓', 'تم الحفظ ✓'));
  };

  const resetAll = () => {
    if (confirm(t('Reset all data?', 'إعادة تعيين كل البيانات؟'))) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const fieldLabels: Record<ProfileField, { en: string; ar: string }> = {
    name: { en: 'Your Name', ar: 'اسمك' },
    weight: { en: 'Weight (kg)', ar: 'الوزن (كجم)' },
    height: { en: 'Height (cm)', ar: 'الطول (سم)' },
    age: { en: 'Age', ar: 'العمر' },
    goal: { en: 'Primary Goal', ar: 'الهدف الأساسي' },
    calories: { en: 'Daily Calorie Target', ar: 'هدف السعرات اليومية' },
  };

  const profileLevel = wizard.level ? wizard.level.charAt(0).toUpperCase() + wizard.level.slice(1) : 'Beginner';

  return (
    <div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: 'var(--green)', letterSpacing: '1px', marginBottom: '4px', textShadow: '0 0 16px rgba(124,92,255,0.45)' }}>
        {t('PROFILE', 'الملف الشخصي')}
      </div>
      <div style={{ fontSize: '13px', color: 'var(--gray2)', marginBottom: '20px' }}>
        {t('Your settings & stats', 'إعداداتك وإحصائياتك')}
      </div>

      <div className="profile-grid">

        {/* ── LEFT COLUMN — avatar + settings + stats + reset ── */}
        <div>

          {/* Avatar */}
          <div style={{
            width: '80px', height: '80px', borderRadius: '50%',
            background: 'var(--green-dim)', border: '2px solid var(--green)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '32px', margin: '0 auto 16px',
            boxShadow: '0 0 22px rgba(124,92,255,0.30)'
          }}>
            {gender === 'male' ? '♂️' : '♀️'}
          </div>

          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <div style={{ fontSize: '18px', fontWeight: 700 }}>{profile.name || 'AM-Gym User'}</div>
            <div style={{ fontSize: '13px', color: 'var(--gray2)' }}>
              {profileLevel} · {gender === 'male' ? t('Male', 'ذكر') : t('Female', 'أنثى')}
            </div>
          </div>

          {/* Settings Section */}
          <div style={{
            background: 'var(--bg2)', border: '1px solid var(--bg4)',
            borderRadius: 'var(--r-xl)', overflow: 'hidden', marginBottom: '14px'
          }}>
            {[
              { field: 'name' as const, icon: '👤', value: profile.name || t('Set name', 'اضف اسمك') },
              { field: 'weight' as const, icon: '⚖️', value: profile.weight ? `${profile.weight} kg` : '— kg' },
              { field: 'height' as const, icon: '📏', value: profile.height ? `${profile.height} cm` : '— cm' },
              { field: 'age' as const, icon: '🎂', value: profile.age ? `${profile.age} yrs` : '— yrs' },
              { field: 'goal' as const, icon: '🎯', value: profile.goal || t('Not set', 'غير محدد') },
              { field: 'calories' as const, icon: '🔥', value: `${calorieTarget} kcal` },
            ].map((item, i, arr) => (
              <div
                key={item.field}
                onClick={() => openModal(item.field)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '14px 16px',
                  borderBottom: i < arr.length - 1 ? '1px solid var(--bg4)' : 'none',
                  cursor: 'pointer'
                }}
              >
                <div style={{
                  width: '34px', height: '34px', borderRadius: 'var(--r-sm)',
                  background: 'var(--bg3)', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '16px', flexShrink: 0
                }}>
                  {item.icon}
                </div>
                <div style={{ flex: 1, fontSize: '14px' }}>
                  {t(fieldLabels[item.field].en, fieldLabels[item.field].ar)}
                </div>
                <div style={{ fontSize: '13px', color: 'var(--green)', fontWeight: 600 }}>
                  {item.value}
                </div>
                <div style={{ color: 'var(--gray3)', fontSize: '12px' }}>›</div>
              </div>
            ))}
          </div>

          {/* Stats Summary */}
          <div style={{
            background: 'var(--bg2)', border: '1px solid var(--bg4)',
            borderRadius: 'var(--r-xl)', padding: '16px', marginBottom: '14px'
          }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--gray1)', marginBottom: '12px' }}>
              📊 {t('Your Stats', 'إحصائياتك')}
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '28px', fontWeight: 700, color: 'var(--violet)' }}>{streak}</div>
                <div style={{ fontSize: '11px', color: 'var(--gray2)' }}>{t('Day Streak', 'أيام متتالية')}</div>
              </div>
              <div style={{ width: '1px', background: 'var(--bg4)' }} />
              <div style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '28px', fontWeight: 700, color: 'var(--violet)' }}>{totalWorkouts}</div>
                <div style={{ fontSize: '11px', color: 'var(--gray2)' }}>{t('Total Workouts', 'مجموع التمارين')}</div>
              </div>
            </div>
          </div>

          {/* Reset Section */}
          <div style={{ background: 'var(--bg2)', border: '1px solid var(--bg4)', borderRadius: 'var(--r-xl)', overflow: 'hidden' }}>
            <div
              onClick={resetAll}
              style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', cursor: 'pointer' }}
            >
              <div style={{
                width: '34px', height: '34px', borderRadius: 'var(--r-sm)',
                background: 'var(--bg3)', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '16px', flexShrink: 0
              }}>
                🔄
              </div>
              <div style={{ flex: 1, fontSize: '14px' }}>{t('Reset All Data', 'إعادة تعيين الكل')}</div>
              <div style={{ fontSize: '13px', color: 'var(--red)', fontWeight: 600 }}>Reset</div>
              <div style={{ color: 'var(--gray3)', fontSize: '12px' }}>›</div>
            </div>
          </div>

        </div>{/* end left col */}

        {/* ── RIGHT COLUMN — Achievements ── */}
        <div>
          <div style={{
            fontSize: '14px', fontWeight: 700, color: 'var(--gray1)',
            marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px'
          }}>
            🏆 {t('Achievements', 'الإنجازات')}
            <span style={{
              fontSize: '11px', color: 'var(--green)', background: 'var(--green-dim)',
              padding: '2px 8px', borderRadius: '10px'
            }}>
              {achievements.length}/{ACHIEVEMENTS.length}
            </span>
          </div>
          <div className="achievements-grid">
            {ACHIEVEMENTS.map(ach => {
              const unlocked = achievements.includes(ach.id);
              return (
                <div key={ach.id} className={`achievement-card ${unlocked ? 'unlocked' : ''}`}>
                  <div className="achievement-icon" style={{ opacity: unlocked ? 1 : 0.3 }}>
                    {ach.icon}
                  </div>
                  <div className="achievement-title">{t(ach.title.en, ach.title.ar)}</div>
                  <div className="achievement-desc">{t(ach.desc.en, ach.desc.ar)}</div>
                  {unlocked && (
                    <div style={{ marginTop: '8px', fontSize: '10px', color: 'var(--green)', fontWeight: 700 }}>
                      ✓ {t('UNLOCKED', 'مفتوح')}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>{/* end profile-grid */}

      {/* ── Body Measurements ── */}
      <div style={{ marginTop: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--gray1)', display: 'flex', alignItems: 'center', gap: 8 }}>
            📐 {t('Body Measurements', 'قياسات الجسم')}
          </div>
          <button
            onClick={() => setMeasOpen(true)}
            style={{
              background: 'var(--violet)', border: 'none', borderRadius: 8,
              padding: '5px 12px', color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer',
            }}
          >+ {t('Log', 'سجّل')}</button>
        </div>

        {/* Latest measurements */}
        {latest ? (
          <div style={{
            background: 'var(--bg2)', border: '1px solid var(--bg4)',
            borderRadius: 'var(--r-xl)', padding: '14px 16px', marginBottom: 10,
          }}>
            <div style={{ fontSize: 11, color: 'var(--gray3)', marginBottom: 10 }}>{t('Latest', 'الأحدث')}: {latest.date}</div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {[
                { label: t('Weight', 'الوزن'), val: latest.weight, unit: 'kg' },
                { label: t('Waist', 'الخصر'), val: latest.waist, unit: 'cm' },
                { label: t('Chest', 'الصدر'), val: latest.chest, unit: 'cm' },
                { label: t('Arms', 'الذراعين'), val: latest.arms, unit: 'cm' },
              ].filter(m => m.val !== undefined).map((m, i) => (
                <div key={i} style={{
                  flex: '1 1 80px', background: 'var(--bg3)', border: '1px solid var(--bg4)',
                  borderRadius: 10, padding: '10px 8px', textAlign: 'center',
                }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--violet)', fontFamily: 'var(--font-mono)' }}>{m.val}</div>
                  <div style={{ fontSize: 10, color: 'var(--gray3)', marginTop: 2 }}>{m.unit}</div>
                  <div style={{ fontSize: 10, color: 'var(--gray2)' }}>{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{
            background: 'var(--bg2)', border: '1px solid var(--bg4)',
            borderRadius: 'var(--r-xl)', padding: '20px', textAlign: 'center',
            color: 'var(--gray3)', fontSize: 13, marginBottom: 10,
          }}>
            {t('No measurements yet. Tap + Log to start.', 'لا توجد قياسات بعد. اضغط + سجّل للبدء.')}
          </div>
        )}

        {/* History of past entries */}
        {measurements.length > 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {measurements.slice(1, 5).map((m, i) => (
              <div key={i} style={{
                background: 'var(--bg2)', border: '1px solid var(--bg4)',
                borderRadius: 10, padding: '10px 14px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <span style={{ fontSize: 12, color: 'var(--gray3)' }}>{m.date}</span>
                <div style={{ display: 'flex', gap: 10 }}>
                  {m.weight && <span style={{ fontSize: 12, color: 'var(--gray2)' }}>{m.weight}kg</span>}
                  {m.waist && <span style={{ fontSize: 12, color: 'var(--gray2)' }}>W:{m.waist}</span>}
                  {m.chest && <span style={{ fontSize: 12, color: 'var(--gray2)' }}>C:{m.chest}</span>}
                  {m.arms && <span style={{ fontSize: 12, color: 'var(--gray2)' }}>A:{m.arms}</span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Workout History link ── */}
      <div
        onClick={() => router.push('/history')}
        style={{
          marginTop: 16, background: 'var(--bg2)',
          border: '1px solid var(--bg4)', borderRadius: 'var(--r-xl)',
          padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12,
          cursor: 'pointer',
        }}
      >
        <div style={{
          width: 34, height: 34, borderRadius: 'var(--r-sm)',
          background: 'var(--bg3)', display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: 16, flexShrink: 0,
        }}>📋</div>
        <div style={{ flex: 1, fontSize: 14 }}>{t('Workout History', 'سجل التمارين')}</div>
        <div style={{ fontSize: 13, color: 'var(--violet)', fontWeight: 600 }}>
          {t('View all', 'عرض الكل')}
        </div>
        <div style={{ color: 'var(--gray3)', fontSize: 12 }}>›</div>
      </div>

      {/* Measurements log modal */}
      {measOpen && (
        <div
          onClick={() => setMeasOpen(false)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)',
            zIndex: 200, display: 'flex', alignItems: 'flex-end',
            backdropFilter: 'blur(4px)',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: 'var(--bg2)', borderRadius: 'var(--r-xl) var(--r-xl) 0 0',
              width: '100%', borderTop: '1px solid var(--bg4)', padding: '20px 16px',
            }}
          >
            <div style={{ width: 40, height: 4, background: 'var(--bg4)', borderRadius: 2, margin: '0 auto 16px' }} />
            <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--green)', marginBottom: 16 }}>
              📐 {t('Log Measurements', 'سجّل القياسات')}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
              {[
                { key: 'weight', label: t('Weight (kg)', 'الوزن (كجم)') },
                { key: 'waist', label: t('Waist (cm)', 'الخصر (سم)') },
                { key: 'chest', label: t('Chest (cm)', 'الصدر (سم)') },
                { key: 'arms', label: t('Arms (cm)', 'الذراعين (سم)') },
              ].map(f => (
                <div key={f.key}>
                  <div style={{ fontSize: 11, color: 'var(--gray3)', marginBottom: 4 }}>{f.label}</div>
                  <input
                    type="number"
                    value={measForm[f.key as keyof typeof measForm]}
                    onChange={e => setMeasForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                    placeholder="0"
                    style={{
                      width: '100%', background: 'var(--bg3)', border: '1px solid var(--bg4)',
                      borderRadius: 8, padding: '10px 12px', color: 'var(--white)',
                      fontSize: 16,
                    }}
                  />
                </div>
              ))}
            </div>
            <button
              onClick={saveMeasurement}
              style={{
                width: '100%', background: 'var(--green)', border: 'none',
                borderRadius: 'var(--r-lg)', padding: 14,
                color: 'var(--bg)', fontWeight: 700, fontSize: 14, cursor: 'pointer',
              }}
            >{t('Save', 'حفظ')}</button>
          </div>
        </div>
      )}

      {/* Modal */}
      {modalOpen && editingField && (
        <div
          onClick={() => setModalOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.85)',
            zIndex: 200,
            display: 'flex',
            alignItems: 'flex-end',
            backdropFilter: 'blur(4px)'
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            className="animate-fadeUp"
            style={{
              background: 'var(--bg2)',
              borderRadius: 'var(--r-xl) var(--r-xl) 0 0',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              borderTop: '1px solid var(--bg4)'
            }}
          >
            <div style={{ width: '40px', height: '4px', background: 'var(--bg4)', borderRadius: '2px', margin: '12px auto 0' }} />
            <div style={{ padding: '20px' }}>
              <div style={{ fontFamily: 'var(--font)', fontSize: '24px', color: 'var(--green)', marginBottom: '4px', fontWeight: 700 }}>
                {t(fieldLabels[editingField].en, fieldLabels[editingField].ar)}
              </div>
              
              <div style={{ marginTop: '16px' }}>
                {editingField === 'goal' ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {[
                      { id: 'muscle', icon: '💪', label: { en: 'Build Muscle', ar: 'بناء عضلات' } },
                      { id: 'fatloss', icon: '🔥', label: { en: 'Lose Fat', ar: 'خسارة دهون' } },
                      { id: 'fitness', icon: '🏃', label: { en: 'General Fitness', ar: 'لياقة عامة' } },
                    ].map(g => (
                      <div
                        key={g.id}
                        onClick={() => setInputValue(g.id)}
                        style={{
                          background: 'var(--bg3)',
                          border: inputValue === g.id ? '1.5px solid var(--green)' : '1.5px solid var(--bg4)',
                          borderRadius: 'var(--r-lg)',
                          padding: '12px 14px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{
                          width: '36px',
                          height: '36px',
                          background: inputValue === g.id ? 'var(--green-dim)' : 'var(--bg4)',
                          borderRadius: 'var(--r-md)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '16px'
                        }}>
                          {g.icon}
                        </div>
                        <div style={{ flex: 1, fontSize: '14px', fontWeight: inputValue === g.id ? 600 : 400 }}>
                          {t(g.label.en, g.label.ar)}
                        </div>
                        {inputValue === g.id && (
                          <div style={{
                            width: '22px',
                            height: '22px',
                            borderRadius: '50%',
                            background: 'var(--green)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '11px',
                            color: 'var(--bg)'
                          }}>
                            ✓
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <input
                    type={editingField === 'name' ? 'text' : 'number'}
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    placeholder={t(fieldLabels[editingField].en, fieldLabels[editingField].ar)}
                    style={{
                      width: '100%',
                      background: 'var(--bg3)',
                      border: '1.5px solid var(--bg4)',
                      borderRadius: 'var(--r-lg)',
                      padding: '14px 16px',
                      color: 'var(--white)',
                      fontSize: '16px'
                    }}
                  />
                )}
              </div>
              
              <button
                onClick={saveField}
                style={{
                  width: '100%',
                  background: 'var(--green)',
                  color: 'var(--bg)',
                  borderRadius: 'var(--r-lg)',
                  padding: '14px',
                  fontWeight: 700,
                  fontSize: '14px',
                  marginTop: '16px',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                {t('Save', 'حفظ')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
