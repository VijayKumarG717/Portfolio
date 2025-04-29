/**
 * Stars Animation for Hero Section
 * Creates an animated starfield background effect
 */

document.addEventListener('DOMContentLoaded', () => {
    // Create a canvas container for stars if it doesn't exist
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
        // Check if stars container already exists
        if (!document.getElementById('stars-container')) {
            const starsContainer = document.createElement('div');
            starsContainer.id = 'stars-container';
            starsContainer.style.position = 'absolute';
            starsContainer.style.top = '0';
            starsContainer.style.left = '0';
            starsContainer.style.width = '100%';
            starsContainer.style.height = '100%';
            starsContainer.style.overflow = 'hidden';
            starsContainer.style.zIndex = '1';
            heroSection.insertBefore(starsContainer, heroSection.firstChild);
            
            // Create stars
            createStars(starsContainer, 100);
        }
    }
});

/**
 * Creates animated star elements
 * @param {HTMLElement} container - The container to add stars to
 * @param {number} count - Number of stars to create
 */
function createStars(container, count) {
    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random star positions
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const scale = Math.random() * 0.2 + 0.1;
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 2;
        
        // Style the star
        star.style.position = 'absolute';
        star.style.left = `${posX}%`;
        star.style.top = `${posY}%`;
        star.style.width = '2px';
        star.style.height = '2px';
        star.style.borderRadius = '50%';
        star.style.backgroundColor = 'white';
        star.style.opacity = Math.random() * 0.8 + 0.2;
        star.style.transform = `scale(${scale})`;
        star.style.animation = `twinkle ${duration}s infinite ${delay}s`;
        
        container.appendChild(star);
    }
    
    // Add the animation style if it doesn't exist
    if (!document.getElementById('star-animation')) {
        const styleElement = document.createElement('style');
        styleElement.id = 'star-animation';
        styleElement.textContent = `
            @keyframes twinkle {
                0% { opacity: 0.2; transform: scale(0.1); }
                50% { opacity: 0.8; transform: scale(0.2); }
                100% { opacity: 0.2; transform: scale(0.1); }
            }
        `;
        document.head.appendChild(styleElement);
    }
}

// Additional functionality to adjust star density on resize
window.addEventListener('resize', () => {
    const starsContainer = document.getElementById('stars-container');
    if (starsContainer) {
        // Clear existing stars and recalculate based on screen size
        starsContainer.innerHTML = '';
        const density = window.innerWidth < 768 ? 50 : 100;
        createStars(starsContainer, density);
    }
}); 