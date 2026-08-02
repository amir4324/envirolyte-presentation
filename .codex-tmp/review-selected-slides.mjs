import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
import fs from "node:fs";

const require = createRequire(import.meta.url);
const { chromium } = require("C:/Users/LENOVO/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright");

const deckPath = "C:/Users/LENOVO/My Drive/Desktop - Lenovo/Projects/envirolyte/Powerpoint/index.html";
const outputDir = "C:/Users/LENOVO/My Drive/Desktop - Lenovo/Projects/envirolyte/Powerpoint/.codex-tmp/selected-slide-review";
fs.mkdirSync(outputDir, { recursive: true });

const browser = await chromium.launch({
  headless: true,
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe"
});
const page = await browser.newPage({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1 });
const errors = [];
page.on("pageerror", error => errors.push(`pageerror: ${error.message}`));
await page.goto(pathToFileURL(deckPath).href, { waitUntil: "load" });
await page.evaluate(() => localStorage.removeItem("envirolyte-language"));
await page.reload({ waitUntil: "load" });

const targets = new Set([1, 2, 12, 14]);
for (let slide = 1; slide <= 14; slide += 1) {
  if (targets.has(slide)) {
    await page.locator(".slide.active").screenshot({ path: `${outputDir}/slide-${slide}-en.png` });
  }
  if (slide < 14) await page.locator("#nextBtn").click();
}

await page.locator("#languageBtn").click();
for (let slide = 14; slide >= 1; slide -= 1) {
  if (targets.has(slide)) {
    await page.locator(".slide.active").screenshot({ path: `${outputDir}/slide-${slide}-ar.png` });
  }
  if (slide > 1) await page.locator("#prevBtn").click();
}

const unresolved = await page.locator("body").evaluate(body => {
  const text = body.innerText;
  return [
    "[شعار الجهة]",
    "[Organization logo]",
    "موعد ومكان العرض",
    "Demonstration date and location",
    "[اسم الشركة أو الوكيل في قطر]",
    "[Company or representative in Qatar]"
  ].filter(value => text.includes(value));
});

console.log(JSON.stringify({ errors, unresolved }, null, 2));
await browser.close();
