import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await (
  await browser.newContext({ viewport: { width: 1440, height: 900 } })
).newPage();

for (let i = 0; i < 5; i++) {
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);
  const data = await page.evaluate(() =>
    Array.from(document.querySelectorAll("[data-hero]")).map((e) => ({
      tag: e.tagName,
      opacity: getComputedStyle(e).opacity,
      text: (e.textContent || "").trim().slice(0, 20),
    })),
  );
  const hidden = data.filter((d) => Number(d.opacity) < 0.99).length;
  console.log(`reload ${i}: ${hidden}/${data.length} hidden | ` + data.map((d) => `${d.text}=${d.opacity}`).join(" , "));
}
await browser.close();
