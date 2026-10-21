"use client";
import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useLang } from "@/context/LanguageContext";

/* ─── Desktop pinned scroll-story ──────────────────────────── */
function ScrollVideoDesktop() {
  const { t } = useLang();

  const CHAPTERS = [
    { heading: t.scroll.ch1_title, body: t.scroll.ch1_body, videoSrc: "/media/video/01-workshop.mp4", exe: "process_01.exe" },
    { heading: t.scroll.ch2_title, body: t.scroll.ch2_body, videoSrc: "/media/video/02-process.mp4", exe: "process_02.exe" },
    { heading: t.scroll.ch3_title, body: t.scroll.ch3_body, videoSrc: "/media/video/03-products.mp4", exe: "process_03.exe" },
  ];

  const panelRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

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
          trigger: panel,
          pin: true,
          pinSpacing: true,
          start: "top top",
          end: "+=500vh",
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

        tl.to(textRefs.current[i], { opacity: 0, y: -28, duration: dur, ease: "power2.in" }, tStart);
        tl.fromTo(textRefs.current[i + 1], { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: dur * 1.1, ease: "power2.out" }, tStart + dur * 0.3);
        tl.to(videoRefs.current[i], { opacity: 0, duration: dur, ease: "power1.inOut" }, tStart);
        tl.to(videoRefs.current[i + 1], { opacity: 1, duration: dur, ease: "power1.inOut" }, tStart);
      });
    }, panel);

    return () => ctx.revert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]); // re-run when language changes (GSAP is already reverted)

  const CHAPTERS_STATIC = [
    { heading: t.scroll.ch1_title, body: t.scroll.ch1_body, videoSrc: "/media/video/01-workshop.mp4", exe: "process_01.exe" },
    { heading: t.scroll.ch2_title, body: t.scroll.ch2_body, videoSrc: "/media/video/02-process.mp4", exe: "process_02.exe" },
    { heading: t.scroll.ch3_title, body: t.scroll.ch3_body, videoSrc: "/media/video/03-products.mp4", exe: "process_03.exe" },
  ];

  return (
    <div
      ref={panelRef}
      className="hidden md:flex h-screen w-full overflow-hidden bg-ink"
      aria-label="Как мы работаем"
    >
      {/* ── LEFT: Win95 text panel ─────────────────────────── */}
      <div className="relative w-5/12 flex-shrink-0">
        {CHAPTERS_STATIC.map((ch, i) => (
          <div
            key={i}
            ref={(el) => { textRefs.current[i] = el; }}
            className="absolute inset-0 flex flex-col justify-center px-8 xl:px-12"
            style={{ opacity: i === 0 ? 1 : 0 }}
          >
            {/* Win95 window frame for each chapter */}
            <div className="border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080] bg-[#dfdfdf]">
              {/* Title bar */}
              <div className="bg-[#000080] flex items-center justify-between px-2 py-[3px]">
                <span className="text-white text-xs font-bold font-mono tracking-wider uppercase truncate pr-2 select-none">
                  {ch.exe}
                </span>
                <span className="flex gap-[2px] flex-shrink-0">
                  {["_", "□", "X"].map((c) => (
                    <button key={c} type="button" aria-hidden="true" tabIndex={-1}
                      className="w-4 h-4 bg-[#dfdfdf] border border-t-white border-l-white border-b-[#808080] border-r-[#808080] text-[10px] leading-none flex items-center justify-center text-[#121212] font-bold select-none">
                      {c}
                    </button>
                  ))}
                </span>
              </div>
              {/* Content */}
              <div className="p-5">
                <span className="block font-mono text-caption text-[#D6307F] tracking-widest uppercase mb-3" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")} / {String(CHAPTERS_STATIC.length).padStart(2, "0")}
                </span>
                <h2 className="text-[#121212] font-bold leading-tight tracking-tight mb-3"
                  style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}>
                  {ch.heading}
                </h2>
                <p className="text-body text-[#444] leading-relaxed">{ch.body}</p>

                <div className="mt-6 flex gap-2">
                  {CHAPTERS_STATIC.map((_, dot) => (
                    <span key={dot} className={`h-[2px] flex-1 ${dot === i ? "bg-[#D6307F]" : "bg-[#808080]/40"}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── RIGHT: video panel ───────────────────────────── */}
      <div className="relative w-7/12 flex-shrink-0 overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 w-32 pointer-events-none z-10"
          style={{ background: "linear-gradient(to right, #121212 0%, transparent 100%)" }}
          aria-hidden="true"
        />
        {CHAPTERS_STATIC.map((ch, i) => (
          <video
            key={i}
            ref={(el) => { videoRefs.current[i] = el; }}
            className="absolute inset-0 w-full h-full object-cover"
            src={ch.videoSrc}
            autoPlay loop muted playsInline aria-hidden="true"
            style={{ opacity: i === 0 ? 1 : 0 }}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Mobile stacked cards ──────────────────────────────────── */
function ScrollVideoMobile() {
  const { t } = useLang();

  const CHAPTERS = [
    { heading: t.scroll.ch1_title, body: t.scroll.ch1_body, videoSrc: "/media/video/01-workshop.mp4", exe: "process_01.exe" },
    { heading: t.scroll.ch2_title, body: t.scroll.ch2_body, videoSrc: "/media/video/02-process.mp4", exe: "process_02.exe" },
    { heading: t.scroll.ch3_title, body: t.scroll.ch3_body, videoSrc: "/media/video/03-products.mp4", exe: "process_03.exe" },
  ];

  return (
    <section className="md:hidden bg-ink" aria-label="Как мы работаем">
      <div className="flex flex-col">
        {CHAPTERS.map((ch, i) => (
          <div key={i} className="flex flex-col">
            <div className="relative overflow-hidden" style={{ height: "40vh" }}>
              <video className="w-full h-full object-cover" src={ch.videoSrc} autoPlay loop muted playsInline aria-hidden="true" />
              <div className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
                style={{ background: "linear-gradient(to bottom, transparent, #121212)" }} aria-hidden="true" />
            </div>
            {/* Win95 window for mobile */}
            <div className="bg-ink px-4 pt-4 pb-6">
              <div className="border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080] bg-[#dfdfdf]">
                <div className="bg-[#000080] flex items-center justify-between px-2 py-[3px]">
                  <span className="text-white text-xs font-bold font-mono tracking-wider uppercase select-none">{ch.exe}</span>
                  <span className="flex gap-[2px]">
                    {["_", "□", "X"].map((c) => (
                      <button key={c} type="button" aria-hidden="true" tabIndex={-1}
                        className="w-4 h-4 bg-[#dfdfdf] border border-t-white border-l-white border-b-[#808080] border-r-[#808080] text-[10px] leading-none flex items-center justify-center text-[#121212] font-bold">
                        {c}
                      </button>
                    ))}
                  </span>
                </div>
                <div className="p-4">
                  <span className="block font-mono text-caption text-[#D6307F] tracking-widest uppercase mb-2">
                    {String(i + 1).padStart(2, "0")} / {String(CHAPTERS.length).padStart(2, "0")}
                  </span>
                  <h2 className="text-[#121212] font-bold leading-tight mb-2" style={{ fontSize: "clamp(1.25rem, 4vw, 1.75rem)" }}>{ch.heading}</h2>
                  <p className="text-body text-[#444] leading-relaxed">{ch.body}</p>
                </div>
              </div>
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
    <div style={{ backgroundColor: "#121212" }}>
      <ScrollVideoDesktop />
      <ScrollVideoMobile />
    </div>
  );
}
