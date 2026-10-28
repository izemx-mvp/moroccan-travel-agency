import { cn } from "@/lib/utils";

interface GoldRingProps {
  className?: string;
  /** Slow rotation of the dashed outer ring. */
  spin?: boolean;
}

/** Fine gold circle ring — the signature motif from the logo. Purely decorative. */
export function GoldRing({ className, spin = true }: GoldRingProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      aria-hidden="true"
      className={cn("pointer-events-none text-gold", className)}
    >
      <circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.7" />
      <g className={cn(spin && "ring-spin")} style={{ transformOrigin: "100px 100px" }}>
        <circle
          cx="100"
          cy="100"
          r="88"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.6"
          strokeDasharray="1 6"
          opacity="0.6"
        />
      </g>
      <circle cx="100" cy="4" r="2.2" fill="currentColor" />
    </svg>
  );
}
