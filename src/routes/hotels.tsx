import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, MapPin, MessageCircle, Star } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { buttonClass, ButtonContent, GoldButton } from "@/components/ui-premium/Buttons";
import { PageHero } from "@/components/ui-premium/PageHero";
import { SectionHeading } from "@/components/ui-premium/SectionHeading";
import { SectionWave } from "@/components/ui-premium/SectionWave";
import { SmartImage } from "@/components/ui-premium/SmartImage";
import { StaticLeadForm } from "@/components/ui-premium/StaticLeadForm";
import { HorizontalTimeline } from "@/components/ui-premium/Timeline";
import type { ImageName } from "@/config/images";
import { whatsappLink } from "@/config/site";
import { SAMPLE_LABEL } from "@/data/content";

export const Route = createFileRoute("/hotels")({
  head: () => ({
    meta: [
      { title: "Hôtels — Morocco Travel Agency" },
      {
        name: "description",
        content:
          "Réservation d'hôtels à La Mecque, Médine, en Europe et au Maroc. Demandez votre tarif à Morocco Travel Agency.",
      },
      { property: "og:title", content: "Hôtels — Morocco Travel Agency" },
      {
        property: "og:description",
        content: "Réservation d'hôtels à La Mecque, Médine, en Europe et au Maroc.",
      },
    ],
  }),
  component: HotelsPage,
});

const categories: { title: string; text: string; image: ImageName }[] = [
  { title: "La Mecque", text: "Au plus près du Haram", image: "hotel-makkah" },
  { title: "Médine", text: "Près de la Mosquée du Prophète", image: "hotel-madinah" },
  { title: "Europe", text: "Capitales et escapades", image: "hotel-europe" },
  { title: "Maroc", text: "Riads, resorts et hôtels de ville", image: "hotel-maroc" },
];

/** CONTENU EXEMPLE À REMPLACER — featured hotels until the real selection is provided. */
const featured: { name: string; location: string; image: ImageName }[] = [
  { name: "Hôtel à La Mecque — nom à compléter", location: "La Mecque — emplacement à confirmer", image: "hotel-makkah" },
  { name: "Hôtel à Médine — nom à compléter", location: "Médine — emplacement à confirmer", image: "hotel-madinah" },
  { name: "Hôtel en Europe — nom à compléter", location: "Europe — emplacement à confirmer", image: "hotel-europe" },
  { name: "Hôtel au Maroc — nom à compléter", location: "Maroc — emplacement à confirmer", image: "hotel-maroc" },
];

const bookingSteps = [
  { title: "Votre demande", text: "Destination, dates, nombre de chambres et de voyageurs." },
  { title: "Nos propositions", text: "Une sélection d'hôtels adaptée à votre budget." },
  { title: "Confirmation", text: "Réservation confirmée et suivi jusqu'à votre séjour." },
];

function HotelsPage() {
  return (
    <>
      <PageHero
        image="hero-hotels"
        imageAlt="Hall d'un hôtel"
        eyebrow="Hôtels"
        title="Des séjours choisis avec soin"
        subtitle="Nous réservons vos hôtels à La Mecque, Médine, en Europe et au Maroc, au meilleur emplacement pour votre voyage."
        breadcrumb={[{ label: "Accueil", to: "/" }, { label: "Hôtels" }]}
      >
        <GoldButton href="#demande-hotel" size="lg" arrow>
          Demander un tarif
        </GoldButton>
      </PageHero>

      {/* Categories */}
      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <SectionHeading eyebrow="Nos destinations" title="Où souhaitez-vous séjourner ?" />
          <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((c) => (
              <StaggerItem key={c.title}>
                <a href="#demande-hotel" className="group relative block aspect-[3/4] overflow-hidden rounded-2xl">
                  <SmartImage
                    name={c.image}
                    alt={c.title}
                    className="absolute inset-0"
                    imgClassName="transition-transform duration-[1.2s] group-hover:scale-110"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-coal/90 via-coal/20 to-transparent" />
                  <span className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-transparent transition-all duration-500 group-hover:ring-gold/70" />
                  <span className="absolute inset-x-0 bottom-0 p-6">
                    <span className="flex items-center justify-between font-display text-3xl font-semibold text-cream">
                      {c.title}
                      <ArrowUpRight className="size-5 text-gold transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                    <span className="mt-1 block text-sm text-cream/70">{c.text}</span>
                  </span>
                </a>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Featured */}
      <section className="bg-sand py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <SectionHeading
            eyebrow="Sélection"
            title="Hôtels à la une"
            subtitle={<span className="text-xs font-semibold uppercase tracking-[0.2em]">{SAMPLE_LABEL}</span>}
          />
          <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((h) => (
              <StaggerItem key={h.name}>
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-cream transition-all duration-500 hover:-translate-y-1.5 hover:border-gold-deep/50 hover:shadow-[0_24px_60px_-28px] hover:shadow-gold-deep/50">
                  <SmartImage
                    name={h.image}
                    alt={h.name}
                    className="aspect-[4/3] w-full"
                    imgClassName="transition-transform duration-[1.2s] group-hover:scale-110"
                  />
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex gap-0.5" aria-label="Catégorie à confirmer">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star key={i} className="size-3.5 text-gold-deep/40" aria-hidden="true" />
                      ))}
                    </div>
                    <h3 className="mt-3 font-display text-xl font-semibold text-ink">{h.name}</h3>
                    <p className="mt-1.5 flex items-start gap-1.5 text-sm text-ink/70">
                      <MapPin className="mt-0.5 size-4 shrink-0 text-gold-deep" aria-hidden="true" />
                      {h.location}
                    </p>
                    <a
                      href={whatsappLink(`Bonjour, je souhaite un tarif pour : ${h.name}.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={buttonClass("outline-light", "sm", "mt-auto self-start")}
                    >
                      <ButtonContent icon={MessageCircle}>Demander un tarif</ButtonContent>
                    </a>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <SectionHeading eyebrow="Simple et rapide" title="Comment réserver votre hôtel" />
          <HorizontalTimeline className="mt-16" items={bookingSteps} />
        </div>
      </section>

      {/* Form */}
      <SectionWave from="bg-background" to="text-coal" />
      <section id="demande-hotel" className="relative scroll-mt-24 overflow-hidden bg-coal pb-24 pt-12 text-cream md:pb-32">
        <div className="pattern-geo pointer-events-none absolute inset-0 opacity-[0.04]" />
        <div className="relative mx-auto max-w-4xl px-4 md:px-8">
          <SectionHeading tone="dark" eyebrow="Réservation" title="Demandez votre tarif hôtel" />
          <Reveal className="mt-12">
            <StaticLeadForm
              tone="dark"
              title="Votre séjour"
              subtitle="Nous revenons vers vous avec une sélection d'hôtels."
              fields={["name", "phone", "destination", "arrival", "departure", "rooms", "travellers", "message"]}
              submitLabel="Demander un tarif"
              context="je souhaite un tarif pour une réservation d'hôtel."
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
