import React from 'react';
import { FadeIn } from './FadeIn';
import { ContactButton } from './ContactButton';
import { Bot, Cpu, Target } from 'lucide-react';

interface AboutSectionProps {
  onOpenContact: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenContact }) => {
  return (
    <section
      id="about"
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-24 sm:py-32 bg-[#0C0C0C] overflow-hidden select-none"
    >
      {/* Decorative 3D elements in corners */}
      <div className="absolute top-[6%] left-[2%] sm:left-[4%] pointer-events-none z-10 opacity-60" aria-hidden="true">
        <FadeIn delay={0.1} x={-60} y={0} duration={0.9}>
          <picture>
            <source srcSet="/images/moon_icon.webp" type="image/webp" />
            <img
              src="/images/moon_icon.png"
              alt=""
              width={210}
              height={210}
              className="w-[100px] sm:w-[140px] md:w-[180px] h-auto object-contain drop-shadow-xl"
              loading="lazy"
            />
          </picture>
        </FadeIn>
      </div>

      <div className="absolute top-[6%] right-[2%] sm:right-[4%] pointer-events-none z-10 opacity-60" aria-hidden="true">
        <FadeIn delay={0.15} x={60} y={0} duration={0.9}>
          <picture>
            <source srcSet="/images/lego_icon.webp" type="image/webp" />
            <img
              src="/images/lego_icon.png"
              alt="Decorative 3D geometric block element"
              width={210}
              height={256}
              className="w-[100px] sm:w-[140px] md:w-[180px] h-auto object-contain drop-shadow-xl"
              loading="lazy"
            />
          </picture>
        </FadeIn>
      </div>

      {/* Main Content Center */}
      <div className="relative z-20 flex flex-col items-center max-w-4xl mx-auto w-full">
        {/* Section Pill */}
        <FadeIn delay={0} y={20} className="mb-4">
          <span className="text-xs uppercase tracking-widest text-[#B600A8] font-bold px-3 py-1 rounded-full bg-white/5 border border-white/10">
            About Me
          </span>
        </FadeIn>

        {/* Heading */}
        <FadeIn delay={0.1} y={30} className="w-full text-center">
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 110px)' }}
          >
            Engineering With Taste
          </h2>
        </FadeIn>

        {/* 60-90 words Plain Text (Crawler-friendly & semantic) */}
        <FadeIn delay={0.2} y={30} className="mt-8 sm:mt-12 w-full text-center">
          <p
            className="text-[#D7E2EA] font-normal leading-relaxed max-w-3xl mx-auto tracking-normal selection:bg-[#B600A8]/30 selection:text-white"
            style={{ fontSize: 'clamp(1.1rem, 2.1vw, 1.85rem)' }}
          >
            I build autonomous AI agents, multi-model evaluation pipelines, and low-latency full-stack systems that operate reliably in production. I gravitate toward complex enterprise problems—agentic orchestration, tool-use verification, and high-throughput data processing where reliability and guardrails matter. Combining deep engineering rigor with sharp design instinct, I am targeting Forward Deployed Engineer and Agentic AI Engineer roles where I can bridge model intelligence directly into user-facing product impact.
          </p>
        </FadeIn>

        {/* 3 Pillar Quick-Cards: What I Build / Problems I Like / Roles I Want */}
        <FadeIn delay={0.25} y={20} className="mt-12 sm:mt-16 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            <div className="p-6 rounded-3xl bg-[#121417] border border-white/10 shadow-lg">
              <div className="w-9 h-9 rounded-xl bg-[#B600A8]/20 flex items-center justify-center mb-3 text-[#B600A8]">
                <Bot className="w-4 h-4" />
              </div>
              <h3 className="text-xs uppercase tracking-wider text-white font-bold mb-1.5">
                What I Build
              </h3>
              <p className="text-xs text-[#9AA4B2] font-normal leading-relaxed">
                Autonomous agents, deterministic tool integrations, multi-modal evaluation pipelines, and fast API microservices.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#121417] border border-white/10 shadow-lg">
              <div className="w-9 h-9 rounded-xl bg-[#B600A8]/20 flex items-center justify-center mb-3 text-[#B600A8]">
                <Cpu className="w-4 h-4" />
              </div>
              <h3 className="text-xs uppercase tracking-wider text-white font-bold mb-1.5">
                Problems I Like
              </h3>
              <p className="text-xs text-[#9AA4B2] font-normal leading-relaxed">
                Unstructured edge cases, hybrid RAG retrieval, real-time tool failure recovery, and sub-100ms inference loops.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#121417] border border-white/10 shadow-lg">
              <div className="w-9 h-9 rounded-xl bg-[#B600A8]/20 flex items-center justify-center mb-3 text-[#B600A8]">
                <Target className="w-4 h-4" />
              </div>
              <h3 className="text-xs uppercase tracking-wider text-white font-bold mb-1.5">
                Roles I Want
              </h3>
              <p className="text-xs text-[#9AA4B2] font-normal leading-relaxed">
                Forward Deployed Engineer (FDE), Agentic AI Engineer, and Foundational Systems Builder at high-velocity teams.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Contact CTA */}
        <div className="mt-12 sm:mt-16">
          <FadeIn delay={0.4} y={20}>
            <ContactButton onClick={onOpenContact} />
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
