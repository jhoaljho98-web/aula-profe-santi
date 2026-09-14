import { useMemo, useState } from 'react'
import palabras from '../data/palabras.json'

const TOTAL = 8

function generar() {
  const oraciones = [...palabras.oraciones].sort(() => Math.random() - 0.5).slice(0, TOTAL)
  return oraciones
}

const PARTES = [
  { key: 'sujeto', label: 'Sujeto (¿Quién?)', color: 'bg-institucional-amarillo text-gray-900' },
  { key: 'verbo', label: 'Verbo (¿Qué hace?)', color: 'bg-institucional-verde text-white' },
  { key: 'complemento', label: 'Complemento (Detalles)', color: 'bg-blue-400 text-white' },
]

export default function PartesOracion({ onExit }) {
  const [i, setI] = useState(0)
  const [oraciones] = useState(() => generar())
  const [seleccionada, setSeleccionada] = useState(null)  // 'sujeto' | 'verbo' | 'complemento'
  const [asignaciones, setAsignaciones] = useState({})     // {palabraIdx: parte}
  const [aciertos, setAciertos] = useState(0)
  const [terminado, setTerminado] = useState(false)
  const [mostrarResultado, setMostrarResultado] = useState(false)

  const oracion = oraciones[i]
  const palabrasTokenizadas = useMemo(() => {
    if (!oracion) return []
    const s = [{ text: oracion.sujeto, parte: 'sujeto' }]
    const v = [{ text: oracion.verbo, parte: 'verbo' }]
    const c = [{ text: oracion.complemento, parte: 'complemento' }]
    return [...s, ...v, ...c]
  }, [oracion])

  function asignar(idx) {
    if (seleccionada === null || mostrarResultado) return
    setAsignaciones({ ...asignaciones, [idx]: seleccionada })
  }

  function verificar() {
    let ok = true
    palabrasTokenizadas.forEach((p, idx) => {
      if (asignaciones[idx] !== p.parte) ok = false
    })
    if (ok) setAciertos((a) => a + 1)
    setMostrarResultado(true)
    setTimeout(() => {
      if (i + 1 >= TOTAL) {
        setTerminado(true)
      } else {
        setI((v) => v + 1)
        setAsignaciones({})
        setSeleccionada(null)
        setMostrarResultado(false)
      }
    }, 1400)
  }

  const todasAsignadas = palabrasTokenizadas.every((_, idx) => asignaciones[idx])

  if (terminado) {
    const pct = Math.round((aciertos / TOTAL) * 100)
    let emoji = '🎉'
    if (pct < 60) emoji = '💪'
    else if (pct === 100) emoji = '🏆'
    return (
      <div className="card text-center">
        <div className="text-7xl mb-4">{emoji}</div>
        <h2 className="font-display font-bold text-3xl text-institucional-verdeOscuro mb-4">
          {aciertos} de {TOTAL} oraciones correctas
        </h2>
        <div className="flex flex-wrap gap-3 justify-center">
          <button onClick={() => window.location.reload()} className="btn-primary">Jugar otra vez</button>
          <button onClick={onExit} className="btn-secondary">Volver</button>
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
          {i + 1} de {TOTAL} · Aciertos: {aciertos}
        </div>
      </div>

      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-institucional-verde transition-all" style={{ width: `${(i / TOTAL) * 100}%` }} />
      </div>

      <div className="card py-8">
        <p className="text-center text-gray-600 mb-6">
          <strong>1)</strong> Selecciona una parte de la oración abajo · <strong>2)</strong> Toca la parte de la oración que le corresponde
        </p>

        {/* Botones de partes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-8">
          {PARTES.map((parte) => (
            <button
              key={parte.key}
              onClick={() => setSeleccionada(parte.key)}
              disabled={mostrarResultado}
              className={`py-3 rounded-2xl font-semibold shadow-soft transition-all ${
                seleccionada === parte.key
                  ? `${parte.color} ring-4 ring-institucional-verdeOscuro`
                  : parte.color + ' opacity-70 hover:opacity-100'
              }`}
            >
              {parte.label}
            </button>
          ))}
        </div>

        {/* Oración con las 3 partes seleccionables */}
        <div className="flex flex-wrap justify-center gap-2 text-xl">
          {palabrasTokenizadas.map((tok, idx) => {
            const asignada = asignaciones[idx]
            const parteObj = PARTES.find(p => p.key === asignada)
            let clases = 'px-4 py-3 rounded-xl font-bold cursor-pointer transition-all'
            if (mostrarResultado) {
              if (asignada === tok.parte) clases += ' bg-institucional-verde text-white'
              else clases += ' bg-red-400 text-white'
            } else if (parteObj) {
              clases += ' ' + parteObj.color
            } else {
              clases += ' bg-institucional-crema text-gray-800 border-2 border-dashed border-gray-300 hover:border-institucional-verde'
            }
            return (
              <span key={idx} onClick={() => asignar(idx)} className={clases}>
                {tok.text}
              </span>
            )
          })}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={verificar}
            disabled={!todasAsignadas || mostrarResultado}
            className="btn-primary disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {mostrarResultado ? 'Verificando...' : 'Verificar respuesta'}
          </button>
        </div>
      </div>
    </div>
  )
}
