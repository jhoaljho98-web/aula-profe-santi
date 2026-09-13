import { useMemo, useState } from 'react'
import clases from '../data/clases.json'

const MATERIAS = ['Todas', 'Matemáticas', 'Castellano', 'Ciencias Naturales', 'Ciencias Sociales', 'Inglés', 'Ética y Religión', 'Artística']
const PERIODOS = ['Todos', 1, 2, 3, 4]

function tipoIcono(tipo) {
  return { guia: '📄', video: '🎥', link: '🔗', juego: '🎮' }[tipo] || '📎'
}

export default function Diario() {
  const [materia, setMateria] = useState('Todas')
  const [periodo, setPeriodo] = useState('Todos')
  const [busqueda, setBusqueda] = useState('')

  const filtradas = useMemo(() => {
    return [...clases]
      .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
      .filter((c) => materia === 'Todas' || c.materia === materia)
      .filter((c) => periodo === 'Todos' || c.periodo === periodo)
      .filter((c) =>
        !busqueda ||
        c.tema.toLowerCase().includes(busqueda.toLowerCase()) ||
        c.resumen.toLowerCase().includes(busqueda.toLowerCase())
      )
  }, [materia, periodo, busqueda])

  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-3xl md:text-4xl font-display font-bold text-institucional-verdeOscuro">
          Diario de clase
        </h1>
        <p className="mt-2 text-gray-700">
          Aquí queda registrado lo que hacemos clase a clase. Si un niño faltó, puede desatrasarse desde aquí.
        </p>
      </section>

      {/* Filtros */}
      <div className="card space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-semibold mb-1">Materia</label>
            <select
              value={materia}
              onChange={(e) => setMateria(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-institucional-verde outline-none"
            >
              {MATERIAS.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Periodo</label>
            <select
              value={periodo}
              onChange={(e) => setPeriodo(e.target.value === 'Todos' ? 'Todos' : Number(e.target.value))}
              className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-institucional-verde outline-none"
            >
              {PERIODOS.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Buscar</label>
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Tema o palabra clave..."
              className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-institucional-verde outline-none"
            />
          </div>
        </div>
        <div className="text-sm text-gray-500">
          Mostrando {filtradas.length} de {clases.length} clases.
        </div>
      </div>

      {/* Lista de clases */}
      <div className="space-y-4">
        {filtradas.length === 0 && (
          <div className="card text-center text-gray-500">
            No hay clases que coincidan con los filtros.
          </div>
        )}
        {filtradas.map((c) => (
          <article key={c.id} className="card">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="badge bg-institucional-verde text-white">{c.materia}</span>
              <span className="badge bg-institucional-amarillo text-gray-900">Periodo {c.periodo}</span>
              <span className="text-sm text-gray-500 ml-auto">
                {new Date(c.fecha).toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            </div>
            <h2 className="font-display font-bold text-xl mb-2">{c.tema}</h2>
            <p className="text-gray-700 mb-4">{c.resumen}</p>

            {c.recursos && c.recursos.length > 0 && (
              <div className="mb-3">
                <div className="text-sm font-semibold text-gray-700 mb-1">📎 Recursos:</div>
                <ul className="space-y-1">
                  {c.recursos.map((r, i) => (
                    <li key={i}>
                      <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-institucional-verde hover:underline">
                        {tipoIcono(r.tipo)} {r.titulo}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {c.tarea && (
              <div className="bg-institucional-crema border-l-4 border-institucional-amarillo rounded-r-xl p-3">
                <div className="text-sm font-semibold text-gray-700 mb-1">✏️ Tarea para casa:</div>
                <p className="text-gray-700 text-sm">{c.tarea}</p>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  )
}
