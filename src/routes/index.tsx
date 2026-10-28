import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Building2,
  Compass,
  Hotel,
  Landmark,
  MapPin,
  MoonStar,
  Phone,
  Plane,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { DuneWave } from "@/components/DuneWave";
import { Reveal } from "@/components/Reveal";
import { OfferCard } from "@/components/OfferCard";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { getOffersByCategory } from "@/data/offers";
import { site } from "@/config/site";

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

const categories = [
  {
    label: "Omra",
    description: "Pèlerinage au rythme de votre spiritualité",
    to: "/omra",
    Icon: Kaaba,
  },
  {
    label: "Hajj",
    description: "Accompagnement complet, étape par étape",
    to: "/hajj",
    Icon: Moon,
  },
  {
    label: "Voyages",
    description: "Destinations internationales & circuits",
    to: "/voyages",
    Icon: Plane,
  },
  {
    label: "Hôtels",
    description: "Séjours et réservations soigneusement choisis",
    to: "/hotels",
    Icon: Hotel,
  },
  {
    label: "Maroc",
    description: "Redécouvrez les trésors du Royaume",
    to: "/voyages",
    Icon: Compass,
  },
] as const;

const strengths = [
  {
    title: "Plus de 25 ans d'expérience",
    description: "Des décennies d'accompagnement des pèlerins et voyageurs marocains.",
    Icon: ShieldCheck,
  },
  {
    title: "4 agences proches de vous",
    description: "Deux agences à Tanger, deux à Tétouan — toujours une équipe à vos côtés.",
    Icon: Building2,
  },
  {
    title: "Accompagnement personnalisé",
    description: "Un interlocuteur dédié avant, pendant et après votre voyage.",
    Icon: Users,
  },
  {
    title: "Programmes complets",
    description: "Vols, hôtels, transferts et visites organisés de bout en bout.",
    Icon: Sparkles,
  },
] as const;

function Index() {
  const omraOffers = getOffersByCategory("omra");

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="hero-glow relative flex min-h-[92vh] items-center overflow-hidden bg-coal">
        <div className="relative mx-auto w-full max-w-7xl px-4 pb-32 pt-32 md:px-8 md:pt-40">
          <Reveal className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold md:text-sm">
              {site.specialty}
            </p>
            <h1 className="mt-4 font-display text-5xl font-semibold leading-[1.05] text-cream md:text-7xl">
              Découvrez le monde,
              <span className="text-gold-gradient block italic">avec sérénité.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/65 md:text-lg">
              Omra, Hajj, voyages internationaux, circuits au Maroc et hôtels — une équipe
              expérimentée à Tanger et Tétouan organise chaque détail de votre voyage.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/omra"
                className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground shadow-[0_8px_24px_-8px] shadow-gold-deep/50 transition-all hover:-translate-y-0.5 hover:bg-gold-light"
              >
                Découvrir nos offres
              </Link>
              <WhatsAppButton className="bg-transparent px-7 py-3 shadow-none ring-1 ring-gold/40 hover:bg-gold/10 hover:shadow-none" />
            </div>
          </Reveal>
        </div>
        <div className="absolute inset-x-0 bottom-0 translate-y-px">
          <DuneWave className="text-background" />
        </div>
      </section>

      {/* ---------- Category tiles ---------- */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <Reveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-deep">
            Nos univers
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-foreground md:text-5xl">
            Que souhaitez-vous réserver ?
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((cat, i) => (
            <Reveal key={cat.label} delay={i * 0.06}>
              <Link
                to={cat.to}
                className="group flex h-full flex-col items-start rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-gold/60 hover:shadow-lg"
              >
                <span className="inline-flex size-12 items-center justify-center rounded-full bg-secondary text-gold-deep transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <cat.Icon className="size-6" strokeWidth={1.8} />
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold text-foreground">
                  {cat.label}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {cat.description}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- Featured Omra offers ---------- */}
      <section className="bg-secondary/60 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-deep">
                Omra
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold text-foreground md:text-5xl">
                Nos offres Omra en vedette
              </h2>
            </div>
            <Link
              to="/omra"
              className="text-sm font-semibold text-gold-deep underline-offset-4 hover:underline"
            >
              Voir toutes les offres Omra →
            </Link>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {omraOffers.map((offer, i) => (
              <Reveal key={offer.slug} delay={i * 0.06} className="h-full">
                <OfferCard offer={offer} className="h-full" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Pourquoi nous ---------- */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <Reveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-deep">
            Pourquoi nous
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-foreground md:text-5xl">
            La confiance, voyage après voyage
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {strengths.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-border bg-card p-6">
                <span className="inline-flex size-12 items-center justify-center rounded-full bg-secondary text-gold-deep">
                  <item.Icon className="size-6" strokeWidth={1.8} />
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- Branches preview ---------- */}
      <section className="bg-coal py-16 text-cream md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <Reveal className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              Nos agences
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-cream md:text-5xl">
              4 agences, une seule exigence
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {site.branches.map((branch, i) => (
              <Reveal key={branch.name} delay={i * 0.06}>
                <div className="h-full rounded-2xl border border-coal-border bg-night/70 p-6">
                  <span className="inline-flex size-11 items-center justify-center rounded-full bg-gold/15 text-gold">
                    <Landmark className="size-5" strokeWidth={1.8} />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-cream">
                    {branch.city}
                  </h3>
                  <p className="mt-1 flex items-start gap-1.5 text-sm text-cream/60">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
                    {branch.address}
                  </p>
                  <p className="mt-1.5 flex items-center gap-1.5 text-sm text-cream/60">
                    <Phone className="size-4 shrink-0 text-gold" />
                    {branch.phone}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-8 text-center">
            <Link
              to="/agences"
              className="text-sm font-semibold text-gold underline-offset-4 hover:underline"
            >
              Découvrir nos agences →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------- Final CTA band ---------- */}
      <section className="hero-glow relative overflow-hidden bg-coal py-16 text-center md:py-24">
        <div className="relative mx-auto max-w-3xl px-4 md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold text-cream md:text-5xl">
              Prêt à partir ? <span className="text-gold-gradient italic">Parlons-en.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-cream/65">
              Écrivez-nous sur WhatsApp : notre équipe vous répond et prépare avec vous le
              programme qui vous ressemble.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <WhatsAppButton className="px-8 py-3 text-base" />
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-full border border-gold/40 px-8 py-3 text-base font-semibold text-gold transition-colors hover:bg-gold/10"
              >
                Nous contacter
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
