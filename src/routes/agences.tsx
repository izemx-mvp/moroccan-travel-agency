import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Building2, Camera, MessageCircle, Phone } from "lucide-react";
import { AgencyCard } from "@/components/AgencyCard";
import { GoldButton, OutlineButton } from "@/components/ui-premium/Buttons";
import { CTABand } from "@/components/ui-premium/CTABand";
import { PageHero } from "@/components/ui-premium/PageHero";
import { site, telLink, whatsappLink, type BranchCity } from "@/config/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/agences")({
  head: () => ({
    meta: [
      { title: "Nos agences — Morocco Travel Agency" },
      {
        name: "description",
        content:
          "4 agences à Tanger et Tétouan : passez nous voir pour préparer votre Omra, Hajj, voyage ou séjour hôtelier.",
      },
      { property: "og:title", content: "Nos agences — Morocco Travel Agency" },
      {
        property: "og:description",
        content: "4 agences à Tanger et Tétouan pour préparer votre voyage.",
      },
    ],
  }),
  component: AgencesPage,
});

type CityFilter = "Toutes" | BranchCity;
const filters: CityFilter[] = ["Toutes", "Tanger", "Tétouan"];

/** Placeholder shown until the agency sends real photos of each branch. */
function AgencyPhotoPlaceholder({ city, index }: { city: string; index: number }) {
  return (
    <div className="group relative aspect-[16/9] overflow-hidden rounded-t-2xl bg-gradient-to-br from-coal via-night to-coal">
      {/* subtle geometric pattern */}
      <div className="pattern-geo pointer-events-none absolute inset-0 opacity-[0.06]" />
      {/* warm gold glow */}
      <div className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-gold/15 blur-3xl transition-opacity duration-700 group-hover:opacity-80" />
      <div className="pointer-events-none absolute -bottom-20 -left-10 size-56 rounded-full bg-gold-deep/10 blur-3xl" />

      {/* city badge */}
      <span className="absolute left-4 top-4 rounded-full border border-gold/30 bg-coal/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold backdrop-blur-sm">
        {city} · Agence {String(index + 1).padStart(2, "0")}
      </span>

      {/* center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
        <span className="relative inline-flex size-16 items-center justify-center rounded-full border border-gold/40 text-gold">
          <span className="absolute inset-[-8px] rounded-full border border-gold/15" />
          <Building2 className="size-7" strokeWidth={1.5} aria-hidden="true" />
        </span>
        <p className="font-display text-xl font-semibold text-cream">Photo de l'agence à venir</p>
        <p className="inline-flex items-center gap-1.5 text-xs text-cream/55">
          <Camera className="size-3.5" aria-hidden="true" />
          Façade et espace d'accueil
        </p>
      </div>

      {/* bottom fade into the card */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-coal/60 to-transparent" />
    </div>
  );
}

function AgencesPage() {
  const [city, setCity] = useState<CityFilter>("Toutes");
  const shown = site.branches.filter((b) => city === "Toutes" || b.city === city);

  return (
    <>
      <PageHero
        image="cta-band-bg"
        imageAlt=""
        eyebrow="Nos agences"
        title="4 agences à Tanger et Tétouan"
        subtitle="Nos conseillers vous reçoivent pour préparer votre Omra, votre Hajj ou votre prochain voyage."
        breadcrumb={[{ label: "Accueil", to: "/" }, { label: "Nos agences" }]}
      >
        <GoldButton href={whatsappLink()} icon={MessageCircle} size="lg">
          Écrire sur WhatsApp
        </GoldButton>
        <OutlineButton href={telLink(site.phone)} icon={Phone} size="lg">
          Appeler
        </OutlineButton>
      </PageHero>

      <section className="bg-background py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="flex justify-center">
            <div className="flex gap-1 rounded-full border border-ink/10 bg-cream p-1.5" role="group" aria-label="Filtrer par ville">
              {filters.map((f) => (
                <button
                  key={f}
                  type="button"
                  aria-pressed={city === f}
                  onClick={() => setCity(f)}
                  className={cn(
                    "relative rounded-full px-6 py-2.5 text-sm font-semibold transition-colors",
                    city === f ? "text-coal" : "text-ink/70 hover:text-ink"
                  )}
                >
                  {city === f && (
                    <motion.span
                      layoutId="city-pill"
                      className="absolute inset-0 rounded-full bg-primary"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{f}</span>
                </button>
              ))}
            </div>
          </div>

          <motion.div layout className="mt-12 grid gap-6 md:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {shown.map((b) => {
                const cityIndex = site.branches.filter((x) => x.city === b.city).findIndex((x) => x.id === b.id);
                return (
                  <motion.div
                    key={b.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="flex h-full flex-col overflow-hidden rounded-2xl shadow-[0_30px_60px_-40px] shadow-ink/40 transition-transform duration-500 hover:-translate-y-1"
                  >
                    <AgencyPhotoPlaceholder city={b.city} index={cityIndex} />
                    {/* Hides AgencyCard's own image block (its first child) — the placeholder above replaces it */}
                    <div className="flex-1 [&>*]:h-full [&>*]:rounded-t-none [&>*]:border-t-0 [&>*>*:first-child]:hidden">

                      <AgencyCard branch={b} variant="full" />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <CTABand
        eyebrow="Rendez-vous"
        title="Venez nous rencontrer"
        text="Vos questions, votre projet : nos équipes vous accueillent dans nos 4 agences de Tanger et Tétouan."
        waveTopClassName="text-background"
      />
    </>
  );
}