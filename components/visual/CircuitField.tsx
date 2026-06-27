"use client";

import { useEffect, useRef } from "react";

type Pt = { x: number; y: number };
type Trace = { pts: Pt[]; len: number; alpha: number; live: boolean };
type Pulse = { trace: number; t: number; speed: number };

const ACCENT = "0, 223, 226"; // matches --color-accent (#00dfe2)
const GRID = 40; // px — wafer/PCB pad pitch

/**
 * Branded animated circuit field for the hero — Manhattan-routed traces on a
 * faint wafer dot-grid, with cyan data pulses that light each wire as they
 * travel (additive glow + comet trail). The static substrate is rendered once
 * to an offscreen layer and blitted each frame, so only the pulses redraw.
 *
 * Deliberately animates regardless of `prefers-reduced-motion`: this is a
 * low-amplitude, slow, non-flashing decorative effect (no parallax, no scroll-
 * coupling, no large sweeps), so it stays comfortable while keeping the hero
 * alive on every device. The heavier, motion-sensitive effects (splash, scroll
 * reveals, count-ups) still honour the reduced-motion preference. Decorative
 * (aria-hidden).
 */
export function CircuitField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    // Offscreen static layer (dot-grid + traces + pads), rendered once per build.
    const base = document.createElement("canvas");
    const bctx = base.getContext("2d");

    const lerp = (a: number, b: number, r: number) => a + (b - a) * r;
    const clamp = (v: number, lo: number, hi: number) =>
      v < lo ? lo : v > hi ? hi : v;
    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    function makeTrace(start: Pt, horizontal: boolean): Trace {
      const pts: Pt[] = [{ ...start }];
      let { x, y } = start;
      const limit = horizontal ? w + GRID : h + GRID;
      let pos = horizontal ? x : y;
      while (pos < limit) {
        const run = (2 + Math.floor(Math.random() * 5)) * GRID;
        if (horizontal) x += run;
        else y += run;
        pts.push({ x, y });
        // occasional right-angle jog onto a neighbouring track
        const within = horizontal ? x < w : y < h;
        if (within && Math.random() > 0.42) {
          const dir = Math.random() > 0.5 ? 1 : -1;
          const jog = (1 + Math.floor(Math.random() * 2)) * GRID;
          if (horizontal) y = clamp(y + dir * jog, GRID, h - GRID);
          else x = clamp(x + dir * jog, GRID, w - GRID);
          pts.push({ x, y });
        }
        pos = horizontal ? x : y;
      }
      let len = 0;
      for (let k = 1; k < pts.length; k++)
        len += Math.hypot(pts[k].x - pts[k - 1].x, pts[k].y - pts[k - 1].y);
      const live = Math.random() > 0.4;
      return { pts, len, alpha: live ? rand(0.12, 0.18) : rand(0.05, 0.09), live };
    }

    function pointAt(tr: Trace, t: number): Pt {
      let d = clamp(t, 0, 1) * tr.len;
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

    function renderBase() {
      if (!bctx) return;
      bctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      bctx.clearRect(0, 0, w, h);

      // 1 — wafer dot-grid substrate
      bctx.fillStyle = `rgba(${ACCENT}, 0.05)`;
      for (let gx = GRID; gx < w; gx += GRID)
        for (let gy = GRID; gy < h; gy += GRID)
          bctx.fillRect(gx - 0.5, gy - 0.5, 1, 1);

      // 2 — traces
      bctx.lineCap = "square";
      bctx.lineJoin = "miter";
      for (const tr of traces) {
        bctx.lineWidth = tr.live ? 1.4 : 1;
        bctx.strokeStyle = `rgba(${ACCENT}, ${tr.alpha})`;
        bctx.beginPath();
        bctx.moveTo(tr.pts[0].x, tr.pts[0].y);
        for (let k = 1; k < tr.pts.length; k++)
          bctx.lineTo(tr.pts[k].x, tr.pts[k].y);
        bctx.stroke();

        // vias at interior bends
        bctx.fillStyle = `rgba(${ACCENT}, ${tr.alpha + 0.1})`;
        for (let k = 1; k < tr.pts.length - 1; k++)
          bctx.fillRect(tr.pts[k].x - 1.5, tr.pts[k].y - 1.5, 3, 3);

        // terminating pad, with a soft glow on live traces
        const e = tr.pts[tr.pts.length - 1];
        if (tr.live) {
          const g = bctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, 10);
          g.addColorStop(0, `rgba(${ACCENT}, 0.35)`);
          g.addColorStop(1, `rgba(${ACCENT}, 0)`);
          bctx.fillStyle = g;
          bctx.beginPath();
          bctx.arc(e.x, e.y, 10, 0, Math.PI * 2);
          bctx.fill();
        }
        bctx.fillStyle = `rgba(${ACCENT}, ${tr.live ? 0.7 : 0.4})`;
        bctx.fillRect(e.x - 2, e.y - 2, 4, 4);
      }
    }

    function build() {
      w = cvs.clientWidth;
      h = cvs.clientHeight;
      const pw = Math.max(1, Math.round(w * dpr));
      const ph = Math.max(1, Math.round(h * dpr));
      cvs.width = pw;
      cvs.height = ph;
      base.width = pw;
      base.height = ph;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      traces = [];
      // horizontal-dominant traces every other track
      for (let gy = 1; gy * GRID < h; gy += 2)
        traces.push(makeTrace({ x: -GRID, y: gy * GRID }, true));
      // a few vertical traces for cross-routing richness
      for (let gx = 3; gx * GRID < w; gx += 5)
        traces.push(makeTrace({ x: gx * GRID, y: -GRID }, false));

      pulses = [];
      traces.forEach((tr, i) => {
        if (!tr.live) return;
        // moderate, length-normalised speed so beams glide at a similar pace
        // regardless of trace length (≈ a constant px/sec, decent not frantic).
        const speed = rand(105, 150) / 60 / tr.len;
        pulses.push({ trace: i, t: Math.random(), speed });
        if (Math.random() > 0.65)
          pulses.push({ trace: i, t: Math.random() - 0.5, speed });
      });

      renderBase();
    }

    const BEAM_PX = 170; // length of the glowing beam along the wire
    const BEAM_STEPS = 20;

    function drawBeam(p: Pulse) {
      const tr = traces[p.trace];
      const arc = BEAM_PX / tr.len; // beam length in t-units
      // sample the beam path, tail (j=0) → head (j=STEPS)
      const pts: (Pt & { t: number; f: number })[] = [];
      for (let j = 0; j <= BEAM_STEPS; j++) {
        const f = j / BEAM_STEPS;
        const t = p.t - arc * (1 - f);
        pts.push({ ...pointAt(tr, t), t, f });
      }
      ctx.lineCap = "round";
      // pass 1 — soft outer glow (slim)
      for (let j = 1; j <= BEAM_STEPS; j++) {
        if (pts[j].t <= 0) continue;
        const f = pts[j].f;
        ctx.strokeStyle = `rgba(${ACCENT}, ${0.03 + f * 0.15})`;
        ctx.lineWidth = 3 + f * 5;
        ctx.beginPath();
        ctx.moveTo(pts[j - 1].x, pts[j - 1].y);
        ctx.lineTo(pts[j].x, pts[j].y);
        ctx.stroke();
      }
      // pass 2 — fine bright core (eased so the leading half blazes)
      for (let j = 1; j <= BEAM_STEPS; j++) {
        if (pts[j].t <= 0) continue;
        const f = pts[j].f;
        ctx.strokeStyle = `rgba(${ACCENT}, ${0.09 + f * f * 0.8})`;
        ctx.lineWidth = 0.5 + f * 1.4;
        ctx.beginPath();
        ctx.moveTo(pts[j - 1].x, pts[j - 1].y);
        ctx.lineTo(pts[j].x, pts[j].y);
        ctx.stroke();
      }
      // hot near-white head with a small soft halo
      const head = pts[BEAM_STEPS];
      const g = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, 10);
      g.addColorStop(0, "rgba(225, 255, 255, 0.95)");
      g.addColorStop(0.3, `rgba(${ACCENT}, 0.6)`);
      g.addColorStop(1, `rgba(${ACCENT}, 0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(head.x, head.y, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(235, 255, 255, 1)";
      ctx.fillRect(head.x - 1, head.y - 1, 2, 2);
    }

    function frame() {
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(base, 0, 0, w, h);
      ctx.globalCompositeOperation = "lighter"; // beams add onto the substrate
      for (const p of pulses) {
        p.t += p.speed;
        // restart once the whole beam has travelled off the far end
        if (p.t > 1 + BEAM_PX / traces[p.trace].len) p.t = -BEAM_PX / traces[p.trace].len;
        drawBeam(p);
      }
      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(frame);
    }

    // only animate while the canvas is on-screen and the tab is visible — this
    // is the main scroll-perf win (the hero + footer fields don't both run).
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

    build();
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

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      // rebuild traces/substrate for the new size; the running loop picks them up
      resizeTimer = window.setTimeout(build, 150);
    };
    window.addEventListener("resize", onResize);

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
