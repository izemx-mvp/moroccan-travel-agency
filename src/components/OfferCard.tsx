import { Link } from "@tanstack/react-router";
import { CalendarDays, Check } from "lucide-react";
import { categoryLabels, type Offer } from "@/data/offers";
import { whatsappLink } from "@/config/site";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { cn } from "@/lib/utils";

interface OfferCardProps {
  offer: Offer;
  className?: string;
}

/** Offer card: gradient image placeholder, badge, duration, placeholder price, WhatsApp CTA. */
export function OfferCard({ offer, className }: OfferCardProps) {
  const detailPath =
    offer.category === "omra" ? `/omra/${offer.slug}` : undefined;
  const priceLabel =
    offer.priceFrom != null
      ? `${offer.priceFrom.toLocaleString("fr-MA")} MAD`
      : "—";

  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg",
        className
      )}
    >
      {/* Gradient image placeholder — replace with real photos later. */}
      <div className="img-placeholder relative aspect-[4/3] w-full overflow-hidden">
        <div className="absolute inset-0 flex items-end p-4">
          <span className="rounded-full bg-coal/70 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold backdrop-blur-sm">
            {categoryLabels[offer.category]}
          </span>
        </div>
        <svg
          viewBox="0 0 400 120"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="absolute bottom-0 h-16 w-full text-coal/50"
        >
          <path
            fill="currentColor"
            d="M0,80 C120,40 220,70 300,55 C340,48 380,30 400,40 L400,120 L0,120 Z"
          />
        </svg>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl font-semibold text-foreground">
          {detailPath ? (
            <Link to={detailPath} className="transition-colors hover:text-gold-deep">
              {offer.title}
            </Link>
          ) : (
            offer.title
          )}
        </h3>
        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
          <CalendarDays className="size-4 text-gold-deep" />
          {offer.duration}
        </p>

        <ul className="mt-4 space-y-1.5">
          {offer.inclusions.slice(0, 3).map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
              <Check className="mt-0.5 size-3.5 shrink-0 text-gold-deep" />
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-5">
          <p className="text-sm text-muted-foreground">
            À partir de{" "}
            <span className="font-display text-xl font-semibold text-gold-deep">
              {priceLabel}
            </span>
          </p>
          <WhatsAppButton
            message={`Bonjour, je souhaite avoir plus d'informations sur l'offre « ${offer.title} ».`}
            label="Demander un devis"
            className="mt-3 w-full"
          />
        </div>
      </div>
    </article>
  );
}
