'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Activity, Calendar as CalendarIcon, Pill } from 'lucide-react';
import { useMockData } from '@/lib/MockDataContext';

export default function CalendarPage() {
  const { crises, appointments, extraMeds, setIsCrisisModalOpen, addAppointment, addExtraMed, doctors } = useMockData();
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  
  // Date state (simplified for demo)
  const [currentDate, setCurrentDate] = useState(new Date());

  // Add event modal state
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [showExtraMedModal, setShowExtraMedModal] = useState(false);

  // Forms state
  const [apptForm, setApptForm] = useState({ doctorId: '', dateTime: '', reason: '' });
  const [medForm, setMedForm] = useState({ name: '', dose: '', dateTime: '' });

  // Simplified calendar generation
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const blanks = Array(firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1).fill(null);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Combine all events to render
  const getEventsForDay = (day: number) => {
    const dayStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    
    const dayCrises = crises.filter(c => c.dateTime.startsWith(dayStr));
    const dayAppts = appointments.filter(a => a.dateTime.startsWith(dayStr));
    const dayMeds = extraMeds.filter(m => m.dateTime.startsWith(dayStr));

    return { dayCrises, dayAppts, dayMeds };
  };

  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));

  const handleAddAppt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apptForm.doctorId || !apptForm.dateTime) return;
    addAppointment(apptForm);
    setShowAppointmentModal(false);
    setApptForm({ doctorId: '', dateTime: '', reason: '' });
  };

  const handleAddMed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!medForm.name || !medForm.dateTime) return;
    addExtraMed(medForm);
    setShowExtraMedModal(false);
    setMedForm({ name: '', dose: '', dateTime: '' });
  };

  return (
    <div className="p-4 space-y-6 pb-24 animate-in fade-in duration-500 min-h-screen relative">
      <header className="pt-2">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Calendario</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Vista completa de tus registros y citas</p>
      </header>

      {/* Legend & View Selector */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div className="flex flex-wrap gap-3 text-xs font-semibold">
          <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div> Crisis
          </div>
          <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300">
            <div className="w-2.5 h-2.5 rounded-full bg-purple-500"></div> Citas Médicas
          </div>
          <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div> Med. Extra
          </div>
        </div>

        <div className="bg-gray-100 dark:bg-slate-800 p-1 rounded-xl flex text-sm font-medium self-stretch md:self-auto">
          <button onClick={() => setView('month')} className={`flex-1 px-4 py-1.5 rounded-lg transition-colors ${view === 'month' ? 'bg-white dark:bg-slate-900 shadow-sm text-brand-500' : 'text-gray-500'}`}>Mes</button>
          <button onClick={() => setView('week')} className={`flex-1 px-4 py-1.5 rounded-lg transition-colors ${view === 'week' ? 'bg-white dark:bg-slate-900 shadow-sm text-brand-500' : 'text-gray-500'}`}>Semana</button>
          <button onClick={() => setView('day')} className={`flex-1 px-4 py-1.5 rounded-lg transition-colors ${view === 'day' ? 'bg-white dark:bg-slate-900 shadow-sm text-brand-500' : 'text-gray-500'}`}>Día</button>
        </div>
      </div>

      {/* Calendar UI */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
        {/* Calendar Header */}
        <div className="p-4 flex items-center justify-between border-b border-gray-100 dark:border-slate-700">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white capitalize">
            {currentDate.toLocaleString('es-ES', { month: 'long', year: 'numeric' })}
          </h2>
          <div className="flex gap-2">
            <button onClick={prevMonth} className="p-2 bg-gray-50 dark:bg-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors">
              <ChevronLeft size={20} className="text-gray-600 dark:text-gray-300" />
            </button>
            <button onClick={nextMonth} className="p-2 bg-gray-50 dark:bg-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors">
              <ChevronRight size={20} className="text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>

        {/* Days of Week */}
        {view === 'month' ? (
          <>
            <div className="grid grid-cols-7 border-b border-gray-100 dark:border-slate-700">
              {['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB', 'DOM'].map(d => (
                <div key={d} className="p-3 text-center text-xs font-bold text-gray-400 dark:text-gray-500">{d}</div>
              ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-7">
              {blanks.map((_, i) => (
                <div key={`blank-${i}`} className="min-h-[80px] p-2 border-b border-r border-gray-100 dark:border-slate-700/50 bg-gray-50/50 dark:bg-slate-800/20"></div>
              ))}
              {days.map(day => {
                const { dayCrises, dayAppts, dayMeds } = getEventsForDay(day);
                const hasEvents = dayCrises.length > 0 || dayAppts.length > 0 || dayMeds.length > 0;
                const isToday = new Date().getDate() === day && new Date().getMonth() === currentDate.getMonth();

                return (
                  <div key={day} className="min-h-[80px] p-2 border-b border-r border-gray-100 dark:border-slate-700/50 relative hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors group">
                    <span className={`text-sm font-bold ${isToday ? 'bg-brand-500 text-white w-6 h-6 flex items-center justify-center rounded-full' : 'text-gray-900 dark:text-gray-300'}`}>
                      {day}
                    </span>
                    <div className="mt-2 space-y-1">
                      {dayCrises.length > 0 && <div className="w-full h-1.5 bg-red-500 rounded-full"></div>}
                      {dayAppts.length > 0 && <div className="w-full h-1.5 bg-purple-500 rounded-full"></div>}
                      {dayMeds.length > 0 && <div className="w-full h-1.5 bg-green-500 rounded-full"></div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400 flex flex-col items-center">
            <CalendarIcon size={48} className="mb-4 opacity-50" />
            <p className="font-semibold text-lg">Vista en construcción</p>
            <p className="text-sm">Por ahora, prueba interactuar con la vista mensual.</p>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-24 right-4 md:right-8 z-40">
        <button 
          onClick={() => setIsAddMenuOpen(!isAddMenuOpen)}
          className={`w-14 h-14 bg-brand-500 hover:bg-brand-600 text-white rounded-full flex items-center justify-center shadow-xl shadow-brand-500/30 transition-transform duration-300 ${isAddMenuOpen ? 'rotate-45' : ''}`}
        >
          <Plus size={32} />
        </button>

        {isAddMenuOpen && (
          <div className="absolute bottom-16 right-0 mb-4 flex flex-col gap-3 items-end animate-in slide-in-from-bottom-5">
            <button 
              onClick={() => { setIsCrisisModalOpen(true); setIsAddMenuOpen(false); }}
              className="flex items-center gap-3 bg-white dark:bg-slate-800 text-gray-900 dark:text-white px-4 py-2.5 rounded-full shadow-lg border border-gray-100 dark:border-slate-700 hover:scale-105 transition-transform"
            >
              <span className="text-sm font-semibold whitespace-nowrap">Registrar Crisis</span>
              <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 text-red-500 flex items-center justify-center"><Activity size={16} /></div>
            </button>
            <button 
              onClick={() => { setShowAppointmentModal(true); setIsAddMenuOpen(false); }}
              className="flex items-center gap-3 bg-white dark:bg-slate-800 text-gray-900 dark:text-white px-4 py-2.5 rounded-full shadow-lg border border-gray-100 dark:border-slate-700 hover:scale-105 transition-transform"
            >
              <span className="text-sm font-semibold whitespace-nowrap">Cita Médica</span>
              <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-500 flex items-center justify-center"><CalendarIcon size={16} /></div>
            </button>
            <button 
              onClick={() => { setShowExtraMedModal(true); setIsAddMenuOpen(false); }}
              className="flex items-center gap-3 bg-white dark:bg-slate-800 text-gray-900 dark:text-white px-4 py-2.5 rounded-full shadow-lg border border-gray-100 dark:border-slate-700 hover:scale-105 transition-transform"
            >
              <span className="text-sm font-semibold whitespace-nowrap">Medicación Extra</span>
              <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 text-green-500 flex items-center justify-center"><Pill size={16} /></div>
            </button>
          </div>
        )}
      </div>

      {/* Appointment Modal */}
      {showAppointmentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-4 border-b border-gray-100 dark:border-slate-800">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <CalendarIcon className="text-purple-500" /> Nueva Cita Médica
              </h2>
              <button onClick={() => setShowAppointmentModal(false)} className="text-gray-500">X</button>
            </div>
            <form onSubmit={handleAddAppt} className="p-4 space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-1">Doctor</label>
                <select required value={apptForm.doctorId} onChange={e => setApptForm({...apptForm, doctorId: e.target.value})} className="w-full p-3 border border-gray-200 dark:border-slate-700 rounded-xl bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white">
                  <option value="">Selecciona un médico</option>
                  {doctors.map(d => <option key={d.id} value={d.id}>{d.name} ({d.specialty})</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-1">Fecha y Hora</label>
                <input required type="datetime-local" value={apptForm.dateTime} onChange={e => setApptForm({...apptForm, dateTime: e.target.value})} className="w-full p-3 border border-gray-200 dark:border-slate-700 rounded-xl bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white" />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-1">Motivo (Opcional)</label>
                <input type="text" value={apptForm.reason} onChange={e => setApptForm({...apptForm, reason: e.target.value})} className="w-full p-3 border border-gray-200 dark:border-slate-700 rounded-xl bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white" placeholder="Ej: Control mensual" />
              </div>
              <button type="submit" className="w-full py-3 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-xl mt-2">Guardar Cita</button>
            </form>
          </div>
        </div>
      )}

      {/* Extra Medication Modal */}
      {showExtraMedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-4 border-b border-gray-100 dark:border-slate-800">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Pill className="text-green-500" /> Medicación Extra
              </h2>
              <button onClick={() => setShowExtraMedModal(false)} className="text-gray-500">X</button>
            </div>
            <form onSubmit={handleAddMed} className="p-4 space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-1">Medicamento</label>
                <input required type="text" value={medForm.name} onChange={e => setMedForm({...medForm, name: e.target.value})} className="w-full p-3 border border-gray-200 dark:border-slate-700 rounded-xl bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white" placeholder="Ej: Paracetamol" />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-1">Dosis (Opcional)</label>
                <input type="text" value={medForm.dose} onChange={e => setMedForm({...medForm, dose: e.target.value})} className="w-full p-3 border border-gray-200 dark:border-slate-700 rounded-xl bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white" placeholder="Ej: 1 pastilla" />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-1">Fecha y Hora</label>
                <input required type="datetime-local" value={medForm.dateTime} onChange={e => setMedForm({...medForm, dateTime: e.target.value})} className="w-full p-3 border border-gray-200 dark:border-slate-700 rounded-xl bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white" />
              </div>
              <button type="submit" className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl mt-2">Registrar Toma</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
