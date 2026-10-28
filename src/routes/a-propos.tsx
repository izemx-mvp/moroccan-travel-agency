import { createFileRoute } from "@tanstack/react-router";
import { Eye, HeartHandshake, MapPinned, Quote, ShieldCheck, Star } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { CTABand } from "@/components/ui-premium/CTABand";
import { GoldRing } from "@/components/ui-premium/GoldRing";
import { Marquee } from "@/components/ui-premium/Marquee";
import { PageHero } from "@/components/ui-premium/PageHero";
import { SectionHeading } from "@/components/ui-premium/SectionHeading";
import { SectionWave } from "@/components/ui-premium/SectionWave";
import { SmartImage } from "@/components/ui-premium/SmartImage";
import { StatCounter } from "@/components/ui-premium/StatCounter";
import { HorizontalTimeline } from "@/components/ui-premium/Timeline";
import { site } from "@/config/site";
import { SAMPLE_LABEL, testimonials, type IconItem } from "@/data/content";

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: "À propos — Morocco Travel Agency" },
      {
        name: "description",
        content:
          "Morocco Travel Agency : plus de 25 ans d'expérience dans le Hajj, la Omra et les voyages, avec 4 agences à Tanger et Tétouan.",
      },
      { property: "og:title", content: "À propos — Morocco Travel Agency" },
      {
        property: "og:description",
        content: "Plus de 25 ans d'expérience dans le Hajj, la Omra et les voyages.",
      },
    ],
  }),
  component: AboutPage,
});

/** CONTENU EXEMPLE À REMPLACER — years to be provided by the agency. */
const milestones = [
  { label: "Année ?", title: "Création", text: "Ouverture de la première agence à Tanger." },
  { label: "Année ?", title: "Hajj & Omra", text: "Spécialisation dans l'organisation des pèlerinages." },
  { label: "Année ?", title: "Tétouan", text: "Ouverture des agences de Tétouan." },
  { label: "Aujourd'hui", title: "4 agences", text: "Une équipe au service des voyageurs du Nord." },
];

const values: IconItem[] = [
  { Icon: ShieldCheck, title: "Confiance", text: "Des engagements clairs et tenus, voyage après voyage." },
  { Icon: HeartHandshake, title: "Accompagnement", text: "Un conseiller à l'écoute, du premier échange au retour." },
  { Icon: Eye, title: "Transparence", text: "Ce qui est inclus, ce qui ne l'est pas : tout est dit." },
  { Icon: MapPinned, title: "Proximité", text: "4 agences à Tanger et Tétouan pour vous recevoir." },
];

const team = [
  { initials: "—", role: "Direction" },
  { initials: "—", role: "Conseiller·ère Omra & Hajj" },
  { initials: "—", role: "Conseiller·ère voyages" },
  { initials: "—", role: "Accompagnateur·rice" },
];

function AboutPage() {
  return (
    <>
      <PageHero
        image="hero-about"
        imageAlt="L'équipe de l'agence"
        eyebrow="À propos"
        title="25 ans de voyages, une même exigence"
        subtitle="Depuis plus de 25 ans, Morocco Travel Agency accompagne les familles du Nord du Maroc dans leurs pèlerinages et leurs voyages."
        breadcrumb={[{ label: "Accueil", to: "/" }, { label: "À propos" }]}
      />

      {/* Story */}
      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 md:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal className="relative flex items-center justify-center">
            <GoldRing className="absolute size-[340px] text-gold-deep md:size-[440px]" />
            <div className="relative text-center">
              <p className="font-display text-[9rem] font-semibold leading-none text-gold-deep md:text-[12rem]">25+</p>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-ink/70">ans d'expérience</p>
            </div>
          </Reveal>
          <div>
            <SectionHeading align="left" eyebrow="Notre histoire" title="Une agence du Nord, tournée vers le monde" />
            <Reveal className="mt-6 space-y-4 text-lg leading-relaxed text-ink/75">
              <p>
                Morocco Travel Agency s'est construite autour d'une conviction : chaque voyage, et plus encore chaque
                pèlerinage, mérite une préparation attentive et un accompagnement humain.
              </p>
              <p>
                Spécialiste du Hajj et de la Omra, l'agence organise aussi des voyages internationaux, des circuits au
                Maroc et des réservations d'hôtels, avec la même exigence.
              </p>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/60">{SAMPLE_LABEL}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-coal py-16 text-cream">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 px-4 text-center md:grid-cols-4 md:px-8">
          <StatCounter value={site.stats.years} suffix="+" label="Ans d'expérience" size="lg" className="items-center" />
          <StatCounter value={site.stats.agencies} label="Agences" size="lg" className="items-center" />
          <StatCounter value={site.stats.followers} suffix="K" label="Abonnés" size="lg" className="items-center" />
          <StatCounter value={site.stats.pilgrims} label="Pèlerins (à compléter)" size="lg" className="items-center" />
        </div>
      </section>
      <SectionWave from="bg-coal" to="text-background" />

      {/* Milestones */}
      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <SectionHeading
            eyebrow="Notre parcours"
            title="Les grandes étapes"
            subtitle={<span className="text-xs font-semibold uppercase tracking-[0.2em]">{SAMPLE_LABEL}</span>}
          />
          <HorizontalTimeline
            className="mt-16"
            items={milestones.map((m) => ({ title: m.title, text: `${m.label} — ${m.text}` }))}
          />
        </div>
      </section>

      {/* Values */}
      <section className="relative isolate overflow-hidden bg-coal py-24 text-cream md:py-32">
        <SmartImage name="values-bg" alt="" showLabel={false} className="absolute inset-0 -z-20" />
        <div className="absolute inset-0 -z-10 bg-coal/85" />
        <div className="pattern-geo pointer-events-none absolute inset-0 -z-10 opacity-[0.05]" />
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <SectionHeading tone="dark" eyebrow="Nos valeurs" title="Ce qui nous guide" />
          <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ Icon, title, text }) => (
              <StaggerItem key={title} className="rounded-2xl border border-gold/20 bg-coal/70 p-7 text-center">
                <span className="mx-auto inline-flex size-14 items-center justify-center rounded-full border border-gold/50 text-gold">
                  <Icon className="size-6" strokeWidth={1.6} aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-2xl font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/70">{text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Team */}
      <section className="bg-sand py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <SectionHeading
            eyebrow="L'équipe"
            title="Des visages derrière chaque voyage"
            subtitle="Présentation de l'équipe à compléter par l'agence."
          />
          <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m) => (
              <StaggerItem key={m.role} className="rounded-2xl border border-ink/10 bg-cream p-6 text-center">
                <span className="img-fallback mx-auto flex size-24 items-center justify-center rounded-full font-display text-3xl font-semibold text-cream ring-2 ring-gold-deep/40 ring-offset-4 ring-offset-cream">
                  {m.initials}
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-ink">Nom à compléter</h3>
                <p className="mt-1 text-sm text-gold-deep">{m.role}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Testimonials strip */}
      <section className="bg-background py-16" aria-label="Témoignages">
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.2em] text-ink/60">{SAMPLE_LABEL}</p>
        <Marquee duration={60} rowClassName="gap-5 pr-5">
          {testimonials.map((t) => (
            <figure key={t.initials} className="w-[340px] shrink-0 rounded-2xl border border-ink/10 bg-card p-6">
              <Quote className="size-6 text-gold-deep/50" aria-hidden="true" />
              <blockquote className="mt-3 font-display text-lg leading-snug text-ink">« {t.text} »</blockquote>
              <figcaption className="mt-4 flex items-center justify-between text-xs text-ink/60">
                <span>
                  {t.name} · {t.city}
                </span>
                <span className="flex gap-0.5" aria-label={`${t.rating} étoiles sur 5`}>
                  {Array.from({ length: t.rating }, (_, i) => (
                    <Star key={i} className="size-3 fill-gold-deep text-gold-deep" aria-hidden="true" />
                  ))}
                </span>
              </figcaption>
            </figure>
          ))}
        </Marquee>
      </section>

      <CTABand
        title="Préparons ensemble votre prochain voyage"
        text="Omra, Hajj, voyage ou séjour : nos conseillers sont à votre écoute."
        waveTopClassName="text-background"
      />
    </>
  );
}
