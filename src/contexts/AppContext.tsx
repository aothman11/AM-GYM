'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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

interface FoodLogItem {
  id: number;
  logId: number;
  name: string;
  emoji: string;
  cal: number;
  p: number;
  c: number;
  f: number;
  per: string;
  isMeal?: boolean;
}

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
  
  // Wizard/Program
  wizard: WizardState;
  setWizard: (wizard: WizardState) => void;
  resetWizard: () => void;
  hasPlan: boolean;
  
  // Profile
  profile: Profile;
  setProfile: (profile: Profile) => void;
  updateProfile: (key: keyof Profile, value: string | number) => void;
  
  // Calorie tracking
  foodLog: FoodLogItem[];
  addFood: (item: FoodLogItem) => void;
  removeFood: (logId: number) => void;
  calorieTarget: number;
  setCalorieTarget: (target: number) => void;
  
  // Stats
  streak: number;
  weekWorkouts: number;
  totalWorkouts: number;
  logWorkout: () => void;
  lastWorkoutDate: string | null;
  
  // Exercise tracking (for checkboxes)
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

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialWizard: WizardState = {
  split: null,
  level: null,
  goal: null,
  equip: null,
};

export function AppProvider({ children }: { children: ReactNode }) {
  // Language state
  const [lang, setLangState] = useState<'en' | 'ar'>('en');
  
  // Gender state
  const [gender, setGenderState] = useState<'male' | 'female'>('male');
  
  // Theme state
  const [theme, setThemeState] = useState<'dark' | 'light'>('dark');
  
  // Wizard state
  const [wizard, setWizardState] = useState<WizardState>(initialWizard);
  
  // Profile state
  const [profile, setProfileState] = useState<Profile>({});
  
  // Food log state
  const [foodLog, setFoodLog] = useState<FoodLogItem[]>([]);
  const [calorieTarget, setCalorieTargetState] = useState(2000);
  
  // Stats
  const [streak, setStreak] = useState(0);
  const [weekWorkouts, setWeekWorkouts] = useState(0);
  const [totalWorkouts, setTotalWorkouts] = useState(0);
  const [lastWorkoutDate, setLastWorkoutDate] = useState<string | null>(null);
  
  // Exercise completion tracking
  const [completedExercises, setCompletedExercises] = useState<Record<string, boolean>>({});
  
  // Achievements
  const [achievements, setAchievements] = useState<string[]>([]);
  
  // Challenge
  const [challengeProgress, setChallengeProgressState] = useState(0);
  
  // Toast
  const [toast, setToast] = useState({ message: '', visible: false });

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedLang = localStorage.getItem('amgym_lang') as 'en' | 'ar' | null;
        if (savedLang) setLangState(savedLang);
        
        const savedGender = localStorage.getItem('amgym_gender') as 'male' | 'female' | null;
        if (savedGender) setGenderState(savedGender);
        
        const savedWizard = localStorage.getItem('amgym_profile');
        if (savedWizard) setWizardState(JSON.parse(savedWizard));
        
        const savedProfile = localStorage.getItem('amgym_profile_info');
        if (savedProfile) setProfileState(JSON.parse(savedProfile));
        
        const savedFoodLog = localStorage.getItem('amgym_foodlog');
        if (savedFoodLog) setFoodLog(JSON.parse(savedFoodLog));
        
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
        
        // Check and update streak on load
        checkStreak();
      } catch (e) {
        console.error('Error loading from localStorage:', e);
      }
    }
  }, []);

  // Update document direction when language changes
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    }
  }, [lang]);

  // Language functions
  const setLang = (newLang: 'en' | 'ar') => {
    setLangState(newLang);
    localStorage.setItem('amgym_lang', newLang);
  };

  const toggleLang = () => {
    const newLang = lang === 'en' ? 'ar' : 'en';
    setLang(newLang);
  };

  const t = (en: string, ar: string) => lang === 'ar' ? ar : en;

  // Gender functions
  const setGender = (newGender: 'male' | 'female') => {
    setGenderState(newGender);
    localStorage.setItem('amgym_gender', newGender);
  };

  // Theme functions
  const setTheme = (newTheme: 'dark' | 'light') => {
    setThemeState(newTheme);
    localStorage.setItem('amgym_theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  // Exercise completion functions
  const toggleExercise = (exerciseId: string) => {
    const newCompleted = { ...completedExercises, [exerciseId]: !completedExercises[exerciseId] };
    setCompletedExercises(newCompleted);
    localStorage.setItem('amgym_completed_exercises', JSON.stringify(newCompleted));
  };

  const clearCompletedExercises = () => {
    setCompletedExercises({});
    localStorage.removeItem('amgym_completed_exercises');
  };

  // Achievement checker
  const checkAchievements = () => {
    const newAchievements: string[] = [...achievements];
    
    // First workout
    if (totalWorkouts >= 1 && !achievements.includes('first_workout')) {
      newAchievements.push('first_workout');
      showToast('🏆 Achievement: First Workout!');
    }
    // 7-day streak
    if (streak >= 7 && !achievements.includes('week_streak')) {
      newAchievements.push('week_streak');
      showToast('🏆 Achievement: 7-Day Streak!');
    }
    // 30-day streak
    if (streak >= 30 && !achievements.includes('month_streak')) {
      newAchievements.push('month_streak');
      showToast('🏆 Achievement: 30-Day Streak!');
    }
    // 10 workouts
    if (totalWorkouts >= 10 && !achievements.includes('ten_workouts')) {
      newAchievements.push('ten_workouts');
      showToast('🏆 Achievement: 10 Workouts!');
    }
    // 50 workouts
    if (totalWorkouts >= 50 && !achievements.includes('fifty_workouts')) {
      newAchievements.push('fifty_workouts');
      showToast('🏆 Achievement: 50 Workouts!');
    }
    // 100 workouts
    if (totalWorkouts >= 100 && !achievements.includes('hundred_workouts')) {
      newAchievements.push('hundred_workouts');
      showToast('🏆 Achievement: 100 Workouts!');
    }
    
    if (newAchievements.length !== achievements.length) {
      setAchievements(newAchievements);
      localStorage.setItem('amgym_achievements', JSON.stringify(newAchievements));
    }
  };

  // Check achievements when stats change
  useEffect(() => {
    if (totalWorkouts > 0 || streak > 0) {
      checkAchievements();
    }
  }, [totalWorkouts, streak]);

  // Wizard functions
  const setWizard = (newWizard: WizardState) => {
    setWizardState(newWizard);
    localStorage.setItem('amgym_profile', JSON.stringify(newWizard));
  };

  const resetWizard = () => {
    setWizardState(initialWizard);
    localStorage.removeItem('amgym_profile');
  };

  const hasPlan = !!(wizard.split && wizard.level && wizard.goal && wizard.equip);

  // Profile functions
  const setProfile = (newProfile: Profile) => {
    setProfileState(newProfile);
    localStorage.setItem('amgym_profile_info', JSON.stringify(newProfile));
  };

  const updateProfile = (key: keyof Profile, value: string | number) => {
    const newProfile = { ...profile, [key]: value };
    setProfile(newProfile);
  };

  // Food log functions
  const addFood = (item: FoodLogItem) => {
    const newLog = [...foodLog, { ...item, logId: Date.now() }];
    setFoodLog(newLog);
    localStorage.setItem('amgym_foodlog', JSON.stringify(newLog));
    showToast(t('Added to log ✓', 'تمت الإضافة ✓'));
  };

  const removeFood = (logId: number) => {
    const newLog = foodLog.filter(f => f.logId !== logId);
    setFoodLog(newLog);
    localStorage.setItem('amgym_foodlog', JSON.stringify(newLog));
  };

  const setCalorieTarget = (target: number) => {
    setCalorieTargetState(target);
    localStorage.setItem('amgym_cal_target', target.toString());
  };

  // Challenge functions
  const setChallengeProgress = (progress: number) => {
    setChallengeProgressState(progress);
  };

  // Helper: Get week start (Monday)
  // Helper: Get week start (Sunday)
  const getWeekStart = () => {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 = Sunday, 6 = Saturday
    const diff = now.getDate() - dayOfWeek; // Go back to Sunday
    const weekStart = new Date(now.setDate(diff));
    return weekStart.toDateString();
  };

  // Helper: Check and update streak
  const checkStreak = () => {
    const saved = localStorage.getItem('amgym_last_workout');
    if (!saved) return;
    
    const today = new Date().toDateString();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    // If last workout was more than 1 day ago, reset streak
    if (saved !== today && saved !== yesterday.toDateString()) {
      setStreak(0);
      localStorage.setItem('amgym_streak', '0');
    }
    
    // Check if new week
    const weekStart = getWeekStart();
    const savedWeekStart = localStorage.getItem('amgym_week_start');
    if (savedWeekStart && savedWeekStart !== weekStart) {
      setWeekWorkouts(0);
      localStorage.setItem('amgym_week', '0');
      localStorage.setItem('amgym_week_start', weekStart);
    }
  };

  // Log workout function
  const logWorkout = () => {
    const today = new Date().toDateString();
    const lastWorkout = localStorage.getItem('amgym_last_workout');
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    // Check if already logged today
    if (lastWorkout === today) {
      showToast(t('Already logged today! 💪', 'تم التسجيل اليوم بالفعل! 💪'));
      return;
    }
    
    // Update total workouts
    const newTotal = totalWorkouts + 1;
    setTotalWorkouts(newTotal);
    localStorage.setItem('amgym_total', newTotal.toString());
    
    // Update weekly workouts
    const weekStart = getWeekStart();
    const savedWeekStart = localStorage.getItem('amgym_week_start');
    
    if (savedWeekStart === weekStart) {
      const newWeek = weekWorkouts + 1;
      setWeekWorkouts(newWeek);
      localStorage.setItem('amgym_week', newWeek.toString());
    } else {
      setWeekWorkouts(1);
      localStorage.setItem('amgym_week', '1');
      localStorage.setItem('amgym_week_start', weekStart);
    }
    
    // Update streak
    if (lastWorkout === yesterday.toDateString()) {
      // Worked out yesterday, increment streak
      const newStreak = streak + 1;
      setStreak(newStreak);
      localStorage.setItem('amgym_streak', newStreak.toString());
    } else if (!lastWorkout || lastWorkout !== today) {
      // First workout or missed a day
      setStreak(1);
      localStorage.setItem('amgym_streak', '1');
    }
    
    // Save today as last workout
    setLastWorkoutDate(today);
    localStorage.setItem('amgym_last_workout', today);
    
    showToast(t('Workout logged! 🔥', 'تم تسجيل التمرين! 🔥'));
  };

  // Toast function
  const showToast = (message: string) => {
    setToast({ message, visible: true });
    setTimeout(() => setToast({ message: '', visible: false }), 2500);
  };

  const value: AppContextType = {
    lang,
    setLang,
    toggleLang,
    t,
    gender,
    setGender,
    theme,
    setTheme,
    toggleTheme,
    wizard,
    setWizard,
    resetWizard,
    hasPlan,
    profile,
    setProfile,
    updateProfile,
    foodLog,
    addFood,
    removeFood,
    calorieTarget,
    setCalorieTarget,
    streak,
    weekWorkouts,
    totalWorkouts,
    logWorkout,
    lastWorkoutDate,
    completedExercises,
    toggleExercise,
    clearCompletedExercises,
    achievements,
    challengeProgress,
    setChallengeProgress,
    showToast,
    toast,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
