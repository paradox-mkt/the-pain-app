'use client';

import { useEffect, useRef } from 'react';
import { useMockData } from '@/lib/MockDataContext';

export function PushNotificationManager() {
  const { pushEnabled, medications } = useMockData();
  const notifiedMeds = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!pushEnabled || typeof window === 'undefined' || !('Notification' in window) || Notification.permission !== 'granted') {
      return;
    }

    const interval = setInterval(() => {
      const now = new Date();
      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();

      medications.forEach(med => {
        if (!med.taken) {
          const [medH, medM] = med.time.split(':').map(Number);
          
          // If current time exactly matches or is up to 2 mins after (for demo purposes)
          const isTime = (currentHours === medH && currentMinutes === medM);
          
          // And we haven't notified for this specific med/time today
          const notifKey = `${med.id}-${med.time}-${now.toDateString()}`;
          
          if (isTime && !notifiedMeds.current.has(notifKey)) {
            new Notification('¡Hora de tu medicina!', {
              body: `Es hora de tomar tu ${med.name} (${med.dose}). Por favor márcala en la aplicación.`,
              icon: '/favicon.ico'
            });
            notifiedMeds.current.add(notifKey);
          }
        }
      });
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [pushEnabled, medications]);

  return null; // This component doesn't render anything visible
}
