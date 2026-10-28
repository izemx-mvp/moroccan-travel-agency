import logoAsset from "@/assets/morocco-travel-logo.png.asset.json";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  /** Show the wordmark next to the mark. */
  showWordmark?: boolean;
  /** "dark" = on dark surfaces (gold/cream mark), "light" = on light surfaces. */
  tone?: "dark" | "light";
}

export function Logo({ className, showWordmark = true, tone = "dark" }: LogoProps) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <img
        src={logoAsset.url}
        alt={site.name}
        className={cn(
          "h-10 w-10 shrink-0 rounded-full object-cover ring-1 md:h-11 md:w-11",
          tone === "dark" ? "ring-gold/40" : "ring-ink/15"
        )}
      />
      {showWordmark && (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "font-display text-lg font-semibold tracking-wide md:text-xl",
              tone === "dark" ? "text-cream" : "text-ink"
            )}
          >
            Morocco Travel
          </span>
          <span
            className={cn(
              "text-[10px] font-medium uppercase tracking-[0.28em]",
              tone === "dark" ? "text-gold" : "text-gold-deep"
            )}
          >
            Discover the world!
          </span>
        </span>
      )}
    </span>
  );
}
