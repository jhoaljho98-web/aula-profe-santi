import { useEffect, useMemo, useState } from 'react'
import ResultadoPuntos from '../components/ResultadoPuntos.jsx'
import { sonarCorrecto, sonarIncorrecto } from '../lib/sonidos'

const TOTAL_PREGUNTAS = 15

function generarPregunta() {
  const a = Math.floor(Math.random() * 11)  // 0-10
  const b = Math.floor(Math.random() * 11)
  const correcta = a * b
  // Generar 3 distractores plausibles
  const distractores = new Set()
  while (distractores.size < 3) {
    const delta = [-1, 1, -2, 2, -a, a, -b, b, 5, -5][Math.floor(Math.random() * 10)]
    const dis = Math.max(0, correcta + delta)
    if (dis !== correcta && dis >= 0 && dis <= 100) distractores.add(dis)
  }
  const opciones = [...distractores, correcta].sort(() => Math.random() - 0.5)
  return { a, b, correcta, opciones }
}

function LineasVisualizacion() {
  const [verdes, setVerdes] = useState(0)
  const [amarillas, setAmarillas] = useState(0)

  const size = 260
  const pad = 30
  const inner = size - pad * 2
  const spacingV = inner / (verdes + 1)
  const spacingA = inner / (amarillas + 1)
  const puntos = []
  if (verdes > 0 && amarillas > 0) {
    for (let i = 1; i <= verdes; i++) {
      for (let j = 1; j <= amarillas; j++) {
        puntos.push({ x: pad + spacingV * i, y: pad + spacingA * j })
      }
    }
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-sm text-gray-700 italic">
        Dibuja las líneas que necesites y cuenta los puntos rojos.
      </p>

      <svg width={size} height={size} className="rounded-xl bg-white shadow-inner border-2 border-gray-200">
        {/* Verticales verdes */}
        {Array.from({ length: verdes }, (_, i) => (
          <line
            key={`v${i}`}
            x1={pad + spacingV * (i + 1)}
            y1={pad}
            x2={pad + spacingV * (i + 1)}
            y2={size - pad}
            stroke="#2E7D32"
            strokeWidth="3"
            strokeLinecap="round"
          />
        ))}
        {/* Horizontales amarillas */}
        {Array.from({ length: amarillas }, (_, i) => (
          <line
            key={`h${i}`}
            x1={pad}
            y1={pad + spacingA * (i + 1)}
            x2={size - pad}
            y2={pad + spacingA * (i + 1)}
            stroke="#E5C000"
            strokeWidth="3"
            strokeLinecap="round"
          />
        ))}
        {/* Puntos de cruce */}
        {puntos.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="5" fill="#DC2626" />
        ))}
      </svg>

      {/* Controles */}
      <div className="grid grid-cols-2 gap-2 w-full max-w-xs">
        <div className="flex items-center justify-between rounded-xl bg-institucional-verde bg-opacity-10 px-2 py-2">
          <button
            onClick={() => setVerdes(v => Math.max(0, v - 1))}
            className="w-8 h-8 rounded-full bg-institucional-verde text-white font-bold text-lg"
          >−</button>
          <span className="text-institucional-verdeOscuro font-bold">🟩 {verdes}</span>
          <button
            onClick={() => setVerdes(v => Math.min(10, v + 1))}
            className="w-8 h-8 rounded-full bg-institucional-verde text-white font-bold text-lg"
          >+</button>
        </div>
        <div className="flex items-center justify-between rounded-xl bg-institucional-amarillo bg-opacity-20 px-2 py-2">
          <button
            onClick={() => setAmarillas(a => Math.max(0, a - 1))}
            className="w-8 h-8 rounded-full bg-institucional-amarilloOscuro text-white font-bold text-lg"
          >−</button>
          <span className="text-institucional-amarilloOscuro font-bold">🟨 {amarillas}</span>
          <button
            onClick={() => setAmarillas(a => Math.min(10, a + 1))}
            className="w-8 h-8 rounded-full bg-institucional-amarilloOscuro text-white font-bold text-lg"
          >+</button>
        </div>
      </div>

      <button
        onClick={() => { setVerdes(0); setAmarillas(0) }}
        className="text-xs text-gray-500 hover:text-gray-800 underline"
      >
        Borrar todas
      </button>
    </div>
  )
}

export default function TablasBatalla({ onExit }) {
  const [i, setI] = useState(0)
  const [preguntas] = useState(() => Array.from({ length: TOTAL_PREGUNTAS }, generarPregunta))
  const [aciertos, setAciertos] = useState(0)
  const [seleccion, setSeleccion] = useState(null)
  const [terminado, setTerminado] = useState(false)
  const [inicio] = useState(Date.now())
  const [tiempoFinal, setTiempoFinal] = useState(null)
  const [mostrarLineas, setMostrarLineas] = useState(false)

  const p = preguntas[i]

  function responder(op) {
    if (seleccion !== null) return
    setSeleccion(op)
    const ok = op === p.correcta
    setTimeout(() => {
      if (ok) { setAciertos((a) => a + 1); sonarCorrecto() } else sonarIncorrecto()
      if (i + 1 >= TOTAL_PREGUNTAS) {
        setTiempoFinal(Math.floor((Date.now() - inicio) / 1000))
        setTerminado(true)
      } else {
        setI((v) => v + 1)
        setSeleccion(null)
        setMostrarLineas(false)
      }
    }, 700)
  }

  if (terminado) {
    const pct = Math.round((aciertos / TOTAL_PREGUNTAS) * 100)
    let emoji = '🎉', mensaje = '¡Excelente trabajo!'
    if (pct < 60) { emoji = '💪'; mensaje = '¡Sigue practicando, cada vez lo harás mejor!' }
    else if (pct < 80) { emoji = '👍'; mensaje = '¡Muy bien! Un poquito más y serás experto.' }
    else if (pct === 100) { emoji = '🏆'; mensaje = '¡Perfecto! Eres un campeón de las tablas.' }
    return (
      <div className="card text-center">
        <div className="text-7xl mb-4">{emoji}</div>
        <h2 className="font-display font-bold text-3xl text-institucional-verdeOscuro mb-2">
          {aciertos} de {TOTAL_PREGUNTAS} correctas
        </h2>
        <p className="text-lg text-gray-700 mb-2">{mensaje}</p>
        <p className="text-sm text-gray-500 mb-6">Tiempo: {tiempoFinal} segundos</p>
        <div className="mb-6">
          <ResultadoPuntos
            juegoId="tablas-batalla"
            juegoNombre="Batalla de Tablas"
            materia="matematicas"
            aciertos={aciertos}
            total={TOTAL_PREGUNTAS}
          />
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          <button onClick={() => window.location.reload()} className="btn-primary">Jugar otra vez</button>
          <button onClick={onExit} className="btn-secondary">Volver a las actividades</button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button onClick={onExit} className="text-institucional-verdeOscuro font-semibold hover:underline">
          ← Volver
        </button>
        <div className="text-sm font-semibold text-gray-600">
          Pregunta {i + 1} de {TOTAL_PREGUNTAS} · Aciertos: {aciertos}
        </div>
      </div>

      {/* Barra de progreso */}
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-institucional-verde transition-all"
          style={{ width: `${(i / TOTAL_PREGUNTAS) * 100}%` }}
        />
      </div>

      <div className="card text-center py-10">
        <div className="text-gray-500 text-sm mb-2">¿Cuánto es?</div>
        <div className="text-6xl md:text-7xl font-display font-bold text-institucional-verdeOscuro mb-6">
          {p.a} × {p.b}
        </div>

        {!mostrarLineas && (
          <button
            onClick={() => setMostrarLineas(true)}
            className="mb-6 px-4 py-2 rounded-full bg-institucional-amarillo text-gray-900 font-semibold text-sm hover:bg-institucional-amarilloOscuro"
          >
            🤔 ¿Necesitas ayuda? Ver líneas
          </button>
        )}
        {mostrarLineas && (
          <div className="mb-6">
            <LineasVisualizacion key={i} />
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
          {p.opciones.map((op) => {
            let color = 'bg-white text-institucional-verdeOscuro border-2 border-institucional-verde hover:bg-institucional-crema'
            if (seleccion !== null) {
              if (op === p.correcta) color = 'bg-institucional-verde text-white'
              else if (op === seleccion) color = 'bg-red-400 text-white'
              else color = 'bg-gray-100 text-gray-400 border-2 border-transparent'
            }
            return (
              <button
                key={op}
                onClick={() => responder(op)}
                disabled={seleccion !== null}
                className={`py-6 text-3xl font-bold rounded-2xl shadow-soft transition-all ${color}`}
              >
                {op}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
