import QuizGenerico from './QuizGenerico.jsx'

const PUNTOS = ['Norte', 'Sur', 'Este (Oriente)', 'Oeste (Occidente)']

const BANCO = [
  { enunciado: '¿Por dónde sale el sol?', pregunta: '🌅', opciones: PUNTOS, correcta: 2 },
  { enunciado: '¿Por dónde se oculta el sol?', pregunta: '🌇', opciones: PUNTOS, correcta: 3 },
  { enunciado: 'Si miras hacia donde sale el sol, ¿qué queda a tu espalda?', pregunta: '🧭', opciones: PUNTOS, correcta: 3 },
  { enunciado: 'Si miras al Norte, ¿qué queda a tu derecha?', pregunta: '🧭', opciones: PUNTOS, correcta: 2 },
  { enunciado: '¿En qué municipio queda nuestra institución educativa?', pregunta: '🏫', opciones: ['Marmato', 'Riosucio', 'Supía', 'Filadelfia'], correcta: 0 },
  { enunciado: '¿En qué departamento está Marmato?', pregunta: '🗺️', opciones: ['Caldas', 'Antioquia', 'Risaralda', 'Chocó'], correcta: 0 },
  { enunciado: '¿En qué país vivimos?', pregunta: '🇨🇴', opciones: ['Colombia', 'Ecuador', 'Venezuela', 'Panamá'], correcta: 0 },
  { enunciado: '¿Cuál es la capital de Colombia?', pregunta: '🏛️', opciones: ['Bogotá', 'Medellín', 'Cali', 'Barranquilla'], correcta: 0 },
  { enunciado: '¿Cuál es la capital de Caldas?', pregunta: '🏛️', opciones: ['Manizales', 'Pereira', 'Armenia', 'Cali'], correcta: 0 },
  { enunciado: '¿Cuántos puntos cardinales hay?', pregunta: '🧭', opciones: ['2', '3', '4', '5'], correcta: 2 },
  { enunciado: 'Marmato es famoso por sus minas de...', pregunta: '⛏️', opciones: ['Oro', 'Sal', 'Carbón', 'Esmeraldas'], correcta: 0 },
  { enunciado: 'Colombia tiene costa en el Mar Caribe y en el Océano...', pregunta: '🌊', opciones: ['Pacífico', 'Atlántico', 'Índico', 'Ártico'], correcta: 0 },
  { enunciado: 'El opuesto al Norte es...', pregunta: '⬆️⬇️', opciones: PUNTOS, correcta: 1 },
  { enunciado: 'El opuesto al Este es...', pregunta: '➡️⬅️', opciones: PUNTOS, correcta: 3 },
]

export default function Territorio({ onExit }) {
  const preguntas = [...BANCO].sort(() => Math.random() - 0.5).slice(0, 12)
  return (
    <QuizGenerico
      juegoId="territorio"
      juegoNombre="Territorio y ubicación"
      materia="sociales"
      preguntas={preguntas}
      onExit={onExit}
    />
  )
}
