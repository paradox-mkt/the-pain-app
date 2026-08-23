'use client';

import { useState, useEffect } from 'react';
import { useMockData } from '@/lib/MockDataContext';
import { X, Trash2, AlertTriangle } from 'lucide-react';

export function CrisisModal() {
  const { isCrisisModalOpen, setIsCrisisModalOpen, addCrisis, updateCrisis, deleteCrisis, crises, editingCrisisId, setEditingCrisisId } = useMockData();
  
  // States
  const [intensity, setIntensity] = useState(5);
  const [notes, setNotes] = useState('');
  const [dateTime, setDateTime] = useState(() => new Date().toISOString().slice(0, 16));
  
  // Advanced fields
  const [tookMedication, setTookMedication] = useState<boolean | null>(null);
  const [medicationTaken, setMedicationTaken] = useState('');
  const [wentToEmergency, setWentToEmergency] = useState<boolean | null>(null);
  const [emergencyTreatment, setEmergencyTreatment] = useState('');
  const [examsDone, setExamsDone] = useState<string[]>([]);

  // Delete flow
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteText, setDeleteText] = useState('');

  const availableExams = ['Rayos X', 'Ecografía', 'Resonancia', 'Laboratorio'];

  useEffect(() => {
    if (isCrisisModalOpen) {
      if (editingCrisisId) {
        const crisis = crises.find(c => c.id === editingCrisisId);
        if (crisis) {
          setIntensity(crisis.intensity);
          setNotes(crisis.notes);
          setDateTime(crisis.dateTime || new Date().toISOString().slice(0, 16));
          setTookMedication(crisis.tookMedication ?? null);
          setMedicationTaken(crisis.medicationTaken || '');
          setWentToEmergency(crisis.wentToEmergency ?? null);
          setEmergencyTreatment(crisis.emergencyTreatment || '');
          setExamsDone(crisis.examsDone || []);
        }
      } else {
        // Reset form for new crisis
        setIntensity(5);
        setNotes('');
        setDateTime(new Date().toISOString().slice(0, 16));
        setTookMedication(null);
        setMedicationTaken('');
        setWentToEmergency(null);
        setEmergencyTreatment('');
        setExamsDone([]);
      }
      setShowDeleteConfirm(false);
      setDeleteText('');
    }
  }, [isCrisisModalOpen, editingCrisisId, crises]);

  if (!isCrisisModalOpen) return null;

  const handleClose = () => {
    setIsCrisisModalOpen(false);
    setTimeout(() => setEditingCrisisId(null), 300); // Clear after animation
  };

  const handleToggleExam = (exam: string) => {
    if (examsDone.includes(exam)) {
      setExamsDone(examsDone.filter(e => e !== exam));
    } else {
      setExamsDone([...examsDone, exam]);
    }
  };

  const handleDelete = () => {
    if (deleteText === 'BORRAR' && editingCrisisId) {
      deleteCrisis(editingCrisisId);
      handleClose();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const crisisData = {
      intensity,
      notes: notes || 'Crisis registrada sin notas adicionales.',
      dateTime,
      bodyParts: ['General'],
      tookMedication: tookMedication ?? false,
      medicationTaken: tookMedication ? medicationTaken : undefined,
      wentToEmergency: wentToEmergency ?? false,
      emergencyTreatment: wentToEmergency ? emergencyTreatment : undefined,
      examsDone: wentToEmergency ? examsDone : []
    };

    if (editingCrisisId) {
      updateCrisis(editingCrisisId, crisisData);
    } else {
      addCrisis(crisisData);
    }
    
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-100 dark:border-slate-800 shrink-0">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {editingCrisisId ? 'Editar Crisis' : 'Registrar Crisis'}
          </h2>
          <button onClick={handleClose} className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-4">
          {!showDeleteConfirm ? (
            <form id="crisis-form" onSubmit={handleSubmit} className="space-y-6">
              
              {/* Fecha y Hora */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Fecha y Hora del evento</label>
                <input 
                  type="datetime-local" 
                  value={dateTime}
                  onChange={(e) => setDateTime(e.target.value)}
                  className="w-full p-3 border border-gray-200 dark:border-slate-700 rounded-xl bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              {/* Intensidad */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Intensidad del Dolor: <span className="text-red-500 font-bold">{intensity}/10</span></label>
                <input 
                  type="range" min="1" max="10" 
                  value={intensity} onChange={(e) => setIntensity(parseInt(e.target.value))}
                  className="w-full accent-red-500"
                />
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Leve</span>
                  <span>Inaguantable</span>
                </div>
              </div>

              {/* Notas */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Notas y Síntomas</label>
                <textarea 
                  value={notes} onChange={(e) => setNotes(e.target.value)}
                  placeholder="¿Cómo te sientes? ¿Qué lo provocó?"
                  className="w-full p-3 border border-gray-200 dark:border-slate-700 rounded-xl bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 min-h-[80px]"
                />
              </div>

              {/* Pastillas */}
              <div className="space-y-3 p-4 bg-gray-50 dark:bg-slate-800/50 rounded-xl border border-gray-100 dark:border-slate-800">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block">¿Tomaste alguna pastilla/medicación extra?</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="meds" checked={tookMedication === true} onChange={() => setTookMedication(true)} className="accent-brand-500 w-4 h-4" />
                    <span className="text-sm dark:text-gray-200">Sí</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="meds" checked={tookMedication === false} onChange={() => {setTookMedication(false); setMedicationTaken('');}} className="accent-brand-500 w-4 h-4" />
                    <span className="text-sm dark:text-gray-200">No</span>
                  </label>
                </div>
                {tookMedication && (
                  <div className="animate-in fade-in slide-in-from-top-2 pt-2">
                    <input 
                      type="text" 
                      placeholder="¿Qué pastilla fue y cuánto tomaste?"
                      value={medicationTaken}
                      onChange={(e) => setMedicationTaken(e.target.value)}
                      className="w-full p-3 border border-gray-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 text-gray-900 dark:text-white text-sm"
                      required
                    />
                  </div>
                )}
              </div>

              {/* Emergencia */}
              <div className="space-y-3 p-4 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-100 dark:border-red-900/30">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block">¿Fuiste a Emergencia/Urgencias?</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="er" checked={wentToEmergency === true} onChange={() => setWentToEmergency(true)} className="accent-red-500 w-4 h-4" />
                    <span className="text-sm dark:text-gray-200">Sí</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="er" checked={wentToEmergency === false} onChange={() => {setWentToEmergency(false); setEmergencyTreatment(''); setExamsDone([]);}} className="accent-red-500 w-4 h-4" />
                    <span className="text-sm dark:text-gray-200">No</span>
                  </label>
                </div>
                
                {wentToEmergency && (
                  <div className="animate-in fade-in slide-in-from-top-2 pt-3 space-y-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1 block">¿Qué te dieron/administraron en Emergencia?</label>
                      <textarea 
                        placeholder="Ej: Suero, Diclofenaco intramuscular..."
                        value={emergencyTreatment}
                        onChange={(e) => setEmergencyTreatment(e.target.value)}
                        className="w-full p-3 border border-red-200 dark:border-red-800/50 rounded-xl bg-white dark:bg-slate-900 text-gray-900 dark:text-white text-sm min-h-[60px]"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2 block">¿Te hicieron algún examen?</label>
                      <div className="grid grid-cols-2 gap-2">
                        {availableExams.map(exam => (
                          <label key={exam} className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-red-100/50 dark:hover:bg-red-900/20 transition-colors">
                            <input 
                              type="checkbox" 
                              checked={examsDone.includes(exam)}
                              onChange={() => handleToggleExam(exam)}
                              className="accent-red-500 w-4 h-4 rounded"
                            />
                            <span className="text-sm dark:text-gray-300">{exam}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

            </form>
          ) : (
            /* Delete Confirmation Flow */
            <div className="p-4 text-center space-y-6 animate-in slide-in-from-right-4">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle size={32} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">¿Eliminar este registro?</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Esta acción no se puede deshacer.</p>
              </div>
              <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-xl text-left">
                <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Para confirmar, escribe la palabra <strong className="text-red-500">BORRAR</strong></p>
                <input 
                  type="text" 
                  value={deleteText}
                  onChange={(e) => setDeleteText(e.target.value)}
                  placeholder="Escribe BORRAR aquí"
                  className="w-full p-3 border border-red-200 dark:border-red-800/50 rounded-xl bg-white dark:bg-slate-900 text-gray-900 dark:text-white text-center font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => { setShowDeleteConfirm(false); setDeleteText(''); }}
                  className="flex-1 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-800 dark:text-white font-semibold rounded-xl transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleDelete}
                  disabled={deleteText !== 'BORRAR'}
                  className="flex-1 py-3 bg-red-500 hover:bg-red-600 disabled:bg-red-300 dark:disabled:bg-red-900/50 text-white font-bold rounded-xl shadow-lg shadow-red-500/30 transition-all disabled:shadow-none disabled:cursor-not-allowed"
                >
                  Confirmar
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {!showDeleteConfirm && (
          <div className="p-4 border-t border-gray-100 dark:border-slate-800 shrink-0 bg-white dark:bg-slate-900 flex flex-col gap-3">
            <button form="crisis-form" type="submit" className="w-full py-3 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-xl shadow-lg shadow-brand-500/30 transition-colors">
              {editingCrisisId ? 'Guardar Cambios' : 'Guardar Registro'}
            </button>
            {editingCrisisId && (
              <button 
                onClick={() => setShowDeleteConfirm(true)}
                className="w-full py-2 flex items-center justify-center gap-2 text-red-500 hover:text-red-600 font-semibold transition-colors"
              >
                <Trash2 size={18} />
                Eliminar Registro
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export function MedModal() {
  const { isMedModalOpen, setIsMedModalOpen, addMedication } = useMockData();
  const [name, setName] = useState('');
  const [dose, setDose] = useState('');
  
  if (!isMedModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(!name) return;
    addMedication({
      name,
      dose: dose || '1 unidad',
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      taken: false
    });
    setIsMedModalOpen(false);
    setName('');
    setDose('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-4 border-b border-gray-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Añadir Medicamento</h2>
          <button onClick={() => setIsMedModalOpen(false)} className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Nombre del medicamento</label>
            <input 
              required
              type="text" 
              value={name} onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Ibuprofeno"
              className="w-full p-3 border border-gray-200 dark:border-slate-700 rounded-xl bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Dosis (Opcional)</label>
            <input 
              type="text" 
              value={dose} onChange={(e) => setDose(e.target.value)}
              placeholder="Ej: 600mg"
              className="w-full p-3 border border-gray-200 dark:border-slate-700 rounded-xl bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
          <button type="submit" className="w-full py-3 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-xl shadow-lg shadow-brand-500/30 transition-colors mt-2">
            Añadir
          </button>
        </form>
      </div>
    </div>
  );
}
