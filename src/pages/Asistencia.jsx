import { useState, Fragment } from 'react'
import { sha256 } from '../utils/hash.js'
import asistenciaData from '../data/asistencia.json'

const PERIODOS = [1, 2, 3, 4]

const CODIGO_LABEL = {
  P: 'Presente',
  R: 'Llegó tarde',
  E: 'Excusa',
  F: 'Faltó',
}
const CODIGO_COLOR = {
  P: 'bg-institucional-verde text-white',
  R: 'bg-institucional-amarillo text-gray-900',
  E: 'bg-blue-400 text-white',
  F: 'bg-red-400 text-white',
}

function formatearFecha(fecha) {
  // Parsear la fecha en zona horaria LOCAL para evitar el shift de UTC.
  // (new Date("2026-07-07") interpreta como UTC medianoche y en Colombia
  // se corre al 6 de julio; hay que construirla con año/mes/día explícitos.)
  const [y, m, d] = fecha.split('-').map(Number)
  const local = new Date(y, m - 1, d)
  return local.toLocaleDateString('es-CO', {
    weekday: 'short', day: 'numeric', month: 'short'
  })
}

function BarraAsistencia({ presente, tarde, falta, excusa, total_dias }) {
  if (!total_dias) return null
  const pctP = (presente / total_dias) * 100
  const pctR = (tarde / total_dias) * 100
  const pctE = (excusa / total_dias) * 100
  const pctF = (falta / total_dias) * 100
  return (
    <div className="w-full h-6 rounded-full overflow-hidden bg-gray-200 flex">
      <div className="bg-institucional-verde" style={{ width: `${pctP}%` }} title={`Presente: ${presente}`} />
      <div className="bg-institucional-amarillo" style={{ width: `${pctR}%` }} title={`Tarde: ${tarde}`} />
      <div className="bg-blue-400" style={{ width: `${pctE}%` }} title={`Excusa: ${excusa}`} />
      <div className="bg-red-400" style={{ width: `${pctF}%` }} title={`Falta: ${falta}`} />
    </div>
  )
}

function DetallePeriodo({ data, defaultOpen = false }) {
  const [abierto, setAbierto] = useState(defaultOpen)
  if (!data?.detalle?.length) return null
  return (
    <div className="mt-3">
      <button
        onClick={() => setAbierto(!abierto)}
        className="w-full flex items-center justify-between text-sm font-semibold text-institucional-verdeOscuro hover:underline"
      >
        <span>📅 Ver detalle día por día ({data.detalle.length} días)</span>
        <span>{abierto ? '▲' : '▼'}</span>
      </button>
      {abierto && (
        <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {data.detalle.map((d, i) => (
            <div key={i} className={`rounded-lg px-3 py-2 text-sm ${CODIGO_COLOR[d.codigo] || 'bg-gray-100'}`}>
              <div className="font-semibold">{formatearFecha(d.fecha)}</div>
              <div className="text-xs opacity-90">{CODIGO_LABEL[d.codigo] || d.codigo}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function TarjetaPeriodoEstudiante({ periodo, data }) {
  if (!data) {
    return (
      <div className="card bg-gray-50">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-lg text-gray-700">Periodo {periodo}</h3>
          <span className="badge bg-gray-300 text-gray-700">Sin datos aún</span>
        </div>
      </div>
    )
  }
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-display font-bold text-xl">Periodo {periodo}</h3>
        <span className="badge bg-institucional-verde text-white">
          {data.porcentaje_asistencia}% asistencia
        </span>
      </div>
      <BarraAsistencia {...data} />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 text-center">
        <div className="rounded-xl bg-institucional-verde bg-opacity-10 p-3">
          <div className="text-2xl font-bold text-institucional-verdeOscuro">{data.presente}</div>
          <div className="text-xs text-gray-600">Presente</div>
        </div>
        <div className="rounded-xl bg-institucional-amarillo bg-opacity-20 p-3">
          <div className="text-2xl font-bold text-gray-800">{data.tarde}</div>
          <div className="text-xs text-gray-600">Tarde</div>
        </div>
        <div className="rounded-xl bg-blue-50 p-3">
          <div className="text-2xl font-bold text-blue-700">{data.excusa}</div>
          <div className="text-xs text-gray-600">Excusa</div>
        </div>
        <div className="rounded-xl bg-red-50 p-3">
          <div className="text-2xl font-bold text-red-700">{data.falta}</div>
          <div className="text-xs text-gray-600">Falta</div>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-3">
        Total de días de clase: <strong>{data.total_dias}</strong>
      </p>
      <DetallePeriodo data={data} />
    </div>
  )
}

// -------------------- VISTA DOCENTE (todos los estudiantes) --------------------
function VistaDocente() {
  const [ordenar, setOrdenar] = useState('nombre')
  const [expandido, setExpandido] = useState(null)

  const estudiantes = Object.entries(asistenciaData.estudiantes).map(([hash, est]) => {
    const p3 = est.periodos['3']
    return {
      hash,
      nombre: est.nombre,
      p3,
    }
  })

  estudiantes.sort((a, b) => {
    if (ordenar === 'nombre') return a.nombre.localeCompare(b.nombre)
    if (ordenar === 'asistencia_asc') return (a.p3?.porcentaje_asistencia ?? 0) - (b.p3?.porcentaje_asistencia ?? 0)
    if (ordenar === 'asistencia_desc') return (b.p3?.porcentaje_asistencia ?? 0) - (a.p3?.porcentaje_asistencia ?? 0)
    if (ordenar === 'faltas') return (b.p3?.falta ?? 0) - (a.p3?.falta ?? 0)
    return 0
  })

  return (
    <section className="space-y-4">
      <div className="card bg-institucional-verde text-white">
        <div className="flex items-center gap-3">
          <div className="text-3xl">🔑</div>
          <div>
            <h2 className="font-display font-bold text-xl">Vista de docente</h2>
            <p className="text-sm text-institucional-amarillo">Ingresaste como docente. Estás viendo los datos de todos los estudiantes.</p>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <h3 className="font-display font-bold text-lg">Resumen del tercer periodo</h3>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Ordenar por:</label>
            <select
              value={ordenar}
              onChange={(e) => setOrdenar(e.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-1 text-sm"
            >
              <option value="nombre">Nombre (A-Z)</option>
              <option value="asistencia_desc">% asistencia (mayor a menor)</option>
              <option value="asistencia_asc">% asistencia (menor a mayor)</option>
              <option value="faltas">Más faltas</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full text-sm">
            <thead className="bg-institucional-verde text-white">
              <tr>
                <th className="p-2 text-left">Estudiante</th>
                <th className="p-2">P</th>
                <th className="p-2">R</th>
                <th className="p-2">E</th>
                <th className="p-2">F</th>
                <th className="p-2">Total</th>
                <th className="p-2">%</th>
                <th className="p-2"></th>
              </tr>
            </thead>
            <tbody>
              {estudiantes.map((e, i) => (
                <Fragment key={e.hash}>
                  <tr className={i % 2 === 0 ? 'bg-white' : 'bg-institucional-crema'}>
                    <td className="p-2 font-semibold">{e.nombre}</td>
                    <td className="p-2 text-center">{e.p3?.presente ?? '—'}</td>
                    <td className="p-2 text-center">{e.p3?.tarde ?? '—'}</td>
                    <td className="p-2 text-center">{e.p3?.excusa ?? '—'}</td>
                    <td className="p-2 text-center">{e.p3?.falta ?? '—'}</td>
                    <td className="p-2 text-center">{e.p3?.total_dias ?? '—'}</td>
                    <td className="p-2 text-center font-bold">
                      {e.p3?.porcentaje_asistencia != null ? `${e.p3.porcentaje_asistencia}%` : '—'}
                    </td>
                    <td className="p-2 text-center">
                      {e.p3?.detalle?.length ? (
                        <button
                          onClick={() => setExpandido(expandido === e.hash ? null : e.hash)}
                          className="text-xs text-institucional-verde hover:underline font-semibold"
                        >
                          {expandido === e.hash ? '▲' : 'Ver ▼'}
                        </button>
                      ) : null}
                    </td>
                  </tr>
                  {expandido === e.hash && e.p3?.detalle && (
                    <tr>
                      <td colSpan={8} className="p-4 bg-gray-50">
                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
                          {e.p3.detalle.map((d, idx) => (
                            <div key={idx} className={`rounded-lg px-2 py-1 text-xs ${CODIGO_COLOR[d.codigo]}`}>
                              <div className="font-semibold">{formatearFecha(d.fecha)}</div>
                              <div className="opacity-90">{CODIGO_LABEL[d.codigo]}</div>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

// -------------------- COMPONENTE PRINCIPAL --------------------
export default function Asistencia() {
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
      if (hash === asistenciaData.docente_hash) {
        setEsDocente(true)
      } else {
        const estudiante = asistenciaData.estudiantes[hash]
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
          Consulta de asistencia
        </h1>
        <p className="mt-2 text-gray-700">
          Escribe el número de documento del estudiante para ver su asistencia por periodo.
        </p>
      </section>

      <div className="card bg-institucional-crema">
        <h2 className="font-display font-bold text-lg mb-2">📖 ¿Qué significan los códigos?</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
          <div className="flex items-center gap-2"><span className="w-4 h-4 rounded bg-institucional-verde"></span> <span><strong>P</strong> = Presente</span></div>
          <div className="flex items-center gap-2"><span className="w-4 h-4 rounded bg-institucional-amarillo"></span> <span><strong>R</strong> = Llegó tarde</span></div>
          <div className="flex items-center gap-2"><span className="w-4 h-4 rounded bg-blue-400"></span> <span><strong>E</strong> = Con excusa</span></div>
          <div className="flex items-center gap-2"><span className="w-4 h-4 rounded bg-red-400"></span> <span><strong>F</strong> = Faltó</span></div>
        </div>
      </div>

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
            {buscando ? 'Consultando...' : 'Consultar asistencia'}
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

      {resultado && (
        <section className="space-y-4">
          <div className="card flex items-center gap-4">
            {resultado.foto ? (
              <img
                src={`${import.meta.env.BASE_URL}${resultado.foto}`}
                alt={resultado.nombre}
                className="w-24 h-24 rounded-full object-cover border-4 border-institucional-amarillo shrink-0"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-institucional-verde text-white flex items-center justify-center text-3xl font-bold shrink-0">
                {resultado.nombre.split(' ').slice(0,2).map(n => n[0]).join('')}
              </div>
            )}
            <div>
              <h2 className="font-display font-bold text-2xl text-institucional-verdeOscuro">
                {resultado.nombre}
              </h2>
              <p className="text-gray-600">
                Grado {resultado.grado} · Año {resultado.anio}
              </p>
            </div>
          </div>
          {PERIODOS.map((p) => (
            <TarjetaPeriodoEstudiante key={p} periodo={p} data={resultado.periodos[p]} />
          ))}
          <p className="text-xs text-gray-500">
            El porcentaje de asistencia considera P, R y E como "asistió". Solo F cuenta como inasistencia.
          </p>
        </section>
      )}
    </div>
  )
}
