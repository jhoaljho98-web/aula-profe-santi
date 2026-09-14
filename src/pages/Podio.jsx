import { useEffect, useState } from 'react'
import { useEstudiante } from '../lib/estudiante'
import { leerPodio, leerPodioPorMateria, leerMisEstadisticas } from '../lib/puntajes'
import { firebaseHabilitado } from '../lib/firebase'
import {
  medallasGanadas,
  medallaActual,
  siguienteMedalla,
  trofeosGanados,
  MEDALLAS,
  TROFEOS_RACHA,
} from '../lib/logros'
import LoginEstudiante from '../components/LoginEstudiante'
import Avatar from '../components/Avatar'

const POSICIONES = ['🥇', '🥈', '🥉']

const MATERIAS = [
  { id: 'general',     nombre: 'General',      icono: '🏆', color: 'bg-institucional-verde' },
  { id: 'matematicas', nombre: 'Matemáticas',  icono: '🔢', color: 'bg-blue-500' },
  { id: 'castellano',  nombre: 'Castellano',   icono: '📖', color: 'bg-pink-500' },
  { id: 'sociales',    nombre: 'Sociales',     icono: '🗺️', color: 'bg-amber-500' },
  { id: 'naturales',   nombre: 'Naturales',    icono: '🌱', color: 'bg-emerald-500' },
]

function primerNombre(nombre) {
  if (!nombre) return ''
  const partes = nombre.trim().split(/\s+/)
  const nombreP = partes.slice(0, 1).join(' ')
  const apellido = partes.slice(-2, -1).join(' ') || ''
  return `${nombreP} ${apellido}`.trim()
}

export default function Podio() {
  const { estudiante } = useEstudiante()
  const [materia, setMateria] = useState('general')
  const [podio, setPodio] = useState([])
  const [mis, setMis] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [vista, setVista] = useState('ranking')

  useEffect(() => {
    let vivo = true
    async function cargar() {
      setCargando(true)
      setError('')
      try {
        const lista =
          materia === 'general'
            ? await leerPodio(20)
            : await leerPodioPorMateria(materia, 20)
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
  }, [estudiante, materia])

  const posicionMia = estudiante && podio.findIndex((p) => p.hash === estudiante.hash)

  function puntosDe(estudianteDoc, materiaId) {
    if (materiaId === 'general') return estudianteDoc.puntosTotal ?? 0
    return estudianteDoc.puntosPorMateria?.[materiaId] ?? 0
  }

  function partidasDe(estudianteDoc, materiaId) {
    if (materiaId === 'general') return estudianteDoc.partidasTotal ?? 0
    return estudianteDoc.partidasPorMateria?.[materiaId] ?? 0
  }

  const materiaActual = MATERIAS.find((m) => m.id === materia)

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

      {mis && <MiResumen mis={mis} posicion={posicionMia} materia={materia} estudiante={estudiante} />}

      {mis && (
        <div className="flex gap-2">
          <button
            onClick={() => setVista('ranking')}
            className={`px-4 py-2 rounded-full font-semibold text-sm ${
              vista === 'ranking'
                ? 'bg-institucional-verde text-white'
                : 'bg-white text-gray-700 hover:bg-institucional-crema'
            }`}
          >
            🏆 Ranking
          </button>
          <button
            onClick={() => setVista('mis-logros')}
            className={`px-4 py-2 rounded-full font-semibold text-sm ${
              vista === 'mis-logros'
                ? 'bg-institucional-verde text-white'
                : 'bg-white text-gray-700 hover:bg-institucional-crema'
            }`}
          >
            🎖️ Mis logros
          </button>
        </div>
      )}

      {/* Pestañas de materia — solo en vista ranking */}
      {vista === 'ranking' && (
        <div className="flex flex-wrap gap-2">
          {MATERIAS.map((m) => (
            <button
              key={m.id}
              onClick={() => setMateria(m.id)}
              className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${
                materia === m.id
                  ? `${m.color} text-white shadow-md`
                  : 'bg-white text-gray-700 hover:bg-institucional-crema'
              }`}
            >
              {m.icono} {m.nombre}
            </button>
          ))}
        </div>
      )}

      {vista === 'mis-logros' && mis ? (
        <MisLogros mis={mis} />
      ) : cargando ? (
        <div className="card">Cargando podio…</div>
      ) : error ? (
        <div className="card bg-red-100 text-red-700">{error}</div>
      ) : podio.length === 0 ? (
        <div className="card text-center py-8">
          <div className="text-4xl mb-2">{materiaActual.icono}</div>
          <p className="font-semibold text-gray-700">
            {materia === 'general'
              ? 'Aún nadie ha jugado. ¡Sé el primero en aparecer en el podio! 🎯'
              : materia === 'sociales' || materia === 'naturales'
              ? `Todavía no hay juegos de ${materiaActual.nombre}. Muy pronto los agregaremos y aquí verás a las reinas y reyes del área.`
              : `Nadie tiene puntos en ${materiaActual.nombre} todavía. ¡Sé el primero!`}
          </p>
        </div>
      ) : (
        <div>
          {materia !== 'general' && (
            <div className={`card ${materiaActual.color} text-white text-center mb-3`}>
              <div className="text-2xl">{materiaActual.icono}</div>
              <div className="font-display font-bold text-xl">
                👑 Rey o Reina de {materiaActual.nombre}
              </div>
              <div className="text-sm opacity-90">
                {primerNombre(podio[0].nombre)} con {puntosDe(podio[0], materia)} pts
              </div>
            </div>
          )}
          <div className="space-y-2">
            {podio.map((p, i) => {
              const soyYo = estudiante && p.hash === estudiante.hash
              const fondo =
                i === 0
                  ? 'bg-yellow-100 border-yellow-400'
                  : i === 1
                  ? 'bg-gray-100 border-gray-400'
                  : i === 2
                  ? 'bg-orange-100 border-orange-400'
                  : 'bg-white border-gray-200'
              const puntos = puntosDe(p, materia)
              const partidas = partidasDe(p, materia)
              const medallaP = medallaActual(p.puntosTotal ?? 0)
              const trofeoRacha = trofeosGanados(p.rachaMax ?? 0).slice(-1)[0]
              return (
                <div
                  key={p.hash}
                  className={`card ${fondo} border-2 flex items-center gap-3 ${
                    soyYo ? 'ring-4 ring-institucional-verde' : ''
                  }`}
                >
                  <div className="text-2xl w-8 text-center">
                    {POSICIONES[i] ?? <span className="text-gray-500 font-bold text-sm">#{i + 1}</span>}
                  </div>
                  <Avatar foto={p.foto} nombre={p.nombre} tamano={48} />
                  <div className="flex-1 min-w-0">
                    <div className="font-display font-bold text-lg truncate">
                      {primerNombre(p.nombre)}
                      {soyYo && (
                        <span className="ml-2 text-sm text-institucional-verdeOscuro">(¡tú!)</span>
                      )}
                    </div>
                    <div className="text-xs text-gray-600 flex items-center gap-2 flex-wrap">
                      <span>{partidas} partidas</span>
                      {materia === 'general' && (p.racha ?? 0) > 0 && (
                        <span title={`Racha de ${p.racha} días`}>🔥 {p.racha}</span>
                      )}
                      {materia === 'general' && medallaP && (
                        <span title={`Medalla ${medallaP.nombre}`}>{medallaP.icono}</span>
                      )}
                      {materia === 'general' && trofeoRacha && (
                        <span title={`Trofeo ${trofeoRacha.nombre}`}>{trofeoRacha.icono}</span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-display font-bold text-2xl text-institucional-verdeOscuro">
                      {puntos}
                    </div>
                    <div className="text-xs text-gray-600">pts</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

function MiResumen({ mis, posicion, materia, estudiante }) {
  const materiaObj = MATERIAS.find((m) => m.id === materia)
  const puntos =
    materia === 'general'
      ? mis.puntosTotal ?? 0
      : mis.puntosPorMateria?.[materia] ?? 0
  const partidas =
    materia === 'general'
      ? mis.partidasTotal ?? 0
      : mis.partidasPorMateria?.[materia] ?? 0
  const medalla = medallaActual(mis.puntosTotal ?? 0)
  const sig = siguienteMedalla(mis.puntosTotal ?? 0)
  const racha = mis.racha ?? 0
  const rachaMax = mis.rachaMax ?? 0
  const escudos = mis.escudos ?? 1

  return (
    <div className={`card ${materiaObj?.color ?? 'bg-institucional-verde'} text-white space-y-3`}>
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-3">
          {estudiante && <Avatar foto={estudiante.foto} nombre={estudiante.nombre} tamano={72} />}
        <div>
          <div className="text-sm opacity-90">
            {materia === 'general'
              ? 'Tu puntaje total'
              : `Tus puntos en ${materiaObj?.nombre}`}
          </div>
          <div className="font-display font-bold text-4xl">{puntos} pts</div>
          <div className="text-sm opacity-90">
            {partidas} partidas
            {posicion >= 0 ? ` · Puesto #${posicion + 1}` : ''}
          </div>
        </div>
        </div>
        {materia === 'general' && medalla && (
          <div className="text-center">
            <div className="text-5xl">{medalla.icono}</div>
            <div className="text-sm font-semibold">{medalla.nombre}</div>
          </div>
        )}
      </div>

      {materia === 'general' && sig && (
        <div>
          <div className="text-xs opacity-90 mb-1">
            Próxima medalla: <b>{sig.nombre}</b> en {sig.min - puntos} pts
          </div>
          <div className="w-full h-2 bg-white bg-opacity-30 rounded-full overflow-hidden">
            <div
              className="h-full bg-institucional-amarillo transition-all"
              style={{
                width: `${Math.min(100, ((puntos - (medalla?.min ?? 0)) / (sig.min - (medalla?.min ?? 0))) * 100)}%`,
              }}
            />
          </div>
        </div>
      )}

      {materia === 'general' && (
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white border-opacity-30">
          <div className="text-center">
            <div className="text-2xl">🔥</div>
            <div className="text-lg font-bold">{racha}</div>
            <div className="text-[10px] opacity-90">Racha actual</div>
          </div>
          <div className="text-center">
            <div className="text-2xl">🏅</div>
            <div className="text-lg font-bold">{rachaMax}</div>
            <div className="text-[10px] opacity-90">Racha máxima</div>
          </div>
          <div className="text-center">
            <div className="text-2xl">🛡️</div>
            <div className="text-lg font-bold">{escudos}</div>
            <div className="text-[10px] opacity-90">Escudos</div>
          </div>
        </div>
      )}
    </div>
  )
}

function MisLogros({ mis }) {
  const puntos = mis.puntosTotal ?? 0
  const rachaMax = mis.rachaMax ?? 0
  const medallasGan = medallasGanadas(puntos)
  const trofeosGan = trofeosGanados(rachaMax)

  return (
    <div className="space-y-6">
      <section>
        <h2 className="font-display font-bold text-xl text-institucional-verdeOscuro mb-3">
          Medallas por puntaje ({medallasGan.length}/{MEDALLAS.length})
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {MEDALLAS.map((m) => {
            const desbloqueada = puntos >= m.min
            return (
              <div
                key={m.id}
                className={`card text-center ${desbloqueada ? '' : 'opacity-40 grayscale'}`}
                style={desbloqueada ? { borderTop: `4px solid ${m.color}` } : {}}
              >
                <div className="text-4xl mb-1">{desbloqueada ? m.icono : '🔒'}</div>
                <div className="font-display font-bold text-sm">{m.nombre}</div>
                <div className="text-[10px] text-gray-600">{m.min} pts</div>
              </div>
            )
          })}
        </div>
      </section>

      <section>
        <h2 className="font-display font-bold text-xl text-institucional-verdeOscuro mb-3">
          Trofeos de racha ({trofeosGan.length}/{TROFEOS_RACHA.length})
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3">
          {TROFEOS_RACHA.map((t) => {
            const desbloqueado = rachaMax >= t.min
            return (
              <div
                key={t.id}
                className={`card text-center ${desbloqueado ? 'bg-yellow-50' : 'opacity-40 grayscale'}`}
              >
                <div className="text-4xl mb-1">{desbloqueado ? t.icono : '🔒'}</div>
                <div className="font-display font-bold text-sm">{t.nombre}</div>
                <div className="text-[10px] text-gray-600">{t.min} días</div>
              </div>
            )
          })}
        </div>
      </section>

      {mis.juegos && Object.keys(mis.juegos).length > 0 && (
        <section>
          <h2 className="font-display font-bold text-xl text-institucional-verdeOscuro mb-3">
            Detalle por juego
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.values(mis.juegos).map((j) => (
              <div key={j.juegoId} className="card">
                <div className="font-display font-bold">{j.juegoNombre}</div>
                <div className="text-sm text-gray-700 mt-1">
                  Mejor puntaje: <b>{j.mejorPuntaje ?? 0}</b> pts · Jugado {j.vecesJugado ?? 0} vez
                  {(j.vecesJugado ?? 0) === 1 ? '' : 'es'}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
