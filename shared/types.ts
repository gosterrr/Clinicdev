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
