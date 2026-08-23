'use client';

import { useState } from 'react';
import { useMockData } from '@/lib/MockDataContext';
import { Pill, Plus, Edit2, Trash2, AlertTriangle, X } from 'lucide-react';
import type { BaseMedication } from '@/lib/MockDataContext';

export default function MedicinesPage() {
  const { baseMedications, addBaseMedication, updateBaseMedication, deleteBaseMedication } = useMockData();
  
  const [showModal, setShowModal] = useState(false);
  const [editingMedId, setEditingMedId] = useState<string | null>(null);
  
  // Forms state
  const [medForm, setMedForm] = useState<{
    name: string;
    dose: string;
    medicationType: 'daily' | 'weekly' | 'biweekly' | 'monthly';
    frequency: string;
    specificDayOfWeek: number;
    startDate: string;
    firstDoseTime: string;
    isActive: boolean;
  }>({
    name: '',
    dose: '',
    medicationType: 'daily',
    frequency: '24h',
    specificDayOfWeek: 1, // Lunes
    startDate: new Date().toISOString().split('T')[0],
    firstDoseTime: '08:00',
    isActive: true
  });
  
  // Delete state
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteText, setDeleteText] = useState('');

  const frequencies = [
    { value: '24h', label: 'Una vez al día (cada 24h)' },
    { value: '12h', label: 'Dos veces al día (cada 12h)' },
    { value: '8h', label: 'Tres veces al día (cada 8h)' },
    { value: '6h', label: 'Cuatro veces al día (cada 6h)' }
  ];

  const daysOfWeek = [
    { value: 1, label: 'Lunes' },
    { value: 2, label: 'Martes' },
    { value: 3, label: 'Miércoles' },
    { value: 4, label: 'Jueves' },
    { value: 5, label: 'Viernes' },
    { value: 6, label: 'Sábado' },
    { value: 7, label: 'Domingo' }
  ];

  const handleOpenAddModal = () => {
    setEditingMedId(null);
    setMedForm({
      name: '', dose: '', medicationType: 'daily', frequency: '24h', 
      specificDayOfWeek: 1, startDate: new Date().toISOString().split('T')[0], 
      firstDoseTime: '08:00', isActive: true
    });
    setShowDeleteConfirm(false);
    setDeleteText('');
    setShowModal(true);
  };

  const handleOpenEditModal = (med: BaseMedication) => {
    setEditingMedId(med.id);
    setMedForm({ 
      name: med.name, 
      dose: med.dose, 
      medicationType: med.medicationType, 
      frequency: med.frequency, 
      specificDayOfWeek: med.specificDayOfWeek || 1, 
      startDate: med.startDate || new Date().toISOString().split('T')[0], 
      firstDoseTime: med.firstDoseTime, 
      isActive: med.isActive 
    });
    setShowDeleteConfirm(false);
    setDeleteText('');
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!medForm.name || !medForm.dose || !medForm.firstDoseTime) return;
    
    // Si es biweekly o monthly necesitamos la startDate
    if ((medForm.medicationType === 'biweekly' || medForm.medicationType === 'monthly') && !medForm.startDate) return;

    if (editingMedId) {
      updateBaseMedication(editingMedId, medForm);
    } else {
      addBaseMedication(medForm);
    }
    setShowModal(false);
  };

  const handleDelete = () => {
    if (editingMedId && deleteText === 'BORRAR') {
      deleteBaseMedication(editingMedId);
      setShowModal(false);
    }
  };

  const handleToggleActive = (id: string, currentStatus: boolean) => {
    updateBaseMedication(id, { isActive: !currentStatus });
  };

  return (
    <div className="p-4 space-y-6 pb-24 animate-in fade-in duration-500">
      <header className="pt-2 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mis Medicinas</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Gestiona tus tratamientos continuos</p>
        </div>
        <button 
          onClick={handleOpenAddModal}
          className="p-3 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-sm transition-colors"
        >
          <Plus size={20} /> <span className="hidden md:inline">Añadir</span>
        </button>
      </header>

      <div className="grid gap-4">
        {baseMedications.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-gray-100 dark:border-slate-700 text-center">
            <Pill size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <p className="text-gray-500 dark:text-gray-400 font-medium">Aún no has registrado ningún tratamiento base.</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">Añade aquí las medicinas que tomas regularmente.</p>
          </div>
        ) : (
          baseMedications.map(med => {
            let freqLabel = '';
            if (med.medicationType === 'daily') {
              freqLabel = frequencies.find(f => f.value === med.frequency)?.label || med.frequency;
            } else if (med.medicationType === 'weekly') {
              freqLabel = `Semanal (Los ${daysOfWeek.find(d => d.value === med.specificDayOfWeek)?.label}s)`;
            } else if (med.medicationType === 'biweekly') {
              freqLabel = `Quincenal (Desde ${med.startDate})`;
            } else if (med.medicationType === 'monthly') {
              const startDay = med.startDate ? new Date(med.startDate).getDate() : '';
              freqLabel = `Mensual (Día ${startDay} del mes)`;
            }

            return (
              <div key={med.id} className={`flex justify-between items-start bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border transition-colors ${med.isActive ? 'border-brand-500/30' : 'border-gray-100 dark:border-slate-700 opacity-60 grayscale-[30%]'}`}>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${med.isActive ? 'bg-brand-50 dark:bg-brand-900/30 text-brand-500' : 'bg-gray-100 dark:bg-slate-700 text-gray-400'}`}>
                      <Pill size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">{med.name}</h3>
                      <p className="text-sm font-medium text-brand-500">{med.dose}</p>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1 ml-[52px]">
                    <p>Repetición: <strong className="text-gray-700 dark:text-gray-300">{freqLabel}</strong></p>
                    <p>Hora de toma: <strong className="text-gray-700 dark:text-gray-300">{med.firstDoseTime}</strong></p>
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between h-full space-y-4">
                  {/* Switch Toggle */}
                  <button 
                    onClick={() => handleToggleActive(med.id, med.isActive)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${med.isActive ? 'bg-brand-500' : 'bg-gray-300 dark:bg-slate-600'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${med.isActive ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>

                  {/* Edit Button */}
                  <button onClick={() => handleOpenEditModal(med)} className="p-2 text-gray-400 hover:text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-900/30 rounded-lg transition-colors">
                    <Edit2 size={18} />
                  </button>
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Medication Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-4 border-b border-gray-100 dark:border-slate-800">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Pill className="text-brand-500" /> {editingMedId ? 'Editar Medicina' : 'Añadir Medicina'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 text-xl font-bold p-2 hover:text-gray-900 dark:hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <div className="overflow-y-auto flex-1">
              {!showDeleteConfirm ? (
                <form id="base-med-form" onSubmit={handleSubmit} className="p-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-1">Nombre de la Medicina</label>
                      <input required type="text" value={medForm.name} onChange={e => setMedForm({...medForm, name: e.target.value})} className="w-full p-3 border border-gray-200 dark:border-slate-700 rounded-xl bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white" placeholder="Ej: Pregabalina, Humira..." />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-1">Dosis</label>
                      <input required type="text" value={medForm.dose} onChange={e => setMedForm({...medForm, dose: e.target.value})} className="w-full p-3 border border-gray-200 dark:border-slate-700 rounded-xl bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white" placeholder="Ej: 75mg" />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-1">Hora de Toma</label>
                      <input required type="time" value={medForm.firstDoseTime} onChange={e => setMedForm({...medForm, firstDoseTime: e.target.value})} className="w-full p-3 border border-gray-200 dark:border-slate-700 rounded-xl bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white" />
                    </div>

                    {/* Frecuencia Principal */}
                    <div className="col-span-2">
                      <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-1">Tipo de Tratamiento</label>
                      <select required value={medForm.medicationType} onChange={e => setMedForm({...medForm, medicationType: e.target.value as any})} className="w-full p-3 border border-gray-200 dark:border-slate-700 rounded-xl bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white">
                        <option value="daily">Diario (Tomar todos los días)</option>
                        <option value="weekly">Semanal (Una vez por semana)</option>
                        <option value="biweekly">Quincenal (Cada 15 días)</option>
                        <option value="monthly">Mensual (Una vez al mes)</option>
                      </select>
                    </div>

                    {/* Opciones según tipo */}
                    {medForm.medicationType === 'daily' && (
                      <div className="col-span-2 animate-in fade-in zoom-in-95">
                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-1">Cada cuantas horas</label>
                        <select required value={medForm.frequency} onChange={e => setMedForm({...medForm, frequency: e.target.value})} className="w-full p-3 border border-gray-200 dark:border-slate-700 rounded-xl bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white">
                          {frequencies.map(f => (
                            <option key={f.value} value={f.value}>{f.label}</option>
                          ))}
                        </select>
                      </div>
                    )}

                    {medForm.medicationType === 'weekly' && (
                      <div className="col-span-2 animate-in fade-in zoom-in-95">
                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-1">Día de la Semana</label>
                        <select required value={medForm.specificDayOfWeek} onChange={e => setMedForm({...medForm, specificDayOfWeek: parseInt(e.target.value)})} className="w-full p-3 border border-gray-200 dark:border-slate-700 rounded-xl bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white">
                          {daysOfWeek.map(d => (
                            <option key={d.value} value={d.value}>{d.label}</option>
                          ))}
                        </select>
                      </div>
                    )}

                    {(medForm.medicationType === 'biweekly' || medForm.medicationType === 'monthly') && (
                      <div className="col-span-2 animate-in fade-in zoom-in-95">
                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                          {medForm.medicationType === 'biweekly' ? 'Fecha de la próxima toma (Inicio)' : 'Día del mes (Basado en la fecha)'}
                        </label>
                        <input required type="date" value={medForm.startDate} onChange={e => setMedForm({...medForm, startDate: e.target.value})} className="w-full p-3 border border-gray-200 dark:border-slate-700 rounded-xl bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white" />
                      </div>
                    )}

                    <div className="col-span-2 pt-2 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Medicina Activa</p>
                        <p className="text-xs text-gray-500">¿Estás tomando esta medicina actualmente?</p>
                      </div>
                      <button 
                        type="button"
                        onClick={() => setMedForm({...medForm, isActive: !medForm.isActive})}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${medForm.isActive ? 'bg-brand-500' : 'bg-gray-300 dark:bg-slate-600'}`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${medForm.isActive ? 'translate-x-6' : 'translate-x-1'}`} />
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="p-6 text-center space-y-6 animate-in slide-in-from-right-4">
                  <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle size={32} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">¿Eliminar esta medicina?</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Si lo eliminas, dejarás de recibir recordatorios. Esta acción no se puede deshacer.</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-xl text-left">
                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Escribe <strong className="text-red-500">BORRAR</strong></p>
                    <input 
                      type="text" 
                      value={deleteText}
                      onChange={(e) => setDeleteText(e.target.value)}
                      placeholder="Escribe BORRAR aquí"
                      className="w-full p-3 border border-red-200 dark:border-red-800/50 rounded-xl bg-white dark:bg-slate-900 text-gray-900 dark:text-white text-center font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => { setShowDeleteConfirm(false); setDeleteText(''); }} className="flex-1 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-slate-700 text-gray-800 dark:text-white font-semibold rounded-xl transition-colors">Cancelar</button>
                    <button onClick={handleDelete} disabled={deleteText !== 'BORRAR'} className="flex-1 py-3 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white font-bold rounded-xl disabled:cursor-not-allowed transition-colors">Confirmar</button>
                  </div>
                </div>
              )}
            </div>
            
            {!showDeleteConfirm && (
              <div className="p-4 border-t border-gray-100 dark:border-slate-800 shrink-0 bg-white dark:bg-slate-900 flex flex-col gap-3">
                <button form="base-med-form" type="submit" className="w-full py-3 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-xl transition-colors">
                  {editingMedId ? 'Guardar Cambios' : 'Registrar Medicina'}
                </button>
                {editingMedId && (
                  <button onClick={() => setShowDeleteConfirm(true)} type="button" className="w-full py-2 flex items-center justify-center gap-2 text-red-500 hover:text-red-600 font-semibold transition-colors">
                    <Trash2 size={18} /> Eliminar Tratamiento
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
