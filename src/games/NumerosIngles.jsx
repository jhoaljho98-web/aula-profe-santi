import QuizGenerico from './QuizGenerico.jsx'
import { hablarEn } from '../lib/hablar'

const NUMEROS = [
  { num: 1, en: 'one', emoji: '⭐' },
  { num: 2, en: 'two', emoji: '🍎' },
  { num: 3, en: 'three', emoji: '🐶' },
  { num: 4, en: 'four', emoji: '🌸' },
  { num: 5, en: 'five', emoji: '🎈' },
  { num: 6, en: 'six', emoji: '🚗' },
  { num: 7, en: 'seven', emoji: '🎁' },
  { num: 8, en: 'eight', emoji: '🍩' },
  { num: 9, en: 'nine', emoji: '⚽' },
  { num: 10, en: 'ten', emoji: '🐟' },
]

function otrosEn(n, k = 3) {
  return NUMEROS.filter((x) => x.en !== n.en).sort(() => Math.random() - 0.5).slice(0, k)
}
function otrosNum(n, k = 3) {
  return NUMEROS.filter((x) => x.num !== n.num).sort(() => Math.random() - 0.5).slice(0, k)
}

function BotonAudio({ palabra }) {
  return (
    <button
      onClick={(e) => { e.stopPropagation(); hablarEn(palabra) }}
      className="text-5xl bg-red-500 hover:bg-red-600 text-white rounded-full w-28 h-28 flex items-center justify-center shadow-xl mx-auto transition-transform active:scale-95"
      title="Escuchar"
    >
      🔊
    </button>
  )
}

function generarBanco() {
  const banco = []

  // 🧮 Modo 1: Cuenta los objetos → elige la palabra en inglés
  for (const n of NUMEROS) {
    const ops = [n, ...otrosEn(n)].sort(() => Math.random() - 0.5)
    const grid = (
      <div className="flex flex-wrap justify-center gap-1 text-4xl md:text-5xl px-4 max-w-md mx-auto">
        {Array.from({ length: n.num }).map((_, i) => <span key={i}>{n.emoji}</span>)}
      </div>
    )
    banco.push({
      enunciado: '🧮 Cuenta y elige el número en inglés',
      pregunta: grid,
      opciones: ops.map((o) => o.en),
      correcta: ops.findIndex((o) => o.en === n.en),
    })
  }

  // 🔤 Modo 2: Palabra en inglés → dígito
  for (const n of NUMEROS) {
    const ops = [n, ...otrosNum(n)].sort(() => Math.random() - 0.5)
    banco.push({
      enunciado: '🔤 Elige el número que corresponde a esta palabra',
      pregunta: <span className="uppercase tracking-widest">{n.en}</span>,
      opciones: ops.map((o) => String(o.num)),
      correcta: ops.findIndex((o) => o.num === n.num),
    })
  }

  // 🔊 Modo 3: Audio → dígito
  for (const n of NUMEROS) {
    const ops = [n, ...otrosNum(n)].sort(() => Math.random() - 0.5)
    banco.push({
      enunciado: '🔊 Toca el botón, escucha y elige el número',
      pregunta: <BotonAudio palabra={n.en} />,
      opciones: ops.map((o) => String(o.num)),
      correcta: ops.findIndex((o) => o.num === n.num),
    })
  }

  // 🔢 Modo 4: Secuencia — llena el hueco
  for (const n of NUMEROS.slice(1, 9)) {
    const ops = [n, ...otrosEn(n)].sort(() => Math.random() - 0.5)
    const secuencia = (
      <div className="flex items-center justify-center gap-3 text-4xl md:text-5xl">
        <span className="text-gray-600">{n.num - 1}</span>
        <span className="text-institucional-verde font-black text-6xl md:text-7xl">?</span>
        <span className="text-gray-600">{n.num + 1}</span>
      </div>
    )
    banco.push({
      enunciado: '🔢 ¿Qué número va en el medio? (Responde en inglés)',
      pregunta: secuencia,
      opciones: ops.map((o) => o.en),
      correcta: ops.findIndex((o) => o.en === n.en),
    })
  }

  // ➕ Modo 5: Mini-sumas con respuesta en inglés
  for (let i = 0; i < 8; i++) {
    const a = Math.floor(Math.random() * 5) + 1
    const b = Math.floor(Math.random() * (10 - a)) + 1
    const resultado = NUMEROS.find((x) => x.num === a + b)
    if (!resultado) continue
    const ops = [resultado, ...otrosEn(resultado)].sort(() => Math.random() - 0.5)
    banco.push({
      enunciado: '➕ Suma y elige el resultado en inglés',
      pregunta: <span className="font-black">{a} + {b} = ?</span>,
      opciones: ops.map((o) => o.en),
      correcta: ops.findIndex((o) => o.en === resultado.en),
    })
  }

  return banco
}

export default function NumerosIngles({ onExit }) {
  const preguntas = generarBanco().sort(() => Math.random() - 0.5).slice(0, 15)
  return (
    <QuizGenerico
      juegoId="numeros-ingles"
      juegoNombre="Los números en inglés"
      materia="ingles"
      preguntas={preguntas}
      onExit={onExit}
    />
  )
}
