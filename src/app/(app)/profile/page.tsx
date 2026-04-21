'use client';

import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';

type ProfileField = 'name' | 'weight' | 'height' | 'age' | 'goal' | 'calories';

export default function ProfilePage() {
  const { t, profile, updateProfile, gender, wizard, calorieTarget, setCalorieTarget, showToast } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingField, setEditingField] = useState<ProfileField | null>(null);
  const [inputValue, setInputValue] = useState('');

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
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: 'var(--green)', letterSpacing: '1px', marginBottom: '4px', textShadow: '0 0 10px rgba(34,255,68,0.3)' }}>
        {t('PROFILE', 'الملف الشخصي')}
      </div>
      <div style={{ fontSize: '13px', color: 'var(--gray2)', marginBottom: '20px' }}>
        {t('Your settings & stats', 'إعداداتك وإحصائياتك')}
      </div>

      {/* Avatar */}
      <div style={{
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        background: 'var(--green-dim)',
        border: '2px solid var(--green)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '32px',
        margin: '0 auto 16px',
        boxShadow: '0 0 20px rgba(34,255,68,0.2)'
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
        background: 'var(--bg2)',
        border: '1px solid var(--bg4)',
        borderRadius: 'var(--r-xl)',
        overflow: 'hidden',
        marginBottom: '14px'
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
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '14px 16px',
              borderBottom: i < arr.length - 1 ? '1px solid var(--bg4)' : 'none',
              cursor: 'pointer'
            }}
          >
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: 'var(--r-sm)',
              background: 'var(--bg3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              flexShrink: 0
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

      {/* Reset Section */}
      <div style={{
        background: 'var(--bg2)',
        border: '1px solid var(--bg4)',
        borderRadius: 'var(--r-xl)',
        overflow: 'hidden'
      }}>
        <div
          onClick={resetAll}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '14px 16px',
            cursor: 'pointer'
          }}
        >
          <div style={{
            width: '34px',
            height: '34px',
            borderRadius: 'var(--r-sm)',
            background: 'var(--bg3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            flexShrink: 0
          }}>
            🔄
          </div>
          <div style={{ flex: 1, fontSize: '14px' }}>
            {t('Reset All Data', 'إعادة تعيين الكل')}
          </div>
          <div style={{ fontSize: '13px', color: 'var(--red)', fontWeight: 600 }}>
            Reset
          </div>
          <div style={{ color: 'var(--gray3)', fontSize: '12px' }}>›</div>
        </div>
      </div>

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
