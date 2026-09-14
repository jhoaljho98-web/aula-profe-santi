import { useMemo, useState } from 'react'
import TablasBatalla from '../games/TablasBatalla.jsx'
import NumerosMagicos from '../games/NumerosMagicos.jsx'
import MemoriaPalabras from '../games/MemoriaPalabras.jsx'
import PartesOracion from '../games/PartesOracion.jsx'

const JUEGOS = [
  {
    id: 'tablas-batalla',
    titulo: 'Batalla de Tablas',
    materia: 'Matemáticas',
    descripcion: 'Multiplica al ritmo del reloj. Tablas del 0 al 10.',
    icono: '✖️',
    componente: TablasBatalla,
  },
  {
    id: 'numeros-magicos',
    titulo: 'Números mágicos',
    materia: 'Matemáticas',
    descripcion: '¿Cuál es mayor? ¿Qué número sigue? Desde 1 hasta 1.000.',
    icono: '🔢',
    componente: NumerosMagicos,
  },
  {
    id: 'memoria-palabras',
    titulo: 'Memoria de palabras',
    materia: 'Castellano',
    descripcion: 'Encuentra las parejas de sinónimos y antónimos.',
    icono: '🧠',
    componente: MemoriaPalabras,
  },
  {
    id: 'partes-oracion',
    titulo: 'Partes de la oración',
    materia: 'Castellano',
    descripcion: 'Identifica sujeto, verbo y complemento.',
    icono: '✍️',
    componente: PartesOracion,
  },
]

const MATERIAS = ['Todas', 'Matemáticas', 'Castellano']

export default function Actividades() {
  const [filtro, setFiltro] = useState('Todas')
  const [juegoActivo, setJuegoActivo] = useState(null)

  const lista = useMemo(() => (
    JUEGOS.filter(j => filtro === 'Todas' || j.materia === filtro)
  ), [filtro])

  if (juegoActivo) {
    const Juego = juegoActivo.componente
    return (
      <div className="space-y-6">
        <section>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-institucional-verdeOscuro">
            {juegoActivo.icono} {juegoActivo.titulo}
          </h1>
          <p className="text-sm text-gray-600">{juegoActivo.materia} · {juegoActivo.descripcion}</p>
        </section>
        <Juego onExit={() => setJuegoActivo(null)} />
      </div>
    )
  }

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {lista.map((j) => (
          <div key={j.id} className="card flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <span className="badge bg-institucional-verdeClaro text-white">{j.materia}</span>
              <span className="text-3xl">{j.icono}</span>
            </div>
            <h3 className="font-display font-bold text-lg mb-1">{j.titulo}</h3>
            <p className="text-gray-600 text-sm flex-1">{j.descripcion}</p>
            <button onClick={() => setJuegoActivo(j)} className="mt-4 btn-primary">
              Jugar
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
