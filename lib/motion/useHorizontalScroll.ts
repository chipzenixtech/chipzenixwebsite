"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Pinned horizontal scroll: vertical scroll translates `trackRef` horizontally
 * while `containerRef` is pinned. Activates ONLY on wide viewports (≥768px) with
 * a fine pointer and motion allowed.
 *
 * CSS contract for the consuming component (so the fallback matches this gate):
 *  - container: `h-screen overflow-hidden` on desktop (md+); auto height on mobile.
 *  - track: mobile = `flex overflow-x-auto snap-x snap-mandatory` (native swipe);
 *           desktop (md+) = `md:overflow-visible` so GSAP can transform it.
 * On mobile / reduced-motion the hook is a no-op and the native scroll-snap row is used.
 */
export function useHorizontalScroll<
  C extends HTMLElement = HTMLDivElement,
  T extends HTMLElement = HTMLDivElement,
>() {
  const containerRef = useRef<C>(null);
  const trackRef = useRef<T>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      const container = containerRef.current;
      const track = trackRef.current;
      if (!container || !track) return;

      const finePointer = window.matchMedia("(pointer: fine)").matches;
      const wideEnough = window.matchMedia("(min-width: 768px)").matches;
      if (reduced || !finePointer || !wideEnough) return; // native scroll-snap fallback

      const distance = () => Math.max(0, track.scrollWidth - container.offsetWidth);

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { scope: containerRef, dependencies: [reduced] },
  );

  return { containerRef, trackRef };
}
