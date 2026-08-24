'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from 'react';
import { SessionProvider, useSession } from 'next-auth/react';

// ──────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────

interface WizardState {
  split: string | null;
  level: string | null;
  goal: string | null;
  equip: string | null;
}

interface Profile {
  name?: string;
  weight?: number;
  height?: number;
  age?: number;
  goal?: string;
}

/** Full food log entry stored in state and localStorage. */
export interface FoodLogItem {
  /** Food catalog id (non-unique in the log) */
  id: number;
  /** Unique per-entry string id, generated internally by addFood. Also used as the DB primary key. */
  logId: string;
  /** Date logged — toDateString() format, e.g. "Mon Aug 24 2026". Used for daily reset. */
  date: string;
  name: string;
  emoji: string;
  cal: number;
  p: number;
  c: number;
  f: number;
  per: string;
  isMeal?: boolean;
}

/** What callers pass to addFood. logId and date are generated internally. */
export type AddFoodInput = Omit<FoodLogItem, 'logId' | 'date'>;

interface AppContextType {
  // Language
  lang: 'en' | 'ar';
  setLang: (lang: 'en' | 'ar') => void;
  toggleLang: () => void;
  t: (en: string, ar: string) => string;

  // Gender
  gender: 'male' | 'female';
  setGender: (gender: 'male' | 'female') => void;

  // Theme
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  toggleTheme: () => void;

  // Wizard / Program
  wizard: WizardState;
  setWizard: (wizard: WizardState) => void;
  resetWizard: () => void;
  hasPlan: boolean;

  // Profile
  profile: Profile;
  setProfile: (profile: Profile) => void;
  updateProfile: (key: keyof Profile, value: string | number) => void;

  // Calorie tracking — foodLog contains only TODAY's entries
  foodLog: FoodLogItem[];
  addFood: (item: AddFoodInput) => void;
  removeFood: (logId: string) => void;
  calorieTarget: number;
  setCalorieTarget: (target: number) => void;

  // Stats
  streak: number;
  weekWorkouts: number;
  totalWorkouts: number;
  logWorkout: () => void;
  lastWorkoutDate: string | null;

  // Exercise completion tracking (checkbox state)
  completedExercises: Record<string, boolean>;
  toggleExercise: (exerciseId: string) => void;
  clearCompletedExercises: () => void;

  // Achievements
  achievements: string[];

  // Challenge
  challengeProgress: number;
  setChallengeProgress: (progress: number) => void;

  // Toast
  showToast: (message: string) => void;
  toast: { message: string; visible: boolean };
}

// ──────────────────────────────────────────────
// Pure helpers (no component state)
// ──────────────────────────────────────────────

/** Current day as a stable string for daily grouping. */
const todayStr = () => new Date().toDateString();

/** Generate a short unique string id safe to use as a Prisma primary key. */
const genId = (): string =>
  Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

/** Return the Sunday that starts the current week (does NOT mutate the Date object). */
const getWeekStart = (): string => {
  const now = new Date();
  const sunday = new Date(now);
  sunday.setDate(now.getDate() - now.getDay()); // subtract day-of-week to reach Sunday
  return sunday.toDateString();
};

// ──────────────────────────────────────────────
// Context
// ──────────────────────────────────────────────

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialWizard: WizardState = {
  split: null,
  level: null,
  goal: null,
  equip: null,
};

// ──────────────────────────────────────────────
// Inner provider — uses useSession so must live inside SessionProvider
// ──────────────────────────────────────────────

function AppProviderInner({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const userId = session?.user?.id ?? null;

  // ── State ──────────────────────────────────
  const [lang, setLangState] = useState<'en' | 'ar'>('en');
  const [gender, setGenderState] = useState<'male' | 'female'>('male');
  const [theme, setThemeState] = useState<'dark' | 'light'>('dark');
  const [wizard, setWizardState] = useState<WizardState>(initialWizard);
  const [profile, setProfileState] = useState<Profile>({});
  const [foodLog, setFoodLog] = useState<FoodLogItem[]>([]);
  const [calorieTarget, setCalorieTargetState] = useState(2000);
  const [streak, setStreak] = useState(0);
  const [weekWorkouts, setWeekWorkouts] = useState(0);
  const [totalWorkouts, setTotalWorkouts] = useState(0);
  const [lastWorkoutDate, setLastWorkoutDate] = useState<string | null>(null);
  const [completedExercises, setCompletedExercises] = useState<Record<string, boolean>>({});
  const [achievements, setAchievements] = useState<string[]>([]);
  const [challengeProgress, setChallengeProgressState] = useState(0);
  const [toast, setToast] = useState({ message: '', visible: false });

  // ── Toast queue (Fix #3) ───────────────────
  // Prevents multiple achievement toasts from clobbering each other:
  // each message is queued and displayed sequentially, 2.8 s apart.
  const toastQueueRef = useRef<string[]>([]);
  const toastActiveRef = useRef(false);

  // Stored in a ref so the setTimeout callback always gets the latest version
  // without needing useCallback + circular-dependency workarounds.
  const processQueueRef = useRef<() => void>(() => {});
  processQueueRef.current = () => {
    if (toastQueueRef.current.length === 0) {
      toastActiveRef.current = false;
      setToast({ message: '', visible: false });
      return;
    }
    const next = toastQueueRef.current.shift()!;
    setToast({ message: next, visible: true });
    setTimeout(() => processQueueRef.current(), 2800);
  };

  const showToast = useCallback((message: string) => {
    toastQueueRef.current.push(message);
    if (!toastActiveRef.current) {
      toastActiveRef.current = true;
      processQueueRef.current();
    }
  }, []); // stable — setToast is a stable React setter

  // ── Debounced profile-sync timer ───────────
  const profileSyncTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Load from localStorage on mount (Fix #1 — filter to today) ────────────
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const savedLang = localStorage.getItem('amgym_lang') as 'en' | 'ar' | null;
      if (savedLang) setLangState(savedLang);

      const savedGender = localStorage.getItem('amgym_gender') as 'male' | 'female' | null;
      if (savedGender) setGenderState(savedGender);

      const savedWizard = localStorage.getItem('amgym_profile');
      if (savedWizard) setWizardState(JSON.parse(savedWizard));

      const savedProfile = localStorage.getItem('amgym_profile_info');
      if (savedProfile) setProfileState(JSON.parse(savedProfile));

      // Fix #1: filter food log to today only; also migrate numeric logIds to strings
      const today = todayStr();
      const savedFoodLog = localStorage.getItem('amgym_foodlog');
      if (savedFoodLog) {
        const all: FoodLogItem[] = JSON.parse(savedFoodLog);
        const todaysEntries = all
          .filter(e => e.date === today)
          .map(e => ({ ...e, logId: String(e.logId) }));
        setFoodLog(todaysEntries);
        // Persist cleaned list back
        localStorage.setItem('amgym_foodlog', JSON.stringify(todaysEntries));
      }

      const savedCalTarget = localStorage.getItem('amgym_cal_target');
      if (savedCalTarget) setCalorieTargetState(parseInt(savedCalTarget));

      const savedStreak = localStorage.getItem('amgym_streak');
      if (savedStreak) setStreak(parseInt(savedStreak));

      const savedWeek = localStorage.getItem('amgym_week');
      if (savedWeek) setWeekWorkouts(parseInt(savedWeek));

      const savedTotal = localStorage.getItem('amgym_total');
      if (savedTotal) setTotalWorkouts(parseInt(savedTotal));

      const savedLastWorkout = localStorage.getItem('amgym_last_workout');
      if (savedLastWorkout) setLastWorkoutDate(savedLastWorkout);

      const savedTheme = localStorage.getItem('amgym_theme') as 'dark' | 'light' | null;
      if (savedTheme) {
        setThemeState(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
      }

      const savedAchievements = localStorage.getItem('amgym_achievements');
      if (savedAchievements) setAchievements(JSON.parse(savedAchievements));

      const savedCompletedEx = localStorage.getItem('amgym_completed_exercises');
      if (savedCompletedEx) setCompletedExercises(JSON.parse(savedCompletedEx));

      checkStreak();
    } catch (e) {
      console.error('Error loading from localStorage:', e);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Language direction effect ───────────────
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  // ── Server sync: fetch on sign-in (Fix #2) ──────────────────────────────────
  // When the user authenticates, pull their data from the server.
  // Server data is authoritative — it overwrites localStorage so the state
  // is consistent across all devices.
  useEffect(() => {
    if (!userId) return;

    fetch('/api/user/data')
      .then(res => (res.ok ? res.json() : null))
      .then(data => {
        if (!data) return;

        if (data.profile) {
          const p = data.profile;
          const mergedProfile: Profile = {
            ...(p.displayName !== undefined && { name: p.displayName }),
            ...(p.weight !== undefined && { weight: p.weight }),
            ...(p.height !== undefined && { height: p.height }),
            ...(p.age !== undefined && { age: p.age }),
            ...(p.goal !== undefined && { goal: p.goal }),
          };
          if (Object.keys(mergedProfile).length) {
            setProfileState(mergedProfile);
            localStorage.setItem('amgym_profile_info', JSON.stringify(mergedProfile));
          }
          if (p.gender) { setGenderState(p.gender); localStorage.setItem('amgym_gender', p.gender); }
          if (p.lang) { setLangState(p.lang); localStorage.setItem('amgym_lang', p.lang); }
          if (p.calorieTarget) { setCalorieTargetState(p.calorieTarget); localStorage.setItem('amgym_cal_target', String(p.calorieTarget)); }
          if (p.wizardSplit || p.wizardLevel || p.wizardGoal || p.wizardEquip) {
            const w: WizardState = { split: p.wizardSplit ?? null, level: p.wizardLevel ?? null, goal: p.wizardGoal ?? null, equip: p.wizardEquip ?? null };
            setWizardState(w);
            localStorage.setItem('amgym_profile', JSON.stringify(w));
          }
          if (typeof p.streak === 'number') { setStreak(p.streak); localStorage.setItem('amgym_streak', String(p.streak)); }
          if (typeof p.weekWorkouts === 'number') { setWeekWorkouts(p.weekWorkouts); localStorage.setItem('amgym_week', String(p.weekWorkouts)); }
          if (typeof p.totalWorkouts === 'number') { setTotalWorkouts(p.totalWorkouts); localStorage.setItem('amgym_total', String(p.totalWorkouts)); }
          if (p.lastWorkoutDate) { setLastWorkoutDate(p.lastWorkoutDate); localStorage.setItem('amgym_last_workout', p.lastWorkoutDate); }
          if (p.weekStart) localStorage.setItem('amgym_week_start', p.weekStart);
          if (Array.isArray(p.achievements)) { setAchievements(p.achievements); localStorage.setItem('amgym_achievements', JSON.stringify(p.achievements)); }
        }

        if (Array.isArray(data.foodEntries) && data.foodEntries.length > 0) {
          // Server food entries for today are authoritative
          const entries: FoodLogItem[] = data.foodEntries.map((e: {
            id: string; date: string; foodId: number; name: string; emoji: string;
            cal: number; p: number; c: number; f: number; per: string; isMeal: boolean;
          }) => ({
            id: e.foodId,
            logId: e.id,
            date: e.date,
            name: e.name,
            emoji: e.emoji,
            cal: e.cal,
            p: e.p,
            c: e.c,
            f: e.f,
            per: e.per,
            isMeal: e.isMeal,
          }));
          setFoodLog(entries);
          localStorage.setItem('amgym_foodlog', JSON.stringify(entries));
        }
      })
      .catch(err => console.error('Server sync failed:', err));
  }, [userId]);

  // ── Debounced profile sync to server (Fix #2) ──────────────────────────────
  // Fires 1.5 s after any profile-related state settles.
  // Using a useEffect (not inline calls) ensures we always capture the latest
  // state values — no stale-closure risk.
  useEffect(() => {
    if (!userId) return;
    if (profileSyncTimerRef.current) clearTimeout(profileSyncTimerRef.current);
    profileSyncTimerRef.current = setTimeout(() => {
      profileSyncTimerRef.current = null;
      fetch('/api/user/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          displayName: profile.name,
          weight: profile.weight ?? null,
          height: profile.height ?? null,
          age: profile.age ?? null,
          goal: profile.goal ?? null,
          gender,
          lang,
          calorieTarget,
          wizardSplit: wizard.split,
          wizardLevel: wizard.level,
          wizardGoal: wizard.goal,
          wizardEquip: wizard.equip,
          streak,
          weekWorkouts,
          totalWorkouts,
          lastWorkoutDate,
          weekStart: getWeekStart(),
          achievements,
        }),
      }).catch(err => console.error('Profile sync failed:', err));
    }, 1500);
  }, [
    userId,
    profile.name, profile.weight, profile.height, profile.age, profile.goal,
    gender, lang, calorieTarget,
    wizard.split, wizard.level, wizard.goal, wizard.equip,
    streak, weekWorkouts, totalWorkouts, lastWorkoutDate,
    achievements,
  ]);

  // ── Language ────────────────────────────────
  const setLang = (newLang: 'en' | 'ar') => {
    setLangState(newLang);
    localStorage.setItem('amgym_lang', newLang);
  };
  const toggleLang = () => setLang(lang === 'en' ? 'ar' : 'en');
  const t = (en: string, ar: string) => (lang === 'ar' ? ar : en);

  // ── Gender ──────────────────────────────────
  const setGender = (newGender: 'male' | 'female') => {
    setGenderState(newGender);
    localStorage.setItem('amgym_gender', newGender);
  };

  // ── Theme ───────────────────────────────────
  const setTheme = (newTheme: 'dark' | 'light') => {
    setThemeState(newTheme);
    localStorage.setItem('amgym_theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  // ── Exercise completion ──────────────────────
  const toggleExercise = (exerciseId: string) => {
    const newCompleted = { ...completedExercises, [exerciseId]: !completedExercises[exerciseId] };
    setCompletedExercises(newCompleted);
    localStorage.setItem('amgym_completed_exercises', JSON.stringify(newCompleted));
  };
  const clearCompletedExercises = () => {
    setCompletedExercises({});
    localStorage.removeItem('amgym_completed_exercises');
  };

  // ── Wizard ───────────────────────────────────
  const setWizard = (newWizard: WizardState) => {
    setWizardState(newWizard);
    localStorage.setItem('amgym_profile', JSON.stringify(newWizard));
  };
  const resetWizard = () => {
    setWizardState(initialWizard);
    localStorage.removeItem('amgym_profile');
  };
  const hasPlan = !!(wizard.split && wizard.level && wizard.goal && wizard.equip);

  // ── Profile ──────────────────────────────────
  const setProfile = (newProfile: Profile) => {
    setProfileState(newProfile);
    localStorage.setItem('amgym_profile_info', JSON.stringify(newProfile));
  };
  const updateProfile = (key: keyof Profile, value: string | number) => {
    setProfile({ ...profile, [key]: value });
  };

  // ── Food log (Fix #1 + Fix #6) ───────────────
  // addFood takes AddFoodInput (no logId, no date — generated here).
  // logId is a unique string that also serves as the DB primary key.
  const addFood = (item: AddFoodInput) => {
    const logId = genId();
    const date = todayStr();
    const entry: FoodLogItem = { ...item, logId, date };
    const newLog = [...foodLog, entry];
    setFoodLog(newLog);
    localStorage.setItem('amgym_foodlog', JSON.stringify(newLog));

    // Persist to server if authenticated
    if (userId) {
      fetch('/api/user/food', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry),
      }).catch(err => console.error('Food sync failed:', err));
    }

    showToast(t('Added to log ✓', 'تمت الإضافة ✓'));
  };

  const removeFood = (logId: string) => {
    const newLog = foodLog.filter(f => f.logId !== logId);
    setFoodLog(newLog);
    localStorage.setItem('amgym_foodlog', JSON.stringify(newLog));

    if (userId) {
      fetch(`/api/user/food/${encodeURIComponent(logId)}`, { method: 'DELETE' })
        .catch(err => console.error('Food delete sync failed:', err));
    }
  };

  const setCalorieTarget = (target: number) => {
    setCalorieTargetState(target);
    localStorage.setItem('amgym_cal_target', target.toString());
  };

  // ── Challenge ────────────────────────────────
  const setChallengeProgress = (progress: number) => {
    setChallengeProgressState(progress);
  };

  // ── Streak helpers ───────────────────────────
  /** Reset streak if the user missed a day; reset weekly count if in a new week. */
  const checkStreak = () => {
    const saved = localStorage.getItem('amgym_last_workout');
    if (!saved) return;

    const today = todayStr();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (saved !== today && saved !== yesterday.toDateString()) {
      setStreak(0);
      localStorage.setItem('amgym_streak', '0');
    }

    const weekStart = getWeekStart();
    const savedWeekStart = localStorage.getItem('amgym_week_start');
    if (savedWeekStart && savedWeekStart !== weekStart) {
      setWeekWorkouts(0);
      localStorage.setItem('amgym_week', '0');
      localStorage.setItem('amgym_week_start', weekStart);
    }
  };

  // ── Log workout ──────────────────────────────
  const logWorkout = () => {
    const today = todayStr();
    const lastWorkout = localStorage.getItem('amgym_last_workout');
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (lastWorkout === today) {
      showToast(t('Already logged today! 💪', 'تم التسجيل اليوم بالفعل! 💪'));
      return;
    }

    const newTotal = totalWorkouts + 1;
    setTotalWorkouts(newTotal);
    localStorage.setItem('amgym_total', newTotal.toString());

    const weekStart = getWeekStart();
    const savedWeekStart = localStorage.getItem('amgym_week_start');
    let newWeek: number;
    if (savedWeekStart === weekStart) {
      newWeek = weekWorkouts + 1;
    } else {
      newWeek = 1;
      localStorage.setItem('amgym_week_start', weekStart);
    }
    setWeekWorkouts(newWeek);
    localStorage.setItem('amgym_week', newWeek.toString());

    let newStreak: number;
    if (lastWorkout === yesterday.toDateString()) {
      newStreak = streak + 1;
    } else {
      newStreak = 1;
    }
    setStreak(newStreak);
    localStorage.setItem('amgym_streak', newStreak.toString());

    setLastWorkoutDate(today);
    localStorage.setItem('amgym_last_workout', today);

    showToast(t('Workout logged! 🔥', 'تم تسجيل التمرين! 🔥'));
  };

  // ── Achievement checker ───────────────────────
  // Called from useEffect below. Uses current closure values which are
  // always fresh because the effect re-runs whenever totalWorkouts or streak changes.
  const checkAchievements = () => {
    const newAchievements: string[] = [...achievements];
    const toasts: string[] = [];

    const maybe = (id: string, msg: string) => {
      if (!achievements.includes(id)) {
        newAchievements.push(id);
        toasts.push(`🏆 ${msg}`);
      }
    };

    if (totalWorkouts >= 1)   maybe('first_workout',    'Achievement: First Workout!');
    if (totalWorkouts >= 10)  maybe('ten_workouts',     'Achievement: 10 Workouts!');
    if (totalWorkouts >= 50)  maybe('fifty_workouts',   'Achievement: 50 Workouts!');
    if (totalWorkouts >= 100) maybe('hundred_workouts', 'Achievement: 100 Workouts!');
    if (streak >= 7)          maybe('week_streak',      'Achievement: 7-Day Streak!');
    if (streak >= 30)         maybe('month_streak',     'Achievement: 30-Day Streak!');

    if (newAchievements.length !== achievements.length) {
      setAchievements(newAchievements);
      localStorage.setItem('amgym_achievements', JSON.stringify(newAchievements));
      // Queue all new toasts — they will display sequentially (Fix #3)
      toasts.forEach(showToast);
    }
  };

  useEffect(() => {
    if (totalWorkouts > 0 || streak > 0) {
      checkAchievements();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalWorkouts, streak]);

  // ── Context value ─────────────────────────────
  const value: AppContextType = {
    lang, setLang, toggleLang, t,
    gender, setGender,
    theme, setTheme, toggleTheme,
    wizard, setWizard, resetWizard, hasPlan,
    profile, setProfile, updateProfile,
    foodLog, addFood, removeFood, calorieTarget, setCalorieTarget,
    streak, weekWorkouts, totalWorkouts, logWorkout, lastWorkoutDate,
    completedExercises, toggleExercise, clearCompletedExercises,
    achievements,
    challengeProgress, setChallengeProgress,
    showToast, toast,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// ──────────────────────────────────────────────
// Public provider — wraps with SessionProvider so
// AppProviderInner can call useSession.
// ──────────────────────────────────────────────

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <AppProviderInner>{children}</AppProviderInner>
    </SessionProvider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
