# Aula del profe Santi

Plataforma web del grado de primaria de Jhonatan Santiago Álvarez en la Institución Educativa El Llano, Marmato, Caldas.

## Stack

- Vite + React 18
- Tailwind CSS
- React Router (HashRouter para GitHub Pages)

## Estructura

```
src/
├── components/    # Layout y componentes reutilizables
├── pages/         # Las 8 secciones de la plataforma
├── data/          # Contenido en JSON (clases, recursos, actividades, notas)
├── utils/         # hash.js para SHA-256 en el navegador
├── App.jsx        # Rutas
└── main.jsx       # Entry point
```

## Secciones

1. **Inicio** — Bienvenida, últimas clases, acceso rápido a secciones
2. **Nuestra aula** — Grupo actual, docente, horario
3. **Diario de clase** — Registro clase a clase (filtrable por materia y periodo)
4. **Recursos** — Guías, videos y enlaces agrupados por materia
5. **Actividades lúdicas** — Juegos interactivos por materia
6. **Para los padres** — Comunicados y recomendaciones
7. **Notas** — Consulta con número de documento (SHA-256 en el navegador)
8. **Contacto**

## Desarrollo

```bash
npm install
npm run dev
```

## Build y deploy

```bash
npm run build
npm run deploy    # Publica en GitHub Pages
```

## Cómo agregar una clase al Diario

Edita `src/data/clases.json` y agrega un objeto:

```json
{
  "id": "2026-09-15-cast",
  "fecha": "2026-09-15",
  "materia": "Castellano",
  "tema": "El sustantivo",
  "resumen": "Aprendimos qué es un sustantivo...",
  "recursos": [
    { "tipo": "guia", "titulo": "Guía: El sustantivo", "url": "..." }
  ],
  "actividad": null,
  "tarea": "...",
  "periodo": 3
}
```

## Cómo agregar notas de estudiante

1. Genera el hash del documento del estudiante (utilidad para agregar más adelante).
2. En `src/data/notas.json`, agrega el estudiante bajo ese hash con sus notas por periodo.

Cada periodo pesa 25%. Se muestran las 4 notas y el promedio.

## Docente

Jhonatan Santiago Álvarez
