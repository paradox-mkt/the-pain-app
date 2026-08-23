'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CalendarDays, BookOpen, MessageCircle, User, Calendar as CalendarIcon, Activity, Pill } from 'lucide-react';
import { useMockData } from '@/lib/MockDataContext';

export default function DesktopSidebar() {
  const pathname = usePathname();
  const { setIsCrisisModalOpen } = useMockData();

  const tabs = [
    { name: 'Resumen', href: '/dashboard', icon: CalendarDays },
    { name: 'Calendario', href: '/dashboard/calendar', icon: CalendarIcon },
    { name: 'Medicinas', href: '/dashboard/medicines', icon: Pill },
    { name: 'Crisis', href: '/dashboard/diary', icon: BookOpen },
    { name: 'Comunidad', href: '/dashboard/feed', icon: MessageCircle },
    { name: 'Perfil', href: '/dashboard/profile', icon: User },
  ];

  return (
    <aside className="hidden md:flex flex-col w-[250px] bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 h-screen sticky top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/20">
          <span className="text-white font-bold">TP</span>
        </div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">ThePain App</h1>
      </div>

      <div className="px-4 mb-6">
        <button 
          onClick={() => setIsCrisisModalOpen(true)}
          className="w-full py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium shadow-lg shadow-red-500/20 flex items-center justify-center gap-2 transition-colors"
        >
          <Activity size={18} />
          Registrar Crisis
        </button>
      </div>

      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2 ml-2">Menú Principal</div>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = pathname === tab.href;
          
          return (
            <Link 
              key={tab.name} 
              href={tab.href}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                isActive 
                  ? 'bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 font-medium' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              <span>{tab.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 font-bold text-sm">
            JD
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">Jane Doe</p>
            <p className="text-xs text-gray-500 truncate">patient@thepain.app</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
