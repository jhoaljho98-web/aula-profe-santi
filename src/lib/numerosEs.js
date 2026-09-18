// Convierte 0..999.999 a palabras en español.
const U = ['cero','uno','dos','tres','cuatro','cinco','seis','siete','ocho','nueve']
const D10_19 = ['diez','once','doce','trece','catorce','quince','dieciséis','diecisiete','dieciocho','diecinueve']
const D20_29 = ['veinte','veintiuno','veintidós','veintitrés','veinticuatro','veinticinco','veintiséis','veintisiete','veintiocho','veintinueve']
const DEC = ['','','veinte','treinta','cuarenta','cincuenta','sesenta','setenta','ochenta','noventa']
const CEN = ['','ciento','doscientos','trescientos','cuatrocientos','quinientos','seiscientos','setecientos','ochocientos','novecientos']

// 0..999
function centenasALetras(n) {
  if (n === 0) return ''
  if (n === 100) return 'cien'
  const c = Math.floor(n / 100)
  const r = n % 100
  const partes = []
  if (c > 0) partes.push(CEN[c])
  if (r === 0) {
    // nada
  } else if (r < 10) partes.push(U[r])
  else if (r < 20) partes.push(D10_19[r - 10])
  else if (r < 30) partes.push(D20_29[r - 20])
  else {
    const dec = Math.floor(r / 10)
    const uni = r % 10
    if (uni === 0) partes.push(DEC[dec])
    else partes.push(`${DEC[dec]} y ${U[uni]}`)
  }
  return partes.join(' ')
}

export function numeroALetras(n) {
  if (n === 0) return 'cero'
  if (n < 1000) return centenasALetras(n)
  const miles = Math.floor(n / 1000)
  const resto = n % 1000
  let partes = []
  if (miles === 1) partes.push('mil')
  else partes.push(`${centenasALetras(miles)} mil`)
  if (resto > 0) partes.push(centenasALetras(resto))
  return partes.join(' ')
}

export function formatearCifras(n) {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

export function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
