/**
 * The accent as "r, g, b" for canvas drawing (canvas can't read CSS variables).
 * Read from `--accent-rgb` in globals.css so the canvases follow the theme.
 */
export function accentRgb(): string {
  const raw = getComputedStyle(document.documentElement).getPropertyValue("--accent-rgb").trim();
  return raw ? raw.split(/[\s,]+/).join(", ") : "46, 168, 255";
}
