import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Configuración de Firebase — el usuario pega aquí lo que obtiene de
// console.firebase.google.com > Configuración del proyecto > Aplicación web
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

export const firebaseHabilitado = Boolean(firebaseConfig.apiKey)

let app = null
let db = null

if (firebaseHabilitado) {
  app = initializeApp(firebaseConfig)
  db = getFirestore(app)
}

export { app, db }
