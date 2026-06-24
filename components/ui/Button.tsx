import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "ghost";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-[var(--radius)] px-6 py-3 font-semibold transition-colors disabled:opacity-50";
const variants: Record<Variant, string> = {
  primary: "bg-accent text-accent-ink hover:bg-accent-strong",
  ghost: "border border-border text-ink hover:border-border-strong hover:bg-surface",
};

type ButtonProps = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
  href?: string;
  external?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  ariaLabel?: string;
};

export function Button({
  variant = "primary",
  className = "",
  children,
  href,
  external = false,
  onClick,
  type = "button",
  ariaLabel,
}: ButtonProps) {
  const cls = `${base} ${variants[variant]} ${className}`;

  if (href && external)
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
        onClick={onClick}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );

  if (href)
    return (
      <Link href={href} className={cls} onClick={onClick} aria-label={ariaLabel}>
        {children}
      </Link>
    );

  return (
    <button type={type} className={cls} onClick={onClick} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
