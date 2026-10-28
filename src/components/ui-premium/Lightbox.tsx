import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import type { ImageName } from "@/config/images";
import { cn } from "@/lib/utils";
import { useScrollLock } from "./Modal";
import { SmartImage } from "./SmartImage";

export interface GalleryImage {
  name: ImageName;
  alt: string;
}

interface LightboxGalleryProps {
  images: GalleryImage[];
  className?: string;
}

/** Mosaic gallery (first image large) opening a full-screen lightbox with keyboard navigation. */
export function LightboxGallery({ images, className }: LightboxGalleryProps) {
  const [index, setIndex] = useState<number | null>(null);
  const open = index !== null;
  useScrollLock(open);

  const go = useCallback(
    (delta: number) =>
      setIndex((i) => (i === null ? i : (i + delta + images.length) % images.length)),
    [images.length]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go]);

  const current = index !== null ? images[index] : undefined;

  return (
    <>
      <div className={cn("grid grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-2", className)}>
        {images.map((image, i) => (
          <button
            key={image.name}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Agrandir : ${image.alt}`}
            className={cn(
              "group relative overflow-hidden rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
              i === 0 ? "col-span-2 aspect-[16/10] md:row-span-2 md:aspect-auto" : "aspect-[4/3]"
            )}
          >
            <SmartImage
              name={image.name}
              alt={image.alt}
              className="absolute inset-0"
              imgClassName="transition-transform duration-700 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-coal/0 transition-colors duration-300 group-hover:bg-coal/30" />
            <span className="absolute right-3 top-3 inline-flex size-9 items-center justify-center rounded-full bg-coal/80 text-gold opacity-0 transition-opacity group-hover:opacity-100">
              <Expand className="size-4" aria-hidden="true" />
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {current && index !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Galerie photos"
            className="fixed inset-0 z-[90] flex flex-col bg-coal/95"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center justify-between px-4 py-4 text-cream md:px-8">
              <p className="text-sm text-cream/70">
                <span className="font-semibold text-gold">{index + 1}</span> / {images.length} — {current.alt}
              </p>
              <button
                type="button"
                autoFocus
                onClick={() => setIndex(null)}
                aria-label="Fermer la galerie"
                className="inline-flex size-11 items-center justify-center rounded-full border border-gold/30 text-cream transition-colors hover:border-gold hover:text-gold"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="relative flex flex-1 items-center justify-center px-4 pb-8 md:px-20">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={current.name}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3 }}
                  className="w-full max-w-5xl"
                >
                  <SmartImage
                    name={current.name}
                    alt={current.alt}
                    className="aspect-[16/10] w-full rounded-2xl"
                    imgClassName="object-contain bg-coal"
                  />
                </motion.div>
              </AnimatePresence>
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Photo précédente"
                    className="absolute left-2 top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-gold/30 bg-coal/60 text-cream transition-colors hover:border-gold hover:text-gold md:left-6"
                  >
                    <ChevronLeft className="size-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Photo suivante"
                    className="absolute right-2 top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-gold/30 bg-coal/60 text-cream transition-colors hover:border-gold hover:text-gold md:right-6"
                  >
                    <ChevronRight className="size-5" />
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
