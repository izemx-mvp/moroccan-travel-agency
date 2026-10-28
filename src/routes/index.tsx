import { useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  CalendarRange,
  Compass,
  Instagram,
  MessageCircle,
  Quote,
  Search,
  Star,
  Users,
} from "lucide-react";
import { AgencyCard } from "@/components/AgencyCard";
import { OfferCard } from "@/components/OfferCard";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { GoldButton, OutlineButton } from "@/components/ui-premium/Buttons";
import { Carousel } from "@/components/ui-premium/Carousel";
import { CTABand } from "@/components/ui-premium/CTABand";
import { GoldRing } from "@/components/ui-premium/GoldRing";
import { Marquee } from "@/components/ui-premium/Marquee";
import { Modal } from "@/components/ui-premium/Modal";
import { PageHero } from "@/components/ui-premium/PageHero";
import { SectionHeading } from "@/components/ui-premium/SectionHeading";
import { SectionWave } from "@/components/ui-premium/SectionWave";
import { SmartImage } from "@/components/ui-premium/SmartImage";
import { StatCounter } from "@/components/ui-premium/StatCounter";
import { StaticLeadForm } from "@/components/ui-premium/StaticLeadForm";
import { HorizontalTimeline } from "@/components/ui-premium/Timeline";
import { TrustBar } from "@/components/ui-premium/TrustBar";
import type { ImageName } from "@/config/images";
import { site, whatsappLink } from "@/config/site";
import { destinations, howItWorks, SAMPLE_LABEL, testimonials, whyUs } from "@/data/content";
import { formulaLabels, getOffersByCategory, type OmraFormula } from "@/data/offers";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Morocco Travel Agency — Spécialiste Hajj & Omra à Tanger et Tétouan",
      },
      {
        name: "description",
        content:
          "Agence de voyage à Tanger et Tétouan : Hajj, Omra, voyages internationaux, circuits au Maroc et hôtels. Plus de 25 ans d'expérience, 4 agences à votre service.",
      },
      { property: "og:title", content: "Morocco Travel Agency — Spécialiste Hajj & Omra" },
      {
        property: "og:description",
        content:
          "Hajj, Omra, voyages internationaux, circuits au Maroc et hôtels. Plus de 25 ans d'expérience à Tanger et Tétouan.",
      },
    ],
  }),
  component: Index,
});

/* ------------------------------------------------------------------ */
/* Hero search                                                         */
/* ------------------------------------------------------------------ */

type TripType = "omra" | "hajj" | "internationaux" | "maroc" | "hotel";

const tripTypes: { value: TripType; label: string }[] = [
  { value: "omra", label: "Omra" },
  { value: "hajj", label: "Hajj" },
  { value: "internationaux", label: "Voyage international" },
  { value: "maroc", label: "Circuit au Maroc" },
  { value: "hotel", label: "Hôtel" },
];

function HeroSearch() {
  const navigate = useNavigate();
  const [type, setType] = useState<TripType>("omra");
  const [period, setPeriod] = useState("Dès que possible");
  const [travellers, setTravellers] = useState("2");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (type === "omra") void navigate({ to: "/omra" });
    else if (type === "hajj") void navigate({ to: "/hajj" });
    else if (type === "hotel") void navigate({ to: "/hotels" });
    else void navigate({ to: "/voyages", search: { type } });
  };

  const field = "w-full appearance-none bg-transparent text-[15px] font-medium text-cream outline-none [&>option]:bg-coal";

  return (
    <form
      onSubmit={onSubmit}
      aria-label="Rechercher un voyage"
      className="glass-dark mx-auto mt-10 grid max-w-4xl gap-2 rounded-3xl border border-gold/25 p-2 text-left md:grid-cols-[1fr_1fr_0.8fr_auto] md:rounded-full"
    >
      {(
        [
          {
            id: "search-type",
            label: "Type de voyage",
            Icon: Compass,
            control: (
              <select id="search-type" value={type} onChange={(e) => setType(e.target.value as TripType)} className={field}>
                {tripTypes.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            ),
          },
          {
            id: "search-period",
            label: "Période",
            Icon: CalendarRange,
            control: (
              <select id="search-period" value={period} onChange={(e) => setPeriod(e.target.value)} className={field}>
                {["Dès que possible", "Ramadan", "Vacances d'été", "Fin d'année", "Autre période"].map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            ),
          },
          {
            id: "search-travellers",
            label: "Voyageurs",
            Icon: Users,
            control: (
              <select
                id="search-travellers"
                value={travellers}
                onChange={(e) => setTravellers(e.target.value)}
                className={field}
              >
                {["1", "2", "3", "4", "5", "6+"].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === "1" ? "voyageur" : "voyageurs"}
                  </option>
                ))}
              </select>
            ),
          },
        ] as const
      ).map(({ id, label, Icon, control }) => (
        <div key={id} className="flex items-center gap-3 rounded-full px-5 py-2.5 transition-colors hover:bg-white/5">
          <Icon className="size-5 shrink-0 text-gold" aria-hidden="true" />
          <div className="min-w-0 flex-1">
            <label htmlFor={id} className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-gold/90">
              {label}
            </label>
            {control}
          </div>
        </div>
      ))}
      <button
        type="submit"
        className="btn-shine group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-coal transition-colors hover:bg-gold-light"
      >
        <Search className="size-4" aria-hidden="true" />
        Rechercher
      </button>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/* Bento                                                               */
/* ------------------------------------------------------------------ */

const universes: { title: string; text: string; image: ImageName; to: string; search?: { type: "internationaux" | "maroc" }; className: string }[] = [
  {
    title: "Omra",
    text: "Programmes accompagnés toute l'année",
    image: "cat-omra",
    to: "/omra",
    className: "sm:col-span-2 md:row-span-2 min-h-[340px] md:min-h-0",
  },
  {
    title: "Hajj",
    text: "Un accompagnement complet, étape par étape",
    image: "cat-hajj",
    to: "/hajj",
    className: "md:row-span-2 min-h-[340px] md:min-h-0",
  },
  {
    title: "Voyages internationaux",
    text: "Europe, Émirats, Asie…",
    image: "cat-international",
    to: "/voyages",
    search: { type: "internationaux" },
    className: "min-h-[240px]",
  },
  {
    title: "Circuits au Maroc",
    text: "Désert, médinas et côtes",
    image: "cat-maroc",
    to: "/voyages",
    search: { type: "maroc" },
    className: "min-h-[240px]",
  },
  {
    title: "Hôtels",
    text: "Makkah, Médine, Europe et Maroc",
    image: "cat-hotels",
    to: "/hotels",
    className: "sm:col-span-2 md:col-span-4 min-h-[220px]",
  },
];

function UniverseTile({ u }: { u: (typeof universes)[number] }) {
  const inner = (
    <>
      <SmartImage
        name={u.image}
        alt={u.title}
        className="absolute inset-0"
        imgClassName="transition-transform duration-[1.4s] ease-out group-hover:scale-110"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-coal/90 via-coal/30 to-transparent" />
      <span className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gold/0 transition-all duration-500 group-hover:ring-gold/70 group-hover:shadow-[inset_0_0_60px_-10px] group-hover:shadow-gold/40" />
      <span className="absolute inset-x-0 bottom-0 p-6 md:p-7">
        <span className="block font-display text-3xl font-semibold text-cream md:text-4xl">{u.title}</span>
        <span className="mt-1 block text-sm text-cream/75">{u.text}</span>
        <span className="mt-4 inline-flex translate-y-2 items-center gap-1.5 text-sm font-semibold text-gold opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
          Découvrir <ArrowUpRight className="size-4" aria-hidden="true" />
        </span>
      </span>
    </>
  );
  const cls = cn(
    "group relative block overflow-hidden rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep",
    u.className
  );
  return u.search ? (
    <Link to="/voyages" search={u.search} className={cls}>
      {inner}
    </Link>
  ) : (
    <Link to={u.to} className={cls}>
      {inner}
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Omra carousel                                                       */
/* ------------------------------------------------------------------ */

function OmraHighlights() {
  const omraOffers = getOffersByCategory("omra");
  const [filter, setFilter] = useState<OmraFormula | "all">("all");
  const shown = filter === "all" ? omraOffers : omraOffers.filter((o) => o.formula === filter);
  const pills: { id: OmraFormula | "all"; label: string }[] = [
    { id: "all", label: "Toutes" },
    ...omraOffers.map((o) => ({ id: o.formula, label: formulaLabels[o.formula] })),
  ];

  return (
    <section className="relative overflow-hidden bg-coal py-20 text-cream md:py-28">
      <div className="pattern-geo pointer-events-none absolute inset-0 opacity-[0.04]" />
      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            tone="dark"
            align="left"
            eyebrow="Programmes Omra à la une"
            title="Choisissez la formule qui vous ressemble"
            subtitle="Des programmes accompagnés au départ de Tanger, pensés pour vivre votre Omra en toute sérénité."
          />
          <Reveal>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrer par formule">
              {pills.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  aria-pressed={filter === p.id}
                  onClick={() => setFilter(p.id)}
                  className={cn(
                    "relative rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                    filter === p.id ? "border-gold text-coal" : "border-coal-border text-cream/75 hover:border-gold/60 hover:text-gold"
                  )}
                >
                  {filter === p.id && (
                    <motion.span
                      layoutId="home-omra-pill"
                      className="absolute inset-0 rounded-full bg-primary"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{p.label}</span>
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <Carousel label="Programmes Omra" tone="dark" className="mt-12">
          <AnimatePresence mode="popLayout" initial={false}>
            {shown.map((offer) => (
              <motion.div
                key={offer.slug}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                className="w-[85%] shrink-0 snap-start sm:w-[46%] lg:w-[31.5%]"
              >
                <OfferCard offer={offer} tone="dark" />
              </motion.div>
            ))}
          </AnimatePresence>
        </Carousel>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Hajj spotlight                                                      */
/* ------------------------------------------------------------------ */

const hajjPoints = [
  { title: "Préparation du dossier", text: "Nous vous guidons dans la procédure officielle d'inscription." },
  { title: "Formation avant le départ", text: "Réunions d'information sur les rites et l'organisation." },
  { title: "Encadrement sur place", text: "Un accompagnateur présent à chaque étape du pèlerinage." },
  { title: "Suivi permanent", text: "Une équipe joignable sur WhatsApp, avant et pendant le séjour." },
];

function HajjSpotlight() {
  const [open, setOpen] = useState(false);
  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 md:px-8 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative mx-auto aspect-square w-full max-w-[520px]">
          <GoldRing className="absolute inset-0 size-full text-gold-deep" />
          <SmartImage
            name="hero-hajj"
            alt="Tentes de Mina pendant le Hajj au lever du soleil"
            className="absolute inset-[7%] rounded-full shadow-[0_40px_100px_-40px] shadow-gold-deep/60"
          />
          <div className="absolute -bottom-2 left-2 rounded-2xl border border-gold/25 bg-coal px-5 py-4 text-cream shadow-xl md:left-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold">Hajj</p>
            <p className="font-display text-xl font-semibold">Accompagnement complet</p>
          </div>
        </Reveal>

        <div>
          <SectionHeading
            align="left"
            eyebrow="Hajj"
            title="Le voyage d'une vie, préparé avec soin"
            subtitle="Le Hajj est une étape spirituelle majeure. Notre rôle : vous libérer de l'organisation pour que vous puissiez vous consacrer pleinement à l'essentiel."
          />
          <Stagger className="mt-10 grid gap-5 sm:grid-cols-2">
            {hajjPoints.map((p, i) => (
              <StaggerItem key={p.title} className="rounded-2xl border border-ink/10 bg-card p-5">
                <span className="font-display text-3xl font-semibold text-gold-deep">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-xl font-semibold text-ink">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink/70">{p.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="mt-10 flex flex-wrap gap-3">
            <GoldButton onClick={() => setOpen(true)} size="lg" arrow>
              Être informé des inscriptions
            </GoldButton>
            <OutlineButton tone="light" to="/hajj" size="lg">
              En savoir plus
            </OutlineButton>
          </Reveal>
        </div>
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Être informé — Hajj"
        description="Laissez vos coordonnées : nous vous prévenons dès l'ouverture des inscriptions."
      >
        <StaticLeadForm
          bare
          presetOffer="Hajj"
          fields={["name", "phone", "city", "offer", "message"]}
          context="je souhaite être informé(e) de l'ouverture des inscriptions au Hajj."
        />
      </Modal>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Instagram                                                           */
/* ------------------------------------------------------------------ */

const instagramTiles: { image: ImageName; alt: string }[] = [
  { image: "omra-ambiance", alt: "Pèlerins en ihram sur l'esplanade du Haram" },
  { image: "cat-international", alt: "Rue d'une vieille ville européenne au crépuscule" },
  { image: "hajj-arafat", alt: "Pèlerins au mont Arafat" },
  { image: "dest-merzouga", alt: "Caravane dans les dunes de Merzouga" },
  { image: "omra-medine", alt: "La mosquée du Prophète à Médine" },
  { image: "hotel-maroc", alt: "Piscine d'un riad de luxe au crépuscule" },
];

function InstagramGrid() {
  return (
    <Stagger className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-6">
      {instagramTiles.map((tile, i) => (
        <StaggerItem key={tile.image}>
          <a
            href={site.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Voir sur Instagram : ${tile.alt}`}
            className="group relative block aspect-square overflow-hidden rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep"
          >
            <SmartImage
              name={tile.image}
              alt={tile.alt}
              showLabel={false}
              className="absolute inset-0"
              imgClassName="transition-transform duration-[1.2s] ease-out group-hover:scale-110"
            />
            <span className="absolute inset-0 bg-coal/35 transition-colors duration-500 md:bg-coal/0 md:group-hover:bg-coal/55" />
            <span className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gold/0 transition-all duration-500 group-hover:ring-gold/60" />
            <span className="absolute inset-0 flex items-center justify-center">
              <Instagram
                className="size-7 text-cream opacity-90 transition-all duration-500 md:scale-75 md:opacity-0 md:group-hover:scale-100 md:group-hover:opacity-100"
                aria-hidden="true"
              />
            </span>
            {i === 0 && (
              <span className="absolute left-3 top-3 rounded-full bg-coal/70 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-gold backdrop-blur-sm">
                À remplacer
              </span>
            )}
          </a>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

function Index() {
  return (
    <>
      <PageHero
        size="full"
        image="hero-home"
        imageAlt="Dunes du Sahara marocain au coucher du soleil"
        eyebrow="Agence de voyages depuis plus de 25 ans"
        title="Votre Omra, votre Hajj, vos voyages — accompagnés avec confiance"
        subtitle="Programmes Omra et Hajj, voyages internationaux, circuits au Maroc et hôtels : nos conseillers de Tanger et Tétouan vous accompagnent de la préparation au retour."
        waveClassName="text-coal"
        footer={<HeroSearch />}
        stats={[
          { value: site.stats.years, suffix: "+", label: "Ans d'expérience" },
          { value: site.stats.agencies, label: "Agences" },
          { value: site.stats.followers, suffix: "K", label: "Abonnés" },
          { value: site.stats.pilgrims, label: "Pèlerins (à compléter)" },
        ]}
      >
        <GoldButton to="/omra" size="lg" arrow>
          Découvrir nos programmes Omra
        </GoldButton>
        <OutlineButton href={whatsappLink()} icon={MessageCircle} size="lg">
          Parler à un conseiller
        </OutlineButton>
      </PageHero>

      <TrustBar />
      <SectionWave from="bg-coal" to="text-background" />

      {/* Bento */}
      <section className="bg-background pb-20 pt-10 md:pb-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <SectionHeading
            eyebrow="Nos univers de voyage"
            title="Un savoir-faire, cinq façons de voyager"
            subtitle="Du pèlerinage aux escapades lointaines, chaque voyage est préparé avec la même exigence."
          />
          <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 md:auto-rows-[260px] md:grid-cols-4">
            {universes.map((u) => (
              <StaggerItem key={u.title} className={cn("flex", u.className)}>
                <UniverseTile u={{ ...u, className: "w-full h-full" }} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <SectionWave from="bg-background" to="text-coal" flip />
      <OmraHighlights />
      <SectionWave from="bg-coal" to="text-background" />

      <HajjSpotlight />

      {/* Why us */}
      <section className="relative overflow-hidden bg-sand py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 md:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Pourquoi nous choisir"
              title="Une agence de confiance, à vos côtés"
              subtitle="Plus de 25 ans à organiser des voyages et des pèlerinages pour les familles de Tanger, Tétouan et de tout le Nord."
            />
            <Stagger className="mt-10 grid gap-4 sm:grid-cols-2">
              {whyUs.map(({ Icon, title, text }) => (
                <StaggerItem
                  key={title}
                  className="group rounded-2xl border border-ink/10 bg-cream p-5 transition-all duration-500 hover:-translate-y-1 hover:border-gold-deep/40 hover:shadow-[0_20px_50px_-30px] hover:shadow-gold-deep/60"
                >
                  <span className="inline-flex size-12 items-center justify-center rounded-full border border-gold-deep/40 text-gold-deep transition-colors group-hover:bg-gold group-hover:text-coal">
                    <Icon className="size-5" strokeWidth={1.7} aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-display text-xl font-semibold text-ink">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink/70">{text}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
          <Reveal className="relative">
            <SmartImage
              name="why-us-bg"
              alt="Passeport, carte d'embarquement et chapelet préparés pour le voyage"
              className="aspect-[4/5] w-full rounded-2xl"
            />
            <div className="absolute -left-3 top-8 rounded-2xl border border-gold/25 bg-coal p-5 shadow-xl md:-left-10">
              <StatCounter value={site.stats.years} suffix="+" label="Ans d'expérience" />
            </div>
            <div className="absolute -right-3 bottom-10 rounded-2xl border border-gold/25 bg-coal p-5 shadow-xl md:-right-8">
              <StatCounter value={site.stats.agencies} label="Agences" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <SectionHeading
            eyebrow="Comment ça marche"
            title="Quatre étapes, zéro souci"
            subtitle="Un parcours simple, un interlocuteur unique."
          />
          <HorizontalTimeline className="mt-16" items={howItWorks.map((s) => ({ title: s.title, text: s.text }))} />
        </div>
      </section>

      {/* Destinations marquee */}
      <SectionWave from="bg-background" to="text-coal" />
      <section className="relative overflow-hidden bg-coal pb-10 pt-16 text-cream md:pt-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <SectionHeading tone="dark" eyebrow="Destinations" title="Le monde au départ du Nord" />
        </div>
        <div className="mt-12 space-y-5">
          {[false, true].map((reverse) => (
            <Marquee key={String(reverse)} reverse={reverse} duration={reverse ? 55 : 48} rowClassName="gap-5 pr-5">
              {(reverse ? [...destinations].reverse() : destinations).map((d) => (
                <div key={d.name} className="group relative h-56 w-72 shrink-0 overflow-hidden rounded-2xl md:h-72 md:w-96">
                  <SmartImage
                    name={d.image}
                    alt={d.name}
                    showLabel={false}
                    className="absolute inset-0"
                    imgClassName="transition-transform duration-[1.2s] group-hover:scale-110"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-coal/85 via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-5">
                    <span className="block font-display text-2xl font-semibold">{d.name}</span>
                    <span className="text-xs uppercase tracking-[0.2em] text-gold">{d.region}</span>
                  </span>
                </div>
              ))}
            </Marquee>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative overflow-hidden bg-coal pb-24 pt-14 text-cream md:pb-32">
        <div className="pattern-geo pointer-events-none absolute inset-0 opacity-[0.04]" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-8">
          <SectionHeading
            tone="dark"
            eyebrow="Ils nous ont fait confiance"
            title="La parole à nos voyageurs"
            subtitle={<span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{SAMPLE_LABEL}</span>}
          />
          <Carousel label="Témoignages" tone="dark" className="mt-12">
            {testimonials.map((t) => (
              <figure
                key={t.initials}
                className="relative flex w-[85%] shrink-0 snap-start flex-col rounded-2xl border border-coal-border bg-night p-7 sm:w-[46%] lg:w-[31.5%]"
              >
                <Quote className="absolute right-6 top-6 size-10 text-gold/15" aria-hidden="true" />
                <div className="flex gap-1" aria-label={`${t.rating} étoiles sur 5`}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className={cn("size-4", i < t.rating ? "fill-gold text-gold" : "text-coal-border")}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <blockquote className="mt-5 flex-1 font-display text-xl leading-snug text-cream/90">« {t.text} »</blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-coal-border pt-5">
                  <span className="inline-flex size-11 items-center justify-center rounded-full border border-gold/40 bg-coal font-display text-base font-semibold text-gold">
                    {t.initials}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-cream">{t.name}</span>
                    <span className="block text-xs text-cream/60">
                      {t.city} · {t.trip}
                    </span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </Carousel>
        </div>
      </section>
      <SectionWave from="bg-coal" to="text-background" flip />

      {/* Instagram */}
      <section className="bg-background py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="flex flex-col items-center gap-6 text-center">
            <SectionHeading
              eyebrow={site.instagramHandle}
              title={`Rejoignez nos ${site.stats.followers}K voyageurs`}
              subtitle="Départs, coulisses et souvenirs de voyage : suivez-nous sur Instagram."
            />
          </div>
          <InstagramGrid />
          <div className="mt-10 flex justify-center">
            <GoldButton href={site.socials.instagram} icon={Instagram} size="lg" arrow>
              Suivre {site.instagramHandle}
            </GoldButton>
          </div>
        </div>
      </section>

      {/* Agencies */}
      <section className="bg-sand py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <SectionHeading
            eyebrow="Nos agences"
            title="4 agences à Tanger et Tétouan"
            subtitle="Venez nous rencontrer : nos conseillers vous reçoivent pour préparer votre voyage."
          />
          <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {site.branches.map((b) => (
              <StaggerItem key={b.id}>
                <AgencyCard branch={b} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CTABand
        title="Parlons de votre prochain voyage"
        text="Laissez-nous vos coordonnées : un conseiller vous rappelle pour construire votre projet, sans engagement."
        waveTopClassName="text-sand"
        aside={<StaticLeadForm tone="dark" />}
      />
    </>
  );
}