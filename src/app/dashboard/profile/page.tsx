'use client';

import { useState } from 'react';
import { Settings, QrCode, ShieldAlert, LogOut, ChevronRight, X, Edit3, Save, Phone, Download, MessageCircle } from 'lucide-react';
import { useMockData } from '@/lib/MockDataContext';
import { RemindersModal } from '@/components/ProfileModals';

export default function ProfilePage() {
  const { profileData, updateProfile } = useMockData();
  const [showQR, setShowQR] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  // Local state for editing
  const [editForm, setEditForm] = useState(profileData);

  // Modals state
  const [showReminders, setShowReminders] = useState(false);

  const handleEditClick = () => {
    setEditForm(profileData);
    setIsEditing(true);
  };

  const handleSave = () => {
    updateProfile(editForm);
    setIsEditing(false);
  };

  const handleDownloadQR = async () => {
    try {
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent('https://thepain.app/emergency/jane-doe')}`;
      const response = await fetch(qrUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'Mi_QR_ThePainApp.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Error al descargar el QR', error);
      alert('Hubo un problema descargando el QR. Inténtalo de nuevo.');
    }
  };

  return (
    <div className="p-4 space-y-6 pb-20 animate-in fade-in duration-500">
      <header className="pt-2 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mi Perfil</h1>
        {!isEditing ? (
          <button onClick={handleEditClick} className="p-2 text-brand-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
            <Edit3 size={24} />
          </button>
        ) : (
          <button onClick={handleSave} className="p-2 text-green-500 hover:text-green-600 transition-colors">
            <Save size={24} />
          </button>
        )}
      </header>

      {/* User Basic Info */}
      <div className="flex items-center gap-4 bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
        <div className="w-16 h-16 bg-brand-100 dark:bg-brand-900/50 rounded-full flex items-center justify-center text-brand-600 dark:text-brand-400 text-2xl font-bold shrink-0">
          {profileData.fullName.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase()}
        </div>
        <div className="flex-1">
          {isEditing ? (
            <div className="space-y-2">
              <input 
                type="text" 
                value={editForm.fullName}
                onChange={e => setEditForm({...editForm, fullName: e.target.value})}
                className="w-full p-2 border border-gray-200 dark:border-slate-600 rounded bg-gray-50 dark:bg-slate-700 text-sm"
                placeholder="Nombre completo"
              />
              <input 
                type="email" 
                value={editForm.email}
                onChange={e => setEditForm({...editForm, email: e.target.value})}
                className="w-full p-2 border border-gray-200 dark:border-slate-600 rounded bg-gray-50 dark:bg-slate-700 text-sm"
                placeholder="Correo electrónico"
              />
              <input 
                type="tel" 
                value={editForm.phone}
                onChange={e => setEditForm({...editForm, phone: e.target.value})}
                className="w-full p-2 border border-gray-200 dark:border-slate-600 rounded bg-gray-50 dark:bg-slate-700 text-sm"
                placeholder="Teléfono"
              />
            </div>
          ) : (
            <>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{profileData.fullName}</h2>
              <p className="text-sm text-gray-500">{profileData.email}</p>
              <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                <Phone size={12} /> {profileData.phone}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Emergency Card Info */}
      <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-2xl p-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
          <ShieldAlert size={100} className="text-red-500" />
        </div>
        
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
            <ShieldAlert size={20} />
            <h3 className="font-bold">Tarjeta de Emergencia</h3>
          </div>
          
          {isEditing ? (
            <div className="space-y-3 bg-white/60 dark:bg-slate-900/60 p-4 rounded-xl border border-red-200 dark:border-red-800">
              <div>
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">Fecha de Nacimiento</label>
                <input type="date" value={editForm.birthDate} onChange={e => setEditForm({...editForm, birthDate: e.target.value})} className="w-full p-2 rounded border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">Tipo de Sangre</label>
                <select value={editForm.bloodType} onChange={e => setEditForm({...editForm, bloodType: e.target.value})} className="w-full p-2 rounded border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm">
                  <option>O+</option><option>O-</option><option>A+</option><option>A-</option>
                  <option>B+</option><option>B-</option><option>AB+</option><option>AB-</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">Alergias</label>
                <input type="text" value={editForm.allergies} onChange={e => setEditForm({...editForm, allergies: e.target.value})} className="w-full p-2 rounded border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">Enfermedades crónicas</label>
                <input type="text" value={editForm.diseases} onChange={e => setEditForm({...editForm, diseases: e.target.value})} className="w-full p-2 rounded border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">Contacto Emg. (Nombre)</label>
                  <input type="text" value={editForm.emergencyContactName} onChange={e => setEditForm({...editForm, emergencyContactName: e.target.value})} className="w-full p-2 rounded border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">Teléfono Emg.</label>
                  <div className="flex gap-2">
                    <select value={editForm.emergencyContactCountryCode || '+51'} onChange={e => setEditForm({...editForm, emergencyContactCountryCode: e.target.value})} className="w-1/3 p-2 rounded border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm">
                      <option value="+51">+51 🇵🇪</option>
                      <option value="+52">+52 🇲🇽</option>
                      <option value="+1">+1 🇺🇸/🇨🇦</option>
                      <option value="+34">+34 🇪🇸</option>
                      <option value="+54">+54 🇦🇷</option>
                      <option value="+57">+57 🇨🇴</option>
                      <option value="+56">+56 🇨🇱</option>
                    </select>
                    <input type="text" value={editForm.emergencyContactPhone} onChange={e => setEditForm({...editForm, emergencyContactPhone: e.target.value})} className="w-2/3 p-2 rounded border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm" />
                  </div>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">Indicaciones Especiales</label>
                <textarea value={editForm.specialInstructions} onChange={e => setEditForm({...editForm, specialInstructions: e.target.value})} className="w-full p-2 rounded border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm" />
              </div>
              <button onClick={handleSave} className="w-full py-2 bg-red-500 text-white rounded font-bold mt-2">Guardar Datos de Emergencia</button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4 text-sm bg-white/50 dark:bg-slate-900/50 p-4 rounded-xl">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-xs font-semibold">Tipo de Sangre</p>
                  <p className="font-bold text-red-600 dark:text-red-400">{profileData.bloodType}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-xs font-semibold">Nacimiento</p>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{profileData.birthDate}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-500 dark:text-gray-400 text-xs font-semibold">Alergias</p>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{profileData.allergies}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-500 dark:text-gray-400 text-xs font-semibold">Enfermedades</p>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{profileData.diseases}</p>
                </div>
                <div className="col-span-2 border-t border-red-200/50 dark:border-red-900/50 pt-2 mt-1">
                  <p className="text-gray-500 dark:text-gray-400 text-xs font-semibold">Contacto de Emergencia</p>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{profileData.emergencyContactName}</p>
                  <p className="text-red-600 dark:text-red-400 font-bold">{profileData.emergencyContactCountryCode} {profileData.emergencyContactPhone}</p>
                </div>
              </div>
              
              <button 
                onClick={() => setShowQR(true)}
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-red-500/20"
              >
                <QrCode size={18} />
                Ver mi Tarjeta QR
              </button>
            </>
          )}
        </div>
      </div>

      {!isEditing && (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-2">Ajustes</h3>
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden divide-y divide-gray-100 dark:divide-slate-700">
            <button onClick={() => setShowReminders(true)} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
              <span className="text-gray-800 dark:text-gray-200 font-medium">Configurar Recordatorios (Push)</span>
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
      )}

      {showQR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-3xl shadow-2xl p-8 flex flex-col items-center relative animate-in zoom-in-95 duration-200 border border-red-500/20">
            <button onClick={() => setShowQR(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 dark:hover:text-white">
              <X size={24} />
            </button>
            <ShieldAlert size={48} className="text-red-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-2">Escanea para Ayudar</h2>
            
            <div className="text-center text-sm text-gray-600 dark:text-gray-400 mb-6 bg-gray-50 dark:bg-slate-800 p-4 rounded-xl w-full">
              <p className="font-bold text-gray-900 dark:text-white">{profileData.fullName}</p>
              <p>Sangre: <span className="font-bold text-red-500">{profileData.bloodType}</span></p>
              <p>Alergias: {profileData.allergies || 'Ninguna'}</p>
              {profileData.diseases && <p className="mt-1">Enfermedades: <span className="font-semibold text-brand-500">{profileData.diseases}</span></p>}
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-inner mb-4 relative group">
              {/* Dynamic QR Code using an external API for demo purposes */}
              <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent('https://thepain.app/emergency/jane-doe')}`} alt="QR Code" className="w-48 h-48" />
              <button 
                onClick={handleDownloadQR}
                className="absolute -bottom-3 -right-3 bg-brand-500 hover:bg-brand-600 text-white p-3 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center justify-center"
                title="Descargar QR"
              >
                <Download size={20} />
              </button>
            </div>

            <a href="/emergency/jane-doe" target="_blank" className="mb-4 text-xs font-bold text-brand-500 hover:text-brand-600 flex items-center gap-1 bg-brand-50 dark:bg-brand-900/20 px-3 py-1.5 rounded-full transition-colors mt-2">
              thepain.app/emergency/jane-doe
            </a>
            
            <div className="text-xs text-center text-gray-500 mb-2">
              Avisar a: <br/>
              <strong>{profileData.emergencyContactName}</strong><br/>
              {profileData.emergencyContactCountryCode} {profileData.emergencyContactPhone}
            </div>
            
            <div className="flex justify-center gap-4 w-full px-8">
              <a href={`tel:${profileData.emergencyContactCountryCode}${profileData.emergencyContactPhone}`} className="flex-1 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl shadow-lg transition-transform hover:scale-105 flex items-center justify-center gap-2">
                <Phone size={18} /> Llamar
              </a>
              <a href={`https://wa.me/${(profileData.emergencyContactCountryCode || '').replace('+','')}${profileData.emergencyContactPhone}`} target="_blank" className="flex-1 py-2 bg-[#25D366] hover:bg-[#1ebd5a] text-white rounded-xl shadow-lg transition-transform hover:scale-105 flex items-center justify-center gap-2">
                <MessageCircle size={18} /> Chat
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Render new Modals conditionally */}
      {showReminders && <RemindersModal onClose={() => setShowReminders(false)} />}

    </div>
  );
}
