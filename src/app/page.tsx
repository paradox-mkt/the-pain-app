import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-gradient-to-br from-brand-900 via-brand-800 to-brand-950 text-white">
      <div className="max-w-md w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md shadow-xl border border-white/20">
            {/* We will replace this with a proper Logo component later */}
            <span className="text-4xl font-bold text-brand-100">TP</span>
          </div>
        </div>
        
        <div className="space-y-3">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            ThePain App
          </h1>
          <p className="text-lg text-brand-100/80">
            Tu compañero diario para el manejo del dolor y cuidado de la salud.
          </p>
        </div>

        <div className="pt-8 space-y-4">
          <Link 
            href="/login" 
            className="block w-full py-3 px-4 bg-brand-500 hover:bg-brand-400 text-white rounded-xl font-medium transition-colors shadow-lg shadow-brand-500/30"
          >
            Iniciar Sesión
          </Link>
          <Link 
            href="/register" 
            className="block w-full py-3 px-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/20 rounded-xl font-medium transition-colors"
          >
            Crear Cuenta
          </Link>
        </div>
        
        <p className="pt-8 text-sm text-brand-200/50">
          Versión Beta 0.1
        </p>
      </div>
    </div>
  );
}
