import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  as?: "button" | "a";
  href?: string;
}

export function Button({
  variant = "primary",
  as: Tag = "button",
  href,
  className,
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-sans font-bold text-body leading-none px-6 py-3 cursor-pointer select-none rounded-none transition-none focus-visible:outline-2 focus-visible:outline-offset-2 border-2";

  const variants = {
    // Classic Win95 grey 3-D button
    primary:
      "bg-[#D6307F] !text-white border-t-[#ff8cc0] border-l-[#ff8cc0] border-b-[#8a1a4f] border-r-[#8a1a4f] active:border-t-[#8a1a4f] active:border-l-[#8a1a4f] active:border-b-[#ff8cc0] active:border-r-[#ff8cc0] active:translate-y-[1px]",
    outline:
      "bg-[#dfdfdf] !text-[#121212] border-t-white border-l-white border-b-[#808080] border-r-[#808080] active:bg-[#d0d0d0] active:border-t-[#808080] active:border-l-[#808080] active:border-b-white active:border-r-white active:translate-y-[1px]",
    ghost:
      "bg-[#dfdfdf] !text-[#121212] border-t-white border-l-white border-b-[#808080] border-r-[#808080] active:bg-[#d0d0d0] active:border-t-[#808080] active:border-l-[#808080] active:border-b-white active:border-r-white active:translate-y-[1px]",
  };

  if (Tag === "a") {
    return (
      <a href={href} className={cn(base, variants[variant], className)}>
        {children}
      </a>
    );
  }

  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
