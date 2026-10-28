export const site = {
  name: "Morocco Travel Agency",
  tagline: "Discover the World!",
  specialty: "Spécialiste Hajj & Omra depuis plus de 25 ans",
  // Placeholder contact details — to replace with the real ones.
  phone: "+212 6 00 00 00 00",
  whatsappNumber: "212600000000",
  email: "contact@moroccotravel.ma",
  addressLine: "Tanger & Tétouan, Maroc",
  socials: {
    instagram: "#",
    facebook: "#",
    tiktok: "#",
  },
  branches: [
    {
      city: "Tanger",
      name: "Agence Tanger — Centre-ville",
      address: "Adresse placeholder, Tanger, Maroc",
      phone: "+212 5 39 00 00 00",
    },
    {
      city: "Tanger",
      name: "Agence Tanger — Quartier",
      address: "Adresse placeholder, Tanger, Maroc",
      phone: "+212 5 39 00 00 01",
    },
    {
      city: "Tétouan",
      name: "Agence Tétouan — Centre-ville",
      address: "Adresse placeholder, Tétouan, Maroc",
      phone: "+212 5 39 00 00 02",
    },
    {
      city: "Tétouan",
      name: "Agence Tétouan — Quartier",
      address: "Adresse placeholder, Tétouan, Maroc",
      phone: "+212 5 39 00 00 03",
    },
  ],
} as const;

/** Builds a wa.me link with a pre-filled message. */
export function whatsappLink(message?: string): string {
  const text = encodeURIComponent(
    message ?? "Bonjour, je souhaite avoir plus d'informations sur vos offres de voyage."
  );
  return `https://wa.me/${site.whatsappNumber}?text=${text}`;
}
