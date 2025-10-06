/**
 * Mobile Optimizations for Lens Sculpture
 * Handles touch events, scroll locking, and performance enhancements
 */

// ==================== SCROLL LOCK MANAGER ====================
/**
 * Centralized manager for body scroll locking
 * Prevents conflicts between menu, lightbox, and other overlays
 */
class ScrollLockManager {
    constructor() {
        this.locks = new Map(); // Track who has locks
        this.originalOverflow = '';
        this.lockCount = 0;
        this.autoUnlockTimer = null;
    }

    /**
     * Request a scroll lock
     * @param {string} requester - Identifier for who's requesting the lock
     */
    lock(requester) {
        if (!this.locks.has(requester)) {
            this.locks.set(requester, true);
            this.lockCount++;

            if (this.lockCount === 1) {
                // First lock - save original state and lock
                this.originalOverflow = document.body.style.overflow;
                document.body.style.overflow = 'hidden';
            }

            // Safety: Auto-unlock after 30 seconds to prevent permanent locks
            this.resetAutoUnlock();
        }
    }

    /**
     * Release a scroll lock
     * @param {string} requester - Identifier for who's releasing the lock
     */
    unlock(requester) {
        if (this.locks.has(requester)) {
            this.locks.delete(requester);
            this.lockCount--;

            if (this.lockCount <= 0) {
                // No more locks - restore scroll
                this.lockCount = 0;
                document.body.style.overflow = this.originalOverflow || '';
                this.clearAutoUnlock();
            }
        }
    }

    /**
     * Force unlock all (emergency use only)
     */
    forceUnlock() {
        this.locks.clear();
        this.lockCount = 0;
        document.body.style.overflow = this.originalOverflow || '';
        this.clearAutoUnlock();
    }

    /**
     * Reset the auto-unlock timer
     */
    resetAutoUnlock() {
        this.clearAutoUnlock();
        this.autoUnlockTimer = setTimeout(() => {
            if (this.lockCount > 0) {
                this.forceUnlock();
            }
        }, 30000);
    }

    /**
     * Clear the auto-unlock timer
     */
    clearAutoUnlock() {
        if (this.autoUnlockTimer) {
            clearTimeout(this.autoUnlockTimer);
            this.autoUnlockTimer = null;
        }
    }

    /**
     * Check if scroll is currently locked
     */
    isLocked() {
        return this.lockCount > 0;
    }

    /**
     * Get current lock holders
     */
    getLockHolders() {
        return Array.from(this.locks.keys());
    }
}

// ==================== TOUCH MANAGER ====================
/**
 * Centralized touch event coordinator
 * Prevents conflicts between hero swipe, thumbnails, and other touch interactions
 */
class TouchManager {
    constructor() {
        this.handlers = new Map();
        this.activeZones = new Map();
        this.isMenuOpen = false;
        this.globalTouchStart = null;
        this.touchStartTime = 0;

        // Configuration
        this.config = {
            swipeThreshold: 80, // Minimum distance for swipe
            swipeVelocity: 0.5, // Minimum velocity (px/ms)
            tapMaxDistance: 10, // Maximum movement for tap
            tapMaxDuration: 300, // Maximum duration for tap
        };
    }

    /**
     * Register a touch zone with handler
     * @param {string} id - Zone identifier
     * @param {Object} options - Configuration options
     */
    registerZone(id, options) {
        const defaultOptions = {
            element: null,
            priority: 0,
            onSwipeLeft: null,
            onSwipeRight: null,
            onSwipeUp: null,
            onSwipeDown: null,
            onTap: null,
            onTouchStart: null,
            onTouchEnd: null,
            enabled: true,
            zone: null, // Optional: { top, left, width, height } for partial element zones
        };

        this.activeZones.set(id, { ...defaultOptions, ...options });
    }

    /**
     * Unregister a touch zone
     * @param {string} id - Zone identifier
     */
    unregisterZone(id) {
        this.activeZones.delete(id);
    }

    /**
     * Enable/disable a specific zone
     * @param {string} id - Zone identifier
     * @param {boolean} enabled - Enable state
     */
    setZoneEnabled(id, enabled) {
        const zone = this.activeZones.get(id);
        if (zone) {
            zone.enabled = enabled;
        }
    }

    /**
     * Initialize touch event listeners
     */
    init() {
        document.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false });
        document.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
        document.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: false });
    }

    /**
     * Handle touch start event
     */
    handleTouchStart(e) {
        this.globalTouchStart = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY,
            time: Date.now(),
            target: e.target,
        };
        this.touchStartTime = Date.now();

        // Call zone-specific handlers
        this.callZoneHandlers('onTouchStart', e);
    }

    /**
     * Handle touch move event
     */
    handleTouchMove(e) {
        if (!this.globalTouchStart) return;

        // Check if we should prevent default (stop scroll during swipe)
        const zone = this.getActiveZone(e.target);
        if (zone && zone.preventScroll) {
            e.preventDefault();
        }
    }

    /**
     * Handle touch end event
     */
    handleTouchEnd(e) {
        if (!this.globalTouchStart) return;

        const touchEnd = {
            x: e.changedTouches[0].clientX,
            y: e.changedTouches[0].clientY,
            time: Date.now(),
        };

        const deltaX = this.globalTouchStart.x - touchEnd.x;
        const deltaY = this.globalTouchStart.y - touchEnd.y;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const duration = touchEnd.time - this.globalTouchStart.time;
        const velocityX = Math.abs(deltaX) / duration;
        const velocityY = Math.abs(deltaY) / duration;

        // Determine gesture type
        const zone = this.getActiveZone(this.globalTouchStart.target);
        if (!zone || !zone.enabled) {
            this.globalTouchStart = null;
            return;
        }

        // Check for tap
        if (distance < this.config.tapMaxDistance && duration < this.config.tapMaxDuration) {
            if (zone.onTap) {
                zone.onTap(e, this.globalTouchStart);
            }
        }
        // Check for horizontal swipe
        else if (Math.abs(deltaX) > Math.abs(deltaY)) {
            if (Math.abs(deltaX) > this.config.swipeThreshold || velocityX > this.config.swipeVelocity) {
                if (deltaX > 0 && zone.onSwipeLeft) {
                    zone.onSwipeLeft(e, { distance: Math.abs(deltaX), velocity: velocityX });
                } else if (deltaX < 0 && zone.onSwipeRight) {
                    zone.onSwipeRight(e, { distance: Math.abs(deltaX), velocity: velocityX });
                }
            }
        }
        // Check for vertical swipe
        else {
            if (Math.abs(deltaY) > this.config.swipeThreshold || velocityY > this.config.swipeVelocity) {
                if (deltaY > 0 && zone.onSwipeUp) {
                    zone.onSwipeUp(e, { distance: Math.abs(deltaY), velocity: velocityY });
                } else if (deltaY < 0 && zone.onSwipeDown) {
                    zone.onSwipeDown(e, { distance: Math.abs(deltaY), velocity: velocityY });
                }
            }
        }

        // Call zone-specific end handler
        if (zone.onTouchEnd) {
            zone.onTouchEnd(e, { deltaX, deltaY, duration });
        }

        this.globalTouchStart = null;
    }

    /**
     * Find the active zone for a given element
     * @param {Element} element - The touched element
     */
    getActiveZone(element) {
        // Sort zones by priority (highest first)
        const sortedZones = Array.from(this.activeZones.entries())
            .sort((a, b) => b[1].priority - a[1].priority);

        for (const [id, zone] of sortedZones) {
            if (!zone.enabled || !zone.element) continue;

            if (zone.element.contains(element)) {
                // Check if we're within the specified zone area
                if (zone.zone) {
                    const rect = zone.element.getBoundingClientRect();
                    const touchX = this.globalTouchStart.x - rect.left;
                    const touchY = this.globalTouchStart.y - rect.top;

                    if (touchX >= zone.zone.left &&
                        touchX <= zone.zone.left + zone.zone.width &&
                        touchY >= zone.zone.top &&
                        touchY <= zone.zone.top + zone.zone.height) {
                        return zone;
                    }
                } else {
                    return zone;
                }
            }
        }

        return null;
    }

    /**
     * Call handlers for all matching zones
     */
    callZoneHandlers(handlerName, event) {
        for (const [id, zone] of this.activeZones.entries()) {
            if (zone.enabled && zone[handlerName] && zone.element) {
                if (zone.element.contains(event.target)) {
                    zone[handlerName](event);
                }
            }
        }
    }

    /**
     * Notify manager that menu state changed
     */
    setMenuOpen(isOpen) {
        this.isMenuOpen = isOpen;

        // Disable certain zones when menu is open
        if (isOpen) {
            this.setZoneEnabled('hero-swipe', false);
            this.setZoneEnabled('star-birth', false);
        } else {
            this.setZoneEnabled('hero-swipe', true);
            this.setZoneEnabled('star-birth', true);
        }
    }
}

// ==================== PERFORMANCE MONITOR ====================
/**
 * Monitor and report performance issues
 */
class PerformanceMonitor {
    constructor() {
        this.fps = 60;
        this.lastFrameTime = performance.now();
        this.frameCount = 0;
        this.fpsHistory = [];
        this.isLowEndDevice = this.detectLowEndDevice();
    }

    /**
     * Detect if device is low-end
     */
    detectLowEndDevice() {
        // Check hardware concurrency
        const cores = navigator.hardwareConcurrency || 2;

        // Check device memory (if available)
        const memory = navigator.deviceMemory || 4;

        // Low-end: <= 2 cores or <= 2GB RAM
        return cores <= 2 || memory <= 2;
    }

    /**
     * Start monitoring FPS
     */
    startMonitoring() {
        const measureFPS = (currentTime) => {
            this.frameCount++;
            const delta = currentTime - this.lastFrameTime;

            if (delta >= 1000) {
                this.fps = Math.round((this.frameCount * 1000) / delta);
                this.fpsHistory.push(this.fps);

                // Keep last 10 measurements
                if (this.fpsHistory.length > 10) {
                    this.fpsHistory.shift();
                }

                // Track average FPS
                const avgFPS = this.fpsHistory.reduce((a, b) => a + b, 0) / this.fpsHistory.length;

                this.frameCount = 0;
                this.lastFrameTime = currentTime;
            }

            requestAnimationFrame(measureFPS);
        };

        requestAnimationFrame(measureFPS);
    }

    /**
     * Get current FPS
     */
    getFPS() {
        return this.fps;
    }

    /**
     * Check if device is low-end
     */
    isLowEnd() {
        return this.isLowEndDevice;
    }

    /**
     * Get performance recommendations
     */
    getRecommendations() {
        const recommendations = [];

        if (this.isLowEndDevice) {
            recommendations.push('Reduce animation complexity');
            recommendations.push('Disable star birth system');
            recommendations.push('Reduce max stars to 10');
        }

        const avgFPS = this.fpsHistory.reduce((a, b) => a + b, 0) / this.fpsHistory.length;
        if (avgFPS < 30) {
            recommendations.push('Disable backdrop filters');
            recommendations.push('Reduce transition durations');
            recommendations.push('Limit concurrent animations');
        }

        return recommendations;
    }
}

// ==================== EXPORTS ====================
// Create global instances
window.scrollLockManager = new ScrollLockManager();
window.touchManager = new TouchManager();
window.performanceMonitor = new PerformanceMonitor();

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.touchManager.init();
        window.performanceMonitor.startMonitoring();
    });
} else {
    window.touchManager.init();
    window.performanceMonitor.startMonitoring();
}
