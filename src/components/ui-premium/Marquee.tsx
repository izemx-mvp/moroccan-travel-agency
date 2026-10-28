import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: ReactNode;
  reverse?: boolean;
  /** Seconds for one full loop. */
  duration?: number;
  className?: string;
  /** Classes of each copy of the row (gap, padding). */
  rowClassName?: string;
  /** Fade the edges into the section background. */
  fade?: boolean;
}

/**
 * Infinite horizontal scroller. Content is duplicated (second copy hidden from
 * assistive tech); pauses on hover and stops with prefers-reduced-motion.
 */
export function Marquee({
  children,
  reverse = false,
  duration = 40,
  className,
  rowClassName = "gap-4 pr-4",
  fade = true,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "marquee relative overflow-hidden",
        fade &&
          "[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className
      )}
    >
      <div
        className="marquee-track flex w-max"
        data-reverse={reverse}
        style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
      >
        <div className={cn("flex shrink-0 items-center", rowClassName)}>{children}</div>
        <div className={cn("flex shrink-0 items-center", rowClassName)} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
