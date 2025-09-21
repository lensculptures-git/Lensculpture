// Gallery data structure
const galleryData = {
    corporate: [
        { src: 'Corporate/c57f46168097889.6434e3aee32e5.jpeg', title: 'Corporate Portrait' },
        { src: 'Corporate/94b9b7168097889.644cc60cc9001.jpg', title: 'Business Meeting' },
        { src: 'Corporate/e15b0d168097889.644cc60cc6984.jpg', title: 'Professional Headshot' },
        { src: 'Corporate/8cd4f9168097889.6434e3aedd411.jpeg', title: 'Team Photography' },
        { src: 'Corporate/400a5d168097889.6434e3aee41d0.jpeg', title: 'Corporate Event' },
        { src: 'Corporate/af6395168097889.6434e3aed3096.jpeg', title: 'Executive Portrait' },
        { src: 'Corporate/fb132e168097889.6434e3aedbbc5.jpeg', title: 'Office Environment' },
        { src: 'Corporate/68f1cc168097889.6434e3aed8236.jpeg', title: 'Corporate Culture' },
        { src: 'Corporate/3bdbbe168097889.6434e3aed49f6.jpeg', title: 'Business Portrait' },
        { src: 'Corporate/cb214e168097889.644cc60cc7eb0.jpg', title: 'Professional Setting' },
        { src: 'Corporate/a1c35f168097889.6434e3aed23cc.jpeg', title: 'Corporate Identity' },
        { src: 'Corporate/1d643a168097889.644cc60ccc24f.jpg', title: 'Business Excellence' }
    ],
    events: [
        { src: 'Events/Lucky Ali 03.jpg', title: 'Concert Performance' },
        { src: 'Events/Lucky Ali 01.jpg', title: 'Live Music Event' },
        { src: 'Events/DSC08297.JPG', title: 'Event Coverage' },
        { src: 'Events/DSC08314.JPG', title: 'Special Moments' },
        { src: 'Events/DSC08335.JPG', title: 'Event Photography' },
        { src: 'Events/DSC09898.JPG', title: 'Celebration' },
        { src: 'Events/DSC04479.JPG', title: 'Live Performance' },
        { src: 'Events/DSC09696.JPG', title: 'Event Documentation' },
        { src: 'Events/Lucky Ali 02.jpg', title: 'Artist Performance' },
        { src: 'Events/DSC09527.JPG', title: 'Event Highlights' },
        { src: 'Events/DSC09635.JPG', title: 'Special Event' },
        { src: 'Events/DSC09634.JPG', title: 'Event Moments' },
        { src: 'Events/DSC09890.JPG', title: 'Live Event' },
        { src: 'Events/DSC09905.JPG', title: 'Event Excellence' },
        { src: 'Events/DSC09769.JPG', title: 'Event Photography' }
    ],
    portraits: [
        { src: 'Portraits/43622e170832579.65b9595cd9f58.jpg', title: 'Professional Portrait' },
        { src: 'Portraits/0ab66e170832579.65b9595cd931f.jpg', title: 'Character Study' },
        { src: 'Portraits/bd5c83168039881.661e91d16c855.jpg', title: 'Portrait Session' },
        { src: 'Portraits/0aad83168039881.661e9119ad53f.jpg', title: 'Personal Branding' },
        { src: 'Portraits/5b307f168039881.645491c941aab.jpeg', title: 'Creative Portrait' },
        { src: 'Portraits/6b72a1168039881.6584877bb4722.jpg', title: 'Portrait Photography' },
        { src: 'Portraits/PUNEETH BABU_01.jpg', title: 'Celebrity Portrait' },
        { src: 'Portraits/f69deb168039881.6584877bb2d0e.jpg', title: 'Professional Headshot' },
        { src: 'Portraits/73491a168039881.6584877bb08c9.jpg', title: 'Portrait Art' },
        { src: 'Portraits/PUNEETH BABU_02.jpg', title: 'Celebrity Photography' },
        { src: 'Portraits/51a5ba168039881.64424159747e8.jpg', title: 'Portfolio Shot' },
        { src: 'Portraits/18792f170832579.65b9595cde903.jpg', title: 'Portrait Session' },
        { src: 'Portraits/f573f9168039881.6548ff21413a9.jpg', title: 'Creative Photography' },
        { src: 'Portraits/433bdd170832579.65b9595cdd1cc.jpg', title: 'Professional Portrait' },
        { src: 'Portraits/a6780d170832579.65b9595ce14a5.jpg', title: 'Portrait Excellence' },
        { src: 'Portraits/dddf3e168039881.64d1e5b44c6d1.webp', title: 'Artistic Portrait' },
        { src: 'Portraits/9b918a168039881.6433f9f85b862.jpg', title: 'Portrait Study' },
        { src: 'Portraits/8a1758168039881.64d1e5b44f9b2.jpg', title: 'Professional Photography' },
        { src: 'Portraits/74f4de168039881.6548ff2140866.jpg', title: 'Portrait Artistry' }
    ],
    products: [
        { src: 'Products/782f00168039249.6433f7ad2bc64 copy - Copy.jpg', title: 'Product Photography' },
        { src: 'Products/ff2a3a168039249.6433f7ad35587 copy.jpg', title: 'Commercial Product' },
        { src: 'Products/d72c3e168039249.6433f7ad2ca09 copy.jpg', title: 'Product Showcase' },
        { src: 'Products/10f5df168039249.6433f7ad41e25 copy - Copy.jpg', title: 'Product Detail' },
        { src: 'Products/0ba655168039249.6433f7ad33401 copy - Copy - Copy.jpg', title: 'Commercial Photography' },
        { src: 'Products/ba6195168039249.6433f7ad3aeae copy.jpg', title: 'Product Excellence' },
        { src: 'Products/febd44168039249.6433f7ad3924e copy.jpg', title: 'Product Artistry' },
        { src: 'Products/0128b7168039249.6433f7ad3d350 copy.jpg', title: 'Commercial Excellence' },
        { src: 'Products/1f1f8a168039249.6433f7ad43217.webp', title: 'Product Design' },
        { src: 'Products/b2449e168039249.64352a4bdf3a2 copy.jpg', title: 'Product Portfolio' },
        { src: 'Products/d09504168039249.6433f7ad2dbca copy - Copy.jpg', title: 'Commercial Art' },
        { src: 'Products/5fff40168039249.6433f7ad38524 copy - Copy.jpg', title: 'Product Photography' }
    ]
};

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const heroSlides = document.querySelectorAll('.hero-slide');
const thumbnails = document.querySelectorAll('.thumbnail');
const prevSlideBtn = document.getElementById('prevSlide');
const nextSlideBtn = document.getElementById('nextSlide');
const progressFill = document.getElementById('progressFill');
// Removed slide counter
const autoplayIndicator = document.getElementById('autoplayIndicator');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');
const contactForm = document.querySelector('.contact-form');

// Global variables
let currentSlide = 0;
let currentGallery = [];
let currentImageIndex = 0;
let slideInterval;
let isAutoplay = true;

// Initialize the website
// Scroll Indicator Functionality
function initializeScrollIndicator() {
    const scrollIndicator = document.getElementById('scrollIndicator');
    if (!scrollIndicator) return;

    let scrolled = false;

    // Hide indicator on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50 && !scrolled) {
            scrolled = true;
            scrollIndicator.classList.add('hide');
        } else if (window.scrollY <= 50 && scrolled) {
            scrolled = false;
            scrollIndicator.classList.remove('hide');
        }
    });

    // Smooth scroll on click
    scrollIndicator.addEventListener('click', () => {
        const portfolioSection = document.getElementById('portfolio-offerings');
        if (portfolioSection) {
            portfolioSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

// Circular Gallery Functionality
function initializeCircularGallery() {
    const galleryRing = document.querySelector('.gallery-ring');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const centerText = document.querySelector('.center-text');
    const animatedRing = document.querySelector('.animated-ring');

    let currentRotation = 0;
    let isAnimating = true;
    let isMobile = window.innerWidth <= 768;

    // Check if we're on mobile/touch device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    galleryItems.forEach(item => {
        // Desktop interactions (hover effects) - only if not mobile
        if (!isMobile && !isTouchDevice) {
            item.addEventListener('mouseenter', () => {
                if (galleryRing) galleryRing.classList.add('paused');
                if (animatedRing) animatedRing.classList.add('ring-highlight');
                isAnimating = false;

                // Update center content
                const category = item.dataset.category;
                const categoryTitle = item.querySelector('h4').textContent;
                if (centerText) {
                    centerText.innerHTML = `
                        <h3 class="gallery-category">${categoryTitle}</h3>
                        <p class="gallery-description">Click to explore</p>
                    `;
                }
            });

            item.addEventListener('mouseleave', () => {
                if (galleryRing) galleryRing.classList.remove('paused');
                if (animatedRing) animatedRing.classList.remove('ring-highlight');
                isAnimating = true;

                // Reset center content
                if (centerText) {
                    centerText.innerHTML = `
                        <h3 class="gallery-category">Our Work</h3>
                        <p class="gallery-description">Click any category</p>
                    `;
                }
            });
        }

        // Touch-friendly interactions for mobile
        if (isMobile || isTouchDevice) {
            // Add touch ripple effect
            item.addEventListener('touchstart', (e) => {
                createTouchRipple(e, item);
                // Visual feedback for touch
                item.style.transform = 'translateY(-4px) scale(1.02)';
                item.style.background = 'rgba(255, 255, 255, 0.08)';
            });

            item.addEventListener('touchend', () => {
                setTimeout(() => {
                    item.style.transform = '';
                    item.style.background = '';
                }, 150);
            });
        }

        // Click/tap navigation with mobile overlay functionality
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const link = item.dataset.link;

            if (isMobile || isTouchDevice) {
                // Mobile tap-to-reveal overlay interaction
                if (item.classList.contains('overlay-active')) {
                    // Second tap - navigate to page
                    if (link) {
                        window.location.href = link;
                    }
                } else {
                    // First tap - show overlay
                    // Hide other overlays
                    galleryItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('overlay-active');
                        }
                    });
                    // Show this overlay
                    item.classList.add('overlay-active');
                }
            } else {
                // Desktop - direct navigation
                if (link) {
                    window.location.href = link;
                }
            }
        });
    });

    // Handle window resize to update mobile detection
    window.addEventListener('resize', () => {
        isMobile = window.innerWidth <= 768;
    });
}

// Create touch ripple effect for mobile interactions
function createTouchRipple(event, element) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.touches[0].clientX - rect.left - size / 2;
    const y = event.touches[0].clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.3)';
    ripple.style.pointerEvents = 'none';
    ripple.style.animation = 'ripple-effect 0.6s ease-out';
    ripple.style.zIndex = '10';

    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);

    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize circular gallery
    if (document.querySelector('.circular-gallery')) {
        initializeCircularGallery();
    }

    // Initialize scroll indicator
    initializeScrollIndicator();

    initializeHeroSlideshow();
    initializeNavigation();
    loadGalleries();
    initializeLightbox();
    initializeScrollAnimations();
    initializeContactForm();
});

// Modern Hero slideshow functionality
function initializeHeroSlideshow() {
    // Optimize positioning for better face visibility
    optimizePortraitPositioning();

    // Initialize slider
    updateSliderDisplay();

    // Start automatic slideshow
    if (isAutoplay) {
        startAutoplay();
    }

    // Add click handlers for thumbnails
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            goToSlide(index);
            pauseAutoplay();
        });
    });

    // Add click handlers for arrows
    if (prevSlideBtn) {
        prevSlideBtn.addEventListener('click', () => {
            previousSlide();
            pauseAutoplay();
        });
    }

    if (nextSlideBtn) {
        nextSlideBtn.addEventListener('click', () => {
            nextSlide();
            pauseAutoplay();
        });
    }

    // Pause/resume autoplay on hover
    const heroSection = document.querySelector('.hero-section');
    heroSection.addEventListener('mouseenter', () => {
        pauseAutoplay();
    });

    heroSection.addEventListener('mouseleave', () => {
        if (isAutoplay) {
            startAutoplay();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            previousSlide();
            pauseAutoplay();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            pauseAutoplay();
        }
    });

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    heroSection.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    heroSection.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                previousSlide();
            }
            pauseAutoplay();
        }
    }
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % heroSlides.length;
    goToSlide(currentSlide);
}

function previousSlide() {
    currentSlide = (currentSlide - 1 + heroSlides.length) % heroSlides.length;
    goToSlide(currentSlide);
}

function goToSlide(index) {
    // Remove active classes
    heroSlides.forEach((slide, i) => {
        slide.classList.remove('active', 'prev', 'next');
        if (i < index) {
            slide.classList.add('prev');
        } else if (i > index) {
            slide.classList.add('next');
        }
    });

    thumbnails.forEach(thumbnail => {
        thumbnail.classList.remove('active');
    });

    // Add active classes
    heroSlides[index].classList.add('active');
    thumbnails[index].classList.add('active');

    currentSlide = index;
    updateSliderDisplay();
    scrollThumbnailIntoView(index);
}

function updateSliderDisplay() {
    // Update progress bar
    const progress = ((currentSlide + 1) / heroSlides.length) * 100;
    if (progressFill) {
        progressFill.style.width = `${progress}%`;
    }
}

// Optimize positioning for portrait photos to show faces better
function optimizePortraitPositioning() {
    // All slides now have responsive images, apply appropriate positioning
    heroSlides.forEach((slide, index) => {
        // Apply appropriate positioning based on device type
        const desktopImage = slide.querySelector('.hero-image.desktop-image');
        const mobileImage = slide.querySelector('.hero-image.mobile-image');

        // Desktop images get landscape-optimized positioning
        if (desktopImage) {
            desktopImage.classList.add('center-focus');
        }

        // Mobile images get portrait-optimized positioning
        if (mobileImage) {
            mobileImage.classList.add('face-focus');
        }
    });
}

function scrollThumbnailIntoView(index) {
    const thumbnailNav = document.getElementById('thumbnailNav');
    const thumbnail = thumbnails[index];

    if (thumbnailNav && thumbnail) {
        const navRect = thumbnailNav.getBoundingClientRect();
        const thumbRect = thumbnail.getBoundingClientRect();

        if (thumbRect.left < navRect.left || thumbRect.right > navRect.right) {
            thumbnail.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
    }
}

function startAutoplay() {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
        nextSlide();
    }, 5000);

    if (autoplayIndicator) {
        autoplayIndicator.classList.add('active');
    }
}

function pauseAutoplay() {
    clearInterval(slideInterval);
    if (autoplayIndicator) {
        autoplayIndicator.classList.remove('active');
    }

    // Resume autoplay after 10 seconds of inactivity
    setTimeout(() => {
        if (isAutoplay) {
            startAutoplay();
        }
    }, 10000);
}

// Navigation functionality
function initializeNavigation() {
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }

    if (navLinks) {
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const target = link.getAttribute('href');

                // Only prevent default for anchor links (starting with #)
                if (target.startsWith('#')) {
                    e.preventDefault();
                    const targetElement = document.querySelector(target);
                    if (targetElement) {
                        const offsetTop = targetElement.offsetTop - 80;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
                // For regular page links (.html), let them navigate normally

                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    toggleMobileMenu();
                }
            });
        });
    }

    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
}

function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        const id = section.getAttribute('id');
        const correspondingLink = document.querySelector(`a[href="#${id}"]`);

        if (scrollPos >= top && scrollPos <= bottom) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (correspondingLink) {
                correspondingLink.classList.add('active');
            }
        }
    });
}

// Gallery functionality
function loadGalleries() {
    Object.keys(galleryData).forEach(category => {
        const gallery = document.getElementById(`${category}-gallery`);
        if (gallery) {
            // Only load if gallery is empty (no existing gallery items)
            const existingItems = gallery.querySelectorAll('.gallery-item');
            if (existingItems.length === 0) {
                gallery.innerHTML = '';

                galleryData[category].forEach((image, index) => {
                    const galleryItem = createGalleryItem(image, category, index);
                    gallery.appendChild(galleryItem);
                });
            }
        }
    });
}

function createGalleryItem(image, category, index) {
    const item = document.createElement('div');
    item.className = 'gallery-item fade-in';

    item.innerHTML = `
        <img src="${image.src}" alt="${image.title}" loading="lazy">
        <div class="gallery-overlay">
            <div class="gallery-info">
                <h3>${image.title}</h3>
                <p>${category.charAt(0).toUpperCase() + category.slice(1)} Photography</p>
            </div>
        </div>
    `;

    item.addEventListener('click', () => {
        openLightbox(category, index);
    });

    return item;
}

// Lightbox functionality
function initializeLightbox() {
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', showPreviousImage);
    }
    if (lightboxNext) {
        lightboxNext.addEventListener('click', showNextImage);
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'block') {
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

function openLightbox(category, index) {
    currentGallery = galleryData[category];
    currentImageIndex = index;
    updateLightboxImage();
    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function showPreviousImage() {
    currentImageIndex = currentImageIndex === 0 ? currentGallery.length - 1 : currentImageIndex - 1;
    updateLightboxImage();
}

function showNextImage() {
    currentImageIndex = currentImageIndex === currentGallery.length - 1 ? 0 : currentImageIndex + 1;
    updateLightboxImage();
}

function updateLightboxImage() {
    const image = currentGallery[currentImageIndex];
    lightboxImage.src = image.src;
    lightboxImage.alt = image.title;
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Add fade-in class to section titles and descriptions
    document.querySelectorAll('.gallery-section h2, .section-description, .about-section h2, .about-section p').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Contact form functionality
function initializeContactForm() {
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmission);
    }
}

function handleFormSubmission(e) {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const formObject = {};

    formData.forEach((value, key) => {
        formObject[key] = value;
    });

    // Simulate form submission
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
        submitBtn.textContent = 'Message Sent!';
        contactForm.reset();

        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }, 1500);

    console.log('Form submitted:', formObject);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    heroSlides.forEach(slide => {
        const heroImage = slide.querySelector('.hero-image');
        if (heroImage) {
            heroImage.style.transform = `translateY(${rate}px)`;
        }
    });
});

// Preload images for better performance
function preloadImages() {
    const imageUrls = [];

    Object.values(galleryData).forEach(category => {
        category.forEach(image => {
            imageUrls.push(image.src);
        });
    });

    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Initialize image preloading after page load
window.addEventListener('load', preloadImages);

// Dynamic Star Birth System
class StarBirthSystem {
    constructor() {
        this.container = document.getElementById('starBirthContainer');
        this.circularGallery = document.querySelector('.circular-gallery');
        this.activeStars = [];
        this.maxStars = 80; // Even more stars for abundant cosmic flow
        this.isRunning = false;

        if (this.container && this.circularGallery) {
            this.init();
        }
    }

    init() {
        this.isRunning = true;
        this.startStarGeneration();
    }

    getGalleryBounds() {
        const rect = this.circularGallery.getBoundingClientRect();

        // Since container is fixed positioned, use direct viewport coordinates
        const bounds = {
            centerX: rect.left + rect.width / 2,
            centerY: rect.top + rect.height / 2,
            radius: Math.min(rect.width, rect.height) / 2 * 0.7 // 70% of gallery radius
        };

        console.log('Gallery bounds:', bounds);
        return bounds;
    }

    generateRandomSpawnPoint() {
        const bounds = this.getGalleryBounds();
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * bounds.radius * 0.8; // Within 80% of center area

        return {
            x: bounds.centerX + Math.cos(angle) * distance,
            y: bounds.centerY + Math.sin(angle) * distance
        };
    }

    createStar() {
        if (this.activeStars.length >= this.maxStars) {
            console.log('Max stars reached, skipping creation');
            return;
        }

        console.log('Creating new star...');

        const star = document.createElement('div');
        const starTypes = ['small', 'medium', 'bright'];
        const randomType = starTypes[Math.floor(Math.random() * starTypes.length)];

        star.className = `born-star ${randomType}`;

        const spawnPoint = this.generateRandomSpawnPoint();
        console.log('Spawn point:', spawnPoint);

        const angle = Math.random() * Math.PI * 2;
        const speed = 0.1 + Math.random() * 0.3; // Much slower, very graceful movement

        // Calculate distance to reach screen edge
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const maxDistance = Math.max(screenWidth, screenHeight) + 200; // Extra buffer to ensure full exit
        const distance = maxDistance;

        // Calculate end position
        const endX = spawnPoint.x + Math.cos(angle) * distance;
        const endY = spawnPoint.y + Math.sin(angle) * distance;

        star.style.left = spawnPoint.x + 'px';
        star.style.top = spawnPoint.y + 'px';
        star.style.zIndex = '2'; // Below portfolio elements
        star.style.position = 'absolute';

        console.log(`Star created at: ${spawnPoint.x}, ${spawnPoint.y} type: ${randomType} element:`, star);

        this.container.appendChild(star);
        this.activeStars.push(star);

        console.log('Active stars count:', this.activeStars.length);
        console.log('Container children count:', this.container.children.length);

        // Simplified animation for debugging
        setTimeout(() => {
            console.log('Starting star animation...');
            this.animateStar(star, spawnPoint, endX, endY, speed);
        }, 100);
    }

    animateStar(star, start, endX, endY, speed) {
        const duration = (15 + Math.random() * 10) * 1000; // 15-25 seconds for very slow, contemplative movement

        // Apply birth animation
        star.style.animation = `starBirth ${duration}ms ease-out forwards`;

        // Apply movement
        star.animate([
            { transform: 'translate(0, 0) scale(0)', opacity: 0 },
            { transform: 'translate(0, 0) scale(1.2)', opacity: 1, offset: 0.2 },
            { transform: `translate(${endX - start.x}px, ${endY - start.y}px) scale(0.8)`, opacity: 0 }
        ], {
            duration: duration,
            easing: 'ease-out',
            fill: 'forwards'
        }).onfinish = () => {
            this.removeStar(star);
        };

        // Add pulsating effect for bright stars
        if (star.classList.contains('bright')) {
            star.style.animationDelay = Math.random() * 2 + 's';
            star.style.animation += `, starPulse 2s ease-in-out infinite`;
        }
    }

    removeStar(star) {
        const index = this.activeStars.indexOf(star);
        if (index > -1) {
            this.activeStars.splice(index, 1);
        }

        if (star.parentNode) {
            star.parentNode.removeChild(star);
        }
    }

    startStarGeneration() {
        console.log('Starting star generation...');
        const generateStar = () => {
            if (this.isRunning) {
                console.log('Attempting to create star...');
                this.createStar();

                // Random interval between star generation (0.1 to 0.8 seconds for much more frequent generation)
                const nextDelay = 100 + Math.random() * 700;
                console.log(`Next star in ${nextDelay}ms`);
                setTimeout(generateStar, nextDelay);
            } else {
                console.log('Star generation stopped');
            }
        };

        generateStar();
    }

    stop() {
        this.isRunning = false;
        this.activeStars.forEach(star => this.removeStar(star));
    }
}

// Initialize the star birth system when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for the page to settle, then start the star system
    setTimeout(() => {
        console.log('Initializing Star Birth System...');
        const container = document.getElementById('starBirthContainer');
        const gallery = document.querySelector('.circular-gallery');
        console.log('Container found:', !!container);
        console.log('Gallery found:', !!gallery);

        if (container && gallery) {
            window.starBirthSystem = new StarBirthSystem();
            console.log('Star Birth System initialized');
        } else {
            console.error('Required elements not found for Star Birth System');
        }
    }, 2000); // Increased delay to ensure elements are ready
});