import { Reveal } from "@/components/ui/Reveal";
import { testimonial } from "@/lib/content";

export function Testimonial() {
  return (
    <section className="border-y border-border bg-bg-deep">
      <div className="mx-auto max-w-5xl px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <p aria-hidden="true" className="font-mono text-6xl leading-none text-accent">
            &ldquo;
          </p>
          <blockquote className="mt-2 text-balance font-display text-[clamp(1.6rem,3.6vw,2.75rem)] font-medium leading-[1.18] text-ink">
            {testimonial.quote}
          </blockquote>
          <figcaption className="mt-8 font-mono text-sm text-muted">
            <span className="text-ink">{testimonial.name}</span> — {testimonial.title}
          </figcaption>
        </Reveal>
      </div>
    </section>
  );
}
