import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { faqs } from "@/lib/content";
import { faqJsonLd } from "@/lib/seo";

/**
 * Plain-language answers to the questions buyers (and answer engines) ask.
 * Native <details> keeps every answer in the HTML and works without JS.
 */
export function Faq() {
  return (
    <section id="faq" className="scroll-mt-24 border-t border-border">
      <JsonLd data={faqJsonLd} />
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <p className="font-label text-xs uppercase tracking-[0.16em] text-accent">FAQ</p>
          <h2 className="mt-3 text-[clamp(2rem,4.5vw,3.25rem)] font-semibold text-ink">
            Straight answers
          </h2>
          <p className="mt-4 max-w-md text-lg text-muted">
            What we do, how we work, and how to get a project moving.
          </p>
        </Reveal>

        <Reveal selector="[data-faq]" className="border-t border-border">
          {faqs.map((f) => (
            <details key={f.question} data-faq className="group border-b border-border">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left text-lg font-semibold text-ink transition-colors hover:text-accent [&::-webkit-details-marker]:hidden">
                <h3>{f.question}</h3>
                <span
                  aria-hidden="true"
                  className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border-strong font-mono text-sm text-accent transition-transform duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="max-w-2xl pb-6 pr-10 leading-relaxed text-muted">{f.answer}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
