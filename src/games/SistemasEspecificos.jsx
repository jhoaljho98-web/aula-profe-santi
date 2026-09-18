import QuizGenerico from './QuizGenerico.jsx'

function crearJuego(id, nombre, banco) {
  return function Juego({ onExit }) {
    const preguntas = [...banco].sort(() => Math.random() - 0.5).slice(0, 15)
    return (
      <QuizGenerico
        juegoId={id}
        juegoNombre={nombre}
        materia="naturales"
        preguntas={preguntas}
        onExit={onExit}
      />
    )
  }
}

// =========================================================
// 🍎 SISTEMA DIGESTIVO
// =========================================================
const BANCO_DIGESTIVO = [
  { enunciado: '🍎 ¿Qué sistema convierte los alimentos en nutrientes?', pregunta: 'Función principal', opciones: ['Digestivo', 'Circulatorio', 'Óseo', 'Nervioso'], correcta: 0 },
  { enunciado: '¿Dónde empieza la digestión?', pregunta: '🚪 Puerta de entrada', opciones: ['Boca', 'Estómago', 'Intestino', 'Ano'], correcta: 0 },
  { enunciado: '¿Qué órgano mastica los alimentos junto con los dientes?', pregunta: '👅', opciones: ['Lengua', 'Nariz', 'Ojo', 'Oreja'], correcta: 0 },
  { enunciado: '¿Cómo se llama el tubo que lleva la comida al estómago?', pregunta: '⬇️ Tubo largo', opciones: ['Esófago', 'Tráquea', 'Vena', 'Nervio'], correcta: 0 },
  { enunciado: '¿En qué órgano se mezcla la comida con jugos gástricos?', pregunta: '🌭', opciones: ['Estómago', 'Cerebro', 'Pulmón', 'Corazón'], correcta: 0 },
  { enunciado: '¿Dónde se absorben la mayoría de los nutrientes?', pregunta: '🔗 Muy largo', opciones: ['Intestino delgado', 'Boca', 'Esófago', 'Estómago'], correcta: 0 },
  { enunciado: '¿Qué hace el intestino grueso?', pregunta: '💧', opciones: ['Absorbe agua y forma la caca', 'Bombea sangre', 'Piensa', 'Mueve los brazos'], correcta: 0 },
  { enunciado: '¿Qué órgano fabrica la bilis para digerir grasas?', pregunta: '🟤', opciones: ['Hígado', 'Cerebro', 'Corazón', 'Riñón'], correcta: 0 },
  { enunciado: '¿Qué órgano fabrica insulina para el azúcar?', pregunta: '🔬', opciones: ['Páncreas', 'Piel', 'Ojo', 'Diente'], correcta: 0 },
  { enunciado: 'Los dientes que trituran la comida son los...', pregunta: '🦷', opciones: ['Molares', 'Incisivos', 'Colmillos', 'Pelos'], correcta: 0 },
  { enunciado: 'Ordena: boca → esófago → ___ → intestino', pregunta: '¿Qué sigue?', opciones: ['Estómago', 'Cerebro', 'Riñón', 'Pulmón'], correcta: 0 },
  { enunciado: 'La saliva sirve para...', pregunta: '💧', opciones: ['Ablandar la comida y ayudar a masticar', 'Ver mejor', 'Correr rápido', 'Oír más'], correcta: 0 },
  { enunciado: '¿Qué alimento es MEJOR para el sistema digestivo?', pregunta: '🥦', opciones: ['Frutas y verduras', 'Solo dulces', 'Solo gaseosa', 'Comida chatarra'], correcta: 0 },
  { enunciado: '¿Qué pasa si no tomas agua suficiente?', pregunta: '💧❌', opciones: ['Se hace difícil ir al baño', 'Corres más rápido', 'Ves mejor', 'Duermes menos'], correcta: 0 },
  { enunciado: '¿Cuánto dura la digestión aproximadamente?', pregunta: '⏱️ Dato curioso', opciones: ['Entre 24 y 72 horas', '1 minuto', '5 minutos', '1 mes'], correcta: 0 },
  { enunciado: 'V/F: El estómago es del tamaño de un puño cuando está vacío', pregunta: '¿Verdadero o falso?', opciones: ['Verdadero', 'Falso'], correcta: 0 },
  { enunciado: 'V/F: Podemos vivir sin masticar bien la comida', pregunta: '¿Verdadero o falso?', opciones: ['Verdadero', 'Falso'], correcta: 1 },
  { enunciado: 'Antes de comer siempre debemos...', pregunta: '🧼', opciones: ['Lavarnos las manos', 'Correr', 'Ver televisión', 'Nada'], correcta: 0 },
  { enunciado: 'Después de comer NO se recomienda...', pregunta: '🏃', opciones: ['Hacer ejercicio muy fuerte', 'Descansar un rato', 'Tomar agua', 'Lavarse los dientes'], correcta: 0 },
  { enunciado: 'El apéndice está en el sistema...', pregunta: '¿Cuál?', opciones: ['Digestivo', 'Óseo', 'Nervioso', 'Muscular'], correcta: 0 },
]

// =========================================================
// 🦴 SISTEMA ÓSEO
// =========================================================
const BANCO_OSEO = [
  { enunciado: '🦴 ¿Qué sistema da forma y sostiene el cuerpo?', pregunta: 'Función principal', opciones: ['Óseo', 'Digestivo', 'Nervioso', 'Circulatorio'], correcta: 0 },
  { enunciado: '¿Cuántos huesos aproximadamente tiene un adulto?', pregunta: '🔢', opciones: ['206', '50', '100', '500'], correcta: 0 },
  { enunciado: '¿Cuántos huesos tiene un bebé recién nacido?', pregunta: '👶 Dato curioso', opciones: ['Cerca de 300', '206', '100', '10'], correcta: 0 },
  { enunciado: '¿Cuál es el hueso más largo del cuerpo?', pregunta: '🦵', opciones: ['Fémur', 'Cráneo', 'Costilla', 'Rótula'], correcta: 0 },
  { enunciado: '¿Cuál es el hueso más pequeño del cuerpo?', pregunta: '👂 Está en el oído', opciones: ['Estribo', 'Fémur', 'Vértebra', 'Rótula'], correcta: 0 },
  { enunciado: '¿Qué hueso protege el cerebro?', pregunta: '💀', opciones: ['Cráneo', 'Costillas', 'Fémur', 'Columna'], correcta: 0 },
  { enunciado: '¿Qué huesos protegen los pulmones y el corazón?', pregunta: '🫁❤️', opciones: ['Costillas', 'Cráneo', 'Rodilla', 'Dedos'], correcta: 0 },
  { enunciado: 'La columna vertebral protege...', pregunta: '¿Qué protege?', opciones: ['La médula espinal', 'El corazón', 'El estómago', 'Los ojos'], correcta: 0 },
  { enunciado: '¿Dónde se unen dos huesos?', pregunta: '🔗', opciones: ['Articulaciones', 'Músculos', 'Uñas', 'Piel'], correcta: 0 },
  { enunciado: '¿Cómo se llama la parte donde se unen las costillas al frente?', pregunta: '📍', opciones: ['Esternón', 'Fémur', 'Rótula', 'Cráneo'], correcta: 0 },
  { enunciado: '¿Qué nutriente hace fuertes a los huesos?', pregunta: '🥛', opciones: ['Calcio', 'Azúcar', 'Sal', 'Grasa'], correcta: 0 },
  { enunciado: '¿Qué alimento tiene mucho calcio?', pregunta: '🥛🧀', opciones: ['Leche y queso', 'Dulces', 'Papas fritas', 'Gaseosa'], correcta: 0 },
  { enunciado: '¿Qué vitamina ayuda a fijar el calcio en los huesos?', pregunta: '☀️', opciones: ['Vitamina D (del sol)', 'Vitamina Z', 'Vitamina X', 'Vitamina Q'], correcta: 0 },
  { enunciado: '¿Qué haces si se te rompe un hueso?', pregunta: '🩹', opciones: ['Ir al médico y usar yeso', 'Correr', 'Nada, se cura solo', 'Bañarme'], correcta: 0 },
  { enunciado: 'V/F: Los huesos están vivos y crecen contigo', pregunta: '¿V o F?', opciones: ['Verdadero', 'Falso'], correcta: 0 },
  { enunciado: 'V/F: Los huesos no se rompen nunca si te caes', pregunta: '¿V o F?', opciones: ['Verdadero', 'Falso'], correcta: 1 },
  { enunciado: 'Un hueso plano es la...', pregunta: '¿Cuál es plano?', opciones: ['Costilla', 'Fémur', 'Húmero', 'Tibia'], correcta: 0 },
  { enunciado: 'Dentro de algunos huesos está la médula ___ que fabrica sangre:', pregunta: '🩸', opciones: ['Ósea', 'Muscular', 'Nerviosa', 'Digestiva'], correcta: 0 },
  { enunciado: '¿Qué hueso hay en la rodilla?', pregunta: '🦵', opciones: ['Rótula', 'Cráneo', 'Costilla', 'Muñeca'], correcta: 0 },
  { enunciado: 'Hacer ejercicio y saltar hace tus huesos más...', pregunta: '💪🦴', opciones: ['Fuertes y sanos', 'Débiles', 'Más pequeños', 'Blandos'], correcta: 0 },
]

// =========================================================
// 💪 SISTEMA MUSCULAR
// =========================================================
const BANCO_MUSCULAR = [
  { enunciado: '💪 ¿Qué sistema nos permite movernos?', pregunta: 'Función principal', opciones: ['Muscular', 'Digestivo', 'Nervioso', 'Óseo'], correcta: 0 },
  { enunciado: '¿Cuántos músculos aproximadamente tiene el cuerpo?', pregunta: '🔢', opciones: ['Más de 600', '10', '50', '5000'], correcta: 0 },
  { enunciado: '¿Los músculos se unen a los huesos por medio de...?', pregunta: '🔗', opciones: ['Tendones', 'Venas', 'Nervios', 'Uñas'], correcta: 0 },
  { enunciado: '¿Cuál es el músculo más fuerte del cuerpo?', pregunta: '🍔', opciones: ['Masetero (mandíbula)', 'Bíceps', 'Cuádriceps', 'Corazón'], correcta: 0 },
  { enunciado: '¿Qué músculo está en la parte de adelante del brazo?', pregunta: '💪', opciones: ['Bíceps', 'Tríceps', 'Glúteo', 'Pantorrilla'], correcta: 0 },
  { enunciado: '¿Qué músculo está en la parte de atrás del brazo?', pregunta: '🔙', opciones: ['Tríceps', 'Bíceps', 'Corazón', 'Cara'], correcta: 0 },
  { enunciado: 'El corazón es un tipo especial de músculo llamado...', pregunta: '❤️', opciones: ['Músculo cardíaco', 'Músculo esquelético', 'Músculo liso', 'Hueso'], correcta: 0 },
  { enunciado: '¿Qué músculo del muslo es muy grande y fuerte?', pregunta: '🦵', opciones: ['Cuádriceps', 'Bíceps', 'Deltoides', 'Cráneo'], correcta: 0 },
  { enunciado: 'La pantorrilla está en...', pregunta: '📍', opciones: ['La parte de atrás de la pierna', 'El brazo', 'El pecho', 'La espalda'], correcta: 0 },
  { enunciado: '¿Los músculos también piensan?', pregunta: '🧠', opciones: ['No, reciben órdenes del cerebro', 'Sí, piensan solos', 'A veces', 'Solo en la noche'], correcta: 0 },
  { enunciado: '¿Los músculos crecen con...?', pregunta: '🏋️', opciones: ['Ejercicio y buena alimentación', 'Ver televisión', 'Dormir siempre', 'Comer solo dulces'], correcta: 0 },
  { enunciado: '¿Qué alimento ayuda a los músculos?', pregunta: '🍗', opciones: ['Proteínas (carne, huevo, frijoles)', 'Solo chocolates', 'Solo agua', 'Nada'], correcta: 0 },
  { enunciado: 'Antes de hacer ejercicio debemos...', pregunta: '🤸', opciones: ['Calentar y estirar', 'Comer mucho', 'Dormir', 'Nada'], correcta: 0 },
  { enunciado: 'V/F: Los músculos trabajan en parejas (uno se estira, otro se contrae)', pregunta: '¿V o F?', opciones: ['Verdadero', 'Falso'], correcta: 0 },
  { enunciado: 'V/F: Sonreír usa más músculos que fruncir el ceño', pregunta: '¿V o F?', opciones: ['Verdadero', 'Falso'], correcta: 0 },
  { enunciado: '¿Cuál es el músculo que trabaja las 24 horas del día sin parar?', pregunta: '⏰', opciones: ['El corazón', 'El bíceps', 'La cara', 'La lengua'], correcta: 0 },
  { enunciado: 'Si no usas los músculos, se...', pregunta: '📉', opciones: ['Debilitan', 'Fortalecen', 'Duermen', 'Ríen'], correcta: 0 },
  { enunciado: '¿Qué músculo ayuda a respirar?', pregunta: '🫁', opciones: ['Diafragma', 'Bíceps', 'Cuádriceps', 'Cara'], correcta: 0 },
  { enunciado: 'Los músculos de los intestinos son...', pregunta: '🌭', opciones: ['Lisos (involuntarios)', 'Muy grandes', 'Muy duros', 'Como huesos'], correcta: 0 },
  { enunciado: 'Un calambre es cuando el músculo...', pregunta: '😖', opciones: ['Se contrae de repente y duele', 'Crece', 'Se ríe', 'Se enfría'], correcta: 0 },
]

// =========================================================
// ❤️ SISTEMA CIRCULATORIO
// =========================================================
const BANCO_CIRCULATORIO = [
  { enunciado: '❤️ ¿Qué sistema transporta la sangre por el cuerpo?', pregunta: 'Función principal', opciones: ['Circulatorio', 'Digestivo', 'Óseo', 'Muscular'], correcta: 0 },
  { enunciado: '¿Cuál es el órgano más importante del sistema circulatorio?', pregunta: '❤️', opciones: ['Corazón', 'Cerebro', 'Estómago', 'Riñón'], correcta: 0 },
  { enunciado: 'El corazón está protegido por...', pregunta: '🛡️', opciones: ['Las costillas', 'El cráneo', 'La cadera', 'Los dedos'], correcta: 0 },
  { enunciado: '¿Cuántas veces late el corazón en un minuto en reposo?', pregunta: '⏱️', opciones: ['Entre 60 y 100', '2', '10', '1000'], correcta: 0 },
  { enunciado: '¿Los vasos que llevan sangre desde el corazón se llaman...?', pregunta: '➡️❤️', opciones: ['Arterias', 'Venas', 'Nervios', 'Tendones'], correcta: 0 },
  { enunciado: '¿Los vasos que traen la sangre de vuelta al corazón?', pregunta: '❤️⬅️', opciones: ['Venas', 'Arterias', 'Huesos', 'Uñas'], correcta: 0 },
  { enunciado: '¿Los vasos más pequeñitos donde se hace el intercambio?', pregunta: '🔬', opciones: ['Capilares', 'Arterias grandes', 'Venas grandes', 'Huesos'], correcta: 0 },
  { enunciado: '¿Cuántas cámaras tiene el corazón?', pregunta: '🏠', opciones: ['4', '2', '1', '8'], correcta: 0 },
  { enunciado: '¿Qué llevan las arterias principalmente?', pregunta: '🩸💨', opciones: ['Sangre con oxígeno', 'Aire solamente', 'Comida', 'Agua sucia'], correcta: 0 },
  { enunciado: 'La sangre está formada por...', pregunta: '🧪', opciones: ['Glóbulos rojos, blancos y plaquetas', 'Solo agua', 'Solo grasa', 'Aire'], correcta: 0 },
  { enunciado: '¿Qué hacen los glóbulos rojos?', pregunta: '🔴', opciones: ['Llevan oxígeno', 'Combaten enfermedades', 'Cierran heridas', 'Piensan'], correcta: 0 },
  { enunciado: '¿Qué hacen los glóbulos blancos?', pregunta: '⚪', opciones: ['Combaten microbios y enfermedades', 'Llevan oxígeno', 'Duermen', 'Cortan uñas'], correcta: 0 },
  { enunciado: '¿Qué hacen las plaquetas?', pregunta: '🩹', opciones: ['Cierran las heridas', 'Piensan', 'Cantan', 'Comen'], correcta: 0 },
  { enunciado: 'Para tener un corazón sano hay que...', pregunta: '💪❤️', opciones: ['Hacer ejercicio y comer sano', 'Ver TV todo el día', 'Comer solo dulces', 'No dormir'], correcta: 0 },
  { enunciado: 'V/F: El corazón nunca descansa, late toda la vida', pregunta: '¿V o F?', opciones: ['Verdadero', 'Falso'], correcta: 0 },
  { enunciado: 'V/F: La sangre azul de las venas es un mito, en realidad es roja', pregunta: '¿V o F?', opciones: ['Verdadero', 'Falso'], correcta: 0 },
  { enunciado: '¿Aproximadamente cuánta sangre tiene un adulto?', pregunta: '🩸 Dato curioso', opciones: ['5 litros', '100 litros', '1 vaso', '50 litros'], correcta: 0 },
  { enunciado: 'El pulso lo puedes sentir en...', pregunta: '📍', opciones: ['La muñeca y el cuello', 'La rodilla', 'La oreja', 'El pelo'], correcta: 0 },
  { enunciado: 'La sangre lleva oxígeno desde...', pregunta: '🔄', opciones: ['Los pulmones a todas las células', 'La boca a los ojos', 'La piel a los huesos', 'Los pies a la cabeza'], correcta: 0 },
  { enunciado: 'Fumar hace daño al sistema circulatorio porque...', pregunta: '🚭', opciones: ['Daña el corazón y los pulmones', 'Nada, es bueno', 'Da fuerza', 'Ayuda a crecer'], correcta: 0 },
]

// =========================================================
// 🧠 SISTEMA NERVIOSO
// =========================================================
const BANCO_NERVIOSO = [
  { enunciado: '🧠 ¿Qué sistema controla todo el cuerpo y nuestros pensamientos?', pregunta: 'Función principal', opciones: ['Nervioso', 'Circulatorio', 'Óseo', 'Digestivo'], correcta: 0 },
  { enunciado: '¿Cuál es el órgano más importante del sistema nervioso?', pregunta: '🧠', opciones: ['Cerebro', 'Corazón', 'Pulmón', 'Estómago'], correcta: 0 },
  { enunciado: '¿Qué protege el cerebro?', pregunta: '🛡️', opciones: ['El cráneo', 'La piel', 'Los músculos', 'La ropa'], correcta: 0 },
  { enunciado: '¿Cómo se llama el "cable principal" que va del cerebro por la espalda?', pregunta: '🔌', opciones: ['Médula espinal', 'Arteria', 'Vena', 'Tendón'], correcta: 0 },
  { enunciado: '¿Qué protege la médula espinal?', pregunta: '🛡️', opciones: ['La columna vertebral', 'El estómago', 'Los pulmones', 'La piel'], correcta: 0 },
  { enunciado: '¿Cómo se llaman los "cables pequeños" que llevan mensajes?', pregunta: '📡', opciones: ['Nervios', 'Venas', 'Huesos', 'Tendones'], correcta: 0 },
  { enunciado: '¿Cuántos sentidos tenemos?', pregunta: '🖐️👁️👂👃👅', opciones: ['5', '2', '10', '20'], correcta: 0 },
  { enunciado: 'La vista la controlan los...', pregunta: '👁️', opciones: ['Ojos', 'Oídos', 'Manos', 'Dedos'], correcta: 0 },
  { enunciado: 'El oído lo controlan las...', pregunta: '👂', opciones: ['Orejas', 'Manos', 'Piernas', 'Ojos'], correcta: 0 },
  { enunciado: 'El olfato lo controla la...', pregunta: '👃', opciones: ['Nariz', 'Lengua', 'Piel', 'Boca'], correcta: 0 },
  { enunciado: 'El gusto lo controla la...', pregunta: '👅', opciones: ['Lengua', 'Nariz', 'Oreja', 'Ojo'], correcta: 0 },
  { enunciado: 'El tacto lo controla la...', pregunta: '🖐️', opciones: ['Piel', 'Lengua', 'Oreja', 'Cabello'], correcta: 0 },
  { enunciado: '¿Cuántas neuronas tiene el cerebro (aprox.)?', pregunta: '🔢 Dato curioso', opciones: ['Miles de millones', '10', '100', '500'], correcta: 0 },
  { enunciado: 'El sistema nervioso trabaja como el...', pregunta: '🖥️ Comparación', opciones: ['Director del cuerpo', 'Repartidor', 'Panadero', 'Cocinero'], correcta: 0 },
  { enunciado: '¿Qué necesita el cerebro para funcionar bien?', pregunta: '😴', opciones: ['Dormir suficiente', 'Estar despierto siempre', 'No comer', 'No jugar'], correcta: 0 },
  { enunciado: 'V/F: Un niño necesita dormir más horas que un adulto', pregunta: '¿V o F?', opciones: ['Verdadero', 'Falso'], correcta: 0 },
  { enunciado: 'V/F: El cerebro pesa igual que el corazón', pregunta: '¿V o F?', opciones: ['Verdadero', 'Falso'], correcta: 1 },
  { enunciado: '¿Qué actividad ayuda a que el cerebro sea más fuerte?', pregunta: '🧩', opciones: ['Leer, estudiar y resolver rompecabezas', 'Ver TV sin pensar', 'No hacer nada', 'Solo jugar en el celular'], correcta: 0 },
  { enunciado: 'Cuando tocas algo caliente y quitas la mano rápido, es un...', pregunta: '⚡', opciones: ['Reflejo', 'Sueño', 'Estornudo', 'Bostezo'], correcta: 0 },
  { enunciado: '¿Cuál es el "jefe" que le dice al corazón que lata?', pregunta: '👔', opciones: ['El cerebro', 'El estómago', 'La piel', 'La rodilla'], correcta: 0 },
]

// =========================================================
// 🫁 SISTEMA RESPIRATORIO
// =========================================================
const BANCO_RESPIRATORIO = [
  { enunciado: '🫁 ¿Qué sistema nos permite respirar?', pregunta: 'Función principal', opciones: ['Respiratorio', 'Digestivo', 'Óseo', 'Muscular'], correcta: 0 },
  { enunciado: '¿Qué gas necesitamos para vivir?', pregunta: '💨', opciones: ['Oxígeno', 'Nitrógeno', 'Humo', 'Vapor'], correcta: 0 },
  { enunciado: '¿Qué gas expulsamos al respirar?', pregunta: '💨⬅️', opciones: ['Dióxido de carbono', 'Oxígeno', 'Agua', 'Hierro'], correcta: 0 },
  { enunciado: '¿Cuáles son los órganos principales del sistema respiratorio?', pregunta: '🫁🫁', opciones: ['Los pulmones', 'Los ojos', 'Los brazos', 'Los pies'], correcta: 0 },
  { enunciado: '¿Cuántos pulmones tenemos?', pregunta: '🔢', opciones: ['2', '1', '4', '10'], correcta: 0 },
  { enunciado: '¿Por dónde entra normalmente el aire al cuerpo?', pregunta: '👃', opciones: ['Nariz', 'Ojos', 'Oídos', 'Boca del estómago'], correcta: 0 },
  { enunciado: 'La nariz calienta, humedece y ___ el aire:', pregunta: '🧼', opciones: ['Filtra', 'Enfría', 'Congela', 'Corta'], correcta: 0 },
  { enunciado: '¿Cómo se llama el tubo que lleva el aire a los pulmones?', pregunta: '📏', opciones: ['Tráquea', 'Esófago', 'Arteria', 'Nervio'], correcta: 0 },
  { enunciado: 'La tráquea se divide en dos tubos llamados...', pregunta: '🔀', opciones: ['Bronquios', 'Venas', 'Huesos', 'Uñas'], correcta: 0 },
  { enunciado: 'Los saquitos pequeños dentro del pulmón se llaman...', pregunta: '🔬', opciones: ['Alvéolos', 'Neuronas', 'Costillas', 'Dedos'], correcta: 0 },
  { enunciado: '¿Qué músculo debajo de los pulmones ayuda a respirar?', pregunta: '💪🫁', opciones: ['Diafragma', 'Bíceps', 'Cuádriceps', 'Cara'], correcta: 0 },
  { enunciado: '¿Cuántas respiraciones hace un niño por minuto (aprox.)?', pregunta: '⏱️', opciones: ['Entre 20 y 30', '1', '5', '200'], correcta: 0 },
  { enunciado: 'La respiración lleva oxígeno hasta...', pregunta: '🔄', opciones: ['Todas las células del cuerpo', 'Solo la nariz', 'Solo el estómago', 'Solo los pies'], correcta: 0 },
  { enunciado: '¿Qué debemos evitar para cuidar los pulmones?', pregunta: '🚭', opciones: ['El humo del cigarrillo', 'Correr y jugar', 'Reír', 'Tomar agua'], correcta: 0 },
  { enunciado: '¿Qué es bueno para los pulmones?', pregunta: '🌳', opciones: ['Aire limpio y hacer ejercicio', 'Aire contaminado', 'No respirar profundo', 'Fumar'], correcta: 0 },
  { enunciado: 'V/F: Los pulmones también sirven para hablar y cantar', pregunta: '¿V o F?', opciones: ['Verdadero', 'Falso'], correcta: 0 },
  { enunciado: 'V/F: Solo respiramos con la boca', pregunta: '¿V o F?', opciones: ['Verdadero', 'Falso'], correcta: 1 },
  { enunciado: 'El sistema respiratorio y el circulatorio son...', pregunta: '🤝', opciones: ['Compañeros: uno trae oxígeno y otro lo reparte', 'Enemigos', 'Iguales', 'Independientes'], correcta: 0 },
  { enunciado: 'Cuando estornudas, ¿qué expulsas?', pregunta: '🤧', opciones: ['Aire con microbios y polvo', 'Sangre', 'Comida', 'Sudor'], correcta: 0 },
  { enunciado: 'La gripa es una enfermedad del sistema...', pregunta: '🤧', opciones: ['Respiratorio', 'Digestivo', 'Óseo', 'Muscular'], correcta: 0 },
  { enunciado: 'Al respirar profundo el diafragma se...', pregunta: '⬇️', opciones: ['Baja y hace espacio para el aire', 'Sube', 'Explota', 'No se mueve'], correcta: 0 },
]

export const JuegoDigestivo    = crearJuego('sistema-digestivo',    'Sistema digestivo',    BANCO_DIGESTIVO)
export const JuegoOseo         = crearJuego('sistema-oseo',         'Sistema óseo',         BANCO_OSEO)
export const JuegoMuscular     = crearJuego('sistema-muscular',     'Sistema muscular',     BANCO_MUSCULAR)
export const JuegoCirculatorio = crearJuego('sistema-circulatorio', 'Sistema circulatorio', BANCO_CIRCULATORIO)
export const JuegoNervioso     = crearJuego('sistema-nervioso',     'Sistema nervioso',     BANCO_NERVIOSO)
export const JuegoRespiratorio = crearJuego('sistema-respiratorio', 'Sistema respiratorio', BANCO_RESPIRATORIO)
