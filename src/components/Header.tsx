import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Mail, Menu, MessageCircle, Phone, X } from "lucide-react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { Socials } from "@/components/Socials";
import { GoldButton } from "@/components/ui-premium/Buttons";
import { useScrollLock } from "@/components/ui-premium/Modal";
import { SmartImage } from "@/components/ui-premium/SmartImage";
import type { ImageName } from "@/config/images";
import { site, telLink, whatsappLink } from "@/config/site";
import type { VoyageType } from "@/data/content";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Accueil", to: "/" },
  { label: "Omra", to: "/omra" },
  { label: "Hajj", to: "/hajj" },
  { label: "Voyages", to: "/voyages" },
  { label: "Hôtels", to: "/hotels" },
  { label: "Nos agences", to: "/agences" },
  { label: "À propos", to: "/a-propos" },
  { label: "Contact", to: "/contact" },
] as const;

const megaItems: { type: VoyageType; title: string; text: string; image: ImageName }[] = [
  { type: "internationaux", title: "Internationaux", text: "Istanbul, Dubaï, Andalousie…", image: "cat-international" },
  { type: "maroc", title: "Maroc", text: "Désert, villes impériales, côtes", image: "cat-maroc" },
  { type: "combines", title: "Combinés", text: "Deux destinations, un voyage", image: "dest-combines" },
  { type: "a-la-carte", title: "À la carte", text: "Votre voyage sur mesure", image: "hero-voyages" },
];

function isActive(pathname: string, to: string) {
  return to === "/" ? pathname === "/" : pathname === to || pathname.startsWith(`${to}/`);
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const closeTimer = useRef<number | undefined>(undefined);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on navigation.
  useEffect(() => {
    setMenuOpen(false);
    setMegaOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!megaOpen && !menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMegaOpen(false);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [megaOpen, menuOpen]);

  useScrollLock(menuOpen);

  const openMega = () => {
    window.clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const scheduleCloseMega = () => {
    closeTimer.current = window.setTimeout(() => setMegaOpen(false), 140);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        {/* Top bar — desktop only, folds away on scroll */}
        <div
          className={cn(
            "hidden overflow-hidden bg-coal text-gold transition-all duration-500 md:block",
            scrolled ? "max-h-0 opacity-0" : "max-h-12 opacity-100"
          )}
        >
          <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-8 text-xs">
            <p className="tracking-wide">4 agences à Tanger &amp; Tétouan · Plus de 25 ans d'expérience</p>
            <div className="flex items-center gap-5">
              <a href={telLink(site.phone)} className="flex items-center gap-1.5 transition-colors hover:text-gold-light">
                <Phone className="size-3.5" aria-hidden="true" />
                {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="hidden items-center gap-1.5 transition-colors hover:text-gold-light lg:flex">
                <Mail className="size-3.5" aria-hidden="true" />
                {site.email}
              </a>
              <Socials size="sm" />
            </div>
          </div>
        </div>

        {/* Main bar */}
        <div
          className={cn(
            "transition-all duration-500",
            scrolled
              ? "glass-dark shadow-[0_10px_40px_-20px] shadow-black/60"
              : "border-b border-transparent bg-gradient-to-b from-coal/60 to-transparent"
          )}
        >
          <div
            className={cn(
              "mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 transition-all duration-500 md:px-8",
              scrolled ? "py-2" : "py-4"
            )}
          >
            <Link
              to="/"
              aria-label="Accueil — Morocco Travel Agency"
              className={cn("origin-left transition-transform duration-500", scrolled && "scale-90")}
            >
              <Logo />
            </Link>

            <nav className="hidden items-center gap-1 xl:flex" aria-label="Navigation principale">
              {navItems.map((item) => {
                const active = isActive(pathname, item.to);
                const linkClass = cn(
                  "relative inline-flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors",
                  active ? "text-gold" : "text-cream/80 hover:text-gold-light"
                );
                const underline = active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-gold-deep via-gold to-gold-light"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                );

                if (item.to !== "/voyages") {
                  return (
                    <Link key={item.to} to={item.to} className={linkClass}>
                      {item.label}
                      {underline}
                    </Link>
                  );
                }

                return (
                  <div
                    key={item.to}
                    className="relative"
                    onMouseEnter={openMega}
                    onMouseLeave={scheduleCloseMega}
                  >
                    <div className="flex items-center">
                      <Link to="/voyages" className={cn(linkClass, "pr-1")}>
                        {item.label}
                        {underline}
                      </Link>
                      <button
                        type="button"
                        aria-expanded={megaOpen}
                        aria-controls="mega-voyages"
                        aria-label="Afficher les types de voyages"
                        onClick={() => setMegaOpen((o) => !o)}
                        className="rounded-full p-1 text-cream/70 transition-colors hover:text-gold"
                      >
                        <ChevronDown
                          className={cn("size-4 transition-transform duration-300", megaOpen && "rotate-180")}
                        />
                      </button>
                    </div>
                    <AnimatePresence>
                      {megaOpen && (
                        <motion.div
                          id="mega-voyages"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute left-1/2 top-full w-[760px] -translate-x-1/2 pt-4"
                        >
                          <div className="grid grid-cols-4 gap-3 rounded-2xl border border-gold/20 bg-coal p-3 shadow-2xl">
                            {megaItems.map((m) => (
                              <Link
                                key={m.type}
                                to="/voyages"
                                search={{ type: m.type }}
                                className="group relative block overflow-hidden rounded-xl"
                              >
                                <SmartImage
                                  name={m.image}
                                  alt={m.title}
                                  showLabel={false}
                                  className="aspect-[3/4] w-full"
                                  imgClassName="transition-transform duration-700 group-hover:scale-110"
                                />
                                <span className="absolute inset-0 bg-gradient-to-t from-coal via-coal/30 to-transparent" />
                                <span className="absolute inset-x-0 bottom-0 p-3">
                                  <span className="flex items-center justify-between font-display text-lg font-semibold text-cream">
                                    {m.title}
                                    <ArrowUpRight className="size-4 text-gold transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                  </span>
                                  <span className="mt-0.5 block text-[11px] leading-snug text-cream/65">{m.text}</span>
                                </span>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>

            <div className="flex items-center gap-3">
              <GoldButton
                href={whatsappLink("Bonjour, je souhaite réserver un voyage.")}
                icon={MessageCircle}
                size="sm"
                className="hidden px-5 py-2.5 sm:inline-flex"
              >
                Réserver sur WhatsApp
              </GoldButton>
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label="Ouvrir le menu"
                aria-expanded={menuOpen}
                className="inline-flex size-11 items-center justify-center rounded-full border border-gold/30 text-cream transition-colors hover:border-gold hover:text-gold xl:hidden"
              >
                <Menu className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] flex flex-col overflow-y-auto bg-coal xl:hidden"
          >
            <div className="pattern-geo pointer-events-none absolute inset-0 opacity-[0.04]" />
            <div className="relative flex items-center justify-between px-4 py-4">
              <Logo />
              <button
                type="button"
                autoFocus
                onClick={() => setMenuOpen(false)}
                aria-label="Fermer le menu"
                className="inline-flex size-11 items-center justify-center rounded-full border border-gold/30 text-cream transition-colors hover:border-gold hover:text-gold"
              >
                <X className="size-5" />
              </button>
            </div>
            <nav className="relative flex flex-1 flex-col justify-center px-6 py-8" aria-label="Menu mobile">
              <ul className="space-y-1">
                {navItems.map((item, i) => {
                  const active = isActive(pathname, item.to);
                  return (
                    <motion.li
                      key={item.to}
                      initial={{ opacity: 0, x: -24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 + i * 0.05, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Link
                        to={item.to}
                        onClick={() => setMenuOpen(false)}
                        className={cn(
                          "flex items-baseline gap-4 py-1.5 font-display text-4xl font-medium transition-colors sm:text-5xl",
                          active ? "text-gold" : "text-cream hover:text-gold-light"
                        )}
                      >
                        <span className="text-xs font-sans tracking-widest text-gold/60">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {item.label}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="relative space-y-5 border-t border-coal-border px-6 py-6"
            >
              <GoldButton
                href={whatsappLink("Bonjour, je souhaite réserver un voyage.")}
                icon={MessageCircle}
                size="lg"
                className="w-full"
              >
                Réserver sur WhatsApp
              </GoldButton>
              <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-cream/70">
                <a href={telLink(site.phone)} className="flex items-center gap-2 hover:text-gold">
                  <Phone className="size-4 text-gold" aria-hidden="true" />
                  {site.phone}
                </a>
                <Socials />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
