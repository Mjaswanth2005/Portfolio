const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');
const { chromium } = require('playwright-core');

const DURATION = 15.0;
const FPS = 15; // 225 frames for 15.0s
const TOTAL_FRAMES = DURATION * FPS;
const NUM_WORKERS = 3;
const TMP_DIR = '/tmp/about_frames';

async function runWorker(workerId, startFrame, endFrame) {
  const browser = await chromium.launch({
    headless: true,
    args: [
      '--allow-file-access-from-files',
      '--disable-gpu',
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  });
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1
  });

  const fileUrl = 'file://' + path.resolve('motion/about.html?render=true');
  await page.goto(fileUrl, { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => window.__threeReady === true);

  console.log(`Worker ${workerId} started: frames ${startFrame}..${endFrame - 1}`);

  for (let f = startFrame; f < endFrame; f++) {
    const t = f / FPS;
    await page.evaluate((time) => window.seek(time), t);
    const filename = path.join(TMP_DIR, `frame_${String(f).padStart(4, '0')}.jpg`);
    await page.screenshot({ path: filename, type: 'jpeg', quality: 85 });
  }

  await browser.close();
  console.log(`Worker ${workerId} finished.`);
}

(async () => {
  const startTime = Date.now();
  console.log(`Starting About Me 3D motion render:`);
  console.log(`- Duration: ${DURATION}s`);
  console.log(`- Capture FPS: ${FPS} fps (Total ${TOTAL_FRAMES} frames)`);
  console.log(`- Parallel Workers: ${NUM_WORKERS}`);

  if (fs.existsSync(TMP_DIR)) {
    fs.rmSync(TMP_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(TMP_DIR, { recursive: true });

  const framesPerWorker = Math.ceil(TOTAL_FRAMES / NUM_WORKERS);
  const workers = [];

  for (let w = 0; w < NUM_WORKERS; w++) {
    const start = w * framesPerWorker;
    const end = Math.min(start + framesPerWorker, TOTAL_FRAMES);
    workers.push(runWorker(w + 1, start, end));
  }

  await Promise.all(workers);

  const captureSec = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`Captured all ${TOTAL_FRAMES} frames in ${captureSec}s.`);

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
  console.log(`Total 3D motion pipeline finished in ${((Date.now() - startTime) / 1000).toFixed(1)}s!`);
})();
