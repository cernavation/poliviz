import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** Format phone for tel: href — strip spaces and dashes */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/\s+/g, "")}`;
}

/** Check if running in development mode */
export const isDev = process.env.NODE_ENV === "development";

/** Pad a number to 2 digits: 1 → "01" */
export function pad2(n: number): string {
  return String(n).padStart(2, "0");
}
