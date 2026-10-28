import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { CircleCheck, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { DuneWave } from "@/components/DuneWave";
import { Logo } from "@/components/Logo";
import { Socials } from "@/components/Socials";
import { GoldButton, OutlineButton } from "@/components/ui-premium/Buttons";
import { DuneUnderline } from "@/components/ui-premium/SectionHeading";
import { GoldRing } from "@/components/ui-premium/GoldRing";
import { site, telLink, whatsappLink } from "@/config/site";

const offerLinks = [
  { label: "Programmes Omra", to: "/omra" },
  { label: "Hajj", to: "/hajj" },
  { label: "Voyages internationaux", to: "/voyages" },
  { label: "Circuits au Maroc", to: "/voyages" },
  { label: "Réservation d'hôtels", to: "/hotels" },
] as const;

const usefulLinks = [
  { label: "Nos agences", to: "/agences" },
  { label: "À propos", to: "/a-propos" },
  { label: "Contact", to: "/contact" },
  { label: "Demander un devis", to: "/contact" },
] as const;

function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  // Static: nothing is sent, the visitor simply sees a confirmation.
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setError("Merci d'indiquer une adresse e-mail valide.");
      return;
    }
    setError("");
    setDone(true);
  };

  return (
    <div className="mt-6">
      <AnimatePresence mode="wait" initial={false}>
        {done ? (
          <motion.p
            key="done"
            role="status"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-2 rounded-xl border border-gold/30 bg-gold/10 p-3 text-sm text-cream/85"
          >
            <CircleCheck className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
            Merci ! Vous recevrez nos prochaines offres.
          </motion.p>
        ) : (
          <motion.form key="form" onSubmit={onSubmit} noValidate exit={{ opacity: 0 }}>
            <label htmlFor="newsletter-email" className="text-sm font-medium text-cream/85">
              Recevez nos offres Omra &amp; voyages
            </label>
            <div className="mt-2 flex rounded-full border border-coal-border bg-coal/60 p-1 focus-within:border-gold">
              <input
                id="newsletter-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre e-mail"
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? "newsletter-error" : undefined}
                className="min-w-0 flex-1 bg-transparent px-4 text-sm text-cream outline-none placeholder:text-cream/40"
              />
              <button
                type="submit"
                aria-label="S'inscrire à la newsletter"
                className="btn-shine inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-coal transition-colors hover:bg-gold-light"
              >
                <Send className="size-4" aria-hidden="true" />
              </button>
            </div>
            {error && (
              <p id="newsletter-error" className="mt-1.5 text-xs text-red-300">
                {error}
              </p>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative isolate bg-coal text-cream">
      {/* Dune wave rising over the last section */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -translate-y-[calc(100%-1px)] text-coal">
        <DuneWave />
      </div>
      <div className="pattern-geo pointer-events-none absolute inset-0 -z-10 opacity-[0.035]" />

      {/* CTA band */}
      <div className="relative overflow-hidden border-b border-coal-border">
        <GoldRing className="absolute -right-24 -top-28 -z-10 size-[380px] opacity-20" />
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-4 py-16 md:flex-row md:items-center md:justify-between md:px-8">
          <div>
            <h2 className="text-balance font-display text-4xl font-semibold md:text-5xl">
              Prêt pour votre prochain voyage ?
            </h2>
            <DuneUnderline className="mt-3 text-gold" />
            <p className="mt-3 max-w-xl text-cream/65">
              Nos conseillers vous répondent sur WhatsApp ou par téléphone.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <GoldButton href={whatsappLink()} icon={MessageCircle} size="lg" arrow>
              WhatsApp
            </GoldButton>
            <OutlineButton href={telLink(site.phone)} icon={Phone} size="lg">
              Appeler
            </OutlineButton>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.25fr_0.8fr_0.8fr_1.3fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/65">
              {site.specialty}. Omra, Hajj, voyages internationaux, circuits au Maroc et hôtels, au départ
              de Tanger et Tétouan.
            </p>
            <Socials className="mt-6" />
            <Newsletter />
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">Nos offres</h3>
            <ul className="mt-5 space-y-3">
              {offerLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm text-cream/70 transition-colors hover:text-gold">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">Liens utiles</h3>
            <ul className="mt-5 space-y-3">
              {usefulLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm text-cream/70 transition-colors hover:text-gold">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href={`mailto:${site.email}`} className="flex items-center gap-2 text-sm text-cream/70 transition-colors hover:text-gold">
                  <Mail className="size-3.5 text-gold" aria-hidden="true" />
                  {site.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">Nos 4 agences</h3>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {site.branches.map((branch) => (
                <li key={branch.id} className="rounded-2xl border border-coal-border bg-night/70 p-4">
                  <p className="font-display text-lg font-semibold text-cream">{branch.label}</p>
                  <p className="mt-1.5 flex items-start gap-1.5 text-xs text-cream/60">
                    <MapPin className="mt-0.5 size-3.5 shrink-0 text-gold" aria-hidden="true" />
                    {branch.address}
                  </p>
                  <a
                    href={telLink(branch.phone)}
                    className="mt-1 flex items-center gap-1.5 text-xs text-cream/60 transition-colors hover:text-gold"
                  >
                    <Phone className="size-3.5 shrink-0 text-gold" aria-hidden="true" />
                    {branch.phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-coal-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-cream/55 md:flex-row md:px-8">
          <p>© 2026 {site.name}. Tous droits réservés.</p>
          <p>
            Site réalisé par <span className="font-semibold text-gold">IZEMX</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
