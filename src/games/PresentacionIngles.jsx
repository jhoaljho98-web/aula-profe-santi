import QuizGenerico from './QuizGenerico.jsx'
import { hablarEn } from '../lib/hablar'

function BotonAudio({ palabra }) {
  return (
    <div className="flex flex-col items-center gap-3 px-4">
      <button
        onClick={(e) => { e.stopPropagation(); hablarEn(palabra) }}
        className="text-4xl bg-red-500 hover:bg-red-600 text-white rounded-full w-24 h-24 flex items-center justify-center shadow-xl transition-transform active:scale-95"
        title="Tocar para volver a escuchar"
      >
        🔊
      </button>
      <span className="font-display font-bold text-xl md:text-2xl text-institucional-verdeOscuro text-center leading-tight">{palabra}</span>
    </div>
  )
}

// Base de frases para el juego
const BANCO = [
  // ========== SALUDOS ==========
  { enunciado: '👋 ¿Cómo se dice "Hola" en inglés?', pregunta: 'Hola', opciones: ['Hello', 'Goodbye', 'Please', 'Sorry'], correcta: 0 },
  { enunciado: '👋 Un saludo informal para amigos:', pregunta: '¿Cuál es?', opciones: ['Hi', 'Bye', 'Yes', 'No'], correcta: 0 },
  { enunciado: '🌅 ¿Cómo saludas en la mañana?', pregunta: 'Buenos días', opciones: ['Good morning', 'Good night', 'Good luck', 'Good job'], correcta: 0 },
  { enunciado: '☀️ ¿Cómo saludas en la tarde?', pregunta: 'Buenas tardes', opciones: ['Good afternoon', 'Good morning', 'Good night', 'Good bye'], correcta: 0 },
  { enunciado: '🌙 ¿Cómo saludas en la noche?', pregunta: 'Buenas noches (al llegar)', opciones: ['Good evening', 'Good morning', 'Good bye', 'Good afternoon'], correcta: 0 },
  { enunciado: '😴 ¿Cómo dices "Buenas noches" al irse a dormir?', pregunta: 'Antes de dormir', opciones: ['Good night', 'Good morning', 'Hello', 'Please'], correcta: 0 },
  { enunciado: '🤝 "How are you?" significa:', pregunta: '¿Qué significa?', opciones: ['¿Cómo estás?', '¿Cómo te llamas?', '¿Dónde vives?', '¿Cuántos años tienes?'], correcta: 0 },
  { enunciado: 'Si estoy bien, ¿cómo respondo a "How are you?"', pregunta: 'Respuesta', opciones: ["I'm fine, thank you", 'Goodbye', 'My name', 'Hello'], correcta: 0 },
  { enunciado: '"Nice to meet you" significa:', pregunta: 'Traducción', opciones: ['Encantado(a) de conocerte', 'Adiós', 'Hasta luego', 'Buenos días'], correcta: 0 },

  // ========== PRESENTACIÓN ==========
  { enunciado: '👤 ¿Cómo se dice "Me llamo Juan" en inglés?', pregunta: 'Presentación', opciones: ['My name is Juan', 'I have Juan', 'He is Juan', 'Your name Juan'], correcta: 0 },
  { enunciado: '👤 "What is your name?" significa:', pregunta: 'Traducción', opciones: ['¿Cuál es tu nombre?', '¿Cuántos años tienes?', '¿Cómo estás?', '¿Dónde vives?'], correcta: 0 },
  { enunciado: 'Completa: "My ___ is Sofia":', pregunta: 'Completa la oración', opciones: ['name', 'car', 'dog', 'house'], correcta: 0 },
  { enunciado: 'Completa: "___ name is Andrés":', pregunta: 'Completa', opciones: ['My', 'You', 'He', 'She'], correcta: 0 },
  { enunciado: '👦 Si soy niño, digo:', pregunta: '¿Cómo me presento?', opciones: ["I'm a boy", "I'm a girl", "I'm a dog", "I'm a car"], correcta: 0 },
  { enunciado: '👧 Si soy niña, digo:', pregunta: '¿Cómo me presento?', opciones: ["I'm a girl", "I'm a boy", "I'm a cat", "I'm a house"], correcta: 0 },
  { enunciado: '¿Cómo digo "Tengo 7 años" en inglés?', pregunta: 'Edad', opciones: ["I'm 7 years old", "I have 7 dogs", "My name 7", "You are 7"], correcta: 0 },
  { enunciado: '¿Cómo pregunto "¿Cuántos años tienes?"', pregunta: 'Pregunta de edad', opciones: ['How old are you?', 'What is your name?', 'How are you?', 'Where are you?'], correcta: 0 },

  // ========== DESPEDIDAS ==========
  { enunciado: '👋 ¿Cómo se dice "Adiós" en inglés?', pregunta: 'Adiós', opciones: ['Goodbye', 'Hello', 'Please', 'Sorry'], correcta: 0 },
  { enunciado: '👋 Una despedida informal:', pregunta: 'Informal', opciones: ['Bye', 'Hello', 'Hi', 'Yes'], correcta: 0 },
  { enunciado: '👋 ¿Cómo se dice "Hasta luego"?', pregunta: 'Despedida', opciones: ['See you later', 'Nice to meet you', 'Good morning', 'How are you?'], correcta: 0 },
  { enunciado: '👋 "See you tomorrow" significa:', pregunta: 'Traducción', opciones: ['Nos vemos mañana', 'Buenos días', 'Buenas noches', 'Encantado'], correcta: 0 },
  { enunciado: 'Antes de salir del salón podemos decir:', pregunta: 'Al salir', opciones: ['Goodbye teacher', 'Hello teacher', 'My name teacher', 'Good luck teacher'], correcta: 0 },

  // ========== ESCUCHA (Web Speech) ==========
  { enunciado: '🔊 Escucha y elige lo que significa:', pregunta: <BotonAudio palabra="Hello, my name is Ana" />, opciones: ['Hola, mi nombre es Ana', 'Adiós, Ana', 'Ana tiene un perro', 'Buenas noches Ana'], correcta: 0 },
  { enunciado: '🔊 Escucha y elige lo que significa:', pregunta: <BotonAudio palabra="Good morning, teacher" />, opciones: ['Buenos días, profe', 'Buenas noches, profe', 'Adiós, profe', 'Encantada, profe'], correcta: 0 },
  { enunciado: '🔊 Escucha y responde:', pregunta: <BotonAudio palabra="How are you?" />, opciones: ["I'm fine, thank you", "My name is Pedro", "Goodbye", "I'm 8 years old"], correcta: 0 },
  { enunciado: '🔊 Escucha:', pregunta: <BotonAudio palabra="What is your name?" />, opciones: ['My name is…', "I'm fine", 'Good morning', 'See you later'], correcta: 0 },
  { enunciado: '🔊 Escucha y responde:', pregunta: <BotonAudio palabra="Nice to meet you" />, opciones: ['Encantado(a) de conocerte', 'Buenas noches', 'Hasta mañana', 'Buenos días'], correcta: 0 },
  { enunciado: '🔊 Escucha:', pregunta: <BotonAudio palabra="See you later" />, opciones: ['Hasta luego', 'Buenos días', 'Encantado', 'Adiós para siempre'], correcta: 0 },

  // ========== ARMANDO ORACIONES ==========
  { enunciado: '📝 Ordena mentalmente y elige la oración correcta para presentarse:', pregunta: 'Presentación', opciones: ['Hello, my name is Camila', 'Hello, name my Camila is', 'Camila hello is name', 'My hello Camila name is'], correcta: 0 },
  { enunciado: '📝 ¿Cuál es la respuesta CORRECTA a "Hello, how are you?"', pregunta: 'Diálogo', opciones: ["Hello! I'm fine, thank you", 'Yes I have', 'Good bye teacher', 'My name is teacher'], correcta: 0 },
  { enunciado: '📝 Elige el diálogo correcto:', pregunta: 'Nos presentamos', opciones: ['—What is your name? —My name is Luis', '—My name Luis? —What is your', '—Hello name Luis. —My what is', '—Fine Luis is'], correcta: 0 },

  // ========== PALABRAS MÁGICAS ==========
  { enunciado: '🙏 ¿Cómo se dice "Gracias" en inglés?', pregunta: 'Gracias', opciones: ['Thank you', 'Please', 'Sorry', 'Hello'], correcta: 0 },
  { enunciado: '🙏 Una forma corta de decir "Gracias":', pregunta: 'Informal', opciones: ['Thanks', 'Bye', 'Yes', 'Good'], correcta: 0 },
  { enunciado: '🎁 ¿Cómo respondes cuando alguien te dice "Thank you"?', pregunta: 'De nada', opciones: ["You're welcome", "Thank you", "Please", "Goodbye"], correcta: 0 },
  { enunciado: '🙏 ¿Cómo se dice "Por favor" en inglés?', pregunta: 'Por favor', opciones: ['Please', 'Thanks', 'Sorry', 'Hi'], correcta: 0 },
  { enunciado: '😔 ¿Cómo se dice "Disculpa" o "Perdón"?', pregunta: 'Disculpa', opciones: ['Sorry', 'Please', 'Thanks', 'Hello'], correcta: 0 },
  { enunciado: '🚶 ¿Cómo pides "Con permiso" para pasar?', pregunta: 'Con permiso', opciones: ['Excuse me', 'Sorry', 'Please', 'Thank you'], correcta: 0 },
  { enunciado: '🙋 ¿Cómo llamas la atención de tu profe educadamente?', pregunta: '¡Profe!', opciones: ['Excuse me, teacher', 'Hey teacher', 'Bye teacher', 'Good teacher'], correcta: 0 },
  { enunciado: '"Yes, please" significa:', pregunta: 'Traducción', opciones: ['Sí, por favor', 'No, gracias', 'Adiós', 'Disculpa'], correcta: 0 },
  { enunciado: '"No, thank you" significa:', pregunta: 'Traducción', opciones: ['No, gracias', 'Sí, por favor', 'Disculpa', 'Buenos días'], correcta: 0 },
  { enunciado: '🍎 La profe te da una manzana, ¿qué dices?', pregunta: 'Educación', opciones: ['Thank you', 'Sorry', 'Please', 'Goodbye'], correcta: 0 },
  { enunciado: '💥 Choqué a mi compañero sin querer, ¿qué digo?', pregunta: 'Educación', opciones: ["I'm sorry", 'Thank you', 'Hello', 'Please'], correcta: 0 },
  { enunciado: '📖 Quiero pedir un lápiz prestado. Digo:', pregunta: 'Educación', opciones: ['Can you help me, please?', 'Goodbye lápiz', 'My name is lápiz', 'Sorry lápiz'], correcta: 0 },

  // ========== ESCUCHA — palabras mágicas ==========
  { enunciado: '🔊 Escucha y elige lo que significa:', pregunta: <BotonAudio palabra="Thank you very much" />, opciones: ['Muchas gracias', 'Buenos días', 'De nada', 'Disculpa'], correcta: 0 },
  { enunciado: '🔊 Escucha y responde:', pregunta: <BotonAudio palabra="You're welcome" />, opciones: ['De nada', 'Gracias', 'Adiós', 'Encantado'], correcta: 0 },
  { enunciado: '🔊 Escucha:', pregunta: <BotonAudio palabra="Excuse me, please" />, opciones: ['Con permiso, por favor', 'Muchas gracias', 'Hasta mañana', 'Buenas noches'], correcta: 0 },
  { enunciado: '🔊 Escucha:', pregunta: <BotonAudio palabra="I'm sorry" />, opciones: ['Lo siento / Disculpa', 'Buenos días', 'Encantado', 'Estoy bien'], correcta: 0 },
]

export default function PresentacionIngles({ onExit }) {
  const preguntas = [...BANCO].sort(() => Math.random() - 0.5).slice(0, 15)
  return (
    <QuizGenerico
      juegoId="presentacion-ingles"
      juegoNombre="Saludos y presentación en inglés"
      materia="ingles"
      preguntas={preguntas}
      onExit={onExit}
    />
  )
}
