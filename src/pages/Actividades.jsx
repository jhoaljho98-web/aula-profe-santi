import { useMemo, useState } from 'react'
import actividades from '../data/actividades.json'

const MATERIAS = ['Todas', 'Matemáticas', 'Castellano', 'Ciencias Naturales', 'Ciencias Sociales', 'Inglés']

export default function Actividades() {
  const [filtro, setFiltro] = useState('Todas')

  const lista = useMemo(() => {
    return actividades.filter((a) => filtro === 'Todas' || a.materia === filtro)
  }, [filtro])

  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-3xl md:text-4xl font-display font-bold text-institucional-verdeOscuro">
          Actividades lúdicas 🎮
        </h1>
        <p className="mt-2 text-gray-700">
          Juega, practica y aprende. Cada actividad es corta y divertida.
        </p>
      </section>

      {/* Filtro por materia */}
      <div className="flex flex-wrap gap-2">
        {MATERIAS.map((m) => (
          <button
            key={m}
            onClick={() => setFiltro(m)}
            className={`px-4 py-2 rounded-full font-semibold text-sm transition-colors ${
              filtro === m
                ? 'bg-institucional-verde text-white'
                : 'bg-white text-gray-700 hover:bg-institucional-crema'
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Grid de actividades */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {lista.map((a) => (
          <div key={a.id} className="card flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <span className="badge bg-institucional-verdeClaro text-white">{a.materia}</span>
              {a.estado === 'proximamente' && (
                <span className="badge bg-institucional-amarillo text-gray-900">Próximamente</span>
              )}
            </div>
            <h3 className="font-display font-bold text-lg mb-1">{a.titulo}</h3>
            <p className="text-gray-600 text-sm flex-1">{a.descripcion}</p>
            <button
              disabled={a.estado === 'proximamente'}
              className="mt-4 btn-primary disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {a.estado === 'proximamente' ? 'Muy pronto' : 'Jugar'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
