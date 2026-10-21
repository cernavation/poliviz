"use client";
import { useEffect } from "react";
import { CMYKBar } from "@/components/ui/CMYKBar";
import { PrintMark } from "@/components/ui/PrintMark";
import { SheetLabel } from "@/components/ui/SheetLabel";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "../../content/routes";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="ru">
      <body style={{ background: "#F4F1EA", margin: 0, fontFamily: "sans-serif" }}>
        <CMYKBar />
        <section
          style={{
            minHeight: "80vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "2rem",
          }}
        >
          <div style={{ maxWidth: "800px", margin: "0 auto", width: "100%" }}>
            <p
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "0.7rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#7A7469",
                marginBottom: "2rem",
              }}
            >
              ЛИСТ 00/00 · ОШИБКА
            </p>
            <h1
              style={{
                fontSize: "clamp(2rem, 6vw, 5rem)",
                fontWeight: 700,
                color: "#121212",
                lineHeight: 1,
                letterSpacing: "-0.03em",
                marginBottom: "1.5rem",
              }}
            >
              Что-то пошло не так.
            </h1>
            <p style={{ fontSize: "1rem", color: "#7A7469", marginBottom: "2rem" }}>
              Ошибка на стороне сервера. Попробуйте перезагрузить страницу или вернитесь позже.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <button
                onClick={reset}
                style={{
                  background: "#D6307F",
                  color: "#F4F1EA",
                  border: "none",
                  padding: "0.75rem 1.5rem",
                  fontSize: "1rem",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                Перезагрузить
              </button>
              <a
                href={ROUTES.home}
                style={{
                  border: "1px solid #121212",
                  color: "#121212",
                  padding: "0.75rem 1.5rem",
                  fontSize: "1rem",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                На главную
              </a>
            </div>
          </div>
        </section>
      </body>
    </html>
  );
}
