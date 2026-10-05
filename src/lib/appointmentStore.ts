import type { Appointment, WaitingListEntry } from '../../shared/types';
const APPOINTMENTS_KEY = 'clinicdev:appointments';
const WAITING_LIST_KEY = 'clinicdev:waiting-list';
function read<T>(key: string, fallback: T): T { try { const value = window.localStorage.getItem(key); return value ? JSON.parse(value) as T : fallback; } catch { return fallback; } }
function write<T>(key: string, value: T) { window.localStorage.setItem(key, JSON.stringify(value)); }
export function getStoredAppointments(): Appointment[] { return read<Appointment[]>(APPOINTMENTS_KEY, []); }
export function saveAppointments(appointments: Appointment[]) { write(APPOINTMENTS_KEY, appointments); }
export function getStoredWaitingList(): WaitingListEntry[] { return read<WaitingListEntry[]>(WAITING_LIST_KEY, []); }
export function saveWaitingList(entries: WaitingListEntry[]) { write(WAITING_LIST_KEY, entries); }
export function resetDemoStorage() { window.localStorage.removeItem(APPOINTMENTS_KEY); window.localStorage.removeItem(WAITING_LIST_KEY); }
