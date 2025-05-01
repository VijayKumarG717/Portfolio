/**
 * Elegant Butterfly Animations - Main Controller
 * Controls all three butterfly animation implementations
 */

class ButterflyAnimations {
  constructor() {
    this.currentAnimation = null;
    this.isEnabled = true;
    this.selectorContainer = null;
    this.selectorVisible = false;
    
    // Initialize the component
    this.init();
  }

  init() {
    // Create animation selector
    this.createAnimationSelector();
    
    // Add event listeners
    this.addEventListeners();
    
    // Default to Lottie animation without showing controls
    setTimeout(() => {
      // Auto-select lottie animation by default
      this.loadAnimation('lottie');
      // Hide the selector by default
      this.toggleSelectorVisibility(false);
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
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(5px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      z-index: 100;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      transition: all 0.5s ease;
      transform: translateY(100px);
      opacity: 0;
    `;
    
    // Create help icon instead of label
    const helpIcon = document.createElement('button');
    helpIcon.className = 'butterfly-toggle-visibility';
    helpIcon.innerHTML = '<i class="fas fa-butterfly"></i>';
    helpIcon.title = 'Toggle butterfly settings';
    helpIcon.style.cssText = `
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
      position: fixed;
      bottom: 20px;
      left: 20px;
      z-index: 101;
    `;
    
    document.body.appendChild(helpIcon);
    
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
      button.className = `butterfly-option-btn ${option.id === 'lottie' ? 'active' : ''}`;
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
    
    // Add container to body
    document.body.appendChild(this.selectorContainer);
    
    // Add click event to help icon
    helpIcon.addEventListener('click', () => {
      this.toggleSelectorVisibility();
    });
  }
  
  toggleSelectorVisibility(show = null) {
    if (show !== null) {
      this.selectorVisible = show;
    } else {
      this.selectorVisible = !this.selectorVisible;
    }
    
    if (this.selectorVisible) {
      this.selectorContainer.style.transform = 'translateY(0)';
      this.selectorContainer.style.opacity = '1';
    } else {
      this.selectorContainer.style.transform = 'translateY(100px)';
      this.selectorContainer.style.opacity = '0';
    }
    
    // Auto-hide after 5 seconds
    if (this.selectorVisible) {
      if (this.autoHideTimeout) {
        clearTimeout(this.autoHideTimeout);
      }
      
      this.autoHideTimeout = setTimeout(() => {
        this.toggleSelectorVisibility(false);
      }, 5000);
    }
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
        
        // Reset auto-hide timer
        if (this.autoHideTimeout) {
          clearTimeout(this.autoHideTimeout);
        }
        
        this.autoHideTimeout = setTimeout(() => {
          this.toggleSelectorVisibility(false);
        }, 3000);
      });
    });
    
    // Hide selector when clicking elsewhere
    document.addEventListener('click', (event) => {
      if (this.selectorVisible && 
          !event.target.closest('.butterfly-animation-selector') && 
          !event.target.closest('.butterfly-toggle-visibility')) {
        this.toggleSelectorVisibility(false);
      }
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