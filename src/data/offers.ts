export type OfferCategory = "omra" | "hajj" | "international" | "maroc" | "hotel";

export interface Offer {
  slug: string;
  category: OfferCategory;
  title: string;
  /** Placeholder durations — to replace with the real ones. */
  duration: string;
  /** Placeholder price: null renders as "—". No invented prices. */
  priceFrom: number | null;
  /** null = gradient placeholder image */
  image: string | null;
  inclusions: string[];
}

export const categoryLabels: Record<OfferCategory, string> = {
  omra: "Omra",
  hajj: "Hajj",
  international: "Voyage international",
  maroc: "Circuit Maroc",
  hotel: "Hôtel",
};

export const offers: Offer[] = [
  {
    slug: "omra-essentielle",
    category: "omra",
    title: "Omra Essentielle",
    duration: "Durée placeholder — 10 jours",
    priceFrom: null,
    image: null,
    inclusions: [
      "Vol aller-retour au départ de Tanger",
      "Hôtels à La Mecque et Médine (placeholder)",
      "Transferts internes",
      "Accompagnateur dédié",
    ],
  },
  {
    slug: "omra-confort",
    category: "omra",
    title: "Omra Confort",
    duration: "Durée placeholder — 14 jours",
    priceFrom: null,
    image: null,
    inclusions: [
      "Vol aller-retour au départ de Tanger",
      "Hôtels proches du Haram (placeholder)",
      "Transferts internes",
      "Visites guidées des lieux saints",
    ],
  },
  {
    slug: "omra-ramadan",
    category: "omra",
    title: "Omra Ramadan",
    duration: "Durée placeholder — 21 jours",
    priceFrom: null,
    image: null,
    inclusions: [
      "Vol aller-retour au départ de Tanger",
      "Séjour pendant le Ramadan (placeholder)",
      "Transferts internes",
      "Assistance francophone et arabophone",
    ],
  },
  {
    slug: "omra-familles",
    category: "omra",
    title: "Omra Familles & Groupes",
    duration: "Durée placeholder — sur mesure",
    priceFrom: null,
    image: null,
    inclusions: [
      "Programme personnalisé pour groupes",
      "Chambres familiales (placeholder)",
      "Transferts privés",
      "Encadrement complet du groupe",
    ],
  },
];

export function getOfferBySlug(slug: string): Offer | undefined {
  return offers.find((o) => o.slug === slug);
}

export function getOffersByCategory(category: OfferCategory): Offer[] {
  return offers.filter((o) => o.category === category);
}
