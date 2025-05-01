import React from 'react';
import { createRoot } from 'react-dom/client';
import './css/tailwind.css';
import SkillsSection from './components/SkillsSection';

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Find the skills section container in the existing HTML
  const skillsContainer = document.getElementById('skills-section-container');
  
  if (skillsContainer) {
    // Create a root for React to render into
    const root = createRoot(skillsContainer);
    
    // Render the SkillsSection component
    root.render(<SkillsSection />);
  } else {
    console.error('Could not find skills section container element');
  }
}); 