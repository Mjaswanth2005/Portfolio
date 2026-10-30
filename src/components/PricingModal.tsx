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
    name: 'Agentic PoC & Evaluation',
    tagline: 'Ideal for prototyping autonomous workflows, tool evaluations, and initial benchmark validation.',
    price: '$6,000',
    turnaround: '2 - 3 Weeks',
    features: [
      'Multi-agent graph architecture (LangGraph/AutoGen)',
      'Deterministic tool calling & schema assertions',
      'Evaluation dataset curation & initial benchmarks',
      'Docker containerized deployment',
      'Architecture documentation & knowledge transfer',
    ],
    highlight: false,
  },
  {
    name: 'Production LLM / RAG System',
    tagline: 'High-concurrency document intelligence, vector retrieval, and automated guardrails.',
    price: '$14,000',
    turnaround: '3 - 5 Weeks',
    features: [
      'Hybrid dense-sparse vector & knowledge graph RAG',
      'Real-time semantic citation grounding layer',
      'Sub-300ms P95 latency optimization & caching',
      'OpenTelemetry distributed tracing integration',
      'Automated synthetic test suites & rollback sandboxes',
    ],
    highlight: true,
  },
  {
    name: 'Forward Deployed Engagement',
    tagline: 'Embedded full-stack AI engineering directly partnering with product and infrastructure teams.',
    price: 'Custom / Monthly',
    turnaround: 'Ongoing Engagement',
    features: [
      'Embedded FDE handling edge customer requirements',
      'Zero-to-one autonomous system deployment',
      'Multimodal video & computer vision pipelines',
      'Sub-100ms real-time event streaming systems',
      'Direct executive stakeholder alignment & sprints',
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
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative w-full max-w-4xl bg-[#121417] border border-[#2B313C] rounded-[32px] p-6 sm:p-10 shadow-2xl text-[#D7E2EA] z-10 my-auto"
          >
            {/* Close Button (44x44px Tap Target) */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 min-h-[44px] min-w-[44px] rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors cursor-pointer flex items-center justify-center"
              aria-label="Close engagement scopes modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-xs uppercase tracking-widest text-[#B600A8] font-bold">
                Engineering Scopes & Availability
              </span>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white mt-1">
                Engagement Models
              </h2>
              <p className="text-xs sm:text-sm text-[#8F98A7] mt-2 leading-relaxed">
                Clear deliverables, verifiable latency SLAs, and production-tested engineering standards.
              </p>
            </div>

            {/* Tiers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
                      Recommended
                    </div>
                  )}

                  <div>
                    <h3 className="text-base sm:text-lg font-bold uppercase text-white tracking-wide">
                      {tier.name}
                    </h3>
                    <p className="text-xs text-[#8F98A7] mt-1.5 min-h-[40px] leading-relaxed">
                      {tier.tagline}
                    </p>

                    <div className="mt-4 mb-4 pb-4 border-b border-white/10">
                      <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                        {tier.price}
                      </div>
                      <span className="text-xs text-[#8F98A7]">Timeline: {tier.turnaround}</span>
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
                    className={`mt-6 w-full py-3 px-4 rounded-full text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer min-h-[44px] ${
                      tier.highlight
                        ? 'bg-white text-black hover:bg-neutral-200'
                        : 'border border-white/20 text-white hover:bg-white/10'
                    }`}
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Select Engagement</span>
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
