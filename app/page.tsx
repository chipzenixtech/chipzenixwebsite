// Temporary design-system verification page — replaced by the real Hero in a later task.
export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-24">
      <p className="font-mono text-sm tracking-wide text-accent">
        CHIP ZENIX // design-system check
      </p>
      <h1 className="mt-6 text-[clamp(2.5rem,8vw,6rem)] font-extrabold text-ink">
        Engineering Tomorrow&rsquo;s Silicon
      </h1>
      <p className="mt-6 max-w-[70ch] text-lg text-muted">
        Semiconductor engineering services — VLSI &amp; ASIC design, embedded systems, and AI
        hardware acceleration. This placeholder verifies tokens, fonts, the hidden scrollbar, and
        reduced-motion handling.
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <span className="rounded bg-accent px-5 py-3 font-medium text-accent-ink">
          Start a project
        </span>
        <span className="rounded border border-border px-5 py-3 font-medium text-ink">
          See capabilities
        </span>
      </div>
      <div className="mt-12 flex flex-wrap gap-2 font-mono text-xs text-muted">
        {["Verilog", "SystemVerilog", "UVM", "Cadence", "RISC-V"].map((t) => (
          <span key={t} className="rounded-sm border border-border bg-surface px-3 py-1.5">
            {t}
          </span>
        ))}
      </div>
      <div className="mt-[120vh] text-faint">Scroll target (verifies hidden scrollbar).</div>
    </main>
  );
}
