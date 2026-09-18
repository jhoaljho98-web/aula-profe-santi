import { useMemo, useState } from 'react'
import TablasBatalla from '../games/TablasBatalla.jsx'
import NumerosMagicos from '../games/NumerosMagicos.jsx'
import MemoriaPalabras from '../games/MemoriaPalabras.jsx'
import PartesOracion from '../games/PartesOracion.jsx'
import SilabasTrabadas from '../games/SilabasTrabadas.jsx'
import RetoLectura from '../games/RetoLectura.jsx'
import GeneroNumero from '../games/GeneroNumero.jsx'
import SistemasCuerpo from '../games/SistemasCuerpo.jsx'
import Territorio from '../games/Territorio.jsx'
import ColoresIngles from '../games/ColoresIngles.jsx'
import NumerosIngles from '../games/NumerosIngles.jsx'
import ProfesionesComunidad from '../games/ProfesionesComunidad.jsx'
import {
  JuegoDigestivo, JuegoOseo, JuegoMuscular,
  JuegoCirculatorio, JuegoNervioso, JuegoRespiratorio,
} from '../games/SistemasEspecificos.jsx'
import LoginObligatorio from '../components/LoginObligatorio.jsx'
import Avatar from '../components/Avatar.jsx'
import { useEstudiante } from '../lib/estudiante'

const JUEGOS = [
  {
    id: 'tablas-batalla',
    titulo: 'Batalla de Tablas',
    materia: 'Matemáticas',
    descripcion: 'Multiplica al ritmo del reloj. Tablas del 0 al 10.',
    icono: '✖️',
    componente: TablasBatalla,
  },
  {
    id: 'numeros-magicos',
    titulo: 'Números mágicos',
    materia: 'Matemáticas',
    descripcion: '¿Cuál es mayor? ¿Qué número sigue? Desde 1 hasta 1.000.',
    icono: '🔢',
    componente: NumerosMagicos,
  },
  {
    id: 'memoria-palabras',
    titulo: 'Memoria de palabras',
    materia: 'Castellano',
    descripcion: 'Encuentra las parejas de sinónimos y antónimos.',
    icono: '🧠',
    componente: MemoriaPalabras,
  },
  {
    id: 'partes-oracion',
    titulo: 'Partes de la oración',
    materia: 'Castellano',
    descripcion: 'Arma la oración: pon cada parte en su lugar.',
    icono: '✍️',
    componente: PartesOracion,
  },
  {
    id: 'silabas-trabadas',
    titulo: 'Sílabas trabadas',
    materia: 'Castellano',
    descripcion: 'Encuentra las palabras con BR, CL, FL, TR y más. Practica lectura.',
    icono: '📖',
    componente: SilabasTrabadas,
  },
  {
    id: 'reto-lectura',
    titulo: 'Reto de lectura',
    materia: 'Castellano',
    descripcion: 'Lee la oración en 20 segundos y responde una pregunta. ¿Podrás?',
    icono: '⏱️',
    componente: RetoLectura,
  },
  {
    id: 'genero-numero',
    titulo: 'Género y número',
    materia: 'Castellano',
    descripcion: 'Masculino o femenino, singular o plural. Practica clasificar palabras.',
    icono: '🚻',
    componente: GeneroNumero,
  },
  {
    id: 'sistemas-cuerpo',
    titulo: 'Sistemas del cuerpo',
    materia: 'Naturales',
    descripcion: 'Digestivo, circulatorio, óseo, muscular y nervioso. ¿Cuál hace qué?',
    icono: '🧠',
    componente: SistemasCuerpo,
  },
  {
    id: 'territorio',
    titulo: 'Territorio y ubicación',
    materia: 'Sociales',
    descripcion: 'Puntos cardinales, mi municipio, mi departamento y mi país.',
    icono: '🗺️',
    componente: Territorio,
  },
  {
    id: 'colores-ingles',
    titulo: 'Los colores en inglés',
    materia: 'Inglés',
    descripcion: 'Aprende cómo se dicen los colores en inglés jugando.',
    icono: '🎨',
    componente: ColoresIngles,
  },
  {
    id: 'numeros-ingles',
    titulo: 'Los números en inglés',
    materia: 'Inglés',
    descripcion: 'Del 1 al 10 con audio, secuencias y sumas. ¡Escucha y aprende!',
    icono: '🔢',
    componente: NumerosIngles,
  },
  {
    id: 'profesiones-comunidad',
    titulo: 'Profesiones en mi comunidad',
    materia: 'Sociales',
    descripcion: 'Mineros, barequeros, arrieros, profes… ¿quién hace qué en Marmato?',
    icono: '⛏️',
    componente: ProfesionesComunidad,
  },
  {
    id: 'sistema-digestivo',
    titulo: 'Sistema digestivo',
    materia: 'Naturales',
    descripcion: 'Boca, estómago, intestinos… ¿cómo viaja la comida por tu cuerpo?',
    icono: '🍎',
    componente: JuegoDigestivo,
  },
  {
    id: 'sistema-oseo',
    titulo: 'Sistema óseo',
    materia: 'Naturales',
    descripcion: '206 huesos, cráneo, columna, fémur y más. ¡Conoce tu esqueleto!',
    icono: '🦴',
    componente: JuegoOseo,
  },
  {
    id: 'sistema-muscular',
    titulo: 'Sistema muscular',
    materia: 'Naturales',
    descripcion: 'Bíceps, cuádriceps, corazón… más de 600 músculos que te mueven.',
    icono: '💪',
    componente: JuegoMuscular,
  },
  {
    id: 'sistema-circulatorio',
    titulo: 'Sistema circulatorio',
    materia: 'Naturales',
    descripcion: 'Corazón, sangre, venas y arterias. ¡El transporte del cuerpo!',
    icono: '❤️',
    componente: JuegoCirculatorio,
  },
  {
    id: 'sistema-nervioso',
    titulo: 'Sistema nervioso',
    materia: 'Naturales',
    descripcion: 'Cerebro, nervios y los 5 sentidos. El "director" del cuerpo.',
    icono: '🧠',
    componente: JuegoNervioso,
  },
  {
    id: 'sistema-respiratorio',
    titulo: 'Sistema respiratorio',
    materia: 'Naturales',
    descripcion: 'Pulmones, nariz, tráquea. ¡Aprende cómo respiras!',
    icono: '🫁',
    componente: JuegoRespiratorio,
  },
]

const MATERIAS = ['Todas', 'Matemáticas', 'Castellano', 'Naturales', 'Sociales', 'Inglés']

export default function Actividades() {
  const { estudiante, cerrarSesion } = useEstudiante()
  const [modoInvitado, setModoInvitado] = useState(false)
  const [filtro, setFiltro] = useState('Todas')
  const [juegoActivo, setJuegoActivo] = useState(null)

  const lista = useMemo(
    // Los más nuevos van al principio (más abajo en el array = agregado después)
    () => JUEGOS.filter((j) => filtro === 'Todas' || j.materia === filtro).slice().reverse(),
    [filtro],
  )

  // 1. GATE: si no hay estudiante y no eligió invitado, mostrar solo el ingreso
  if (!estudiante && !modoInvitado) {
    return (
      <div className="space-y-6">
        <section>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-institucional-verdeOscuro">
            Actividades lúdicas 🎮
          </h1>
          <p className="mt-2 text-gray-700">
            Juega, practica y aprende. Cada actividad es corta y divertida.
          </p>
        </section>
        <LoginObligatorio onInvitado={() => setModoInvitado(true)} />
      </div>
    )
  }

  // 2. Jugando un juego
  if (juegoActivo) {
    const Juego = juegoActivo.componente
    return (
      <div className="space-y-6">
        <section>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-institucional-verdeOscuro">
            {juegoActivo.icono} {juegoActivo.titulo}
          </h1>
          <p className="text-sm text-gray-600">
            {juegoActivo.materia} · {juegoActivo.descripcion}
          </p>
        </section>
        <Juego onExit={() => setJuegoActivo(null)} />
      </div>
    )
  }

  // 3. Vista principal (con estudiante o como invitado)
  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-3xl md:text-4xl font-display font-bold text-institucional-verdeOscuro">
          Actividades lúdicas 🎮
        </h1>
        <p className="mt-2 text-gray-700">
          Juega, practica y aprende. Cada actividad es corta y divertida.
        </p>
      </section>

      {estudiante ? (
        <div className="card bg-institucional-verde text-white flex flex-col sm:flex-row sm:items-center gap-3">
          <Avatar foto={estudiante.foto} nombre={estudiante.nombre} tamano={64} />
          <div className="flex-1">
            <div className="text-sm opacity-90">¡Bienvenido/a!</div>
            <div className="font-display font-bold text-lg">{estudiante.nombre}</div>
            <div className="text-xs opacity-80">
              Tus puntos, medallas y racha se guardan en el podio.
            </div>
          </div>
          <button
            onClick={cerrarSesion}
            className="px-3 py-2 bg-white text-institucional-verdeOscuro rounded-lg text-sm font-semibold hover:bg-institucional-crema"
          >
            Cambiar de estudiante
          </button>
        </div>
      ) : (
        <div className="card bg-yellow-100 border-2 border-yellow-400 flex items-center gap-3">
          <div className="text-3xl">👤</div>
          <div className="flex-1">
            <div className="font-display font-bold text-sm text-yellow-900">
              Estás jugando como invitado
            </div>
            <div className="text-xs text-yellow-800">
              Tus puntos no se están guardando en el podio.
            </div>
          </div>
          <button
            onClick={() => setModoInvitado(false)}
            className="px-3 py-2 bg-institucional-verde text-white rounded-lg text-sm font-semibold hover:bg-institucional-verdeOscuro"
          >
            Ingresar con documento
          </button>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {MATERIAS.map((m) => (
          <button
            key={m}
            onClick={() => setFiltro(m)}
            className={`px-4 py-2 rounded-full font-semibold text-sm transition-colors ${
              filtro === m
                ? 'bg-institucional-verde text-white'
                : 'bg-white text-gray-700 hover:bg-institucional-crema'
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {lista.map((j) => (
          <div key={j.id} className="card flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <span className="badge bg-institucional-verdeClaro text-white">{j.materia}</span>
              <span className="text-3xl">{j.icono}</span>
            </div>
            <h3 className="font-display font-bold text-lg mb-1">{j.titulo}</h3>
            <p className="text-gray-600 text-sm flex-1">{j.descripcion}</p>
            <button onClick={() => setJuegoActivo(j)} className="mt-4 btn-primary">
              Jugar
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
