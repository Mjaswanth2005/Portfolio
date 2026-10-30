const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright-core');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    args: ['--disable-gpu', '--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1
  });

  const fileUrl = 'file://' + path.resolve('motion/about.html?render=true');
  console.log('Loading motion/about.html...');
  await page.goto(fileUrl, { waitUntil: 'networkidle' });

  await page.waitForFunction(() => window.__threeReady === true);
  console.log('Three.js scene ready.');

  fs.mkdirSync('.playwright-cli/about-checks', { recursive: true });

  const testShots = [
    { name: 'shot1_macro_moon', t: 1.0 },
    { name: 'shot2_dolly_drift', t: 3.5 },
    { name: 'shot3_brick_bump', t: 6.2 },
    { name: 'shot4_button_click', t: 8.8 },
    { name: 'shot5_signature_letters', t: 11.5 },
    { name: 'shot6_settle', t: 13.2 },
    { name: 'loop_frame_0s', t: 0.0 },
    { name: 'loop_frame_15s', t: 15.0 }
  ];

  for (const s of testShots) {
    await page.evaluate((time) => window.seek(time), s.t);
    const filename = `.playwright-cli/about-checks/${s.name}.png`;
    await page.screenshot({ path: filename, type: 'png' });
    console.log(`Captured ${s.name} at t = ${s.t}s -> ${filename}`);
  }

  await browser.close();
  console.log('All shot checks captured successfully.');
})();
