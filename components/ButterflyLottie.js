/**
 * Elegant Butterfly Animation - Lottie Implementation
 * Realistic butterfly animation using Lottie
 */

// This component will need the lottie-react package and a butterfly animation JSON file

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
      z-index: 0;
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
    
    // Add dark mode styles
    const darkModeStyles = document.createElement('style');
    darkModeStyles.textContent = `
      body.dark-mode .butterfly-toggle-btn {
        background: rgba(0, 0, 0, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.05);
        color: var(--primary-color, #8b5cf6);
      }
      
      .butterfly-toggle-btn:hover {
        transform: scale(1.1);
      }
      
      @keyframes butterfly-float {
        0% {
          transform: translateY(0px) translateX(0px) rotate(0deg);
        }
        25% {
          transform: translateY(-20px) translateX(15px) rotate(5deg);
        }
        50% {
          transform: translateY(0px) translateX(30px) rotate(0deg);
        }
        75% {
          transform: translateY(20px) translateX(15px) rotate(-5deg);
        }
        100% {
          transform: translateY(0px) translateX(0px) rotate(0deg);
        }
      }
    `;
    
    document.head.appendChild(darkModeStyles);
  }
  
  setupLottieAnimation() {
    // We'll use a script tag to load Lottie and the animation data
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.9.6/lottie.min.js';
    
    script.onload = () => {
      // Once Lottie is loaded, load and render the animation
      fetch('assets/butterfly-animation.json')
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
          console.error('Failed to load butterfly animation:', err);
        });
    };
    
    document.head.appendChild(script);
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