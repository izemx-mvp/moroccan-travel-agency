import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { DuneWave } from "@/components/DuneWave";
import { Reveal } from "@/components/Reveal";
import type { ImageName } from "@/config/images";
import { cn } from "@/lib/utils";
import { GoldRing } from "./GoldRing";
import { SmartImage } from "./SmartImage";
import { StatCounter, type Stat } from "./StatCounter";
import { WordReveal } from "./WordReveal";

export interface Crumb {
  label: string;
  to?: string;
}

interface PageHeroProps {
  image: ImageName;
  imageAlt?: string;
  eyebrow: string;
  title: string;
  subtitle?: ReactNode;
  breadcrumb?: Crumb[];
  /** CTAs */
  children?: ReactNode;
  stats?: Stat[];
  /** Extra content under the CTAs (badges, key facts…). */
  footer?: ReactNode;
  /** "full" = full viewport height (home), "page" = inner pages. */
  size?: "full" | "page";
  /** Text color class of the next section, used for the dune wave. */
  waveClassName?: string;
  align?: "center" | "left";
}

/** Full-bleed image hero: dark gradient, breadcrumb, word-by-word title, CTAs, stats, dune wave. */
export function PageHero({
  image,
  imageAlt = "",
  eyebrow,
  title,
  subtitle,
  breadcrumb,
  children,
  stats,
  footer,
  size = "page",
  waveClassName = "text-background",
  align = "center",
}: PageHeroProps) {
  const centered = align === "center";
  return (
    <section
      className={cn(
        "relative isolate flex overflow-hidden bg-coal text-cream",
        size === "full" ? "min-h-[100svh] items-center" : "min-h-[78svh] items-end md:min-h-[72vh]"
      )}
    >
      <SmartImage
        name={image}
        alt={imageAlt}
        priority
        kenBurns
        showLabel={false}
        className="absolute inset-0 -z-20"
      />
      {/* Readability gradients */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-coal/80 via-coal/45 to-coal/90" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_60%_at_50%_100%,color-mix(in_oklab,var(--color-gold)_16%,transparent),transparent_70%)]" />
      <div className="pattern-geo pointer-events-none absolute inset-0 -z-10 opacity-[0.05]" />
      <GoldRing className="absolute -right-24 top-24 -z-10 size-[420px] opacity-25 md:-right-10 md:size-[560px]" />

      <div
        className={cn(
          "relative mx-auto w-full max-w-7xl px-4 pb-28 pt-36 md:px-8 md:pb-40",
          size === "full" && "md:pt-44",
          centered ? "text-center" : "text-left"
        )}
      >
        {breadcrumb && breadcrumb.length > 0 && (
          <nav aria-label="Fil d'Ariane" className={cn("mb-6 flex", centered && "justify-center")}>
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-cream/70">
              {breadcrumb.map((crumb, i) => (
                <li key={crumb.label} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRight className="size-3 text-gold/70" aria-hidden="true" />}
                  {crumb.to ? (
                    <Link to={crumb.to} className="transition-colors hover:text-gold">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-gold">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-gold">{eyebrow}</p>
        </Reveal>
        <WordReveal
          text={title}
          delay={0.15}
          className={cn(
            "mt-4 text-balance font-display text-[2.6rem] font-semibold leading-[1.04] text-cream sm:text-6xl md:text-7xl",
            centered ? "mx-auto max-w-4xl" : "max-w-3xl"
          )}
        />
        {subtitle && (
          <Reveal delay={0.35}>
            <p
              className={cn(
                "mt-6 text-pretty text-base leading-relaxed text-cream/75 md:text-lg",
                centered ? "mx-auto max-w-2xl" : "max-w-2xl"
              )}
            >
              {subtitle}
            </p>
          </Reveal>
        )}
        {children && (
          <Reveal delay={0.5}>
            <div className={cn("mt-9 flex flex-wrap items-center gap-3", centered && "justify-center")}>
              {children}
            </div>
          </Reveal>
        )}
        {footer && <Reveal delay={0.6}>{footer}</Reveal>}
        {stats && stats.length > 0 && (
          <Reveal delay={0.65}>
            <div
              className={cn(
                "mt-12 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-gold/20 pt-8 md:grid-cols-4",
                centered ? "mx-auto max-w-4xl" : "max-w-4xl"
              )}
            >
              {stats.map((s) => (
                <StatCounter key={s.label} {...s} className={centered ? "items-center" : ""} />
              ))}
            </div>
          </Reveal>
        )}
      </div>

      <div className={cn("pointer-events-none absolute inset-x-0 bottom-0 translate-y-px", waveClassName)}>
        <DuneWave />
      </div>
    </section>
  );
}
