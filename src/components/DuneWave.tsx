import { cn } from "@/lib/utils";

interface DuneWaveProps {
  className?: string;
  /** Mirror the wave horizontally. */
  flip?: boolean;
  /** Flip vertically (e.g. wave sitting on top of a dark section). */
  upsideDown?: boolean;
}

/**
 * Dune-wave divider — the motif from the brand logo.
 * Color it via `text-*` (fill uses currentColor).
 */
export function DuneWave({ className, flip, upsideDown }: DuneWaveProps) {
  return (
    <svg
      viewBox="0 0 1440 140"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={cn("block h-[70px] w-full md:h-[110px]", className)}
      style={{
        transform: `${flip ? "scaleX(-1)" : ""} ${upsideDown ? "scaleY(-1)" : ""}`.trim() || undefined,
      }}
    >
      <path
        fill="currentColor"
        d="M0,96 C180,40 340,24 520,52 C700,80 780,120 960,108 C1140,96 1260,52 1440,28 L1440,140 L0,140 Z"
      />
      <path
        fill="currentColor"
        opacity="0.55"
        d="M0,120 C240,84 480,92 720,104 C960,116 1200,108 1440,84 L1440,140 L0,140 Z"
      />
    </svg>
  );
}
