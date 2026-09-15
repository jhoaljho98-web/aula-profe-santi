// Reproduce efectos de sonido de los juegos con un cache de <audio>.
// Silencio suave si el navegador bloquea autoplay.
const CACHE = {}
const BASE = import.meta.env.BASE_URL

function crear(nombre) {
  const a = new Audio(`${BASE}sonidos/${nombre}.mp3`)
  a.preload = 'auto'
  return a
}

function reproducir(nombre) {
  try {
    // Clonar para permitir varios plays superpuestos
    if (!CACHE[nombre]) CACHE[nombre] = crear(nombre)
    const a = CACHE[nombre].cloneNode()
    a.volume = 0.6
    a.play().catch(() => {})
  } catch {}
}

function aleatorio(prefijo, cantidad) {
  const n = Math.floor(Math.random() * cantidad) + 1
  reproducir(`${prefijo}-${n}`)
}

export const sonarCorrecto = () => aleatorio('correcto', 3)
export const sonarIncorrecto = () => reproducir('incorrecto-1')
export const sonarGanaste = () => aleatorio('ganaste', 3)
export const sonarMedalla = () => reproducir('medalla')
