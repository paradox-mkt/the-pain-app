import CalendarWidget from '@/components/CalendarWidget';

export default function CalendarPage() {
  return (
    <div className="p-4 sm:p-6 space-y-6 animate-in fade-in duration-500">
      <header className="pt-2 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Calendario</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Vista completa de tus registros y citas</p>
      </header>

      {/* Leyenda */}
      <div className="flex flex-wrap gap-4 mb-4 text-sm font-medium">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span className="text-gray-700 dark:text-gray-300">Crisis</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-brand-500"></div>
          <span className="text-gray-700 dark:text-gray-300">Citas Médicas</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-gray-700 dark:text-gray-300">Medicamentos Extra</span>
        </div>
      </div>

      {/* Calendario Interactivo */}
      <CalendarWidget />
    </div>
  );
}
