import React, { useRef, useState, useEffect } from 'react';
import { FadeIn } from './FadeIn';
import { Palette, Play, Pause, AlertCircle } from 'lucide-react';

export const CreativeWorkSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    // If user prefers reduced motion, pause video by default
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setHasError(true));
    }
  };

  return (
    <section
      id="creative"
      className="relative w-full bg-[#0C0C0C] border-t border-white/10 px-4 sm:px-8 md:px-10 pt-20 sm:pt-28 pb-20 sm:pb-28 select-none z-20"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <FadeIn delay={0} y={30} className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/15 text-[11px] font-semibold uppercase tracking-widest text-[#D7E2EA] mb-4 bg-white/5">
            <Palette className="w-3.5 h-3.5 text-[#B600A8]" />
            <span>Secondary Discipline</span>
          </div>

          <h2
            className="hero-heading font-black uppercase tracking-tight leading-none text-center"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 110px)' }}
          >
            Creative Work
          </h2>
          <p className="mt-4 text-xs sm:text-sm font-light uppercase tracking-wider text-[#8F98A7] max-w-xl mx-auto">
            3D modeling, spatial CGI, motion direction & kinetic identity design that fuels my visual engineering taste.
          </p>
        </FadeIn>

        {/* Cinematic 15-Second Motion Design Video Spotlight */}
        <FadeIn delay={0.15} y={20}>
          <div className="rounded-[32px] sm:rounded-[40px] border border-white/15 bg-[#121417] p-3 sm:p-5 shadow-2xl relative group">
            <div className="relative aspect-video w-full rounded-2xl md:rounded-3xl border border-white/10 bg-black overflow-hidden shadow-inner">
              {hasError ? (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-[#8F98A7] bg-[#121417]">
                  <AlertCircle className="w-8 h-8 text-[#B600A8] mb-2" />
                  <span className="text-sm font-semibold text-white">Motion Video Unavailable</span>
                  <span className="text-xs mt-1 max-w-sm">
                    Showing static preview poster. Video stream could not be loaded in current environment.
                  </span>
                  <img
                    src="/images/reel_04_brand.webp"
                    alt="Five Domains, One Build preview poster"
                    className="mt-4 rounded-xl max-h-48 object-cover border border-white/10"
                  />
                </div>
              ) : (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="none"
                    poster="/images/reel_04_brand.webp"
                    width={1920}
                    height={1080}
                    onError={() => setHasError(true)}
                    className="w-full h-full object-cover"
                  >
                    <source src="/domains_motion_loop.webm" type="video/webm" />
                    <source src="/domains_motion_loop.mp4" type="video/mp4" />
                  </video>

                  {/* Accessible Purposeful Motion Play/Pause Control (44x44px Tap Target) */}
                  <div className="absolute bottom-4 right-4 z-20">
                    <button
                      type="button"
                      onClick={togglePlay}
                      className="min-h-[44px] min-w-[44px] px-3 py-2 rounded-full bg-black/75 hover:bg-black/90 text-white border border-white/20 backdrop-blur-md flex items-center justify-center gap-1.5 text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-lg hover:scale-105"
                      aria-label={isPlaying ? 'Pause motion reel' : 'Play motion reel'}
                      title={isPlaying ? 'Pause motion reel' : 'Play motion reel'}
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="w-3.5 h-3.5 text-[#B600A8]" />
                          <span className="hidden sm:inline">Pause</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 text-[#B600A8] fill-[#B600A8]" />
                          <span className="hidden sm:inline">Play</span>
                        </>
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
