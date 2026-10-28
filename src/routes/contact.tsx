import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Socials } from "@/components/Socials";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { Accordion } from "@/components/ui-premium/Accordion";
import { PageHero } from "@/components/ui-premium/PageHero";
import { SectionHeading } from "@/components/ui-premium/SectionHeading";
import { StaticLeadForm } from "@/components/ui-premium/StaticLeadForm";
import { mapsLink, site, telLink, whatsappLink } from "@/config/site";
import type { Faq } from "@/data/content";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Morocco Travel Agency" },
      {
        name: "description",
        content:
          "Contactez Morocco Travel Agency par WhatsApp, téléphone ou e-mail, ou rendez-vous dans l'une de nos 4 agences à Tanger et Tétouan.",
      },
      { property: "og:title", content: "Contact — Morocco Travel Agency" },
      {
        property: "og:description",
        content: "WhatsApp, téléphone, e-mail ou passage en agence : parlons de votre prochain voyage.",
      },
    ],
  }),
  component: ContactPage,
});

const contactFaq: Faq[] = [
  {
    q: "Sous quel délai recevrai-je une réponse ?",
    a: "Un conseiller vous recontacte dès que possible pendant les horaires d'ouverture. WhatsApp reste le moyen le plus rapide.",
  },
  {
    q: "Puis-je venir sans rendez-vous ?",
    a: "Oui, nos 4 agences vous accueillent pendant leurs horaires d'ouverture.",
  },
  {
    q: "Le devis est-il gratuit ?",
    a: "Oui, la demande de devis est gratuite et sans engagement.",
  },
];

function ContactPage() {
  const cards = [
    { Icon: MessageCircle, title: "WhatsApp", value: site.phone, href: whatsappLink(), cta: "Écrire" },
    { Icon: Phone, title: "Téléphone", value: site.phone, href: telLink(site.phone), cta: "Appeler" },
    { Icon: Mail, title: "E-mail", value: site.email, href: `mailto:${site.email}`, cta: "Envoyer" },
    { Icon: Clock, title: "Horaires", value: site.hours, href: undefined, cta: undefined },
  ];

  return (
    <>
      <PageHero
        image="hero-contact"
        imageAlt="Conseillère au téléphone"
        eyebrow="Contact"
        title="Parlons de votre prochain voyage"
        subtitle="Une question, un devis, un projet de Omra ou de voyage ? Écrivez-nous : un conseiller vous répond rapidement."
        breadcrumb={[{ label: "Accueil", to: "/" }, { label: "Contact" }]}
      />

      <section className="bg-background py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 md:px-8 lg:grid-cols-[1.25fr_0.75fr]">
          <Reveal>
            <StaticLeadForm
              title="Envoyez-nous votre demande"
              subtitle="Tous les champs marqués d'une * sont obligatoires."
              fields={["name", "phone", "city", "offer", "travellers", "period", "message"]}
            />
          </Reveal>

          <div className="space-y-4">
            <Stagger className="space-y-4">
              {cards.map(({ Icon, title, value, href, cta }) => (
                <StaggerItem key={title}>
                  <div className="group flex items-center gap-4 rounded-2xl border border-ink/10 bg-card p-5 transition-all duration-300 hover:border-gold-deep/50">
                    <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-gold-deep/40 text-gold-deep transition-colors group-hover:bg-gold group-hover:text-coal">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-ink">{title}</span>
                      <span className="block truncate text-sm text-ink/70">{value}</span>
                    </span>
                    {href && cta && (
                      <a
                        href={href}
                        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="rounded-full border border-gold-deep/40 px-4 py-2 text-xs font-semibold text-ink transition-colors hover:bg-gold hover:text-coal"
                      >
                        {cta}
                      </a>
                    )}
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal className="rounded-2xl bg-coal p-6 text-cream">
              <p className="font-display text-xl font-semibold">Suivez-nous</p>
              <p className="mt-1 text-sm text-cream/65">Offres, départs et coulisses.</p>
              <Socials className="mt-4" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Agencies list */}
      <section className="bg-sand py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <SectionHeading eyebrow="Nos agences" title="Passez nous voir" />
          <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {site.branches.map((b) => (
              <StaggerItem key={b.id} className="rounded-2xl border border-ink/10 bg-cream p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-deep">{b.city}</p>
                <p className="mt-1 font-display text-xl font-semibold text-ink">{b.label}</p>
                <p className="mt-3 flex items-start gap-2 text-sm text-ink/70">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-gold-deep" aria-hidden="true" />
                  {b.address}
                </p>
                <a href={telLink(b.phone)} className="mt-1.5 flex items-center gap-2 text-sm text-ink/70 hover:text-gold-deep">
                  <Phone className="size-4 shrink-0 text-gold-deep" aria-hidden="true" />
                  {b.phone}
                </a>
                <a
                  href={mapsLink(b)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex text-sm font-semibold text-ink underline decoration-gold-deep underline-offset-4 hover:text-gold-deep"
                >
                  Itinéraire
                </a>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-background py-16 pb-28 md:py-24 md:pb-36">
        <div className="mx-auto max-w-3xl px-4 md:px-8">
          <SectionHeading eyebrow="FAQ" title="Questions fréquentes" />
          <Reveal className="mt-10">
            <Accordion items={contactFaq} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
