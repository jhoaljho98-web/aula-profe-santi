const HORARIO = [
  { hora: '7:00 - 8:00', lunes: 'Matemáticas', martes: 'Castellano', miercoles: 'Matemáticas', jueves: 'Ciencias', viernes: 'Artística' },
  { hora: '8:00 - 9:00', lunes: 'Castellano', martes: 'Matemáticas', miercoles: 'Sociales', jueves: 'Castellano', viernes: 'Ed. Física' },
  { hora: '9:00 - 9:30', lunes: 'DESCANSO', martes: 'DESCANSO', miercoles: 'DESCANSO', jueves: 'DESCANSO', viernes: 'DESCANSO' },
  { hora: '9:30 - 10:30', lunes: 'Ciencias', martes: 'Sociales', miercoles: 'Inglés', jueves: 'Matemáticas', viernes: 'Castellano' },
  { hora: '10:30 - 11:30', lunes: 'Ética/Religión', martes: 'Inglés', miercoles: 'Castellano', jueves: 'Sociales', viernes: 'Tecnología' },
  { hora: '11:30 - 12:00', lunes: 'Lectura libre', martes: 'Lectura libre', miercoles: 'Lectura libre', jueves: 'Lectura libre', viernes: 'Lectura libre' },
]

export default function Aula() {
  return (
    <div className="space-y-10">
      <section className="text-center">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-institucional-verdeOscuro">
          Nuestra aula
        </h1>
        <p className="mt-3 text-gray-700 max-w-2xl mx-auto">
          Un vistazo al grupo, al docente y al horario de este año.
        </p>
      </section>

      {/* Grupo actual */}
      <section className="card">
        <h2 className="font-display font-bold text-2xl mb-3 text-institucional-verdeOscuro">
          Grado 2B · 2026
        </h2>
        <p className="text-gray-700">
          Somos un grupo alegre y curioso de la Institución Educativa El Llano, en el municipio
          de Marmato, Caldas. Trabajamos con el modelo Escuela Nueva, en el que aprendemos
          en 4 momentos: saberes previos (A), fundamentación con el docente (B),
          ejercitación individual (C) y exploración en casa (D).
        </p>
      </section>

      {/* Docente */}
      <section className="card">
        <div className="flex items-start gap-4">
          <div className="w-20 h-20 rounded-full bg-institucional-amarillo flex items-center justify-center text-4xl shrink-0">
            👨‍🏫
          </div>
          <div>
            <h2 className="font-display font-bold text-2xl text-institucional-verdeOscuro">
              Jhonatan Santiago Álvarez
            </h2>
            <p className="text-gray-600">Docente titular · Grado 2B</p>
            <p className="mt-3 text-gray-700">
              Docente comprometido con la educación rural y con el aprendizaje activo,
              lúdico y significativo de los niños y niñas.
            </p>
          </div>
        </div>
      </section>

      {/* Horario */}
      <section>
        <h2 className="font-display font-bold text-2xl mb-4 text-institucional-verdeOscuro">
          Horario semanal
        </h2>
        <div className="card overflow-x-auto p-0">
          <table className="w-full text-sm">
            <thead className="bg-institucional-verde text-white">
              <tr>
                <th className="p-3 text-left">Hora</th>
                <th className="p-3">Lunes</th>
                <th className="p-3">Martes</th>
                <th className="p-3">Miércoles</th>
                <th className="p-3">Jueves</th>
                <th className="p-3">Viernes</th>
              </tr>
            </thead>
            <tbody>
              {HORARIO.map((fila, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-institucional-crema'}>
                  <td className="p-3 font-semibold">{fila.hora}</td>
                  <td className="p-3 text-center">{fila.lunes}</td>
                  <td className="p-3 text-center">{fila.martes}</td>
                  <td className="p-3 text-center">{fila.miercoles}</td>
                  <td className="p-3 text-center">{fila.jueves}</td>
                  <td className="p-3 text-center">{fila.viernes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Horario de ejemplo. Actualiza en <code>src/pages/Aula.jsx</code>.
        </p>
      </section>
    </div>
  )
}
