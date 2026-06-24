"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { usePrefersReducedMotion } from "@/lib/motion/usePrefersReducedMotion";

/**
 * Brand intro overlay. Client-only (never in SSR, so no-JS users see content immediately),
 * plays on every full page load / refresh (not on internal client-side navigation, since the
 * layout doesn't remount). Has a safety timeout so a GSAP failure can never trap the page.
 */
export function SplashScreen() {
  const [show, setShow] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    setShow(true);
  }, []);

  useEffect(() => {
    if (!show) return;
    const el = root.current;
    if (!el) return;

    document.documentElement.style.overflow = "hidden";
    const finish = () => {
      document.documentElement.style.overflow = "";
      setShow(false);
    };
    const safety = window.setTimeout(finish, 4500);

    const ctx = gsap.context(() => {
      if (reduced) {
        // ~3s static hold, then fade out.
        gsap.to(el, { autoAlpha: 0, duration: 0.5, delay: 2.6, onComplete: finish });
        return;
      }
      gsap
        .timeline({ onComplete: finish })
        .from("[data-splash-mark]", { scale: 0.85, autoAlpha: 0, duration: 1, ease: "power3.out" })
        .from("[data-splash-word]", { autoAlpha: 0, y: 16, duration: 0.7, ease: "power2.out" }, "-=0.5")
        // gentle breathing hold so the intro lasts ~3s instead of flashing by
        .to(
          "[data-splash-mark]",
          { scale: 1.04, duration: 0.8, ease: "sine.inOut", yoyo: true, repeat: 1 },
          "-=0.2",
        )
        .to(el, { yPercent: -100, duration: 0.85, ease: "power4.inOut" }, "+=0.25");
    }, root);

    return () => {
      window.clearTimeout(safety);
      ctx.revert();
      document.documentElement.style.overflow = "";
    };
  }, [show, reduced]);

  if (!show) return null;

  return (
    <div
      ref={root}
      role="presentation"
      className="fixed inset-0 z-[var(--z-splash)] flex flex-col items-center justify-center bg-bg-deep"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute h-80 w-80 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(0,223,226,0.14), transparent 65%)" }}
      />
      <Image
        data-splash-mark
        src="/logo-icon.webp"
        alt="Chipzenix"
        width={96}
        height={96}
        priority
        className="relative h-20 w-20"
      />
      <p
        data-splash-word
        className="relative mt-5 font-display text-3xl font-semibold tracking-tight text-ink"
      >
        Chip<span className="text-accent">zenix</span>
      </p>
    </div>
  );
}
