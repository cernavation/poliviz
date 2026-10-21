"use client";
import { useState } from "react";
import { PrintMark } from "@/components/ui/PrintMark";

type ToggleState = {
  bleed: boolean;
  safeZone: boolean;
  cutMarks: boolean;
};

/**
 * Interactive SVG diagram showing bleed, safe zone, and cut marks.
 * Toggle buttons switch between showing/hiding each layer.
 */
export function BleedDiagram() {
  const [show, setShow] = useState<ToggleState>({
    bleed: true,
    safeZone: true,
    cutMarks: true,
  });

  const toggle = (key: keyof ToggleState) =>
    setShow((prev) => ({ ...prev, [key]: !prev[key] }));

  // SVG coordinate system: 280×200
  const W = 280, H = 200;
  const bleed = 10; // 2mm represented in SVG units
  const safe = 20;  // 3-5mm represented

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-wrap gap-3 mb-6">
        {(
          [
            { key: "bleed" as const, label: "Вылет 2 мм", color: "#D6307F" },
            { key: "safeZone" as const, label: "Безопасная зона 3–5 мм", color: "#00A3E0" },
            { key: "cutMarks" as const, label: "Метки реза", color: "#121212" },
          ] as const
        ).map(({ key, label, color }) => (
          <button
            key={key}
            onClick={() => toggle(key)}
            className={`text-caption px-3 py-1.5 border border-mid transition-colors flex items-center gap-2 ${
              show[key] ? "bg-ink text-paper" : "text-muted"
            }`}
            aria-pressed={show[key]}
          >
            <span
              className="w-3 h-px flex-shrink-0"
              style={{ background: color }}
            />
            {label}
          </button>
        ))}
      </div>

      {/* SVG */}
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full border border-mid bg-paper"
        role="img"
        aria-label="Схема вылетов и безопасной зоны"
      >
        {/* Paper ground */}
        <rect x={0} y={0} width={W} height={H} fill="#F4F1EA" />

        {/* Bleed zone (magenta dashed border) */}
        {show.bleed && (
          <rect
            x={bleed}
            y={bleed}
            width={W - bleed * 2}
            height={H - bleed * 2}
            fill="none"
            stroke="#D6307F"
            strokeWidth={1}
            strokeDasharray="4 3"
            opacity={0.7}
          />
        )}

        {/* Product area (solid ink border) */}
        <rect
          x={bleed + 2}
          y={bleed + 2}
          width={W - (bleed + 2) * 2}
          height={H - (bleed + 2) * 2}
          fill="none"
          stroke="#121212"
          strokeWidth={0.75}
        />

        {/* Safe zone (cyan dashed) */}
        {show.safeZone && (
          <rect
            x={safe}
            y={safe}
            width={W - safe * 2}
            height={H - safe * 2}
            fill="none"
            stroke="#00A3E0"
            strokeWidth={0.75}
            strokeDasharray="3 3"
            opacity={0.7}
          />
        )}

        {/* Cut marks */}
        {show.cutMarks && (
          <>
            {/* TL */}
            <line x1={bleed - 8} y1={bleed + 2} x2={bleed - 3} y2={bleed + 2} stroke="#121212" strokeWidth={0.75} />
            <line x1={bleed + 2} y1={bleed - 8} x2={bleed + 2} y2={bleed - 3} stroke="#121212" strokeWidth={0.75} />
            {/* TR */}
            <line x1={W - bleed + 3} y1={bleed + 2} x2={W - bleed + 8} y2={bleed + 2} stroke="#121212" strokeWidth={0.75} />
            <line x1={W - bleed - 2} y1={bleed - 8} x2={W - bleed - 2} y2={bleed - 3} stroke="#121212" strokeWidth={0.75} />
            {/* BL */}
            <line x1={bleed - 8} y1={H - bleed - 2} x2={bleed - 3} y2={H - bleed - 2} stroke="#121212" strokeWidth={0.75} />
            <line x1={bleed + 2} y1={H - bleed + 3} x2={bleed + 2} y2={H - bleed + 8} stroke="#121212" strokeWidth={0.75} />
            {/* BR */}
            <line x1={W - bleed + 3} y1={H - bleed - 2} x2={W - bleed + 8} y2={H - bleed - 2} stroke="#121212" strokeWidth={0.75} />
            <line x1={W - bleed - 2} y1={H - bleed + 3} x2={W - bleed - 2} y2={H - bleed + 8} stroke="#121212" strokeWidth={0.75} />
          </>
        )}

        {/* Content placeholder inside safe zone */}
        <rect
          x={safe + 4}
          y={safe + 4}
          width={W - (safe + 4) * 2}
          height={H - (safe + 4) * 2}
          fill="#D9D4C7"
          opacity={0.3}
        />

        {/* Labels */}
        {show.bleed && (
          <text x={bleed + 4} y={bleed + 16} fontSize="7" fill="#D6307F" fontFamily="JetBrains Mono" opacity={0.9}>
            ВЫЛЕТ 2 мм
          </text>
        )}
        {show.safeZone && (
          <text x={safe + 4} y={safe + 16} fontSize="6" fill="#00A3E0" fontFamily="JetBrains Mono" opacity={0.9}>
            БЕЗ. ЗОНА
          </text>
        )}
        <text x={W / 2} y={H / 2 + 4} fontSize="8" fill="#7A7469" fontFamily="JetBrains Mono" textAnchor="middle" opacity={0.7}>
          СОДЕРЖИМОЕ МАКЕТА
        </text>

        {/* Registration mark TL corner (outside diagram) */}
        <g transform={`translate(6, 6)`} opacity={0.4}>
          <circle cx={0} cy={0} r={3} fill="none" stroke="#7A7469" strokeWidth={0.5} />
          <line x1={-5} y1={0} x2={-2} y2={0} stroke="#7A7469" strokeWidth={0.5} />
          <line x1={2} y1={0} x2={5} y2={0} stroke="#7A7469" strokeWidth={0.5} />
          <line x1={0} y1={-5} x2={0} y2={-2} stroke="#7A7469" strokeWidth={0.5} />
          <line x1={0} y1={2} x2={0} y2={5} stroke="#7A7469" strokeWidth={0.5} />
        </g>
      </svg>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-4">
        {show.bleed && (
          <span className="sheet-label text-muted flex items-center gap-2">
            <span className="w-4 h-px" style={{ background: "#D6307F" }} />
            Линия реза (вылет)
          </span>
        )}
        {show.safeZone && (
          <span className="sheet-label text-muted flex items-center gap-2">
            <span className="w-4 h-px" style={{ background: "#00A3E0" }} />
            Безопасная зона
          </span>
        )}
        <span className="sheet-label text-muted flex items-center gap-2">
          <span className="w-4 h-px" style={{ background: "#121212" }} />
          Граница продукта
        </span>
      </div>
    </div>
  );
}
