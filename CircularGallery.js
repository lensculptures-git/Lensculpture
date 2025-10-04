import { Renderer, Camera, Transform, Plane, Program, Mesh, Texture, Vec2 } from './node_modules/ogl/src/index.mjs';

class CircularGallery {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            bend: options.bend || 3,
            textColor: options.textColor || '#ffffff',
            borderRadius: options.borderRadius || 0.05,
            scrollEase: options.scrollEase || 0.02,
            ...options
        };

        this.scroll = { current: 0, target: 0, last: 0 };
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
        this.renderer = new Renderer({
            alpha: true,
            antialias: true,
            dpr: Math.min(window.devicePixelRatio, 2)
        });

        this.gl = this.renderer.gl;
        this.gl.clearColor(0, 0, 0, 0);

        this.container.appendChild(this.gl.canvas);
        this.gl.canvas.style.width = '100%';
        this.gl.canvas.style.height = '100%';
        this.gl.canvas.style.position = 'absolute';
        this.gl.canvas.style.top = '0';
        this.gl.canvas.style.left = '0';

        this.resize();
    }

    setupCamera() {
        this.camera = new Camera(this.gl, { fov: 45 });
        this.camera.position.z = 5;
    }

    setupScene() {
        this.scene = new Transform();
    }

    loadImages() {
        const showcaseItems = this.container.querySelectorAll('.showcase-item');

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
                item.style.display = 'none';
            }
        });

        this.createMeshes();
    }

    createMeshes() {
        const total = this.items.length;
        const radius = 3;

        this.items.forEach((item, i) => {
            const texture = new Texture(this.gl, {
                generateMipmaps: false
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
                    varying vec2 vUv;

                    #define PI 3.14159265359

                    void main() {
                        vUv = uv;
                        vec3 pos = position;

                        // Circular positioning
                        float angle = (uIndex / uTotal) * PI * 2.0 + uScroll;
                        float x = sin(angle) * ${radius.toFixed(1)};
                        float z = cos(angle) * ${radius.toFixed(1)};

                        pos.x += x;
                        pos.z += z - ${radius.toFixed(1)};

                        // Apply bend
                        pos.z += sin(pos.x * uBend) * 0.3;

                        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                    }
                `,
                fragment: `
                    precision highp float;
                    uniform sampler2D tMap;
                    uniform float uBorderRadius;
                    uniform float uAlpha;
                    varying vec2 vUv;

                    void main() {
                        // Border radius effect
                        vec2 uv = vUv;
                        vec2 center = uv - 0.5;
                        float dist = length(max(abs(center) - 0.5 + uBorderRadius, 0.0));
                        float alpha = 1.0 - smoothstep(uBorderRadius - 0.01, uBorderRadius, dist);

                        vec4 tex = texture2D(tMap, uv);
                        gl_FragColor = vec4(tex.rgb, tex.a * alpha * uAlpha);
                    }
                `,
                uniforms: {
                    tMap: { value: texture },
                    uBend: { value: this.options.bend },
                    uBorderRadius: { value: this.options.borderRadius },
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
        });

        window.addEventListener('mousemove', (e) => {
            if (!this.isDragging) return;
            const deltaX = e.clientX - this.startX;
            this.scroll.target = this.startScroll - deltaX * 0.003;
        });

        window.addEventListener('mouseup', () => {
            this.isDragging = false;
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
        this.meshes.forEach((mesh, i) => {
            mesh.program.uniforms.uScroll.value = this.scroll.current;

            // Calculate distance from center for alpha/depth effects
            const angle = (i / this.items.length) * Math.PI * 2 + this.scroll.current;
            const normalizedAngle = ((angle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
            const distFromCenter = Math.abs(normalizedAngle - Math.PI);
            const alpha = 1 - (distFromCenter / Math.PI) * 0.6;

            mesh.program.uniforms.uAlpha.value = Math.max(0.3, alpha);
        });

        this.renderer.render({
            scene: this.scene,
            camera: this.camera
        });
    }

    destroy() {
        // Cleanup
        this.meshes.forEach(mesh => {
            mesh.geometry.remove();
            mesh.program.remove();
        });
        if (this.gl.canvas.parentNode) {
            this.gl.canvas.parentNode.removeChild(this.gl.canvas);
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
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

        // Insert WebGL container
        showcaseGrid.style.position = 'relative';
        showcaseGrid.appendChild(webglContainer);

        // Copy showcase items to WebGL container for processing
        const showcaseItems = showcaseGrid.querySelectorAll('.showcase-item');
        showcaseItems.forEach(item => {
            webglContainer.appendChild(item.cloneNode(true));
        });

        // Initialize gallery
        new CircularGallery(webglContainer, {
            bend: 3,
            textColor: '#ffffff',
            borderRadius: 0.05,
            scrollEase: 0.02
        });
    }
});

export default CircularGallery;
