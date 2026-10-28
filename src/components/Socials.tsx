import { Facebook, Instagram, Music2 } from "lucide-react";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";

const socials = [
  { label: "Instagram", href: site.socials.instagram, Icon: Instagram },
  { label: "Facebook", href: site.socials.facebook, Icon: Facebook },
  // Lucide has no TikTok mark: Music2 stands in for it.
  { label: "TikTok", href: site.socials.tiktok, Icon: Music2 },
] as const;

interface SocialsProps {
  className?: string;
  size?: "sm" | "md";
}

/** Social links (placeholder URLs from site.ts). */
export function Socials({ className, size = "md" }: SocialsProps) {
  return (
    <ul className={cn("flex items-center gap-2.5", className)}>
      {socials.map(({ label, href, Icon }) => (
        <li key={label}>
          <a
            href={href}
            aria-label={label}
            {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className={cn(
              "inline-flex items-center justify-center rounded-full border border-gold/30 text-cream/75 transition-all hover:-translate-y-0.5 hover:border-gold hover:text-gold",
              size === "sm" ? "size-7" : "size-10"
            )}
          >
            <Icon className={size === "sm" ? "size-3.5" : "size-4"} aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}
