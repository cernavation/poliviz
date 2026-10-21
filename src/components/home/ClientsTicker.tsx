"use client";
import { marqueeOrder } from "../../../content/clients.config";

/* ── Pure CSS infinite marquee — no JS needed ── */
export function ClientsTicker() {
  return (
    <div
      className="overflow-hidden w-full"
      aria-label={`Наши клиенты: ${marqueeOrder.join(", ")}`}
    >
      <div
        className="flex w-max"
        style={{
          animation: "ticker-scroll 40s linear infinite",
        }}
      >
        {/* Two identical blocks for seamless loop */}
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex flex-shrink-0 items-center gap-12 pr-12"
            aria-hidden={copy === 1}
          >
            {marqueeOrder.map((slug) => (
              <img
                key={slug}
                src={`/media/clients/${slug}.svg`}
                alt={slug}
                className="h-8 w-auto object-contain flex-shrink-0 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                loading="lazy"
                draggable={false}
              />
            ))}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes ticker-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
