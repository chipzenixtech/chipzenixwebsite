"use client";

import { useHorizontalScroll } from "@/lib/motion/useHorizontalScroll";
import { capabilities } from "@/lib/content";

export function Capabilities() {
  const { containerRef, trackRef } = useHorizontalScroll<HTMLDivElement, HTMLDivElement>();

  return (
    <section className="border-y border-border bg-bg-deep">
      <div ref={containerRef} className="md:h-screen md:overflow-hidden">
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 py-20 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:h-full md:items-center md:overflow-visible md:px-8 md:py-0"
        >
          {/* Intro panel */}
          <div className="flex w-[82vw] max-w-md shrink-0 snap-start flex-col justify-center md:w-[38vw]">
            <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-accent">
              <span className="h-px w-8 bg-accent" />
              Capabilities
            </p>
            <h2 className="mt-4 text-[clamp(2.25rem,5vw,3.75rem)] font-semibold text-ink">
              The tech arsenal
            </h2>
            <p className="mt-4 max-w-sm text-muted">
              The languages, tools, and architectures our engineers work in every day.
            </p>
            <p className="mt-6 font-mono text-xs text-faint">
              <span className="hidden md:inline">Keep scrolling to move across →</span>
              <span className="md:hidden">Swipe to explore →</span>
            </p>
          </div>

          {/* Capability group panels */}
          {capabilities.map((group, i) => (
            <div
              key={group.category}
              className="flex w-[82vw] max-w-sm shrink-0 snap-start flex-col rounded-lg border border-border bg-surface p-8 md:w-[30vw]"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-mono text-sm uppercase tracking-[0.15em] text-accent">
                  {group.category}
                </h3>
                <span className="font-mono text-xs text-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <ul className="mt-6 flex flex-col gap-3">
                {group.items.map((it) => (
                  <li
                    key={it}
                    className="border-b border-border pb-3 text-xl font-semibold text-ink last:border-0 sm:text-2xl"
                  >
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
