'use client';

import { useState } from 'react';
import { Send, Users, Activity, Bell } from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSendPush = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !message) return;

    // Simulate sending push by triggering browser notification locally
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      new Notification(title, {
        body: message,
        icon: '/favicon.ico'
      });
      setSent(true);
      setTimeout(() => {
        setSent(false);
        setTitle('');
        setMessage('');
      }, 3000);
    } else {
      alert("Para probar esta función, primero debes activar las notificaciones en el perfil de paciente (App -> Perfil -> Ajustes -> Recordatorios Push) usando este mismo navegador.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar Admin */}
      <aside className="w-full md:w-64 bg-slate-900 text-white p-6 flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center font-bold">
            TP
          </div>
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>
        <nav className="flex flex-col gap-2">
          <a href="#" className="p-3 bg-slate-800 rounded-lg flex items-center gap-3 text-sm font-medium text-brand-400">
            <Bell size={18} /> Push & Alertas
          </a>
          <a href="#" className="p-3 hover:bg-slate-800 rounded-lg flex items-center gap-3 text-sm font-medium text-gray-400 transition-colors">
            <Users size={18} /> Pacientes
          </a>
          <a href="#" className="p-3 hover:bg-slate-800 rounded-lg flex items-center gap-3 text-sm font-medium text-gray-400 transition-colors">
            <Activity size={18} /> Reportes Globales
          </a>
        </nav>
        <div className="mt-auto">
          <Link href="/dashboard" className="text-sm text-gray-500 hover:text-white transition-colors">
            &larr; Volver a la App (Paciente)
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Centro de Notificaciones Push</h2>
          <p className="text-gray-500">Envía alertas, recordatorios y comunicados a los dispositivos de los pacientes.</p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Send Form */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Send size={20} className="text-brand-500" />
              Nueva Notificación Manual
            </h3>
            <form onSubmit={handleSendPush} className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1">Título de la Notificación</label>
                <input 
                  type="text" 
                  value={title} onChange={e => setTitle(e.target.value)}
                  placeholder="Ej: Recordatorio de Cita, Actualización..."
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1">Mensaje Corto</label>
                <textarea 
                  value={message} onChange={e => setMessage(e.target.value)}
                  placeholder="Escribe el cuerpo de la notificación aquí..."
                  className="w-full p-3 border border-gray-200 rounded-xl min-h-[100px] focus:ring-2 focus:ring-brand-500 outline-none"
                  required
                />
              </div>
              <button 
                type="submit" 
                className={`w-full py-3 rounded-xl font-bold text-white transition-all flex justify-center items-center gap-2 ${sent ? 'bg-green-500' : 'bg-brand-500 hover:bg-brand-600'}`}
              >
                {sent ? '¡Enviado a 1 Paciente(s)!' : 'Enviar Notificación Push Ahora'}
              </button>
            </form>
          </section>

          {/* Automations Preview */}
          <section className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Automatizaciones Activas</h3>
              <p className="text-sm text-gray-500 mb-4">Estas notificaciones se disparan solas según las configuraciones de los pacientes.</p>
              
              <ul className="space-y-3">
                <li className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div>
                    <p className="font-semibold text-sm text-gray-900">Recordatorio de Pastilla</p>
                    <p className="text-xs text-gray-500">Se envía a la hora configurada por el paciente.</p>
                  </div>
                  <div className="w-12 h-6 bg-green-500 rounded-full flex justify-end p-1">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </li>
                <li className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div>
                    <p className="font-semibold text-sm text-gray-900">Recordatorio Insistente (10min)</p>
                    <p className="text-xs text-gray-500">Se envía si la pastilla sigue sin marcarse.</p>
                  </div>
                  <div className="w-12 h-6 bg-green-500 rounded-full flex justify-end p-1">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </li>
                <li className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100 opacity-60">
                  <div>
                    <p className="font-semibold text-sm text-gray-900">Resumen Semanal de Crisis</p>
                    <p className="text-xs text-gray-500">Reporte automático cada Domingo.</p>
                  </div>
                  <div className="w-12 h-6 bg-gray-300 rounded-full flex justify-start p-1">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </li>
              </ul>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
