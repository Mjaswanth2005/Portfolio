import React, { useRef, useState, useEffect } from 'react';
import { calculateMarqueeOffset } from '../utils/math';

interface ShowreelItem {
  id: string;
  title: string;
  category: string;
  isVideo: boolean;
  videoSrc?: { mp4: string; webm: string };
  imageSrc: string;
}

const SHOWREEL_ITEMS: ShowreelItem[] = [
  {
    id: 'reel-agents',
    title: 'Agentic Reasoning Loop',
    category: 'Agent Orchestration',
    isVideo: true,
    videoSrc: {
      mp4: '/showreel_agentic.mp4',
      webm: '/showreel_agentic.webm',
    },
    imageSrc: '/images/reel_03_agents.webp',
  },
  {
    id: 'reel-web',
    title: 'Zero-Latency Interface',
    category: 'Full Stack Web',
    isVideo: false,
    imageSrc: '/images/reel_01_web.webp',
  },
  {
    id: 'reel-spatial',
    title: 'Spatial Architecture & 3D',
    category: 'Motion Systems',
    isVideo: true,
    videoSrc: {
      mp4: '/showreel_spatial.mp4',
      webm: '/showreel_spatial.webm',
    },
    imageSrc: '/images/reel_05_interface.webp',
  },
  {
    id: 'reel-stack',
    title: 'Distributed Infrastructure',
    category: 'Cloud & APIs',
    isVideo: false,
    imageSrc: '/images/reel_02_stack.webp',
  },
  {
    id: 'reel-brand',
    title: 'Brand Geometry & Marks',
    category: 'Visual Strategy',
    isVideo: false,
    imageSrc: '/images/reel_04_brand.webp',
  },
  {
    id: 'reel-typography',
    title: 'Architectural Typography',
    category: 'Design Systems',
    isVideo: false,
    imageSrc: '/images/reel_06_typography.webp',
  },
];

// Duplicated once for smooth seamless loop
const SHOWREEL_COMBINED = [...SHOWREEL_ITEMS, ...SHOWREEL_ITEMS];

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState<number>(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const calculated = calculateMarqueeOffset(window.scrollY, sectionTop, window.innerHeight, 0.25);
      setOffset(calculated);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="marquee"
      aria-label="Interactive Systems & Design Showreel"
      className="bg-[#0C0C0C] pt-16 sm:pt-24 pb-12 overflow-hidden select-none"
    >
      <div className="w-full overflow-hidden">
        <div
          className="flex gap-4 will-change-transform motion-reduce:transform-none"
          style={
            prefersReducedMotion
              ? {}
              : {
                  transform: `translateX(${offset - 100}px)`,
                  willChange: 'transform',
                }
          }
        >
          {SHOWREEL_COMBINED.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="w-[360px] sm:w-[440px] md:w-[480px] shrink-0 rounded-3xl overflow-hidden bg-[#14161A] border border-white/10 shadow-2xl relative group"
            >
              {item.isVideo && item.videoSrc ? (
                <div className="relative aspect-video w-full bg-black overflow-hidden">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="none"
                    poster={item.imageSrc}
                    width={480}
                    height={270}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  >
                    <source src={item.videoSrc.webm} type="video/webm" />
                    <source src={item.videoSrc.mp4} type="video/mp4" />
                  </video>
                  <div className="absolute top-3 left-3 z-10 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono uppercase tracking-wider text-white">
                    LIVE CLIP
                  </div>
                </div>
              ) : (
                <div className="relative aspect-video w-full bg-black overflow-hidden">
                  <img
                    src={item.imageSrc}
                    alt={`${item.title} - ${item.category} showreel showcase`}
                    loading="lazy"
                    width={480}
                    height={270}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-3 left-3 z-10 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono uppercase tracking-wider text-white/70">
                    STILL
                  </div>
                </div>
              )}

              {/* Caption Overlay */}
              <div className="p-4 bg-gradient-to-t from-black/90 to-black/40 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#B600A8] font-bold block">
                    {item.category}
                  </span>
                  <h4 className="text-xs sm:text-sm font-semibold uppercase text-white tracking-tight">
                    {item.title}
                  </h4>
                </div>
                <span className="text-[11px] font-mono text-white/40">
                  #{String((index % SHOWREEL_ITEMS.length) + 1).padStart(2, '0')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
