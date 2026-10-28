import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  q: string;
  a: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  tone?: "light" | "dark";
  className?: string;
  /** Index opened by default (-1 = all closed). */
  defaultOpen?: number;
}

/** Single-open accordion with animated height. */
export function Accordion({ items, tone = "light", className, defaultOpen = 0 }: AccordionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const baseId = useId();
  const dark = tone === "dark";

  return (
    <div className={cn("divide-y", dark ? "divide-coal-border" : "divide-ink/10", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;
        return (
          <div key={item.q}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className={cn(
                  "group flex w-full items-center justify-between gap-6 py-5 text-left font-display text-xl font-semibold transition-colors md:text-2xl",
                  dark ? "text-cream hover:text-gold" : "text-ink hover:text-gold-deep"
                )}
              >
                {item.q}
                <span
                  className={cn(
                    "inline-flex size-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                    dark ? "border-gold/40 text-gold" : "border-gold-deep/40 text-gold-deep",
                    isOpen && "rotate-45 bg-gold/15"
                  )}
                >
                  <Plus className="size-4" aria-hidden="true" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div
                    className={cn(
                      "max-w-3xl pb-6 text-[15px] leading-relaxed",
                      dark ? "text-cream/70" : "text-ink/70"
                    )}
                  >
                    {item.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
