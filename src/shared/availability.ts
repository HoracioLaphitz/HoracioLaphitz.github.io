export interface AvailabilityStatus {
  isAvailable: boolean;
  hours: number;
  minutes: number;
  timeString: string;
  label: string;
  shortLabel: string;
}

export const TIMEZONE_ART = "America/Argentina/Buenos_Aires";
export const START_HOUR = 8;
export const END_HOUR = 20;

/**
 * Calculates availability based on 08:00 to 20:00hs ART window.
 */
export function getAvailabilityStatus(
  date: Date = new Date(),
): AvailabilityStatus {
  try {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: TIMEZONE_ART,
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    });
    const parts = formatter.formatToParts(date);
    const hourStr = parts.find((p) => p.type === "hour")?.value ?? "0";
    const minStr = parts.find((p) => p.type === "minute")?.value ?? "0";
    let hours = parseInt(hourStr, 10);
    if (hours === 24) hours = 0;
    const minutes = parseInt(minStr, 10);

    const totalMinutes = hours * 60 + minutes;
    const startMinutes = START_HOUR * 60; // 08:00 -> 480 min
    const endMinutes = END_HOUR * 60; // 20:00 -> 1200 min

    const isAvailable =
      totalMinutes >= startMinutes && totalMinutes <= endMinutes;
    const timeString = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;

    return {
      isAvailable,
      hours,
      minutes,
      timeString,
      label: isAvailable ? "Disponible ahora" : "No disponible ahora ",
      shortLabel: isAvailable ? "Disponible" : "No disponible",
    };
  } catch {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const totalMinutes = hours * 60 + minutes;
    const isAvailable =
      totalMinutes >= START_HOUR * 60 && totalMinutes <= END_HOUR * 60;
    return {
      isAvailable,
      hours,
      minutes,
      timeString: `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`,
      label: isAvailable ? "Disponible ahora" : "No disponible ahora",
      shortLabel: isAvailable ? "Disponible" : "No disponible",
    };
  }
}
