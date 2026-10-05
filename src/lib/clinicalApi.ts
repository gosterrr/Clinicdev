import { cleanRut, formatRut, isValidRut } from "./rut";
import { doctors } from "../data/clinicalContent";

export interface Patient { rut: string; name: string; email: string; phone: string; insurer: string }
export interface Appointment {
  id: string; rut: string; patientName: string; doctorId: string;
  date: string; time: string; status: "confirmada" | "anulada"; createdAt: string;
}
export interface Feedback { folio: string; kind: string; name: string; email: string; message: string; status: string; createdAt: string }

const K = { pat: "ca_patients", app: "ca_appointments", fb: "ca_feedback" };
const read = <T,>(k: string): T[] => {
  try { return JSON.parse(localStorage.getItem(k) || "[]") as T[]; } catch { return []; }
};
const write = (k: string, v: unknown) => localStorage.setItem(k, JSON.stringify(v));

const TIMES = Array.from({ length: 18 }, (_, i) => {
  const m = 9 * 60 + i * 30;
  return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
});

export function getAvailability(doctorId: string, date: string): string[] {
  const d = new Date(date + "T12:00:00");
  if (Number.isNaN(d.getTime()) || d.getDay() === 0) return [];
  const taken = read<Appointment>(K.app)
    .filter((a) => a.doctorId === doctorId && a.date === date && a.status === "confirmada")
    .map((a) => a.time);
  const now = new Date();
  const today = now.toISOString().slice(0, 10);
  return TIMES.filter((t) => !taken.includes(t) && !(date === today && t <= now.toTimeString().slice(0, 5)));
}

export function savePatient(p: Patient): Patient {
  if (!isValidRut(p.rut)) throw new Error("RUT inválido");
  const rut = formatRut(p.rut);
  const list = read<Patient>(K.pat).filter((x) => cleanRut(x.rut) !== cleanRut(rut));
  const patient = { ...p, rut };
  write(K.pat, [...list, patient]);
  return patient;
}

export function findPatient(rut: string): Patient | undefined {
  return read<Patient>(K.pat).find((p) => cleanRut(p.rut) === cleanRut(rut));
}

export function bookAppointment(rut: string, doctorId: string, date: string, time: string): Appointment {
  const patient = findPatient(rut);
  if (!patient) throw new Error("Paciente no registrado");
  if (!doctors.some((d) => d.id === doctorId)) throw new Error("Profesional inexistente");
  if (!getAvailability(doctorId, date).includes(time)) throw new Error("Horario no disponible");
  const list = read<Appointment>(K.app);
  if (list.some((a) => cleanRut(a.rut) === cleanRut(rut) && a.date === date && a.time === time && a.status === "confirmada"))
    throw new Error("Ya tienes una cita en ese horario");
  const appt: Appointment = {
    id: "CA-" + Math.random().toString(36).slice(2, 8).toUpperCase(),
    rut: patient.rut, patientName: patient.name, doctorId, date, time,
    status: "confirmada", createdAt: new Date().toISOString(),
  };
  write(K.app, [...list, appt]);
  return appt;
}

export const myAppointments = (rut: string) =>
  read<Appointment>(K.app).filter((a) => cleanRut(a.rut) === cleanRut(rut)).sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));

export function cancelAppointment(id: string) {
  write(K.app, read<Appointment>(K.app).map((a) => (a.id === id ? { ...a, status: "anulada" } : a)));
}

export function submitFeedback(f: Omit<Feedback, "folio" | "status" | "createdAt">): Feedback {
  const fb: Feedback = { ...f, folio: "FB-" + Date.now().toString(36).toUpperCase(), status: "Recibido", createdAt: new Date().toISOString() };
  write(K.fb, [...read<Feedback>(K.fb), fb]);
  return fb;
}

export const findFeedback = (folio: string) =>
  read<Feedback>(K.fb).find((f) => f.folio === folio.trim().toUpperCase());
