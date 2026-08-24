﻿'use client';

import { useState, useMemo } from 'react';
import { useApp, AddFoodInput } from '@/contexts/AppContext';
import { FOODS, MEALS, Food, Meal } from '@/data/foods';
import { SearchInput } from '@/components/ui/SearchInput';

export default function CaloriesPage() {
  const { t, foodLog, addFood, removeFood, calorieTarget } = useApp();
  const [activeTab, setActiveTab] = useState<'items' | 'meals'>('items');
  const [foodSearch, setFoodSearch] = useState('');
  const [mealSearch, setMealSearch] = useState('');

  // Fix #4: derive macro targets from calorieTarget using standard macro splits
  // Protein 30 % of kcal / 4 kcal per gram
  // Carbs   45 % of kcal / 4 kcal per gram
  // Fat     25 % of kcal / 9 kcal per gram
  const macroTargets = useMemo(() => ({
    p: Math.max(1, Math.round(calorieTarget * 0.30 / 4)),
    c: Math.max(1, Math.round(calorieTarget * 0.45 / 4)),
    f: Math.max(1, Math.round(calorieTarget * 0.25 / 9)),
  }), [calorieTarget]);

  const filteredFoods = useMemo(
    () => FOODS.filter(f => !foodSearch || f.name.toLowerCase().includes(foodSearch.toLowerCase())),
    [foodSearch],
  );

  const filteredMeals = useMemo(
    () => MEALS.filter(m => !mealSearch || m.name.toLowerCase().includes(mealSearch.toLowerCase())),
    [mealSearch],
  );

  const totals = useMemo(
    () => foodLog.reduce((acc, f) => ({ cal: acc.cal + f.cal, p: acc.p + f.p, c: acc.c + f.c, f: acc.f + f.f }), { cal: 0, p: 0, c: 0, f: 0 }),
    [foodLog],
  );

  // Guard against calorieTarget = 0 to prevent Infinity
  const caloriePct = calorieTarget > 0 ? Math.min(totals.cal / calorieTarget, 1) : 0;
  const circumference = 408;
  const strokeDashoffset = circumference - circumference * caloriePct;

  // Fix #5 + #6: logId and date are generated internally by addFood;
  // callers pass only the food item data.
  const handleAddFood = (item: Food | Meal, isMeal: boolean) => {
    const input: AddFoodInput = {
      id: item.id,
      name: item.name,
      emoji: item.emoji,
      cal: item.cal,
      p: item.p,
      c: item.c,
      f: item.f,
      per: item.per,
      isMeal,
    };
    addFood(input);
  };

  const LogPanel = () => (
    <>
      <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--gray2)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        {t("TODAY'S LOG", 'سجل اليوم')}
        {foodLog.length > 0 && (
          <span style={{ float: 'right', color: 'var(--violet)', fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 700 }}>
            {totals.cal} kcal
          </span>
        )}
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
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '10px 12px', background: 'var(--bg3)',
                border: '1px solid var(--bg4)', borderRadius: 'var(--r-md)', marginBottom: '6px',
              }}
            >
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--violet)', boxShadow: '0 0 6px rgba(124,92,255,0.6)', flexShrink: 0 }} />
              <span style={{ fontSize: '16px' }}>{f.emoji}</span>
              <div style={{ flex: 1, fontSize: '13px' }}>{f.name}</div>
              <div style={{ fontSize: '13px', color: 'var(--violet)', fontWeight: 600 }}>{f.cal}</div>
              <button
                onClick={() => removeFood(f.logId)}
                style={{ color: 'var(--gray3)', fontSize: '16px', cursor: 'pointer', background: 'none', border: 'none', padding: '4px' }}
                aria-label={`Remove ${f.name}`}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );

  return (
    <div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: 'var(--green)', letterSpacing: '1px', marginBottom: '4px', textShadow: '0 0 16px rgba(124,92,255,0.45)' }}>
        {t('CALORIES', 'السعرات')}
      </div>
      <div style={{ fontSize: '13px', color: 'var(--gray2)', marginBottom: '20px' }}>
        {t('Track your daily nutrition', 'تتبع تغذيتك اليومية')}
      </div>

      <div className="calories-grid">
        {/* ── LEFT / MAIN COLUMN ── */}
        <div className="calories-col-main">

          {/* Calorie Ring */}
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <svg width="160" height="160" viewBox="0 0 160 160" style={{ filter: 'drop-shadow(0 0 12px rgba(77,139,255,0.35))' }}>
              <defs>
                <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4D8BFF"/>
                  <stop offset="100%" stopColor="#7C5CFF"/>
                </linearGradient>
              </defs>
              <circle cx="80" cy="80" r="65" fill="none" stroke="#2D3355" strokeWidth="12"/>
              <circle
                cx="80" cy="80" r="65"
                fill="none"
                stroke="url(#ringGrad)"
                strokeWidth="12"
                strokeDasharray="408"
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                transform="rotate(-90 80 80)"
                style={{ transition: 'stroke-dashoffset 0.5s ease' }}
              />
              <text x="80" y="74" textAnchor="middle" fill="#ffffff" fontSize="28" fontWeight="700" fontFamily="JetBrains Mono, monospace">
                {totals.cal}
              </text>
              <text x="80" y="92" textAnchor="middle" fill="#6d6e71" fontSize="11" fontFamily="Inter, sans-serif">
                / {calorieTarget} kcal
              </text>
            </svg>
          </div>

          {/* Macros */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '20px' }}>
            <div style={{ background: 'var(--bg2)', border: '1px solid var(--bg4)', borderRadius: 'var(--r-lg)', padding: '12px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '20px', lineHeight: 1, color: 'var(--violet)', fontWeight: 700 }}>
                {Math.round(totals.p)}g
              </div>
              <div style={{ fontSize: '11px', color: 'var(--gray2)', marginTop: '3px' }}>{t('Protein', 'بروتين')}</div>
              <div style={{ fontSize: '10px', color: 'var(--gray3)', marginTop: '1px' }}>/ {macroTargets.p}g</div>
              <div style={{ height: '3px', borderRadius: '2px', marginTop: '6px', background: 'var(--bg4)' }}>
                <div style={{ height: '100%', borderRadius: '2px', background: 'var(--violet)', width: `${Math.min(totals.p / macroTargets.p * 100, 100)}%`, transition: 'width 0.5s', boxShadow: '0 0 6px rgba(124,92,255,0.6)' }} />
              </div>
            </div>
            <div style={{ background: 'var(--bg2)', border: '1px solid var(--bg4)', borderRadius: 'var(--r-lg)', padding: '12px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '20px', lineHeight: 1, color: 'var(--cyan)', fontWeight: 700 }}>
                {Math.round(totals.c)}g
              </div>
              <div style={{ fontSize: '11px', color: 'var(--gray2)', marginTop: '3px' }}>{t('Carbs', 'كارب')}</div>
              <div style={{ fontSize: '10px', color: 'var(--gray3)', marginTop: '1px' }}>/ {macroTargets.c}g</div>
              <div style={{ height: '3px', borderRadius: '2px', marginTop: '6px', background: 'var(--bg4)' }}>
                <div style={{ height: '100%', borderRadius: '2px', background: 'var(--cyan)', width: `${Math.min(totals.c / macroTargets.c * 100, 100)}%`, transition: 'width 0.5s', boxShadow: '0 0 6px rgba(61,214,245,0.5)' }} />
              </div>
            </div>
            <div style={{ background: 'var(--bg2)', border: '1px solid var(--bg4)', borderRadius: 'var(--r-lg)', padding: '12px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '20px', lineHeight: 1, color: 'var(--purple-soft)', fontWeight: 700 }}>
                {Math.round(totals.f)}g
              </div>
              <div style={{ fontSize: '11px', color: 'var(--gray2)', marginTop: '3px' }}>{t('Fats', 'دهون')}</div>
              <div style={{ fontSize: '10px', color: 'var(--gray3)', marginTop: '1px' }}>/ {macroTargets.f}g</div>
              <div style={{ height: '3px', borderRadius: '2px', marginTop: '6px', background: 'var(--bg4)' }}>
                <div style={{ height: '100%', borderRadius: '2px', background: 'var(--purple-soft)', width: `${Math.min(totals.f / macroTargets.f * 100, 100)}%`, transition: 'width 0.5s', boxShadow: '0 0 6px rgba(167,139,250,0.5)' }} />
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div style={{
            display: 'flex', gap: '4px', background: 'var(--bg2)',
            border: '1px solid var(--bg4)', borderRadius: 'var(--r-xl)',
            padding: '4px', marginBottom: '14px'
          }}>
            <button
              onClick={() => setActiveTab('items')}
              style={{
                flex: 1, padding: '9px', textAlign: 'center', fontSize: '13px', fontWeight: 600,
                color: activeTab === 'items' ? '#fff' : 'var(--gray2)',
                background: activeTab === 'items' ? 'var(--violet)' : 'transparent',
                cursor: 'pointer', border: 'none', borderRadius: 'var(--r-lg)',
                boxShadow: activeTab === 'items' ? '0 0 12px rgba(124,92,255,0.4)' : 'none',
                transition: 'all 0.2s',
              }}
            >
              {t('Individual Items', 'أطعمة فردية')}
            </button>
            <button
              onClick={() => setActiveTab('meals')}
              style={{
                flex: 1, padding: '9px', textAlign: 'center', fontSize: '13px', fontWeight: 600,
                color: activeTab === 'meals' ? '#fff' : 'var(--gray2)',
                background: activeTab === 'meals' ? 'var(--violet)' : 'transparent',
                cursor: 'pointer', border: 'none', borderRadius: 'var(--r-lg)',
                boxShadow: activeTab === 'meals' ? '0 0 12px rgba(124,92,255,0.4)' : 'none',
                transition: 'all 0.2s',
              }}
            >
              {t('Local Meals', 'وجبات محلية')}
            </button>
          </div>

          {/* Food Items View */}
          {activeTab === 'items' && (
            <div>
              <SearchInput
                value={foodSearch}
                onChange={setFoodSearch}
                placeholder={t('Search food...', 'ابحث عن طعام...')}
              />
              <div>
                {filteredFoods.map(f => (
                  <FoodRow key={f.id} item={f} onAdd={() => handleAddFood(f, false)} />
                ))}
              </div>
            </div>
          )}

          {/* Meals View */}
          {activeTab === 'meals' && (
            <div>
              <SearchInput
                value={mealSearch}
                onChange={setMealSearch}
                placeholder={t('Search meals...', 'ابحث عن وجبة...')}
              />
              <div>
                {filteredMeals.map(m => (
                  <FoodRow key={m.id} item={m} onAdd={() => handleAddFood(m, true)} />
                ))}
              </div>
            </div>
          )}

          {/* Today's log — mobile only (desktop shows in sticky right col) */}
          <div className="calories-mobile-log" style={{ marginTop: '20px' }}>
            <LogPanel />
          </div>

        </div>{/* end calories-col-main */}

        {/* ── RIGHT COLUMN — Today's log (sticky, desktop only) ── */}
        <div className="calories-col-log">
          <LogPanel />
        </div>
      </div>
    </div>
  );
}

// ── Shared food/meal row (Fix #6: eliminates duplicated row markup too) ──────

interface FoodRowProps {
  item: Food | Meal;
  onAdd: () => void;
}

function FoodRow({ item, onAdd }: FoodRowProps) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '10px',
      padding: '12px 14px', background: 'var(--bg2)',
      border: '1px solid var(--bg4)', borderRadius: 'var(--r-md)', marginBottom: '8px',
    }}>
      <span style={{ fontSize: '22px', width: '36px', textAlign: 'center', flexShrink: 0 }}>{item.emoji}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '1px' }}>{item.name}</div>
        <div style={{ fontSize: '12px', color: 'var(--gray2)' }}>
          {item.cal} kcal · P:{item.p}g C:{item.c}g F:{item.f}g{' '}
          <span style={{ color: 'var(--gray3)' }}>per {item.per}</span>
        </div>
      </div>
      <button
        onClick={onAdd}
        style={{
          width: '32px', height: '32px', borderRadius: '50%',
          background: 'var(--violet-dim)', border: '1px solid rgba(124,92,255,0.35)',
          color: 'var(--violet)', fontSize: '18px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', flexShrink: 0,
        }}
        aria-label={`Add ${item.name}`}
      >
        +
      </button>
    </div>
  );
}
