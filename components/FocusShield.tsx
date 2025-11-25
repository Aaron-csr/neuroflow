import React, { useState, useEffect } from 'react';
import { ThemeConfig, Task, ParkingLotItem } from '../types';
import { X, CheckCircle, BrainCircuit, ArrowRight } from 'lucide-react';

interface FocusShieldProps {
  activeTask: Task | null;
  onExit: () => void;
  onComplete: (task: Task) => void;
  theme: ThemeConfig;
  parkingLot: ParkingLotItem[];
  addToParkingLot: (text: string) => void;
}

export const FocusShield: React.FC<FocusShieldProps> = ({ 
  activeTask, 
  onExit, 
  onComplete, 
  theme,
  parkingLot,
  addToParkingLot
}) => {
  const [seconds, setSeconds] = useState(0);
  const [distractionInput, setDistractionInput] = useState('');

  useEffect(() => {
    const timer = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleParkingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!distractionInput.trim()) return;
    addToParkingLot(distractionInput);
    setDistractionInput('');
  };

  if (!activeTask) return null;

  return (
    <div className={`fixed inset-0 z-50 flex flex-col ${theme.bg} animate-in fade-in duration-300`}>
      {/* Top Bar */}
      <div className="flex justify-between items-center p-6">
        <div className={`font-mono text-xl opacity-70 ${theme.text}`}>
          {formatTime(seconds)}
        </div>
        <button 
          onClick={onExit}
          className="p-2 rounded-full hover:bg-black/5 transition-colors"
        >
          <X className={theme.text} />
        </button>
      </div>

      {/* Main Focus Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center max-w-2xl mx-auto w-full">
        <h3 className={`text-lg uppercase tracking-widest mb-4 opacity-50 ${theme.text}`}>
          Now Doing
        </h3>
        <h1 className={`text-4xl md:text-6xl font-black mb-12 leading-tight ${theme.text}`}>
          {activeTask.title}
        </h1>
        
        {activeTask.context && (
          <div className="mb-12 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5">
             <span className="text-sm font-medium opacity-60">Context:</span>
             <span className="text-sm font-bold">{activeTask.context}</span>
          </div>
        )}

        <button
          onClick={() => onComplete(activeTask)}
          className={`group relative overflow-hidden rounded-full px-12 py-6 text-xl font-bold shadow-xl transition-transform active:scale-95 ${theme.accent} ${theme.button}`}
        >
          <span className="relative z-10 flex items-center gap-3">
            <CheckCircle className="w-8 h-8" />
            COMPLETE TASK
          </span>
        </button>
      </div>

      {/* Parking Lot Area */}
      <div className={`mt-auto p-6 ${theme.card} border-t shadow-[0_-10px_40px_rgba(0,0,0,0.05)] rounded-t-3xl`}>
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-2 mb-4">
             <BrainCircuit className={`w-5 h-5 ${theme.text}`} />
             <h3 className={`font-bold ${theme.text}`}>Brain Parking Lot</h3>
          </div>
          
          <form onSubmit={handleParkingSubmit} className="flex gap-2 mb-4">
            <input
              type="text"
              value={distractionInput}
              onChange={(e) => setDistractionInput(e.target.value)}
              placeholder="Distracting thought? Park it here."
              className={`flex-1 bg-transparent border-b-2 ${theme.text} border-black/10 focus:border-black/30 outline-none py-2 px-1 placeholder:opacity-40`}
            />
            <button 
              type="submit"
              disabled={!distractionInput.trim()}
              className={`p-2 rounded-full ${distractionInput.trim() ? theme.accent : 'bg-gray-200'} ${theme.button} transition-all`}
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          {/* Quick list of parked items */}
          {parkingLot.length > 0 && (
            <div className="flex gap-2 overflow-x-auto parking-scroll pb-2">
              {parkingLot.slice(-3).map(item => (
                <div key={item.id} className="flex-shrink-0 text-xs bg-black/5 px-3 py-1.5 rounded-lg opacity-70 whitespace-nowrap">
                  {item.content}
                </div>
              ))}
              {parkingLot.length > 3 && (
                <div className="flex-shrink-0 text-xs bg-black/5 px-3 py-1.5 rounded-lg opacity-50">
                  +{parkingLot.length - 3} more
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};