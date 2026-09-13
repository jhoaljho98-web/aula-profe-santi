import recursos from '../data/recursos.json'

function tipoIcono(tipo) {
  return { guia: '📄', video: '🎥', link: '🔗' }[tipo] || '📎'
}

export default function Recursos() {
  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-3xl md:text-4xl font-display font-bold text-institucional-verdeOscuro">
          Recursos por materia
        </h1>
        <p className="mt-2 text-gray-700">
          Guías descargables, videos recomendados y enlaces útiles agrupados por área.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {Object.entries(recursos).map(([materia, items]) => (
          <section key={materia} className="card">
            <h2 className="font-display font-bold text-xl mb-3 text-institucional-verdeOscuro">
              {materia}
            </h2>
            <ul className="space-y-2">
              {items.map((r, i) => (
                <li key={i}>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2 rounded-xl hover:bg-institucional-crema transition-colors"
                  >
                    <span className="text-xl">{tipoIcono(r.tipo)}</span>
                    <span className="text-gray-800 hover:text-institucional-verde">{r.titulo}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}
