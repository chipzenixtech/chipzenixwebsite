import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

// Reduced-motion / no-JS path: the counter must show its final value, not animate from 0.
vi.mock("@/lib/motion/usePrefersReducedMotion", () => ({
  usePrefersReducedMotion: () => true,
}));

import { StatCounter } from "./StatCounter";

describe("StatCounter", () => {
  it("renders the final value and label immediately under reduced motion", () => {
    render(<StatCounter value={100} suffix="+" label="Projects delivered" />);
    expect(screen.getByText("100+")).toBeInTheDocument();
    expect(screen.getByText("Projects delivered")).toBeInTheDocument();
  });
});
