export interface ExerciseRecord {
  weight: number;
  reps: number;
  date: string;
}

const KEY = 'amgym_exercise_history';

function load(): Record<string, ExerciseRecord> {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '{}');
  } catch { return {}; }
}

export function getLastRecord(name: string): ExerciseRecord | null {
  const all = load();
  return all[name.toLowerCase()] ?? null;
}

export function saveRecord(name: string, weight: number, reps: number): void {
  const all = load();
  all[name.toLowerCase()] = { weight, reps, date: new Date().toDateString() };
  try {
    localStorage.setItem(KEY, JSON.stringify(all));
  } catch (e) {
    console.error('[exerciseHistory] Failed to save:', e);
  }
}

export function calc1RM(weight: number, reps: number): number {
  return Math.round(weight * (1 + reps / 30));
}

export function getWarmupSets(weight: number): { pct: number; reps: number; kg: number }[] {
  return [
    { pct: 40, reps: 10, kg: Math.round(weight * 0.4) },
    { pct: 60, reps: 6,  kg: Math.round(weight * 0.6) },
    { pct: 80, reps: 3,  kg: Math.round(weight * 0.8) },
  ];
}
