import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Send, Sparkles, Loader2, AlertCircle } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Agentic Workflows',
    message: '',
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      service: 'Agentic Workflows',
      message: '',
    });
    setErrorMessage(null);
    setIsLoading(false);
    setIsSubmitted(false);
  };

  const handleModalClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!formData.name.trim()) {
      setErrorMessage('Please provide your name.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setErrorMessage('Please provide a valid work email address.');
      return;
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setErrorMessage('Please provide a message with at least 10 characters.');
      return;
    }

    setIsLoading(true);

    // Simulate reliable network roundtrip
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setTimeout(() => {
        handleModalClose();
      }, 2500);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleModalClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative w-full max-w-xl bg-[#121417] border border-[#2B313C] rounded-[32px] p-6 sm:p-8 shadow-2xl text-[#D7E2EA] z-10 my-auto"
          >
            {/* Close Button (44x44px Tap Target) */}
            <button
              onClick={handleModalClose}
              className="absolute top-5 right-5 min-h-[44px] min-w-[44px] rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors cursor-pointer flex items-center justify-center"
              aria-label="Close contact dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B600A8]/20 border border-[#B600A8]/40 text-[#FFA9F6] text-xs uppercase tracking-wider font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Next Availability: Immediate</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                Initiate Engineering Dialogue
              </h2>
              <p className="text-xs sm:text-sm text-[#8F98A7] mt-1.5 leading-relaxed">
                Discussing Forward Deployed Engineering, agentic AI systems, enterprise RAG, and production software roles.
              </p>
            </div>

            {/* Error State Banner */}
            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Success State */}
            {isSubmitted ? (
              <div className="py-12 text-center flex flex-col items-center justify-center gap-3">
                <div className="p-3.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white uppercase tracking-tight">Transmission Received</h3>
                <p className="text-xs sm:text-sm text-[#8F98A7] max-w-sm leading-relaxed">
                  Thank you! Jaswanth has received your note and will follow up with direct scheduling details within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D7E2EA] font-semibold mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Mercer"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#181C23] border border-[#2B313C] focus:border-[#B600A8] focus:outline-none text-white text-sm min-h-[44px]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D7E2EA] font-semibold mb-1.5">
                      Work Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#181C23] border border-[#2B313C] focus:border-[#B600A8] focus:outline-none text-white text-sm min-h-[44px]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#D7E2EA] font-semibold mb-1.5">
                    Role / Engineering Scope
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#181C23] border border-[#2B313C] focus:border-[#B600A8] focus:outline-none text-white text-sm cursor-pointer min-h-[44px]"
                  >
                    <option value="Forward Deployed Engineer">Forward Deployed Engineer (FDE)</option>
                    <option value="Agentic Workflows">Agentic Workflows & Multi-Agent Systems</option>
                    <option value="LLM Pipelines & RAG">LLM Pipelines & Hybrid RAG</option>
                    <option value="Computer Vision">Computer Vision & Multimodal Edge AI</option>
                    <option value="Foundational Full Stack">Full Stack Systems Architecture</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#D7E2EA] font-semibold mb-1.5">
                    Project Or Role Details
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe the opportunity, technical challenges, and timeline..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#181C23] border border-[#2B313C] focus:border-[#B600A8] focus:outline-none text-white text-sm resize-none"
                  />
                </div>

                {/* Submit Button with Loading State (44px Minimum Tap Target) */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full text-white font-medium uppercase tracking-widest text-sm transition-transform hover:scale-[1.01] active:scale-[0.99] cursor-pointer min-h-[44px] disabled:opacity-75 disabled:cursor-not-allowed"
                    style={{
                      background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                      boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
                      outline: '2px solid white',
                      outlineOffset: '-3px',
                    }}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>Transmitting Note...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
