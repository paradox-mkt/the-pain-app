'use client';

import { useState } from 'react';
import { useMockData } from '@/lib/MockDataContext';
import { Stethoscope, Trash2, Plus, Edit2, Check, Star } from 'lucide-react';
import { COUNTRY_CODES } from '@/lib/countryCodes';

export default function DoctorsPage() {
  const { doctors, addDoctor, updateDoctor, removeDoctor } = useMockData();
  const [name, setName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneCountryCode, setPhoneCountryCode] = useState('+51');
  const [hospital, setHospital] = useState('');
  
  // Edit state
  const [editingDocId, setEditingDocId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: '', specialty: '', phone: '', phoneCountryCode: '+51', hospital: '' });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    addDoctor({ name, specialty: specialty || 'Especialista', phone, phoneCountryCode, hospital });
    setName('');
    setSpecialty('');
    setPhone('');
    setPhoneCountryCode('+51');
    setHospital('');
  };

  return (
    <div className="p-4 space-y-6 pb-24 animate-in fade-in duration-500 max-w-xl mx-auto">
      <header className="pt-2">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Stethoscope className="text-brand-500" /> Mis Médicos
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Mantén el contacto de tus especialistas</p>
      </header>
      
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-slate-800 bg-gray-50 dark:bg-slate-800/50">
          <form onSubmit={handleAdd} className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Añadir Nuevo Médico</h3>
            <div className="grid grid-cols-2 gap-3">
              <input 
                type="text" 
                placeholder="Nombre del Dr."
                value={name} onChange={e => setName(e.target.value)}
                className="w-full p-3 border border-gray-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                required
              />
              <input 
                type="text" 
                placeholder="Especialidad"
                value={specialty} onChange={e => setSpecialty(e.target.value)}
                className="w-full p-3 border border-gray-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                required
              />
              <div className="flex gap-2">
                <select 
                  value={phoneCountryCode} onChange={e => setPhoneCountryCode(e.target.value)}
                  className="w-1/3 p-3 border border-gray-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  className="w-1/3 p-3 border border-gray-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                >
                  {COUNTRY_CODES.map(country => (
                    <option key={country.code} value={country.code}>{country.label}</option>
                  ))}
                </select>
                <input 
                  type="text" 
                  placeholder="Teléfono (Opcional)"
                  value={phone} onChange={e => setPhone(e.target.value)}
                  className="w-2/3 p-3 border border-gray-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>
              <input 
                type="text" 
                placeholder="Clínica / Hospital"
                value={hospital} onChange={e => setHospital(e.target.value)}
                className="w-full p-3 border border-gray-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
            <button type="submit" className="w-full py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">
              <Plus size={18} /> Añadir a mi lista
            </button>
          </form>
        </div>

        <div className="p-4 space-y-4">
          {doctors.length === 0 ? (
            <div className="text-center py-8">
              <Stethoscope size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-3" />
              <p className="text-gray-500 dark:text-gray-400 font-medium">No has añadido ningún médico aún.</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {doctors.map(doc => (
                <li key={doc.id} className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-gray-100 dark:border-slate-700 shadow-sm transition-all hover:border-brand-500/30">
                  {editingDocId === doc.id ? (
                    <div className="space-y-3 animate-in fade-in">
                      <div className="grid grid-cols-2 gap-3">
                        <input type="text" value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} className="w-full p-2 border border-gray-200 dark:border-slate-700 rounded-lg bg-gray-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none" placeholder="Nombre" required />
                        <input type="text" value={editForm.specialty} onChange={e => setEditForm({...editForm, specialty: e.target.value})} className="w-full p-2 border border-gray-200 dark:border-slate-700 rounded-lg bg-gray-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none" placeholder="Especialidad" required />
                        <div className="flex gap-2">
                          <select value={editForm.phoneCountryCode} onChange={e => setEditForm({...editForm, phoneCountryCode: e.target.value})} className="w-1/3 p-2 border border-gray-200 dark:border-slate-700 rounded-lg bg-gray-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none">
                            {COUNTRY_CODES.map(country => (
                              <option key={country.code} value={country.code}>{country.label}</option>
                            ))}
                          </select>
                          <input type="text" value={editForm.phone} onChange={e => setEditForm({...editForm, phone: e.target.value})} className="w-2/3 p-2 border border-gray-200 dark:border-slate-700 rounded-lg bg-gray-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none" placeholder="Teléfono" />
                        </div>
                        <input type="text" value={editForm.hospital} onChange={e => setEditForm({...editForm, hospital: e.target.value})} className="w-full p-2 border border-gray-200 dark:border-slate-700 rounded-lg bg-gray-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none" placeholder="Hospital/Clínica" />
                      </div>
                      <div className="flex justify-end gap-2 mt-2">
                        <button onClick={() => setEditingDocId(null)} className="px-4 py-2 text-sm font-semibold text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">Cancelar</button>
                        <button onClick={() => { updateDoctor(doc.id, editForm); setEditingDocId(null); }} className="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg text-sm font-semibold flex items-center gap-2"><Check size={16} /> Guardar</button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white text-lg flex items-center gap-2">
                          {doc.name}
                          {doc.isMain && <Star size={16} className="text-yellow-500" fill="currentColor" />}
                        </p>
                        <p className="text-sm text-brand-500 font-medium mb-2">{doc.specialty}</p>
                        {(doc.hospital || doc.phone) && (
                          <div className="flex flex-col gap-1 text-xs text-gray-500 dark:text-gray-400">
                            {doc.hospital && <span className="flex items-center gap-1">🏥 {doc.hospital}</span>}
                            {doc.phone && <span className="flex items-center gap-1">📞 {doc.phoneCountryCode} {doc.phone}</span>}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-1 bg-gray-50 dark:bg-slate-900 p-1 rounded-lg">
                        <button 
                          onClick={() => updateDoctor(doc.id, { isMain: !doc.isMain })} 
                          className={`p-2 rounded-md transition-colors ${doc.isMain ? 'text-yellow-500 hover:text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20' : 'text-gray-400 hover:text-yellow-500'}`}
                          title="Marcar como Principal"
                        >
                          <Star size={18} fill={doc.isMain ? "currentColor" : "none"} />
                        </button>
                        <button onClick={() => { setEditingDocId(doc.id); setEditForm({ name: doc.name, specialty: doc.specialty, phone: doc.phone || '', phoneCountryCode: doc.phoneCountryCode || '+51', hospital: doc.hospital || '' }); }} className="p-2 text-gray-400 hover:text-brand-500 rounded-md transition-colors">
                          <Edit2 size={18} />
                        </button>
                        <button onClick={() => removeDoctor(doc.id)} className="p-2 text-gray-400 hover:text-red-500 rounded-md transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
