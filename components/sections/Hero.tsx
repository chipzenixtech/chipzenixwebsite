"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/Button";
import { CircuitField } from "@/components/visual/CircuitField";
import { HeroVisual } from "@/components/sections/HeroVisual";
import { usePrefersReducedMotion } from "@/lib/motion/usePrefersReducedMotion";
import { site } from "@/lib/content";

gsap.registerPlugin(useGSAP);

export function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (!root.current || reduced) return;
      gsap.fromTo(
        root.current.querySelectorAll("[data-hero]"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.1,
          delay: 0.05,
          clearProps: "opacity,transform",
        },
      );
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <section className="relative isolate flex min-h-dvh items-center overflow-hidden bg-bg-deep pt-24">
      <CircuitField className="pointer-events-none absolute inset-0 h-full w-full opacity-90 [mask-image:radial-gradient(150%_130%_at_55%_38%,black_68%,transparent_100%)]" />
      {/* light scrim only directly behind the copy column so body text stays legible */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-bg-deep/55 via-bg-deep/10 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg-deep/30 via-transparent to-bg-deep" />

      <div
        ref={root}
        className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-5 pb-16 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16"
      >
        <div>
          <p
            data-hero
            className="flex items-center gap-2.5 font-label text-sm uppercase tracking-[0.18em] text-accent sm:text-base"
          >
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_2px_color-mix(in_oklch,var(--color-accent)_55%,transparent)]" />
            Semiconductor Engineering Services
          </p>
          <h1
            data-hero
            className="mt-6 text-[clamp(3rem,9vw,6.75rem)] font-semibold leading-[0.94] tracking-[-0.02em] text-ink"
          >
            Engineering
            <br />
            Tomorrow&rsquo;s <span className="text-accent">Silicon</span>
          </h1>
          <p
            data-hero
            className="mt-7 max-w-xl text-lg leading-relaxed text-muted sm:text-xl"
          >
            {site.heroIntro}
          </p>
          <div data-hero className="mt-9 flex flex-wrap gap-4">
            <Button href="/services">
              Explore Services
              <span aria-hidden="true">&rarr;</span>
            </Button>
            <Button href="/contact" variant="ghost">
              Contact Us
            </Button>
          </div>
        </div>

        <div data-hero>
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
