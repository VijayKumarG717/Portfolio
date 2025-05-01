/**
 * Elegant Butterfly Animation - Lottie Implementation
 * Realistic butterfly animation using Lottie
 */

class ButterflyLottie {
  constructor() {
    this.butterflyContainer = null;
    this.toggleButton = null;
    this.isEnabled = true;
    
    // Initialize the component
    this.init();
  }

  init() {
    // Create container for the butterfly
    this.createContainer();
    
    // Create toggle button
    this.createToggleButton();
    
    // Set up lottie animation
    this.setupLottieAnimation();
    
    // Add event listeners
    this.addEventListeners();
  }
  
  createContainer() {
    // Create the container for the butterfly animation
    this.butterflyContainer = document.createElement('div');
    this.butterflyContainer.className = 'butterfly-lottie-container';
    
    // Random initial position
    const randomX = Math.floor(Math.random() * (window.innerWidth * 0.7));
    const randomY = Math.floor(Math.random() * (window.innerHeight * 0.7));
    
    this.butterflyContainer.style.cssText = `
      position: fixed;
      top: ${randomY}px;
      left: ${randomX}px;
      width: 150px;
      height: 150px;
      z-index: 10;
      pointer-events: none;
      opacity: 0.7;
      filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.2));
      animation: butterfly-float 20s ease-in-out infinite;
    `;
    
    document.body.appendChild(this.butterflyContainer);
  }
  
  createToggleButton() {
    // Create toggle button
    this.toggleButton = document.createElement('button');
    this.toggleButton.className = 'butterfly-toggle-btn';
    this.toggleButton.innerHTML = '<i class="fas fa-butterfly"></i>';
    this.toggleButton.title = 'Toggle butterfly animation';
    
    this.toggleButton.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
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
  
  setupLottieAnimation() {
    // Check if Lottie is available
    if (typeof lottie === 'undefined') {
      console.error('Lottie library is not loaded');
      
      // Create a fallback animation
      this.createFallbackAnimation();
      return;
    }
    
    // Try to load from assets folder
    fetch('./assets/butterfly-animation.json')
      .then(response => response.json())
      .then(animationData => {
        this.animation = lottie.loadAnimation({
          container: this.butterflyContainer,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          animationData: animationData
        });
      })
      .catch(err => {
        console.warn('Failed to load butterfly animation:', err);
        this.createSimpleButterfly();
      });
  }
  
  createFallbackAnimation() {
    // Create a simple SVG butterfly as fallback
    this.createSimpleButterfly();
  }
  
  createSimpleButterfly() {
    // Define simple SVG butterfly
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 100 100");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    
    // Create butterfly body
    const body = document.createElementNS(svgNS, "line");
    body.setAttribute("x1", "50");
    body.setAttribute("y1", "20");
    body.setAttribute("x2", "50");
    body.setAttribute("y2", "80");
    body.setAttribute("stroke", "#333");
    body.setAttribute("stroke-width", "2");
    
    // Create butterfly head
    const head = document.createElementNS(svgNS, "circle");
    head.setAttribute("cx", "50");
    head.setAttribute("cy", "20");
    head.setAttribute("r", "5");
    head.setAttribute("fill", "#333");
    
    // Create butterfly wings
    const leftWing = document.createElementNS(svgNS, "path");
    leftWing.setAttribute("d", "M 50,30 C 30,10 10,40 30,60 C 40,70 50,50 50,40 Z");
    leftWing.setAttribute("fill", "#4f46e5");
    leftWing.setAttribute("stroke", "#333");
    leftWing.setAttribute("stroke-width", "1");
    leftWing.setAttribute("class", "wing left-wing");
    
    const rightWing = document.createElementNS(svgNS, "path");
    rightWing.setAttribute("d", "M 50,30 C 70,10 90,40 70,60 C 60,70 50,50 50,40 Z");
    rightWing.setAttribute("fill", "#4f46e5");
    rightWing.setAttribute("stroke", "#333");
    rightWing.setAttribute("stroke-width", "1");
    rightWing.setAttribute("class", "wing right-wing");
    
    // Add animation to wings
    const style = document.createElementNS(svgNS, "style");
    style.textContent = `
      .left-wing {
        transform-origin: right center;
        animation: wing-flap 0.5s infinite ease-in-out;
      }
      .right-wing {
        transform-origin: left center;
        animation: wing-flap 0.5s infinite ease-in-out alternate;
      }
    `;
    
    // Add elements to SVG
    svg.appendChild(style);
    svg.appendChild(leftWing);
    svg.appendChild(rightWing);
    svg.appendChild(body);
    svg.appendChild(head);
    
    // Add SVG to container
    this.butterflyContainer.appendChild(svg);
  }
  
  addEventListeners() {
    // Toggle button click handler
    this.toggleButton.addEventListener('click', () => {
      this.isEnabled = !this.isEnabled;
      
      if (this.isEnabled) {
        this.butterflyContainer.style.display = 'block';
        this.toggleButton.innerHTML = '<i class="fas fa-butterfly"></i>';
        if (this.animation) {
          this.animation.play();
        }
      } else {
        this.butterflyContainer.style.display = 'none';
        this.toggleButton.innerHTML = '<i class="fas fa-play"></i>';
        if (this.animation) {
          this.animation.pause();
        }
      }
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
      if (this.butterflyContainer) {
        // Reposition butterfly when window is resized
        const maxX = window.innerWidth * 0.7;
        const maxY = window.innerHeight * 0.7;
        
        this.butterflyContainer.style.left = `${Math.min(parseInt(this.butterflyContainer.style.left), maxX)}px`;
        this.butterflyContainer.style.top = `${Math.min(parseInt(this.butterflyContainer.style.top), maxY)}px`;
      }
    });
  }
}

// Initialize butterfly animation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Wait a bit for page to fully render
  setTimeout(() => {
    new ButterflyLottie();
  }, 1000);
}); 