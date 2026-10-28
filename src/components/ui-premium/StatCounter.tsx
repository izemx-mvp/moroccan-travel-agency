import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface Stat {
  /** null = figure not provided yet, rendered as "—". */
  value: number | null;
  suffix?: string;
  prefix?: string;
  label: string;
}

interface StatCounterProps extends Stat {
  tone?: "light" | "dark";
  className?: string;
  size?: "md" | "lg";
}

/** Number counting up when scrolled into view. */
export function StatCounter({
  value,
  suffix = "",
  prefix = "",
  label,
  tone = "dark",
  className,
  size = "md",
}: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (value == null || !inView) return;
    if (reduced) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduced, value]);

  return (
    <div className={cn("flex flex-col", className)}>
      <span
        ref={ref}
        className={cn(
          "font-display font-semibold leading-none tabular-nums",
          size === "lg" ? "text-5xl md:text-6xl" : "text-4xl md:text-5xl",
          tone === "dark" ? "text-gold" : "text-gold-deep"
        )}
      >
        {value == null ? "—" : `${prefix}${display.toLocaleString("fr-FR")}${suffix}`}
      </span>
      <span
        className={cn(
          "mt-2 text-xs font-medium uppercase tracking-[0.18em]",
          tone === "dark" ? "text-cream/65" : "text-ink/65"
        )}
      >
        {label}
      </span>
    </div>
  );
}
