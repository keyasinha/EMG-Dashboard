export function MetricRowSkeleton() {
  return (
    <div className="ruled grid grid-cols-3 animate-pulse">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="pl-3 py-4 pr-4 border-r border-zinc-200 dark:border-zinc-800 last:border-r-0"
        >
          <div className="h-2 w-16 bg-zinc-100 dark:bg-zinc-800 rounded mb-3" />
          <div className="h-6 w-20 bg-zinc-100 dark:bg-zinc-800 rounded mb-2" />
          <div className="h-2 w-12 bg-zinc-100 dark:bg-zinc-800 rounded" />
        </div>
      ))}
    </div>
  );
}

export function ChartSkeleton({ height = 220 }: { height?: number }) {
  return (
    <div className="ruled animate-pulse overflow-hidden">
      <div className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-800">
        <div className="h-2 w-32 bg-zinc-100 dark:bg-zinc-800 rounded" />
      </div>
      <div
        className="bg-zinc-50 dark:bg-zinc-900"
        style={{ height }}
      />
    </div>
  );
}
