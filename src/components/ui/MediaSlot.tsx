"use client";
import Image from "next/image";
import { useState } from "react";
import { cn, isDev } from "@/lib/utils";
import { PrintMark } from "./PrintMark";

// ── Types ────────────────────────────────────────────────────────────────────

export interface MediaSlotProps {
  /**
   * Resolved src — already checked on server via resolveMedia().
   * Pass only existing paths. If null, shows placeholder.
   */
  src: string | null;
  isTemp?: boolean;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  slotId?: string;
  expectedRatio?: string;
  fill?: boolean;
  sizes?: string;
  objectPosition?: string;
}

/**
 * MediaSlot — pure display component.
 * Source resolution (final→temp→null) happens server-side via resolveMedia().
 * This component NEVER requests a file that doesn't exist.
 *
 * Temp images: TEMP badge in dev, magenta duotone multiply overlay.
 * Final images: clean display, no overlay.
 * null src: shows print-mark placeholder.
 */
export function MediaSlot({
  src,
  isTemp = false,
  alt,
  width = 1920,
  height = 1080,
  priority = false,
  className,
  slotId,
  expectedRatio = "16:9",
  fill = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  objectPosition = "center",
}: MediaSlotProps) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <MediaPlaceholder
        ratio={expectedRatio}
        slotId={slotId}
        className={className}
      />
    );
  }

  const imgStyle: React.CSSProperties = isTemp
    ? { filter: "grayscale(0.6) contrast(1.1)", objectPosition }
    : { objectPosition };

  return (
    <div className={cn("relative overflow-hidden bg-[#F4F1EA]", className)}>
      {/* Registration crosses */}
      <PrintMark size={10} color="#7A7469" className="absolute top-2 left-2 z-10 opacity-20 pointer-events-none" />
      <PrintMark size={10} color="#7A7469" className="absolute top-2 right-2 z-10 opacity-20 pointer-events-none" />
      <PrintMark size={10} color="#7A7469" className="absolute bottom-2 left-2 z-10 opacity-20 pointer-events-none" />
      <PrintMark size={10} color="#7A7469" className="absolute bottom-2 right-2 z-10 opacity-20 pointer-events-none" />

      {fill ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-opacity duration-300"
          priority={priority}
          sizes={sizes}
          style={imgStyle}
          onError={() => setHasError(true)}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto block transition-opacity duration-300"
          priority={priority}
          sizes={sizes}
          style={imgStyle}
          onError={() => setHasError(true)}
        />
      )}

      {/* Duotone magenta multiply — temp only */}
      {isTemp && (
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: "rgba(214,48,127,0.15)", mixBlendMode: "multiply" }}
        />
      )}

      {/* Halftone edge — temp only */}
      {isTemp && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-halftone opacity-[0.05] pointer-events-none"
        />
      )}

      {/* TEMP badge — dev only */}
      {isTemp && isDev && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 pointer-events-none" aria-hidden="true">
          <span className="sheet-label px-2 py-0.5" style={{ background: "#D6307F", color: "#F4F1EA" }}>
            TEMP
          </span>
        </div>
      )}
    </div>
  );
}

// ── Placeholder ───────────────────────────────────────────────────────────────

export function MediaPlaceholder({
  ratio = "16:9",
  slotId,
  className,
}: {
  ratio?: string;
  slotId?: string;
  className?: string;
}) {
  const [w, h] = ratio.split(":").map(Number);
  const isAbsolute = className?.includes("absolute") || className?.includes("h-full");
  const paddingBottom = isAbsolute ? undefined : `${((h / (w || 1)) * 100).toFixed(2)}%`;

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-[#F4F1EA] flex flex-col items-center justify-center select-none",
        className
      )}
      style={{ paddingBottom }}
      role="img"
      aria-label={slotId ? `Медиа-слот: ${slotId}` : "Изображение отсутствует"}
    >
      {/* Subtle technical background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(122, 116, 105, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(122, 116, 105, 0.08) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
        aria-hidden="true"
      />

      {/* Center crosshair lines */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-[#7A7469]/20" />
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#7A7469]/20" />
      </div>

      {/* Corner crop marks */}
      <PrintMark size={14} color="#7A7469" className="absolute top-2.5 left-2.5 opacity-40" />
      <PrintMark size={14} color="#7A7469" className="absolute top-2.5 right-2.5 opacity-40" />
      <PrintMark size={14} color="#7A7469" className="absolute bottom-2.5 left-2.5 opacity-40" />
      <PrintMark size={14} color="#7A7469" className="absolute bottom-2.5 right-2.5 opacity-40" />

      {/* Halftone texture */}
      <div className="absolute inset-0 bg-halftone opacity-20 pointer-events-none" aria-hidden="true" />

      {/* Center badge with brand styling */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-1.5 px-3 py-2 text-center pointer-events-none">
        <div className="w-7 h-7 rounded-full border border-[#7A7469]/40 flex items-center justify-center bg-[#EAE5D9]/80 shadow-sm">
          <svg
            className="w-3.5 h-3.5 text-[#7A7469]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.75}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
          </svg>
        </div>
        <span className="font-mono text-[11px] font-semibold tracking-wider uppercase text-[#544E45] bg-[#EAE5D9] px-2 py-0.5 border border-[#D9D4C7]">
          Фото скоро
        </span>
        {slotId && isDev && (
          <span className="font-mono text-[9px] text-[#7A7469]/80 truncate max-w-[120px]">
            {slotId}
          </span>
        )}
      </div>
    </div>
  );
}
