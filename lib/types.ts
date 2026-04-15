export interface WizState {
  split: string | null
  level: string | null
  goal: string | null
  equip: string | null
}

export interface Profile {
  name?: string
  weight?: string
  height?: string
  age?: string
  goal?: string
}

export interface FoodItem {
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

export interface Exercise {
  id: number
  name: string
  muscle: string
  type: string
  equip: string
  emoji: string
  gifKey: string
  cues: string[]
}

export interface ExerciseModalData {
  name: string
  muscle?: string
  sets?: string
  cues: string[]
  gifKey?: string
}

export interface ProgramDay {
  name: string
  focus: string
  rest: boolean
}

export interface Program {
  name: string
  emoji: string
  days: ProgramDay[]
}

export interface ProgramExercise {
  n: string
  s: string
  v: string
}

export interface WeeklyChallenge {
  emoji: string
  exercise: string
  target: number
  unit: string
  step: number
  en: string
  ar: string
}

export interface GymContextType {
  lang: string
  gender: string
  wiz: WizState
  wizStep: number
  foodLog: FoodItem[]
  totalCalTarget: number
  profile: Profile
  exModal: ExerciseModalData | null
  profileModalField: string | null
  toast: string
  setLang: (lang: string) => void
  setGender: (gender: string) => void
  setWiz: (wiz: WizState) => void
  setWizStep: (step: number) => void
  setFoodLog: (log: FoodItem[]) => void
  setTotalCalTarget: (target: number) => void
  setProfile: (profile: Profile) => void
  openExModal: (data: ExerciseModalData) => void
  closeExModal: () => void
  openProfileModal: (field: string) => void
  closeProfileModal: () => void
  showToast: (msg: string) => void
  t: (en: string, ar: string) => string
}
