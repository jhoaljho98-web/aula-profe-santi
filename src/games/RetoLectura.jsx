import { useEffect, useState } from 'react'
import lecturas from '../data/lecturas.json'

const SEGUNDOS_LECTURA = 20

function prepararRonda() {
  return [...lecturas].sort(() => Math.random() - 0.5).slice(0, 6).map((l) => ({
    ...l,
    opciones: [...l.opciones].sort(() => Math.random() - 0.5),
  }))
}


export default function RetoLectura({ onExit }) {
  const [i, setI] = useState(0)
  const [preguntas] = useState(prepararRonda)
  const [fase, setFase] = useState('lectura')  // 'lectura' | 'pregunta'
  const [tiempoRestante, setTiempoRestante] = useState(SEGUNDOS_LECTURA)
  const [seleccion, setSeleccion] = useState(null)
  const [aciertos, setAciertos] = useState(0)
  const [terminado, setTerminado] = useState(false)

  const l = preguntas[i]

  // Contador
  useEffect(() => {
    if (fase !== 'lectura' || terminado) return
    if (tiempoRestante <= 0) {
      setFase('pregunta')
      return
    }
    const t = setTimeout(() => setTiempoRestante((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [fase, tiempoRestante, terminado])

  function yaLeí() {
    if (fase === 'lectura') setFase('pregunta')
  }

  function responder(op) {
    if (seleccion !== null) return
    setSeleccion(op)
    const ok = op === l.correcta
    setTimeout(() => {
      if (ok) setAciertos((a) => a + 1)
      if (i + 1 >= preguntas.length) {
        setTerminado(true)
      } else {
        setI((v) => v + 1)
        setFase('lectura')
        setTiempoRestante(SEGUNDOS_LECTURA)
        setSeleccion(null)
      }
    }, 1000)
  }

  if (terminado) {
    const pct = Math.round((aciertos / preguntas.length) * 100)
    let emoji = '🎉'
    let mensaje = '¡Muy bien! Sigue leyendo cada día.'
    if (pct < 60) { emoji = '💪'; mensaje = 'La lectura mejora con la práctica.' }
    else if (pct >= 80) { emoji = '🏆'; mensaje = '¡Eres un lector campeón!' }
    return (
      <div className="card text-center">
        <div className="text-7xl mb-4">{emoji}</div>
        <h2 className="font-display font-bold text-3xl text-institucional-verdeOscuro mb-2">
          {aciertos} de {preguntas.length} correctas
        </h2>
        <p className="text-gray-700 mb-6">{mensaje}</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <button onClick={() => window.location.reload()} className="btn-primary">Leer otra vez</button>
          <button onClick={onExit} className="btn-secondary">Volver</button>
        </div>
      </div>
    )
  }

  const pctBarra = (tiempoRestante / SEGUNDOS_LECTURA) * 100

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button onClick={onExit} className="text-institucional-verdeOscuro font-semibold hover:underline">
          ← Volver
        </button>
        <div className="text-sm font-semibold text-gray-600">
          Lectura {i + 1} de {preguntas.length} · Aciertos: {aciertos}
        </div>
      </div>

      {/* Fase LECTURA */}
      {fase === 'lectura' && (
        <div className="card py-8 space-y-6">
          {/* Timer */}
          <div className="text-center">
            <div className="inline-block px-6 py-3 rounded-full bg-institucional-crema">
              <span className="text-4xl font-bold text-institucional-verdeOscuro">⏱️ {tiempoRestante}s</span>
            </div>
          </div>
          <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all ease-linear duration-1000 ${
                tiempoRestante > 8 ? 'bg-institucional-verde' : tiempoRestante > 4 ? 'bg-institucional-amarillo' : 'bg-red-400'
              }`}
              style={{ width: `${pctBarra}%` }}
            />
          </div>

          <p className="text-center text-sm text-gray-600">
            📖 Lee con atención. Al terminar el tiempo aparecerá una pregunta.
          </p>

          <div className="text-2xl md:text-3xl font-display leading-relaxed text-gray-800 p-6 rounded-2xl bg-institucional-crema">
            {l.texto}
          </div>

          <div className="text-center">
            <button onClick={yaLeí} className="btn-primary">
              Ya la leí ✓
            </button>
          </div>
        </div>
      )}

      {/* Fase PREGUNTA */}
      {fase === 'pregunta' && (
        <div className="card py-8">
          <div className="text-center mb-4 text-sm text-gray-500">
            ¡Se acabó el tiempo de leer! Ahora responde:
          </div>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-institucional-verdeOscuro text-center mb-8">
            {l.pregunta}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
            {l.opciones.map((op) => {
              let color = 'bg-white text-institucional-verdeOscuro border-2 border-institucional-verde hover:bg-institucional-crema'
              if (seleccion !== null) {
                if (op === l.correcta) color = 'bg-institucional-verde text-white'
                else if (op === seleccion) color = 'bg-red-400 text-white'
                else color = 'bg-gray-100 text-gray-400 border-2 border-transparent'
              }
              return (
                <button
                  key={op}
                  onClick={() => responder(op)}
                  disabled={seleccion !== null}
                  className={`py-4 px-3 text-lg font-semibold rounded-2xl shadow-soft transition-all ${color}`}
                >
                  {op}
                </button>
              )
            })}
          </div>

          {seleccion !== null && seleccion !== l.correcta && (
            <p className="text-center text-sm text-gray-500 mt-4 italic">
              La lectura decía: "{l.texto}"
            </p>
          )}
        </div>
      )}
    </div>
  )
}
