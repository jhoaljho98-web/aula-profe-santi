import QuizGenerico from './QuizGenerico.jsx'

// Cada pregunta muestra el color como una "muestra" grande + pregunta en español,
// las opciones son los nombres en inglés
const COLORES = [
  { es: 'Rojo',      en: 'Red',    hex: '#dc2626' },
  { es: 'Azul',      en: 'Blue',   hex: '#2563eb' },
  { es: 'Amarillo',  en: 'Yellow', hex: '#eab308' },
  { es: 'Verde',     en: 'Green',  hex: '#16a34a' },
  { es: 'Negro',     en: 'Black',  hex: '#111827' },
  { es: 'Blanco',    en: 'White',  hex: '#f9fafb' },
  { es: 'Rosa',      en: 'Pink',   hex: '#ec4899' },
  { es: 'Morado',    en: 'Purple', hex: '#9333ea' },
  { es: 'Naranja',   en: 'Orange', hex: '#f97316' },
  { es: 'Café',      en: 'Brown',  hex: '#78350f' },
  { es: 'Gris',      en: 'Gray',   hex: '#6b7280' },
]

function CuadroColor({ hex }) {
  return (
    <span
      className="inline-block w-24 h-24 rounded-2xl shadow-lg border-2 border-gray-300"
      style={{ backgroundColor: hex }}
    />
  )
}

function generarBanco() {
  const banco = []
  // Tipo 1: color visual -> nombre en inglés
  for (const c of COLORES) {
    const otros = COLORES.filter((x) => x.en !== c.en).sort(() => Math.random() - 0.5).slice(0, 3)
    const opciones = [c, ...otros].sort(() => Math.random() - 0.5)
    banco.push({
      enunciado: 'Mira el color: ¿cómo se dice en inglés?',
      pregunta: <CuadroColor hex={c.hex} />,
      opciones: opciones.map((o) => o.en),
      correcta: opciones.findIndex((o) => o.en === c.en),
    })
  }
  // Tipo 2: nombre en inglés -> elegir el cuadro de color
  for (const c of COLORES) {
    const otros = COLORES.filter((x) => x.en !== c.en).sort(() => Math.random() - 0.5).slice(0, 3)
    const opciones = [c, ...otros].sort(() => Math.random() - 0.5)
    banco.push({
      enunciado: `Elige el color que corresponde a esta palabra en inglés:`,
      pregunta: <span className="uppercase tracking-wide">{c.en}</span>,
      opciones: opciones.map((o) => (
        <CuadroColor key={o.en} hex={o.hex} />
      )),
      correcta: opciones.findIndex((o) => o.en === c.en),
    })
  }
  return banco
}

export default function ColoresIngles({ onExit }) {
  const preguntas = generarBanco().sort(() => Math.random() - 0.5).slice(0, 10)
  return (
    <QuizGenerico
      juegoId="colores-ingles"
      juegoNombre="Los colores en inglés"
      materia="ingles"
      preguntas={preguntas}
      onExit={onExit}
    />
  )
}
