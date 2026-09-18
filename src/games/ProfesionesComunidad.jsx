import QuizGenerico from './QuizGenerico.jsx'

// Profesiones con emoji y contexto local de Marmato
const PROFESIONES = [
  { nombre: 'Minero',       emoji: '⛏️',   lugar: 'La mina',        herramienta: 'Pica y linterna',       marmato: true  },
  { nombre: 'Barequero',    emoji: '🪙',   lugar: 'Quebradas o ríos',herramienta: 'Cajón y malla',         marmato: true  },
  { nombre: 'Agricultor',   emoji: '🌾',   lugar: 'El campo',        herramienta: 'Azadón',                marmato: true  },
  { nombre: 'Conductor',    emoji: '🚛',   lugar: 'En las calles',   herramienta: 'Volante',               marmato: true  },
  { nombre: 'Arriero',      emoji: '🐴',   lugar: 'Los caminos',     herramienta: 'Mulas y bultos',        marmato: true  },
  { nombre: 'Mototaxista',  emoji: '🛵',   lugar: 'En las calles',   herramienta: 'La moto',               marmato: true  },
  { nombre: 'Celador',      emoji: '👮',   lugar: 'La entrada',      herramienta: 'Radio y linterna',      marmato: true  },
  { nombre: 'Profesor',     emoji: '👨‍🏫', lugar: 'La escuela',      herramienta: 'Libros y marcadores',   marmato: false },
  { nombre: 'Médico',       emoji: '⚕️',   lugar: 'El hospital',     herramienta: 'Estetoscopio',          marmato: false },
  { nombre: 'Enfermero',    emoji: '💉',   lugar: 'El hospital',     herramienta: 'Jeringa y termómetro',  marmato: false },
  { nombre: 'Ingeniero',    emoji: '👷',   lugar: 'La obra',         herramienta: 'Casco y planos',        marmato: false },
  { nombre: 'Bombero',      emoji: '🚒',   lugar: 'El cuartel',      herramienta: 'Manguera',              marmato: false },
  { nombre: 'Policía',      emoji: '🚔',   lugar: 'La estación',     herramienta: 'Radio',                 marmato: false },
  { nombre: 'Panadero',     emoji: '🍞',   lugar: 'La panadería',    herramienta: 'Horno',                 marmato: false },
  { nombre: 'Cocinero',     emoji: '👨‍🍳', lugar: 'La cocina',       herramienta: 'Sartén y cuchillo',     marmato: false },
  { nombre: 'Mecánico',     emoji: '🔧',   lugar: 'El taller',       herramienta: 'Llaves y destornillador',marmato: false},
  { nombre: 'Carpintero',   emoji: '🔨',   lugar: 'El taller',       herramienta: 'Martillo y serrucho',   marmato: false },
  { nombre: 'Comerciante',  emoji: '🛒',   lugar: 'La tienda',       herramienta: 'Balanza y calculadora', marmato: false },
]

// Descripciones (para el modo "adivina la profesión")
const DESCRIPCIONES = {
  Minero: 'Baja a los socavones a sacar oro con pica y linterna.',
  Barequero: 'Trabaja al pie de las quebradas y ríos con un cajón y una malla buscando oro.',
  Agricultor: 'Siembra semillas, cuida las plantas y recoge la cosecha.',
  Conductor: 'Maneja volquetas, retroexcavadoras o buses para transportar.',
  Arriero: 'Lleva cargas de un lugar a otro con mulas y caballos por los caminos.',
  Mototaxista: 'Transporta gente en su moto por el pueblo.',
  Celador: 'Cuida la puerta de entrada de un colegio, oficina o edificio.',
  Profesor: 'Enseña a leer, escribir y sumar a los niños.',
  Médico: 'Revisa a los pacientes y receta medicinas para curarlos.',
  Enfermero: 'Ayuda al médico, pone inyecciones y cuida a los enfermos.',
  Ingeniero: 'Diseña puentes, casas o máquinas usando planos y cálculos.',
  Bombero: 'Corre a apagar incendios y rescatar personas.',
  Policía: 'Cuida el orden y protege a los ciudadanos.',
  Panadero: 'Hace pan y pasteles muy temprano en la mañana.',
  Cocinero: 'Prepara comidas deliciosas en un restaurante.',
  Mecánico: 'Repara carros, motos y máquinas cuando se dañan.',
  Carpintero: 'Fabrica muebles como sillas y mesas trabajando la madera.',
  Comerciante: 'Vende productos en una tienda o en el mercado.',
}

function distractores(correcto, k = 3) {
  return PROFESIONES.filter((p) => p.nombre !== correcto.nombre)
    .sort(() => Math.random() - 0.5)
    .slice(0, k)
}

function OpcionProfesion({ p }) {
  return (
    <span className="flex flex-col items-center gap-1">
      <span className="text-3xl">{p.emoji}</span>
      <span>{p.nombre}</span>
    </span>
  )
}

function generarBanco() {
  const banco = []

  // 🎭 Modo 1: Emoji + nombre → adivina qué hace
  for (const p of PROFESIONES) {
    const ops = [p, ...distractores(p)].sort(() => Math.random() - 0.5)
    banco.push({
      enunciado: '🎭 ¿Quién soy? Elige la profesión correcta',
      pregunta: <span className="text-6xl md:text-7xl">{p.emoji}</span>,
      opciones: ops.map((o) => o.nombre),
      correcta: ops.findIndex((o) => o.nombre === p.nombre),
    })
  }

  // 📖 Modo 2: Descripción → adivina la profesión
  for (const p of PROFESIONES) {
    const ops = [p, ...distractores(p)].sort(() => Math.random() - 0.5)
    banco.push({
      enunciado: '📖 Lee la descripción y adivina quién es',
      pregunta: <span className="text-base md:text-lg italic px-4">"{DESCRIPCIONES[p.nombre]}"</span>,
      opciones: ops.map((o) => <OpcionProfesion key={o.nombre} p={o} />),
      correcta: ops.findIndex((o) => o.nombre === p.nombre),
    })
  }

  // 📍 Modo 3: Profesión → ¿dónde trabaja?
  for (const p of PROFESIONES) {
    const otros = PROFESIONES.filter((x) => x.lugar !== p.lugar)
      .sort(() => Math.random() - 0.5).slice(0, 3)
    const ops = [p, ...otros].sort(() => Math.random() - 0.5)
    banco.push({
      enunciado: `📍 ¿Dónde trabaja normalmente un(a) ${p.nombre}?`,
      pregunta: <span className="text-5xl md:text-6xl">{p.emoji}</span>,
      opciones: ops.map((o) => o.lugar),
      correcta: ops.findIndex((o) => o.lugar === p.lugar),
    })
  }

  // 🧰 Modo 4: Herramienta → adivina la profesión
  for (const p of PROFESIONES) {
    const ops = [p, ...distractores(p)].sort(() => Math.random() - 0.5)
    banco.push({
      enunciado: '🧰 ¿Quién usa estas herramientas?',
      pregunta: <span className="font-display text-xl md:text-2xl">{p.herramienta}</span>,
      opciones: ops.map((o) => <OpcionProfesion key={o.nombre} p={o} />),
      correcta: ops.findIndex((o) => o.nombre === p.nombre),
    })
  }

  // 🏘️ Modo 5: Típicas de Marmato
  const marmatoPreguntas = [
    {
      enunciado: '🏘️ En Marmato es MUY común esta profesión porque el pueblo es minero:',
      pregunta: '⛏️🪙 Sacar oro de la tierra',
      opciones: ['Minero', 'Panadero', 'Bombero', 'Ingeniero'],
      correcta: 0,
    },
    {
      enunciado: '🌊 El barequero trabaja con...',
      pregunta: '🪙 Herramientas artesanales',
      opciones: ['Un cajón y una malla en quebradas o ríos', 'Un martillo grande', 'Una computadora', 'Un tractor'],
      correcta: 0,
    },
    {
      enunciado: '🐴 El arriero lleva cargas por los caminos usando...',
      pregunta: '¿Con qué animales?',
      opciones: ['Mulas y caballos', 'Gallinas', 'Vacas', 'Peces'],
      correcta: 0,
    },
    {
      enunciado: '🚛 En Marmato se ven muchas volquetas y retros porque...',
      pregunta: '¿Por qué?',
      opciones: ['Transportan tierra y material de las minas', 'Van a la playa', 'Llevan pasajeros al colegio', 'Es un pueblo agrícola solamente'],
      correcta: 0,
    },
    {
      enunciado: '🛵 El mototaxista ayuda a la comunidad porque...',
      pregunta: '¿Cuál es su rol?',
      opciones: ['Transporta gente rápido por lugares con calles estrechas', 'Vende comida', 'Enseña a los niños', 'Cuida enfermos'],
      correcta: 0,
    },
    {
      enunciado: '👮 El celador de la escuela se encarga de...',
      pregunta: '¿Qué hace?',
      opciones: ['Cuidar la puerta y vigilar quién entra y sale', 'Enseñar clases', 'Cocinar el almuerzo', 'Manejar el bus'],
      correcta: 0,
    },
    {
      enunciado: '🌾 Además de la minería, en Marmato también se ve mucho...',
      pregunta: '¿Otra profesión común?',
      opciones: ['Agricultor', 'Astronauta', 'Marinero', 'Piloto'],
      correcta: 0,
    },
  ]
  banco.push(...marmatoPreguntas.map((p) => ({ ...p, pregunta: <span>{p.pregunta}</span> })))

  // 💡 Modo 6: Importancia — mixto general
  const importancia = [
    { enunciado: '⚕️ Si me duele mucho la cabeza, ¿a quién acudo?', pregunta: '💊', opciones: ['Médico', 'Bombero', 'Arriero', 'Carpintero'], correcta: 0 },
    { enunciado: '🔥 Si hay un incendio en una casa, llamamos a...', pregunta: '🚒', opciones: ['Bomberos', 'Panaderos', 'Profesores', 'Mineros'], correcta: 0 },
    { enunciado: '👨‍🏫 ¿Quién nos enseña a leer, escribir y sumar?', pregunta: '📚', opciones: ['Profesor', 'Mecánico', 'Cocinero', 'Barequero'], correcta: 0 },
    { enunciado: '🚗 Si el carro no arranca, lo llevo al...', pregunta: '🔧', opciones: ['Mecánico', 'Médico', 'Ingeniero', 'Celador'], correcta: 0 },
    { enunciado: '🏗️ ¿Quién diseña un puente antes de construirlo?', pregunta: '📐', opciones: ['Ingeniero', 'Arriero', 'Barequero', 'Comerciante'], correcta: 0 },
    { enunciado: '🍞 Muy temprano en la mañana, el ___ ya está trabajando:', pregunta: 'Adivina', opciones: ['Panadero', 'Astronauta', 'Cirujano', 'Piloto'], correcta: 0 },
    { enunciado: '💡 ¿Por qué son importantes TODAS las profesiones?', pregunta: '🤝 Comunidad', opciones: ['Porque todas se necesitan para que la comunidad funcione', 'Porque algunas ganan mucho dinero', 'Porque son fáciles', 'Porque solo unas pocas sirven'], correcta: 0 },
  ]
  banco.push(...importancia.map((p) => ({ ...p, pregunta: <span className="text-4xl">{p.pregunta}</span> })))

  return banco
}

export default function ProfesionesComunidad({ onExit }) {
  const preguntas = generarBanco().sort(() => Math.random() - 0.5).slice(0, 15)
  return (
    <QuizGenerico
      juegoId="profesiones-comunidad"
      juegoNombre="Profesiones en mi comunidad"
      materia="sociales"
      preguntas={preguntas}
      onExit={onExit}
    />
  )
}
