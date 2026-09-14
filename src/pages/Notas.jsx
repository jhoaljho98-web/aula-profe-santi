import { useState } from 'react'
import { sha256 } from '../utils/hash.js'
import notasData from '../data/notas.json'

const PERIODOS = [1, 2, 3, 4]

// -------------------- VISTA ESTUDIANTE --------------------
function VistaEstudiante({ estudiante }) {
  const materias = Array.from(new Set(
    Object.values(estudiante.periodos ?? {})
      .filter((p) => p && typeof p === 'object')
      .flatMap((p) => Object.keys(p))
  ))

  function promedioMateria(materia) {
    const notas = PERIODOS.map((p) => estudiante.periodos[p]?.[materia])
      .filter((n) => typeof n === 'number')
    if (!notas.length) return null
    return (notas.reduce((a, b) => a + b, 0) / notas.length).toFixed(2)
  }

  return (
    <section className="space-y-4">
      <div className="card flex items-center gap-4">
        {estudiante.foto ? (
          <img
            src={`${import.meta.env.BASE_URL}${estudiante.foto}`}
            alt={estudiante.nombre}
            className="w-24 h-24 rounded-full object-cover border-4 border-institucional-amarillo shrink-0"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-institucional-verde text-white flex items-center justify-center text-3xl font-bold shrink-0">
            {estudiante.nombre.split(' ').slice(0,2).map(n => n[0]).join('')}
          </div>
        )}
        <div>
          <h2 className="font-display font-bold text-2xl text-institucional-verdeOscuro">
            {estudiante.nombre}
          </h2>
          <p className="text-gray-600">
            Grado {estudiante.grado} · Año {estudiante.anio}
          </p>
        </div>
      </div>

      {materias.length === 0 ? (
        <div className="card text-center">
          <p className="text-gray-700 font-semibold">Aún no hay notas registradas para este estudiante.</p>
        </div>
      ) : (
        <div className="card overflow-x-auto p-0">
          <table className="w-full text-sm">
            <thead className="bg-institucional-verde text-white">
              <tr>
                <th className="p-3 text-left">Materia</th>
                <th className="p-3">P1 (25%)</th>
                <th className="p-3">P2 (25%)</th>
                <th className="p-3">P3 (25%)</th>
                <th className="p-3">P4 (25%)</th>
                <th className="p-3 bg-institucional-verdeOscuro">Promedio</th>
              </tr>
            </thead>
            <tbody>
              {materias.map((m, i) => (
                <tr key={m} className={i % 2 === 0 ? 'bg-white' : 'bg-institucional-crema'}>
                  <td className="p-3 font-semibold">{m}</td>
                  {PERIODOS.map((p) => (
                    <td key={p} className="p-3 text-center">
                      {estudiante.periodos[p]?.[m] ?? '—'}
                    </td>
                  ))}
                  <td className="p-3 text-center font-bold bg-institucional-crema">
                    {promedioMateria(m) ?? '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="text-xs text-gray-500">
        Las notas se calculan como promedio simple de los periodos disponibles.
        Al finalizar el año, cada periodo pesará 25% de la nota final.
      </p>
    </section>
  )
}

// -------------------- VISTA DOCENTE --------------------
function VistaDocente() {
  // Default: primer periodo con al menos un estudiante con notas
  const periodoInicial = PERIODOS.find((p) =>
    Object.values(notasData.estudiantes).some((e) => e.periodos[p] && Object.keys(e.periodos[p]).length > 0)
  ) ?? 1
  const [periodoFiltro, setPeriodoFiltro] = useState(String(periodoInicial))
  const [ordenar, setOrdenar] = useState('nombre')

  // Descubrir todas las materias del periodo seleccionado
  const estudiantes = Object.entries(notasData.estudiantes).map(([hash, e]) => ({
    hash,
    nombre: e.nombre,
    notas: e.periodos[periodoFiltro] || {},
  }))

  const materias = Array.from(new Set(
    Object.values(notasData.estudiantes)
      .flatMap((e) => Object.values(e.periodos ?? {}))
      .filter((p) => p && typeof p === 'object')
      .flatMap((p) => Object.keys(p))
  )).sort()

  function promedioEst(e) {
    const notas = Object.values(e.notas).filter((n) => typeof n === 'number')
    if (!notas.length) return null
    return notas.reduce((a, b) => a + b, 0) / notas.length
  }

  estudiantes.sort((a, b) => {
    if (ordenar === 'nombre') return a.nombre.localeCompare(b.nombre)
    if (ordenar === 'promedio_desc') return (promedioEst(b) ?? 0) - (promedioEst(a) ?? 0)
    if (ordenar === 'promedio_asc') return (promedioEst(a) ?? 0) - (promedioEst(b) ?? 0)
    return 0
  })

  const hayDatos = estudiantes.some((e) => Object.keys(e.notas).length > 0)

  return (
    <section className="space-y-4">
      <div className="card bg-institucional-verde text-white">
        <div className="flex items-center gap-3">
          <div className="text-3xl">🔑</div>
          <div>
            <h2 className="font-display font-bold text-xl">Vista de docente</h2>
            <p className="text-sm text-institucional-amarillo">
              Ingresaste como docente. Estás viendo las notas de todos los estudiantes.
            </p>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h3 className="font-display font-bold text-lg">Notas del periodo</h3>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">Periodo:</label>
              <select
                value={periodoFiltro}
                onChange={(e) => setPeriodoFiltro(e.target.value)}
                className="rounded-lg border border-gray-300 px-3 py-1 text-sm"
              >
                {PERIODOS.map((p) => <option key={p} value={String(p)}>Periodo {p}</option>)}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">Ordenar por:</label>
              <select
                value={ordenar}
                onChange={(e) => setOrdenar(e.target.value)}
                className="rounded-lg border border-gray-300 px-3 py-1 text-sm"
              >
                <option value="nombre">Nombre (A-Z)</option>
                <option value="promedio_desc">Promedio (mayor a menor)</option>
                <option value="promedio_asc">Promedio (menor a mayor)</option>
              </select>
            </div>
          </div>
        </div>

        {!hayDatos ? (
          <div className="text-center text-gray-500 py-8">
            No hay notas cargadas para este periodo aún.
          </div>
        ) : (
          <div className="overflow-x-auto -mx-6 px-6">
            <table className="w-full text-xs">
              <thead className="bg-institucional-verde text-white">
                <tr>
                  <th className="p-2 text-left sticky left-0 bg-institucional-verde">Estudiante</th>
                  {materias.map((m) => (
                    <th key={m} className="p-2 whitespace-nowrap">{m}</th>
                  ))}
                  <th className="p-2 bg-institucional-verdeOscuro">Promedio</th>
                </tr>
              </thead>
              <tbody>
                {estudiantes.map((e, i) => {
                  const prom = promedioEst(e)
                  return (
                    <tr key={e.hash} className={i % 2 === 0 ? 'bg-white' : 'bg-institucional-crema'}>
                      <td className="p-2 font-semibold whitespace-nowrap sticky left-0 bg-inherit">{e.nombre}</td>
                      {materias.map((m) => {
                        const n = e.notas[m]
                        const color = typeof n === 'number'
                          ? (n < 6 ? 'text-red-600 font-semibold' : n >= 9 ? 'text-institucional-verdeOscuro font-semibold' : '')
                          : 'text-gray-400'
                        return (
                          <td key={m} className={`p-2 text-center ${color}`}>
                            {typeof n === 'number' ? n.toFixed(1) : '—'}
                          </td>
                        )
                      })}
                      <td className="p-2 text-center font-bold bg-institucional-crema">
                        {prom != null ? prom.toFixed(2) : '—'}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}

// -------------------- COMPONENTE PRINCIPAL --------------------
export default function Notas() {
  const [documento, setDocumento] = useState('')
  const [buscando, setBuscando] = useState(false)
  const [resultado, setResultado] = useState(null)
  const [error, setError] = useState(null)
  const [esDocente, setEsDocente] = useState(false)

  async function consultar(e) {
    e.preventDefault()
    setError(null)
    setResultado(null)
    setEsDocente(false)
    if (!documento.trim()) {
      setError('Por favor escribe el número de documento del estudiante.')
      return
    }
    setBuscando(true)
    try {
      const hash = await sha256(documento)
      if (hash === notasData.docente_hash) {
        setEsDocente(true)
      } else {
        const estudiante = notasData.estudiantes[hash]
        if (!estudiante) {
          setError('No encontramos un estudiante con ese documento. Verifica el número o comunícate con el docente.')
        } else {
          setResultado(estudiante)
        }
      }
    } catch {
      setError('Ocurrió un problema al consultar. Inténtalo de nuevo.')
    } finally {
      setBuscando(false)
    }
  }

  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-3xl md:text-4xl font-display font-bold text-institucional-verdeOscuro">
          Consulta de notas
        </h1>
        <p className="mt-2 text-gray-700">
          Escribe el número de documento del estudiante para ver sus notas de los 4 periodos.
          Cada periodo vale 25% de la nota final.
        </p>
      </section>

      <form onSubmit={consultar} className="card">
        <label className="block text-sm font-semibold mb-2">Número de documento del estudiante</label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            inputMode="numeric"
            value={documento}
            onChange={(e) => setDocumento(e.target.value)}
            placeholder="Ej: 1058231195"
            className="flex-1 rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-institucional-verde outline-none"
          />
          <button type="submit" className="btn-primary" disabled={buscando}>
            {buscando ? 'Consultando...' : 'Consultar notas'}
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-3">
          🔒 El documento se codifica en tu navegador antes de la búsqueda. No lo compartas con otras personas.
        </p>
      </form>

      {error && (
        <div className="card bg-red-50 border border-red-200 text-red-700">
          {error}
        </div>
      )}

      {esDocente && <VistaDocente />}
      {resultado && <VistaEstudiante estudiante={resultado} />}
    </div>
  )
}
