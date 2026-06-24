import type { ReactNode } from "react";

type Props = {
  title: ReactNode;
  /** Use sparingly — never as a per-section eyebrow (Impeccable ban). */
  eyebrow?: string;
  intro?: ReactNode;
  id?: string;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  className?: string;
};

export function SectionHeading({
  title,
  eyebrow,
  intro,
  id,
  align = "left",
  as: Tag = "h2",
  className = "",
}: Props) {
  return (
    <div
      id={id}
      className={`${align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}
    >
      {eyebrow && (
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
          {eyebrow}
        </p>
      )}
      <Tag className="text-balance text-[clamp(1.9rem,4.5vw,3.25rem)] font-bold leading-[1.05] text-ink">
        {title}
      </Tag>
      {intro && <p className="mt-4 text-lg text-muted">{intro}</p>}
    </div>
  );
}
