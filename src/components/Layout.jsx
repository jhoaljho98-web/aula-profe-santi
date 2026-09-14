import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'

const NAV = [
  { to: '/', label: 'Inicio', icon: '🏠' },
  { to: '/aula', label: 'Nuestra aula', icon: '👥' },
  { to: '/diario', label: 'Diario de clase', icon: '📅' },
  { to: '/recursos', label: 'Recursos', icon: '📚' },
  { to: '/actividades', label: 'Actividades', icon: '🎮' },
  { to: '/padres', label: 'Para los padres', icon: '👨‍👩‍👧' },
  { to: '/notas', label: 'Notas', icon: '📊' },
  { to: '/asistencia', label: 'Asistencia', icon: '✅' },
  { to: '/galeria', label: 'Galería', icon: '📸' },
  { to: '/contacto', label: 'Contacto', icon: '📞' },
]

export default function Layout({ children }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-institucional-verde text-white shadow-soft sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={`${import.meta.env.BASE_URL}escudo.png`}
              alt="Escudo IE El Llano"
              className="w-11 h-11 object-contain drop-shadow"
            />
            <div className="leading-tight">
              <div className="font-display font-bold text-lg">Aula del profe Santi</div>
              <div className="text-xs text-institucional-amarillo">IE El Llano · Marmato, Caldas</div>
            </div>
          </Link>

          {/* Botón hamburguesa (móvil) */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-institucional-verdeOscuro"
            onClick={() => setOpen(!open)}
            aria-label="Abrir menú"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    isActive ? 'bg-institucional-amarillo text-gray-900' : 'hover:bg-institucional-verdeOscuro'
                  }`
                }
                end={item.to === '/'}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Nav móvil */}
        {open && (
          <nav className="md:hidden bg-institucional-verdeOscuro px-4 py-3 space-y-1">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-lg text-sm font-semibold ${
                    isActive ? 'bg-institucional-amarillo text-gray-900' : 'text-white'
                  }`
                }
                end={item.to === '/'}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </nav>
        )}
      </header>

      {/* Main */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-institucional-verdeOscuro text-white py-6 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm">
          <p className="font-semibold">Aula del profe Santi</p>
          <p className="opacity-80 mt-1">Docente: Jhonatan Santiago Álvarez</p>
          <p className="opacity-70 mt-1">Institución Educativa El Llano · Marmato, Caldas</p>
        </div>
      </footer>
    </div>
  )
}
