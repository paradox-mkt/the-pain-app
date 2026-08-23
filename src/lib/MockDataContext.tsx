'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Crisis = {
  id: string;
  intensity: number;
  date: string;
  notes: string;
  bodyParts: string[];
};

type Medication = {
  id: string;
  name: string;
  dose: string;
  time: string;
  taken: boolean;
};

type Post = {
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
  medications: Medication[];
  addMedication: (med: Omit<Medication, 'id'>) => void;
  toggleMedication: (id: string) => void;
  posts: Post[];
  addPost: (content: string) => void;
  toggleLike: (id: string) => void;
  isCrisisModalOpen: boolean;
  setIsCrisisModalOpen: (val: boolean) => void;
  isMedModalOpen: boolean;
  setIsMedModalOpen: (val: boolean) => void;
}

const MockDataContext = createContext<MockDataContextType | undefined>(undefined);

export function MockDataProvider({ children }: { children: ReactNode }) {
  const [isCrisisModalOpen, setIsCrisisModalOpen] = useState(false);
  const [isMedModalOpen, setIsMedModalOpen] = useState(false);

  const [crises, setCrises] = useState<Crisis[]>([
    { id: '1', intensity: 8, date: 'Hace 2 días', notes: 'Dolor articular fuerte en rodillas y manos. Fatiga extrema.', bodyParts: ['Rodillas', 'Manos'] },
    { id: '2', intensity: 5, date: 'Hace 1 semana', notes: 'Rigidez matutina prolongada.', bodyParts: ['Espalda Baja'] }
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

  const addCrisis = (crisis: Omit<Crisis, 'id'>) => {
    setCrises([{ ...crisis, id: Math.random().toString() }, ...crises]);
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
      crises, addCrisis,
      medications, addMedication, toggleMedication,
      posts, addPost, toggleLike,
      isCrisisModalOpen, setIsCrisisModalOpen,
      isMedModalOpen, setIsMedModalOpen
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
