import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, useRef, type ReactNode } from "react";
import { MotionConfig, motion } from "framer-motion";
import { Home } from "lucide-react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingActions } from "@/components/FloatingActions";
import { DuneWave } from "@/components/DuneWave";
import { GoldButton, OutlineButton } from "@/components/ui-premium/Buttons";
import { GoldRing } from "@/components/ui-premium/GoldRing";

function NotFoundComponent() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden bg-coal px-4 pb-32 pt-32 text-center text-cream">
      <div className="pattern-geo pointer-events-none absolute inset-0 -z-10 opacity-[0.05]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_45%,color-mix(in_oklab,var(--color-gold)_14%,transparent),transparent_70%)]" />
      <GoldRing className="absolute left-1/2 top-1/2 -z-10 size-[min(560px,92vw)] -translate-x-1/2 -translate-y-1/2 opacity-40" />
      <div className="max-w-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.34em] text-gold">Erreur 404</p>
        <h1 className="mt-2 font-display text-[8rem] font-semibold leading-none text-gold-gradient md:text-[11rem]">
          404
        </h1>
        <h2 className="mt-2 text-balance font-display text-3xl font-semibold md:text-4xl">
          Cette page s'est perdue dans le désert
        </h2>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-cream/70">
          La page que vous cherchez n'existe pas ou a été déplacée. Reprenons la route ensemble.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <GoldButton to="/" icon={Home} size="lg">
            Accueil
          </GoldButton>
          <OutlineButton to="/omra" size="lg" arrow>
            Programmes Omra
          </OutlineButton>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-px text-night">
        <DuneWave />
      </div>
    </section>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-xl font-semibold tracking-tight text-foreground">
          Une erreur est survenue
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Quelque chose s'est mal passé de notre côté. Vous pouvez réessayer ou revenir à
          l'accueil.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-gold-light"
          >
            Réessayer
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Retour à l'accueil
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: "Morocco Travel Agency" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@400;500;600;700&display=swap",
      },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* reducedMotion="user": transform/layout animations are skipped for prefers-reduced-motion. */}
      <MotionConfig reducedMotion="user">
        <div className="flex min-h-screen flex-col bg-background">
          <Header />
          <main className="flex-1">
            <PageTransition>
              {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
              <Outlet />
            </PageTransition>
          </main>
          <Footer />
          <FloatingActions />
        </div>
      </MotionConfig>
    </QueryClientProvider>
  );
}

/** Fade + rise between pages. Skipped on the first render so SSR content is visible immediately. */
function PageTransition({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const firstRender = useRef(true);
  useEffect(() => {
    firstRender.current = false;
  }, []);

  return (
    <motion.div
      key={pathname}
      initial={firstRender.current ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
