import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { WhatsAppButton } from "@/components/WhatsAppButton";
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

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled ? "glass-dark py-2" : "bg-transparent py-4"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-8">
          <Link to="/" aria-label="Accueil — Morocco Travel Agency">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Navigation principale">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                className="text-sm font-medium text-cream/80 transition-colors hover:text-gold data-[status=active]:text-gold"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <WhatsAppButton className="hidden md:inline-flex" />
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Ouvrir le menu"
              className="inline-flex size-10 items-center justify-center rounded-full border border-gold/30 text-cream transition-colors hover:border-gold hover:text-gold lg:hidden"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] flex flex-col bg-coal/97 backdrop-blur-xl lg:hidden"
          >
            <div className="flex items-center justify-between px-4 py-4">
              <Logo />
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Fermer le menu"
                className="inline-flex size-10 items-center justify-center rounded-full border border-gold/30 text-cream transition-colors hover:border-gold hover:text-gold"
              >
                <X className="size-5" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col items-center justify-center gap-1 px-6" aria-label="Menu mobile">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.to}
                  type="button"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.04, duration: 0.35 }}
                  onClick={() => {
                    setMenuOpen(false);
                    navigate({ to: item.to });
                  }}
                  className="rounded-xl px-6 py-2.5 font-display text-3xl font-medium text-cream transition-colors hover:text-gold"
                >
                  {item.label}
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.35 }}
                className="mt-6"
              >
                <WhatsAppButton className="px-8 py-3 text-base" />
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
