import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Clock, MapPin, MessageCircle, Phone, Send, X } from "lucide-react";
import logoUrl from "@/assets/morocco-travel-agency-logo.png";
import { buttonClass, ButtonContent } from "@/components/ui-premium/Buttons";
import { SmartImage } from "@/components/ui-premium/SmartImage";
import { site, telLink } from "@/config/site";
import { offers } from "@/data/offers";
import {
  initialChatState,
  respond,
  welcomeReply,
  type BotBlock,
  type BotReply,
  type ChatLink,
  type ChatState,
} from "@/lib/chatbot";
import { cn } from "@/lib/utils";

type Message =
  | { id: number; from: "user"; text: string }
  | { id: number; from: "bot"; reply: BotReply };

interface ChatPanelProps {
  open: boolean;
  onClose: () => void;
}

const typingDelay = () => 600 + Math.round(Math.random() * 400);

function ChatLinkButton({ link, onNavigate }: { link: ChatLink; onNavigate: () => void }) {
  const cls = "inline-flex items-center gap-1.5 text-sm font-semibold text-gold transition-colors hover:text-gold-light";
  const content = (
    <>
      {link.label}
      <ArrowRight className="size-3.5" aria-hidden="true" />
    </>
  );
  if (link.to === "/voyages") {
    return (
      <Link to="/voyages" search={link.type ? { type: link.type } : {}} onClick={onNavigate} className={cls}>
        {content}
      </Link>
    );
  }
  return (
    <Link to={link.to} onClick={onNavigate} className={cls}>
      {content}
    </Link>
  );
}

function Block({ block, onNavigate }: { block: BotBlock; onNavigate: () => void }) {
  switch (block.kind) {
    case "text":
      return <p className="leading-relaxed">{block.text}</p>;
    case "list":
      return (
        <ul className="space-y-1.5">
          {block.items.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <Check className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      );
    case "links":
      return (
        <div className="flex flex-col items-start gap-1.5">
          {block.links.map((link) => (
            <ChatLinkButton key={link.label} link={link} onNavigate={onNavigate} />
          ))}
        </div>
      );
    case "offers":
      return (
        <div className="scrollbar-none -mx-1 flex snap-x gap-3 overflow-x-auto px-1 pb-1">
          {block.slugs.map((slug) => {
            const offer = offers.find((o) => o.slug === slug);
            if (!offer) return null;
            return (
              <Link
                key={slug}
                to="/omra/$slug"
                params={{ slug }}
                onClick={onNavigate}
                className="group w-44 shrink-0 snap-start overflow-hidden rounded-xl border border-coal-border bg-coal transition-colors hover:border-gold/60"
              >
                <SmartImage
                  name={offer.image}
                  alt={offer.title}
                  showLabel={false}
                  className="aspect-[4/3] w-full"
                  imgClassName="transition-transform duration-700 group-hover:scale-110"
                />
                <span className="block p-3">
                  <span className="block font-display text-base font-semibold leading-tight text-cream">{offer.title}</span>
                  <span className="mt-1 flex items-center gap-1 text-[11px] text-cream/60">
                    <Clock className="size-3 text-gold" aria-hidden="true" />
                    {offer.duration.replace("Durée placeholder — ", "")}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      );
    case "agencies":
      return (
        <ul className="space-y-2">
          {site.branches.map((b) => (
            <li key={b.id} className="rounded-xl border border-coal-border bg-coal/70 p-3">
              <p className="font-semibold text-cream">{b.name}</p>
              <p className="mt-1 flex items-start gap-1.5 text-xs text-cream/65">
                <MapPin className="mt-0.5 size-3 shrink-0 text-gold" aria-hidden="true" />
                {b.address}
              </p>
              <p className="mt-0.5 flex items-center gap-1.5 text-xs text-cream/65">
                <Clock className="size-3 shrink-0 text-gold" aria-hidden="true" />
                {b.hours}
              </p>
              <a href={telLink(b.phone)} className="mt-0.5 flex items-center gap-1.5 text-xs text-gold hover:text-gold-light">
                <Phone className="size-3 shrink-0" aria-hidden="true" />
                {b.phone}
              </a>
            </li>
          ))}
        </ul>
      );
    case "actions":
      return (
        <div className="flex flex-wrap gap-2">
          {block.actions.map((a) => (
            <a
              key={a.label}
              href={a.href}
              {...(a.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className={buttonClass(a.icon === "whatsapp" ? "gold" : "outline-dark", "sm")}
            >
              <ButtonContent icon={a.icon === "whatsapp" ? MessageCircle : Phone}>{a.label}</ButtonContent>
            </a>
          ))}
        </div>
      );
    case "summary":
      return (
        <div className="rounded-xl border border-gold/30 bg-coal/80 p-4">
          <dl className="space-y-1.5 text-sm">
            {(
              [
                ["Nom", block.lead.name],
                ["Téléphone", block.lead.phone],
                ["Offre", block.lead.offer],
                ["Période", block.lead.period],
              ] as const
            ).map(([k, v]) => (
              <div key={k} className="flex justify-between gap-3">
                <dt className="text-cream/55">{k}</dt>
                <dd className="text-right font-medium text-cream">{v}</dd>
              </div>
            ))}
          </dl>
          <a
            href={block.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass("gold", "sm", "mt-4 w-full")}
          >
            <ButtonContent icon={MessageCircle} arrow>
              Envoyer sur WhatsApp
            </ButtonContent>
          </a>
        </div>
      );
  }
}

/** Static chatbot panel (rule-based, no API). Full-screen on mobile. */
export function ChatPanel({ open, onClose }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatState, setChatState] = useState<ChatState>(initialChatState);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const nextId = useRef(1);
  const timers = useRef<number[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const botSay = (reply: BotReply) => {
    setTyping(true);
    const t = window.setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { id: nextId.current++, from: "bot", reply }]);
    }, typingDelay());
    timers.current.push(t);
  };

  // Welcome message on first opening.
  useEffect(() => {
    if (open && messages.length === 0 && !typing) botSay(welcomeReply);
    if (open) window.setTimeout(() => inputRef.current?.focus(), 350);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const send = (value: string, label?: string) => {
    if (typing || !value.trim()) return;
    const shown = label ?? value;
    setMessages((m) => [...m, { id: nextId.current++, from: "user", text: shown }]);
    const { state, reply } = respond(chatState, value);
    setChatState(state);
    botSay(reply);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    send(input);
    setInput("");
  };

  const last = messages[messages.length - 1];
  const chips = !typing && last?.from === "bot" ? last.reply.chips : [];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="false"
          aria-label="Assistant Morocco Travel"
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.97 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[75] flex flex-col overflow-hidden bg-night text-cream sm:inset-auto sm:bottom-6 sm:right-6 sm:h-[min(640px,calc(100svh-3rem))] sm:w-[400px] sm:rounded-2xl sm:border sm:border-gold/25 sm:shadow-[0_30px_80px_-20px] sm:shadow-black/70"
        >
          {/* Glass header */}
          <div className="glass-dark relative z-10 flex items-center gap-3 px-4 py-3">
            <img src={logoUrl} alt="" className="size-10 rounded-full object-cover ring-1 ring-gold/40" />
            <div className="min-w-0 flex-1">
              <p className="font-display text-lg font-semibold leading-tight">Assistant Morocco Travel</p>
              <p className="flex items-center gap-1.5 text-xs text-cream/65">
                <span className="relative flex size-2">
                  <span className="pulse-ring absolute inset-0 rounded-full bg-emerald-400" />
                  <span className="relative size-2 rounded-full bg-emerald-400" />
                </span>
                En ligne
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Fermer l'assistant"
              className="inline-flex size-10 items-center justify-center rounded-full border border-gold/30 text-cream transition-colors hover:border-gold hover:text-gold"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="relative flex-1 space-y-3 overflow-y-auto px-4 py-5"
            aria-live="polite"
          >
            <div className="pattern-geo pointer-events-none absolute inset-0 opacity-[0.03]" />
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={cn("relative flex", m.from === "user" ? "justify-end" : "justify-start")}
              >
                {m.from === "user" ? (
                  <p className="max-w-[80%] rounded-2xl rounded-br-md bg-primary px-4 py-2.5 text-sm font-medium text-coal">
                    {m.text}
                  </p>
                ) : (
                  <div className="max-w-[92%] space-y-3 rounded-2xl rounded-bl-md border border-coal-border bg-ink px-4 py-3 text-sm text-cream/90">
                    {m.reply.blocks.map((block, i) => (
                      <Block key={i} block={block} onNavigate={onClose} />
                    ))}
                  </div>
                )}
              </motion.div>
            ))}

            {typing && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative flex w-fit items-center gap-1 rounded-2xl rounded-bl-md border border-coal-border bg-ink px-4 py-3.5"
                aria-label="L'assistant écrit…"
              >
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="typing-dot size-1.5 rounded-full bg-gold"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </motion.div>
            )}

            {chips.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="relative flex flex-wrap gap-2 pt-1"
              >
                {chips.map((chip) => (
                  <button
                    key={chip.value + chip.label}
                    type="button"
                    onClick={() => send(chip.value, chip.label)}
                    className="rounded-full border border-gold/40 px-3.5 py-1.5 text-xs font-medium text-gold transition-colors hover:bg-gold hover:text-coal"
                  >
                    {chip.label}
                  </button>
                ))}
              </motion.div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-coal-border bg-coal/80 p-3">
            <label htmlFor="chat-input" className="sr-only">
              Votre message
            </label>
            <input
              ref={inputRef}
              id="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Écrivez votre message…"
              autoComplete="off"
              className="min-w-0 flex-1 rounded-full border border-coal-border bg-night px-4 py-2.5 text-sm text-cream outline-none placeholder:text-cream/40 focus:border-gold"
            />
            <button
              type="submit"
              disabled={typing || !input.trim()}
              aria-label="Envoyer"
              className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-coal transition-all hover:bg-gold-light disabled:opacity-50"
            >
              <Send className="size-4" />
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
