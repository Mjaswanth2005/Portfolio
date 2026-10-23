const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');
const { chromium } = require('playwright-core');

const TOTAL_DURATION_SEC = 15.0;
const OUTPUT_FPS = 60;
const SUBFRAMES_PER_FRAME = 3;
const SUBFRAME_FPS = OUTPUT_FPS * SUBFRAMES_PER_FRAME; // 180 fps
const TOTAL_SUBFRAMES = TOTAL_DURATION_SEC * SUBFRAME_FPS; // 2700 subframes
const NUM_WORKERS = 6;
const TMP_FRAMES_DIR = '/tmp/motion_frames';

(async () => {
  const startTime = Date.now();
  console.log(`Starting full motion render:`);
  console.log(`- Duration: ${TOTAL_DURATION_SEC}s`);
  console.log(`- Framerate: ${OUTPUT_FPS} fps with 3 subframes (${SUBFRAME_FPS} subframe fps)`);
  console.log(`- Total subframes: ${TOTAL_SUBFRAMES}`);
  console.log(`- Parallel workers: ${NUM_WORKERS}`);

  if (fs.existsSync(TMP_FRAMES_DIR)) {
    fs.rmSync(TMP_FRAMES_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(TMP_FRAMES_DIR, { recursive: true });

  const browser = await chromium.launch({
    headless: true,
    args: ['--disable-gpu', '--no-sandbox', '--disable-setuid-sandbox']
  });

  const framesPerWorker = Math.ceil(TOTAL_SUBFRAMES / NUM_WORKERS);

  const workerPromises = Array.from({ length: NUM_WORKERS }).map(async (_, workerIdx) => {
    const page = await browser.newPage({
      viewport: { width: 1920, height: 1080 },
      deviceScaleFactor: 1
    });

    const fileUrl = 'file://' + path.resolve('motion/index.html');
    await page.goto(fileUrl, { waitUntil: 'networkidle' });
    await page.waitForFunction(() => window.__fontsLoaded === true);
    await page.evaluate(() => document.fonts.ready);

    const startFrame = workerIdx * framesPerWorker;
    const endFrame = Math.min(startFrame + framesPerWorker, TOTAL_SUBFRAMES);
    const workerTotal = endFrame - startFrame;
    if (workerTotal <= 0) {
      await page.close();
      return;
    }

    const batchSize = 15;
    for (let b = 0; b < workerTotal; b += batchSize) {
      const currentBatchCount = Math.min(batchSize, workerTotal - b);
      const batchStart = startFrame + b;

      const frames = await page.evaluate(({ from, count, fps }) => {
        const c = document.getElementById('canvas');
        const list = [];
        for (let i = 0; i < count; i++) {
          const t = (from + i) / fps;
          window.seek(t);
          list.push(c.toDataURL('image/jpeg', 0.92).split(',')[1]);
        }
        return list;
      }, { from: batchStart, count: currentBatchCount, fps: SUBFRAME_FPS });

      for (let i = 0; i < frames.length; i++) {
        const frameIdx = batchStart + i;
        const buf = Buffer.from(frames[i], 'base64');
        const filename = path.join(TMP_FRAMES_DIR, `subframe_${String(frameIdx).padStart(5, '0')}.jpg`);
        fs.writeFileSync(filename, buf);
      }
    }

    console.log(`Worker ${workerIdx + 1}/${NUM_WORKERS} completed frames ${startFrame}..${endFrame - 1}`);
    await page.close();
  });

  await Promise.all(workerPromises);
  await browser.close();

  const renderTime = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`All ${TOTAL_SUBFRAMES} subframes captured to disk in ${renderTime}s.`);

  // Verify frame count
  const capturedFiles = fs.readdirSync(TMP_FRAMES_DIR).filter(f => f.endsWith('.jpg'));
  console.log(`Verified ${capturedFiles.length} subframe files in ${TMP_FRAMES_DIR}.`);

  fs.mkdirSync('public', { recursive: true });

  const silentMp4 = 'public/domains_motion_loop.mp4';
  const audioMp4 = 'public/domains_motion_audio.mp4';
  const silentWebm = 'public/domains_motion_loop.webm';
  const wavAudio = 'motion/soundtrack.wav';

  console.log('\n--- Step 1: Encoding silent looping MP4 with tmix motion blur (3 subframes -> 60fps) ---');
  execSync(`ffmpeg -y -framerate ${SUBFRAME_FPS} -i "${TMP_FRAMES_DIR}/subframe_%05d.jpg" -vf "tmix=frames=3:weights='1 1 1',fps=60" -c:v libx264 -preset slow -crf 22 -pix_fmt yuv420p -movflags +faststart "${silentMp4}"`, { stdio: 'inherit' });

  console.log('\n--- Step 2: Muxing with soundtrack into audio MP4 ---');
  execSync(`ffmpeg -y -i "${silentMp4}" -i "${wavAudio}" -c:v copy -c:a aac -b:a 192k -shortest "${audioMp4}"`, { stdio: 'inherit' });

  console.log('\n--- Step 3: Encoding silent looping WebM (VP9, 60fps, under 5MB) ---');
  execSync(`ffmpeg -y -i "${silentMp4}" -c:v libvpx-vp9 -crf 32 -b:v 0 -pix_fmt yuv420p "${silentWebm}"`, { stdio: 'inherit' });

  // Also copy to root for direct accessibility
  fs.copyFileSync(silentMp4, 'domains_motion_loop.mp4');
  fs.copyFileSync(audioMp4, 'domains_motion_audio.mp4');
  fs.copyFileSync(silentWebm, 'domains_motion_loop.webm');

  // Clean up temporary subframes
  fs.rmSync(TMP_FRAMES_DIR, { recursive: true, force: true });
  console.log(`Cleaned up temporary subframes in ${TMP_FRAMES_DIR}.`);

  console.log('\n--- Output Summary ---');
  execSync('ls -lh public/domains_motion* domains_motion*', { stdio: 'inherit' });
  console.log(`Full motion pipeline completed in ${((Date.now() - startTime) / 1000).toFixed(1)}s!`);
})();
