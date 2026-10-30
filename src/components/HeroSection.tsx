import React from 'react';
import { FadeIn } from './FadeIn';
import { Magnet } from './Magnet';
import { ContactButton } from './ContactButton';
import { BookOpen, ShieldCheck, CheckCircle2, ArrowDown, Download } from 'lucide-react';

interface HeroSectionProps {
  onOpenContact: () => void;
  onOpenPricing?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenContact,
}) => {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between overflow-x-clip bg-[#0C0C0C] select-none pt-3 pb-8 sm:pb-12"
    >
      {/* 1. Navbar */}
      <FadeIn
        delay={0}
        y={-16}
        as="nav"
        className="w-full px-4 sm:px-8 md:px-10 pt-3 md:pt-6 z-30"
        aria-label="Main Navigation"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between w-full">
          <a
            href="#hero"
            className="flex items-center gap-2 group cursor-pointer min-h-[44px] py-2"
            aria-label="Jaswanth Portfolio Home"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#B600A8] animate-pulse" />
            <span className="font-bold tracking-tight text-white uppercase text-sm sm:text-base">
              Jaswanth
            </span>
            <span className="text-xs text-[#8F98A7] font-mono hidden sm:inline">
              / AI Systems
            </span>
          </a>

          <ul className="flex items-center gap-4 sm:gap-7 md:gap-9 list-none p-0 m-0">
            <li>
              <a
                href="#about"
                className="text-[#D7E2EA] font-medium uppercase tracking-wider text-xs sm:text-sm hover:text-white transition-colors duration-200 min-h-[44px] inline-flex items-center py-2"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#domains"
                className="text-[#D7E2EA] font-medium uppercase tracking-wider text-xs sm:text-sm hover:text-white transition-colors duration-200 min-h-[44px] inline-flex items-center py-2"
              >
                Domains
              </a>
            </li>
            <li>
              <a
                href="#projects"
                className="text-[#D7E2EA] font-medium uppercase tracking-wider text-xs sm:text-sm hover:text-white transition-colors duration-200 min-h-[44px] inline-flex items-center py-2"
              >
                Projects
              </a>
            </li>
            <li>
              <a
                href="#creative"
                className="text-[#8F98A7] font-medium uppercase tracking-wider text-xs sm:text-sm hover:text-white transition-colors duration-200 min-h-[44px] hidden sm:inline-flex items-center py-2"
              >
                Creative
              </a>
            </li>
            <li>
              <button
                type="button"
                onClick={onOpenContact}
                className="text-[#D7E2EA] font-medium uppercase tracking-wider text-xs sm:text-sm hover:text-white transition-colors duration-200 cursor-pointer bg-transparent border-none p-0 min-h-[44px] inline-flex items-center py-2"
              >
                Contact
              </button>
            </li>
          </ul>
        </div>
      </FadeIn>

      {/* 2. Visual Hierarchy Flow: 1. Headline -> 2. Proof Chips -> 3. Action CTAs */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-10 z-20 flex flex-col items-center text-center mt-4 sm:mt-8 mb-auto">
        {/* Tier 1: Outcome-focused One-Line Headline */}
        <FadeIn delay={0.12} y={24} className="w-full">
          <h1
            className="font-black uppercase tracking-tight text-white leading-tight mx-auto max-w-5xl"
            style={{ fontSize: 'clamp(1.65rem, 4.2vw, 4.6rem)' }}
          >
            I build AI agents that work in production.
          </h1>
        </FadeIn>

        {/* Tier 2: Subtitle with 3 Proof Chips (WCAG AA Compliant contrast) */}
        <FadeIn delay={0.2} y={16} className="mt-4 sm:mt-6">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {/* Proof Chip 1 */}
            <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-white/[0.07] border border-white/15 backdrop-blur-sm text-[#FFFFFF] text-xs sm:text-sm font-medium tracking-wide shadow-sm min-h-[38px]">
              <BookOpen className="w-3.5 h-3.5 text-[#B600A8]" />
              <span>IEEE-published</span>
            </div>

            {/* Proof Chip 2 */}
            <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-white/[0.07] border border-white/15 backdrop-blur-sm text-[#FFFFFF] text-xs sm:text-sm font-medium tracking-wide shadow-sm min-h-[38px]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B600A8]" />
              <span>AWS Certified ×2</span>
            </div>

            {/* Proof Chip 3 */}
            <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-white/[0.07] border border-white/15 backdrop-blur-sm text-[#FFFFFF] text-xs sm:text-sm font-medium tracking-wide shadow-sm min-h-[38px]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#B600A8]" />
              <span>12 shipped projects</span>
            </div>
          </div>
        </FadeIn>

        {/* Tier 3: 2 High-Contrast Action CTAs (44px Minimum Touch Targets) */}
        <FadeIn delay={0.28} y={16} className="mt-6 sm:mt-8">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {/* Primary CTA */}
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 rounded-full bg-white text-black font-semibold text-xs sm:text-sm uppercase tracking-wider hover:bg-neutral-200 transition-all shadow-lg hover:shadow-white/10 hover:-translate-y-0.5 cursor-pointer min-h-[44px]"
            >
              <span>View projects</span>
              <ArrowDown className="w-4 h-4" />
            </a>

            {/* Secondary CTA */}
            <a
              href="/Jaswanth_Resume.pdf"
              download="Jaswanth_Resume.pdf"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 rounded-full bg-white/[0.08] hover:bg-white/[0.14] border border-white/20 text-white font-medium text-xs sm:text-sm uppercase tracking-wider transition-all hover:-translate-y-0.5 cursor-pointer backdrop-blur-sm min-h-[44px]"
              title="Download Jaswanth's Resume (PDF)"
            >
              <Download className="w-4 h-4 text-[#B600A8]" />
              <span>Download resume</span>
            </a>
          </div>
        </FadeIn>
      </div>

      {/* 3. Hero Portrait (Centered with Magnet interaction and subtle transparency tag) */}
      <div className="relative w-full flex justify-center items-center my-3 sm:my-6 z-10 pointer-events-auto">
        <FadeIn delay={0.38} y={20}>
          <Magnet
            padding={100}
            strength={2}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
            className="w-[200px] sm:w-[260px] md:w-[320px] lg:w-[370px]"
          >
            <div className="relative">
              <picture className="block w-full">
                <source srcSet="/images/jaswanth_portrait.webp" type="image/webp" />
                <img
                  src="/images/jaswanth_portrait.png"
                  alt="Jaswanth - Forward Deployed Engineer and AI Systems builder"
                  width={520}
                  height={563}
                  className="w-full h-auto object-contain pointer-events-none drop-shadow-2xl"
                  loading="eager"
                  fetchPriority="high"
                />
              </picture>
              <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#0C0C0C] to-transparent pointer-events-none" />
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-mono uppercase tracking-wider text-[#D7E2EA]/70 pointer-events-none whitespace-nowrap">
                Stylized 3D Persona
              </span>
            </div>
          </Magnet>
        </FadeIn>
      </div>

      {/* 4. Bottom bar */}
      <div className="w-full max-w-7xl mx-auto flex justify-end items-center px-4 sm:px-8 md:px-10 z-30 pt-2">
        <FadeIn delay={0.45} y={16}>
          <ContactButton onClick={onOpenContact} />
        </FadeIn>
      </div>
    </section>
  );
};
