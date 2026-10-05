import type { Appointment, Doctor, Patient, Room } from './types';

export interface AvailabilityInput {
  patient: Patient;
  doctor: Doctor;
  room: Room;
  startsAt: string;
  endsAt: string;
  appointments: Appointment[];
  now?: Date;
}

export interface AvailabilityResult {
  available: boolean;
  reasons: string[];
}

const BLOCKING_STATUSES = new Set<Appointment['status']>([
  'programada',
  'confirmada',
  'en_atencion',
  'migrada',
]);

function overlaps(startA: Date, endA: Date, startB: Date, endB: Date): boolean {
  return startA < endB && endA > startB;
}

export function validateAvailability(input: AvailabilityInput): AvailabilityResult {
  const reasons: string[] = [];
  const start = new Date(input.startsAt);
  const end = new Date(input.endsAt);
  const now = input.now ?? new Date();

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    reasons.push('La fecha u hora ingresada no es válida.');
    return { available: false, reasons };
  }
  if (start >= end) reasons.push('La hora de término debe ser posterior al inicio.');
  if (start <= now) reasons.push('No se pueden reservar horas en el pasado.');
  if (start.getHours() < 8 || end.getHours() > 20 || (end.getHours() === 20 && end.getMinutes() > 0)) {
    reasons.push('La atención debe realizarse entre las 08:00 y las 20:00.');
  }
  if (!input.patient.active) reasons.push('El paciente no está habilitado para reservar.');
  if (!input.doctor.active) reasons.push('El médico no está habilitado.');
  if (!input.room.active) reasons.push('La sala no está habilitada.');

  for (const appointment of input.appointments) {
    if (!BLOCKING_STATUSES.has(appointment.status)) continue;
    const appointmentStart = new Date(appointment.startsAt);
    const appointmentEnd = new Date(appointment.endsAt);
    if (!overlaps(start, end, appointmentStart, appointmentEnd)) continue;

    if (appointment.patientId === input.patient.id) reasons.push('El paciente ya tiene una cita que se cruza con este horario.');
    if (appointment.doctorId === input.doctor.id) reasons.push('El médico ya tiene una cita asignada en este horario.');
    if (appointment.roomId === input.room.id) reasons.push('La sala ya está reservada en este horario.');
  }

  return { available: reasons.length === 0, reasons };
}
