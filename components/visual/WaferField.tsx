"use client";

import { useEffect, useRef } from "react";

const ACCENT = "0, 223, 226"; // --color-accent

/**
 * A wafer-lattice background: a dot grid with two slow diagonal "data sweeps"
 * that brighten dots as they pass. Deliberately distinct from the hero's
 * circuit-trace field. Canvas + rAF (not CSS keyframes), so it animates
 * regardless of prefers-reduced-motion, and it's cheap (a few hundred rects).
 * Decorative (aria-hidden).
 */
export function WaferField({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const context = node.getContext("2d");
    if (!context) return;
    const cvs = node;
    const ctx = context;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const G = 22; // lattice pitch (smaller = denser dot grid)
    let w = 0;
    let h = 0;
    let raf = 0;
    let t = 0;

    function resize() {
      w = cvs.clientWidth;
      h = cvs.clientHeight;
      cvs.width = Math.max(1, Math.round(w * dpr));
      cvs.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function frame() {
      ctx.clearRect(0, 0, w, h);
      const span = w + h;
      const s1 = t % span;
      const s2 = (t + span / 2) % span;
      for (let x = G; x < w; x += G) {
        for (let y = G; y < h; y += G) {
          const proj = x + y; // diagonal coordinate
          const g1 = Math.max(0, 1 - Math.abs(proj - s1) / 130);
          const g2 = Math.max(0, 1 - Math.abs(proj - s2) / 130);
          const glow = g1 + g2;
          const a = Math.min(0.8, 0.1 + glow * 0.55);
          const sz = 1.2 + glow * 1.9;
          ctx.fillStyle = `rgba(${ACCENT}, ${a})`;
          ctx.fillRect(x - sz / 2, y - sz / 2, sz, sz);
        }
      }
      t += 1.1; // ~66px/s sweep — calm
      raf = requestAnimationFrame(frame);
    }

    let inView = true;
    const start = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    resize();
    start();

    const io = new IntersectionObserver(
      (entries) => {
        inView = entries[0].isIntersecting;
        if (inView && !document.hidden) start();
        else stop();
      },
      { threshold: 0 },
    );
    io.observe(cvs);

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (inView) start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    let rt = 0;
    const onResize = () => {
      window.clearTimeout(rt);
      rt = window.setTimeout(resize, 150);
    };
    window.addEventListener("resize", onResize);

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.clearTimeout(rt);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={className} />;
}
