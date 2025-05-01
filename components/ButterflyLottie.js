/**
 * Elegant Butterfly Animation - Lottie Implementation
 * Realistic butterfly animation using Lottie
 */

class ButterflyLottie {
  constructor() {
    this.butterflyContainer = null;
    this.isEnabled = true;
    this.butterflies = [];
    this.butterflyCount = 3;
    
    // Initialize the component
    this.init();
  }

  init() {
    // Create multiple butterflies
    for (let i = 0; i < this.butterflyCount; i++) {
      this.createButterfly(i);
    }
  }
  
  createButterfly(index) {
    // Create container for the butterfly
    const butterflyContainer = document.createElement('div');
    butterflyContainer.className = 'butterfly-lottie-container';
    
    // Random position for each butterfly
    const randomX = Math.floor(Math.random() * (window.innerWidth * 0.8));
    const randomY = Math.floor(Math.random() * (window.innerHeight * 0.8));
    const randomSize = 80 + Math.floor(Math.random() * 70); // Random size between 80-150px
    const randomOpacity = 0.3 + (Math.random() * 0.3); // Random opacity between 0.3-0.6
    const randomDelay = Math.random() * 5; // Random animation delay
    const randomDuration = 25 + (Math.random() * 15); // Random duration between 25-40s
    
    butterflyContainer.style.cssText = `
      position: fixed;
      top: ${randomY}px;
      left: ${randomX}px;
      width: ${randomSize}px;
      height: ${randomSize}px;
      z-index: 10;
      pointer-events: none;
      opacity: ${randomOpacity};
      filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.1));
      animation: butterfly-float-${index} ${randomDuration}s ease-in-out infinite;
      animation-delay: ${randomDelay}s;
    `;
    
    document.body.appendChild(butterflyContainer);
    
    // Create unique animation for this butterfly
    this.createUniqueAnimation(index, randomDuration);
    
    // Create simple butterfly in the container
    this.createSimpleButterfly(butterflyContainer, index);
    
    // Store reference to container
    this.butterflies.push(butterflyContainer);
  }
  
  createUniqueAnimation(index, duration) {
    // Generate a unique keyframe animation for each butterfly
    const styleElement = document.createElement('style');
    
    // Create random waypoints for this butterfly
    const waypoints = [];
    const waypointCount = 5;
    
    for (let i = 0; i < waypointCount; i++) {
      const xPercent = Math.random() * 100;
      const yPercent = Math.random() * 100;
      const rotate = Math.random() * 20 - 10; // -10 to +10 degrees
      const scale = 0.9 + Math.random() * 0.2; // 0.9 to 1.1
      
      waypoints.push({
        x: xPercent,
        y: yPercent,
        rotate,
        scale
      });
    }
    
    // Create keyframes CSS
    let keyframesCSS = `@keyframes butterfly-float-${index} {`;
    
    waypoints.forEach((waypoint, i) => {
      const percent = (i / (waypointCount - 1)) * 100;
      keyframesCSS += `
        ${percent}% {
          transform: translate(${waypoint.x}vw, ${waypoint.y}vh) rotate(${waypoint.rotate}deg) scale(${waypoint.scale});
        }
      `;
    });
    
    keyframesCSS += `}`;
    
    styleElement.textContent = keyframesCSS;
    document.head.appendChild(styleElement);
  }
  
  createSimpleButterfly(container, index) {
    // Create SVG element
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
    
    // Get a random blue-purple color
    const colors = [
      "#4f46e5", // indigo
      "#8b5cf6", // violet 
      "#6366f1", // blue
      "#3b82f6", // bright blue
      "#a78bfa"  // purple
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    // Create butterfly wings
    const leftWing = document.createElementNS(svgNS, "path");
    leftWing.setAttribute("d", "M 50,30 C 30,10 10,40 30,60 C 40,70 50,50 50,40 Z");
    leftWing.setAttribute("fill", randomColor);
    leftWing.setAttribute("stroke", "#333");
    leftWing.setAttribute("stroke-width", "0.5");
    leftWing.setAttribute("class", `wing left-wing-${index}`);
    
    const rightWing = document.createElementNS(svgNS, "path");
    rightWing.setAttribute("d", "M 50,30 C 70,10 90,40 70,60 C 60,70 50,50 50,40 Z");
    rightWing.setAttribute("fill", randomColor);
    rightWing.setAttribute("stroke", "#333");
    rightWing.setAttribute("stroke-width", "0.5");
    rightWing.setAttribute("class", `wing right-wing-${index}`);
    
    // Unique animation speed for each butterfly's wings
    const wingSpeed = 0.3 + (Math.random() * 0.4); // 0.3s to 0.7s
    
    // Add animation to wings
    const style = document.createElementNS(svgNS, "style");
    style.textContent = `
      .left-wing-${index} {
        transform-origin: right center;
        animation: wing-flap ${wingSpeed}s infinite ease-in-out;
      }
      .right-wing-${index} {
        transform-origin: left center;
        animation: wing-flap ${wingSpeed}s infinite ease-in-out alternate;
      }
    `;
    
    // Add elements to SVG
    svg.appendChild(style);
    svg.appendChild(leftWing);
    svg.appendChild(rightWing);
    svg.appendChild(body);
    svg.appendChild(head);
    
    // Add SVG to container
    container.appendChild(svg);
  }
}

// Initialize butterfly animation when DOM is loaded - not needed, handled by ButterflyAnimations.js
// document.addEventListener('DOMContentLoaded', () => {
//   setTimeout(() => {
//     new ButterflyLottie();
//   }, 1000);
// }); 