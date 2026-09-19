// =============================================================
// Medallas por puntaje acumulado
// =============================================================
export const MEDALLAS = [
  { id: 'hierro',     nombre: 'Hierro',     icono: '⚙️',  min: 100,     color: '#78716c' },
  { id: 'bronce',     nombre: 'Bronce',     icono: '🥉',  min: 500,     color: '#a16207' },
  { id: 'plata',      nombre: 'Plata',      icono: '🥈',  min: 1000,    color: '#94a3b8' },
  { id: 'oro',        nombre: 'Oro',        icono: '🥇',  min: 2000,    color: '#f59e0b' },
  { id: 'rubi',       nombre: 'Rubí',       icono: '❤️',  min: 5000,    color: '#dc2626' },
  { id: 'esmeralda',  nombre: 'Esmeralda',  icono: '💚',  min: 10000,   color: '#16a34a' },
  { id: 'zafiro',     nombre: 'Zafiro',     icono: '💙',  min: 20000,   color: '#2563eb' },
  { id: 'amatista',   nombre: 'Amatista',   icono: '💜',  min: 50000,   color: '#9333ea' },
  { id: 'diamante',   nombre: 'Diamante',   icono: '💎',  min: 100000,  color: '#06b6d4' },
  { id: 'opalo',      nombre: 'Ópalo',      icono: '💠',  min: 200000,  color: '#0ea5e9' },
  { id: 'estrella',   nombre: 'Estrella',   icono: '🌟',  min: 400000,  color: '#facc15' },
  { id: 'galaxia',    nombre: 'Galaxia',    icono: '🌌',  min: 750000,  color: '#4c1d95' },
  { id: 'mitico',     nombre: 'Mítico',     icono: '🔮',  min: 1500000, color: '#c026d3' },
  { id: 'legendario', nombre: 'Legendario', icono: '👑',  min: 3000000, color: '#eab308' },
]

export function medallasGanadas(puntos) {
  return MEDALLAS.filter((m) => puntos >= m.min)
}

export function medallaActual(puntos) {
  const ganadas = medallasGanadas(puntos)
  return ganadas.length > 0 ? ganadas[ganadas.length - 1] : null
}

export function siguienteMedalla(puntos) {
  return MEDALLAS.find((m) => puntos < m.min) ?? null
}

// =============================================================
// Trofeos por racha de días
// =============================================================
export const TROFEOS_RACHA = [
  { id: 'chispita',  nombre: 'Chispita',       icono: '🔥',  min: 3   },
  { id: 'semanita',  nombre: 'Semanita',       icono: '🌱',  min: 7   },
  { id: 'quincena',  nombre: 'Quincena',       icono: '🌿',  min: 14  },
  { id: 'mes',       nombre: 'Mes constante',  icono: '🌳',  min: 30  },
  { id: 'cohete',    nombre: 'Cohete',         icono: '🚀',  min: 60  },
  { id: 'cien',      nombre: 'Cien días',      icono: '🏆',  min: 100 },
  { id: 'leyenda',   nombre: 'Leyenda',        icono: '👑',  min: 200 },
]

export function trofeosGanados(dias) {
  return TROFEOS_RACHA.filter((t) => dias >= t.min)
}

export function siguienteTrofeo(dias) {
  return TROFEOS_RACHA.find((t) => dias < t.min) ?? null
}

// =============================================================
// Fechas locales (evita el shift de UTC)
// =============================================================
export function fechaLocal(d = new Date()) {
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

export function diasEntre(fechaA, fechaB) {
  if (!fechaA || !fechaB) return 0
  const a = new Date(fechaA + 'T00:00:00')
  const b = new Date(fechaB + 'T00:00:00')
  return Math.round((b - a) / 86400000)
}

// =============================================================
// Actualizar racha según fecha de la última partida
// =============================================================
// Reglas:
//   diff = 0 → jugó hoy, no cambia nada
//   diff = 1 → jugó ayer, sigue la racha +1
//   diff = 2 → perdió un día. Si tiene escudo, se consume y sigue +1
//                                 Si no tiene, la racha se rompe.
//   diff >= 3 → perdió 2+ días seguidos, la racha se rompe siempre
//
// Devuelve el nuevo estado y una descripción del evento.
export function actualizarRacha({ ultimaFecha, racha, rachaMax, escudos }, hoy) {
  const rachaActual = racha ?? 0
  const rachaMaxActual = rachaMax ?? 0
  const escudosActual = escudos ?? 1  // Cada niño arranca con 1 escudo

  if (!ultimaFecha) {
    // Primera partida
    return {
      racha: 1,
      rachaMax: Math.max(rachaMaxActual, 1),
      escudos: escudosActual,
      evento: 'inicio',
    }
  }

  const diff = diasEntre(ultimaFecha, hoy)

  if (diff <= 0) {
    // Ya jugó hoy o fecha inconsistente
    return {
      racha: rachaActual,
      rachaMax: rachaMaxActual,
      escudos: escudosActual,
      evento: 'mismo-dia',
    }
  }

  if (diff === 1) {
    const nuevaRacha = rachaActual + 1
    return {
      racha: nuevaRacha,
      rachaMax: Math.max(rachaMaxActual, nuevaRacha),
      escudos: escudosActual,
      evento: 'continua',
    }
  }

  if (diff === 2 && escudosActual > 0) {
    // El escudo te salva de haber perdido 1 día
    const nuevaRacha = rachaActual + 1
    return {
      racha: nuevaRacha,
      rachaMax: Math.max(rachaMaxActual, nuevaRacha),
      escudos: escudosActual - 1,
      evento: 'escudo-usado',
    }
  }

  // Racha rota
  return {
    racha: 1,
    rachaMax: rachaMaxActual,
    escudos: escudosActual,
    evento: 'rota',
  }
}
