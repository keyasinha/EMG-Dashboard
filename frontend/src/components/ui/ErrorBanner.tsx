interface ErrorBannerProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorBanner({ message, onRetry }: ErrorBannerProps) {
  return (
    <div className="ruled border-red-300 dark:border-red-900 px-4 py-3 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 min-w-0">
        <span className="label-caps text-red-500 shrink-0">fetch error</span>
        <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono truncate">{message}</span>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="label-caps text-red-500 border border-red-300 dark:border-red-800 rounded px-2 py-1 hover:bg-red-50 dark:hover:bg-red-950 transition shrink-0"
        >
          retry
        </button>
      )}
    </div>
  );
}
