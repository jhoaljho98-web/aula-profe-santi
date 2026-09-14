import { useEffect, useState } from 'react'
import { useEstudiante } from '../lib/estudiante'
import { leerPodio, leerMisEstadisticas } from '../lib/puntajes'
import { firebaseHabilitado } from '../lib/firebase'
import LoginEstudiante from '../components/LoginEstudiante'

const MEDALLAS = ['🥇', '🥈', '🥉']

function primerNombre(nombre) {
  if (!nombre) return ''
  const partes = nombre.trim().split(/\s+/)
  // Nombre + primer apellido para desambiguar
  const nombreP = partes.slice(0, 1).join(' ')
  const apellido = partes.slice(-2, -1).join(' ') || ''
  return `${nombreP} ${apellido}`.trim()
}

export default function Podio() {
  const { estudiante } = useEstudiante()
  const [podio, setPodio] = useState([])
  const [mis, setMis] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let vivo = true
    async function cargar() {
      setCargando(true)
      setError('')
      try {
        const lista = await leerPodio(20)
        if (!vivo) return
        setPodio(lista)
        if (estudiante) {
          const mias = await leerMisEstadisticas(estudiante.hash)
          if (vivo) setMis(mias)
        }
      } catch (e) {
        if (vivo) setError('No pudimos cargar el podio. Intenta de nuevo en un momento.')
      } finally {
        if (vivo) setCargando(false)
      }
    }
    cargar()
    return () => {
      vivo = false
    }
  }, [estudiante])

  const posicionMia =
    estudiante && podio.findIndex((p) => p.hash === estudiante.hash)

  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-3xl md:text-4xl font-display font-bold text-institucional-verdeOscuro">
          🏆 Podio de la clase
        </h1>
        <p className="mt-2 text-gray-700">
          Los que más juegan y aciertan van subiendo. ¡Suma puntos jugando en Actividades!
        </p>
      </section>

      {!firebaseHabilitado && (
        <div className="card bg-yellow-100 border-2 border-yellow-400">
          <p className="text-sm">
            El podio no está conectado todavía. El profesor debe configurar Firebase.
          </p>
        </div>
      )}

      {!estudiante && firebaseHabilitado && <LoginEstudiante />}

      {mis && (
        <div className="card bg-institucional-verde text-white">
          <div className="text-sm opacity-90">Tu puntaje total</div>
          <div className="font-display font-bold text-4xl">{mis.puntosTotal ?? 0} pts</div>
          <div className="text-sm opacity-90 mt-1">
            {mis.partidasTotal ?? 0} partidas jugadas
            {posicionMia >= 0 ? ` · Puesto #${posicionMia + 1}` : ''}
          </div>
        </div>
      )}

      {cargando ? (
        <div className="card">Cargando podio…</div>
      ) : error ? (
        <div className="card bg-red-100 text-red-700">{error}</div>
      ) : podio.length === 0 ? (
        <div className="card">
          Aún nadie ha jugado. ¡Sé el primero en aparecer en el podio! 🎯
        </div>
      ) : (
        <div className="space-y-2">
          {podio.map((p, i) => {
            const soyYo = estudiante && p.hash === estudiante.hash
            const fondo = i === 0
              ? 'bg-yellow-100 border-yellow-400'
              : i === 1
              ? 'bg-gray-100 border-gray-400'
              : i === 2
              ? 'bg-orange-100 border-orange-400'
              : 'bg-white border-gray-200'
            return (
              <div
                key={p.hash}
                className={`card ${fondo} border-2 flex items-center gap-3 ${
                  soyYo ? 'ring-4 ring-institucional-verde' : ''
                }`}
              >
                <div className="text-2xl w-10 text-center">
                  {MEDALLAS[i] ?? <span className="text-gray-500 font-bold">#{i + 1}</span>}
                </div>
                <div className="flex-1">
                  <div className="font-display font-bold text-lg">
                    {primerNombre(p.nombre)}
                    {soyYo && <span className="ml-2 text-sm text-institucional-verdeOscuro">(¡tú!)</span>}
                  </div>
                  <div className="text-xs text-gray-600">{p.partidasTotal ?? 0} partidas</div>
                </div>
                <div className="text-right">
                  <div className="font-display font-bold text-2xl text-institucional-verdeOscuro">
                    {p.puntosTotal ?? 0}
                  </div>
                  <div className="text-xs text-gray-600">pts</div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
