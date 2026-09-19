import { useState } from 'react'
import QuizEscritura from './QuizEscritura.jsx'
import TarjetasAprendizaje from '../components/TarjetasAprendizaje.jsx'
import { hablarEs } from '../lib/hablar'

// Todas las combinaciones (sílabas trabadas) y palabras de ejemplo
const TRABADAS = [
  { combo: 'BR', ejemplos: ['brazo', 'cabra', 'sombra', 'cebra', 'libro', 'labio-no', 'bruja', 'abrigo'].filter(w => w.includes('br') && !w.includes('-no')), emoji: '💪' },
  { combo: 'BL', ejemplos: ['blanco', 'blusa', 'tabla', 'pueblo', 'roble', 'establo', 'mueble'], emoji: '⬜' },
  { combo: 'CR', ejemplos: ['cruz', 'crema', 'cricket-no', 'criatura', 'cráneo', 'escribir', 'crayón', 'micro'].filter(w => w.includes('cr') && !w.includes('-no')), emoji: '➕' },
  { combo: 'CL', ejemplos: ['clase', 'cloro', 'clavo', 'tecla', 'chicle', 'ancla', 'bicicleta'], emoji: '📚' },
  { combo: 'DR', ejemplos: ['dragón', 'padre', 'madre', 'cocodrilo', 'ladrón', 'cuadro', 'piedra'], emoji: '🐉' },
  { combo: 'FR', ejemplos: ['fresa', 'frío', 'frente', 'África', 'cofre', 'freno', 'fruta'], emoji: '🍓' },
  { combo: 'FL', ejemplos: ['flor', 'flauta', 'inflar', 'chiflar', 'flaco', 'flecha', 'reflejo'], emoji: '🌸' },
  { combo: 'GR', ejemplos: ['grande', 'grillo', 'gracia', 'granizo', 'tigre', 'peligro', 'gris'], emoji: '🐯' },
  { combo: 'GL', ejemplos: ['globo', 'iglesia', 'siglo', 'inglés', 'glotón', 'jungla', 'regla'], emoji: '🎈' },
  { combo: 'PR', ejemplos: ['prima', 'promesa', 'princesa', 'aprender', 'primero', 'sorpresa', 'preciso'], emoji: '👸' },
  { combo: 'PL', ejemplos: ['playa', 'plátano', 'pluma', 'planta', 'plato', 'templo', 'ejemplo'], emoji: '🏖️' },
  { combo: 'TR', ejemplos: ['tren', 'tres', 'trompo', 'tigre', 'triángulo', 'estrella', 'letra'], emoji: '🚆' },
]

// Emoji + palabra (para modo escribe lo que ves)
const PALABRAS_CON_EMOJI = [
  { palabra: 'brazo',    combo: 'BR', emoji: '💪' },
  { palabra: 'cebra',    combo: 'BR', emoji: '🦓' },
  { palabra: 'blanco',   combo: 'BL', emoji: '⬜' },
  { palabra: 'blusa',    combo: 'BL', emoji: '👚' },
  { palabra: 'cruz',     combo: 'CR', emoji: '✝️' },
  { palabra: 'clavo',    combo: 'CL', emoji: '🔩' },
  { palabra: 'clase',    combo: 'CL', emoji: '🏫' },
  { palabra: 'dragón',   combo: 'DR', respuestas: ['dragón', 'dragon'], emoji: '🐉' },
  { palabra: 'padre',    combo: 'DR', emoji: '👨' },
  { palabra: 'madre',    combo: 'DR', emoji: '👩' },
  { palabra: 'fresa',    combo: 'FR', emoji: '🍓' },
  { palabra: 'flor',     combo: 'FL', emoji: '🌸' },
  { palabra: 'flauta',   combo: 'FL', emoji: '🎶' },
  { palabra: 'tigre',    combo: 'GR', emoji: '🐯' },
  { palabra: 'grillo',   combo: 'GR', emoji: '🦗' },
  { palabra: 'globo',    combo: 'GL', emoji: '🎈' },
  { palabra: 'iglesia',  combo: 'GL', emoji: '⛪' },
  { palabra: 'princesa', combo: 'PR', emoji: '👸' },
  { palabra: 'príncipe', combo: 'PR', respuestas: ['príncipe', 'principe'], emoji: '🤴' },
  { palabra: 'playa',    combo: 'PL', emoji: '🏖️' },
  { palabra: 'plátano',  combo: 'PL', respuestas: ['plátano', 'platano', 'banano'], emoji: '🍌' },
  { palabra: 'pluma',    combo: 'PL', emoji: '🪶' },
  { palabra: 'tren',     combo: 'TR', emoji: '🚆' },
  { palabra: 'trompo',   combo: 'TR', emoji: '🌀' },
  { palabra: 'estrella', combo: 'TR', emoji: '⭐' },
  { palabra: 'plato',    combo: 'PL', emoji: '🍽️' },
]

// Tarjetas de aprendizaje: una por trabada con emoji + ejemplos
const TARJETAS = TRABADAS.map((t) => ({
  visual: (
    <div className="flex flex-col items-center gap-3">
      <span className="text-7xl">{t.emoji}</span>
      <span className="text-5xl font-black text-institucional-verdeOscuro">{t.combo}</span>
    </div>
  ),
  en: t.combo,
  es: `Ejemplos: ${t.ejemplos.slice(0, 3).join(', ')}`,
  audio: `${t.combo}. Ejemplos: ${t.ejemplos.slice(0, 3).join(', ')}`,
}))

function BotonDictar({ texto }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <button
        onClick={(e) => { e.stopPropagation(); hablarEs(texto) }}
        className="text-5xl bg-red-500 hover:bg-red-600 text-white rounded-full w-28 h-28 flex items-center justify-center shadow-xl transition-transform active:scale-95"
        title="Toca para escuchar de nuevo"
      >
        🔊
      </button>
      <span className="text-xs text-gray-500 italic">Toca para volver a escuchar</span>
    </div>
  )
}

function generarBanco() {
  const banco = []

  // Modo 1: 🖼️ Emoji → escribe la palabra con la trabada
  for (const p of PALABRAS_CON_EMOJI) {
    banco.push({
      enunciado: `🖼️ Escribe qué es. Cuida bien la combinación ${p.combo}`,
      pregunta: <span className="text-8xl">{p.emoji}</span>,
      respuestas: p.respuestas ?? [p.palabra],
      respuesta: p.palabra,
      placeholder: 'Escribe la palabra…',
    })
  }

  // Modo 2: 🧩 Completar la trabada faltante
  for (const p of PALABRAS_CON_EMOJI) {
    const w = p.palabra
    const idx = w.toLowerCase().indexOf(p.combo.toLowerCase())
    if (idx < 0) continue
    const antes = w.slice(0, idx)
    const despues = w.slice(idx + 2)
    const conHueco = (antes + '__' + despues).toUpperCase()
    banco.push({
      enunciado: `🧩 Completa la palabra con la combinación correcta`,
      pregunta: (
        <div className="flex flex-col items-center gap-3">
          <span className="text-6xl">{p.emoji}</span>
          <span className="font-display font-bold text-4xl tracking-widest">{conHueco}</span>
        </div>
      ),
      respuestas: [p.combo, p.combo.toLowerCase()],
      respuesta: p.combo,
      placeholder: 'Solo las 2 letras',
      maxCaracteres: 2,
    })
  }

  // Modo 3: 🎧 Dictado (audio) → escribe la palabra completa
  for (const p of PALABRAS_CON_EMOJI) {
    banco.push({
      enunciado: `🎧 Escucha y escribe la palabra. ¡Cuidado con la combinación de consonantes!`,
      pregunta: <BotonDictar texto={p.palabra} />,
      respuestas: p.respuestas ?? [p.palabra],
      respuesta: p.palabra,
      placeholder: 'Escribe lo que escuchas…',
    })
  }

  // Modo 4: 📚 ¿Qué combinación tiene esta palabra? (escribir la trabada)
  for (const p of PALABRAS_CON_EMOJI) {
    banco.push({
      enunciado: `📚 ¿Qué combinación de dos consonantes tiene esta palabra? Escríbela`,
      pregunta: <span className="text-institucional-verdeOscuro font-black text-4xl">{p.palabra.toUpperCase()}</span>,
      respuestas: [p.combo, p.combo.toLowerCase()],
      respuesta: p.combo,
      placeholder: 'Ej. BR, PL, TR…',
      maxCaracteres: 2,
    })
  }

  return banco
}

export default function CombinacionesConsonantes({ onExit }) {
  const [enJuego, setEnJuego] = useState(false)
  const [preguntas] = useState(() => generarBanco().sort(() => Math.random() - 0.5).slice(0, 18))

  if (!enJuego) {
    return (
      <TarjetasAprendizaje
        titulo="Las combinaciones de dos consonantes"
        subtitulo="Aprende primero cada combinación: BR, BL, CR, CL, DR, FR, FL, GR, GL, PR, PL, TR"
        tarjetas={TARJETAS}
        onListo={() => setEnJuego(true)}
        onExit={onExit}
        idioma="es-CO"
      />
    )
  }

  return (
    <QuizEscritura
      juegoId="combinaciones-consonantes"
      juegoNombre="Combinaciones de consonantes"
      materia="castellano"
      preguntas={preguntas}
      onExit={onExit}
    />
  )
}
