import { cn, pad2 } from "@/lib/utils";

interface SheetLabelProps {
  sheet: number;
  total: number;
  tech: string;
  className?: string;
}

/**
 * Technical sheet caption: "ЛИСТ 03/08 · ОФСЕТ"
 * Rendered in JetBrains Mono, all-caps, muted colour.
 */
export function SheetLabel({ sheet, total, tech, className }: SheetLabelProps) {
  return (
    <span
      className={cn("sheet-label", className)}
      aria-label={`Лист ${sheet} из ${total}, ${tech}`}
    >
      {`ЛИСТ ${pad2(sheet)}/${pad2(total)} · ${tech.toUpperCase()}`}
    </span>
  );
}
