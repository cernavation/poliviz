"use client";
import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/* ─── Chapter data ──────────────────────────────────────────── */
interface Chapter {
  heading: string;
  body: string;
  videoSrc: string;
}

const CHAPTERS: Chapter[] = [
  {
    heading: "Масштаб и тиражи",
    body: "От единичных экземпляров до промышленных партий. Передовые офсетные и цифровые машины.",
    videoSrc: "/media/video/01-workshop.mp4",
  },
  {
    heading: "Печать на всём",
    body: "Текстиль, стекло, пластик, дерево. Шелкография и плоттерная резка любой сложности.",
    videoSrc: "/media/video/02-process.mp4",
  },
  {
    heading: "Для вашего бизнеса",
    body: "Премиальная упаковка, мерч, сложная полиграфия с защитой и голограммами.",
    videoSrc: "/media/video/03-products.mp4",
  },
];

// px of extra scroll travel beyond the 100vh sticky panel
// GSAP will add pin-spacer of this height automatically
const EXTRA_SCROLL_PX = "500vh";

/* ─── Desktop pinned scroll-story ──────────────────────────── */
function ScrollVideoDesktop() {
  const panelRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Initial states: ch0 visible, rest hidden
    textRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 32 });
    });
    videoRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { opacity: i === 0 ? 1 : 0 });
    });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: panel,        // pin THIS element
          pin: true,             // pin it in place
          pinSpacing: true,      // GSAP adds the spacer — no manual height needed
          start: "top top",
          end: `+=${EXTRA_SCROLL_PX}`,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      const segSize = 1 / CHAPTERS.length;

      CHAPTERS.forEach((_, i) => {
        if (i === CHAPTERS.length - 1) return;

        const tStart = segSize * (i + 1) - segSize * 0.2;
        const tEnd   = segSize * (i + 1) + segSize * 0.05;
        const dur    = tEnd - tStart;

        tl.to(textRefs.current[i],
          { opacity: 0, y: -28, duration: dur, ease: "power2.in" },
          tStart
        );
        tl.fromTo(textRefs.current[i + 1],
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, duration: dur * 1.1, ease: "power2.out" },
          tStart + dur * 0.3
        );
        tl.to(videoRefs.current[i],
          { opacity: 0, duration: dur, ease: "power1.inOut" },
          tStart
        );
        tl.to(videoRefs.current[i + 1],
          { opacity: 1, duration: dur, ease: "power1.inOut" },
          tStart
        );
      });
    }, panel);

    return () => ctx.revert();
  }, []);

  return (
    // No manual height — GSAP pinSpacing handles the scroll space
    <div
      ref={panelRef}
      className="hidden md:flex h-screen w-full overflow-hidden bg-ink"
      aria-label="Как мы работаем"
    >
      {/* ── LEFT: text panel (5/12) ─────────────────────────── */}
      <div className="relative w-5/12 flex-shrink-0">
        {CHAPTERS.map((ch, i) => (
          <div
            key={i}
            ref={(el) => { textRefs.current[i] = el; }}
            className="absolute inset-0 flex flex-col justify-center px-10 xl:px-16"
            style={{ opacity: i === 0 ? 1 : 0 }}
          >
            <span className="block font-mono text-caption text-magenta tracking-widest uppercase mb-6" aria-hidden="true">
              {String(i + 1).padStart(2, "0")} / {String(CHAPTERS.length).padStart(2, "0")}
            </span>

            <h2
              className="text-paper font-bold leading-tight tracking-tight mb-5"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.75rem)" }}
            >
              {ch.heading}
            </h2>

            <p className="text-body text-mid leading-relaxed max-w-xs">
              {ch.body}
            </p>

            <div className="mt-10 flex gap-2">
              {CHAPTERS.map((_, dot) => (
                <span
                  key={dot}
                  className={`h-px flex-1 ${dot === i ? "bg-magenta" : "bg-mid/30"}`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── RIGHT: video panel (7/12) ───────────────────────── */}
      <div className="relative w-7/12 flex-shrink-0 overflow-hidden">
        {/* Left blend */}
        <div
          className="absolute inset-y-0 left-0 w-32 pointer-events-none z-10"
          style={{ background: "linear-gradient(to right, #121212 0%, transparent 100%)" }}
          aria-hidden="true"
        />

        {CHAPTERS.map((ch, i) => (
          <video
            key={i}
            ref={(el) => { videoRefs.current[i] = el; }}
            className="absolute inset-0 w-full h-full object-cover"
            src={ch.videoSrc}
            autoPlay
            loop
            muted
            playsInline
            aria-hidden="true"
            style={{ opacity: i === 0 ? 1 : 0 }}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Mobile stacked cards ──────────────────────────────────── */
function ScrollVideoMobile() {
  return (
    <section className="md:hidden bg-ink" aria-label="Как мы работаем">
      <div className="flex flex-col">
        {CHAPTERS.map((ch, i) => (
          <div key={i} className="flex flex-col">
            <div className="relative overflow-hidden" style={{ height: "40vh" }}>
              <video
                className="w-full h-full object-cover"
                src={ch.videoSrc}
                autoPlay
                loop
                muted
                playsInline
                aria-hidden="true"
              />
              <div
                className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
                style={{ background: "linear-gradient(to bottom, transparent, #121212)" }}
                aria-hidden="true"
              />
            </div>

            <div className="px-6 py-8 bg-ink border-t border-mid/10">
              <span className="block font-mono text-caption text-magenta tracking-widest uppercase mb-3">
                {String(i + 1).padStart(2, "0")} / {String(CHAPTERS.length).padStart(2, "0")}
              </span>
              <h2
                className="text-paper font-bold leading-tight mb-3"
                style={{ fontSize: "clamp(1.5rem, 5vw, 2rem)" }}
              >
                {ch.heading}
              </h2>
              <p className="text-body text-mid leading-relaxed">{ch.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Public export ─────────────────────────────────────────── */
export function ScrollVideo() {
  return (
    // bg-[#121212] covers whatever GSAP pin-spacer GSAP injects
    <div style={{ backgroundColor: "#121212" }}>
      <ScrollVideoDesktop />
      <ScrollVideoMobile />
    </div>
  );
}
