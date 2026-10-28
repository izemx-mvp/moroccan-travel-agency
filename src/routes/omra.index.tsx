import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Check, FileText, HeartPulse, MessageCircle, Minus, RotateCcw, SearchX, Sparkles } from "lucide-react";
import { OfferCard } from "@/components/OfferCard";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { GoldButton, OutlineButton } from "@/components/ui-premium/Buttons";
import { Accordion } from "@/components/ui-premium/Accordion";
import { CTABand } from "@/components/ui-premium/CTABand";
import { SectionHeading } from "@/components/ui-premium/SectionHeading";
import { PageHero } from "@/components/ui-premium/PageHero";
import { SectionWave } from "@/components/ui-premium/SectionWave";
import { SmartImage } from "@/components/ui-premium/SmartImage";
import { StaticLeadForm } from "@/components/ui-premium/StaticLeadForm";
import { Tabs } from "@/components/ui-premium/Tabs";
import type { ImageName } from "@/config/images";
import { whatsappLink } from "@/config/site";
import { documentsChecklist, omraFaq, omraIncluded } from "@/data/content";
import { formatPrice, formulaLabels, getOffersByCategory, type Offer, type OmraFormula } from "@/data/offers";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/omra/")({
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

type SortKey = "recommended" | "duration-asc" | "duration-desc" | "price-asc";
type DurationKey = "all" | "short" | "medium" | "long" | "custom";

const durationChips: { id: DurationKey; label: string; test: (o: Offer) => boolean }[] = [
  { id: "all", label: "Toutes durées", test: () => true },
  { id: "short", label: "≤ 10 jours", test: (o) => o.durationDays != null && o.durationDays <= 10 },
  { id: "medium", label: "11 – 15 jours", test: (o) => o.durationDays != null && o.durationDays > 10 && o.durationDays <= 15 },
  { id: "long", label: "16 jours et +", test: (o) => o.durationDays != null && o.durationDays > 15 },
  { id: "custom", label: "Sur mesure", test: (o) => o.durationDays == null },
];

const sortLabels: Record<SortKey, string> = {
  recommended: "Recommandés",
  "duration-asc": "Durée croissante",
  "duration-desc": "Durée décroissante",
  "price-asc": "Prix croissant",
};

function sortOffers(list: Offer[], key: SortKey): Offer[] {
  const days = (o: Offer, fallback: number) => o.durationDays ?? fallback;
  const sorted = [...list];
  if (key === "recommended") sorted.sort((a, b) => Number(b.recommended) - Number(a.recommended));
  if (key === "duration-asc") sorted.sort((a, b) => days(a, Infinity) - days(b, Infinity));
  if (key === "duration-desc") sorted.sort((a, b) => days(b, -1) - days(a, -1));
  // Prices are not published yet: offers without a price keep their order at the end.
  if (key === "price-asc") sorted.sort((a, b) => (a.priceFrom ?? Infinity) - (b.priceFrom ?? Infinity));
  return sorted;
}

const prepareTabs: { id: "documents" | "sante" | "spiritualite"; label: string; icon: typeof FileText; image: ImageName; title: string; points: string[] }[] = [
  {
    id: "documents",
    label: "Documents",
    icon: FileText,
    image: "blog-documents",
    title: "Préparer son dossier",
    points: documentsChecklist,
  },
  {
    id: "sante",
    label: "Santé",
    icon: HeartPulse,
    image: "blog-sante",
    title: "Partir en forme",
    points: [
      "Consultez votre médecin avant le départ, surtout en cas de traitement",
      "Vérifiez les vaccinations exigées au moment de votre voyage",
      "Emportez vos médicaments personnels avec leurs ordonnances",
      "Prévoyez des chaussures confortables : on marche beaucoup",
      "Hydratez-vous régulièrement et protégez-vous du soleil",
    ],
  },
  {
    id: "spiritualite",
    label: "Spiritualité",
    icon: Sparkles,
    image: "blog-preparer-omra",
    title: "Se préparer intérieurement",
    points: [
      "Participez aux réunions d'information organisées par l'agence",
      "Renseignez-vous sur le déroulement de la Omra auprès de personnes qualifiées",
      "Préparez une liste personnelle d'invocations",
      "Organisez vos affaires au Maroc pour partir l'esprit tranquille",
      "Pour toute question religieuse, référez-vous à un savant ou à l'encadrement religieux du groupe",
    ],
  },
];

function OmraPage() {
  const omraOffers = getOffersByCategory("omra");
  const [formula, setFormula] = useState<OmraFormula | "all">("all");
  const [sort, setSort] = useState<SortKey>("recommended");
  const [duration, setDuration] = useState<DurationKey>("all");

  const shown = useMemo(() => {
    const test = durationChips.find((d) => d.id === duration)?.test ?? (() => true);
    const filtered = omraOffers.filter((o) => (formula === "all" || o.formula === formula) && test(o));
    return sortOffers(filtered, sort);
  }, [omraOffers, formula, sort, duration]);

  const resetFilters = () => {
    setFormula("all");
    setDuration("all");
    setSort("recommended");
  };

  const formulaPills: { id: OmraFormula | "all"; label: string }[] = [
    { id: "all", label: "Toutes" },
    ...omraOffers.map((o) => ({ id: o.formula, label: formulaLabels[o.formula] })),
  ];

  return (
    <>
      <PageHero
        image="hero-omra"
        imageAlt="La Mosquée sacrée de La Mecque"
        eyebrow="Omra"
        title="Programmes Omra 2026–2027"
        subtitle="Vols au départ de Tanger, hôtels à La Mecque et Médine, transferts et accompagnement : choisissez la formule qui vous correspond."
        breadcrumb={[{ label: "Accueil", to: "/" }, { label: "Omra" }]}
      >
        <GoldButton href="#programmes" size="lg" arrow>
          Voir les programmes
        </GoldButton>
        <OutlineButton href={whatsappLink("Bonjour, je souhaite des informations sur vos programmes Omra.")} icon={MessageCircle} size="lg">
          Parler à un conseiller
        </OutlineButton>
      </PageHero>

      {/* Programmes + filters */}
      <section id="programmes" className="scroll-mt-24 bg-background pb-24 pt-6">
        <div className="sticky top-[60px] z-30 border-y border-ink/10 bg-cream/75 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 md:px-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="scrollbar-none -mx-4 flex gap-1.5 overflow-x-auto px-4 lg:mx-0 lg:px-0" role="group" aria-label="Formule">
              {formulaPills.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  aria-pressed={formula === p.id}
                  onClick={() => setFormula(p.id)}
                  className={cn(
                    "relative shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                    formula === p.id ? "text-coal" : "text-ink/70 hover:text-ink"
                  )}
                >
                  {formula === p.id && (
                    <motion.span
                      layoutId="omra-formula-pill"
                      className="absolute inset-0 rounded-full bg-primary"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{p.label}</span>
                </button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="scrollbar-none -mx-4 flex gap-1.5 overflow-x-auto px-4 lg:mx-0 lg:px-0" role="group" aria-label="Durée">
                {durationChips.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    aria-pressed={duration === d.id}
                    onClick={() => setDuration(d.id)}
                    className={cn(
                      "shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                      duration === d.id
                        ? "border-gold-deep bg-gold/15 text-ink"
                        : "border-ink/15 text-ink/65 hover:border-gold-deep/60"
                    )}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
              <label className="flex items-center gap-2 text-xs font-medium text-ink/70">
                Trier
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="rounded-full border border-ink/15 bg-cream px-3 py-1.5 text-xs font-semibold text-ink outline-none focus:border-gold-deep"
                >
                  {(Object.keys(sortLabels) as SortKey[]).map((k) => (
                    <option key={k} value={k}>
                      {sortLabels[k]}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-7xl px-4 md:px-8">
          <p className="mb-6 text-sm text-ink/60" aria-live="polite">
            {shown.length} programme{shown.length > 1 ? "s" : ""} affiché{shown.length > 1 ? "s" : ""}
          </p>
          <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {shown.map((offer) => (
                <motion.div
                  key={offer.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <OfferCard offer={offer} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          <AnimatePresence>
            {shown.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center rounded-2xl border border-dashed border-gold-deep/40 bg-sand/60 px-6 py-16 text-center"
              >
                <SearchX className="size-10 text-gold-deep" aria-hidden="true" />
                <h3 className="mt-4 font-display text-2xl font-semibold text-ink">Aucun programme ne correspond</h3>
                <p className="mt-2 max-w-md text-sm text-ink/70">
                  Modifiez vos filtres ou demandez-nous un programme sur mesure.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <OutlineButton tone="light" onClick={resetFilters} icon={RotateCcw}>
                    Réinitialiser les filtres
                  </OutlineButton>
                  <GoldButton href={whatsappLink("Bonjour, je souhaite une Omra sur mesure.")} icon={MessageCircle}>
                    Omra sur mesure
                  </GoldButton>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Comparison */}
      <section className="bg-sand py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <SectionHeading
            eyebrow="Comparer"
            title="Comparer nos formules"
            subtitle="Les informations marquées « à confirmer » seront précisées par l'agence."
          />
          <Reveal className="mt-12">
            <div className="overflow-x-auto rounded-2xl border border-ink/10 bg-cream">
              <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                <caption className="sr-only">Comparatif des formules Omra</caption>
                <thead>
                  <tr>
                    <th scope="col" className="sticky left-0 z-10 bg-cream p-5 text-xs font-semibold uppercase tracking-[0.2em] text-ink/60">
                      Formule
                    </th>
                    {omraOffers.map((o) => (
                      <th
                        key={o.slug}
                        scope="col"
                        className={cn("p-5 align-bottom", o.recommended && "bg-coal text-cream")}
                      >
                        {o.recommended && (
                          <span className="mb-2 inline-block rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-coal">
                            Recommandé
                          </span>
                        )}
                        <span className={cn("block font-display text-xl font-semibold", o.recommended ? "text-cream" : "text-ink")}>
                          {o.title}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(
                    [
                      ["Durée", (o: Offer) => o.duration.replace("Durée placeholder — ", "")],
                      ["Hôtel à La Mecque", (o: Offer) => o.hotelMakkah.name.replace("Hôtel à La Mecque — ", "")],
                      ["Distance au Haram", (o: Offer) => o.distanceToHaram.replace("Distance au Haram ", "")],
                      ["Vols depuis Tanger", () => true],
                      ["Transferts", () => true],
                      ["Accompagnateur", () => true],
                      ["Visites guidées", (o: Offer) => o.formula !== "essentielle"],
                      ["À partir de", (o: Offer) => `${formatPrice(o.priceFrom)} MAD`],
                    ] as const
                  ).map(([label, get]) => (
                    <tr key={label} className="border-t border-ink/10">
                      <th scope="row" className="sticky left-0 z-10 bg-cream p-5 font-medium text-ink">
                        {label}
                      </th>
                      {omraOffers.map((o) => {
                        const v = get(o);
                        return (
                          <td key={o.slug} className={cn("p-5", o.recommended ? "bg-coal text-cream/85" : "text-ink/75")}>
                            {v === true ? (
                              <Check className={cn("size-5", o.recommended ? "text-gold" : "text-gold-deep")} aria-label="Inclus" />
                            ) : v === false ? (
                              <Minus className="size-5 text-ink/30" aria-label="Non inclus" />
                            ) : (
                              v
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Included */}
      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 md:px-8 lg:grid-cols-2 lg:items-center">
          <Reveal className="relative order-last lg:order-first">
            <SmartImage name="omra-included" alt="Pèlerins devant la Kaaba" className="aspect-[4/5] w-full rounded-2xl" />
            <div className="absolute -bottom-5 right-5 rounded-2xl border border-gold/30 bg-coal px-6 py-4 text-cream shadow-xl">
              <p className="font-display text-3xl font-semibold text-gold">6</p>
              <p className="text-xs uppercase tracking-[0.2em] text-cream/70">services inclus</p>
            </div>
          </Reveal>
          <div>
            <SectionHeading
              align="left"
              eyebrow="Sans surprise"
              title="Inclus dans tous nos programmes"
              subtitle="Quelle que soit la formule, vous partez avec l'essentiel organisé."
            />
            <Stagger className="mt-10 grid gap-4 sm:grid-cols-2">
              {omraIncluded.map(({ Icon, title, text }) => (
                <StaggerItem key={title} className="flex gap-4 rounded-2xl border border-ink/10 bg-card p-5">
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-gold-deep/40 text-gold-deep">
                    <Icon className="size-5" strokeWidth={1.7} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-display text-lg font-semibold text-ink">{title}</span>
                    <span className="block text-sm text-ink/70">{text}</span>
                  </span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* Makkah & Medina */}
      <SectionWave from="bg-background" to="text-coal" />
      <section className="relative overflow-hidden bg-coal pb-24 pt-14 text-cream md:pb-32">
        <div className="pattern-geo pointer-events-none absolute inset-0 opacity-[0.04]" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-8">
          <SectionHeading tone="dark" eyebrow="Les lieux saints" title="La Mecque & Médine" />
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {(
              [
                {
                  image: "omra-ambiance",
                  title: "La Mecque",
                  text: "Le cœur de la Omra : le Tawaf autour de la Kaaba et le Sa'i entre Safa et Marwa, au rythme de votre groupe.",
                },
                {
                  image: "omra-medine",
                  title: "Médine",
                  text: "La ville du Prophète : prières à la Mosquée du Prophète, sérénité et visites des lieux historiques.",
                },
              ] as const
            ).map((place, i) => (
              <Reveal key={place.title} delay={i * 0.12}>
                <article className="group relative overflow-hidden rounded-2xl">
                  <SmartImage
                    name={place.image}
                    alt={place.title}
                    className="aspect-[4/3] w-full md:aspect-[5/4]"
                    imgClassName="transition-transform duration-[1.4s] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-coal via-coal/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-7 md:p-9">
                    <h3 className="font-display text-4xl font-semibold">{place.title}</h3>
                    <p className="mt-2 max-w-md text-cream/75">{place.text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <SectionWave from="bg-coal" to="text-background" flip />

      {/* Prepare */}
      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <SectionHeading
            eyebrow="Conseils pratiques"
            title="Préparer votre Omra"
            subtitle="Informations générales pour bien vous organiser. Elles ne remplacent pas l'avis d'un médecin ni celui d'un savant."
          />
          <Tabs
            className="mt-12"
            label="Préparer votre Omra"
            items={prepareTabs.map((t) => ({
              id: t.id,
              label: t.label,
              icon: t.icon,
              content: (
                <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
                  <SmartImage name={t.image} alt={t.title} className="aspect-[16/11] w-full rounded-2xl" />
                  <div>
                    <h3 className="font-display text-3xl font-semibold text-ink">{t.title}</h3>
                    <ul className="mt-6 space-y-3">
                      {t.points.map((p) => (
                        <li key={p} className="flex items-start gap-3 text-ink/75">
                          <Check className="mt-0.5 size-5 shrink-0 text-gold-deep" aria-hidden="true" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ),
            }))}
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-sand py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 md:px-8 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            align="left"
            eyebrow="FAQ"
            title="Vos questions sur la Omra"
            subtitle="Une autre question ? Écrivez-nous sur WhatsApp."
          />
          <Reveal>
            <Accordion items={omraFaq} />
          </Reveal>
        </div>
      </section>

      <CTABand
        eyebrow="Réservez votre Omra"
        title="Recevez votre devis Omra"
        text="Indiquez la formule et la période souhaitées : un conseiller vous recontacte rapidement."
        waveTopClassName="text-sand"
        whatsappMessage="Bonjour, je souhaite réserver une Omra."
        aside={<StaticLeadForm tone="dark" presetOffer="Omra" context="je souhaite un devis pour une Omra." />}
      />
    </>
  );
}
