import { formatValue } from "../../utils/format";

interface MetricCardProps {
  label: string;
  unit: string;
  fieldId: string;
  latest: number | null | undefined;
  mean: number | null | undefined;
  accentColor: string; // tailwind bg class
}

export function MetricCard({
  label,
  unit,
  fieldId,
  latest,
  mean,
  accentColor,
}: MetricCardProps) {
  return (
    <div className="relative pl-3 py-4 pr-4 border-r border-zinc-200 dark:border-zinc-800 last:border-r-0">
      <div
        className={`absolute left-0 top-0 bottom-0 w-0.5 ${accentColor} rounded-none`}
      />
      <div className="label-caps mb-2">{label}</div>
      <div className="text-2xl font-mono font-medium tracking-tight leading-none text-zinc-900 dark:text-zinc-100">
        {formatValue(latest)}
      </div>
      <div className="label-caps mt-1">
        {unit} · {fieldId}
      </div>
      <div className="label-caps mt-3 pt-2 border-t border-zinc-100 dark:border-zinc-800">
        mean {formatValue(mean)}
      </div>
    </div>
  );
}
