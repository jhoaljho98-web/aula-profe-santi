export default function Contacto() {
  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-3xl md:text-4xl font-display font-bold text-institucional-verdeOscuro">
          Contacto
        </h1>
        <p className="mt-2 text-gray-700">
          ¿Tienes alguna duda, sugerencia o quieres agendar una reunión? Escríbeme.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card">
          <h2 className="font-display font-bold text-xl mb-2">📱 WhatsApp</h2>
          <p className="text-gray-700">Escríbeme al grupo del grado o al interno.</p>
        </div>

        <div className="card">
          <h2 className="font-display font-bold text-xl mb-2">✉️ Correo</h2>
          <a href="mailto:jhoaljho.98@gmail.com" className="text-institucional-verde hover:underline">
            jhoaljho.98@gmail.com
          </a>
        </div>

        <div className="card">
          <h2 className="font-display font-bold text-xl mb-2">🏫 Institución</h2>
          <p className="text-gray-700">
            Institución Educativa El Llano<br />
            Marmato, Caldas, Colombia
          </p>
        </div>

        <div className="card">
          <h2 className="font-display font-bold text-xl mb-2">🕐 Horario de atención</h2>
          <p className="text-gray-700">
            Reuniones con padres: viernes, previo agendamiento.
          </p>
        </div>
      </section>
    </div>
  )
}
