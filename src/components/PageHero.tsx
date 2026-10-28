import type { ReactNode } from "react";
import { DuneWave } from "@/components/DuneWave";
import { Reveal } from "@/components/Reveal";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
}

/** Shared dark hero for inner pages, closed by the dune-wave divider. */
export function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <section className="hero-glow relative overflow-hidden bg-coal pb-16 pt-32 md:pb-24 md:pt-40">
      <div className="relative mx-auto max-w-7xl px-4 text-center md:px-8">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">{eyebrow}</p>
          <h1 className="mx-auto mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight text-cream md:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-cream/65 md:text-lg">
              {description}
            </p>
          )}
          {children && <div className="mt-8 flex flex-wrap items-center justify-center gap-3">{children}</div>}
        </Reveal>
      </div>
      <div className="absolute inset-x-0 bottom-0 translate-y-px">
        <DuneWave className="text-background" />
      </div>
    </section>
  );
}
