import { buildAppointmentCode } from '../../shared/appointmentCode';
import type { Appointment, Doctor, Patient, Room, Specialty, WaitingListEntry } from '../../shared/types';

export const specialties: Specialty[] = [
  { id: 'spe-001', code: '001', name: 'Medicina General', durationMinutes: 30, active: true },
  { id: 'spe-002', code: '002', name: 'Pediatría', durationMinutes: 30, active: true },
  { id: 'spe-003', code: '003', name: 'Cardiología', durationMinutes: 45, active: true },
  { id: 'spe-004', code: '004', name: 'Traumatología', durationMinutes: 30, active: true },
  { id: 'spe-005', code: '005', name: 'Ginecología', durationMinutes: 45, active: true },
];

export const rooms: Room[] = Array.from({ length: 50 }, (_, index) => ({
  id: `room-${String(index + 1).padStart(2, '0')}`,
  name: `SALA-${String(index + 1).padStart(2, '0')}`,
  active: true,
}));

export const doctors: Doctor[] = [
  { id: 'doc-001', fullName: 'Dra. Sofía Rojas (DEMO)', specialtyId: 'spe-001', active: true },
  { id: 'doc-002', fullName: 'Dr. Martín Vega (DEMO)', specialtyId: 'spe-002', active: true },
  { id: 'doc-003', fullName: 'Dra. Valentina Soto (DEMO)', specialtyId: 'spe-003', active: true },
  { id: 'doc-004', fullName: 'Dr. Nicolás Fuentes (DEMO)', specialtyId: 'spe-004', active: true },
  { id: 'doc-005', fullName: 'Dra. Camila Reyes (DEMO)', specialtyId: 'spe-005', active: true },
];

export const patients: Patient[] = [
  { id: 'pat-001', rut: '12345678-5', fullName: 'Paciente Uno DEMO', insurance: 'FONASA', active: true, demo: true },
  { id: 'pat-002', rut: '11111111-1', fullName: 'Paciente Dos DEMO', insurance: 'ISAPRE', active: true, demo: true },
  { id: 'pat-003', rut: '22222222-2', fullName: 'Paciente Tres DEMO', insurance: 'PARTICULAR', active: true, demo: true },
];

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const isoAt = (hour: number, minute = 0) => {
  const date = new Date(tomorrow);
  date.setHours(hour, minute, 0, 0);
  return date.toISOString();
};

export const appointments: Appointment[] = [
  {
    id: 'apt-001',
    code: buildAppointmentCode('001', 1),
    patientId: 'pat-001',
    doctorId: 'doc-001',
    roomId: 'room-01',
    specialtyId: 'spe-001',
    startsAt: isoAt(9),
    endsAt: isoAt(9, 30),
    status: 'confirmada',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'apt-002',
    code: buildAppointmentCode('003', 2),
    patientId: 'pat-002',
    doctorId: 'doc-003',
    roomId: 'room-03',
    specialtyId: 'spe-003',
    startsAt: isoAt(10),
    endsAt: isoAt(10, 45),
    status: 'programada',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'apt-003',
    code: buildAppointmentCode('004', 3),
    patientId: 'pat-003',
    doctorId: 'doc-004',
    roomId: 'room-04',
    specialtyId: 'spe-004',
    startsAt: isoAt(11),
    endsAt: isoAt(11, 30),
    status: 'cancelada',
    createdAt: new Date().toISOString(),
  },
];

export const waitingList: WaitingListEntry[] = [
  { id: 'wait-001', patientId: 'pat-003', specialtyId: 'spe-001', requestedAt: new Date().toISOString(), active: true },
];
