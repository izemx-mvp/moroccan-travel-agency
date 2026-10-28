import { createFileRoute } from "@tanstack/react-router";
import { Globe2, Map } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export const Route = createFileRoute("/voyages")({
  head: () => ({
    meta: [
      { title: "Voyages — Morocco Travel Agency" },
      {
        name: "description",
        content:
          "Voyages internationaux et circuits au Maroc organisés depuis Tanger et Tétouan : séjours, excursions et programmes sur mesure.",
      },
      { property: "og:title", content: "Voyages — Morocco Travel Agency" },
      {
        property: "og:description",
        content:
          "Voyages internationaux et circuits au Maroc organisés depuis Tanger et Tétouan.",
      },
    ],
  }),
  component: VoyagesPage,
});

function VoyagesPage() {
  return (
    <>
      <PageHero
        eyebrow="Voyages"
        title="Du Maroc au bout du monde"
        description="Destinations internationales et circuits au Royaume, en groupe ou sur mesure. Contenus placeholder — à compléter."
      >
        <WhatsAppButton message="Bonjour, je souhaite des informations sur vos voyages." />
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-border bg-card p-8">
              <span className="inline-flex size-12 items-center justify-center rounded-full bg-secondary text-gold-deep">
                <Globe2 className="size-6" strokeWidth={1.7} />
              </span>
              <h2 className="mt-4 font-display text-2xl font-semibold text-foreground">
                Voyages internationaux
              </h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Section placeholder : listez ici vos destinations internationales avec durées
                et points forts.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-2xl border border-border bg-card p-8">
              <span className="inline-flex size-12 items-center justify-center rounded-full bg-secondary text-gold-deep">
                <Map className="size-6" strokeWidth={1.7} />
              </span>
              <h2 className="mt-4 font-display text-2xl font-semibold text-foreground">
                Circuits au Maroc
              </h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Section placeholder : listez ici vos circuits marocains — villes impériales,
                désert, côtes — avec durées et points forts.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
