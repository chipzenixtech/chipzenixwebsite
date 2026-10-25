"use client";

import Link from "next/link";
import { handleHashNav } from "@/lib/motion/hashNav";

// Geometry (SVG units): a 188-unit package centred in a 300 box, six pins per
// side on a 24-unit pitch, each pin continuing outward as a trace ending in a via.
const SIZE = 300;
const BODY = { x: 56, size: 188 };
const PIN = { len: 26, w: 8, pitch: 24, count: 6 };
const pinStart = BODY.x + (BODY.size - ((PIN.count - 1) * PIN.pitch + PIN.w)) / 2;
const offsets = Array.from({ length: PIN.count }, (_, i) => pinStart + i * PIN.pitch);
const sides = ["top", "right", "bottom", "left"] as const;

function pinRect(side: (typeof sides)[number], o: number) {
  const near = BODY.x - PIN.len; // outer edge of top/left pins
  const far = BODY.x + BODY.size; // inner edge of bottom/right pins
  switch (side) {
    case "top":
      return { x: o, y: near, width: PIN.w, height: PIN.len };
    case "bottom":
      return { x: o, y: far, width: PIN.w, height: PIN.len };
    case "left":
      return { x: near, y: o, width: PIN.len, height: PIN.w };
    case "right":
      return { x: far, y: o, width: PIN.len, height: PIN.w };
  }
}

function trace(side: (typeof sides)[number], o: number, i: number) {
  const c = o + PIN.w / 2;
  const end = 8 + (i % 2) * 10; // stagger via positions so traces read as routing
  const outer = BODY.x - PIN.len;
  switch (side) {
    case "top":
      return { x1: c, y1: outer, x2: c, y2: end };
    case "bottom":
      return { x1: c, y1: SIZE - outer, x2: c, y2: SIZE - end };
    case "left":
      return { x1: outer, y1: c, x2: end, y2: c };
    case "right":
      return { x1: SIZE - outer, y1: c, x2: SIZE - end, y2: c };
  }
}

/**
 * A domain entry point drawn as a QFP-style semiconductor package. Hovering or
 * focusing it "powers it up": pins and traces light in sequence and the die glows.
 */
export function ChipButton({
  href,
  label,
  partNo,
  caption,
}: {
  href: string;
  label: string;
  partNo: string;
  caption: string;
}) {
  return (
    <Link
      href={href}
      prefetch={false}
      onClick={(e) => handleHashNav(e, href)}
      className="group flex flex-col items-center rounded-[var(--radius-lg)] text-center outline-offset-8"
      aria-label={`${label} domains: ${caption}`}
    >
      <div className="@container relative w-[min(80vw,22rem)] transition-transform duration-500 ease-out group-hover:-translate-y-1.5 group-focus-visible:-translate-y-1.5">
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="block h-auto w-full" aria-hidden="true">
          <defs>
            <linearGradient id={`pkg-${partNo}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="oklch(0.27 0.03 250)" />
              <stop offset="1" stopColor="oklch(0.15 0.022 256)" />
            </linearGradient>
            <pattern id={`die-${partNo}`} width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M10 0H0V10" fill="none" style={{ stroke: "color-mix(in oklch, var(--color-accent) 14%, transparent)" }} strokeWidth="1" />
            </pattern>
          </defs>

          {/* traces + vias */}
          {sides.flatMap((side, s) =>
            offsets.map((o, i) => {
              const t = trace(side, o, i);
              const delay = `${(s * PIN.count + i) * 22}ms`;
              return (
                <g key={`${side}-t${i}`}>
                  <line
                    {...t}
                    strokeWidth="2"
                    className="stroke-border transition-[stroke] duration-300 group-hover:stroke-accent/70 group-focus-visible:stroke-accent/70"
                    style={{ transitionDelay: delay }}
                  />
                  <circle
                    cx={t.x2}
                    cy={t.y2}
                    r="3.5"
                    className="fill-bg-deep stroke-border-strong transition-[stroke,fill] duration-300 group-hover:fill-accent group-hover:stroke-accent group-focus-visible:fill-accent group-focus-visible:stroke-accent"
                    strokeWidth="1.5"
                    style={{ transitionDelay: delay }}
                  />
                </g>
              );
            }),
          )}

          {/* pins */}
          {sides.flatMap((side, s) =>
            offsets.map((o, i) => (
              <rect
                key={`${side}-p${i}`}
                {...pinRect(side, o)}
                rx="1.5"
                className="fill-[oklch(0.62_0.02_245)] transition-[fill] duration-300 group-hover:fill-accent group-focus-visible:fill-accent"
                style={{ transitionDelay: `${(s * PIN.count + i) * 22}ms` }}
              />
            )),
          )}

          {/* package */}
          <rect
            x={BODY.x}
            y={BODY.x}
            width={BODY.size}
            height={BODY.size}
            rx="20"
            fill={`url(#pkg-${partNo})`}
            className="stroke-border-strong transition-[stroke] duration-300 group-hover:stroke-accent/60 group-focus-visible:stroke-accent/60"
            strokeWidth="1.5"
          />
          {/* die */}
          <rect
            x={BODY.x + 22}
            y={BODY.x + 22}
            width={BODY.size - 44}
            height={BODY.size - 44}
            rx="8"
            fill={`url(#die-${partNo})`}
            className="stroke-accent/25 transition-[stroke] duration-300 group-hover:stroke-accent group-focus-visible:stroke-accent"
            strokeWidth="1.5"
          />
          {/* pin-1 marker */}
          <circle cx={BODY.x + 12} cy={BODY.x + 12} r="4" className="fill-accent/50" />
        </svg>

        {/* die glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-[28%] rounded-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
          style={{ boxShadow: "0 0 60px 6px color-mix(in oklch, var(--color-accent) 28%, transparent)" }}
        />

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-[8cqw] font-semibold leading-none tracking-tight text-ink">
            {label}
          </span>
          <span className="mt-[2.5cqw] font-mono text-[3.6cqw] tracking-[0.14em] text-faint transition-colors duration-300 group-hover:text-accent">
            {partNo}
          </span>
        </div>
      </div>

      <span className="mt-6 max-w-[17rem] text-sm text-muted">{caption}</span>
      <span className="mt-3 inline-flex items-center gap-2 font-label text-xs font-semibold uppercase tracking-[0.14em] text-accent">
        Explore {label}
        <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
          &rarr;
        </span>
      </span>
    </Link>
  );
}
