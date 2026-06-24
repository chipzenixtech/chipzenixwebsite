import { chromium } from "playwright";

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await page.mouse.move(720, 450);
await page.waitForTimeout(800);

// Wheel-scroll to the bottom so every reveal is crossed.
for (let i = 0; i < 60; i++) {
  await page.mouse.wheel(0, 400);
  await page.waitForTimeout(90);
}
await page.waitForTimeout(1500);

const data = await page.evaluate(() => {
  const out = [];
  document.querySelectorAll("h2, h3, blockquote").forEach((el) => {
    out.push({
      t: (el.textContent || "").trim().slice(0, 26),
      op: getComputedStyle(el).opacity,
    });
  });
  return out;
});
const hidden = data.filter((d) => Number(d.op) < 0.99);
console.log("headings checked:", data.length, "| still hidden:", hidden.length);
hidden.forEach((h) => console.log("  HIDDEN:", h.t, h.op));
console.log(errors.length ? "ERRORS: " + errors.join(" | ") : "no page errors");
await browser.close();
