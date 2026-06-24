import type { ReactNode } from "react";

export function TechChip({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-sm border border-border bg-surface px-3 py-1.5 font-mono text-xs text-muted ${className}`}
    >
      {children}
    </span>
  );
}
