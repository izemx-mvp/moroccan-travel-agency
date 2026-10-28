import type { ImageName } from "@/config/images";

export type OfferCategory = "omra" | "hajj" | "international" | "maroc" | "hotel";

export type OmraFormula = "essentielle" | "confort" | "ramadan" | "familles";

export type RoomType = "quadruple" | "triple" | "double";

export const roomTypeLabels: Record<RoomType, string> = {
  quadruple: "Quadruple",
  triple: "Triple",
  double: "Double",
};

export interface OfferHotel {
  /** Placeholder until the agency confirms the hotel. */
  name: string;
  /** null = rating to confirm. */
  stars: number | null;
  distance: string;
}

export interface ProgramDay {
  day: string;
  title: string;
  text: string;
}

export interface Offer {
  slug: string;
  category: OfferCategory;
  formula: OmraFormula;
  title: string;
  tagline: string;
  /** Placeholder durations — to replace with the real ones. */
  duration: string;
  /** Used for filtering/sorting; null = custom duration. */
  durationDays: number | null;
  /** Placeholder price: null renders as "—". No invented prices. */
  priceFrom: number | null;
  roomPrices: Record<RoomType, number | null>;
  /** Name of an existing photo in src/assets. */
  image: ImageName;
  badges: string[];
  placesLimited: boolean;
  recommended: boolean;
  departures: string[];
  distanceToHaram: string;
  hotelMakkah: OfferHotel;
  hotelMadinah: OfferHotel;
  inclusions: string[];
  exclusions: string[];
  program: ProgramDay[];
}

export const categoryLabels: Record<OfferCategory, string> = {
  omra: "Omra",
  hajj: "Hajj",
  international: "Voyage international",
  maroc: "Circuit Maroc",
  hotel: "Hôtel",
};

export const formulaLabels: Record<OmraFormula, string> = {
  essentielle: "Essentielle",
  confort: "Confort",
  ramadan: "Ramadan",
  familles: "Familles & Groupes",
};

const noPrices: Record<RoomType, number | null> = {
  quadruple: null,
  triple: null,
  double: null,
};

const placeholderDepartures = [
  "Départ 1 — date à confirmer",
  "Départ 2 — date à confirmer",
  "Départ 3 — date à confirmer",
];

const commonExclusions = [
  "Dépenses personnelles",
  "Repas non mentionnés dans le programme",
  "Excédent de bagages",
];

/** CONTENU EXEMPLE À REMPLACER — generic outline until the real programme is provided. */
function sampleProgram(makkahDays: string, madinahDays: string): ProgramDay[] {
  return [
    {
      day: "Jour 1",
      title: "Départ de Tanger",
      text: "Accueil à l'aéroport par votre accompagnateur, formalités et vol vers l'Arabie saoudite.",
    },
    {
      day: makkahDays,
      title: "Séjour à La Mecque",
      text: "Installation à l'hôtel, accomplissement de la Omra en groupe et temps libre pour les prières au Haram.",
    },
    {
      day: madinahDays,
      title: "Séjour à Médine",
      text: "Transfert vers Médine, prières à la Mosquée du Prophète et visites des lieux historiques.",
    },
    {
      day: "Dernier jour",
      title: "Retour au Maroc",
      text: "Transfert vers l'aéroport et vol retour. Fin de nos services.",
    },
  ];
}

export const offers: Offer[] = [
  {
    slug: "omra-essentielle",
    category: "omra",
    formula: "essentielle",
    title: "Omra Essentielle",
    tagline: "L'essentiel pour une Omra sereine, bien encadrée.",
    duration: "Durée placeholder — 10 jours",
    durationDays: 10,
    priceFrom: null,
    roomPrices: noPrices,
    image: "cat-omra",
    badges: ["Essentielle"],
    placesLimited: false,
    recommended: false,
    departures: placeholderDepartures,
    distanceToHaram: "Distance au Haram à confirmer",
    hotelMakkah: { name: "Hôtel à La Mecque — à confirmer", stars: null, distance: "Distance à confirmer" },
    hotelMadinah: { name: "Hôtel à Médine — à confirmer", stars: null, distance: "Distance à confirmer" },
    inclusions: [
      "Vol aller-retour au départ de Tanger",
      "Hôtels à La Mecque et Médine (placeholder)",
      "Transferts internes",
      "Accompagnateur dédié",
    ],
    exclusions: commonExclusions,
    program: sampleProgram("Jours 2 à 6", "Jours 7 à 9"),
  },
  {
    slug: "omra-confort",
    category: "omra",
    formula: "confort",
    title: "Omra Confort",
    tagline: "Des hôtels proches du Haram et un rythme plus doux.",
    duration: "Durée placeholder — 14 jours",
    durationDays: 14,
    priceFrom: null,
    roomPrices: noPrices,
    image: "omra-confort",
    badges: ["Recommandé"],
    placesLimited: false,
    recommended: true,
    departures: placeholderDepartures,
    distanceToHaram: "Distance au Haram à confirmer",
    hotelMakkah: { name: "Hôtel à La Mecque — à confirmer", stars: null, distance: "Distance à confirmer" },
    hotelMadinah: { name: "Hôtel à Médine — à confirmer", stars: null, distance: "Distance à confirmer" },
    inclusions: [
      "Vol aller-retour au départ de Tanger",
      "Hôtels proches du Haram (placeholder)",
      "Transferts internes",
      "Visites guidées des lieux saints",
    ],
    exclusions: commonExclusions,
    program: sampleProgram("Jours 2 à 8", "Jours 9 à 13"),
  },
  {
    slug: "omra-ramadan",
    category: "omra",
    formula: "ramadan",
    title: "Omra Ramadan",
    tagline: "Vivre le mois sacré au plus près des lieux saints.",
    duration: "Durée placeholder — 21 jours",
    durationDays: 21,
    priceFrom: null,
    roomPrices: noPrices,
    image: "omra-ramadan",
    badges: ["Ramadan"],
    placesLimited: true,
    recommended: false,
    departures: placeholderDepartures,
    distanceToHaram: "Distance au Haram à confirmer",
    hotelMakkah: { name: "Hôtel à La Mecque — à confirmer", stars: null, distance: "Distance à confirmer" },
    hotelMadinah: { name: "Hôtel à Médine — à confirmer", stars: null, distance: "Distance à confirmer" },
    inclusions: [
      "Vol aller-retour au départ de Tanger",
      "Séjour pendant le Ramadan (placeholder)",
      "Transferts internes",
      "Assistance francophone et arabophone",
    ],
    exclusions: commonExclusions,
    program: sampleProgram("Jours 2 à 12", "Jours 13 à 20"),
  },
  {
    slug: "omra-familles",
    category: "omra",
    formula: "familles",
    title: "Omra Familles & Groupes",
    tagline: "Un programme pensé pour voyager ensemble.",
    duration: "Durée placeholder — sur mesure",
    durationDays: null,
    priceFrom: null,
    roomPrices: noPrices,
    image: "omra-medine",
    badges: ["Groupes"],
    placesLimited: false,
    recommended: false,
    departures: placeholderDepartures,
    distanceToHaram: "Distance au Haram à confirmer",
    hotelMakkah: { name: "Hôtel à La Mecque — à confirmer", stars: null, distance: "Distance à confirmer" },
    hotelMadinah: { name: "Hôtel à Médine — à confirmer", stars: null, distance: "Distance à confirmer" },
    inclusions: [
      "Programme personnalisé pour groupes",
      "Chambres familiales (placeholder)",
      "Transferts privés",
      "Encadrement complet du groupe",
    ],
    exclusions: commonExclusions,
    program: sampleProgram("Selon programme", "Selon programme"),
  },
];

export function getOfferBySlug(slug: string): Offer | undefined {
  return offers.find((o) => o.slug === slug);
}

export function getOffersByCategory(category: OfferCategory): Offer[] {
  return offers.filter((o) => o.category === category);
}

/** "12 000 MAD" or "—" when the price is not set yet. */
export function formatPrice(price: number | null): string {
  return price != null ? `${price.toLocaleString("fr-MA")} MAD` : "—";
}