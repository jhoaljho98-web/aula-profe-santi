import QuizEscritura from './QuizEscritura.jsx'
import { hablarEs } from '../lib/hablar'

const PALABRAS_EMOJI = [
  { palabra: 'perro',     emoji: '🐶' },
  { palabra: 'gato',      emoji: '🐱' },
  { palabra: 'manzana',   emoji: '🍎' },
  { palabra: 'plátano',   emoji: '🍌', respuestas: ['plátano', 'platano', 'banano'] },
  { palabra: 'flor',      emoji: '🌸' },
  { palabra: 'árbol',     emoji: '🌳', respuestas: ['árbol', 'arbol'] },
  { palabra: 'sol',       emoji: '☀️' },
  { palabra: 'luna',      emoji: '🌙' },
  { palabra: 'casa',      emoji: '🏠' },
  { palabra: 'libro',     emoji: '📚' },
  { palabra: 'carro',     emoji: '🚗', respuestas: ['carro', 'auto'] },
  { palabra: 'avión',     emoji: '✈️', respuestas: ['avión', 'avion'] },
  { palabra: 'barco',     emoji: '⛵', respuestas: ['barco', 'velero'] },
  { palabra: 'pescado',   emoji: '🐟' },
  { palabra: 'oso',       emoji: '🐻' },
  { palabra: 'león',      emoji: '🦁', respuestas: ['león', 'leon'] },
  { palabra: 'elefante',  emoji: '🐘' },
  { palabra: 'jirafa',    emoji: '🦒' },
  { palabra: 'gallina',   emoji: '🐔' },
  { palabra: 'vaca',      emoji: '🐄' },
  { palabra: 'caballo',   emoji: '🐎' },
  { palabra: 'mariposa',  emoji: '🦋' },
  { palabra: 'pizza',     emoji: '🍕' },
  { palabra: 'helado',    emoji: '🍦' },
  { palabra: 'huevo',     emoji: '🥚' },
  { palabra: 'pan',       emoji: '🍞' },
  { palabra: 'queso',     emoji: '🧀' },
  { palabra: 'globo',     emoji: '🎈' },
  { palabra: 'estrella',  emoji: '⭐' },
  { palabra: 'corazón',   emoji: '❤️', respuestas: ['corazón', 'corazon'] },
  { palabra: 'reloj',     emoji: '⏰' },
  { palabra: 'zapato',    emoji: '👟' },
  { palabra: 'llave',     emoji: '🔑' },
  { palabra: 'lápiz',     emoji: '✏️', respuestas: ['lápiz', 'lapiz'] },
  { palabra: 'regalo',    emoji: '🎁' },
  { palabra: 'lluvia',    emoji: '🌧️' },
  { palabra: 'nieve',     emoji: '❄️' },
  { palabra: 'árcoiris',  emoji: '🌈', respuestas: ['arcoíris', 'arcoiris', 'árcoiris', 'arco iris'] },
  { palabra: 'guitarra',  emoji: '🎸' },
  { palabra: 'balón',     emoji: '⚽', respuestas: ['balón', 'balon', 'pelota'] },
]

// Palabras solo para dictado (sin emoji claro)
const PALABRAS_DICTADO = [
  'escuela', 'profesor', 'niño', 'niña', 'familia', 'amigo', 'ventana', 'puerta',
  'silla', 'montaña', 'río', 'bosque', 'nube', 'jardín', 'playa', 'camino',
  'verde', 'rojo', 'azul', 'amarillo', 'rápido', 'lento', 'grande', 'pequeño',
  'feliz', 'triste', 'bonito', 'nuevo',
]

// Frases cortas para dictado
const FRASES = [
  'El perro juega en el jardín',
  'Mi mamá me lee un cuento',
  'La luna brilla en la noche',
  'Los niños van a la escuela',
  'El sol calienta la mañana',
  'La flor huele muy bonito',
  'Mi abuela hace pan rico',
  'El caballo corre rápido',
  'La mariposa vuela alto',
  'Amo a mi familia',
]

// Completar palabra: dado emoji + palabra con huecos, escribir la palabra completa
function generarCompletar() {
  return PALABRAS_EMOJI.slice(0, 15).map((p) => {
    const arr = p.palabra.split('')
    // Ocultar 1-2 letras
    const nOcultar = Math.min(2, Math.max(1, Math.floor(arr.length / 4)))
    const posiciones = new Set()
    while (posiciones.size < nOcultar) {
      posiciones.add(Math.floor(Math.random() * arr.length))
    }
    const oculto = arr.map((c, idx) => posiciones.has(idx) ? '_' : c).join('')
    return {
      enunciado: `✍️ Completa la palabra correctamente`,
      pregunta: (
        <div className="flex flex-col items-center gap-3">
          <span className="text-7xl">{p.emoji}</span>
          <span className="font-display font-bold text-4xl tracking-wider">{oculto.toUpperCase()}</span>
        </div>
      ),
      respuestas: p.respuestas ?? [p.palabra],
      respuesta: p.palabra,
      placeholder: `Escribe: ${p.palabra.length} letras`,
    }
  })
}

function generarBanco() {
  const banco = []

  // Modo 1: 🖼️ Emoji → escribe la palabra
  for (const p of PALABRAS_EMOJI) {
    banco.push({
      enunciado: '🖼️ Mira la imagen y escribe qué es',
      pregunta: <span className="text-8xl">{p.emoji}</span>,
      respuestas: p.respuestas ?? [p.palabra],
      respuesta: p.palabra,
      placeholder: 'Escribe la palabra…',
    })
  }

  // Modo 2: 🎧 Dictado de palabra (audio en español)
  const palabrasDictado = [
    ...PALABRAS_EMOJI.map((p) => ({ palabra: p.palabra, respuestas: p.respuestas })),
    ...PALABRAS_DICTADO.map((p) => ({ palabra: p })),
  ]
  for (const p of palabrasDictado) {
    banco.push({
      enunciado: '🎧 Escucha la palabra y escríbela correctamente',
      pregunta: <BotonDictar texto={p.palabra} />,
      respuestas: p.respuestas ?? [p.palabra],
      respuesta: p.palabra,
      placeholder: 'Escucha y escribe…',
    })
  }

  // Modo 3: 📝 Dictado de frase corta
  for (const frase of FRASES) {
    banco.push({
      enunciado: '📝 Escucha la oración completa y escríbela con las mayúsculas correctas',
      pregunta: <BotonDictar texto={frase} lento />,
      respuesta: frase,
      placeholder: 'Escribe la oración…',
    })
  }

  // Modo 4: 🧩 Completar palabras
  banco.push(...generarCompletar())

  return banco
}

function BotonDictar({ texto, lento }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <button
        onClick={(e) => {
          e.stopPropagation()
          hablarEs(texto)
        }}
        className="text-5xl bg-red-500 hover:bg-red-600 text-white rounded-full w-28 h-28 flex items-center justify-center shadow-xl transition-transform active:scale-95"
        title="Toca para escuchar de nuevo"
      >
        🔊
      </button>
      <span className="text-xs text-gray-500 italic">Toca para volver a escuchar</span>
    </div>
  )
}

export default function EscrituraCastellano({ onExit }) {
  const preguntas = generarBanco().sort(() => Math.random() - 0.5).slice(0, 15)
  return (
    <QuizEscritura
      juegoId="escritura-castellano"
      juegoNombre="Escribo lo que veo y escucho"
      materia="castellano"
      preguntas={preguntas}
      onExit={onExit}
    />
  )
}
