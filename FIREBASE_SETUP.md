# Configuración de Firebase para el podio

Sigue estos pasos una sola vez para activar el podio en la plataforma.

## 1. Crear proyecto en Firebase (5 min)

1. Abre https://console.firebase.google.com/ (con tu cuenta de Google jhoaljho.98@gmail.com).
2. Clic en **Añadir proyecto** → nombre: `aula-profe-santi`.
3. Cuando pregunte por Google Analytics, puedes decir "No" (no es necesario).
4. Espera a que termine de crear el proyecto y clic en **Continuar**.

## 2. Habilitar Firestore

1. En el menú de la izquierda: **Compilación → Firestore Database**.
2. Clic **Crear base de datos**.
3. Modo: **Modo de producción** (no test, para tener reglas seguras).
4. Ubicación: `southamerica-east1` (São Paulo, la más cerca de Colombia).
5. Clic **Habilitar** y espera.

## 3. Copiar las reglas de seguridad

En la pestaña **Reglas** de Firestore, borra todo lo que hay y pega esto:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Cualquiera puede leer el podio (para ver el ranking)
    match /estudiantes/{hash} {
      allow read: if true;
      allow write: if request.resource.data.nombre is string
                   && request.resource.data.puntosTotal is number;
    }
    match /estudiantes/{hash}/juegos/{juegoId} {
      allow read: if true;
      allow write: if request.resource.data.mejorPuntaje is number;
    }
  }
}
```

Clic **Publicar**.

## 4. Registrar la app web

1. Rueda dentada arriba a la izquierda → **Configuración del proyecto**.
2. Baja a **Tus apps** → clic en el ícono `</>` (Web).
3. Sobrenombre: `aula-profe-santi-web`. **NO** marques Firebase Hosting.
4. Clic **Registrar app**.
5. Aparece un bloque de código con `firebaseConfig = {...}`. Copia los valores que están dentro.

## 5. Pegar los valores en el proyecto

En la raíz de `aula-profe-santi/` crea un archivo `.env` (sin extensión) con este contenido, reemplazando los valores:

```
VITE_FIREBASE_API_KEY=AIzaSy…
VITE_FIREBASE_AUTH_DOMAIN=aula-profe-santi.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=aula-profe-santi
VITE_FIREBASE_STORAGE_BUCKET=aula-profe-santi.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef…
```

## 6. Redespliega

```
npm run deploy
```

Listo, el podio queda funcionando.
