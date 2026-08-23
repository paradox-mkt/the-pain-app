'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CalendarDays, BookOpen, MessageCircle, User, Calendar as CalendarIcon, Pill } from 'lucide-react';

export default function BottomNav() {
  const pathname = usePathname();

  const tabs = [
    { name: 'Resumen', href: '/dashboard', icon: CalendarDays },
    { name: 'Calendario', href: '/dashboard/calendar', icon: CalendarIcon },
    { name: 'Medicinas', href: '/dashboard/medicines', icon: Pill },
    { name: 'Crisis', href: '/dashboard/diary', icon: BookOpen },
    { name: 'Comunidad', href: '/dashboard/feed', icon: MessageCircle },
    { name: 'Perfil', href: '/dashboard/profile', icon: User },
  ];

  return (
    <nav className="md:hidden bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 safe-area-pb">
      <div className="flex justify-around items-center h-16">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = pathname === tab.href;
          
          return (
            <Link 
              key={tab.name} 
              href={tab.href}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
                isActive ? 'text-brand-600 dark:text-brand-400' : 'text-gray-500 hover:text-brand-500'
              }`}
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} className={isActive ? 'animate-in zoom-in duration-300' : ''} />
              <span className="text-[10px] font-medium">{tab.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
