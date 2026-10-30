/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { CreativeWorkSection } from './components/CreativeWorkSection';
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
      {/* Keyboard Accessibility: Skip to Main Content */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Semantic Main Landmark */}
      <main id="main-content" className="w-full">
        {/* 1. HeroSection with One-line Headline, 3 Proof Chips, and 2 CTAs */}
        <HeroSection
          onOpenContact={handleOpenContact}
          onOpenPricing={handleOpenPricing}
        />

        {/* 2. AboutSection (60-90 words plain text, what I build, problems I like, roles I want) */}
        <AboutSection onOpenContact={handleOpenContact} />

        {/* 3. Domains Interested to Work (5 Real Domains as Interactive Tags) */}
        <ServicesSection />

        {/* 4. Primary Production AI & Agentic Systems */}
        <ProjectsSection />

        {/* 5. Secondary "Creative Work" Section (15s Motion Design Reel & Spatial Taste) */}
        <CreativeWorkSection />
      </main>

      {/* 7. Footer & Contact Anchor */}
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
