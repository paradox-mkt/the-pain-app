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

export type Medication = {
  id: string;
  name: string;
  dose: string;
  time: string;
  taken: boolean;
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
  medications: Medication[];
  addMedication: (med: Omit<Medication, 'id'>) => void;
  toggleMedication: (id: string) => void;
  posts: Post[];
  addPost: (content: string) => void;
  toggleLike: (id: string) => void;
  isCrisisModalOpen: boolean;
  setIsCrisisModalOpen: (val: boolean) => void;
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
    emergencyContactName: string;
    emergencyContactPhone: string;
    specialInstructions: string;
  };
  updateProfile: (data: Partial<{
    fullName: string;
    email: string;
    phone: string;
    birthDate: string;
    bloodType: string;
    allergies: string;
    emergencyContactName: string;
    emergencyContactPhone: string;
    specialInstructions: string;
  }>) => void;
  doctors: {id: string, name: string, specialty: string}[];
  addDoctor: (doc: {name: string, specialty: string}) => void;
  removeDoctor: (id: string) => void;
  pushEnabled: boolean;
  setPushEnabled: (val: boolean) => void;
}

const MockDataContext = createContext<MockDataContextType | undefined>(undefined);

export function MockDataProvider({ children }: { children: ReactNode }) {
  const [isCrisisModalOpen, setIsCrisisModalOpen] = useState(false);
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
      bodyParts: ['Espalda Baja'],
      tookMedication: false,
      wentToEmergency: false
    }
  ]);

  const [medications, setMedications] = useState<Medication[]>([
    { id: '1', name: 'Pregabalina', dose: '75mg', time: '08:00 AM', taken: true },
    { id: '2', name: 'Duloxetina', dose: '60mg', time: '20:00 PM', taken: false }
  ]);

  const [posts, setPosts] = useState<Post[]>([
    { 
      id: '1', author: 'Dr. Alex Rivera', role: 'Reumatólogo', isDoctor: true,
      content: 'Recordatorio importante: La fatiga es un síntoma tan real como el dolor físico. Escucha a tu cuerpo.',
      likes: 124, comments: 28, isLiked: false, timeAgo: 'Hace 2h', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Alex'
    },
    { 
      id: '2', author: 'María S.', role: 'Paciente', isDoctor: false,
      content: 'Hoy descubrí que hacer estiramientos muy suaves en agua tibia me ayuda muchísimo con la rigidez matutina.',
      likes: 45, comments: 12, isLiked: true, timeAgo: 'Hace 5h', avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=MS'
    }
  ]);

  const [profileData, setProfileData] = useState({
    fullName: 'Jane Doe',
    email: 'patient@thepain.app',
    phone: '+1 987 654 321',
    birthDate: '1990-05-15',
    bloodType: 'O+',
    allergies: 'Penicilina, Ibuprofeno',
    emergencyContactName: 'John Doe (Esposo)',
    emergencyContactPhone: '+1 234 567 890',
    specialInstructions: 'En caso de crisis severa, administrar medicación de rescate y mantener a la paciente abrigada.'
  });

  const [doctors, setDoctors] = useState<{id: string, name: string, specialty: string}[]>([
    { id: '1', name: 'Dr. Juan Pérez', specialty: 'Reumatología' },
    { id: '2', name: 'Dra. María González', specialty: 'Fisioterapia' }
  ]);

  const [pushEnabled, setPushEnabled] = useState(false);

  const updateProfile = (data: Partial<typeof profileData>) => {
    setProfileData(prev => ({ ...prev, ...data }));
  };

  const addDoctor = (doctor: {name: string, specialty: string}) => {
    setDoctors([...doctors, { ...doctor, id: Math.random().toString() }]);
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

  const addMedication = (med: Omit<Medication, 'id'>) => {
    setMedications([...medications, { ...med, id: Math.random().toString() }]);
  };

  const toggleMedication = (id: string) => {
    setMedications(medications.map(m => m.id === id ? { ...m, taken: !m.taken } : m));
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
      medications, addMedication, toggleMedication,
      posts, addPost, toggleLike,
      isCrisisModalOpen, setIsCrisisModalOpen,
      editingCrisisId, setEditingCrisisId,
      isMedModalOpen, setIsMedModalOpen,
      profileData, updateProfile,
      doctors, addDoctor, removeDoctor,
      pushEnabled, setPushEnabled
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
