import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { vision } from "@/lib/content";

const arrowLink =
  "group/link mt-6 inline-flex items-center gap-2 font-medium text-accent transition-all hover:gap-3";

const card =
  "group relative flex min-h-[24rem] flex-col justify-end overflow-hidden rounded-lg border border-border transition-all duration-500 hover:border-accent/40 hover:shadow-[0_0_50px_-12px_rgba(0,223,226,0.4)]";

const img =
  "object-cover opacity-25 transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-40";

export function Teasers() {
  return (
    <section className="mx-auto grid max-w-7xl gap-6 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-2">
      <Reveal className={card}>
        <Image
          src="/images/cleanroom.webp"
          alt="Engineers in cleanroom suits operating semiconductor fabrication equipment"
          fill
          sizes="(min-width:1024px) 46vw, 100vw"
          className={img}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-bg-deep/80 to-bg-deep/40" />
        <div className="relative p-8">
          <p className="font-label text-xs uppercase tracking-[0.16em] text-accent">About</p>
          <h3 className="mt-3 text-2xl font-semibold text-ink sm:text-3xl">{vision}</h3>
          <Link href="/about" prefetch={false} className={arrowLink}>
            Our story
            <span aria-hidden="true" className="transition-transform group-hover/link:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </Reveal>

      <Reveal className={card}>
        <Image
          src="/images/wafer.webp"
          alt="Silicon wafer patterned with hundreds of identical dies"
          fill
          sizes="(min-width:1024px) 46vw, 100vw"
          className={img}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-bg-deep/80 to-bg-deep/40" />
        <div className="relative p-8">
          <p className="font-label text-xs uppercase tracking-[0.16em] text-accent">Careers</p>
          <h3 className="mt-3 text-2xl font-semibold text-ink sm:text-3xl">
            Build silicon that ships at scale — with a team that sweats the details.
          </h3>
          <p className="mt-4 max-w-sm text-muted">
            VLSI and embedded engineers who care about doing it right. Remote-friendly across
            our Telangana centres.
          </p>
          <Link href="/careers" prefetch={false} className={arrowLink}>
            See open roles
            <span aria-hidden="true" className="transition-transform group-hover/link:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
