import { describe, expect, it } from 'vitest';
import { validatePatientInput, validatePatientRut } from '../shared/patientValidation';
const patient = { rut: '12.345.678-5', fullName: 'Paciente Simulado', email: 'paciente@example.invalid', phone: '+56912345678', birthDate: '1990-01-01' };
describe('patient validation', () => {
  it('normalizes a valid checksum', () => { expect(validatePatientRut(patient.rut)).toBe('12345678-5'); });
  it('accepts a lowercase K checksum', () => { expect(validatePatientRut('6.000.000-k')).toBe('6000000-K'); });
  it.each(['12.345.678-9', 'abc123456785', '12..345678-5', '', '00000000-0'])('rejects malformed or invalid RUT %s', value => { expect(() => validatePatientRut(value)).toThrow(); });
  it('returns normalized patient fields', () => { expect(validatePatientInput(patient, '2026-10-05')).toEqual({ ...patient, rut: '12345678-5' }); });
  it.each([['birthDate', '2026-02-30'], ['birthDate', '2027-01-01'], ['email', 'not-an-email'], ['phone', '912345678'], ['fullName', '<script>']])('rejects invalid %s', (field, value) => { expect(() => validatePatientInput({ ...patient, [field]: value }, '2026-10-05')).toThrow(); });
  it('rejects non-object input', () => { expect(() => validatePatientInput(null, '2026-10-05')).toThrow(); });
});
