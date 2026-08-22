import { Bell, Calendar, Pill, Plus } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="p-4 space-y-6 pb-20 animate-in fade-in duration-500">
      {/* Header */}
      <header className="flex justify-between items-center pt-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Hola, Jane</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Jueves, 22 de Agosto</p>
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
            const isToday = day === 22;
            const days = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
            return (
              <div 
                key={day} 
                className={`flex flex-col items-center justify-center p-2 rounded-xl min-w-[3rem] ${
                  isToday 
                    ? 'bg-brand-500 text-white shadow-md shadow-brand-500/30' 
                    : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-400 border border-gray-100 dark:border-slate-700'
                }`}
              >
                <span className="text-xs font-medium mb-1">{days[i]}</span>
                <span className={`text-sm font-bold ${isToday ? 'text-white' : 'text-gray-900 dark:text-gray-100'}`}>{day}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Medications */}
      <section>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Medicamentos de hoy</h2>
          <button className="text-brand-600 dark:text-brand-400 text-sm font-medium flex items-center">
            <Plus size={16} className="mr-1"/> Añadir
          </button>
        </div>
        
        <div className="space-y-3">
          <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-blue-500 rounded-xl flex items-center justify-center">
                <Pill size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Pregabalina</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">75mg • Pastilla</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold text-gray-800 dark:text-gray-200 block">08:00 AM</span>
              <span className="text-xs text-green-500 font-medium">Tomado</span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 flex items-center justify-between opacity-60">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/30 text-purple-500 rounded-xl flex items-center justify-center">
                <Pill size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Duloxetina</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">60mg • Pastilla</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold text-gray-800 dark:text-gray-200 block">20:00 PM</span>
              <span className="text-xs text-gray-400 font-medium">Pendiente</span>
            </div>
          </div>
        </div>
      </section>

      {/* Appointments */}
      <section>
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Próxima Cita</h2>
        <div className="bg-gradient-to-br from-brand-600 to-brand-800 p-5 rounded-2xl text-white shadow-lg shadow-brand-500/20 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
          
          <div className="flex items-start justify-between relative z-10">
            <div>
              <h3 className="font-bold text-xl mb-1">Dr. Juan Pérez</h3>
              <p className="text-brand-100 text-sm">Reumatología</p>
              
              <div className="mt-4 flex items-center gap-2 text-sm text-brand-50">
                <Calendar size={16} />
                <span>28 de Agosto, 10:30 AM</span>
              </div>
            </div>
            
            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
              <img src="https://api.dicebear.com/9.x/avataaars/svg?seed=Felix" alt="Doctor" className="w-12 h-12 rounded-lg bg-brand-200" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
