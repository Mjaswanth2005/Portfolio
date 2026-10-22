import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ProjectItem } from '../types';
import { LiveProjectButton } from './LiveProjectButton';
import { calculateCardScale, calculateCardTopOffset } from '../utils/math';

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  totalCards: number;
  onOpenProject: (project: ProjectItem) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  totalCards,
  onOpenProject,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const targetScale = calculateCardScale(index, totalCards);
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);
  const topOffset = calculateCardTopOffset(index);

  return (
    <div
      ref={containerRef}
      className="relative h-[85vh] min-h-[640px] flex items-start justify-center"
    >
      <motion.div
        style={{
          scale,
          top: `calc(5.5rem + ${topOffset}px)`,
        }}
        className="sticky w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 shadow-2xl origin-top"
      >
        {/* Top row: Number, category label, project name, Live Project button */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <div className="flex items-baseline gap-4 sm:gap-6 flex-wrap">
            {/* Huge Number */}
            <span
              className="font-black text-[#0C0C0C] bg-[#D7E2EA] px-3 py-1 rounded-2xl leading-none tracking-tighter"
              style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
            >
              {project.number}
            </span>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs uppercase tracking-widest text-[#B600A8] font-semibold">
                  {project.category}
                </span>
                <span className="text-xs text-[#8F98A7]">&bull;</span>
                <span className="text-xs text-[#8F98A7] uppercase tracking-wider">{project.year}</span>
              </div>
              <h3
                className="font-medium uppercase tracking-tight text-white"
                style={{ fontSize: 'clamp(1.2rem, 3vw, 2.5rem)' }}
              >
                {project.title}
              </h3>
            </div>
          </div>

          <div className="w-full sm:w-auto flex justify-end">
            <LiveProjectButton onClick={() => onOpenProject(project)} />
          </div>
        </div>

        {/* Bottom row: Two-column image grid (Left 40% 2 stacked, Right 60% 1 tall) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 md:gap-5">
          {/* Left Column (40% width / 5 cols) - 2 stacked images */}
          <div className="md:col-span-5 flex flex-col gap-3 sm:gap-4 md:gap-5">
            {/* Top image */}
            <div
              className="w-full overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border border-white/10 bg-[#161616] cursor-pointer group"
              style={{ height: 'clamp(130px, 16vw, 230px)' }}
              onClick={() => onOpenProject(project)}
            >
              <img
                src={project.images.col1Top}
                alt={`${project.title} render preview 1`}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>

            {/* Bottom image */}
            <div
              className="w-full overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border border-white/10 bg-[#161616] cursor-pointer group"
              style={{ height: 'clamp(160px, 22vw, 340px)' }}
              onClick={() => onOpenProject(project)}
            >
              <img
                src={project.images.col1Bottom}
                alt={`${project.title} render preview 2`}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          </div>

          {/* Right Column (60% width / 7 cols) - 1 tall image */}
          <div
            className="md:col-span-7 w-full overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border border-white/10 bg-[#161616] cursor-pointer group"
            style={{
              height: 'clamp(280px, 42vw, 590px)',
            }}
            onClick={() => onOpenProject(project)}
          >
            <img
              src={project.images.col2Tall}
              alt={`${project.title} render showcase hero`}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
