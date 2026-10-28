import { createFileRoute } from "@tanstack/react-router";
import { Building2, HeartHandshake, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { site } from "@/config/site";

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: "À propos — Morocco Travel Agency" },
      {
        name: "description",
        content:
          "Plus de 25 ans d'expérience au service des pèlerins et voyageurs, avec 4 agences à Tanger et Tétouan.",
      },
      { property: "og:title", content: "À propos — Morocco Travel Agency" },
      {
        property: "og:description",
        content:
          "Plus de 25 ans d'expérience et 4 agences à Tanger et Tétouan.",
      },
    ],
  }),
  component: AProposPage,
});

function AProposPage() {
  return (
    <>
      <PageHero
        eyebrow="À propos"
        title="25 ans de voyages, une même exigence"
        description={`${site.name}, ${site.specialty.toLowerCase()}. Histoire placeholder — à compléter.`}
      />

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold text-foreground md:text-4xl">
            Notre histoire
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Section placeholder : racontez ici l'histoire de l'agence — sa création, son
            évolution, les équipes de Tanger et Tétouan, les milliers de pèlerins et voyageurs
            accompagnés.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          <Reveal>
            <div className="h-full rounded-2xl border border-border bg-card p-7 text-center">
              <span className="inline-flex size-12 items-center justify-center rounded-full bg-secondary text-gold-deep">
                <ShieldCheck className="size-6" strokeWidth={1.7} />
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold text-foreground">
                Expérience
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Placeholder : plus de 25 ans au service des voyageurs.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="h-full rounded-2xl border border-border bg-card p-7 text-center">
              <span className="inline-flex size-12 items-center justify-center rounded-full bg-secondary text-gold-deep">
                <HeartHandshake className="size-6" strokeWidth={1.7} />
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold text-foreground">
                Proximité
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Placeholder : 4 agences de proximité et un suivi personnalisé.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="h-full rounded-2xl border border-border bg-card p-7 text-center">
              <span className="inline-flex size-12 items-center justify-center rounded-full bg-secondary text-gold-deep">
                <Building2 className="size-6" strokeWidth={1.7} />
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold text-foreground">
                Complétude
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Placeholder : Omra, Hajj, voyages, circuits et hôtels sous un même toit.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-12 text-center">
          <WhatsAppButton message="Bonjour, je souhaite en savoir plus sur votre agence." />
        </Reveal>
      </section>
    </>
  );
}
