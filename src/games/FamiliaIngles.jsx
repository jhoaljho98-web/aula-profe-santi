import { useState } from 'react'
import QuizGenerico from './QuizGenerico.jsx'
import { hablarEn } from '../lib/hablar'
import PalabraAudio from '../components/PalabraAudio.jsx'
import TarjetasAprendizaje from '../components/TarjetasAprendizaje.jsx'

const FAMILIA = [
  { es: 'Padre / Papá',    en: 'Father',       emoji: '👨' },
  { es: 'Madre / Mamá',    en: 'Mother',       emoji: '👩' },
  { es: 'Hermano',         en: 'Brother',      emoji: '👦' },
  { es: 'Hermana',         en: 'Sister',       emoji: '👧' },
  { es: 'Abuelo',          en: 'Grandfather',  emoji: '👴' },
  { es: 'Abuela',          en: 'Grandmother',  emoji: '👵' },
  { es: 'Tío',             en: 'Uncle',        emoji: '🧔' },
  { es: 'Tía',             en: 'Aunt',         emoji: '💁‍♀️' },
  { es: 'Primo',           en: 'Cousin',       emoji: '🧒' },
  { es: 'Prima',           en: 'Cousin',       emoji: '👧' },
  { es: 'Hijo',            en: 'Son',          emoji: '👶' },
  { es: 'Hija',            en: 'Daughter',     emoji: '👶🎀' },
  { es: 'Esposo / Marido', en: 'Husband',      emoji: '🤵' },
  { es: 'Esposa',          en: 'Wife',         emoji: '👰' },
  { es: 'Bebé',            en: 'Baby',         emoji: '👶' },
  { es: 'Familia',         en: 'Family',       emoji: '👨‍👩‍👧‍👦' },
]

const TARJETAS = FAMILIA.map((f) => ({
  visual: <div className="text-8xl">{f.emoji}</div>,
  en: f.en.toUpperCase(),
  es: f.es,
  audio: f.en,
}))

function BotonAudio({ palabra }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <button
        onClick={(e) => { e.stopPropagation(); hablarEn(palabra) }}
        className="text-4xl bg-red-500 hover:bg-red-600 text-white rounded-full w-24 h-24 flex items-center justify-center shadow-xl transition-transform active:scale-95"
        title="Tocar para volver a escuchar"
      >
        🔊
      </button>
      <span className="font-display font-bold text-3xl uppercase tracking-widest text-institucional-verdeOscuro">{palabra}</span>
    </div>
  )
}

function otros(f, campo = 'en', k = 3) {
  return FAMILIA.filter((x) => x[campo] !== f[campo]).sort(() => Math.random() - 0.5).slice(0, k)
}

function generarBanco() {
  const banco = []

  for (const f of FAMILIA) {
    const ops = [f, ...otros(f)].sort(() => Math.random() - 0.5)
    banco.push({
      enunciado: '🎭 Elige la palabra en inglés que representa a esta persona',
      pregunta: <span className="text-7xl md:text-8xl">{f.emoji}</span>,
      opciones: ops.map((o) => <PalabraAudio texto={o.en} />),
      correcta: ops.findIndex((o) => o.en === f.en),
    })
  }

  for (const f of FAMILIA) {
    const ops = [f, ...otros(f, 'es')].sort(() => Math.random() - 0.5)
    banco.push({
      enunciado: '🔤 ¿Qué significa esta palabra en español?',
      pregunta: <PalabraAudio texto={f.en} size="lg" />,
      opciones: ops.map((o) => o.es),
      correcta: ops.findIndex((o) => o.es === f.es),
    })
  }

  for (const f of FAMILIA) {
    const ops = [f, ...otros(f)].sort(() => Math.random() - 0.5)
    banco.push({
      enunciado: '🔊 Escucha y elige el familiar correcto',
      pregunta: <BotonAudio palabra={f.en} />,
      opciones: ops.map((o) => (
        <span key={o.en} className="flex flex-col items-center gap-1">
          <span className="text-3xl">{o.emoji}</span>
          <span className="text-sm">{o.es}</span>
        </span>
      )),
      correcta: ops.findIndex((o) => o.en === f.en),
    })
  }

  const relaciones = [
    { enunciado: 'El padre de mi padre es mi...', pregunta: '👴', opciones: ['Grandfather', 'Uncle', 'Cousin', 'Brother'], correcta: 0 },
    { enunciado: 'La madre de mi madre es mi...', pregunta: '👵', opciones: ['Grandmother', 'Aunt', 'Sister', 'Daughter'], correcta: 0 },
    { enunciado: 'La hermana de mi mamá es mi...', pregunta: '💁‍♀️', opciones: ['Aunt', 'Grandmother', 'Sister', 'Wife'], correcta: 0 },
    { enunciado: 'El hermano de mi papá es mi...', pregunta: '🧔', opciones: ['Uncle', 'Grandfather', 'Brother', 'Husband'], correcta: 0 },
    { enunciado: 'El hijo de mi tío es mi...', pregunta: '🧒', opciones: ['Cousin', 'Brother', 'Uncle', 'Father'], correcta: 0 },
    { enunciado: 'La hija de mis papás (y hermana mía) es mi...', pregunta: '👧', opciones: ['Sister', 'Cousin', 'Aunt', 'Mother'], correcta: 0 },
    { enunciado: 'La esposa de mi papá es mi...', pregunta: '👩', opciones: ['Mother', 'Sister', 'Aunt', 'Grandmother'], correcta: 0 },
    { enunciado: 'Un grupo de familiares se llama en inglés:', pregunta: '👨‍👩‍👧‍👦', opciones: ['Family', 'Team', 'School', 'City'], correcta: 0 },
    { enunciado: 'My father and my mother are my...', pregunta: '¿En inglés?', opciones: ['Parents', 'Cousins', 'Brothers', 'Grandparents'], correcta: 0 },
  ]
  banco.push(...relaciones.map((p) => ({
    ...p,
    pregunta: typeof p.pregunta === 'string' && p.pregunta.length <= 3
      ? <span className="text-6xl">{p.pregunta}</span>
      : <span>{p.pregunta}</span>,
    opciones: p.opciones.map((op) => <PalabraAudio texto={op} />),
  })))

  return banco
}

export default function FamiliaIngles({ onExit }) {
  const [enJuego, setEnJuego] = useState(false)
  const [preguntas] = useState(() => generarBanco().sort(() => Math.random() - 0.5).slice(0, 15))

  if (!enJuego) {
    return (
      <TarjetasAprendizaje
        titulo="La familia en inglés"
        subtitulo="Aprende los miembros de tu familia. Toca 🔊 para escuchar."
        tarjetas={TARJETAS}
        onListo={() => setEnJuego(true)}
        onExit={onExit}
      />
    )
  }

  return (
    <QuizGenerico
      juegoId="familia-ingles"
      juegoNombre="La familia en inglés"
      materia="ingles"
      preguntas={preguntas}
      onExit={onExit}
    />
  )
}
