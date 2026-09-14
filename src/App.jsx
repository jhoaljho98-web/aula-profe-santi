import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Inicio from './pages/Inicio.jsx'
import Aula from './pages/Aula.jsx'
import Diario from './pages/Diario.jsx'
import Recursos from './pages/Recursos.jsx'
import Actividades from './pages/Actividades.jsx'
import Padres from './pages/Padres.jsx'
import Notas from './pages/Notas.jsx'
import Asistencia from './pages/Asistencia.jsx'
import Galeria from './pages/Galeria.jsx'
import Contacto from './pages/Contacto.jsx'
import Podio from './pages/Podio.jsx'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/aula" element={<Aula />} />
        <Route path="/diario" element={<Diario />} />
        <Route path="/recursos" element={<Recursos />} />
        <Route path="/actividades" element={<Actividades />} />
        <Route path="/padres" element={<Padres />} />
        <Route path="/notas" element={<Notas />} />
        <Route path="/asistencia" element={<Asistencia />} />
        <Route path="/galeria" element={<Galeria />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/podio" element={<Podio />} />
      </Routes>
    </Layout>
  )
}
