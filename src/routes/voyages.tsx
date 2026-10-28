import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Clock, Compass, Globe2, Layers, MapPinned, MessageCircle, Mountain } from "lucide-react";
import { CustomTripWizard } from "@/components/CustomTripWizard";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { buttonClass, ButtonContent, GoldButton } from "@/components/ui-premium/Buttons";
import { CTABand } from "@/components/ui-premium/CTABand";
import { Marquee } from "@/components/ui-premium/Marquee";
import { PageHero } from "@/components/ui-premium/PageHero";
import { SectionHeading } from "@/components/ui-premium/SectionHeading";
import { SectionWave } from "@/components/ui-premium/SectionWave";
import { SmartImage } from "@/components/ui-premium/SmartImage";
import { Tabs } from "@/components/ui-premium/Tabs";
import type { ImageName } from "@/config/images";
import { whatsappLink } from "@/config/site";
import { destinations, voyageTypeLabels, whyUs, type Destination, type VoyageType } from "@/data/content";

const voyageTypes = Object.keys(voyageTypeLabels) as VoyageType[];

function isVoyageType(value: unknown): value is VoyageType {
  return typeof value === "string" && (voyageTypes as string[]).includes(value);
}

export const Route = createFileRoute("/voyages")({
  validateSearch: (search: Record<string, unknown>): { type?: VoyageType } => {
    const type = search["type"];
    return isVoyageType(type) ? { type } : {};
  },
  head: () => ({
    meta: [
      { title: "Voyages — Morocco Travel Agency" },
      {
        name: "description",
        content:
          "Voyages internationaux, circuits au Maroc, combinés et voyages à la carte au départ de Tanger et Tétouan.",
      },
      { property: "og:title", content: "Voyages — Morocco Travel Agency" },
      {
        property: "og:description",
        content: "Destinations internationales et circuits au Royaume, en groupe ou sur mesure.",
      },
    ],
  }),
  component: VoyagesPage,
});

function DestinationCard({ d }: { d: Destination }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-card transition-all duration-500 hover:-translate-y-1.5 hover:border-gold-deep/50 hover:shadow-[0_24px_60px_-28px] hover:shadow-gold-deep/50">
      <div className="relative aspect-[4/3] overflow-hidden">
        <SmartImage
          name={d.image}
          alt={d.name}
          className="absolute inset-0"
          imgClassName="transition-transform duration-[1.2s] group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-coal/85 via-coal/10 to-transparent" />
        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-coal/70 p-6 text-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <p className="translate-y-3 font-display text-xl text-cream transition-transform duration-500 group-hover:translate-y-0">
            {d.highlight}
          </p>
        </div>
        <div className="absolute bottom-4 left-5">
          <p className="text-xs uppercase tracking-[0.2em] text-gold">{d.region}</p>
          <h3 className="font-display text-3xl font-semibold text-cream">{d.name}</h3>
        </div>
      </div>
      <div className="flex flex-1 items-end justify-between gap-4 p-5">
        <div className="text-sm text-ink/70">
          <p className="flex items-center gap-1.5">
            <Clock className="size-4 text-gold-deep" aria-hidden="true" />
            {d.duration}
          </p>
          <p className="mt-2 text-xs">
            À partir de <span className="font-display text-xl font-semibold text-gold-deep">— MAD</span>
          </p>
        </div>
        <a
          href={whatsappLink(`Bonjour, je souhaite des informations sur le voyage « ${d.name} ».`)}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClass("gold", "sm")}
        >
          <ButtonContent icon={MessageCircle}>Devis</ButtonContent>
        </a>
      </div>
    </article>
  );
}

interface Combo {
  title: string;
  stops: { name: string; image: ImageName }[];
  text: string;
}

/** CONTENU EXEMPLE À REMPLACER — example combinations. */
const combos: Combo[] = [
  {
    title: "Istanbul + Dubaï",
    stops: [
      { name: "Istanbul", image: "dest-istanbul" },
      { name: "Dubaï", image: "dest-dubai" },
    ],
    text: "Histoire ottomane et modernité du Golfe en un seul voyage.",
  },
  {
    title: "Andalousie + Paris",
    stops: [
      { name: "Andalousie", image: "dest-andalousie" },
      { name: "Paris", image: "dest-paris" },
    ],
    text: "Des palais d'Al-Andalus aux grands boulevards parisiens.",
  },
  {
    title: "Marrakech + Merzouga",
    stops: [
      { name: "Marrakech", image: "dest-marrakech" },
      { name: "Merzouga", image: "dest-merzouga" },
    ],
    text: "La ville ocre puis les dunes du Sahara.",
  },
];

function ComboCard({ combo }: { combo: Combo }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-ink/10 bg-card transition-all duration-500 hover:-translate-y-1.5 hover:border-gold-deep/50 hover:shadow-[0_24px_60px_-28px] hover:shadow-gold-deep/50">
      <div className="relative aspect-[16/10] overflow-hidden">
        <SmartImage
          name="dest-combines"
          alt={combo.title}
          className="absolute inset-0"
          imgClassName="transition-transform duration-[1.2s] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-coal/80 to-transparent" />
        <div className="absolute bottom-4 left-4 flex -space-x-3">
          {combo.stops.map((s) => (
            <SmartImage key={s.name} name={s.image} alt={s.name} showLabel={false} className="size-14 rounded-full border-2 border-gold" />
          ))}
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-display text-2xl font-semibold text-ink">{combo.title}</h3>
        {/* Mini route line */}
        <div className="mt-4 flex items-center gap-2" aria-label={`Itinéraire : Tanger, ${combo.stops.map((s) => s.name).join(", ")}`}>
          {["Tanger", ...combo.stops.map((s) => s.name)].map((name, i, all) => (
            <div key={name} className="flex flex-1 items-center gap-2 last:flex-none">
              <span className="flex flex-col items-center">
                <span className="size-3 rounded-full border-2 border-gold-deep bg-cream" />
                <span className="mt-1 whitespace-nowrap text-[11px] font-medium text-ink/70">{name}</span>
              </span>
              {i < all.length - 1 && (
                <span className="mb-4 h-px flex-1 border-t border-dashed border-gold-deep/70 transition-colors group-hover:border-gold" />
              )}
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-ink/70">{combo.text}</p>
        <a
          href={whatsappLink(`Bonjour, je suis intéressé(e) par le combiné « ${combo.title} ».`)}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClass("outline-light", "sm", "mt-5")}
        >
          <ButtonContent icon={MessageCircle} arrow>
            Demander ce combiné
          </ButtonContent>
        </a>
      </div>
    </article>
  );
}

function VoyagesPage() {
  const { type } = Route.useSearch();
  const navigate = useNavigate({ from: "/voyages" });
  const active: VoyageType = type ?? "internationaux";

  const onTabChange = (value: VoyageType) => {
    void navigate({ search: { type: value }, replace: true, resetScroll: false });
  };

  const grid = (list: Destination[]) => (
    <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((d) => (
        <StaggerItem key={d.name}>
          <DestinationCard d={d} />
        </StaggerItem>
      ))}
    </Stagger>
  );

  return (
    <>
      <PageHero
        image="hero-voyages"
        imageAlt="Voyageurs face à un paysage"
        eyebrow="Voyages"
        title="Du Maroc au bout du monde"
        subtitle="Destinations internationales, circuits au Royaume, combinés et voyages à la carte : en groupe ou sur mesure."
        breadcrumb={[{ label: "Accueil", to: "/" }, { label: "Voyages" }]}
      >
        <GoldButton href="#voyages" size="lg" arrow>
          Explorer
        </GoldButton>
      </PageHero>

      <section id="voyages" className="scroll-mt-24 bg-background py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <Tabs
            label="Types de voyages"
            value={active}
            onValueChange={onTabChange}
            items={[
              {
                id: "internationaux",
                label: voyageTypeLabels.internationaux,
                icon: Globe2,
                content: grid(destinations.filter((d) => d.type === "internationaux")),
              },
              {
                id: "maroc",
                label: voyageTypeLabels.maroc,
                icon: Mountain,
                content: grid(destinations.filter((d) => d.type === "maroc")),
              },
              {
                id: "combines",
                label: voyageTypeLabels.combines,
                icon: Layers,
                content: (
                  <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {combos.map((c) => (
                      <StaggerItem key={c.title}>
                        <ComboCard combo={c} />
                      </StaggerItem>
                    ))}
                  </Stagger>
                ),
              },
              {
                id: "a-la-carte",
                label: voyageTypeLabels["a-la-carte"],
                icon: Compass,
                content: (
                  <div>
                    <p className="mx-auto mb-8 max-w-xl text-center text-ink/70">
                      Décrivez votre voyage idéal en quelques étapes : nous construisons une proposition sur mesure.
                    </p>
                    <CustomTripWizard />
                  </div>
                ),
              },
            ]}
          />
        </div>
      </section>

      {/* Why travel with us */}
      <section className="bg-sand py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <SectionHeading
            eyebrow="Pourquoi voyager avec nous"
            title="Partir loin, accompagné de près"
            subtitle="Une équipe locale, des partenaires sélectionnés et un suivi du départ au retour."
          />
          <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whyUs.map(({ Icon, title, text }) => (
              <StaggerItem key={title} className="rounded-2xl border border-ink/10 bg-cream p-6">
                <span className="inline-flex size-12 items-center justify-center rounded-full border border-gold-deep/40 text-gold-deep">
                  <Icon className="size-5" strokeWidth={1.7} aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold text-ink">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink/70">{text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <SectionWave from="bg-sand" to="text-coal" />
      <section className="bg-coal pb-12 pt-8 text-cream" aria-label="Nos destinations">
        <Reveal>
          <Marquee duration={50} rowClassName="gap-10 pr-10">
            {destinations.map((d) => (
              <span key={d.name} className="flex items-center gap-10 whitespace-nowrap font-display text-5xl font-semibold text-cream/85 md:text-7xl">
                {d.name}
                <MapPinned className="size-6 text-gold" aria-hidden="true" />
              </span>
            ))}
          </Marquee>
        </Reveal>
      </section>

      <CTABand
        eyebrow="Votre prochaine destination"
        title="Un voyage en tête ? Parlons-en"
        text="Dites-nous où vous rêvez d'aller : nous nous occupons du reste."
        whatsappMessage="Bonjour, je souhaite organiser un voyage."
      />
    </>
  );
}
