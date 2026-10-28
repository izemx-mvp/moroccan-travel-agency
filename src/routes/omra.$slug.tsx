import { useState, type ReactNode } from "react";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  Clock,
  FileCheck2,
  Luggage,
  MapPin,
  MessageCircle,
  Minus,
  Plane,
  Plus,
  ShieldCheck,
  Star,
  X,
} from "lucide-react";
import { OfferCard } from "@/components/OfferCard";
import { Reveal } from "@/components/Reveal";
import { Accordion } from "@/components/ui-premium/Accordion";
import { GoldButton, OutlineButton } from "@/components/ui-premium/Buttons";
import { Carousel } from "@/components/ui-premium/Carousel";
import { LightboxGallery } from "@/components/ui-premium/Lightbox";
import { Modal } from "@/components/ui-premium/Modal";
import { PageHero } from "@/components/ui-premium/PageHero";
import { DuneUnderline, SectionHeading } from "@/components/ui-premium/SectionHeading";
import { SectionWave } from "@/components/ui-premium/SectionWave";
import { SmartImage } from "@/components/ui-premium/SmartImage";
import { StaticLeadForm } from "@/components/ui-premium/StaticLeadForm";
import { VerticalTimeline } from "@/components/ui-premium/Timeline";
import { whatsappLink } from "@/config/site";
import { documentsChecklist, omraFaq, SAMPLE_LABEL } from "@/data/content";
import { offers, formatPrice, formulaLabels, roomTypeLabels, type Offer, type RoomType } from "@/data/offers";
import { cn } from "@/lib/utils";

const roomTypes: RoomType[] = ["quadruple", "triple", "double"];
const roomCapacity: Record<RoomType, string> = {
  quadruple: "4 personnes",
  triple: "3 personnes",
  double: "2 personnes",
};

export const Route = createFileRoute("/omra/$slug")({
  loader: ({ params }): { offer: Offer } => {
    const offer = offers.find((o) => o.category === "omra" && o.slug === params.slug);
    if (!offer) {
      throw notFound();
    }
    return { offer };
  },
  // Declared after `loader` so TypeScript infers loaderData before typing head().
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
  component: OmraOfferPage,
  notFoundComponent: OmraOfferNotFound,
});

function OmraOfferNotFound() {
  return (
    <PageHero
      image="hero-omra"
      eyebrow="Omra"
      title="Programme introuvable"
      subtitle="Ce programme Omra n'existe pas ou n'est plus disponible. Découvrez nos autres offres."
      breadcrumb={[
        { label: "Accueil", to: "/" },
        { label: "Omra", to: "/omra" },
        { label: "Programme introuvable" },
      ]}
    >
      <GoldButton to="/omra" icon={ArrowLeft} size="lg">
        Retour aux programmes Omra
      </GoldButton>
    </PageHero>
  );
}

const MAX_TRAVELLERS = 20;

function Stars({ count }: { count: number | null }) {
  if (count == null) return <span className="text-xs text-ink/60">Catégorie à confirmer</span>;
  return (
    <span className="flex gap-0.5" aria-label={`${count} étoiles`}>
      {Array.from({ length: count }, (_, i) => (
        <Star key={i} className="size-3.5 fill-gold text-gold" aria-hidden="true" />
      ))}
    </span>
  );
}

function DetailSection({
  id,
  eyebrow,
  title,
  children,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-deep">{eyebrow}</p>
        <h2 className="mt-2 font-display text-3xl font-semibold text-ink md:text-4xl">{title}</h2>
        <DuneUnderline className="mt-3 text-gold-deep" />
      </Reveal>
      <div className="mt-8">{children}</div>
    </section>
  );
}

function OmraOfferPage() {
  const { offer } = Route.useLoaderData();
  const [room, setRoom] = useState<RoomType>("quadruple");
  const [departure, setDeparture] = useState(offer.departures[0] ?? "");
  const [travellers, setTravellers] = useState(2);
  const [quoteOpen, setQuoteOpen] = useState(false);

  const roomPrice = offer.roomPrices[room] ?? offer.priceFrom;
  const bookingMessage = [
    `Bonjour, je souhaite réserver l'offre « ${offer.title} ».`,
    "",
    `Chambre : ${roomTypeLabels[room]}`,
    `Départ : ${departure || "à définir"}`,
    `Voyageurs : ${travellers}`,
  ].join("\n");
  const others = offers.filter((o) => o.category === "omra" && o.slug !== offer.slug);

  const facts = [
    { Icon: Clock, label: "Durée", value: offer.duration.replace("Durée placeholder — ", "") },
    { Icon: CalendarDays, label: "Départs", value: `${offer.departures.length} dates à confirmer` },
    { Icon: MapPin, label: "Haram", value: offer.distanceToHaram.replace("Distance au Haram ", "") },
    { Icon: Plane, label: "Départ de", value: "Tanger" },
  ];

  return (
    <>
      <PageHero
        image={offer.image}
        imageAlt={offer.title}
        eyebrow={`Omra · Formule ${formulaLabels[offer.formula]}`}
        title={offer.title}
        subtitle={offer.tagline}
        align="left"
        breadcrumb={[
          { label: "Accueil", to: "/" },
          { label: "Omra", to: "/omra" },
          { label: offer.title },
        ]}
        footer={
          <div className="mt-10 max-w-4xl">
            <div className="flex flex-wrap gap-2">
              {offer.badges.map((b) => (
                <span
                  key={b}
                  className="rounded-full border border-gold/40 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold"
                >
                  {b}
                </span>
              ))}
              {offer.placesLimited && (
                <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-coal">
                  Places limitées
                </span>
              )}
            </div>
            <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-gold/20 pt-6 md:grid-cols-4">
              {facts.map(({ Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <Icon className="mt-0.5 size-5 shrink-0 text-gold" aria-hidden="true" />
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.2em] text-cream/60">{label}</dt>
                    <dd className="mt-0.5 text-sm font-medium text-cream">{value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        }
      >
        <GoldButton href={whatsappLink(bookingMessage)} icon={MessageCircle} size="lg" arrow>
          Réserver sur WhatsApp
        </GoldButton>
        <OutlineButton href="#programme" size="lg">
          Voir le programme
        </OutlineButton>
      </PageHero>

      <div className="bg-background pb-28 pt-12 md:pt-16 lg:pb-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 md:px-8 lg:grid-cols-[1fr_380px] lg:gap-14">
          {/* Left column */}
          <div className="min-w-0 space-y-20">
            <Reveal>
              <LightboxGallery
                images={[
                  { name: offer.image, alt: offer.title },
                  { name: "gallery-room", alt: "Chambre d'hôtel" },
                  { name: "gallery-buffet", alt: "Buffet de l'hôtel" },
                  { name: "gallery-madinah-night", alt: "Médine de nuit" },
                ]}
              />
            </Reveal>

            <DetailSection id="programme" eyebrow="Jour par jour" title="Le programme">
              <p className="mb-8 inline-flex rounded-full bg-sand px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/70">
                {SAMPLE_LABEL}
              </p>
              <VerticalTimeline items={offer.program.map((d) => ({ label: d.day, title: d.title, text: d.text }))} />
            </DetailSection>

            <DetailSection eyebrow="Hébergement" title="Vos hôtels">
              <div className="grid gap-5 sm:grid-cols-2">
                {(
                  [
                    { city: "La Mecque", hotel: offer.hotelMakkah, image: "hotel-makkah" },
                    { city: "Médine", hotel: offer.hotelMadinah, image: "hotel-madinah" },
                  ] as const
                ).map(({ city, hotel, image }) => (
                  <article key={city} className="group overflow-hidden rounded-2xl border border-ink/10 bg-card">
                    <SmartImage
                      name={image}
                      alt={`Hôtel à ${city}`}
                      className="aspect-[16/10] w-full"
                      imgClassName="transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-deep">{city}</p>
                      <h3 className="mt-1 font-display text-xl font-semibold text-ink">{hotel.name}</h3>
                      <div className="mt-3 flex items-center justify-between gap-3 text-sm text-ink/70">
                        <Stars count={hotel.stars} />
                        <span className="flex items-center gap-1.5">
                          <MapPin className="size-4 text-gold-deep" aria-hidden="true" />
                          {hotel.distance}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </DetailSection>

            <DetailSection eyebrow="Transparence" title="Ce qui est inclus">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="rounded-2xl border border-gold-deep/30 bg-card p-6">
                  <h3 className="font-display text-xl font-semibold text-ink">Inclus</h3>
                  <ul className="mt-4 space-y-2.5">
                    {offer.inclusions.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-ink/75">
                        <Check className="mt-0.5 size-4 shrink-0 text-gold-deep" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-ink/10 bg-sand/60 p-6">
                  <h3 className="font-display text-xl font-semibold text-ink">Non inclus</h3>
                  <ul className="mt-4 space-y-2.5">
                    {offer.exclusions.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-ink/75">
                        <X className="mt-0.5 size-4 shrink-0 text-ink/45" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </DetailSection>

            <DetailSection eyebrow="Tarifs" title="Prix par type de chambre">
              <div className="overflow-hidden rounded-2xl border border-ink/10 bg-card">
                <table className="w-full text-left text-sm">
                  <caption className="sr-only">Prix par personne selon le type de chambre</caption>
                  <thead className="bg-coal text-cream">
                    <tr>
                      <th scope="col" className="p-4 font-semibold">
                        Chambre
                      </th>
                      <th scope="col" className="p-4 font-semibold">
                        Occupation
                      </th>
                      <th scope="col" className="p-4 text-right font-semibold">
                        Prix / personne
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {roomTypes.map((r) => (
                      <tr key={r} className={cn("border-t border-ink/10", r === room && "bg-gold/10")}>
                        <th scope="row" className="p-4 font-medium text-ink">
                          {roomTypeLabels[r]}
                        </th>
                        <td className="p-4 text-ink/70">{roomCapacity[r]}</td>
                        <td className="p-4 text-right font-display text-lg font-semibold text-gold-deep">
                          {formatPrice(offer.roomPrices[r])} MAD
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs text-ink/60">
                Tarifs en cours de mise à jour — demandez un devis pour obtenir le prix exact.
              </p>
            </DetailSection>

            <DetailSection eyebrow="Avant de partir" title="Documents & valise">
              <div className="grid gap-5 md:grid-cols-2">
                <div className="rounded-2xl border border-ink/10 bg-card p-6">
                  <h3 className="flex items-center gap-2 font-display text-xl font-semibold text-ink">
                    <FileCheck2 className="size-5 text-gold-deep" aria-hidden="true" />
                    Documents à prévoir
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {documentsChecklist.map((d) => (
                      <li key={d} className="flex items-start gap-2.5 text-sm text-ink/75">
                        <span className="mt-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded border border-gold-deep/50">
                          <Check className="size-3 text-gold-deep" aria-hidden="true" />
                        </span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
                <article className="relative overflow-hidden rounded-2xl">
                  <SmartImage name="blog-valise" alt="Valise de voyage" className="absolute inset-0" />
                  <div className="absolute inset-0 bg-gradient-to-t from-coal via-coal/70 to-coal/20" />
                  <div className="relative flex h-full min-h-[300px] flex-col justify-end p-6 text-cream">
                    <h3 className="flex items-center gap-2 font-display text-xl font-semibold">
                      <Luggage className="size-5 text-gold" aria-hidden="true" />
                      Conseils valise
                    </h3>
                    <ul className="mt-3 space-y-1.5 text-sm text-cream/85">
                      <li>Vêtements amples et légers</li>
                      <li>Chaussures confortables pour marcher</li>
                      <li>Petit sac à dos pour la journée</li>
                      <li>Trousse de pharmacie personnelle</li>
                    </ul>
                  </div>
                </article>
              </div>
            </DetailSection>

            <DetailSection eyebrow="FAQ" title="Questions fréquentes">
              <Accordion items={omraFaq.slice(0, 5)} />
            </DetailSection>
          </div>

          {/* Sticky booking card (desktop) */}
          <aside className="hidden lg:block" aria-label="Réservation">
            <div className="sticky top-28 rounded-2xl border border-gold-deep/30 bg-card p-6 shadow-[0_30px_80px_-40px] shadow-gold-deep/60">
              <p className="text-xs text-ink/60">À partir de</p>
              <p className="font-display text-4xl font-semibold text-gold-deep">
                {formatPrice(roomPrice)} <span className="text-lg">MAD</span>
              </p>
              <p className="text-xs text-ink/60">par personne, chambre {roomTypeLabels[room].toLowerCase()}</p>

              <fieldset className="mt-6">
                <legend className="text-sm font-medium text-ink">Type de chambre</legend>
                <div className="mt-2 grid grid-cols-3 gap-1 rounded-full bg-sand p-1">
                  {roomTypes.map((r) => (
                    <button
                      key={r}
                      type="button"
                      aria-pressed={room === r}
                      onClick={() => setRoom(r)}
                      className={cn(
                        "relative rounded-full py-2 text-xs font-semibold transition-colors",
                        room === r ? "text-coal" : "text-ink/65 hover:text-ink"
                      )}
                    >
                      {room === r && (
                        <motion.span
                          layoutId="room-pill"
                          className="absolute inset-0 rounded-full bg-primary"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                      <span className="relative">{roomTypeLabels[r]}</span>
                    </button>
                  ))}
                </div>
              </fieldset>

              <label className="mt-5 block text-sm font-medium text-ink" htmlFor="booking-departure">
                Départ
              </label>
              <select
                id="booking-departure"
                value={departure}
                onChange={(e) => setDeparture(e.target.value)}
                className="mt-2 w-full rounded-xl border border-ink/15 bg-white/80 px-4 py-3 text-sm text-ink outline-none focus:border-gold-deep"
              >
                {offer.departures.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>

              <p className="mt-5 text-sm font-medium text-ink" id="booking-travellers">
                Voyageurs
              </p>
              <div
                className="mt-2 flex items-center justify-between rounded-xl border border-ink/15 bg-white/80 p-1.5"
                role="group"
                aria-labelledby="booking-travellers"
              >
                <button
                  type="button"
                  onClick={() => setTravellers((n) => Math.max(1, n - 1))}
                  disabled={travellers <= 1}
                  aria-label="Retirer un voyageur"
                  className="inline-flex size-9 items-center justify-center rounded-lg text-ink transition-colors hover:bg-sand disabled:opacity-40"
                >
                  <Minus className="size-4" />
                </button>
                <span className="font-display text-xl font-semibold text-ink" aria-live="polite">
                  {travellers}
                </span>
                <button
                  type="button"
                  onClick={() => setTravellers((n) => Math.min(MAX_TRAVELLERS, n + 1))}
                  disabled={travellers >= MAX_TRAVELLERS}
                  aria-label="Ajouter un voyageur"
                  className="inline-flex size-9 items-center justify-center rounded-lg text-ink transition-colors hover:bg-sand disabled:opacity-40"
                >
                  <Plus className="size-4" />
                </button>
              </div>

              <div className="mt-6 space-y-3">
                <GoldButton href={whatsappLink(bookingMessage)} icon={MessageCircle} size="lg" className="w-full" arrow>
                  Réserver sur WhatsApp
                </GoldButton>
                <OutlineButton tone="light" onClick={() => setQuoteOpen(true)} size="lg" className="w-full">
                  Demander un devis
                </OutlineButton>
              </div>
              <p className="mt-4 flex items-center gap-2 text-xs text-ink/60">
                <ShieldCheck className="size-4 text-gold-deep" aria-hidden="true" />
                Réponse rapide d'un conseiller, sans engagement.
              </p>
            </div>
          </aside>
        </div>
      </div>

      {/* Other programmes */}
      <SectionWave from="bg-background" to="text-coal" />
      <section className="relative overflow-hidden bg-coal pb-24 pt-12 text-cream md:pb-32">
        <div className="pattern-geo pointer-events-none absolute inset-0 opacity-[0.04]" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-8">
          <SectionHeading tone="dark" align="left" eyebrow="À découvrir aussi" title="Autres programmes Omra" />
          <Carousel label="Autres programmes Omra" tone="dark" className="mt-10">
            {others.map((o) => (
              <div key={o.slug} className="w-[85%] shrink-0 snap-start sm:w-[46%] lg:w-[31.5%]">
                <OfferCard offer={o} tone="dark" />
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      {/* Mobile booking bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gold/25 bg-coal px-4 py-3 text-cream lg:hidden">
        <div className="mx-auto flex max-w-xl items-center justify-between gap-3">
          <div>
            <p className="text-[11px] text-cream/60">À partir de</p>
            <p className="font-display text-2xl font-semibold leading-none text-gold">
              {formatPrice(roomPrice)} <span className="text-sm">MAD</span>
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setQuoteOpen(true)}
              className="rounded-full border border-gold/40 px-4 py-2.5 text-xs font-semibold text-cream transition-colors hover:border-gold hover:text-gold"
            >
              Devis
            </button>
            <GoldButton href={whatsappLink(bookingMessage)} icon={MessageCircle} size="sm" className="px-5 py-2.5">
              Réserver
            </GoldButton>
          </div>
        </div>
      </div>

      <Modal open={quoteOpen} onClose={() => setQuoteOpen(false)} title="Demander un devis" description={offer.title}>
        <StaticLeadForm
          bare
          presetOffer={offer.title}
          context={`je souhaite un devis pour l'offre « ${offer.title} » (chambre ${roomTypeLabels[room].toLowerCase()}, ${travellers} voyageur${travellers > 1 ? "s" : ""}).`}
        />
      </Modal>
    </>
  );
}
