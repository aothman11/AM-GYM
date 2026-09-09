/** Shared types and constants used by FitnessAgent and /api/agent. */

export interface AgentExercise {
  name: string;
  sets: string;
  reps: string;
  kg: string;
}

export interface AgentSession {
  dayIndex?: number;
  dayLabel: string;
  date: string;
  exercises: AgentExercise[];
  rating?: number;
  notes?: string;
}

export const SPLIT = [
  { label: 'Day 1', muscles: 'Chest + Tris' },
  { label: 'Day 2', muscles: 'Back + Bis' },
  { label: 'Day 3', muscles: 'Shoulders' },
  { label: 'Day 4', muscles: 'Arms' },
  { label: 'Day 5', muscles: 'Legs' },
  { label: 'Day 6', muscles: 'Abs & Core' },
] as const;
