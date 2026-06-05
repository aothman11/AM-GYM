export interface WeeklyChallenge {
  emoji: string;
  exercise: string;
  target: number;
  unit: string;
  step: number;
  en: string;
  ar: string;
}

export const WEEKLY_CHALLENGES: WeeklyChallenge[] = [
  { emoji:'🤸', exercise:'Push-Ups', target:100, unit:'reps', step:5,
    en:'Complete 100 Push-Ups this week', ar:'أكمل 100 ضغطة هذا الأسبوع' },
  { emoji:'💪', exercise:'Pull-Ups', target:50, unit:'reps', step:2,
    en:'Complete 50 Pull-Ups this week', ar:'أكمل 50 عقلة هذا الأسبوع' },
  { emoji:'🦵', exercise:'Squats', target:150, unit:'reps', step:10,
    en:'Complete 150 Squats this week', ar:'أكمل 150 قرفصاء هذا الأسبوع' },
  { emoji:'🏃', exercise:'Plank', target:10, unit:'min', step:1,
    en:'Hold 10 minutes of Plank total', ar:'احتفظ بوضع البلانك 10 دقائق هذا الأسبوع' },
  { emoji:'🔥', exercise:'Burpees', target:75, unit:'reps', step:5,
    en:'Complete 75 Burpees this week', ar:'أكمل 75 بيربي هذا الأسبوع' },
  { emoji:'🍑', exercise:'Hip Thrusts', target:120, unit:'reps', step:10,
    en:'Complete 120 Hip Thrusts this week', ar:'أكمل 120 دفعة مؤخرة هذا الأسبوع' },
  { emoji:'🏋️', exercise:'Deadlifts', target:60, unit:'reps', step:5,
    en:'Complete 60 Deadlifts this week', ar:'أكمل 60 رفعة أرضية هذا الأسبوع' },
  { emoji:'↔️', exercise:'Lateral Raises', target:200, unit:'reps', step:10,
    en:'Complete 200 Lateral Raises this week', ar:'أكمل 200 رفعة جانبية هذا الأسبوع' },
  { emoji:'🦵', exercise:'Lunges', target:100, unit:'reps', step:10,
    en:'Complete 100 Lunges this week', ar:'أكمل 100 طعنة هذا الأسبوع' },
  { emoji:'💪', exercise:'Dips', target:80, unit:'reps', step:5,
    en:'Complete 80 Dips this week', ar:'أكمل 80 تمرين دبس هذا الأسبوع' },
  { emoji:'🔄', exercise:'Cable Rows', target:90, unit:'reps', step:5,
    en:'Complete 90 Cable Rows this week', ar:'أكمل 90 تمرين كابل رو هذا الأسبوع' },
  { emoji:'🤸', exercise:'Sit-Ups', target:200, unit:'reps', step:10,
    en:'Complete 200 Sit-Ups this week', ar:'أكمل 200 جلسة هذا الأسبوع' },
];

export function getWeekNumber(d: Date): number {
  const date = new Date(d);
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 4 - (date.getDay() || 7));
  const yearStart = new Date(date.getFullYear(), 0, 1);
  return Math.ceil((((date.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}

export function getCurrentChallenge(): WeeklyChallenge & { weekNum: number; year: number; idx: number } {
  const now = new Date();
  const weekNum = getWeekNumber(now);
  const year = now.getFullYear();
  const idx = (weekNum + year) % WEEKLY_CHALLENGES.length;
  return { ...WEEKLY_CHALLENGES[idx], weekNum, year, idx };
}
