import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Zap, Sparkles } from 'lucide-react';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTier: (tierName: string) => void;
}

const TIERS = [
  {
    name: '3D Asset & Renders',
    tagline: 'Ideal for product launches, marketing visuals, and game assets.',
    price: '$3,500',
    turnaround: '1 - 2 Weeks',
    features: [
      'High-poly / low-poly 3D modeling',
      'Photorealistic studio lighting & PBR texturing',
      'Up to 5 ultra-HD 4K renders',
      'Turnaround 360° turntable loops',
      'Commercial source files (.blend / .obj / .fbx)',
    ],
    highlight: false,
  },
  {
    name: 'Full 3D Motion & Brand',
    tagline: 'Dynamic animation and visual identity for standout brands.',
    price: '$7,500',
    turnaround: '2 - 4 Weeks',
    features: [
      'Everything in 3D Asset package',
      '15-30s premium cinematic 3D motion video',
      'Art direction & brand styleguide integration',
      'Custom physics, cloth & particle simulations',
      'Social cutdowns (9:16 & 16:9 formats)',
    ],
    highlight: true,
  },
  {
    name: 'Interactive Web & 3D World',
    tagline: 'Complete digital experience with WebGL and conversion craft.',
    price: '$15,000',
    turnaround: '4 - 6 Weeks',
    features: [
      'End-to-end bespoke WebGL / 3D design',
      'Interactive scroll-linked 3D choreography',
      'Performance-optimized assets (lossless WebP/GLTF)',
      'Design handoff and developer guidelines',
      'Dedicated art direction & post-launch polish',
    ],
    highlight: false,
  },
];

export const PricingModal: React.FC<PricingModalProps> = ({ isOpen, onClose, onSelectTier }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative w-full max-w-4xl bg-[#111317] border border-[#2B313C] rounded-[36px] p-6 sm:p-10 shadow-2xl text-[#D7E2EA] z-10 my-auto"
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors cursor-pointer"
              aria-label="Close pricing modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-xs uppercase tracking-widest text-[#B600A8] font-bold">
                Investment & Rates
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white mt-1">
                Transparent Pricing
              </h2>
              <p className="text-sm sm:text-base text-[#9FA8B4] mt-2">
                Every project is handcrafted with meticulous detail. Choose a starting package or request a custom scope.
              </p>
            </div>

            {/* Tiers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TIERS.map((tier) => (
                <div
                  key={tier.name}
                  className={`relative flex flex-col justify-between p-6 rounded-3xl border transition-all duration-300 ${
                    tier.highlight
                      ? 'bg-[#181B22] border-[#B600A8] shadow-lg shadow-[#B600A8]/10'
                      : 'bg-[#15171D] border-[#2A2E38] hover:border-[#3D4452]'
                  }`}
                >
                  {tier.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#B600A8] text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow">
                      <Sparkles className="w-3 h-3" />
                      Most Popular
                    </div>
                  )}

                  <div>
                    <h3 className="text-lg font-bold uppercase text-white tracking-wide">
                      {tier.name}
                    </h3>
                    <p className="text-xs text-[#8F98A7] mt-1 min-h-[36px]">{tier.tagline}</p>

                    <div className="mt-4 mb-4 pb-4 border-b border-white/10">
                      <div className="text-3xl font-black text-white">{tier.price}</div>
                      <span className="text-xs text-[#8F98A7]">Avg. turnaround: {tier.turnaround}</span>
                    </div>

                    <ul className="space-y-2.5 text-xs text-[#C5D0DC]">
                      {tier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-[#B600A8] shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectTier(tier.name)}
                    className={`mt-6 w-full py-3 px-4 rounded-full text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      tier.highlight
                        ? 'bg-white text-black hover:bg-neutral-200'
                        : 'border border-white/20 text-white hover:bg-white/10'
                    }`}
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Inquire Package</span>
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
