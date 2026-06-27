import type { MouseEvent } from "react";
import { getLenis } from "./lenisStore";

const NAV_OFFSET = -72; // clear the fixed header when landing on a section

/**
 * Smooth-scroll handler for in-page hash links (e.g. "/#industries").
 * If the link targets a section on the page we're already on, intercept it and
 * smooth-scroll via Lenis (or native, under reduced motion). Otherwise do
 * nothing and let Next handle the cross-page navigation (it lands on the hash).
 */
export function handleHashNav(e: MouseEvent<HTMLAnchorElement>, href: string) {
  const hashIndex = href.indexOf("#");
  if (hashIndex === -1) return;

  const path = href.slice(0, hashIndex) || "/";
  const id = href.slice(hashIndex + 1);
  if (!id) return;

  const samePage = window.location.pathname === path;
  if (!samePage) return; // cross-page: let Next navigate, then land on the hash

  const target = document.getElementById(id);
  if (!target) return;

  e.preventDefault();
  const lenis = getLenis();
  if (lenis) lenis.scrollTo(target, { offset: NAV_OFFSET });
  else target.scrollIntoView({ behavior: "smooth" });
  history.replaceState(null, "", href);
}
