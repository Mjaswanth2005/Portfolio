import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Layers, Sparkles } from 'lucide-react';
import { ProjectItem } from '../types';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onContactClick: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onContactClick,
}) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative w-full max-w-4xl bg-[#111317] border border-[#2B313C] rounded-[36px] p-6 sm:p-10 shadow-2xl text-[#D7E2EA] z-10 my-auto max-h-[92vh] overflow-y-auto"
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="sticky top-0 float-right p-2.5 rounded-full bg-black/60 hover:bg-white/10 text-white transition-colors cursor-pointer z-20 backdrop-blur-md border border-white/10"
            aria-label="Close project modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Top Info */}
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="text-4xl sm:text-5xl font-black text-white/30 font-mono">
              {project.number}
            </span>
            <span className="px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#D7E2EA]/10 border border-[#D7E2EA]/30 text-[#D7E2EA]">
              {project.category} Work
            </span>
            <span className="text-xs text-[#8F98A7] uppercase tracking-widest">{project.year}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight mb-2">
            {project.title}
          </h2>
          <p className="text-base sm:text-lg text-[#BBCCD7] font-light max-w-2xl mb-6">
            {project.description}
          </p>

          {/* Tools & Meta */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tools.map((tool) => (
              <span
                key={tool}
                className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-xs text-[#9FA8B4] font-medium flex items-center gap-1.5"
              >
                <Layers className="w-3 h-3 text-[#B600A8]" />
                {tool}
              </span>
            ))}
          </div>

          {/* Showcase Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="space-y-4">
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-black">
                <img
                  src={project.images.col1Top}
                  alt={`${project.title} render 1`}
                  className="w-full h-[240px] sm:h-[280px] object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-black">
                <img
                  src={project.images.col1Bottom}
                  alt={`${project.title} render 2`}
                  className="w-full h-[260px] sm:h-[320px] object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-white/10 bg-black h-full min-h-[300px]">
              <img
                src={project.images.col2Tall}
                alt={`${project.title} render hero`}
                className="w-full h-full object-cover min-h-[340px] md:min-h-[580px] hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-3xl bg-[#181C23] border border-white/10">
            <div>
              <h4 className="text-sm font-semibold uppercase text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#B600A8]" />
                Interested in similar 3D art direction?
              </h4>
              <p className="text-xs text-[#8F98A7]">
                Jaswanth is available to take on client and personal commissions.
              </p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onContactClick();
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold bg-white text-black hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                Inquire Project
              </button>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full border border-white/20 hover:bg-white/10 text-white transition-colors cursor-pointer"
                  aria-label="View live reference"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
