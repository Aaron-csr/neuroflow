import { EnergyLevel, ThemeConfig } from "./types";

export const THEMES: Record<EnergyLevel, ThemeConfig> = {
  [EnergyLevel.High]: {
    bg: "bg-indigo-50",
    text: "text-indigo-900",
    accent: "bg-indigo-600 hover:bg-indigo-700",
    card: "bg-white border-indigo-100",
    button: "text-white",
    muted: "text-indigo-400"
  },
  [EnergyLevel.Medium]: {
    bg: "bg-teal-50",
    text: "text-teal-900",
    accent: "bg-teal-600 hover:bg-teal-700",
    card: "bg-white border-teal-100",
    button: "text-white",
    muted: "text-teal-400"
  },
  [EnergyLevel.Low]: {
    bg: "bg-orange-50",
    text: "text-stone-800",
    accent: "bg-orange-400 hover:bg-orange-500",
    card: "bg-[#FFF8F0] border-orange-100",
    button: "text-stone-900",
    muted: "text-stone-400"
  }
};

export const STORAGE_KEYS = {
  TASKS: 'neuroflow_tasks',
  STREAK: 'neuroflow_streak',
  PARKING_LOT: 'neuroflow_parking',
  LAST_ACTIVE: 'neuroflow_last_active'
};