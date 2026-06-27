import { Reveal } from "@/components/ui/Reveal";
import { propositions } from "@/lib/content";

/** Truthful positioning trio (replaces fabricated headline metrics). */
export function Propositions() {
  return (
    <Reveal
      selector="[data-prop]"
      className="grid grid-cols-1 gap-y-12 sm:grid-cols-3 sm:gap-y-0 sm:divide-x sm:divide-accent/40"
    >
      {propositions.map((p) => (
        <div
          data-prop
          key={p.title}
          className="group flex flex-col items-center gap-4 px-6 text-center"
        >
          <h3 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
            {p.title}
          </h3>
          <p className="max-w-[34ch] text-sm leading-relaxed text-muted transition-colors duration-300 group-hover:text-ink">
            {p.detail}
          </p>
        </div>
      ))}
    </Reveal>
  );
}
