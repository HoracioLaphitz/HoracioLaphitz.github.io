import { describe, it, expect } from "vitest";
import { getAvailabilityStatus } from "../availability";

describe("getAvailabilityStatus", () => {
  it("returns available at 08:00 ART (11:00 UTC)", () => {
    const date = new Date("2026-08-21T11:00:00.000Z");
    const status = getAvailabilityStatus(date);
    expect(status.isAvailable).toBe(true);
    expect(status.hours).toBe(8);
    expect(status.minutes).toBe(0);
    expect(status.timeString).toBe("08:00");
    expect(status.label).toContain("Disponible");
  });

  it("returns available during mid-day at 14:30 ART (17:30 UTC)", () => {
    const date = new Date("2026-08-21T17:30:00.000Z");
    const status = getAvailabilityStatus(date);
    expect(status.isAvailable).toBe(true);
    expect(status.hours).toBe(14);
    expect(status.minutes).toBe(30);
    expect(status.timeString).toBe("14:30");
  });

  it("returns available at boundary 20:00 ART (23:00 UTC)", () => {
    const date = new Date("2026-08-21T23:00:00.000Z");
    const status = getAvailabilityStatus(date);
    expect(status.isAvailable).toBe(true);
    expect(status.hours).toBe(20);
    expect(status.minutes).toBe(0);
    expect(status.timeString).toBe("20:00");
  });

  it("returns unavailable after 20:00, e.g. 20:01 ART (23:01 UTC)", () => {
    const date = new Date("2026-08-21T23:01:00.000Z");
    const status = getAvailabilityStatus(date);
    expect(status.isAvailable).toBe(false);
    expect(status.hours).toBe(20);
    expect(status.minutes).toBe(1);
    expect(status.label).toContain("No disponible");
  });

  it("returns unavailable at night 23:00 ART (02:00 UTC next day)", () => {
    const date = new Date("2026-08-22T02:00:00.000Z");
    const status = getAvailabilityStatus(date);
    expect(status.isAvailable).toBe(false);
    expect(status.hours).toBe(23);
    expect(status.minutes).toBe(0);
  });

  it("returns unavailable before 08:00, e.g. 07:59 ART (10:59 UTC)", () => {
    const date = new Date("2026-08-21T10:59:00.000Z");
    const status = getAvailabilityStatus(date);
    expect(status.isAvailable).toBe(false);
    expect(status.hours).toBe(7);
    expect(status.minutes).toBe(59);
  });

  it("returns unavailable at midnight 00:00 ART (03:00 UTC)", () => {
    const date = new Date("2026-08-21T03:00:00.000Z");
    const status = getAvailabilityStatus(date);
    expect(status.isAvailable).toBe(false);
    expect(status.hours).toBe(0);
    expect(status.minutes).toBe(0);
  });
});
