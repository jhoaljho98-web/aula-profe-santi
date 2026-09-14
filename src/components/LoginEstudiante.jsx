import { useState } from 'react'
import { useEstudiante } from '../lib/estudiante'

export default function LoginEstudiante() {
  const { estudiante, iniciarSesion, cerrarSesion } = useEstudiante()
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
    else setDoc('')
  }

  if (estudiante) {
    return (
      <div className="card bg-institucional-verde text-white flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="text-3xl">👋</div>
        <div className="flex-1">
          <div className="text-sm opacity-90">¡Bienvenido/a!</div>
          <div className="font-display font-bold text-lg">{estudiante.nombre}</div>
          <div className="text-xs opacity-80">Tus puntos se van guardando en el podio.</div>
        </div>
        <button
          onClick={cerrarSesion}
          className="px-3 py-2 bg-white text-institucional-verdeOscuro rounded-lg text-sm font-semibold hover:bg-institucional-crema"
        >
          Cambiar de estudiante
        </button>
      </div>
    )
  }

  return (
    <div className="card bg-institucional-crema">
      <div className="flex items-start gap-3 mb-3">
        <div className="text-3xl">🎮</div>
        <div>
          <h3 className="font-display font-bold text-lg text-institucional-verdeOscuro">
            Ingresa para guardar tus puntos
          </h3>
          <p className="text-sm text-gray-700">
            Escribe tu número de documento (el mismo que usas en Notas y Asistencia).
          </p>
        </div>
      </div>
      <form onSubmit={enviar} className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          inputMode="numeric"
          value={doc}
          onChange={(e) => setDoc(e.target.value.replace(/\D/g, ''))}
          placeholder="Ej. 1234567890"
          className="flex-1 px-4 py-3 rounded-xl border-2 border-institucional-verde focus:outline-none focus:border-institucional-verdeOscuro text-lg"
        />
        <button
          type="submit"
          disabled={cargando}
          className="px-6 py-3 bg-institucional-verde text-white rounded-xl font-semibold hover:bg-institucional-verdeOscuro disabled:opacity-60"
        >
          {cargando ? 'Buscando…' : 'Entrar'}
        </button>
      </form>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  )
}
