'use client';

import { useState } from 'react';
import { Settings, QrCode, ShieldAlert, LogOut, ChevronRight, X } from 'lucide-react';

export default function ProfilePage() {
  const [showQR, setShowQR] = useState(false);

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
          <button 
            onClick={() => setShowQR(true)}
            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
          >
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

      {showQR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-3xl shadow-2xl p-8 flex flex-col items-center relative animate-in zoom-in-95 duration-200 border border-red-500/20">
            <button onClick={() => setShowQR(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 dark:hover:text-white">
              <X size={24} />
            </button>
            <ShieldAlert size={48} className="text-red-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-2">Escanea para Ayudar</h2>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-8">
              Al escanear este código se mostrará el tipo de sangre, alergias, y el contacto de emergencia de Jane Doe.
            </p>
            <div className="bg-white p-4 rounded-2xl shadow-inner mb-6">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://thepain.app/emergency/jd" alt="QR Code" className="w-48 h-48" />
            </div>
            <p className="text-xs font-mono text-gray-400 bg-gray-100 dark:bg-slate-800 px-3 py-1 rounded">ID: #8492-TP</p>
          </div>
        </div>
      )}
    </div>
  );
}
