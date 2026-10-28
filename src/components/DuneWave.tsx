import { cn } from "@/lib/utils";

interface DuneWaveProps {
  className?: string;
  /** Mirror the wave horizontally. */
  flip?: boolean | undefined;
  /** Flip vertically (e.g. wave sitting on top of a dark section). */
  upsideDown?: boolean | undefined;
  /** Slow drift of the back dune layer. Disabled with prefers-reduced-motion. */
  animated?: boolean;
}

/**
 * Dune-wave divider — the motif from the brand logo.
 * Color it via `text-*` (fill uses currentColor).
 */
export function DuneWave({ className, flip, upsideDown, animated = true }: DuneWaveProps) {
  return (
    <svg
      viewBox="0 0 1440 140"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={cn("block h-[60px] w-full overflow-hidden md:h-[110px]", className)}
      style={{
        transform: `${flip ? "scaleX(-1)" : ""} ${upsideDown ? "scaleY(-1)" : ""}`.trim() || undefined,
      }}
    >
      {/* Back layer is wider than the viewBox so the drift never shows a gap. */}
      <g className={cn(animated && "dune-drift")}>
        <path
          fill="currentColor"
          opacity="0.35"
          d="M0,70 C200,30 380,40 560,66 C760,94 900,62 1080,50 C1260,38 1380,60 1540,44 L1540,140 L0,140 Z"
        />
      </g>
      <path
        fill="currentColor"
        opacity="0.6"
        d="M0,96 C180,40 340,24 520,52 C700,80 780,120 960,108 C1140,96 1260,52 1440,28 L1440,140 L0,140 Z"
      />
      <path
        fill="currentColor"
        d="M0,120 C240,84 480,92 720,104 C960,116 1200,108 1440,84 L1440,140 L0,140 Z"
      />
    </svg>
  );
}
