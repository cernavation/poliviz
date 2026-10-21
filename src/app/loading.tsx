export default function Loading() {
  return (
    <div
      className="min-h-[40vh] flex items-center justify-center bg-paper"
      aria-live="polite"
      aria-label="Загрузка..."
    >
      {/* Minimal print-mark spinner */}
      <div className="flex flex-col items-center gap-4">
        <svg
          width={32}
          height={32}
          viewBox="0 0 32 32"
          className="animate-spin"
          aria-hidden="true"
        >
          <circle
            cx={16}
            cy={16}
            r={8}
            fill="none"
            stroke="#D9D4C7"
            strokeWidth={1}
          />
          <line
            x1={16}
            y1={0}
            x2={16}
            y2={6}
            stroke="#D6307F"
            strokeWidth={1.5}
          />
          <line
            x1={16}
            y1={26}
            x2={16}
            y2={32}
            stroke="#D6307F"
            strokeWidth={1.5}
          />
        </svg>
        <span className="sheet-label text-muted">Загрузка…</span>
      </div>
    </div>
  );
}
