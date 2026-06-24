"use client";

import { useEffect, useState } from "react";

/**
 * SSR-safe subscription to `prefers-reduced-motion`.
 * Defaults to `false` on the server / first paint, updates on mount and on change.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
