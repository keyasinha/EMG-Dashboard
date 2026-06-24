import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import type { ChartPoint } from "../../types/emg";
import { ChartPanel } from "./ChartPanel";

interface CombinedChartProps {
  data: ChartPoint[];
  dark: boolean;
}

const COLORS = {
  emg_average: "#1B4FD8",
  emg_rms: "#0EA5E9",
  muscle_load: "#16a34a",
};

export function CombinedChart({ data, dark }: CombinedChartProps) {
  const grid = dark ? "#27272a" : "#f4f4f5";
  const tickStyle = {
    fill: dark ? "#52525b" : "#a1a1aa",
    fontSize: 10,
    fontFamily: "JetBrains Mono, monospace",
  };

  return (
    <ChartPanel title="signal overview — all channels" height={260}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 12, right: 16, left: -16, bottom: 4 }}>
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
            labelStyle={{ color: dark ? "#a1a1aa" : "#71717a", marginBottom: 2 }}
            itemStyle={{ fontSize: 11 }}
          />
          <Legend
            iconType="plainline"
            iconSize={12}
            wrapperStyle={{
              fontSize: 10,
              fontFamily: "JetBrains Mono, monospace",
              paddingTop: 4,
              color: dark ? "#71717a" : "#a1a1aa",
            }}
          />
          {(["emg_average", "emg_rms", "muscle_load"] as const).map((key) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              name={key.replace("_", " ")}
              stroke={COLORS[key]}
              strokeWidth={1.2}
              dot={false}
              connectNulls
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </ChartPanel>
  );
}
