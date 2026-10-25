"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { navLinks } from "@/lib/content";
import { handleHashNav } from "@/lib/motion/hashNav";
import { MobileMenu } from "./MobileMenu";

const EASE = "power3.out";

/**
 * Pill navigation adapted from React Bits' PillNav (the cyan circle that grows
 * from the bottom of each pill while the label swaps) — rebuilt for Next.js
 * routing + our brand tokens. The hover/logo motion is GSAP-driven (not CSS
 * transitions), so it runs identically regardless of prefers-reduced-motion.
 */
export function PillNav() {
  const pathname = usePathname();
  // tracks which in-page section (e.g. #industries) is currently in view, so its
  // nav item shows the active underline like a real route does.
  const [activeHash, setActiveHash] = useState("");
  const circleRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const tlRefs = useRef<Array<gsap.core.Timeline | null>>([]);
  const activeTween = useRef<Array<gsap.core.Tween | null>>([]);
  const logoImgRef = useRef<HTMLImageElement | null>(null);
  const logoTween = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach((circle, index) => {
        const pill = circle?.parentElement;
        if (!circle || !pill) return;
        const { width: w, height: h } = pill.getBoundingClientRect();
        if (!w || !h) return;

        // geometry so the circle's arc kisses the bottom edge of the pill
        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta =
          Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;
        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`,
        });

        const label = pill.querySelector<HTMLElement>(".pill-label");
        const hover = pill.querySelector<HTMLElement>(".pill-label-hover");
        if (label) gsap.set(label, { y: 0 });
        if (hover) gsap.set(hover, { y: Math.ceil(h + 100), opacity: 0 });

        tlRefs.current[index]?.kill();
        const tl = gsap.timeline({ paused: true });
        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease: EASE, overwrite: "auto" }, 0);
        if (label) tl.to(label, { y: -(h + 8), duration: 2, ease: EASE, overwrite: "auto" }, 0);
        if (hover) tl.to(hover, { y: 0, opacity: 1, duration: 2, ease: EASE, overwrite: "auto" }, 0);
        tlRefs.current[index] = tl;
      });
    };

    layout();
    window.addEventListener("resize", layout);
    if (document.fonts) document.fonts.ready.then(layout).catch(() => {});
    return () => window.removeEventListener("resize", layout);
  }, []);

  // Scroll-spy for in-page anchor items (e.g. Industries): light the active
  // underline while that section sits in the middle of the viewport.
  useEffect(() => {
    const ids = navLinks
      .filter((l) => l.href.includes("#"))
      .map((l) => l.href.slice(l.href.indexOf("#") + 1));
    if (pathname !== "/" || ids.length === 0) {
      setActiveHash("");
      return;
    }
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActiveHash(e.target.id);
          else setActiveHash((cur) => (cur === e.target.id ? "" : cur));
        }
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  const enter = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTween.current[i]?.kill();
    activeTween.current[i] = tl.tweenTo(tl.duration(), { duration: 0.3, ease: EASE, overwrite: "auto" });
  };
  const leave = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTween.current[i]?.kill();
    activeTween.current[i] = tl.tweenTo(0, { duration: 0.2, ease: EASE, overwrite: "auto" });
  };
  const logoEnter = () => {
    const img = logoImgRef.current;
    if (!img) return;
    logoTween.current?.kill();
    // a short lift-and-settle; spinning a wordmark would make it unreadable
    logoTween.current = gsap.fromTo(
      img,
      { scale: 1 },
      { scale: 1.05, duration: 0.25, ease: EASE, yoyo: true, repeat: 1 },
    );
  };

  const frame =
    "rounded-full border border-border bg-surface/70 backdrop-blur-md";

  return (
    <header className="fixed inset-x-0 top-0 z-[var(--z-sticky)]">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6"
      >
        {/* Wordmark — unframed: the orbit makes it taller than a pill, and the
            lettering needs the height to stay legible. */}
        <Link
          href="/"
          prefetch={false}
          aria-label="Chipzenix home"
          onMouseEnter={logoEnter}
          className="-my-1 inline-flex shrink-0 items-center"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={logoImgRef}
            src="/logo.webp"
            alt="Chipzenix"
            width={720}
            height={325}
            className="h-12 w-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)] sm:h-14 xl:h-16"
          />
        </Link>

        {/* Desktop pills + CTA */}
        <div className="hidden items-center gap-2 lg:flex">
          <ul role="menubar" className={`flex items-center gap-1 p-1 ${frame}`}>
            {navLinks.map((l, i) => {
              const active = l.href.includes("#")
                ? pathname === "/" &&
                  activeHash === l.href.slice(l.href.indexOf("#") + 1)
                : pathname === l.href || pathname.startsWith(`${l.href}/`);
              return (
                <li key={l.href} role="none" className="flex">
                  <Link
                    role="menuitem"
                    href={l.href}
                    prefetch={false}
                    onClick={(e) => handleHashNav(e, l.href)}
                    onMouseEnter={() => enter(i)}
                    onMouseLeave={() => leave(i)}
                    className="relative inline-flex items-center overflow-hidden rounded-full px-4 py-2 font-label text-xs font-medium uppercase tracking-[0.1em]"
                  >
                    <span
                      ref={(el) => {
                        circleRefs.current[i] = el;
                      }}
                      aria-hidden
                      className="pointer-events-none absolute bottom-0 left-1/2 z-[1] block rounded-full"
                      style={{ background: "var(--color-accent)", willChange: "transform" }}
                    />
                    <span className="relative z-[2] inline-block leading-none">
                      <span
                        className="pill-label relative z-[2] inline-block leading-none text-muted"
                        style={{ willChange: "transform" }}
                      >
                        {l.label}
                      </span>
                      <span
                        aria-hidden
                        className="pill-label-hover absolute left-0 top-0 z-[3] inline-block leading-none text-accent-ink"
                        style={{ willChange: "transform, opacity" }}
                      >
                        {l.label}
                      </span>
                    </span>
                    {active && (
                      <span
                        aria-hidden
                        className="absolute bottom-1 left-4 right-4 z-[4] h-0.5 rounded-full bg-accent"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            href="/contact"
            prefetch={false}
            className="inline-flex items-center rounded-full bg-accent px-5 py-2.5 font-label text-xs font-semibold uppercase tracking-[0.1em] text-accent-ink transition-colors hover:bg-accent-strong"
          >
            Start a project
          </Link>
        </div>

        {/* Mobile */}
        <div className="lg:hidden">
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
}
