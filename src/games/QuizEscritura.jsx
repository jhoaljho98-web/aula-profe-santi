import { useState, useRef, useEffect } from 'react'
import ResultadoPuntos from '../components/ResultadoPuntos.jsx'
import { sonarCorrecto, sonarIncorrecto } from '../lib/sonidos'

function normalizar(s) {
  return String(s || '')
    .trim().toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[.,¡!¿?;:"]/g, '')
    .replace(/\s+/g, ' ')
}

export default function QuizEscritura({ juegoId, juegoNombre, materia, preguntas, onExit }) {
  const [i, setI] = useState(0)
  const [respuesta, setRespuesta] = useState('')
  const [aciertos, setAciertos] = useState(0)
  const [terminado, setTerminado] = useState(false)
  const [feedback, setFeedback] = useState(null)  // null | 'correcto' | 'incorrecto'
  const [mostrarPista, setMostrarPista] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    if (!terminado && inputRef.current) inputRef.current.focus()
  }, [i, terminado])

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

  function comprobar() {
    if (feedback) return
    if (!respuesta.trim()) return
    const usuario = normalizar(respuesta)
    const validas = Array.isArray(p.respuestas) ? p.respuestas : [p.respuesta]
    const ok = validas.some((r) => normalizar(r) === usuario)
    setFeedback(ok ? 'correcto' : 'incorrecto')
    if (ok) { setAciertos((a) => a + 1); sonarCorrecto() }
    else sonarIncorrecto()
    setTimeout(() => {
      if (i + 1 >= preguntas.length) setTerminado(true)
      else {
        setI(i + 1)
        setRespuesta('')
        setFeedback(null)
        setMostrarPista(false)
      }
    }, 1800)
  }

  const respuestaMostrar = Array.isArray(p.respuestas) ? p.respuestas[0] : p.respuesta
  const primerLetra = respuestaMostrar?.[0] ?? ''

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
        {p.enunciado && (
          <p className="font-display font-bold text-xl md:text-2xl text-institucional-verdeOscuro leading-snug mb-3 px-2">
            {p.enunciado}
          </p>
        )}
        <div className="text-2xl md:text-3xl text-gray-700 py-3">{p.pregunta}</div>

        <form onSubmit={(e) => { e.preventDefault(); comprobar() }} className="mt-4">
          <input
            ref={inputRef}
            type="text"
            value={respuesta}
            onChange={(e) => setRespuesta(p.maxCaracteres ? e.target.value.slice(0, p.maxCaracteres) : e.target.value)}
            maxLength={p.maxCaracteres || undefined}
            disabled={feedback !== null}
            placeholder={p.placeholder || 'Escribe tu respuesta…'}
            autoComplete="off"
            autoCapitalize="none"
            className={`text-2xl md:text-3xl font-display font-bold p-4 rounded-xl border-4 w-full max-w-md mx-auto text-center focus:outline-none transition-all ${
              feedback === 'correcto' ? 'border-green-500 bg-green-100 text-green-800' :
              feedback === 'incorrecto' ? 'border-red-500 bg-red-100 text-red-800' :
              'border-institucional-verde focus:border-institucional-verdeOscuro'
            }`}
          />
          {feedback === 'incorrecto' && (
            <div className="mt-3 text-sm">
              La respuesta correcta era: <b className="text-institucional-verdeOscuro">{respuestaMostrar}</b>
            </div>
          )}
          {feedback === 'correcto' && (
            <div className="mt-3 text-lg text-green-700 font-bold">¡Muy bien! ✓</div>
          )}
          {mostrarPista && !feedback && (
            <div className="mt-3 text-sm text-gray-700">
              💡 Empieza con: <b className="text-institucional-verdeOscuro">{primerLetra.toUpperCase()}</b>
            </div>
          )}
        </form>
      </div>

      <div className="flex justify-center gap-3 flex-wrap">
        {!mostrarPista && !feedback && (
          <button onClick={() => setMostrarPista(true)} className="px-4 py-2 bg-white border-2 border-gray-300 rounded-xl font-semibold text-sm hover:border-institucional-verde">
            💡 Pista
          </button>
        )}
        <button
          onClick={comprobar}
          disabled={!respuesta.trim() || feedback !== null}
          className="btn-primary disabled:opacity-50"
        >
          Comprobar
        </button>
      </div>
    </div>
  )
}
