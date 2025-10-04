// WebGL Circular Gallery using OGL
// Load OGL from CDN: https://cdn.jsdelivr.net/npm/ogl@1/dist/ogl.mjs

class WebGLCircularGallery {
    constructor(container, OGL, options = {}) {
        this.container = container;
        this.OGL = OGL;
        this.options = {
            bend: options.bend || 3,
            borderRadius: options.borderRadius || 0.05,
            scrollEase: options.scrollEase || 0.02,
            radius: options.radius || 3,
            ...options
        };

        this.scroll = { current: 0, target: 0 };
        this.isDragging = false;
        this.items = [];
        this.meshes = [];

        this.init();
    }

    init() {
        this.setupRenderer();
        this.setupCamera();
        this.setupScene();
        this.loadImages();
        this.addEventListeners();
        this.animate();
    }

    setupRenderer() {
        const { Renderer } = this.OGL;

        this.renderer = new Renderer({
            alpha: true,
            antialias: true,
            dpr: Math.min(window.devicePixelRatio, 2)
        });

        this.gl = this.renderer.gl;
        this.gl.clearColor(0, 0, 0, 0);

        this.gl.canvas.style.width = '100%';
        this.gl.canvas.style.height = '100%';
        this.gl.canvas.style.position = 'absolute';
        this.gl.canvas.style.top = '0';
        this.gl.canvas.style.left = '0';
        this.gl.canvas.style.cursor = 'grab';

        this.container.appendChild(this.gl.canvas);
        this.resize();
    }

    setupCamera() {
        const { Camera } = this.OGL;

        this.camera = new Camera(this.gl, { fov: 45 });
        this.camera.position.z = 5;
    }

    setupScene() {
        const { Transform } = this.OGL;
        this.scene = new Transform();
    }

    loadImages() {
        const showcaseItems = document.querySelectorAll('.showcase-item');

        showcaseItems.forEach((item, index) => {
            const img = item.querySelector('img');
            const overlay = item.querySelector('.showcase-overlay span');

            if (img) {
                this.items.push({
                    src: img.src,
                    alt: img.alt,
                    title: overlay ? overlay.textContent : '',
                    element: item
                });

                // Hide original DOM element
                item.style.opacity = '0';
                item.style.pointerEvents = 'none';
            }
        });

        this.createMeshes();
    }

    createMeshes() {
        const { Texture, Program, Plane, Mesh } = this.OGL;
        const total = this.items.length;
        const radius = this.options.radius;

        this.items.forEach((item, i) => {
            const texture = new Texture(this.gl, {
                generateMipmaps: false,
                minFilter: this.gl.LINEAR,
                magFilter: this.gl.LINEAR
            });

            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.src = item.src;
            img.onload = () => {
                texture.image = img;
            };

            const program = new Program(this.gl, {
                vertex: `
                    attribute vec2 uv;
                    attribute vec3 position;
                    uniform mat4 modelViewMatrix;
                    uniform mat4 projectionMatrix;
                    uniform float uBend;
                    uniform float uScroll;
                    uniform float uIndex;
                    uniform float uTotal;
                    uniform float uRadius;
                    varying vec2 vUv;
                    varying float vDepth;

                    #define PI 3.14159265359

                    void main() {
                        vUv = uv;
                        vec3 pos = position;

                        // Circular positioning
                        float angle = (uIndex / uTotal) * PI * 2.0 + uScroll;
                        float x = sin(angle) * uRadius;
                        float z = cos(angle) * uRadius;

                        pos.x += x;
                        pos.z += z - uRadius;

                        // Apply bend
                        pos.z += sin(pos.x * uBend) * 0.2;

                        vDepth = z;

                        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                    }
                `,
                fragment: `
                    precision highp float;
                    uniform sampler2D tMap;
                    uniform float uBorderRadius;
                    uniform float uAlpha;
                    varying vec2 vUv;
                    varying float vDepth;

                    void main() {
                        // Border radius effect
                        vec2 uv = vUv;
                        vec2 center = uv - 0.5;
                        vec2 absCenter = abs(center);
                        vec2 edge = absCenter - (0.5 - uBorderRadius);
                        float dist = length(max(edge, 0.0));
                        float alpha = 1.0 - smoothstep(uBorderRadius - 0.01, uBorderRadius, dist);

                        // Depth-based alpha
                        float depthAlpha = smoothstep(-${radius.toFixed(1)}, ${radius.toFixed(1)}, vDepth);
                        depthAlpha = 0.3 + depthAlpha * 0.7;

                        vec4 tex = texture2D(tMap, uv);
                        gl_FragColor = vec4(tex.rgb, tex.a * alpha * depthAlpha * uAlpha);
                    }
                `,
                uniforms: {
                    tMap: { value: texture },
                    uBend: { value: this.options.bend },
                    uBorderRadius: { value: this.options.borderRadius },
                    uRadius: { value: radius },
                    uScroll: { value: 0 },
                    uIndex: { value: i },
                    uTotal: { value: total },
                    uAlpha: { value: 1 }
                },
                transparent: true,
                depthTest: true,
                depthWrite: true
            });

            const geometry = new Plane(this.gl, {
                width: 1.5,
                height: 1.125,
                widthSegments: 20,
                heightSegments: 20
            });

            const mesh = new Mesh(this.gl, { geometry, program });
            mesh.setParent(this.scene);

            this.meshes.push(mesh);
        });
    }

    addEventListeners() {
        window.addEventListener('resize', () => this.resize());

        // Mouse wheel
        this.container.addEventListener('wheel', (e) => {
            e.preventDefault();
            this.scroll.target += e.deltaY * 0.0005;
        }, { passive: false });

        // Mouse drag
        this.container.addEventListener('mousedown', (e) => {
            this.isDragging = true;
            this.startX = e.clientX;
            this.startScroll = this.scroll.target;
            this.gl.canvas.style.cursor = 'grabbing';
        });

        window.addEventListener('mousemove', (e) => {
            if (!this.isDragging) return;
            const deltaX = e.clientX - this.startX;
            this.scroll.target = this.startScroll - deltaX * 0.003;
        });

        window.addEventListener('mouseup', () => {
            this.isDragging = false;
            this.gl.canvas.style.cursor = 'grab';
        });

        // Touch events
        this.container.addEventListener('touchstart', (e) => {
            this.isDragging = true;
            this.startX = e.touches[0].clientX;
            this.startScroll = this.scroll.target;
        }, { passive: true });

        window.addEventListener('touchmove', (e) => {
            if (!this.isDragging) return;
            const deltaX = e.touches[0].clientX - this.startX;
            this.scroll.target = this.startScroll - deltaX * 0.003;
        }, { passive: true });

        window.addEventListener('touchend', () => {
            this.isDragging = false;
        });

        // Navigation buttons
        const prevBtn = document.querySelector('.gallery-nav-prev');
        const nextBtn = document.querySelector('.gallery-nav-next');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                const step = (Math.PI * 2) / this.items.length;
                this.scroll.target += step;
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                const step = (Math.PI * 2) / this.items.length;
                this.scroll.target -= step;
            });
        }
    }

    resize() {
        const width = this.container.offsetWidth;
        const height = this.container.offsetHeight;

        this.renderer.setSize(width, height);
        this.camera.perspective({
            aspect: width / height
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        // Smooth scroll with easing
        this.scroll.current += (this.scroll.target - this.scroll.current) * this.options.scrollEase;

        // Update mesh uniforms
        this.meshes.forEach((mesh) => {
            mesh.program.uniforms.uScroll.value = this.scroll.current;
        });

        this.renderer.render({
            scene: this.scene,
            camera: this.camera
        });
    }

    destroy() {
        this.meshes.forEach(mesh => {
            if (mesh.geometry) mesh.geometry.remove();
            if (mesh.program) mesh.program.remove();
        });
        if (this.gl.canvas && this.gl.canvas.parentNode) {
            this.gl.canvas.parentNode.removeChild(this.gl.canvas);
        }
    }
}

// Initialize when OGL is loaded
window.initWebGLGallery = function(OGL) {
    const showcaseGrid = document.querySelector('.showcase-grid');
    if (showcaseGrid && showcaseGrid.querySelectorAll('.showcase-item').length > 0) {
        // Create WebGL container
        const webglContainer = document.createElement('div');
        webglContainer.className = 'webgl-gallery-container';
        webglContainer.style.position = 'absolute';
        webglContainer.style.top = '0';
        webglContainer.style.left = '0';
        webglContainer.style.width = '100%';
        webglContainer.style.height = '100%';
        webglContainer.style.pointerEvents = 'all';
        webglContainer.style.zIndex = '1';

        showcaseGrid.appendChild(webglContainer);

        new WebGLCircularGallery(webglContainer, OGL, {
            bend: 3,
            borderRadius: 0.05,
            scrollEase: 0.02,
            radius: 3
        });
    }
};
