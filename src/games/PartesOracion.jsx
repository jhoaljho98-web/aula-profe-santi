import { useMemo, useState } from 'react'
import palabras from '../data/palabras.json'

const TOTAL = 8

const PARTES = [
  { key: 'sujeto', label: 'Sujeto', descripcion: '¿Quién?', color: 'bg-institucional-amarillo text-gray-900', border: 'border-institucional-amarilloOscuro' },
  { key: 'verbo', label: 'Verbo', descripcion: '¿Qué hace?', color: 'bg-institucional-verde text-white', border: 'border-institucional-verdeOscuro' },
  { key: 'complemento', label: 'Complemento', descripcion: 'Detalles', color: 'bg-blue-400 text-white', border: 'border-blue-700' },
]


function prepararRonda() {
  return [...palabras.oraciones].sort(() => Math.random() - 0.5).slice(0, TOTAL)
}


export default function PartesOracion({ onExit }) {
  const [oraciones] = useState(prepararRonda)
  const [i, setI] = useState(0)
  const [asignaciones, setAsignaciones] = useState({})  // {parteKey: chunkText}
  const [aciertos, setAciertos] = useState(0)
  const [terminado, setTerminado] = useState(false)
  const [mostrarResultado, setMostrarResultado] = useState(false)
  const [chunkSeleccionado, setChunkSeleccionado] = useState(null)

  const oracion = oraciones[i]

  // Los 3 chunks desordenados
  const chunksMezclados = useMemo(() => {
    if (!oracion) return []
    return [
      { texto: oracion.sujeto, correcta: 'sujeto' },
      { texto: oracion.verbo, correcta: 'verbo' },
      { texto: oracion.complemento, correcta: 'complemento' },
    ].sort(() => Math.random() - 0.5)
  }, [oracion])

  const usados = new Set(Object.values(asignaciones))

  function seleccionarChunk(texto) {
    if (mostrarResultado) return
    if (usados.has(texto)) return
    setChunkSeleccionado(chunkSeleccionado === texto ? null : texto)
  }

  function ponerEnZona(parteKey) {
    if (mostrarResultado) return
    if (!chunkSeleccionado) return
    setAsignaciones({ ...asignaciones, [parteKey]: chunkSeleccionado })
    setChunkSeleccionado(null)
  }

  function quitarDeZona(parteKey) {
    if (mostrarResultado) return
    const nueva = { ...asignaciones }
    delete nueva[parteKey]
    setAsignaciones(nueva)
  }

  function verificar() {
    // Check si cada zona tiene el chunk correspondiente
    let ok = true
    for (const parte of PARTES) {
      const chunkAsignado = asignaciones[parte.key]
      const chunkCorrecto = chunksMezclados.find(c => c.correcta === parte.key)?.texto
      if (chunkAsignado !== chunkCorrecto) ok = false
    }
    if (ok) setAciertos((a) => a + 1)
    setMostrarResultado(true)
    setTimeout(() => {
      if (i + 1 >= TOTAL) setTerminado(true)
      else {
        setI((v) => v + 1)
        setAsignaciones({})
        setMostrarResultado(false)
        setChunkSeleccionado(null)
      }
    }, 1500)
  }

  const todasAsignadas = PARTES.every(p => asignaciones[p.key])

  if (terminado) {
    const pct = Math.round((aciertos / TOTAL) * 100)
    let emoji = '🎉'
    if (pct < 60) emoji = '💪'
    else if (pct === 100) emoji = '🏆'
    return (
      <div className="card text-center">
        <div className="text-7xl mb-4">{emoji}</div>
        <h2 className="font-display font-bold text-3xl text-institucional-verdeOscuro mb-4">
          {aciertos} de {TOTAL} oraciones correctas
        </h2>
        <div className="flex flex-wrap gap-3 justify-center">
          <button onClick={() => window.location.reload()} className="btn-primary">Jugar otra vez</button>
          <button onClick={onExit} className="btn-secondary">Volver</button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button onClick={onExit} className="text-institucional-verdeOscuro font-semibold hover:underline">
          ← Volver
        </button>
        <div className="text-sm font-semibold text-gray-600">
          {i + 1} de {TOTAL} · Aciertos: {aciertos}
        </div>
      </div>

      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-institucional-verde transition-all" style={{ width: `${(i / TOTAL) * 100}%` }} />
      </div>

      <div className="card py-6">
        <p className="text-center text-gray-700 mb-4 text-sm">
          <strong>1)</strong> Toca una parte de la oración de arriba · <strong>2)</strong> Toca la zona donde crees que va
        </p>

        {/* Chunks desordenados (arriba) */}
        <div className="flex flex-wrap justify-center gap-3 mb-8 min-h-[70px] items-center">
          {chunksMezclados.map((c) => {
            const usado = usados.has(c.texto)
            const seleccionado = chunkSeleccionado === c.texto
            return (
              <button
                key={c.texto}
                onClick={() => seleccionarChunk(c.texto)}
                disabled={usado || mostrarResultado}
                className={`px-4 py-3 rounded-xl text-lg font-bold shadow-soft transition-all ${
                  usado
                    ? 'bg-gray-100 text-gray-300 line-through'
                    : seleccionado
                      ? 'bg-institucional-verdeOscuro text-white ring-4 ring-institucional-amarillo scale-105'
                      : 'bg-institucional-crema text-gray-800 border-2 border-institucional-verde hover:bg-white'
                }`}
              >
                {c.texto}
              </button>
            )
          })}
        </div>

        {/* Zonas de las 3 partes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {PARTES.map((parte) => {
            const chunkAqui = asignaciones[parte.key]
            const chunkCorrecto = chunksMezclados.find(c => c.correcta === parte.key)?.texto
            let bg = 'bg-white border-dashed'
            if (mostrarResultado) {
              bg = chunkAqui === chunkCorrecto ? 'bg-institucional-verde bg-opacity-20 border-solid' : 'bg-red-100 border-solid'
            } else if (chunkAqui) {
              bg = 'bg-white border-solid'
            } else if (chunkSeleccionado) {
              bg = 'bg-institucional-crema border-solid animate-pulse'
            }
            return (
              <button
                key={parte.key}
                onClick={() => chunkAqui ? quitarDeZona(parte.key) : ponerEnZona(parte.key)}
                disabled={mostrarResultado || (!chunkAqui && !chunkSeleccionado)}
                className={`rounded-2xl border-4 ${parte.border} ${bg} p-4 text-center min-h-[120px] flex flex-col items-center justify-center gap-2 transition-all disabled:cursor-default`}
              >
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${parte.color}`}>
                  {parte.label} · {parte.descripcion}
                </div>
                {chunkAqui ? (
                  <div className={`text-lg font-bold ${mostrarResultado && chunkAqui !== chunkCorrecto ? 'line-through text-red-600' : 'text-institucional-verdeOscuro'}`}>
                    {chunkAqui}
                  </div>
                ) : (
                  <div className="text-gray-400 text-sm italic">
                    {chunkSeleccionado ? 'Toca aquí para poner' : 'vacío'}
                  </div>
                )}
                {mostrarResultado && chunkAqui !== chunkCorrecto && (
                  <div className="text-xs text-institucional-verde font-semibold mt-1">
                    Correcto: {chunkCorrecto}
                  </div>
                )}
              </button>
            )
          })}
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={verificar}
            disabled={!todasAsignadas || mostrarResultado}
            className="btn-primary disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {mostrarResultado ? 'Verificando...' : 'Verificar respuesta'}
          </button>
        </div>
      </div>
    </div>
  )
}
