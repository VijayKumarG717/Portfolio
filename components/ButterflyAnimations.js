/**
 * Elegant Butterfly Animations - Main Controller
 * Controls all three butterfly animation implementations
 */

class ButterflyAnimations {
  constructor() {
    this.currentAnimation = null;
    this.isEnabled = true;
    this.selectorContainer = null;
    
    // Initialize the component
    this.init();
  }

  init() {
    // Create animation selector
    this.createAnimationSelector();
    
    // Add event listeners
    this.addEventListeners();
    
    // Load default animation (None by default - user must select)
    setTimeout(() => {
      // Select lottie animation by default
      const lottieButton = document.querySelector('.butterfly-option-btn[data-animation="lottie"]');
      if (lottieButton) {
        lottieButton.click();
      }
    }, 1000);
  }
  
  createAnimationSelector() {
    // Create selector container
    this.selectorContainer = document.createElement('div');
    this.selectorContainer.className = 'butterfly-animation-selector';
    
    this.selectorContainer.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 20px;
      padding: 5px;
      border-radius: 20px;
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(5px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      z-index: 100;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    `;
    
    // Create label
    const label = document.createElement('span');
    label.textContent = 'Butterfly Animation:';
    label.style.cssText = `
      font-size: 12px;
      margin: 0 8px;
      color: var(--text-color, #1e293b);
    `;
    
    // Create animation options
    const options = [
      { id: 'lottie', name: 'Lottie', icon: 'fa-butterfly' },
      { id: 'svg', name: 'SVG', icon: 'fa-code' },
      { id: 'video', name: 'Video', icon: 'fa-video' },
      { id: 'none', name: 'None', icon: 'fa-times' }
    ];
    
    // Create option buttons
    options.forEach(option => {
      const button = document.createElement('button');
      button.className = `butterfly-option-btn ${option.id === 'none' ? 'active' : ''}`;
      button.title = `${option.name} Animation`;
      button.dataset.animation = option.id;
      button.innerHTML = `<i class="fas ${option.icon}"></i>`;
      
      button.style.cssText = `
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(5px);
        border: 1px solid rgba(255, 255, 255, 0.05);
        color: var(--primary-color, #4f46e5);
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 3px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 12px;
      `;
      
      this.selectorContainer.appendChild(button);
    });
    
    // Add label to container
    this.selectorContainer.prepend(label);
    
    // Add container to body
    document.body.appendChild(this.selectorContainer);
    
    // Add styles for active button and dark mode
    const styles = document.createElement('style');
    styles.textContent = `
      .butterfly-option-btn.active {
        background: var(--primary-color, #4f46e5) !important;
        color: white !important;
        transform: scale(1.1);
      }
      
      .butterfly-option-btn:hover {
        transform: scale(1.1);
      }
      
      body.dark-mode .butterfly-animation-selector {
        background: rgba(0, 0, 0, 0.2);
        border-color: rgba(255, 255, 255, 0.05);
      }
      
      body.dark-mode .butterfly-animation-selector span {
        color: var(--text-color-dark, #f1f5f9);
      }
      
      body.dark-mode .butterfly-option-btn {
        background: rgba(0, 0, 0, 0.2);
        color: var(--primary-color, #8b5cf6);
      }
    `;
    
    document.head.appendChild(styles);
  }
  
  addEventListeners() {
    // Animation option button click handlers
    const optionButtons = document.querySelectorAll('.butterfly-option-btn');
    optionButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Update active button
        document.querySelector('.butterfly-option-btn.active')?.classList.remove('active');
        button.classList.add('active');
        
        // Load selected animation
        this.loadAnimation(button.dataset.animation);
      });
    });
  }
  
  loadAnimation(type) {
    // Remove any existing animation
    this.removeCurrentAnimation();
    
    // Load the selected animation
    if (type === 'lottie') {
      this.loadAnimationDirectly('lottie');
    } else if (type === 'svg') {
      this.loadAnimationDirectly('svg');
    } else if (type === 'video') {
      this.loadAnimationDirectly('video');
    } else {
      // No animation selected
      this.currentAnimation = null;
    }
  }
  
  loadAnimationDirectly(type) {
    // Directly instantiate the animation classes instead of loading scripts
    switch(type) {
      case 'lottie':
        if (typeof ButterflyLottie !== 'undefined') {
          new ButterflyLottie();
          this.currentAnimation = 'lottie';
        } else {
          console.error('ButterflyLottie class not found');
        }
        break;
      case 'svg':
        if (typeof ButterflyFramerMotion !== 'undefined') {
          new ButterflyFramerMotion();
          this.currentAnimation = 'svg';
        } else {
          console.error('ButterflyFramerMotion class not found');
        }
        break;
      case 'video':
        if (typeof ButterflyVideo !== 'undefined') {
          new ButterflyVideo();
          this.currentAnimation = 'video';
        } else {
          console.error('ButterflyVideo class not found');
        }
        break;
    }
  }
  
  removeCurrentAnimation() {
    // Remove Lottie animation elements
    document.querySelector('.butterfly-lottie-container')?.remove();
    document.querySelector('.butterfly-toggle-btn')?.remove();
    
    // Remove SVG animation elements
    document.querySelector('.butterfly-svg-container')?.remove();
    document.querySelector('.butterfly-svg-toggle')?.remove();
    
    // Remove Video animation elements
    document.querySelector('.butterfly-video-container')?.remove();
    document.querySelector('.butterfly-video-toggle')?.remove();
    document.querySelector('.butterfly-opacity-slider')?.remove();
    
    // Remove any animation styles added dynamically
    const dynamicStyles = document.querySelectorAll('style');
    dynamicStyles.forEach(style => {
      if (style.textContent.includes('butterfly')) {
        style.remove();
      }
    });
  }
  
  loadScript(src, callback) {
    const script = document.createElement('script');
    script.src = src;
    script.onload = callback;
    script.onerror = (error) => {
      console.error(`Error loading script: ${src}`, error);
    };
    document.body.appendChild(script);
  }
}

// Initialize all butterfly animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Wait for page to fully render
  setTimeout(() => {
    console.log('Initializing ButterflyAnimations controller');
    new ButterflyAnimations();
  }, 1000);
}); 