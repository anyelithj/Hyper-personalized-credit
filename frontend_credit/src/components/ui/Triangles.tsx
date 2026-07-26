interface TrianglesProps {
  /** Color story of the triangles */
  variant?: 'yellow' | 'blue-on-yellow' | 'white-on-blue' | 'yellow-soft';
  /** Extra positioning classes, e.g. "right-0 top-0 w-[420px]" */
  className?: string;
}

/**
 * Geometric triangle motif used throughout the brand (hero, portfolio,
 * offers, process and bot sections). Purely decorative — aria-hidden.
 */
export default function Triangles({ variant = 'yellow', className = '' }: TrianglesProps) {
  const fills: Record<string, [string, string, string]> = {
    yellow: ['#FFC629', '#FFDA6B', '#FFECA8'],
    'blue-on-yellow': ['#1657D0', '#3A6EDB', '#7EA0EA'],
    'white-on-blue': ['#FFFFFF', 'rgba(255,255,255,0.55)', 'rgba(255,255,255,0.25)'],
    'yellow-soft': ['#FFC629', 'rgba(255,198,41,0.55)', 'rgba(255,198,41,0.25)'],
  };
  const [a, b, c] = fills[variant];

  return (
    <svg
      aria-hidden="true"
      className={`absolute pointer-events-none select-none ${className}`}
      viewBox="0 0 420 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon points="420,0 420,300 190,0" fill={a} />
      <polygon points="420,300 420,420 300,420" fill={b} />
      <polygon points="230,0 340,0 230,140" fill={c} />
      <polygon points="150,60 260,170 150,170" fill={b} />
    </svg>
  );
}
