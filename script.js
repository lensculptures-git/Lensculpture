// Page Loader Control - Smart timing to prevent flash
(function() {
    const loader = document.getElementById('pageLoader');
    if (!loader) return;

    // Start with delayed state (invisible)
    loader.classList.add('delayed');

    // Timing trackers
    const loadStartTime = Date.now();
    let loaderShownTime = null;
    let isPageReady = false;
    let isLoaderHidden = false;

    // Show loader after delay (prevents flash on fast loads)
    const showDelay = setTimeout(() => {
        if (!isPageReady && !isLoaderHidden) {
            loader.classList.remove('delayed');
            loaderShownTime = Date.now();
        }
    }, 300);

    function hideLoader() {
        if (isLoaderHidden) return;

        isPageReady = true;

        // If loader never shown (fast load), just clear timeout
        if (loaderShownTime === null) {
            clearTimeout(showDelay);
            isLoaderHidden = true;
            return;
        }

        // Loader was shown - ensure minimum visibility
        const loaderVisibleTime = Date.now() - loaderShownTime;
        const minDisplayTime = 800; // 800ms minimum
        const remainingTime = Math.max(0, minDisplayTime - loaderVisibleTime);

        setTimeout(() => {
            loader.classList.add('hidden');
            isLoaderHidden = true;
        }, remainingTime);
    }

    // Hide triggers
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', hideLoader);
    } else {
        hideLoader();
    }

    window.addEventListener('load', hideLoader);

    // Force hide after 3 seconds (fallback)
    setTimeout(() => {
        if (!isLoaderHidden) {
            loader.classList.remove('delayed');
            loader.classList.add('hidden');
            isLoaderHidden = true;
        }
    }, 3000);
})();

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
let resumeTimer = null;
let isTransitioning = false;

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
    }, { passive: true });

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

// Services Grid Functionality
function initializeServicesGrid() {
    const serviceCards = document.querySelectorAll('.service-card');

    if (!serviceCards || serviceCards.length === 0) {
        return;
    }

    // Add scroll animation observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animation for cards
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, observerOptions);

    // Initial state and observe
    serviceCards.forEach((card) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize services grid
    if (document.querySelector('.services-grid')) {
        initializeServicesGrid();
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
    // Check if hero slideshow elements exist (only on homepage)
    if (!heroSlides || heroSlides.length === 0) {
        return;
    }

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
    if (heroSection) {
        heroSection.addEventListener('mouseenter', () => {
            pauseAutoplay();
        });

        heroSection.addEventListener('mouseleave', () => {
            if (isAutoplay) {
                startAutoplay();
            }
        });
    }

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

    // Touch/swipe support with velocity detection
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartTime = 0;
    let touchEndTime = 0;

    heroSection.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartTime = Date.now();
    }, { passive: true });

    heroSection.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        touchEndTime = Date.now();
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        // Prevent double-swipes during transition
        if (isTransitioning) {
            return;
        }

        const swipeThreshold = 80; // Increased from 50px to prevent accidental swipes
        const diff = touchStartX - touchEndX;
        const swipeTime = touchEndTime - touchStartTime;
        const swipeVelocity = Math.abs(diff) / swipeTime; // pixels per millisecond

        // Require either: significant distance (80px+) OR fast velocity (>0.5px/ms)
        if (Math.abs(diff) > swipeThreshold || swipeVelocity > 0.5) {
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
    // Lock transitions to prevent double-swipes
    isTransitioning = true;

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
    if (heroSlides[index]) {
        heroSlides[index].classList.add('active');
    }
    if (thumbnails[index]) {
        thumbnails[index].classList.add('active');
    }

    currentSlide = index;
    updateSliderDisplay();
    scrollThumbnailIntoView(index);

    // Unlock after transition completes (mobile: 400ms, desktop: 800ms)
    const isMobile = window.innerWidth <= 768;
    const transitionDuration = isMobile ? 400 : 800;
    setTimeout(() => {
        isTransitioning = false;
    }, transitionDuration);
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

    // Clear any existing resume timer to prevent conflicts
    if (resumeTimer) {
        clearTimeout(resumeTimer);
        resumeTimer = null;
    }

    // Resume autoplay after 10 seconds of inactivity
    resumeTimer = setTimeout(() => {
        if (isAutoplay) {
            startAutoplay();
        }
        resumeTimer = null;
    }, 10000);
}

// Navigation functionality
function initializeNavigation() {
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }

    // Set active page on load
    setActivePageLink();

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

    // Update active nav link on scroll (only for homepage with anchor navigation)
    const isHomePage = window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname === '';
    if (isHomePage) {
        window.addEventListener('scroll', updateActiveNavLink, { passive: true });
    }

    // Initialize auto-hide navbar on scroll
    initializeNavbarAutoHide();
}

function toggleMobileMenu() {
    if (!hamburger || !navMenu) return;

    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');

    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// Close menu with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
        toggleMobileMenu();
    }
});

function setActivePageLink() {
    // Get current page filename
    let currentPage = window.location.pathname.split('/').pop();

    // Default to index.html if no page specified
    if (currentPage === '' || currentPage === '/') {
        currentPage = 'index.html';
    }

    // Remove active class from all links
    navLinks.forEach(link => {
        link.classList.remove('active');

        // Check if link href matches current page
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active');
        }
    });
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

// Auto-hide navbar on scroll
function initializeNavbarAutoHide() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateNavbar() {
        const currentScrollY = window.scrollY;

        // Always show navbar at top of page
        if (currentScrollY < 100) {
            navbar.classList.remove('hidden');
        }
        // Hide when scrolling down
        else if (currentScrollY > lastScrollY && currentScrollY > 100) {
            navbar.classList.add('hidden');
        }
        // Show when scrolling up
        else if (currentScrollY < lastScrollY) {
            navbar.classList.remove('hidden');
        }

        lastScrollY = currentScrollY;
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick, { passive: true });
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

// Parallax effect for hero section (throttled for performance)
let heroParallaxTicking = false;

function updateHeroParallax() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    heroSlides.forEach(slide => {
        const heroImage = slide.querySelector('.hero-image');
        if (heroImage) {
            heroImage.style.transform = `translateY(${rate}px)`;
        }
    });

    heroParallaxTicking = false;
}

function requestHeroParallaxTick() {
    if (!heroParallaxTicking) {
        requestAnimationFrame(updateHeroParallax);
        heroParallaxTicking = true;
    }
}

// Only run hero parallax on index.html
if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
    window.addEventListener('scroll', requestHeroParallaxTick, { passive: true });
}

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
        this.servicesGrid = document.querySelector('.services-grid');
        this.activeStars = [];
        this.isRunning = false;

        // Configurable parameters
        this.config = {
            maxStars: this.isMobile() ? 50 : 100, // Fewer stars on mobile for performance
            idleThreshold: 10000, // 10 seconds of inactivity before stars bloom
            bloomDelay: { min: 60, max: 40 }, // 60-100ms between star generation (idle/bloom)
            activeDelay: { min: 2000, max: 3000 }, // 2-5 seconds between stars (active/trickle)
            scatterDuration: 6000, // 6 seconds to scatter when active
            idleDuration: { min: 40000, max: 20000 }, // 40-60 seconds idle drift
            bloomRadius: 75, // Radius around corner for star spawn
        };

        // Idle detection for star generation
        this.lastActivityTime = Date.now();
        this.isCurrentlyIdle = false;
        this.isPaused = false; // For page visibility

        // Corner positions for star generation
        this.corners = [
            { name: 'top-left', x: 75, y: 75 },
            { name: 'top-right', x: () => window.innerWidth - 75, y: 75 },
            { name: 'bottom-left', x: 75, y: () => window.innerHeight - 75 },
            { name: 'bottom-right', x: () => window.innerWidth - 75, y: () => window.innerHeight - 75 }
        ];

        // Check for reduced motion preference (accessibility)
        this.respectReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Initialize if container exists and motion is allowed
        if (this.container && !this.respectReducedMotion) {
            this.init();
        } else if (this.respectReducedMotion) {
            console.log('Star system disabled: user prefers reduced motion');
        }
    }

    isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
               || window.innerWidth <= 768;
    }

    init() {
        this.isRunning = true;
        this.setupActivityTracking();
        this.setupPageVisibility();
        this.startStarGeneration();
    }

    setupPageVisibility() {
        // Pause star generation when tab is hidden to save resources
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                console.log('Tab hidden - pausing star generation');
                this.isPaused = true;
            } else {
                console.log('Tab visible - resuming star generation');
                this.isPaused = false;
                // Reset activity time to prevent immediate bloom when returning to tab
                this.lastActivityTime = Date.now();
                this.isCurrentlyIdle = false;
            }
        });
    }

    handleActivityDetection() {
        // Detect idle → active transition and scatter stars
        if (this.isCurrentlyIdle) {
            console.log('Transition: Idle → Active - Scattering stars!');
            this.scatterExistingStars();
            this.isCurrentlyIdle = false;
        }
        this.lastActivityTime = Date.now();
    }

    updateActivity() {
        this.handleActivityDetection();
    }

    setupActivityTracking() {
        // Track mouse movement
        document.addEventListener('mousemove', () => {
            this.handleActivityDetection();
        });

        // Track scroll activity
        document.addEventListener('scroll', () => {
            this.handleActivityDetection();
        }, { passive: true });

        // Track clicks (gallery navigation, buttons, links, etc.)
        document.addEventListener('click', () => {
            this.handleActivityDetection();
        });

        // Track keyboard interactions (arrow keys, enter, etc.)
        document.addEventListener('keydown', () => {
            this.handleActivityDetection();
        });

        // Track touch movement for mobile
        document.addEventListener('touchmove', () => {
            this.handleActivityDetection();
        }, { passive: true });

        // Track mobile taps
        document.addEventListener('touchstart', () => {
            this.handleActivityDetection();
        });
    }

    getRandomCornerPosition() {
        // Randomly select one of the four corners for star generation
        const corner = this.corners[Math.floor(Math.random() * this.corners.length)];
        return {
            centerX: typeof corner.x === 'function' ? corner.x() : corner.x,
            centerY: typeof corner.y === 'function' ? corner.y() : corner.y,
            radius: this.config.bloomRadius,
            name: corner.name
        };
    }

    generateRandomSpawnPoint() {
        const corner = this.getRandomCornerPosition();
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * corner.radius; // Stars spawn within radius of corner

        return {
            x: corner.centerX + Math.cos(angle) * distance,
            y: corner.centerY + Math.sin(angle) * distance
        };
    }

    createStar() {
        if (this.activeStars.length >= this.config.maxStars) {
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

        // Calculate distance to reach screen edge and beyond
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const maxDistance = Math.max(screenWidth, screenHeight) + 1000; // Extended travel distance for longer journeys
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
        const duration = this.config.idleDuration.min + Math.random() * this.config.idleDuration.max; // 40-60 seconds - stars linger longer before drifting away

        // Store movement params for potential scatter
        star.scatterData = { start, endX, endY };

        // Apply birth animation
        star.style.animation = `starBirth ${duration}ms ease-out forwards`;

        // Apply movement and store animation reference
        star.moveAnimation = star.animate([
            { transform: 'translate(0, 0) scale(0)', opacity: 0 },
            { transform: 'translate(0, 0) scale(1.2)', opacity: 1, offset: 0.2 },
            { transform: `translate(${endX - start.x}px, ${endY - start.y}px) scale(0.8)`, opacity: 0 }
        ], {
            duration: duration,
            easing: 'ease-out',
            fill: 'forwards'
        });

        star.moveAnimation.onfinish = () => {
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

    scatterExistingStars() {
        // Gracefully scatter stars when user becomes active
        console.log(`Elegantly scattering ${this.activeStars.length} existing stars`);

        this.activeStars.forEach(star => {
            if (star.moveAnimation && star.scatterData) {
                // Cancel current slow animation
                star.moveAnimation.cancel();

                // Create elegant scatter animation - responsive yet graceful
                const scatterDuration = this.config.scatterDuration;
                const { start, endX, endY } = star.scatterData;

                star.moveAnimation = star.animate([
                    { transform: 'translate(0, 0) scale(1.2)', opacity: 1, offset: 0 },
                    { transform: `translate(${(endX - start.x) * 0.3}px, ${(endY - start.y) * 0.3}px) scale(1.0)`, opacity: 0.9, offset: 0.5 },
                    { transform: `translate(${endX - start.x}px, ${endY - start.y}px) scale(0.6)`, opacity: 0, offset: 1 }
                ], {
                    duration: scatterDuration,
                    easing: 'ease-in-out', // Smooth acceleration and deceleration
                    fill: 'forwards'
                });

                star.moveAnimation.onfinish = () => {
                    this.removeStar(star);
                };
            }
        });
    }

    startStarGeneration() {
        console.log('Starting star generation with idle detection...');
        const generateStar = () => {
            if (this.isRunning && !this.isPaused) {
                const now = Date.now();
                const idleTime = now - this.lastActivityTime;

                // Mobile: Always use slow trickle (no idle bloom for performance)
                // Desktop: Use idle bloom when idle, trickle when active
                const useTrickleOnly = this.isMobile();

                if (idleTime >= this.config.idleThreshold && !useTrickleOnly) {
                    // User is idle - generate stars (blooming effect) - desktop only
                    if (!this.isCurrentlyIdle) {
                        console.log('Transition: Active → Idle - Starting star bloom');
                        this.isCurrentlyIdle = true;
                    }

                    console.log(`Idle for ${idleTime}ms - Creating star`);
                    this.createStar();

                    // Fast generation while idle for blooming effect
                    const bloomDelay = this.config.bloomDelay.min + Math.random() * this.config.bloomDelay.max;
                    setTimeout(generateStar, bloomDelay);
                } else {
                    // User is active - slow trickle of stars (continuous generation)
                    // Mobile: Always trickle, Desktop: Trickle when active
                    if (this.isCurrentlyIdle) {
                        this.isCurrentlyIdle = false;
                    }

                    console.log(`${useTrickleOnly ? 'Mobile' : 'Active'} - creating trickle star`);
                    this.createStar();

                    // Slow generation while active for continuous ambient effect
                    const activeDelay = this.config.activeDelay.min + Math.random() * this.config.activeDelay.max;
                    setTimeout(generateStar, activeDelay);
                }
            } else if (this.isPaused) {
                // Tab is hidden, check again later
                setTimeout(generateStar, 1000);
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

// Progressive Image Loader - Load deferred hero images in batches
(function() {
    function loadLazyImages() {
        const lazyElements = document.querySelectorAll('[data-lazy-load]');

        if (lazyElements.length === 0) return;

        // Load images in batches for better performance
        const batchSize = 5;
        let currentBatch = 0;

        function loadBatch() {
            const start = currentBatch * batchSize;
            const end = Math.min(start + batchSize, lazyElements.length);

            for (let i = start; i < end; i++) {
                const element = lazyElements[i];

                // Load desktop and mobile images
                const desktopImg = element.querySelector('[data-bg-desktop]');
                const mobileImg = element.querySelector('[data-bg-mobile]');

                if (desktopImg && desktopImg.dataset.bgDesktop) {
                    desktopImg.style.backgroundImage = `url('${desktopImg.dataset.bgDesktop}')`;
                    delete desktopImg.dataset.bgDesktop;
                }

                if (mobileImg && mobileImg.dataset.bgMobile) {
                    mobileImg.style.backgroundImage = `url('${mobileImg.dataset.bgMobile}')`;
                    delete mobileImg.dataset.bgMobile;
                }

                element.removeAttribute('data-lazy-load');
            }

            currentBatch++;

            // Load next batch if there are more images
            if (end < lazyElements.length) {
                // Use requestIdleCallback if available, otherwise setTimeout
                if ('requestIdleCallback' in window) {
                    requestIdleCallback(loadBatch);
                } else {
                    setTimeout(loadBatch, 100);
                }
            }
        }

        // Start loading after page is fully loaded
        if (document.readyState === 'complete') {
            setTimeout(loadBatch, 1000);
        } else {
            window.addEventListener('load', () => {
                setTimeout(loadBatch, 1000);
            });
        }
    }

    // Initialize lazy loading
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadLazyImages);
    } else {
        loadLazyImages();
    }
})();

// Initialize the star birth system when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for the page to settle, then start the star system
    setTimeout(() => {
        console.log('Initializing Star Birth System...');
        const container = document.getElementById('starBirthContainer');
        console.log('Container found:', !!container);

        if (container) {
            window.starBirthSystem = new StarBirthSystem();
            console.log('Star Birth System initialized on all pages');
        } else {
            console.error('Star container not found');
        }
    }, 1000); // Reduced delay since we don't need to wait for services-grid
});