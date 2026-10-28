import { Link } from "@tanstack/react-router";
import { ArrowRight, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Size = "sm" | "md" | "lg";
type Variant = "gold" | "outline-dark" | "outline-light";

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-7 py-3.5 text-[15px]",
};

const variants: Record<Variant, string> = {
  gold: "bg-primary text-primary-foreground shadow-[0_10px_30px_-10px] shadow-gold-deep/70 hover:bg-gold-light",
  // Outline on dark surfaces (cream text, gold border).
  "outline-dark": "border border-gold/45 text-cream hover:border-gold hover:bg-gold/10 hover:text-gold-light",
  // Outline on light surfaces (ink text, deep gold border).
  "outline-light": "border border-gold-deep/50 text-ink hover:border-gold-deep hover:bg-gold/10",
};

/** Classes for a pill button — use on any element (e.g. a <Link> with search params). */
export function buttonClass(variant: Variant = "gold", size: Size = "md", className?: string) {
  return cn(
    "btn-shine group inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-coal disabled:pointer-events-none disabled:opacity-60",
    sizes[size],
    variants[variant],
    className
  );
}

interface ContentProps {
  children: ReactNode;
  icon?: LucideIcon | undefined;
  arrow?: boolean | undefined;
}

/** Icon + label + nudging arrow. */
export function ButtonContent({ children, icon: Icon, arrow }: ContentProps) {
  return (
    <>
      {Icon && <Icon className="size-4 shrink-0" strokeWidth={2.1} aria-hidden="true" />}
      <span>{children}</span>
      {arrow && (
        <ArrowRight
          className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        />
      )}
    </>
  );
}

interface BaseProps extends ContentProps {
  className?: string;
  size?: Size;
}

type ActionProps =
  | { to: string; href?: never; onClick?: never; type?: never; disabled?: never }
  | { href: string; to?: never; onClick?: () => void; type?: never; disabled?: never }
  | { to?: never; href?: never; onClick?: () => void; type?: "button" | "submit"; disabled?: boolean };

type ButtonProps = BaseProps & ActionProps & { "aria-label"?: string };

function PillButton({ variant, ...props }: ButtonProps & { variant: Variant }) {
  const { children, icon, arrow, className, size } = props;
  const cls = buttonClass(variant, size, className);
  const content = (
    <ButtonContent icon={icon} arrow={arrow}>
      {children}
    </ButtonContent>
  );

  if (props.to !== undefined) {
    return (
      <Link to={props.to} className={cls} aria-label={props["aria-label"]}>
        {content}
      </Link>
    );
  }
  if (props.href !== undefined) {
    const external = /^https?:/.test(props.href);
    return (
      <a
        href={props.href}
        onClick={props.onClick}
        className={cls}
        aria-label={props["aria-label"]}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </a>
    );
  }
  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      disabled={props.disabled}
      className={cls}
      aria-label={props["aria-label"]}
    >
      {content}
    </button>
  );
}

/** Gold pill CTA with shine sweep and optional arrow nudge. */
export function GoldButton(props: ButtonProps) {
  return <PillButton variant="gold" {...props} />;
}

/** Outline pill. `tone="dark"` for dark sections, `"light"` for cream/sand sections. */
export function OutlineButton({ tone = "dark", ...props }: ButtonProps & { tone?: "dark" | "light" }) {
  return <PillButton variant={tone === "dark" ? "outline-dark" : "outline-light"} {...(props as ButtonProps)} />;
}
