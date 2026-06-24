"use client";

import type { ReactNode } from "react";
import { useReveal, type RevealOptions } from "@/lib/motion/useReveal";

type Props = RevealOptions & {
  children: ReactNode;
  className?: string;
};

/** Convenience wrapper: scroll-reveals its children (or descendants via `selector`). */
export function Reveal({ children, className, ...opts }: Props) {
  const ref = useReveal<HTMLDivElement>(opts);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
