export function cleanRut(input: string): string {
  return input.replace(/[^0-9kK]/g, '').toUpperCase();
}

export function computeDv(body: string): string {
  let sum = 0;
  let factor = 2;
  for (let i = body.length - 1; i >= 0; i--) {
    sum += Number(body[i]) * factor;
    factor = factor === 7 ? 2 : factor + 1;
  }
  const dv = 11 - (sum % 11);
  if (dv === 11) return '0';
  if (dv === 10) return 'K';
  return String(dv);
}

export function isValidRut(input: string): boolean {
  const clean = cleanRut(input);
  if (clean.length < 8 || clean.length > 9) return false;
  const body = clean.slice(0, -1);
  const dv = clean.slice(-1);
  if (!/^\d+$/.test(body)) return false;
  return computeDv(body) === dv;
}

export function normalizeRut(input: string): string {
  const clean = cleanRut(input);
  return `${clean.slice(0, -1)}-${clean.slice(-1)}`;
}

export function formatRut(input: string): string {
  const clean = cleanRut(input);
  if (clean.length < 2) return clean;
  const body = clean.slice(0, -1).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${body}-${clean.slice(-1)}`;
}
