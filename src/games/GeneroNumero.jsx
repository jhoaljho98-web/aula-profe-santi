import QuizGenerico from './QuizGenerico.jsx'

const GEN = ['Masculino', 'Femenino']
const NUM = ['Singular', 'Plural']

const BANCO = [
  { enunciado: '¿Es masculino o femenino?', pregunta: 'perro', opciones: GEN, correcta: 0 },
  { enunciado: '¿Es masculino o femenino?', pregunta: 'casa', opciones: GEN, correcta: 1 },
  { enunciado: '¿Es masculino o femenino?', pregunta: 'sol', opciones: GEN, correcta: 0 },
  { enunciado: '¿Es masculino o femenino?', pregunta: 'luna', opciones: GEN, correcta: 1 },
  { enunciado: '¿Es masculino o femenino?', pregunta: 'libro', opciones: GEN, correcta: 0 },
  { enunciado: '¿Es masculino o femenino?', pregunta: 'mesa', opciones: GEN, correcta: 1 },
  { enunciado: '¿Es masculino o femenino?', pregunta: 'gato', opciones: GEN, correcta: 0 },
  { enunciado: '¿Es masculino o femenino?', pregunta: 'flor', opciones: GEN, correcta: 1 },
  { enunciado: '¿Es masculino o femenino?', pregunta: 'lápiz', opciones: GEN, correcta: 0 },
  { enunciado: '¿Es masculino o femenino?', pregunta: 'silla', opciones: GEN, correcta: 1 },
  { enunciado: '¿Es singular o plural?', pregunta: 'niños', opciones: NUM, correcta: 1 },
  { enunciado: '¿Es singular o plural?', pregunta: 'perro', opciones: NUM, correcta: 0 },
  { enunciado: '¿Es singular o plural?', pregunta: 'árboles', opciones: NUM, correcta: 1 },
  { enunciado: '¿Es singular o plural?', pregunta: 'mesa', opciones: NUM, correcta: 0 },
  { enunciado: '¿Es singular o plural?', pregunta: 'lápices', opciones: NUM, correcta: 1 },
  { enunciado: '¿Es singular o plural?', pregunta: 'sol', opciones: NUM, correcta: 0 },
  { enunciado: '¿Es singular o plural?', pregunta: 'flores', opciones: NUM, correcta: 1 },
  { enunciado: '¿Es singular o plural?', pregunta: 'gato', opciones: NUM, correcta: 0 },
]

export default function GeneroNumero({ onExit }) {
  const preguntas = [...BANCO].sort(() => Math.random() - 0.5).slice(0, 12)
  return (
    <QuizGenerico
      juegoId="genero-numero"
      juegoNombre="Género y número"
      materia="castellano"
      preguntas={preguntas}
      onExit={onExit}
    />
  )
}
