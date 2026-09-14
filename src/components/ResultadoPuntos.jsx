import { useEffect, useState } from 'react'
import { useEstudiante } from '../lib/estudiante'
import { guardarPartida, calcularPuntos } from '../lib/puntajes'

/**
 * Muestra los puntos ganados al final de una partida y los guarda en Firebase.
 * Props:
 *   - juegoId: 'tablas' | 'numeros' | 'memoria' | 'partes' | 'silabas' | 'lectura'
 *   - juegoNombre: nombre bonito para mostrar en el podio
 *   - aciertos, total
 */
export default function ResultadoPuntos({ juegoId, juegoNombre, aciertos, total }) {
  const { estudiante } = useEstudiante()
  const [estado, setEstado] = useState('guardando')
  const puntos = calcularPuntos(aciertos, total)
  const perfecto = aciertos === total && total > 0

  useEffect(() => {
    let vivo = true
    async function guardar() {
      if (!estudiante) {
        setEstado('sin-sesion')
        return
      }
      try {
        await guardarPartida({
          hash: estudiante.hash,
          nombre: estudiante.nombre,
          juegoId,
          juegoNombre,
          aciertos,
          total,
        })
        if (vivo) setEstado('guardado')
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

  return (
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
  )
}
