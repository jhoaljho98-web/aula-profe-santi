import QuizGenerico from './QuizGenerico.jsx'

const SISTEMAS = ['Digestivo', 'Circulatorio', 'Óseo', 'Muscular', 'Nervioso']

const BANCO = [
  { enunciado: '¿Qué sistema se encarga de digerir los alimentos?', pregunta: '🍎', opciones: SISTEMAS, correcta: 0 },
  { enunciado: '¿Qué sistema transporta la sangre por el cuerpo?', pregunta: '❤️', opciones: SISTEMAS, correcta: 1 },
  { enunciado: '¿Qué sistema da forma y sostiene el cuerpo?', pregunta: '🦴', opciones: SISTEMAS, correcta: 2 },
  { enunciado: '¿Qué sistema nos permite movernos y tener fuerza?', pregunta: '💪', opciones: SISTEMAS, correcta: 3 },
  { enunciado: '¿Qué sistema controla lo que sentimos y pensamos?', pregunta: '🧠', opciones: SISTEMAS, correcta: 4 },
  { enunciado: 'El corazón es el órgano principal del sistema...', pregunta: '❤️', opciones: SISTEMAS, correcta: 1 },
  { enunciado: 'El cerebro es el órgano principal del sistema...', pregunta: '🧠', opciones: SISTEMAS, correcta: 4 },
  { enunciado: 'El estómago pertenece al sistema...', pregunta: 'Estómago', opciones: SISTEMAS, correcta: 0 },
  { enunciado: 'Los huesos forman parte del sistema...', pregunta: 'Huesos', opciones: SISTEMAS, correcta: 2 },
  { enunciado: '¿Qué sistema nos ayuda a caminar y correr?', pregunta: 'Correr 🏃', opciones: SISTEMAS, correcta: 3 },
  { enunciado: '¿Qué sistema lleva los nutrientes a todo el cuerpo?', pregunta: 'Nutrientes', opciones: SISTEMAS, correcta: 1 },
  { enunciado: 'El intestino pertenece al sistema...', pregunta: 'Intestino', opciones: SISTEMAS, correcta: 0 },
  { enunciado: 'Los músculos forman parte del sistema...', pregunta: 'Músculos', opciones: SISTEMAS, correcta: 3 },
  { enunciado: 'La médula espinal pertenece al sistema...', pregunta: 'Médula espinal', opciones: SISTEMAS, correcta: 4 },
  { enunciado: 'El cráneo pertenece al sistema...', pregunta: 'Cráneo', opciones: SISTEMAS, correcta: 2 },
]

export default function SistemasCuerpo({ onExit }) {
  const preguntas = [...BANCO].sort(() => Math.random() - 0.5).slice(0, 12)
  return (
    <QuizGenerico
      juegoId="sistemas-cuerpo"
      juegoNombre="Sistemas del cuerpo"
      materia="naturales"
      preguntas={preguntas}
      onExit={onExit}
    />
  )
}
