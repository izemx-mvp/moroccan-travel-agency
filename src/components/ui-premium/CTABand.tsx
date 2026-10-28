import type { ReactNode } from "react";
import { MessageCircle, Phone } from "lucide-react";
import { DuneWave } from "@/components/DuneWave";
import { Reveal } from "@/components/Reveal";
import type { ImageName } from "@/config/images";
import { site, telLink, whatsappLink } from "@/config/site";
import { cn } from "@/lib/utils";
import { GoldButton, OutlineButton } from "./Buttons";
import { DuneUnderline } from "./SectionHeading";
import { GoldRing } from "./GoldRing";
import { SmartImage } from "./SmartImage";

interface CTABandProps {
  eyebrow?: string;
  title: string;
  text?: ReactNode;
  image?: ImageName;
  /** Custom CTAs; defaults to WhatsApp + call. */
  actions?: ReactNode;
  whatsappMessage?: string;
  /** Optional form displayed next to the text (side by side on desktop). */
  aside?: ReactNode;
  /** Text color class of the section above, for the top dune wave. */
  waveTopClassName?: string;
  /** Text color class of the section below, for the bottom dune wave. */
  waveBottomClassName?: string;
  id?: string;
}

/** Dark image band with a call to action, closed by dune waves. */
export function CTABand({
  eyebrow = "Parlons de votre projet",
  title,
  text,
  image = "cta-band-bg",
  actions,
  whatsappMessage,
  aside,
  waveTopClassName,
  waveBottomClassName,
  id,
}: CTABandProps) {
  return (
    <section id={id} className="relative isolate overflow-hidden bg-coal text-cream">
      <SmartImage name={image} alt="" showLabel={false} className="absolute inset-0 -z-20" kenBurns />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-coal/95 via-coal/80 to-coal/60" />
      <div className="pattern-geo pointer-events-none absolute inset-0 -z-10 opacity-[0.05]" />
      <GoldRing className="absolute -left-32 -top-32 -z-10 size-[420px] opacity-25" />

      {waveTopClassName && (
        <div className={cn("pointer-events-none absolute inset-x-0 top-0 -translate-y-px", waveTopClassName)}>
          <DuneWave upsideDown flip />
        </div>
      )}

      <div
        className={cn(
          "mx-auto grid max-w-7xl gap-12 px-4 py-28 md:px-8 md:py-36",
          aside && "lg:grid-cols-[1fr_1.05fr] lg:items-center"
        )}
      >
        <Reveal className={cn(!aside && "mx-auto max-w-3xl text-center")}>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-gold">{eyebrow}</p>
          <h2 className="mt-3 text-balance font-display text-4xl font-semibold leading-[1.06] md:text-6xl">
            {title}
          </h2>
          <DuneUnderline className={cn("mt-5 text-gold", !aside && "mx-auto")} />
          {text && <p className="mt-5 text-pretty text-base leading-relaxed text-cream/75 md:text-lg">{text}</p>}
          <div className={cn("mt-9 flex flex-wrap gap-3", !aside && "justify-center")}>
            {actions ?? (
              <>
                <GoldButton href={whatsappLink(whatsappMessage)} icon={MessageCircle} size="lg" arrow>
                  Écrire sur WhatsApp
                </GoldButton>
                <OutlineButton href={telLink(site.phone)} icon={Phone} size="lg">
                  Appeler l'agence
                </OutlineButton>
              </>
            )}
          </div>
        </Reveal>
        {aside && <Reveal delay={0.15}>{aside}</Reveal>}
      </div>

      {waveBottomClassName && (
        <div className={cn("pointer-events-none absolute inset-x-0 bottom-0 translate-y-px", waveBottomClassName)}>
          <DuneWave />
        </div>
      )}
    </section>
  );
}
