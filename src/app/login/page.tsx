import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-brand-900 via-brand-800 to-brand-950 text-white">
      <div className="w-full max-w-md bg-white/5 p-8 rounded-2xl backdrop-blur-md shadow-2xl border border-white/10 animate-in fade-in zoom-in-95 duration-500">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Bienvenido de vuelta</h2>
          <p className="text-brand-200/70">Ingresa tus datos para continuar</p>
        </div>

        <form className="space-y-6">
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
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-brand-100" htmlFor="password">
                Contraseña
              </label>
              <Link href="#" className="text-xs text-brand-300 hover:text-brand-200">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
            <input 
              id="password" 
              type="password" 
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent text-white placeholder-white/30 transition-all"
            />
          </div>

          <Link href="/dashboard" className="block mt-4">
            <button 
              type="button" 
              className="w-full py-3 px-4 bg-brand-500 hover:bg-brand-400 text-white rounded-xl font-medium transition-colors shadow-lg shadow-brand-500/30"
            >
              Iniciar Sesión (Demo)
            </button>
          </Link>
        </form>

        <div className="mt-8 text-center text-sm text-brand-200/70">
          ¿No tienes una cuenta?{' '}
          <Link href="/register" className="text-brand-300 font-medium hover:text-white transition-colors">
            Regístrate aquí
          </Link>
        </div>
      </div>
    </div>
  );
}
