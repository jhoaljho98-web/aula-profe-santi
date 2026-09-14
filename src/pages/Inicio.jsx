import { Link } from 'react-router-dom'

const SECCIONES = [
  { to: '/aula', titulo: 'Nuestra aula', desc: 'Conoce al grupo, el horario y al docente.', icon: '👥', color: 'bg-institucional-verde' },
  { to: '/diario', titulo: 'Diario de clase', desc: 'Fotos y guías de lo que hacemos clase a clase.', icon: '📅', color: 'bg-institucional-amarillo' },
  { to: '/recursos', titulo: 'Recursos', desc: 'Guías, videos y materiales por materia.', icon: '📚', color: 'bg-institucional-verdeClaro' },
  { to: '/actividades', titulo: 'Actividades lúdicas', desc: 'Juegos por materia para practicar.', icon: '🎮', color: 'bg-institucional-verde' },
  { to: '/padres', titulo: 'Para los padres', desc: 'Recomendaciones de acompañamiento.', icon: '👨‍👩‍👧', color: 'bg-institucional-amarillo' },
  { to: '/notas', titulo: 'Consulta de notas', desc: 'Ver notas con documento del estudiante.', icon: '📊', color: 'bg-institucional-verdeClaro' },
  { to: '/asistencia', titulo: 'Consulta de asistencia', desc: 'Ver asistencia por periodo con documento.', icon: '✅', color: 'bg-institucional-verde' },
  { to: '/galeria', titulo: 'Galería del proceso', desc: 'Memorias y momentos especiales con los niños.', icon: '📸', color: 'bg-institucional-amarillo' },
]

export default function Inicio() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="text-center py-8">
        <img
          src={`${import.meta.env.BASE_URL}escudo.jpg`}
          alt="Escudo IE El Llano"
          className="w-24 h-24 mx-auto mb-4 object-contain drop-shadow-lg"
        />
        <h1 className="text-4xl md:text-5xl font-display font-bold text-institucional-verdeOscuro">
          ¡Bienvenidos al Aula del profe Santi!
        </h1>
        <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
          Un espacio para acompañar a los niños y niñas de la Institución Educativa El Llano
          en su proceso de aprendizaje. Aquí encontrarás lo que vemos en clase, recursos,
          actividades divertidas y más.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          <Link to="/diario" className="btn-primary">Ver el diario de clase</Link>
          <Link to="/actividades" className="btn-secondary">Jugar y aprender</Link>
        </div>
      </section>

      {/* Grid de secciones */}
      <section>
        <h2 className="text-2xl font-display font-bold mb-6 text-institucional-verdeOscuro">
          Explora las secciones
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SECCIONES.map((s) => (
            <Link
              key={s.to}
              to={s.to}
              className="card hover:shadow-soft hover:-translate-y-1 transition-all"
            >
              <div className={`${s.color} text-white w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-3`}>
                {s.icon}
              </div>
              <h3 className="font-display font-bold text-xl mb-1">{s.titulo}</h3>
              <p className="text-gray-600 text-sm">{s.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
