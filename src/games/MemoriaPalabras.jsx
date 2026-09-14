import { useEffect, useState } from 'react'
import palabras from '../data/palabras.json'
import ResultadoPuntos from '../components/ResultadoPuntos.jsx'

const CANTIDAD_PAREJAS = 6

function preparar(modo) {
  const fuente = modo === 'sinonimos' ? palabras.sinonimos : palabras.antonimos
  // Escoger n parejas aleatorias
  const mezcladas = [...fuente].sort(() => Math.random() - 0.5).slice(0, CANTIDAD_PAREJAS)
  const cartas = []
  mezcladas.forEach((par, i) => {
    cartas.push({ id: `${i}-0`, parejaId: i, palabra: par[0] })
    cartas.push({ id: `${i}-1`, parejaId: i, palabra: par[1] })
  })
  return cartas.sort(() => Math.random() - 0.5)
}

export default function MemoriaPalabras({ onExit }) {
  const [modo, setModo] = useState('sinonimos')  // 'sinonimos' | 'antonimos'
  const [cartas, setCartas] = useState(() => preparar('sinonimos'))
  const [volteadas, setVolteadas] = useState([])
  const [emparejadas, setEmparejadas] = useState([])
  const [intentos, setIntentos] = useState(0)
  const [ganado, setGanado] = useState(false)

  function cambiarModo(nuevoModo) {
    setModo(nuevoModo)
    setCartas(preparar(nuevoModo))
    setVolteadas([])
    setEmparejadas([])
    setIntentos(0)
    setGanado(false)
  }

  function reiniciar() {
    setCartas(preparar(modo))
    setVolteadas([])
    setEmparejadas([])
    setIntentos(0)
    setGanado(false)
  }

  function clickCarta(carta) {
    if (volteadas.length >= 2) return
    if (volteadas.some(c => c.id === carta.id)) return
    if (emparejadas.includes(carta.parejaId)) return
    const nuevas = [...volteadas, carta]
    setVolteadas(nuevas)
    if (nuevas.length === 2) {
      setIntentos(i => i + 1)
      if (nuevas[0].parejaId === nuevas[1].parejaId) {
        setTimeout(() => {
          setEmparejadas(e => [...e, nuevas[0].parejaId])
          setVolteadas([])
        }, 700)
      } else {
        setTimeout(() => setVolteadas([]), 1100)
      }
    }
  }

  useEffect(() => {
    if (emparejadas.length === CANTIDAD_PAREJAS && !ganado) setGanado(true)
  }, [emparejadas, ganado])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <button onClick={onExit} className="text-institucional-verdeOscuro font-semibold hover:underline">
          ← Volver
        </button>
        <div className="flex gap-2">
          <button
            onClick={() => cambiarModo('sinonimos')}
            className={`px-3 py-1 rounded-full text-sm font-semibold ${modo === 'sinonimos' ? 'bg-institucional-verde text-white' : 'bg-white text-gray-700'}`}
          >
            Sinónimos
          </button>
          <button
            onClick={() => cambiarModo('antonimos')}
            className={`px-3 py-1 rounded-full text-sm font-semibold ${modo === 'antonimos' ? 'bg-institucional-verde text-white' : 'bg-white text-gray-700'}`}
          >
            Antónimos
          </button>
        </div>
        <div className="text-sm font-semibold text-gray-600">
          Intentos: {intentos} · Parejas: {emparejadas.length}/{CANTIDAD_PAREJAS}
        </div>
      </div>

      {ganado ? (
        <div className="card text-center py-8">
          <div className="text-7xl mb-4">🎉</div>
          <h2 className="font-display font-bold text-3xl text-institucional-verdeOscuro mb-2">
            ¡Encontraste todas las parejas!
          </h2>
          <p className="text-lg text-gray-700 mb-4">Lo lograste en {intentos} intentos.</p>
          <div className="mb-6">
            <ResultadoPuntos
              juegoId="memoria-palabras"
              juegoNombre="Memoria de palabras"
              aciertos={Math.max(0, CANTIDAD_PAREJAS * 2 - Math.max(0, intentos - CANTIDAD_PAREJAS))}
              total={CANTIDAD_PAREJAS * 2}
            />
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <button onClick={reiniciar} className="btn-primary">Jugar otra vez</button>
            <button onClick={onExit} className="btn-secondary">Volver</button>
          </div>
        </div>
      ) : (
        <>
          <p className="text-center text-gray-700">
            Encuentra las parejas de {modo === 'sinonimos' ? 'palabras que significan lo mismo' : 'palabras opuestas'}.
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {cartas.map((c) => {
              const abierta = volteadas.some(v => v.id === c.id) || emparejadas.includes(c.parejaId)
              const acertada = emparejadas.includes(c.parejaId)
              return (
                <button
                  key={c.id}
                  onClick={() => clickCarta(c)}
                  className={`aspect-square rounded-2xl shadow-soft text-lg sm:text-xl font-bold font-display flex items-center justify-center transition-all ${
                    acertada
                      ? 'bg-institucional-verdeClaro text-white'
                      : abierta
                        ? 'bg-institucional-amarillo text-gray-900'
                        : 'bg-institucional-verde text-white hover:bg-institucional-verdeOscuro'
                  }`}
                >
                  {abierta ? c.palabra : '?'}
                </button>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
