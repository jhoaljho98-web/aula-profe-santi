import QuizGenerico from './QuizGenerico.jsx'
import { numeroALetras, formatearCifras, aleatorio } from '../lib/numerosEs'

const POSICIONES = [
  { nombre: 'Unidades',           multiplo: 1,      pos: 0 },
  { nombre: 'Decenas',            multiplo: 10,     pos: 1 },
  { nombre: 'Centenas',           multiplo: 100,    pos: 2 },
  { nombre: 'Unidades de mil',    multiplo: 1000,   pos: 3 },
  { nombre: 'Decenas de mil',     multiplo: 10000,  pos: 4 },
  { nombre: 'Centenas de mil',    multiplo: 100000, pos: 5 },
]

function digitoEnPosicion(n, pos) {
  return Math.floor(n / Math.pow(10, pos)) % 10
}

function generarBanco() {
  const banco = []

  // ¿Qué representa el dígito X? (valor posicional)
  for (let i = 0; i < 10; i++) {
    const n = aleatorio(10000, 999999)
    const pos = aleatorio(0, 5)
    const digito = digitoEnPosicion(n, pos)
    const valor = digito * POSICIONES[pos].multiplo
    // opciones: valor real y 3 distractores en otras posiciones
    const dist = new Set([valor])
    while (dist.size < 4) {
      const p2 = aleatorio(0, 5)
      const d2 = digitoEnPosicion(n, p2)
      const v2 = d2 * POSICIONES[p2].multiplo
      if (v2 !== valor && v2 > 0) dist.add(v2)
    }
    const ops = Array.from(dist).sort(() => Math.random() - 0.5)
    banco.push({
      enunciado: `🔍 En el número ${formatearCifras(n)}, ¿cuánto vale el dígito ${digito} que está en las ${POSICIONES[pos].nombre.toLowerCase()}?`,
      pregunta: <span className="text-institucional-verdeOscuro font-black">{formatearCifras(n)}</span>,
      opciones: ops.map((v) => formatearCifras(v)),
      correcta: ops.findIndex((v) => v === valor),
    })
  }

  // ¿En qué posición está el dígito X?
  for (let i = 0; i < 8; i++) {
    const n = aleatorio(10000, 999999)
    const pos = aleatorio(0, 5)
    const digito = digitoEnPosicion(n, pos)
    const nombreCorrecto = POSICIONES[pos].nombre
    const otros = POSICIONES.filter((p) => p.pos !== pos).sort(() => Math.random() - 0.5).slice(0, 3)
    const ops = [POSICIONES[pos], ...otros].sort(() => Math.random() - 0.5)
    banco.push({
      enunciado: `📍 En el número ${formatearCifras(n)}, ¿en qué posición está el dígito ${digito}?`,
      pregunta: <span className="text-institucional-verdeOscuro font-black">{formatearCifras(n)}</span>,
      opciones: ops.map((o) => o.nombre),
      correcta: ops.findIndex((o) => o.pos === pos),
    })
  }

  // Descomposición: 12.345 = 10.000 + 2.000 + 300 + 40 + 5
  for (let i = 0; i < 8; i++) {
    const n = aleatorio(1234, 987654)
    const partes = []
    for (let p = 5; p >= 0; p--) {
      const d = digitoEnPosicion(n, p)
      if (d > 0) partes.push(d * Math.pow(10, p))
    }
    const correcto = partes.map(formatearCifras).join(' + ')
    // Distractor 1: intercambiar dos
    const partesBad = [...partes]; if (partesBad.length >= 2) { const tmp = partesBad[0]; partesBad[0] = partesBad[1] * 10; partesBad[1] = tmp / 10 }
    const bad1 = partesBad.map(formatearCifras).join(' + ')
    // Distractor 2: mismos digitos * (mismo * 10)
    const bad2 = partes.map((v, idx) => idx === 0 ? v * 10 : v).map(formatearCifras).join(' + ')
    // Distractor 3: menos partes
    const bad3 = partes.slice(1).map(formatearCifras).join(' + ')
    const ops = [correcto, bad1, bad2, bad3].sort(() => Math.random() - 0.5)
    banco.push({
      enunciado: `🧩 ¿Cómo se descompone el número ${formatearCifras(n)}?`,
      pregunta: <span className="text-institucional-verdeOscuro font-black">{formatearCifras(n)}</span>,
      opciones: ops,
      correcta: ops.findIndex((o) => o === correcto),
    })
  }

  // Composición: dado ciertas partes, ¿cuál es el número?
  for (let i = 0; i < 8; i++) {
    const n = aleatorio(1234, 987654)
    const partes = []
    for (let p = 5; p >= 0; p--) {
      const d = digitoEnPosicion(n, p)
      if (d > 0) partes.push(d * Math.pow(10, p))
    }
    const suma = partes.map(formatearCifras).join(' + ')
    // Distractores: +/-1 posición
    const dist = new Set([n])
    while (dist.size < 4) {
      const delta = [1, 10, 100, 1000, -1, -10, -100, -1000][aleatorio(0, 7)]
      const val = n + delta
      if (val > 0 && val < 1000000 && val !== n) dist.add(val)
    }
    const ops = Array.from(dist).sort(() => Math.random() - 0.5)
    banco.push({
      enunciado: `🧩 ¿Qué número se forma con ${suma}?`,
      pregunta: <span className="text-2xl">{suma}</span>,
      opciones: ops.map((v) => formatearCifras(v)),
      correcta: ops.findIndex((v) => v === n),
    })
  }

  // ¿Cuántas unidades de mil hay?
  for (let i = 0; i < 6; i++) {
    const n = aleatorio(1000, 999999)
    const um = Math.floor(n / 1000) % 10       // unidades de mil
    const dm = Math.floor(n / 10000) % 10       // decenas de mil
    const cm = Math.floor(n / 100000) % 10      // centenas de mil
    const tipo = aleatorio(0, 2)
    const [pregunta, correcta] = [
      ['unidades de mil', um],
      ['decenas de mil', dm],
      ['centenas de mil', cm],
    ][tipo]
    const dist = new Set([correcta])
    while (dist.size < 4) dist.add(aleatorio(0, 9))
    const ops = Array.from(dist).sort(() => Math.random() - 0.5)
    banco.push({
      enunciado: `🔢 ¿Cuántas ${pregunta} tiene el número ${formatearCifras(n)}?`,
      pregunta: <span className="text-institucional-verdeOscuro font-black">{formatearCifras(n)}</span>,
      opciones: ops.map((v) => String(v)),
      correcta: ops.findIndex((v) => v === correcta),
    })
  }

  return banco
}

export default function UnidadesMil({ onExit }) {
  const preguntas = generarBanco().sort(() => Math.random() - 0.5).slice(0, 15)
  return (
    <QuizGenerico
      juegoId="unidades-mil"
      juegoNombre="Unidades, decenas y centenas de mil"
      materia="matematicas"
      preguntas={preguntas}
      onExit={onExit}
    />
  )
}
