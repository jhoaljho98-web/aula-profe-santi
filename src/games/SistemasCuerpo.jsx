import QuizGenerico from './QuizGenerico.jsx'

const S = ['Digestivo', 'Circulatorio', 'Óseo', 'Muscular', 'Nervioso', 'Respiratorio']

const BANCO = [
  // Función principal
  { enunciado: '🍎 ¿Qué sistema se encarga de digerir los alimentos?', pregunta: 'Función principal', opciones: S, correcta: 0 },
  { enunciado: '❤️ ¿Qué sistema transporta la sangre por el cuerpo?', pregunta: 'Función principal', opciones: S, correcta: 1 },
  { enunciado: '🦴 ¿Qué sistema da forma y sostiene el cuerpo?', pregunta: 'Función principal', opciones: S, correcta: 2 },
  { enunciado: '💪 ¿Qué sistema nos permite movernos y tener fuerza?', pregunta: 'Función principal', opciones: S, correcta: 3 },
  { enunciado: '🧠 ¿Qué sistema controla lo que sentimos y pensamos?', pregunta: 'Función principal', opciones: S, correcta: 4 },
  { enunciado: '🫁 ¿Qué sistema nos permite respirar?', pregunta: 'Función principal', opciones: S, correcta: 5 },
  { enunciado: 'Los pulmones son los órganos principales del sistema...', pregunta: '🫁🫁', opciones: S, correcta: 5 },
  { enunciado: 'La tráquea es el tubo que lleva el aire y pertenece al sistema...', pregunta: 'Tráquea', opciones: S, correcta: 5 },
  { enunciado: '¿Qué sistema toma oxígeno y expulsa dióxido de carbono?', pregunta: '💨', opciones: S, correcta: 5 },
  { enunciado: 'La nariz es la entrada principal del sistema...', pregunta: '👃', opciones: S, correcta: 5 },
  { enunciado: 'El diafragma es un músculo que ayuda al sistema...', pregunta: '🫁💪', opciones: S, correcta: 5 },
  { enunciado: 'Para cuidar el sistema respiratorio hay que evitar...', pregunta: 'Cuidado', opciones: ['El humo del cigarrillo', 'Correr', 'Reír', 'Tomar agua'], correcta: 0 },

  // Órganos principales
  { enunciado: 'El corazón es el órgano principal del sistema...', pregunta: '❤️ Corazón', opciones: S, correcta: 1 },
  { enunciado: 'El cerebro es el órgano principal del sistema...', pregunta: '🧠 Cerebro', opciones: S, correcta: 4 },
  { enunciado: 'El estómago pertenece al sistema...', pregunta: '🌭 Estómago', opciones: S, correcta: 0 },
  { enunciado: 'El fémur (hueso del muslo) pertenece al sistema...', pregunta: '🦴 Fémur', opciones: S, correcta: 2 },
  { enunciado: 'El bíceps es un músculo del sistema...', pregunta: '💪 Bíceps', opciones: S, correcta: 3 },
  { enunciado: 'La médula espinal pertenece al sistema...', pregunta: 'Médula espinal', opciones: S, correcta: 4 },
  { enunciado: 'El intestino pertenece al sistema...', pregunta: 'Intestino', opciones: S, correcta: 0 },
  { enunciado: 'Las venas y arterias son parte del sistema...', pregunta: 'Venas y arterias', opciones: S, correcta: 1 },
  { enunciado: 'El cráneo protege el cerebro y es parte del sistema...', pregunta: '💀 Cráneo', opciones: S, correcta: 2 },
  { enunciado: 'Los nervios pertenecen al sistema...', pregunta: 'Nervios', opciones: S, correcta: 4 },

  // Relaciones e importancia
  { enunciado: 'Sin este sistema no podríamos respirar ni sentir nada:', pregunta: '¿Cuál es?', opciones: S, correcta: 4 },
  { enunciado: 'Este sistema protege órganos importantes como el corazón y el cerebro:', pregunta: '¿Cuál?', opciones: S, correcta: 2 },
  { enunciado: 'Este sistema convierte los alimentos en nutrientes:', pregunta: '¿Cuál?', opciones: S, correcta: 0 },
  { enunciado: 'Este sistema lleva oxígeno y nutrientes a todo el cuerpo:', pregunta: '¿Cuál?', opciones: S, correcta: 1 },
  { enunciado: 'Este sistema se une a los huesos para permitir el movimiento:', pregunta: '¿Cuál?', opciones: S, correcta: 3 },

  // Cuidado
  { enunciado: 'Para cuidar el sistema óseo debemos comer alimentos con...', pregunta: 'Cuidado del cuerpo', opciones: ['Calcio', 'Azúcar', 'Grasa', 'Sal'], correcta: 0 },
  { enunciado: 'Para cuidar el sistema muscular es importante...', pregunta: 'Cuidado del cuerpo', opciones: ['Ver televisión', 'Hacer ejercicio', 'Comer dulces', 'Dormir todo el día'], correcta: 1 },
  { enunciado: 'Para cuidar el sistema digestivo debemos...', pregunta: 'Cuidado del cuerpo', opciones: ['Comer frutas y verduras', 'Comer solo dulces', 'No tomar agua', 'Saltarse el desayuno'], correcta: 0 },
  { enunciado: 'Para cuidar el sistema nervioso es importante...', pregunta: 'Cuidado del cuerpo', opciones: ['No dormir', 'Dormir bien', 'Ver pantallas todo el día', 'Estar estresado'], correcta: 1 },

  // Números y datos curiosos
  { enunciado: '¿Cuántos huesos aproximadamente tiene el cuerpo humano adulto?', pregunta: 'Dato curioso', opciones: ['20', '100', '206', '500'], correcta: 2 },
  { enunciado: 'El corazón late aproximadamente cuántas veces por minuto en reposo:', pregunta: 'Dato curioso', opciones: ['20', '70', '150', '300'], correcta: 1 },

  // Comparaciones
  { enunciado: '¿Qué sistema es como el "cartero" del cuerpo que reparte la sangre?', pregunta: 'Comparación', opciones: S, correcta: 1 },
  { enunciado: '¿Qué sistema es como el "director" que da las órdenes?', pregunta: 'Comparación', opciones: S, correcta: 4 },
  { enunciado: '¿Qué sistema es como la "cocina" que procesa la comida?', pregunta: 'Comparación', opciones: S, correcta: 0 },
]

export default function SistemasCuerpo({ onExit }) {
  const preguntas = [...BANCO].sort(() => Math.random() - 0.5).slice(0, 15)
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
