export type PatientInput = { rut: string; fullName: string; email: string; phone: string; birthDate: string };
export class PatientValidationError extends Error {
  constructor(public readonly field: string, message: string) { super(message); this.name = 'PatientValidationError'; }
}
function fail(field: string, message: string): never { throw new PatientValidationError(field, message); }
export function validatePatientRut(value: unknown): string {
  if (typeof value !== 'string' || value.length > 20) fail('rut', 'Ingresa un RUT válido.');
  const raw = value.trim().toUpperCase();
  if (!/^(?:[1-9]\d{6,7}-?[0-9K]|[1-9]\d?\.\d{3}\.\d{3}-[0-9K])$/.test(raw)) fail('rut', 'Formato de RUT inválido.');
  const compact = raw.replace(/[.-]/g, '');
  const body = compact.slice(0, -1);
  let sum = 0;
  let factor = 2;
  for (let i = body.length - 1; i >= 0; i--) { sum += Number(body[i]) * factor; factor = factor === 7 ? 2 : factor + 1; }
  const remainder = 11 - sum % 11;
  const expected = remainder === 11 ? '0' : remainder === 10 ? 'K' : String(remainder);
  if (compact.slice(-1) !== expected) fail('rut', 'Dígito verificador incorrecto.');
  return `${body}-${expected}`;
}
export function validatePatientInput(input: unknown, today: string): PatientInput {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(today)) throw new Error('Expected clinic-local date YYYY-MM-DD');
  if (typeof input !== 'object' || input === null || Array.isArray(input)) fail('form', 'Datos inválidos.');
  const data = input as Record<string, unknown>;
  const read = (key: string, max: number): string => {
    const value = data[key];
    if (typeof value !== 'string' || value.length > max) fail(key, 'Campo inválido.');
    return value.trim();
  };
  const rut = validatePatientRut(data.rut);
  const fullName = read('fullName', 150).normalize('NFC').replace(/\s+/g, ' ');
  if (fullName.length < 2 || !/^[\p{L}\p{M}][\p{L}\p{M} '’.-]*$/u.test(fullName)) fail('fullName', 'Ingresa un nombre válido.');
  const email = read('email', 254);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fail('email', 'Correo inválido.');
  const phone = read('phone', 16);
  if (!/^\+[1-9]\d{7,14}$/.test(phone)) fail('phone', 'Usa formato internacional, por ejemplo +56912345678.');
  const birthDate = read('birthDate', 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(birthDate)) fail('birthDate', 'Fecha inválida.');
  const parsed = new Date(`${birthDate}T00:00:00Z`);
  if (!Number.isFinite(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== birthDate || birthDate > today) fail('birthDate', 'Fecha de nacimiento inválida.');
  return { rut, fullName, email, phone, birthDate };
}
