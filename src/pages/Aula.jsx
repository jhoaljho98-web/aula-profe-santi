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
        <div className="card p-4 sm:p-6">
          <img
            src={`${import.meta.env.BASE_URL}horario-2b.jpeg`}
            alt="Horario Grado 2B"
            className="w-full h-auto rounded-2xl shadow-soft"
          />
        </div>
      </section>
    </div>
  )
}
