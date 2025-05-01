/**
 * Realistic Butterfly Animation
 * - Mimics a real monarch butterfly
 * - Natural flight pattern with organic movement
 * - Provides comments on the current section
 */

class Butterfly {
    constructor() {
        this.butterflyType = Math.floor(Math.random() * 3); // 0: Monarch, 1: Blue Morpho, 2: Swallowtail
        this.createButterfly();
        this.createBubble();
        this.position = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        this.target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        this.speed = 0.03;
        this.isResting = false;
        this.restTimer = null;
        this.lastSection = '';
        this.bubbleVisible = false;
        this.bubbleTimeout = null;
        this.randomMoveTimer = null;
        this.randomMoveCooldown = false;
        this.hoveredSection = null;
        this.altitude = 0; // For vertical bobbing
        this.altitudeDirection = 1;
        this.altitudeSpeed = 0.05;
        this.altitudeMax = 15;
        
        // Comments for each section
        this.sectionComments = {
            'home': [
                "Welcome to Vijay's portfolio! 👋",
                "A talented AI Engineer & Developer!",
                "Hover over different sections to learn more!"
            ],
            'about': [
                "Vijay is passionate about technology!",
                "ECE student skilled in Python, C, and Java!",
                "Interested in AI, computer vision, and data analytics!"
            ],
            'skills': [
                "Impressive skill set!",
                "Proficient in Python and Computer Vision!",
                "Check out those development skills!"
            ],
            'projects': [
                "Look at these amazing projects!",
                "Hand gesture tracking with Computer Vision!",
                "Smart CCTV using OpenCV and Tkinter!"
            ],
            'experience': [
                "Great experience in AI and Data Analytics!",
                "Internships at AICTE and Tessolve!",
                "Multiple Microsoft Azure certifications!"
            ],
            'blog': [
                "Interesting technical blog posts!",
                "Deep insights on web development!",
                "Worth reading these articles!"
            ],
            'contact': [
                "Want to get in touch?",
                "Feel free to reach out!",
                "Let's connect and build something great!"
            ]
        };
        
        // Initialize event listeners
        this.initEventListeners();
        
        // Start the animation loop
        this.animate();
        
        // Start random movement
        this.setRandomTarget();
    }
    
    createButterfly() {
        // Create butterfly element
        this.butterfly = document.createElement('div');
        this.butterfly.className = 'butterfly';
        
        // Create butterfly wings
        const leftUpperWing = document.createElement('div');
        leftUpperWing.className = 'wing left-upper-wing';
        
        const rightUpperWing = document.createElement('div');
        rightUpperWing.className = 'wing right-upper-wing';
        
        const leftLowerWing = document.createElement('div');
        leftLowerWing.className = 'wing left-lower-wing';
        
        const rightLowerWing = document.createElement('div');
        rightLowerWing.className = 'wing right-lower-wing';
        
        // Create butterfly body
        const body = document.createElement('div');
        body.className = 'butterfly-body';
        
        // Create butterfly head
        const head = document.createElement('div');
        head.className = 'butterfly-head';
        
        // Create antennae
        const leftAntenna = document.createElement('div');
        leftAntenna.className = 'antenna left-antenna';
        
        const rightAntenna = document.createElement('div');
        rightAntenna.className = 'antenna right-antenna';
        
        // Add butterfly type class
        const types = ['monarch', 'blue-morpho', 'swallowtail'];
        this.butterfly.classList.add(types[this.butterflyType]);
        
        // Assemble butterfly
        this.butterfly.appendChild(leftUpperWing);
        this.butterfly.appendChild(rightUpperWing);
        this.butterfly.appendChild(leftLowerWing);
        this.butterfly.appendChild(rightLowerWing);
        this.butterfly.appendChild(body);
        this.butterfly.appendChild(head);
        this.butterfly.appendChild(leftAntenna);
        this.butterfly.appendChild(rightAntenna);
        
        // Add to document
        document.body.appendChild(this.butterfly);
        
        // Add butterfly styles
        this.addButterflyStyles();
    }
    
    createBubble() {
        // Create speech bubble
        this.bubble = document.createElement('div');
        this.bubble.className = 'butterfly-bubble';
        this.bubbleText = document.createElement('p');
        this.bubble.appendChild(this.bubbleText);
        document.body.appendChild(this.bubble);
        
        // Add bubble styles
        this.addBubbleStyles();
    }
    
    addButterflyStyles() {
        // Add CSS for butterfly
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            .butterfly {
                position: fixed;
                width: 80px;
                height: 90px;
                z-index: 9999;
                transform-origin: center;
                pointer-events: none;
                filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.3));
            }
            
            .wing {
                position: absolute;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.2) inset;
                background-size: cover;
            }
            
            .left-upper-wing {
                width: 35px;
                height: 45px;
                left: 10px;
                top: 5px;
                transform-origin: bottom right;
                animation: flapLeftUpper 0.15s ease-in-out infinite alternate;
                border-radius: 90% 80% 60% 50% / 90% 80% 40% 40%;
            }
            
            .right-upper-wing {
                width: 35px;
                height: 45px;
                right: 10px;
                top: 5px;
                transform-origin: bottom left;
                animation: flapRightUpper 0.15s ease-in-out infinite alternate;
                border-radius: 80% 90% 50% 60% / 80% 90% 40% 40%;
            }
            
            .left-lower-wing {
                width: 30px;
                height: 40px;
                left: 12px;
                top: 35px;
                transform-origin: top right;
                animation: flapLeftLower 0.15s ease-in-out infinite alternate;
                animation-delay: 0.05s;
                border-radius: 70% 60% 80% 50% / 60% 40% 90% 60%;
            }
            
            .right-lower-wing {
                width: 30px;
                height: 40px;
                right: 12px;
                top: 35px;
                transform-origin: top left;
                animation: flapRightLower 0.15s ease-in-out infinite alternate;
                animation-delay: 0.05s;
                border-radius: 60% 70% 50% 80% / 40% 60% 60% 90%;
            }
            
            .butterfly-body {
                position: absolute;
                width: 4px;
                height: 70px;
                background: #111111;
                left: 50%;
                top: 5px;
                transform: translateX(-50%);
                border-radius: 50% 50% 0 0;
                z-index: 2;
            }
            
            .butterfly-head {
                position: absolute;
                width: 7px;
                height: 7px;
                background: #000000;
                left: 50%;
                top: 3px;
                transform: translateX(-50%);
                border-radius: 50%;
                z-index: 3;
            }
            
            .antenna {
                position: absolute;
                width: 1px;
                height: 12px;
                background: #000000;
                top: 2px;
                z-index: 3;
            }
            
            .left-antenna {
                left: calc(50% - 4px);
                transform: rotate(-30deg);
            }
            
            .right-antenna {
                right: calc(50% - 4px);
                transform: rotate(30deg);
            }
            
            /* Monarch Butterfly - orange with black patterns */
            .butterfly.monarch .wing {
                background: #ff8c00;
                background-image: 
                    radial-gradient(circle at center, transparent 60%, black 99%),
                    linear-gradient(90deg, transparent 85%, black 90%, transparent 95%);
                border: 1px solid black;
            }
            
            .butterfly.monarch .butterfly-body {
                background: linear-gradient(to bottom, black 0%, black 100%);
                box-shadow: 0px 0px 4px rgba(0,0,0,0.5);
            }
            
            /* Blue Morpho Butterfly - iridescent blue */
            .butterfly.blue-morpho .wing {
                background: linear-gradient(135deg, #0ea5e9 0%, #1e40af 80%);
                border: 1px solid #1e3a8a;
                box-shadow: 0 0 15px rgba(14, 165, 233, 0.3) inset;
            }
            
            .butterfly.blue-morpho .butterfly-body {
                background: linear-gradient(to bottom, black 0%, #0c4a6e 100%);
            }
            
            /* Swallowtail Butterfly - yellow with black patterns */
            .butterfly.swallowtail .wing {
                background: #facc15;
                background-image: 
                    radial-gradient(ellipse at center, transparent 40%, black 99%),
                    linear-gradient(90deg, transparent 80%, black 85%, transparent 90%);
                border: 1px solid black;
            }
            
            .butterfly.swallowtail .left-lower-wing,
            .butterfly.swallowtail .right-lower-wing {
                height: 50px;
                border-radius: 40% 50% 20% 80% / 40% 50% 70% 80%;
            }
            
            .butterfly.swallowtail .butterfly-body {
                background: linear-gradient(to bottom, black 0%, #422006 100%);
            }
            
            @keyframes flapLeftUpper {
                0% { transform: rotateY(65deg) rotateX(5deg); }
                100% { transform: rotateY(-5deg) rotateX(-5deg); }
            }
            
            @keyframes flapRightUpper {
                0% { transform: rotateY(-65deg) rotateX(5deg); }
                100% { transform: rotateY(5deg) rotateX(-5deg); }
            }
            
            @keyframes flapLeftLower {
                0% { transform: rotateY(55deg) rotateX(-5deg); }
                100% { transform: rotateY(-5deg) rotateX(5deg); }
            }
            
            @keyframes flapRightLower {
                0% { transform: rotateY(-55deg) rotateX(-5deg); }
                100% { transform: rotateY(5deg) rotateX(5deg); }
            }
            
            .butterfly.fast .wing {
                animation-duration: 0.08s;
            }
            
            .butterfly.medium .wing {
                animation-duration: 0.15s;
            }
            
            .butterfly.slow .wing {
                animation-duration: 0.25s;
            }
            
            .butterfly.resting .wing {
                animation-duration: 1.5s;
            }
        `;
        document.head.appendChild(styleSheet);
    }
    
    addBubbleStyles() {
        // Add CSS for speech bubble
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            .butterfly-bubble {
                position: fixed;
                background: white;
                color: #1e293b;
                padding: 10px 15px;
                border-radius: 20px;
                max-width: 200px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                z-index: 9998;
                opacity: 0;
                transform: translateY(10px);
                transition: opacity 0.3s ease, transform 0.3s ease;
                pointer-events: none;
                font-size: 14px;
                font-family: 'Poppins', sans-serif;
            }
            
            .butterfly-bubble:after {
                content: '';
                position: absolute;
                top: 0;
                left: 50%;
                width: 0;
                height: 0;
                border: 10px solid transparent;
                border-bottom-color: white;
                border-top: 0;
                margin-left: -10px;
                margin-top: -10px;
            }
            
            .butterfly-bubble.visible {
                opacity: 1;
                transform: translateY(0);
            }
            
            body.dark-mode .butterfly-bubble {
                background: #1e293b;
                color: #f1f5f9;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
            }
            
            body.dark-mode .butterfly-bubble:after {
                border-bottom-color: #1e293b;
            }
        `;
        document.head.appendChild(styleSheet);
    }
    
    setRandomTarget() {
        // Set a random target position within the viewport with more natural flight patterns
        const padding = 100; // Keep away from edges
        
        // For more natural flight, butterflies tend to:
        // 1. Fly in arcing patterns rather than straight lines
        // 2. Have moments of hovering followed by quick movements
        // 3. Sometimes float upward on air currents
        
        // Decide on movement type
        const movementType = Math.random();
        
        if (movementType < 0.3) { // Hover nearby
            // Move to a nearby position
            const hoverRange = 150;
            this.target.x = this.position.x + (Math.random() * hoverRange - hoverRange/2);
            this.target.y = this.position.y + (Math.random() * hoverRange - hoverRange/2);
            
            // Ensure target is within viewport
            this.target.x = Math.max(padding, Math.min(window.innerWidth - padding, this.target.x));
            this.target.y = Math.max(padding, Math.min(window.innerHeight - padding, this.target.y));
            
            // Hover slowly
            this.speed = 0.01;
            this.butterfly.classList.remove('fast', 'medium');
            this.butterfly.classList.add('slow');
            
        } else if (movementType < 0.7) { // Normal flight
            // Choose a random position
            this.target.x = Math.random() * (window.innerWidth - padding * 2) + padding;
            this.target.y = Math.random() * (window.innerHeight - padding * 2) + padding;
            
            // Normal speed
            this.speed = 0.03;
            this.butterfly.classList.remove('fast', 'slow');
            this.butterfly.classList.add('medium');
            
        } else { // Quick dart to new position
            // Choose a position further away
            this.target.x = Math.random() * (window.innerWidth - padding * 2) + padding;
            this.target.y = Math.random() * (window.innerHeight - padding * 2) + padding;
            
            // Move more quickly
            this.speed = 0.05;
            this.butterfly.classList.remove('slow', 'medium');
            this.butterfly.classList.add('fast');
        }
        
        // Occasionally make the butterfly rest
        const shouldRest = Math.random() < 0.15;
        if (shouldRest && !this.isResting) {
            this.isResting = true;
            this.butterfly.classList.add('resting');
            
            // Show a comment when resting
            if (Math.random() < 0.4) {
                this.showComment();
            }
            
            // Rest for a while then continue flying
            clearTimeout(this.restTimer);
            this.restTimer = setTimeout(() => {
                this.isResting = false;
                this.butterfly.classList.remove('resting');
                this.setRandomTarget();
            }, Math.random() * 4000 + 2000);
            
            return;
        }
        
        // Occasionally make the butterfly float upward
        if (Math.random() < 0.2) {
            this.target.y = Math.max(padding, this.position.y - Math.random() * 200);
        }
        
        // Set timer for next random movement with variable timing
        clearTimeout(this.randomMoveTimer);
        this.randomMoveTimer = setTimeout(() => {
            if (!this.randomMoveCooldown) {
                this.setRandomTarget();
            }
        }, Math.random() * 3000 + 1000); // More variable timing
    }
    
    initEventListeners() {
        // Track mouse movement for section hovering
        document.addEventListener('mousemove', (e) => {
            // We still track the mouse but don't use it for butterfly target
            // Check if the mouse is over a section and show a comment
            this.checkMouseOverSection(e);
        });
        
        // Check which section is currently visible on scroll
        window.addEventListener('scroll', () => {
            this.checkCurrentSection();
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            // Reset position if outside viewport
            if (this.position.x > window.innerWidth) this.position.x = window.innerWidth / 2;
            if (this.position.y > window.innerHeight) this.position.y = window.innerHeight / 2;
            
            // Set a new random target after resize
            this.setRandomTarget();
        });
        
        // Handle section hovering
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            section.addEventListener('mouseenter', () => {
                const sectionId = section.getAttribute('id');
                if (sectionId && this.sectionComments[sectionId]) {
                    this.hoveredSection = sectionId;
                    this.showComment();
                    
                    // Make butterfly fly toward this section
                    const rect = section.getBoundingClientRect();
                    this.target.x = rect.left + rect.width / 2;
                    this.target.y = rect.top + rect.height / 3;
                    this.speed = 0.02; // Slower approach to section
                    
                    // Prevent random movement for a while
                    this.randomMoveCooldown = true;
                    setTimeout(() => {
                        this.randomMoveCooldown = false;
                        this.setRandomTarget();
                    }, 4000);
                }
            });
            
            section.addEventListener('mouseleave', () => {
                if (this.hoveredSection === section.getAttribute('id')) {
                    this.hoveredSection = null;
                    
                    // Hide comment bubble when leaving section
                    this.bubble.classList.remove('visible');
                    this.bubbleVisible = false;
                }
            });
        });
    }
    
    checkMouseOverSection(e) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        // Check which section is under the mouse
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            
            if (
                mouseX >= rect.left &&
                mouseX <= rect.right &&
                mouseY >= rect.top &&
                mouseY <= rect.bottom
            ) {
                const sectionId = section.getAttribute('id');
                if (sectionId && this.sectionComments[sectionId] && this.hoveredSection !== sectionId) {
                    this.hoveredSection = sectionId;
                    this.showComment();
                }
            }
        });
    }
    
    checkCurrentSection() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + window.innerHeight / 3;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                const sectionId = section.getAttribute('id');
                if (sectionId && this.lastSection !== sectionId) {
                    this.lastSection = sectionId;
                    
                    // When scrolling to a new section, make butterfly fly to it
                    if (!this.randomMoveCooldown) {
                        const rect = section.getBoundingClientRect();
                        this.target.x = rect.left + rect.width / 2;
                        this.target.y = rect.top + rect.height / 3;
                        
                        // Prevent random movement for a while
                        this.randomMoveCooldown = true;
                        setTimeout(() => {
                            this.randomMoveCooldown = false;
                            this.setRandomTarget();
                        }, 3000);
                    }
                }
            }
        });
    }
    
    showComment() {
        const sectionId = this.hoveredSection || this.lastSection;
        if (!sectionId || !this.sectionComments[sectionId]) return;
        
        // Clear any existing timeout
        clearTimeout(this.bubbleTimeout);
        
        // Get random comment for current section
        const comments = this.sectionComments[sectionId];
        const randomComment = comments[Math.floor(Math.random() * comments.length)];
        
        // Update bubble text and position
        this.bubbleText.textContent = randomComment;
        this.bubble.classList.add('visible');
        this.bubbleVisible = true;
        
        // Hide bubble after a delay
        this.bubbleTimeout = setTimeout(() => {
            this.bubble.classList.remove('visible');
            this.bubbleVisible = false;
        }, 4000);
    }
    
    animate() {
        // If resting, move less or not at all
        const actualSpeed = this.isResting ? this.speed * 0.1 : this.speed;
        
        // Calculate new position with smooth movement
        this.position.x += (this.target.x - this.position.x) * actualSpeed;
        this.position.y += (this.target.y - this.position.y) * actualSpeed;
        
        // Add natural butterfly movement - bobbing up and down in a wave pattern
        if (!this.isResting) {
            // Vertical bobbing motion
            this.altitude += this.altitudeDirection * 0.5;
            if (this.altitude > 15 || this.altitude < -15) {
                this.altitudeDirection *= -1;
            }
            
            // Add slight side-to-side wobble
            this.position.x += Math.sin(Date.now() * 0.002) * 0.8;
            
            // Vertical motion is influenced by altitude
            this.position.y += Math.sin(Date.now() * 0.001) * 0.3 + (this.altitude * 0.05);
        }
        
        // Calculate movement direction for rotation
        const dx = this.target.x - this.position.x;
        const dy = this.target.y - this.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const rotation = Math.atan2(dy, dx) * (180 / Math.PI);
        
        // Add slight natural tilt and rotation
        const naturalTilt = Math.sin(Date.now() * 0.001) * 10;
        
        // Apply position and rotation to butterfly
        this.butterfly.style.left = `${this.position.x - 40}px`;
        this.butterfly.style.top = `${this.position.y - 45}px`;
        this.butterfly.style.transform = `rotate(${rotation + naturalTilt}deg)`;
        
        // Update bubble position
        if (this.bubbleVisible) {
            this.bubble.style.left = `${this.position.x - 100}px`;
            this.bubble.style.top = `${this.position.y - 90}px`;
        }
        
        // Check if we've reached the target
        if (distance < 5 && !this.isResting && !this.randomMoveCooldown) {
            // We've reached the target, set a new one
            this.setRandomTarget();
        }
        
        // Continue animation loop
        requestAnimationFrame(this.animate.bind(this));
    }
}

// Initialize butterfly when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        new Butterfly();
    }, 2000); // Slight delay to ensure all elements are loaded
}); 