export const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

export function formatDateInput(date: Date | string | number) {
  const d = new Date(date);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export function startOfDay(date: Date | string | number) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function daysBetween(a: Date | string | number, b: Date | string | number) {
  const ms = startOfDay(b).getTime() - startOfDay(a).getTime();
  return Math.floor(ms / 86400000);
}

export function generateId() {
  return Math.random().toString(36).slice(2, 9);
}
