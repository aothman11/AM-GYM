export interface ProgramDay {
  name: string;
  focus: string;
  rest: boolean;
}

export interface Program {
  name: string;
  emoji: string;
  goal: string;
  equipment: string;
  description: string;
  days: ProgramDay[];
}

export interface ProgramExercise {
  n: string;
  s: string;
  v: string;
}

// ═══════════════════════════════════════════════════════════════════════════════
// PROGRAM DEFINITIONS - All with verified GIF exercises
// ═══════════════════════════════════════════════════════════════════════════════

export const PROGRAMS: Record<string, Program> = {
  ppl: {
    name: 'Push / Pull / Legs',
    emoji: '🔄',
    goal: 'Hypertrophy & Strength',
    equipment: 'Full Gym',
    description: 'Classic 6-day split for muscle building.',
    days: [
      { name: 'Day 1', focus: 'Push', rest: false },
      { name: 'Day 2', focus: 'Pull', rest: false },
      { name: 'Day 3', focus: 'Legs', rest: false },
      { name: 'Day 4', focus: 'Push', rest: false },
      { name: 'Day 5', focus: 'Pull', rest: false },
      { name: 'Day 6', focus: 'Legs', rest: false },
      { name: 'Day 7', focus: 'Rest', rest: true },
    ]
  },
  hybrid: {
    name: 'Upper/Lower Hybrid',
    emoji: '⚡',
    goal: 'Balanced Strength & Size',
    equipment: 'Full Gym',
    description: '5-day program combining upper/lower with push/pull.',
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
    name: 'Arms Specialization',
    emoji: '💪',
    goal: 'Arm Hypertrophy',
    equipment: 'Full Gym',
    description: '5-day split with extra arm volume.',
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
    goal: 'Functional Strength & Endurance',
    equipment: 'None (Bodyweight)',
    description: 'No equipment needed. Perfect for home or travel.',
    days: [
      { name: 'Day 1', focus: 'BW Upper Push', rest: false },
      { name: 'Day 2', focus: 'BW Lower Body', rest: false },
      { name: 'Day 3', focus: 'Rest', rest: true },
      { name: 'Day 4', focus: 'BW Upper Pull', rest: false },
      { name: 'Day 5', focus: 'BW Lower + Core', rest: false },
      { name: 'Day 6', focus: 'BW Full Body', rest: false },
      { name: 'Day 7', focus: 'Rest', rest: true },
    ]
  },
  dumbbell: {
    name: 'Dumbbell Only',
    emoji: '🏠',
    goal: 'Muscle Building at Home',
    equipment: 'Dumbbells Only',
    description: 'Complete muscle-building program using only dumbbells.',
    days: [
      { name: 'Day 1', focus: 'DB Upper Push', rest: false },
      { name: 'Day 2', focus: 'DB Lower Body', rest: false },
      { name: 'Day 3', focus: 'Rest', rest: true },
      { name: 'Day 4', focus: 'DB Upper Pull', rest: false },
      { name: 'Day 5', focus: 'DB Full Body', rest: false },
      { name: 'Day 6', focus: 'Rest', rest: true },
      { name: 'Day 7', focus: 'Rest', rest: true },
    ]
  }
};

// ═══════════════════════════════════════════════════════════════════════════════
// EXERCISE PROGRAMS - All exercises have verified working GIFs
// ═══════════════════════════════════════════════════════════════════════════════

export const EXERCISE_PROGRAMS: Record<string, Record<string, Record<string, ProgramExercise[]>>> = {
  
  // ═══════════════════════════════════════════════════════════════════════════
  // FULL GYM - PUSH DAY
  // ═══════════════════════════════════════════════════════════════════════════
  'Push': {
    male: {
      beginner: [
        {n:'Barbell Bench Press',s:'3×10',v:''},
        {n:'Incline Dumbbell Press',s:'3×10',v:''},
        {n:'Dumbbell Shoulder Press',s:'3×10',v:''},
        {n:'Lateral Raise',s:'3×12',v:''},
        {n:'Tricep Pushdown',s:'3×12',v:''}
      ],
      intermediate: [
        {n:'Barbell Bench Press',s:'4×8',v:''},
        {n:'Incline Barbell Bench Press',s:'3×10',v:''},
        {n:'Dumbbell Shoulder Press',s:'4×10',v:''},
        {n:'Cable Crossover',s:'3×12',v:''},
        {n:'Lateral Raise',s:'3×15',v:''},
        {n:'Skull Crusher',s:'3×12',v:''},
        {n:'Rope Pushdown',s:'3×12',v:''}
      ],
      advanced: [
        {n:'Barbell Bench Press',s:'5×5',v:''},
        {n:'Incline Barbell Bench Press',s:'4×8',v:''},
        {n:'Dumbbell Fly',s:'3×12',v:''},
        {n:'Barbell Shoulder Press',s:'4×6',v:''},
        {n:'Arnold Press',s:'3×10',v:''},
        {n:'Lateral Raise',s:'4×15',v:''},
        {n:'Close Grip Bench Press',s:'4×8',v:''},
        {n:'Overhead Tricep Extension',s:'3×12',v:''}
      ]
    },
    female: {
      beginner: [
        {n:'Dumbbell Bench Press',s:'3×12',v:''},
        {n:'Incline Dumbbell Press',s:'3×12',v:''},
        {n:'Dumbbell Shoulder Press',s:'3×12',v:''},
        {n:'Lateral Raise',s:'3×15',v:''},
        {n:'Tricep Kickback',s:'3×15',v:''}
      ],
      intermediate: [
        {n:'Barbell Bench Press',s:'3×10',v:''},
        {n:'Incline Dumbbell Press',s:'3×12',v:''},
        {n:'Cable Crossover',s:'3×15',v:''},
        {n:'Arnold Press',s:'3×12',v:''},
        {n:'Lateral Raise',s:'3×15',v:''},
        {n:'Rope Pushdown',s:'3×15',v:''}
      ],
      advanced: [
        {n:'Barbell Bench Press',s:'4×8',v:''},
        {n:'Incline Barbell Bench Press',s:'3×10',v:''},
        {n:'Pec Deck Fly',s:'3×12',v:''},
        {n:'Dumbbell Shoulder Press',s:'4×10',v:''},
        {n:'Lateral Raise',s:'4×15',v:''},
        {n:'Front Raise',s:'3×12',v:''},
        {n:'Skull Crusher',s:'3×12',v:''}
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // FULL GYM - PULL DAY
  // ═══════════════════════════════════════════════════════════════════════════
  'Pull': {
    male: {
      beginner: [
        {n:'Lat Pulldown',s:'3×10',v:''},
        {n:'Seated Cable Row',s:'3×10',v:''},
        {n:'Dumbbell Curl',s:'3×12',v:''},
        {n:'Face Pull',s:'3×15',v:''},
        {n:'Hammer Curl',s:'3×12',v:''}
      ],
      intermediate: [
        {n:'Pull Up',s:'4×8',v:''},
        {n:'Barbell Bent Over Row',s:'4×8',v:''},
        {n:'Lat Pulldown',s:'3×10',v:''},
        {n:'Face Pull',s:'3×15',v:''},
        {n:'Barbell Curl',s:'3×10',v:''},
        {n:'Incline Dumbbell Curl',s:'3×12',v:''}
      ],
      advanced: [
        {n:'Pull Up',s:'5×6',v:''},
        {n:'Barbell Bent Over Row',s:'4×6',v:''},
        {n:'T Bar Row',s:'4×8',v:''},
        {n:'Straight Arm Pulldown',s:'3×12',v:''},
        {n:'Face Pull',s:'3×15',v:''},
        {n:'Barbell Curl',s:'4×8',v:''},
        {n:'Spider Curl',s:'3×12',v:''},
        {n:'Hammer Curl',s:'3×12',v:''}
      ]
    },
    female: {
      beginner: [
        {n:'Lat Pulldown',s:'3×12',v:''},
        {n:'Seated Cable Row',s:'3×12',v:''},
        {n:'Dumbbell Curl',s:'3×12',v:''},
        {n:'Face Pull',s:'3×15',v:''}
      ],
      intermediate: [
        {n:'Lat Pulldown',s:'4×10',v:''},
        {n:'Seated Cable Row',s:'4×10',v:''},
        {n:'Dumbbell Row',s:'3×12',v:''},
        {n:'Face Pull',s:'3×15',v:''},
        {n:'Hammer Curl',s:'3×12',v:''},
        {n:'Concentration Curl',s:'3×12',v:''}
      ],
      advanced: [
        {n:'Pull Up',s:'4×8',v:''},
        {n:'Barbell Bent Over Row',s:'4×8',v:''},
        {n:'Lat Pulldown',s:'3×10',v:''},
        {n:'Dumbbell Row',s:'3×10',v:''},
        {n:'Face Pull',s:'3×15',v:''},
        {n:'Barbell Curl',s:'3×10',v:''},
        {n:'Incline Dumbbell Curl',s:'3×12',v:''}
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // FULL GYM - LEGS DAY
  // ═══════════════════════════════════════════════════════════════════════════
  'Legs': {
    male: {
      beginner: [
        {n:'Barbell Squat',s:'3×10',v:''},
        {n:'Leg Press',s:'3×12',v:''},
        {n:'Lying Leg Curl',s:'3×12',v:''},
        {n:'Leg Extension',s:'3×12',v:''},
        {n:'Standing Calf Raise',s:'4×15',v:''}
      ],
      intermediate: [
        {n:'Barbell Squat',s:'4×8',v:''},
        {n:'Romanian Deadlift',s:'4×10',v:''},
        {n:'Leg Press',s:'3×12',v:''},
        {n:'Bulgarian Split Squat',s:'3×10',v:''},
        {n:'Lying Leg Curl',s:'3×12',v:''},
        {n:'Standing Calf Raise',s:'4×15',v:''},
        {n:'Seated Calf Raise',s:'3×15',v:''}
      ],
      advanced: [
        {n:'Barbell Squat',s:'5×5',v:''},
        {n:'Barbell Front Squat',s:'4×8',v:''},
        {n:'Romanian Deadlift',s:'4×8',v:''},
        {n:'Hack Squat',s:'3×10',v:''},
        {n:'Bulgarian Split Squat',s:'3×10',v:''},
        {n:'Lying Leg Curl',s:'4×12',v:''},
        {n:'Leg Extension',s:'3×15',v:''},
        {n:'Standing Calf Raise',s:'5×15',v:''}
      ]
    },
    female: {
      beginner: [
        {n:'Goblet Squat',s:'3×12',v:''},
        {n:'Leg Press',s:'3×15',v:''},
        {n:'Glute Bridge',s:'3×15',v:''},
        {n:'Lying Leg Curl',s:'3×12',v:''},
        {n:'Hip Abduction',s:'3×15',v:''}
      ],
      intermediate: [
        {n:'Barbell Squat',s:'4×10',v:''},
        {n:'Barbell Hip Thrust',s:'4×12',v:''},
        {n:'Romanian Deadlift',s:'3×10',v:''},
        {n:'Bulgarian Split Squat',s:'3×12',v:''},
        {n:'Lying Leg Curl',s:'3×12',v:''},
        {n:'Hip Abduction',s:'3×15',v:''}
      ],
      advanced: [
        {n:'Barbell Squat',s:'4×8',v:''},
        {n:'Barbell Hip Thrust',s:'5×10',v:''},
        {n:'Romanian Deadlift',s:'4×8',v:''},
        {n:'Bulgarian Split Squat',s:'4×10',v:''},
        {n:'Sumo Squat',s:'3×12',v:''},
        {n:'Lying Leg Curl',s:'4×12',v:''},
        {n:'Hip Abduction',s:'4×15',v:''},
        {n:'Standing Calf Raise',s:'4×15',v:''}
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // UPPER BODY
  // ═══════════════════════════════════════════════════════════════════════════
  'Upper Body': {
    male: {
      beginner: [
        {n:'Barbell Bench Press',s:'3×10',v:''},
        {n:'Lat Pulldown',s:'3×10',v:''},
        {n:'Dumbbell Shoulder Press',s:'3×10',v:''},
        {n:'Dumbbell Row',s:'3×10',v:''},
        {n:'Dumbbell Curl',s:'3×12',v:''},
        {n:'Tricep Pushdown',s:'3×12',v:''}
      ],
      intermediate: [
        {n:'Barbell Bench Press',s:'4×8',v:''},
        {n:'Barbell Bent Over Row',s:'4×8',v:''},
        {n:'Incline Dumbbell Press',s:'3×10',v:''},
        {n:'Lat Pulldown',s:'3×10',v:''},
        {n:'Arnold Press',s:'3×12',v:''},
        {n:'Barbell Curl',s:'3×10',v:''},
        {n:'Skull Crusher',s:'3×10',v:''}
      ],
      advanced: [
        {n:'Barbell Bench Press',s:'5×5',v:''},
        {n:'Barbell Bent Over Row',s:'5×5',v:''},
        {n:'Incline Barbell Bench Press',s:'4×8',v:''},
        {n:'Pull Up',s:'4×8',v:''},
        {n:'Barbell Shoulder Press',s:'4×6',v:''},
        {n:'Lateral Raise',s:'3×15',v:''},
        {n:'Barbell Curl',s:'4×8',v:''},
        {n:'Close Grip Bench Press',s:'4×8',v:''}
      ]
    },
    female: {
      beginner: [
        {n:'Dumbbell Bench Press',s:'3×12',v:''},
        {n:'Lat Pulldown',s:'3×12',v:''},
        {n:'Dumbbell Shoulder Press',s:'3×12',v:''},
        {n:'Seated Cable Row',s:'3×12',v:''},
        {n:'Dumbbell Curl',s:'3×12',v:''},
        {n:'Tricep Kickback',s:'3×15',v:''}
      ],
      intermediate: [
        {n:'Barbell Bench Press',s:'3×10',v:''},
        {n:'Lat Pulldown',s:'4×10',v:''},
        {n:'Incline Dumbbell Press',s:'3×12',v:''},
        {n:'Dumbbell Row',s:'3×10',v:''},
        {n:'Arnold Press',s:'3×12',v:''},
        {n:'Face Pull',s:'3×15',v:''},
        {n:'Hammer Curl',s:'3×12',v:''},
        {n:'Rope Pushdown',s:'3×12',v:''}
      ],
      advanced: [
        {n:'Barbell Bench Press',s:'4×8',v:''},
        {n:'Pull Up',s:'4×8',v:''},
        {n:'Incline Barbell Bench Press',s:'3×10',v:''},
        {n:'Barbell Bent Over Row',s:'4×8',v:''},
        {n:'Dumbbell Shoulder Press',s:'4×10',v:''},
        {n:'Lateral Raise',s:'3×15',v:''},
        {n:'Barbell Curl',s:'3×10',v:''},
        {n:'Skull Crusher',s:'3×10',v:''}
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LOWER BODY
  // ═══════════════════════════════════════════════════════════════════════════
  'Lower Body': {
    male: {
      beginner: [
        {n:'Barbell Squat',s:'3×10',v:''},
        {n:'Leg Press',s:'3×12',v:''},
        {n:'Lying Leg Curl',s:'3×12',v:''},
        {n:'Leg Extension',s:'3×12',v:''},
        {n:'Standing Calf Raise',s:'4×15',v:''}
      ],
      intermediate: [
        {n:'Barbell Squat',s:'4×8',v:''},
        {n:'Romanian Deadlift',s:'4×10',v:''},
        {n:'Leg Press',s:'3×12',v:''},
        {n:'Lying Leg Curl',s:'3×12',v:''},
        {n:'Leg Extension',s:'3×12',v:''},
        {n:'Standing Calf Raise',s:'4×15',v:''},
        {n:'Seated Calf Raise',s:'3×15',v:''}
      ],
      advanced: [
        {n:'Barbell Squat',s:'5×5',v:''},
        {n:'Barbell Front Squat',s:'4×8',v:''},
        {n:'Romanian Deadlift',s:'4×8',v:''},
        {n:'Bulgarian Split Squat',s:'3×10',v:''},
        {n:'Lying Leg Curl',s:'4×12',v:''},
        {n:'Leg Extension',s:'3×15',v:''},
        {n:'Standing Calf Raise',s:'5×15',v:''}
      ]
    },
    female: {
      beginner: [
        {n:'Goblet Squat',s:'3×12',v:''},
        {n:'Leg Press',s:'3×15',v:''},
        {n:'Glute Bridge',s:'3×15',v:''},
        {n:'Lying Leg Curl',s:'3×12',v:''},
        {n:'Hip Abduction',s:'3×15',v:''}
      ],
      intermediate: [
        {n:'Barbell Squat',s:'4×10',v:''},
        {n:'Barbell Hip Thrust',s:'4×12',v:''},
        {n:'Romanian Deadlift',s:'3×10',v:''},
        {n:'Lying Leg Curl',s:'3×12',v:''},
        {n:'Walking Lunge',s:'3×12',v:''},
        {n:'Hip Abduction',s:'3×15',v:''}
      ],
      advanced: [
        {n:'Barbell Squat',s:'4×8',v:''},
        {n:'Barbell Hip Thrust',s:'5×10',v:''},
        {n:'Romanian Deadlift',s:'4×8',v:''},
        {n:'Bulgarian Split Squat',s:'4×10',v:''},
        {n:'Lying Leg Curl',s:'4×12',v:''},
        {n:'Sumo Squat',s:'3×12',v:''},
        {n:'Hip Abduction',s:'4×15',v:''}
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CHEST + BICEPS
  // ═══════════════════════════════════════════════════════════════════════════
  'Chest + Biceps': {
    male: {
      beginner: [
        {n:'Barbell Bench Press',s:'3×10',v:''},
        {n:'Incline Dumbbell Press',s:'3×10',v:''},
        {n:'Dumbbell Fly',s:'3×12',v:''},
        {n:'Barbell Curl',s:'3×12',v:''},
        {n:'Hammer Curl',s:'3×12',v:''}
      ],
      intermediate: [
        {n:'Barbell Bench Press',s:'4×8',v:''},
        {n:'Incline Barbell Bench Press',s:'3×10',v:''},
        {n:'Cable Crossover',s:'3×12',v:''},
        {n:'Pec Deck Fly',s:'3×12',v:''},
        {n:'Barbell Curl',s:'4×10',v:''},
        {n:'Incline Dumbbell Curl',s:'3×12',v:''},
        {n:'Concentration Curl',s:'3×12',v:''}
      ],
      advanced: [
        {n:'Barbell Bench Press',s:'5×5',v:''},
        {n:'Incline Barbell Bench Press',s:'4×8',v:''},
        {n:'Dumbbell Fly',s:'3×12',v:''},
        {n:'Cable Crossover',s:'3×15',v:''},
        {n:'Barbell Curl',s:'4×8',v:''},
        {n:'Spider Curl',s:'4×10',v:''},
        {n:'Incline Dumbbell Curl',s:'3×12',v:''},
        {n:'Hammer Curl',s:'3×12',v:''}
      ]
    },
    female: {
      beginner: [
        {n:'Dumbbell Bench Press',s:'3×12',v:''},
        {n:'Incline Dumbbell Press',s:'3×12',v:''},
        {n:'Dumbbell Fly',s:'3×12',v:''},
        {n:'Dumbbell Curl',s:'3×12',v:''},
        {n:'Hammer Curl',s:'3×15',v:''}
      ],
      intermediate: [
        {n:'Barbell Bench Press',s:'3×10',v:''},
        {n:'Incline Dumbbell Press',s:'3×12',v:''},
        {n:'Pec Deck Fly',s:'3×15',v:''},
        {n:'Barbell Curl',s:'3×12',v:''},
        {n:'Incline Dumbbell Curl',s:'3×12',v:''},
        {n:'Concentration Curl',s:'3×12',v:''}
      ],
      advanced: [
        {n:'Barbell Bench Press',s:'4×8',v:''},
        {n:'Incline Barbell Bench Press',s:'3×10',v:''},
        {n:'Cable Crossover',s:'3×12',v:''},
        {n:'Barbell Curl',s:'4×10',v:''},
        {n:'Spider Curl',s:'3×12',v:''},
        {n:'Hammer Curl',s:'3×12',v:''}
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // BACK + TRICEPS
  // ═══════════════════════════════════════════════════════════════════════════
  'Back + Triceps': {
    male: {
      beginner: [
        {n:'Lat Pulldown',s:'3×10',v:''},
        {n:'Seated Cable Row',s:'3×10',v:''},
        {n:'Dumbbell Row',s:'3×10',v:''},
        {n:'Tricep Pushdown',s:'3×12',v:''},
        {n:'Overhead Tricep Extension',s:'3×12',v:''}
      ],
      intermediate: [
        {n:'Pull Up',s:'4×8',v:''},
        {n:'Barbell Bent Over Row',s:'4×8',v:''},
        {n:'Seated Cable Row',s:'3×10',v:''},
        {n:'Face Pull',s:'3×15',v:''},
        {n:'Skull Crusher',s:'3×10',v:''},
        {n:'Rope Pushdown',s:'3×12',v:''},
        {n:'Overhead Tricep Extension',s:'3×12',v:''}
      ],
      advanced: [
        {n:'Pull Up',s:'5×6',v:''},
        {n:'Barbell Bent Over Row',s:'4×6',v:''},
        {n:'T Bar Row',s:'4×8',v:''},
        {n:'Straight Arm Pulldown',s:'3×12',v:''},
        {n:'Face Pull',s:'3×15',v:''},
        {n:'Close Grip Bench Press',s:'4×8',v:''},
        {n:'Skull Crusher',s:'3×10',v:''},
        {n:'Rope Pushdown',s:'3×12',v:''}
      ]
    },
    female: {
      beginner: [
        {n:'Lat Pulldown',s:'3×12',v:''},
        {n:'Seated Cable Row',s:'3×12',v:''},
        {n:'Face Pull',s:'3×15',v:''},
        {n:'Tricep Pushdown',s:'3×15',v:''},
        {n:'Tricep Kickback',s:'3×15',v:''}
      ],
      intermediate: [
        {n:'Lat Pulldown',s:'4×10',v:''},
        {n:'Dumbbell Row',s:'3×12',v:''},
        {n:'Seated Cable Row',s:'3×10',v:''},
        {n:'Face Pull',s:'3×15',v:''},
        {n:'Rope Pushdown',s:'3×12',v:''},
        {n:'Overhead Tricep Extension',s:'3×12',v:''}
      ],
      advanced: [
        {n:'Pull Up',s:'4×8',v:''},
        {n:'Barbell Bent Over Row',s:'4×8',v:''},
        {n:'Lat Pulldown',s:'3×10',v:''},
        {n:'Face Pull',s:'3×15',v:''},
        {n:'Skull Crusher',s:'3×10',v:''},
        {n:'Rope Pushdown',s:'3×12',v:''}
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SHOULDERS
  // ═══════════════════════════════════════════════════════════════════════════
  'Shoulders': {
    male: {
      beginner: [
        {n:'Dumbbell Shoulder Press',s:'3×10',v:''},
        {n:'Lateral Raise',s:'3×12',v:''},
        {n:'Front Raise',s:'3×12',v:''},
        {n:'Face Pull',s:'3×15',v:''}
      ],
      intermediate: [
        {n:'Barbell Shoulder Press',s:'4×8',v:''},
        {n:'Arnold Press',s:'3×10',v:''},
        {n:'Lateral Raise',s:'4×12',v:''},
        {n:'Rear Delt Fly',s:'3×15',v:''},
        {n:'Face Pull',s:'3×15',v:''},
        {n:'Dumbbell Shrug',s:'3×12',v:''}
      ],
      advanced: [
        {n:'Barbell Shoulder Press',s:'5×5',v:''},
        {n:'Arnold Press',s:'4×10',v:''},
        {n:'Lateral Raise',s:'4×15',v:''},
        {n:'Cable Lateral Raise',s:'3×12',v:''},
        {n:'Reverse Pec Deck Fly',s:'4×12',v:''},
        {n:'Face Pull',s:'3×15',v:''},
        {n:'Barbell Shrug',s:'4×12',v:''}
      ]
    },
    female: {
      beginner: [
        {n:'Dumbbell Shoulder Press',s:'3×12',v:''},
        {n:'Lateral Raise',s:'3×15',v:''},
        {n:'Front Raise',s:'3×12',v:''},
        {n:'Face Pull',s:'3×15',v:''}
      ],
      intermediate: [
        {n:'Arnold Press',s:'4×10',v:''},
        {n:'Lateral Raise',s:'4×12',v:''},
        {n:'Front Raise',s:'3×12',v:''},
        {n:'Rear Delt Fly',s:'3×15',v:''},
        {n:'Face Pull',s:'3×15',v:''}
      ],
      advanced: [
        {n:'Barbell Shoulder Press',s:'4×8',v:''},
        {n:'Arnold Press',s:'3×10',v:''},
        {n:'Lateral Raise',s:'4×15',v:''},
        {n:'Cable Lateral Raise',s:'3×12',v:''},
        {n:'Reverse Pec Deck Fly',s:'3×15',v:''},
        {n:'Face Pull',s:'3×15',v:''}
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ARMS SPECIALIZATION
  // ═══════════════════════════════════════════════════════════════════════════
  'Arms Specialization': {
    male: {
      beginner: [
        {n:'Barbell Curl',s:'3×12',v:''},
        {n:'Hammer Curl',s:'3×12',v:''},
        {n:'Tricep Pushdown',s:'3×12',v:''},
        {n:'Overhead Tricep Extension',s:'3×12',v:''}
      ],
      intermediate: [
        {n:'Barbell Curl',s:'4×10',v:''},
        {n:'Incline Dumbbell Curl',s:'3×12',v:''},
        {n:'Hammer Curl',s:'3×12',v:''},
        {n:'Skull Crusher',s:'4×10',v:''},
        {n:'Rope Pushdown',s:'3×12',v:''},
        {n:'Overhead Tricep Extension',s:'3×12',v:''}
      ],
      advanced: [
        {n:'Barbell Curl',s:'4×8',v:''},
        {n:'Spider Curl',s:'4×10',v:''},
        {n:'Incline Dumbbell Curl',s:'3×12',v:''},
        {n:'Hammer Curl',s:'3×12',v:''},
        {n:'Close Grip Bench Press',s:'4×8',v:''},
        {n:'Skull Crusher',s:'4×10',v:''},
        {n:'Rope Pushdown',s:'3×15',v:''},
        {n:'Overhead Tricep Extension',s:'3×12',v:''}
      ]
    },
    female: {
      beginner: [
        {n:'Dumbbell Curl',s:'3×12',v:''},
        {n:'Hammer Curl',s:'3×12',v:''},
        {n:'Tricep Pushdown',s:'3×15',v:''},
        {n:'Tricep Kickback',s:'3×15',v:''}
      ],
      intermediate: [
        {n:'Barbell Curl',s:'3×12',v:''},
        {n:'Incline Dumbbell Curl',s:'3×12',v:''},
        {n:'Concentration Curl',s:'3×12',v:''},
        {n:'Rope Pushdown',s:'3×12',v:''},
        {n:'Overhead Tricep Extension',s:'3×12',v:''}
      ],
      advanced: [
        {n:'Barbell Curl',s:'4×10',v:''},
        {n:'Spider Curl',s:'3×12',v:''},
        {n:'Hammer Curl',s:'3×12',v:''},
        {n:'Skull Crusher',s:'4×10',v:''},
        {n:'Rope Pushdown',s:'3×12',v:''},
        {n:'Overhead Tricep Extension',s:'3×12',v:''}
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // BODYWEIGHT - UPPER PUSH
  // ═══════════════════════════════════════════════════════════════════════════
  'BW Upper Push': {
    male: {
      beginner: [
        {n:'Push Up',s:'3×10',v:''},
        {n:'Wide Push Up',s:'3×10',v:''},
        {n:'Pike Push Up',s:'3×8',v:''},
        {n:'Diamond Push Up',s:'3×8',v:''},
        {n:'Plank',s:'3×30s',v:''}
      ],
      intermediate: [
        {n:'Push Up',s:'4×15',v:''},
        {n:'Diamond Push Up',s:'4×12',v:''},
        {n:'Pike Push Up',s:'4×10',v:''},
        {n:'Wide Push Up',s:'3×15',v:''},
        {n:'Bench Dip',s:'4×12',v:''},
        {n:'Plank',s:'3×45s',v:''}
      ],
      advanced: [
        {n:'Push Up',s:'5×20',v:''},
        {n:'Diamond Push Up',s:'4×15',v:''},
        {n:'Pike Push Up',s:'4×12',v:''},
        {n:'Chest Dip',s:'4×12',v:''},
        {n:'Bench Dip',s:'4×15',v:''},
        {n:'Side Plank',s:'3×30s',v:''}
      ]
    },
    female: {
      beginner: [
        {n:'Push Up',s:'3×8',v:''},
        {n:'Wide Push Up',s:'3×8',v:''},
        {n:'Pike Push Up',s:'3×6',v:''},
        {n:'Bench Dip',s:'3×10',v:''},
        {n:'Plank',s:'3×20s',v:''}
      ],
      intermediate: [
        {n:'Push Up',s:'4×12',v:''},
        {n:'Diamond Push Up',s:'3×10',v:''},
        {n:'Pike Push Up',s:'4×8',v:''},
        {n:'Wide Push Up',s:'3×12',v:''},
        {n:'Bench Dip',s:'4×12',v:''},
        {n:'Plank',s:'3×45s',v:''}
      ],
      advanced: [
        {n:'Push Up',s:'4×15',v:''},
        {n:'Diamond Push Up',s:'4×12',v:''},
        {n:'Pike Push Up',s:'4×10',v:''},
        {n:'Chest Dip',s:'3×10',v:''},
        {n:'Bench Dip',s:'4×15',v:''},
        {n:'Side Plank',s:'3×30s',v:''}
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // BODYWEIGHT - UPPER PULL
  // ═══════════════════════════════════════════════════════════════════════════
  'BW Upper Pull': {
    male: {
      beginner: [
        {n:'Inverted Row',s:'3×10',v:''},
        {n:'Chin Up',s:'3×5',v:''},
        {n:'Superman',s:'3×12',v:''},
        {n:'Plank',s:'3×30s',v:''}
      ],
      intermediate: [
        {n:'Pull Up',s:'4×8',v:''},
        {n:'Chin Up',s:'4×8',v:''},
        {n:'Inverted Row',s:'4×12',v:''},
        {n:'Superman',s:'3×15',v:''},
        {n:'Plank',s:'3×45s',v:''}
      ],
      advanced: [
        {n:'Pull Up',s:'5×10',v:''},
        {n:'Chin Up',s:'4×10',v:''},
        {n:'Inverted Row',s:'4×15',v:''},
        {n:'Superman',s:'4×15',v:''},
        {n:'Side Plank',s:'3×30s',v:''}
      ]
    },
    female: {
      beginner: [
        {n:'Inverted Row',s:'3×8',v:''},
        {n:'Superman',s:'3×10',v:''},
        {n:'Plank',s:'3×20s',v:''}
      ],
      intermediate: [
        {n:'Inverted Row',s:'4×10',v:''},
        {n:'Chin Up',s:'3×5',v:''},
        {n:'Superman',s:'3×12',v:''},
        {n:'Plank',s:'3×45s',v:''}
      ],
      advanced: [
        {n:'Pull Up',s:'4×8',v:''},
        {n:'Chin Up',s:'4×8',v:''},
        {n:'Inverted Row',s:'4×12',v:''},
        {n:'Superman',s:'4×15',v:''},
        {n:'Side Plank',s:'3×30s',v:''}
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // BODYWEIGHT - LOWER BODY
  // ═══════════════════════════════════════════════════════════════════════════
  'BW Lower Body': {
    male: {
      beginner: [
        {n:'Jump Squat',s:'3×10',v:''},
        {n:'Walking Lunge',s:'3×10',v:''},
        {n:'Glute Bridge',s:'3×12',v:''},
        {n:'Donkey Kick',s:'3×12',v:''},
        {n:'Standing Calf Raise',s:'3×15',v:''}
      ],
      intermediate: [
        {n:'Jump Squat',s:'4×12',v:''},
        {n:'Bulgarian Split Squat',s:'4×10',v:''},
        {n:'Walking Lunge',s:'3×12',v:''},
        {n:'Glute Bridge',s:'4×15',v:''},
        {n:'Fire Hydrant',s:'3×12',v:''},
        {n:'Standing Calf Raise',s:'4×20',v:''}
      ],
      advanced: [
        {n:'Jump Squat',s:'4×15',v:''},
        {n:'Bulgarian Split Squat',s:'4×12',v:''},
        {n:'Walking Lunge',s:'4×15',v:''},
        {n:'Glute Bridge',s:'4×20',v:''},
        {n:'Donkey Kick',s:'4×15',v:''},
        {n:'Fire Hydrant',s:'4×15',v:''},
        {n:'Standing Calf Raise',s:'4×25',v:''}
      ]
    },
    female: {
      beginner: [
        {n:'Jump Squat',s:'3×10',v:''},
        {n:'Walking Lunge',s:'3×10',v:''},
        {n:'Glute Bridge',s:'3×15',v:''},
        {n:'Donkey Kick',s:'3×12',v:''},
        {n:'Fire Hydrant',s:'3×12',v:''}
      ],
      intermediate: [
        {n:'Jump Squat',s:'4×12',v:''},
        {n:'Bulgarian Split Squat',s:'3×10',v:''},
        {n:'Walking Lunge',s:'4×12',v:''},
        {n:'Glute Bridge',s:'4×15',v:''},
        {n:'Donkey Kick',s:'4×15',v:''},
        {n:'Fire Hydrant',s:'4×15',v:''}
      ],
      advanced: [
        {n:'Jump Squat',s:'4×15',v:''},
        {n:'Bulgarian Split Squat',s:'4×12',v:''},
        {n:'Walking Lunge',s:'4×15',v:''},
        {n:'Glute Bridge',s:'5×20',v:''},
        {n:'Donkey Kick',s:'4×15',v:''},
        {n:'Fire Hydrant',s:'4×15',v:''},
        {n:'Standing Calf Raise',s:'4×20',v:''}
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // BODYWEIGHT - LOWER + CORE
  // ═══════════════════════════════════════════════════════════════════════════
  'BW Lower + Core': {
    male: {
      beginner: [
        {n:'Jump Squat',s:'3×10',v:''},
        {n:'Glute Bridge',s:'3×12',v:''},
        {n:'Crunch',s:'3×15',v:''},
        {n:'Plank',s:'3×30s',v:''},
        {n:'Mountain Climber',s:'3×20',v:''}
      ],
      intermediate: [
        {n:'Jump Squat',s:'4×12',v:''},
        {n:'Bulgarian Split Squat',s:'3×10',v:''},
        {n:'Glute Bridge',s:'4×15',v:''},
        {n:'Bicycle Crunch',s:'4×20',v:''},
        {n:'Plank',s:'3×45s',v:''},
        {n:'Mountain Climber',s:'4×30',v:''},
        {n:'Russian Twist',s:'3×20',v:''}
      ],
      advanced: [
        {n:'Jump Squat',s:'4×15',v:''},
        {n:'Bulgarian Split Squat',s:'4×12',v:''},
        {n:'Glute Bridge',s:'4×20',v:''},
        {n:'Hanging Leg Raise',s:'4×12',v:''},
        {n:'Plank',s:'3×60s',v:''},
        {n:'Mountain Climber',s:'4×40',v:''},
        {n:'Russian Twist',s:'4×30',v:''},
        {n:'V Up',s:'3×12',v:''}
      ]
    },
    female: {
      beginner: [
        {n:'Jump Squat',s:'3×10',v:''},
        {n:'Glute Bridge',s:'3×15',v:''},
        {n:'Crunch',s:'3×12',v:''},
        {n:'Plank',s:'3×20s',v:''},
        {n:'Mountain Climber',s:'3×15',v:''}
      ],
      intermediate: [
        {n:'Jump Squat',s:'4×12',v:''},
        {n:'Glute Bridge',s:'4×15',v:''},
        {n:'Donkey Kick',s:'3×12',v:''},
        {n:'Bicycle Crunch',s:'4×20',v:''},
        {n:'Plank',s:'3×45s',v:''},
        {n:'Mountain Climber',s:'4×25',v:''},
        {n:'Russian Twist',s:'3×20',v:''}
      ],
      advanced: [
        {n:'Jump Squat',s:'4×15',v:''},
        {n:'Bulgarian Split Squat',s:'4×10',v:''},
        {n:'Glute Bridge',s:'5×20',v:''},
        {n:'Hanging Leg Raise',s:'3×10',v:''},
        {n:'Plank',s:'3×60s',v:''},
        {n:'Mountain Climber',s:'4×30',v:''},
        {n:'Russian Twist',s:'4×25',v:''},
        {n:'Flutter Kick',s:'3×20',v:''}
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // BODYWEIGHT - FULL BODY
  // ═══════════════════════════════════════════════════════════════════════════
  'BW Full Body': {
    male: {
      beginner: [
        {n:'Burpee',s:'3×8',v:''},
        {n:'Push Up',s:'3×10',v:''},
        {n:'Inverted Row',s:'3×8',v:''},
        {n:'Jump Squat',s:'3×10',v:''},
        {n:'Plank',s:'3×30s',v:''},
        {n:'Mountain Climber',s:'3×20',v:''}
      ],
      intermediate: [
        {n:'Burpee',s:'4×10',v:''},
        {n:'Pull Up',s:'4×8',v:''},
        {n:'Push Up',s:'4×15',v:''},
        {n:'Diamond Push Up',s:'3×12',v:''},
        {n:'Jump Squat',s:'4×12',v:''},
        {n:'Glute Bridge',s:'4×15',v:''},
        {n:'Plank',s:'3×45s',v:''},
        {n:'Mountain Climber',s:'4×30',v:''}
      ],
      advanced: [
        {n:'Burpee',s:'4×15',v:''},
        {n:'Pull Up',s:'5×10',v:''},
        {n:'Chest Dip',s:'4×12',v:''},
        {n:'Diamond Push Up',s:'4×15',v:''},
        {n:'Pike Push Up',s:'4×12',v:''},
        {n:'Jump Squat',s:'4×15',v:''},
        {n:'Bulgarian Split Squat',s:'4×12',v:''},
        {n:'Hanging Leg Raise',s:'4×12',v:''},
        {n:'Mountain Climber',s:'4×40',v:''}
      ]
    },
    female: {
      beginner: [
        {n:'Burpee',s:'3×6',v:''},
        {n:'Push Up',s:'3×8',v:''},
        {n:'Inverted Row',s:'3×8',v:''},
        {n:'Jump Squat',s:'3×10',v:''},
        {n:'Glute Bridge',s:'3×12',v:''},
        {n:'Plank',s:'3×20s',v:''},
        {n:'Mountain Climber',s:'3×15',v:''}
      ],
      intermediate: [
        {n:'Burpee',s:'4×10',v:''},
        {n:'Push Up',s:'4×12',v:''},
        {n:'Inverted Row',s:'4×10',v:''},
        {n:'Diamond Push Up',s:'3×10',v:''},
        {n:'Jump Squat',s:'4×12',v:''},
        {n:'Glute Bridge',s:'4×15',v:''},
        {n:'Plank',s:'3×45s',v:''},
        {n:'Mountain Climber',s:'4×25',v:''}
      ],
      advanced: [
        {n:'Burpee',s:'4×12',v:''},
        {n:'Pull Up',s:'4×8',v:''},
        {n:'Push Up',s:'4×15',v:''},
        {n:'Diamond Push Up',s:'4×12',v:''},
        {n:'Pike Push Up',s:'4×10',v:''},
        {n:'Jump Squat',s:'4×15',v:''},
        {n:'Bulgarian Split Squat',s:'4×10',v:''},
        {n:'Hanging Leg Raise',s:'3×10',v:''},
        {n:'Mountain Climber',s:'4×30',v:''}
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // DUMBBELL - UPPER PUSH
  // ═══════════════════════════════════════════════════════════════════════════
  'DB Upper Push': {
    male: {
      beginner: [
        {n:'Dumbbell Bench Press',s:'3×10',v:''},
        {n:'Incline Dumbbell Press',s:'3×10',v:''},
        {n:'Dumbbell Shoulder Press',s:'3×10',v:''},
        {n:'Lateral Raise',s:'3×12',v:''},
        {n:'Overhead Tricep Extension',s:'3×12',v:''}
      ],
      intermediate: [
        {n:'Dumbbell Bench Press',s:'4×10',v:''},
        {n:'Incline Dumbbell Press',s:'4×10',v:''},
        {n:'Dumbbell Fly',s:'3×12',v:''},
        {n:'Arnold Press',s:'4×10',v:''},
        {n:'Lateral Raise',s:'4×12',v:''},
        {n:'Skull Crusher',s:'3×12',v:''},
        {n:'Tricep Kickback',s:'3×12',v:''}
      ],
      advanced: [
        {n:'Dumbbell Bench Press',s:'5×8',v:''},
        {n:'Incline Dumbbell Press',s:'4×10',v:''},
        {n:'Decline Dumbbell Press',s:'3×10',v:''},
        {n:'Dumbbell Fly',s:'3×12',v:''},
        {n:'Arnold Press',s:'4×10',v:''},
        {n:'Lateral Raise',s:'4×15',v:''},
        {n:'Front Raise',s:'3×12',v:''},
        {n:'Skull Crusher',s:'4×10',v:''},
        {n:'Overhead Tricep Extension',s:'3×12',v:''}
      ]
    },
    female: {
      beginner: [
        {n:'Dumbbell Bench Press',s:'3×12',v:''},
        {n:'Incline Dumbbell Press',s:'3×12',v:''},
        {n:'Dumbbell Shoulder Press',s:'3×12',v:''},
        {n:'Lateral Raise',s:'3×15',v:''},
        {n:'Tricep Kickback',s:'3×15',v:''}
      ],
      intermediate: [
        {n:'Dumbbell Bench Press',s:'4×10',v:''},
        {n:'Incline Dumbbell Press',s:'3×12',v:''},
        {n:'Dumbbell Fly',s:'3×12',v:''},
        {n:'Arnold Press',s:'3×12',v:''},
        {n:'Lateral Raise',s:'4×12',v:''},
        {n:'Overhead Tricep Extension',s:'3×12',v:''}
      ],
      advanced: [
        {n:'Dumbbell Bench Press',s:'4×10',v:''},
        {n:'Incline Dumbbell Press',s:'4×10',v:''},
        {n:'Incline Dumbbell Fly',s:'3×12',v:''},
        {n:'Arnold Press',s:'4×10',v:''},
        {n:'Lateral Raise',s:'4×15',v:''},
        {n:'Front Raise',s:'3×12',v:''},
        {n:'Skull Crusher',s:'3×10',v:''},
        {n:'Tricep Kickback',s:'3×12',v:''}
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // DUMBBELL - UPPER PULL
  // ═══════════════════════════════════════════════════════════════════════════
  'DB Upper Pull': {
    male: {
      beginner: [
        {n:'Dumbbell Row',s:'3×10',v:''},
        {n:'Dumbbell Curl',s:'3×12',v:''},
        {n:'Hammer Curl',s:'3×12',v:''},
        {n:'Dumbbell Shrug',s:'3×12',v:''},
        {n:'Superman',s:'3×12',v:''}
      ],
      intermediate: [
        {n:'Dumbbell Row',s:'4×10',v:''},
        {n:'Chest Supported Row',s:'3×10',v:''},
        {n:'Dumbbell Curl',s:'4×10',v:''},
        {n:'Incline Dumbbell Curl',s:'3×12',v:''},
        {n:'Hammer Curl',s:'3×12',v:''},
        {n:'Dumbbell Shrug',s:'4×12',v:''},
        {n:'Rear Delt Fly',s:'3×15',v:''}
      ],
      advanced: [
        {n:'Dumbbell Row',s:'5×8',v:''},
        {n:'Chest Supported Row',s:'4×10',v:''},
        {n:'Dumbbell Curl',s:'4×10',v:''},
        {n:'Incline Dumbbell Curl',s:'4×10',v:''},
        {n:'Concentration Curl',s:'3×12',v:''},
        {n:'Hammer Curl',s:'3×12',v:''},
        {n:'Dumbbell Shrug',s:'4×15',v:''},
        {n:'Rear Delt Fly',s:'4×12',v:''}
      ]
    },
    female: {
      beginner: [
        {n:'Dumbbell Row',s:'3×12',v:''},
        {n:'Dumbbell Curl',s:'3×12',v:''},
        {n:'Hammer Curl',s:'3×12',v:''},
        {n:'Superman',s:'3×12',v:''}
      ],
      intermediate: [
        {n:'Dumbbell Row',s:'4×10',v:''},
        {n:'Chest Supported Row',s:'3×10',v:''},
        {n:'Dumbbell Curl',s:'3×12',v:''},
        {n:'Hammer Curl',s:'3×12',v:''},
        {n:'Rear Delt Fly',s:'3×15',v:''},
        {n:'Superman',s:'3×15',v:''}
      ],
      advanced: [
        {n:'Dumbbell Row',s:'4×10',v:''},
        {n:'Chest Supported Row',s:'4×10',v:''},
        {n:'Dumbbell Curl',s:'4×10',v:''},
        {n:'Incline Dumbbell Curl',s:'3×12',v:''},
        {n:'Concentration Curl',s:'3×12',v:''},
        {n:'Rear Delt Fly',s:'4×12',v:''},
        {n:'Dumbbell Shrug',s:'3×15',v:''}
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // DUMBBELL - LOWER BODY
  // ═══════════════════════════════════════════════════════════════════════════
  'DB Lower Body': {
    male: {
      beginner: [
        {n:'Goblet Squat',s:'3×12',v:''},
        {n:'Walking Lunge',s:'3×10',v:''},
        {n:'Dumbbell Stiff Leg Deadlift',s:'3×12',v:''},
        {n:'Glute Bridge',s:'3×15',v:''},
        {n:'Standing Calf Raise',s:'3×15',v:''}
      ],
      intermediate: [
        {n:'Goblet Squat',s:'4×12',v:''},
        {n:'Bulgarian Split Squat',s:'4×10',v:''},
        {n:'Dumbbell Stiff Leg Deadlift',s:'4×10',v:''},
        {n:'Walking Lunge',s:'3×12',v:''},
        {n:'Sumo Squat',s:'3×12',v:''},
        {n:'Glute Bridge',s:'4×15',v:''},
        {n:'Standing Calf Raise',s:'4×15',v:''}
      ],
      advanced: [
        {n:'Goblet Squat',s:'4×15',v:''},
        {n:'Bulgarian Split Squat',s:'4×12',v:''},
        {n:'Dumbbell Stiff Leg Deadlift',s:'4×10',v:''},
        {n:'Single Leg Deadlift',s:'3×10',v:''},
        {n:'Walking Lunge',s:'4×12',v:''},
        {n:'Sumo Squat',s:'4×12',v:''},
        {n:'Step Up',s:'3×12',v:''},
        {n:'Standing Calf Raise',s:'4×20',v:''}
      ]
    },
    female: {
      beginner: [
        {n:'Goblet Squat',s:'3×12',v:''},
        {n:'Walking Lunge',s:'3×10',v:''},
        {n:'Glute Bridge',s:'3×15',v:''},
        {n:'Donkey Kick',s:'3×12',v:''},
        {n:'Fire Hydrant',s:'3×12',v:''}
      ],
      intermediate: [
        {n:'Goblet Squat',s:'4×12',v:''},
        {n:'Bulgarian Split Squat',s:'3×10',v:''},
        {n:'Dumbbell Stiff Leg Deadlift',s:'3×12',v:''},
        {n:'Sumo Squat',s:'4×12',v:''},
        {n:'Glute Bridge',s:'4×15',v:''},
        {n:'Donkey Kick',s:'4×15',v:''},
        {n:'Fire Hydrant',s:'4×15',v:''}
      ],
      advanced: [
        {n:'Goblet Squat',s:'4×15',v:''},
        {n:'Bulgarian Split Squat',s:'4×12',v:''},
        {n:'Dumbbell Stiff Leg Deadlift',s:'4×10',v:''},
        {n:'Single Leg Deadlift',s:'3×10',v:''},
        {n:'Sumo Squat',s:'4×12',v:''},
        {n:'Walking Lunge',s:'4×12',v:''},
        {n:'Glute Bridge',s:'4×20',v:''},
        {n:'Step Up',s:'3×12',v:''}
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // DUMBBELL - FULL BODY
  // ═══════════════════════════════════════════════════════════════════════════
  'DB Full Body': {
    male: {
      beginner: [
        {n:'Goblet Squat',s:'3×10',v:''},
        {n:'Dumbbell Bench Press',s:'3×10',v:''},
        {n:'Dumbbell Row',s:'3×10',v:''},
        {n:'Dumbbell Shoulder Press',s:'3×10',v:''},
        {n:'Dumbbell Curl',s:'3×12',v:''},
        {n:'Overhead Tricep Extension',s:'3×12',v:''},
        {n:'Plank',s:'3×30s',v:''}
      ],
      intermediate: [
        {n:'Goblet Squat',s:'4×12',v:''},
        {n:'Bulgarian Split Squat',s:'3×10',v:''},
        {n:'Dumbbell Bench Press',s:'4×10',v:''},
        {n:'Dumbbell Row',s:'4×10',v:''},
        {n:'Arnold Press',s:'3×12',v:''},
        {n:'Lateral Raise',s:'3×12',v:''},
        {n:'Dumbbell Curl',s:'3×12',v:''},
        {n:'Skull Crusher',s:'3×12',v:''},
        {n:'Crunch',s:'3×15',v:''}
      ],
      advanced: [
        {n:'Goblet Squat',s:'4×15',v:''},
        {n:'Bulgarian Split Squat',s:'4×10',v:''},
        {n:'Dumbbell Stiff Leg Deadlift',s:'4×10',v:''},
        {n:'Dumbbell Bench Press',s:'4×10',v:''},
        {n:'Incline Dumbbell Press',s:'3×10',v:''},
        {n:'Dumbbell Row',s:'4×10',v:''},
        {n:'Arnold Press',s:'4×10',v:''},
        {n:'Lateral Raise',s:'3×15',v:''},
        {n:'Hammer Curl',s:'3×12',v:''},
        {n:'Skull Crusher',s:'3×12',v:''},
        {n:'Russian Twist',s:'3×20',v:''}
      ]
    },
    female: {
      beginner: [
        {n:'Goblet Squat',s:'3×12',v:''},
        {n:'Glute Bridge',s:'3×15',v:''},
        {n:'Dumbbell Bench Press',s:'3×12',v:''},
        {n:'Dumbbell Row',s:'3×12',v:''},
        {n:'Dumbbell Shoulder Press',s:'3×12',v:''},
        {n:'Dumbbell Curl',s:'3×12',v:''},
        {n:'Plank',s:'3×20s',v:''}
      ],
      intermediate: [
        {n:'Goblet Squat',s:'4×12',v:''},
        {n:'Sumo Squat',s:'3×12',v:''},
        {n:'Glute Bridge',s:'4×15',v:''},
        {n:'Dumbbell Bench Press',s:'3×12',v:''},
        {n:'Dumbbell Row',s:'4×10',v:''},
        {n:'Arnold Press',s:'3×12',v:''},
        {n:'Lateral Raise',s:'3×15',v:''},
        {n:'Hammer Curl',s:'3×12',v:''},
        {n:'Crunch',s:'3×15',v:''}
      ],
      advanced: [
        {n:'Goblet Squat',s:'4×15',v:''},
        {n:'Bulgarian Split Squat',s:'4×10',v:''},
        {n:'Dumbbell Stiff Leg Deadlift',s:'3×10',v:''},
        {n:'Sumo Squat',s:'4×12',v:''},
        {n:'Dumbbell Bench Press',s:'4×10',v:''},
        {n:'Incline Dumbbell Press',s:'3×12',v:''},
        {n:'Dumbbell Row',s:'4×10',v:''},
        {n:'Arnold Press',s:'3×12',v:''},
        {n:'Lateral Raise',s:'4×15',v:''},
        {n:'Dumbbell Curl',s:'3×12',v:''},
        {n:'Tricep Kickback',s:'3×12',v:''},
        {n:'Russian Twist',s:'3×20',v:''}
      ]
    }
  }
};
