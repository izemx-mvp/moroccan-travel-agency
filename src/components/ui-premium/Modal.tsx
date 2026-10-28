import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useId, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

/** Locks page scroll while an overlay is open. */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [locked]);
}

/** Accessible dialog: Escape to close, scroll lock, focus moved inside and restored on close. */
export function Modal({ open, onClose, title, description, children, className }: ModalProps) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  // Kept in a ref so an inline onClose does not re-run the focus effect on every render.
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  useScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseRef.current();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      previouslyFocused?.focus();
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Fermer"
            tabIndex={-1}
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-coal/80"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "relative max-h-[92svh] w-full max-w-2xl overflow-y-auto rounded-t-2xl border border-gold/20 bg-cream p-6 shadow-2xl sm:rounded-2xl md:p-8",
              className
            )}
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2 id={titleId} className="font-display text-3xl font-semibold text-ink">
                  {title}
                </h2>
                {description && <p className="mt-1.5 text-sm text-ink/65">{description}</p>}
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Fermer la fenêtre"
                className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-gold-deep hover:text-gold-deep"
              >
                <X className="size-5" />
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
