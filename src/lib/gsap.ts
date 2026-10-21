"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

/** Initialize Lenis ↔ ScrollTrigger integration */
export function useSyncLenisScrollTrigger() {
  useEffect(() => {
    import("../lib/lenis").then(({ getLenis }) => {
      const lenis = getLenis();
      if (!lenis) return;
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    });
  }, []);
}

/** Standard entrance animation: opacity 0→1, y 20→0 */
export function revealEnter(
  targets: gsap.TweenTarget,
  options?: { delay?: number; stagger?: number }
) {
  return gsap.fromTo(
    targets,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: "expo.out",
      delay: options?.delay ?? 0,
      stagger: options?.stagger ?? 0,
    }
  );
}
