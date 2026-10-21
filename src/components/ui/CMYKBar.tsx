/** CMYK colour strip — used as section divider */
export function CMYKBar({ className = "" }: { className?: string }) {
  return (
    <div
      className={`cmyk-bar ${className}`}
      aria-hidden="true"
      role="presentation"
    >
      <span />
      <span />
      <span />
      <span />
    </div>
  );
}
