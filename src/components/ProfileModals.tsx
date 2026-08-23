'use client';

import { useState } from 'react';
import { useMockData } from '@/lib/MockDataContext';
import { X, Trash2, Plus, BellRing, Edit2, Check } from 'lucide-react';

export function DoctorsModalPlaceholder() { return null; }


export function RemindersModal({ onClose }: { onClose: () => void }) {
  const { pushEnabled, setPushEnabled } = useMockData();
  const [loading, setLoading] = useState(false);
  const [testSent, setTestSent] = useState(false);

  const requestPermission = async () => {
    setLoading(true);
    // Simulating browser permission request for demo
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'granted') {
        setPushEnabled(true);
      } else if (Notification.permission !== 'denied') {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          setPushEnabled(true);
        } else {
          alert('Debes permitir las notificaciones en tu navegador para usar esta función.');
          setPushEnabled(false);
        }
      } else {
        alert('Las notificaciones están bloqueadas en tu navegador. Por favor actívalas en la configuración del sitio.');
      }
    } else {
      // Fallback if not supported
      setTimeout(() => {
        setPushEnabled(!pushEnabled);
      }, 500);
    }
    setLoading(false);
  };

  const sendTestNotification = () => {
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      new Notification('¡Hola de ThePain App!', {
        body: 'Este es un ejemplo de cómo se verán tus recordatorios de medicina.',
        icon: '/favicon.ico'
      });
      setTestSent(true);
      setTimeout(() => setTestSent(false), 3000);
    } else {
      alert("Permiso no concedido o API no soportada.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-4 border-b border-gray-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <BellRing className="text-brand-500" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recordatorios Push</h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Mantente al día con tu tratamiento activando las notificaciones en tu dispositivo. Te avisaremos cuando sea hora de tomar tus medicamentos.
          </p>

          <div className="flex items-center justify-between bg-gray-50 dark:bg-slate-800 p-4 rounded-xl border border-gray-100 dark:border-slate-700">
            <div>
              <p className="font-bold text-gray-900 dark:text-white">Alertas Push</p>
              <p className="text-xs text-gray-500">Recibe notificaciones en tu celular/PC</p>
            </div>
            <button 
              onClick={requestPermission}
              disabled={loading}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${pushEnabled ? 'bg-brand-500' : 'bg-gray-300 dark:bg-slate-600'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${pushEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>

          {pushEnabled && (
            <div className="animate-in fade-in slide-in-from-top-2 space-y-4 pt-2">
              <div className="space-y-2">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Frecuencia de aviso</p>
                <select className="w-full p-3 border border-gray-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-sm">
                  <option>Exactamente a la hora (Por defecto)</option>
                  <option>15 minutos antes</option>
                  <option>30 minutos antes</option>
                </select>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Modo Insistente</p>
                <div className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="w-4 h-4 accent-brand-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Volver a recordar si no la marco como tomada en 10 minutos.</span>
                </div>
              </div>

              <button 
                onClick={sendTestNotification}
                className="w-full py-3 mt-4 border border-brand-500 text-brand-600 dark:text-brand-400 font-semibold rounded-xl hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-colors flex items-center justify-center gap-2"
              >
                {testSent ? '¡Notificación enviada!' : 'Probar Notificación de Ejemplo'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
