import { useState } from 'react'
import ResultadoPuntos from '../components/ResultadoPuntos.jsx'

export default function QuizGenerico({ juegoId, juegoNombre, materia, preguntas, onExit }) {
  const [i, setI] = useState(0)
  const [aciertos, setAciertos] = useState(0)
  const [terminado, setTerminado] = useState(false)
  const [seleccion, setSeleccion] = useState(null)
  const [respondido, setRespondido] = useState(false)

  if (terminado) {
    const perfecto = aciertos === preguntas.length
    return (
      <div className="card text-center">
        <div className="text-7xl mb-4">{perfecto ? '🏆' : aciertos >= preguntas.length * 0.6 ? '🎉' : '💪'}</div>
        <h2 className="font-display font-bold text-3xl text-institucional-verdeOscuro mb-4">
          {aciertos} de {preguntas.length} correctas
        </h2>
        <div className="mb-6">
          <ResultadoPuntos
            juegoId={juegoId}
            juegoNombre={juegoNombre}
            materia={materia}
            aciertos={aciertos}
            total={preguntas.length}
          />
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          <button onClick={() => window.location.reload()} className="btn-primary">Jugar otra vez</button>
          <button onClick={onExit} className="btn-secondary">Volver</button>
        </div>
      </div>
    )
  }

  const p = preguntas[i]
  function responder(idx) {
    if (respondido) return
    setSeleccion(idx)
    setRespondido(true)
    if (idx === p.correcta) setAciertos((a) => a + 1)
    setTimeout(() => {
      if (i + 1 >= preguntas.length) setTerminado(true)
      else {
        setI(i + 1)
        setRespondido(false)
        setSeleccion(null)
      }
    }, 1200)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button onClick={onExit} className="text-institucional-verdeOscuro font-semibold hover:underline">← Volver</button>
        <div className="text-sm font-semibold text-gray-600">
          Pregunta {i + 1} de {preguntas.length} · Aciertos: {aciertos}
        </div>
      </div>
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-institucional-verde transition-all" style={{ width: `${((i + 1) / preguntas.length) * 100}%` }} />
      </div>
      <div className="card text-center py-6">
        {p.enunciado && <p className="text-sm text-gray-600 mb-2">{p.enunciado}</p>}
        <div className="font-display font-bold text-3xl md:text-4xl text-institucional-verdeOscuro py-3">
          {p.pregunta}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {p.opciones.map((opt, idx) => {
          const es = seleccion === idx
          const correcta = idx === p.correcta
          let clase = 'bg-white hover:bg-institucional-crema border-2 border-gray-300 text-gray-800'
          if (respondido) {
            if (correcta) clase = 'bg-green-500 text-white border-2 border-green-600'
            else if (es) clase = 'bg-red-400 text-white border-2 border-red-500'
            else clase = 'bg-white border-2 border-gray-200 opacity-50 text-gray-700'
          }
          return (
            <button
              key={idx}
              onClick={() => responder(idx)}
              disabled={respondido}
              className={`p-4 rounded-2xl font-display font-bold text-lg transition-all ${clase}`}
            >
              {opt}
            </button>
          )
        })}
      </div>
    </div>
  )
}
