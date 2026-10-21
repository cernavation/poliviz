"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import { cn } from "@/lib/utils";

type Stage = "riddle" | "success" | "video" | "dissolve" | "finished";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
}

const FIREWORK_COLORS = [
  "#D6307F", // Magenta
  "#FF4081", // Bright Magenta / Pink
  "#FFD700", // Gold
  "#FFA500", // Orange Gold
  "#FFFFFF", // Pure White
  "#F4F1EA", // Warm Paper White
];

export function BirthdayIntro() {
  // Synchronous initial stage is 'riddle' with solid #121212 to prevent any flash of site content
  const [stage, setStage] = useState<Stage>("riddle");
  const [answer, setAnswer] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [showErrorText, setShowErrorText] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dissolveCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const dissolveFrameRef = useRef<number | null>(null);

  // Check sessionStorage on mount (if user already completed intro, dismiss it)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const forceIntro = params.get("intro") === "1";
      const isCompleted = sessionStorage.getItem("poliviz_birthday_completed") === "true";

      if (!forceIntro && isCompleted) {
        setStage("finished");
      }
    } catch {
      // keep riddle
    }
  }, []);

  // ─── STAGE 2: 8-BIT FIREWORKS CANVAS ────────────────────────
  useEffect(() => {
    if (stage !== "success") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const particles: Particle[] = [];

    const createBurst = (originX: number, originY: number) => {
      const count = 55 + Math.floor(Math.random() * 30);
      const color =
        FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)];

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.5 + Math.random() * 5.5;
        particles.push({
          x: originX,
          y: originY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() > 0.5 ? 4 : 6, // 8-bit chunky square pixels
          color:
            Math.random() > 0.3
              ? color
              : FIREWORK_COLORS[
                  Math.floor(Math.random() * FIREWORK_COLORS.length)
                ],
          alpha: 1,
          decay: 0.01 + Math.random() * 0.015,
        });
      }
    };

    // Initial bursts
    createBurst(width * 0.3, height * 0.35);
    createBurst(width * 0.7, height * 0.3);

    // Continuous bursts
    const interval = setInterval(() => {
      const x = width * 0.15 + Math.random() * (width * 0.7);
      const y = height * 0.15 + Math.random() * (height * 0.45);
      createBurst(x, y);
    }, 380);

    // Animation loop
    const render = () => {
      // Trail effect with dark fade
      ctx.fillStyle = "rgba(18, 18, 18, 0.22)";
      ctx.fillRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08; // gravity
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        // Snap to pixel grid for authentic 8-bit look
        ctx.fillRect(Math.floor(p.x), Math.floor(p.y), p.size, p.size);
        ctx.restore();
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [stage]);

  // ─── STAGE 3: PIXEL DISSOLVE EFFECT ─────────────────────────
  const startPixelDissolve = () => {
    setStage("dissolve");

    const canvas = dissolveCanvasRef.current;
    if (!canvas) {
      finishIntro();
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      finishIntro();
      return;
    }

    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    // Fill completely white initially
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, width, height);

    // Grid of pixel blocks
    const blockSize = 32;
    const cols = Math.ceil(width / blockSize);
    const rows = Math.ceil(height / blockSize);
    const blocks: Array<{ col: number; row: number }> = [];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        blocks.push({ col: c, row: r });
      }
    }

    // Shuffle blocks (Fisher-Yates)
    for (let i = blocks.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = blocks[i];
      blocks[i] = blocks[j];
      blocks[j] = temp;
    }

    const totalBlocks = blocks.length;
    let blockIndex = 0;
    // Total duration ~800ms at 60fps = ~48 frames
    const blocksPerFrame = Math.ceil(totalBlocks / 46);

    const step = () => {
      const end = Math.min(blockIndex + blocksPerFrame, totalBlocks);
      for (let i = blockIndex; i < end; i++) {
        const b = blocks[i];
        ctx.clearRect(b.col * blockSize, b.row * blockSize, blockSize, blockSize);
      }
      blockIndex = end;

      if (blockIndex < totalBlocks) {
        dissolveFrameRef.current = requestAnimationFrame(step);
      } else {
        finishIntro();
      }
    };

    dissolveFrameRef.current = requestAnimationFrame(step);
  };

  const finishIntro = () => {
    try {
      sessionStorage.setItem("poliviz_birthday_completed", "true");
    } catch {
      // ignore storage errors
    }
    setStage("finished");
  };

  // ─── RIDDLE SUBMIT HANDLER ──────────────────────────────────
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const normalized = answer
      .toLowerCase()
      .trim()
      .replace(/ё/g, "е")
      .replace(/\s+/g, " ");

    if (normalized === "алексей церна" || normalized === "церна алексей") {
      setShowErrorText(false);
      setStage("success");
    } else {
      setAttempts((prev) => prev + 1);
      setShowErrorText(true);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  // If already finished, render nothing
  if (stage === "finished") {
    return null;
  }

  return (
    <>
      {/* ── Background Preloader for 00-hero.mp4 ── */}
      <video
        src="/media/video/00-hero.mp4"
        preload="auto"
        muted
        playsInline
        className="hidden"
        aria-hidden="true"
      />

      {/* ── STAGE 1 & 2: BLACK GROUND WITH WIN95 WINDOW & FIREWORKS ── */}
      {(stage === "riddle" || stage === "success") && (
        <div className="fixed inset-0 z-[9999] bg-[#121212] flex items-center justify-center p-4 select-none overflow-hidden">
          {/* Fireworks canvas on success */}
          {stage === "success" && (
            <canvas
              ref={canvasRef}
              className="absolute inset-0 pointer-events-none z-10"
            />
          )}

          {/* Win95 Window */}
          <div
            className={cn(
              "relative z-20 w-full max-w-xl bg-[#E6E2D8] border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080] shadow-2xl transition-transform",
              isShaking && "animate-shake"
            )}
          >
            {/* Title Bar */}
            <div
              className={cn(
                "flex justify-between items-center px-3 py-1.5 select-none transition-colors duration-300",
                stage === "success" ? "bg-[#D6307F]" : "bg-[#121212]"
              )}
            >
              <div className="flex items-center min-w-0 pr-2">
                <span
                  className={cn(
                    "w-2.5 h-2.5 inline-block mr-2 flex-shrink-0",
                    stage === "success" ? "bg-white" : "bg-[#D6307F]"
                  )}
                  aria-hidden="true"
                />
                <span className="text-white font-mono font-bold text-xs md:text-sm tracking-wide truncate">
                  {stage === "success"
                    ? "ДОСТУП РАЗРЕШЁН · С ДНЁМ РОЖДЕНИЯ! 🎉"
                    : "poliviz_security_check.exe"}
                </span>
              </div>
              <div className="flex gap-[2px] items-center flex-shrink-0">
                {["_", "□", "✕"].map((btn) => (
                  <span
                    key={btn}
                    className="bg-[#dfdfdf] border border-t-white border-l-white border-b-[#808080] border-r-[#808080] text-[#121212] text-[10px] font-bold w-5 h-5 flex items-center justify-center cursor-default select-none leading-none"
                    aria-hidden="true"
                  >
                    {btn}
                  </span>
                ))}
              </div>
            </div>

            {/* Window Content */}
            <div className="p-5 md:p-7 select-text">
              {stage === "riddle" ? (
                <>
                  <p className="text-[#121212] font-sans font-semibold text-base md:text-lg leading-relaxed mb-6">
                    Кто такой человек, который отец трех детей, предприниматель,
                    ультрамарафонец, находит время проводить жизнь с семьей и
                    детьми, при этом работая на работе даже в свой день
                    рождения!?
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <input
                        type="text"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder="Введите ответ..."
                        autoFocus
                        className="w-full bg-white text-[#121212] border-2 border-t-[#808080] border-l-[#808080] border-b-white border-r-white px-3 py-2 text-sm md:text-base font-sans outline-none focus:ring-1 focus:ring-[#D6307F]"
                      />
                    </div>

                    {/* Attempt error text (attempts 1-4 or ongoing) */}
                    {showErrorText && attempts >= 1 && (
                      <p className="text-[#dc2626] font-mono text-xs md:text-sm font-bold">
                        Доступ запрещён. Попытка {attempts} из 5
                      </p>
                    )}

                    {/* Hint 1 (shown on attempt 5 and beyond) */}
                    {attempts >= 5 && (
                      <div className="bg-[#FFF9D2] border-2 border-[#D4AF37] text-[#121212] p-2.5 text-xs md:text-sm font-semibold flex items-center gap-2">
                        <span>💡</span>
                        <span>Подсказка 1: напишите имя и фамилию.</span>
                      </div>
                    )}

                    {/* Hint 2 (shown on attempt 6 and beyond) */}
                    {attempts >= 6 && (
                      <div className="bg-[#FFF9D2] border-2 border-[#D4AF37] text-[#121212] p-2.5 text-xs md:text-sm font-semibold flex items-center gap-2">
                        <span>💡</span>
                        <span>Подсказка 2: На русском!</span>
                      </div>
                    )}

                    <div className="pt-2 flex justify-end">
                      <button
                        type="submit"
                        className="bg-[#dfdfdf] text-[#121212] font-bold border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080] active:bg-[#d0d0d0] active:border-t-[#808080] active:border-l-[#808080] active:border-b-white active:border-r-white active:translate-y-[1px] px-6 py-2 text-sm select-none transition-none"
                      >
                        Проверить
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                /* ── STAGE 2: SUCCESS VIEW ── */
                <div className="space-y-6">
                  <p className="text-[#121212] font-sans font-medium text-base md:text-lg leading-relaxed">
                    Поздравляю! Ты знаешь кто ты такой! С днем рождения, пап! Я
                    увидел, что у тебя сайт лажа полная, и она подтвердилась
                    звонком от KMB. Проблему заметил еще давно, и так как я твой
                    сын (предприниматель с рождения) — решил эту проблему!
                  </p>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setStage("video")}
                      className="w-full bg-[#D6307F] text-white font-bold text-base md:text-lg border-2 border-t-[#ff8cc0] border-l-[#ff8cc0] border-b-[#8a1a4f] border-r-[#8a1a4f] active:border-t-[#8a1a4f] active:border-l-[#8a1a4f] active:border-b-[#ff8cc0] active:border-r-[#ff8cc0] active:translate-y-[1px] py-3 px-6 shadow-md cursor-pointer hover:brightness-105 select-none"
                    >
                      Заценить результат!
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── STAGE 3: VIDEO INTRO (PURE WHITE GROUND) ── */}
      {stage === "video" && (
        <div className="fixed inset-0 z-[9999] bg-white flex items-center justify-center p-4">
          <video
            ref={videoRef}
            src="/media/video/poliviz-intro.mp4"
            autoPlay
            playsInline
            onEnded={startPixelDissolve}
            onError={startPixelDissolve}
            className="max-w-3xl w-full object-contain"
          />
          {/* Subtle skip button */}
          <button
            type="button"
            onClick={startPixelDissolve}
            className="absolute top-4 right-4 bg-[#dfdfdf] text-[#121212] border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080] px-3 py-1 text-xs font-mono font-bold hover:bg-[#d0d0d0]"
          >
            Пропустить ✕
          </button>
        </div>
      )}

      {/* ── STAGE 3: RETRO PIXEL DISSOLVE OVERLAY ── */}
      {stage === "dissolve" && (
        <canvas
          ref={dissolveCanvasRef}
          className="fixed inset-0 z-[9999] pointer-events-none w-full h-full"
        />
      )}
    </>
  );
}

export default BirthdayIntro;
