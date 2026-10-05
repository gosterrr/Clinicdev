export type UserRole = 'admin' | 'recepcion' | 'medico' | 'paciente';

export type AppointmentStatus =
  | 'programada'
  | 'confirmada'
  | 'en_espera'
  | 'cancelada'
  | 'no_show'
  | 'en_atencion'
  | 'atendida'
  | 'migrada';

export type HealthInsurance = 'FONASA' | 'ISAPRE' | 'PARTICULAR';

export interface Specialty {
  id: string;
  code: string;
  name: string;
  durationMinutes: number;
  active: boolean;
}

export interface Doctor {
  id: string;
  fullName: string;
  specialtyId: string;
  active: boolean;
}

export interface Room {
  id: string;
  name: string;
  active: boolean;
}

export interface Patient {
  id: string;
  rut: string;
  fullName: string;
  insurance: HealthInsurance;
  active: boolean;
  demo: true;
}

export interface Appointment {
  id: string;
  code: string;
  patientId: string;
  doctorId: string;
  roomId: string;
  specialtyId: string;
  startsAt: string;
  endsAt: string;
  status: AppointmentStatus;
  createdAt: string;
}

export interface WaitingListEntry {
  id: string;
  patientId: string;
  specialtyId: string;
  requestedAt: string;
  active: boolean;
}
