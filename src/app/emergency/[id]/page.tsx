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
    { id: '1', name: 'Dr. Alex Rivera', specialty: 'Reumatólogo', hospital: 'Clínica San Felipe', phoneCountryCode: '+51', phone: '987654321', isMain: true },
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
              <div className="flex gap-2">
                <a href={`tel:${mockProfileData.emergencyPhone}`} className="w-12 h-12 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 transition-transform hover:scale-105">
                  <PhoneCall size={20} />
                </a>
                <a href={`https://wa.me/${mockProfileData.emergencyPhone.replace(/[\s+-]/g, '')}`} target="_blank" className="w-12 h-12 bg-[#25D366] hover:bg-[#1ebd5a] text-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105">
                  {/* WhatsApp SVG Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c-.003 1.396.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-2xl space-y-3">
            <h3 className="font-bold text-gray-900 uppercase text-xs tracking-wider">Médicos Tratantes</h3>
            <ul className="space-y-3">
              {mockDoctors.map(doc => (
                <li key={doc.id} className="text-sm bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-semibold text-gray-900 flex items-center gap-1">
                        {doc.name}
                        {doc.isMain && <span className="text-yellow-500">★</span>}
                      </span>
                      <span className="text-brand-500 block text-xs font-medium">{doc.specialty}</span>
                    </div>
                  </div>
                  {(doc.hospital || doc.phone) && (
                    <div className="mt-2 pt-2 border-t border-gray-100 text-xs text-gray-500 space-y-1">
                      {doc.hospital && <p>🏥 {doc.hospital}</p>}
                      {doc.phone && <p>📞 {doc.phoneCountryCode} {doc.phone}</p>}
                    </div>
                  )}
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
