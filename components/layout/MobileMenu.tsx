"use client";

import Link from "next/link";
import { useRef } from "react";
import { navLinks } from "@/lib/content";
import { Button } from "@/components/ui/Button";

export function MobileMenu() {
  const ref = useRef<HTMLDialogElement>(null);
  const open = () => ref.current?.showModal();
  const close = () => ref.current?.close();

  return (
    <>
      <button
        onClick={open}
        aria-label="Open menu"
        className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius)] border border-border text-ink"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      <dialog
        ref={ref}
        aria-label="Site menu"
        onClick={(e) => {
          if (e.target === ref.current) close();
        }}
        className="m-0 h-dvh max-h-dvh w-full max-w-full bg-bg-deep text-ink backdrop:bg-black/70"
      >
        <div className="flex h-dvh w-full flex-col p-6">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              Chip Zenix
            </span>
            <button
              onClick={close}
              aria-label="Close menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius)] border border-border text-ink"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <nav className="mt-10 flex flex-col" aria-label="Mobile">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={close}
                className="border-b border-border py-4 text-2xl font-semibold text-ink"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto">
            <Button href="/contact" className="w-full" onClick={close}>
              Start a project
            </Button>
          </div>
        </div>
      </dialog>
    </>
  );
}
