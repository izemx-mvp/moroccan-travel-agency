import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/config/site";
import { cn } from "@/lib/utils";

interface WhatsAppButtonProps {
  message?: string;
  className?: string;
  label?: string;
}

/** Gold pill CTA opening WhatsApp with a pre-filled message. */
export function WhatsAppButton({ message, className, label = "WhatsApp" }: WhatsAppButtonProps) {
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[0_8px_24px_-8px] shadow-gold-deep/50 transition-all hover:-translate-y-0.5 hover:bg-gold-light active:translate-y-0",
        className
      )}
    >
      <MessageCircle className="size-4" strokeWidth={2.2} />
      {label}
    </a>
  );
}
