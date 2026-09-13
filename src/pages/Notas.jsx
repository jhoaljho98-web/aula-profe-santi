import { useState } from 'react'
import { sha256 } from '../utils/hash.js'
import notasData from '../data/notas.json'

const PERIODO_PESO = 0.25

export default function Notas() {
  const [documento, setDocumento] = useState('')
  const [buscando, setBuscando] = useState(false)
  const [resultado, setResultado] = useState(null)
  const [error, setError] = useState(null)

  async function consultar(e) {
    e.preventDefault()
    setError(null)
    setResultado(null)
    if (!documento.trim()) {
      setError('Por favor escribe el número de documento del estudiante.')
      return
    }
    setBuscando(true)
    try {
      const hash = await sha256(documento)
      const estudiante = notasData.estudiantes[hash]
      if (!estudiante) {
        setError('No encontramos un estudiante con ese documento. Verifica el número o comunícate con el docente.')
      } else {
        setResultado(estudiante)
      }
    } catch (err) {
      setError('Ocurrió un problema al consultar. Inténtalo de nuevo.')
    } finally {
      setBuscando(false)
    }
  }

  function calcularPromedioMateria(estudiante, materia) {
    const notas = [1, 2, 3, 4].map((p) => estudiante.periodos[p]?.[materia])
    const validas = notas.filter((n) => typeof n === 'number')
    if (validas.length === 0) return null
    const suma = validas.reduce((acc, n) => acc + n, 0)
    return (suma / validas.length).toFixed(2)
  }

  const materias = resultado
    ? Array.from(new Set(
        Object.values(resultado.periodos)
          .filter(Boolean)
          .flatMap((p) => Object.keys(p))
      ))
    : []

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
            placeholder="Ej: 1088000001"
            className="flex-1 rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-institucional-verde outline-none"
          />
          <button type="submit" className="btn-primary" disabled={buscando}>
            {buscando ? 'Consultando...' : 'Consultar notas'}
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-3">
          🔒 Por seguridad, el documento se codifica en tu navegador antes de la búsqueda.
          No lo compartas con otras personas.
        </p>
      </form>

      {error && (
        <div className="card bg-red-50 border border-red-200 text-red-700">
          {error}
        </div>
      )}

      {resultado && (
        <section className="space-y-4">
          <div className="card">
            <h2 className="font-display font-bold text-2xl text-institucional-verdeOscuro">
              {resultado.nombre}
            </h2>
            <p className="text-gray-600">
              Grado {resultado.grado} · Año {resultado.anio}
            </p>
          </div>

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
                {materias.map((materia, i) => (
                  <tr key={materia} className={i % 2 === 0 ? 'bg-white' : 'bg-institucional-crema'}>
                    <td className="p-3 font-semibold">{materia}</td>
                    {[1, 2, 3, 4].map((p) => (
                      <td key={p} className="p-3 text-center">
                        {resultado.periodos[p]?.[materia] ?? '—'}
                      </td>
                    ))}
                    <td className="p-3 text-center font-bold bg-institucional-crema">
                      {calcularPromedioMateria(resultado, materia) ?? '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-gray-500">
            Las notas se calculan como promedio simple de los periodos disponibles. Al finalizar
            el año, cada periodo pesará 25% de la nota final.
          </p>
        </section>
      )}
    </div>
  )
}
