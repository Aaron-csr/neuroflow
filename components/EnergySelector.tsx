import React from 'react';
import { EnergyLevel, ThemeConfig } from '../types';
import { Battery, BatteryMedium, BatteryLow } from 'lucide-react';

interface EnergySelectorProps {
  currentLevel: EnergyLevel;
  onSelect: (level: EnergyLevel) => void;
  theme: ThemeConfig;
}

export const EnergySelector: React.FC<EnergySelectorProps> = ({ currentLevel, onSelect, theme }) => {
  return (
    <div className={`p-4 rounded-3xl mb-6 transition-colors duration-500 ${theme.card} shadow-sm border`}>
      <h2 className={`text-sm font-bold uppercase tracking-wider mb-3 ${theme.muted}`}>Current Energy</h2>
      <div className="flex justify-between gap-2">
        <button
          onClick={() => onSelect(EnergyLevel.High)}
          className={`flex-1 flex flex-col items-center p-3 rounded-2xl transition-all duration-300 scale-100 hover:scale-105 active:scale-95 ${
            currentLevel === EnergyLevel.High ? 'bg-indigo-100 ring-2 ring-indigo-500' : 'bg-transparent hover:bg-gray-50'
          }`}
        >
          <Battery className={`mb-1 ${currentLevel === EnergyLevel.High ? 'text-indigo-600' : 'text-gray-400'}`} />
          <span className="text-xs font-semibold">High</span>
        </button>

        <button
          onClick={() => onSelect(EnergyLevel.Medium)}
          className={`flex-1 flex flex-col items-center p-3 rounded-2xl transition-all duration-300 scale-100 hover:scale-105 active:scale-95 ${
            currentLevel === EnergyLevel.Medium ? 'bg-teal-100 ring-2 ring-teal-500' : 'bg-transparent hover:bg-gray-50'
          }`}
        >
          <BatteryMedium className={`mb-1 ${currentLevel === EnergyLevel.Medium ? 'text-teal-600' : 'text-gray-400'}`} />
          <span className="text-xs font-semibold">Medium</span>
        </button>

        <button
          onClick={() => onSelect(EnergyLevel.Low)}
          className={`flex-1 flex flex-col items-center p-3 rounded-2xl transition-all duration-300 scale-100 hover:scale-105 active:scale-95 ${
            currentLevel === EnergyLevel.Low ? 'bg-orange-100 ring-2 ring-orange-500' : 'bg-transparent hover:bg-gray-50'
          }`}
        >
          <BatteryLow className={`mb-1 ${currentLevel === EnergyLevel.Low ? 'text-orange-600' : 'text-gray-400'}`} />
          <span className="text-xs font-semibold">Low</span>
        </button>
      </div>
    </div>
  );
};