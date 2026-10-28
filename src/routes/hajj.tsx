import { createFileRoute } from "@tanstack/react-router";
import { Moon } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export const Route = createFileRoute("/hajj")({
  head: () => ({
    meta: [
      { title: "Hajj — Morocco Travel Agency" },
      {
        name: "description",
        content:
          "Programmes Hajj accompagnés depuis Tanger et Tétouan : encadrement complet, logistique soignée et assistance permanente.",
      },
      { property: "og:title", content: "Hajj — Morocco Travel Agency" },
      {
        property: "og:description",
        content:
          "Programmes Hajj accompagnés depuis Tanger et Tétouan : encadrement complet et assistance permanente.",
      },
    ],
  }),
  component: HajjPage,
});

function HajjPage() {
  return (
    <>
      <PageHero
        eyebrow="Hajj"
        title="Un Hajj accompagné, du premier au dernier jour"
        description="Encadrement complet : dossier, voyage, hébergement, rituels et assistance sur place. Contenus placeholder — à compléter."
      >
        <WhatsAppButton message="Bonjour, je souhaite des informations sur vos programmes Hajj." />
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex size-14 items-center justify-center rounded-full bg-secondary text-gold-deep">
              <Moon className="size-7" strokeWidth={1.6} />
            </span>
            <h2 className="mt-6 font-display text-3xl font-semibold text-foreground md:text-4xl">
              Programmes Hajj — bientôt en ligne
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Section placeholder : présentez ici vos programmes Hajj (formules, dates, étapes
              du dossier) avec vos vrais contenus et tarifs.
            </p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
