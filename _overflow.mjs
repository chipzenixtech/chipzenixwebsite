import { chromium } from "playwright";

const browser = await chromium.launch();
const routes = ["/", "/services/", "/about/", "/careers/", "/contact/"];
const widths = [360, 390, 768, 1024, 1440, 1920];
let problems = 0;

for (const w of widths) {
  const ctx = await browser.newContext({
    viewport: { width: w, height: 900 },
    reducedMotion: "reduce",
  });
  for (const r of routes) {
    const page = await ctx.newPage();
    await page.goto("http://localhost:3000" + r, { waitUntil: "networkidle" });
    await page.waitForTimeout(400);
    const m = await page.evaluate(() => ({
      sw: document.documentElement.scrollWidth,
      iw: window.innerWidth,
    }));
    const bad = m.sw > m.iw + 1;
    if (bad) problems++;
    console.log(`${String(w).padStart(4)}px ${r.padEnd(11)} sw=${m.sw} iw=${m.iw} ${bad ? "<<< OVERFLOW" : "ok"}`);
    await page.close();
  }
  await ctx.close();
}
await browser.close();
console.log(problems ? `\n${problems} OVERFLOW issue(s)` : "\nNo horizontal overflow anywhere ✓");
