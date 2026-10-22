import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, CheckCircle2, Send, Sparkles, Copy, Check } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '3D Modeling',
    budget: '$5k - $10k',
    message: '',
  });
  const [copied, setCopied] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const email = 'jaswanth@3dcreator.art';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2500);
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
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative w-full max-w-xl bg-[#111317] border border-[#2B313C] rounded-[32px] p-6 sm:p-8 shadow-2xl text-[#D7E2EA] z-10 my-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors cursor-pointer"
              aria-label="Close contact modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B600A8]/20 border border-[#B600A8]/40 text-[#FFA9F6] text-xs uppercase tracking-wider font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Open for Q2 / Q3 Projects</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">
                Let&apos;s Build Together
              </h2>
              <p className="text-sm sm:text-base text-[#9FA8B4] mt-2">
                Have an ambitious 3D, branding, or motion project in mind? Drop a message below or email directly.
              </p>
            </div>

            {/* Quick Email Copy Box */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#1A1E26] border border-[#2F3746] mb-6">
              <div className="flex items-center gap-3 truncate">
                <div className="p-2 rounded-xl bg-[#2A313E] text-white">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="font-mono text-sm sm:text-base text-white truncate">{email}</span>
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-white uppercase tracking-wider font-medium transition-colors cursor-pointer shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Form */}
            {isSubmitted ? (
              <div className="py-10 text-center flex flex-col items-center justify-center gap-3">
                <div className="p-3 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white uppercase">Inquiry Received!</h3>
                <p className="text-sm text-[#9FA8B4] max-w-sm">
                  Thanks for reaching out! Jaswanth typically replies within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#9FA8B4] font-medium mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Alex Mercer"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#181C23] border border-[#2B313C] focus:border-[#B600A8] focus:outline-none text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#9FA8B4] font-medium mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#181C23] border border-[#2B313C] focus:border-[#B600A8] focus:outline-none text-white text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#9FA8B4] font-medium mb-1.5">
                      Project Service
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#181C23] border border-[#2B313C] focus:border-[#B600A8] focus:outline-none text-white text-sm cursor-pointer"
                    >
                      <option value="3D Modeling">3D Modeling</option>
                      <option value="Rendering">Rendering & Shading</option>
                      <option value="Motion Design">Motion Design & Animation</option>
                      <option value="Branding">Full 3D Brand Identity</option>
                      <option value="Web Design">Web 3D & Design</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#9FA8B4] font-medium mb-1.5">
                      Estimated Budget
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#181C23] border border-[#2B313C] focus:border-[#B600A8] focus:outline-none text-white text-sm cursor-pointer"
                    >
                      <option value="< $5k">&lt; $5,000</option>
                      <option value="$5k - $10k">$5,000 - $10,000</option>
                      <option value="$10k - $20k">$10,000 - $20,000</option>
                      <option value="$20k+">$20,000+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#9FA8B4] font-medium mb-1.5">
                    Project Brief
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Tell Jaswanth about your vision, timeline, and goals..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#181C23] border border-[#2B313C] focus:border-[#B600A8] focus:outline-none text-white text-sm resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full text-white font-medium uppercase tracking-widest text-sm transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                    style={{
                      background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                      boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
                      outline: '2px solid white',
                      outlineOffset: '-3px',
                    }}
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Project Proposal</span>
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
