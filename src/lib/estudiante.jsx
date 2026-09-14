import { createContext, useContext, useEffect, useState } from 'react'
import notas from '../data/notas.json'
import { sha256 } from './hash'

const KEY = 'aula-profe-santi:estudiante'

const EstudianteContext = createContext(null)

export function EstudianteProvider({ children }) {
  const [estudiante, setEstudiante] = useState(() => {
    try {
      const raw = localStorage.getItem(KEY)
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    try {
      if (estudiante) localStorage.setItem(KEY, JSON.stringify(estudiante))
      else localStorage.removeItem(KEY)
    } catch {}
  }, [estudiante])

  async function iniciarSesion(documento) {
    const doc = String(documento).trim()
    if (!doc) return { ok: false, error: 'Escribe tu número de documento.' }
    const hash = await sha256(doc)
    const encontrado = notas.estudiantes?.[hash]
    if (!encontrado) {
      return { ok: false, error: 'No encontramos ese documento. Revisa que esté bien escrito.' }
    }
    // Docente no juega — que el profe use la vista admin
    if (hash === notas.docente_hash) {
      return { ok: false, error: 'Los juegos son para los estudiantes 😊' }
    }
    setEstudiante({ hash, nombre: encontrado.nombre })
    return { ok: true, hash, nombre: encontrado.nombre }
  }

  function cerrarSesion() {
    setEstudiante(null)
  }

  return (
    <EstudianteContext.Provider value={{ estudiante, iniciarSesion, cerrarSesion }}>
      {children}
    </EstudianteContext.Provider>
  )
}

export function useEstudiante() {
  const ctx = useContext(EstudianteContext)
  if (!ctx) throw new Error('useEstudiante fuera de EstudianteProvider')
  return ctx
}
