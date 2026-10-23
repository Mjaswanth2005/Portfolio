const fs = require('fs');

const SAMPLE_RATE = 44100;
const DURATION = 15.0;
const TOTAL_SAMPLES = Math.floor(SAMPLE_RATE * DURATION);

const left = new Float32Array(TOTAL_SAMPLES);
const right = new Float32Array(TOTAL_SAMPLES);

function addSample(idx, l, r) {
  if (idx >= 0 && idx < TOTAL_SAMPLES) {
    left[idx] += l;
    right[idx] += r;
  }
}

// 1. Kick on every beat (120 BPM = 0.5s intervals, 30 beats)
for (let beat = 0; beat < 30; beat++) {
  const tStart = beat * 0.5;
  const startIdx = Math.floor(tStart * SAMPLE_RATE);
  const kickDuration = 0.28;
  const kickSamples = Math.floor(kickDuration * SAMPLE_RATE);

  for (let i = 0; i < kickSamples; i++) {
    const t = i / SAMPLE_RATE;
    // Pitch drops from 140Hz down to 42Hz exponentially
    const pitch = 42 + 98 * Math.exp(-t * 35);
    const phase = 2 * Math.PI * (42 * t + (98 / 35) * (1 - Math.exp(-t * 35)));
    const env = Math.exp(-t * 12);
    // Click transient
    const click = (i < 40) ? (Math.random() * 2 - 1) * Math.exp(-t * 400) * 0.4 : 0;
    const sample = (Math.sin(phase) + 0.15 * Math.sin(phase * 2)) * env * 0.75 + click;
    addSample(startIdx + i, sample, sample);
  }
}

// 2. Scene Change Hits on key moments
// Transitions:
// t = 0.0 (Hook)
// t = 2.0 (01 Web Dev)
// t = 4.4 (02 Full Stack)
// t = 6.8 (03 AI Agents)
// t = 9.2 (04 Branding)
// t = 11.6 (05 Web Design)
// t = 13.8 (Button Click)
// t = 14.0 (End Title JAS)
const hitTimes = [0.0, 2.0, 4.4, 6.8, 9.2, 11.6, 14.0];

for (const tHit of hitTimes) {
  const startIdx = Math.floor(tHit * SAMPLE_RATE);
  const hitSamples = Math.floor(0.7 * SAMPLE_RATE);
  for (let i = 0; i < hitSamples; i++) {
    const t = i / SAMPLE_RATE;
    // Low sub impact (65Hz -> 30Hz)
    const subPhase = 2 * Math.PI * (30 * t + (35 / 15) * (1 - Math.exp(-t * 15)));
    const sub = Math.sin(subPhase) * Math.exp(-t * 6) * 0.6;
    // Crisp metallic click transient
    const noise = (Math.random() * 2 - 1) * Math.exp(-t * 80) * 0.35;
    // Harmonic bell-like overtone (880Hz & 1320Hz)
    const bell = (Math.sin(2 * Math.PI * 880 * t) + 0.5 * Math.sin(2 * Math.PI * 1320 * t)) * Math.exp(-t * 22) * 0.2;
    const total = sub + noise + bell;
    addSample(startIdx + i, total * 0.85, total * 0.85);
  }
}

// 3. Crisp Mouse Button Click at t = 13.8s
{
  const clickIdx = Math.floor(13.8 * SAMPLE_RATE);
  // Down-click and release 14ms later
  for (let i = 0; i < Math.floor(0.04 * SAMPLE_RATE); i++) {
    const t = i / SAMPLE_RATE;
    const impulse1 = (Math.random() * 2 - 1) * Math.exp(-t * 300) * 0.7;
    const tone = Math.sin(2 * Math.PI * 3400 * t) * Math.exp(-t * 200) * 0.4;
    addSample(clickIdx + i, impulse1 + tone, impulse1 + tone);
  }
  const relIdx = clickIdx + Math.floor(0.014 * SAMPLE_RATE);
  for (let i = 0; i < Math.floor(0.03 * SAMPLE_RATE); i++) {
    const t = i / SAMPLE_RATE;
    const impulse2 = (Math.random() * 2 - 1) * Math.exp(-t * 350) * 0.5;
    addSample(relIdx + i, impulse2, impulse2);
  }
}

// 4. White Noise Pitch Riser into the last full bar (t = 12.0s to 13.8s)
{
  const tRiserStart = 12.0;
  const tRiserEnd = 13.8;
  const startIdx = Math.floor(tRiserStart * SAMPLE_RATE);
  const riserDuration = tRiserEnd - tRiserStart;
  const riserSamples = Math.floor(riserDuration * SAMPLE_RATE);

  for (let i = 0; i < riserSamples; i++) {
    const t = i / SAMPLE_RATE;
    const progress = t / riserDuration; // 0 to 1
    // Exponential frequency rise: 200Hz to 6000Hz
    const freq = 200 * Math.pow(6000 / 200, progress);
    const noise = (Math.random() * 2 - 1);
    const sweptTone = Math.sin(2 * Math.PI * (200 * Math.pow(6000 / 200, progress) * (t / (progress + 0.0001))));
    const amp = Math.pow(progress, 2.2) * 0.45;
    const sample = (noise * 0.7 + sweptTone * 0.3) * amp;
    // Stereo spread
    addSample(startIdx + i, sample * (0.8 + 0.2 * Math.sin(t * 12)), sample * (0.8 - 0.2 * Math.sin(t * 12)));
  }
}

// 5. Normalization and soft limiting
let maxPeak = 0;
for (let i = 0; i < TOTAL_SAMPLES; i++) {
  if (Math.abs(left[i]) > maxPeak) maxPeak = Math.abs(left[i]);
  if (Math.abs(right[i]) > maxPeak) maxPeak = Math.abs(right[i]);
}

const gain = maxPeak > 0 ? (0.92 / maxPeak) : 1;

// Write 16-bit Stereo PCM WAV
const byteRate = SAMPLE_RATE * 2 * 2;
const dataSize = TOTAL_SAMPLES * 2 * 2;
const buffer = Buffer.alloc(44 + dataSize);

// RIFF header
buffer.write('RIFF', 0);
buffer.writeUInt32LE(36 + dataSize, 4);
buffer.write('WAVE', 8);
// fmt subchunk
buffer.write('fmt ', 12);
buffer.writeUInt32LE(16, 16); // Subchunk1Size (16 for PCM)
buffer.writeUInt16LE(1, 20); // AudioFormat (1 = PCM)
buffer.writeUInt16LE(2, 22); // NumChannels (2 = stereo)
buffer.writeUInt32LE(SAMPLE_RATE, 24);
buffer.writeUInt32LE(byteRate, 28);
buffer.writeUInt16LE(4, 32); // BlockAlign
buffer.writeUInt16LE(16, 34); // BitsPerSample
// data subchunk
buffer.write('data', 36);
buffer.writeUInt32LE(dataSize, 40);

let offset = 44;
for (let i = 0; i < TOTAL_SAMPLES; i++) {
  // Soft tanh limiter
  const l = Math.tanh(left[i] * gain);
  const r = Math.tanh(right[i] * gain);
  const sL = Math.max(-32768, Math.min(32767, Math.floor(l * 32767)));
  const sR = Math.max(-32768, Math.min(32767, Math.floor(r * 32767)));
  buffer.writeInt16LE(sL, offset);
  buffer.writeInt16LE(sR, offset + 2);
  offset += 4;
}

fs.writeFileSync('motion/soundtrack.wav', buffer);
console.log(`Generated motion/soundtrack.wav: ${TOTAL_SAMPLES} samples (${DURATION}s), peak: ${maxPeak.toFixed(3)} -> normalized.`);
