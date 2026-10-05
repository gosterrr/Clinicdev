import { describe, expect, it } from 'vitest';
import { buildAppointmentCode, isValidAppointmentCode } from '../shared/appointmentCode';

describe('Código de cita CCCNNNN-DV', () => {
  it('genera un código válido', () => {
    const code = buildAppointmentCode('003', 125);
    expect(code).toMatch(/^\d{7}-[0-9K]$/);
    expect(isValidAppointmentCode(code)).toBe(true);
  });

  it('detecta un código alterado', () => {
    const code = buildAppointmentCode('003', 125);
    const [body, dv] = code.split('-');
    const wrongDv = dv === '0' ? '1' : '0';
    expect(isValidAppointmentCode(`${body}-${wrongDv}`)).toBe(false);
  });

  it('rechaza especialidad o correlativo inválidos', () => {
    expect(() => buildAppointmentCode('03', 1)).toThrow();
    expect(() => buildAppointmentCode('003', 10000)).toThrow();
  });
});
