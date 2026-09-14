import { useEffect, useState } from 'react'
import { useEstudiante } from '../lib/estudiante'
import { guardarPartida, calcularPuntos } from '../lib/puntajes'

export default function ResultadoPuntos({ juegoId, juegoNombre, materia, aciertos, total }) {
  const { estudiante } = useEstudiante()
  const [estado, setEstado] = useState('guardando')
  const [resultado, setResultado] = useState(null)
  const puntosPreview = calcularPuntos(aciertos, total)
  const perfecto = aciertos === total && total > 0

  useEffect(() => {
    let vivo = true
    async function guardar() {
      if (!estudiante) {
        setEstado('sin-sesion')
        return
      }
      try {
        const r = await guardarPartida({
          hash: estudiante.hash,
          nombre: estudiante.nombre,
          foto: estudiante.foto,
          juegoId,
          juegoNombre,
          materia,
          aciertos,
          total,
        })
        if (vivo) {
          setResultado(r)
          setEstado('guardado')
        }
      } catch (e) {
        if (vivo) setEstado('error')
      }
    }
    guardar()
    return () => {
      vivo = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const puntos = resultado?.puntos ?? puntosPreview

  return (
    <div className="space-y-3">
      {/* Puntos ganados */}
      <div className={`card ${perfecto ? 'bg-institucional-amarillo' : 'bg-institucional-crema'} text-center`}>
        <div className="text-4xl mb-1">{perfecto ? '🌟' : '⭐'}</div>
        <div className="text-sm text-gray-700">Ganaste</div>
        <div className="font-display font-bold text-4xl text-institucional-verdeOscuro">
          +{puntos} pts
        </div>
        {perfecto && (
          <div className="text-sm text-institucional-verdeOscuro font-semibold mt-1">
            ¡Bonus por partida perfecta!
          </div>
        )}
        <div className="text-xs text-gray-600 mt-2">
          {estado === 'guardando' && 'Guardando en el podio…'}
          {estado === 'guardado' && '✓ Puntos guardados en el podio'}
          {estado === 'sin-sesion' && (
            <>Ingresa con tu documento en Actividades para guardar tus puntos.</>
          )}
          {estado === 'error' && '⚠️ No pudimos guardar los puntos. Intenta de nuevo.'}
        </div>
      </div>

      {/* Racha */}
      {resultado?.eventoRacha === 'continua' && resultado.racha > 1 && (
        <div className="card bg-orange-100 border-2 border-orange-400 text-center">
          <div className="text-3xl">🔥</div>
          <div className="font-display font-bold text-xl text-orange-900">
            ¡Racha de {resultado.racha} días!
          </div>
          <div className="text-xs text-orange-800">Sigue jugando mañana para mantenerla.</div>
        </div>
      )}
      {resultado?.eventoRacha === 'inicio' && (
        <div className="card bg-orange-100 border-2 border-orange-400 text-center">
          <div className="text-3xl">🔥</div>
          <div className="font-display font-bold text-xl text-orange-900">
            ¡Empezaste una racha!
          </div>
          <div className="text-xs text-orange-800">
            Juega mañana para que crezca. Cada día suma.
          </div>
        </div>
      )}
      {resultado?.eventoRacha === 'escudo-usado' && (
        <div className="card bg-blue-100 border-2 border-blue-400 text-center">
          <div className="text-4xl">🛡️</div>
          <div className="font-display font-bold text-xl text-blue-900">
            ¡Tu escudo salvó tu racha!
          </div>
          <div className="text-xs text-blue-800">
            Tienes {resultado.escudos} escudo{resultado.escudos === 1 ? '' : 's'} restante
            {resultado.escudos === 1 ? '' : 's'}. Se ganan al conseguir un nuevo trofeo de racha.
          </div>
        </div>
      )}
      {resultado?.eventoRacha === 'rota' && (
        <div className="card bg-gray-100 border-2 border-gray-400 text-center">
          <div className="text-3xl">💔</div>
          <div className="font-display font-bold text-lg text-gray-800">
            Tu racha se rompió
          </div>
          <div className="text-xs text-gray-700">
            Faltaste dos días seguidos. Empiezas de nuevo desde el día 1. ¡Ánimo!
          </div>
        </div>
      )}

      {/* Medallas nuevas */}
      {resultado?.medallasNuevas?.length > 0 && (
        <div className="card bg-institucional-verde text-white text-center">
          <div className="text-4xl mb-1">
            {resultado.medallasNuevas.map((m) => m.icono).join(' ')}
          </div>
          <div className="font-display font-bold text-xl">
            ¡Nueva medalla desbloqueada!
          </div>
          <div className="text-sm opacity-95">
            {resultado.medallasNuevas.map((m) => m.nombre).join(', ')}
          </div>
        </div>
      )}

      {/* Trofeos nuevos de racha */}
      {resultado?.trofeosNuevos?.length > 0 && (
        <div className="card bg-yellow-200 border-2 border-yellow-500 text-center">
          <div className="text-4xl mb-1">
            {resultado.trofeosNuevos.map((t) => t.icono).join(' ')}
          </div>
          <div className="font-display font-bold text-xl text-yellow-900">
            ¡Nuevo trofeo de racha!
          </div>
          <div className="text-sm text-yellow-800">
            {resultado.trofeosNuevos.map((t) => t.nombre).join(', ')}
          </div>
          {resultado.escudoGanado && (
            <div className="text-xs text-yellow-900 mt-1">
              🛡️ ¡Ganaste un escudo extra!
            </div>
          )}
        </div>
      )}
    </div>
  )
}
