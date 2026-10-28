import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
  /** "light" = cream/sand section, "dark" = black section. */
  tone?: "light" | "dark";
  className?: string;
  as?: "h1" | "h2" | "h3";
}

/** Small gold dune line drawn under section titles. */
export function DuneUnderline({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 12" aria-hidden="true" className={cn("h-3 w-28", className)}>
      <motion.path
        d="M2 8 C 22 2, 38 2, 60 7 S 98 12, 118 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      />
    </svg>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  tone = "light",
  className,
  as: Tag = "h2",
}: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <Reveal
      className={cn(
        "flex flex-col",
        align === "center" ? "mx-auto items-center text-center" : "items-start text-left",
        "max-w-3xl",
        className
      )}
    >
      <p
        className={cn(
          "text-xs font-semibold uppercase tracking-[0.32em]",
          dark ? "text-gold" : "text-gold-deep"
        )}
      >
        {eyebrow}
      </p>
      <Tag
        className={cn(
          "mt-3 text-balance font-display text-4xl font-semibold leading-[1.08] md:text-5xl",
          dark ? "text-cream" : "text-ink"
        )}
      >
        {title}
      </Tag>
      <DuneUnderline className={cn("mt-4", dark ? "text-gold" : "text-gold-deep")} />
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-pretty text-base leading-relaxed md:text-lg",
            dark ? "text-cream/70" : "text-ink/70"
          )}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
