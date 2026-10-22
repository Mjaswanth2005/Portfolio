import React from 'react';
import { ArrowUp, Sparkles } from 'lucide-react';
import { ContactButton } from './ContactButton';
import { FadeIn } from './FadeIn';

interface FooterSectionProps {
  onOpenContact: () => void;
  onOpenPricing?: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  onOpenContact,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="relative w-full bg-[#080808] border-t border-white/10 px-6 md:px-12 py-16 sm:py-24 text-[#D7E2EA] z-20">
      <div className="max-w-6xl mx-auto flex flex-col justify-between gap-12 sm:gap-16">
        {/* Top Call to Action */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <FadeIn delay={0.1} y={20}>
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#B600A8] font-bold">
                <Sparkles className="w-4 h-4" />
                <span>Next Availability: Immediate</span>
              </div>
              <h3 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
                Ready to push the envelope?
              </h3>
              <p className="text-[#8F98A7] text-sm sm:text-base max-w-lg font-light">
                Let&apos;s build worlds, characters, and digital motion that captivate audiences and elevate your brand.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2} y={20}>
            <div className="flex items-center gap-4">
              <ContactButton onClick={onOpenContact} label="Start a Project" />
            </div>
          </FadeIn>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/10" />

        {/* Big Brand Typography */}
        <div className="overflow-hidden select-none px-2 w-full text-center">
          <p className="hero-heading font-black uppercase tracking-tight text-center text-[5.5vw] sm:text-[6vw] md:text-[6.5vw] lg:text-[6.8vw] leading-none whitespace-nowrap opacity-40 hover:opacity-75 transition-opacity">
            JASWANTH &bull; 3D CREATOR
          </p>
        </div>

        {/* Bottom bar with Back to Top */}
        <div className="flex items-center justify-end w-full text-xs text-[#8F98A7] uppercase tracking-wider pt-2">
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-2 p-2 px-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors cursor-pointer"
            aria-label="Back to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
