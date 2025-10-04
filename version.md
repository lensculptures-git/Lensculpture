# Lens Sculpture Website - Version History

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
