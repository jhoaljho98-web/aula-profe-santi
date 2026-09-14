const AVISOS = [
  {
    icono: '📓',
    titulo: 'Revisión de cuadernos',
    texto: 'Esta semana estaré recogiendo los cuadernos para revisar todo el trabajo del periodo. Por favor asegúrense de que los niños los traigan al colegio.',
    color: 'bg-institucional-amarillo',
  },
  {
    icono: '🧮',
    titulo: 'Examen de Matemáticas — miércoles 16 de septiembre',
    texto: 'Temas: las tablas de multiplicar del 0 al 10 y los números del 0 al 1.000. Recuerden que en la sección de Actividades tienen juegos para practicar cada tema.',
    color: 'bg-institucional-verde',
  },
  {
    icono: '📝',
    titulo: 'Examen de Castellano — jueves 17 de septiembre',
    texto: 'Temas: sinónimos y antónimos, partes de la oración (sujeto, verbo, complemento), dictado y lectura con medición de velocidad. Los juegos de Castellano en Actividades ayudan mucho a repasar.',
    color: 'bg-blue-400',
  },
]

const RECOMENDACIONES = [
  { titulo: 'Acompañamiento diario', texto: 'Reserven 30 minutos al día para revisar cuadernos, escuchar cómo les fue y ayudarles con tareas.' },
  { titulo: 'Fomentar la lectura', texto: 'Leerles en voz alta un cuento cada noche fortalece el vocabulario y la imaginación.' },
  { titulo: 'Dictados en casa', texto: 'Dicten oraciones cortas 2 o 3 veces por semana. Ayuda muchísimo con la escritura y la ortografía.' },
  { titulo: 'Uso responsable de dispositivos', texto: 'Los videos y actividades de la plataforma están pensados para acompañamiento. Regulen el tiempo de pantalla.' },
  { titulo: 'Reconocer el esfuerzo', texto: 'Celebren los avances, no solo los resultados. Una palabra amable vale más que una nota alta.' },
]

export default function Padres() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl md:text-4xl font-display font-bold text-institucional-verdeOscuro">
          Para los padres de familia
        </h1>
        <p className="mt-2 text-gray-700">
          Avisos importantes y recomendaciones para acompañar mejor a sus hijos.
        </p>
      </section>

      {/* AVISOS */}
      <section>
        <h2 className="font-display font-bold text-2xl mb-4 text-institucional-verdeOscuro flex items-center gap-2">
          🔔 Avisos importantes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {AVISOS.map((a, i) => (
            <div key={i} className={`card ${a.color} text-white flex flex-col`}>
              <div className="text-4xl mb-2">{a.icono}</div>
              <h3 className="font-display font-bold text-lg mb-2">{a.titulo}</h3>
              <p className="text-sm opacity-95 flex-1">{a.texto}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-display font-bold text-2xl mb-4 text-institucional-verdeOscuro">
          Recomendaciones para el acompañamiento
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {RECOMENDACIONES.map((r, i) => (
            <div key={i} className="card">
              <h3 className="font-display font-bold text-lg mb-2">✨ {r.titulo}</h3>
              <p className="text-gray-700 text-sm">{r.texto}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
