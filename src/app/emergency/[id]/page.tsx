import { ShieldAlert, PhoneCall, HeartPulse, Activity } from 'lucide-react';
import Link from 'next/link';

export default function PublicEmergencyCard() {
  // En un entorno real, buscaríamos en la BD usando params.id
  // Aquí usamos el Mock Data por defecto para la demo
  const mockProfileData = {
    fullName: 'Jane Doe',
    birthDate: '1990-05-15',
    bloodType: 'O+',
    allergies: 'Penicilina, Ibuprofeno',
    diseases: 'Artritis Reumatoide, Fibromialgia',
    emergencyContact: 'John Doe (Esposo)',
    emergencyPhone: '+1 555-0198'
  };

  const mockDoctors = [
    { id: '1', name: 'Dr. Alex Rivera', specialty: 'Reumatólogo' },
    { id: '2', name: 'Dra. Carmen Soto', specialty: 'Especialista en Dolor' }
  ];

  return (
    <div className="min-h-screen bg-red-600 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500">
        
        {/* Header de Emergencia */}
        <div className="bg-red-600 p-6 text-center text-white relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
          <ShieldAlert size={64} className="mx-auto mb-4 animate-pulse" />
          <h1 className="text-2xl font-black uppercase tracking-widest">Alerta Médica</h1>
          <p className="text-red-100 mt-1 font-medium">Tarjeta de Emergencia Oficial</p>
        </div>

        {/* Datos Clínicos */}
        <div className="p-6 space-y-6">
          <div className="text-center pb-6 border-b border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900">{mockProfileData.fullName}</h2>
            <p className="text-gray-500 font-medium">Nacido/a: {mockProfileData.birthDate}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-red-50 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
              <HeartPulse className="text-red-500 mb-2" size={32} />
              <p className="text-xs text-gray-500 font-bold uppercase">Sangre</p>
              <p className="text-2xl font-black text-red-600">{mockProfileData.bloodType}</p>
            </div>
            <div className="bg-orange-50 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
              <Activity className="text-orange-500 mb-2" size={32} />
              <p className="text-xs text-gray-500 font-bold uppercase">Alergias</p>
              <p className="text-sm font-bold text-orange-700 leading-tight">{mockProfileData.allergies}</p>
            </div>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-2xl text-center border border-purple-100">
            <p className="text-xs text-purple-600 font-bold uppercase mb-1">Enfermedades / Condiciones</p>
            <p className="text-sm font-bold text-purple-900">{mockProfileData.diseases}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-2xl space-y-3">
            <h3 className="font-bold text-gray-900 uppercase text-xs tracking-wider">Contacto de Emergencia</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-gray-900">{mockProfileData.emergencyContact}</p>
                <p className="text-sm text-gray-500">{mockProfileData.emergencyPhone}</p>
              </div>
              <a href={`tel:${mockProfileData.emergencyPhone}`} className="w-12 h-12 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 transition-transform hover:scale-105">
                <PhoneCall size={20} />
              </a>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-2xl space-y-3">
            <h3 className="font-bold text-gray-900 uppercase text-xs tracking-wider">Médicos Tratantes</h3>
            <ul className="space-y-2">
              {mockDoctors.map(doc => (
                <li key={doc.id} className="text-sm">
                  <span className="font-semibold text-gray-900">{doc.name}</span>
                  <span className="text-gray-500 block text-xs">{doc.specialty}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Promocional */}
        <div className="bg-gray-900 p-4 text-center">
          <p className="text-gray-400 text-xs">Desarrollado por</p>
          <p className="text-white font-bold tracking-widest text-lg">THE PAIN APP</p>
          <Link href="/" className="inline-block mt-2 text-brand-400 text-xs hover:text-brand-300 font-medium transition-colors">
            Adquiere tu brazalete NFC aquí
          </Link>
        </div>
      </div>
    </div>
  );
}
