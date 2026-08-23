'use client';

import { useState } from 'react';
import { useMockData } from '@/lib/MockDataContext';
import { X, Trash2, Plus, BellRing, Edit2, Check } from 'lucide-react';

export function DoctorsModal({ onClose }: { onClose: () => void }) {
  const { doctors, addDoctor, updateDoctor, removeDoctor } = useMockData();
  const [name, setName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [phone, setPhone] = useState('');
  const [hospital, setHospital] = useState('');
  
  // Edit state
  const [editingDocId, setEditingDocId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: '', specialty: '', phone: '', hospital: '' });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    addDoctor({ name, specialty: specialty || 'Especialista', phone, hospital });
    setName('');
    setSpecialty('');
    setPhone('');
    setHospital('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-4 border-b border-gray-100 dark:border-slate-800 shrink-0">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Mis Médicos</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>
        
        <div className="overflow-y-auto p-4 space-y-4">
          {doctors.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">No has añadido ningún médico.</p>
          ) : (
            <ul className="space-y-3">
              {doctors.map(doc => (
                <li key={doc.id} className="bg-gray-50 dark:bg-slate-800 p-3 rounded-xl border border-gray-100 dark:border-slate-700 space-y-2">
                  {editingDocId === doc.id ? (
                    <div className="space-y-2 animate-in fade-in">
                      <div className="grid grid-cols-2 gap-2">
                        <input type="text" value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} className="w-full p-2 border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-xs" placeholder="Nombre" required />
                        <input type="text" value={editForm.specialty} onChange={e => setEditForm({...editForm, specialty: e.target.value})} className="w-full p-2 border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-xs" placeholder="Especialidad" required />
                        <input type="text" value={editForm.phone} onChange={e => setEditForm({...editForm, phone: e.target.value})} className="w-full p-2 border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-xs" placeholder="Teléfono" />
                        <input type="text" value={editForm.hospital} onChange={e => setEditForm({...editForm, hospital: e.target.value})} className="w-full p-2 border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-xs" placeholder="Hospital/Clínica" />
                      </div>
                      <div className="flex justify-end gap-2 mt-2">
                        <button onClick={() => setEditingDocId(null)} className="px-3 py-1 text-xs font-semibold text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">Cancelar</button>
                        <button onClick={() => { updateDoctor(doc.id, editForm); setEditingDocId(null); }} className="px-3 py-1 bg-brand-500 hover:bg-brand-600 text-white rounded text-xs font-semibold flex items-center gap-1"><Check size={14} /> Guardar</button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white text-sm">{doc.name}</p>
                        <p className="text-xs text-brand-500 font-medium mb-1">{doc.specialty}</p>
                        {(doc.hospital || doc.phone) && (
                          <div className="flex flex-wrap gap-2 text-[10px] text-gray-500 dark:text-gray-400">
                            {doc.hospital && <span>🏥 {doc.hospital}</span>}
                            {doc.phone && <span>📞 {doc.phone}</span>}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <button onClick={() => { setEditingDocId(doc.id); setEditForm({ name: doc.name, specialty: doc.specialty, phone: doc.phone || '', hospital: doc.hospital || '' }); }} className="p-2 text-gray-400 hover:text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-900/30 rounded-lg transition-colors">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => removeDoctor(doc.id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="p-4 border-t border-gray-100 dark:border-slate-800 shrink-0 bg-gray-50 dark:bg-slate-900">
          <form onSubmit={handleAdd} className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Añadir Nuevo Médico</h3>
            <div className="grid grid-cols-2 gap-2">
              <input 
                type="text" 
                placeholder="Nombre del Dr."
                value={name} onChange={e => setName(e.target.value)}
                className="w-full p-2 border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-sm"
                required
              />
              <input 
                type="text" 
                placeholder="Especialidad"
                value={specialty} onChange={e => setSpecialty(e.target.value)}
                className="w-full p-2 border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-sm"
                required
              />
              <input 
                type="text" 
                placeholder="Teléfono (Opcional)"
                value={phone} onChange={e => setPhone(e.target.value)}
                className="w-full p-2 border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-sm"
              />
              <input 
                type="text" 
                placeholder="Clínica / Hospital"
                value={hospital} onChange={e => setHospital(e.target.value)}
                className="w-full p-2 border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-sm"
              />
            </div>
            <button type="submit" className="w-full py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-colors">
              <Plus size={16} /> Añadir
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

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
