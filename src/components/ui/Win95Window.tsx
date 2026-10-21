import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type Win95Variant = "navy" | "magenta" | "dark";

export interface Win95WindowProps {
  title?: string;
  variant?: Win95Variant;
  className?: string;
  bodyClassName?: string;
  children: ReactNode;
}

const TITLE_BG: Record<Win95Variant, string> = {
  navy: "bg-[#121212] border-b-2 border-[#D6307F]",
  magenta: "bg-[#D6307F]",
  dark: "bg-[#121212] border-b-2 border-[#D6307F]",
};

export function Win95Window({
  title = "",
  variant = "navy",
  className,
  bodyClassName,
  children,
}: Win95WindowProps) {
  const bgClass = TITLE_BG[variant] || "bg-[#121212] border-b-2 border-[#D6307F]";
  const isMagenta = variant === "magenta";

  return (
    <div
      className={cn(
        "bg-[#dfdfdf] border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080]",
        className
      )}
    >
      {/* Title bar */}
      <div className={cn("flex justify-between items-center px-3 py-1.5 select-none", bgClass)}>
        <div className="flex items-center min-w-0 pr-2">
          <span
            className={cn(
              "w-2 h-2 inline-block mr-2 flex-shrink-0",
              isMagenta ? "bg-white" : "bg-[#D6307F]"
            )}
            aria-hidden="true"
          />
          <span className="text-white font-bold text-sm tracking-wide truncate">
            {title}
          </span>
        </div>
        <div className="flex gap-[2px] items-center flex-shrink-0">
          {["_", "□", "X"].map((btn) => (
            <span
              key={btn}
              className="bg-[#dfdfdf] border border-t-white border-l-white border-b-[#808080] border-r-[#808080] text-black text-[10px] font-bold w-5 h-5 flex items-center justify-center cursor-default select-none leading-none"
              aria-hidden="true"
            >
              {btn}
            </span>
          ))}
        </div>
      </div>

      {/* Children content */}
      <div className={cn("p-4", bodyClassName)}>
        {children}
      </div>
    </div>
  );
}

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
        "bg-[#dfdfdf] border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080]",
        className
      )}
    >
      {children}
    </div>
  );
}

export default Win95Window;
