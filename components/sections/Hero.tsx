"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/Button";
import { CircuitField } from "@/components/visual/CircuitField";
import { usePrefersReducedMotion } from "@/lib/motion/usePrefersReducedMotion";
import { site, stats } from "@/lib/content";

gsap.registerPlugin(useGSAP);

export function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (!root.current || reduced) return;
      gsap.from(root.current.querySelectorAll("[data-hero]"), {
        opacity: 0,
        y: 28,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.1,
      });
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <section className="relative isolate flex min-h-dvh items-center overflow-hidden bg-bg-deep">
      <div
        aria-hidden="true"
        style={{ background: "radial-gradient(circle, rgba(0,223,226,0.12), transparent 62%)" }}
        className="pointer-events-none absolute right-[-12%] top-1/2 hidden aspect-square w-[60%] -translate-y-1/2 lg:block"
      />
      <CircuitField className="pointer-events-none absolute inset-0 h-full w-full [mask-image:radial-gradient(135%_120%_at_75%_45%,black,transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-bg-deep via-bg-deep/85 to-bg-deep/20" />

      <div ref={root} className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="max-w-3xl pt-28 pb-16">
          <p
            data-hero
            className="font-mono text-xs tracking-[0.22em] text-accent sm:text-sm"
          >
            SEMICONDUCTOR ENGINEERING SERVICES
          </p>
          <h1
            data-hero
            className="mt-5 text-balance text-[clamp(2.75rem,8vw,6rem)] font-extrabold leading-[1.02] text-ink"
          >
            Engineering Tomorrow&rsquo;s <span className="text-accent">Silicon</span>
          </h1>
          <p data-hero className="mt-6 max-w-xl text-lg text-muted sm:text-xl">
            {site.intro}
          </p>
          <div data-hero className="mt-9 flex flex-wrap gap-4">
            <Button href="/contact">Start a project</Button>
            <Button href="/services" variant="ghost">
              Explore services
            </Button>
          </div>
          <p data-hero className="mt-10 font-mono text-xs text-faint">
            {stats.map((s) => `${s.value}${s.suffix} ${s.label.toLowerCase()}`).join("  ·  ")}
          </p>
        </div>
      </div>
    </section>
  );
}
