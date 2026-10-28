export type BranchCity = "Tanger" | "Tétouan";

export interface Branch {
  id: string;
  /** Short label used in filters and lists. */
  label: string;
  city: BranchCity;
  name: string;
  address: string;
  phone: string;
  whatsappNumber: string;
  hours: string;
}

export const site = {
  name: "Morocco Travel Agency",
  tagline: "Discover the World!",
  specialty: "Spécialiste Hajj & Omra depuis plus de 25 ans",
  // Placeholder contact details — to replace with the real ones.
  phone: "+212 6 00 00 00 00",
  whatsappNumber: "212600000000",
  email: "contact@moroccotravel.ma",
  addressLine: "Tanger & Tétouan, Maroc",
  hours: "Horaires à confirmer",
  instagramHandle: "@moroccotravelagency",
  socials: {
    instagram: "#",
    facebook: "#",
    tiktok: "#",
  },
  stats: {
    years: 25,
    agencies: 4,
    followers: 50,
    /** Unknown yet — rendered as "—" until the agency provides it. */
    pilgrims: null as number | null,
  },
  branches: [
    {
      id: "tanger-1",
      label: "Tanger 1",
      city: "Tanger",
      name: "Agence Tanger — Centre-ville",
      address: "Adresse placeholder, Tanger, Maroc",
      phone: "+212 5 39 00 00 00",
      whatsappNumber: "212600000000",
      hours: "Horaires à confirmer",
    },
    {
      id: "tanger-2",
      label: "Tanger 2",
      city: "Tanger",
      name: "Agence Tanger — Quartier",
      address: "Adresse placeholder, Tanger, Maroc",
      phone: "+212 5 39 00 00 01",
      whatsappNumber: "212600000000",
      hours: "Horaires à confirmer",
    },
    {
      id: "tetouan-1",
      label: "Tétouan 1",
      city: "Tétouan",
      name: "Agence Tétouan — Centre-ville",
      address: "Adresse placeholder, Tétouan, Maroc",
      phone: "+212 5 39 00 00 02",
      whatsappNumber: "212600000000",
      hours: "Horaires à confirmer",
    },
    {
      id: "tetouan-2",
      label: "Tétouan 2",
      city: "Tétouan",
      name: "Agence Tétouan — Quartier",
      address: "Adresse placeholder, Tétouan, Maroc",
      phone: "+212 5 39 00 00 03",
      whatsappNumber: "212600000000",
      hours: "Horaires à confirmer",
    },
  ] satisfies readonly Branch[],
} as const;

/** Builds a wa.me link with a pre-filled message. */
export function whatsappLink(message?: string, number: string = site.whatsappNumber): string {
  const text = encodeURIComponent(
    message ?? "Bonjour, je souhaite avoir plus d'informations sur vos offres de voyage."
  );
  return `https://wa.me/${number}?text=${text}`;
}

/** tel: link from a display phone number. */
export function telLink(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

/** Google Maps search link for a branch (no API involved). */
export function mapsLink(branch: Pick<Branch, "name" | "address">): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${branch.name} ${branch.address}`
  )}`;
}
