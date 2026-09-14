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

// Guarda una partida y actualiza el mejor puntaje si aplica.
// aciertos: número de aciertos en esta partida
// total: número total de preguntas de la partida
export async function guardarPartida({ hash, nombre, juegoId, juegoNombre, aciertos, total }) {
  if (!firebaseHabilitado || !db) {
    // Fallback local: solo devolvemos el cálculo
    return calcularPuntos(aciertos, total)
  }

  const puntos = calcularPuntos(aciertos, total)

  const refEstudiante = doc(db, 'estudiantes', hash)
  const refJuego = doc(db, 'estudiantes', hash, 'juegos', juegoId)

  // Leer mejor puntaje previo para saber si actualizamos
  let mejorAnterior = 0
  try {
    const snap = await getDoc(refJuego)
    if (snap.exists()) mejorAnterior = snap.data().mejorPuntaje ?? 0
  } catch {}

  const nuevoMejor = Math.max(mejorAnterior, puntos)

  await setDoc(
    refJuego,
    {
      juegoId,
      juegoNombre,
      mejorPuntaje: nuevoMejor,
      ultimaPartida: puntos,
      vecesJugado: increment(1),
      ultimaFecha: serverTimestamp(),
    },
    { merge: true },
  )

  await setDoc(
    refEstudiante,
    {
      nombre,
      puntosTotal: increment(puntos),
      partidasTotal: increment(1),
      ultimaFecha: serverTimestamp(),
    },
    { merge: true },
  )

  return puntos
}

// 10 puntos por acierto + 50 de bonus si tuvo perfecta
export function calcularPuntos(aciertos, total) {
  const base = aciertos * 10
  const bonus = total > 0 && aciertos === total ? 50 : 0
  return base + bonus
}

export async function leerPodio(tope = 20) {
  if (!firebaseHabilitado || !db) return []
  const q = query(collection(db, 'estudiantes'), orderBy('puntosTotal', 'desc'), limit(tope))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ hash: d.id, ...d.data() }))
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
