/**
 * Elegant Butterfly Animation
 * Multiple butterflies with canvas animation
 */

class ButterflyAnimation {
    constructor() {
        // Create elements
        this.createElements();
        
        // Initialize variables
        this.butterflies = [];
        this.isAnimating = true;
        this.lastTime = 0;
        
        // Initialize animation
        this.init();
    }
    
    createElements() {
        // Create container
        this.container = document.createElement('div');
        this.container.className = 'butterfly-container';
        
        // Create canvas
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'butterfly-canvas';
        
        // Create toggle button
        this.toggleBtn = document.createElement('button');
        this.toggleBtn.className = 'butterfly-toggle';
        this.toggleBtn.innerHTML = '<i class="fas fa-butterfly"></i>';
        this.toggleBtn.title = "Toggle butterfly animation";
        
        // Add elements to document
        this.container.appendChild(this.canvas);
        document.body.appendChild(this.container);
        document.body.appendChild(this.toggleBtn);
        
        // Add styles
        this.addStyles();
        
        // Set up events
        this.setupEvents();
    }
    
    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .butterfly-container {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: -1;
                overflow: hidden;
            }
            
            .butterfly-canvas {
                width: 100%;
                height: 100%;
            }
            
            .butterfly-toggle {
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
                font-size: 16px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                z-index: 100;
                transition: all 0.3s ease;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            
            .butterfly-toggle:hover {
                transform: scale(1.1);
            }
            
            .butterfly-toggle.paused {
                opacity: 0.7;
            }
            
            body.dark-mode .butterfly-toggle {
                background: rgba(0, 0, 0, 0.2);
                border: 1px solid rgba(255, 255, 255, 0.05);
                color: var(--primary-color, #8b5cf6);
            }
        `;
        document.head.appendChild(style);
    }
    
    setupEvents() {
        // Toggle button
        this.toggleBtn.addEventListener('click', () => {
            this.isAnimating = !this.isAnimating;
            this.toggleBtn.classList.toggle('paused');
            
            if (this.isAnimating) {
                this.toggleBtn.innerHTML = '<i class="fas fa-butterfly"></i>';
                requestAnimationFrame(this.animate.bind(this));
            } else {
                this.toggleBtn.innerHTML = '<i class="fas fa-pause"></i>';
            }
        });
        
        // Resize
        window.addEventListener('resize', this.resizeCanvas.bind(this));
        
        // Mouse interaction
        this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.canvas.addEventListener('click', this.handleClick.bind(this));
    }
    
    init() {
        // Get canvas context
        this.ctx = this.canvas.getContext('2d');
        
        // Set canvas size
        this.resizeCanvas();
        
        // Create butterflies
        this.createButterflies(6);
        
        // Start animation
        requestAnimationFrame(this.animate.bind(this));
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createButterflies(count) {
        // Butterfly types
        const types = [
            { name: 'blue-morpho', color: '#0ea5e9', secondaryColor: '#1e40af' },
            { name: 'monarch', color: '#ff8c00', secondaryColor: '#000000' },
            { name: 'glasswing', color: 'rgba(255, 255, 255, 0.7)', secondaryColor: '#000000' },
            { name: 'swallowtail', color: '#facc15', secondaryColor: '#000000' },
            { name: 'purple-emperor', color: '#a855f7', secondaryColor: '#6b21a8' }
        ];
        
        // Create butterflies
        for (let i = 0; i < count; i++) {
            const type = types[Math.floor(Math.random() * types.length)];
            const size = Math.random() * 30 + 30; // 30-60px
            
            const butterfly = {
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: size,
                type: type,
                wingFlapSpeed: Math.random() * 0.03 + 0.03,
                wingFlapPosition: Math.random() * Math.PI * 2,
                speed: Math.random() * 0.5 + 0.5,
                direction: Math.random() * Math.PI * 2,
                pathType: Math.floor(Math.random() * 3), // 0: circular, 1: figure-8, 2: random
                pathProgress: Math.random() * Math.PI * 2,
                pathSpeed: Math.random() * 0.001 + 0.0005,
                opacity: Math.random() * 0.3 + 0.7,
                hovered: false
            };
            
            this.butterflies.push(butterfly);
        }
    }
    
    handleMouseMove(e) {
        if (!this.isAnimating) return;
        
        const rect = this.canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        this.butterflies.forEach(butterfly => {
            const dx = butterfly.x - mouseX;
            const dy = butterfly.y - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < butterfly.size) {
                if (!butterfly.hovered) {
                    butterfly.hovered = true;
                    butterfly.wingFlapSpeed *= 1.5;
                }
            } else if (butterfly.hovered) {
                butterfly.hovered = false;
                butterfly.wingFlapSpeed /= 1.5;
            }
        });
    }
    
    handleClick(e) {
        if (!this.isAnimating) return;
        
        const rect = this.canvas.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;
        
        this.butterflies.forEach(butterfly => {
            const dx = butterfly.x - clickX;
            const dy = butterfly.y - clickY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < butterfly.size * 2) {
                butterfly.direction = Math.random() * Math.PI * 2;
                butterfly.speed = Math.random() * 1 + 1.5;
            }
        });
    }
    
    updateButterflies(deltaTime) {
        this.butterflies.forEach(butterfly => {
            // Update wing flapping
            butterfly.wingFlapPosition += butterfly.wingFlapSpeed * deltaTime;
            if (butterfly.wingFlapPosition > Math.PI * 2) {
                butterfly.wingFlapPosition -= Math.PI * 2;
            }
            
            // Update path progress
            butterfly.pathProgress += butterfly.pathSpeed * deltaTime;
            
            // Calculate movement based on path type
            let dx = 0, dy = 0;
            
            if (butterfly.pathType === 0) { // Circular
                const radius = butterfly.size * 8;
                dx = Math.cos(butterfly.pathProgress) * radius * 0.01;
                dy = Math.sin(butterfly.pathProgress) * radius * 0.01;
            } else if (butterfly.pathType === 1) { // Figure-8
                const radiusX = butterfly.size * 12;
                const radiusY = butterfly.size * 6;
                dx = Math.sin(butterfly.pathProgress) * radiusX * 0.01;
                dy = Math.sin(butterfly.pathProgress * 2) * radiusY * 0.01;
            } else { // Random
                if (Math.random() < 0.01) {
                    butterfly.direction += (Math.random() - 0.5) * Math.PI/2;
                }
                dx = Math.cos(butterfly.direction) * butterfly.speed;
                dy = Math.sin(butterfly.direction) * butterfly.speed;
            }
            
            // Add slight vertical bobbing
            dy += Math.sin(butterfly.pathProgress * 3) * 0.3;
            
            // Move butterfly
            butterfly.x += dx * deltaTime;
            butterfly.y += dy * deltaTime;
            
            // Keep within bounds (wrap around)
            if (butterfly.x < -butterfly.size) butterfly.x = this.canvas.width + butterfly.size;
            if (butterfly.x > this.canvas.width + butterfly.size) butterfly.x = -butterfly.size;
            if (butterfly.y < -butterfly.size) butterfly.y = this.canvas.height + butterfly.size;
            if (butterfly.y > this.canvas.height + butterfly.size) butterfly.y = -butterfly.size;
            
            // Gradually reduce speed if it was increased
            if (butterfly.speed > 1) {
                butterfly.speed = Math.max(0.5, butterfly.speed - 0.01 * deltaTime);
            }
        });
    }
    
    drawButterfly(butterfly) {
        const ctx = this.ctx;
        const wingFlap = Math.sin(butterfly.wingFlapPosition) * 0.7;
        
        ctx.save();
        
        // Position and rotation
        ctx.translate(butterfly.x, butterfly.y);
        ctx.rotate(butterfly.direction + Math.PI/2);
        
        // Set opacity
        ctx.globalAlpha = butterfly.opacity;
        
        // Draw body
        ctx.fillStyle = butterfly.type.secondaryColor;
        ctx.beginPath();
        ctx.ellipse(0, 0, butterfly.size * 0.05, butterfly.size * 0.25, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw head
        ctx.beginPath();
        ctx.arc(0, -butterfly.size * 0.28, butterfly.size * 0.06, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw antennae
        ctx.beginPath();
        ctx.moveTo(-butterfly.size * 0.03, -butterfly.size * 0.3);
        ctx.lineTo(-butterfly.size * 0.12, -butterfly.size * 0.45);
        ctx.moveTo(butterfly.size * 0.03, -butterfly.size * 0.3);
        ctx.lineTo(butterfly.size * 0.12, -butterfly.size * 0.45);
        ctx.strokeStyle = butterfly.type.secondaryColor;
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Draw wings
        this.drawWings(ctx, butterfly, wingFlap);
        
        ctx.restore();
    }
    
    drawWings(ctx, butterfly, wingFlap) {
        const type = butterfly.type;
        const size = butterfly.size;
        
        // Upper wings
        // Left upper wing
        ctx.save();
        ctx.rotate(wingFlap);
        ctx.fillStyle = type.color;
        ctx.beginPath();
        
        if (type.name === 'glasswing') {
            // More transparent wing
            ctx.globalAlpha *= 0.6;
            ctx.ellipse(-size * 0.3, -size * 0.3, size * 0.3, size * 0.4, 0, 0, Math.PI * 2);
        } else if (type.name === 'swallowtail') {
            // Angular wing
            this.drawPointedWing(ctx, -size * 0.4, 0, size, true);
        } else {
            // Standard wing
            this.drawRoundedWing(ctx, -size * 0.4, 0, size, true);
        }
        
        ctx.fill();
        
        // Add details based on butterfly type
        if (type.name === 'monarch') {
            this.addMonarchPattern(ctx, -size * 0.4, 0, size, true);
        } else if (type.name === 'blue-morpho') {
            this.addMorphoEffect(ctx, -size * 0.4, 0, size, true);
        }
        
        ctx.restore();
        
        // Right upper wing
        ctx.save();
        ctx.rotate(-wingFlap);
        ctx.fillStyle = type.color;
        ctx.beginPath();
        
        if (type.name === 'glasswing') {
            ctx.globalAlpha *= 0.6;
            ctx.ellipse(size * 0.3, -size * 0.3, size * 0.3, size * 0.4, 0, 0, Math.PI * 2);
        } else if (type.name === 'swallowtail') {
            this.drawPointedWing(ctx, size * 0.4, 0, size, false);
        } else {
            this.drawRoundedWing(ctx, size * 0.4, 0, size, false);
        }
        
        ctx.fill();
        
        // Add details based on butterfly type
        if (type.name === 'monarch') {
            this.addMonarchPattern(ctx, size * 0.4, 0, size, false);
        } else if (type.name === 'blue-morpho') {
            this.addMorphoEffect(ctx, size * 0.4, 0, size, false);
        }
        
        ctx.restore();
        
        // Lower wings
        // Left lower wing
        ctx.save();
        ctx.rotate(wingFlap * 0.7);
        ctx.fillStyle = type.color;
        ctx.beginPath();
        
        if (type.name === 'swallowtail') {
            this.drawTailedWing(ctx, -size * 0.2, size * 0.15, size, true);
        } else {
            this.drawLowerWing(ctx, -size * 0.2, size * 0.15, size, true);
        }
        
        ctx.fill();
        ctx.restore();
        
        // Right lower wing
        ctx.save();
        ctx.rotate(-wingFlap * 0.7);
        ctx.fillStyle = type.color;
        ctx.beginPath();
        
        if (type.name === 'swallowtail') {
            this.drawTailedWing(ctx, size * 0.2, size * 0.15, size, false);
        } else {
            this.drawLowerWing(ctx, size * 0.2, size * 0.15, size, false);
        }
        
        ctx.fill();
        ctx.restore();
    }
    
    drawRoundedWing(ctx, x, y, size, isLeft) {
        const width = size * 0.4;
        const height = size * 0.5;
        const anchorX = isLeft ? x + width : x - width;
        
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(
            anchorX * 0.5, -height * 0.3,
            anchorX, -height * 0.7
        );
        ctx.quadraticCurveTo(
            anchorX * 0.7, -height,
            0, -height * 0.3
        );
    }
    
    drawPointedWing(ctx, x, y, size, isLeft) {
        const width = size * 0.4;
        const height = size * 0.5;
        const anchorX = isLeft ? x + width : x - width;
        
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(
            anchorX * 0.4, -height * 0.4,
            anchorX, -height * 0.9
        );
        ctx.quadraticCurveTo(
            anchorX * 0.6, -height * 0.5,
            0, -height * 0.2
        );
    }
    
    drawLowerWing(ctx, x, y, size, isLeft) {
        const width = size * 0.3;
        const height = size * 0.3;
        const anchorX = isLeft ? x - width : x + width;
        
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(
            anchorX * 0.5, height * 0.4,
            anchorX, height * 0.3
        );
        ctx.quadraticCurveTo(
            anchorX * 0.7, -height * 0.3,
            0, 0
        );
    }
    
    drawTailedWing(ctx, x, y, size, isLeft) {
        const width = size * 0.3;
        const height = size * 0.3;
        const anchorX = isLeft ? x - width : x + width;
        
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(
            anchorX * 0.5, height * 0.5,
            anchorX, height * 0.5
        );
        ctx.lineTo(anchorX * 1.3, height * 0.9); // Tail extension
        ctx.quadraticCurveTo(
            anchorX * 0.7, height * 0.2,
            0, 0
        );
    }
    
    addMonarchPattern(ctx, x, y, size, isLeft) {
        const width = size * 0.4;
        const height = size * 0.5;
        const anchorX = isLeft ? x + width : x - width;
        
        // Draw border
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(
            anchorX * 0.5, -height * 0.3,
            anchorX, -height * 0.7
        );
        ctx.quadraticCurveTo(
            anchorX * 0.7, -height,
            0, -height * 0.3
        );
        ctx.stroke();
        
        // Draw veins
        ctx.beginPath();
        for (let i = 1; i <= 3; i++) {
            ctx.moveTo(0, 0);
            ctx.lineTo(anchorX * (i/4), -height * (i/4));
        }
        ctx.stroke();
    }
    
    addMorphoEffect(ctx, x, y, size, isLeft) {
        const width = size * 0.4;
        const height = size * 0.5;
        const anchorX = isLeft ? x + width * 0.7 : x - width * 0.7;
        
        // Iridescent effect
        ctx.fillStyle = '#39d0ff';
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.ellipse(anchorX, -height * 0.5, width * 0.5, height * 0.6, 0, 0, Math.PI * 2);
        ctx.fill();
    }
    
    animate(timestamp) {
        if (!this.isAnimating) return;
        
        // Calculate delta time
        const deltaTime = timestamp - this.lastTime || 0;
        this.lastTime = timestamp;
        
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw butterflies
        this.updateButterflies(deltaTime);
        this.butterflies.forEach(butterfly => {
            this.drawButterfly(butterfly);
        });
        
        // Continue animation loop
        requestAnimationFrame(this.animate.bind(this));
    }
}

// Initialize animation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        new ButterflyAnimation();
    }, 1000);
}); 