import { useState, useEffect } from 'react'
import galeriaData from '../data/galeria.json'

function Lightbox({ fotos, index, onClose, onPrev, onNext }) {
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose, onPrev, onNext])

  if (index === null) return null
  const foto = fotos[index]
  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-4 text-white text-3xl hover:text-institucional-amarillo"
        onClick={onClose}
        aria-label="Cerrar"
      >✕</button>

      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-5xl hover:text-institucional-amarillo px-4"
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        aria-label="Anterior"
      >‹</button>

      <img
        src={`${import.meta.env.BASE_URL}${foto}`}
        alt={`Foto ${index + 1}`}
        className="max-w-full max-h-full object-contain"
        onClick={(e) => e.stopPropagation()}
      />

      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-5xl hover:text-institucional-amarillo px-4"
        onClick={(e) => { e.stopPropagation(); onNext() }}
        aria-label="Siguiente"
      >›</button>

      <div className="absolute bottom-4 left-0 right-0 text-center text-white text-sm">
        {index + 1} / {fotos.length}
      </div>
    </div>
  )
}

export default function Galeria() {
  const materias = Object.keys(galeriaData)
  const [materiaActiva, setMateriaActiva] = useState(materias[0] || null)
  const [lightboxIndex, setLightboxIndex] = useState(null)

  if (!materiaActiva) {
    return (
      <div className="card text-center">
        No hay fotos de clases aún.
      </div>
    )
  }

  const fotos = galeriaData[materiaActiva].fotos

  function abrir(i) { setLightboxIndex(i) }
  function cerrar() { setLightboxIndex(null) }
  function prev() { setLightboxIndex((i) => (i - 1 + fotos.length) % fotos.length) }
  function next() { setLightboxIndex((i) => (i + 1) % fotos.length) }

  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-3xl md:text-4xl font-display font-bold text-institucional-verdeOscuro">
          Galería del tercer periodo
        </h1>
        <p className="mt-2 text-gray-700">
          Fotos del tablero y de los cuadernos que trabajamos en clase, agrupadas por materia.
        </p>
      </section>

      <div className="flex flex-wrap gap-2">
        {materias.map((m) => (
          <button
            key={m}
            onClick={() => { setMateriaActiva(m); setLightboxIndex(null) }}
            className={`px-4 py-2 rounded-full font-semibold text-sm transition-colors ${
              materiaActiva === m
                ? 'bg-institucional-verde text-white'
                : 'bg-white text-gray-700 hover:bg-institucional-crema'
            }`}
          >
            {m} <span className="opacity-70">({galeriaData[m].total})</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {fotos.map((f, i) => (
          <button
            key={i}
            onClick={() => abrir(i)}
            className="aspect-square rounded-2xl overflow-hidden shadow-soft hover:shadow-card hover:-translate-y-1 transition-all bg-white"
          >
            <img
              src={`${import.meta.env.BASE_URL}${f}`}
              alt={`${materiaActiva} ${i + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      <Lightbox
        fotos={fotos}
        index={lightboxIndex}
        onClose={cerrar}
        onPrev={prev}
        onNext={next}
      />
    </div>
  )
}
