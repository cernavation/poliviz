"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "../../../content/routes";
import Link from "next/link";


interface Option { value: string; label: string }

interface Props {
  catalogOptions: Option[];
  maxUploadMb: number;
}

type FormStatus = "idle" | "sending" | "success" | "error";

/* Win95 inset input class */
const win95Input =
  "bg-white text-[#121212] border-2 border-t-[#808080] border-l-[#808080] border-b-white border-r-white px-4 py-3 outline-none text-body w-full";

export function OrderFormClient({ catalogOptions, maxUploadMb }: Props) {
  const router = useRouter();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [fileError, setFileError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Pre-fill from URL search params (from "Хочу такое" / TechPicker links)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const form = formRef.current;
    if (!form) return;

    const productEl = form.querySelector<HTMLSelectElement>("#order-product");
    const commentEl = form.querySelector<HTMLTextAreaElement>("#order-comment");
    const nameEl = form.querySelector<HTMLInputElement>("#order-name");

    if (productEl && params.get("product")) productEl.value = params.get("product")!;
    if (commentEl && params.get("comment")) commentEl.value = params.get("comment")!;
    if (nameEl && params.get("name")) nameEl.value = params.get("name")!;
  }, []);

  const ACCEPTED = ".cdr,.ai,.eps,.tiff,.tif,.pdf,.jpg,.jpeg";
  const MAX_BYTES = maxUploadMb * 1024 * 1024;

  function validateFile(file: File): string | null {
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
    const allowed = ["cdr", "ai", "eps", "tiff", "tif", "pdf", "jpg", "jpeg"];
    if (!allowed.includes(ext)) return `Неподдерживаемый формат: .${ext}`;
    if (file.size > MAX_BYTES) return `Файл превышает ${maxUploadMb} МБ`;
    return null;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    // Honeypot check
    const hp = (form.elements.namedItem("_hp") as HTMLInputElement)?.value;
    if (hp) return; // bot

    const fileInput = form.querySelector<HTMLInputElement>("#order-file");
    if (fileInput?.files?.[0]) {
      const err = validateFile(fileInput.files[0]);
      if (err) { setFileError(err); return; }
    }
    setFileError(null);
    setStatus("sending");

    const data = new FormData(form);
    try {
      const res = await fetch("/raschet/api", { method: "POST", body: data });
      if (!res.ok) throw new Error("server error");
      router.push(ROUTES.orderThanks);
    } catch {
      setStatus("error");
    }
  }

  return (
    /* Win95 window wrapper */
    <div className="border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080] bg-[#dfdfdf]">
      {/* Title bar */}
      <div className="bg-[#000080] flex items-center justify-between px-2 py-1">
        <span className="text-white text-xs font-bold">Форма расчёта заказа</span>
        <span className="flex gap-[2px]">
          <button type="button" className="w-4 h-4 bg-[#dfdfdf] border border-t-white border-l-white border-b-[#808080] border-r-[#808080] text-[10px] leading-none flex items-center justify-center text-[#121212]">_</button>
          <button type="button" className="w-4 h-4 bg-[#dfdfdf] border border-t-white border-l-white border-b-[#808080] border-r-[#808080] text-[10px] leading-none flex items-center justify-center text-[#121212]">□</button>
          <button type="button" className="w-4 h-4 bg-[#dfdfdf] border border-t-white border-l-white border-b-[#808080] border-r-[#808080] text-[10px] leading-none flex items-center justify-center text-[#121212] font-bold">X</button>
        </span>
      </div>

      {/* Form body */}
      <div className="p-5">
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
          aria-label="Форма расчёта заказа"
          encType="multipart/form-data"
          noValidate
        >
          {/* Honeypot — hidden from humans */}
          <input type="text" name="_hp" tabIndex={-1} aria-hidden="true" className="hidden" />

          {/* Name */}
          <div className="flex flex-col gap-1">
            <label htmlFor="order-name" className="sheet-label text-[#121212]">
              Имя <span className="text-[#D6307F]" aria-label="обязательное поле">*</span>
            </label>
            <input
              id="order-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className={win95Input}
              placeholder="Ваше имя"
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1">
            <label htmlFor="order-phone" className="sheet-label text-[#121212]">
              Телефон <span className="text-[#D6307F]" aria-label="обязательное поле">*</span>
            </label>
            <input
              id="order-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              required
              className={win95Input}
              placeholder="+373 xx xxx xxx"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label htmlFor="order-email" className="sheet-label text-[#121212]">E-mail</label>
            <input
              id="order-email"
              name="email"
              type="email"
              autoComplete="email"
              className={win95Input}
              placeholder="your@email.com"
            />
          </div>

          {/* Product */}
          <div className="flex flex-col gap-1">
            <label htmlFor="order-product" className="sheet-label text-[#121212]">Что печатаем</label>
            <select
              id="order-product"
              name="product"
              className={win95Input + " appearance-none"}
            >
              <option value="">— Выберите из каталога —</option>
              {catalogOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          {/* Quantity */}
          <div className="flex flex-col gap-1">
            <label htmlFor="order-quantity" className="sheet-label text-[#121212]">Тираж</label>
            <input
              id="order-quantity"
              name="quantity"
              type="text"
              className={win95Input}
              placeholder="Например: 500 шт."
            />
          </div>

          {/* Deadline */}
          <div className="flex flex-col gap-1">
            <label htmlFor="order-deadline" className="sheet-label text-[#121212]">Срок</label>
            <input
              id="order-deadline"
              name="deadline"
              type="text"
              className={win95Input}
              placeholder="Например: к 1 ноября"
            />
          </div>

          {/* Comment */}
          <div className="flex flex-col gap-1">
            <label htmlFor="order-comment" className="sheet-label text-[#121212]">Комментарий</label>
            <textarea
              id="order-comment"
              name="comment"
              rows={4}
              className={win95Input + " resize-none"}
              placeholder="Дополнительные требования, особые пожелания"
            />
          </div>

          {/* File upload */}
          <div className="flex flex-col gap-1">
            <label htmlFor="order-file" className="sheet-label text-[#121212]">
              Макет (до {maxUploadMb} МБ)
            </label>
            <input
              id="order-file"
              name="file"
              type="file"
              accept={ACCEPTED}
              className={win95Input + " file:mr-4 file:py-1 file:px-3 file:rounded-none file:border-2 file:border-t-white file:border-l-white file:border-b-[#808080] file:border-r-[#808080] file:bg-[#dfdfdf] file:text-[#121212] file:text-caption cursor-pointer"}
              onChange={(e) => {
                const f = e.target.files?.[0];
                setFileError(f ? validateFile(f) : null);
              }}
            />
            <p className="text-caption text-[#444]">CDR, AI, EPS, TIFF, PDF, JPG</p>
            {fileError && <p className="text-caption text-[#D6307F]" role="alert">{fileError}</p>}
          </div>

          {/* Consent checkbox */}
          <div className="flex items-start gap-3">
            <input
              id="order-consent"
              name="consent"
              type="checkbox"
              required
              className="mt-1 flex-shrink-0"
              style={{ accentColor: "#D6307F" }}
            />
            <label htmlFor="order-consent" className="text-caption text-[#444] leading-snug">
              Я согласен на обработку персональных данных в соответствии с{" "}
              <Link href={ROUTES.privacy} className="underline hover:text-[#121212] transition-colors">
                политикой конфиденциальности
              </Link>
              . <span className="text-[#D6307F]">*</span>
            </label>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            variant="primary"
            disabled={status === "sending"}
            className="w-full"
          >
            {status === "sending" ? "Отправляем…" : "Отправить заявку"}
          </Button>

          {status === "error" && (
            <div role="alert" className="border-2 border-t-[#808080] border-l-[#808080] border-b-white border-r-white px-4 py-3 text-body text-[#D6307F] bg-white">
              Ошибка отправки. Позвоните нам напрямую или напишите на e-mail.
            </div>
          )}

          <p className="text-caption text-[#444]">
            * — обязательные поля. Данные не передаются третьим лицам.
          </p>
        </form>
      </div>
    </div>
  );
}
