import { useState } from 'react'
import ResultadoPuntos from '../components/ResultadoPuntos.jsx'
import { sonarCorrecto, sonarIncorrecto } from '../lib/sonidos'

const TOTAL_PREGUNTAS = 12

// ------------- Convertir número 0-1000 a letras -------------
const UNIDADES = ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve']
const DIEZ_A_19 = ['diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve']
const DECENAS = ['', '', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa']
const CENTENAS = ['', '', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos']
const VEINTI = ['veinte', 'veintiuno', 'veintidós', 'veintitrés', 'veinticuatro', 'veinticinco', 'veintiséis', 'veintisiete', 'veintiocho', 'veintinueve']

function numeroALetras(n) {
  if (n === 0) return 'cero'
  if (n === 1000) return 'mil'

  const cent = Math.floor(n / 100)
  const resto = n % 100

  const partes = []

  if (cent > 0) {
    if (cent === 1 && resto === 0) partes.push('cien')
    else if (cent === 1) partes.push('ciento')
    else partes.push(CENTENAS[cent])
  }

  if (resto === 0) {
    // nada
  } else if (resto < 10) {
    partes.push(UNIDADES[resto])
  } else if (resto < 20) {
    partes.push(DIEZ_A_19[resto - 10])
  } else if (resto < 30) {
    partes.push(VEINTI[resto - 20])
  } else {
    const dec = Math.floor(resto / 10)
    const uni = resto % 10
    if (uni === 0) partes.push(DECENAS[dec])
    else partes.push(DECENAS[dec] + ' y ' + UNIDADES[uni])
  }

  return partes.join(' ')
}

function randRango(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function generar() {
  const tipo = ['mayor', 'menor', 'siguiente', 'anterior', 'letras-cifras', 'cifras-letras', 'ordenar-asc', 'ordenar-desc'][Math.floor(Math.random() * 8)]
  const rango = Math.random() < 0.5 ? [1, 100] : [100, 1000]

  if (tipo === 'mayor' || tipo === 'menor') {
    const a = randRango(...rango)
    let b = randRango(...rango)
    while (b === a) b = randRango(...rango)
    return {
      tipo,
      pregunta: `¿Cuál número es ${tipo === 'mayor' ? 'MAYOR' : 'MENOR'}?`,
      opciones: [a, b].sort(() => Math.random() - 0.5),
      correcta: tipo === 'mayor' ? Math.max(a, b) : Math.min(a, b),
      modo: 'seleccion',
    }
  }

  if (tipo === 'siguiente' || tipo === 'anterior') {
    const n = randRango(2, 999)
    const correcta = tipo === 'siguiente' ? n + 1 : n - 1
    const dis = new Set()
    while (dis.size < 3) {
      const delta = [-1, 1, -2, 2, -10, 10, -5, 5][Math.floor(Math.random() * 8)]
      const val = correcta + delta
      if (val !== correcta && val >= 0 && val <= 1000) dis.add(val)
    }
    return {
      tipo,
      pregunta: `¿Cuál es el ${tipo.toUpperCase()} de ${n}?`,
      opciones: [correcta, ...dis].sort(() => Math.random() - 0.5),
      correcta,
      modo: 'seleccion',
    }
  }

  if (tipo === 'letras-cifras') {
    const n = randRango(1, 999)
    const dis = new Set()
    while (dis.size < 3) {
      const delta = [1, -1, 10, -10, 100, -100][Math.floor(Math.random() * 6)]
      const val = n + delta
      if (val !== n && val > 0 && val <= 1000) dis.add(val)
    }
    return {
      tipo,
      pregunta: `¿Qué número es "${numeroALetras(n)}"?`,
      opciones: [n, ...dis].sort(() => Math.random() - 0.5),
      correcta: n,
      modo: 'seleccion',
    }
  }

  if (tipo === 'cifras-letras') {
    const n = randRango(1, 999)
    const dis = new Set()
    while (dis.size < 3) {
      const delta = [1, -1, 10, -10, 100, -100][Math.floor(Math.random() * 6)]
      const val = n + delta
      if (val !== n && val > 0 && val <= 1000) dis.add(val)
    }
    return {
      tipo,
      pregunta: `¿Cómo se lee el número ${n}?`,
      opciones: [numeroALetras(n), ...Array.from(dis).map(numeroALetras)].sort(() => Math.random() - 0.5),
      correcta: numeroALetras(n),
      modo: 'seleccion-texto',
    }
  }

  // ordenar-asc / ordenar-desc
  const cantidad = 5
  const nums = new Set()
  while (nums.size < cantidad) nums.add(randRango(1, 1000))
  const arr = Array.from(nums)
  const ordenado = [...arr].sort((a, b) => tipo === 'ordenar-asc' ? a - b : b - a)
  return {
    tipo,
    pregunta: `Ordena de ${tipo === 'ordenar-asc' ? 'MENOR a MAYOR' : 'MAYOR a MENOR'}. Toca en el orden correcto.`,
    numeros: arr.sort(() => Math.random() - 0.5),
    orden_correcto: ordenado,
    modo: 'ordenar',
  }
}


export default function NumerosMagicos({ onExit }) {
  const [i, setI] = useState(0)
  const [preguntas] = useState(() => Array.from({ length: TOTAL_PREGUNTAS }, generar))
  const [aciertos, setAciertos] = useState(0)
  const [seleccion, setSeleccion] = useState(null)
  const [orden, setOrden] = useState([])
  const [terminado, setTerminado] = useState(false)
  const [feedbackOrden, setFeedbackOrden] = useState(null)

  const p = preguntas[i]

  function siguiente(ok) {
    setTimeout(() => {
      if (ok) { setAciertos((a) => a + 1); sonarCorrecto() } else sonarIncorrecto()
      if (i + 1 >= TOTAL_PREGUNTAS) setTerminado(true)
      else {
        setI((v) => v + 1)
        setSeleccion(null)
        setOrden([])
        setFeedbackOrden(null)
      }
    }, 900)
  }

  function responder(op) {
    if (seleccion !== null) return
    setSeleccion(op)
    siguiente(op === p.correcta)
  }

  function clickNumero(n) {
    if (feedbackOrden !== null) return
    if (orden.includes(n)) return
    const nuevo = [...orden, n]
    setOrden(nuevo)
    if (nuevo.length === p.numeros.length) {
      const ok = nuevo.every((v, idx) => v === p.orden_correcto[idx])
      setFeedbackOrden(ok)
      siguiente(ok)
    }
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
            juegoId="numeros-magicos"
            juegoNombre="Números mágicos"
            materia="matematicas"
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

      <div className="card py-8">
        <p className="text-xl md:text-2xl font-display font-bold text-institucional-verdeOscuro mb-8 text-center">
          {p.pregunta}
        </p>

        {p.modo === 'seleccion' && (
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
        )}

        {p.modo === 'seleccion-texto' && (
          <div className="grid gap-3 max-w-2xl mx-auto grid-cols-1 sm:grid-cols-2">
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
                  className={`py-4 px-3 text-lg font-semibold rounded-2xl shadow-soft transition-all ${color}`}
                >
                  {op}
                </button>
              )
            })}
          </div>
        )}

        {p.modo === 'ordenar' && (
          <>
            {/* Orden actual (arriba) */}
            <div className="min-h-[70px] flex items-center justify-center gap-2 flex-wrap mb-6 p-3 rounded-2xl bg-institucional-crema border-2 border-dashed border-gray-300">
              {orden.length === 0
                ? <span className="text-gray-500 italic">Aquí aparecerán los números en el orden que toques</span>
                : orden.map((n, idx) => (
                    <span key={idx} className={`px-4 py-2 rounded-xl text-xl font-bold ${
                      feedbackOrden === null
                        ? 'bg-institucional-amarillo text-gray-900'
                        : feedbackOrden ? 'bg-institucional-verde text-white' : 'bg-red-400 text-white'
                    }`}>
                      {idx + 1}. {n}
                    </span>
                  ))
              }
            </div>
            {/* Números disponibles */}
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 max-w-xl mx-auto">
              {p.numeros.map((n) => {
                const usado = orden.includes(n)
                return (
                  <button
                    key={n}
                    onClick={() => clickNumero(n)}
                    disabled={usado || feedbackOrden !== null}
                    className={`py-4 text-2xl font-bold rounded-2xl shadow-soft transition-all ${
                      usado
                        ? 'bg-gray-200 text-gray-400'
                        : 'bg-white text-institucional-verdeOscuro border-2 border-institucional-verde hover:bg-institucional-crema'
                    }`}
                  >
                    {n}
                  </button>
                )
              })}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
