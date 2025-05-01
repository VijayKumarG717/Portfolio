/**
 * Dynamic Butterfly Animation
 * - Flies randomly around the page
 * - Reacts to user interaction
 * - Provides comments on the current section
 */

class Butterfly {
    constructor() {
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
        const leftWing = document.createElement('div');
        leftWing.className = 'wing left-wing';
        
        const rightWing = document.createElement('div');
        rightWing.className = 'wing right-wing';
        
        // Create butterfly body
        const body = document.createElement('div');
        body.className = 'butterfly-body';
        
        // Create antennae
        const leftAntenna = document.createElement('div');
        leftAntenna.className = 'antenna left-antenna';
        
        const rightAntenna = document.createElement('div');
        rightAntenna.className = 'antenna right-antenna';
        
        // Assemble butterfly
        this.butterfly.appendChild(leftWing);
        this.butterfly.appendChild(rightWing);
        this.butterfly.appendChild(body);
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
                width: 50px;
                height: 50px;
                z-index: 9999;
                transform-origin: center;
                pointer-events: none;
                transition: transform 0.2s ease;
                filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.5));
            }
            
            .wing {
                position: absolute;
                width: 25px;
                height: 35px;
                background: linear-gradient(135deg, #60a5fa 0%, #7c3aed 50%, #ec4899 100%);
                border-radius: 80% 80% 60% 60% / 90% 90% 40% 40%;
                opacity: 0.85;
                top: 5px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.2) inset;
            }
            
            .left-wing {
                left: 0;
                transform-origin: right center;
                animation: flapLeft 0.15s ease-in-out infinite alternate;
                background: linear-gradient(135deg, #60a5fa 0%, #7c3aed 50%, #ec4899 100%);
            }
            
            .right-wing {
                right: 0;
                transform-origin: left center;
                animation: flapRight 0.15s ease-in-out infinite alternate;
                background: linear-gradient(135deg, #60a5fa 0%, #7c3aed 50%, #ec4899 100%);
            }
            
            .butterfly-body {
                position: absolute;
                width: 4px;
                height: 35px;
                background: linear-gradient(to bottom, #111111, #8b5cf6);
                left: 50%;
                top: 5px;
                transform: translateX(-50%);
                border-radius: 50%;
            }
            
            .antenna {
                position: absolute;
                width: 1px;
                height: 15px;
                background: #111111;
                top: 0px;
            }
            
            .left-antenna {
                left: 40%;
                transform: translateX(-50%) rotate(-30deg);
            }
            
            .right-antenna {
                right: 40%;
                transform: translateX(50%) rotate(30deg);
            }
            
            @keyframes flapLeft {
                0% { transform: rotateY(50deg) rotateX(10deg); }
                100% { transform: rotateY(-20deg) rotateX(-10deg); }
            }
            
            @keyframes flapRight {
                0% { transform: rotateY(-50deg) rotateX(10deg); }
                100% { transform: rotateY(20deg) rotateX(-10deg); }
            }
            
            .butterfly.fast .left-wing,
            .butterfly.fast .right-wing {
                animation-duration: 0.1s;
            }
            
            .butterfly.slow .left-wing,
            .butterfly.slow .right-wing {
                animation-duration: 0.3s;
            }
            
            .butterfly.resting .left-wing,
            .butterfly.resting .right-wing {
                animation-duration: 1s;
            }
            
            body.dark-mode .wing {
                background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #f59e0b 100%);
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
        // Set a random target position within the viewport
        const padding = 100; // Keep away from edges
        
        this.target.x = Math.random() * (window.innerWidth - padding * 2) + padding;
        this.target.y = Math.random() * (window.innerHeight - padding * 2) + padding;
        
        // Adjust butterfly speed based on distance
        const dx = this.target.x - this.position.x;
        const dy = this.target.y - this.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Set speed and wing flapping rate based on distance
        if (distance > 400) {
            this.speed = 0.04;
            this.butterfly.classList.remove('slow');
            this.butterfly.classList.add('fast');
        } else if (distance < 200) {
            this.speed = 0.02;
            this.butterfly.classList.remove('fast');
            this.butterfly.classList.add('slow');
        } else {
            this.speed = 0.03;
            this.butterfly.classList.remove('fast', 'slow');
        }
        
        // Occasionally make the butterfly rest
        const shouldRest = Math.random() < 0.2;
        if (shouldRest && !this.isResting) {
            this.isResting = true;
            this.butterfly.classList.add('resting');
            
            // Show a comment when resting
            if (Math.random() < 0.3) {
                this.showComment();
            }
            
            // Rest for a while then continue flying
            clearTimeout(this.restTimer);
            this.restTimer = setTimeout(() => {
                this.isResting = false;
                this.butterfly.classList.remove('resting');
                this.setRandomTarget();
            }, Math.random() * 3000 + 2000);
            
            return;
        }
        
        // Set timer for next random movement
        clearTimeout(this.randomMoveTimer);
        this.randomMoveTimer = setTimeout(() => {
            if (!this.randomMoveCooldown) {
                this.setRandomTarget();
            }
        }, Math.random() * 4000 + 2000);
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
        
        // Add subtle organic movement
        if (!this.isResting) {
            this.position.x += Math.sin(Date.now() * 0.001) * 0.5;
            this.position.y += Math.cos(Date.now() * 0.001) * 0.5;
        }
        
        // Calculate movement direction for rotation
        const dx = this.target.x - this.position.x;
        const dy = this.target.y - this.position.y;
        const rotation = Math.atan2(dy, dx) * (180 / Math.PI);
        
        // Apply position and rotation to butterfly
        this.butterfly.style.left = `${this.position.x - 25}px`;
        this.butterfly.style.top = `${this.position.y - 25}px`;
        this.butterfly.style.transform = `rotate(${rotation}deg)`;
        
        // Update bubble position
        if (this.bubbleVisible) {
            this.bubble.style.left = `${this.position.x - 100}px`;
            this.bubble.style.top = `${this.position.y - 80}px`;
        }
        
        // Check if we've reached the target
        const distance = Math.sqrt(dx * dx + dy * dy);
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