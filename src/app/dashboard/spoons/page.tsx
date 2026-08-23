'use client';

import { useState, useMemo, useEffect } from 'react';
import { useMockData } from '@/lib/MockDataContext';
import { Settings, Plus, RotateCcw, AlertTriangle, Info, Trash2 } from 'lucide-react';
import { SpoonIcon } from '@/components/SpoonIcon';

export default function SpoonsPage() {
  const { baseSpoons, setBaseSpoons, spoonTasks, addSpoonTask, removeSpoonTask, spoonLogs, logSpoons } = useMockData();
  
  const [showSettings, setShowSettings] = useState(false);
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskCost, setNewTaskCost] = useState('1');
  
  const [lastActionCost, setLastActionCost] = useState<number | null>(null);
  
  // Modals state
  const [confirmTask, setConfirmTask] = useState<{name: string, cost: number} | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Today logic
  const todayStr = new Date().toISOString().split('T')[0];
  
  // Calculate yesterday's date
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  const todaysLog = spoonLogs[todayStr] || { used: 0, borrowed: 0 };
  const yesterdaysLog = spoonLogs[yesterdayStr] || { used: 0, borrowed: 0 };

  const availableSpoonsToday = baseSpoons - yesterdaysLog.borrowed;
  
  const handleTaskClick = (task: {name: string, cost: number}) => {
    setConfirmTask(task);
  };

  const confirmAndApplyTask = () => {
    if (!confirmTask) return;
    const cost = confirmTask.cost;
    let newUsed = todaysLog.used + cost;
    let newBorrowed = 0;
    
    if (newUsed > availableSpoonsToday) {
      newBorrowed = newUsed - availableSpoonsToday;
    }

    logSpoons(todayStr, newUsed, newBorrowed);
    setLastActionCost(cost);
    setConfirmTask(null);
  };

  const handleUndo = () => {
    if (lastActionCost === null) return;
    let newUsed = todaysLog.used - lastActionCost;
    if (newUsed < 0) newUsed = 0;
    
    let newBorrowed = 0;
    if (newUsed > availableSpoonsToday) {
      newBorrowed = newUsed - availableSpoonsToday;
    }
    
    logSpoons(todayStr, newUsed, newBorrowed);
    setLastActionCost(null);
  };

  const confirmReset = () => {
    logSpoons(todayStr, 0, 0);
    setLastActionCost(null);
    setShowResetConfirm(false);
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskName.trim()) return;
    addSpoonTask({ name: newTaskName, cost: parseInt(newTaskCost, 10) });
    setNewTaskName('');
    setNewTaskCost('1');
  };

  // Graphical spoons array
  const totalSpoonsToRender = Math.max(availableSpoonsToday, todaysLog.used);

  return (
    <div className="p-4 space-y-6 pb-24 animate-in fade-in duration-500 max-w-xl mx-auto">
      <header className="pt-2 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <SpoonIcon className="text-yellow-500" /> Cucharas
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Gestiona tu energía diaria</p>
        </div>
        <button 
          onClick={() => setShowSettings(!showSettings)}
          className={`p-2 rounded-xl transition-colors ${showSettings ? 'bg-brand-100 text-brand-600 dark:bg-brand-900/30' : 'bg-gray-100 text-gray-600 dark:bg-slate-800 dark:text-gray-400'}`}
        >
          <Settings size={20} />
        </button>
      </header>

      {/* Visual Tracker (Sticky) */}
      <div className="sticky top-4 z-10 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-4 rounded-3xl shadow-lg border border-gray-100 dark:border-slate-800">
        <div className="flex justify-between items-end mb-4">
          <div>
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Tus cucharas hoy</p>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-gray-900 dark:text-white">{Math.max(0, availableSpoonsToday - todaysLog.used)}</span>
              <span className="text-gray-500">/ {availableSpoonsToday}</span>
            </div>
          </div>
          <button onClick={() => setShowResetConfirm(true)} className="flex items-center gap-1 text-xs text-gray-500 hover:text-brand-500 transition-colors bg-gray-100 dark:bg-slate-800 px-3 py-1.5 rounded-full font-medium">
            <RotateCcw size={14} /> Reiniciar
          </button>
        </div>

        {lastActionCost !== null && (
          <div className="mb-4 flex justify-end">
            <button onClick={handleUndo} className="text-xs text-brand-600 dark:text-brand-400 font-semibold flex items-center gap-1 bg-brand-50 dark:bg-brand-900/20 px-3 py-1.5 rounded-full hover:bg-brand-100 transition-colors">
              <RotateCcw size={12} /> Deshacer última acción
            </button>
          </div>
        )}

        <div className="flex flex-wrap gap-2 justify-center">
          {Array.from({ length: totalSpoonsToRender }).map((_, i) => {
            let colorClass = "text-yellow-400 fill-yellow-400"; // Available
            if (i >= availableSpoonsToday) {
              colorClass = "text-red-500 fill-red-500 animate-pulse"; // Borrowed (Deficit)
            } else if (i < todaysLog.used) {
              colorClass = "text-gray-300 dark:text-slate-700"; // Used
            }

            return (
              <SpoonIcon key={i} className={`w-8 h-8 transition-all duration-300 ${colorClass} ${i < todaysLog.used && i < availableSpoonsToday ? 'opacity-30' : ''}`} />
            );
          })}
        </div>

        {todaysLog.borrowed > 0 && (
          <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-xl text-xs flex items-start gap-2 animate-in slide-in-from-top-2">
            <AlertTriangle size={16} className="shrink-0 mt-0.5" />
            <p>
              <strong>¡Alerta de sobreesfuerzo!</strong> Has usado {todaysLog.borrowed} {todaysLog.borrowed === 1 ? 'cuchara' : 'cucharas'} de más. Este déficit se restará de tu total mañana. Intenta descansar.
            </p>
          </div>
        )}
        
        {yesterdaysLog.borrowed > 0 && todaysLog.used === 0 && (
          <div className="mt-4 p-3 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 rounded-xl text-xs flex items-start gap-2 animate-in slide-in-from-top-2">
            <Info size={16} className="shrink-0 mt-0.5" />
            <p>
              Ayer usaste {yesterdaysLog.borrowed} {yesterdaysLog.borrowed === 1 ? 'cuchara' : 'cucharas'} extra. Hoy empiezas con un poco menos de energía. Tómalo con calma.
            </p>
          </div>
        )}
      </div>

      {showSettings && (
        <div className="bg-gray-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-gray-100 dark:border-slate-700 animate-in slide-in-from-top-2">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Cucharas Base por Día (Recomendado: 12)</label>
          <div className="flex gap-2">
            <input 
              type="number" 
              min="5" 
              max="20"
              value={baseSpoons} 
              onChange={e => setBaseSpoons(Number(e.target.value) || 12)}
              className="w-full p-2 border border-gray-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 focus:ring-2 focus:ring-brand-500"
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">Esta es la cantidad de energía con la que inicias en un día bueno o normal.</p>
        </div>
      )}

      {/* Task List */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Registrar Actividad</h2>
        <div className="grid grid-cols-2 gap-3">
          {spoonTasks.map(task => (
            <button 
              key={task.id}
              onClick={() => handleTaskClick(task)}
              className="group relative bg-white dark:bg-slate-900 p-4 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm hover:border-yellow-400 hover:shadow-md transition-all text-left flex flex-col justify-between min-h-[100px]"
            >
              <span className="font-semibold text-gray-800 dark:text-gray-200 text-sm leading-tight group-hover:text-yellow-600 transition-colors">{task.name}</span>
              <div className="flex items-center gap-1 mt-2 text-yellow-500 font-bold bg-yellow-50 dark:bg-yellow-900/20 w-fit px-2 py-1 rounded-lg text-xs">
                -{task.cost} <SpoonIcon size={12} fill="currentColor" />
              </div>
              
              <div 
                onClick={(e) => { e.stopPropagation(); removeSpoonTask(task.id); }}
                className="absolute top-2 right-2 p-1.5 text-gray-300 hover:text-red-500 bg-white/80 dark:bg-slate-900/80 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={14} />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Add Task */}
      <div className="bg-gray-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-gray-100 dark:border-slate-700">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Nueva Actividad</h3>
        <form onSubmit={handleAddTask} className="flex gap-2">
          <input 
            type="text" 
            placeholder="Ej. Ir al médico"
            value={newTaskName} onChange={e => setNewTaskName(e.target.value)}
            className="flex-1 p-2.5 border border-gray-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
            required
          />
          <select 
            value={newTaskCost} onChange={e => setNewTaskCost(e.target.value)}
            className="w-20 p-2.5 border border-gray-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-sm focus:ring-2 focus:ring-brand-500 outline-none text-center"
          >
            <option value="1">1 🥄</option>
            <option value="2">2 🥄</option>
            <option value="3">3 🥄</option>
            <option value="4">4 🥄</option>
            <option value="5">5 🥄</option>
          </select>
          <button type="submit" className="bg-brand-500 hover:bg-brand-600 text-white p-2.5 rounded-xl shadow-md transition-colors">
            <Plus size={20} />
          </button>
        </form>
      </div>

      {/* Modals */}
      {confirmTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 w-full max-w-sm shadow-xl space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center">
              ¿Gastar energía?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-center text-sm">
              ¿Deseas restar <strong>{confirmTask.cost} cucharas</strong> por la actividad "{confirmTask.name}"?
            </p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmTask(null)} className="flex-1 p-3 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:text-gray-300 dark:hover:bg-slate-700 transition-colors">
                No, cancelar
              </button>
              <button onClick={confirmAndApplyTask} className="flex-1 p-3 rounded-xl font-semibold text-white bg-yellow-500 hover:bg-yellow-600 transition-colors">
                Sí, restar
              </button>
            </div>
          </div>
        </div>
      )}

      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 w-full max-w-sm shadow-xl space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center">
              ¿Reiniciar cucharas?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-center text-sm">
              ¿Estás seguro que deseas reiniciar todas tus cucharas del día de hoy? Esta acción borrará el registro de hoy.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setShowResetConfirm(false)} className="flex-1 p-3 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:text-gray-300 dark:hover:bg-slate-700 transition-colors">
                Cancelar
              </button>
              <button onClick={confirmReset} className="flex-1 p-3 rounded-xl font-semibold text-white bg-red-500 hover:bg-red-600 transition-colors">
                Sí, reiniciar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
