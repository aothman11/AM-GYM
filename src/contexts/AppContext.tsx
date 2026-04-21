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
