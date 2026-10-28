import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { whatsappLink, site } from "@/config/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Morocco Travel Agency" },
      {
        name: "description",
        content:
          "Contactez Morocco Travel Agency : WhatsApp, téléphone, email ou passez dans l'une de nos 4 agences à Tanger et Tétouan.",
      },
      { property: "og:title", content: "Contact — Morocco Travel Agency" },
      {
        property: "og:description",
        content: "Contactez-nous par WhatsApp, téléphone, email ou en agence.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  // No backend yet: the form builds a pre-filled WhatsApp message.
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const text = message
      ? `Bonjour, je suis ${name || "un client"} — ${message}`
      : "Bonjour, je souhaite avoir plus d'informations sur vos offres de voyage.";
    window.open(whatsappLink(text), "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Parlons de votre prochain voyage"
        description="Écrivez-nous sur WhatsApp, appelez-nous ou passez dans l'une de nos agences. Coordonnées placeholder — à compléter."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Contact details */}
          <Reveal>
            <div className="space-y-4">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-gold/60 hover:shadow-md"
              >
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Phone className="size-5" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-foreground">WhatsApp</span>
                  <span className="block text-sm text-muted-foreground">{site.phone}</span>
                </span>
              </a>
              <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-secondary text-gold-deep">
                  <Mail className="size-5" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-foreground">Email</span>
                  <span className="block text-sm text-muted-foreground">{site.email}</span>
                </span>
              </div>
              <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-secondary text-gold-deep">
                  <MapPin className="size-5" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-foreground">Nos agences</span>
                  <span className="block text-sm text-muted-foreground">{site.addressLine}</span>
                </span>
              </div>
            </div>
          </Reveal>

          {/* Placeholder form → opens WhatsApp */}
          <Reveal delay={0.1}>
            <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-7 shadow-sm">
              <h2 className="font-display text-2xl font-semibold text-foreground">
                Envoyez-nous un message
              </h2>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Votre message s'ouvrira dans WhatsApp, prêt à envoyer.
              </p>
              <div className="mt-6 space-y-4">
                <div>
                  <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-foreground">
                    Votre nom
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nom placeholder"
                    className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-gold focus:ring-2 focus:ring-gold/30"
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-foreground">
                    Votre message
                  </label>
                  <textarea
                    id="contact-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    placeholder="Ex. Je souhaite un devis pour une Omra…"
                    className="w-full resize-none rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-gold focus:ring-2 focus:ring-gold/30"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_8px_24px_-8px] shadow-gold-deep/50 transition-all hover:-translate-y-0.5 hover:bg-gold-light"
                >
                  <Send className="size-4" />
                  Envoyer sur WhatsApp
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
