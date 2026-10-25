"use client";

import Link from "next/link";
import { useHorizontalScroll } from "@/lib/motion/useHorizontalScroll";
import { capabilities } from "@/lib/content";

export function Capabilities() {
  const { containerRef, trackRef } = useHorizontalScroll<HTMLDivElement, HTMLDivElement>();

  return (
    <section className="border-y border-border bg-bg-deep">
      <div ref={containerRef} className="md:h-screen md:overflow-hidden">
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory scroll-px-5 gap-6 overflow-x-auto px-5 py-20 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:h-full md:items-center md:overflow-visible md:px-8 md:py-0"
        >
          {/* Intro panel */}
          <div className="flex w-[82vw] max-w-md shrink-0 snap-start flex-col justify-center md:w-[34vw]">
            <p className="font-label text-xs uppercase tracking-[0.16em] text-accent">
              Capabilities
            </p>
            <h2 className="mt-4 text-[clamp(2.25rem,5vw,3.75rem)] font-semibold text-ink">
              The tech arsenal
            </h2>
            <p className="mt-4 max-w-sm text-muted">
              The languages, methodologies, tools, and architectures our engineers work in
              every day — front-end to signoff, bare-metal to Linux.
            </p>
            <p className="mt-6 font-label text-xs uppercase tracking-[0.14em] text-faint md:hidden">
              Swipe to explore →
            </p>
          </div>

          {/* Capability group panels */}
          {capabilities.map((group, i) => (
            <div
              key={group.category}
              className="flex w-[82vw] max-w-sm shrink-0 snap-start flex-col rounded-lg border border-border bg-surface p-8 transition-colors duration-300 hover:border-accent/40 md:w-[27vw]"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-label text-sm uppercase tracking-[0.12em] text-accent">
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

          {/* Closing CTA panel */}
          <div className="flex w-[82vw] max-w-sm shrink-0 snap-start flex-col justify-center rounded-lg border border-accent/30 bg-surface p-8 md:w-[27vw]">
            <p className="font-label text-xs uppercase tracking-[0.12em] text-accent">
              Not on the list?
            </p>
            <h3 className="mt-3 text-2xl font-semibold text-ink sm:text-3xl">
              Tell us your stack
            </h3>
            <p className="mt-4 text-muted">
              If your flow, node, or toolchain isn&rsquo;t here, it&rsquo;s probably still in our
              wheelhouse. Ask us.
            </p>
            <Link
              href="/contact"
              prefetch={false}
              className="group mt-7 inline-flex items-center gap-2 font-medium text-accent transition-all hover:gap-3"
            >
              Start a project
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
