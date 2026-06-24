"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { navLinks } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "./MobileMenu";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[var(--z-sticky)] border-b transition-colors duration-300 ${
        scrolled ? "border-border bg-bg" : "border-transparent bg-transparent"
      }`}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-3.5 sm:px-8"
        aria-label="Primary"
      >
        <Link href="/" className="flex items-center gap-2.5" aria-label="Chip Zenix home">
          <Image
            src="/logo-icon.webp"
            alt=""
            width={36}
            height={36}
            className="h-9 w-9"
            priority
          />
          <span className="text-lg font-semibold tracking-tight text-ink">
            Chip<span className="text-accent">Zenix</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-muted transition-colors hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
          <Button href="/contact" className="min-h-0 px-5 py-2.5">
            Start a project
          </Button>
        </div>

        <div className="lg:hidden">
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
}
