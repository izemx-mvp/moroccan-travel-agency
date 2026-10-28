import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { OfferCard } from "@/components/OfferCard";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { getOffersByCategory } from "@/data/offers";

export const Route = createFileRoute("/omra")({
  head: () => ({
    meta: [
      { title: "Omra — Morocco Travel Agency" },
      {
        name: "description",
        content:
          "Programmes Omra au départ de Tanger et Tétouan : vols, hôtels proches des lieux saints, transferts et accompagnement dédié.",
      },
      { property: "og:title", content: "Omra — Morocco Travel Agency" },
      {
        property: "og:description",
        content:
          "Programmes Omra au départ de Tanger et Tétouan : vols, hôtels, transferts et accompagnement dédié.",
      },
    ],
  }),
  component: OmraPage,
});

function OmraPage() {
  const omraOffers = getOffersByCategory("omra");

  return (
    <>
      <PageHero
        eyebrow="Omra"
        title="Votre Omra, organisée dans les moindres détails"
        description="Des programmes pensés pour que vous ne pensiez qu'à l'essentiel : vol, hébergement, transferts et accompagnement sur place. Contenus placeholder — à compléter."
      >
        <WhatsAppButton message="Bonjour, je souhaite des informations sur vos programmes Omra." />
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {omraOffers.map((offer, i) => (
            <Reveal key={offer.slug} delay={i * 0.06} className="h-full">
              <OfferCard offer={offer} className="h-full" />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-secondary/60">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold text-foreground md:text-4xl">
              Comment se déroule votre Omra
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Section placeholder : décrivez ici les étapes du parcours (préparation, départ,
              séjour, retour) avec vos vrais contenus.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
