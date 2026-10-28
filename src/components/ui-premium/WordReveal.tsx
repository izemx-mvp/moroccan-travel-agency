import { motion, useReducedMotion } from "framer-motion";
import type { ElementType } from "react";
import { cn } from "@/lib/utils";

interface WordRevealProps {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  /** Animate when scrolled into view instead of on mount. */
  inView?: boolean;
}

/** Title revealed word by word (fade + rise). Static with prefers-reduced-motion. */
export function WordReveal({ text, as: Tag = "h1", className, delay = 0, inView = false }: WordRevealProps) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  if (reduced) return <Tag className={className}>{text}</Tag>;

  const trigger = inView
    ? { whileInView: "show", viewport: { once: true, margin: "-40px" } }
    : { animate: "show" };

  return (
    <Tag className={cn(className)} aria-label={text}>
      <motion.span
        aria-hidden="true"
        initial="hidden"
        {...trigger}
        transition={{ staggerChildren: 0.07, delayChildren: delay }}
        className="inline"
      >
        {words.map((word, i) => (
          <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: "105%", opacity: 0 },
                show: { y: "0%", opacity: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
              }}
            >
              {word}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
