import QuizGenerico from './QuizGenerico.jsx'

const GEN = ['Masculino', 'Femenino']
const NUM = ['Singular', 'Plural']
const ARTS = ['El', 'La']
const ARTSP = ['Los', 'Las']

// Ilustraciones tipo emoji para que sea más visual
const BANCO = [
  // GÉNERO
  { enunciado: '¿Es masculino o femenino? 🐶', pregunta: 'perro', opciones: GEN, correcta: 0 },
  { enunciado: '¿Es masculino o femenino? 🏠', pregunta: 'casa', opciones: GEN, correcta: 1 },
  { enunciado: '¿Es masculino o femenino? ☀️', pregunta: 'sol', opciones: GEN, correcta: 0 },
  { enunciado: '¿Es masculino o femenino? 🌙', pregunta: 'luna', opciones: GEN, correcta: 1 },
  { enunciado: '¿Es masculino o femenino? 📚', pregunta: 'libro', opciones: GEN, correcta: 0 },
  { enunciado: '¿Es masculino o femenino? 🌷', pregunta: 'flor', opciones: GEN, correcta: 1 },
  { enunciado: '¿Es masculino o femenino? ✏️', pregunta: 'lápiz', opciones: GEN, correcta: 0 },
  { enunciado: '¿Es masculino o femenino? 🐔', pregunta: 'gallina', opciones: GEN, correcta: 1 },

  // ARTÍCULOS EL/LA (singular)
  { enunciado: 'Elige el artículo correcto:', pregunta: '___ árbol 🌳', opciones: ARTS, correcta: 0 },
  { enunciado: 'Elige el artículo correcto:', pregunta: '___ mesa 🪑', opciones: ARTS, correcta: 1 },
  { enunciado: 'Elige el artículo correcto:', pregunta: '___ profesor 👨‍🏫', opciones: ARTS, correcta: 0 },
  { enunciado: 'Elige el artículo correcto:', pregunta: '___ estrella ⭐', opciones: ARTS, correcta: 1 },
  { enunciado: 'Elige el artículo correcto:', pregunta: '___ carro 🚗', opciones: ARTS, correcta: 0 },
  { enunciado: 'Elige el artículo correcto:', pregunta: '___ manzana 🍎', opciones: ARTS, correcta: 1 },

  // ARTÍCULOS LOS/LAS (plural)
  { enunciado: 'Elige el artículo correcto:', pregunta: '___ niños 👦👦', opciones: ARTSP, correcta: 0 },
  { enunciado: 'Elige el artículo correcto:', pregunta: '___ flores 🌷🌷', opciones: ARTSP, correcta: 1 },
  { enunciado: 'Elige el artículo correcto:', pregunta: '___ árboles 🌳🌳', opciones: ARTSP, correcta: 0 },
  { enunciado: 'Elige el artículo correcto:', pregunta: '___ mochilas 🎒🎒', opciones: ARTSP, correcta: 1 },

  // SINGULAR/PLURAL
  { enunciado: '¿Es singular o plural?', pregunta: 'niños', opciones: NUM, correcta: 1 },
  { enunciado: '¿Es singular o plural?', pregunta: 'silla', opciones: NUM, correcta: 0 },
  { enunciado: '¿Es singular o plural?', pregunta: 'árboles', opciones: NUM, correcta: 1 },
  { enunciado: '¿Es singular o plural?', pregunta: 'lápices', opciones: NUM, correcta: 1 },

  // FORMAR PLURAL (más difícil)
  { enunciado: '¿Cuál es el plural de "flor"?', pregunta: 'flor', opciones: ['flores', 'flors', 'floros'], correcta: 0 },
  { enunciado: '¿Cuál es el plural de "lápiz"?', pregunta: 'lápiz', opciones: ['lápizes', 'lápices', 'lápizs'], correcta: 1 },
  { enunciado: '¿Cuál es el plural de "casa"?', pregunta: 'casa', opciones: ['cases', 'casas', 'casis'], correcta: 1 },
  { enunciado: '¿Cuál es el plural de "pez"?', pregunta: 'pez', opciones: ['peces', 'pezes', 'peses'], correcta: 0 },
  { enunciado: '¿Cuál es el singular de "ratones"?', pregunta: 'ratones', opciones: ['ratón', 'rato', 'raton'], correcta: 0 },
  { enunciado: '¿Cuál es el singular de "papeles"?', pregunta: 'papeles', opciones: ['papel', 'papele', 'papela'], correcta: 0 },

  // CONCORDANCIA
  { enunciado: 'Elige la opción correcta:', pregunta: 'El niño está ___', opciones: ['contento', 'contenta', 'contentos'], correcta: 0 },
  { enunciado: 'Elige la opción correcta:', pregunta: 'Las flores son ___', opciones: ['bonito', 'bonita', 'bonitas'], correcta: 2 },
  { enunciado: 'Elige la opción correcta:', pregunta: 'Los perros están ___', opciones: ['dormido', 'dormidos', 'dormidas'], correcta: 1 },
]

export default function GeneroNumero({ onExit }) {
  const preguntas = [...BANCO].sort(() => Math.random() - 0.5).slice(0, 15)
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
