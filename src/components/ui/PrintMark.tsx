/** Registration cross (+) as an SVG — print prepress mark */
export function PrintMark({
  size = 16,
  color = "currentColor",
  className = "",
}: {
  size?: number;
  color?: string;
  className?: string;
}) {
  const half = size / 2;
  const gap = size * 0.15;
  const arm = size * 0.35;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden="true"
      className={className}
    >
      {/* Circle */}
      <circle
        cx={half}
        cy={half}
        r={size * 0.28}
        fill="none"
        stroke={color}
        strokeWidth={0.75}
      />
      {/* Horizontal arm */}
      <line
        x1={0}
        y1={half}
        x2={half - gap}
        y2={half}
        stroke={color}
        strokeWidth={0.75}
      />
      <line
        x1={half + gap}
        y1={half}
        x2={size}
        y2={half}
        stroke={color}
        strokeWidth={0.75}
      />
      {/* Vertical arm */}
      <line
        x1={half}
        y1={0}
        x2={half}
        y2={half - gap}
        stroke={color}
        strokeWidth={0.75}
      />
      <line
        x1={half}
        y1={half + gap}
        x2={half}
        y2={size}
        stroke={color}
        strokeWidth={0.75}
      />
    </svg>
  );
}
