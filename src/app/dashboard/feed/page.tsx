import { MessageSquare, Heart, Share2, BadgeCheck } from 'lucide-react';

export default function FeedPage() {
  return (
    <div className="p-4 space-y-6 pb-20 animate-in fade-in duration-500">
      <header className="pt-2 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Comunidad</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Tips, consejos y apoyo mutuo</p>
      </header>

      <div className="space-y-4">
        {/* Post 1 - Doctor */}
        <article className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-3">
            <img src="https://api.dicebear.com/9.x/avataaars/svg?seed=Alex" alt="Avatar" className="w-10 h-10 rounded-full bg-blue-100" />
            <div>
              <div className="flex items-center gap-1">
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Dr. Alex Rivera</h3>
                <BadgeCheck size={16} className="text-blue-500" />
              </div>
              <p className="text-xs text-gray-500">Reumatólogo • Hace 2h</p>
            </div>
          </div>
          
          <p className="text-sm text-gray-800 dark:text-gray-200 mb-4 leading-relaxed">
            Recordatorio importante: La fatiga es un síntoma tan real como el dolor físico. No te sientas culpable por necesitar descansar más de lo habitual durante un brote. Escucha a tu cuerpo. 💙
          </p>
          
          <div className="flex items-center gap-6 text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-slate-700 pt-3">
            <button className="flex items-center gap-1.5 text-xs hover:text-brand-500 transition-colors">
              <Heart size={18} /> 124
            </button>
            <button className="flex items-center gap-1.5 text-xs hover:text-brand-500 transition-colors">
              <MessageSquare size={18} /> 28
            </button>
            <button className="flex items-center gap-1.5 text-xs hover:text-brand-500 transition-colors ml-auto">
              <Share2 size={18} />
            </button>
          </div>
        </article>

        {/* Post 2 - Patient */}
        <article className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 font-bold">
              M
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm">María S.</h3>
              <p className="text-xs text-gray-500">Paciente • Hace 5h</p>
            </div>
          </div>
          
          <p className="text-sm text-gray-800 dark:text-gray-200 mb-4 leading-relaxed">
            Hoy descubrí que hacer estiramientos muy suaves en agua tibia me ayuda muchísimo con la rigidez matutina. ¿Alguien más ha probado hidroterapia casera?
          </p>
          
          <div className="flex items-center gap-6 text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-slate-700 pt-3">
            <button className="flex items-center gap-1.5 text-xs hover:text-brand-500 transition-colors text-brand-500">
              <Heart size={18} className="fill-brand-500" /> 45
            </button>
            <button className="flex items-center gap-1.5 text-xs hover:text-brand-500 transition-colors">
              <MessageSquare size={18} /> 12
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}
