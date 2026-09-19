import { useState, useEffect } from 'react'
import { hablar } from '../lib/hablar'

// Tarjetas de aprendizaje que se muestran antes del juego.
// tarjetas = [{ visual?, en, es, extra? }]
export default function TarjetasAprendizaje({ titulo, subtitulo, tarjetas, onListo, onExit, idioma = 'en-US' }) {
  const [i, setI] = useState(0)
  const t = tarjetas[i]
  const esUltima = i === tarjetas.length - 1

  // Al mostrar cada tarjeta, pronuncia el texto automáticamente
  useEffect(() => {
    const texto = t?.audio || t?.en
    if (texto) hablar(texto, idioma)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i])

  function siguiente() {
    if (esUltima) onListo()
    else setI(i + 1)
  }
  function anterior() {
    if (i > 0) setI(i - 1)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <button onClick={onExit} className="text-institucional-verdeOscuro font-semibold hover:underline">
          ← Salir
        </button>
        <div className="text-sm text-gray-600">
          Tarjeta {i + 1} de {tarjetas.length}
        </div>
        <button
          onClick={onListo}
          className="text-sm px-3 py-1.5 bg-white border-2 border-gray-300 text-gray-700 rounded-full font-semibold hover:border-institucional-verde hover:text-institucional-verdeOscuro"
        >
          Ya me las sé, jugar ▶️
        </button>
      </div>

      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-institucional-verde transition-all"
          style={{ width: `${((i + 1) / tarjetas.length) * 100}%` }}
        />
      </div>

      <div className="card bg-institucional-crema text-center py-6 md:py-8">
        <div className="text-xs uppercase tracking-wider text-institucional-verdeOscuro font-semibold mb-1">
          📚 Aprende primero
        </div>
        <h2 className="font-display font-bold text-xl md:text-2xl text-institucional-verdeOscuro mb-2 leading-snug">
          {titulo}
        </h2>
        {subtitulo && <p className="text-sm text-gray-600 mb-4">{subtitulo}</p>}

        {t.visual && <div className="mb-4">{t.visual}</div>}

        <div className="text-3xl md:text-4xl font-display font-bold text-institucional-verdeOscuro mb-2">
          {t.en}
        </div>
        <div className="text-lg md:text-xl text-gray-700 mb-4">
          {t.es}
        </div>

        <button
          onClick={() => hablar(t.audio || t.en, idioma)}
          className="mx-auto text-3xl bg-red-500 hover:bg-red-600 text-white rounded-full w-20 h-20 flex items-center justify-center shadow-lg transition-transform active:scale-95"
          title="Escuchar de nuevo"
        >
          🔊
        </button>
        {t.extra && <div className="mt-4 text-sm text-gray-600 italic">{t.extra}</div>}
      </div>

      <div className="flex gap-3 justify-between">
        <button
          onClick={anterior}
          disabled={i === 0}
          className="btn-secondary disabled:opacity-40"
        >
          ← Anterior
        </button>
        <button onClick={siguiente} className="btn-primary text-base md:text-lg">
          {esUltima ? '¡Listo! Jugar 🎮' : 'Siguiente →'}
        </button>
      </div>
    </div>
  )
}
