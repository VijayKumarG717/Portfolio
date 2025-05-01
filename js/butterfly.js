/**
 * Dynamic Butterfly Animation
 * - Follows cursor movement
 * - Reacts to user interaction
 * - Provides comments on the current section
 */

class Butterfly {
    constructor() {
        this.createButterfly();
        this.createBubble();
        this.position = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        this.target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        this.speed = 0.05;
        this.isResting = false;
        this.restTimer = null;
        this.lastSection = '';
        this.bubbleVisible = false;
        this.bubbleTimeout = null;
        
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
        
        // Assemble butterfly
        this.butterfly.appendChild(leftWing);
        this.butterfly.appendChild(body);
        this.butterfly.appendChild(rightWing);
        
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
                width: 40px;
                height: 40px;
                z-index: 9999;
                transform-origin: center;
                pointer-events: none;
                transition: transform 0.2s ease;
                filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.5));
            }
            
            .wing {
                position: absolute;
                width: 20px;
                height: 30px;
                background: linear-gradient(135deg, #60a5fa 0%, #7c3aed 50%, #ec4899 100%);
                border-radius: 50% 50% 50% 50% / 80% 80% 40% 40%;
                opacity: 0.85;
                top: 5px;
            }
            
            .left-wing {
                left: 0;
                transform-origin: right center;
                animation: flapLeft 0.2s ease-in-out infinite alternate;
            }
            
            .right-wing {
                right: 0;
                transform-origin: left center;
                animation: flapRight 0.2s ease-in-out infinite alternate;
            }
            
            @keyframes flapLeft {
                0% { transform: rotateY(40deg); }
                100% { transform: rotateY(-20deg); }
            }
            
            @keyframes flapRight {
                0% { transform: rotateY(-40deg); }
                100% { transform: rotateY(20deg); }
            }
            
            .butterfly-body {
                position: absolute;
                width: 4px;
                height: 30px;
                background: linear-gradient(to bottom, #d946ef, #8b5cf6);
                left: 50%;
                top: 5px;
                transform: translateX(-50%);
                border-radius: 2px;
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
    
    initEventListeners() {
        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            this.target.x = e.clientX;
            this.target.y = e.clientY;
            
            // Stop resting when mouse moves
            if (this.isResting) {
                this.isResting = false;
                this.butterfly.classList.remove('resting');
                clearTimeout(this.restTimer);
            }
            
            // Set a timer to start resting if mouse doesn't move
            clearTimeout(this.restTimer);
            this.restTimer = setTimeout(() => {
                this.isResting = true;
                this.butterfly.classList.add('resting');
                this.showComment();
            }, 2000);
        });
        
        // Check which section is currently visible
        window.addEventListener('scroll', () => {
            this.checkCurrentSection();
        });
        
        // Track touch movement for mobile
        document.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                this.target.x = e.touches[0].clientX;
                this.target.y = e.touches[0].clientY;
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            // Reset position if outside viewport
            if (this.position.x > window.innerWidth) this.position.x = window.innerWidth / 2;
            if (this.position.y > window.innerHeight) this.position.y = window.innerHeight / 2;
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
                    this.showComment();
                }
            }
        });
    }
    
    showComment() {
        if (!this.lastSection || !this.sectionComments[this.lastSection]) return;
        
        // Clear any existing timeout
        clearTimeout(this.bubbleTimeout);
        
        // Get random comment for current section
        const comments = this.sectionComments[this.lastSection];
        const randomComment = comments[Math.floor(Math.random() * comments.length)];
        
        // Update bubble text and position
        this.bubbleText.textContent = randomComment;
        this.bubble.classList.add('visible');
        this.bubbleVisible = true;
        
        // Hide bubble after a delay
        this.bubbleTimeout = setTimeout(() => {
            this.bubble.classList.remove('visible');
            this.bubbleVisible = false;
        }, 3000);
    }
    
    animate() {
        // Calculate new position with smooth movement
        this.position.x += (this.target.x - this.position.x) * this.speed;
        this.position.y += (this.target.y - this.position.y) * this.speed;
        
        // Calculate movement direction for rotation
        const dx = this.target.x - this.position.x;
        const dy = this.target.y - this.position.y;
        const rotation = Math.atan2(dy, dx) * (180 / Math.PI);
        
        // Apply position and rotation to butterfly
        this.butterfly.style.left = `${this.position.x - 20}px`;
        this.butterfly.style.top = `${this.position.y - 20}px`;
        this.butterfly.style.transform = `rotate(${rotation}deg)`;
        
        // Update bubble position
        if (this.bubbleVisible) {
            this.bubble.style.left = `${this.position.x - 100}px`;
            this.bubble.style.top = `${this.position.y - 70}px`;
        }
        
        // Continue animation loop
        requestAnimationFrame(this.animate.bind(this));
    }
}

// Initialize butterfly when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        new Butterfly();
    }, 1000); // Slight delay to ensure all elements are loaded
    
    // Initial section check
    setTimeout(() => {
        const butterfly = new Butterfly();
        butterfly.checkCurrentSection();
    }, 1500);
}); 