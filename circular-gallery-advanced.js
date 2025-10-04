// Advanced Circular Gallery - Vanilla JS with OGL
// Debug mode enabled

console.log('[Gallery] Script loaded');

// ===== HELPER FUNCTIONS =====

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function lerp(p1, p2, t) {
  return p1 + (p2 - p1) * t;
}

function createTextTexture(gl, OGL, text, font = 'bold 24px Inter', color = '#ffffff') {
  try {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = font;
    const metrics = context.measureText(text);
    const textWidth = Math.ceil(metrics.width);
    const textHeight = Math.ceil(parseInt(font, 10) * 1.4);
    canvas.width = textWidth + 40;
    canvas.height = textHeight + 20;
    context.font = font;
    context.fillStyle = color;
    context.textBaseline = 'middle';
    context.textAlign = 'center';
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillText(text, canvas.width / 2, canvas.height / 2);

    const texture = new OGL.Texture(gl, { generateMipmaps: false });
    texture.image = canvas;
    return { texture, width: canvas.width, height: canvas.height };
  } catch (error) {
    console.error('[Gallery] Error creating text texture:', error);
    return null;
  }
}

// ===== TITLE CLASS =====

class Title {
  constructor({ gl, OGL, plane, text, textColor, font }) {
    this.gl = gl;
    this.OGL = OGL;
    this.plane = plane;
    this.text = text;
    this.textColor = textColor;
    this.font = font;
    this.createMesh();
  }

  createMesh() {
    try {
      const textData = createTextTexture(this.gl, this.OGL, this.text, this.font, this.textColor);
      if (!textData) return;

      const { texture, width, height } = textData;
      const geometry = new this.OGL.Plane(this.gl);
      const program = new this.OGL.Program(this.gl, {
        vertex: `
          attribute vec3 position;
          attribute vec2 uv;
          uniform mat4 modelViewMatrix;
          uniform mat4 projectionMatrix;
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragment: `
          precision highp float;
          uniform sampler2D tMap;
          varying vec2 vUv;
          void main() {
            vec4 color = texture2D(tMap, vUv);
            if (color.a < 0.1) discard;
            gl_FragColor = color;
          }
        `,
        uniforms: { tMap: { value: texture } },
        transparent: true
      });

      this.mesh = new this.OGL.Mesh(this.gl, { geometry, program });
      const aspect = width / height;
      const textHeight = 0.3; // Fixed text height
      const textWidth = textHeight * aspect;
      this.mesh.scale.set(textWidth, textHeight, 1);
      this.mesh.position.y = -this.plane.scale.y * 0.5 - textHeight - 0.2; // Position below image
      this.mesh.setParent(this.plane);
    } catch (error) {
      console.error('[Gallery] Error creating title mesh:', error);
    }
  }
}

// ===== MEDIA CLASS =====

class Media {
  constructor({ geometry, gl, OGL, image, index, length, renderer, scene, screen, text, viewport, bend, textColor, borderRadius, font }) {
    this.extra = 0;
    this.geometry = geometry;
    this.gl = gl;
    this.OGL = OGL;
    this.image = image;
    this.index = index;
    this.length = length;
    this.renderer = renderer;
    this.scene = scene;
    this.screen = screen;
    this.text = text;
    this.viewport = viewport;
    this.bend = bend;
    this.textColor = textColor;
    this.borderRadius = borderRadius;
    this.font = font;

    this.createShader();
    this.createMesh();
    this.createTitle();
    this.onResize();
  }

  createShader() {
    try {
      const texture = new this.OGL.Texture(this.gl, { generateMipmaps: true });

      this.program = new this.OGL.Program(this.gl, {
        depthTest: false,
        depthWrite: false,
        vertex: `
          precision highp float;
          attribute vec3 position;
          attribute vec2 uv;
          uniform mat4 modelViewMatrix;
          uniform mat4 projectionMatrix;
          uniform float uTime;
          uniform float uSpeed;
          varying vec2 vUv;
          void main() {
            vUv = uv;
            vec3 p = position;
            p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.1 + uSpeed * 0.5);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
          }
        `,
        fragment: `
          precision highp float;
          uniform vec2 uImageSizes;
          uniform vec2 uPlaneSizes;
          uniform sampler2D tMap;
          uniform float uBorderRadius;
          varying vec2 vUv;

          float roundedBoxSDF(vec2 p, vec2 b, float r) {
            vec2 d = abs(p) - b;
            return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
          }

          void main() {
            vec2 ratio = vec2(
              min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
              min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
            );
            vec2 uv = vec2(
              vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
              vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
            );
            vec4 color = texture2D(tMap, uv);

            float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
            float edgeSmooth = 0.002;
            float alpha = 1.0 - smoothstep(-edgeSmooth, edgeSmooth, d);

            gl_FragColor = vec4(color.rgb, alpha);
          }
        `,
        uniforms: {
          tMap: { value: texture },
          uPlaneSizes: { value: [0, 0] },
          uImageSizes: { value: [0, 0] },
          uSpeed: { value: 0 },
          uTime: { value: 100 * Math.random() },
          uBorderRadius: { value: this.borderRadius }
        },
        transparent: true
      });

      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = this.image;
      img.onload = () => {
        texture.image = img;
        this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight];
      };
      img.onerror = () => {
        console.error('[Gallery] Failed to load image:', this.image);
      };
    } catch (error) {
      console.error('[Gallery] Error creating shader:', error);
    }
  }

  createMesh() {
    try {
      this.plane = new this.OGL.Mesh(this.gl, {
        geometry: this.geometry,
        program: this.program
      });
      this.plane.setParent(this.scene);
    } catch (error) {
      console.error('[Gallery] Error creating mesh:', error);
    }
  }

  createTitle() {
    try {
      this.title = new Title({
        gl: this.gl,
        OGL: this.OGL,
        plane: this.plane,
        text: this.text,
        textColor: this.textColor,
        font: this.font
      });
    } catch (error) {
      console.error('[Gallery] Error creating title:', error);
    }
  }

  update(scroll, direction) {
    // Position horizontally - start from center
    this.plane.position.x = this.x - scroll.current - this.extra;

    const x = this.plane.position.x;
    const H = this.viewport.width / 2;

    // Apply bend effect
    if (this.bend === 0) {
      this.plane.position.y = 0;
      this.plane.rotation.z = 0;
    } else {
      const B_abs = Math.abs(this.bend);
      const R = (H * H + B_abs * B_abs) / (2 * B_abs);
      const effectiveX = Math.min(Math.abs(x), H);

      const arc = R - Math.sqrt(R * R - effectiveX * effectiveX);
      if (this.bend > 0) {
        this.plane.position.y = -arc;
        this.plane.rotation.z = -Math.sign(x) * Math.asin(effectiveX / R);
      } else {
        this.plane.position.y = arc;
        this.plane.rotation.z = Math.sign(x) * Math.asin(effectiveX / R);
      }
    }

    this.speed = scroll.current - scroll.last;
    this.program.uniforms.uTime.value += 0.04;
    this.program.uniforms.uSpeed.value = this.speed;

    const planeOffset = this.plane.scale.x / 2;
    const viewportOffset = this.viewport.width / 2;
    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
    this.isAfter = this.plane.position.x - planeOffset > viewportOffset;

    if (direction === 'right' && this.isBefore) {
      this.extra -= this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
    if (direction === 'left' && this.isAfter) {
      this.extra += this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
  }

  onResize({ screen, viewport } = {}) {
    if (screen) this.screen = screen;
    if (viewport) this.viewport = viewport;

    // Responsive image sizing based on viewport
    const imageWidth = this.viewport.width * 0.35;  // 35% of viewport width
    const imageHeight = imageWidth * 0.75; // 4:3 aspect ratio

    this.plane.scale.x = imageWidth;
    this.plane.scale.y = imageHeight;
    this.plane.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];

    this.padding = this.viewport.width * 0.08; // 8% padding
    this.width = this.plane.scale.x + this.padding;
    this.widthTotal = this.width * this.length;

    // Position items sequentially without offset
    this.x = this.width * this.index;

    console.log(`[Gallery] Item ${this.index}: x=${this.x.toFixed(2)}, width=${this.width.toFixed(2)}, viewport=${this.viewport.width.toFixed(2)}`);
  }
}

// ===== MAIN APP CLASS =====

class CircularGalleryApp {
  constructor(container, OGL, { items, bend = 3, textColor = '#ffffff', borderRadius = 0.05, font = 'bold 24px Inter', scrollSpeed = 2, scrollEase = 0.05 } = {}) {
    console.log('[Gallery] Initializing with', items.length, 'items');

    this.container = container;
    this.OGL = OGL;
    this.scrollSpeed = scrollSpeed;
    this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0 };
    this.isDown = false;

    try {
      this.onCheckDebounce = debounce(() => this.onCheck(), 200);
      this.createRenderer();
      this.createCamera();
      this.createScene();
      this.onResize();
      this.createGeometry();
      this.createMedias(items, bend, textColor, borderRadius, font);
      this.addEventListeners();
      this.update();
      console.log('[Gallery] Initialization complete');
    } catch (error) {
      console.error('[Gallery] Initialization error:', error);
      this.showError(error.message);
    }
  }

  createRenderer() {
    this.renderer = new this.OGL.Renderer({
      alpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio || 1, 2)
    });
    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);
    this.container.appendChild(this.gl.canvas);
    console.log('[Gallery] Renderer created');
  }

  createCamera() {
    this.camera = new this.OGL.Camera(this.gl);
    this.camera.fov = 50;
    this.camera.position.z = 15;
  }

  createScene() {
    this.scene = new this.OGL.Transform();
  }

  createGeometry() {
    this.planeGeometry = new this.OGL.Plane(this.gl, {
      heightSegments: 50,
      widthSegments: 100
    });
  }

  createMedias(items, bend, textColor, borderRadius, font) {
    const galleryItems = items && items.length ? items : [];
    this.mediasImages = galleryItems.concat(galleryItems); // Duplicate for infinite scroll

    console.log('[Gallery] Creating', this.mediasImages.length, 'media items');

    this.medias = this.mediasImages.map((data, index) => {
      return new Media({
        geometry: this.planeGeometry,
        gl: this.gl,
        OGL: this.OGL,
        image: data.image,
        index,
        length: this.mediasImages.length,
        renderer: this.renderer,
        scene: this.scene,
        screen: this.screen,
        text: data.text,
        viewport: this.viewport,
        bend,
        textColor,
        borderRadius,
        font
      });
    });
  }

  onTouchDown(e) {
    this.isDown = true;
    this.scroll.position = this.scroll.current;
    this.start = e.touches ? e.touches[0].clientX : e.clientX;
  }

  onTouchMove(e) {
    if (!this.isDown) return;
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const distance = (this.start - x) * 0.01; // Direct pixel-to-unit conversion
    this.scroll.target = this.scroll.position + distance;
  }

  onTouchUp() {
    this.isDown = false;
    this.onCheck();
  }

  onWheel(e) {
    e.preventDefault();
    const delta = e.deltaY || e.wheelDelta || e.detail;
    const normalized = delta / 100; // Normalize wheel delta
    this.scroll.target += normalized * 0.5;
    this.onCheckDebounce();
  }

  onCheck() {
    if (!this.medias || !this.medias[0]) return;
    const width = this.medias[0].width;
    const itemIndex = Math.round(Math.abs(this.scroll.target) / width);
    const item = width * itemIndex;
    this.scroll.target = this.scroll.target < 0 ? -item : item;
  }

  onResize() {
    this.screen = {
      width: this.container.clientWidth,
      height: this.container.clientHeight
    };

    console.log('[Gallery] Screen size:', this.screen);

    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({
      aspect: this.screen.width / this.screen.height
    });

    const fov = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;
    this.viewport = { width, height };

    console.log('[Gallery] Viewport size:', this.viewport);

    if (this.medias) {
      this.medias.forEach(media => media.onResize({ screen: this.screen, viewport: this.viewport }));
    }
  }

  update() {
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
    const direction = this.scroll.current > this.scroll.last ? 'right' : 'left';

    if (this.medias) {
      this.medias.forEach(media => media.update(this.scroll, direction));
    }

    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.scroll.last = this.scroll.current;
    this.raf = window.requestAnimationFrame(() => this.update());
  }

  addEventListeners() {
    this.boundOnResize = () => this.onResize();
    this.boundOnWheel = (e) => this.onWheel(e);
    this.boundOnTouchDown = (e) => this.onTouchDown(e);
    this.boundOnTouchMove = (e) => this.onTouchMove(e);
    this.boundOnTouchUp = () => this.onTouchUp();

    window.addEventListener('resize', this.boundOnResize);
    this.container.addEventListener('wheel', this.boundOnWheel, { passive: false });
    this.container.addEventListener('mousedown', this.boundOnTouchDown);
    window.addEventListener('mousemove', this.boundOnTouchMove);
    window.addEventListener('mouseup', this.boundOnTouchUp);
    this.container.addEventListener('touchstart', this.boundOnTouchDown, { passive: true });
    window.addEventListener('touchmove', this.boundOnTouchMove, { passive: true });
    window.addEventListener('touchend', this.boundOnTouchUp);
  }

  showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = 'position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: #ff6b6b; font-size: 18px; text-align: center; padding: 20px;';
    errorDiv.textContent = `Gallery Error: ${message}`;
    this.container.appendChild(errorDiv);
  }

  destroy() {
    window.cancelAnimationFrame(this.raf);
    window.removeEventListener('resize', this.boundOnResize);
    this.container.removeEventListener('wheel', this.boundOnWheel);
    window.removeEventListener('mousedown', this.boundOnTouchDown);
    window.removeEventListener('mousemove', this.boundOnTouchMove);
    window.removeEventListener('mouseup', this.boundOnTouchUp);
    this.container.removeEventListener('touchstart', this.boundOnTouchDown);
    window.removeEventListener('touchmove', this.boundOnTouchMove);
    window.removeEventListener('touchend', this.boundOnTouchUp);

    if (this.renderer && this.renderer.gl && this.renderer.gl.canvas.parentNode) {
      this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas);
    }
  }
}

// ===== AUTO-INITIALIZATION =====

window.initCircularGallery = function(OGL) {
  console.log('[Gallery] Init function called');
  console.log('[Gallery] OGL available:', !!OGL);

  try {
    const showcaseGrid = document.querySelector('.showcase-grid');
    if (!showcaseGrid) {
      console.error('[Gallery] .showcase-grid not found');
      return;
    }

    const showcaseItems = showcaseGrid.querySelectorAll('.showcase-item');
    if (showcaseItems.length === 0) {
      console.error('[Gallery] No .showcase-item elements found');
      return;
    }

    console.log('[Gallery] Found', showcaseItems.length, 'items');

    // Extract items from DOM
    const items = Array.from(showcaseItems).map(item => {
      const img = item.querySelector('img');
      const overlay = item.querySelector('.showcase-overlay span');
      return {
        image: img ? img.src : '',
        text: overlay ? overlay.textContent : ''
      };
    });

    // Hide original items
    showcaseItems.forEach(item => {
      item.style.opacity = '0';
      item.style.pointerEvents = 'none';
      item.style.position = 'absolute';
    });

    // Hide navigation buttons
    const navButtons = document.querySelector('.gallery-navigation');
    if (navButtons) {
      navButtons.style.display = 'none';
    }

    // Create WebGL container
    const webglContainer = document.createElement('div');
    webglContainer.className = 'circular-gallery';
    webglContainer.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; cursor: grab;';

    showcaseGrid.appendChild(webglContainer);

    // Initialize gallery
    new CircularGalleryApp(webglContainer, OGL, {
      items,
      bend: 0.8,
      textColor: '#ffffff',
      borderRadius: 0.05,
      font: 'bold 24px Inter',
      scrollSpeed: 1.5,
      scrollEase: 0.08
    });

  } catch (error) {
    console.error('[Gallery] Initialization error:', error);
  }
};

console.log('[Gallery] Script ready');
