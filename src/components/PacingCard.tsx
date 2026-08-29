import React, { useEffect, useRef } from 'react';
import { usePacing, triggerMicroReminder } from '@/hooks/usePacing';

interface PacingCardProps {
  currentSpoons: number;
  totalSpoons?: number;
}

export const PacingCard: React.FC<PacingCardProps> = ({ currentSpoons, totalSpoons = 12 }) => {
  const { zone, message, color, progressColor } = usePacing(currentSpoons, totalSpoons);
  const prevZoneRef = useRef(zone);
  
  const percentage = Math.max(0, Math.min(100, (currentSpoons / (totalSpoons || 12)) * 100));

  // Solicitar permisos al montar
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  // Notificaciones Automáticas al bajar de Zona
  useEffect(() => {
    if (prevZoneRef.current !== zone) {
      if (zone === 'YELLOW' || zone === 'RED') {
        const timer = setTimeout(() => {
          triggerMicroReminder(currentSpoons, totalSpoons);
        }, 2000); // 2 segundos de delay
        prevZoneRef.current = zone;
        return () => clearTimeout(timer);
      }
      prevZoneRef.current = zone;
    }
  }, [zone, currentSpoons, totalSpoons]);

  return (
    <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 flex flex-col gap-3 mt-4 animate-in fade-in">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2 text-sm">
          <span className={`w-3 h-3 rounded-full ${color} ${zone === 'RED' ? 'animate-pulse' : ''}`}></span>
          Estado de Energía (Pacing)
        </h3>
        <span className={`font-bold text-sm ${progressColor}`}>
          {currentSpoons} / {totalSpoons}
        </span>
      </div>

      <div className="h-2.5 w-full bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div 
          className={`h-full ${color} transition-all duration-700 ease-out`} 
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 leading-relaxed bg-gray-50 dark:bg-slate-800/50 p-3 rounded-xl">
        {message}
      </p>
    </div>
  );
};
