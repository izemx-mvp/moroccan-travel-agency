import { Clock, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import { buttonClass, ButtonContent } from "@/components/ui-premium/Buttons";
import { mapsLink, telLink, whatsappLink, type Branch } from "@/config/site";
import { cn } from "@/lib/utils";

interface AgencyCardProps {
  branch: Branch;
  className?: string;
  /** "full" adds a photo placeholder, hours and a map placeholder (agencies page). */
  variant?: "compact" | "full";
}

export function AgencyCard({ branch, className, variant = "compact" }: AgencyCardProps) {
  const full = variant === "full";
  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-card transition-all duration-500 hover:-translate-y-1 hover:border-gold-deep/50 hover:shadow-[0_24px_60px_-30px] hover:shadow-gold-deep/50",
        className
      )}
    >
      {full && (
        <div className="img-fallback relative flex aspect-[16/9] items-end p-4">
          <span className="rounded-full bg-coal/60 px-3 py-1 text-[11px] font-medium text-cream/85">
            Photo de l'agence à ajouter
          </span>
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-deep">{branch.city}</p>
        <h3 className="mt-1 font-display text-2xl font-semibold text-ink">{full ? branch.name : branch.label}</h3>
        <ul className="mt-4 space-y-2.5 text-sm text-ink/75">
          <li className="flex items-start gap-2.5">
            <MapPin className="mt-0.5 size-4 shrink-0 text-gold-deep" aria-hidden="true" />
            {branch.address}
          </li>
          <li>
            <a href={telLink(branch.phone)} className="flex items-center gap-2.5 transition-colors hover:text-gold-deep">
              <Phone className="size-4 shrink-0 text-gold-deep" aria-hidden="true" />
              {branch.phone}
            </a>
          </li>
          {full && (
            <li className="flex items-center gap-2.5">
              <Clock className="size-4 shrink-0 text-gold-deep" aria-hidden="true" />
              {branch.hours}
            </li>
          )}
        </ul>

        {full && (
          <div className="mt-5 flex aspect-[16/7] items-center justify-center rounded-xl border border-dashed border-gold-deep/40 bg-sand text-center text-xs font-medium text-ink/60">
            <span className="flex items-center gap-2">
              <MapPin className="size-4 text-gold-deep" aria-hidden="true" />
              Carte Google Maps à intégrer
            </span>
          </div>
        )}

        <div className="mt-auto flex flex-wrap gap-2 pt-6">
          <a
            href={whatsappLink(`Bonjour, je souhaite contacter l'${branch.name}.`, branch.whatsappNumber)}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass("gold", "sm")}
          >
            <ButtonContent icon={MessageCircle}>WhatsApp</ButtonContent>
          </a>
          <a
            href={mapsLink(branch)}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass("outline-light", "sm")}
          >
            <ButtonContent icon={Navigation}>Itinéraire</ButtonContent>
          </a>
        </div>
      </div>
    </article>
  );
}
