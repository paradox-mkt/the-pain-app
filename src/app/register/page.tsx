import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-brand-900 via-brand-800 to-brand-950 text-white">
      <div className="w-full max-w-md bg-white/5 p-8 rounded-2xl backdrop-blur-md shadow-2xl border border-white/10 animate-in fade-in zoom-in-95 duration-500 my-8">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Crear Cuenta</h2>
          <p className="text-brand-200/70">Únete a la comunidad de ThePain App</p>
        </div>

        <form className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-brand-100" htmlFor="role">
              Soy un...
            </label>
            <select 
              id="role"
              className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent text-white appearance-none transition-all"
            >
              <option value="patient" className="text-black">Paciente</option>
              <option value="doctor" className="text-black">Doctor / Especialista</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-brand-100" htmlFor="firstName">
                Nombre
              </label>
              <input 
                id="firstName" 
                type="text" 
                placeholder="Juan"
                className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent text-white placeholder-white/30 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-brand-100" htmlFor="lastName">
                Apellido
              </label>
              <input 
                id="lastName" 
                type="text" 
                placeholder="Pérez"
                className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent text-white placeholder-white/30 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-brand-100" htmlFor="email">
              Correo Electrónico
            </label>
            <input 
              id="email" 
              type="email" 
              placeholder="tu@correo.com"
              className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent text-white placeholder-white/30 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-brand-100" htmlFor="password">
              Contraseña
            </label>
            <input 
              id="password" 
              type="password" 
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent text-white placeholder-white/30 transition-all"
            />
          </div>

          <button 
            type="button" 
            className="w-full py-3 px-4 bg-brand-500 hover:bg-brand-400 text-white rounded-xl font-medium transition-colors shadow-lg shadow-brand-500/30 mt-6"
          >
            Registrarse
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-brand-200/70">
          ¿Ya tienes una cuenta?{' '}
          <Link href="/login" className="text-brand-300 font-medium hover:text-white transition-colors">
            Inicia sesión aquí
          </Link>
        </div>
      </div>
    </div>
  );
}
