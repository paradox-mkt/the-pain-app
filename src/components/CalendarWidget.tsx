'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Helpers simples para no depender de date-fns por ahora
const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year: number, month: number) => {
  let day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1; // Ajuste para que Lunes sea 0
};

export default function CalendarWidget() {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  
  const dayNames = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  // Datos mock para visualización
  const events = {
    5: [{ type: 'crisis', color: 'bg-red-500' }],
    12: [{ type: 'appointment', color: 'bg-brand-500' }],
    14: [{ type: 'med', color: 'bg-green-500' }, { type: 'crisis', color: 'bg-red-500' }],
    22: [{ type: 'med', color: 'bg-green-500' }],
    28: [{ type: 'appointment', color: 'bg-brand-500' }]
  };

  const renderCells = () => {
    const cells = [];
    const today = new Date();
    
    // Celdas vacías del principio
    for (let i = 0; i < firstDay; i++) {
      cells.push(<div key={`empty-${i}`} className="h-24 sm:h-32 border border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900/50"></div>);
    }
    
    // Días del mes
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
      const dayEvents = events[day as keyof typeof events] || [];
      
      cells.push(
        <div 
          key={day} 
          className={`h-24 sm:h-32 border border-gray-100 dark:border-slate-800 p-1 sm:p-2 transition-colors hover:bg-brand-50 dark:hover:bg-slate-800 cursor-pointer ${
            isToday ? 'bg-brand-50/30 dark:bg-brand-900/10' : 'bg-white dark:bg-slate-900'
          }`}
        >
          <div className="flex justify-between items-start">
            <span className={`text-sm sm:text-base font-semibold w-7 h-7 flex items-center justify-center rounded-full ${
              isToday 
                ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20' 
                : 'text-gray-700 dark:text-gray-300'
            }`}>
              {day}
            </span>
          </div>
          
          <div className="mt-1 sm:mt-2 space-y-1">
            {dayEvents.map((evt, i) => (
              <div key={i} className={`h-1.5 sm:h-2 w-full rounded-full ${evt.color} opacity-80`}></div>
            ))}
          </div>
        </div>
      );
    }
    
    return cells;
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-800 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200 dark:border-slate-800">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white capitalize">
          {monthNames[month]} {year}
        </h2>
        <div className="flex items-center gap-2">
          <button onClick={prevMonth} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-600 dark:text-gray-400 transition-colors">
            <ChevronLeft size={20} />
          </button>
          <button onClick={nextMonth} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-600 dark:text-gray-400 transition-colors">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      
      {/* Grid */}
      <div className="grid grid-cols-7 border-b border-gray-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-950">
        {dayNames.map(day => (
          <div key={day} className="py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7">
        {renderCells()}
      </div>
    </div>
  );
}
