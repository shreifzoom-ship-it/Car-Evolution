/*==========================================
   Car Evolution Website - Main JavaScript
   Knowledge Management Project | MGMT3501
   Author: Sharif Muntasir Abdelwahab
   Date: 2026
==========================================*/

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Initialize all functions
    initLoader();
    initNavbar();
    initMobileMenu();
    initSearch();
    initThemeToggle();
    initScrollProgress();
    initCounters();
    initSmoothScroll();
    initScrollReveal();
    initBackToTop();
    initNewsletterForm();
});

/*========== Loader ==========*/
function initLoader() {
    const loader = document.querySelector('.loader-wrapper');
    
    if (loader) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                loader.classList.add('fade-out');
                
                setTimeout(function() {
                    loader.style.display = 'none';
                }, 500);
            }, 1000);
        });
    }
}

/*========== Navbar ==========*/
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const heroSection = document.querySelector('.hero');
    
    if (navbar) {
        // Change navbar style on scroll
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        });
        
        // Highlight active menu item based on scroll position
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        window.addEventListener('scroll', function() {
            let current = '';
            const scrollPos = window.scrollY + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href').replace('#', '');
                
                if (href === current) {
                    link.classList.add('active');
                }
            });
        });
    }
}

/*========== Mobile Menu ==========*/
function initMobileMenu() {
    const menuBtn = document.getElementById('openMenu');
    const closeBtn = document.getElementById('closeMenu');
    const navMenu = document.getElementById('navMenu');
    const overlay = document.querySelector('.menu-overlay');
    
    if (menuBtn && navMenu) {
        // Open menu
        menuBtn.addEventListener('click', function() {
            navMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            if (overlay) {
                overlay.classList.add('active');
            }
        });
        
        // Close menu
        if (closeBtn) {
            closeBtn.addEventListener('click', closeMenu);
        }
        
        if (overlay) {
            overlay.addEventListener('click', closeMenu);
        }
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
        
        function closeMenu() {
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
            
            if (overlay) {
                overlay.classList.remove('active');
            }
        }
        
        // Close menu on resize if open
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
                closeMenu();
            }
        });
    }
}

/*========== Search Overlay ==========*/
function initSearch() {
    const searchBtn = document.getElementById('searchBtn');
    const searchOverlay = document.getElementById('searchOverlay');
    const closeSearch = document.getElementById('closeSearch');
    const searchInput = document.getElementById('searchInput');
    
    if (searchBtn && searchOverlay) {
        // Open search
        searchBtn.addEventListener('click', function() {
            searchOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            setTimeout(() => {
                if (searchInput) {
                    searchInput.focus();
                }
            }, 300);
        });
        
        // Close search
        if (closeSearch) {
            closeSearch.addEventListener('click', closeSearchFunc);
        }
        
        // Close on ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
                closeSearchFunc();
            }
        });
        
        // Close on overlay click
        searchOverlay.addEventListener('click', function(e) {
            if (e.target === searchOverlay) {
                closeSearchFunc();
            }
        });
        
        function closeSearchFunc() {
            searchOverlay.classList.remove('active');
            document.body.style.overflow = '';
            
            if (searchInput) {
                searchInput.value = '';
            }
        }
        
        // Handle search form
        const searchForm = document.querySelector('.search-form');
        if (searchForm) {
            searchForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const query = searchInput.value.trim();
                
                if (query) {
                    // Redirect to search results page with query
                    window.location.href = `search.html?q=${encodeURIComponent(query)}`;
                }
            });
        }
    }
}

/*========== Theme Toggle (Dark/Light) ==========*/
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    
    if (themeToggle) {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
        
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            
            if (document.body.classList.contains('dark-theme')) {
                localStorage.setItem('theme', 'dark');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                localStorage.setItem('theme', 'light');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            }
        });
    }
}

/*========== Scroll Progress Bar ==========*/
function initScrollProgress() {
    const progressBar = document.getElementById('progressBar');
    
    if (progressBar) {
        window.addEventListener('scroll', function() {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            
            progressBar.style.width = scrolled + '%';
        });
    }
}

/*========== Counters Animation ==========*/
function initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-count'));
                    const duration = 2000; // 2 seconds
                    const step = target / (duration / 16); // 60fps
                    
                    let current = 0;
                    
                    const updateCounter = () => {
                        current += step;
                        
                        if (current < target) {
                            counter.textContent = Math.floor(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };
                    
                    updateCounter();
                    counterObserver.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }
}

/*========== Smooth Scroll for Anchor Links ==========*/
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
                history.pushState(null, null, targetId);
            }
        });
    });
}

/*========== Scroll Reveal Animations ==========*/
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .timeline-item, .brand-item, .car-card');
    
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active', 'animated');
                    
                    // Unobserve after animation
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });
        
        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    }
}

/*========== Back to Top Button ==========*/
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/*========== Newsletter Form ==========*/
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email && isValidEmail(email)) {
                // Simulate form submission
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.disabled = true;
                submitBtn.textContent = 'Subscribing...';
                
                setTimeout(() => {
                    // Show success message
                    showNotification('Successfully subscribed to newsletter!', 'success');
                    
                    // Reset form
                    emailInput.value = '';
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                }, 1500);
            } else {
                showNotification('Please enter a valid email address', 'error');
            }
        });
    }
}

/*========== Email Validation ==========*/
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/*========== Notification System ==========*/
function showNotification(message, type = 'info') {
    // Create notification element if it doesn't exist
    let notification = document.querySelector('.notification');
    
    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'notification';
        document.body.appendChild(notification);
    }
    
    // Set notification content and type
    notification.textContent = message;
    notification.classList.add(type);
    notification.classList.add('show');
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

/*========== Lazy Loading Images ==========*/
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if (lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
}

/*========== Dropdown Menu for Mobile ==========*/
function initMobileDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.dropdown-toggle');
        
        if (window.innerWidth <= 768) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            });
        }
    });
}

/*========== Parallax Effect ==========*/
function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length > 0) {
        window.addEventListener('scroll', function() {
            const scrollY = window.scrollY;
            
            parallaxElements.forEach(element => {
                const speed = element.getAttribute('data-parallax') || 0.5;
                const yPos = -(scrollY * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
}

/*========== Video Background Control ==========*/
function initVideoControl() {
    const video = document.querySelector('.hero-video video');
    
    if (video) {
        // Pause video when out of view
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.play();
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.5 });
        
        videoObserver.observe(video);
    }
}

/*========== Add to Home Screen Prompt (PWA) ==========*/
function initPWA() {
    let deferredPrompt;
    
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        
        // Show install prompt after 30 seconds
        setTimeout(() => {
            showInstallPrompt();
        }, 30000);
    });
    
    function showInstallPrompt() {
        const installPrompt = document.createElement('div');
        installPrompt.className = 'install-prompt';
        installPrompt.innerHTML = `
            <div class="install-content">
                <i class="fas fa-download"></i>
                <h3>Install Car Evolution</h3>
                <p>Install our app for a better experience</p>
                <div class="install-buttons">
                    <button class="btn btn-primary" id="installBtn">Install</button>
                    <button class="btn btn-outline" id="laterBtn">Later</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(installPrompt);
        
        document.getElementById('installBtn').addEventListener('click', () => {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted install');
                }
                installPrompt.remove();
            });
        });
        
        document.getElementById('laterBtn').addEventListener('click', () => {
            installPrompt.remove();
        });
    }
}

/*========== Initialize on Window Load ==========*/
window.addEventListener('load', function() {
    initLazyLoading();
    initParallax();
    initVideoControl();
    
    // Check if PWA is supported
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('Service Worker registered'))
            .catch(err => console.log('Service Worker error:', err));
    }
});