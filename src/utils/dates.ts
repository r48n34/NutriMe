export const todayInHongKong = (date = new Date()) =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Hong_Kong",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
export const dateObject = (date: string) => new Date(`${date}T12:00:00Z`);
export function shiftDate(date: string, days: number) {
  const next = dateObject(date);
  next.setUTCDate(next.getUTCDate() + days);
  return next.toISOString().slice(0, 10);
}
export function weekDates(date: string) {
  const day = dateObject(date).getUTCDay();
  const monday = shiftDate(date, -((day + 6) % 7));
  return Array.from({ length: 7 }, (_, index) => shiftDate(monday, index));
}
export const formatDate = (
  date: string,
  options: Intl.DateTimeFormatOptions = { weekday: "short", day: "numeric", month: "short" },
) =>
  new Intl.DateTimeFormat("en-HK", { ...options, timeZone: "Asia/Hong_Kong" }).format(
    dateObject(date),
  );
export const money = (amount: number) => `HK$${amount.toLocaleString("en-HK")}`;
