// Project data for dynamic loading
const projects = [
    {
        id: 1,
        title: "Hand Gesture Tracking and Replication",
        description: "Real-time hand gesture tracking system using OpenCV that accurately detects and interprets hand movements for interactive applications.",
        image: "https://via.placeholder.com/600x400/4361ee/ffffff?text=Hand+Gesture+Tracking",
        category: "python",
        tags: ["Python", "OpenCV", "Computer Vision"],
        featured: true,
        github: "#",
        demo: "#",
        details: "Built a computer vision application that can track and analyze hand movements in real-time. The system uses advanced computer vision techniques to identify hand landmarks and recognize gestures with high accuracy. The project includes features like gesture training, where users can add custom gestures, and replication mode, where a virtual hand mimics the user's movements."
    },
    {
        id: 2,
        title: "Smart CCTV Application",
        description: "Developed a smart CCTV application using Tkinter and OpenCV that includes motion detection, recording capabilities, and email alerts.",
        image: "https://via.placeholder.com/600x400/3a0ca3/ffffff?text=Smart+CCTV",
        category: "python",
        tags: ["Python", "Tkinter", "OpenCV"],
        featured: true,
        github: "#",
        demo: "#",
        details: "Created an intelligent surveillance system that combines computer vision with a user-friendly interface. The application detects motion in video feeds, automatically records footage when activity is detected, and can send real-time alerts via email. The system includes features like zone-based detection, time-based recording schedules, and an intuitive dashboard for monitoring multiple camera feeds simultaneously."
    },
    {
        id: 3,
        title: "VortexCart eCommerce Website",
        description: "Created a responsive eCommerce website with shopping cart functionality, product filtering, and user authentication features.",
        image: "https://via.placeholder.com/600x400/f72585/ffffff?text=VortexCart",
        category: "web",
        tags: ["HTML", "CSS", "JavaScript"],
        featured: true,
        github: "#",
        demo: "#",
        details: "Designed and developed a complete eCommerce solution with a focus on user experience and responsive design. The website features product categories, advanced filtering options, a fully-functional shopping cart with local storage persistence, and secure user authentication. The clean, modern UI includes product quick-view, image zoom on hover, and animated micro-interactions throughout the browsing experience."
    },
    {
        id: 4,
        title: "Data Analytics Dashboard",
        description: "Built an interactive dashboard for visualizing and analyzing complex datasets with filtering capabilities and real-time updates.",
        image: "https://via.placeholder.com/600x400/4cc9f0/ffffff?text=Data+Dashboard",
        category: "data",
        tags: ["Python", "Pandas", "Matplotlib", "Dash"],
        featured: false,
        github: "#",
        demo: "#",
        details: "Developed a comprehensive data analytics platform that transforms raw data into actionable insights through interactive visualizations. The dashboard includes multiple chart types (line, bar, scatter, heatmaps), advanced filtering options, and the ability to export reports in various formats. Built with scalability in mind, the system can handle large datasets efficiently while maintaining responsive performance."
    },
    {
        id: 5,
        title: "AI Image Recognition App",
        description: "Created an application that uses deep learning to recognize and classify objects in images with high accuracy.",
        image: "https://via.placeholder.com/600x400/7209b7/ffffff?text=AI+Image+Recognition",
        category: "python",
        tags: ["Python", "TensorFlow", "Deep Learning"],
        featured: false,
        github: "#",
        demo: "#",
        details: "Implemented a computer vision application that leverages pre-trained deep learning models to identify objects in images. The application can recognize thousands of different object categories with impressive accuracy, providing detailed information about detected items. Users can upload their own images or use their camera for real-time object detection, with results displayed in an intuitive interface."
    },
    {
        id: 6,
        title: "Personal Finance Tracker",
        description: "Designed a web application for tracking personal expenses, setting budgets, and visualizing spending patterns.",
        image: "https://via.placeholder.com/600x400/f72585/ffffff?text=Finance+Tracker",
        category: "web",
        tags: ["HTML", "CSS", "JavaScript", "Chart.js"],
        featured: false,
        github: "#",
        demo: "#",
        details: "Built a comprehensive personal finance management tool that helps users track their income and expenses across multiple accounts. The application features budget creation and monitoring, spending categorization, and interactive charts that visualize financial patterns over time. Data is stored securely in the browser's local storage, ensuring privacy while maintaining convenience."
    }
];

// Function to dynamically load projects into the DOM
function loadProjects(container, limit = null) {
    const projectContainer = document.querySelector(container);
    if (!projectContainer) return;
    
    // Clear container first
    projectContainer.innerHTML = '';
    
    // Filter projects if limit is provided
    let projectsToShow = limit ? projects.slice(0, limit) : projects;
    
    // Generate HTML for each project
    projectsToShow.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = `project-card ${project.category} tilt-effect`;
        projectCard.setAttribute('data-aos', 'fade-up');
        
        projectCard.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}">
                <div class="project-overlay">
                    <div class="project-details">
                        <h4>View Details</h4>
                    </div>
                </div>
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.github}" target="_blank" class="project-link"><i class="fab fa-github"></i></a>
                    <a href="${project.demo}" target="_blank" class="project-link"><i class="fas fa-external-link-alt"></i></a>
                </div>
            </div>
        `;
        
        projectContainer.appendChild(projectCard);
        
        // Add event listener for project details modal
        projectCard.querySelector('.project-overlay').addEventListener('click', () => {
            openProjectModal(project);
        });
    });
    
    // Initialize tilt effect on new elements
    if (typeof initTilt === 'function') {
        initTilt();
    }
}

// Function to open project details modal
function openProjectModal(project) {
    // Check if modal exists, if not create it
    let modal = document.getElementById('project-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'project-modal';
        modal.className = 'project-modal';
        document.body.appendChild(modal);
    }
    
    // Populate modal content
    modal.innerHTML = `
        <div class="project-modal-content">
            <div class="project-modal-header">
                <h2>${project.title}</h2>
                <button class="close-modal"><i class="fas fa-times"></i></button>
            </div>
            <div class="project-modal-body">
                <div class="project-modal-image">
                    <img src="${project.image}" alt="${project.title}">
                </div>
                <div class="project-modal-details">
                    <div class="project-modal-tags">
                        ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
                    </div>
                    <p>${project.details}</p>
                    <div class="project-modal-links">
                        <a href="${project.github}" target="_blank" class="interactive-btn"><span><i class="fab fa-github"></i> View Code</span></a>
                        <a href="${project.demo}" target="_blank" class="interactive-btn"><span><i class="fas fa-external-link-alt"></i> Live Demo</span></a>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Show modal
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
    
    // Close modal when clicking the close button
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
        }, 300);
    });
    
    // Close modal when clicking outside the content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
    });
}

// Add CSS for project modal
function addProjectModalStyles() {
    if (!document.getElementById('project-modal-styles')) {
        const style = document.createElement('style');
        style.id = 'project-modal-styles';
        style.textContent = `
            .project-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.8);
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                visibility: hidden;
                transition: opacity 0.3s ease, visibility 0.3s ease;
            }
            
            .project-modal.active {
                opacity: 1;
                visibility: visible;
            }
            
            .project-modal-content {
                background-color: white;
                border-radius: 16px;
                width: 90%;
                max-width: 1000px;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
                transform: scale(0.9);
                transition: transform 0.3s ease;
            }
            
            .project-modal.active .project-modal-content {
                transform: scale(1);
            }
            
            .project-modal-header {
                padding: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            }
            
            .project-modal-header h2 {
                margin: 0;
                font-size: 1.8rem;
                color: var(--primary-color);
            }
            
            .close-modal {
                background: transparent;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: var(--dark-color);
                transition: color 0.3s ease;
            }
            
            .close-modal:hover {
                color: var(--primary-color);
            }
            
            .project-modal-body {
                padding: 20px;
                display: flex;
                flex-direction: column;
            }
            
            .project-modal-image {
                margin-bottom: 20px;
                border-radius: 12px;
                overflow: hidden;
            }
            
            .project-modal-image img {
                width: 100%;
                height: auto;
                display: block;
            }
            
            .project-modal-tags {
                display: flex;
                flex-wrap: wrap;
                margin-bottom: 15px;
            }
            
            .project-modal-tags span {
                display: inline-block;
                padding: 6px 12px;
                border-radius: 50px;
                font-size: 0.8rem;
                font-weight: 500;
                margin-right: 8px;
                margin-bottom: 8px;
                background: rgba(67, 97, 238, 0.1);
                color: var(--primary-color);
            }
            
            .project-modal-details p {
                line-height: 1.6;
                margin-bottom: 20px;
            }
            
            .project-modal-links {
                display: flex;
                gap: 15px;
            }
            
            .project-modal-links a {
                flex: 1;
                text-align: center;
            }
            
            @media (min-width: 768px) {
                .project-modal-body {
                    flex-direction: row;
                    gap: 30px;
                }
                
                .project-modal-image {
                    flex: 1;
                    margin-bottom: 0;
                }
                
                .project-modal-details {
                    flex: 1;
                }
            }
            
            /* Dark mode styles */
            body.dark-mode .project-modal-content {
                background-color: #2d3748;
                color: white;
            }
            
            body.dark-mode .project-modal-header {
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            body.dark-mode .project-modal-header h2 {
                color: var(--accent-color);
            }
            
            body.dark-mode .close-modal {
                color: white;
            }
            
            body.dark-mode .close-modal:hover {
                color: var(--accent-color);
            }
            
            body.dark-mode .project-modal-tags span {
                background: rgba(67, 97, 238, 0.2);
                color: var(--accent-color);
            }
        `;
        document.head.appendChild(style);
    }
}

// Run on document load
document.addEventListener('DOMContentLoaded', function() {
    addProjectModalStyles();
    
    // Load projects if container exists
    const projectContainer = document.querySelector('.projects .modern-grid');
    if (projectContainer) {
        // Clear any existing projects
        projectContainer.innerHTML = '';
        
        // Load all projects
        loadProjects('.projects .modern-grid');
        
        // Initialize filter buttons
        const filterButtons = document.querySelectorAll('.filter-btn');
        if (filterButtons.length) {
            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // Remove active class from all buttons
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    
                    // Add active class to clicked button
                    button.classList.add('active');
                    
                    const filter = button.getAttribute('data-filter');
                    
                    // If filter is 'all', load all projects
                    if (filter === 'all') {
                        loadProjects('.projects .modern-grid');
                    } else {
                        // Load filtered projects
                        const filteredProjects = projects.filter(project => project.category === filter);
                        
                        // Clear container first
                        projectContainer.innerHTML = '';
                        
                        // Generate HTML for each filtered project
                        filteredProjects.forEach(project => {
                            const projectCard = document.createElement('div');
                            projectCard.className = `project-card ${project.category} tilt-effect`;
                            projectCard.setAttribute('data-aos', 'fade-up');
                            
                            projectCard.innerHTML = `
                                <div class="project-image">
                                    <img src="${project.image}" alt="${project.title}">
                                    <div class="project-overlay">
                                        <div class="project-details">
                                            <h4>View Details</h4>
                                        </div>
                                    </div>
                                </div>
                                <div class="project-content">
                                    <h3>${project.title}</h3>
                                    <p>${project.description}</p>
                                    <div class="project-tags">
                                        ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
                                    </div>
                                    <div class="project-links">
                                        <a href="${project.github}" target="_blank" class="project-link"><i class="fab fa-github"></i></a>
                                        <a href="${project.demo}" target="_blank" class="project-link"><i class="fas fa-external-link-alt"></i></a>
                                    </div>
                                </div>
                            `;
                            
                            projectContainer.appendChild(projectCard);
                            
                            // Add event listener for project details modal
                            projectCard.querySelector('.project-overlay').addEventListener('click', () => {
                                openProjectModal(project);
                            });
                        });
                        
                        // Reinitialize tilt effect
                        if (typeof initTilt === 'function') {
                            initTilt();
                        }
                    }
                });
            });
        }
    }
}); 