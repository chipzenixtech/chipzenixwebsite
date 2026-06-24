import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { pillars } from "@/lib/content";

const media: Record<string, { src: string; alt: string }> = {
  vlsi: {
    src: "/images/wafer.webp",
    alt: "Silicon wafer patterned with hundreds of identical dies",
  },
  embedded: {
    src: "/images/pcb.webp",
    alt: "Macro photograph of a densely populated printed circuit board",
  },
};

export function Pillars() {
  return (
    <section id="pillars" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <Reveal className="max-w-2xl">
        <h2 className="text-[clamp(2rem,4.5vw,3.25rem)] font-semibold text-ink">
          Two disciplines, one partner
        </h2>
        <p className="mt-4 text-lg text-muted">
          From RTL to tapeout, and from firmware to the field — Chipzenix covers the full
          silicon-to-software stack under one roof.
        </p>
      </Reveal>

      <div className="mt-16 flex flex-col gap-20 sm:gap-28">
        {pillars.map((p, i) => {
          const m = media[p.id];
          const flip = i % 2 === 1;
          return (
            <Reveal key={p.id} className="grid items-center gap-10 lg:grid-cols-2">
              <div className={flip ? "lg:order-2" : ""}>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                  {p.tagline}
                </p>
                <h3 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">{p.title}</h3>
                <p className="mt-4 max-w-md text-muted">{p.description}</p>
                <ul className="mt-6 flex flex-wrap gap-2 font-mono text-xs text-muted">
                  {p.services.slice(0, 6).map((s) => (
                    <li key={s.name} className="rounded-sm border border-border px-2.5 py-1">
                      {s.name}
                    </li>
                  ))}
                  <li className="px-2.5 py-1 text-faint">+{p.services.length - 6} more</li>
                </ul>
                <Link
                  href={`/services#${p.id}`}
                  prefetch={false}
                  className="group mt-7 inline-flex items-center gap-2 font-medium text-accent transition-all hover:gap-3"
                >
                  Explore {p.title}
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>

              <figure
                className={`relative aspect-[5/4] overflow-hidden rounded-lg border border-border ${
                  flip ? "lg:order-1" : ""
                }`}
              >
                <Image
                  src={m.src}
                  alt={m.alt}
                  fill
                  sizes="(min-width:1024px) 46vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-bg-deep/70 via-bg-deep/10 to-transparent" />
              </figure>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
