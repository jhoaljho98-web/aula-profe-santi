// Pronunciar texto usando la API del navegador (Web Speech).
// Silenciosa si no está disponible.
export function hablar(texto, lang = 'en-US') {
  try {
    if (!('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(texto)
    u.lang = lang
    u.rate = 0.85
    u.volume = 0.8
    // Preferir voz nativa del idioma si existe
    const voces = window.speechSynthesis.getVoices()
    const voz = voces.find((v) => v.lang.startsWith(lang.split('-')[0]))
    if (voz) u.voice = voz
    window.speechSynthesis.speak(u)
  } catch {}
}

export const hablarEn = (texto) => hablar(texto, 'en-US')
export const hablarEs = (texto) => hablar(texto, 'es-CO')
