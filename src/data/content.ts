import {
  BadgeCheck,
  BookOpenCheck,
  Building2,
  CalendarCheck,
  FileCheck2,
  HeartHandshake,
  Hotel,
  MessageCircle,
  Plane,
  ShieldCheck,
  Stamp,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { ImageName } from "@/config/images";

/** Label used to flag every piece of sample copy the agency must replace. */
export const SAMPLE_LABEL = "CONTENU EXEMPLE À REMPLACER";

export type VoyageType = "internationaux" | "maroc" | "combines" | "a-la-carte";

export const voyageTypeLabels: Record<VoyageType, string> = {
  internationaux: "Internationaux",
  maroc: "Maroc",
  combines: "Combinés",
  "a-la-carte": "À la carte",
};

export interface Destination {
  name: string;
  region: string;
  image: ImageName;
  type: "internationaux" | "maroc";
  duration: string;
  highlight: string;
}

/** Only destinations that have a real photo in src/assets. */
export const destinations: Destination[] = [
  {
    name: "Europe",
    region: "Villes & patrimoine",
    image: "cat-international",
    type: "internationaux",
    duration: "Durée à confirmer",
    highlight: "Istanbul, Paris, Andalousie… vieilles villes, monuments et art de vivre",
  },
  {
    name: "Séjours en hôtel",
    region: "Europe & monde",
    image: "hotel-europe",
    type: "internationaux",
    duration: "Durée à confirmer",
    highlight: "Hôtels sélectionnés au cœur des plus belles villes",
  },
  {
    name: "Long-courriers",
    region: "Destinations au choix",
    image: "hero-voyages",
    type: "internationaux",
    duration: "Durée à confirmer",
    highlight: "Émirats, Asie… nous construisons le voyage selon vos envies",
  },
  {
    name: "Merzouga",
    region: "Sahara marocain",
    image: "dest-merzouga",
    type: "maroc",
    duration: "Durée à confirmer",
    highlight: "Nuit sous les étoiles au cœur des dunes de l'Erg Chebbi",
  },
  {
    name: "Marrakech",
    region: "Maroc",
    image: "dest-marrakech",
    type: "maroc",
    duration: "Durée à confirmer",
    highlight: "Médina, jardins et place Jemaa el-Fna",
  },
  {
    name: "Circuits du Royaume",
    region: "Maroc",
    image: "cat-maroc",
    type: "maroc",
    duration: "Durée à confirmer",
    highlight: "Villes impériales, montagnes et côtes en un seul voyage",
  },
];

export interface Testimonial {
  initials: string;
  name: string;
  city: string;
  trip: string;
  rating: number;
  text: string;
}

/** CONTENU EXEMPLE À REMPLACER — replace with real, consented client reviews. */
export const testimonials: Testimonial[] = [
  {
    initials: "A.B.",
    name: "Client A.B.",
    city: "Tanger",
    trip: "Omra",
    rating: 5,
    text: "Exemple d'avis : organisation claire, accompagnateur disponible et hôtels conformes au programme annoncé.",
  },
  {
    initials: "S.K.",
    name: "Cliente S.K.",
    city: "Tétouan",
    trip: "Omra Familles",
    rating: 5,
    text: "Exemple d'avis : voyage en famille très bien préparé, nous avons été suivis sur WhatsApp du début à la fin.",
  },
  {
    initials: "M.E.",
    name: "Client M.E.",
    city: "Tanger",
    trip: "Voyage international",
    rating: 5,
    text: "Exemple d'avis : équipe réactive, conseils utiles avant le départ et programme respecté.",
  },
  {
    initials: "N.A.",
    name: "Cliente N.A.",
    city: "Tétouan",
    trip: "Circuit Maroc",
    rating: 5,
    text: "Exemple d'avis : circuit dans le désert inoubliable, logistique impeccable.",
  },
];

export interface IconItem {
  Icon: LucideIcon;
  title: string;
  text: string;
}

export const trustItems: { Icon: LucideIcon; label: string }[] = [
  { Icon: BadgeCheck, label: "Agrément — n° à compléter" },
  { Icon: Building2, label: "Hôtels proches du Haram" },
  { Icon: BookOpenCheck, label: "Encadrement religieux" },
  { Icon: Stamp, label: "Visa inclus" },
  { Icon: MessageCircle, label: "Suivi WhatsApp 7j/7" },
];

export const whyUs: IconItem[] = [
  {
    Icon: CalendarCheck,
    title: "Plus de 25 ans d'expérience",
    text: "Une agence installée de longue date à Tanger et Tétouan, spécialiste du Hajj et de la Omra.",
  },
  {
    Icon: Users,
    title: "Accompagnement humain",
    text: "Un conseiller vous suit avant, pendant et après votre voyage.",
  },
  {
    Icon: Hotel,
    title: "Hôtels soigneusement choisis",
    text: "Des établissements sélectionnés pour leur emplacement et leur confort.",
  },
  {
    Icon: FileCheck2,
    title: "Démarches simplifiées",
    text: "Nous vous guidons pour le visa et la préparation de votre dossier.",
  },
  {
    Icon: ShieldCheck,
    title: "Transparence",
    text: "Un programme clair : ce qui est inclus, ce qui ne l'est pas, sans surprise.",
  },
  {
    Icon: HeartHandshake,
    title: "Proximité",
    text: "4 agences pour vous recevoir et répondre à vos questions de vive voix.",
  },
];

export const howItWorks: { title: string; text: string }[] = [
  { title: "Choisir", text: "Parcourez nos programmes ou décrivez-nous votre projet." },
  { title: "Échanger sur WhatsApp", text: "Un conseiller répond à vos questions et ajuste l'offre." },
  { title: "Réserver", text: "Validation du programme, dossier et paiement en agence." },
  { title: "Partir sereinement", text: "Nous vous accompagnons jusqu'au retour." },
];

export const omraIncluded: IconItem[] = [
  { Icon: Plane, title: "Vols aller-retour", text: "Au départ du Maroc, selon le programme." },
  { Icon: Stamp, title: "Visa", text: "Accompagnement dans les démarches de visa." },
  { Icon: Hotel, title: "Hébergement", text: "Hôtels à La Mecque et à Médine." },
  { Icon: Building2, title: "Transferts", text: "Déplacements organisés entre aéroports et hôtels." },
  { Icon: BookOpenCheck, title: "Encadrement", text: "Accompagnateur et encadrement religieux." },
  { Icon: MessageCircle, title: "Suivi WhatsApp", text: "Une équipe joignable pendant tout le séjour." },
];

export const documentsChecklist: string[] = [
  "Passeport valide (validité à vérifier selon les exigences en vigueur)",
  "Photos d'identité récentes",
  "Copie de la carte nationale (CNIE)",
  "Carnet de vaccination à jour (selon exigences en vigueur)",
  "Documents complémentaires demandés par l'agence",
];

export interface Faq {
  q: string;
  a: string;
}

export const omraFaq: Faq[] = [
  {
    q: "Quels documents faut-il pour la Omra ?",
    a: "En général un passeport valide, des photos d'identité et une copie de la CNIE. La liste exacte dépend des exigences en vigueur : votre conseiller vous la confirme lors de l'inscription.",
  },
  {
    q: "Le visa est-il inclus ?",
    a: "Nous vous accompagnons dans les démarches de visa. Les conditions précises sont indiquées dans chaque programme.",
  },
  {
    q: "Quelle est la distance entre l'hôtel et le Haram ?",
    a: "Elle dépend de la formule choisie. Les distances exactes seront précisées pour chaque programme.",
  },
  {
    q: "Peut-on choisir son type de chambre ?",
    a: "Oui : quadruple, triple ou double selon les disponibilités. Le tarif varie selon le type de chambre.",
  },
  {
    q: "Proposez-vous des programmes pour les familles et les groupes ?",
    a: "Oui, la formule Familles & Groupes s'adapte à votre groupe : dates, chambres et encadrement.",
  },
  {
    q: "Un accompagnateur est-il présent pendant le voyage ?",
    a: "Oui, un accompagnateur suit le groupe et notre équipe reste joignable sur WhatsApp.",
  },
  {
    q: "Comment réserver ?",
    a: "Demandez un devis en ligne ou sur WhatsApp, puis finalisez votre inscription dans l'une de nos 4 agences.",
  },
  {
    q: "Quand faut-il réserver ?",
    a: "Le plus tôt possible, en particulier pour la période du Ramadan où les places sont limitées.",
  },
];