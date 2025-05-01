/**
 * Elegant Butterfly Animation - Video Background Implementation
 * Realistic butterfly animation using a background video
 */

class ButterflyVideo {
  constructor() {
    this.videoContainer = null;
    this.video = null;
    this.toggleButton = null;
    this.opacitySlider = null;
    this.sliderContainer = null;
    this.isEnabled = true;
    this.videoOpacity = 0.2;
    
    // Initialize the component
    this.init();
  }

  init() {
    // Create container for the video
    this.createContainer();
    
    // Create video element
    this.createVideo();
    
    // Create toggle button
    this.createToggleButton();
    
    // Create opacity slider
    this.createOpacitySlider();
    
    // Add event listeners
    this.addEventListeners();
  }
  
  createContainer() {
    // Create the container for the video background
    this.videoContainer = document.createElement('div');
    this.videoContainer.className = 'butterfly-video-container';
    
    this.videoContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      pointer-events: none;
      overflow: hidden;
    `;
    
    // Create overlay to help with video contrast
    const overlay = document.createElement('div');
    overlay.className = 'butterfly-video-overlay';
    overlay.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.1);
    `;
    
    this.videoContainer.appendChild(overlay);
    document.body.appendChild(this.videoContainer);
  }
  
  createVideo() {
    // Create the video element
    this.video = document.createElement('video');
    this.video.className = 'butterfly-video';
    this.video.autoplay = true;
    this.video.loop = true;
    this.video.muted = true;
    this.video.playsInline = true;
    
    this.video.style.cssText = `
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: ${this.videoOpacity};
      filter: blur(1px);
      transition: opacity 0.3s ease;
    `;
    
    // Create source element
    const source = document.createElement('source');
    
    // Use our local butterfly video
    source.src = 'assets/butterfly-video.mp4';
    source.type = 'video/mp4';
    
    this.video.appendChild(source);
    this.videoContainer.appendChild(this.video);
    
    // Create a fallback message
    const fallbackText = document.createElement('p');
    fallbackText.textContent = 'Your browser does not support the video tag.';
    fallbackText.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
      text-align: center;
      font-size: 16px;
      display: none;
    `;
    
    this.video.appendChild(fallbackText);
    
    // Handle video loading error
    this.video.addEventListener('error', () => {
      console.error('Error loading butterfly video');
      // Hide video, show fallback
      this.video.style.display = 'none';
      this.showFallbackBackground();
    });
  }
  
  createToggleButton() {
    // Create toggle button
    this.toggleButton = document.createElement('button');
    this.toggleButton.className = 'butterfly-toggle-btn butterfly-video-toggle';
    this.toggleButton.innerHTML = '<i class="fas fa-video"></i>';
    this.toggleButton.title = 'Toggle butterfly video';
    
    this.toggleButton.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 120px;
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
      body.dark-mode .butterfly-video-toggle,
      body.dark-mode .butterfly-opacity-slider {
        background: rgba(0, 0, 0, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.05);
        color: var(--primary-color, #8b5cf6);
      }
      
      .butterfly-video-toggle:hover,
      .butterfly-opacity-slider:hover {
        transform: scale(1.05);
      }
    `;
    
    document.head.appendChild(darkModeStyles);
  }
  
  createOpacitySlider() {
    // Create slider container
    this.sliderContainer = document.createElement('div');
    this.sliderContainer.className = 'butterfly-opacity-slider';
    
    this.sliderContainer.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 170px;
      padding: 5px 10px;
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
    const label = document.createElement('label');
    label.setAttribute('for', 'opacity-slider');
    label.textContent = 'Opacity:';
    label.style.cssText = `
      font-size: 12px;
      margin-right: 8px;
      color: var(--text-color, #1e293b);
    `;
    
    // Create slider
    this.opacitySlider = document.createElement('input');
    this.opacitySlider.type = 'range';
    this.opacitySlider.id = 'opacity-slider';
    this.opacitySlider.min = '0.05';
    this.opacitySlider.max = '0.4';
    this.opacitySlider.step = '0.05';
    this.opacitySlider.value = this.videoOpacity;
    
    this.opacitySlider.style.cssText = `
      width: 80px;
      height: 5px;
      background: rgba(255, 255, 255, 0.3);
      outline: none;
      border-radius: 15px;
      -webkit-appearance: none;
    `;
    
    // Add slider styles
    const sliderStyles = document.createElement('style');
    sliderStyles.textContent = `
      #opacity-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background: var(--primary-color, #4f46e5);
        cursor: pointer;
      }
      
      #opacity-slider::-moz-range-thumb {
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background: var(--primary-color, #4f46e5);
        cursor: pointer;
        border: none;
      }
      
      body.dark-mode #opacity-slider::-webkit-slider-thumb {
        background: var(--primary-color, #8b5cf6);
      }
      
      body.dark-mode #opacity-slider::-moz-range-thumb {
        background: var(--primary-color, #8b5cf6);
      }
      
      body.dark-mode label[for="opacity-slider"] {
        color: var(--text-color-dark, #f1f5f9);
      }
    `;
    
    document.head.appendChild(sliderStyles);
    
    // Add label and slider to container
    this.sliderContainer.appendChild(label);
    this.sliderContainer.appendChild(this.opacitySlider);
    
    // Add container to body
    document.body.appendChild(this.sliderContainer);
  }
  
  addEventListeners() {
    // Toggle button click handler
    this.toggleButton.addEventListener('click', () => {
      this.isEnabled = !this.isEnabled;
      
      if (this.isEnabled) {
        this.videoContainer.style.display = 'block';
        this.toggleButton.innerHTML = '<i class="fas fa-video"></i>';
        this.sliderContainer.style.display = 'flex';
        if (this.video && this.video.paused) {
          this.video.play();
        }
      } else {
        this.videoContainer.style.display = 'none';
        this.toggleButton.innerHTML = '<i class="fas fa-video-slash"></i>';
        this.sliderContainer.style.display = 'none';
        if (this.video && !this.video.paused) {
          this.video.pause();
        }
      }
    });
    
    // Opacity slider change handler
    this.opacitySlider.addEventListener('input', (e) => {
      this.videoOpacity = parseFloat(e.target.value);
      if (this.video) {
        this.video.style.opacity = this.videoOpacity;
      }
    });
    
    // Handle window resize to ensure video always covers the screen
    window.addEventListener('resize', () => {
      // Nothing specific needed here as object-fit: cover handles this automatically
    });

    // Ensure video starts playing on iOS devices with user interaction
    document.addEventListener('click', () => {
      if (this.video && this.video.paused && this.isEnabled) {
        this.video.play();
      }
    }, { once: true });
  }
  
  showFallbackBackground() {
    // Remove any existing fallback
    if (this.fallbackDiv) {
      this.fallbackDiv.remove();
    }
    // Create a fallback animated background
    this.fallbackDiv = document.createElement('div');
    this.fallbackDiv.className = 'butterfly-video-fallback';
    this.fallbackDiv.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
      background: linear-gradient(120deg, #a1c4fd, #c2e9fb, #fbc2eb, #fcb69f);
      background-size: 400% 400%;
      animation: butterfly-fallback-bg 10s ease-in-out infinite;
      opacity: 0.3;
    `;
    this.videoContainer.appendChild(this.fallbackDiv);
    // Add keyframes for animation
    if (!document.getElementById('butterfly-fallback-bg-style')) {
      const style = document.createElement('style');
      style.id = 'butterfly-fallback-bg-style';
      style.textContent = `
        @keyframes butterfly-fallback-bg {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `;
      document.head.appendChild(style);
    }
  }
}

// Initialize video butterfly animation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Wait for other elements to load
  setTimeout(() => {
    new ButterflyVideo();
  }, 2000);
}); 