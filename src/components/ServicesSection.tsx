import React from 'react';
import { FadeIn } from './FadeIn';

export const ServicesSection: React.FC = () => {
  return (
    <section
      id="services"
      className="relative w-full bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 z-10 select-none"
    >
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <FadeIn delay={0} y={40} className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2
            className="text-[#0C0C0C] font-black uppercase tracking-tight leading-tight text-center"
            style={{ fontSize: 'clamp(2.2rem, 6.5vw, 90px)' }}
          >
            Domains Interested to work
          </h2>
        </FadeIn>

        {/* Embedded Motion Design Reel */}
        <FadeIn delay={0.15} y={30}>
          <div className="relative rounded-2xl md:rounded-3xl border border-[#0C0C0C]/15 bg-white shadow-xl shadow-black/5 overflow-hidden">
            <div className="relative aspect-video w-full bg-[#FFFFFF] overflow-hidden">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="/domains_motion_loop.webm" type="video/webm" />
                <source src="/domains_motion_loop.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
