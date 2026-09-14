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

// 10 puntos por acierto + 50 de bonus si tuvo perfecta
export function calcularPuntos(aciertos, total) {
  const base = aciertos * 10
  const bonus = total > 0 && aciertos === total ? 50 : 0
  return base + bonus
}

// Guarda una partida y devuelve todo lo relevante para animar:
// puntos, medallas nuevas, trofeos nuevos, evento de racha, etc.
// materia: 'matematicas' | 'castellano' | 'sociales' | 'naturales'
export async function guardarPartida({ hash, nombre, juegoId, juegoNombre, materia, aciertos, total }) {
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
    puntosTotal: increment(puntos),
    partidasTotal: increment(1),
    ultimaFecha: serverTimestamp(),
    ultimaFechaJuego: hoy,
    racha: estadoRacha.racha,
    rachaMax: estadoRacha.rachaMax,
    escudos: escudosFinales,
  }
  if (materia) {
    datosEstudiante[`puntosPorMateria.${materia}`] = increment(puntos)
    datosEstudiante[`partidasPorMateria.${materia}`] = increment(1)
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
