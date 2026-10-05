import { describe, expect, it } from 'vitest';
import { validateAvailability } from '../shared/availability';
import type { Appointment, Doctor, Patient, Room } from '../shared/types';

const patient: Patient = { id: 'p1', rut: '12345678-5', fullName: 'DEMO', insurance: 'FONASA', active: true, demo: true };
const doctor: Doctor = { id: 'd1', fullName: 'Médico DEMO', specialtyId: 's1', active: true };
const room: Room = { id: 'r1', name: 'SALA-01', active: true };
const now = new Date('2030-01-01T00:00:00.000Z');

function request(appointments: Appointment[] = []) {
  return validateAvailability({
    patient,
    doctor,
    room,
    appointments,
    startsAt: '2030-01-02T10:00:00.000Z',
    endsAt: '2030-01-02T10:30:00.000Z',
    now,
  });
}

describe('motor de disponibilidad', () => {
  it('acepta una reserva futura dentro del horario y sin conflictos', () => {
    expect(request().available).toBe(true);
  });

  it('rechaza solapamiento del médico', () => {
    const appointment = { id: 'a1', code: '0010001-9', patientId: 'p2', doctorId: 'd1', roomId: 'r2', specialtyId: 's1', startsAt: '2030-01-02T10:00:00.000Z', endsAt: '2030-01-02T10:30:00.000Z', status: 'confirmada' as const, createdAt: now.toISOString() };
    expect(request([appointment]).reasons).toContain('El médico ya tiene una cita asignada en este horario.');
  });

  it('rechaza solapamiento de sala', () => {
    const appointment = { id: 'a1', code: '0010001-9', patientId: 'p2', doctorId: 'd2', roomId: 'r1', specialtyId: 's1', startsAt: '2030-01-02T10:15:00.000Z', endsAt: '2030-01-02T10:45:00.000Z', status: 'programada' as const, createdAt: now.toISOString() };
    expect(request([appointment]).reasons).toContain('La sala ya está reservada en este horario.');
  });

  it('ignora una cita cancelada para disponibilidad', () => {
    const appointment = { id: 'a1', code: '0010001-9', patientId: 'p2', doctorId: 'd1', roomId: 'r1', specialtyId: 's1', startsAt: '2030-01-02T10:00:00.000Z', endsAt: '2030-01-02T10:30:00.000Z', status: 'cancelada' as const, createdAt: now.toISOString() };
    expect(request([appointment]).toEqual({ available: true, reasons: [] });
  });
});
