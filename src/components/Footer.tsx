import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/Logo";
import { site } from "@/config/site";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-2.31-2.83v-3.5a6.37 6.37 0 1 0 5.76 6.34V8.69a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.12z" />
    </svg>
  );
}

const pageLinks = [
  { label: "Omra", to: "/omra" },
  { label: "Hajj", to: "/hajj" },
  { label: "Voyages", to: "/voyages" },
  { label: "Hôtels", to: "/hotels" },
  { label: "Nos agences", to: "/agences" },
  { label: "À propos", to: "/a-propos" },
  { label: "Contact", to: "/contact" },
] as const;

const socials = [
  { label: "Instagram", to: site.socials.instagram, Icon: Instagram },
  { label: "Facebook", to: site.socials.facebook, Icon: Facebook },
  { label: "TikTok", to: site.socials.tiktok, Icon: null },
] as const;

export function Footer() {
  return (
    <footer className="bg-coal text-cream">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/60">
              Agence de voyage spécialiste Hajj &amp; Omra, voyages internationaux, circuits au
              Maroc et hôtels — placeholder descriptif.
            </p>
            <div className="mt-5 flex gap-3">
              {socials.map(({ label, to, Icon }) => (
                <a
                  key={label}
                  href={to}
                  target={to.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex size-9 items-center justify-center rounded-full border border-gold/25 text-cream/70 transition-colors hover:border-gold hover:text-gold"
                >
                  {Icon ? <Icon className="size-4" /> : <TikTokIcon className="size-4" />}
                </a>
              ))}
            </div>
          </div>

          {/* Pages */}
          <div>
            <h3 className="text-base font-semibold tracking-wide text-gold">Nos pages</h3>
            <ul className="mt-4 space-y-2.5">
              {pageLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-cream/70 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Branches */}
          <div className="md:col-span-2 lg:col-span-2">
            <h3 className="text-base font-semibold tracking-wide text-gold">Nos agences</h3>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2">
              {site.branches.map((branch) => (
                <li key={branch.name} className="rounded-2xl border border-coal-border bg-night/60 p-4">
                  <p className="font-display text-base font-semibold text-cream">{branch.city}</p>
                  <p className="mt-1 text-xs text-cream/60">{branch.name}</p>
                  <p className="mt-2 flex items-start gap-1.5 text-xs text-cream/60">
                    <MapPin className="mt-0.5 size-3.5 shrink-0 text-gold" />
                    {branch.address}
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-cream/60">
                    <Phone className="size-3.5 shrink-0 text-gold" />
                    {branch.phone}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-coal-border pt-6 text-center text-xs text-cream/50">
          © {new Date().getFullYear()} {site.name}. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
