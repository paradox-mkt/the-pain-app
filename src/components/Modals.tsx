'use client';

import { useState } from 'react';
import { useMockData } from '@/lib/MockDataContext';
import { X } from 'lucide-react';

export function CrisisModal() {
  const { isCrisisModalOpen, setIsCrisisModalOpen, addCrisis } = useMockData();
  const [intensity, setIntensity] = useState(5);
  const [notes, setNotes] = useState('');
  
  if (!isCrisisModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCrisis({
      intensity,
      notes: notes || 'Crisis registrada sin notas adicionales.',
      date: 'Justo ahora',
      bodyParts: ['General']
    });
    setIsCrisisModalOpen(false);
    setIntensity(5);
    setNotes('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-4 border-b border-gray-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Registrar Crisis</h2>
          <button onClick={() => setIsCrisisModalOpen(false)} className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-6">
          
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Intensidad del Dolor: <span className="text-red-500 font-bold">{intensity}/10</span></label>
            <input 
              type="range" min="1" max="10" 
              value={intensity} onChange={(e) => setIntensity(parseInt(e.target.value))}
              className="w-full accent-red-500"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>Leve</span>
              <span>Inaguantable</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Notas y Síntomas</label>
            <textarea 
              value={notes} onChange={(e) => setNotes(e.target.value)}
              placeholder="¿Cómo te sientes? ¿Qué lo provocó?"
              className="w-full p-3 border border-gray-200 dark:border-slate-700 rounded-xl bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 min-h-[100px]"
            />
          </div>

          <button type="submit" className="w-full py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-500/30 transition-colors">
            Guardar Registro
          </button>
        </form>
      </div>
    </div>
  );
}

export function MedModal() {
  const { isMedModalOpen, setIsMedModalOpen, addMedication } = useMockData();
  const [name, setName] = useState('');
  const [dose, setDose] = useState('');
  
  if (!isMedModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(!name) return;
    addMedication({
      name,
      dose: dose || '1 unidad',
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      taken: false
    });
    setIsMedModalOpen(false);
    setName('');
    setDose('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-4 border-b border-gray-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Añadir Medicamento</h2>
          <button onClick={() => setIsMedModalOpen(false)} className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Nombre del medicamento</label>
            <input 
              required
              type="text" 
              value={name} onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Ibuprofeno"
              className="w-full p-3 border border-gray-200 dark:border-slate-700 rounded-xl bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Dosis (Opcional)</label>
            <input 
              type="text" 
              value={dose} onChange={(e) => setDose(e.target.value)}
              placeholder="Ej: 600mg"
              className="w-full p-3 border border-gray-200 dark:border-slate-700 rounded-xl bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
          <button type="submit" className="w-full py-3 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-xl shadow-lg shadow-brand-500/30 transition-colors mt-2">
            Añadir
          </button>
        </form>
      </div>
    </div>
  );
}
