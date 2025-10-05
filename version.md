# Lens Sculpture Website - Version History

## Git Configuration
- **Repository**: https://github.com/lensculptures-git/Lensculpture.git
- **GitHub Account**: lensculptures-git
- **Branch**: main
- **Deployment**: Vercel (auto-deploy on push)
- **Live URL**: https://lensculpture.com

---

## Version 1.3 - Performance Optimization & Loading Screen (October 6, 2025)

### Loading Screen Implementation
**Problem Addressed:**
- User reported: "In mobile, due to heavy files it's taking time for the website to load"
- 270MB Hero Images folder causing slow initial page load on mobile devices
- Need for better user experience during page load

**Solution: Camera Aperture Loading Screen**
- Custom-designed camera aperture animation with 6 rotating blades
- Professional branding with logo fade-in animation
- Pulsing text: "Loading your visual experience..."
- Multi-trigger hide logic for reliability:
  - DOMContentLoaded + 500ms delay
  - Force hide at 3 seconds (fallback)
  - window.load event

**Visual Design:**
- Dark semi-transparent background (rgba(10, 10, 10, 0.98))
- White aperture blades with gradient effect
- Logo at 100px height with brightness filter
- Smooth 0.6s fade-out transition

**Implementation Scope:**
- Added to all 8 pages (index.html + 7 portfolio pages)
- Consistent experience across entire website
- IIFE pattern for isolated loader control

### Lazy Loading for Hero Slideshow
**Strategy: Progressive Image Loading**
- First slide loads immediately (LCP optimization)
- Slides 2-20 converted to data attributes (prevents eager loading)
- 38 images deferred: 19 hero slides + 19 thumbnails

**Loading Mechanism:**
- Batch loading: 5 images per batch
- Uses requestIdleCallback when available (browser idle time)
- Fallback to setTimeout(100ms) for older browsers
- Starts 1 second after window.load

**Performance Impact:**
- Reduces initial page weight by ~230MB
- First meaningful paint happens with just 2 images (hero + logo)
- Progressive enhancement - remaining slides load in background
- No impact on user experience - images ready before navigation

### Preload Critical Assets
**LCP Optimization:**
- Preload first hero image (desktop: _DSC2300.JPG)
- Preload first hero image (mobile: 09a4f2158858591.65b819d34f501.jpg)
- Media queries ensure correct image for device type
- Logo already preloaded (existing)

**Benefits:**
- Faster Largest Contentful Paint (LCP)
- Reduced layout shift
- Better Core Web Vitals scores

### Script Optimization
**Deferred Loading:**
- Moved script.js from end of <body> to <head> with defer attribute
- Allows early script discovery by browser
- Maintains execution order after DOM parse
- Better parallelization of resource loading

**Technical Details:**
- Font preconnect already optimized (existing)
- Structured data remains inline (no defer needed)
- All interactive features load after DOM ready

### Files Modified
- `styles.css` - Loading screen styles (120 lines)
- `index.html` - Loader HTML, lazy load attributes, preload hints, script defer
- `script.js` - Loader control, progressive image loader (65 lines)
- `corporate.html, events.html, portraits.html, products.html, travel.html, about.html, contact.html` - Loader HTML

### Performance Metrics
- **Initial page weight reduction**: ~230MB (85% reduction in image loading)
- **Images loaded initially**: 2 (hero + logo) vs 40 previously
- **LCP candidates**: Optimized with preload hints
- **Progressive loading**: 38 images in 8 batches of 5
- **Load timing**: Starts at window.load + 1s, batch interval = idle time

### Technical Implementation
**CSS Highlights:**
- `@keyframes apertureSpin` - 360° rotation for blades
- `@keyframes logoFadeIn` - Scale + opacity animation
- `@keyframes textPulse` - Breathing text effect
- Fixed positioning with z-index: 99999

**JavaScript Highlights:**
- IIFE pattern for loader isolation
- Progressive batch loader with requestIdleCallback
- Data attribute to inline style conversion
- Graceful cleanup (removes data attributes after load)

---

## Version 1.2 - UX Improvements & Bug Fixes (October 6, 2025)

### White Patch Fix (Accessibility Issue)
- **Problem identified**: White patch appearing in top-left corner of homepage
- **Root cause**: Accessibility "Skip to main content" link was visible when it shouldn't be
- **Solution implemented**:
  - Moved skip link further off-screen (top: -100px from -40px)
  - Added `opacity: 0` and `pointer-events: none` to completely hide
  - Maintained full accessibility - link appears on Tab key focus
  - Added `opacity: 1` and `pointer-events: auto` on focus state
- **Result**: White patch completely removed while preserving keyboard navigation accessibility

### Mobile Logo Positioning
- **Adjustment**: Logo moved 15px further left on mobile devices
- **Updated value**: `margin-left: -45px` (from -30px)
- **Visual effect**: Better alignment with hamburger menu, improved left-edge positioning

### Mobile Landing Page Slideshow - Major UX Overhaul
**Performance & Responsiveness:**
- **Swipe lag eliminated**: Reduced transition from 1.2s to 0.4s on mobile (3x faster response)
- **Desktop preserved**: Kept 0.8s transition for smooth desktop experience
- **Optimized transitions**: Changed from `all` to specific `transform, opacity` properties
- **Hardware acceleration**: Added `will-change: transform, opacity` for GPU rendering
- **iOS optimization**: Added `touch-action: pan-y` to prevent scroll interference

**Autoplay Logic Fixed:**
- **Timer conflicts resolved**: Now clears previous resume timer before setting new one
- **No overlapping timers**: Eliminated confusion from multiple 10-second timers
- **State tracking**: Added `resumeTimer` variable for clean timer management
- **Predictable behavior**: Autoplay resumes only when intentionally paused, not on navigation

**Smarter Swipe Detection:**
- **Threshold increased**: 80px from 50px to prevent accidental swipes
- **Velocity-based detection**: Added swipe velocity calculation (pixels/millisecond)
- **Dual trigger system**: Activates on distance (>80px) OR velocity (>0.5px/ms)
- **Time tracking**: Measures swipe duration for velocity calculation
- **Natural feel**: Fast swipes trigger with less distance, slow swipes require full distance

**Double-Swipe Prevention:**
- **Transition locking**: Added `isTransitioning` flag to prevent rapid consecutive swipes
- **Smart unlock timing**: 400ms lock on mobile, 800ms on desktop (matches transition duration)
- **Device detection**: Automatically adjusts based on screen width (≤768px = mobile)
- **Smooth operation**: No jarring interruptions during active transitions

### Navigation Active State - Desktop Fix
- **Problem**: Active page highlighting removed when scrolling on portfolio pages
- **Root cause**: `updateActiveNavLink()` scroll listener running on ALL pages
- **Solution**: Restricted scroll-based active link updates to homepage only
- **Behavior now**:
  - Corporate page → "Corporate" stays highlighted throughout scroll
  - Events page → "Events" stays highlighted throughout scroll
  - Homepage → Scroll-based highlighting works for anchor navigation
  - Active state persists until user navigates to different page

### Technical Improvements
**CSS Enhancements:**
- Optimized slide transitions for mobile performance
- Added touch-specific CSS properties for better mobile handling
- Hardware-accelerated animations via `will-change`

**JavaScript Enhancements:**
- Added velocity detection algorithm for swipe gestures
- Implemented transition lock mechanism with device-aware timing
- Fixed timer cleanup in autoplay pause function
- Added page detection for conditional scroll listener attachment

**Performance Gains:**
- 3x faster slide transitions on mobile
- Eliminated CSS repaints from `all` property transitions
- GPU-accelerated transforms for smoother animations
- Passive event listeners for optimized scroll performance

### Files Modified
- `styles.css` - Skip link visibility, mobile logo positioning, mobile slide transitions, touch optimizations
- `script.js` - Autoplay timer cleanup, swipe velocity detection, transition locking, navigation scroll listener conditions

### Metrics
- **Swipe response time**: 1200ms → 400ms (66% reduction)
- **Swipe threshold**: 50px → 80px (60% increase for accuracy)
- **Mobile logo position**: -30px → -45px (15px further left)
- **Transition lock**: Device-aware (400ms mobile, 800ms desktop)

---

## Version 1.1 - Homepage Hero & Mobile Navigation Redesign (October 5, 2025)

### Homepage Hero Gallery Update
- **Removed dependency on hero images folder** - Now using images from all website pages
- **Desktop view (Landscape images)**: 15 slides featuring landscape-oriented images from:
  - Travel: Image 2.jpeg, Image 19.jpg, Image 15.jpg, Image 29.jpeg
  - Events: 7ece68158858591.65b81cfb8ed2b.jpg, DSC08383-01.jpeg, Lucky Ali 01.jpg, Lucky Ali 02.jpg, DSC04479.JPG, 09a4f2158858591.65b819d34f501.jpg
  - Products: 0ba655168039249...jpg, b2449e168039249...jpg, Adobe Lr-017.JPG
  - Corporate: DSC02272.JPG, 94b9b7168097889.644cc60cc9001.jpg, DSC00062.JPG
  - Fashion: DSC08417.JPG
- **Mobile view (Portrait images)**: 15 portrait-oriented images from Fashion/Portraits collection
- **Random mixing**: Categories randomly interspersed for diverse portfolio showcase (no grouping)
- **Orientation-based display**: Ensures proper image fit for each device type

### Mobile Navigation Complete Redesign
- **Final implementation**: Clean, professional mobile hamburger menu
- **Menu design**:
  - Solid background (#1a1a1a) - no transparency issues
  - 260px width (70% max on small screens)
  - Left-aligned text layout
  - Pure white text (#ffffff) for maximum readability
  - Clean borders (#333, #2a2a2a) for visual separation
- **Backdrop overlay**: 20% opacity dark overlay for subtle effect
- **Interactions**:
  - Click hamburger to open/close
  - Click backdrop to close
  - Press ESC key to close
  - Body scroll prevention when menu open
- **Animations**: Smooth 0.3s slide-in from right with ease-out timing
- **Active state**: White left border (3px) on current page
- **Hover effect**: Darker background (#2a2a2a) with subtle left indent
- **Fixed issues**:
  - Eliminated double-tap problem (backdrop created on page load)
  - Removed excessive transparency causing content bleed-through
  - Fixed spacing gaps between menu items
  - Improved visibility and contrast

### Technical Improvements
- **JavaScript enhancements**:
  - Backdrop element created during initialization (script.js)
  - Simplified toggle function for reliable operation
  - ESC key listener for accessibility
  - Proper z-index management (hamburger: 1003, menu: 1002, backdrop: 1001)
- **CSS optimization**:
  - Removed problematic backdrop-filter effects
  - Solid colors instead of rgba for better performance
  - Clean, minimal styling for mobile menu
  - Proper pointer-events handling on backdrop

### Files Modified
- `index.html` - Hero slideshow (15 slides), thumbnail navigation (15 thumbnails)
- `styles.css` - Mobile menu redesign, backdrop styling, menu item layout
- `script.js` - Backdrop initialization, toggle function simplification

### Image Assets
- Homepage Hero: 15 landscape images (desktop), 15 portrait images (mobile)
- Sources: Travel (4), Events (6), Products (3), Corporate (3), Fashion (1)

---

## Version 1.0 - Initial Major Updates (October 4, 2025)

### Header Enhancements
- **Logo positioning**: Moved logo further left with `margin-left: -20px` for better visual balance
- **Logo size**: Increased from 110px to 140px (desktop) without changing header height
- **Transparency**: Reduced navbar background opacity from 0.95 to 0.75 for better integration with website
- **Auto-hide functionality**: Implemented scroll-based navbar behavior
  - Hides when scrolling down (after 100px threshold)
  - Shows when scrolling up
  - Always visible at top of page (< 100px)
- **Active page highlighting**: Added automatic detection and highlighting of current page in navigation
  - White text color and font-weight 500
  - Permanent underline on active page

### Events Page Updates
- Updated Concert Photography image: `DSC04479.JPG`
- Updated first parallax banner: `7ece68158858591.65b81cfb8ed2b.jpg`
- Updated Special Celebrations image: `DSC08483-01-01.jpeg`
- Updated Cultural Events image: `DSC01876.jpg`
- Updated second parallax banner: `DSC08383-01.jpeg`
- Updated Professional Coverage image: `DSC09890.JPG` with custom positioning (center 55%)
- Updated final CTA banner: `0303ea158858591.65b819d353801.jpg`
- Updated Selected Works gallery with 9 diverse, non-duplicate images
- **Scroll fix**: Removed inline animation script causing scroll stuttering

### Fashion/Portraits Page Updates
- Updated hero mobile image positioning for better face visibility (center 30%)
- Updated first parallax banner: `1695092991027.jpg`
- Updated Fashion & Style section: `Image 3.jpg`
- Updated Artistic Expression section: `Image 1.jpg`
- Updated second parallax banner: `0aad83168039881.661e9119ad53f.jpg`
- Updated Portfolio Development section: `f69deb168039881.6584877bb2d0e.jpg`
- **Layout fix**: Implemented proper alternating image/text layout
- Updated Selected Works gallery with unused images (6 from Fashion folder, 3 from Portraits folder)

### Products Page Updates
- Updated hero section: `1f1f8a168039249.6433f7ad43217.webp`
- Updated E-commerce Excellence section: `Adobe Lr-017.JPG`
- Updated first parallax banner: `b2449e168039249.64352a4bdf3a2 copy.jpg` (positioned at center 90%)
- Updated Craftsmanship & Detail section: `782f00168039249.6433f7ad2bc64 copy - Copy.jpg`
- Updated second parallax banner: `2eb7cd168039249.6433f81eebba7.webp` (positioned at center 95%)
- Updated Commercial Campaigns section: `_DSC2300.JPG`
- Updated final CTA section: `Adobe Lr-308.JPG`
- Updated Selected Works gallery with 9 unused product images
- **Hero overlay fix**: Reduced overlay opacity for better image visibility (products page only)

### CSS & Layout Improvements
- **Scroll performance**: Removed conflicting inline animation scripts from portraits.html, products.html, and travel.html
- **Alternating layout fix**: Removed `direction: rtl/ltr` CSS that was preventing proper layout alternation
- **Consistent layout**: All portfolio pages now properly alternate between:
  - Image left / Text right
  - Text left / Image right
- **Banner positioning**: Added `!important` flag to parallax banner positioning to override default classes

### Technical Improvements
- Fixed CSS specificity issues with banner image positioning
- Removed `face-focus-center` class conflicts on parallax banners
- Ensured all pages use consistent animation handling via portfolio.js
- Maintained responsive design across all updates

---

### Files Modified
- `index.html` - Header structure, mobile image positioning
- `styles.css` - Header styles, navbar transparency, active link styling, auto-hide animations
- `script.js` - Auto-hide navbar functionality, active page detection
- `portfolio.css` - Layout alternation fixes, products page overlay opacity
- `events.html` - Image updates, scroll fix
- `portraits.html` - Image updates, layout fixes, scroll fix
- `products.html` - Image updates, banner positioning, body class, scroll fix
- `corporate.html` - Scroll fix
- `travel.html` - Scroll fix

### Image Assets Updated
- Events: 7 main section images, 9 gallery images
- Fashion/Portraits: 6 main section images, 9 gallery images
- Products: 7 main section images, 9 gallery images

---

**Date**: October 4, 2025
**Status**: Stable
**Next Version**: TBD
