import { hablarEn } from '../lib/hablar'

// Texto en inglés con botón de escuchar al lado.
// Usar como opción o dentro del enunciado.
export default function PalabraAudio({ texto, size = 'md' }) {
  const cls = size === 'lg' ? 'text-2xl' : 'text-base md:text-lg'
  return (
    <span className={`inline-flex items-center gap-2 ${cls}`}>
      <span>{texto}</span>
      <button
        onClick={(e) => { e.stopPropagation(); e.preventDefault(); hablarEn(texto) }}
        className="text-sm bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center shadow"
        title="Escuchar"
        type="button"
      >
        🔊
      </button>
    </span>
  )
}
