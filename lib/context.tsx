'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

interface WizState {
  split: string | null
  level: string | null
  goal: string | null
  equip: string | null
}

interface Profile {
  name?: string
  weight?: string
  height?: string
  age?: string
  goal?: string
}

interface FoodItem {
  id: number
  name: string
  emoji: string
  cal: number
  p: number
  c: number
  f: number
  per: string
  logId?: number
}

interface ExerciseModalData {
  name: string
  muscle?: string
  sets?: string
  cues: string[]
  gifKey?: string
}

interface AppContextType {
  lang: 'en' | 'ar'
  gender: 'male' | 'female'
  profile: Profile
  wiz: WizState
  foodLog: FoodItem[]
  totalCalTarget: number
  exModal: ExerciseModalData | null
  profileModalField: string | null
  toastMsg: string
  toggleLang: () => void
  setGender: (g: 'male' | 'female') => void
  setProfile: (profile: Profile) => void
  setWiz: (wiz: WizState) => void
  setFoodLog: (log: FoodItem[]) => void
  setTotalCalTarget: (target: number) => void
  openExModal: (data: ExerciseModalData) => void
  closeExModal: () => void
  openProfileModal: (field: string) => void
  closeProfileModal: () => void
  showToast: (msg: string) => void
  t: (en: string, ar: string) => string
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<'en' | 'ar'>('en')
  const [gender, setGenderState] = useState<'male' | 'female'>('male')
  const [profile, setProfileState] = useState<Profile>({})
  const [wiz, setWizState] = useState<WizState>({ split: null, level: null, goal: null, equip: null })
  const [foodLog, setFoodLogState] = useState<FoodItem[]>([])
  const [totalCalTarget, setCalTarget] = useState<number>(2000)
  const [exModal, setExModal] = useState<ExerciseModalData | null>(null)
  const [profileModalField, setProfileModalField] = useState<string | null>(null)
  const [toastMsg, setToastMsg] = useState('')

  useEffect(() => {
    try {
      const sp = JSON.parse(localStorage.getItem('amgym_profile') || '{}')
      if (sp.split) setWizState(sp)
      setProfileState(JSON.parse(localStorage.getItem('amgym_profile_info') || '{}'))
      setFoodLogState(JSON.parse(localStorage.getItem('amgym_foodlog') || '[]'))
      setGenderState((localStorage.getItem('amgym_gender') as 'male' | 'female') || 'male')
      setLang((localStorage.getItem('amgym_lang') as 'en' | 'ar') || 'en')
      setCalTarget(parseInt(localStorage.getItem('amgym_cal_target') || '2000'))
    } catch (e) {}
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }, [lang])

  const toggleLang = useCallback(() => {
    const next = lang === 'en' ? 'ar' : 'en'
    setLang(next)
    localStorage.setItem('amgym_lang', next)
  }, [lang])

  const setGender = useCallback((g: 'male' | 'female') => {
    setGenderState(g)
    localStorage.setItem('amgym_gender', g)
  }, [])

  const setProfile = useCallback((p: Profile) => {
    setProfileState(p)
    localStorage.setItem('amgym_profile_info', JSON.stringify(p))
  }, [])

  const setWiz = useCallback((w: WizState) => {
    setWizState(w)
    if (w.split) localStorage.setItem('amgym_profile', JSON.stringify(w))
    else localStorage.removeItem('amgym_profile')
  }, [])

  const setFoodLog = useCallback((log: FoodItem[]) => {
    setFoodLogState(log)
    localStorage.setItem('amgym_foodlog', JSON.stringify(log))
  }, [])

  const setTotalCalTarget = useCallback((target: number) => {
    setCalTarget(target)
    localStorage.setItem('amgym_cal_target', String(target))
  }, [])

  const openExModal = useCallback((data: ExerciseModalData) => setExModal(data), [])
  const closeExModal = useCallback(() => setExModal(null), [])
  const openProfileModal = useCallback((field: string) => setProfileModalField(field), [])
  const closeProfileModal = useCallback(() => setProfileModalField(null), [])

  const showToast = useCallback((msg: string) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(''), 2500)
  }, [])

  const t = useCallback((en: string, ar: string) => lang === 'ar' ? ar : en, [lang])

  return (
    <AppContext.Provider value={{
      lang, gender, profile, wiz, foodLog, totalCalTarget,
      exModal, profileModalField, toastMsg,
      toggleLang, setGender, setProfile, setWiz, setFoodLog,
      setTotalCalTarget, openExModal, closeExModal,
      openProfileModal, closeProfileModal, showToast, t,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
