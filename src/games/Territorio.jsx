import QuizGenerico from './QuizGenerico.jsx'

const PC = ['Norte', 'Sur', 'Este (Oriente)', 'Oeste (Occidente)']

const BANCO = [
  // Puntos cardinales
  { enunciado: '🌅 ¿Por dónde sale el sol?', pregunta: 'El sol sale por...', opciones: PC, correcta: 2 },
  { enunciado: '🌇 ¿Por dónde se oculta el sol?', pregunta: 'El sol se oculta por...', opciones: PC, correcta: 3 },
  { enunciado: 'Si miras hacia el Norte, ¿qué queda a tu derecha?', pregunta: '🧭 Orientación', opciones: PC, correcta: 2 },
  { enunciado: 'Si miras hacia el Norte, ¿qué queda a tu izquierda?', pregunta: '🧭 Orientación', opciones: PC, correcta: 3 },
  { enunciado: 'Si miras hacia el Norte, ¿qué queda detrás de ti?', pregunta: '🧭 Orientación', opciones: PC, correcta: 1 },
  { enunciado: 'El opuesto al Este es...', pregunta: '↔️ Opuestos', opciones: PC, correcta: 3 },
  { enunciado: '¿Cuántos puntos cardinales hay?', pregunta: '🧭', opciones: ['2', '3', '4', '5'], correcta: 2 },
  { enunciado: 'La brújula siempre señala hacia el...', pregunta: '🧭 Brújula', opciones: PC, correcta: 0 },

  // Municipio (Marmato)
  { enunciado: '¿En qué municipio queda nuestra escuela IE El Llano?', pregunta: '🏫 Municipio', opciones: ['Marmato', 'Riosucio', 'Supía', 'La Merced'], correcta: 0 },
  { enunciado: 'Marmato es famoso por sus minas de...', pregunta: '⛏️ Marmato', opciones: ['Oro', 'Sal', 'Carbón', 'Esmeraldas'], correcta: 0 },
  { enunciado: 'Marmato está construido sobre un...', pregunta: '⛰️ Marmato', opciones: ['Cerro (montaña)', 'Río', 'Desierto', 'Bosque plano'], correcta: 0 },
  { enunciado: '¿Cuál es el apodo de Marmato?', pregunta: 'Marmato es conocido como...', opciones: ['El pueblo del oro', 'La ciudad blanca', 'La perla del Pacífico', 'El paraíso verde'], correcta: 0 },

  // Departamento (Caldas)
  { enunciado: '¿En qué departamento está Marmato?', pregunta: '🗺️ Departamento', opciones: ['Caldas', 'Antioquia', 'Risaralda', 'Chocó'], correcta: 0 },
  { enunciado: '¿Cuál es la capital de Caldas?', pregunta: '🏛️ Capital departamental', opciones: ['Manizales', 'Pereira', 'Armenia', 'Cali'], correcta: 0 },
  { enunciado: 'Caldas está en la región...', pregunta: '🌄 Región', opciones: ['Andina', 'Caribe', 'Pacífica', 'Amazónica'], correcta: 0 },
  { enunciado: 'Caldas es famoso por el cultivo de...', pregunta: '☕ Producto principal', opciones: ['Café', 'Banano', 'Arroz', 'Papa'], correcta: 0 },

  // País (Colombia)
  { enunciado: '¿En qué país vivimos?', pregunta: '🇨🇴 País', opciones: ['Colombia', 'Ecuador', 'Venezuela', 'Panamá'], correcta: 0 },
  { enunciado: '¿Cuál es la capital de Colombia?', pregunta: '🏛️ Capital', opciones: ['Bogotá', 'Medellín', 'Cali', 'Barranquilla'], correcta: 0 },
  { enunciado: 'Colombia tiene costa en el Mar Caribe y en el Océano...', pregunta: '🌊 Océano', opciones: ['Pacífico', 'Atlántico', 'Índico', 'Ártico'], correcta: 0 },
  { enunciado: '¿Cuántas regiones naturales tiene Colombia?', pregunta: '🌍 Regiones', opciones: ['3', '5', '6', '10'], correcta: 2 },
  { enunciado: '¿Qué color NO tiene la bandera de Colombia?', pregunta: '🇨🇴 Bandera', opciones: ['Verde', 'Amarillo', 'Azul', 'Rojo'], correcta: 0 },
  { enunciado: 'El río más grande de Colombia es el...', pregunta: '🌊 Río', opciones: ['Magdalena', 'Amazonas', 'Cauca', 'Nilo'], correcta: 0 },
  { enunciado: 'La moneda oficial de Colombia es...', pregunta: '💰 Moneda', opciones: ['Peso', 'Dólar', 'Euro', 'Real'], correcta: 0 },

  // Países vecinos
  { enunciado: '¿Cuál de estos países NO es vecino de Colombia?', pregunta: '🌎 Vecinos', opciones: ['México', 'Ecuador', 'Perú', 'Panamá'], correcta: 0 },
  { enunciado: 'Al sur, Colombia limita con...', pregunta: '⬇️ Limite sur', opciones: ['Ecuador y Perú', 'Panamá', 'Venezuela', 'Brasil solamente'], correcta: 0 },
  { enunciado: 'Al norte, Colombia limita con...', pregunta: '⬆️ Limite norte', opciones: ['El mar Caribe', 'Argentina', 'Chile', 'Bolivia'], correcta: 0 },

  // Ubicación local
  { enunciado: '¿En qué continente está Colombia?', pregunta: '🌎 Continente', opciones: ['América', 'Europa', 'Asia', 'África'], correcta: 0 },
  { enunciado: 'Manizales queda al ___ de Marmato:', pregunta: '📍 Cerca de Marmato', opciones: ['Sur', 'Norte', 'Este', 'Oeste'], correcta: 0 },

  // Cotidiano
  { enunciado: '¿Qué usas para orientarte y encontrar el Norte?', pregunta: 'Herramienta', opciones: ['Brújula', 'Termómetro', 'Regla', 'Calculadora'], correcta: 0 },
]

export default function Territorio({ onExit }) {
  const preguntas = [...BANCO].sort(() => Math.random() - 0.5).slice(0, 15)
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
