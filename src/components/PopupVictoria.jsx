import { useState, useEffect } from 'react'
import { generarImagenLogro } from '../lib/imagenLogro'

// logros = [{ tipo: 'medalla' | 'trofeo', nombre, icono, color? }]
export default function PopupVictoria({ estudiante, logros, onCerrar }) {
  const [i, setI] = useState(0)
  const [imagen, setImagen] = useState(null)
  const [generando, setGenerando] = useState(true)
  const logro = logros[i]

  useEffect(() => {
    let vivo = true
    async function generar() {
      setGenerando(true)
      setImagen(null)
      const url = await generarImagenLogro({
        nombre: estudiante.nombre,
        fotoUrl: estudiante.foto ? `${import.meta.env.BASE_URL}${estudiante.foto}` : null,
        logroNombre: logro.nombre,
        logroIcono: logro.icono,
        tipo: logro.tipo,
        color: logro.color,
      })
      if (vivo) {
        setImagen(url)
        setGenerando(false)
      }
    }
    generar()
    return () => { vivo = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i])

  function descargar() {
    if (!imagen) return
    const a = document.createElement('a')
    a.href = imagen
    const nombreArchivo = `${estudiante.nombre.replace(/\s+/g, '-')}-${logro.nombre}.jpg`
    a.download = nombreArchivo
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  async function compartir() {
    if (!imagen) return
    try {
      const blob = await (await fetch(imagen)).blob()
      const file = new File([blob], `${logro.nombre}.jpg`, { type: 'image/jpeg' })
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `${logro.nombre} — Aula del profe Santi`,
          text: `¡${estudiante.nombre} ganó ${logro.nombre}!`,
        })
      } else {
        descargar()
      }
    } catch {
      descargar()
    }
  }

  return (
    <div className="fixed inset-0 z-[60] bg-black bg-opacity-80 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[95vh] overflow-y-auto">
        <div className="p-4 bg-institucional-verde text-white text-center rounded-t-2xl relative">
          <div className="text-2xl">🎉 ¡Felicitaciones! 🎉</div>
          <div className="text-sm opacity-90 mt-1">
            {logro.tipo === 'trofeo' ? 'Nuevo trofeo de racha' : 'Nueva medalla desbloqueada'}
          </div>
          {logros.length > 1 && (
            <div className="text-xs opacity-80 mt-1">
              Logro {i + 1} de {logros.length}
            </div>
          )}
        </div>

        <div className="p-4">
          {generando ? (
            <div className="text-center py-8">
              <div className="text-6xl animate-bounce">{logro.icono}</div>
              <p className="text-sm text-gray-600 mt-3">Preparando tu imagen…</p>
            </div>
          ) : (
            <img
              src={imagen}
              alt={`Logro ${logro.nombre}`}
              className="w-full rounded-xl shadow-lg"
            />
          )}
        </div>

        <div className="p-4 border-t border-gray-200 space-y-2">
          {imagen && (
            <>
              <button
                onClick={compartir}
                className="w-full py-3 bg-institucional-verde text-white rounded-xl font-bold hover:bg-institucional-verdeOscuro flex items-center justify-center gap-2"
              >
                📤 Compartir mi logro
              </button>
              <button
                onClick={descargar}
                className="w-full py-2 bg-white border-2 border-institucional-verde text-institucional-verdeOscuro rounded-xl font-semibold hover:bg-institucional-crema flex items-center justify-center gap-2"
              >
                💾 Descargar imagen
              </button>
            </>
          )}
          {i + 1 < logros.length ? (
            <button
              onClick={() => setI(i + 1)}
              className="w-full py-2 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 rounded-xl font-semibold"
            >
              Siguiente logro →
            </button>
          ) : (
            <button
              onClick={onCerrar}
              className="w-full py-2 text-gray-600 hover:text-gray-800 underline"
            >
              Seguir jugando
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
