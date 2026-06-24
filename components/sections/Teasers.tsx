import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { vision } from "@/lib/content";

const arrowLink =
  "group mt-6 inline-flex items-center gap-2 font-medium text-accent transition-all hover:gap-3";

export function Teasers() {
  return (
    <section className="mx-auto grid max-w-7xl gap-6 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-2">
      <Reveal className="group relative flex min-h-[24rem] flex-col justify-end overflow-hidden rounded-lg border border-border p-8">
        <Image
          src="/images/cleanroom.webp"
          alt="Engineers in cleanroom suits operating semiconductor fabrication equipment"
          fill
          sizes="(min-width:1024px) 46vw, 100vw"
          className="object-cover opacity-25 transition-opacity duration-500 group-hover:opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-bg-deep/80 to-bg-deep/40" />
        <div className="relative">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">About</p>
          <h3 className="mt-3 text-2xl font-semibold text-ink sm:text-3xl">{vision}</h3>
          <Link href="/about" prefetch={false} className={arrowLink}>
            Our story
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </Reveal>

      <Reveal className="group relative flex min-h-[24rem] flex-col justify-end overflow-hidden rounded-lg border border-border bg-surface p-8">
        <div
          aria-hidden="true"
          className="absolute -right-16 -top-16 h-64 w-64 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(0,223,226,0.12), transparent 65%)" }}
        />
        <div className="relative">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Careers</p>
          <h3 className="mt-3 text-2xl font-semibold text-ink sm:text-3xl">
            Build silicon that ships at scale — with a team that sweats the details.
          </h3>
          <p className="mt-4 max-w-sm text-muted">
            VLSI and embedded engineers who care about doing it right. Remote-friendly, across three
            time zones.
          </p>
          <Link href="/careers" prefetch={false} className={arrowLink}>
            See open roles
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
