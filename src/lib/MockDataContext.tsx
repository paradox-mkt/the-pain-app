'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Crisis = {
  id: string;
  intensity: number;
  dateTime: string;
  notes: string;
  bodyParts: string[];
  tookMedication?: boolean;
  medicationTaken?: string;
  wentToEmergency?: boolean;
  emergencyTreatment?: string;
  examsDone?: string[];
};

export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  phone?: string;
  phoneCountryCode?: string;
  hospital?: string;
  isMain?: boolean;
};

export type BaseMedication = {
  id: string;
  name: string;
  dose: string;
  medicationType: 'daily' | 'weekly' | 'biweekly' | 'monthly';
  frequency: string; // '24h', '12h', '8h', '6h' - only used for daily
  specificDayOfWeek?: number; // 0-6 (Sun-Sat) or 1-7 depending on frontend mapping, let's use 1-7 for Mon-Sun
  startDate?: string; // 'YYYY-MM-DD'
  firstDoseTime: string; // '08:00'
  isActive: boolean;
};

export type MedicationLog = {
  id: string;
  baseMedId: string;
  date: string; // 'YYYY-MM-DD'
  time: string; // 'HH:mm'
  taken: boolean;
};

export type Appointment = {
  id: string;
  doctorId: string;
  dateTime: string;
  reason: string;
};

export type SpoonTask = {
  id: string;
  name: string;
  cost: number;
};

export type SpoonLog = {
  used: number;
  borrowed: number;
};

export type ExtraMed = {
  id: string;
  name: string;
  dose: string;
  dateTime: string;
};

export type Post = {
  id: string;
  author: string;
  role: string;
  content: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  timeAgo: string;
  avatar: string;
  isDoctor: boolean;
};

interface MockDataContextType {
  crises: Crisis[];
  addCrisis: (crisis: Omit<Crisis, 'id'>) => void;
  updateCrisis: (id: string, crisis: Partial<Crisis>) => void;
  deleteCrisis: (id: string) => void;
  baseMedications: BaseMedication[];
  addBaseMedication: (med: Omit<BaseMedication, 'id'>) => void;
  updateBaseMedication: (id: string, med: Partial<BaseMedication>) => void;
  deleteBaseMedication: (id: string) => void;
  medicationLogs: MedicationLog[];
  toggleMedicationLog: (baseMedId: string, date: string, time: string) => void;
  appointments: Appointment[];
  addAppointment: (appt: Omit<Appointment, 'id'>) => void;
  updateAppointment: (id: string, appt: Partial<Appointment>) => void;
  deleteAppointment: (id: string) => void;
  extraMeds: ExtraMed[];
  addExtraMed: (med: Omit<ExtraMed, 'id'>) => void;
  updateExtraMed: (id: string, med: Partial<ExtraMed>) => void;
  deleteExtraMed: (id: string) => void;
  posts: Post[];
  addPost: (content: string) => void;
  toggleLike: (id: string) => void;
  isCrisisModalOpen: boolean;
  setIsCrisisModalOpen: (val: boolean) => void;
  crisisModalDefaultDate: string | null;
  setCrisisModalDefaultDate: (val: string | null) => void;
  editingCrisisId: string | null;
  setEditingCrisisId: (val: string | null) => void;
  isMedModalOpen: boolean;
  setIsMedModalOpen: (val: boolean) => void;
  profileData: {
    fullName: string;
    email: string;
    phone: string;
    birthDate: string;
    bloodType: string;
    allergies: string;
    diseases: string;
    emergencyContactName: string;
    emergencyContactPhone: string;
    emergencyContactCountryCode?: string;
    specialInstructions: string;
  };
  updateProfile: (data: Partial<{
    fullName: string;
    email: string;
    phone: string;
    birthDate: string;
    bloodType: string;
    allergies: string;
    diseases: string;
    emergencyContactName: string;
    emergencyContactPhone: string;
    emergencyContactCountryCode?: string;
    specialInstructions: string;
  }>) => void;
  doctors: Doctor[];
  addDoctor: (doc: Omit<Doctor, 'id'>) => void;
  updateDoctor: (id: string, doc: Partial<Doctor>) => void;
  removeDoctor: (id: string) => void;
  pushEnabled: boolean;
  setPushEnabled: (val: boolean) => void;

  // Spoon Theory
  baseSpoons: number;
  setBaseSpoons: (val: number) => void;
  spoonTasks: SpoonTask[];
  addSpoonTask: (task: Omit<SpoonTask, 'id'>) => void;
  removeSpoonTask: (id: string) => void;
  spoonLogs: Record<string, SpoonLog>;
  logSpoons: (date: string, used: number, borrowed: number) => void;
}

const MockDataContext = createContext<MockDataContextType | undefined>(undefined);

export function MockDataProvider({ children }: { children: ReactNode }) {
  const [isCrisisModalOpen, setIsCrisisModalOpen] = useState(false);
  const [crisisModalDefaultDate, setCrisisModalDefaultDate] = useState<string | null>(null);
  const [editingCrisisId, setEditingCrisisId] = useState<string | null>(null);
  const [isMedModalOpen, setIsMedModalOpen] = useState(false);

  const [crises, setCrises] = useState<Crisis[]>([
    { 
      id: '1', intensity: 8, 
      dateTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16), 
      notes: 'Dolor articular fuerte en rodillas y manos. Fatiga extrema.', 
      bodyParts: ['Rodillas', 'Manos'],
      tookMedication: true,
      medicationTaken: 'Ibuprofeno 600mg',
      wentToEmergency: false,
      examsDone: []
    },
    { 
      id: '2', intensity: 5, 
      dateTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16), 
      notes: 'Rigidez matutina prolongada.', 
      bodyParts: ['Espalda baja'],
      tookMedication: false,
      wentToEmergency: false
    }
  ]);

  const [baseMedications, setBaseMedications] = useState<BaseMedication[]>([
    { id: '1', name: 'Pregabalina', dose: '75mg', medicationType: 'daily', frequency: '24h', firstDoseTime: '08:00', isActive: true },
    { id: '2', name: 'Duloxetina', dose: '60mg', medicationType: 'daily', frequency: '24h', firstDoseTime: '20:00', isActive: true },
    { id: '3', name: 'Tramadol', dose: '50mg', medicationType: 'daily', frequency: '12h', firstDoseTime: '08:00', isActive: false }
  ]);

  const [medicationLogs, setMedicationLogs] = useState<MedicationLog[]>([
    { id: '1', baseMedId: '1', date: new Date().toISOString().split('T')[0], time: '08:00', taken: true }
  ]);

  const [appointments, setAppointments] = useState<Appointment[]>([
    { id: '1', doctorId: '1', dateTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16), reason: 'Control mensual' }
  ]);

  const [extraMeds, setExtraMeds] = useState<ExtraMed[]>([
    { id: '1', name: 'Paracetamol', dose: '1g', dateTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16) }
  ]);

  const [posts, setPosts] = useState<Post[]>([
    { 
      id: '1', author: 'Dr. Alex Rivera', role: 'Reumatólogo', isDoctor: true,
      content: 'Acabo de subir una nueva rutina de ejercicios suaves para pacientes con artritis reumatoide. Recuerden no forzar las articulaciones durante la primera semana. https://www.youtube.com/watch?v=dQw4w9WgXcQ', 
      timeAgo: 'Hace 2h', likes: 24, comments: 0, isLiked: false,
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d'
    },
    { 
      id: '2', author: 'Dra. Carmen Soto', role: 'Especialista en Dolor', isDoctor: true,
      content: 'El manejo del dolor crónico requiere un enfoque multidisciplinario. En mi último post en Instagram explico cómo la meditación guiada puede reducir los picos de dolor hasta en un 30%. https://www.instagram.com/p/C123456789/', 
      timeAgo: 'Hace 5h', likes: 89, comments: 0, isLiked: true,
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d'
    }
  ]);

  const [profileData, setProfileData] = useState({
    fullName: 'Jane Doe',
    email: 'patient@thepain.app',
    phone: '+1 987 654 321',
    birthDate: '1990-05-15',
    bloodType: 'O+',
    allergies: 'Penicilina, Ibuprofeno',
    diseases: 'Artritis Reumatoide, Fibromialgia',
    emergencyContactName: 'John Doe (Esposo)',
    emergencyContactPhone: '5550198',
    emergencyContactCountryCode: '+1',
    specialInstructions: 'Llamar a mi esposo primero.'
  });

  const [doctors, setDoctors] = useState<Doctor[]>([
    { id: '1', name: 'Dr. Alex Rivera', specialty: 'Reumatólogo', isMain: true, phoneCountryCode: '+51', phone: '987654321', hospital: 'Clínica San Felipe' },
    { id: '2', name: 'Dra. Carmen Soto', specialty: 'Fisioterapeuta' }
  ]);

  const [pushEnabled, setPushEnabled] = useState(false);

  // Spoon Theory Data
  const [baseSpoons, setBaseSpoons] = useState(12);
  const [spoonTasks, setSpoonTasks] = useState<SpoonTask[]>([
    { id: 's1', name: 'Bañarse y vestirse', cost: 2 },
    { id: 's2', name: 'Cocinar almuerzo', cost: 3 },
    { id: 's3', name: 'Trabajar/Estudiar (media jornada)', cost: 4 },
    { id: 's4', name: 'Salir a caminar', cost: 2 },
    { id: 's5', name: 'Lavar ropa', cost: 2 },
    { id: 's6', name: 'Socializar', cost: 3 },
  ]);
  const [spoonLogs, setSpoonLogs] = useState<Record<string, SpoonLog>>({});

  const addSpoonTask = (task: Omit<SpoonTask, 'id'>) => {
    setSpoonTasks(prev => [...prev, { ...task, id: Date.now().toString() }]);
  };

  const removeSpoonTask = (id: string) => {
    setSpoonTasks(prev => prev.filter(t => t.id !== id));
  };

  const logSpoons = (date: string, used: number, borrowed: number) => {
    setSpoonLogs(prev => ({
      ...prev,
      [date]: { used, borrowed }
    }));
  };

  const updateProfile = (data: Partial<typeof profileData>) => {
    setProfileData(prev => ({ ...prev, ...data }));
  };

  const addDoctor = (doc: Omit<Doctor, 'id'>) => {
    if (doc.isMain) {
      setDoctors(prev => [
        ...prev.map(d => ({ ...d, isMain: false })),
        { ...doc, id: Date.now().toString() }
      ]);
    } else {
      setDoctors(prev => [...prev, { ...doc, id: Date.now().toString() }]);
    }
  };

  const updateDoctor = (id: string, updates: Partial<Doctor>) => {
    setDoctors(prev => {
      let newList = [...prev];
      if (updates.isMain) {
        newList = newList.map(d => ({ ...d, isMain: false }));
      }
      return newList.map(doc => doc.id === id ? { ...doc, ...updates } : doc);
    });
  };

  const removeDoctor = (id: string) => {
    setDoctors(doctors.filter(d => d.id !== id));
  };

  const addCrisis = (crisis: Omit<Crisis, 'id'>) => {
    setCrises([{ ...crisis, id: Math.random().toString() }, ...crises].sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()));
  };

  const updateCrisis = (id: string, crisis: Partial<Crisis>) => {
    setCrises(crises.map(c => c.id === id ? { ...c, ...crisis } : c).sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()));
  };

  const deleteCrisis = (id: string) => {
    setCrises(crises.filter(c => c.id !== id));
  };

  const addBaseMedication = (med: Omit<BaseMedication, 'id'>) => {
    setBaseMedications([...baseMedications, { ...med, id: Math.random().toString() }]);
  };

  const updateBaseMedication = (id: string, med: Partial<BaseMedication>) => {
    setBaseMedications(baseMedications.map(m => m.id === id ? { ...m, ...med } : m));
  };

  const deleteBaseMedication = (id: string) => {
    setBaseMedications(baseMedications.filter(m => m.id !== id));
    setMedicationLogs(medicationLogs.filter(log => log.baseMedId !== id)); // Clean up logs
  };

  const toggleMedicationLog = (baseMedId: string, date: string, time: string) => {
    const existingLogIndex = medicationLogs.findIndex(log => log.baseMedId === baseMedId && log.date === date && log.time === time);
    if (existingLogIndex >= 0) {
      const newLogs = [...medicationLogs];
      newLogs[existingLogIndex].taken = !newLogs[existingLogIndex].taken;
      setMedicationLogs(newLogs);
    } else {
      setMedicationLogs([...medicationLogs, { id: Math.random().toString(), baseMedId, date, time, taken: true }]);
    }
  };

  const addAppointment = (appt: Omit<Appointment, 'id'>) => {
    setAppointments([...appointments, { ...appt, id: Math.random().toString() }]);
  };

  const updateAppointment = (id: string, appt: Partial<Appointment>) => {
    setAppointments(appointments.map(a => a.id === id ? { ...a, ...appt } : a));
  };

  const deleteAppointment = (id: string) => {
    setAppointments(appointments.filter(a => a.id !== id));
  };

  const addExtraMed = (med: Omit<ExtraMed, 'id'>) => {
    setExtraMeds([...extraMeds, { ...med, id: Math.random().toString() }]);
  };

  const updateExtraMed = (id: string, med: Partial<ExtraMed>) => {
    setExtraMeds(extraMeds.map(m => m.id === id ? { ...m, ...med } : m));
  };

  const deleteExtraMed = (id: string) => {
    setExtraMeds(extraMeds.filter(m => m.id !== id));
  };

  const addPost = (content: string) => {
    setPosts([
      {
        id: Math.random().toString(), author: 'Jane Doe', role: 'Paciente', isDoctor: false,
        content, likes: 0, comments: 0, isLiked: false, timeAgo: 'Justo ahora', avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=JD'
      },
      ...posts
    ]);
  };

  const toggleLike = (id: string) => {
    setPosts(posts.map(p => {
      if (p.id === id) {
        return { ...p, isLiked: !p.isLiked, likes: p.isLiked ? p.likes - 1 : p.likes + 1 };
      }
      return p;
    }));
  };

  return (
    <MockDataContext.Provider value={{
      crises, addCrisis, updateCrisis, deleteCrisis,
      baseMedications, addBaseMedication, updateBaseMedication, deleteBaseMedication,
      medicationLogs, toggleMedicationLog,
      appointments, addAppointment, updateAppointment, deleteAppointment,
      extraMeds, addExtraMed, updateExtraMed, deleteExtraMed,
      posts, addPost, toggleLike,
      isCrisisModalOpen, setIsCrisisModalOpen,
      crisisModalDefaultDate, setCrisisModalDefaultDate,
      editingCrisisId, setEditingCrisisId,
      isMedModalOpen, setIsMedModalOpen,
      profileData, updateProfile,
      doctors, addDoctor, updateDoctor, removeDoctor,
      pushEnabled, setPushEnabled,
      baseSpoons, setBaseSpoons,
      spoonTasks, addSpoonTask, removeSpoonTask,
      spoonLogs, logSpoons
    }}>
      {children}
    </MockDataContext.Provider>
  );
}

export function useMockData() {
  const context = useContext(MockDataContext);
  if (!context) throw new Error('useMockData must be used within MockDataProvider');
  return context;
}
