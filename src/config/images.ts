/**
 * Image registry. Photos live in src/assets/<name>.jpg and may not exist yet:
 * missing files are simply absent from the glob, so the build never fails and
 * <SmartImage> renders its gradient fallback instead.
 */
const files = import.meta.glob<string>("/src/assets/*.jpg", {
  eager: true,
  import: "default",
});

export const imageNames = [
  "hero-home",
  "cat-omra",
  "cat-hajj",
  "cat-international",
  "cat-maroc",
  "cat-hotels",
  "why-us-bg",
  "cta-band-bg",
  "hero-omra",
  "omra-essentielle",
  "omra-confort",
  "omra-ramadan",
  "omra-familles",
  "omra-medine",
  "omra-ambiance",
  "omra-included",
  "gallery-room",
  "gallery-buffet",
  "gallery-madinah-night",
  "hero-hajj",
  "hajj-arafat",
  "hajj-transport",
  "hajj-accompaniment",
  "hajj-notice-bg",
  "hero-voyages",
  "dest-istanbul",
  "dest-paris",
  "dest-andalousie",
  "dest-asie",
  "dest-dubai",
  "dest-merzouga",
  "dest-marrakech",
  "dest-combines",
  "hero-hotels",
  "hotel-makkah",
  "hotel-madinah",
  "hotel-europe",
  "hotel-maroc",
  "hero-about",
  "values-bg",
  "hero-contact",
  "blog-preparer-omra",
  "blog-documents",
  "blog-sante",
  "blog-valise",
] as const;

export type ImageName = (typeof imageNames)[number];

/** URL of src/assets/<name>.jpg, or undefined while the file has not been added. */
export function img(name: ImageName): string | undefined {
  return files[`/src/assets/${name}.jpg`];
}
