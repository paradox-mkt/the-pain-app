import { Settings, QrCode, ShieldAlert, LogOut, ChevronRight } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="p-4 space-y-6 pb-20 animate-in fade-in duration-500">
      <header className="pt-2 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mi Perfil</h1>
        <button className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
          <Settings size={24} />
        </button>
      </header>

      <div className="flex items-center gap-4 bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
        <div className="w-16 h-16 bg-brand-100 dark:bg-brand-900/50 rounded-full flex items-center justify-center text-brand-600 dark:text-brand-400 text-2xl font-bold">
          JD
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Jane Doe</h2>
          <p className="text-sm text-gray-500">patient@thepain.app</p>
        </div>
      </div>

      <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-2xl p-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <ShieldAlert size={100} className="text-red-500" />
        </div>
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
            <ShieldAlert size={20} />
            <h3 className="font-bold">Tarjeta de Emergencia</h3>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Muestra este código QR o enlace a personal médico en caso de emergencia para que vean tu historial, alergias y contactos.
          </p>
          <button className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors">
            <QrCode size={18} />
            Ver mi Tarjeta QR
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-2">Ajustes</h3>
        
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden divide-y divide-gray-100 dark:divide-slate-700">
          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
            <span className="text-gray-800 dark:text-gray-200 font-medium">Mis Médicos</span>
            <ChevronRight size={20} className="text-gray-400" />
          </button>
          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
            <span className="text-gray-800 dark:text-gray-200 font-medium">Configurar Recordatorios</span>
            <ChevronRight size={20} className="text-gray-400" />
          </button>
          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors text-red-500">
            <div className="flex items-center gap-2 font-medium">
              <LogOut size={18} />
              Cerrar Sesión
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
