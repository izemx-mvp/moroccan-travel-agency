import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, LoaderCircle, MessageCircle, Minus, Plus, RotateCcw } from "lucide-react";
import { GoldButton, OutlineButton } from "@/components/ui-premium/Buttons";
import { whatsappLink } from "@/config/site";
import { destinations } from "@/data/content";
import { isMoroccanPhone } from "@/lib/validation";
import { cn } from "@/lib/utils";

const steps = ["Destination", "Dates", "Budget", "Voyageurs", "Hôtel", "Envies", "Coordonnées"] as const;

const hotelLevels = ["Confort (3★)", "Supérieur (4★)", "Luxe (5★)", "Indifférent"];
const wishes = ["Culture", "Plage", "Shopping", "Nature", "Gastronomie", "Détente", "Aventure", "En famille"];

const BUDGET_MIN = 3000;
const BUDGET_MAX = 60000;

interface Trip {
  destination: string;
  start: string;
  end: string;
  flexible: boolean;
  budget: number;
  adults: number;
  children: number;
  hotel: string;
  wishes: string[];
  name: string;
  phone: string;
}

const emptyTrip: Trip = {
  destination: "",
  start: "",
  end: "",
  flexible: false,
  budget: 15000,
  adults: 2,
  children: 0,
  hotel: "Indifférent",
  wishes: [],
  name: "",
  phone: "",
};

function stepError(step: number, t: Trip): string | null {
  if (step === 0 && !t.destination.trim()) return "Indiquez une destination (ou choisissez une suggestion).";
  if (step === 1 && !t.flexible) {
    if (!t.start) return "Indiquez une date de départ ou cochez « Dates flexibles ».";
    if (t.end && t.end < t.start) return "La date de retour doit suivre le départ.";
  }
  if (step === 6) {
    if (t.name.trim().length < 2) return "Merci d'indiquer votre nom.";
    if (!isMoroccanPhone(t.phone)) return "Numéro marocain invalide (ex. 06 12 34 56 78 ou +212 6 12 34 56 78).";
  }
  return null;
}

function summary(t: Trip): string {
  return [
    "Bonjour, je souhaite un voyage sur mesure.",
    "",
    `Destination : ${t.destination}`,
    `Dates : ${t.flexible ? "flexibles" : `${t.start}${t.end ? ` → ${t.end}` : ""}`}`,
    `Budget : environ ${t.budget.toLocaleString("fr-FR")} MAD / personne`,
    `Voyageurs : ${t.adults} adulte(s), ${t.children} enfant(s)`,
    `Hôtel : ${t.hotel}`,
    `Envies : ${t.wishes.length ? t.wishes.join(", ") : "—"}`,
    `Nom : ${t.name}`,
    `Téléphone : ${t.phone}`,
  ].join("\n");
}

const inputClass =
  "w-full rounded-xl border border-ink/15 bg-white/80 px-4 py-3 text-[15px] text-ink outline-none transition-all placeholder:text-ink/40 focus:border-gold-deep focus:ring-2 focus:ring-gold/30";

function Stepper({ label, value, min, onChange }: { label: string; value: number; min: number; onChange: (n: number) => void }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-ink/10 bg-white/70 p-4">
      <span className="font-medium text-ink">{label}</span>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          aria-label={`Retirer : ${label}`}
          className="inline-flex size-10 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-gold-deep disabled:opacity-40"
        >
          <Minus className="size-4" />
        </button>
        <span className="w-6 text-center font-display text-2xl font-semibold text-ink" aria-live="polite">
          {value}
        </span>
        <button
          type="button"
          onClick={() => onChange(Math.min(20, value + 1))}
          aria-label={`Ajouter : ${label}`}
          className="inline-flex size-10 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-gold-deep"
        >
          <Plus className="size-4" />
        </button>
      </div>
    </div>
  );
}

/** Multi-step static "voyage à la carte" form. Nothing is sent: it ends with a WhatsApp summary. */
export function CustomTripWizard() {
  const [step, setStep] = useState(0);
  const [trip, setTrip] = useState<Trip>(emptyTrip);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [direction, setDirection] = useState(1);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const set = <K extends keyof Trip>(key: K, value: Trip[K]) => {
    setTrip((t) => ({ ...t, [key]: value }));
    setError(null);
  };

  const next = () => {
    const err = stepError(step, trip);
    if (err) {
      setError(err);
      return;
    }
    if (step === steps.length - 1) {
      setStatus("loading");
      timer.current = window.setTimeout(() => setStatus("success"), 800);
      return;
    }
    setDirection(1);
    setStep((s) => s + 1);
  };

  const back = () => {
    setError(null);
    setDirection(-1);
    setStep((s) => Math.max(0, s - 1));
  };

  const reset = () => {
    setTrip(emptyTrip);
    setStep(0);
    setStatus("idle");
    setError(null);
  };

  const progress = status === "success" ? 1 : (step + 1) / steps.length;

  const content = [
    <div key="destination" className="space-y-4">
      <label htmlFor="trip-destination" className="block font-display text-2xl font-semibold text-ink">
        Où rêvez-vous d'aller ?
      </label>
      <input
        id="trip-destination"
        value={trip.destination}
        onChange={(e) => set("destination", e.target.value)}
        placeholder="Ex. Istanbul, Malaisie, Andalousie…"
        className={inputClass}
      />
      <div className="flex flex-wrap gap-2">
        {destinations.map((d) => (
          <button
            key={d.name}
            type="button"
            onClick={() => set("destination", d.name)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
              trip.destination === d.name ? "border-gold-deep bg-gold/20 text-ink" : "border-ink/15 text-ink/70 hover:border-gold-deep"
            )}
          >
            {d.name}
          </button>
        ))}
      </div>
    </div>,
    <div key="dates" className="space-y-4">
      <p className="font-display text-2xl font-semibold text-ink">Quand souhaitez-vous partir ?</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="trip-start" className="mb-1.5 block text-sm font-medium text-ink/85">
            Départ
          </label>
          <input id="trip-start" type="date" value={trip.start} disabled={trip.flexible} onChange={(e) => set("start", e.target.value)} className={inputClass} />
        </div>
        <div>
          <label htmlFor="trip-end" className="mb-1.5 block text-sm font-medium text-ink/85">
            Retour
          </label>
          <input id="trip-end" type="date" value={trip.end} disabled={trip.flexible} onChange={(e) => set("end", e.target.value)} className={inputClass} />
        </div>
      </div>
      <label className="flex items-center gap-3 text-sm text-ink/80">
        <input
          type="checkbox"
          checked={trip.flexible}
          onChange={(e) => set("flexible", e.target.checked)}
          className="size-4 accent-[var(--color-gold-deep)]"
        />
        Dates flexibles
      </label>
    </div>,
    <div key="budget" className="space-y-6">
      <label htmlFor="trip-budget" className="block font-display text-2xl font-semibold text-ink">
        Quel budget par personne ?
      </label>
      <p className="font-display text-5xl font-semibold text-gold-deep">
        {trip.budget.toLocaleString("fr-FR")} <span className="text-2xl">MAD</span>
      </p>
      <input
        id="trip-budget"
        type="range"
        min={BUDGET_MIN}
        max={BUDGET_MAX}
        step={1000}
        value={trip.budget}
        onChange={(e) => set("budget", Number(e.target.value))}
        className="w-full accent-[var(--color-gold-deep)]"
      />
      <div className="flex justify-between text-xs text-ink/60">
        <span>{BUDGET_MIN.toLocaleString("fr-FR")} MAD</span>
        <span>{BUDGET_MAX.toLocaleString("fr-FR")} MAD et +</span>
      </div>
    </div>,
    <div key="travellers" className="space-y-4">
      <p className="font-display text-2xl font-semibold text-ink">Qui part en voyage ?</p>
      <Stepper label="Adultes" value={trip.adults} min={1} onChange={(n) => set("adults", n)} />
      <Stepper label="Enfants" value={trip.children} min={0} onChange={(n) => set("children", n)} />
    </div>,
    <fieldset key="hotel" className="space-y-4">
      <legend className="font-display text-2xl font-semibold text-ink">Quel niveau d'hôtel ?</legend>
      <div className="grid gap-3 sm:grid-cols-2">
        {hotelLevels.map((h) => (
          <label
            key={h}
            className={cn(
              "flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition-all",
              trip.hotel === h ? "border-gold-deep bg-gold/15" : "border-ink/15 hover:border-gold-deep/60"
            )}
          >
            <span className="font-medium text-ink">{h}</span>
            <input type="radio" name="trip-hotel" value={h} checked={trip.hotel === h} onChange={() => set("hotel", h)} className="sr-only" />
            <span className={cn("inline-flex size-5 items-center justify-center rounded-full border", trip.hotel === h ? "border-gold-deep bg-gold-deep" : "border-ink/25")}>
              {trip.hotel === h && <Check className="size-3 text-cream" aria-hidden="true" />}
            </span>
          </label>
        ))}
      </div>
    </fieldset>,
    <fieldset key="wishes" className="space-y-4">
      <legend className="font-display text-2xl font-semibold text-ink">Vos envies</legend>
      <p className="text-sm text-ink/65">Plusieurs choix possibles.</p>
      <div className="flex flex-wrap gap-2">
        {wishes.map((w) => {
          const on = trip.wishes.includes(w);
          return (
            <button
              key={w}
              type="button"
              aria-pressed={on}
              onClick={() => set("wishes", on ? trip.wishes.filter((x) => x !== w) : [...trip.wishes, w])}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-all",
                on ? "border-gold-deep bg-primary text-coal" : "border-ink/15 text-ink/75 hover:border-gold-deep"
              )}
            >
              {on && <Check className="size-3.5" aria-hidden="true" />}
              {w}
            </button>
          );
        })}
      </div>
    </fieldset>,
    <div key="contact" className="space-y-4">
      <p className="font-display text-2xl font-semibold text-ink">Vos coordonnées</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="trip-name" className="mb-1.5 block text-sm font-medium text-ink/85">
            Nom complet
          </label>
          <input id="trip-name" autoComplete="name" value={trip.name} onChange={(e) => set("name", e.target.value)} placeholder="Prénom et nom" className={inputClass} />
        </div>
        <div>
          <label htmlFor="trip-phone" className="mb-1.5 block text-sm font-medium text-ink/85">
            Téléphone / WhatsApp
          </label>
          <input
            id="trip-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={trip.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="06 00 00 00 00"
            className={inputClass}
          />
        </div>
      </div>
    </div>,
  ];

  return (
    <div className="mx-auto max-w-3xl rounded-2xl border border-ink/10 bg-cream p-6 shadow-[0_30px_80px_-40px] shadow-ink/30 md:p-10">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-ink/60">
          <span>{status === "success" ? "Terminé" : `Étape ${step + 1} / ${steps.length}`}</span>
          <span className="text-gold-deep">{status === "success" ? "" : steps[step]}</span>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-sand" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress * 100)}>
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-gold-deep via-gold to-gold-light"
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false} custom={direction}>
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center py-4 text-center"
            role="status"
          >
            <svg viewBox="0 0 80 80" className="size-20 text-gold-deep" aria-hidden="true">
              <motion.circle cx="40" cy="40" r="36" fill="none" stroke="currentColor" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7 }} />
              <motion.path
                d="M25 41 L35 51 L56 30"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              />
            </svg>
            <h3 className="mt-5 font-display text-3xl font-semibold text-ink">Merci !</h3>
            <p className="mt-2 max-w-md text-ink/75">
              Votre demande a bien été envoyée. Un conseiller vous contacte très vite.
            </p>
            <pre className="mt-6 w-full whitespace-pre-wrap rounded-2xl bg-sand p-5 text-left font-sans text-sm leading-relaxed text-ink/80">
              {summary(trip)}
            </pre>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <GoldButton href={whatsappLink(summary(trip))} icon={MessageCircle} arrow>
                Continuer sur WhatsApp
              </GoldButton>
              <OutlineButton tone="light" onClick={reset} icon={RotateCcw}>
                Nouvelle demande
              </OutlineButton>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key={step}
            custom={direction}
            initial={{ opacity: 0, x: direction * 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -30 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onSubmit={(e) => {
              e.preventDefault();
              next();
            }}
            noValidate
          >
            {content[step]}
            {error && (
              <p role="alert" className="mt-4 text-sm font-medium text-destructive">
                {error}
              </p>
            )}
            <div className="mt-8 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={back}
                disabled={step === 0}
                className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-ink/70 transition-colors hover:text-ink disabled:invisible"
              >
                <ArrowLeft className="size-4" aria-hidden="true" />
                Retour
              </button>
              <GoldButton type="submit" disabled={status === "loading"} size="lg">
                {status === "loading" ? (
                  <span className="inline-flex items-center gap-2">
                    <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
                    Envoi en cours…
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2">
                    {step === steps.length - 1 ? "Envoyer ma demande" : "Continuer"}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                )}
              </GoldButton>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
