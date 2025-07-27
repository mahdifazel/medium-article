// DOM Elements
const navToggle = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.querySelector('.contact-form');
const projectCards = document.querySelectorAll('.project-card');

// Mobile Navigation Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const navHeight = document.querySelector('.nav').offsetHeight;
            const targetPosition = targetSection.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + 100;
    
    navLinks.forEach(link => {
        const targetId = link.getAttribute('href');
        const section = document.querySelector(targetId);
        
        if (section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        }
    });
});

// Navbar background on scroll
let lastScrollTop = 0;
const navbar = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add background when scrolled
    if (scrollTop > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
    
    lastScrollTop = scrollTop;
});

// Contact Form Handling
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Update button state
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        try {
            // Simulate form submission (replace with actual endpoint)
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Show success message
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            contactForm.reset();
            
        } catch (error) {
            // Show error message
            showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
        } finally {
            // Reset button state
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });
}

// Notification system
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.75rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 1001;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease-in-out;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.75rem;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Project card interactions
projectCards.forEach(card => {
    card.addEventListener('click', () => {
        const projectType = card.getAttribute('data-project');
        showProjectModal(projectType);
    });
});

// Project modal system
function showProjectModal(projectType) {
    const projectData = {
        fintech: {
            title: 'FinTech Mobile App',
            description: 'A comprehensive redesign of a mobile banking application that increased user engagement by 40% and reduced support tickets by 30%.',
            challenge: 'The existing app had poor usability, leading to low engagement and high customer support volume.',
            solution: 'Conducted extensive user research, redesigned the information architecture, and implemented a clean, intuitive interface.',
            results: ['40% increase in user engagement', '30% reduction in support tickets', '25% faster task completion'],
            technologies: ['Figma', 'Principle', 'User Testing', 'Analytics'],
            images: ['Project mockups would go here']
        },
        ecommerce: {
            title: 'E-commerce Platform',
            description: 'Complete redesign of the checkout flow that reduced cart abandonment by 25% and increased conversion rates.',
            challenge: 'High cart abandonment rates and complex checkout process were hurting conversions.',
            solution: 'Simplified the checkout flow, implemented guest checkout, and optimized for mobile devices.',
            results: ['25% reduction in cart abandonment', '15% increase in conversion rate', '30% faster checkout process'],
            technologies: ['Sketch', 'InVision', 'A/B Testing', 'Hotjar'],
            images: ['Project mockups would go here']
        },
        saas: {
            title: 'SaaS Dashboard',
            description: 'Analytics dashboard design that improved data comprehension and user satisfaction for 10,000+ users.',
            challenge: 'Complex data visualization that was difficult for users to understand and act upon.',
            solution: 'Redesigned data hierarchy, implemented progressive disclosure, and created intuitive visualizations.',
            results: ['50% improvement in task completion', '35% increase in user satisfaction', '20% reduction in training time'],
            technologies: ['Figma', 'D3.js', 'User Research', 'Prototyping'],
            images: ['Project mockups would go here']
        },
        healthtech: {
            title: 'HealthTech Platform',
            description: 'Patient portal design connecting 50,000+ patients with healthcare providers through an intuitive interface.',
            challenge: 'Complex medical information needed to be accessible to users with varying technical skills.',
            solution: 'Created a simple, accessible interface with clear information hierarchy and easy appointment booking.',
            results: ['60% increase in portal usage', '40% reduction in phone calls', '95% accessibility compliance'],
            technologies: ['Figma', 'Accessibility Testing', 'User Journey Mapping', 'Prototyping'],
            images: ['Project mockups would go here']
        }
    };
    
    const project = projectData[projectType];
    if (!project) return;
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'project-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <div class="modal-header">
                <h2>${project.title}</h2>
                <p>${project.description}</p>
            </div>
            <div class="modal-body">
                <div class="project-section">
                    <h3>Challenge</h3>
                    <p>${project.challenge}</p>
                </div>
                <div class="project-section">
                    <h3>Solution</h3>
                    <p>${project.solution}</p>
                </div>
                <div class="project-section">
                    <h3>Results</h3>
                    <ul>
                        ${project.results.map(result => `<li>${result}</li>`).join('')}
                    </ul>
                </div>
                <div class="project-section">
                    <h3>Technologies</h3>
                    <div class="tech-tags">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 2000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem;
    `;
    
    const overlay = modal.querySelector('.modal-overlay');
    overlay.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(5px);
    `;
    
    const content = modal.querySelector('.modal-content');
    content.style.cssText = `
        background: white;
        border-radius: 1rem;
        padding: 2rem;
        max-width: 800px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
        transform: scale(0.9);
        opacity: 0;
        transition: all 0.3s ease-out;
    `;
    
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.style.cssText = `
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: none;
        border: none;
        font-size: 2rem;
        cursor: pointer;
        color: #6b7280;
        transition: color 0.2s;
    `;
    
    // Add to page
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Animate in
    setTimeout(() => {
        content.style.transform = 'scale(1)';
        content.style.opacity = '1';
    }, 50);
    
    // Close modal handlers
    const closeModal = () => {
        content.style.transform = 'scale(0.9)';
        content.style.opacity = '0';
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = 'auto';
        }, 300);
    };
    
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    
    // Close on escape key
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.project-card, .stat-item, .skill-item');
    animatedElements.forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
});

// Smooth scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show scroll to top button
window.addEventListener('scroll', () => {
    const scrollBtn = document.querySelector('.scroll-to-top');
    if (window.scrollY > 500) {
        if (!scrollBtn) {
            createScrollToTopButton();
        } else {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.pointerEvents = 'auto';
        }
    } else if (scrollBtn) {
        scrollBtn.style.opacity = '0';
        scrollBtn.style.pointerEvents = 'none';
    }
});

function createScrollToTopButton() {
    const button = document.createElement('button');
    button.className = 'scroll-to-top';
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.onclick = scrollToTop;
    
    button.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        background: var(--secondary-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
        transition: all 0.3s ease;
        z-index: 1000;
        opacity: 0;
        pointer-events: none;
    `;
    
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-2px)';
        button.style.boxShadow = '0 6px 20px rgba(99, 102, 241, 0.4)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
        button.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.3)';
    });
    
    document.body.appendChild(button);
}

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 50);
    }
});

// Parallax effect for floating cards
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-card');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.1 + (index * 0.05);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Form validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            showFieldError(input, 'This field is required');
            isValid = false;
        } else if (input.type === 'email' && !isValidEmail(input.value)) {
            showFieldError(input, 'Please enter a valid email address');
            isValid = false;
        } else {
            clearFieldError(input);
        }
    });
    
    return isValid;
}

function showFieldError(input, message) {
    clearFieldError(input);
    
    const errorElement = document.createElement('span');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.cssText = `
        color: #ef4444;
        font-size: 0.875rem;
        margin-top: 0.25rem;
        display: block;
    `;
    
    input.style.borderColor = '#ef4444';
    input.parentNode.appendChild(errorElement);
}

function clearFieldError(input) {
    const existingError = input.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    input.style.borderColor = '';
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Add real-time validation to form inputs
document.addEventListener('DOMContentLoaded', () => {
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.hasAttribute('required')) {
                if (!input.value.trim()) {
                    showFieldError(input, 'This field is required');
                } else if (input.type === 'email' && !isValidEmail(input.value)) {
                    showFieldError(input, 'Please enter a valid email address');
                } else {
                    clearFieldError(input);
                }
            }
        });
        
        input.addEventListener('input', () => {
            clearFieldError(input);
        });
    });
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScroll = debounce(() => {
    // Scroll-related operations here
}, 10);

window.addEventListener('scroll', debouncedScroll);