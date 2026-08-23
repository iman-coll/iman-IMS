export function money(n: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: n >= 100 ? 0 : 2,
  }).format(n);
}

export function num(n: number) {
  return new Intl.NumberFormat("en-US").format(Math.round(n * 100) / 100);
}

export function daysUntil(date: string, today = "2026-08-23") {
  const a = new Date(today + "T00:00:00");
  const b = new Date(date + "T00:00:00");
  return Math.round((b.getTime() - a.getTime()) / 86400000);
}

export function uid(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-3)}`;
}

export function shortDate(iso: string) {
  const d = iso.slice(0, 10);
  const [y, m, day] = d.split("-");
  return `${m}/${day}/${y}`;
}
