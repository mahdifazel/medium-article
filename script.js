// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Navigation scroll behavior
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation highlighting
    function updateActiveNav() {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.project-card, .timeline-item, .contact-method, .about-text, .about-visual');
    animateElements.forEach(el => {
        el.classList.add('animate-element');
        observer.observe(el);
    });

    // Navbar background on scroll
    function updateNavbar() {
        const navbar = document.querySelector('.navigation');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Parallax effect for hero visual elements
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const elements = document.querySelectorAll('.floating-element');
        
        elements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }

    // Smooth reveal animation for project cards
    function revealProjectCards() {
        const cards = document.querySelectorAll('.project-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 150);
        });
    }

    // Copy email to clipboard
    const emailLink = document.querySelector('a[href^="mailto:"]');
    if (emailLink) {
        emailLink.addEventListener('click', function(e) {
            e.preventDefault();
            const email = this.href.replace('mailto:', '');
            
            if (navigator.clipboard) {
                navigator.clipboard.writeText(email).then(() => {
                    showNotification('Email copied to clipboard!');
                }).catch(() => {
                    // Fallback: open email client
                    window.location.href = this.href;
                });
            } else {
                // Fallback for older browsers
                window.location.href = this.href;
            }
        });
    }

    // Show notification
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Typing animation for hero role
    function typeAnimation() {
        const roleElement = document.querySelector('.hero-role');
        if (!roleElement) return;

        const originalText = roleElement.textContent;
        roleElement.textContent = '';
        
        let i = 0;
        const typeTimer = setInterval(() => {
            roleElement.textContent += originalText.charAt(i);
            i++;
            if (i > originalText.length) {
                clearInterval(typeTimer);
            }
        }, 50);
    }

    // Mouse movement parallax for hero section
    function initMouseParallax() {
        const hero = document.querySelector('.hero');
        const floatingElements = document.querySelectorAll('.floating-element');

        hero.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = hero.getBoundingClientRect();
            const x = (e.clientX - left) / width;
            const y = (e.clientY - top) / height;

            floatingElements.forEach((element, index) => {
                const intensity = (index + 1) * 10;
                const xMove = (x - 0.5) * intensity;
                const yMove = (y - 0.5) * intensity;
                
                element.style.transform = `translate(${xMove}px, ${yMove}px)`;
            });
        });

        hero.addEventListener('mouseleave', () => {
            floatingElements.forEach(element => {
                element.style.transform = 'translate(0, 0)';
            });
        });
    }

    // Event listeners
    window.addEventListener('scroll', () => {
        updateActiveNav();
        updateNavbar();
        updateParallax();
    });

    window.addEventListener('load', () => {
        revealProjectCards();
        typeAnimation();
        initMouseParallax();
    });

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .animate-element {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }

        .navigation.scrolled {
            background: rgba(255, 255, 255, 0.98);
            box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
        }

        .nav-link.active {
            color: var(--accent-blue) !important;
        }

        .nav-link.active::after {
            width: 100% !important;
        }

        .project-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease;
        }

        .floating-element {
            transition: transform 0.3s ease-out;
        }

        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--primary-black);
            color: var(--white);
            padding: 1rem 1.5rem;
            border-radius: 8px;
            z-index: 10000;
            opacity: 0;
            transform: translateX(100px);
            transition: opacity 0.3s ease, transform 0.3s ease;
            font-size: 0.9rem;
            font-weight: 500;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .notification.show {
            opacity: 1;
            transform: translateX(0);
        }

        .hero-role {
            border-right: 2px solid var(--accent-blue);
            animation: blink 1s infinite;
        }

        @keyframes blink {
            0%, 50% { border-color: transparent; }
            51%, 100% { border-color: var(--accent-blue); }
        }

        /* Enhanced hover effects */
        .contact-method:hover .contact-value {
            color: var(--accent-blue);
        }

        .project-card:hover .project-title {
            color: var(--accent-blue);
        }

        /* Smooth transitions for all interactive elements */
        * {
            transition: color 0.3s ease, background-color 0.3s ease, transform 0.3s ease;
        }

        /* Loading state */
        .project-card img {
            transition: opacity 0.3s ease;
        }

        .project-card img.loading {
            opacity: 0.5;
        }
    `;
    document.head.appendChild(style);

    // Preload critical animations
    requestAnimationFrame(() => {
        document.body.classList.add('animations-ready');
    });

    // Add smooth reveal for skills
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach((category, index) => {
        setTimeout(() => {
            category.classList.add('animate-in');
        }, index * 200 + 500);
    });

    // Enhanced project card interactions
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});