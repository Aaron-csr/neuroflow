import React, { useState } from 'react';
import { ThemeConfig } from '../types';
import { Wand2, Plus, Loader2 } from 'lucide-react';
import { breakDownTask } from '../services/geminiService';

interface TaskInputProps {
  onAdd: (title: string, context: string) => void;
  onAddMultiple: (titles: string[], context: string) => void;
  theme: ThemeConfig;
}

export const TaskInput: React.FC<TaskInputProps> = ({ onAdd, onAddMultiple, theme }) => {
  const [task, setTask] = useState('');
  const [context, setContext] = useState('');
  const [isSplitting, setIsSplitting] = useState(false);

  const handleRegularAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!task.trim()) return;
    onAdd(task, context);
    setTask('');
    setContext('');
  };

  const handleMagicSplit = async () => {
    if (!task.trim()) return;
    setIsSplitting(true);
    try {
      const subtasks = await breakDownTask(task);
      onAddMultiple(subtasks, context || 'Broken down from big task');
      setTask('');
      setContext('');
    } catch (error) {
      console.error(error);
    } finally {
      setIsSplitting(false);
    }
  };

  return (
    <div className={`p-5 rounded-3xl mb-8 ${theme.card} shadow-sm border`}>
      <form onSubmit={handleRegularAdd}>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="What needs doing?"
            className={`w-full text-lg font-semibold bg-transparent border-none outline-none placeholder:opacity-40 ${theme.text}`}
          />
          
          <div className="flex items-center gap-3">
             <input
              type="text"
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="When? (e.g. After coffee)"
              className={`flex-1 text-sm bg-black/5 rounded-xl px-4 py-2 outline-none ${theme.text} placeholder:opacity-50`}
            />
          </div>

          <div className="flex gap-3 mt-2">
            <button
              type="submit"
              disabled={!task.trim() || isSplitting}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-transform active:scale-95 ${theme.bg} ${theme.text} hover:brightness-95`}
            >
              <Plus className="w-5 h-5" />
              Add Task
            </button>
            
            <button
              type="button"
              onClick={handleMagicSplit}
              disabled={!task.trim() || isSplitting}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white transition-all active:scale-95 ${theme.accent} shadow-lg shadow-indigo-500/20`}
            >
              {isSplitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Wand2 className="w-5 h-5" />
              )}
              Magic Split
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};