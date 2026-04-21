export interface ProgramDay {
  name: string;
  focus: string;
  rest: boolean;
}

export interface Program {
  name: string;
  emoji: string;
  days: ProgramDay[];
}

export interface ProgramExercise {
  n: string; // name
  s: string; // sets x reps
  v: string; // video id (placeholder)
}

export const PROGRAMS: Record<string, Program> = {
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

// Exercises keyed by [focus][gender][level]
export const EXERCISE_PROGRAMS: Record<string, Record<string, Record<string, ProgramExercise[]>>> = {
  'Push': {
    male: {
      beginner: [{n:'Flat Barbell Bench Press',s:'4×8',v:'dQw4w9WgXcW'},{n:'Incline Dumbbell Press',s:'3×10',v:'dQw4w9WgXcW'},{n:'Overhead Press (Smith)',s:'3×10',v:'dQw4w9WgXcW'},{n:'Lateral Raises',s:'3×12',v:'dQw4w9WgXcW'},{n:'Tricep Pushdown',s:'3×12',v:'dQw4w9WgXcW'}],
      intermediate: [{n:'Incline Barbell Bench Press',s:'4×10',v:'dQw4w9WgXcW'},{n:'Cable Fly',s:'3×12',v:'dQw4w9WgXcW'},{n:'Seated DB Shoulder Press',s:'4×10',v:'dQw4w9WgXcW'},{n:'Arnold Press',s:'3×12',v:'dQw4w9WgXcW'},{n:'Skull Crushers',s:'3×12',v:'dQw4w9WgXcW'},{n:'Tricep Dips',s:'3×10',v:'dQw4w9WgXcW'}],
      advanced: [{n:'Competition Bench Press',s:'5×5',v:'dQw4w9WgXcW'},{n:'Weighted Dips',s:'4×8',v:'dQw4w9WgXcW'},{n:'Standing Military Press',s:'4×6',v:'dQw4w9WgXcW'},{n:'Lateral Raise Drop Sets',s:'4×15',v:'dQw4w9WgXcW'},{n:'Close-Grip Bench Press',s:'4×8',v:'dQw4w9WgXcW'},{n:'Overhead Tricep Extension',s:'3×12',v:'dQw4w9WgXcW'}]
    },
    female: {
      beginner: [{n:'Smith Machine Bench Press',s:'3×12',v:'dQw4w9WgXcW'},{n:'Incline DB Fly',s:'3×12',v:'dQw4w9WgXcW'},{n:'Dumbbell Shoulder Press',s:'3×12',v:'dQw4w9WgXcW'},{n:'Lateral Raises',s:'3×15',v:'dQw4w9WgXcW'},{n:'Tricep Kickbacks',s:'3×15',v:'dQw4w9WgXcW'}],
      intermediate: [{n:'Incline Cable Press',s:'4×12',v:'dQw4w9WgXcW'},{n:'Pec Deck Fly',s:'3×15',v:'dQw4w9WgXcW'},{n:'Arnold Press',s:'3×12',v:'dQw4w9WgXcW'},{n:'Cable Lateral Raise',s:'3×15',v:'dQw4w9WgXcW'},{n:'Overhead Tricep Extension',s:'3×12',v:'dQw4w9WgXcW'}],
      advanced: [{n:'Barbell Bench Press',s:'4×8',v:'dQw4w9WgXcW'},{n:'Weighted Push-Ups',s:'4×10',v:'dQw4w9WgXcW'},{n:'Seated Military Press',s:'4×8',v:'dQw4w9WgXcW'},{n:'Giant Set Lateral Raises',s:'4×20',v:'dQw4w9WgXcW'},{n:'Skull Crushers',s:'4×10',v:'dQw4w9WgXcW'}]
    }
  },
  'Pull': {
    male: {
      beginner: [{n:'Lat Pulldown',s:'4×10',v:'dQw4w9WgXcW'},{n:'Seated Cable Row',s:'3×10',v:'dQw4w9WgXcW'},{n:'Dumbbell Bicep Curl',s:'3×12',v:'dQw4w9WgXcW'},{n:'Face Pulls',s:'3×15',v:'dQw4w9WgXcW'}],
      intermediate: [{n:'Pull-Ups',s:'4×8',v:'dQw4w9WgXcW'},{n:'Barbell Row',s:'4×8',v:'dQw4w9WgXcW'},{n:'Incline DB Curl',s:'3×12',v:'dQw4w9WgXcW'},{n:'Reverse Fly',s:'3×15',v:'dQw4w9WgXcW'},{n:'Hammer Curl',s:'3×12',v:'dQw4w9WgXcW'}],
      advanced: [{n:'Weighted Pull-Ups',s:'5×6',v:'dQw4w9WgXcW'},{n:'Pendlay Row',s:'4×6',v:'dQw4w9WgXcW'},{n:'Chest-Supported Row',s:'4×8',v:'dQw4w9WgXcW'},{n:'Spider Curls',s:'4×10',v:'dQw4w9WgXcW'},{n:'Bayesian Cable Curl',s:'3×12',v:'dQw4w9WgXcW'}]
    },
    female: {
      beginner: [{n:'Assisted Pull-Up Machine',s:'3×10',v:'dQw4w9WgXcW'},{n:'Seated Row',s:'3×12',v:'dQw4w9WgXcW'},{n:'DB Curl',s:'3×12',v:'dQw4w9WgXcW'},{n:'Rear Delt Fly',s:'3×15',v:'dQw4w9WgXcW'}],
      intermediate: [{n:'Lat Pulldown',s:'4×12',v:'dQw4w9WgXcW'},{n:'Cable Row',s:'4×12',v:'dQw4w9WgXcW'},{n:'Incline Curl',s:'3×12',v:'dQw4w9WgXcW'},{n:'Face Pulls',s:'3×15',v:'dQw4w9WgXcW'}],
      advanced: [{n:'Pull-Ups',s:'4×8',v:'dQw4w9WgXcW'},{n:'Barbell Row',s:'4×8',v:'dQw4w9WgXcW'},{n:'Concentration Curl',s:'4×10',v:'dQw4w9WgXcW'},{n:'Reverse Pec Deck',s:'3×15',v:'dQw4w9WgXcW'}]
    }
  },
  'Legs': {
    male: {
      beginner: [{n:'Barbell Back Squat',s:'4×8',v:'dQw4w9WgXcW'},{n:'Leg Press',s:'3×12',v:'dQw4w9WgXcW'},{n:'Leg Curl',s:'3×12',v:'dQw4w9WgXcW'},{n:'Calf Raises',s:'4×20',v:'dQw4w9WgXcW'}],
      intermediate: [{n:'Front Squat',s:'4×8',v:'dQw4w9WgXcW'},{n:'Romanian Deadlift',s:'4×10',v:'dQw4w9WgXcW'},{n:'Walking Lunges',s:'3×12',v:'dQw4w9WgXcW'},{n:'Hack Squat',s:'3×10',v:'dQw4w9WgXcW'},{n:'Seated Calf Raise',s:'4×20',v:'dQw4w9WgXcW'}],
      advanced: [{n:'Competition Squat',s:'5×5',v:'dQw4w9WgXcW'},{n:'Bulgarian Split Squat',s:'4×8',v:'dQw4w9WgXcW'},{n:'Stiff-Leg Deadlift',s:'4×8',v:'dQw4w9WgXcW'},{n:'Leg Press Drop Set',s:'4×15',v:'dQw4w9WgXcW'},{n:'Standing Calf Raise',s:'5×20',v:'dQw4w9WgXcW'}]
    },
    female: {
      beginner: [{n:'Smith Machine Squat',s:'4×12',v:'dQw4w9WgXcW'},{n:'Leg Press',s:'3×15',v:'dQw4w9WgXcW'},{n:'Hip Abduction Machine',s:'3×15',v:'dQw4w9WgXcW'},{n:'Calf Raises',s:'4×20',v:'dQw4w9WgXcW'}],
      intermediate: [{n:'Barbell Hip Thrust',s:'4×12',v:'dQw4w9WgXcW'},{n:'Single-Leg RDL',s:'3×10',v:'dQw4w9WgXcW'},{n:'Sumo Squat',s:'4×12',v:'dQw4w9WgXcW'},{n:'Cable Kickback',s:'3×15',v:'dQw4w9WgXcW'},{n:'Seated Leg Curl',s:'3×15',v:'dQw4w9WgXcW'}],
      advanced: [{n:'Barbell Hip Thrust',s:'5×10',v:'dQw4w9WgXcW'},{n:'Bulgarian Split Squat',s:'4×10',v:'dQw4w9WgXcW'},{n:'Romanian Deadlift',s:'4×8',v:'dQw4w9WgXcW'},{n:'Walking Lunge Drop Set',s:'4×20',v:'dQw4w9WgXcW'},{n:'Hip Abduction',s:'4×20',v:'dQw4w9WgXcW'}]
    }
  },
  'Upper Body': {
    male: {
      beginner: [{n:'Bench Press',s:'4×8',v:'dQw4w9WgXcW'},{n:'Lat Pulldown',s:'4×10',v:'dQw4w9WgXcW'},{n:'DB Shoulder Press',s:'3×10',v:'dQw4w9WgXcW'},{n:'Barbell Curl',s:'3×12',v:'dQw4w9WgXcW'},{n:'Tricep Pushdown',s:'3×12',v:'dQw4w9WgXcW'}],
      intermediate: [{n:'Incline Bench Press',s:'4×10',v:'dQw4w9WgXcW'},{n:'Pull-Ups',s:'4×8',v:'dQw4w9WgXcW'},{n:'Arnold Press',s:'3×12',v:'dQw4w9WgXcW'},{n:'Preacher Curl',s:'3×12',v:'dQw4w9WgXcW'},{n:'Tricep Dips',s:'3×10',v:'dQw4w9WgXcW'}],
      advanced: [{n:'Competition Bench Press',s:'5×5',v:'dQw4w9WgXcW'},{n:'Weighted Pull-Ups',s:'4×6',v:'dQw4w9WgXcW'},{n:'Military Press',s:'4×6',v:'dQw4w9WgXcW'},{n:'Spider Curls',s:'4×10',v:'dQw4w9WgXcW'},{n:'Close-Grip Bench Press',s:'4×8',v:'dQw4w9WgXcW'}]
    },
    female: {
      beginner: [{n:'DB Bench Press',s:'3×12',v:'dQw4w9WgXcW'},{n:'Seated Row',s:'3×12',v:'dQw4w9WgXcW'},{n:'DB Shoulder Press',s:'3×12',v:'dQw4w9WgXcW'},{n:'DB Curl',s:'3×12',v:'dQw4w9WgXcW'},{n:'Tricep Kickbacks',s:'3×15',v:'dQw4w9WgXcW'}],
      intermediate: [{n:'Incline DB Press',s:'4×12',v:'dQw4w9WgXcW'},{n:'Lat Pulldown',s:'4×12',v:'dQw4w9WgXcW'},{n:'Arnold Press',s:'3×12',v:'dQw4w9WgXcW'},{n:'Hammer Curl',s:'3×12',v:'dQw4w9WgXcW'},{n:'Overhead Extension',s:'3×12',v:'dQw4w9WgXcW'}],
      advanced: [{n:'Barbell Bench Press',s:'4×8',v:'dQw4w9WgXcW'},{n:'Pull-Ups',s:'4×8',v:'dQw4w9WgXcW'},{n:'Military Press',s:'4×8',v:'dQw4w9WgXcW'},{n:'Concentration Curl',s:'4×10',v:'dQw4w9WgXcW'},{n:'Skull Crushers',s:'4×10',v:'dQw4w9WgXcW'}]
    }
  },
  'Lower Body': {
    male: {
      beginner: [{n:'Barbell Squat',s:'4×8',v:'dQw4w9WgXcW'},{n:'Leg Press',s:'3×12',v:'dQw4w9WgXcW'},{n:'Leg Curl',s:'3×12',v:'dQw4w9WgXcW'},{n:'Calf Raises',s:'4×20',v:'dQw4w9WgXcW'}],
      intermediate: [{n:'Front Squat',s:'4×8',v:'dQw4w9WgXcW'},{n:'Romanian Deadlift',s:'4×10',v:'dQw4w9WgXcW'},{n:'Hack Squat',s:'3×10',v:'dQw4w9WgXcW'},{n:'Leg Curl',s:'3×12',v:'dQw4w9WgXcW'},{n:'Standing Calf Raise',s:'4×20',v:'dQw4w9WgXcW'}],
      advanced: [{n:'Competition Squat',s:'5×5',v:'dQw4w9WgXcW'},{n:'Bulgarian Split Squat',s:'4×8',v:'dQw4w9WgXcW'},{n:'Stiff-Leg Deadlift',s:'4×8',v:'dQw4w9WgXcW'},{n:'Leg Press Drop Set',s:'4×15',v:'dQw4w9WgXcW'},{n:'Tibialis Raise',s:'3×20',v:'dQw4w9WgXcW'}]
    },
    female: {
      beginner: [{n:'Smith Machine Squat',s:'4×12',v:'dQw4w9WgXcW'},{n:'Leg Press',s:'3×15',v:'dQw4w9WgXcW'},{n:'Hip Abduction',s:'3×15',v:'dQw4w9WgXcW'},{n:'Glute Bridge',s:'3×15',v:'dQw4w9WgXcW'}],
      intermediate: [{n:'Barbell Hip Thrust',s:'4×12',v:'dQw4w9WgXcW'},{n:'Sumo Squat',s:'4×12',v:'dQw4w9WgXcW'},{n:'Cable Kickback',s:'3×15',v:'dQw4w9WgXcW'},{n:'Single-Leg RDL',s:'3×10',v:'dQw4w9WgXcW'},{n:'Seated Leg Curl',s:'3×15',v:'dQw4w9WgXcW'}],
      advanced: [{n:'Barbell Hip Thrust Heavy',s:'5×8',v:'dQw4w9WgXcW'},{n:'Bulgarian Split Squat',s:'4×10',v:'dQw4w9WgXcW'},{n:'Romanian Deadlift',s:'4×8',v:'dQw4w9WgXcW'},{n:'Hip Abduction Drop Set',s:'4×20',v:'dQw4w9WgXcW'},{n:'Walking Lunge',s:'3×20',v:'dQw4w9WgXcW'}]
    }
  },
  'Chest + Biceps': {
    male: {
      beginner: [{n:'Flat Bench Press',s:'4×8',v:'dQw4w9WgXcW'},{n:'Incline DB Press',s:'3×10',v:'dQw4w9WgXcW'},{n:'Cable Fly',s:'3×12',v:'dQw4w9WgXcW'},{n:'Barbell Curl',s:'3×12',v:'dQw4w9WgXcW'},{n:'Hammer Curl',s:'3×12',v:'dQw4w9WgXcW'}],
      intermediate: [{n:'Incline Barbell Press',s:'4×8',v:'dQw4w9WgXcW'},{n:'Pec Deck',s:'3×12',v:'dQw4w9WgXcW'},{n:'Push-Up Superset',s:'3×20',v:'dQw4w9WgXcW'},{n:'Preacher Curl',s:'4×10',v:'dQw4w9WgXcW'},{n:'Incline DB Curl',s:'3×12',v:'dQw4w9WgXcW'}],
      advanced: [{n:'Competition Bench',s:'5×5',v:'dQw4w9WgXcW'},{n:'Weighted Dips',s:'4×8',v:'dQw4w9WgXcW'},{n:'Low-to-High Cable Fly',s:'4×12',v:'dQw4w9WgXcW'},{n:'Spider Curls',s:'4×10',v:'dQw4w9WgXcW'},{n:'Bayesian Curl',s:'3×12',v:'dQw4w9WgXcW'}]
    },
    female: {
      beginner: [{n:'Smith Bench Press',s:'3×12',v:'dQw4w9WgXcW'},{n:'DB Fly',s:'3×12',v:'dQw4w9WgXcW'},{n:'Push-Ups',s:'3×10',v:'dQw4w9WgXcW'},{n:'DB Curl',s:'3×12',v:'dQw4w9WgXcW'},{n:'Rope Hammer Curl',s:'3×15',v:'dQw4w9WgXcW'}],
      intermediate: [{n:'Incline DB Press',s:'4×12',v:'dQw4w9WgXcW'},{n:'Cable Fly',s:'3×15',v:'dQw4w9WgXcW'},{n:'Incline Curl',s:'3×12',v:'dQw4w9WgXcW'},{n:'Preacher Curl',s:'3×12',v:'dQw4w9WgXcW'}],
      advanced: [{n:'Barbell Bench',s:'4×8',v:'dQw4w9WgXcW'},{n:'Low Cable Fly',s:'4×12',v:'dQw4w9WgXcW'},{n:'Concentration Curl',s:'4×10',v:'dQw4w9WgXcW'},{n:'Cable Curl',s:'3×15',v:'dQw4w9WgXcW'}]
    }
  },
  'Back + Triceps': {
    male: {
      beginner: [{n:'Lat Pulldown',s:'4×10',v:'dQw4w9WgXcW'},{n:'Seated Row',s:'3×10',v:'dQw4w9WgXcW'},{n:'Tricep Pushdown',s:'3×12',v:'dQw4w9WgXcW'},{n:'Overhead Extension',s:'3×12',v:'dQw4w9WgXcW'}],
      intermediate: [{n:'Pull-Ups',s:'4×8',v:'dQw4w9WgXcW'},{n:'Barbell Row',s:'4×8',v:'dQw4w9WgXcW'},{n:'Skull Crushers',s:'3×10',v:'dQw4w9WgXcW'},{n:'Tricep Dips',s:'3×10',v:'dQw4w9WgXcW'},{n:'Face Pulls',s:'3×15',v:'dQw4w9WgXcW'}],
      advanced: [{n:'Weighted Pull-Ups',s:'5×6',v:'dQw4w9WgXcW'},{n:'Pendlay Row',s:'4×6',v:'dQw4w9WgXcW'},{n:'Close-Grip Bench',s:'4×8',v:'dQw4w9WgXcW'},{n:'Overhead Tricep Extension',s:'3×12',v:'dQw4w9WgXcW'},{n:'Reverse Fly',s:'3×15',v:'dQw4w9WgXcW'}]
    },
    female: {
      beginner: [{n:'Assisted Pull-Up',s:'3×10',v:'dQw4w9WgXcW'},{n:'Cable Row',s:'3×12',v:'dQw4w9WgXcW'},{n:'Tricep Pushdown',s:'3×15',v:'dQw4w9WgXcW'},{n:'Tricep Kickbacks',s:'3×15',v:'dQw4w9WgXcW'}],
      intermediate: [{n:'Lat Pulldown',s:'4×12',v:'dQw4w9WgXcW'},{n:'One-Arm DB Row',s:'3×12',v:'dQw4w9WgXcW'},{n:'Overhead Extension',s:'3×12',v:'dQw4w9WgXcW'},{n:'Face Pulls',s:'3×15',v:'dQw4w9WgXcW'}],
      advanced: [{n:'Pull-Ups',s:'4×8',v:'dQw4w9WgXcW'},{n:'Barbell Row',s:'4×8',v:'dQw4w9WgXcW'},{n:'Skull Crushers',s:'4×10',v:'dQw4w9WgXcW'},{n:'Reverse Pec Deck',s:'3×15',v:'dQw4w9WgXcW'}]
    }
  },
  'Shoulders': {
    male: {
      beginner: [{n:'Overhead Press',s:'4×10',v:'dQw4w9WgXcW'},{n:'Lateral Raises',s:'3×15',v:'dQw4w9WgXcW'},{n:'Front Raises',s:'3×12',v:'dQw4w9WgXcW'},{n:'Rear Delt Fly',s:'3×15',v:'dQw4w9WgXcW'}],
      intermediate: [{n:'Seated DB Press',s:'4×10',v:'dQw4w9WgXcW'},{n:'Arnold Press',s:'3×12',v:'dQw4w9WgXcW'},{n:'Cable Lateral Raise',s:'3×15',v:'dQw4w9WgXcW'},{n:'Upright Row',s:'3×12',v:'dQw4w9WgXcW'},{n:'Face Pulls',s:'3×15',v:'dQw4w9WgXcW'}],
      advanced: [{n:'Military Press',s:'5×5',v:'dQw4w9WgXcW'},{n:'Push Press',s:'4×6',v:'dQw4w9WgXcW'},{n:'Lateral Raise Drop Set',s:'4×20',v:'dQw4w9WgXcW'},{n:'Reverse Pec Deck',s:'4×15',v:'dQw4w9WgXcW'},{n:'Shrugs',s:'4×15',v:'dQw4w9WgXcW'}]
    },
    female: {
      beginner: [{n:'DB Shoulder Press',s:'3×12',v:'dQw4w9WgXcW'},{n:'Lateral Raises',s:'3×15',v:'dQw4w9WgXcW'},{n:'Front Raises',s:'3×12',v:'dQw4w9WgXcW'},{n:'Rear Delt Fly',s:'3×15',v:'dQw4w9WgXcW'}],
      intermediate: [{n:'Arnold Press',s:'4×12',v:'dQw4w9WgXcW'},{n:'Cable Lateral Raise',s:'3×15',v:'dQw4w9WgXcW'},{n:'Face Pulls',s:'3×15',v:'dQw4w9WgXcW'},{n:'Upright Row',s:'3×12',v:'dQw4w9WgXcW'}],
      advanced: [{n:'Seated Military Press',s:'4×8',v:'dQw4w9WgXcW'},{n:'Giant Set Laterals',s:'4×20',v:'dQw4w9WgXcW'},{n:'Reverse Pec Deck',s:'4×15',v:'dQw4w9WgXcW'},{n:'Cable Front Raise',s:'3×12',v:'dQw4w9WgXcW'}]
    }
  },
  'Arms Specialization': {
    male: {
      beginner: [{n:'Barbell Curl',s:'4×12',v:'dQw4w9WgXcW'},{n:'Hammer Curl',s:'3×12',v:'dQw4w9WgXcW'},{n:'Tricep Pushdown',s:'4×12',v:'dQw4w9WgXcW'},{n:'Tricep Dips',s:'3×10',v:'dQw4w9WgXcW'}],
      intermediate: [{n:'Preacher Curl',s:'4×10',v:'dQw4w9WgXcW'},{n:'Incline DB Curl',s:'3×12',v:'dQw4w9WgXcW'},{n:'Skull Crushers',s:'4×10',v:'dQw4w9WgXcW'},{n:'Overhead Extension',s:'3×12',v:'dQw4w9WgXcW'},{n:'Concentration Curl',s:'3×12',v:'dQw4w9WgXcW'}],
      advanced: [{n:'Spider Curls',s:'4×10',v:'dQw4w9WgXcW'},{n:'Bayesian Curl',s:'4×12',v:'dQw4w9WgXcW'},{n:'Close-Grip Bench',s:'4×8',v:'dQw4w9WgXcW'},{n:'Overhead Extension Drop Set',s:'4×15',v:'dQw4w9WgXcW'},{n:'Supinated Cable Curl',s:'3×15',v:'dQw4w9WgXcW'}]
    },
    female: {
      beginner: [{n:'DB Curl',s:'3×15',v:'dQw4w9WgXcW'},{n:'Hammer Curl',s:'3×15',v:'dQw4w9WgXcW'},{n:'Tricep Kickbacks',s:'3×15',v:'dQw4w9WgXcW'},{n:'Overhead Extension',s:'3×12',v:'dQw4w9WgXcW'}],
      intermediate: [{n:'Cable Curl',s:'4×12',v:'dQw4w9WgXcW'},{n:'Incline Curl',s:'3×12',v:'dQw4w9WgXcW'},{n:'Pushdown',s:'4×12',v:'dQw4w9WgXcW'},{n:'Dips (assisted)',s:'3×10',v:'dQw4w9WgXcW'}],
      advanced: [{n:'Preacher Curl',s:'4×10',v:'dQw4w9WgXcW'},{n:'Bayesian Curl',s:'4×12',v:'dQw4w9WgXcW'},{n:'Skull Crushers',s:'4×10',v:'dQw4w9WgXcW'},{n:'Tricep Dips',s:'4×10',v:'dQw4w9WgXcW'}]
    }
  }
};
