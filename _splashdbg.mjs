import { chromium } from "playwright";

const outDir =
  "C:/Users/moham/AppData/Local/Temp/claude/C--Devspace-webprojects-Chip-Zenix/c270e5f8-cb1a-4d10-b1af-0aadf9777f88/scratchpad";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const logs = [];
page.on("console", (m) => logs.push(`${m.type()}: ${m.text()}`));
page.on("pageerror", (e) => logs.push("PAGEERROR: " + e.message));
await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });

for (const t of [200, 500, 900, 1500, 2200]) {
  await page.waitForTimeout(t === 200 ? 200 : t - prev(t));
  const state = await page.evaluate(() => ({
    splash: !!document.querySelector("[data-splash-mark]"),
    ss: sessionStorage.getItem("cz-splash"),
    htmlOverflow: document.documentElement.style.overflow,
  }));
  console.log(`t=${t}ms`, JSON.stringify(state));
  await page.screenshot({ path: `${outDir}/dbg-${t}.png` });
}
function prev(t) {
  const seq = [0, 200, 500, 900, 1500, 2200];
  return seq[seq.indexOf(t) - 1];
}
console.log("logs:\n" + logs.slice(0, 20).join("\n"));
await browser.close();
