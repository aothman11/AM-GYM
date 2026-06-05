'use client';

import { useState, useMemo } from 'react';
import { useApp } from '@/contexts/AppContext';
import { EXERCISES, MUSCLES, Exercise } from '@/data/exercises';
import ExerciseModal from '@/components/ui/ExerciseModal';

export default function ExercisesPage() {
  const { t } = useApp();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  const filteredExercises = useMemo(() => {
    return EXERCISES.filter(ex => {
      const matchesMuscle = activeFilter === 'All' || ex.muscle === activeFilter;
      const matchesSearch = !search || 
        ex.name.toLowerCase().includes(search.toLowerCase()) ||
        ex.muscle.toLowerCase().includes(search.toLowerCase());
      return matchesMuscle && matchesSearch;
    });
  }, [search, activeFilter]);

  return (
    <div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: 'var(--green)', letterSpacing: '1px', marginBottom: '4px', textShadow: '0 0 10px rgba(34,255,68,0.3)' }}>
        {t('EXERCISES', 'التمارين')}
      </div>
      <div style={{ fontSize: '13px', color: 'var(--gray2)', marginBottom: '20px' }}>
        {t('Exercise library with form guides', 'مكتبة التمارين مع إرشادات الأداء')}
      </div>

      {/* Search */}
      <div style={{ position: 'relative', marginBottom: '14px' }}>
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
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder={t('Search exercises...', 'ابحث عن تمرين...')}
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

      {/* Filters */}
      <div style={{
        display: 'flex',
        gap: '6px',
        overflowX: 'auto',
        paddingBottom: '4px',
        marginBottom: '14px',
        scrollbarWidth: 'none'
      }}>
        {['All', ...MUSCLES].map(muscle => (
          <button
            key={muscle}
            onClick={() => setActiveFilter(muscle)}
            style={{
              whiteSpace: 'nowrap',
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: 600,
              border: activeFilter === muscle ? '1px solid var(--green)' : '1px solid var(--bg4)',
              color: activeFilter === muscle ? 'var(--bg)' : 'var(--gray2)',
              background: activeFilter === muscle ? 'var(--green)' : 'var(--bg2)',
              cursor: 'pointer'
            }}
          >
            {muscle}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filteredExercises.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--gray2)' }}>
            <div style={{ fontSize: '40px', marginBottom: '10px' }}>🔍</div>
            <div style={{ fontSize: '14px' }}>{t('No exercises found', 'لا توجد تمارين')}</div>
          </div>
        ) : (
          filteredExercises.map(ex => (
            <div
              key={ex.id}
              onClick={() => setSelectedExercise(ex)}
              style={{
                background: 'var(--bg2)',
                border: '1px solid var(--bg4)',
                borderRadius: 'var(--r-lg)',
                overflow: 'hidden',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 0
              }}
            >
              <div style={{
                width: '90px',
                height: '70px',
                background: 'var(--bg3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                flexShrink: 0
              }}>
                {ex.emoji}
              </div>
              <div style={{ flex: 1, padding: '10px 12px' }}>
                <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '2px', fontFamily: 'var(--font)' }}>
                  {ex.name}
                </div>
                <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                  <span style={{
                    fontSize: '10px',
                    padding: '2px 7px',
                    borderRadius: '8px',
                    background: 'var(--green-dim)',
                    color: 'var(--green)',
                    border: '1px solid rgba(34,255,68,0.2)'
                  }}>
                    {ex.muscle}
                  </span>
                  <span style={{
                    fontSize: '10px',
                    padding: '2px 7px',
                    borderRadius: '8px',
                    background: 'var(--bg3)',
                    color: 'var(--gray2)',
                    border: '1px solid var(--bg4)'
                  }}>
                    {ex.type}
                  </span>
                  <span style={{
                    fontSize: '10px',
                    padding: '2px 7px',
                    borderRadius: '8px',
                    background: 'var(--bg3)',
                    color: 'var(--gray2)',
                    border: '1px solid var(--bg4)'
                  }}>
                    {ex.equip}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {selectedExercise && (
        <ExerciseModal
          exercise={selectedExercise}
          onClose={() => setSelectedExercise(null)}
        />
      )}
    </div>
  );
}
