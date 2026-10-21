import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export type Win95Variant = "navy" | "magenta" | "dark";

interface Win95WindowProps {
  title: string;
  variant?: Win95Variant;
  className?: string;
  bodyClassName?: string;
  children: ReactNode;
  /** Show the [_][□][X] title bar buttons */
  showControls?: boolean;
}

const TITLE_BG: Record<Win95Variant, string> = {
  navy:    "bg-[#000080]",
  magenta: "bg-[#D6307F]",
  dark:    "bg-[#444444]",
};

/** Tiny [_][□][X] Win95 chrome buttons */
function WinControls() {
  return (
    <span className="flex gap-[2px] flex-shrink-0">
      {["_", "□", "X"].map((ch) => (
        <button
          key={ch}
          type="button"
          aria-hidden="true"
          tabIndex={-1}
          className="w-4 h-4 bg-[#dfdfdf] border border-t-white border-l-white border-b-[#808080] border-r-[#808080] text-[10px] leading-none flex items-center justify-center text-[#121212] font-bold select-none"
        >
          {ch}
        </button>
      ))}
    </span>
  );
}

/** Classic Windows 95 raised panel with title bar */
export function Win95Window({
  title,
  variant = "navy",
  className,
  bodyClassName,
  children,
  showControls = true,
}: Win95WindowProps) {
  return (
    <div
      className={cn(
        "border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080] bg-[#dfdfdf]",
        className
      )}
    >
      {/* Title bar */}
      <div className={cn("flex items-center justify-between px-2 py-[3px]", TITLE_BG[variant])}>
        <span className="text-white text-xs font-bold font-mono tracking-wider uppercase truncate select-none pr-2">
          {title}
        </span>
        {showControls && <WinControls />}
      </div>
      {/* Content */}
      <div className={cn("p-4", bodyClassName)}>
        {children}
      </div>
    </div>
  );
}

/** Win95 raised panel WITHOUT a title bar — just the 3-D border */
export function Win95Panel({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080] bg-[#dfdfdf]",
        className
      )}
    >
      {children}
    </div>
  );
}
