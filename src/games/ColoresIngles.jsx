import QuizGenerico from './QuizGenerico.jsx'
import { hablarEn } from '../lib/hablar'

const COLORES = [
  { es: 'Rojo',      en: 'Red',    hex: '#dc2626' },
  { es: 'Azul',      en: 'Blue',   hex: '#2563eb' },
  { es: 'Amarillo',  en: 'Yellow', hex: '#eab308' },
  { es: 'Verde',     en: 'Green',  hex: '#16a34a' },
  { es: 'Negro',     en: 'Black',  hex: '#111827' },
  { es: 'Blanco',    en: 'White',  hex: '#f9fafb' },
  { es: 'Rosa',      en: 'Pink',   hex: '#ec4899' },
  { es: 'Morado',    en: 'Purple', hex: '#9333ea' },
  { es: 'Naranja',   en: 'Orange', hex: '#f97316' },
  { es: 'Café',      en: 'Brown',  hex: '#78350f' },
  { es: 'Gris',      en: 'Gray',   hex: '#6b7280' },
]

function CuadroColor({ hex, size = 96 }) {
  return (
    <span
      className="inline-block rounded-2xl shadow-lg border-2 border-gray-300"
      style={{ backgroundColor: hex, width: size, height: size }}
    />
  )
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

function otros(c, k = 3) {
  return COLORES.filter((x) => x.en !== c.en).sort(() => Math.random() - 0.5).slice(0, k)
}

function generarBanco() {
  const banco = []
  // 🎨 Modo 1: color visual → palabra
  for (const c of COLORES) {
    const ops = [c, ...otros(c)].sort(() => Math.random() - 0.5)
    banco.push({
      enunciado: '🎨 Mira el color y elige la palabra en inglés',
      pregunta: <CuadroColor hex={c.hex} />,
      opciones: ops.map((o) => o.en),
      correcta: ops.findIndex((o) => o.en === c.en),
    })
  }
  // 🔤 Modo 2: palabra en inglés → color
  for (const c of COLORES) {
    const ops = [c, ...otros(c)].sort(() => Math.random() - 0.5)
    banco.push({
      enunciado: '🔤 Elige el color que corresponde a esta palabra',
      pregunta: <span className="uppercase tracking-widest">{c.en}</span>,
      opciones: ops.map((o) => <CuadroColor key={o.en} hex={o.hex} size={72} />),
      correcta: ops.findIndex((o) => o.en === c.en),
    })
  }
  // 🔊 Modo 3: escucha → color
  for (const c of COLORES) {
    const ops = [c, ...otros(c)].sort(() => Math.random() - 0.5)
    banco.push({
      enunciado: '🔊 Escucha la palabra y elige el color',
      pregunta: <BotonAudio palabra={c.en} />,
      opciones: ops.map((o) => <CuadroColor key={o.en} hex={o.hex} size={72} />),
      correcta: ops.findIndex((o) => o.en === c.en),
    })
  }
  return banco
}

export default function ColoresIngles({ onExit }) {
  const preguntas = generarBanco().sort(() => Math.random() - 0.5).slice(0, 15)
  return (
    <QuizGenerico
      juegoId="colores-ingles"
      juegoNombre="Los colores en inglés"
      materia="ingles"
      preguntas={preguntas}
      onExit={onExit}
    />
  )
}
