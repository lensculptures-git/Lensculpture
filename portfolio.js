// Portfolio Page Specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializePortfolioFilters();
    initializePortfolioLightbox();
    initializeScrollAnimations();
    initializeParallaxEffects();
    initializeShowcaseLightbox();
});

// Portfolio Filter Functionality
function initializePortfolioFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterValue = button.getAttribute('data-filter');

            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter gallery items
            galleryItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');

                if (filterValue === 'all' || itemCategory === filterValue) {
                    item.classList.remove('hidden');
                    item.style.display = 'block';
                    // Trigger animation
                    setTimeout(() => {
                        item.classList.add('visible');
                    }, 100);
                } else {
                    item.classList.add('hidden');
                    item.classList.remove('visible');
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Enhanced Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe all animation elements
    const animationElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
    animationElements.forEach(el => {
        animationObserver.observe(el);
    });

    // Initialize animations on page load for elements in viewport
    setTimeout(() => {
        animationElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                el.classList.add('animate');
            }
        });
    }, 100);
}

// Parallax Effects
function initializeParallaxEffects() {
    let ticking = false;

    function updateParallax() {
        const scrolled = window.pageYOffset;

        // Parallax for background images
        const parallaxBgs = document.querySelectorAll('.parallax-bg');
        parallaxBgs.forEach(bg => {
            const rect = bg.parentElement.getBoundingClientRect();
            const speed = 0.5;

            if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
                const yPos = -(scrolled - bg.parentElement.offsetTop) * speed;
                bg.style.transform = `translate3d(0, ${yPos}px, 0)`;
            }
        });

        // Parallax for images in story sections
        const parallaxImages = document.querySelectorAll('.parallax-image');
        parallaxImages.forEach(img => {
            const rect = img.getBoundingClientRect();
            const speed = 0.1;

            if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
                const yPos = (window.innerHeight - rect.top) * speed;
                img.style.transform = `translate3d(0, ${yPos}px, 0)`;
            }
        });

        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    // Throttled scroll listener for better performance
    window.addEventListener('scroll', requestTick, { passive: true });

    // Initial call
    updateParallax();
}

// Showcase Gallery Lightbox (for story layout)
function initializeShowcaseLightbox() {
    const showcaseItems = document.querySelectorAll('.showcase-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');

    let currentImages = [];
    let currentImageIndex = 0;

    // Get all showcase items
    function updateShowcaseImages() {
        currentImages = Array.from(showcaseItems).map(item => {
            const img = item.querySelector('img');
            const overlay = item.querySelector('.showcase-overlay span');
            return {
                src: img.src,
                alt: img.alt,
                title: overlay ? overlay.textContent : ''
            };
        });
    }

    // Open lightbox for showcase items
    showcaseItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            updateShowcaseImages();
            currentImageIndex = index;
            openLightbox();
        });
    });

    function openLightbox() {
        if (currentImages.length > 0) {
            updateLightboxImage();
            lightbox.style.display = 'block';
            document.body.style.overflow = 'hidden';

            // Add fade-in animation
            setTimeout(() => {
                lightbox.style.opacity = '1';
            }, 10);
        }
    }

    function closeLightbox() {
        lightbox.style.opacity = '0';
        setTimeout(() => {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }

    function updateLightboxImage() {
        const image = currentImages[currentImageIndex];
        if (image) {
            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt;
        }
    }

    function showPreviousImage() {
        currentImageIndex = currentImageIndex === 0 ? currentImages.length - 1 : currentImageIndex - 1;
        updateLightboxImage();
    }

    function showNextImage() {
        currentImageIndex = currentImageIndex === currentImages.length - 1 ? 0 : currentImageIndex + 1;
        updateLightboxImage();
    }

    // Event listeners
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', showPreviousImage);
    if (lightboxNext) lightboxNext.addEventListener('click', showNextImage);

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (lightbox && lightbox.style.display === 'block') {
            switch(e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    showPreviousImage();
                    break;
                case 'ArrowRight':
                    showNextImage();
                    break;
            }
        }
    });
}

// Original Portfolio Lightbox Functionality (for grid layouts)
function initializePortfolioLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');

    let currentImages = [];
    let currentImageIndex = 0;

    // Get all visible gallery items
    function updateCurrentImages() {
        const visibleItems = Array.from(galleryItems).filter(item =>
            !item.classList.contains('hidden') &&
            window.getComputedStyle(item).display !== 'none'
        );

        currentImages = visibleItems.map(item => {
            const img = item.querySelector('img');
            const info = item.querySelector('.gallery-info');
            return {
                src: img.src,
                alt: img.alt,
                title: info ? info.querySelector('h3').textContent : '',
                description: info ? info.querySelector('p').textContent : ''
            };
        });
    }

    // Open lightbox for gallery items
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            updateCurrentImages();

            // Find the index of clicked item in visible items
            const visibleItems = Array.from(galleryItems).filter(item =>
                !item.classList.contains('hidden') &&
                window.getComputedStyle(item).display !== 'none'
            );
            currentImageIndex = visibleItems.indexOf(item);

            if (currentImageIndex !== -1) {
                openLightbox();
            }
        });
    });

    function openLightbox() {
        if (currentImages.length > 0) {
            updateLightboxImage();
            lightbox.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }

    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    function updateLightboxImage() {
        const image = currentImages[currentImageIndex];
        if (image) {
            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt;
        }
    }

    function showPreviousImage() {
        currentImageIndex = currentImageIndex === 0 ? currentImages.length - 1 : currentImageIndex - 1;
        updateLightboxImage();
    }

    function showNextImage() {
        currentImageIndex = currentImageIndex === currentImages.length - 1 ? 0 : currentImageIndex + 1;
        updateLightboxImage();
    }

    // Event listeners
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', showPreviousImage);
    if (lightboxNext) lightboxNext.addEventListener('click', showNextImage);

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (lightbox && lightbox.style.display === 'block') {
            switch(e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    showPreviousImage();
                    break;
                case 'ArrowRight':
                    showNextImage();
                    break;
            }
        }
    });
}

// Mobile Navigation for Portfolio Pages
function initializePortfolioNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Initialize navigation
initializePortfolioNavigation();

// Update active navigation based on current page
function updateActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Initialize active navigation
updateActiveNavigation();

// Smooth scroll behavior for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Performance optimization: Reduce parallax on mobile
function isMobileDevice() {
    return window.innerWidth <= 768 ||
           /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Disable resource-intensive effects on mobile
if (isMobileDevice()) {
    const parallaxBgs = document.querySelectorAll('.parallax-bg');
    parallaxBgs.forEach(bg => {
        bg.style.backgroundAttachment = 'scroll';
    });
}

// Window resize handler
window.addEventListener('resize', () => {
    // Update parallax effects on resize
    if (!isMobileDevice()) {
        initializeParallaxEffects();
    }
});