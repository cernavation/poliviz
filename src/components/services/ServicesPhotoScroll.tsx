"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { SERVICES } from "../../../content/services.config";
import { useLang } from "@/context/LanguageContext";

// Extra scroll distance beyond the pinned 100vh viewport (doubled to 800vh for slower transitions)
const EXTRA_SCROLL = "800vh";

/* ─── Desktop pinned photo-scroll ──────────────────────────── */
function PhotoScrollDesktop() {
  const { lang, localize } = useLang();
  const panelRef  = useRef<HTMLDivElement>(null);
  const photoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs  = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Initial states
    photoRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { opacity: i === 0 ? 1 : 0 });
    });
    textRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 28 });
    });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: panel,
          pin: true,
          pinSpacing: true,
          start: "top top",
          end: () => "+=" + (window.innerHeight * 8),
          scrub: 1.4,
          anticipatePin: 1,
        },
      });

      const segSize = 1 / SERVICES.length;

      SERVICES.forEach((_, i) => {
        if (i === SERVICES.length - 1) return;

        const tStart = segSize * (i + 1) - segSize * 0.18;
        const tEnd   = segSize * (i + 1) + segSize * 0.04;
        const dur    = tEnd - tStart;

        tl.to(textRefs.current[i],
          { opacity: 0, y: -24, duration: dur, ease: "power2.in" },
          tStart
        );
        tl.fromTo(textRefs.current[i + 1],
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: dur * 1.1, ease: "power2.out" },
          tStart + dur * 0.25
        );
        tl.to(photoRefs.current[i],
          { opacity: 0, duration: dur, ease: "power1.inOut" },
          tStart
        );
        tl.to(photoRefs.current[i + 1],
          { opacity: 1, duration: dur, ease: "power1.inOut" },
          tStart
        );
      });
    }, panel);

    return () => ctx.revert();
  }, []);

  const moreLabel = lang === "ro" ? "Detalii" : lang === "en" ? "Learn more" : "Подробнее";

  return (
    <div
      ref={panelRef}
      className="hidden md:flex h-screen w-full overflow-hidden bg-ink"
      aria-label="Технологии типографии"
    >
      {/* LEFT: text panel (5/12) */}
      <div className="relative w-5/12 flex-shrink-0">
        {SERVICES.map((service, i) => (
          <div
            key={service.index}
            ref={(el) => { textRefs.current[i] = el; }}
            className="absolute inset-0 flex flex-col justify-center px-10 xl:px-16"
            style={{ opacity: i === 0 ? 1 : 0 }}
          >
            <span className="block font-mono text-caption text-magenta tracking-widest uppercase mb-6">
              {String(service.index).padStart(2, "0")} / {String(SERVICES.length).padStart(2, "0")}
            </span>

            <h2
              className="text-paper font-bold leading-tight tracking-tight mb-4"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.75rem)" }}
            >
              {service.title[lang] || service.title.ru}
            </h2>

            <p className="text-body text-mid leading-relaxed max-w-xs mb-8">
              {service.hubSpec[lang] || service.hubSpec.ru}
            </p>

            <Link
              href={localize(service.href)}
              className="inline-flex items-center gap-2 text-caption text-magenta hover:text-paper transition-colors font-semibold uppercase tracking-wider self-start"
            >
              {moreLabel} <span aria-hidden="true">→</span>
            </Link>

            {/* Progress bar */}
            <div className="mt-10 flex gap-2">
              {SERVICES.map((_, dot) => (
                <span
                  key={dot}
                  className={`h-px flex-1 ${dot === i ? "bg-magenta" : "bg-mid/30"}`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT: photo panel (7/12) */}
      <div className="relative w-7/12 flex-shrink-0 overflow-hidden">
        {/* Left blend */}
        <div
          className="absolute inset-y-0 left-0 w-32 pointer-events-none z-10"
          style={{ background: "linear-gradient(to right, #121212 0%, transparent 100%)" }}
          aria-hidden="true"
        />

        {SERVICES.map((service, i) => (
          <div
            key={service.index}
            ref={(el) => { photoRefs.current[i] = el; }}
            className="absolute inset-0"
            style={{ opacity: i === 0 ? 1 : 0 }}
          >
            <Image
              src={service.heroPhoto}
              alt={service.title[lang] || service.title.ru}
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 58vw"
              priority={i === 0}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Mobile stacked cards ──────────────────────────────────── */
function PhotoScrollMobile() {
  const { lang, localize } = useLang();
  const moreLabel = lang === "ro" ? "Detalii →" : lang === "en" ? "Learn more →" : "Подробнее →";

  return (
    <section className="md:hidden bg-ink" aria-label="Технологии типографии">
      <div className="flex flex-col">
        {SERVICES.map((service) => (
          <div key={service.index} className="flex flex-col">
            <div
              className="relative overflow-hidden"
              style={{ height: "50vw", minHeight: "220px" }}
            >
              <Image
                src={service.heroPhoto}
                alt={service.title[lang] || service.title.ru}
                fill
                className="object-cover object-center"
                sizes="100vw"
              />
              <div
                className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
                style={{ background: "linear-gradient(to bottom, transparent, #121212)" }}
                aria-hidden="true"
              />
            </div>

            <div className="px-6 py-7 bg-ink border-t border-mid/10">
              <span className="block font-mono text-caption text-magenta tracking-widest uppercase mb-2">
                {String(service.index).padStart(2, "0")} / {String(SERVICES.length).padStart(2, "0")}
              </span>
              <h2
                className="text-paper font-bold leading-tight mb-2"
                style={{ fontSize: "clamp(1.25rem, 4.5vw, 1.75rem)" }}
              >
                {service.title[lang] || service.title.ru}
              </h2>
              <p className="text-body text-mid mb-4 leading-relaxed">{service.hubSpec[lang] || service.hubSpec.ru}</p>
              <Link
                href={localize(service.href)}
                className="text-caption text-magenta hover:text-paper transition-colors font-semibold uppercase tracking-wider"
              >
                {moreLabel}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Public export ─────────────────────────────────────────── */
export function ServicesPhotoScroll() {
  return (
    <div style={{ backgroundColor: "#121212" }}>
      <PhotoScrollDesktop />
      <PhotoScrollMobile />
    </div>
  );
}
