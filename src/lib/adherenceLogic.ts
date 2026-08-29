import type { BaseMedication, MedicationLog } from '@/lib/MockDataContext';

export function calculateAdherence(med: BaseMedication, logs: MedicationLog[]): { percentage: number; status: 'good' | 'warning' | 'bad' | 'pending' } {
  if (!med.startDate) return { percentage: 0, status: 'pending' };

  const start = new Date(med.startDate);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;

  let expectedDoses = 0;

  switch (med.medicationType) {
    case 'daily':
      let dosesPerDay = 1;
      if (med.frequency === '12h') dosesPerDay = 2;
      if (med.frequency === '8h') dosesPerDay = 3;
      if (med.frequency === '6h') dosesPerDay = 4;
      expectedDoses = diffDays * dosesPerDay;
      break;
    case 'weekly':
      expectedDoses = Math.max(1, Math.floor(diffDays / 7));
      break;
    case 'biweekly':
      expectedDoses = Math.max(1, Math.floor(diffDays / 14));
      break;
    case 'monthly':
      expectedDoses = Math.max(1, Math.floor(diffDays / 30));
      break;
  }

  // Count how many times the user actually took the medication
  const takenDoses = logs.filter(l => l.baseMedId === med.id && l.taken).length;

  if (expectedDoses === 0) return { percentage: 100, status: 'good' };

  // Calculate percentage
  let percentage = Math.round((takenDoses / expectedDoses) * 100);
  if (percentage > 100) percentage = 100; // Cap at 100% just in case of extra logs

  // If no time has passed or no logs yet but expected is very low (like just started today)
  if (expectedDoses === 1 && takenDoses === 0 && diffDays <= 1) {
    return { percentage: 100, status: 'pending' };
  }

  let status: 'good' | 'warning' | 'bad' = 'good';
  if (percentage >= 80) status = 'good';
  else if (percentage >= 50) status = 'warning';
  else status = 'bad';

  return { percentage, status };
}
