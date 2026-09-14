import { useState } from 'react'

const TOTAL_PREGUNTAS = 12

function generar() {
  const tipo = Math.floor(Math.random() * 4)  // 0: mayor, 1: menor, 2: siguiente, 3: anterior
  const rango = Math.random() < 0.5 ? 100 : 1000
  const a = Math.floor(Math.random() * rango) + 1
  const b = Math.floor(Math.random() * rango) + 1
  if (tipo === 0) return { tipo: 'mayor', a, b, correcta: Math.max(a, b), opciones: [a, b].sort(() => Math.random() - 0.5) }
  if (tipo === 1) return { tipo: 'menor', a, b, correcta: Math.min(a, b), opciones: [a, b].sort(() => Math.random() - 0.5) }
  if (tipo === 2) {
    const n = Math.floor(Math.random() * (rango - 1)) + 1
    const correcta = n + 1
    const distractores = new Set([n - 1, n + 2, n + 10])
    distractores.delete(correcta)
    const opciones = [correcta, ...Array.from(distractores).slice(0, 3)].sort(() => Math.random() - 0.5)
    return { tipo: 'siguiente', a: n, correcta, opciones }
  }
  // anterior
  const n = Math.floor(Math.random() * rango) + 2
  const correcta = n - 1
  const distractores = new Set([n + 1, n - 2, n - 10])
  distractores.delete(correcta)
  const opciones = [correcta, ...Array.from(distractores).slice(0, 3)].sort(() => Math.random() - 0.5)
  return { tipo: 'anterior', a: n, correcta, opciones }
}

function Enunciado({ p }) {
  if (p.tipo === 'mayor') return <>¿Cuál número es <span className="text-institucional-verde">MAYOR</span>?</>
  if (p.tipo === 'menor') return <>¿Cuál número es <span className="text-institucional-verde">MENOR</span>?</>
  if (p.tipo === 'siguiente') return <>¿Cuál es el <span className="text-institucional-verde">SIGUIENTE</span> de {p.a}?</>
  return <>¿Cuál es el <span className="text-institucional-verde">ANTERIOR</span> de {p.a}?</>
}

export default function NumerosMagicos({ onExit }) {
  const [i, setI] = useState(0)
  const [preguntas] = useState(() => Array.from({ length: TOTAL_PREGUNTAS }, generar))
  const [aciertos, setAciertos] = useState(0)
  const [seleccion, setSeleccion] = useState(null)
  const [terminado, setTerminado] = useState(false)

  const p = preguntas[i]

  function responder(op) {
    if (seleccion !== null) return
    setSeleccion(op)
    const ok = op === p.correcta
    setTimeout(() => {
      if (ok) setAciertos((a) => a + 1)
      if (i + 1 >= TOTAL_PREGUNTAS) setTerminado(true)
      else { setI((v) => v + 1); setSeleccion(null) }
    }, 700)
  }

  if (terminado) {
    const pct = Math.round((aciertos / TOTAL_PREGUNTAS) * 100)
    let emoji = '🎉'
    if (pct < 60) emoji = '💪'
    else if (pct === 100) emoji = '🏆'
    return (
      <div className="card text-center">
        <div className="text-7xl mb-4">{emoji}</div>
        <h2 className="font-display font-bold text-3xl text-institucional-verdeOscuro mb-4">
          {aciertos} de {TOTAL_PREGUNTAS} correctas
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
          {i + 1} de {TOTAL_PREGUNTAS} · Aciertos: {aciertos}
        </div>
      </div>

      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-institucional-verde transition-all" style={{ width: `${(i / TOTAL_PREGUNTAS) * 100}%` }} />
      </div>

      <div className="card text-center py-10">
        <div className="text-2xl md:text-3xl font-display font-bold text-institucional-verdeOscuro mb-8">
          <Enunciado p={p} />
        </div>
        <div className={`grid gap-3 max-w-lg mx-auto ${p.opciones.length === 2 ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-4'}`}>
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
