import React, { useState, useEffect } from 'react';
import { EnergyLevel, Task, ParkingLotItem } from './types';
import { THEMES, STORAGE_KEYS } from './constants';
import { EnergySelector } from './components/EnergySelector';
import { TaskInput } from './components/TaskInput';
import { FocusShield } from './components/FocusShield';
import { Flame, Play, Trash2, CheckCircle2, Plus } from 'lucide-react';
import { createRoot } from 'react-dom/client';

const App: React.FC = () => {
  // State
  const [energyLevel, setEnergyLevel] = useState<EnergyLevel>(EnergyLevel.Medium);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [streak, setStreak] = useState(0);
  const [focusModeTask, setFocusModeTask] = useState<Task | null>(null);
  const [parkingLot, setParkingLot] = useState<ParkingLotItem[]>([]);
  const [confetti, setConfetti] = useState(false);

  const theme = THEMES[energyLevel];

  // Load Data
  useEffect(() => {
    const loadedTasks = localStorage.getItem(STORAGE_KEYS.TASKS);
    const loadedStreak = localStorage.getItem(STORAGE_KEYS.STREAK);
    const loadedParking = localStorage.getItem(STORAGE_KEYS.PARKING_LOT);

    if (loadedTasks) setTasks(JSON.parse(loadedTasks));
    if (loadedStreak) setStreak(parseInt(loadedStreak));
    if (loadedParking) setParkingLot(JSON.parse(loadedParking));

    // Elastic Streak Logic
    const lastActive = localStorage.getItem(STORAGE_KEYS.LAST_ACTIVE);
    if (lastActive) {
      const hoursSince = (Date.now() - parseInt(lastActive)) / (1000 * 60 * 60);
      if (hoursSince > 48) {
        setStreak(0); // Reset after 2 days
      } else if (hoursSince > 24 && loadedStreak) {
        // Elastic penalty: only lose 1 streak point if missed a day, don't reset
        setStreak(Math.max(0, parseInt(loadedStreak) - 1));
      }
    }
    localStorage.setItem(STORAGE_KEYS.LAST_ACTIVE, Date.now().toString());
  }, []);

  // Persistence
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STREAK, streak.toString());
  }, [streak]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PARKING_LOT, JSON.stringify(parkingLot));
  }, [parkingLot]);

  // Actions
  const addTask = (title: string, context: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      context,
      isCompleted: false,
      createdAt: Date.now()
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const addMultipleTasks = (titles: string[], context: string) => {
    const newTasks: Task[] = titles.map(title => ({
      id: crypto.randomUUID(),
      title,
      context,
      isCompleted: false,
      createdAt: Date.now()
    }));
    setTasks(prev => [...newTasks, ...prev]);
  };

  const completeTask = (task: Task) => {
    // Visual Reward
    setConfetti(true);
    setTimeout(() => setConfetti(false), 2000);

    // Update Streak
    setStreak(s => s + 1);
    localStorage.setItem(STORAGE_KEYS.LAST_ACTIVE, Date.now().toString());

    // Update Task List
    setTasks(prev => prev.filter(t => t.id !== task.id));
    
    // Exit Focus Mode
    setFocusModeTask(null);
  };

  const addToParkingLot = (content: string) => {
    const newItem: ParkingLotItem = {
      id: crypto.randomUUID(),
      content,
      createdAt: Date.now()
    };
    setParkingLot(prev => [newItem, ...prev]);
  };

  const removeParkingItem = (id: string) => {
    setParkingLot(prev => prev.filter(p => p.id !== id));
  };

  const restoreFromParking = (item: ParkingLotItem) => {
    addTask(item.content, 'From Parking Lot');
    removeParkingItem(item.id);
  };

  // Filter Tasks based on Energy (if needed - currently showing all sorted)
  // But for the dashboard, we mainly show the top one.
  const activeTasks = tasks.filter(t => !t.isCompleted);
  const nextTask = activeTasks[0];
  const upcomingTasks = activeTasks.slice(1);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${theme.bg} ${theme.text} pb-20`}>
      {/* Confetti Overlay */}
      {confetti && (
        <div className="fixed inset-0 pointer-events-none z-[100] flex justify-center items-start pt-20">
          <div className="text-6xl animate-bounce">🎉</div>
          <div className="text-6xl animate-bounce delay-100">✨</div>
          <div className="text-6xl animate-bounce delay-75">🚀</div>
        </div>
      )}

      {/* Focus Mode Overlay */}
      <FocusShield 
        activeTask={focusModeTask} 
        onExit={() => setFocusModeTask(null)}
        onComplete={completeTask}
        theme={theme}
        parkingLot={parkingLot}
        addToParkingLot={addToParkingLot}
      />

      {/* Main App Container */}
      <div className="max-w-md mx-auto p-6">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8 pt-4">
          <h1 className="text-2xl font-black tracking-tighter">NeuroFlow</h1>
          <div className="flex items-center gap-2 bg-white/50 px-3 py-1 rounded-full shadow-sm">
            <Flame className={`w-5 h-5 ${streak > 0 ? 'text-orange-500 fill-orange-500' : 'text-gray-300'}`} />
            <span className="font-bold text-sm">{streak}</span>
          </div>
        </div>

        {/* Energy Adapter */}
        <EnergySelector 
          currentLevel={energyLevel} 
          onSelect={setEnergyLevel}
          theme={theme}
        />

        {/* Input */}
        <TaskInput onAdd={addTask} onAddMultiple={addMultipleTasks} theme={theme} />

        {/* The "NOW" Focus Card */}
        {nextTask ? (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2 px-2">
              <h3 className={`text-xs font-bold uppercase tracking-wider opacity-60`}>Up Next</h3>
            </div>
            <div className={`relative overflow-hidden p-6 rounded-[2rem] ${theme.card} border-2 border-transparent hover:border-black/5 shadow-xl transition-all group`}>
              <div className="flex justify-between items-start mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold bg-black/5 ${theme.muted}`}>
                  {nextTask.context || "Now"}
                </span>
              </div>
              
              <h2 className="text-2xl font-bold mb-8 leading-tight">{nextTask.title}</h2>

              <button
                onClick={() => setFocusModeTask(nextTask)}
                className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 ${theme.accent} ${theme.button} shadow-lg transition-transform active:scale-95`}
              >
                <Play className="w-5 h-5 fill-current" />
                Start Focus Mode
              </button>
              
              <button
                onClick={() => completeTask(nextTask)}
                className="absolute top-4 right-4 p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-green-100 rounded-full text-green-600"
                title="Quick Complete"
              >
                <CheckCircle2 className="w-6 h-6" />
              </button>
            </div>
          </div>
        ) : (
          <div className={`text-center py-12 opacity-50 ${theme.text}`}>
             <p className="text-lg font-medium">All clear! 🎉</p>
             <p className="text-sm">Take a breath or add a task.</p>
          </div>
        )}

        {/* Upcoming Stack */}
        {upcomingTasks.length > 0 && (
          <div className="mb-10">
             <h3 className={`text-xs font-bold uppercase tracking-wider opacity-60 mb-4 px-2`}>Later</h3>
             <div className="space-y-3">
               {upcomingTasks.slice(0, 3).map(task => (
                 <div key={task.id} className={`p-4 rounded-2xl ${theme.card} shadow-sm border opacity-70 hover:opacity-100 transition-opacity flex justify-between items-center`}>
                    <div>
                      <p className="font-semibold">{task.title}</p>
                      {task.context && <p className="text-xs opacity-50">{task.context}</p>}
                    </div>
                    <button 
                      onClick={() => completeTask(task)} 
                      className="p-2 hover:bg-black/5 rounded-full"
                    >
                      <div className="w-5 h-5 rounded-full border-2 border-current opacity-30"></div>
                    </button>
                 </div>
               ))}
               {upcomingTasks.length > 3 && (
                 <p className="text-center text-xs opacity-50 mt-4">
                   + {upcomingTasks.length - 3} hidden to reduce overwhelm
                 </p>
               )}
             </div>
          </div>
        )}

        {/* Parking Lot (Collapsed View) */}
        {parkingLot.length > 0 && (
          <div className={`mt-8 p-6 rounded-3xl ${theme.bg} border border-black/5`}>
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <span className="opacity-50">Brain Parking Lot</span>
              <span className="bg-black/10 text-xs px-2 py-0.5 rounded-full">{parkingLot.length}</span>
            </h3>
            <div className="space-y-2">
              {parkingLot.map(item => (
                <div key={item.id} className="flex justify-between items-center bg-white/50 p-3 rounded-xl text-sm">
                  <span>{item.content}</span>
                  <div className="flex gap-1">
                    <button 
                      onClick={() => restoreFromParking(item)}
                      className="p-1.5 hover:bg-green-100 text-green-700 rounded-lg"
                      title="Move to tasks"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => removeParkingItem(item.id)}
                      className="p-1.5 hover:bg-red-100 text-red-700 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default App;