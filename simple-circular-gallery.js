// Simple Horizontal Carousel
class SimpleCarousel {
    constructor(container) {
        this.container = container;
        this.items = Array.from(container.querySelectorAll('.showcase-item'));
        this.currentIndex = 0;
        this.itemCount = this.items.length;
        this.isDragging = false;
        this.startX = 0;
        this.startY = 0;
        this.dragDirection = null;
        this.startTranslate = 0;

        this.init();
    }

    init() {
        // Hide old navigation
        const oldNav = document.querySelector('.gallery-navigation');
        if (oldNav) oldNav.style.display = 'none';

        // Create track
        this.track = document.createElement('div');
        this.track.className = 'carousel-track';
        this.items.forEach(item => this.track.appendChild(item));
        this.container.appendChild(this.track);

        // Create controls
        this.createControls();

        // Initial update
        this.updateCarousel();

        // Add event listeners
        this.addEventListeners();
    }

    createControls() {
        // Side arrows
        const prevArrow = document.createElement('button');
        prevArrow.className = 'gallery-arrow prev';
        prevArrow.innerHTML = '‹';
        prevArrow.setAttribute('aria-label', 'Previous');
        prevArrow.addEventListener('click', () => this.prev());

        const nextArrow = document.createElement('button');
        nextArrow.className = 'gallery-arrow next';
        nextArrow.innerHTML = '›';
        nextArrow.setAttribute('aria-label', 'Next');
        nextArrow.addEventListener('click', () => this.next());

        this.container.appendChild(prevArrow);
        this.container.appendChild(nextArrow);

        // Bottom controls
        const controls = document.createElement('div');
        controls.className = 'gallery-controls';
        controls.innerHTML = `
            <button class="gallery-nav-btn prev" aria-label="Previous">‹</button>
            <div class="gallery-indicator">
                ${this.items.map((_, i) => `<div class="gallery-dot ${i === 0 ? 'active' : ''}" data-index="${i}"></div>`).join('')}
            </div>
            <button class="gallery-nav-btn next" aria-label="Next">›</button>
        `;
        this.container.appendChild(controls);

        // Button handlers
        controls.querySelector('.gallery-nav-btn.prev').addEventListener('click', () => this.prev());
        controls.querySelector('.gallery-nav-btn.next').addEventListener('click', () => this.next());

        // Dot handlers
        this.dots = controls.querySelectorAll('.gallery-dot');
        this.dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                this.goTo(index);
            });
        });
    }

    updateCarousel() {
        // Calculate card width + gap
        const cardWidth = this.items[0].offsetWidth;
        const gap = 32; // 2rem
        const itemWidth = cardWidth + gap;

        // Center the current item
        const offset = this.container.offsetWidth / 2 - cardWidth / 2;
        const translate = offset - (this.currentIndex * itemWidth);

        this.track.style.transform = `translateX(${translate}px)`;

        // Update item states
        this.items.forEach((item, index) => {
            const diff = Math.abs(index - this.currentIndex);

            item.classList.remove('center', 'side');

            if (diff === 0) {
                item.classList.add('center');
            } else if (diff === 1) {
                item.classList.add('side');
            }
        });

        // Update dots
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.itemCount;
        this.updateCarousel();
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.itemCount) % this.itemCount;
        this.updateCarousel();
    }

    goTo(index) {
        this.currentIndex = index;
        this.updateCarousel();
    }

    addEventListeners() {
        // Mouse drag
        this.track.addEventListener('mousedown', (e) => this.onDragStart(e));
        window.addEventListener('mousemove', (e) => this.onDragMove(e));
        window.addEventListener('mouseup', () => this.onDragEnd());

        // Touch drag
        this.track.addEventListener('touchstart', (e) => this.onDragStart(e.touches[0]), { passive: false });
        window.addEventListener('touchmove', (e) => this.onTouchMove(e), { passive: false });
        window.addEventListener('touchend', () => this.onDragEnd());

        // Keyboard
        window.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });

        // Resize
        window.addEventListener('resize', () => this.updateCarousel());
    }

    onDragStart(e) {
        this.isDragging = true;
        this.startX = e.clientX;
        this.startY = e.clientY;
        this.dragDirection = null;

        // Get current translate value
        const transform = window.getComputedStyle(this.track).transform;
        if (transform !== 'none') {
            const matrix = transform.match(/matrix\((.+)\)/);
            if (matrix) {
                this.startTranslate = parseFloat(matrix[1].split(', ')[4]);
            }
        }

        this.track.style.cursor = 'grabbing';
    }

    onDragMove(e) {
        if (!this.isDragging) return;

        const deltaX = e.clientX - this.startX;
        const deltaY = e.clientY - this.startY;

        // Determine drag direction
        if (this.dragDirection === null) {
            this.dragDirection = Math.abs(deltaX) > Math.abs(deltaY) ? 'horizontal' : 'vertical';
        }

        if (this.dragDirection === 'horizontal') {
            const newTranslate = this.startTranslate + deltaX;
            this.track.style.transform = `translateX(${newTranslate}px)`;
        }
    }

    onTouchMove(e) {
        if (!this.isDragging) return;

        const touch = e.touches[0];
        const deltaX = touch.clientX - this.startX;
        const deltaY = touch.clientY - this.startY;

        if (this.dragDirection === null) {
            this.dragDirection = Math.abs(deltaX) > Math.abs(deltaY) ? 'horizontal' : 'vertical';
        }

        if (this.dragDirection === 'horizontal') {
            e.preventDefault();
            const newTranslate = this.startTranslate + deltaX;
            this.track.style.transform = `translateX(${newTranslate}px)`;
        }
    }

    onDragEnd() {
        if (!this.isDragging) return;
        this.isDragging = false;
        this.dragDirection = null;
        this.track.style.cursor = 'grab';

        // Snap to nearest item
        const transform = window.getComputedStyle(this.track).transform;
        if (transform !== 'none') {
            const matrix = transform.match(/matrix\((.+)\)/);
            if (matrix) {
                const currentTranslate = parseFloat(matrix[1].split(', ')[4]);
                const cardWidth = this.items[0].offsetWidth;
                const gap = 32;
                const itemWidth = cardWidth + gap;
                const offset = this.container.offsetWidth / 2 - cardWidth / 2;

                // Calculate which index we're closest to
                const targetIndex = Math.round((offset - currentTranslate) / itemWidth);
                this.currentIndex = Math.max(0, Math.min(targetIndex, this.itemCount - 1));

                this.updateCarousel();
            }
        }
    }
}

// Auto-initialize
function initCircularGallery() {
    const container = document.querySelector('.showcase-grid');
    if (container && container.querySelectorAll('.showcase-item').length > 0) {
        new SimpleCarousel(container);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCircularGallery);
} else {
    initCircularGallery();
}
