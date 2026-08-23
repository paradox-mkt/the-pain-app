'use client';

import { Activity, Thermometer, PenTool } from 'lucide-react';
import { useMockData } from '@/lib/MockDataContext';

export default function DiaryPage() {
  const { crises, setIsCrisisModalOpen } = useMockData();

  return (
    <div className="p-4 space-y-6 pb-20 animate-in fade-in duration-500">
      <header className="pt-2 mb-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Registro de Crisis</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Documenta tus síntomas y brotes</p>
      </header>

      <button 
        onClick={() => setIsCrisisModalOpen(true)}
        className="w-full py-4 bg-red-500 hover:bg-red-600 text-white rounded-2xl font-semibold shadow-lg shadow-red-500/30 flex items-center justify-center gap-2 transition-transform active:scale-95"
      >
        <Activity size={20} />
        Registrar Nueva Crisis
      </button>

      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Historial Reciente</h2>
        
        <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 dark:before:via-slate-700 before:to-transparent">
          
          {crises.map((crisis, index) => (
            <div key={crisis.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-slate-900 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 ${
                crisis.intensity >= 7 ? 'bg-red-500' : 'bg-orange-400'
              } text-white`}>
                {crisis.intensity >= 7 ? <Thermometer size={16} /> : <PenTool size={16} />}
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
                <div className="flex justify-between items-center mb-1">
                  <span className={`font-bold ${crisis.intensity >= 7 ? 'text-red-500' : 'text-orange-500'}`}>Intensidad: {crisis.intensity}/10</span>
                  <time className="text-xs text-gray-500 font-medium">{crisis.date}</time>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">{crisis.notes}</p>
                {crisis.bodyParts && crisis.bodyParts.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {crisis.bodyParts.map(bp => (
                      <span key={bp} className="text-[10px] font-medium bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-2 py-0.5 rounded-full">{bp}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}
