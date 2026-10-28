import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useRef, type ReactNode } from "react";
import type { ImageName } from "@/config/images";
import { cn } from "@/lib/utils";
import { SmartImage } from "./SmartImage";

export interface TimelineItem {
  title: string;
  /** Small label above the title (day, year, step…). */
  label?: string;
  text: ReactNode;
  image?: ImageName;
}

interface TimelineProps {
  items: TimelineItem[];
  tone?: "light" | "dark";
  className?: string;
}

/** Vertical timeline whose gold line draws itself as you scroll. */
export function VerticalTimeline({ items, tone = "light", className }: TimelineProps) {
  const ref = useRef<HTMLOListElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const dark = tone === "dark";

  return (
    <ol ref={ref} className={cn("relative space-y-10 pl-10 md:pl-14", className)}>
      <span
        aria-hidden="true"
        className={cn("absolute bottom-2 left-[11px] top-2 w-px md:left-[15px]", dark ? "bg-coal-border" : "bg-ink/10")}
      />
      <motion.span
        aria-hidden="true"
        style={{ scaleY: reduced ? 1 : scaleY }}
        className="absolute bottom-2 left-[11px] top-2 w-px origin-top bg-gradient-to-b from-gold via-gold to-gold-deep md:left-[15px]"
      />
      {items.map((item, i) => (
        <motion.li
          key={`${item.title}-${i}`}
          className="relative"
          initial={reduced ? false : { opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            aria-hidden="true"
            className={cn(
              "absolute -left-10 top-1 flex size-6 items-center justify-center rounded-full border md:-left-14 md:size-8",
              dark ? "border-gold/60 bg-coal" : "border-gold-deep/60 bg-cream"
            )}
          >
            <span className="size-2 rounded-full bg-gold md:size-2.5" />
          </span>
          <div className={cn(item.image && "grid gap-5 md:grid-cols-[1fr_220px] md:items-start")}>
            <div>
              {item.label && (
                <p
                  className={cn(
                    "text-xs font-semibold uppercase tracking-[0.24em]",
                    dark ? "text-gold" : "text-gold-deep"
                  )}
                >
                  {item.label}
                </p>
              )}
              <h3 className={cn("mt-1 font-display text-2xl font-semibold", dark ? "text-cream" : "text-ink")}>
                {item.title}
              </h3>
              <div className={cn("mt-2 leading-relaxed", dark ? "text-cream/70" : "text-ink/70")}>
                {item.text}
              </div>
            </div>
            {item.image && (
              <SmartImage name={item.image} alt={item.title} className="aspect-[4/3] w-full rounded-2xl" />
            )}
          </div>
        </motion.li>
      ))}
    </ol>
  );
}

/** Horizontal numbered steps (vertical on mobile); the gold line draws when in view. */
export function HorizontalTimeline({ items, tone = "light", className }: TimelineProps) {
  const reduced = useReducedMotion();
  const dark = tone === "dark";

  return (
    <div className={cn("relative", className)}>
      <span
        aria-hidden="true"
        className={cn(
          "absolute left-0 right-0 top-7 hidden h-px md:block",
          dark ? "bg-coal-border" : "bg-ink/10"
        )}
      />
      <motion.span
        aria-hidden="true"
        initial={reduced ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-0 right-0 top-7 hidden h-px origin-left bg-gradient-to-r from-gold-deep via-gold to-gold-light md:block"
      />
      <ol className={cn("grid gap-8 md:gap-6", gridCols(items.length))}>
        {items.map((item, i) => (
          <motion.li
            key={`${item.title}-${i}`}
            className="relative flex gap-5 md:flex-col md:gap-0"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.15 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              className={cn(
                "relative z-10 flex size-14 shrink-0 items-center justify-center rounded-full border font-display text-xl font-semibold",
                dark
                  ? "border-gold/50 bg-coal text-gold"
                  : "border-gold-deep/50 bg-cream text-gold-deep shadow-[0_0_0_6px] shadow-sand"
              )}
            >
              {item.label ?? String(i + 1).padStart(2, "0")}
            </span>
            <div className="md:mt-6 md:pr-4">
              <h3 className={cn("font-display text-2xl font-semibold", dark ? "text-cream" : "text-ink")}>
                {item.title}
              </h3>
              <div className={cn("mt-2 text-[15px] leading-relaxed", dark ? "text-cream/70" : "text-ink/70")}>
                {item.text}
              </div>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

function gridCols(n: number) {
  if (n <= 3) return "md:grid-cols-3";
  if (n === 4) return "md:grid-cols-4";
  if (n === 5) return "md:grid-cols-5";
  return "md:grid-cols-3 lg:grid-cols-6";
}
