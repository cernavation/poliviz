"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Win95Window } from "@/components/ui/Win95Window";
import { ROUTES } from "@/lib/routes";
import { useLang } from "@/context/LanguageContext";
import Link from "next/link";

interface Option { value: string; label: string }
interface Props { catalogOptions: Option[]; maxUploadMb: number; }
type FormStatus = "idle" | "sending" | "success" | "error";

const win95Input =
  "bg-white text-[#121212] border-2 border-t-[#808080] border-l-[#808080] border-b-white border-r-white px-4 py-3 outline-none text-body w-full";

export function OrderFormClient({ catalogOptions, maxUploadMb }: Props) {
  const router = useRouter();
  const { t, lang, localize } = useLang();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [fileError, setFileError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

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
    if (!allowed.includes(ext)) {
      return lang === "ro"
        ? `Format neacceptat: .${ext}`
        : lang === "en"
        ? `Unsupported format: .${ext}`
        : `Неподдерживаемый формат: .${ext}`;
    }
    if (file.size > MAX_BYTES) {
      return lang === "ro"
        ? `Fișierul depășește ${maxUploadMb} MB`
        : lang === "en"
        ? `File exceeds ${maxUploadMb} MB`
        : `Файл превышает ${maxUploadMb} МБ`;
    }
    return null;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const hp = (form.elements.namedItem("_hp") as HTMLInputElement)?.value;
    if (hp) return;
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
      router.push(localize(ROUTES.orderThanks));
    } catch {
      setStatus("error");
    }
  }

  const fileLabelText = t.order_form.file_label.replace("{mb}", String(maxUploadMb));

  return (
    <Win95Window title={t.order_form.title} variant="navy" bodyClassName="p-5">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex flex-col gap-5"
        aria-label={t.order_form.title}
        encType="multipart/form-data"
        noValidate
      >
        <input type="text" name="_hp" tabIndex={-1} aria-hidden="true" className="hidden" />

        <div className="flex flex-col gap-1">
          <label htmlFor="order-name" className="sheet-label text-[#121212]">
            {t.order_form.name} <span className="text-[#D6307F]">*</span>
          </label>
          <input id="order-name" name="name" type="text" autoComplete="name" required
            className={win95Input} placeholder={t.quick_form.name_ph} />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="order-phone" className="sheet-label text-[#121212]">
            {t.order_form.phone} <span className="text-[#D6307F]">*</span>
          </label>
          <input id="order-phone" name="phone" type="tel" autoComplete="tel" required
            className={win95Input} placeholder={t.quick_form.phone_ph} />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="order-email" className="sheet-label text-[#121212]">{t.order_form.email}</label>
          <input id="order-email" name="email" type="email" autoComplete="email"
            className={win95Input} placeholder="your@email.com" />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="order-product" className="sheet-label text-[#121212]">{t.order_form.product}</label>
          <select id="order-product" name="product" className={win95Input + " appearance-none"}>
            <option value="">{t.order_form.product_default}</option>
            {catalogOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="order-quantity" className="sheet-label text-[#121212]">{t.order_form.quantity}</label>
          <input id="order-quantity" name="quantity" type="text"
            className={win95Input} placeholder={t.order_form.quantity_ph} />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="order-deadline" className="sheet-label text-[#121212]">{t.order_form.deadline}</label>
          <input id="order-deadline" name="deadline" type="text"
            className={win95Input} placeholder={t.order_form.deadline_ph} />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="order-comment" className="sheet-label text-[#121212]">{t.order_form.comment}</label>
          <textarea id="order-comment" name="comment" rows={4}
            className={win95Input + " resize-none"}
            placeholder={t.order_form.comment_ph} />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="order-file" className="sheet-label text-[#121212]">{fileLabelText}</label>
          <input
            id="order-file" name="file" type="file" accept={ACCEPTED}
            className={win95Input + " file:mr-4 file:py-1 file:px-3 file:rounded-none file:border-2 file:border-t-white file:border-l-white file:border-b-[#808080] file:border-r-[#808080] file:bg-[#dfdfdf] file:text-[#121212] file:text-caption cursor-pointer"}
            onChange={(e) => { const f = e.target.files?.[0]; setFileError(f ? validateFile(f) : null); }}
          />
          <p className="text-caption text-[#444]">{t.order_form.file_formats}</p>
          {fileError && <p className="text-caption text-[#D6307F]" role="alert">{fileError}</p>}
        </div>

        <div className="flex items-start gap-3">
          <input id="order-consent" name="consent" type="checkbox" required
            className="mt-1 flex-shrink-0" style={{ accentColor: "#D6307F" }} />
          <label htmlFor="order-consent" className="text-caption text-[#444] leading-snug">
            {t.order_form.consent}{" "}
            <Link href={localize(ROUTES.privacy)} className="underline hover:text-[#121212] transition-colors">
              {t.order_form.consent_link}
            </Link>. <span className="text-[#D6307F]">*</span>
          </label>
        </div>

        <Button type="submit" variant="primary" disabled={status === "sending"} className="w-full">
          {status === "sending" ? t.order_form.sending : t.order_form.submit}
        </Button>

        {status === "error" && (
          <div role="alert" className="border-2 border-t-[#808080] border-l-[#808080] border-b-white border-r-white px-4 py-3 text-body text-[#D6307F] bg-white">
            {t.order_form.error}
          </div>
        )}

        <p className="text-caption text-[#444]">{t.order_form.required_note}</p>
      </form>
    </Win95Window>
  );
}
