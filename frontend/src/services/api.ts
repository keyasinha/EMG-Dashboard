import type { EMGResponse } from "../types/emg";

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api/v1";

export async function fetchEMGData(results = 100): Promise<EMGResponse> {
  const res = await fetch(`${BASE_URL}/emg?results=${results}`);
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`API error ${res.status}: ${detail}`);
  }
  return res.json();
}

export async function downloadCSV(results = 100): Promise<void> {
  const res = await fetch(`${BASE_URL}/emg/export?results=${results}`);
  if (!res.ok) throw new Error("CSV export failed");
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `emg_export_${Date.now()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
