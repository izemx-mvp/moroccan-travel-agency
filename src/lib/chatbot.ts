/**
 * Static, rule-based chatbot engine (no API). Keyword matching in French,
 * Darija (Latin "arabizi") and Arabic. All state lives in memory.
 */
import { documentsChecklist, type VoyageType } from "@/data/content";
import { offers } from "@/data/offers";
import { site, whatsappLink } from "@/config/site";
import { isMoroccanPhone } from "@/lib/validation";

export type Intent =
  | "lead"
  | "documents"
  | "hajj"
  | "omra"
  | "hotel"
  | "maroc"
  | "voyage"
  | "agence"
  | "contact"
  | "price"
  | "thanks"
  | "greeting";

export type ChatPath = "/omra" | "/hajj" | "/voyages" | "/hotels" | "/agences" | "/contact";

export interface ChatLink {
  label: string;
  to: ChatPath;
  type?: VoyageType;
}

export interface Lead {
  name: string;
  phone: string;
  offer: string;
  period: string;
}

export type BotBlock =
  | { kind: "text"; text: string }
  | { kind: "offers"; slugs: string[] }
  | { kind: "agencies" }
  | { kind: "list"; items: string[] }
  | { kind: "links"; links: ChatLink[] }
  | { kind: "actions"; actions: { label: string; href: string; icon: "whatsapp" | "phone" }[] }
  | { kind: "summary"; lead: Lead; whatsappHref: string };

export interface QuickReply {
  label: string;
  /** Text sent as the user's message, or a command starting with "/". */
  value: string;
}

export interface BotReply {
  blocks: BotBlock[];
  chips: QuickReply[];
}

type LeadStep = "name" | "phone" | "offer" | "period";

export interface ChatState {
  step: LeadStep | null;
  lead: Partial<Lead>;
}

export const initialChatState: ChatState = { step: null, lead: {} };

/* ------------------------------------------------------------------ */
/* Keywords                                                            */
/* ------------------------------------------------------------------ */

const keywords: Record<Intent, string[]> = {
  lead: ["reserver", "reservation", "inscription", "inscrire", "devis", "rappel", "rappeler", "bghit", "nreserve", "حجز", "التسجيل", "سجل"],
  documents: ["document", "documents", "papiers", "papier", "passeport", "visa", "dossier", "vaccin", "wra9", "lwra9", "kwaghet", "وثائق", "الوثائق", "جواز", "الأوراق", "اوراق"],
  hajj: ["hajj", "haj", "hadj", "l7aj", "lhaj", "7aj", "l7ajj", "حج", "الحج"],
  omra: ["omra", "umrah", "oumra", "omrah", "3omra", "l3omra", "عمرة", "العمرة", "عمره"],
  hotel: ["hotel", "hotels", "otel", "hebergement", "chambre", "فندق", "الفندق", "اوطيل"],
  maroc: ["maroc", "merzouga", "marrakech", "desert", "sahara", "circuit", "المغرب", "مراكش"],
  voyage: ["voyage", "voyages", "safar", "sfar", "destination", "istanbul", "turquie", "dubai", "paris", "andalousie", "asie", "vacances", "سفر", "سفرية", "رحلة"],
  agence: ["agence", "agences", "adresse", "fin", "fine", "fain", "bureau", "horaire", "horaires", "ouvert", "localisation", "tanger", "tetouan", "فين", "وكالة", "الوكالة", "عنوان"],
  contact: ["contact", "contacter", "telephone", "tel", "appeler", "whatsapp", "numero", "email", "mail", "nmra", "تواصل", "هاتف", "رقم"],
  price: ["prix", "tarif", "tarifs", "cout", "combien", "budget", "taman", "tamane", "ch7al", "chhal", "bch7al", "bchhal", "ثمن", "الثمن", "السعر", "بشحال", "شحال"],
  thanks: ["merci", "choukran", "shukran", "chokran", "baraka", "شكرا", "بارك"],
  greeting: ["bonjour", "bonsoir", "salut", "salam", "slm", "hello", "salamou", "السلام", "سلام", "مرحبا", "اهلا"],
};

/** Checked in this order: the first matching intent wins. */
const priority: Intent[] = [
  "lead",
  "documents",
  "hajj",
  "omra",
  "hotel",
  "maroc",
  "voyage",
  "agence",
  "contact",
  "price",
  "thanks",
  "greeting",
];

const arabic = /[؀-ۿ]/;

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    // Arabic short vowels (harakat) and tatweel.
    .replace(/[ً-ٟـ]/g, "")
    .trim();
}

function matches(normalized: string, tokens: string[], keyword: string): boolean {
  if (arabic.test(keyword)) return normalized.includes(keyword);
  if (tokens.includes(keyword)) return true;
  // Long keywords also match plurals/derivatives ("documents", "reservation"…).
  return keyword.length >= 5 && tokens.some((t) => t.startsWith(keyword));
}

export function detectIntents(text: string): Intent[] {
  const normalized = normalize(text);
  const tokens = normalized.split(/[^\p{L}\p{N}]+/u).filter(Boolean);
  return priority.filter((intent) => keywords[intent].some((k) => matches(normalized, tokens, k)));
}

/* ------------------------------------------------------------------ */
/* Replies                                                             */
/* ------------------------------------------------------------------ */

const omraSlugs = offers.filter((o) => o.category === "omra").map((o) => o.slug);

export const startChips: QuickReply[] = [
  { label: "Programmes Omra", value: "Omra" },
  { label: "Hajj", value: "Hajj" },
  { label: "Voyages", value: "Voyages" },
  { label: "Hôtels", value: "Hôtels" },
  { label: "Nos agences", value: "Agences" },
  { label: "Documents", value: "Documents" },
  { label: "Être rappelé", value: "/lead" },
];

const followChips: QuickReply[] = [
  { label: "Être rappelé", value: "/lead" },
  { label: "Programmes Omra", value: "Omra" },
  { label: "Nos agences", value: "Agences" },
  { label: "Prix", value: "Prix" },
];

const contactActions: BotBlock = {
  kind: "actions",
  actions: [
    { label: "Écrire sur WhatsApp", href: whatsappLink(), icon: "whatsapp" },
    { label: `Appeler le ${site.phone}`, href: `tel:${site.phone.replace(/[^\d+]/g, "")}`, icon: "phone" },
  ],
};

function chipsWithout(value: string): QuickReply[] {
  return followChips.filter((c) => c.value !== value);
}

export const welcomeReply: BotReply = {
  blocks: [
    {
      kind: "text",
      text: "Bonjour et bienvenue ! Je suis l'assistant de Morocco Travel Agency. Je peux vous renseigner sur nos programmes Omra, le Hajj, nos voyages, nos hôtels et nos agences. Vous pouvez m'écrire en français ou en darija.",
    },
  ],
  chips: startChips,
};

function replyFor(intent: Intent | undefined, raw: string): BotReply {
  switch (intent) {
    case "omra": {
      const wantsPrice = detectIntents(raw).includes("price");
      return {
        blocks: [
          {
            kind: "text",
            text: wantsPrice
              ? "Les tarifs Omra dépendent de la formule, de la période et du type de chambre. Ils sont en cours de mise à jour : demandez un devis gratuit, un conseiller vous répond rapidement. Voici nos formules :"
              : "Voici nos programmes Omra. Chaque formule comprend le vol, l'hébergement, les transferts et un accompagnement :",
          },
          { kind: "offers", slugs: omraSlugs },
          { kind: "links", links: [{ label: "Voir tous les programmes Omra", to: "/omra" }] },
        ],
        chips: [{ label: "Réserver une Omra", value: "/lead Omra" }, ...chipsWithout("Omra")],
      };
    }
    case "hajj":
      return {
        blocks: [
          {
            kind: "text",
            text: "Pour le Hajj, les inscriptions dépendent de la procédure officielle et des quotas attribués. Nous vous accompagnons à chaque étape : dossier, préparation, voyage et encadrement sur place. Laissez-nous vos coordonnées pour être informé de l'ouverture des inscriptions.",
          },
          { kind: "links", links: [{ label: "Découvrir notre accompagnement Hajj", to: "/hajj" }] },
        ],
        chips: [{ label: "Être informé", value: "/lead Hajj" }, ...chipsWithout("/lead")],
      };
    case "voyage":
      return {
        blocks: [
          {
            kind: "text",
            text: "Nous organisons des voyages internationaux (Istanbul, Dubaï, Andalousie, Paris, Asie…), des combinés et des voyages à la carte.",
          },
          {
            kind: "links",
            links: [
              { label: "Voyages internationaux", to: "/voyages", type: "internationaux" },
              { label: "Voyage à la carte", to: "/voyages", type: "a-la-carte" },
            ],
          },
        ],
        chips: [{ label: "Circuits au Maroc", value: "Maroc" }, ...chipsWithout("Omra")],
      };
    case "maroc":
      return {
        blocks: [
          {
            kind: "text",
            text: "Découvrez le Royaume avec nos circuits : désert de Merzouga, Marrakech, villes impériales et côtes.",
          },
          { kind: "links", links: [{ label: "Voir les circuits au Maroc", to: "/voyages", type: "maroc" }] },
        ],
        chips: [{ label: "Voyages internationaux", value: "Voyages" }, ...chipsWithout("Omra")],
      };
    case "hotel":
      return {
        blocks: [
          {
            kind: "text",
            text: "Nous réservons vos hôtels à La Mecque, Médine, en Europe et au Maroc. Indiquez-nous vos dates et le nombre de voyageurs pour recevoir un tarif.",
          },
          { kind: "links", links: [{ label: "Réserver un hôtel", to: "/hotels" }] },
        ],
        chips: [{ label: "Demander un tarif", value: "/lead Réservation d'hôtel" }, ...chipsWithout("/lead")],
      };
    case "agence":
      return {
        blocks: [
          { kind: "text", text: `Nous vous accueillons dans nos ${site.branches.length} agences à Tanger et Tétouan :` },
          { kind: "agencies" },
          { kind: "links", links: [{ label: "Voir les agences et itinéraires", to: "/agences" }] },
        ],
        chips: chipsWithout("Agences"),
      };
    case "contact":
      return {
        blocks: [
          { kind: "text", text: `Vous pouvez nous joindre sur WhatsApp, par téléphone ou par e-mail (${site.email}).` },
          contactActions,
        ],
        chips: chipsWithout("/lead").concat({ label: "Être rappelé", value: "/lead" }),
      };
    case "documents":
      return {
        blocks: [
          { kind: "text", text: "Voici les documents généralement demandés pour la Omra :" },
          { kind: "list", items: documentsChecklist },
          {
            kind: "text",
            text: "La liste exacte dépend des exigences en vigueur au moment de votre voyage : votre conseiller vous la confirme lors de l'inscription.",
          },
        ],
        chips: followChips,
      };
    case "price":
      return {
        blocks: [
          {
            kind: "text",
            text: "Nos tarifs varient selon la formule, la période, la durée et le type de chambre. Ils sont en cours de mise à jour sur le site : le plus simple est de demander un devis gratuit.",
          },
        ],
        chips: [{ label: "Demander un devis", value: "/lead" }, { label: "Programmes Omra", value: "Omra" }, { label: "Hajj", value: "Hajj" }],
      };
    case "thanks":
      return {
        blocks: [{ kind: "text", text: "Avec plaisir ! Puis-je vous aider pour autre chose ?" }],
        chips: startChips,
      };
    case "greeting":
      return welcomeReply;
    case "lead":
      // Handled by the lead flow.
      return welcomeReply;
    default:
      return {
        blocks: [
          {
            kind: "text",
            text: "Je n'ai pas bien compris votre demande. Un conseiller peut vous répondre directement sur WhatsApp, ou vous rappeler si vous nous laissez votre numéro.",
          },
          contactActions,
        ],
        chips: [{ label: "Être rappelé", value: "/lead" }, ...startChips.slice(0, 4)],
      };
  }
}

/* ------------------------------------------------------------------ */
/* Lead flow: name → phone → offer → period → summary                  */
/* ------------------------------------------------------------------ */

const offerChips: QuickReply[] = [
  ...offers.filter((o) => o.category === "omra").map((o) => ({ label: o.title, value: o.title })),
  { label: "Hajj", value: "Hajj" },
  { label: "Voyage", value: "Voyage" },
  { label: "Hôtel", value: "Réservation d'hôtel" },
];

const periodChips: QuickReply[] = [
  { label: "Dès que possible", value: "Dès que possible" },
  { label: "Ramadan", value: "Ramadan" },
  { label: "Été", value: "Été" },
  { label: "Je ne sais pas encore", value: "Pas encore définie" },
];

const cancelChip: QuickReply = { label: "Annuler", value: "/cancel" };

function prompt(step: LeadStep, error?: string): BotReply {
  const texts: Record<LeadStep, string> = {
    name: "Avec plaisir ! Pour commencer, quel est votre nom ?",
    phone: "Merci. Quel est votre numéro de téléphone ou WhatsApp ?",
    offer: "Quelle offre vous intéresse ?",
    period: "Pour quelle période souhaitez-vous partir ?",
  };
  const chips: Record<LeadStep, QuickReply[]> = {
    name: [cancelChip],
    phone: [cancelChip],
    offer: [...offerChips, cancelChip],
    period: [...periodChips, cancelChip],
  };
  return {
    blocks: [{ kind: "text", text: error ? `${error} ${texts[step]}` : texts[step] }],
    chips: chips[step],
  };
}

function leadMessage(lead: Lead): string {
  return [
    "Bonjour, je souhaite être recontacté(e).",
    "",
    `Nom : ${lead.name}`,
    `Téléphone : ${lead.phone}`,
    `Offre : ${lead.offer}`,
    `Période : ${lead.period}`,
  ].join("\n");
}

function nextStep(lead: Partial<Lead>): LeadStep | null {
  if (!lead.name) return "name";
  if (!lead.phone) return "phone";
  if (!lead.offer) return "offer";
  if (!lead.period) return "period";
  return null;
}

function summary(lead: Lead): BotReply {
  return {
    blocks: [
      { kind: "text", text: "Parfait, voici le récapitulatif de votre demande :" },
      { kind: "summary", lead, whatsappHref: whatsappLink(leadMessage(lead)) },
    ],
    chips: [{ label: "Recommencer", value: "/lead" }, ...startChips.slice(0, 3)],
  };
}

function startLead(presetOffer?: string): { state: ChatState; reply: BotReply } {
  const lead: Partial<Lead> = presetOffer ? { offer: presetOffer } : {};
  return { state: { step: "name", lead }, reply: prompt("name") };
}

/* ------------------------------------------------------------------ */
/* Entry point                                                         */
/* ------------------------------------------------------------------ */

/** Pure function: next state + bot reply for a user message or chip command. */
export function respond(state: ChatState, input: string): { state: ChatState; reply: BotReply } {
  const text = input.trim();

  if (text === "/cancel") {
    return {
      state: initialChatState,
      reply: { blocks: [{ kind: "text", text: "Pas de souci. Que puis-je faire pour vous ?" }], chips: startChips },
    };
  }
  if (text.startsWith("/lead")) {
    const preset = text.slice("/lead".length).trim();
    return startLead(preset || undefined);
  }

  if (state.step) {
    const lead = { ...state.lead };
    if (state.step === "name") {
      if (text.length < 2) return { state, reply: prompt("name", "Merci d'indiquer votre nom.") };
      lead.name = text;
    } else if (state.step === "phone") {
      if (!isMoroccanPhone(text)) {
        return { state, reply: prompt("phone", "Ce numéro ne semble pas valide (ex. 06 12 34 56 78).") };
      }
      lead.phone = text;
    } else if (state.step === "offer") {
      lead.offer = text;
    } else {
      lead.period = text;
    }
    const step = nextStep(lead);
    if (step) return { state: { step, lead }, reply: prompt(step) };
    return { state: initialChatState, reply: summary(lead as Lead) };
  }

  const intents = detectIntents(text);
  if (intents[0] === "lead") {
    // "réserver une omra" → preset the offer when it is obvious.
    const preset = intents.includes("hajj") ? "Hajj" : intents.includes("omra") ? "Omra" : undefined;
    return startLead(preset);
  }
  return { state, reply: replyFor(intents[0], text) };
}
