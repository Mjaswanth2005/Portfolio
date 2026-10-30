const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');
const { chromium } = require('playwright-core');

const DURATION = 15.0;
const FPS = 15;
const TMP_DIR = '/tmp/about_frames';

(async () => {
  const files = fs.readdirSync(TMP_DIR);
  const missing = [];
  for (let i = 0; i < 225; i++) {
    const name = `frame_${String(i).padStart(4, '0')}.jpg`;
    if (!files.includes(name)) missing.push(i);
  }

  console.log(`Missing ${missing.length} frames:`, missing);

  if (missing.length > 0) {
    const browser = await chromium.launch({
      headless: true,
      args: ['--allow-file-access-from-files', '--disable-gpu', '--no-sandbox']
    });
    const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
    await page.goto('file://' + path.resolve('motion/about.html?render=true'));
    await page.waitForFunction(() => window.__threeReady === true);

    for (const f of missing) {
      const t = f / FPS;
      await page.evaluate((time) => window.seek(time), t);
      const filename = path.join(TMP_DIR, `frame_${String(f).padStart(4, '0')}.jpg`);
      await page.screenshot({ path: filename, type: 'jpeg', quality: 85 });
      console.log(`Rendered frame ${f} (t = ${t.toFixed(2)}s)`);
    }
    await browser.close();
  }

  console.log('All 225 frames confirmed present.');

  fs.mkdirSync('public', { recursive: true });

  const mp4Out = 'public/about_motion_loop.mp4';
  const webmOut = 'public/about_motion_loop.webm';

  console.log('\n--- Step 1: Encoding silent looping MP4 (H.264, 1920x1080 @ 60fps) ---');
  execSync(`ffmpeg -y -framerate ${FPS} -i "${TMP_DIR}/frame_%04d.jpg" -r 60 -c:v libx264 -preset slow -crf 22 -pix_fmt yuv420p -movflags +faststart "${mp4Out}"`, { stdio: 'inherit' });

  console.log('\n--- Step 2: Encoding silent looping WebM (VP9, 1920x1080 @ 60fps) ---');
  execSync(`ffmpeg -y -i "${mp4Out}" -c:v libvpx-vp9 -crf 32 -b:v 0 -pix_fmt yuv420p "${webmOut}"`, { stdio: 'inherit' });

  fs.copyFileSync(mp4Out, 'about_motion_loop.mp4');
  fs.copyFileSync(webmOut, 'about_motion_loop.webm');

  fs.rmSync(TMP_DIR, { recursive: true, force: true });
  console.log('Cleaned up temporary frames.');

  console.log('\n--- Final Video Stats ---');
  execSync('ls -lh public/about_motion_loop.* about_motion_loop.*', { stdio: 'inherit' });
  console.log('3D motion video render and encoding complete!');
})();
