import { AnimatePresence, motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { useId, useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface TabItem<T extends string> {
  id: T;
  label: string;
  icon?: LucideIcon;
  content: ReactNode;
}

interface TabsProps<T extends string> {
  items: TabItem<T>[];
  /** Controlled value (e.g. synced with a search param). */
  value?: T;
  onValueChange?: (value: T) => void;
  tone?: "light" | "dark";
  className?: string;
  listClassName?: string;
  label: string;
}

/** Pill tabs with an animated gold indicator (layoutId) and cross-fading panels. */
export function Tabs<T extends string>({
  items,
  value,
  onValueChange,
  tone = "light",
  className,
  listClassName,
  label,
}: TabsProps<T>) {
  const first = items[0]?.id;
  const [internal, setInternal] = useState<T | undefined>(first);
  const active = value ?? internal;
  const baseId = useId();
  const dark = tone === "dark";

  const select = (id: T) => {
    setInternal(id);
    onValueChange?.(id);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = items[(index + (e.key === "ArrowRight" ? 1 : -1) + items.length) % items.length];
    if (next) {
      select(next.id);
      document.getElementById(`${baseId}-tab-${next.id}`)?.focus();
    }
  };

  const current = items.find((t) => t.id === active);

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label={label}
        className={cn(
          "scrollbar-none mx-auto flex w-full max-w-full gap-1 overflow-x-auto rounded-full border p-1.5 md:w-fit",
          dark ? "border-coal-border bg-night/80" : "border-ink/10 bg-cream",
          listClassName
        )}
      >
        {items.map((tab, i) => {
          const selected = tab.id === active;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              id={`${baseId}-tab-${tab.id}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(tab.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={cn(
                "relative inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition-colors",
                selected
                  ? "text-coal"
                  : dark
                    ? "text-cream/70 hover:text-gold"
                    : "text-ink/70 hover:text-ink"
              )}
            >
              {selected && (
                <motion.span
                  layoutId={`${baseId}-indicator`}
                  className="absolute inset-0 -z-0 rounded-full bg-primary shadow-[0_8px_20px_-8px] shadow-gold-deep/70"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              {Icon && <Icon className="relative size-4" aria-hidden="true" />}
              <span className="relative">{tab.label}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {current && (
          <motion.div
            key={current.id}
            id={`${baseId}-panel`}
            role="tabpanel"
            aria-labelledby={`${baseId}-tab-${current.id}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10"
          >
            {current.content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
