import { Moon, Sun, Download, RefreshCw } from "lucide-react";
import { downloadCSV } from "../../services/api";
import { toLocalDateTime } from "../../utils/format";

interface HeaderProps {
  dark: boolean;
  onToggleDark: () => void;
  lastUpdated: Date | null;
  onRefresh: () => void;
  isLoading: boolean;
  connectionStatus: "connected" | "error" | "loading";
}

export function Header({
  dark,
  onToggleDark,
  lastUpdated,
  onRefresh,
  isLoading,
  connectionStatus,
}: HeaderProps) {
  const dotColor =
    connectionStatus === "connected"
      ? "bg-emerald-500"
      : connectionStatus === "error"
      ? "bg-red-500"
      : "bg-amber-400 animate-pulse";

  return (
    <div className="flex items-center justify-between py-4 border-b border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center gap-4">
        <h1 className="text-sm font-medium font-sans tracking-tight text-zinc-900 dark:text-zinc-100">
          EMG Monitoring Dashboard
        </h1>
        <div className="flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
          <span className="label-caps">
            {connectionStatus === "connected"
              ? "live · 5 s"
              : connectionStatus === "error"
              ? "disconnected"
              : "connecting"}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {lastUpdated && (
          <span className="label-caps hidden sm:block">
            updated {toLocalDateTime(lastUpdated.toISOString())}
          </span>
        )}

        <button
          onClick={onRefresh}
          disabled={isLoading}
          title="Refresh"
          className="label-caps border border-zinc-200 dark:border-zinc-700 rounded px-2 py-1 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition disabled:opacity-30 flex items-center gap-1"
        >
          <RefreshCw size={11} className={isLoading ? "animate-spin" : ""} />
        </button>

        <button
          onClick={() => downloadCSV()}
          className="label-caps border border-zinc-200 dark:border-zinc-700 rounded px-2 py-1 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition flex items-center gap-1"
        >
          <Download size={11} />
          export csv
        </button>

        <button
          onClick={onToggleDark}
          title="Toggle dark mode"
          className="label-caps border border-zinc-200 dark:border-zinc-700 rounded px-2 py-1 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition"
        >
          {dark ? <Sun size={11} /> : <Moon size={11} />}
        </button>
      </div>
    </div>
  );
}
