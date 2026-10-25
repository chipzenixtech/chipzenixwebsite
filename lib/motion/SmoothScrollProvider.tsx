"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import { getLenis, setLenis } from "./lenisStore";

gsap.registerPlugin(ScrollTrigger);

/**
 * Mounts Lenis smooth scroll and syncs it to GSAP ScrollTrigger.
 * Under reduced motion, Lenis is skipped entirely (native scroll), but
 * ScrollTrigger stays registered so scroll-linked effects still resolve.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion();
  const pathname = usePathname();
  const historyNav = useRef(false);

  useEffect(() => {
    if (reduced) {
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      lerp: 0.1, // frame-rate-independent smoothing — snappy yet smooth
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    lenis.on("scroll", ScrollTrigger.update);
    const onRaf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onRaf);
    gsap.ticker.lagSmoothing(0);
    setLenis(lenis);

    return () => {
      gsap.ticker.remove(onRaf);
      lenis.destroy();
      setLenis(null);
    };
  }, [reduced]);

  // Lenis keeps its own scroll target, so after Next swaps the page it would glide
  // back to the previous page's offset (often near the footer). On a fresh
  // navigation, pin it to the top; on Back/Forward, adopt the restored position.
  useEffect(() => {
    const onPop = () => {
      historyNav.current = true;
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    const lenis = getLenis();
    const fromHistory = historyNav.current;
    historyNav.current = false;
    if (fromHistory) {
      const id = requestAnimationFrame(() => lenis?.scrollTo(window.scrollY, { immediate: true, force: true }));
      return () => cancelAnimationFrame(id);
    }
    if (window.location.hash) return; // in-page targets are handled by the hash nav
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo(0, 0);
    ScrollTrigger.refresh();
  }, [pathname]);

  return <>{children}</>;
}
