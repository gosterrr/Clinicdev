export const BRAND = "Clínica Alemania";

export interface Specialty { code: string; name: string; description: string }
export interface Doctor { id: string; name: string; specialty: string; room: string }

export const specialties: Specialty[] = [
  { code: "001", name: "Medicina General", description: "Atención primaria y controles de salud para adultos." },
  { code: "002", name: "Pediatría", description: "Seguimiento del crecimiento y salud infantil." },
  { code: "003", name: "Cardiología", description: "Evaluación y prevención de enfermedades del corazón." },
  { code: "004", name: "Dermatología", description: "Cuidado de la piel, cabello y uñas." },
  { code: "005", name: "Ginecología", description: "Salud integral de la mujer." },
  { code: "006", name: "Traumatología", description: "Lesiones y patologías del sistema musculoesquelético." },
  { code: "007", name: "Oftalmología", description: "Control visual y salud ocular." },
  { code: "008", name: "Psicología", description: "Apoyo y acompañamiento en salud mental." },
];

// Profesionales 100% simulados (prototipo de desarrollo).
export const doctors: Doctor[] = [
  { id: "d1", name: "Dra. Camila Rojas (simulada)", specialty: "001", room: "Sala 101" },
  { id: "d2", name: "Dr. Matías Fuentes (simulado)", specialty: "001", room: "Sala 102" },
  { id: "d3", name: "Dra. Valentina Soto (simulada)", specialty: "002", room: "Sala 110" },
  { id: "d4", name: "Dr. Andrés Navarro (simulado)", specialty: "003", room: "Sala 205" },
  { id: "d5", name: "Dra. Isidora Vega (simulada)", specialty: "004", room: "Sala 212" },
  { id: "d6", name: "Dra. Francisca Lagos (simulada)", specialty: "005", room: "Sala 220" },
  { id: "d7", name: "Dr. Tomás Araya (simulado)", specialty: "006", room: "Sala 301" },
  { id: "d8", name: "Dra. Javiera Pinto (simulada)", specialty: "007", room: "Sala 310" },
  { id: "d9", name: "Ps. Sebastián Mora (simulado)", specialty: "008", room: "Sala 315" },
];

export const services = [
  { title: "Telemedicina", text: "Consultas por video con profesionales, desde tu casa." },
  { title: "Exámenes y laboratorio", text: "Toma de muestras e informes de resultados." },
  { title: "Urgencias", text: "Atención de urgencia las 24 horas. En emergencia vital, llama a los servicios oficiales." },
  { title: "Hospitalización", text: "Unidades de cuidado con acompañamiento familiar." },
  { title: "Vacunación", text: "Campañas y esquemas de vacunación para toda la familia." },
  { title: "Chequeos preventivos", text: "Programas de prevención según edad y factores de riesgo." },
];

export const insurers = [
  { name: "FONASA", text: "Atención con bono según tramo y modalidad disponible." },
  { name: "ISAPRE", text: "Convenios con planes de salud. Consulta cobertura con tu aseguradora." },
  { name: "Particular", text: "Pago directo con valores publicados al agendar." },
];

export const faqs = [
  { q: "¿Cómo reservo una hora?", a: "Entra a Reservar hora, ingresa tu RUT, elige especialidad, profesional y horario." },
  { q: "¿Puedo anular mi hora?", a: "Sí, desde Mis citas ingresando tu RUT." },
  { q: "¿Qué datos se guardan?", a: "Solo los necesarios para agendar. No se almacenan datos clínicos." },
  { q: "¿Qué hago ante una emergencia?", a: "Llama a los servicios de emergencia oficiales de tu zona." },
];
