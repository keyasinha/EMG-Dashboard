import { ReactNode } from "react";

interface ChartPanelProps {
  title: string;
  accentColor?: string; // hex for title color
  children: ReactNode;
  height?: number;
}

export function ChartPanel({ title, accentColor, children, height = 220 }: ChartPanelProps) {
  return (
    <div className="ruled overflow-hidden">
      <div className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-800">
        <span
          className="label-caps"
          style={accentColor ? { color: accentColor } : undefined}
        >
          {title}
        </span>
      </div>
      <div style={{ height }}>{children}</div>
    </div>
  );
}
