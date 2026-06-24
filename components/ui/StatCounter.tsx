"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { usePrefersReducedMotion } from "@/lib/motion/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function StatCounter({
  value,
  suffix = "",
  label,
}: {
  value: number;
  suffix?: string;
  label: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reduced) return; // reduced motion / no-JS: final value stays rendered
      const obj = { n: 0 };
      gsap.to(obj, {
        n: value,
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
        onUpdate: () => {
          el.textContent = `${Math.round(obj.n)}${suffix}`;
        },
      });
    },
    { dependencies: [reduced] },
  );

  return (
    <div className="flex flex-col gap-2">
      <span
        ref={ref}
        className="font-mono text-[clamp(2.5rem,6vw,4rem)] font-bold leading-none text-ink"
      >
        {`${value}${suffix}`}
      </span>
      <span className="text-sm text-muted">{label}</span>
    </div>
  );
}
