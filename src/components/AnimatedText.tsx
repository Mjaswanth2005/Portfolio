import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'motion/react';
import { prepareCharacters } from '../utils/math';

interface CharacterSpanProps {
  char: string;
  range: [number, number];
  progress: MotionValue<number>;
}

const CharacterSpan: React.FC<CharacterSpanProps> = ({ char, range, progress }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span className="relative inline-block whitespace-pre">
      <span className="invisible select-none" aria-hidden="true">
        {char}
      </span>
      <motion.span style={{ opacity }} className="absolute inset-0">
        {char}
      </motion.span>
    </span>
  );
};

interface AnimatedTextProps {
  text: string;
  className?: string;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '' }) => {
  const targetRef = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const characters = useMemo(() => prepareCharacters(text), [text]);

  return (
    <p
      ref={targetRef}
      className={`relative text-center text-[#D7E2EA] font-medium leading-relaxed max-w-[560px] mx-auto select-none ${className}`}
      style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
    >
      {characters.map((item) => (
        <CharacterSpan
          key={item.index}
          char={item.char}
          range={[item.start, item.end]}
          progress={scrollYProgress}
        />
      ))}
    </p>
  );
};
