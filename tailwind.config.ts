/** @type {import('tailwindcss').Config} */
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    // ── Reset Tailwind's defaults to the Poliviz design system ──
    colors: {
      transparent: "transparent",
      current: "currentColor",
      // ── Palette ─────────────────────────────────────────────
      paper:   "#F4F1EA", // page ground
      ink:     "#121212", // body text, dark sections
      magenta: "#D6307F", // primary accent, CTA
      cyan:    "#00A3E0", // CMYK accent (rare)
      yellow:  "#FFD400", // CMYK accent (rare)
      mid:     "#D9D4C7", // secondary surfaces, dividers
      white:   "#FFFFFF",
      // ── Functional aliases ──────────────────────────────────
      muted:   "#7A7469", // secondary text
    },
    fontFamily: {
      sans: ["Onest", "system-ui", "sans-serif"],
      mono: ["JetBrains Mono", "monospace"],
    },
    fontSize: {
      // 5-step type scale (display down to caption)
      "display": ["clamp(4rem, 8vw, 7.5rem)", { lineHeight: "0.92", letterSpacing: "-0.04em" }],
      "headline": ["clamp(2.25rem, 4.5vw, 3.75rem)", { lineHeight: "1.0", letterSpacing: "-0.03em" }],
      "title": ["clamp(1.25rem, 2vw, 1.75rem)", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
      "body": ["1rem", { lineHeight: "1.55", letterSpacing: "0" }],
      "caption": ["0.8125rem", { lineHeight: "1.4", letterSpacing: "0" }],
    },
    // ── Sharp geometry — max 4px radius ─────────────────────
    borderRadius: {
      none: "0",
      sm:   "2px",
      DEFAULT: "4px",
    },
    // ── Thin lines only ────────────────────────────────────
    borderWidth: {
      DEFAULT: "1px",
      0: "0",
      2: "2px",
    },
    // ── No decorative shadows ──────────────────────────────
    // Only elevated UI elements (menus, dialogs) use shadow
    boxShadow: {
      none: "none",
      menu: "0 8px 24px rgba(18,18,18,0.12)",
    },
    // ── Spacing: 8px base grid ────────────────────────────
    spacing: {
      px: "1px",
      0: "0",
      0.5: "2px",
      1: "4px",
      2: "8px",
      3: "12px",
      4: "16px",
      5: "20px",
      6: "24px",
      7: "28px",
      8: "32px",
      10: "40px",
      12: "48px",
      14: "56px",
      16: "64px",
      18: "72px",
      20: "80px",
      24: "96px",
      28: "112px",
      32: "128px",
      36: "144px",
      40: "160px",
      48: "192px",
      56: "224px",
      64: "256px",
      72: "288px",
      80: "320px",
      // Section gaps
      section: "clamp(5rem, 10vw, 13.75rem)",
    },
    extend: {
      // ── Animation helpers ──────────────────────────────────
      transitionTimingFunction: {
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      transitionDuration: {
        250: "250ms",
        400: "400ms",
        600: "600ms",
      },
      // ── Grid ──────────────────────────────────────────────
      gridTemplateColumns: {
        "catalog": "repeat(auto-fill, minmax(220px, 1fr))",
      },
      // ── Content max-widths ─────────────────────────────────
      maxWidth: {
        prose: "68ch",
        content: "1280px",
      },
      // ── CMYK halftone pattern (via background) ─────────────
      backgroundImage: {
        "halftone": "radial-gradient(circle, #D9D4C7 1px, transparent 1px)",
      },
      backgroundSize: {
        "halftone": "12px 12px",
      },
    },
  },
  plugins: [],
};

export default config;
