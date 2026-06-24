import { useState, useEffect, useCallback, useRef } from "react";
import { fetchEMGData } from "../services/api";
import type { EMGResponse } from "../types/emg";

type Status = "idle" | "loading" | "success" | "error";

interface UseEMGDataReturn {
  data: EMGResponse | null;
  status: Status;
  error: string | null;
  lastUpdated: Date | null;
  refresh: () => void;
}

const POLL_INTERVAL_MS = 5_000;

export function useEMGData(results = 100): UseEMGDataReturn {
  const [data, setData] = useState<EMGResponse | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const load = useCallback(async () => {
    setStatus((prev) => (prev === "idle" ? "loading" : prev));
    try {
      const result = await fetchEMGData(results);
      setData(result);
      setLastUpdated(new Date());
      setStatus("success");
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
      setStatus("error");
    }
  }, [results]);

  useEffect(() => {
    load();
    timerRef.current = setInterval(load, POLL_INTERVAL_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [load]);

  return { data, status, error, lastUpdated, refresh: load };
}
