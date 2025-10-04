// Smooth Circular Gallery Implementation
class CircularGallery {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        if (!this.container) return;

        this.items = Array.from(this.container.querySelectorAll('.showcase-item'));
        this.totalItems = this.items.length;
        this.currentRotation = 0;
        this.targetRotation = 0;
        this.isDragging = false;
        this.startX = 0;
        this.startRotation = 0;
        this.radius = 450;
        this.animationFrame = null;
        this.velocity = 0;
        this.dampening = 0.9;

        this.init();
    }

    init() {
        this.updateRadius();
        this.startAnimation();
        this.attachEvents();
        window.addEventListener('resize', () => {
            this.updateRadius();
        });
    }

    updateRadius() {
        // Adjust radius for different screen sizes
        if (window.innerWidth < 768) {
            this.radius = 250;
        } else if (window.innerWidth < 1024) {
            this.radius = 350;
        } else if (window.innerWidth < 1920) {
            this.radius = 450;
        } else if (window.innerWidth < 2560) {
            this.radius = 600;
        } else if (window.innerWidth < 3440) {
            this.radius = 750;
        } else {
            this.radius = 900;
        }
    }

    startAnimation() {
        const animate = () => {
            // Smooth interpolation towards target rotation
            const diff = this.targetRotation - this.currentRotation;
            this.currentRotation += diff * 0.1; // Smooth easing

            // Apply velocity for momentum
            if (!this.isDragging && Math.abs(this.velocity) > 0.001) {
                this.targetRotation += this.velocity;
                this.velocity *= this.dampening;
            } else if (!this.isDragging) {
                this.velocity = 0;
            }

            this.positionItems();
            this.animationFrame = requestAnimationFrame(animate);
        };

        animate();
    }

    positionItems() {
        const angleStep = (2 * Math.PI) / this.totalItems;

        this.items.forEach((item, index) => {
            const angle = angleStep * index + this.currentRotation;
            const x = Math.cos(angle) * this.radius;
            const z = Math.sin(angle) * this.radius;

            // Calculate scale and opacity based on z-position (depth)
            const normalizedZ = (z + this.radius) / (this.radius * 2);
            const scale = 0.5 + normalizedZ * 0.5;
            const opacity = 0.3 + normalizedZ * 0.7;

            // Apply transforms
            item.style.transform = `translate3d(${x}px, 0, ${z}px) scale(${scale})`;
            item.style.opacity = opacity;
            item.style.zIndex = Math.round(z + 1000);

            // Disable pointer events for items in the back
            if (z < -this.radius * 0.3) {
                item.style.pointerEvents = 'none';
            } else {
                item.style.pointerEvents = 'auto';
            }
        });
    }

    rotateToNext() {
        const angleStep = (2 * Math.PI) / this.totalItems;
        this.targetRotation -= angleStep;
        this.velocity = 0;
    }

    rotateToPrev() {
        const angleStep = (2 * Math.PI) / this.totalItems;
        this.targetRotation += angleStep;
        this.velocity = 0;
    }

    rotateToIndex(index) {
        const angleStep = (2 * Math.PI) / this.totalItems;
        this.targetRotation = -angleStep * index;
        this.velocity = 0;
    }

    attachEvents() {
        // Mouse events
        this.container.addEventListener('mousedown', (e) => this.startDrag(e));
        document.addEventListener('mousemove', (e) => this.drag(e));
        document.addEventListener('mouseup', () => this.endDrag());

        // Touch events
        this.container.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.startDrag(e.touches[0]);
        }, { passive: false });

        document.addEventListener('touchmove', (e) => {
            if (this.isDragging) {
                e.preventDefault();
                this.drag(e.touches[0]);
            }
        }, { passive: false });

        document.addEventListener('touchend', () => this.endDrag());

        // Navigation buttons
        const prevBtn = document.querySelector('.gallery-nav-prev');
        const nextBtn = document.querySelector('.gallery-nav-next');

        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.rotateToPrev();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.rotateToNext();
            });
        }

        // Prevent default click behavior during drag
        this.items.forEach((item) => {
            item.addEventListener('click', (e) => {
                if (this.wasDragging) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.wasDragging = false;
                }
            });
        });
    }

    startDrag(e) {
        this.isDragging = true;
        this.wasDragging = false;
        this.startX = e.clientX || e.pageX;
        this.startRotation = this.targetRotation;
        this.velocity = 0;
        this.lastX = this.startX;
        this.lastTime = Date.now();
        this.container.style.cursor = 'grabbing';
    }

    drag(e) {
        if (!this.isDragging) return;

        const currentX = e.clientX || e.pageX;
        const deltaX = currentX - this.startX;

        // Flag as dragging if moved more than 5px
        if (Math.abs(deltaX) > 5) {
            this.wasDragging = true;
        }

        // Calculate velocity for momentum
        const now = Date.now();
        const dt = now - this.lastTime;
        if (dt > 0) {
            const dx = currentX - this.lastX;
            this.velocity = (dx / dt) * 16 * 0.001; // Normalize to ~60fps
        }

        this.lastX = currentX;
        this.lastTime = now;

        // Update rotation based on drag
        const rotationAmount = (deltaX / window.innerWidth) * Math.PI * 1.5;
        this.targetRotation = this.startRotation + rotationAmount;
        this.currentRotation = this.targetRotation; // Immediate update during drag
    }

    endDrag() {
        if (this.isDragging) {
            this.isDragging = false;
            this.container.style.cursor = 'grab';

            // Apply momentum
            if (Math.abs(this.velocity) > 0.01) {
                this.velocity *= 1.5; // Boost momentum slightly
            }

            // Snap to nearest item after momentum settles
            setTimeout(() => {
                const angleStep = (2 * Math.PI) / this.totalItems;
                const nearestIndex = Math.round(-this.targetRotation / angleStep);
                this.targetRotation = -nearestIndex * angleStep;
                this.velocity = 0;
            }, 800);
        }
    }

    destroy() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
    }
}

// Initialize circular gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const gallery = new CircularGallery('.showcase-grid');
});
