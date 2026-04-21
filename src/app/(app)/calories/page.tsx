'use client';

import { useState, useMemo } from 'react';
import { useApp } from '@/contexts/AppContext';
import { FOODS, MEALS, Food, Meal } from '@/data/foods';

export default function CaloriesPage() {
  const { t, foodLog, addFood, removeFood, calorieTarget } = useApp();
  const [activeTab, setActiveTab] = useState<'items' | 'meals'>('items');
  const [foodSearch, setFoodSearch] = useState('');
  const [mealSearch, setMealSearch] = useState('');

  const filteredFoods = useMemo(() => {
    return FOODS.filter(f => !foodSearch || f.name.toLowerCase().includes(foodSearch.toLowerCase()));
  }, [foodSearch]);

  const filteredMeals = useMemo(() => {
    return MEALS.filter(m => !mealSearch || m.name.toLowerCase().includes(mealSearch.toLowerCase()));
  }, [mealSearch]);

  const totals = useMemo(() => {
    return foodLog.reduce((acc, f) => ({
      cal: acc.cal + f.cal,
      p: acc.p + f.p,
      c: acc.c + f.c,
      f: acc.f + f.f
    }), { cal: 0, p: 0, c: 0, f: 0 });
  }, [foodLog]);

  const caloriePct = Math.min(totals.cal / calorieTarget, 1);
  const circumference = 408;
  const strokeDashoffset = circumference - (circumference * caloriePct);

  const handleAddFood = (item: Food | Meal, isMeal: boolean) => {
    addFood({
      id: item.id,
      logId: Date.now(),
      name: item.name,
      emoji: item.emoji,
      cal: item.cal,
      p: item.p,
      c: item.c,
      f: item.f,
      per: item.per,
      isMeal
    });
  };

  return (
    <div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: 'var(--green)', letterSpacing: '1px', marginBottom: '4px', textShadow: '0 0 10px rgba(34,255,68,0.3)' }}>
        {t('CALORIES', 'السعرات')}
      </div>
      <div style={{ fontSize: '13px', color: 'var(--gray2)', marginBottom: '20px' }}>
        {t('Track your daily nutrition', 'تتبع تغذيتك اليومية')}
      </div>

      {/* Calorie Ring */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <svg width="160" height="160" viewBox="0 0 160 160" style={{ filter: 'drop-shadow(0 0 10px rgba(34,255,68,0.2))' }}>
          <circle cx="80" cy="80" r="65" fill="none" stroke="#222" strokeWidth="12"/>
          <circle 
            cx="80" cy="80" r="65" 
            fill="none" 
            stroke="#22ff44" 
            strokeWidth="12"
            strokeDasharray="408" 
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round" 
            transform="rotate(-90 80 80)"
            style={{ transition: 'stroke-dashoffset 0.5s ease' }}
          />
          <text x="80" y="72" textAnchor="middle" fill="#fff" fontSize="28" fontWeight="700" fontFamily="Bebas Neue, sans-serif">
            {totals.cal}
          </text>
          <text x="80" y="90" textAnchor="middle" fill="#aaa" fontSize="11">
            / {calorieTarget} kcal
          </text>
        </svg>
      </div>

      {/* Macros */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '20px' }}>
        <div style={{ background: 'var(--bg2)', border: '1px solid var(--bg4)', borderRadius: 'var(--r-md)', padding: '12px', textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '22px', lineHeight: 1, color: 'var(--green)' }}>
            {Math.round(totals.p)}g
          </div>
          <div style={{ fontSize: '11px', color: 'var(--gray2)', marginTop: '2px' }}>{t('Protein', 'بروتين')}</div>
          <div style={{ height: '3px', borderRadius: '2px', marginTop: '6px', background: 'var(--bg4)' }}>
            <div style={{ height: '100%', borderRadius: '2px', background: '#22ff44', width: `${Math.min(totals.p / 150 * 100, 100)}%`, transition: 'width 0.5s' }} />
          </div>
        </div>
        <div style={{ background: 'var(--bg2)', border: '1px solid var(--bg4)', borderRadius: 'var(--r-md)', padding: '12px', textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '22px', lineHeight: 1, color: '#ffaa22' }}>
            {Math.round(totals.c)}g
          </div>
          <div style={{ fontSize: '11px', color: 'var(--gray2)', marginTop: '2px' }}>{t('Carbs', 'كارب')}</div>
          <div style={{ height: '3px', borderRadius: '2px', marginTop: '6px', background: 'var(--bg4)' }}>
            <div style={{ height: '100%', borderRadius: '2px', background: '#ffaa22', width: `${Math.min(totals.c / 250 * 100, 100)}%`, transition: 'width 0.5s' }} />
          </div>
        </div>
        <div style={{ background: 'var(--bg2)', border: '1px solid var(--bg4)', borderRadius: 'var(--r-md)', padding: '12px', textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '22px', lineHeight: 1, color: '#ff6644' }}>
            {Math.round(totals.f)}g
          </div>
          <div style={{ fontSize: '11px', color: 'var(--gray2)', marginTop: '2px' }}>{t('Fats', 'دهون')}</div>
          <div style={{ height: '3px', borderRadius: '2px', marginTop: '6px', background: 'var(--bg4)' }}>
            <div style={{ height: '100%', borderRadius: '2px', background: '#ff6644', width: `${Math.min(totals.f / 70 * 100, 100)}%`, transition: 'width 0.5s' }} />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        gap: 0,
        background: 'var(--bg2)',
        border: '1px solid var(--bg4)',
        borderRadius: 'var(--r-lg)',
        overflow: 'hidden',
        marginBottom: '14px'
      }}>
        <button
          onClick={() => setActiveTab('items')}
          style={{
            flex: 1,
            padding: '10px',
            textAlign: 'center',
            fontSize: '13px',
            fontWeight: 600,
            color: activeTab === 'items' ? 'var(--bg)' : 'var(--gray2)',
            background: activeTab === 'items' ? 'var(--green)' : 'transparent',
            cursor: 'pointer',
            border: 'none',
            borderRadius: 'var(--r-lg)'
          }}
        >
          {t('Individual Items', 'أطعمة فردية')}
        </button>
        <button
          onClick={() => setActiveTab('meals')}
          style={{
            flex: 1,
            padding: '10px',
            textAlign: 'center',
            fontSize: '13px',
            fontWeight: 600,
            color: activeTab === 'meals' ? 'var(--bg)' : 'var(--gray2)',
            background: activeTab === 'meals' ? 'var(--green)' : 'transparent',
            cursor: 'pointer',
            border: 'none',
            borderRadius: 'var(--r-lg)'
          }}
        >
          {t('Local Meals', 'وجبات محلية')}
        </button>
      </div>

      {/* Food Items View */}
      {activeTab === 'items' && (
        <div>
          <div style={{ position: 'relative', marginBottom: '12px' }}>
            <span style={{
              position: 'absolute',
              left: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '17px',
              color: 'var(--gray3)'
            }}>
              🔍
            </span>
            <input
              type="text"
              value={foodSearch}
              onChange={e => setFoodSearch(e.target.value)}
              placeholder={t('Search food...', 'ابحث عن طعام...')}
              style={{
                width: '100%',
                background: 'var(--bg2)',
                border: '1.5px solid var(--bg4)',
                borderRadius: 'var(--r-lg)',
                padding: '12px 16px 12px 44px',
                color: 'var(--white)',
                fontSize: '14px'
              }}
            />
          </div>
          <div>
            {filteredFoods.map(f => (
              <div
                key={f.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 14px',
                  background: 'var(--bg2)',
                  border: '1px solid var(--bg4)',
                  borderRadius: 'var(--r-md)',
                  marginBottom: '8px',
                  cursor: 'pointer'
                }}
              >
                <span style={{ fontSize: '22px', width: '36px', textAlign: 'center', flexShrink: 0 }}>{f.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '1px' }}>{f.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--gray2)' }}>
                    {f.cal} kcal · P:{f.p}g C:{f.c}g F:{f.f}g <span style={{ color: 'var(--gray3)' }}>per {f.per}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleAddFood(f, false)}
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    background: 'var(--green-dim)',
                    border: '1px solid rgba(34,255,68,0.3)',
                    color: 'var(--green)',
                    fontSize: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    flexShrink: 0
                  }}
                >
                  +
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Meals View */}
      {activeTab === 'meals' && (
        <div>
          <div style={{ position: 'relative', marginBottom: '12px' }}>
            <span style={{
              position: 'absolute',
              left: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '17px',
              color: 'var(--gray3)'
            }}>
              🔍
            </span>
            <input
              type="text"
              value={mealSearch}
              onChange={e => setMealSearch(e.target.value)}
              placeholder={t('Search meals...', 'ابحث عن وجبة...')}
              style={{
                width: '100%',
                background: 'var(--bg2)',
                border: '1.5px solid var(--bg4)',
                borderRadius: 'var(--r-lg)',
                padding: '12px 16px 12px 44px',
                color: 'var(--white)',
                fontSize: '14px'
              }}
            />
          </div>
          <div>
            {filteredMeals.map(m => (
              <div
                key={m.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 14px',
                  background: 'var(--bg2)',
                  border: '1px solid var(--bg4)',
                  borderRadius: 'var(--r-md)',
                  marginBottom: '8px',
                  cursor: 'pointer'
                }}
              >
                <span style={{ fontSize: '22px', width: '36px', textAlign: 'center', flexShrink: 0 }}>{m.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '1px' }}>{m.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--gray2)' }}>
                    {m.cal} kcal · P:{m.p}g C:{m.c}g F:{m.f}g <span style={{ color: 'var(--gray3)' }}>per {m.per}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleAddFood(m, true)}
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    background: 'var(--green-dim)',
                    border: '1px solid rgba(34,255,68,0.3)',
                    color: 'var(--green)',
                    fontSize: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    flexShrink: 0
                  }}
                >
                  +
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Today's Log */}
      <div style={{ marginTop: '20px' }}>
        <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--gray2)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          {t("TODAY'S LOG", 'سجل اليوم')}
        </div>
        {foodLog.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--gray2)' }}>
            <div style={{ fontSize: '40px', marginBottom: '10px' }}>🍽</div>
            <div style={{ fontSize: '14px' }}>{t('Nothing logged yet', 'لم تسجل شيئاً بعد')}</div>
          </div>
        ) : (
          <div>
            {foodLog.map(f => (
              <div
                key={f.logId}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 12px',
                  background: 'var(--bg2)',
                  border: '1px solid var(--bg4)',
                  borderRadius: 'var(--r-md)',
                  marginBottom: '6px'
                }}
              >
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: 'var(--green)',
                  flexShrink: 0
                }} />
                <span style={{ fontSize: '16px' }}>{f.emoji}</span>
                <div style={{ flex: 1, fontSize: '13px' }}>{f.name}</div>
                <div style={{ fontSize: '13px', color: 'var(--green)', fontWeight: 600 }}>{f.cal} kcal</div>
                <button
                  onClick={() => removeFood(f.logId)}
                  style={{
                    color: 'var(--gray3)',
                    fontSize: '16px',
                    cursor: 'pointer',
                    background: 'none',
                    border: 'none',
                    padding: '4px'
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
