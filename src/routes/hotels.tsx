import { createFileRoute } from "@tanstack/react-router";
import { Hotel } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export const Route = createFileRoute("/hotels")({
  head: () => ({
    meta: [
      { title: "Hôtels — Morocco Travel Agency" },
      {
        name: "description",
        content:
          "Réservation d'hôtels au Maroc et à l'international : séjours sélectionnés par nos équipes de Tanger et Tétouan.",
      },
      { property: "og:title", content: "Hôtels — Morocco Travel Agency" },
      {
        property: "og:description",
        content:
          "Réservation d'hôtels au Maroc et à l'international : séjours sélectionnés par nos équipes.",
      },
    ],
  }),
  component: HotelsPage,
});

function HotelsPage() {
  return (
    <>
      <PageHero
        eyebrow="Hôtels"
        title="Des séjours choisis avec soin"
        description="Hôtels au Maroc et à l'international, sélectionnés pour leur confort et leur situation. Contenus placeholder — à compléter."
      >
        <WhatsAppButton message="Bonjour, je souhaite des informations sur vos offres d'hôtels." />
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex size-14 items-center justify-center rounded-full bg-secondary text-gold-deep">
              <Hotel className="size-7" strokeWidth={1.6} />
            </span>
            <h2 className="mt-6 font-display text-3xl font-semibold text-foreground md:text-4xl">
              Notre sélection d'hôtels — bientôt en ligne
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Section placeholder : présentez ici vos hôtels partenaires avec villes, catégories
              et formules.
            </p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
