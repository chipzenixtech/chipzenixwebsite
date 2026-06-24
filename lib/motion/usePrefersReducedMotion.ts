"use client";

import { useEffect, useState } from "react";

/**
 * SSR-safe subscription to `prefers-reduced-motion`.
 * Defaults to `false` on the server / first paint, updates on mount and on change.
 */
export function usePrefersReducedMotion(): boolean {
  // Initialize synchronously on the client so the reduced-motion path is active
  // from the first effect run (no false→true flip that can arm an animation).
  // The rendered DOM is identical regardless, so this is hydration-safe.
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
