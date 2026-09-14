export default function Avatar({ foto, nombre, tamano = 48 }) {
  const inicial = (nombre || '?').trim().charAt(0).toUpperCase()
  const style = { width: tamano, height: tamano, minWidth: tamano }
  if (foto) {
    return (
      <img
        src={`${import.meta.env.BASE_URL}${foto}`}
        alt={nombre}
        style={style}
        className="rounded-full object-cover border-2 border-white shadow"
      />
    )
  }
  return (
    <div
      style={style}
      className="rounded-full bg-institucional-verdeClaro text-white font-display font-bold flex items-center justify-center border-2 border-white shadow"
    >
      {inicial}
    </div>
  )
}
