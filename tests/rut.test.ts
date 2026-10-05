import { describe, expect, it } from 'vitest';
import { computeDv, formatRut, isValidRut, normalizeRut } from '../shared/rut';

describe('RUT Módulo 11', () => {
  it('calcula el dígito verificador', () => {
    expect(computeDv('12345678')).toBe('5');
    expect(computeDv('11111111')).toBe('1');
  });

  it('acepta RUT válidos con distintos formatos', () => {
    expect(isValidRut('12.345.678-5')).toBe(true);
    expect(isValidRut('12345678-5')).toBe(true);
    expect(isValidRut('123456785')).toBe(true);
  });

  it('rechaza dígito verificador incorrecto', () => {
    expect(isValidRut('12.345.678-9')).toBe(false);
  });

  it('rechaza entradas vacías o demasiado cortas', () => {
    expect(isValidRut('')).toBe(false);
    expect(isValidRut('1-9')).toBe(false);
  });

  it('normaliza y formatea', () => {
    expect(normalizeRut('12.345.678-5')).toBe('12345678-5');
    expect(formatRut('123456785')).toBe('12.345.678-5');
  });
});
