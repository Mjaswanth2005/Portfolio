/**
 * Pure helper and calculation functions for calculations, animations, and layouts.
 */

export function calculateCardScale(index: number, totalCards: number): number {
  return 1 - (totalCards - 1 - index) * 0.03;
}

export function calculateCardTopOffset(index: number): number {
  return index * 28;
}

export function calculateMarqueeOffset(
  scrollY: number,
  sectionTop: number,
  windowHeight: number,
  factor = 0.3
): number {
  return (scrollY - sectionTop + windowHeight) * factor;
}

export interface MagneticOffsetInput {
  clientX: number;
  clientY: number;
  rect: {
    left: number;
    top: number;
    width: number;
    height: number;
  };
  padding: number;
  strength: number;
}

export function calculateMagneticOffset({
  clientX,
  clientY,
  rect,
  padding,
  strength,
}: MagneticOffsetInput): { x: number; y: number; isNear: boolean } {
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const dx = clientX - centerX;
  const dy = clientY - centerY;

  const distance = Math.hypot(dx, dy);
  const maxDistance = Math.max(rect.width, rect.height) / 2 + padding;

  if (distance < maxDistance && strength > 0) {
    return {
      x: dx / strength,
      y: dy / strength,
      isNear: true,
    };
  }

  return { x: 0, y: 0, isNear: false };
}

export interface CharacterItem {
  char: string;
  index: number;
  start: number;
  end: number;
}

export function prepareCharacters(text: string): CharacterItem[] {
  const chars = Array.from(text);
  const total = chars.length;

  return chars.map((char, index) => {
    const start = index / total;
    const end = (index + 1) / total;
    return {
      char,
      index,
      start,
      end,
    };
  });
}
