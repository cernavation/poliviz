"use client";
import { useEffect } from "react";

/** Initialises Lenis smooth scroll. Rendered once in root layout body. */
export function LenisProvider() {
  useEffect(() => {
    let cleanup: (() => void) | undefined;

    import("@/lib/lenis").then(({ initLenis }) => {
      initLenis();
    });

    return () => cleanup?.();
  }, []);

  return null;
}
