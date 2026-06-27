import type Lenis from "lenis";

/**
 * Module-level handle to the live Lenis instance, so non-provider components
 * (e.g. the nav) can drive smooth scrolling — `lenis.scrollTo("#id")` — without
 * threading the instance through React context. Null when Lenis isn't mounted
 * (reduced motion / before hydration), in which case callers fall back to native.
 */
let instance: Lenis | null = null;

export const setLenis = (l: Lenis | null) => {
  instance = l;
};

export const getLenis = () => instance;
