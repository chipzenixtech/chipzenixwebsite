"use client";

import { useRef, type ReactNode } from "react";

/**
 * Card wrapper: on hover it lifts slightly, its edge picks up the accent with a soft
 * glow beneath, and a cursor-tracked spotlight follows the pointer.
 * Pure CSS-var driven (no animation library) so it's cheap and works the same
 * regardless of `prefers-reduced-motion` (a hover spotlight is instant, not
 * sustained motion). The caller supplies bg / padding / radius via `className`.
 */
export function SpotlightCard({
  children,
  className = "",
  contentClassName = "",
  radius = 300,
}: {
  children: ReactNode;
  className?: string;
  /** Applied to the inner content wrapper — use for internal flex/grid layout. */
  contentClassName?: string;
  radius?: number;
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
      className={`group relative overflow-hidden transition-[border-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-1 hover:border-accent/45 hover:shadow-[0_22px_48px_-26px_var(--color-accent)] ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(${radius}px circle at var(--mx, 50%) var(--my, 50%), color-mix(in oklch, var(--color-accent) 14%, transparent), transparent 70%)`,
        }}
      />
      <div className={`relative z-[1] ${contentClassName}`}>{children}</div>
    </div>
  );
}
