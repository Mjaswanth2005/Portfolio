import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateCardScale,
  calculateCardTopOffset,
  calculateMarqueeOffset,
  calculateMagneticOffset,
  prepareCharacters,
} from './math.ts';

test('calculateCardScale calculates target scale properly for 3 cards', () => {
  // totalCards = 3:
  // index 0: 1 - (3 - 1 - 0) * 0.03 = 1 - 0.06 = 0.94
  // index 1: 1 - (3 - 1 - 1) * 0.03 = 1 - 0.03 = 0.97
  // index 2: 1 - (3 - 1 - 2) * 0.03 = 1 - 0.00 = 1.00
  assert.equal(calculateCardScale(0, 3), 0.94);
  assert.equal(calculateCardScale(1, 3), 0.97);
  assert.equal(calculateCardScale(2, 3), 1.0);
});

test('calculateCardTopOffset calculates correct pixel offset per card index', () => {
  assert.equal(calculateCardTopOffset(0), 0);
  assert.equal(calculateCardTopOffset(1), 28);
  assert.equal(calculateCardTopOffset(2), 56);
});

test('calculateMarqueeOffset applies formula (scrollY - sectionTop + windowHeight) * 0.3', () => {
  const result = calculateMarqueeOffset(500, 300, 800, 0.3);
  // (500 - 300 + 800) * 0.3 = 1000 * 0.3 = 300
  assert.equal(result, 300);
});

test('calculateMagneticOffset returns coordinates when inside padding radius', () => {
  const rect = { left: 100, top: 100, width: 200, height: 200 };
  // Center is at (200, 200)
  // Cursor at (230, 260) -> dx = 30, dy = 60. Distance = sqrt(900 + 3600) = ~67
  // maxDistance = 100 + 150 = 250
  const inside = calculateMagneticOffset({
    clientX: 230,
    clientY: 260,
    rect,
    padding: 150,
    strength: 3,
  });

  assert.equal(inside.isNear, true);
  assert.equal(inside.x, 10);
  assert.equal(inside.y, 20);

  // Far cursor -> outside
  const outside = calculateMagneticOffset({
    clientX: 1000,
    clientY: 1000,
    rect,
    padding: 150,
    strength: 3,
  });
  assert.equal(outside.isNear, false);
  assert.equal(outside.x, 0);
  assert.equal(outside.y, 0);
});

test('prepareCharacters correctly slices text into indexed character objects', () => {
  const result = prepareCharacters('Hi');
  assert.equal(result.length, 2);
  assert.equal(result[0].char, 'H');
  assert.equal(result[0].start, 0);
  assert.equal(result[0].end, 0.5);
  assert.equal(result[1].char, 'i');
  assert.equal(result[1].start, 0.5);
  assert.equal(result[1].end, 1);
});
