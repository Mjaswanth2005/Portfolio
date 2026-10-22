/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { MarqueeSection } from './components/MarqueeSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { FooterSection } from './components/FooterSection';
import { ContactModal } from './components/ContactModal';
import { PricingModal } from './components/PricingModal';
import { ProjectModal } from './components/ProjectModal';
import { ProjectItem } from './types';

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  const [isPricingOpen, setIsPricingOpen] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const handleOpenContact = () => setIsContactOpen(true);
  const handleCloseContact = () => setIsContactOpen(false);

  const handleOpenPricing = () => setIsPricingOpen(true);
  const handleClosePricing = () => setIsPricingOpen(false);

  const handleSelectTier = (_tierName: string) => {
    setIsPricingOpen(false);
    setIsContactOpen(true);
  };

  const handleOpenProject = (project: ProjectItem) => {
    setSelectedProject(project);
  };
  const handleCloseProject = () => {
    setSelectedProject(null);
  };

  return (
    <div
      className="w-full min-h-screen bg-[#0C0C0C] text-[#D7E2EA] font-['Kanit',sans-serif]"
      style={{ overflowX: 'clip' }}
    >
      {/* 1. HeroSection */}
      <HeroSection
        onOpenContact={handleOpenContact}
        onOpenPricing={handleOpenPricing}
      />

      {/* 2. MarqueeSection */}
      <MarqueeSection />

      {/* 3. AboutSection */}
      <AboutSection onOpenContact={handleOpenContact} />

      {/* 4. ServicesSection */}
      <ServicesSection />

      {/* 5. ProjectsSection */}
      <ProjectsSection onOpenProject={handleOpenProject} />

      {/* Polish: Footer & Navigation Anchors */}
      <FooterSection
        onOpenContact={handleOpenContact}
        onOpenPricing={handleOpenPricing}
      />

      {/* Interactive Modals */}
      <ContactModal isOpen={isContactOpen} onClose={handleCloseContact} />

      <PricingModal
        isOpen={isPricingOpen}
        onClose={handleClosePricing}
        onSelectTier={handleSelectTier}
      />

      <ProjectModal
        project={selectedProject}
        onClose={handleCloseProject}
        onContactClick={() => {
          setSelectedProject(null);
          setIsContactOpen(true);
        }}
      />
    </div>
  );
}
