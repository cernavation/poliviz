"use client";
import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { useLang } from "@/context/LanguageContext";

/* ─── Desktop pinned scroll-story ──────────────────────────── */
function ScrollVideoDesktop() {
  const { t } = useLang();

  const CHAPTERS = [
    {
      heading: t.scroll.ch1_title,
      body: t.scroll.ch1_body,
      videoSrc: "/media/video/01-workshop.mp4",
      posterSrc: "/media/video/01-workshop.jpg",
      exe: "process_01.exe",
    },
    {
      heading: t.scroll.ch2_title,
      body: t.scroll.ch2_body,
      videoSrc: "/media/video/02-process.mp4",
      posterSrc: "/media/video/02-process.jpg",
      exe: "process_02.exe",
    },
    {
      heading: t.scroll.ch3_title,
      body: t.scroll.ch3_body,
      videoSrc: "/media/video/03-products.mp4",
      posterSrc: "/media/video/03-products.jpg",
      exe: "process_03.exe",
    },
  ];

  const panelRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoContainers = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Ensure all videos have muted autoplay active
    videoRefs.current.forEach((video) => {
      if (!video) return;
      video.defaultMuted = true;
      video.muted = true;
      video.play().catch(() => {});
    });

    // Initial state: slide 0 is visible, other slides completely hidden
    textRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, {
        autoAlpha: i === 0 ? 1 : 0,
        pointerEvents: i === 0 ? "auto" : "none",
        y: i === 0 ? 0 : 32,
      });
    });

    videoContainers.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, {
        autoAlpha: i === 0 ? 1 : 0,
      });
    });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: panel,
          pin: true,
          pinSpacing: true,
          start: "top top",
          end: () => "+=" + window.innerHeight * 3,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      // Transition 0 -> 1
      // Slide 0 text fades out and is completely hidden before Slide 1 text appears
      tl.to(
        textRefs.current[0],
        {
          autoAlpha: 0,
          y: -24,
          duration: 0.1,
          ease: "power2.in",
          pointerEvents: "none",
        },
        0.3
      );

      // Video crossfade
      tl.to(videoContainers.current[0], { autoAlpha: 0, duration: 0.16, ease: "power1.inOut" }, 0.32);
      tl.to(videoContainers.current[1], { autoAlpha: 1, duration: 0.16, ease: "power1.inOut" }, 0.32);

      // Slide 1 text appears strictly AFTER Slide 0 is fully hidden
      tl.fromTo(
        textRefs.current[1],
        { autoAlpha: 0, y: 32, pointerEvents: "none" },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.1,
          ease: "power2.out",
          pointerEvents: "auto",
        },
        0.42
      );

      // Transition 1 -> 2
      // Slide 1 text fades out and is completely hidden before Slide 2 text appears
      tl.to(
        textRefs.current[1],
        {
          autoAlpha: 0,
          y: -24,
          duration: 0.1,
          ease: "power2.in",
          pointerEvents: "none",
        },
        0.7
      );

      // Video crossfade
      tl.to(videoContainers.current[1], { autoAlpha: 0, duration: 0.16, ease: "power1.inOut" }, 0.72);
      tl.to(videoContainers.current[2], { autoAlpha: 1, duration: 0.16, ease: "power1.inOut" }, 0.72);

      // Slide 2 text appears strictly AFTER Slide 1 is fully hidden
      tl.fromTo(
        textRefs.current[2],
        { autoAlpha: 0, y: 32, pointerEvents: "none" },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.1,
          ease: "power2.out",
          pointerEvents: "auto",
        },
        0.82
      );
    }, panel);

    return () => ctx.revert();
  }, [t]);

  return (
    <div
      ref={panelRef}
      className="hidden md:flex h-screen w-full overflow-hidden bg-[#121212]"
      aria-label="Как мы работаем"
    >
      {/* ── LEFT: Dark styled text panel ─────────────────────────── */}
      <div className="relative w-5/12 flex-shrink-0 bg-[#121212] border-r border-white/10">
        {CHAPTERS.map((ch, i) => (
          <div
            key={i}
            ref={(el) => {
              textRefs.current[i] = el;
            }}
            className="absolute inset-0 flex flex-col justify-center px-10 xl:px-16"
            style={{
              opacity: i === 0 ? 1 : 0,
              visibility: i === 0 ? "visible" : "hidden",
              pointerEvents: i === 0 ? "auto" : "none",
            }}
          >
            {/* Retro chapter badge */}
            <span className="inline-block self-start bg-[#D6307F] text-white font-mono text-xs font-bold px-2 py-0.5 mb-4 border border-t-[#ff8cc0] border-l-[#ff8cc0] border-b-[#8a1a4f] border-r-[#8a1a4f]">
              {String(i + 1).padStart(2, "0")} / {String(CHAPTERS.length).padStart(2, "0")}
            </span>

            {/* Large white H2 */}
            <h2 className="text-white font-display text-4xl md:text-5xl font-bold mb-4 leading-tight tracking-tight">
              {ch.heading}
            </h2>

            {/* Light-gray description */}
            <p className="text-white/80 text-base md:text-lg leading-relaxed max-w-md mb-8">
              {ch.body}
            </p>

            {/* Segmented equalizer progress bar */}
            <div className="flex gap-2 max-w-xs">
              {CHAPTERS.map((_, dot) => (
                <span
                  key={dot}
                  className={`h-1.5 flex-1 transition-colors ${
                    dot === i ? "bg-[#D6307F]" : "bg-white/20"
                  }`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── RIGHT: video panel ───────────────────────────── */}
      <div className="relative w-7/12 flex-shrink-0 overflow-hidden bg-[#121212]">
        {/* Seamless blend gradient */}
        <div
          className="absolute inset-y-0 left-0 w-32 pointer-events-none z-10"
          style={{ background: "linear-gradient(to right, #121212 0%, transparent 100%)" }}
          aria-hidden="true"
        />
        {CHAPTERS.map((ch, i) => (
          <div
            key={i}
            ref={(el) => {
              videoContainers.current[i] = el;
            }}
            className="absolute inset-0 w-full h-full bg-[#121212]"
            style={{
              opacity: i === 0 ? 1 : 0,
              visibility: i === 0 ? "visible" : "hidden",
            }}
          >
            {/* Fallback poster image underneath video — prevents any gray flash during loading */}
            <img
              src={ch.posterSrc}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover"
              loading={i === 0 ? "eager" : "lazy"}
            />
            {/* HTML5 video element with poster, preload and autoplay */}
            <video
              ref={(el) => {
                videoRefs.current[i] = el;
              }}
              className="absolute inset-0 w-full h-full object-cover"
              src={ch.videoSrc}
              poster={ch.posterSrc}
              preload="auto"
              autoPlay
              loop
              muted
              playsInline
              aria-hidden="true"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Mobile stacked cards ──────────────────────────────────── */
function ScrollVideoMobile() {
  const { t } = useLang();

  const CHAPTERS = [
    {
      heading: t.scroll.ch1_title,
      body: t.scroll.ch1_body,
      videoSrc: "/media/video/01-workshop.mp4",
      posterSrc: "/media/video/01-workshop.jpg",
      exe: "process_01.exe",
    },
    {
      heading: t.scroll.ch2_title,
      body: t.scroll.ch2_body,
      videoSrc: "/media/video/02-process.mp4",
      posterSrc: "/media/video/02-process.jpg",
      exe: "process_02.exe",
    },
    {
      heading: t.scroll.ch3_title,
      body: t.scroll.ch3_body,
      videoSrc: "/media/video/03-products.mp4",
      posterSrc: "/media/video/03-products.jpg",
      exe: "process_03.exe",
    },
  ];

  return (
    <section className="md:hidden bg-[#121212]" aria-label="Как мы работаем">
      <div className="flex flex-col">
        {CHAPTERS.map((ch, i) => (
          <div key={i} className="flex flex-col">
            <div className="relative overflow-hidden bg-[#121212]" style={{ height: "45vh" }}>
              <img
                src={ch.posterSrc}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <video
                className="relative w-full h-full object-cover"
                src={ch.videoSrc}
                poster={ch.posterSrc}
                preload="metadata"
                autoPlay
                loop
                muted
                playsInline
                aria-hidden="true"
              />
              <div
                className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
                style={{ background: "linear-gradient(to bottom, transparent, #121212)" }}
                aria-hidden="true"
              />
            </div>
            {/* Mobile dark styled section */}
            <div className="px-6 py-8 bg-[#121212] border-t border-white/10">
              <span className="inline-block bg-[#D6307F] text-white font-mono text-xs font-bold px-2 py-0.5 mb-3 border border-t-[#ff8cc0] border-l-[#ff8cc0] border-b-[#8a1a4f] border-r-[#8a1a4f]">
                {String(i + 1).padStart(2, "0")} / {String(CHAPTERS.length).padStart(2, "0")}
              </span>
              <h2 className="text-white font-display text-2xl md:text-3xl font-bold mb-3 leading-tight">{ch.heading}</h2>
              <p className="text-white/80 text-sm md:text-base leading-relaxed mb-6">{ch.body}</p>
              <div className="flex gap-2">
                {CHAPTERS.map((_, dot) => (
                  <span key={dot} className={`h-1.5 flex-1 ${dot === i ? "bg-[#D6307F]" : "bg-white/20"}`} />
                ))}
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
    <div className="bg-[#121212]">
      <ScrollVideoDesktop />
      <ScrollVideoMobile />
    </div>
  );
}
