export interface EMGReading {
  timestamp: string; // ISO 8601 UTC
  emg_average: number | null;
  emg_rms: number | null;
  muscle_load: number | null;
}

export interface EMGStats {
  latest_emg_average: number | null;
  latest_emg_rms: number | null;
  latest_muscle_load: number | null;
  mean_emg_average: number | null;
  mean_emg_rms: number | null;
  mean_muscle_load: number | null;
  record_count: number;
}

export interface EMGResponse {
  readings: EMGReading[];
  stats: EMGStats;
  channel_id: string;
  fetched_at: string;
}

/** Flattened shape used by Recharts */
export interface ChartPoint {
  time: string;       // Local time label
  timestamp: number;  // Unix ms for sorting
  emg_average: number | null;
  emg_rms: number | null;
  muscle_load: number | null;
}
