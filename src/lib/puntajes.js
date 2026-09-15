import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  increment,
} from 'firebase/firestore'
import { db, firebaseHabilitado } from './firebase'
import {
  medallasGanadas,
  trofeosGanados,
  actualizarRacha,
  fechaLocal,
  TROFEOS_RACHA,
} from './logros'

// Mapeo juegoId -> materia (para migrar historicos donde no se guardo)
const JUEGO_A_MATERIA = {
  'tablas-batalla': 'matematicas',
  'numeros-magicos': 'matematicas',
  'memoria-palabras': 'castellano',
  'partes-oracion': 'castellano',
  'silabas-trabadas': 'castellano',
  'reto-lectura': 'castellano',
}

// Migra un estudiante: reconstruye puntosPorMateria/partidasPorMateria
// a partir de su subcoleccion juegos, escala para que sume puntosTotal.
// Marca _migradoV2=true para no repetir. Devuelve true si migro algo.
async function migrarEstudiante(hash, data) {
  if (data._migradoV2) return false
  const juegosSnap = await getDocs(collection(db, 'estudiantes', hash, 'juegos'))
  if (juegosSnap.empty) {
    await setDoc(doc(db, 'estudiantes', hash), { _migradoV2: true }, { merge: true })
    return false
  }
  const puntosPorMateria = {}
  const partidasPorMateria = {}
  let pesoTotal = 0
  juegosSnap.forEach((j) => {
    const jd = j.data()
    const materia = jd.materia ?? JUEGO_A_MATERIA[jd.juegoId] ?? null
    if (!materia) return
    const veces = jd.vecesJugado ?? 0
    const mejor = jd.mejorPuntaje ?? 0
    const peso = mejor * veces
    puntosPorMateria[materia] = (puntosPorMateria[materia] ?? 0) + peso
    partidasPorMateria[materia] = (partidasPorMateria[materia] ?? 0) + veces
    pesoTotal += peso
  })
  // Escalar a puntosTotal para que sume exacto
  const total = data.puntosTotal ?? 0
  if (pesoTotal > 0 && total > 0) {
    const factor = total / pesoTotal
    Object.keys(puntosPorMateria).forEach((m) => {
      puntosPorMateria[m] = Math.round(puntosPorMateria[m] * factor)
    })
  }
  await setDoc(
    doc(db, 'estudiantes', hash),
    { puntosPorMateria, partidasPorMateria, _migradoV2: true },
    { merge: true },
  )
  return true
}

// Estudiantes cuyo documento cambio y tienen datos huerfanos bajo
// el hash antiguo. Fusiona (suma) al hash nuevo.
const HASHES_LEGADOS = [
  {
    // Ambar Valentina Gutierrez Corona: doc paso de "0" a "7048876"
    viejo: '5feceb66ffc86f38d952786c6d696c79c2dbc239dd4e91b46729d73a27fb57e9',
    nuevo: '40232ef415c0abd2c919484397aee2ac08d976d3a8a2c11f60c3c5d5d5398b51',
    nombre: 'Gutierrez Corona Ambar Valentina',
  },
]

export async function migrarHashesLegados() {
  if (!firebaseHabilitado || !db) return { ok: false }
  const resultados = []
  for (const m of HASHES_LEGADOS) {
    const refViejo = doc(db, 'estudiantes', m.viejo)
    const refNuevo = doc(db, 'estudiantes', m.nuevo)
    const snapViejo = await getDoc(refViejo)
    if (!snapViejo.exists()) { resultados.push({ nombre: m.nombre, motivo: 'sin datos viejos' }); continue }
    const dv = snapViejo.data()
    const snapNuevo = await getDoc(refNuevo)
    const dn = snapNuevo.exists() ? snapNuevo.data() : {}
    const sumaMap = (a, b) => {
      const out = { ...a }
      for (const [k, v] of Object.entries(b || {})) out[k] = (out[k] ?? 0) + v
      return out
    }
    await setDoc(refNuevo, {
      nombre: m.nombre,
      foto: dn.foto ?? dv.foto ?? null,
      puntosTotal: (dn.puntosTotal ?? 0) + (dv.puntosTotal ?? 0),
      partidasTotal: (dn.partidasTotal ?? 0) + (dv.partidasTotal ?? 0),
      puntosPorMateria: sumaMap(dn.puntosPorMateria, dv.puntosPorMateria),
      partidasPorMateria: sumaMap(dn.partidasPorMateria, dv.partidasPorMateria),
      racha: Math.max(dn.racha ?? 0, dv.racha ?? 0),
      rachaMax: Math.max(dn.rachaMax ?? 0, dv.rachaMax ?? 0),
      escudos: Math.max(dn.escudos ?? 1, dv.escudos ?? 1),
      _migradoV2: true,
    }, { merge: true })
    // Copiar juegos
    const juegosViejos = await getDocs(collection(db, 'estudiantes', m.viejo, 'juegos'))
    for (const j of juegosViejos.docs) {
      const jd = j.data()
      const refJnuevo = doc(db, 'estudiantes', m.nuevo, 'juegos', j.id)
      const snapJn = await getDoc(refJnuevo)
      const jdn = snapJn.exists() ? snapJn.data() : {}
      await setDoc(refJnuevo, {
        ...jd,
        mejorPuntaje: Math.max(jd.mejorPuntaje ?? 0, jdn.mejorPuntaje ?? 0),
        vecesJugado: (jd.vecesJugado ?? 0) + (jdn.vecesJugado ?? 0),
      }, { merge: true })
    }
    // Marcar el viejo como fusionado (no se borra por seguridad)
    await setDoc(refViejo, { _fusionadoEn: m.nuevo }, { merge: true })
    resultados.push({ nombre: m.nombre, ok: true, puntos: (dn.puntosTotal ?? 0) + (dv.puntosTotal ?? 0) })
  }
  return { ok: true, resultados }
}

// Migra a todos los estudiantes que aun no lo esten. Corre en paralelo
// pero con limite pequeno para no saturar.
export async function migrarHistorico() {
  if (!firebaseHabilitado || !db) return { ok: false }
  const snap = await getDocs(collection(db, 'estudiantes'))
  let migrados = 0
  for (const d of snap.docs) {
    const cambio = await migrarEstudiante(d.id, d.data())
    if (cambio) migrados++
  }
  return { ok: true, migrados, revisados: snap.docs.length }
}

// 10 puntos por acierto + 50 de bonus si tuvo perfecta
export function calcularPuntos(aciertos, total) {
  const base = aciertos * 10
  const bonus = total > 0 && aciertos === total ? 50 : 0
  return base + bonus
}

// Guarda una partida y devuelve todo lo relevante para animar:
// puntos, medallas nuevas, trofeos nuevos, evento de racha, etc.
// materia: 'matematicas' | 'castellano' | 'sociales' | 'naturales'
export async function guardarPartida({ hash, nombre, foto, juegoId, juegoNombre, materia, aciertos, total }) {
  const puntos = calcularPuntos(aciertos, total)
  const resultado = {
    puntos,
    medallasNuevas: [],
    trofeosNuevos: [],
    eventoRacha: null,
    racha: 0,
    escudos: 1,
    escudoGanado: false,
  }

  if (!firebaseHabilitado || !db) {
    return resultado
  }

  const refEstudiante = doc(db, 'estudiantes', hash)
  const refJuego = doc(db, 'estudiantes', hash, 'juegos', juegoId)

  // Estado previo del estudiante
  let estadoPrevio = {}
  try {
    const snap = await getDoc(refEstudiante)
    if (snap.exists()) estadoPrevio = snap.data()
  } catch {}

  // Mejor puntaje previo del juego
  let mejorAnterior = 0
  try {
    const snap = await getDoc(refJuego)
    if (snap.exists()) mejorAnterior = snap.data().mejorPuntaje ?? 0
  } catch {}
  const nuevoMejor = Math.max(mejorAnterior, puntos)

  // --- Calcular racha ---
  const hoy = fechaLocal()
  const estadoRacha = actualizarRacha(
    {
      ultimaFecha: estadoPrevio.ultimaFechaJuego,
      racha: estadoPrevio.racha,
      rachaMax: estadoPrevio.rachaMax,
      escudos: estadoPrevio.escudos,
    },
    hoy,
  )

  // --- Detectar nuevos trofeos de racha (por rachaMax) ---
  const trofeosPrevios = trofeosGanados(estadoPrevio.rachaMax ?? 0)
  const trofeosAhora = trofeosGanados(estadoRacha.rachaMax)
  const trofeosNuevos = trofeosAhora.filter(
    (t) => !trofeosPrevios.find((p) => p.id === t.id),
  )

  // Cada trofeo nuevo de racha te da un escudo extra (máx 3)
  let escudosFinales = estadoRacha.escudos
  const escudoGanado = trofeosNuevos.length > 0
  if (escudoGanado) {
    escudosFinales = Math.min(3, escudosFinales + trofeosNuevos.length)
  }

  // --- Detectar nuevas medallas (por puntosTotal) ---
  const puntosPrevios = estadoPrevio.puntosTotal ?? 0
  const puntosNuevos = puntosPrevios + puntos
  const medallasPrevias = medallasGanadas(puntosPrevios)
  const medallasAhora = medallasGanadas(puntosNuevos)
  const medallasNuevas = medallasAhora.filter(
    (m) => !medallasPrevias.find((p) => p.id === m.id),
  )

  // --- Escribir juego ---
  await setDoc(
    refJuego,
    {
      juegoId,
      juegoNombre,
      materia: materia ?? null,
      mejorPuntaje: nuevoMejor,
      ultimaPartida: puntos,
      vecesJugado: increment(1),
      ultimaFecha: serverTimestamp(),
    },
    { merge: true },
  )

  // --- Escribir estudiante ---
  const datosEstudiante = {
    nombre,
    foto: foto ?? null,
    puntosTotal: increment(puntos),
    partidasTotal: increment(1),
    ultimaFecha: serverTimestamp(),
    ultimaFechaJuego: hoy,
    racha: estadoRacha.racha,
    rachaMax: estadoRacha.rachaMax,
    escudos: escudosFinales,
  }
  if (materia) {
    // Objeto anidado (con merge:true) para que el increment aplique
    // al campo nested. Firebase JS trata las claves con "." como
    // literales dentro de setDoc, no como paths — por eso usamos objetos.
    datosEstudiante.puntosPorMateria = { [materia]: increment(puntos) }
    datosEstudiante.partidasPorMateria = { [materia]: increment(1) }
  }
  await setDoc(refEstudiante, datosEstudiante, { merge: true })

  return {
    puntos,
    medallasNuevas,
    trofeosNuevos,
    eventoRacha: estadoRacha.evento,
    racha: estadoRacha.racha,
    escudos: escudosFinales,
    escudoGanado,
  }
}

export async function leerPodio(tope = 20) {
  if (!firebaseHabilitado || !db) return []
  const q = query(collection(db, 'estudiantes'), orderBy('puntosTotal', 'desc'), limit(tope))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ hash: d.id, ...d.data() }))
}

export async function leerPodioPorMateria(materia, tope = 20) {
  if (!firebaseHabilitado || !db) return []
  const campo = `puntosPorMateria.${materia}`
  const q = query(collection(db, 'estudiantes'), orderBy(campo, 'desc'), limit(tope))
  const snap = await getDocs(q)
  return snap.docs
    .map((d) => ({ hash: d.id, ...d.data() }))
    .filter((e) => (e.puntosPorMateria?.[materia] ?? 0) > 0)
}

export async function leerMisEstadisticas(hash) {
  if (!firebaseHabilitado || !db) return null
  const refEst = doc(db, 'estudiantes', hash)
  const snap = await getDoc(refEst)
  if (!snap.exists()) return null
  const base = snap.data()

  const juegosSnap = await getDocs(collection(db, 'estudiantes', hash, 'juegos'))
  const juegos = {}
  juegosSnap.forEach((d) => {
    juegos[d.id] = d.data()
  })
  return { ...base, juegos }
}
