import { AnimatePresence, motion } from "framer-motion";
import { LoaderCircle, MessageCircle, RotateCcw, Send } from "lucide-react";
import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { whatsappLink } from "@/config/site";
import { offers } from "@/data/offers";
import { cn } from "@/lib/utils";
import { isMoroccanPhone } from "@/lib/validation";
import { GoldButton, OutlineButton } from "./Buttons";

export type LeadField =
  | "name"
  | "phone"
  | "city"
  | "offer"
  | "travellers"
  | "period"
  | "message"
  | "destination"
  | "arrival"
  | "departure"
  | "rooms";

type Values = Record<LeadField, string>;
type Errors = Partial<Record<LeadField, string | undefined>>;

export const defaultOfferOptions: string[] = [
  ...offers.filter((o) => o.category === "omra").map((o) => o.title),
  "Hajj",
  "Voyage international",
  "Circuit au Maroc",
  "Réservation d'hôtel",
  "Autre demande",
];

const cityOptions = ["Tanger", "Tétouan", "Autre"];

const labels: Record<LeadField, string> = {
  name: "Nom complet",
  phone: "Téléphone / WhatsApp",
  city: "Ville",
  offer: "Offre souhaitée",
  travellers: "Nombre de voyageurs",
  period: "Période souhaitée",
  message: "Message",
  destination: "Destination",
  arrival: "Date d'arrivée",
  departure: "Date de départ",
  rooms: "Nombre de chambres",
};

const required: LeadField[] = ["name", "phone", "city", "offer", "destination"];
const fullWidth: LeadField[] = ["message"];

const emptyValues: Values = {
  name: "",
  phone: "",
  city: "",
  offer: "",
  travellers: "",
  period: "",
  message: "",
  destination: "",
  arrival: "",
  departure: "",
  rooms: "",
};

function validate(values: Values, fields: LeadField[]): Errors {
  const errors: Errors = {};
  for (const field of fields) {
    const value = values[field].trim();
    if (required.includes(field) && !value) {
      errors[field] = "Ce champ est obligatoire.";
      continue;
    }
    if (field === "name" && value.length < 2) errors.name = "Merci d'indiquer votre nom.";
    if (field === "phone" && value && !isMoroccanPhone(value)) {
      errors.phone = "Numéro marocain invalide (ex. 06 12 34 56 78 ou +212 6 12 34 56 78).";
    }
    if ((field === "travellers" || field === "rooms") && value) {
      const n = Number(value);
      if (!Number.isInteger(n) || n < 1 || n > 60) errors[field] = "Indiquez un nombre entre 1 et 60.";
    }
  }
  if (fields.includes("arrival") && fields.includes("departure") && values.arrival && values.departure) {
    if (values.departure < values.arrival) errors.departure = "La date de départ doit suivre l'arrivée.";
  }
  return errors;
}

function buildMessage(values: Values, fields: LeadField[], context: string): string {
  const lines = fields
    .filter((f) => values[f].trim())
    .map((f) => `${labels[f]} : ${values[f].trim()}`);
  return `Bonjour, ${context}\n\n${lines.join("\n")}`;
}

interface StaticLeadFormProps {
  fields?: LeadField[];
  /** Pre-selected value of the "offer" select. */
  presetOffer?: string;
  offerOptions?: string[];
  title?: string;
  subtitle?: ReactNode;
  submitLabel?: string;
  /** Opening sentence of the WhatsApp message. */
  context?: string;
  tone?: "light" | "dark";
  className?: string;
  /** Render without the card frame (e.g. inside a Modal). */
  bare?: boolean;
}

/**
 * Static lead form: French validation, 800 ms fake submit, animated success card
 * and a WhatsApp hand-off with every answer pre-filled. Nothing is sent anywhere.
 */
export function StaticLeadForm({
  fields = ["name", "phone", "city", "offer", "travellers", "period", "message"],
  presetOffer,
  offerOptions = defaultOfferOptions,
  title = "Demander un devis gratuit",
  subtitle = "Un conseiller vous recontacte rapidement.",
  submitLabel = "Envoyer ma demande",
  context = "je souhaite être recontacté(e) au sujet d'un voyage.",
  tone = "light",
  className,
  bare = false,
}: StaticLeadFormProps) {
  const baseId = useId();
  const initial: Values = { ...emptyValues, offer: presetOffer ?? "" };
  const [values, setValues] = useState<Values>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const timer = useRef<number | undefined>(undefined);
  const dark = tone === "dark";

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const options = presetOffer && !offerOptions.includes(presetOffer) ? [presetOffer, ...offerOptions] : offerOptions;

  const update = (field: LeadField, value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(values, fields);
    setErrors(found);
    const firstError = fields.find((f) => found[f]);
    if (firstError) {
      document.getElementById(`${baseId}-${firstError}`)?.focus();
      return;
    }
    setStatus("loading");
    timer.current = window.setTimeout(() => setStatus("success"), 800);
  };

  const reset = () => {
    setValues(initial);
    setErrors({});
    setStatus("idle");
  };

  const inputClass = cn(
    "w-full rounded-xl border px-4 py-3 text-[15px] outline-none transition-all",
    dark
      ? "border-coal-border bg-coal/60 text-cream placeholder:text-cream/40 focus:border-gold focus:ring-2 focus:ring-gold/25"
      : "border-ink/15 bg-white/80 text-ink placeholder:text-ink/40 focus:border-gold-deep focus:ring-2 focus:ring-gold/30"
  );

  const renderControl = (field: LeadField) => {
    const id = `${baseId}-${field}`;
    const common = {
      id,
      name: field,
      value: values[field],
      "aria-invalid": errors[field] ? true : undefined,
      "aria-describedby": errors[field] ? `${id}-error` : undefined,
      className: cn(inputClass, errors[field] && "border-destructive focus:border-destructive"),
    };
    switch (field) {
      case "city":
      case "offer": {
        const list = field === "city" ? cityOptions : options;
        return (
          <select {...common} onChange={(e) => update(field, e.target.value)}>
            <option value="">Sélectionner…</option>
            {list.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        );
      }
      case "message":
        return (
          <textarea
            {...common}
            rows={4}
            placeholder="Votre projet, vos questions…"
            onChange={(e) => update(field, e.target.value)}
            className={cn(common.className, "resize-none")}
          />
        );
      case "arrival":
      case "departure":
        return <input {...common} type="date" onChange={(e) => update(field, e.target.value)} />;
      case "travellers":
      case "rooms":
        return (
          <input
            {...common}
            type="number"
            inputMode="numeric"
            min={1}
            max={60}
            placeholder={field === "travellers" ? "Ex. 2" : "Ex. 1"}
            onChange={(e) => update(field, e.target.value)}
          />
        );
      case "phone":
        return (
          <input
            {...common}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="06 00 00 00 00"
            onChange={(e) => update(field, e.target.value)}
          />
        );
      default:
        return (
          <input
            {...common}
            type="text"
            autoComplete={field === "name" ? "name" : "off"}
            placeholder={
              field === "name" ? "Prénom et nom" : field === "period" ? "Ex. Ramadan 2027, été…" : "Ex. Makkah, Istanbul…"
            }
            onChange={(e) => update(field, e.target.value)}
          />
        );
    }
  };

  const whatsappMessage = buildMessage(values, fields, context);

  return (
    <div
      className={cn(
        !bare && "rounded-2xl border p-6 shadow-[0_30px_80px_-40px] md:p-8",
        !bare && (dark ? "border-gold/20 bg-night shadow-gold/20" : "border-ink/10 bg-cream shadow-ink/30"),
        className
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center py-6 text-center"
            role="status"
          >
            <svg viewBox="0 0 80 80" className="size-20 text-gold" aria-hidden="true">
              <motion.circle
                cx="40"
                cy="40"
                r="36"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              />
              <motion.path
                d="M25 41 L35 51 L56 30"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
              />
            </svg>
            <h3 className={cn("mt-5 font-display text-3xl font-semibold", dark ? "text-cream" : "text-ink")}>
              Merci !
            </h3>
            <p className={cn("mt-2 max-w-sm leading-relaxed", dark ? "text-cream/75" : "text-ink/75")}>
              Votre demande a bien été envoyée. Un conseiller vous contacte très vite.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <GoldButton href={whatsappLink(whatsappMessage)} icon={MessageCircle} arrow>
                Continuer sur WhatsApp
              </GoldButton>
              <OutlineButton tone={dark ? "dark" : "light"} onClick={reset} icon={RotateCcw}>
                Nouvelle demande
              </OutlineButton>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            noValidate
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {(title || subtitle) && !bare && (
              <div className="mb-6">
                <h3 className={cn("font-display text-3xl font-semibold", dark ? "text-cream" : "text-ink")}>{title}</h3>
                {subtitle && <p className={cn("mt-1.5 text-sm", dark ? "text-cream/65" : "text-ink/65")}>{subtitle}</p>}
              </div>
            )}
            <div className="grid gap-4 sm:grid-cols-2">
              {fields.map((field) => (
                <div key={field} className={cn(fullWidth.includes(field) && "sm:col-span-2")}>
                  <label
                    htmlFor={`${baseId}-${field}`}
                    className={cn("mb-1.5 block text-sm font-medium", dark ? "text-cream/85" : "text-ink/85")}
                  >
                    {labels[field]}
                    {required.includes(field) && (
                      <span className={dark ? "text-gold" : "text-gold-deep"} aria-hidden="true">
                        {" "}
                        *
                      </span>
                    )}
                  </label>
                  {renderControl(field)}
                  {errors[field] && (
                    <p id={`${baseId}-${field}-error`} className="mt-1.5 text-xs font-medium text-destructive">
                      {errors[field]}
                    </p>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className={cn("text-xs", dark ? "text-cream/55" : "text-ink/60")}>
                * Champs obligatoires. Vos informations ne sont transmises à aucun tiers.
              </p>
              <GoldButton type="submit" disabled={status === "loading"} size="lg" className="shrink-0">
                {status === "loading" ? (
                  <span className="inline-flex items-center gap-2">
                    <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
                    Envoi en cours…
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2">
                    <Send className="size-4" aria-hidden="true" />
                    {submitLabel}
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
