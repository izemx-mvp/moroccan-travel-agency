import { createFileRoute } from "@tanstack/react-router";
import {
  BellRing,
  BookOpenCheck,
  Bus,
  FileCheck2,
  HeartHandshake,
  Hotel,
  Info,
  MessageCircle,
  Users,
} from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { Accordion } from "@/components/ui-premium/Accordion";
import { GoldButton, OutlineButton } from "@/components/ui-premium/Buttons";
import { GoldRing } from "@/components/ui-premium/GoldRing";
import { PageHero } from "@/components/ui-premium/PageHero";
import { SectionHeading } from "@/components/ui-premium/SectionHeading";
import { SectionWave } from "@/components/ui-premium/SectionWave";
import { SmartImage } from "@/components/ui-premium/SmartImage";
import { StaticLeadForm } from "@/components/ui-premium/StaticLeadForm";
import { VerticalTimeline } from "@/components/ui-premium/Timeline";
import { whatsappLink } from "@/config/site";
import type { Faq, IconItem } from "@/data/content";

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

const accompaniment: IconItem[] = [
  { Icon: FileCheck2, title: "Dossier & démarches", text: "Aide à la constitution du dossier selon la procédure officielle." },
  { Icon: BookOpenCheck, title: "Formation", text: "Réunions de préparation sur les étapes et l'organisation du Hajj." },
  { Icon: Users, title: "Encadrement", text: "Accompagnateurs et encadrement religieux tout au long du séjour." },
  { Icon: Hotel, title: "Hébergement", text: "Hébergement organisé à La Mecque, Mina et Médine selon la formule." },
  { Icon: Bus, title: "Transport", text: "Déplacements organisés entre les différents lieux du pèlerinage." },
  { Icon: HeartHandshake, title: "Assistance", text: "Une équipe joignable en permanence, au Maroc et sur place." },
];

const stages = [
  { label: "Étape 1", title: "Départ", text: "Accueil à l'aéroport, formalités et vol vers l'Arabie saoudite avec votre groupe." },
  { label: "Étape 2", title: "Mina", text: "Installation sous les tentes et préparation spirituelle avant la journée d'Arafat.", image: "hajj-transport" as const },
  { label: "Étape 3", title: "Arafat", text: "Le moment le plus important du Hajj, consacré à l'invocation et au recueillement." },
  { label: "Étape 4", title: "Muzdalifa", text: "Nuit à Muzdalifa et ramassage des petites pierres." },
  { label: "Étape 5", title: "Jamarat", text: "Lapidation des stèles, accompagnée par l'encadrement du groupe.", image: "hajj-accompaniment" as const },
  { label: "Étape 6", title: "Tawaf", text: "Retour à La Mecque pour le Tawaf et le Sa'i." },
  { label: "Étape 7", title: "Médine", text: "Séjour à Médine et prières à la Mosquée du Prophète avant le retour." },
];

const formulas = [
  { title: "Formule Standard", text: "Contenu à compléter par l'agence." },
  { title: "Formule Confort", text: "Contenu à compléter par l'agence." },
  { title: "Formule Premium", text: "Contenu à compléter par l'agence." },
];

const hajjFaq: Faq[] = [
  {
    q: "Comment s'inscrire au Hajj ?",
    a: "Les inscriptions suivent la procédure officielle et dépendent des quotas attribués. Laissez-nous vos coordonnées : nous vous informons dès l'ouverture et vous guidons dans les démarches.",
  },
  {
    q: "Quand ouvrent les inscriptions ?",
    a: "Les dates dépendent du calendrier officiel. Elles seront communiquées par l'agence dès qu'elles sont connues.",
  },
  {
    q: "Quels documents faut-il préparer ?",
    a: "Un passeport valide et les documents demandés par la procédure officielle. La liste exacte vous sera confirmée par votre conseiller.",
  },
  {
    q: "Proposez-vous plusieurs formules ?",
    a: "Les formules et leurs tarifs seront présentés par l'agence en fonction des conditions de la saison.",
  },
  {
    q: "Serai-je accompagné sur place ?",
    a: "Oui, un encadrement accompagne le groupe à chaque étape, avec une équipe joignable en permanence.",
  },
];

function HajjPage() {
  return (
    <>
      <PageHero
        image="hero-hajj"
        imageAlt="Pèlerins pendant le Hajj"
        eyebrow="Hajj"
        title="Le Hajj, accompagné à chaque pas"
        subtitle="Une préparation sereine, un encadrement attentif et une organisation soignée, pour vous consacrer pleinement à l'essentiel."
        breadcrumb={[{ label: "Accueil", to: "/" }, { label: "Hajj" }]}
      >
        <GoldButton href="#etre-informe" icon={BellRing} size="lg">
          Être informé des inscriptions
        </GoldButton>
        <OutlineButton href={whatsappLink("Bonjour, je souhaite des informations sur le Hajj.")} icon={MessageCircle} size="lg">
          Poser une question
        </OutlineButton>
      </PageHero>

      {/* Intro */}
      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 md:px-8 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Un voyage spirituel"
              title="Plus de 25 ans au service des pèlerins"
              subtitle="Le Hajj demande une préparation minutieuse. Nous prenons en charge l'organisation pour que chaque pèlerin vive ce moment avec sérénité, entouré d'une équipe expérimentée."
            />
            <Reveal className="mt-8 flex flex-wrap gap-3">
              <GoldButton href="#etre-informe" arrow>
                M'inscrire à l'alerte
              </GoldButton>
            </Reveal>
          </div>
          <Reveal className="relative mx-auto w-full max-w-lg">
            <GoldRing className="absolute -right-10 -top-10 size-48 text-gold-deep" />
            <SmartImage name="hajj-arafat" alt="Le mont Arafat" className="aspect-[4/5] w-full rounded-2xl" />
          </Reveal>
        </div>
      </section>

      {/* Accompaniment */}
      <section className="bg-sand py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <SectionHeading eyebrow="Notre accompagnement" title="Tout est pensé pour vous" />
          <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {accompaniment.map(({ Icon, title, text }) => (
              <StaggerItem
                key={title}
                className="group rounded-2xl border border-ink/10 bg-cream p-6 transition-all duration-500 hover:-translate-y-1 hover:border-gold-deep/40"
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
      </section>

      {/* Stages */}
      <SectionWave from="bg-sand" to="text-coal" />
      <section className="relative overflow-hidden bg-coal pb-24 pt-12 text-cream md:pb-32">
        <div className="pattern-geo pointer-events-none absolute inset-0 opacity-[0.04]" />
        <div className="relative mx-auto max-w-4xl px-4 md:px-8">
          <SectionHeading
            tone="dark"
            eyebrow="Les étapes"
            title="Le déroulement du Hajj"
            subtitle="Un aperçu général des grandes étapes du pèlerinage. Le programme détaillé est remis par l'agence."
          />
          <VerticalTimeline tone="dark" className="mt-14" items={stages} />
        </div>
      </section>
      <SectionWave from="bg-coal" to="text-background" flip />

      {/* Formulas */}
      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <SectionHeading
            eyebrow="Formules"
            title="Nos formules Hajj"
            subtitle="Les formules et leurs tarifs seront communiqués à l'ouverture de la saison."
          />
          <Stagger className="mt-14 grid gap-5 md:grid-cols-3">
            {formulas.map((f, i) => (
              <StaggerItem
                key={f.title}
                className={
                  i === 1
                    ? "rounded-2xl border border-gold/40 bg-coal p-8 text-cream"
                    : "rounded-2xl border border-ink/10 bg-card p-8"
                }
              >
                <p className={i === 1 ? "text-xs font-semibold uppercase tracking-[0.24em] text-gold" : "text-xs font-semibold uppercase tracking-[0.24em] text-gold-deep"}>
                  Formule {i + 1}
                </p>
                <h3 className="mt-2 font-display text-3xl font-semibold">{f.title}</h3>
                <p className={i === 1 ? "mt-3 text-sm text-cream/70" : "mt-3 text-sm text-ink/70"}>{f.text}</p>
                <p className={i === 1 ? "mt-6 font-display text-3xl font-semibold text-gold" : "mt-6 font-display text-3xl font-semibold text-gold-deep"}>
                  — MAD
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Notice */}
      <section className="relative isolate overflow-hidden bg-coal py-20 text-cream md:py-24">
        <SmartImage name="hajj-notice-bg" alt="" showLabel={false} className="absolute inset-0 -z-20" />
        <div className="absolute inset-0 -z-10 bg-coal/85" />
        <Reveal className="mx-auto flex max-w-4xl flex-col items-center gap-5 px-4 text-center md:px-8">
          <span className="inline-flex size-14 items-center justify-center rounded-full border border-gold/50 text-gold">
            <Info className="size-6" aria-hidden="true" />
          </span>
          <h2 className="font-display text-3xl font-semibold md:text-4xl">Information importante</h2>
          <p className="text-lg leading-relaxed text-cream/80">
            Les inscriptions dépendent de la procédure officielle et des quotas — informations à valider par l'agence.
          </p>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="bg-sand py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 md:px-8 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading align="left" eyebrow="FAQ" title="Questions sur le Hajj" />
          <Reveal>
            <Accordion items={hajjFaq} />
          </Reveal>
        </div>
      </section>

      {/* Lead */}
      <section id="etre-informe" className="relative scroll-mt-24 overflow-hidden bg-background py-20 md:py-28">
        <GoldRing className="absolute -left-40 top-10 size-[480px] text-gold-deep opacity-50" />
        <div className="relative mx-auto max-w-4xl px-4 md:px-8">
          <SectionHeading
            eyebrow="Alerte inscriptions"
            title="Être informé de l'ouverture des inscriptions"
            subtitle="Laissez vos coordonnées : un conseiller vous contacte dès l'ouverture."
          />
          <Reveal className="mt-12">
            <StaticLeadForm
              presetOffer="Hajj"
              title="Mon alerte Hajj"
              subtitle="Aucun engagement. Nous vous recontactons dès que les informations officielles sont disponibles."
              fields={["name", "phone", "city", "offer", "travellers", "message"]}
              submitLabel="M'informer"
              context="je souhaite être informé(e) de l'ouverture des inscriptions au Hajj."
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
