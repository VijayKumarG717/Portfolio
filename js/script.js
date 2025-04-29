// Preloader
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
            document.body.classList.add('loaded');
        }, 500);
    }, 1500);
});

// Initialize AOS animation library
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

// Typed.js for typing animation
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('typed-text')) {
        new Typed('#typed-text', {
            strings: [
                'Python Development',
                'Computer Vision',
                'AI/ML Solutions',
                'Data Analytics',
                'Web Development'
            ],
            typeSpeed: 60,
            backSpeed: 30,
            backDelay: 1500,
            startDelay: 1000,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }

    // Initialize all necessary functionality
    initNavbar();
    createStars();
    animateSkillBars();
});

// Initialize Navbar and Mobile Menu
function initNavbar() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.getElementById('navbar');
    const overlay = document.querySelector('.nav-overlay');
    let lastScrollTop = 0;

    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            if (overlay) overlay.classList.toggle('active');
            
            // Animate hamburger to X
            hamburger.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking outside
    if (overlay) {
        overlay.addEventListener('click', () => {
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
            overlay.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
        });
    }

    // Close mobile menu when clicking nav links
    const navItems = document.querySelectorAll('.nav-links li a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
                if (overlay) overlay.classList.remove('active');
                if (hamburger) hamburger.classList.remove('active');
            }
        });
    });

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add shadow and reduce padding on scroll
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Always keep navbar visible (removed hiding behavior)
        navbar.style.top = '0';
        
        lastScrollTop = scrollTop;
        
        // Show/hide back to top button
        const backToTop = document.querySelector('.back-to-top');
        if (backToTop) {
            if (scrollTop > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        }
    });

    // Smooth scrolling for navbar links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === "#") return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Highlight active section in navbar
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(li => {
            li.classList.remove('active');
            if (li.getAttribute('href').substring(1) === current) {
                li.classList.add('active');
            }
        });
    });
}

// Back to top button
document.querySelector('.back-to-top')?.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Star animation for hero section
function createStars() {
    const starsContainer = document.querySelector('.stars-container');
    if (!starsContainer) return;
    
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 5}s`;
        star.style.animationDuration = `${5 + Math.random() * 5}s`;
        starsContainer.appendChild(star);
    }
}

// Project hover effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.querySelector('.project-overlay').style.opacity = '1';
    });
    
    card.addEventListener('mouseleave', function() {
        this.querySelector('.project-overlay').style.opacity = '0';
    });
});

// Skill Bar Animation
function animateSkillBars() {
    const skillMeters = document.querySelectorAll('.skill-meter-fill');
    
    skillMeters.forEach(meter => {
        const percentage = meter.getAttribute('data-percentage');
        
        // Use Intersection Observer to animate when skill meters come into view
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Wait a tiny bit before starting the animation
                    setTimeout(() => {
                        meter.style.width = percentage;
                    }, 200);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(meter);
    });
}

// Modern Skills Section Animation
function initSkillMeters() {
    const skillMeters = document.querySelectorAll('.skill-meter-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const percentage = entry.target.getAttribute('data-percentage');
                entry.target.style.width = percentage;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    skillMeters.forEach(meter => {
        // Initially set width to 0
        meter.style.width = '0%';
        observer.observe(meter);
    });
}

// Modern Contact Form Handling
function setupContactForm() {
    const contactForm = document.querySelector('.modern-form');
    if (!contactForm) return;
    
    const nameInput = contactForm.querySelector('input[name="name"]');
    const emailInput = contactForm.querySelector('input[name="email"]');
    const subjectInput = contactForm.querySelector('input[name="subject"]');
    const messageInput = contactForm.querySelector('textarea[name="message"]');
    const submitButton = contactForm.querySelector('.submit-btn');
    
    // Add input validation
    emailInput.addEventListener('blur', () => {
        validateEmail(emailInput);
    });
    
    nameInput.addEventListener('blur', () => {
        validateRequired(nameInput, 'Please enter your name');
    });
    
    messageInput.addEventListener('blur', () => {
        validateRequired(messageInput, 'Please enter your message');
    });
    
    // Form submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Validate all fields
        const isNameValid = validateRequired(nameInput, 'Please enter your name');
        const isEmailValid = validateEmail(emailInput);
        const isMessageValid = validateRequired(messageInput, 'Please enter your message');
        
        if (isNameValid && isEmailValid && isMessageValid) {
            // Show sending state
            const originalButtonText = submitButton.innerHTML;
            submitButton.classList.add('sending');
            submitButton.innerHTML = 'Sending <div class="spinner"></div>';
            submitButton.disabled = true;
            
            // Simulate sending
            setTimeout(() => {
                // Replace this with actual form submission
                showFormSuccess();
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitButton.classList.remove('sending');
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
            }, 2000);
        }
    });
}

function validateEmail(input) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const formGroup = input.closest('.form-group');
    const errorMessage = formGroup.querySelector('.error-message');
    
    if (!input.value.trim()) {
        setInputError(formGroup, errorMessage, 'Email is required');
        return false;
    } else if (!emailRegex.test(input.value.trim())) {
        setInputError(formGroup, errorMessage, 'Please enter a valid email address');
        return false;
    } else {
        clearInputError(formGroup, errorMessage);
        return true;
    }
}

function validateRequired(input, message) {
    const formGroup = input.closest('.form-group');
    const errorMessage = formGroup.querySelector('.error-message');
    
    if (!input.value.trim()) {
        setInputError(formGroup, errorMessage, message);
        return false;
    } else {
        clearInputError(formGroup, errorMessage);
        return true;
    }
}

function setInputError(formGroup, errorElement, message) {
    formGroup.classList.add('error');
    
    if (!errorElement) {
        const newErrorElement = document.createElement('div');
        newErrorElement.className = 'error-message';
        newErrorElement.textContent = message;
        formGroup.appendChild(newErrorElement);
    } else {
        errorElement.textContent = message;
    }
}

function clearInputError(formGroup, errorElement) {
    formGroup.classList.remove('error');
    if (errorElement) {
        errorElement.textContent = '';
    }
}

function showFormSuccess() {
    // Create success notification
    const notification = document.createElement('div');
    notification.className = 'form-notification success';
    notification.innerHTML = '<i class="fas fa-check-circle"></i> Your message has been sent successfully!';
    
    // Add to the page
    document.body.appendChild(notification);
    
    // Show with animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remove after delay
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// Add hover effects to skill badges
function initSkillBadges() {
    const skillBadges = document.querySelectorAll('.skill-badge');
    
    skillBadges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Initialize all modern features
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...
    
    // Initialize new modern features
    initSkillMeters();
    setupContactForm();
    initSkillBadges();
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrollValue = window.scrollY;
    
    if (document.querySelector('.hero')) {
        const heroSection = document.querySelector('.hero');
        heroSection.style.backgroundPositionY = `${scrollValue * 0.5}px`;
    }
    
    if (document.querySelector('.profile-frame')) {
        document.querySelector('.profile-frame').style.transform = `translateY(${scrollValue * 0.1}px)`;
    }
});

// Preload blog images
function preloadBlogImages() {
  const blogImages = document.querySelectorAll('.blog-image img');
  blogImages.forEach(img => {
    const src = img.getAttribute('src');
    if (src) {
      const newImg = new Image();
      newImg.src = src;
    }
  });
}

// Initialize blog functionality
function initBlog() {
  // Add smooth scroll to blog section if it exists
  const blogLink = document.querySelector('a[href="#blog"]');
  if (blogLink) {
    blogLink.addEventListener('click', function(e) {
      e.preventDefault();
      const blogSection = document.getElementById('blog');
      if (blogSection) {
        blogSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
  
  // Animate blog cards on scroll
  const blogCards = document.querySelectorAll('.blog-card');
  if (blogCards.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate__animated', 'animate__fadeInUp');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    blogCards.forEach(card => {
      observer.observe(card);
    });
  }
  
  // Handle read more clicks
  const readMoreLinks = document.querySelectorAll('.read-more');
  readMoreLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      // For now, just scroll to top as placeholder for full blog post
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // In a real implementation, this would open the full blog post
      console.log('Read more clicked for:', this.getAttribute('data-post-id'));
    });
  });
}

// Add certificate animation
function initCertificates() {
  const certificates = document.querySelectorAll('.certificate-card');
  if (certificates.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Add delay based on index for staggered animation
          setTimeout(() => {
            entry.target.classList.add('animate__animated', 'animate__fadeIn');
          }, index * 100);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    certificates.forEach(certificate => {
      observer.observe(certificate);
    });
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // AOS init
    AOS.init();
    
    // Create stars
    createStars();
    
    // Animate skill bars
    animateSkillBars();
    
    // Add CSS styles for new animations dynamically
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        /* Hamburger animation */
        .bar.rotate-down {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .bar.fade-out {
            opacity: 0;
        }
        
        .bar.rotate-up {
            transform: rotate(45deg) translate(-5px, -6px);
        }
        
        /* Active nav link style */
        .nav-links a.active {
            color: var(--primary-color);
        }
        
        .nav-links a.active::after {
            width: 100%;
        }
        
        /* Preloader styles */
        #preloader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--secondary-color);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            transition: opacity 0.5s ease;
        }
        
        .loader {
            display: flex;
        }
        
        .loader .letter {
            color: var(--primary-color);
            font-size: 3rem;
            font-weight: 700;
            letter-spacing: 5px;
            margin: 0 5px;
            animation: bounce 1.5s infinite ease;
        }
        
        .loader .letter:nth-child(2) {
            animation-delay: 0.1s;
        }
        
        .loader .letter:nth-child(3) {
            animation-delay: 0.2s;
        }
        
        .loader .letter:nth-child(4) {
            animation-delay: 0.3s;
        }
        
        .loader .letter:nth-child(5) {
            animation-delay: 0.4s;
        }
        
        @keyframes bounce {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-20px);
            }
        }
        
        /* Star animation */
        .star {
            position: absolute;
            width: 2px;
            height: 2px;
            background: white;
            border-radius: 50%;
            animation: twinkle linear infinite;
        }
        
        @keyframes twinkle {
            0%, 100% {
                opacity: 0;
            }
            50% {
                opacity: 1;
            }
        }
        
        /* Form validation styles */
        .error {
            border-color: var(--danger-color) !important;
            box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
        }
        
        .error-message {
            background-color: rgba(239, 68, 68, 0.1);
            border-left: 4px solid var(--danger-color);
            padding: 1rem;
            margin-bottom: 1.5rem;
            border-radius: 4px;
        }
        
        .error-message ul {
            margin: 0;
            padding-left: 1.5rem;
            color: var(--danger-color);
        }
        
        /* Success message styling */
        .success-message {
            text-align: center;
            padding: 2rem;
        }
        
        .success-message i {
            font-size: 3rem;
            color: var(--success-color);
            margin-bottom: 1rem;
            animation: scaleUp 0.5s ease;
        }
        
        @keyframes scaleUp {
            0% {
                transform: scale(0);
            }
            80% {
                transform: scale(1.2);
            }
            100% {
                transform: scale(1);
            }
        }
        
        .success-message h3 {
            margin-bottom: 0.5rem;
        }
        
        .success-message p {
            margin-bottom: 1.5rem;
            color: var(--gray-color);
        }
        
        /* Back to top button */
        .back-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: var(--gradient-1);
            color: white;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.3s ease;
            z-index: 99;
            box-shadow: 0 5px 15px rgba(79, 70, 229, 0.3);
        }
        
        .back-to-top.show {
            opacity: 1;
            transform: translateY(0);
        }
        
        .back-to-top:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 20px rgba(79, 70, 229, 0.4);
        }
    `;
    document.head.appendChild(styleSheet);
    
    // Initialize blog functionality
    preloadBlogImages();
    initBlog();
    initCertificates();
});

// Add this CSS for form notifications
document.head.insertAdjacentHTML('beforeend', `
<style>
.form-notification {
    position: fixed;
    bottom: 30px;
    right: 30px;
    padding: 15px 25px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 10px;
    color: white;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    transform: translateY(100px);
    opacity: 0;
    transition: all 0.3s ease;
    z-index: 1000;
}

.form-notification.success {
    background: linear-gradient(135deg, #10b981, #059669);
}

.form-notification.error {
    background: linear-gradient(135deg, #ef4444, #dc2626);
}

.form-notification.show {
    transform: translateY(0);
    opacity: 1;
}

.form-notification i {
    font-size: 1.2rem;
}
</style>
`); 