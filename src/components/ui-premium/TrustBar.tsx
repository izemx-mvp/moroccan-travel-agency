import { trustItems } from "@/data/content";
import { cn } from "@/lib/utils";
import { Marquee } from "./Marquee";

/** Scrolling band of reassurance points. */
export function TrustBar({ className }: { className?: string }) {
  return (
    <section aria-label="Nos engagements" className={cn("relative bg-coal py-6 text-cream", className)}>
      <Marquee duration={32} rowClassName="gap-12 pr-12">
        {trustItems.map(({ Icon, label }) => (
          <span key={label} className="flex items-center gap-3 whitespace-nowrap">
            <span className="inline-flex size-9 items-center justify-center rounded-full border border-gold/35 text-gold">
              <Icon className="size-4" strokeWidth={1.8} aria-hidden="true" />
            </span>
            <span className="font-display text-xl font-medium tracking-wide text-cream/90">{label}</span>
            <span aria-hidden="true" className="ml-9 size-1.5 rotate-45 bg-gold/60" />
          </span>
        ))}
      </Marquee>
    </section>
  );
}
