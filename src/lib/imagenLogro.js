// Genera una imagen de victoria en Canvas para descargar/compartir.
// Devuelve un dataURL JPEG.

const MENSAJES = [
  '¡El esfuerzo siempre da frutos!',
  '¡Sigue así, vas por buen camino!',
  '¡Tu dedicación se nota!',
  '¡Eres una estrella en crecimiento!',
  '¡La constancia te lleva lejos!',
  '¡Cada partida te hace mejor!',
  '¡Sigue jugando, sigue aprendiendo!',
  '¡Estamos orgullosos de ti!',
]

function envuelveTexto(ctx, texto, x, y, maxAncho, altoLinea) {
  const palabras = texto.split(' ')
  let linea = ''
  const lineas = []
  for (const p of palabras) {
    const test = linea ? `${linea} ${p}` : p
    if (ctx.measureText(test).width > maxAncho && linea) {
      lineas.push(linea)
      linea = p
    } else {
      linea = test
    }
  }
  if (linea) lineas.push(linea)
  const totalAlto = lineas.length * altoLinea
  let cy = y - (totalAlto - altoLinea) / 2
  for (const l of lineas) {
    ctx.fillText(l, x, cy)
    cy += altoLinea
  }
}

async function cargarImagen(url) {
  return new Promise((resolve) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = () => resolve(null)
    img.src = url
  })
}

// tipo: 'medalla' | 'trofeo'
export async function generarImagenLogro({ nombre, fotoUrl, logroNombre, logroIcono, tipo, color }) {
  const canvas = document.createElement('canvas')
  const W = 1080
  const H = 1350
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')

  // Fondo con degradado
  const grad = ctx.createLinearGradient(0, 0, 0, H)
  grad.addColorStop(0, color || '#2E7D32')
  grad.addColorStop(1, '#1B5E20')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, W, H)

  // Confeti / círculos decorativos
  ctx.globalAlpha = 0.15
  for (let i = 0; i < 25; i++) {
    ctx.fillStyle = ['#FFC107', '#FFEB3B', '#4CAF50', '#00BCD4', '#FFF'][i % 5]
    ctx.beginPath()
    ctx.arc(Math.random() * W, Math.random() * H, Math.random() * 40 + 10, 0, Math.PI * 2)
    ctx.fill()
  }
  ctx.globalAlpha = 1

  // Header
  ctx.fillStyle = 'rgba(255,255,255,0.9)'
  ctx.font = 'bold 34px sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'top'
  ctx.fillText('AULA DEL PROFE SANTI', W / 2, 60)
  ctx.fillStyle = 'rgba(255,255,255,0.7)'
  ctx.font = '26px sans-serif'
  ctx.fillText('IE El Llano · Grado 2B', W / 2, 105)

  // Foto (círculo)
  const fotoSize = 320
  const fotoX = W / 2 - fotoSize / 2
  const fotoY = 190
  let img = null
  if (fotoUrl) img = await cargarImagen(fotoUrl)

  ctx.save()
  ctx.beginPath()
  ctx.arc(W / 2, fotoY + fotoSize / 2, fotoSize / 2, 0, Math.PI * 2)
  ctx.clip()
  if (img) {
    ctx.drawImage(img, fotoX, fotoY, fotoSize, fotoSize)
  } else {
    ctx.fillStyle = '#4CAF50'
    ctx.fillRect(fotoX, fotoY, fotoSize, fotoSize)
    ctx.fillStyle = 'white'
    ctx.font = 'bold 180px sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText((nombre || '?').trim().charAt(0).toUpperCase(), W / 2, fotoY + fotoSize / 2)
  }
  ctx.restore()
  ctx.strokeStyle = 'white'
  ctx.lineWidth = 14
  ctx.beginPath()
  ctx.arc(W / 2, fotoY + fotoSize / 2, fotoSize / 2, 0, Math.PI * 2)
  ctx.stroke()

  // Nombre estudiante
  ctx.fillStyle = 'white'
  ctx.font = 'bold 52px sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'top'
  envuelveTexto(ctx, nombre, W / 2, fotoY + fotoSize + 40, W - 100, 60)

  // Banner "¡Nueva medalla!" / "¡Nuevo trofeo!"
  const bannerY = 680
  ctx.fillStyle = '#FFEB3B'
  ctx.font = 'bold 44px sans-serif'
  ctx.textAlign = 'center'
  const bannerTexto = tipo === 'trofeo' ? '¡NUEVO TROFEO DE RACHA!' : '¡NUEVA MEDALLA!'
  ctx.fillText(bannerTexto, W / 2, bannerY)

  // Icono del logro
  ctx.font = '240px sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText(logroIcono, W / 2, bannerY + 60)

  // Nombre del logro
  ctx.fillStyle = 'white'
  ctx.font = 'bold 90px sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText(logroNombre, W / 2, bannerY + 340)

  // Mensaje motivacional
  ctx.fillStyle = 'rgba(255,255,255,0.95)'
  ctx.font = 'italic 34px sans-serif'
  ctx.textAlign = 'center'
  const mensaje = MENSAJES[Math.floor(Math.random() * MENSAJES.length)]
  envuelveTexto(ctx, mensaje, W / 2, bannerY + 460, W - 120, 44)

  // Marca de agua abajo a la derecha
  ctx.fillStyle = 'rgba(255,255,255,0.75)'
  ctx.font = 'bold 24px sans-serif'
  ctx.textAlign = 'right'
  ctx.fillText('🌟 aula-profe-santi', W - 40, H - 60)

  return canvas.toDataURL('image/jpeg', 0.9)
}
