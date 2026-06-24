"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/Button";
import { CircuitField } from "@/components/visual/CircuitField";
import { usePrefersReducedMotion } from "@/lib/motion/usePrefersReducedMotion";
import { site, locations } from "@/lib/content";

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
      <CircuitField className="pointer-events-none absolute inset-0 h-full w-full opacity-50 [mask-image:radial-gradient(150%_120%_at_55%_35%,black,transparent_78%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg-deep/30 via-transparent to-bg-deep" />

      <div
        ref={root}
        className="relative mx-auto grid w-full max-w-7xl items-center gap-14 px-5 pb-16 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]"
      >
        <div>
          <p
            data-hero
            className="flex items-center gap-3 font-mono text-xs tracking-[0.22em] text-accent sm:text-sm"
          >
            <span className="h-px w-8 bg-accent" />
            SEMICONDUCTOR ENGINEERING SERVICES
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
            {site.intro}
          </p>
          <div data-hero className="mt-9 flex flex-wrap gap-4">
            <Button href="/contact">Start a project</Button>
            <Button href="/services" variant="ghost">
              Explore services
            </Button>
          </div>
          <p
            data-hero
            className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-faint"
          >
            {locations.map((l, i) => (
              <span key={l.city} className="flex items-center gap-3">
                {i > 0 && <span className="text-border-strong">/</span>}
                {l.city}
              </span>
            ))}
          </p>
        </div>

        <div data-hero className="relative hidden lg:block">
          <div
            aria-hidden="true"
            className="absolute -inset-8 -z-10"
            style={{
              background:
                "radial-gradient(circle at 50% 45%, rgba(0,223,226,0.18), transparent 62%)",
            }}
          />
          <figure className="relative aspect-[4/5] overflow-hidden rounded-lg border border-border-strong">
            <Image
              src="/images/die.webp"
              alt="Macro photograph of an integrated-circuit die with fine gold bond wires"
              fill
              priority
              sizes="(min-width:1024px) 42vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/80 via-transparent to-bg-deep/20" />
            <figcaption className="absolute bottom-4 left-4 font-mono text-xs text-ink/90">
              // silicon die · post-bond inspection
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
