"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { heroSlides } from "@/lib/content";

const INTERVAL = 4000;

/**
 * Hero slideshow: crossfades through the brand photography with a slow push-in.
 * Advances only while on screen and the tab is visible. Under reduced motion the
 * photos still change (a plain crossfade), but without the zoom.
 */
export function HeroVisual() {
  const [index, setIndex] = useState(0);
  const [running, setRunning] = useState(true);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let onScreen = true;
    const sync = () => setRunning(onScreen && document.visibilityState === "visible");
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      sync();
    });
    io.observe(el);
    document.addEventListener("visibilitychange", sync);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  useEffect(() => {
    if (!running) return;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % heroSlides.length), INTERVAL);
    return () => window.clearTimeout(id);
  }, [index, running]);

  const slide = heroSlides[index];

  return (
    <div ref={root} className="relative">
      <div
        aria-hidden="true"
        className="absolute -inset-10 -z-10"
        style={{ background: "radial-gradient(circle at 50% 45%, color-mix(in oklch, var(--color-accent) 16%, transparent), transparent 62%)" }}
      />

      <figure className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border-strong bg-bg-deep lg:aspect-[4/5]">
        {heroSlides.map((s, i) => (
          <div
            key={s.src}
            aria-hidden={i !== index}
            className={`absolute inset-0 transition-opacity duration-[1100ms] ease-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={s.src}
              alt={s.alt}
              fill
              priority={i === 0}
              sizes="(min-width:1024px) 42vw, 100vw"
              className={`object-cover ${i === index ? "hero-kenburns" : ""}`}
            />
          </div>
        ))}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg-deep/85 via-transparent to-bg-deep/25" />

        <figcaption
          key={slide.caption}
          className="hero-caption absolute inset-x-5 bottom-5 font-mono text-xs text-ink/90 sm:text-sm"
        >
          {slide.caption}
        </figcaption>
      </figure>
    </div>
  );
}
