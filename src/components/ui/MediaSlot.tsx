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
  if (!src) {
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
    <div className={cn("relative overflow-hidden", className)}>
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
          className="object-cover"
          priority={priority}
          sizes={sizes}
          style={imgStyle}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto block"
          priority={priority}
          sizes={sizes}
          style={imgStyle}
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
  const paddingBottom = `${((h / w) * 100).toFixed(2)}%`;

  return (
    <div
      className={cn("relative overflow-hidden bg-mid/20", className)}
      style={{ paddingBottom }}
      role="img"
      aria-label={slotId ? `Медиа-слот: ${slotId}` : "Изображение отсутствует"}
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-mid/30" />
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-mid/30" />
      </div>
      <PrintMark size={12} color="#7A7469" className="absolute top-2 left-2 opacity-25" />
      <PrintMark size={12} color="#7A7469" className="absolute top-2 right-2 opacity-25" />
      <PrintMark size={12} color="#7A7469" className="absolute bottom-2 left-2 opacity-25" />
      <PrintMark size={12} color="#7A7469" className="absolute bottom-2 right-2 opacity-25" />
      <div className="absolute inset-0 bg-halftone opacity-30" aria-hidden="true" />
      {isDev && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 pointer-events-none" aria-hidden="true">
          {slotId && <span className="sheet-label text-muted opacity-70">{slotId}</span>}
          <span className="sheet-label text-muted opacity-40">{ratio}</span>
        </div>
      )}
    </div>
  );
}
