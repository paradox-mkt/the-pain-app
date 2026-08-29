import { useMemo } from 'react';

type Zone = 'GREEN' | 'YELLOW' | 'RED';

const MESSAGES = {
  GREEN: [
    "🔋 ¡Energía al máximo! Recuerda aplicar la regla del 70%: guarda una reserva para mañana y programa tu primera pausa activa.",
    "🌿 Hoy te sientes bien, pero el pacing empieza ahora. Haz una micro-pausa de 5 minutos antes de tu siguiente tarea.",
    "⚖️ Estás en Zona Verde. Intercala tus actividades con descansos para mantener tu batería estable."
  ],
  YELLOW: [
    "⚠️ Tu cuerpo está empezando a enviar señales (rigidez/cansancio). Es momento de parar 15 minutos y descansar sin pantallas.",
    "🥄 Te quedan pocas cucharas. Revisa tu lista del día: ¿qué tarea puedes delegar o posponer hoy?",
    "🧠 Sensación de fatiga o niebla mental detectada. Cambia a una actividad de bajo impacto o realiza una pausa somática."
  ],
  RED: [
    "🛑 Entrando en Zona Roja. Activa el Modo Ahorro de Energía: tu única prioridad ahora es descansar y cuidarte.",
    "🛋️ Límite alcanzado. Recuerda que descansar no es rendirse, es medicina. Cancela lo prescindible sin culpa.",
    "🫂 Tu cuerpo necesita pausa total. Respira profundo, ponte cómoda y recarga tus cucharas a tu propio ritmo."
  ]
};

export const usePacing = (currentSpoons: number, totalSpoons: number = 12) => {
  const zoneInfo = useMemo(() => {
    // Si no hay cucharas totales por alguna razón, evitamos divisiones por 0 o NaN
    const safeTotal = totalSpoons || 12;
    const redLimit = Math.floor(safeTotal / 3);
    const yellowLimit = Math.floor((safeTotal * 2) / 3);

    let currentZone: Zone = 'GREEN';
    if (currentSpoons <= redLimit) {
      currentZone = 'RED';
    } else if (currentSpoons <= yellowLimit) {
      currentZone = 'YELLOW';
    }

    const zoneMessages = MESSAGES[currentZone];
    const randomMessage = zoneMessages[Math.floor(Math.random() * zoneMessages.length)];

    return {
      zone: currentZone,
      message: randomMessage,
      color: currentZone === 'GREEN' ? 'bg-emerald-500' : currentZone === 'YELLOW' ? 'bg-amber-500' : 'bg-rose-500',
      progressColor: currentZone === 'GREEN' ? 'text-emerald-600 dark:text-emerald-400' : currentZone === 'YELLOW' ? 'text-amber-600 dark:text-amber-400' : 'text-rose-600 dark:text-rose-400',
    };
  }, [currentSpoons, totalSpoons]);

  return zoneInfo;
};

export const triggerMicroReminder = (currentSpoons: number, totalSpoons: number = 12) => {
  if (typeof window === 'undefined' || !("Notification" in window) || Notification.permission !== "granted") return;

  const safeTotal = totalSpoons || 12;
  const percentage = currentSpoons / safeTotal;
  
  const reminders = [
    {
      title: "Pausa de Respiración 🫁",
      body: "Pausa de 1 minuto: Cierra los ojos, suelta los hombros y toma una respiración diafragmática profunda.",
      condition: () => true 
    },
    {
      title: "Check-in Energético 📊",
      body: "¿Cómo va tu nivel de cucharas? Entra a la app y actualiza tu semáforo energético para ajustar tu día.",
      condition: () => true 
    },
    {
      title: "Alerta de Pacing ⚠️",
      body: "Tu batería está por debajo de la mitad. Asegúrate de hacer una pausa antes de seguir.",
      condition: () => percentage <= 0.5 
    }
  ];

  const validReminders = reminders.filter(r => r.condition());
  const selected = validReminders[Math.floor(Math.random() * validReminders.length)];

  new Notification(selected.title, {
    body: selected.body,
  });
};
