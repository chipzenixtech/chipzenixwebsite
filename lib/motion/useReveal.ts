"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export interface RevealOptions {
  /** Vertical offset to animate from (px). */
  y?: number;
  delay?: number;
  duration?: number;
  /** If set, animates matching descendants (with stagger) instead of the element itself. */
  selector?: string;
  stagger?: number;
}

/**
 * Scroll-triggered reveal that ENHANCES already-visible content.
 * Content renders visible by default (SSR / no-JS / reduced-motion); the hook
 * only sets the hidden start-state via JS, so a section never ships blank.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  opts: RevealOptions = {},
) {
  const { y = 24, delay = 0, duration = 0.9, selector, stagger = 0.08 } = opts;
  const ref = useRef<T>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reduced) return;

      const targets: gsap.TweenTarget = selector
        ? el.querySelectorAll(selector)
        : el;

      // fromTo with an explicit end state — content always ends visible, even
      // across HMR / Strict Mode re-runs. If JS never runs, nothing is hidden.
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: "power3.out",
          stagger: selector ? stagger : undefined,
          clearProps: "opacity,transform",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        },
      );
    },
    { scope: ref, dependencies: [reduced] },
  );

  return ref;
}
