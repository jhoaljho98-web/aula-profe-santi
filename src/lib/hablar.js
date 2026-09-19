// Pronunciar texto usando la API del navegador (Web Speech).
// Silenciosa si no está disponible.
// Voces amigables para niños (según sistema operativo/navegador)
const RE_INFANTIL = /child|kid|niño|niña|junior/i
const RE_FEMENINA_EN = /female|woman|karen|samantha|zira|tessa|susan|allison|serena|kate|princess|linda|helena/i
// Voces de español LATINO (México, Colombia, EEUU-hispano)
const RE_ES_LATINO_LANG = /^es-(419|mx|co|us|ar|cl|pe|ve|cr|do|pa|py|uy|bo|ec|ni|hn|sv|gt|pr|cu)$/i
const RE_ES_LATINO_VOZ = /sabina|paulina|jorge|juan|monica-mx|helena|estados unidos|latino|latin|méxico|mexicano|mexican|colombia|americ/i

function esLatino(v) {
  return RE_ES_LATINO_LANG.test(v.lang) || RE_ES_LATINO_VOZ.test(v.name)
}

export function hablar(texto, lang = 'en-US') {
  try {
    if (!('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(texto)
    u.rate = 0.85
    u.volume = 1.0  // volumen máximo
    u.pitch = 1.5   // pitch alto = voz más infantil/amigable

    const voces = window.speechSynthesis.getVoices()
    const codigo = lang.split('-')[0]
    const mismoIdioma = voces.filter((v) => v.lang.toLowerCase().startsWith(codigo))

    let vozElegida = null
    if (codigo === 'es') {
      // Español: preferir Latino sobre España
      const latino = mismoIdioma.filter(esLatino)
      const infantilLat = latino.find((v) => RE_INFANTIL.test(v.name))
      const cualquierLat = latino[0]
      const infantilEs = mismoIdioma.find((v) => RE_INFANTIL.test(v.name))
      vozElegida = infantilLat || cualquierLat || infantilEs || mismoIdioma[0] || null
      // Ajustar lang a la voz para que coincida
      u.lang = vozElegida?.lang || 'es-419'
    } else {
      const infantil = mismoIdioma.find((v) => RE_INFANTIL.test(v.name))
      const femenina = mismoIdioma.find((v) => RE_FEMENINA_EN.test(v.name))
      vozElegida = infantil || femenina || mismoIdioma[0] || null
      u.lang = vozElegida?.lang || lang
    }
    if (vozElegida) u.voice = vozElegida

    window.speechSynthesis.speak(u)
  } catch {}
}

export const hablarEn = (texto) => hablar(texto, 'en-US')
export const hablarEs = (texto) => hablar(texto, 'es-CO')
