import { format, parseISO } from "date-fns";
import type { EMGReading, ChartPoint } from "../types/emg";

export function toLocalTime(isoUtc: string): string {
  return format(parseISO(isoUtc), "HH:mm:ss");
}

export function toLocalDateTime(isoUtc: string): string {
  return format(parseISO(isoUtc), "dd MMM yyyy, HH:mm:ss");
}

export function readingsToChartPoints(readings: EMGReading[]): ChartPoint[] {
  return readings.map((r) => ({
    time: toLocalTime(r.timestamp),
    timestamp: parseISO(r.timestamp).getTime(),
    emg_average: r.emg_average,
    emg_rms: r.emg_rms,
    muscle_load: r.muscle_load,
  }));
}

export function formatValue(val: number | null | undefined, decimals = 2): string {
  if (val === null || val === undefined) return "—";
  return val.toFixed(decimals);
}
