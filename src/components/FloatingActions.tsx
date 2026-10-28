import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, MessagesSquare } from "lucide-react";
import { useRouterState } from "@tanstack/react-router";
import { ChatPanel } from "@/components/chatbot/ChatPanel";
import { whatsappLink } from "@/config/site";
import { cn } from "@/lib/utils";

/** Bottom-right stack: WhatsApp button above the chatbot launcher. */
export function FloatingActions() {
  const [visible, setVisible] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [tooltip, setTooltip] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  // Omra detail pages have a fixed booking bar at the bottom on mobile.
  const raised = pathname.startsWith("/omra/");

  useEffect(() => {
    const show = window.setTimeout(() => setVisible(true), 800);
    const tip = window.setTimeout(() => setTooltip(true), 2600);
    const hideTip = window.setTimeout(() => setTooltip(false), 9000);
    return () => [show, tip, hideTip].forEach((t) => window.clearTimeout(t));
  }, []);

  const openChat = () => {
    setTooltip(false);
    setChatOpen(true);
  };
  const closeChat = useCallback(() => setChatOpen(false), []);

  return (
    <>
      <AnimatePresence>
        {visible && !chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className={cn(
              "fixed right-4 z-50 flex flex-col items-end gap-3 md:right-6",
              raised ? "bottom-24 lg:bottom-6" : "bottom-4 md:bottom-6"
            )}
          >
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Discuter sur WhatsApp"
              className="inline-flex size-12 items-center justify-center rounded-full border border-gold/50 bg-coal text-gold shadow-[0_10px_30px_-8px] shadow-black/60 transition-all hover:-translate-y-0.5 hover:border-gold hover:bg-night"
            >
              <MessageCircle className="size-5" strokeWidth={2.1} />
            </a>

            <div className="relative flex items-center">
              <AnimatePresence>
                {tooltip && (
                  <motion.span
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    className="absolute right-full mr-3 whitespace-nowrap rounded-full border border-gold/30 bg-coal px-4 py-2 text-xs font-medium text-cream shadow-xl"
                  >
                    Une question ? Je suis là
                  </motion.span>
                )}
              </AnimatePresence>
              <button
                type="button"
                onClick={openChat}
                aria-label="Ouvrir l'assistant — Une question ? Je suis là"
                aria-haspopup="dialog"
                className="relative inline-flex size-14 items-center justify-center rounded-full bg-primary text-coal shadow-[0_12px_32px_-8px] shadow-gold-deep/70 transition-transform hover:scale-105"
              >
                <span aria-hidden="true" className="pulse-ring absolute inset-0 rounded-full border-2 border-gold" />
                <MessagesSquare className="relative size-6" strokeWidth={2} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ChatPanel open={chatOpen} onClose={closeChat} />
    </>
  );
}
