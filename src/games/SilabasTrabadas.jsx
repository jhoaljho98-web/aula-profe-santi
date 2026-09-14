import { useState } from 'react'
import ResultadoPuntos from '../components/ResultadoPuntos.jsx'

const PALABRAS_POR_TRABADA = {
  BL: ['blanco', 'blusa', 'bloque', 'pueblo', 'tabla'],
  BR: ['brazo', 'broma', 'cabra', 'sombra', 'abrir'],
  CL: ['clase', 'clavo', 'chicle', 'clima', 'claro'],
  CR: ['crema', 'cruz', 'crecer', 'escribir', 'cristal'],
  DR: ['dragón', 'drama', 'ladrón', 'madre', 'padre'],
  FL: ['flor', 'flauta', 'inflar', 'chiflar', 'flaco'],
  FR: ['fresa', 'frío', 'fruta', 'fresco', 'ofrecer'],
  GL: ['globo', 'gloria', 'iglesia', 'inglés', 'siglo'],
  GR: ['gris', 'grande', 'grito', 'alegre', 'sangre'],
  PL: ['plato', 'playa', 'plaza', 'planta', 'aplauso'],
  PR: ['primo', 'prisa', 'prado', 'aprender', 'primero'],
  TR: ['tren', 'trigo', 'trueno', 'triste', 'atrás'],
}

const TRABADAS = Object.keys(PALABRAS_POR_TRABADA)
const TOTAL_PREGUNTAS = 12

function contieneTrabada(palabra, trabada) {
  return palabra.toLowerCase().includes(trabada.toLowerCase())
}

function palabraSinTrabada(exceptoTrabada) {
  // Elige una palabra de otra trabada que NO tenga la trabada excluida
  const otras = TRABADAS.filter(t => t !== exceptoTrabada)
  for (let intento = 0; intento < 20; intento++) {
    const t = otras[Math.floor(Math.random() * otras.length)]
    const w = PALABRAS_POR_TRABADA[t][Math.floor(Math.random() * PALABRAS_POR_TRABADA[t].length)]
    // Aceptar si no contiene la trabada excluida (ni ninguna similar accidental)
    if (!contieneTrabada(w, exceptoTrabada)) return w
  }
  return 'casa'  // fallback
}

function generar() {
  const trabada = TRABADAS[Math.floor(Math.random() * TRABADAS.length)]
  const opciones_de_trabada = PALABRAS_POR_TRABADA[trabada]
  const correcta = opciones_de_trabada[Math.floor(Math.random() * opciones_de_trabada.length)]
  const distractores = []
  const usados = new Set([correcta])
  while (distractores.length < 3) {
    const d = palabraSinTrabada(trabada)
    if (!usados.has(d)) {
      distractores.push(d)
      usados.add(d)
    }
  }
  const opciones = [correcta, ...distractores].sort(() => Math.random() - 0.5)
  return { trabada, correcta, opciones }
}


export default function SilabasTrabadas({ onExit }) {
  const [i, setI] = useState(0)
  const [preguntas] = useState(() => Array.from({ length: TOTAL_PREGUNTAS }, generar))
  const [seleccion, setSeleccion] = useState(null)
  const [aciertos, setAciertos] = useState(0)
  const [terminado, setTerminado] = useState(false)

  const p = preguntas[i]

  function responder(op) {
    if (seleccion !== null) return
    setSeleccion(op)
    const ok = op === p.correcta
    setTimeout(() => {
      if (ok) setAciertos((a) => a + 1)
      if (i + 1 >= TOTAL_PREGUNTAS) setTerminado(true)
      else { setI(v => v + 1); setSeleccion(null) }
    }, 900)
  }

  // Función para resaltar la trabada en la palabra
  function resaltarPalabra(palabra, trabada) {
    const lower = palabra.toLowerCase()
    const idx = lower.indexOf(trabada.toLowerCase())
    if (idx === -1) return palabra
    return (
      <>
        {palabra.slice(0, idx)}
        <span className="text-institucional-verdeOscuro">{palabra.slice(idx, idx + trabada.length)}</span>
        {palabra.slice(idx + trabada.length)}
      </>
    )
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
        <div className="mb-6">
          <ResultadoPuntos
            juegoId="silabas-trabadas"
            juegoNombre="Sílabas trabadas"
            aciertos={aciertos}
            total={TOTAL_PREGUNTAS}
          />
        </div>
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

      <div className="card py-8 text-center">
        <p className="text-gray-500 text-sm mb-2">Lee las palabras y toca la que tiene la sílaba trabada:</p>
        <div className="mb-8 inline-block px-6 py-3 rounded-2xl bg-institucional-amarillo">
          <span className="text-5xl md:text-6xl font-display font-bold text-institucional-verdeOscuro">
            {p.trabada}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto">
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
                className={`py-4 text-2xl md:text-3xl font-bold rounded-2xl shadow-soft transition-all ${color}`}
              >
                {seleccion !== null && op === p.correcta ? resaltarPalabra(op, p.trabada) : op}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
