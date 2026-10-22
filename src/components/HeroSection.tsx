import React from 'react';
import { FadeIn } from './FadeIn';
import { Magnet } from './Magnet';
import { ContactButton } from './ContactButton';

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
      className="relative h-screen min-h-[620px] w-full flex flex-col justify-between overflow-x-clip bg-[#0C0C0C] select-none"
    >
      {/* 1. Navbar */}
      <FadeIn
        delay={0}
        y={-20}
        as="nav"
        className="w-full px-6 md:px-10 pt-6 md:pt-8 z-30"
        aria-label="Main Navigation"
      >
        <ul className="flex items-center justify-between w-full list-none p-0 m-0">
          <li>
            <a
              href="#about"
              className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#projects"
              className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200"
            >
              Projects
            </a>
          </li>
          <li>
            <button
              type="button"
              onClick={onOpenContact}
              className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200 cursor-pointer bg-transparent border-none p-0"
            >
              Contact
            </button>
          </li>
        </ul>
      </FadeIn>

      {/* 2. Hero Heading */}
      <div className="w-full overflow-hidden text-center z-10 px-2 sm:px-4">
        <FadeIn delay={0.15} y={40}>
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[9.5vw] sm:text-[10.5vw] md:text-[11.4vw] lg:text-[12.2vw] mt-6 sm:mt-4 md:-mt-5 select-none pointer-events-none">
            HI, I&apos;M Jaswanth
          </h1>
        </FadeIn>
      </div>

      {/* 3. Hero Portrait (Centered absolutely with Magnet) */}
      <div className="absolute left-1/2 -translate-x-1/2 z-20 pointer-events-auto top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0">
        <FadeIn delay={0.6} y={30}>
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
            className="w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px]"
          >
            <img
              src="https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png"
              alt="Jaswanth - 3D Creator portrait"
              className="w-full h-auto object-contain pointer-events-none drop-shadow-2xl"
              loading="eager"
            />
          </Magnet>
        </FadeIn>
      </div>

      {/* 4. Bottom bar */}
      <div className="w-full flex justify-between items-end pb-7 sm:pb-8 md:pb-10 px-6 md:px-10 z-30">
        <FadeIn delay={0.35} y={20}>
          <p
            className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            a 3d creator driven by crafting striking and unforgettable projects
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20}>
          <ContactButton onClick={onOpenContact} />
        </FadeIn>
      </div>
    </section>
  );
};
