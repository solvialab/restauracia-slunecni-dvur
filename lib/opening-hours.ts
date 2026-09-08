import { restaurantConfig } from "@/config/restaurant";
import type { Locale } from "@/i18n/routing";
const week = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
export function openingHours(locale: Locale) {
  const open = week.filter((d) =>
    (restaurantConfig.openingHours.days as readonly string[]).includes(d),
  );
  const closed = week.filter((d) => !open.includes(d));
  const weekday = (day: string) =>
    new Intl.DateTimeFormat(locale, {
      weekday: "long",
      timeZone: "UTC",
    }).format(new Date(Date.UTC(2024, 0, 1 + week.indexOf(day))));
  const label = (days: string[]) => {
    if (!days.length) return "";
    const continuous = days.every(
      (day, i) =>
        i === 0 || week.indexOf(day) === week.indexOf(days[i - 1]) + 1,
    );
    const text =
      days.length > 1 && continuous
        ? `${weekday(days[0])}–${weekday(days.at(-1)!)}`
        : new Intl.ListFormat(locale).format(days.map(weekday));
    return text.charAt(0).toLocaleUpperCase(locale) + text.slice(1);
  };
  return {
    openDays: label(open),
    closedDays: label(closed),
    time: `${restaurantConfig.openingHours.opens}–${restaurantConfig.openingHours.closes}`,
  };
}
