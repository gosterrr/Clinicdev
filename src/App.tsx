import { useMemo, useState } from 'react';
import { buildAppointmentCode } from '../shared/appointmentCode';
import { validateAvailability } from '../shared/availability';
import type { Appointment } from '../shared/types';
import { appointments as seedAppointments, doctors, patients, rooms, specialties } from './data/demo';
import { formatRut, isValidRut, normalizeRut } from '../shared/rut';

const slots = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30'];

function toLocalInputDate(date: Date) {
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 10);
}

function at(date: string, time: string, durationMinutes: number) {
  const start = new Date(`${date}T${time}:00`);
  const end = new Date(start.getTime() + durationMinutes * 60_000);
  return { startsAt: start.toISOString(), endsAt: end.toISOString() };
}

export default function App() {
  const tomorrow = useMemo(() => {
    const value = new Date();
    value.setDate(value.getDate() + 1);
    return toLocalInputDate(value);
  }, []);

  const [rut, setRut] = useState('');
  const [rutTouched, setRutTouched] = useState(false);
  const [specialtyId, setSpecialtyId] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [roomId, setRoomId] = useState('room-01');
  const [date, setDate] = useState(tomorrow);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [createdAppointments, setCreatedAppointments] = useState<Appointment[]>([]);
  const [receipt, setReceipt] = useState<Appointment | null>(null);
  const [submitError, setSubmitError] = useState('');

  const rutValid = isValidRut(rut);
  const patient = rutValid ? patients.find((item) => item.rut === normalizeRut(rut)) : undefined;
  const specialty = specialties.find((item) => item.id === specialtyId);
  const filteredDoctors = doctors.filter((item) => item.specialtyId === specialtyId && item.active);
  const doctor = doctors.find((item) => item.id === doctorId);
  const room = rooms.find((item) => item.id === roomId);
  const allAppointments = [...seedAppointments, ...createdAppointments];

  const slotResult = (time: string) => {
    if (!patient || !doctor || !room || !specialty) return null;
    const range = at(date, time, specialty.durationMinutes);
    return validateAvailability({ patient, doctor, room, appointments: allAppointments, ...range });
  };

  const canContinue = Boolean(patient && specialty && doctor && room && selectedSlot);

  function selectSpecialty(value: string) {
    setSpecialtyId(value);
    setDoctorId('');
    setSelectedSlot('');
    setSubmitError('');
  }

  function createAppointment() {
    if (!patient || !specialty || !doctor || !room || !selectedSlot) return;
    const range = at(date, selectedSlot, specialty.durationMinutes);
    const result = validateAvailability({ patient, doctor, room, appointments: allAppointments, ...range });
    if (!result.available) {
      setSubmitError(result.reasons.join(' '));
      return;
    }
    const appointment: Appointment = {
      id: `apt-demo-${Date.now()}`,
      code: buildAppointmentCode(specialty.code, allAppointments.length + 1),
      patientId: patient.id,
      doctorId: doctor.id,
      roomId: room.id,
      specialtyId: specialty.id,
      ...range,
      status: 'programada',
      createdAt: new Date().toISOString(),
    };
    setCreatedAppointments((current) => [...current, appointment]);
    setReceipt(appointment);
    setSubmitError('');
  }

  function resetBooking() {
    setSpecialtyId('');
    setDoctorId('');
    setRoomId('room-01');
    setSelectedSlot('');
    setReceipt(null);
    setSubmitError('');
  }

  if (receipt) {
    const receiptSpecialty = specialties.find((item) => item.id === receipt.specialtyId);
    const receiptDoctor = doctors.find((item) => item.id === receipt.doctorId);
    const receiptRoom = rooms.find((item) => item.id === receipt.roomId);
    return (
      <main className="page">
        <header className="topbar"><strong>Clínica Gestión</strong><span>Comprobante digital</span></header>
        <section className="card receipt">
          <span className="eyebrow">Cita registrada</span>
          <h1>Tu hora fue reservada</h1>
          <p className="receipt-code">{receipt.code}</p>
          <dl>
            <div><dt>Paciente</dt><dd>{patient?.fullName}</dd></div>
            <div><dt>Especialidad</dt><dd>{receiptSpecialty?.name}</dd></div>
            <div><dt>Profesional</dt><dd>{receiptDoctor?.fullName}</dd></div>
            <div><dt>Sala</dt><dd>{receiptRoom?.name}</dd></div>
            <div><dt>Fecha y hora</dt><dd>{new Date(receipt.startsAt).toLocaleString('es-CL', { dateStyle: 'full', timeStyle: 'short' })}</dd></div>
            <div><dt>Estado</dt><dd>Programada</dd></div>
          </dl>
          <p className="note">Demo: esta reserva queda guardada durante la sesión actual. Posteriormente se persistirá en PostgreSQL/Neon.</p>
          <button className="cta" onClick={resetBooking}>Reservar otra hora</button>
        </section>
      </main>
    );
  }

  return (
    <main className="page">
      <header className="topbar"><strong>Clínica Gestión</strong><span>Atención médica ordenada y disponible</span></header>
      <section className="hero"><p className="eyebrow">Portal de pacientes</p><h1>Reserva tu hora médica</h1><p>Valida tu RUT, elige la atención y confirma solo horarios realmente disponibles.</p></section>
      <section className="booking card">
        <div className="step"><span>1</span><div><h2>Identificación</h2><p>El RUT se valida antes de habilitar la reserva.</p></div></div>
        <label htmlFor="rut">RUT del paciente</label>
        <input id="rut" value={rut} placeholder="12.345.678-5" onChange={(e) => setRut(formatRut(e.target.value))} onBlur={() => setRutTouched(true)} aria-invalid={rutTouched && !rutValid} />
        {rutTouched && !rutValid && <p className="error">El RUT ingresado no es válido. Verifica los números y el dígito verificador.</p>}
        {rutValid && !patient && <p className="error">RUT válido, pero no existe en los datos DEMO. Prueba con 12.345.678-5, 11.111.111-1 o 22.222.222-2.</p>}
        {patient && <p className="ok">Identidad DEMO validada: {patient.fullName} · {patient.insurance}</p>}

        <fieldset disabled={!patient}><div className="step"><span>2</span><div><h2>Atención y profesional</h2><p>Solo aparecen profesionales activos de la especialidad seleccionada.</p></div></div>
          <div className="form-grid">
            <label>Especialidad<select value={specialtyId} onChange={(e) => selectSpecialty(e.target.value)}><option value="">Selecciona una especialidad</option>{specialties.filter((item) => item.active).map((item) => <option key={item.id} value={item.id}>{item.code} · {item.name} ({item.durationMinutes} min)</option>)}</select></label>
            <label>Profesional<select value={doctorId} disabled={!specialtyId} onChange={(e) => { setDoctorId(e.target.value); setSelectedSlot(''); }}><option value="">Selecciona un profesional</option>{filteredDoctors.map((item) => <option key={item.id} value={item.id}>{item.fullName}</option>)}</select></label>
            <label>Sala<select value={roomId} onChange={(e) => { setRoomId(e.target.value); setSelectedSlot(''); }}>{rooms.filter((item) => item.active).slice(0, 10).map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
            <label>Fecha<input type="date" min={tomorrow} value={date} onChange={(e) => { setDate(e.target.value); setSelectedSlot(''); }} /></label>
          </div>
        </fieldset>

        <fieldset disabled={!doctor || !specialty}><div className="step"><span>3</span><div><h2>Horario disponible</h2><p>Los horarios ocupados o inválidos no se pueden seleccionar.</p></div></div>
          <div className="slot-grid">{slots.map((time) => { const result = slotResult(time); const available = result?.available ?? false; return <button type="button" key={time} className={`slot ${selectedSlot === time ? 'selected' : ''}`} disabled={!available} onClick={() => { setSelectedSlot(time); setSubmitError(''); }} title={result?.reasons.join(' ')}>{time}</button>; })}</div>
        </fieldset>

        {selectedSlot && <p className="ok">Horario seleccionado: {date} a las {selectedSlot}.</p>}
        {submitError && <p className="error">{submitError}</p>}
        <button className="cta wide" disabled={!canContinue} onClick={createAppointment}>Confirmar reserva</button>
      </section>
    </main>
  );
}
