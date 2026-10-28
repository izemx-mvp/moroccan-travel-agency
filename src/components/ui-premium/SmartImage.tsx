import { useEffect, useRef, useState } from "react";
import { ImageOff } from "lucide-react";
import { img, type ImageName } from "@/config/images";
import { cn } from "@/lib/utils";

interface SmartImageProps {
  name: ImageName;
  alt: string;
  /** Classes for the wrapper (size, radius…). */
  className?: string;
  /** Classes for the <img> itself (object-position…). */
  imgClassName?: string;
  /** Above-the-fold images: eager load + high fetch priority. */
  priority?: boolean;
  /** Slow zoom/pan (hero images). Disabled with prefers-reduced-motion. */
  kenBurns?: boolean;
  /** Show the expected file name on the fallback. */
  showLabel?: boolean;
  sizes?: string;
}

/**
 * Image from src/assets/<name>.jpg with lazy loading and a fade-in.
 * While the file is missing it renders a gold → black gradient labelled with the expected file name.
 */
export function SmartImage({
  name,
  alt,
  className,
  imgClassName,
  priority = false,
  kenBurns = false,
  showLabel = true,
  sizes,
}: SmartImageProps) {
  const src = img(name);
  const ref = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  // SSR: the image can finish loading before hydration, so onLoad never fires.
  useEffect(() => {
    const el = ref.current;
    if (el?.complete && el.naturalWidth > 0) setLoaded(true);
  }, [src]);

  return (
    <div className={cn("img-fallback relative overflow-hidden", className)}>
      {src ? (
        <img
          ref={ref}
          src={src}
          alt={alt}
          sizes={sizes}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          onLoad={() => setLoaded(true)}
          className={cn(
            "absolute inset-0 size-full object-cover transition-opacity duration-700 ease-out",
            loaded ? "opacity-100" : "opacity-0",
            kenBurns && "kenburns",
            imgClassName
          )}
        />
      ) : (
        <>
          <span role="img" aria-label={alt} className="absolute inset-0" />
          {showLabel && (
            <span className="pointer-events-none absolute bottom-3 left-3 inline-flex max-w-[calc(100%-1.5rem)] items-center gap-1.5 rounded-full bg-coal/70 px-2.5 py-1 text-[10px] font-medium tracking-wide text-cream/85">
              <ImageOff className="size-3 shrink-0 text-gold" aria-hidden="true" />
              <span className="truncate">{name}.jpg</span>
            </span>
          )}
        </>
      )}
    </div>
  );
}
