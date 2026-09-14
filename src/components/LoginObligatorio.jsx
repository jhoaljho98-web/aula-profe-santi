import { useState } from 'react'
import { useEstudiante } from '../lib/estudiante'

/**
 * Pantalla de ingreso que aparece antes de dejar entrar a los juegos.
 * El botón "Jugar como invitado" está abajo, pequeño y discreto.
 */
export default function LoginObligatorio({ onInvitado }) {
  const { iniciarSesion } = useEstudiante()
  const [doc, setDoc] = useState('')
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  async function enviar(e) {
    e.preventDefault()
    setError('')
    setCargando(true)
    const r = await iniciarSesion(doc)
    setCargando(false)
    if (!r.ok) setError(r.error)
  }

  return (
    <div className="space-y-6">
      {/* Bloque protagonista de ingreso */}
      <div className="card bg-institucional-verde text-white text-center py-8 md:py-10">
        <div className="text-6xl mb-3">🎮</div>
        <h2 className="font-display font-bold text-2xl md:text-3xl mb-2">
          ¡Antes de jugar, dinos quién eres!
        </h2>
        <p className="opacity-95 mb-6 max-w-md mx-auto text-sm md:text-base">
          Escribe tu número de documento para que tus puntos, medallas y racha se
          vayan guardando en el podio.
        </p>

        <form onSubmit={enviar} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <input
            type="text"
            inputMode="numeric"
            value={doc}
            onChange={(e) => setDoc(e.target.value.replace(/\D/g, ''))}
            placeholder="Escribe tu documento"
            className="flex-1 px-4 py-3 rounded-xl text-gray-900 text-lg text-center focus:outline-none focus:ring-4 focus:ring-institucional-amarillo"
            autoFocus
          />
          <button
            type="submit"
            disabled={cargando}
            className="px-6 py-3 bg-institucional-amarillo text-institucional-verdeOscuro rounded-xl font-bold text-lg hover:bg-yellow-300 disabled:opacity-60"
          >
            {cargando ? 'Buscando…' : 'Entrar'}
          </button>
        </form>
        {error && (
          <p className="mt-3 text-sm bg-red-100 text-red-800 inline-block px-3 py-1 rounded-lg">
            {error}
          </p>
        )}

        <p className="text-xs opacity-80 mt-4">
          Es el mismo documento que usas en Notas y Asistencia.
        </p>
      </div>

      {/* Opción invitado — botón visible pero secundario */}
      <div className="text-center">
        <div className="text-xs text-gray-500 mb-2">— o si no eres estudiante de la clase —</div>
        <button
          onClick={onInvitado}
          className="inline-flex items-center gap-2 px-5 py-2 bg-white border-2 border-gray-300 text-gray-700 rounded-full font-semibold text-sm hover:border-institucional-verde hover:text-institucional-verdeOscuro transition-colors"
        >
          <span>👤</span>
          <span>Jugar como invitado</span>
        </button>
        <div className="text-[11px] text-gray-500 mt-1">
          (tus puntos no se guardarán en el podio)
        </div>
      </div>
    </div>
  )
}
