/** Scheduling helpers for the booking flow. */

export interface DayOption {
  iso: string; // yyyy-mm-dd
  weekday: string; // Mon
  day: number; // 14
  month: string; // Jun
  isWeekend: boolean;
}

/** Local yyyy-mm-dd for a Date. */
export function toIsoDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Next `count` selectable days starting tomorrow. */
export function getUpcomingDays(count = 14): DayOption[] {
  const days: DayOption[] = [];
  const cursor = new Date();
  cursor.setDate(cursor.getDate() + 1);

  for (let i = 0; i < count; i += 1) {
    const dow = cursor.getDay();
    days.push({
      iso: toIsoDate(cursor),
      weekday: cursor.toLocaleDateString("en-US", { weekday: "short" }),
      day: cursor.getDate(),
      month: cursor.toLocaleDateString("en-US", { month: "short" }),
      isWeekend: dow === 0 || dow === 6,
    });
    cursor.setDate(cursor.getDate() + 1);
  }
  return days;
}

/**
 * 45-minute slots derived from the published opening hours:
 * Mon–Fri 09:00–17:00 · Sat–Sun 05:00–17:30.
 */
export function getSlotsForDay(day: DayOption): string[] {
  const startHour = day.isWeekend ? 5 : 9;
  const endHour = day.isWeekend ? 17.5 : 17;
  const slots: string[] = [];

  for (let t = startHour; t + 0.75 <= endHour; t += 0.75) {
    const hours = Math.floor(t);
    const minutes = Math.round((t - hours) * 60);
    slots.push(`${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`);
  }
  return slots;
}

/** Combine a yyyy-mm-dd date and HH:mm time into an ISO timestamp (local zone). */
export function toStartsAt(dateIso: string, time: string): string {
  return new Date(`${dateIso}T${time}:00`).toISOString();
}

export function formatSlotLabel(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${period}`;
}

/** Map of yyyy-mm-dd → HH:mm slots already booked for a dentist. */
export type BookedSlotsByDay = Record<string, string[]>;

export function getAvailableSlots(day: DayOption, booked: BookedSlotsByDay): string[] {
  const taken = new Set(booked[day.iso] ?? []);
  return getSlotsForDay(day).filter((slot) => !taken.has(slot));
}

export function dayHasAvailability(day: DayOption, booked: BookedSlotsByDay): boolean {
  return getAvailableSlots(day, booked).length > 0;
}

/** Convert a stored ISO timestamp to a local HH:mm slot key. */
export function slotFromIso(iso: string): string {
  const date = new Date(iso);
  const h = date.getHours();
  const m = date.getMinutes();
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}
