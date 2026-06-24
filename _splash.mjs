import { chromium } from "playwright";

const outDir =
  "C:/Users/moham/AppData/Local/Temp/claude/C--Devspace-webprojects-Chip-Zenix/c270e5f8-cb1a-4d10-b1af-0aadf9777f88/scratchpad";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(900);
await page.screenshot({ path: `${outDir}/splash-frame.png` });
await page.waitForTimeout(3200);
await page.screenshot({ path: `${outDir}/splash-after.png` });
console.log(errors.length ? "ERRORS: " + errors.join(" | ") : "no page errors");
await browser.close();
