/**
 * Skills Component - Modern, stylish skills section
 * This is a vanilla JavaScript implementation with modern styling and animations
 */
document.addEventListener('DOMContentLoaded', function() {
  // Data for skills
  const languages = [
    "Python",
    "C", 
    "Java (OOP)", 
    "HTML",
    "CSS", 
    "JavaScript"
  ];

  const toolsFrameworks = [
    "Next.js",
    "React",
    "Tailwind CSS",
    "MongoDB",
    "Stripe Integration",
    "Visual Studio Code",
    "Git & GitHub",
    "Prompt Engineering for GPT"
  ];

  // Get skills container
  const skillsSection = document.getElementById('skills');
  const container = skillsSection.querySelector('.container');

  // Clear existing content except the section title
  const title = container.querySelector('.section-title');
  container.innerHTML = '';
  container.appendChild(title);

  // Add CSS for the skills component
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    .skills-grid {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }

    @media (min-width: 768px) {
      .skills-grid {
        flex-direction: row;
      }
    }

    .skill-column {
      flex: 1;
      background-color: white;
      border-radius: 1rem;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
      overflow: hidden;
      border: 1px solid rgba(229, 231, 235, 0.5);
      transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
      position: relative;
    }

    /* Dark mode support */
    .dark-mode .skill-column {
      background-color: #1f2937;
      border-color: rgba(55, 65, 81, 0.5);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }

    .skill-column:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
    }

    .dark-mode .skill-column:hover {
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
    }

    .skill-column.languages {
      border-top: 4px solid #4f46e5;
    }

    .skill-column.tools {
      border-top: 4px solid #9333ea;
    }

    /* Pulse animation for border */
    @keyframes borderPulse {
      0%, 100% {
        border-top-color: #4f46e5;
      }
      50% {
        border-top-color: #818cf8;
      }
    }

    .skill-column.languages:hover {
      animation: borderPulse 2s infinite;
    }

    @keyframes borderPulseTools {
      0%, 100% {
        border-top-color: #9333ea;
      }
      50% {
        border-top-color: #c084fc;
      }
    }

    .skill-column.tools:hover {
      animation: borderPulseTools 2s infinite;
    }

    .skill-header {
      padding: 1.5rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      border-bottom: 1px solid rgba(229, 231, 235, 0.5);
    }

    .dark-mode .skill-header {
      border-bottom-color: rgba(55, 65, 81, 0.5);
    }

    .skill-icon-container {
      width: 3rem;
      height: 3rem;
      border-radius: 0.75rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
    }

    .languages .skill-icon-container {
      background-color: rgba(79, 70, 229, 0.1);
      color: #4f46e5;
    }

    .dark-mode .languages .skill-icon-container {
      background-color: rgba(79, 70, 229, 0.2);
      color: #818cf8;
    }

    .tools .skill-icon-container {
      background-color: rgba(147, 51, 234, 0.1);
      color: #9333ea;
    }

    .dark-mode .tools .skill-icon-container {
      background-color: rgba(147, 51, 234, 0.2);
      color: #c084fc;
    }

    .skill-column:hover .skill-icon-container {
      transform: scale(1.1) rotate(5deg);
    }

    .skill-icon-container i {
      font-size: 1.5rem;
      transition: transform 0.3s ease;
    }

    .skill-column:hover .skill-icon-container i {
      transform: scale(1.2);
    }

    .skill-header h3 {
      font-size: 1.5rem;
      font-weight: 700;
      margin: 0;
      color: #1f2937;
      transition: color 0.3s ease;
    }

    .dark-mode .skill-header h3 {
      color: #f3f4f6;
    }

    .skill-column:hover .skill-header h3 {
      color: #4f46e5;
    }

    .tools:hover .skill-header h3 {
      color: #9333ea;
    }

    .skill-list {
      list-style-type: none;
      padding: 1.5rem;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .skill-item {
      background-color: #f9fafb;
      padding: 1rem;
      border-radius: 0.5rem;
      transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
      display: flex;
      align-items: center;
      opacity: 0;
      transform: translateY(10px);
      animation: fadeInUp 0.5s forwards;
      position: relative;
      overflow: hidden;
    }

    .dark-mode .skill-item {
      background-color: #374151;
    }

    .skill-item.languages:hover {
      background-color: rgba(79, 70, 229, 0.05);
      transform: translateY(-3px) scale(1.02);
    }

    .dark-mode .skill-item.languages:hover {
      background-color: rgba(79, 70, 229, 0.15);
    }

    .skill-item.tools:hover {
      background-color: rgba(147, 51, 234, 0.05);
      transform: translateY(-3px) scale(1.02);
    }

    .dark-mode .skill-item.tools:hover {
      background-color: rgba(147, 51, 234, 0.15);
    }

    /* Ripple effect */
    .skill-item::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 5px;
      height: 5px;
      background: rgba(255, 255, 255, 0.6);
      opacity: 0;
      border-radius: 100%;
      transform: scale(1) translate(-50%, -50%);
      transform-origin: 50% 50%;
    }

    .skill-item:active::after {
      animation: ripple 0.6s ease-out;
    }

    @keyframes ripple {
      0% {
        transform: scale(0) translate(-50%, -50%);
        opacity: 0.5;
      }
      100% {
        transform: scale(20) translate(-50%, -50%);
        opacity: 0;
      }
    }

    .skill-dot {
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 50%;
      margin-right: 0.75rem;
      transition: all 0.3s ease;
    }

    .languages .skill-dot {
      background-color: #4f46e5;
    }

    .dark-mode .languages .skill-dot {
      background-color: #818cf8;
    }

    .tools .skill-dot {
      background-color: #9333ea;
    }

    .dark-mode .tools .skill-dot {
      background-color: #c084fc;
    }

    .skill-item:hover .skill-dot {
      transform: scale(1.5);
    }

    .skill-name {
      font-weight: 500;
      color: #4b5563;
      transition: color 0.3s ease;
    }

    .dark-mode .skill-name {
      color: #e5e7eb;
    }

    .languages .skill-item:hover .skill-name {
      color: #4f46e5;
    }

    .dark-mode .languages .skill-item:hover .skill-name {
      color: #818cf8;
    }

    .tools .skill-item:hover .skill-name {
      color: #9333ea;
    }

    .dark-mode .tools .skill-item:hover .skill-name {
      color: #c084fc;
    }

    /* Animation for staggered appearance */
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* Glowing effect */
    .skill-column::before {
      content: '';
      position: absolute;
      top: -10px;
      left: -10px;
      right: -10px;
      bottom: -10px;
      z-index: -1;
      background: linear-gradient(45deg, #4f46e5, #9333ea, #4f46e5);
      background-size: 200% 200%;
      border-radius: 16px;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .skill-column:hover::before {
      opacity: 0.1;
      animation: glowingBg 3s linear infinite;
    }

    @keyframes glowingBg {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }

    /* Add animation delay to create staggered effect */
    .skill-item:nth-child(1) { animation-delay: 0.1s; }
    .skill-item:nth-child(2) { animation-delay: 0.2s; }
    .skill-item:nth-child(3) { animation-delay: 0.3s; }
    .skill-item:nth-child(4) { animation-delay: 0.4s; }
    .skill-item:nth-child(5) { animation-delay: 0.5s; }
    .skill-item:nth-child(6) { animation-delay: 0.6s; }
    .skill-item:nth-child(7) { animation-delay: 0.7s; }
    .skill-item:nth-child(8) { animation-delay: 0.8s; }
  `;
  document.head.appendChild(styleElement);

  // Create skills grid
  const skillsGrid = document.createElement('div');
  skillsGrid.className = 'skills-grid';
  container.appendChild(skillsGrid);

  // Create Languages Column
  const languagesColumn = document.createElement('div');
  languagesColumn.className = 'skill-column languages';
  languagesColumn.setAttribute('data-aos', 'fade-right');
  languagesColumn.setAttribute('data-aos-delay', '100');
  
  // Create Language Header
  const languagesHeader = document.createElement('div');
  languagesHeader.className = 'skill-header';
  
  const languagesIconContainer = document.createElement('div');
  languagesIconContainer.className = 'skill-icon-container';
  languagesIconContainer.innerHTML = '<i class="fas fa-code"></i>';
  
  const languagesTitle = document.createElement('h3');
  languagesTitle.textContent = 'Languages';
  
  languagesHeader.appendChild(languagesIconContainer);
  languagesHeader.appendChild(languagesTitle);
  languagesColumn.appendChild(languagesHeader);
  
  // Create Languages List
  const languagesList = document.createElement('ul');
  languagesList.className = 'skill-list';
  
  languages.forEach(skill => {
    const skillItem = document.createElement('li');
    skillItem.className = 'skill-item languages';
    
    const skillDot = document.createElement('div');
    skillDot.className = 'skill-dot';
    
    const skillName = document.createElement('span');
    skillName.className = 'skill-name';
    skillName.textContent = skill;
    
    skillItem.appendChild(skillDot);
    skillItem.appendChild(skillName);
    languagesList.appendChild(skillItem);
  });
  
  languagesColumn.appendChild(languagesList);
  skillsGrid.appendChild(languagesColumn);

  // Create Tools Column
  const toolsColumn = document.createElement('div');
  toolsColumn.className = 'skill-column tools';
  toolsColumn.setAttribute('data-aos', 'fade-left');
  toolsColumn.setAttribute('data-aos-delay', '200');
  
  // Create Tools Header
  const toolsHeader = document.createElement('div');
  toolsHeader.className = 'skill-header';
  
  const toolsIconContainer = document.createElement('div');
  toolsIconContainer.className = 'skill-icon-container';
  toolsIconContainer.innerHTML = '<i class="fas fa-toolbox"></i>';
  
  const toolsTitle = document.createElement('h3');
  toolsTitle.textContent = 'Tools & Frameworks';
  
  toolsHeader.appendChild(toolsIconContainer);
  toolsHeader.appendChild(toolsTitle);
  toolsColumn.appendChild(toolsHeader);
  
  // Create Tools List
  const toolsList = document.createElement('ul');
  toolsList.className = 'skill-list';
  
  toolsFrameworks.forEach(skill => {
    const skillItem = document.createElement('li');
    skillItem.className = 'skill-item tools';
    
    const skillDot = document.createElement('div');
    skillDot.className = 'skill-dot';
    
    const skillName = document.createElement('span');
    skillName.className = 'skill-name';
    skillName.textContent = skill;
    
    skillItem.appendChild(skillDot);
    skillItem.appendChild(skillName);
    toolsList.appendChild(skillItem);
  });
  
  toolsColumn.appendChild(toolsList);
  skillsGrid.appendChild(toolsColumn);

  // Add 3D tilt effect to skill columns
  const skillColumns = document.querySelectorAll('.skill-column');
  
  skillColumns.forEach(column => {
    column.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within the element
      const y = e.clientY - rect.top; // y position within the element
      
      const midX = rect.width / 2;
      const midY = rect.height / 2;
      
      // Calculate rotation based on mouse position
      // Divide by a larger number for more subtle effect
      const rotateX = (y - midY) / 20;
      const rotateY = (midX - x) / 20;
      
      // Apply transform
      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
    
    column.addEventListener('mouseleave', function() {
      // Reset transform
      this.style.transform = '';
    });
  });

  // Add hover effects to skill items
  const skillItems = document.querySelectorAll('.skill-item');
  
  skillItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.08)';
      
      // Create tooltip with skill level
      const skillName = this.querySelector('.skill-name').textContent;
      const tooltip = document.createElement('div');
      tooltip.className = 'skill-tooltip';
      tooltip.textContent = getSkillLevel(skillName);
      tooltip.style.position = 'absolute';
      tooltip.style.top = '-30px';
      tooltip.style.left = '50%';
      tooltip.style.transform = 'translateX(-50%)';
      tooltip.style.backgroundColor = this.classList.contains('languages') ? '#4f46e5' : '#9333ea';
      tooltip.style.color = 'white';
      tooltip.style.padding = '4px 8px';
      tooltip.style.borderRadius = '4px';
      tooltip.style.fontSize = '0.75rem';
      tooltip.style.opacity = '0';
      tooltip.style.transition = 'opacity 0.3s ease';
      
      this.style.position = 'relative';
      this.appendChild(tooltip);
      
      // Show tooltip with delay
      setTimeout(() => {
        tooltip.style.opacity = '1';
      }, 200);
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.boxShadow = 'none';
      
      // Remove tooltip
      const tooltip = this.querySelector('.skill-tooltip');
      if (tooltip) {
        tooltip.style.opacity = '0';
        setTimeout(() => {
          tooltip.remove();
        }, 300);
      }
    });
    
    // Add click interaction
    item.addEventListener('click', function() {
      const skillName = this.querySelector('.skill-name').textContent;
      
      // Create a flash effect
      const flash = document.createElement('div');
      flash.style.position = 'absolute';
      flash.style.top = '0';
      flash.style.left = '0';
      flash.style.width = '100%';
      flash.style.height = '100%';
      flash.style.backgroundColor = this.classList.contains('languages') ? 'rgba(79, 70, 229, 0.2)' : 'rgba(147, 51, 234, 0.2)';
      flash.style.borderRadius = '0.5rem';
      flash.style.opacity = '0.8';
      flash.style.transform = 'scale(1)';
      flash.style.transition = 'all 0.5s ease';
      
      this.insertBefore(flash, this.firstChild);
      
      // Fade out flash effect
      setTimeout(() => {
        flash.style.opacity = '0';
        flash.style.transform = 'scale(1.2)';
        setTimeout(() => {
          flash.remove();
        }, 500);
      }, 50);
    });
  });
  
  // Function to get a random skill level (for demonstration purposes)
  function getSkillLevel(skillName) {
    const levels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
    
    // For demo purposes, assign specific levels to certain skills
    const skillLevels = {
      'Python': 'Expert',
      'React': 'Advanced',
      'Java (OOP)': 'Advanced',
      'JavaScript': 'Advanced',
      'HTML': 'Expert',
      'CSS': 'Advanced',
      'Next.js': 'Intermediate',
      'Tailwind CSS': 'Advanced',
      'MongoDB': 'Intermediate',
      'Git & GitHub': 'Advanced',
      'Visual Studio Code': 'Expert',
      'Prompt Engineering for GPT': 'Advanced',
      'Stripe Integration': 'Intermediate',
      'C': 'Intermediate'
    };
    
    return skillLevels[skillName] || levels[Math.floor(Math.random() * levels.length)];
  }

  // Check if dark mode is enabled
  function isDarkMode() {
    return document.body.classList.contains('dark-mode');
  }

  // Add dark mode class to body when dark mode is toggled
  const darkModeToggle = document.querySelector('.theme-toggle');
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', function() {
      document.body.classList.toggle('dark-mode');
    });
  }
}); 