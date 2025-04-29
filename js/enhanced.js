// Enhanced JavaScript for Portfolio

// Wait until DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation library (if included)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }

    // Modern preloader with counter
    const preloader = document.getElementById('preloader');
    if (preloader) {
        let loadingProgress = 0;
        const progressCounter = document.createElement('div');
        progressCounter.className = 'progress-counter';
        progressCounter.innerHTML = '0%';
        preloader.appendChild(progressCounter);

        const interval = setInterval(() => {
            loadingProgress += Math.floor(Math.random() * 10) + 1;
            if (loadingProgress >= 100) {
                loadingProgress = 100;
                clearInterval(interval);
                
                setTimeout(() => {
                    preloader.style.opacity = '0';
                    setTimeout(() => {
                        preloader.style.display = 'none';
                        document.body.classList.add('loaded');
                        initAnimations();
                    }, 500);
                }, 500);
            }
            progressCounter.innerHTML = `${loadingProgress}%`;
        }, 150);
    } else {
        initAnimations();
    }

    // Initialize all animations
    function initAnimations() {
        initParticleBackground();
        initTextAnimation();
        makeHeaderTextVisible();
        initSkillBars();
        initScrollReveal();
        initParallaxEffect();
        initTilt();
        initTyped();
        initCounters();
    }

    // Make header text immediately visible
    function makeHeaderTextVisible() {
        const heroTextElements = document.querySelectorAll('.hero .text-animate');
        heroTextElements.forEach(element => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }

    // Particle background for hero section
    function initParticleBackground() {
        const animatedBg = document.querySelector('.animated-bg');
        if (!animatedBg) return;

        for (let i = 0; i < 20; i++) {
            const span = document.createElement('span');
            const size = Math.random() * 50 + 10;
            span.style.width = `${size}px`;
            span.style.height = `${size}px`;
            span.style.left = `${Math.random() * 100}%`;
            span.style.top = `${Math.random() * 100}%`;
            span.style.animationDelay = `${Math.random() * 5}s`;
            span.style.animationDuration = `${Math.random() * 10 + 15}s`;
            span.style.opacity = Math.random() * 0.5;
            animatedBg.appendChild(span);
        }
    }

    // Animated text reveal - now only for non-hero sections
    function initTextAnimation() {
        const textElements = document.querySelectorAll('.reveal-animate');
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('visible')) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        textElements.forEach((element, index) => {
            if (!element.classList.contains('visible')) {
                element.style.transitionDelay = `${index * 0.1}s`;
                observer.observe(element);
            }
        });
    }

    // Skill bars animation on scroll
    function initSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        skillBars.forEach(bar => {
            const percentage = bar.parentElement.previousElementSibling.querySelector('.percentage').textContent;
            const width = percentage;
            
            // Store the target width
            bar.setAttribute('data-width', width);
            
            // Set initial width to 0
            bar.style.width = '0';
        });
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const targetWidth = entry.target.getAttribute('data-width');
                    entry.target.style.width = targetWidth;
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        skillBars.forEach(bar => {
            observer.observe(bar);
        });
    }

    // Scroll reveal effect for sections
    function initScrollReveal() {
        const sections = document.querySelectorAll('section');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // Parallax effect for hero section
    function initParallaxEffect() {
        const heroSection = document.querySelector('.hero');
        if (!heroSection) return;
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = heroSection.querySelectorAll('.parallax');
            
            parallaxElements.forEach(element => {
                const speed = element.getAttribute('data-speed') || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    // Tilt effect for cards and project images
    function initTilt() {
        const tiltElements = document.querySelectorAll('.tilt-effect');
        
        tiltElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const { left, top, width, height } = element.getBoundingClientRect();
                const x = (e.clientX - left) / width;
                const y = (e.clientY - top) / height;
                
                const tiltX = (y - 0.5) * 10; // Tilt up to 10 degrees on X axis
                const tiltY = (x - 0.5) * -10; // Tilt up to 10 degrees on Y axis
                
                element.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            });
        });
    }

    // Typed.js effect for dynamic text
    function initTyped() {
        const typedElement = document.getElementById('typed-text');
        
        if (typedElement && typeof Typed !== 'undefined') {
            // Clear any previous instances
            if (window.typedInstance) {
                window.typedInstance.destroy();
            }
            
            // Create new instance with improved configuration
            window.typedInstance = new Typed('#typed-text', {
                strings: [
                    'AI/ML Solutions',
                    'Python Development',
                    'Computer Vision',
                    'Data Analytics',
                    'Web Development'
                ],
                typeSpeed: 60,
                backSpeed: 30,
                backDelay: 1800,
                startDelay: 500,
                loop: true,
                showCursor: true,
                cursorChar: '|',
                autoInsertCss: true,
                onBegin: function() {
                    // Ensure visibility of typed text container
                    const wrapper = document.querySelector('.typed-wrapper');
                    if (wrapper) {
                        wrapper.style.visibility = 'visible';
                    }
                }
            });
        }
    }

    // Animated counters for statistics
    function initCounters() {
        const counters = document.querySelectorAll('.counter');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = parseInt(counter.getAttribute('data-duration')) || 2000;
            let startTime = null;
            
            function updateCounter(timestamp) {
                if (!startTime) startTime = timestamp;
                const progress = timestamp - startTime;
                const percentage = Math.min(progress / duration, 1);
                const currentCount = Math.floor(percentage * target);
                
                counter.textContent = currentCount;
                
                if (percentage < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            }
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        requestAnimationFrame(updateCounter);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(counter);
        });
    }

    // Progress circle animation
    function initProgressCircles() {
        const circles = document.querySelectorAll('.progress-circle');
        
        circles.forEach(circle => {
            const percentage = parseInt(circle.getAttribute('data-percentage'));
            const circumference = 283; // 2 * PI * 45 (radius)
            const offset = circumference - (percentage / 100) * circumference;
            
            const foreground = circle.querySelector('.fg');
            foreground.style.strokeDashoffset = circumference;
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            foreground.style.strokeDashoffset = offset;
                        }, 300);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(circle);
        });
    }

    // Dark mode toggle
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
        
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            
            // Save preference
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                localStorage.setItem('theme', 'light');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            }
        });
    }

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            // Prevent scrolling when menu is open
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking links
        const navItems = document.querySelectorAll('.nav-links li a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && 
                !navLinks.contains(e.target) && 
                !hamburger.contains(e.target)) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    if (navbar) {
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add class on scroll
            if (scrollTop > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Always keep navbar visible (removed hiding behavior)
            navbar.style.transform = 'translateY(0)';
            
            lastScrollTop = scrollTop;
        });
    }

    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Portfolio filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.project-card');
    
    if (filterButtons.length && portfolioItems.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                const filter = button.getAttribute('data-filter');
                
                portfolioItems.forEach(item => {
                    if (filter === 'all' || item.classList.contains(filter)) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
});

// Create circular progress for skills (alternative to bars)
function createSkillCircles() {
    const skillItems = document.querySelectorAll('.skill-circle');
    
    skillItems.forEach(item => {
        const percentage = item.getAttribute('data-percentage');
        const circumference = 2 * Math.PI * 45; // 2π × radius
        
        // Create SVG structure
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '100');
        svg.setAttribute('height', '100');
        svg.classList.add('skill-circle-svg');
        
        // Background circle
        const bgCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        bgCircle.setAttribute('cx', '50');
        bgCircle.setAttribute('cy', '50');
        bgCircle.setAttribute('r', '45');
        bgCircle.classList.add('bg');
        
        // Foreground circle (progress)
        const fgCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        fgCircle.setAttribute('cx', '50');
        fgCircle.setAttribute('cy', '50');
        fgCircle.setAttribute('r', '45');
        fgCircle.classList.add('fg');
        fgCircle.style.strokeDasharray = circumference;
        fgCircle.style.strokeDashoffset = circumference - (percentage / 100) * circumference;
        
        // Percentage text
        const percentageDiv = document.createElement('div');
        percentageDiv.classList.add('percentage');
        percentageDiv.textContent = percentage + '%';
        
        // Append SVG elements
        svg.appendChild(bgCircle);
        svg.appendChild(fgCircle);
        
        // Replace content with SVG and percentage
        item.innerHTML = '';
        item.appendChild(svg);
        item.appendChild(percentageDiv);
    });
}

// Lazy load images
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for older browsers
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}); 