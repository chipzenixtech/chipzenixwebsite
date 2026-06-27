"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { usePrefersReducedMotion } from "@/lib/motion/usePrefersReducedMotion";
import { testimonials } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Testimonials as a pinned vertical scroller: on wide screens with motion
 * allowed, the section pins and each scroll reveals the next quote one at a
 * time; after the last, the page continues. On mobile / reduced motion the
 * quotes simply stack and scroll normally (no scroll-jacking).
 */
export function Testimonial() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      const container = containerRef.current;
      const track = trackRef.current;
      if (!container || !track) return;

      const wideEnough = window.matchMedia("(min-width: 768px)").matches;
      if (reduced || !wideEnough) return; // stacked fallback (CSS below)

      const slides = gsap.utils.toArray<HTMLElement>("[data-slide]", track);
      const n = slides.length;

      // promote to a pinned fixed-height viewport only when enhancing
      container.style.height = "100vh";
      container.style.overflow = "hidden";
      gsap.set(slides, { height: "100vh", paddingTop: 0, paddingBottom: 0 });

      const slideH = container.offsetHeight;
      const tween = gsap.to(track, {
        y: () => -(track.scrollHeight - slideH),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${(n - 1) * window.innerHeight}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        container.style.height = "";
        container.style.overflow = "";
        gsap.set(slides, { clearProps: "height,paddingTop,paddingBottom" });
        gsap.set(track, { clearProps: "transform" });
      };
    },
    { scope: containerRef, dependencies: [reduced] },
  );

  return (
    <section className="border-y border-border bg-bg-deep">
      <div ref={containerRef}>
        <div ref={trackRef} className="will-change-transform">
          {testimonials.map((t, i) => (
            <figure
              data-slide
              key={t.name}
              className="flex flex-col justify-center px-5 py-20 sm:px-8"
            >
              <div className="mx-auto w-full max-w-4xl">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-sm text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px flex-1 bg-border" />
                  <span className="font-mono text-xs text-faint">
                    {String(testimonials.length).padStart(2, "0")}
                  </span>
                </div>
                <p aria-hidden className="mt-6 font-display text-5xl leading-none text-accent">
                  &ldquo;
                </p>
                <blockquote className="mt-2 text-balance font-display text-[clamp(1.6rem,3.4vw,2.75rem)] font-medium leading-[1.18] text-ink">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-8 font-label text-sm uppercase tracking-[0.1em] text-muted">
                  <span className="text-ink">{t.name}</span>
                  <span className="mx-2 text-border-strong">/</span>
                  {t.title}
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
