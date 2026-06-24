import { useDarkMode } from "./hooks/useDarkMode";
import { useEMGData } from "./hooks/useEMGData";
import { readingsToChartPoints } from "./utils/format";
import { Header } from "./components/layout/Header";
import { MetricCard } from "./components/cards/MetricCard";
import { CombinedChart } from "./components/charts/CombinedChart";
import { SingleMetricChart } from "./components/charts/SingleMetricChart";
import { MetricRowSkeleton, ChartSkeleton } from "./components/ui/Skeleton";
import { ErrorBanner } from "./components/ui/ErrorBanner";

const METRICS = [
  {
    key: "emg_average" as const,
    label: "EMG Average",
    unit: "mV",
    fieldId: "field1",
    color: "#1B4FD8",
    accentColor: "bg-blue-700",
  },
  {
    key: "emg_rms" as const,
    label: "EMG RMS",
    unit: "mV",
    fieldId: "field2",
    color: "#0EA5E9",
    accentColor: "bg-sky-500",
  },
  {
    key: "muscle_load" as const,
    label: "Muscle Load",
    unit: "%",
    fieldId: "field3",
    color: "#16a34a",
    accentColor: "bg-green-700",
  },
] as const;

export default function App() {
  const { dark, toggle } = useDarkMode();
  const { data, status, error, lastUpdated, refresh } = useEMGData(100);

  const isLoading = status === "loading" || status === "idle";
  const connectionStatus =
    status === "error" ? "error" : isLoading ? "loading" : "connected";

  const chartPoints = data ? readingsToChartPoints(data.readings) : [];

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <div className="max-w-6xl mx-auto px-5 pb-10">

        <Header
          dark={dark}
          onToggleDark={toggle}
          lastUpdated={lastUpdated}
          onRefresh={refresh}
          isLoading={isLoading}
          connectionStatus={connectionStatus}
        />

        <div className="mt-6 flex flex-col gap-5">

          {status === "error" && error && (
            <ErrorBanner message={error} onRetry={refresh} />
          )}

          {/* Metric row — one ruled container, no separate floating cards */}
          <section>
            <div className="label-caps mb-2">current readings</div>
            {isLoading && !data ? (
              <MetricRowSkeleton />
            ) : (
              <div className="ruled grid grid-cols-1 sm:grid-cols-3">
                {METRICS.map((m) => (
                  <MetricCard
                    key={m.key}
                    label={m.label}
                    unit={m.unit}
                    fieldId={m.fieldId}
                    latest={data?.stats[`latest_${m.key}` as keyof typeof data.stats] as number | null}
                    mean={data?.stats[`mean_${m.key}` as keyof typeof data.stats] as number | null}
                    accentColor={m.accentColor}
                  />
                ))}
              </div>
            )}
          </section>

          {/* Combined overview */}
          <section>
            <div className="label-caps mb-2">
              signal overview — {data?.stats.record_count ?? 0} samples
            </div>
            {isLoading && !data ? (
              <ChartSkeleton height={260} />
            ) : (
              <CombinedChart data={chartPoints} dark={dark} />
            )}
          </section>

          {/* Individual time series */}
          <section>
            <div className="label-caps mb-2">individual time series</div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              {isLoading && !data ? (
                <>
                  <ChartSkeleton />
                  <ChartSkeleton />
                  <ChartSkeleton />
                </>
              ) : (
                METRICS.map((m) => (
                  <SingleMetricChart
                    key={m.key}
                    data={chartPoints}
                    dataKey={m.key}
                    label={m.label}
                    unit={m.unit}
                    color={m.color}
                    dark={dark}
                    mean={data?.stats[`mean_${m.key}` as keyof typeof data.stats] as number | null}
                  />
                ))
              )}
            </div>
          </section>

          <footer className="label-caps flex justify-between pt-1 border-t border-zinc-100 dark:border-zinc-900">
            <span>channel {data?.channel_id ?? "—"} · thingspeak</span>
            <span>polling 5 s · local time</span>
          </footer>
        </div>
      </div>
    </div>
  );
}
