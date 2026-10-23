const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright-core');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1
  });

  const fileUrl = 'file://' + path.resolve('motion/index.html');
  await page.goto(fileUrl, { waitUntil: 'networkidle' });

  // Wait for Google Fonts to be ready
  await page.waitForFunction(() => window.__fontsLoaded === true);
  await page.evaluate(() => document.fonts.ready);

  console.log('Fonts loaded. Rendering 31 beat check frames...');
  fs.mkdirSync('.playwright-cli/beat-checks', { recursive: true });

  for (let beat = 0; beat <= 30; beat++) {
    const t = beat * 0.5;
    await page.evaluate((time) => window.seek(time), t);
    const filename = `.playwright-cli/beat-checks/beat_${String(beat).padStart(2, '0')}.png`;
    await page.screenshot({ path: filename, type: 'png' });
    console.log(`Beat ${beat} (t = ${t.toFixed(1)}s) -> ${filename}`);
  }

  await browser.close();
  console.log('Beat check frames rendered successfully.');
})();
