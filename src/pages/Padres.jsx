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
          Recomendaciones y todo lo que necesitan saber para acompañar mejor a sus hijos.
        </p>
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
