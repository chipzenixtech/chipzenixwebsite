"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/motion/usePrefersReducedMotion";

type Pt = { x: number; y: number };
type Trace = { pts: Pt[]; len: number };
type Pulse = { trace: number; t: number; speed: number };

const ACCENT = "0, 223, 226"; // matches --color-accent (#00dfe2)

/**
 * Branded animated circuit field for the hero — orthogonal traces with cyan
 * data pulses travelling along them. Distinctive, on-brand, and cheap.
 * Reduced motion → static traces, no pulses. Decorative (aria-hidden).
 */
export function CircuitField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvasNode = canvasRef.current;
    if (!canvasNode) return;
    const context = canvasNode.getContext("2d");
    if (!context) return;
    const cvs = canvasNode; // non-null aliases so nested closures keep the type
    const ctx = context;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let traces: Trace[] = [];
    let pulses: Pulse[] = [];
    let raf = 0;

    const lerp = (a: number, b: number, r: number) => a + (b - a) * r;

    function build() {
      w = cvs.clientWidth;
      h = cvs.clientHeight;
      cvs.width = Math.max(1, Math.round(w * dpr));
      cvs.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      traces = [];
      const rows = Math.max(6, Math.round(h / 64));
      for (let i = 0; i < rows; i++) {
        const baseY = (i + 0.5) * (h / rows) + (Math.random() * 16 - 8);
        const pts: Pt[] = [{ x: -10, y: baseY }];
        let x = -10;
        let y = baseY;
        const segs = 2 + Math.floor(Math.random() * 3);
        for (let s = 0; s < segs; s++) {
          x += 70 + Math.random() * 150;
          pts.push({ x, y });
          if (Math.random() > 0.35) {
            y += (Math.random() > 0.5 ? 1 : -1) * (24 + Math.random() * 48);
            pts.push({ x, y });
          }
        }
        let len = 0;
        for (let k = 1; k < pts.length; k++)
          len += Math.hypot(pts[k].x - pts[k - 1].x, pts[k].y - pts[k - 1].y);
        traces.push({ pts, len });
      }
      pulses = traces.map((_, i) => ({
        trace: i,
        t: Math.random(),
        speed: 0.0025 + Math.random() * 0.004,
      }));
    }

    function pointAt(tr: Trace, t: number): Pt {
      let d = t * tr.len;
      for (let k = 1; k < tr.pts.length; k++) {
        const a = tr.pts[k - 1];
        const b = tr.pts[k];
        const seg = Math.hypot(b.x - a.x, b.y - a.y);
        if (d <= seg) {
          const r = seg === 0 ? 0 : d / seg;
          return { x: lerp(a.x, b.x, r), y: lerp(a.y, b.y, r) };
        }
        d -= seg;
      }
      return tr.pts[tr.pts.length - 1];
    }

    function drawTraces() {
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(${ACCENT}, 0.18)`;
      for (const tr of traces) {
        ctx.beginPath();
        ctx.moveTo(tr.pts[0].x, tr.pts[0].y);
        for (let k = 1; k < tr.pts.length; k++) ctx.lineTo(tr.pts[k].x, tr.pts[k].y);
        ctx.stroke();
        const e = tr.pts[tr.pts.length - 1];
        ctx.fillStyle = `rgba(${ACCENT}, 0.5)`;
        ctx.fillRect(e.x - 2.5, e.y - 2.5, 5, 5);
      }
    }

    function frame() {
      drawTraces();
      for (const p of pulses) {
        p.t += p.speed;
        if (p.t > 1) p.t = 0;
        const pt = pointAt(traces[p.trace], p.t);
        const g = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, 9);
        g.addColorStop(0, `rgba(${ACCENT}, 0.85)`);
        g.addColorStop(1, `rgba(${ACCENT}, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 9, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    }

    build();
    if (reduced) drawTraces();
    else frame();

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        build();
        if (reduced) drawTraces();
      }, 150);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
    };
  }, [reduced]);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
