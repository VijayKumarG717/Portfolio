/**
 * Elegant Butterfly Animation - SVG Implementation
 * Realistic butterfly animation using SVG and CSS animations
 */

class ButterflyFramerMotion {
  constructor() {
    this.butterflyContainer = null;
    this.toggleButton = null;
    this.butterfly = null;
    this.isEnabled = true;
    this.hovering = false;
    
    // Initialize the component
    this.init();
  }

  init() {
    // Create container for the butterfly
    this.createContainer();
    
    // Create SVG butterfly
    this.createButterfly();
    
    // Create toggle button
    this.createToggleButton();
    
    // Add event listeners
    this.addEventListeners();
    
    // Add styles
    this.addStyles();
    
    // Start animation
    this.animateButterfly();
  }
  
  createContainer() {
    // Create the container for the butterfly animation
    this.butterflyContainer = document.createElement('div');
    this.butterflyContainer.className = 'butterfly-svg-container';
    
    this.butterflyContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100px;
      height: 100px;
      z-index: 0;
      pointer-events: auto;
      opacity: 0.7;
      filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.2));
      transition: opacity 0.3s ease;
      transform: translate(100px, 100px);
    `;
    
    document.body.appendChild(this.butterflyContainer);
  }
  
  createButterfly() {
    // Create SVG butterfly
    this.butterfly = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.butterfly.setAttribute('viewBox', '0 0 100 100');
    this.butterfly.classList.add('butterfly-svg');
    this.butterfly.style.width = '100%';
    this.butterfly.style.height = '100%';
    
    // Create butterfly body
    const body = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    body.setAttribute('d', 'M50,30 L50,70');
    body.setAttribute('stroke', '#000');
    body.setAttribute('stroke-width', '2');
    body.setAttribute('class', 'butterfly-body');
    
    // Create butterfly head
    const head = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    head.setAttribute('cx', '50');
    head.setAttribute('cy', '30');
    head.setAttribute('r', '3');
    head.setAttribute('fill', '#000');
    head.setAttribute('class', 'butterfly-head');
    
    // Create left antenna
    const leftAntenna = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    leftAntenna.setAttribute('d', 'M48,28 Q45,20 43,18');
    leftAntenna.setAttribute('stroke', '#000');
    leftAntenna.setAttribute('stroke-width', '1');
    leftAntenna.setAttribute('fill', 'none');
    leftAntenna.setAttribute('class', 'butterfly-antenna');
    
    // Create right antenna
    const rightAntenna = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    rightAntenna.setAttribute('d', 'M52,28 Q55,20 57,18');
    rightAntenna.setAttribute('stroke', '#000');
    rightAntenna.setAttribute('stroke-width', '1');
    rightAntenna.setAttribute('fill', 'none');
    rightAntenna.setAttribute('class', 'butterfly-antenna');
    
    // Create wings group for animation
    const wingsGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    wingsGroup.classList.add('wings-group');
    
    // Create left wing
    const leftWing = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    leftWing.setAttribute('d', 'M50,40 C30,30 20,50 40,60 C45,65 49,60 50,55 Z');
    leftWing.setAttribute('fill', 'url(#blue-gradient-left)');
    leftWing.setAttribute('stroke', '#1e40af');
    leftWing.setAttribute('stroke-width', '0.5');
    leftWing.setAttribute('class', 'wing left-wing');
    
    // Create right wing
    const rightWing = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    rightWing.setAttribute('d', 'M50,40 C70,30 80,50 60,60 C55,65 51,60 50,55 Z');
    rightWing.setAttribute('fill', 'url(#blue-gradient-right)');
    rightWing.setAttribute('stroke', '#1e40af');
    rightWing.setAttribute('stroke-width', '0.5');
    rightWing.setAttribute('class', 'wing right-wing');
    
    // Create left lower wing
    const leftLowerWing = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    leftLowerWing.setAttribute('d', 'M50,55 C40,60 30,70 40,80 C45,82 49,75 50,70 Z');
    leftLowerWing.setAttribute('fill', 'url(#blue-gradient-left)');
    leftLowerWing.setAttribute('stroke', '#1e40af');
    leftLowerWing.setAttribute('stroke-width', '0.5');
    leftLowerWing.setAttribute('class', 'wing left-lower-wing');
    
    // Create right lower wing
    const rightLowerWing = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    rightLowerWing.setAttribute('d', 'M50,55 C60,60 70,70 60,80 C55,82 51,75 50,70 Z');
    rightLowerWing.setAttribute('fill', 'url(#blue-gradient-right)');
    rightLowerWing.setAttribute('stroke', '#1e40af');
    rightLowerWing.setAttribute('stroke-width', '0.5');
    rightLowerWing.setAttribute('class', 'wing right-lower-wing');
    
    // Create gradients (Blue Morpho butterfly colors)
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    
    // Left wing gradient
    const leftGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    leftGradient.setAttribute('id', 'blue-gradient-left');
    leftGradient.setAttribute('x1', '0%');
    leftGradient.setAttribute('y1', '0%');
    leftGradient.setAttribute('x2', '100%');
    leftGradient.setAttribute('y2', '0%');
    
    const leftStop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    leftStop1.setAttribute('offset', '0%');
    leftStop1.setAttribute('stop-color', '#0ea5e9');
    
    const leftStop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    leftStop2.setAttribute('offset', '100%');
    leftStop2.setAttribute('stop-color', '#1e40af');
    
    leftGradient.appendChild(leftStop1);
    leftGradient.appendChild(leftStop2);
    
    // Right wing gradient
    const rightGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    rightGradient.setAttribute('id', 'blue-gradient-right');
    rightGradient.setAttribute('x1', '0%');
    rightGradient.setAttribute('y1', '0%');
    rightGradient.setAttribute('x2', '100%');
    rightGradient.setAttribute('y2', '0%');
    
    const rightStop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    rightStop1.setAttribute('offset', '0%');
    rightStop1.setAttribute('stop-color', '#1e40af');
    
    const rightStop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    rightStop2.setAttribute('offset', '100%');
    rightStop2.setAttribute('stop-color', '#0ea5e9');
    
    rightGradient.appendChild(rightStop1);
    rightGradient.appendChild(rightStop2);
    
    // Add gradients to defs
    defs.appendChild(leftGradient);
    defs.appendChild(rightGradient);
    
    // Add wings to group
    wingsGroup.appendChild(leftWing);
    wingsGroup.appendChild(rightWing);
    wingsGroup.appendChild(leftLowerWing);
    wingsGroup.appendChild(rightLowerWing);
    
    // Add all elements to SVG
    this.butterfly.appendChild(defs);
    this.butterfly.appendChild(wingsGroup);
    this.butterfly.appendChild(body);
    this.butterfly.appendChild(head);
    this.butterfly.appendChild(leftAntenna);
    this.butterfly.appendChild(rightAntenna);
    
    // Add SVG to container
    this.butterflyContainer.appendChild(this.butterfly);
  }
  
  createToggleButton() {
    // Create toggle button
    this.toggleButton = document.createElement('button');
    this.toggleButton.className = 'butterfly-toggle-btn butterfly-svg-toggle';
    this.toggleButton.innerHTML = '<i class="fas fa-butterfly"></i>';
    this.toggleButton.title = 'Toggle butterfly animation';
    
    this.toggleButton.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 70px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(5px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: var(--primary-color, #4f46e5);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 100;
      transition: all 0.3s ease;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      font-size: 16px;
    `;
    
    document.body.appendChild(this.toggleButton);
  }
  
  addStyles() {
    // Add butterfly animation styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      @keyframes butterfly-fly {
        0% {
          transform: translate(calc(0vw - 100px), calc(50vh - 50px));
        }
        20% {
          transform: translate(calc(20vw - 50px), calc(30vh - 50px));
        }
        40% {
          transform: translate(calc(40vw - 50px), calc(60vh - 50px));
        }
        60% {
          transform: translate(calc(60vw - 50px), calc(40vh - 50px));
        }
        80% {
          transform: translate(calc(80vw - 50px), calc(70vh - 50px));
        }
        100% {
          transform: translate(calc(100vw + 100px), calc(50vh - 50px));
        }
      }
      
      @keyframes wing-flap {
        0% { transform: rotateY(0deg); }
        50% { transform: rotateY(70deg); }
        100% { transform: rotateY(0deg); }
      }
      
      @keyframes quick-wing-flap {
        0% { transform: rotateY(0deg); }
        50% { transform: rotateY(70deg); }
        100% { transform: rotateY(0deg); }
      }
      
      @keyframes butterfly-float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }
      
      .butterfly-svg {
        transform-style: preserve-3d;
        perspective: 1000px;
      }
      
      .left-wing {
        transform-origin: right center;
        animation: wing-flap 0.8s infinite ease-in-out;
      }
      
      .right-wing {
        transform-origin: left center;
        animation: wing-flap 0.8s infinite ease-in-out;
        animation-direction: reverse;
      }
      
      .left-lower-wing {
        transform-origin: right top;
        animation: wing-flap 0.8s infinite ease-in-out;
        animation-delay: 0.1s;
      }
      
      .right-lower-wing {
        transform-origin: left top;
        animation: wing-flap 0.8s infinite ease-in-out;
        animation-direction: reverse;
        animation-delay: 0.1s;
      }
      
      .wings-group {
        animation: butterfly-float 3s infinite ease-in-out;
      }
      
      .butterfly-svg-container.hovering .left-wing,
      .butterfly-svg-container.hovering .right-wing,
      .butterfly-svg-container.hovering .left-lower-wing,
      .butterfly-svg-container.hovering .right-lower-wing {
        animation-name: quick-wing-flap;
        animation-duration: 0.4s;
      }
      
      body.dark-mode .butterfly-svg-toggle {
        background: rgba(0, 0, 0, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.05);
        color: var(--primary-color, #8b5cf6);
      }
      
      .butterfly-svg-toggle:hover {
        transform: scale(1.1);
      }
    `;
    
    document.head.appendChild(styleSheet);
  }
  
  addEventListeners() {
    // Toggle button click handler
    this.toggleButton.addEventListener('click', () => {
      this.isEnabled = !this.isEnabled;
      
      if (this.isEnabled) {
        this.butterflyContainer.style.display = 'block';
        this.toggleButton.innerHTML = '<i class="fas fa-butterfly"></i>';
        this.animateButterfly();
      } else {
        this.butterflyContainer.style.display = 'none';
        this.toggleButton.innerHTML = '<i class="fas fa-play"></i>';
        if (this.animationFrameId) {
          cancelAnimationFrame(this.animationFrameId);
        }
      }
    });
    
    // Handle hover effect
    this.butterflyContainer.addEventListener('mouseenter', () => {
      this.hovering = true;
      this.butterflyContainer.classList.add('hovering');
    });
    
    this.butterflyContainer.addEventListener('mouseleave', () => {
      this.hovering = false;
      this.butterflyContainer.classList.remove('hovering');
    });
    
    // Handle click to change direction
    this.butterflyContainer.addEventListener('click', () => {
      // Generate a new random path
      const animation = document.createElement('style');
      const newPath = this.generateRandomPath();
      
      animation.textContent = `
        @keyframes butterfly-fly {
          ${newPath}
        }
      `;
      
      document.head.appendChild(animation);
      
      // Reset the animation
      this.butterflyContainer.style.animation = 'none';
      this.butterflyContainer.offsetHeight; // Trigger reflow
      this.butterflyContainer.style.animation = 'butterfly-fly 40s linear forwards';
    });
  }
  
  generateRandomPath() {
    // Create a random flight path with 5 keyframes
    let path = '';
    
    // Start position (left side of screen)
    path += `0% {
      transform: translate(calc(0vw - 100px), calc(${Math.random() * 80 + 10}vh - 50px));
    }\n`;
    
    // 3 random waypoints
    for (let i = 1; i <= 3; i++) {
      const x = i * 25; // 25%, 50%, 75%
      const y = Math.random() * 80 + 10; // Random y between 10-90% of viewport height
      
      path += `${i * 25}% {
        transform: translate(calc(${x}vw - 50px), calc(${y}vh - 50px));
      }\n`;
    }
    
    // End position (right side of screen)
    path += `100% {
      transform: translate(calc(100vw + 100px), calc(${Math.random() * 80 + 10}vh - 50px));
    }`;
    
    return path;
  }
  
  animateButterfly() {
    // Animate the butterfly across the screen
    const flightDuration = 40; // seconds
    
    // Set initial animation
    this.butterflyContainer.style.animation = `butterfly-fly ${flightDuration}s linear forwards`;
    
    // When animation ends, restart from the beginning
    const handleAnimationEnd = () => {
      // Reset position and start new animation
      this.butterflyContainer.style.animation = 'none';
      this.butterflyContainer.offsetHeight; // Trigger reflow
      
      // Generate a new random path
      const animation = document.createElement('style');
      const newPath = this.generateRandomPath();
      
      animation.textContent = `
        @keyframes butterfly-fly {
          ${newPath}
        }
      `;
      
      document.head.appendChild(animation);
      
      // Apply new animation
      this.butterflyContainer.style.animation = `butterfly-fly ${flightDuration}s linear forwards`;
    };
    
    this.butterflyContainer.addEventListener('animationend', handleAnimationEnd);
  }
}

// Initialize SVG butterfly animation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Wait a bit for page to fully render
  setTimeout(() => {
    new ButterflyFramerMotion();
  }, 1500);
}); 