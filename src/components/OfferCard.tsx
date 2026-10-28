import { Link } from "@tanstack/react-router";
import { CalendarDays, Check, Clock, MapPin, MessageCircle } from "lucide-react";
import { whatsappLink } from "@/config/site";
import { buttonClass, ButtonContent } from "@/components/ui-premium/Buttons";
import { SmartImage } from "@/components/ui-premium/SmartImage";
import { formatPrice, type Offer } from "@/data/offers";
import { cn } from "@/lib/utils";

interface OfferCardProps {
  offer: Offer;
  className?: string;
  /** "dark" for black sections, "light" for cream/sand sections. */
  tone?: "light" | "dark";
}

/** Premium Omra card: photo with zoom, badges, key facts, price placeholder, CTAs. */
export function OfferCard({ offer, className, tone = "light" }: OfferCardProps) {
  const dark = tone === "dark";
  const message = `Bonjour, je souhaite avoir plus d'informations sur l'offre « ${offer.title} ».`;

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border transition-all duration-500 hover:-translate-y-1.5",
        dark
          ? "border-coal-border bg-night hover:border-gold/60 hover:shadow-[0_24px_60px_-24px] hover:shadow-gold/35"
          : "border-ink/10 bg-card hover:border-gold-deep/50 hover:shadow-[0_24px_60px_-28px] hover:shadow-gold-deep/50",
        offer.recommended && (dark ? "border-gold/40" : "border-gold-deep/40"),
        className
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <SmartImage
          name={offer.image}
          alt={offer.title}
          className="absolute inset-0"
          imgClassName="transition-transform duration-[1.2s] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-coal/80 via-coal/10 to-transparent" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {offer.badges.map((badge) => (
            <span
              key={badge}
              className="rounded-full bg-coal/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-gold"
            >
              {badge}
            </span>
          ))}
          {offer.placesLimited && (
            <span className="rounded-full bg-primary px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-coal">
              Places limitées
            </span>
          )}
        </div>
        <p className="absolute bottom-4 left-4 right-4 flex items-center gap-1.5 text-xs font-medium text-cream/85">
          <MapPin className="size-3.5 text-gold" aria-hidden="true" />
          {offer.distanceToHaram}
        </p>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className={cn("font-display text-2xl font-semibold", dark ? "text-cream" : "text-ink")}>
          <Link
            to="/omra/$slug"
            params={{ slug: offer.slug }}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {offer.title}
          </Link>
        </h3>
        <p className={cn("mt-1 text-sm", dark ? "text-cream/60" : "text-ink/60")}>{offer.tagline}</p>

        <div className={cn("mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-xs", dark ? "text-cream/70" : "text-ink/70")}>
          <span className="flex items-center gap-1.5">
            <Clock className={cn("size-3.5", dark ? "text-gold" : "text-gold-deep")} aria-hidden="true" />
            {offer.duration}
          </span>
          <span className="flex items-center gap-1.5">
            <CalendarDays className={cn("size-3.5", dark ? "text-gold" : "text-gold-deep")} aria-hidden="true" />
            {offer.departures[0] ?? "Dates à confirmer"}
          </span>
        </div>

        <ul className="mt-5 space-y-2">
          {offer.inclusions.slice(0, 3).map((item) => (
            <li key={item} className={cn("flex items-start gap-2 text-sm", dark ? "text-cream/75" : "text-ink/75")}>
              <Check className={cn("mt-0.5 size-4 shrink-0", dark ? "text-gold" : "text-gold-deep")} aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>

        <div className={cn("mt-auto flex items-end justify-between gap-4 border-t pt-5", dark ? "border-coal-border" : "border-ink/10")}>
          <p className={cn("text-xs", dark ? "text-cream/60" : "text-ink/60")}>
            À partir de
            <span className={cn("block font-display text-3xl font-semibold", dark ? "text-gold" : "text-gold-deep")}>
              {formatPrice(offer.priceFrom)} {offer.priceFrom == null && <span className="text-base">MAD</span>}
            </span>
          </p>
        </div>

        {/* Raised above the stretched title link so both CTAs stay clickable. */}
        <div className="relative z-10 mt-5 flex items-center gap-2">
          <Link
            to="/omra/$slug"
            params={{ slug: offer.slug }}
            className={buttonClass("gold", "md", "flex-1")}
          >
            <ButtonContent arrow>Voir le programme</ButtonContent>
          </Link>
          <a
            href={whatsappLink(message)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Demander « ${offer.title} » sur WhatsApp`}
            className={cn(
              "inline-flex size-12 shrink-0 items-center justify-center rounded-full border transition-colors",
              dark
                ? "border-gold/40 text-gold hover:bg-gold/10"
                : "border-gold-deep/40 text-gold-deep hover:bg-gold/10"
            )}
          >
            <MessageCircle className="size-5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}
