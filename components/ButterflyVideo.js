/**
 * Elegant Butterfly Animation - Video Background Implementation
 * Realistic butterfly animation using a background video
 */

class ButterflyVideo {
  constructor() {
    this.videoContainer = null;
    this.video = null;
    this.isEnabled = true;
    this.videoOpacity = 0.15; // Lower default opacity to be less distracting
    
    // Initialize the component
    this.init();
  }

  init() {
    // Create container for the video
    this.createContainer();
    
    // Create video element
    this.createVideo();
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
      transition: opacity 1.5s ease;
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
      transition: opacity 1.5s ease;
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
      opacity: 0.15;
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
    
    // Create floating butterfly particles
    this.createFloatingParticles();
  }
  
  createFloatingParticles() {
    const particleCount = 10;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'butterfly-particle';
      
      // Random position, size, and animation
      const size = 10 + Math.random() * 20;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const delay = Math.random() * 10;
      const duration = 15 + Math.random() * 15;
      
      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        top: ${posY}vh;
        left: ${posX}vw;
        background-image: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%);
        border-radius: 50%;
        opacity: 0.2;
        animation: particle-float ${duration}s ease-in-out infinite;
        animation-delay: ${delay}s;
        pointer-events: none;
      `;
      
      this.fallbackDiv.appendChild(particle);
    }
    
    // Add particle animation
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
      @keyframes particle-float {
        0%, 100% {
          transform: translateY(0) translateX(0);
          opacity: 0.2;
        }
        25% {
          transform: translateY(-30vh) translateX(20vw);
          opacity: 0.4;
        }
        50% {
          transform: translateY(-10vh) translateX(40vw);
          opacity: 0.2;
        }
        75% {
          transform: translateY(20vh) translateX(30vw);
          opacity: 0.3;
        }
      }
    `;
    
    document.head.appendChild(particleStyle);
  }
}

// Initialize video butterfly animation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Wait for other elements to load
  setTimeout(() => {
    new ButterflyVideo();
  }, 2000);
}); 