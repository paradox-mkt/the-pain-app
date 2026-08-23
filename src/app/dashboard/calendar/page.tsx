'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Activity, Calendar as CalendarIcon, Pill, Clock, Trash2, AlertTriangle } from 'lucide-react';
import { useMockData } from '@/lib/MockDataContext';

export default function CalendarPage() {
  const { 
    crises, appointments, extraMeds, 
    setIsCrisisModalOpen, setCrisisModalDefaultDate, setEditingCrisisId,
    addAppointment, updateAppointment, deleteAppointment, 
    addExtraMed, updateExtraMed, deleteExtraMed, 
    doctors 
  } = useMockData();
  
  const [view, setView] = useState<'month' | 'week' | 'day'>('day');
  
  // Date state
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Add event modal state
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [showExtraMedModal, setShowExtraMedModal] = useState(false);

  // Edit states
  const [editingApptId, setEditingApptId] = useState<string | null>(null);
  const [editingMedId, setEditingMedId] = useState<string | null>(null);

  // Delete confirm states
  const [showApptDeleteConfirm, setShowApptDeleteConfirm] = useState(false);
  const [apptDeleteText, setApptDeleteText] = useState('');
  const [showMedDeleteConfirm, setShowMedDeleteConfirm] = useState(false);
  const [medDeleteText, setMedDeleteText] = useState('');

  // Forms state
  const [apptForm, setApptForm] = useState({ doctorId: '', dateTime: '', reason: '' });
  const [medForm, setMedForm] = useState({ name: '', dose: '', dateTime: '' });

  // Calendar generation helpers
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const blanks = Array(firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1).fill(null);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const getWeekDays = (date: Date) => {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Monday start
    const startOfWeek = new Date(date.getFullYear(), date.getMonth(), diff);
    return Array.from({ length: 7 }, (_, i) => new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate() + i));
  };

  const formatDateString = (date: Date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const getEventsForDay = (date: Date) => {
    const dayStr = formatDateString(date);
    const dayCrises = crises.filter(c => c.dateTime.startsWith(dayStr));
    const dayAppts = appointments.filter(a => a.dateTime.startsWith(dayStr));
    const dayMeds = extraMeds.filter(m => m.dateTime.startsWith(dayStr));
    return { dayCrises, dayAppts, dayMeds };
  };

  const nextPeriod = () => {
    if (view === 'month') setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    else if (view === 'week') setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 7));
    else setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() + 1));
  };

  const prevPeriod = () => {
    if (view === 'month') setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    else if (view === 'week') setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 7));
    else setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() - 1));
  };

  const handleDayClick = (day: number, dateObj?: Date) => {
    const newSelected = dateObj || new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(newSelected);
    setView('day');
  };

  const openApptModalForSelected = () => {
    setEditingApptId(null);
    setShowApptDeleteConfirm(false);
    setApptDeleteText('');
    setApptForm({ doctorId: '', dateTime: `${formatDateString(selectedDate)}T09:00`, reason: '' });
    setShowAppointmentModal(true);
  };

  const openMedModalForSelected = () => {
    setEditingMedId(null);
    setShowMedDeleteConfirm(false);
    setMedDeleteText('');
    setMedForm({ name: '', dose: '', dateTime: `${formatDateString(selectedDate)}T12:00` });
    setShowExtraMedModal(true);
  };

  const openCrisisModalForSelected = () => {
    setCrisisModalDefaultDate(`${formatDateString(selectedDate)}T12:00`);
    setIsCrisisModalOpen(true);
  };

  const handleEditEvent = (event: any) => {
    if (event.type === 'crisis') {
      setEditingCrisisId(event.data.id);
      setIsCrisisModalOpen(true);
    } else if (event.type === 'appointment') {
      setEditingApptId(event.data.id);
      setApptForm({ doctorId: event.data.doctorId, dateTime: event.data.dateTime, reason: event.data.reason || '' });
      setShowApptDeleteConfirm(false);
      setApptDeleteText('');
      setShowAppointmentModal(true);
    } else if (event.type === 'med') {
      setEditingMedId(event.data.id);
      setMedForm({ name: event.data.name, dose: event.data.dose || '', dateTime: event.data.dateTime });
      setShowMedDeleteConfirm(false);
      setMedDeleteText('');
      setShowExtraMedModal(true);
    }
  };

  const handleAddAppt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apptForm.doctorId || !apptForm.dateTime) return;
    if (editingApptId) {
      updateAppointment(editingApptId, apptForm);
    } else {
      addAppointment(apptForm);
    }
    setShowAppointmentModal(false);
  };

  const handleDeleteAppt = () => {
    if (editingApptId && apptDeleteText === 'BORRAR') {
      deleteAppointment(editingApptId);
      setShowAppointmentModal(false);
    }
  };

  const handleAddMed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!medForm.name || !medForm.dateTime) return;
    if (editingMedId) {
      updateExtraMed(editingMedId, medForm);
    } else {
      addExtraMed(medForm);
    }
    setShowExtraMedModal(false);
  };

  const handleDeleteMed = () => {
    if (editingMedId && medDeleteText === 'BORRAR') {
      deleteExtraMed(editingMedId);
      setShowExtraMedModal(false);
    }
  };

  const { dayCrises: selCrises, dayAppts: selAppts, dayMeds: selMeds } = getEventsForDay(selectedDate);
  const allEventsForSelected = [
    ...selCrises.map(c => ({ type: 'crisis' as const, time: c.dateTime.split('T')[1], data: c })),
    ...selAppts.map(a => ({ type: 'appointment' as const, time: a.dateTime.split('T')[1], data: a })),
    ...selMeds.map(m => ({ type: 'med' as const, time: m.dateTime.split('T')[1], data: m }))
  ].sort((a, b) => a.time.localeCompare(b.time));

  return (
    <div className="p-4 space-y-6 pb-24 animate-in fade-in duration-500 min-h-screen relative">
      <header className="pt-2">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Calendario</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Visualiza tus crisis, citas y tomas extra</p>
      </header>

      {/* View Selector */}
      <div className="bg-gray-100 dark:bg-slate-800 p-1 rounded-xl flex text-sm font-medium w-full">
        <button onClick={() => setView('month')} className={`flex-1 px-4 py-2 rounded-lg transition-colors ${view === 'month' ? 'bg-white dark:bg-slate-900 shadow-sm text-brand-500' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}>Mes</button>
        <button onClick={() => setView('week')} className={`flex-1 px-4 py-2 rounded-lg transition-colors ${view === 'week' ? 'bg-white dark:bg-slate-900 shadow-sm text-brand-500' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}>Semana</button>
        <button onClick={() => setView('day')} className={`flex-1 px-4 py-2 rounded-lg transition-colors ${view === 'day' ? 'bg-white dark:bg-slate-900 shadow-sm text-brand-500' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}>Día</button>
      </div>

      {/* Legends */}
      <div className="flex flex-wrap gap-4 text-xs font-semibold justify-center">
        <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-sm shadow-red-500/50"></div> Crisis
        </div>
        <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300">
          <div className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-sm shadow-purple-500/50"></div> Citas Médicas
        </div>
        <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300">
          <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-sm shadow-green-500/50"></div> Med. Extra
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
        {/* Header Control */}
        <div className="p-4 flex items-center justify-between border-b border-gray-100 dark:border-slate-700 bg-gray-50/50 dark:bg-slate-800/50">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white capitalize">
            {view === 'day' 
              ? selectedDate.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'short' })
              : currentDate.toLocaleString('es-ES', { month: 'long', year: 'numeric' })}
          </h2>
          <div className="flex gap-2">
            <button onClick={prevPeriod} className="p-2 bg-white dark:bg-slate-700 rounded-lg shadow-sm hover:bg-gray-50 transition-colors border border-gray-100 dark:border-slate-600">
              <ChevronLeft size={20} className="text-gray-600 dark:text-gray-300" />
            </button>
            <button onClick={nextPeriod} className="p-2 bg-white dark:bg-slate-700 rounded-lg shadow-sm hover:bg-gray-50 transition-colors border border-gray-100 dark:border-slate-600">
              <ChevronRight size={20} className="text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>

        {/* View Renderers */}
        {view === 'month' && (
          <div>
            <div className="grid grid-cols-7 border-b border-gray-100 dark:border-slate-700">
              {['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB', 'DOM'].map(d => (
                <div key={d} className="p-2 text-center text-[10px] sm:text-xs font-bold text-gray-400 dark:text-gray-500">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7">
              {blanks.map((_, i) => (
                <div key={`blank-${i}`} className="min-h-[80px] p-1 border-b border-r border-gray-100 dark:border-slate-700/50 bg-gray-50/50 dark:bg-slate-800/20"></div>
              ))}
              {days.map(day => {
                const { dayCrises, dayAppts, dayMeds } = getEventsForDay(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
                const isToday = new Date().getDate() === day && new Date().getMonth() === currentDate.getMonth();

                return (
                  <div 
                    key={day} 
                    onClick={() => handleDayClick(day)}
                    className="min-h-[80px] p-2 border-b border-r border-gray-100 dark:border-slate-700/50 relative hover:bg-brand-50 dark:hover:bg-slate-700/40 transition-colors cursor-pointer group"
                  >
                    <span className={`text-sm font-bold ${isToday ? 'bg-brand-500 text-white w-6 h-6 flex items-center justify-center rounded-full' : 'text-gray-900 dark:text-gray-300'}`}>
                      {day}
                    </span>
                    <div className="mt-1 flex flex-col gap-1">
                      {dayCrises.length > 0 && <div className="w-full h-1.5 bg-red-500 rounded-full"></div>}
                      {dayAppts.length > 0 && <div className="w-full h-1.5 bg-purple-500 rounded-full"></div>}
                      {dayMeds.length > 0 && <div className="w-full h-1.5 bg-green-500 rounded-full"></div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {view === 'week' && (
          <div>
            <div className="grid grid-cols-7 border-b border-gray-100 dark:border-slate-700">
              {['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB', 'DOM'].map(d => (
                <div key={d} className="p-2 text-center text-[10px] sm:text-xs font-bold text-gray-400 dark:text-gray-500">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7">
              {getWeekDays(currentDate).map((date, i) => {
                const { dayCrises, dayAppts, dayMeds } = getEventsForDay(date);
                const isToday = formatDateString(new Date()) === formatDateString(date);

                return (
                  <div 
                    key={i} 
                    onClick={() => handleDayClick(date.getDate(), date)}
                    className="min-h-[200px] p-2 border-r border-gray-100 dark:border-slate-700/50 hover:bg-brand-50 dark:hover:bg-slate-700/40 transition-colors cursor-pointer"
                  >
                    <div className="text-center mb-2">
                      <span className={`text-sm font-bold inline-block ${isToday ? 'bg-brand-500 text-white w-7 h-7 leading-7 rounded-full' : 'text-gray-900 dark:text-gray-300'}`}>
                        {date.getDate()}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      {dayCrises.map(c => (
                        <div key={c.id} className="text-[10px] bg-red-100 text-red-700 p-1 rounded font-medium truncate">Crisis {c.intensity}/10</div>
                      ))}
                      {dayAppts.map(a => (
                        <div key={a.id} className="text-[10px] bg-purple-100 text-purple-700 p-1 rounded font-medium truncate">Cita Médica</div>
                      ))}
                      {dayMeds.map(m => (
                        <div key={m.id} className="text-[10px] bg-green-100 text-green-700 p-1 rounded font-medium truncate">{m.name}</div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {view === 'day' && (
          <div className="p-4 sm:p-6 bg-gray-50 dark:bg-slate-900/50">
            
            {/* Quick Actions for this day */}
            <div className="grid grid-cols-3 gap-2 mb-8">
              <button onClick={openCrisisModalForSelected} className="flex flex-col items-center justify-center p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-red-100 dark:border-red-900/30 hover:border-red-300 transition-colors gap-2 group">
                <div className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition-colors"><Activity size={20} /></div>
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Registrar Crisis</span>
              </button>
              <button onClick={openApptModalForSelected} className="flex flex-col items-center justify-center p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-purple-100 dark:border-purple-900/30 hover:border-purple-300 transition-colors gap-2 group">
                <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center group-hover:bg-purple-500 group-hover:text-white transition-colors"><CalendarIcon size={20} /></div>
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Añadir Cita</span>
              </button>
              <button onClick={openMedModalForSelected} className="flex flex-col items-center justify-center p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-green-100 dark:border-green-900/30 hover:border-green-300 transition-colors gap-2 group">
                <div className="w-10 h-10 rounded-full bg-green-50 text-green-500 flex items-center justify-center group-hover:bg-green-500 group-hover:text-white transition-colors"><Pill size={20} /></div>
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Med. Extra</span>
              </button>
            </div>

            {/* Timeline */}
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 dark:before:via-slate-700 before:to-transparent">
              {allEventsForSelected.length === 0 ? (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  <CalendarIcon size={48} className="mx-auto mb-4 opacity-20" />
                  <p>No hay eventos registrados para este día.</p>
                </div>
              ) : (
                allEventsForSelected.map((event, idx) => (
                  <div key={idx} onClick={() => handleEditEvent(event)} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active cursor-pointer">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-gray-50 dark:border-slate-900 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 shadow-sm transition-transform group-hover:scale-110
                      ${event.type === 'crisis' ? 'bg-red-500' : event.type === 'appointment' ? 'bg-purple-500' : 'bg-green-500'}"
                      style={{ backgroundColor: event.type === 'crisis' ? '#ef4444' : event.type === 'appointment' ? '#a855f7' : '#22c55e' }}
                    >
                      {event.type === 'crisis' && <Activity size={16} className="text-white" />}
                      {event.type === 'appointment' && <CalendarIcon size={16} className="text-white" />}
                      {event.type === 'med' && <Pill size={16} className="text-white" />}
                    </div>
                    
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 hover:border-brand-500 transition-colors group-hover:shadow-md">
                      <div className="flex items-center gap-2 mb-2 text-xs font-bold text-gray-400 dark:text-gray-500">
                        <Clock size={14} /> {event.time}
                      </div>
                      
                      {event.type === 'crisis' && (
                        <div>
                          <h3 className="font-bold text-red-600 dark:text-red-400 mb-1">Crisis de Dolor ({event.data.intensity}/10)</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{event.data.notes}</p>
                        </div>
                      )}

                      {event.type === 'appointment' && (
                        <div>
                          <h3 className="font-bold text-purple-600 dark:text-purple-400 mb-1">Cita Médica</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">Doctor ID: {event.data.doctorId}</p>
                          {event.data.reason && <p className="text-xs text-gray-500 mt-1">Motivo: {event.data.reason}</p>}
                        </div>
                      )}

                      {event.type === 'med' && (
                        <div>
                          <h3 className="font-bold text-green-600 dark:text-green-400 mb-1">Medicación Adicional</h3>
                          <p className="text-sm text-gray-900 dark:text-white font-medium">{event.data.name}</p>
                          {event.data.dose && <p className="text-xs text-gray-500 mt-1">Dosis: {event.data.dose}</p>}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>
        )}
      </div>

      {/* Appointment Modal */}
      {showAppointmentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-4 border-b border-gray-100 dark:border-slate-800">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <CalendarIcon className="text-purple-500" /> {editingApptId ? 'Editar Cita' : 'Añadir Cita'}
              </h2>
              <button onClick={() => setShowAppointmentModal(false)} className="text-gray-500 text-xl font-bold p-2">&times;</button>
            </div>
            
            <div className="overflow-y-auto flex-1">
              {!showApptDeleteConfirm ? (
                <form id="appt-form" onSubmit={handleAddAppt} className="p-4 space-y-4">
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
                </form>
              ) : (
                <div className="p-6 text-center space-y-6 animate-in slide-in-from-right-4">
                  <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle size={32} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">¿Eliminar esta cita?</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Esta acción no se puede deshacer.</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-xl text-left">
                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Escribe <strong className="text-red-500">BORRAR</strong></p>
                    <input 
                      type="text" 
                      value={apptDeleteText}
                      onChange={(e) => setApptDeleteText(e.target.value)}
                      placeholder="Escribe BORRAR aquí"
                      className="w-full p-3 border border-red-200 dark:border-red-800/50 rounded-xl bg-white dark:bg-slate-900 text-gray-900 dark:text-white text-center font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => { setShowApptDeleteConfirm(false); setApptDeleteText(''); }} className="flex-1 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-slate-700 text-gray-800 dark:text-white font-semibold rounded-xl">Cancelar</button>
                    <button onClick={handleDeleteAppt} disabled={apptDeleteText !== 'BORRAR'} className="flex-1 py-3 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white font-bold rounded-xl disabled:cursor-not-allowed">Confirmar</button>
                  </div>
                </div>
              )}
            </div>
            
            {!showApptDeleteConfirm && (
              <div className="p-4 border-t border-gray-100 dark:border-slate-800 shrink-0 bg-white dark:bg-slate-900 flex flex-col gap-3">
                <button form="appt-form" type="submit" className="w-full py-3 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-xl transition-colors">
                  {editingApptId ? 'Guardar Cambios' : 'Añadir Cita'}
                </button>
                {editingApptId && (
                  <button onClick={() => setShowApptDeleteConfirm(true)} className="w-full py-2 flex items-center justify-center gap-2 text-red-500 hover:text-red-600 font-semibold transition-colors">
                    <Trash2 size={18} /> Eliminar Cita
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Extra Medication Modal */}
      {showExtraMedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-4 border-b border-gray-100 dark:border-slate-800">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Pill className="text-green-500" /> {editingMedId ? 'Editar Medicación' : 'Medicación Extra'}
              </h2>
              <button onClick={() => setShowExtraMedModal(false)} className="text-gray-500 text-xl font-bold p-2">&times;</button>
            </div>
            
            <div className="overflow-y-auto flex-1">
              {!showMedDeleteConfirm ? (
                <form id="med-form" onSubmit={handleAddMed} className="p-4 space-y-4">
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
                </form>
              ) : (
                <div className="p-6 text-center space-y-6 animate-in slide-in-from-right-4">
                  <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle size={32} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">¿Eliminar este registro?</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Esta acción no se puede deshacer.</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-xl text-left">
                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Escribe <strong className="text-red-500">BORRAR</strong></p>
                    <input 
                      type="text" 
                      value={medDeleteText}
                      onChange={(e) => setMedDeleteText(e.target.value)}
                      placeholder="Escribe BORRAR aquí"
                      className="w-full p-3 border border-red-200 dark:border-red-800/50 rounded-xl bg-white dark:bg-slate-900 text-gray-900 dark:text-white text-center font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => { setShowMedDeleteConfirm(false); setMedDeleteText(''); }} className="flex-1 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-slate-700 text-gray-800 dark:text-white font-semibold rounded-xl">Cancelar</button>
                    <button onClick={handleDeleteMed} disabled={medDeleteText !== 'BORRAR'} className="flex-1 py-3 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white font-bold rounded-xl disabled:cursor-not-allowed">Confirmar</button>
                  </div>
                </div>
              )}
            </div>
            
            {!showMedDeleteConfirm && (
              <div className="p-4 border-t border-gray-100 dark:border-slate-800 shrink-0 bg-white dark:bg-slate-900 flex flex-col gap-3">
                <button form="med-form" type="submit" className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-colors">
                  {editingMedId ? 'Guardar Cambios' : 'Registrar Toma'}
                </button>
                {editingMedId && (
                  <button onClick={() => setShowMedDeleteConfirm(true)} className="w-full py-2 flex items-center justify-center gap-2 text-red-500 hover:text-red-600 font-semibold transition-colors">
                    <Trash2 size={18} /> Eliminar Toma
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
