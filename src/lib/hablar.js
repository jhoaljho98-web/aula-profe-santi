// Pronunciar texto usando la API del navegador (Web Speech).
// Silenciosa si no está disponible.
// Nombres de voces amigables para niños (por sistema operativo)
const RE_INFANTIL = /child|kid|niño|niña|junior/i
const RE_FEMENINA_AMABLE = /female|woman|karen|samantha|zira|tessa|susan|allison|serena|kate|princess|linda|helena|paulina/i

export function hablar(texto, lang = 'en-US') {
  try {
    if (!('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(texto)
    u.lang = lang
    u.rate = 0.85
    u.volume = 0.9
    // Pitch más alto para sonar más infantil/amigable
    u.pitch = 1.4

    const voces = window.speechSynthesis.getVoices()
    const preferidas = voces.filter((v) => v.lang.startsWith(lang.split('-')[0]))
    // Prioridad: voz infantil explícita → voz femenina amable → cualquiera
    const infantil = preferidas.find((v) => RE_INFANTIL.test(v.name))
    const femenina = preferidas.find((v) => RE_FEMENINA_AMABLE.test(v.name))
    u.voice = infantil || femenina || preferidas[0] || null

    window.speechSynthesis.speak(u)
  } catch {}
}

export const hablarEn = (texto) => hablar(texto, 'en-US')
export const hablarEs = (texto) => hablar(texto, 'es-CO')
