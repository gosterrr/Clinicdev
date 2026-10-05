import { computeDv } from './rut';

export function buildAppointmentCode(specialtyCode: string, sequence: number): string {
  if (!/^\d{3}$/.test(specialtyCode)) {
    throw new Error('El código de especialidad debe tener 3 dígitos');
  }
  if (!Number.isInteger(sequence) || sequence < 0 || sequence > 9999) {
    throw new Error('El correlativo debe estar entre 0 y 9999');
  }
  const base = `${specialtyCode}${String(sequence).padStart(4, '0')}`;
  return `${base}-${computeDv(base)}`;
}

export function isValidAppointmentCode(code: string): boolean {
  const match = /^(\d{7})-([0-9K])$/.exec(code.toUpperCase());
  if (!match) return false;
  return computeDv(match[1]) === match[2];
}
