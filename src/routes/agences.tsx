import { createFileRoute } from "@tanstack/react-router";
import { Clock, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { site } from "@/config/site";

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

function AgencesPage() {
  return (
    <>
      <PageHero
        eyebrow="Nos agences"
        title="4 agences à Tanger et Tétouan"
        description="Passez nous voir : nos équipes vous accueillent et préparent votre voyage avec vous. Adresses placeholder — à compléter."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <div className="grid gap-6 sm:grid-cols-2">
          {site.branches.map((branch, i) => (
            <Reveal key={branch.name} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-border bg-card p-7 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-deep">
                  {branch.city}
                </p>
                <h2 className="mt-2 font-display text-2xl font-semibold text-foreground">
                  {branch.name}
                </h2>
                <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2.5">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-gold-deep" />
                    {branch.address}
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Phone className="mt-0.5 size-4 shrink-0 text-gold-deep" />
                    {branch.phone}
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Clock className="mt-0.5 size-4 shrink-0 text-gold-deep" />
                    Horaires placeholder — à compléter
                  </li>
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 text-center">
          <WhatsAppButton message="Bonjour, je souhaite vous rendre visite dans votre agence." />
        </Reveal>
      </section>
    </>
  );
}
