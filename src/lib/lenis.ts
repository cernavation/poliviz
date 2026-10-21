"use client";
import { useEffect, useRef } from "react";
import type Lenis from "lenis";

let lenisInstance: Lenis | null = null;

export function getLenis() {
  return lenisInstance;
}

/** Call this once in the root layout's client wrapper */
export async function initLenis() {
  if (typeof window === "undefined") return;
  if (lenisInstance) return lenisInstance;

  const { default: LenisClass } = await import("lenis");
  lenisInstance = new LenisClass({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  function raf(time: number) {
    lenisInstance!.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  return lenisInstance;
}

/** Hook to run a callback on every Lenis scroll event */
export function useLenisScroll(callback: (e: { scroll: number; velocity: number }) => void) {
  const cbRef = useRef(callback);
  cbRef.current = callback;

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    if (lenisInstance) {
      const handler = (e: { scroll: number; velocity: number }) => cbRef.current(e);
      lenisInstance.on("scroll", handler);
      unsubscribe = () => lenisInstance?.off("scroll", handler);
    }
    return () => unsubscribe?.();
  }, []);
}
