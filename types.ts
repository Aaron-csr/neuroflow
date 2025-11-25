export enum EnergyLevel {
  High = 'HIGH',
  Medium = 'MEDIUM',
  Low = 'LOW'
}

export interface Task {
  id: string;
  title: string;
  context: string; // e.g., "After coffee"
  isCompleted: boolean;
  createdAt: number;
}

export interface ThemeConfig {
  bg: string;
  text: string;
  accent: string;
  card: string;
  button: string;
  muted: string;
}

export interface ParkingLotItem {
  id: string;
  content: string;
  createdAt: number;
}