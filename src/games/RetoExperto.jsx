import QuizGenerico from './QuizGenerico.jsx'
import { numeroALetras, formatearCifras, aleatorio } from '../lib/numerosEs'
import { hablarEs } from '../lib/hablar'

const MIN = 1000
const MAX = 999999

function randNum(min = MIN, max = MAX) {
  return aleatorio(min, max)
}

function BotonEscuchar({ texto }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <button
        onClick={(e) => { e.stopPropagation(); hablarEs(texto) }}
        className="text-4xl bg-red-500 hover:bg-red-600 text-white rounded-full w-24 h-24 flex items-center justify-center shadow-xl transition-transform active:scale-95"
        title="Tocar para volver a escuchar"
      >
        🔊
      </button>
      <span className="text-xs text-gray-500 italic">Toca para escuchar</span>
    </div>
  )
}

function generarBanco() {
  const banco = []

  // 1. Mayor / menor
  for (let i = 0; i < 10; i++) {
    const a = randNum()
    let b = randNum(); while (b === a) b = randNum()
    const tipo = Math.random() < 0.5 ? 'MAYOR' : 'MENOR'
    const correcto = tipo === 'MAYOR' ? Math.max(a, b) : Math.min(a, b)
    const ops = [a, b].sort(() => Math.random() - 0.5)
    banco.push({
      enunciado: `⚖️ ¿Cuál número es ${tipo}?`,
      pregunta: <span className="text-institucional-verdeOscuro font-black text-3xl md:text-4xl">{formatearCifras(a)} · {formatearCifras(b)}</span>,
      opciones: ops.map(formatearCifras),
      correcta: ops.findIndex((v) => v === correcto),
    })
  }

  // 2. Comparar con <, > o =
  for (let i = 0; i < 8; i++) {
    const a = randNum()
    const forzarIgual = Math.random() < 0.15
    const b = forzarIgual ? a : (Math.random() < 0.5 ? a + aleatorio(-500, 500) : randNum())
    let simbolo = a < b ? '<' : a > b ? '>' : '='
    const ops = ['<', '>', '='].sort(() => Math.random() - 0.5)
    banco.push({
      enunciado: `🆚 ¿Qué símbolo va entre estos dos números?`,
      pregunta: <span className="text-institucional-verdeOscuro font-black text-3xl">{formatearCifras(a)} __ {formatearCifras(b)}</span>,
      opciones: ops,
      correcta: ops.findIndex((s) => s === simbolo),
    })
  }

  // 3. Siguiente / Anterior
  for (let i = 0; i < 8; i++) {
    const n = randNum(1001, MAX - 1)
    const tipo = Math.random() < 0.5 ? 'SIGUIENTE' : 'ANTERIOR'
    const correcto = tipo === 'SIGUIENTE' ? n + 1 : n - 1
    const dist = new Set([correcto])
    while (dist.size < 4) {
      const delta = [1, -1, 10, -10, 100, -100][aleatorio(0, 5)]
      const val = correcto + delta
      if (val > 0 && val < 1000000 && val !== correcto) dist.add(val)
    }
    const ops = Array.from(dist).sort(() => Math.random() - 0.5)
    banco.push({
      enunciado: `➡️ ¿Cuál es el ${tipo} de ${formatearCifras(n)}?`,
      pregunta: <span className="text-institucional-verdeOscuro font-black">{formatearCifras(n)}</span>,
      opciones: ops.map(formatearCifras),
      correcta: ops.findIndex((v) => v === correcto),
    })
  }

  // 4. Ordenar (elegir la lista bien ordenada)
  for (let i = 0; i < 6; i++) {
    const nums = new Set()
    while (nums.size < 4) nums.add(randNum())
    const arr = Array.from(nums)
    const asc = [...arr].sort((a, b) => a - b)
    const desc = [...arr].sort((a, b) => b - a)
    const tipo = Math.random() < 0.5 ? 'MENOR A MAYOR' : 'MAYOR A MENOR'
    const correcto = tipo === 'MENOR A MAYOR' ? asc : desc
    // Distractores: variaciones
    const bad1 = [...arr].sort(() => Math.random() - 0.5)
    const bad2 = tipo === 'MENOR A MAYOR' ? desc : asc
    const bad3 = [...arr].reverse()
    const listas = [correcto, bad1, bad2, bad3]
    const opStr = listas.map((l) => l.map(formatearCifras).join(' · '))
    const ops = opStr.slice().sort(() => Math.random() - 0.5)
    banco.push({
      enunciado: `🔢 Elige la lista bien ordenada de ${tipo}`,
      pregunta: <span className="text-lg">{opStr[0].length > 60 ? 'Compara con cuidado' : ''}</span>,
      opciones: ops,
      correcta: ops.findIndex((v) => v === opStr[0]),
    })
  }

  // 5. Cifras → letras
  for (let i = 0; i < 8; i++) {
    const n = randNum()
    const dist = new Set([numeroALetras(n)])
    while (dist.size < 4) {
      const delta = [1000, -1000, 10000, -10000, 100, -100][aleatorio(0, 5)]
      const val = n + delta
      if (val > 0 && val < 1000000) dist.add(numeroALetras(val))
    }
    const ops = Array.from(dist).sort(() => Math.random() - 0.5)
    banco.push({
      enunciado: `📖 ¿Cómo se lee el número?`,
      pregunta: <span className="text-institucional-verdeOscuro font-black text-4xl md:text-5xl">{formatearCifras(n)}</span>,
      opciones: ops,
      correcta: ops.findIndex((v) => v === numeroALetras(n)),
    })
  }

  // 6. Letras → cifras
  for (let i = 0; i < 8; i++) {
    const n = randNum()
    const dist = new Set([n])
    while (dist.size < 4) {
      const delta = [1000, -1000, 100, -100, 10000, -10000][aleatorio(0, 5)]
      const val = n + delta
      if (val > 0 && val < 1000000 && val !== n) dist.add(val)
    }
    const ops = Array.from(dist).sort(() => Math.random() - 0.5)
    banco.push({
      enunciado: `🔤 ¿Qué número es "${numeroALetras(n)}"?`,
      pregunta: <span className="text-gray-700 italic">{numeroALetras(n)}</span>,
      opciones: ops.map(formatearCifras),
      correcta: ops.findIndex((v) => v === n),
    })
  }

  // 7. Escuchar → elegir
  for (let i = 0; i < 6; i++) {
    const n = randNum()
    const dist = new Set([n])
    while (dist.size < 4) {
      const delta = [1000, -1000, 100, -100, 10000, -10000][aleatorio(0, 5)]
      const val = n + delta
      if (val > 0 && val < 1000000 && val !== n) dist.add(val)
    }
    const ops = Array.from(dist).sort(() => Math.random() - 0.5)
    banco.push({
      enunciado: `🎧 Escucha el número y elige la respuesta correcta`,
      pregunta: <BotonEscuchar texto={numeroALetras(n)} />,
      opciones: ops.map(formatearCifras),
      correcta: ops.findIndex((v) => v === n),
    })
  }

  // 8. Redondear a la unidad de mil más cercana
  for (let i = 0; i < 6; i++) {
    const n = randNum()
    const redondeado = Math.round(n / 1000) * 1000
    const dist = new Set([redondeado])
    while (dist.size < 4) {
      const delta = [1000, -1000, 2000, -2000, 500][aleatorio(0, 4)]
      const val = redondeado + delta
      if (val > 0 && val < 1000000) dist.add(val)
    }
    const ops = Array.from(dist).sort(() => Math.random() - 0.5)
    banco.push({
      enunciado: `🎯 ¿Cuál es el ${formatearCifras(n)} redondeado a la unidad de mil más cercana?`,
      pregunta: <span className="text-institucional-verdeOscuro font-black">{formatearCifras(n)}</span>,
      opciones: ops.map(formatearCifras),
      correcta: ops.findIndex((v) => v === redondeado),
    })
  }

  // 9. Sumas y restas simples con miles
  for (let i = 0; i < 6; i++) {
    const suma = Math.random() < 0.5
    let a = randNum(5000, 500000)
    let b = randNum(1000, a - 1)
    const res = suma ? a + b : a - b
    if (res > MAX || res < 0) continue
    const dist = new Set([res])
    while (dist.size < 4) {
      const delta = [1000, -1000, 100, -100, 10000, -10000][aleatorio(0, 5)]
      const val = res + delta
      if (val > 0 && val < 1000000 && val !== res) dist.add(val)
    }
    const ops = Array.from(dist).sort(() => Math.random() - 0.5)
    banco.push({
      enunciado: `🧮 Calcula:`,
      pregunta: <span className="text-institucional-verdeOscuro font-black text-3xl">{formatearCifras(a)} {suma ? '+' : '−'} {formatearCifras(b)}</span>,
      opciones: ops.map(formatearCifras),
      correcta: ops.findIndex((v) => v === res),
    })
  }

  return banco
}

export default function RetoExperto({ onExit }) {
  const preguntas = generarBanco().sort(() => Math.random() - 0.5).slice(0, 15)
  return (
    <QuizGenerico
      juegoId="reto-experto"
      juegoNombre="Reto nivel experto"
      materia="matematicas"
      preguntas={preguntas}
      onExit={onExit}
    />
  )
}
