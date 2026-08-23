'use client';

import { useEffect, useRef } from 'react';
import { useMockData } from '@/lib/MockDataContext';

export function PushNotificationManager() {
  const { pushEnabled, baseMedications } = useMockData();
  const notifiedMeds = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!pushEnabled || typeof window === 'undefined' || !('Notification' in window) || Notification.permission !== 'granted') {
      return;
    }

    const interval = setInterval(() => {
      const now = new Date();
      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();

      baseMedications.forEach(med => {
        if (!med.isActive) return;
        const [medH, medM] = med.firstDoseTime.split(':').map(Number);
        
        // Very simplified demo push logic
        const isTime = (currentHours === medH && currentMinutes === medM);
        const notifKey = `${med.id}-${now.toDateString()}`;
        
        if (isTime && !notifiedMeds.current.has(notifKey)) {
          new Notification('¡Hora de tu medicina!', {
            body: `Te toca tomar ${med.name} (${med.dose})`,
            icon: '/icon-192x192.png'
          });
          notifiedMeds.current.add(notifKey);
        }
      });
    }, 60000);

    return () => clearInterval(interval);
  }, [pushEnabled, baseMedications]);

  return null; // This component doesn't render anything visible
}
