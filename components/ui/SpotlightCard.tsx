"use client";

import { useRef, type ReactNode } from "react";

/**
 * Card wrapper with a cursor-tracked cyan spotlight + hover border lift.
 * Pure CSS-var driven (no animation library) so it's cheap and works the same
 * regardless of `prefers-reduced-motion` (a hover spotlight is instant, not
 * sustained motion). The caller supplies bg / padding / radius via `className`.
 */
export function SpotlightCard({
  children,
  className = "",
  contentClassName = "",
  radius = 300,
  topAccent = false,
}: {
  children: ReactNode;
  className?: string;
  /** Applied to the inner content wrapper — use for internal flex/grid layout. */
  contentClassName?: string;
  radius?: number;
  /** A cyan bar at the card's top edge that wipes in on hover. */
  topAccent?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={`group relative overflow-hidden transition-colors duration-300 hover:border-accent/40 ${className}`}
    >
      {topAccent && (
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 z-[2] h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100"
        />
      )}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(${radius}px circle at var(--mx, 50%) var(--my, 50%), rgba(0,223,226,0.14), transparent 70%)`,
        }}
      />
      <div className={`relative z-[1] ${contentClassName}`}>{children}</div>
    </div>
  );
}
