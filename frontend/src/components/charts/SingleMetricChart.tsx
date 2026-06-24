import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from "recharts";
import type { ChartPoint } from "../../types/emg";
import { ChartPanel } from "./ChartPanel";

type DataKey = keyof Pick<ChartPoint, "emg_average" | "emg_rms" | "muscle_load">;

interface SingleMetricChartProps {
  data: ChartPoint[];
  dataKey: DataKey;
  label: string;
  unit: string;
  color: string;
  dark: boolean;
  mean?: number | null;
}

export function SingleMetricChart({
  data,
  dataKey,
  label,
  unit,
  color,
  dark,
  mean,
}: SingleMetricChartProps) {
  const grid = dark ? "#27272a" : "#f4f4f5";
  const tickStyle = {
    fill: dark ? "#52525b" : "#a1a1aa",
    fontSize: 10,
    fontFamily: "JetBrains Mono, monospace",
  };

  return (
    <ChartPanel title={`${label} vs time`} accentColor={color} height={200}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 12, left: -20, bottom: 4 }}>
          <CartesianGrid strokeDasharray="2 4" stroke={grid} />
          <XAxis
            dataKey="time"
            tick={tickStyle}
            interval="preserveStartEnd"
            tickLine={false}
            axisLine={false}
          />
          <YAxis tick={tickStyle} tickLine={false} axisLine={false} width={52} />
          <Tooltip
            contentStyle={{
              background: dark ? "#18181b" : "#fff",
              border: `0.5px solid ${dark ? "#3f3f46" : "#e4e4e7"}`,
              borderRadius: 4,
              fontSize: 11,
              fontFamily: "JetBrains Mono, monospace",
              padding: "6px 10px",
            }}
            formatter={(val: number) => [`${val.toFixed(3)} ${unit}`, label]}
            labelStyle={{ color: dark ? "#a1a1aa" : "#71717a" }}
          />
          {mean != null && (
            <ReferenceLine
              y={mean}
              stroke={color}
              strokeDasharray="3 4"
              strokeOpacity={0.35}
              label={{
                value: `μ ${mean.toFixed(2)}`,
                fill: color,
                fontSize: 9,
                fontFamily: "JetBrains Mono, monospace",
                position: "insideTopRight",
                opacity: 0.6,
              }}
            />
          )}
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={1.2}
            dot={false}
            connectNulls
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartPanel>
  );
}
