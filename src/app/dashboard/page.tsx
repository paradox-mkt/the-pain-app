'use client';

import { Bell, Calendar, Pill, Plus, Activity, PlusCircle, User } from 'lucide-react';
import { useMockData } from '@/lib/MockDataContext';
import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const { 
    baseMedications, 
    medicationLogs, 
    toggleMedicationLog, 
    setIsCrisisModalOpen,
    crises,
    appointments,
    extraMeds,
    doctors
  } = useMockData();

  const [selectedDay, setSelectedDay] = useState(new Date().getDate());
  
  // Calculate today's meds dynamically based on selected date
  // For simplicity in the demo, we assume the selected day is always in the current month/year
  const todayDate = new Date();
  todayDate.setDate(selectedDay);
  const dateStr = todayDate.toISOString().split('T')[0];

  const todaysMeds = useMemo(() => {
    const medsList: { id: string, baseMedId: string, name: string, dose: string, time: string, taken: boolean }[] = [];
    
    baseMedications.filter(m => m.isActive).forEach(med => {
      let times: string[] = [];
      const [h, m] = med.firstDoseTime.split(':').map(Number);
      
      const addTime = (hours: number) => {
        const d = new Date();
        d.setHours(h + hours, m, 0);
        times.push(d.toTimeString().slice(0, 5));
      };

      if (med.frequency === '24h') addTime(0);
      else if (med.frequency === '12h') { addTime(0); addTime(12); }
      else if (med.frequency === '8h') { addTime(0); addTime(8); addTime(16); }
      else if (med.frequency === '6h') { addTime(0); addTime(6); addTime(12); addTime(18); }

      times.forEach(time => {
        const log = medicationLogs.find(l => l.baseMedId === med.id && l.date === dateStr && l.time === time);
        medsList.push({
          id: `${med.id}-${time}`,
          baseMedId: med.id,
          name: med.name,
          dose: med.dose,
          time,
          taken: !!log?.taken
        });
      });
    });

    return medsList.sort((a, b) => a.time.localeCompare(b.time));
  }, [baseMedications, medicationLogs, dateStr]);

  const todaysCrises = useMemo(() => crises.filter(c => c.dateTime.startsWith(dateStr)), [crises, dateStr]);
  const todaysExtraMeds = useMemo(() => extraMeds.filter(m => m.dateTime.startsWith(dateStr)), [extraMeds, dateStr]);
  const todaysAppointments = useMemo(() => appointments.filter(a => a.dateTime.startsWith(dateStr)), [appointments, dateStr]);

  const handleToggleMed = (baseMedId: string, time: string) => {
    toggleMedicationLog(baseMedId, dateStr, time);
  };

  return (
    <div className="p-4 space-y-6 pb-20 animate-in fade-in duration-500">
      {/* Header */}
      <header className="flex justify-between items-center pt-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Hola, Jane</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Resumen Diario</p>
        </div>
        <button className="p-2 bg-white dark:bg-slate-800 rounded-full shadow-sm border border-gray-100 dark:border-slate-700 relative">
          <Bell size={20} className="text-gray-700 dark:text-gray-300" />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-brand-500 rounded-full border-2 border-white dark:border-slate-800"></span>
        </button>
      </header>

      {/* Mini Calendar Strip */}
      <section>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Esta Semana</h2>
        </div>
        <div className="flex justify-between gap-2">
          {[19, 20, 21, 22, 23, 24, 25].map((day, i) => {
            const isToday = day === new Date().getDate();
            const isSelected = day === selectedDay;
            const days = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
            return (
              <button 
                key={day} 
                onClick={() => setSelectedDay(day)}
                className={`flex flex-col items-center justify-center p-2 rounded-xl min-w-[3rem] transition-all ${
                  isSelected 
                    ? 'bg-brand-500 text-white shadow-md shadow-brand-500/30 scale-110' 
                    : isToday 
                      ? 'bg-brand-100 text-brand-600 dark:bg-brand-900/30'
                      : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-400 border border-gray-100 dark:border-slate-700'
                }`}
              >
                <span className="text-xs font-medium mb-1">{days[i]}</span>
                <span className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-gray-900 dark:text-gray-100'}`}>{day}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Medications */}
      <section>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Tratamiento Diario</h2>
          <button 
            onClick={() => router.push('/dashboard/medicines')}
            className="text-brand-600 dark:text-brand-400 text-sm font-medium flex items-center bg-brand-50 dark:bg-brand-900/30 px-3 py-1 rounded-full hover:bg-brand-100 transition-colors"
          >
            Gestionar
          </button>
        </div>
        
        <div className="space-y-3">
          {todaysMeds.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4 bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700">No hay medicamentos programados para hoy.</p>
          ) : todaysMeds.map(med => (
            <div 
              key={med.id}
              onClick={() => handleToggleMed(med.baseMedId, med.time)}
              className={`bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 flex items-center justify-between cursor-pointer transition-all ${
                med.taken ? 'opacity-60 grayscale' : 'hover:border-brand-500/30'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${med.taken ? 'bg-gray-100 dark:bg-slate-700 text-gray-400' : 'bg-brand-50 dark:bg-brand-900/30 text-brand-500'}`}>
                  <Pill size={24} />
                </div>
                <div>
                  <h3 className={`font-semibold ${med.taken ? 'text-gray-500 line-through' : 'text-gray-900 dark:text-white'}`}>{med.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{med.dose}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-sm font-bold block ${med.taken ? 'text-gray-400' : 'text-gray-800 dark:text-gray-200'}`}>{med.time}</span>
                <span className={`text-xs font-medium ${med.taken ? 'text-green-500' : 'text-brand-500 animate-pulse'}`}>
                  {med.taken ? 'Tomado' : 'Pendiente'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Crises & Extra Meds Summary */}
      {(todaysCrises.length > 0 || todaysExtraMeds.length > 0) && (
        <section>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Eventos de Hoy</h2>
          <div className="space-y-3">
            {todaysCrises.map(crisis => (
              <div key={crisis.id} className="bg-red-50 dark:bg-red-900/20 p-4 rounded-2xl flex items-center justify-between border border-red-100 dark:border-red-900/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/50 text-red-500 flex items-center justify-center">
                    <Activity size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-red-900 dark:text-red-100">Crisis (Intensidad: {crisis.intensity})</h3>
                    <p className="text-xs text-red-600 dark:text-red-400">{crisis.dateTime.split('T')[1]}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {todaysExtraMeds.map(med => (
              <div key={med.id} className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-2xl flex items-center justify-between border border-orange-100 dark:border-orange-900/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/50 text-orange-500 flex items-center justify-center">
                    <PlusCircle size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-orange-900 dark:text-orange-100">{med.name} ({med.dose})</h3>
                    <p className="text-xs text-orange-600 dark:text-orange-400">Medicación Extra • {med.dateTime.split('T')[1]}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Appointments */}
      {todaysAppointments.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Citas de Hoy</h2>
          {todaysAppointments.map(appt => {
            const doc = doctors.find(d => d.id === appt.doctorId);
            return (
              <div key={appt.id} className="bg-gradient-to-br from-brand-500 to-brand-700 p-5 rounded-2xl text-white shadow-lg shadow-brand-500/20 relative overflow-hidden mb-3">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                <div className="flex items-start justify-between relative z-10">
                  <div>
                    <h3 className="font-bold text-xl mb-1">{doc?.name || 'Doctor'}</h3>
                    <p className="text-brand-100 text-sm">{doc?.specialty || 'Especialidad'}</p>
                    <div className="mt-4 flex items-center gap-2 text-sm text-brand-50 bg-black/20 w-fit px-3 py-1 rounded-full">
                      <Calendar size={14} />
                      <span>{appt.dateTime.split('T')[1]}</span>
                    </div>
                  </div>
                  <div className="bg-white/20 p-3 rounded-xl backdrop-blur-md">
                    <User size={24} className="text-white" />
                  </div>
                </div>
              </div>
            )
          })}
        </section>
      )}

    </div>
  );
}
