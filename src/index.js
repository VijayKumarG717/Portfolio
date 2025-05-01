import React from 'react';
import { createRoot } from 'react-dom/client';
import './css/tailwind.css';
import SkillsSection from './components/SkillsSection';
import AmbientParticles from './components/animations/AmbientParticles';
import AnimationShowcase from './components/animations/AnimationShowcase';

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Add ambient particles to the entire page
  const bodyElement = document.body;
  const particlesContainer = document.createElement('div');
  particlesContainer.id = 'particles-container';
  bodyElement.prepend(particlesContainer);
  
  const particlesRoot = createRoot(particlesContainer);
  particlesRoot.render(<AmbientParticles />);
  
  // Render Skills Section in its designated container
  const skillsContainer = document.getElementById('skills-section-container');
  if (skillsContainer) {
    const skillsRoot = createRoot(skillsContainer);
    skillsRoot.render(<SkillsSection />);
  } else {
    console.error('Could not find skills section container element');
  }
  
  // Create a new section for the animation showcase
  const mainContent = document.querySelector('main');
  if (mainContent) {
    // Create a container for animation showcase
    const showcaseContainer = document.createElement('div');
    showcaseContainer.id = 'animation-showcase-container';
    
    // Insert the showcase container after the Skills section
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
      skillsSection.after(showcaseContainer);
      
      // Render the AnimationShowcase component
      const showcaseRoot = createRoot(showcaseContainer);
      showcaseRoot.render(<AnimationShowcase />);
    } else {
      // If skills section not found, append to the end of main content
      mainContent.appendChild(showcaseContainer);
      const showcaseRoot = createRoot(showcaseContainer);
      showcaseRoot.render(<AnimationShowcase />);
    }
  } else {
    console.error('Could not find main content element');
  }
}); 