/**
 * Section label: open text between two hairlines that fade into the page,
 * like a trace entering and leaving a pad. Centred sections get a line on each
 * side; left-aligned ones only lead with one.
 */
export function Eyebrow({ children, align = "center" }: { children: string; align?: "center" | "left" }) {
  return (
    <p
      className={`flex items-center gap-3 font-label text-xs uppercase tracking-[0.22em] text-accent sm:text-sm ${
        align === "center" ? "justify-center" : ""
      }`}
    >
      <span aria-hidden className="h-px w-10 bg-gradient-to-r from-transparent to-accent/70 sm:w-14" />
      {children}
      {align === "center" && (
        <span aria-hidden className="h-px w-10 bg-gradient-to-l from-transparent to-accent/70 sm:w-14" />
      )}
    </p>
  );
}
