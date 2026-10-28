import { createFileRoute, notFound } from "@tanstack/react-router";
import { Check, CalendarDays } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { getOfferBySlug, categoryLabels } from "@/data/offers";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/omra/$slug")({
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData?.offer
          ? `${loaderData.offer.title} — Omra | Morocco Travel Agency`
          : "Offre Omra — Morocco Travel Agency",
      },
      {
        name: "description",
        content:
          "Détails du programme Omra : inclusions, durée et demande de devis par WhatsApp.",
      },
      {
        property: "og:title",
        content: loaderData?.offer ? `${loaderData.offer.title} — Omra` : "Offre Omra",
      },
      {
        property: "og:description",
        content: "Détails du programme Omra : inclusions, durée et demande de devis.",
      },
    ],
  }),
  loader: ({ params }) => {
    const offer = getOfferBySlug(params.slug);
    if (!offer || offer.category !== "omra") {
      throw notFound();
    }
    return { offer };
  },
  component: OmraOfferPage,
});

function OmraOfferPage() {
  const { offer } = Route.useLoaderData();
  const priceLabel =
    offer.priceFrom != null ? `${offer.priceFrom.toLocaleString("fr-MA")} MAD` : "—";

  return (
    <>
      <PageHero
        eyebrow={`Omra · ${categoryLabels[offer.category]}`}
        title={offer.title}
        description={offer.duration}
      >
        <WhatsAppButton
          message={`Bonjour, je souhaite avoir plus d'informations sur l'offre « ${offer.title} ».`}
          label="Demander un devis"
        />
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            {/* Gradient image placeholder — replace with real photos later. */}
            <div className="img-placeholder aspect-[16/9] w-full rounded-2xl" />
            <h2 className="mt-8 font-display text-3xl font-semibold text-foreground">
              Le programme
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
              Contenu placeholder : présentez ici le déroulé jour par jour de cette offre —
              vols, hôtels, rituels, visites — avec vos vrais textes.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <aside className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <p className="text-sm text-muted-foreground">À partir de</p>
              <p className="font-display text-4xl font-semibold text-gold-deep">{priceLabel}</p>
              <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarDays className="size-4 text-gold-deep" />
                {offer.duration}
              </p>
              <h3 className="mt-6 font-display text-lg font-semibold text-foreground">
                Inclus dans l'offre
              </h3>
              <ul className="mt-3 space-y-2">
                {offer.inclusions.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="mt-0.5 size-4 shrink-0 text-gold-deep" />
                    {item}
                  </li>
                ))}
              </ul>
              <WhatsAppButton
                message={`Bonjour, je souhaite avoir plus d'informations sur l'offre « ${offer.title} ».`}
                label="Demander un devis"
                className="mt-6 w-full"
              />
            </aside>
          </Reveal>
        </div>
      </section>
    </>
  );
}
