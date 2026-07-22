/**
 * MONEYFEST CAPITAL ADVISORS - INTERACTIVE RENDERING ENGINE
 * Framework-free high performance background & scroll controller loops
 */

document.addEventListener('DOMContentLoaded', () => {
    initAmbientEngine();
    initScrollAnimations();
    initMobileNavigation();
    initMobileHeaderScrollState();
});

function initMobileHeaderScrollState() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    const updateHeaderState = () => {
        header.classList.toggle('is-scrolled', window.scrollY > 8);
    };

    updateHeaderState();
    window.addEventListener('scroll', updateHeaderState, { passive: true });
}

function toggleMobileNav() {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav-links');
    const overlay = document.querySelector('.mobile-nav-overlay');

    if (!toggle || !nav || !overlay) return;

    const isOpen = nav.classList.contains('open');
    if (isOpen) {
        nav.classList.remove('open');
        overlay.classList.remove('active');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    } else {
        nav.classList.add('open');
        overlay.classList.add('active');
        toggle.classList.add('open');
        toggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }
}

function closeMobileNav() {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav-links');
    const overlay = document.querySelector('.mobile-nav-overlay');

    if (!toggle || !nav || !overlay) return;

    nav.classList.remove('open');
    overlay.classList.remove('active');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
}

function initMobileNavigation() {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav-links');
    const overlay = document.querySelector('.mobile-nav-overlay');

    if (!toggle || !nav || !overlay) return;

    toggle.addEventListener('click', function (event) {
        event.preventDefault();
        toggleMobileNav();
    });

    const closeButton = nav.querySelector('.nav-close');
    if (closeButton) {
        closeButton.addEventListener('click', function (event) {
            event.preventDefault();
            closeMobileNav();
        });
    }

    overlay.addEventListener('click', function (event) {
        event.preventDefault();
        closeMobileNav();
    });

    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function () {
            closeMobileNav();
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMobileNav();
        }
    });
}

window.toggleMobileNav = toggleMobileNav;
window.closeMobileNav = closeMobileNav;

/**
 * Renders an optimized financial grid overlay, mathematical network connections,
 * and floating micro gold dust elements on an HTML5 canvas layer.
 */
function initAmbientEngine() {
    const canvas = document.getElementById('ambient-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    // Particle object density allocations
    const nodeCount = 45;
    const goldParticlesCount = 60;
    const nodes = [];
    const goldDust = [];

    // Initialize Network Data Nodes (Navy/Slate themed)
    for (let i = 0; i < nodeCount; i++) {
        nodes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            radius: Math.random() * 2 + 1
        });
    }

    // Initialize Luxury Gold Dust Elements
    for (let i = 0; i < goldParticlesCount; i++) {
        goldDust.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.15,
            vy: (Math.random() - 0.7) * 0.25, // Soft upward atmospheric drift
            radius: Math.random() * 1.5 + 0.5,
            alpha: Math.random() * 0.5 + 0.2,
            phase: Math.random() * Math.PI
        });
    }

    /**
     * Draws standard structural financial grid background vectors
     */
    function drawFinancialGrid() {
        ctx.strokeStyle = 'rgba(6, 27, 77, 0.015)';
        ctx.lineWidth = 1;
        const gridGap = 80;

        for (let x = 0; x < width; x += gridGap) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }
        for (let y = 0; y < height; y += gridGap) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }
    }

    /**
     * Execution update render engine loop
     */
    function renderLoop() {
        ctx.clearRect(0, 0, width, height);
        
        drawFinancialGrid();

        // 1. Process Network Lines and Nodes
        for (let i = 0; i < nodeCount; i++) {
            let n = nodes[i];
            n.x += n.vx;
            n.y += n.vy;

            // Boundaries bouncing logic check
            if (n.x < 0 || n.x > width) n.vx *= -1;
            if (n.y < 0 || n.y > height) n.vy *= -1;

            ctx.beginPath();
            ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(6, 27, 77, 0.08)';
            ctx.fill();
        }

        // Draw structural link connections between proximal nodes
        ctx.lineWidth = 0.5;
        for (let i = 0; i < nodeCount; i++) {
            for (let j = i + 1; j < nodeCount; j++) {
                let dx = nodes[i].x - nodes[j].x;
                let dy = nodes[i].y - nodes[j].y;
                let dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 150) {
                    let proximityAlpha = (1 - (dist / 150)) * 0.06;
                    ctx.strokeStyle = `rgba(6, 27, 77, ${proximityAlpha})`;
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();
                }
            }
        }

        // 2. Process and Render Gold Dust Layer
        for (let i = 0; i < goldParticlesCount; i++) {
            let g = goldDust[i];
            g.x += g.vx;
            g.y += g.vy;
            g.phase += 0.01;

            // Soft boundaries regeneration map loop
            if (g.x < 0) g.x = width;
            if (g.x > width) g.x = 0;
            if (g.y < 0) g.y = height;
            if (g.y > height) g.y = 0;

            // Premium pulsing dynamic luminous rendering calculation
            let currentAlpha = g.alpha + Math.sin(g.phase) * 0.15;
            currentAlpha = Math.max(0.1, Math.min(0.7, currentAlpha));

            ctx.beginPath();
            ctx.arc(g.x, g.y, g.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(199, 154, 43, ${currentAlpha})`;
            ctx.fill();
        }

        requestAnimationFrame(renderLoop);
    }

    renderLoop();
}

/**
 * Performance-optimized Intersection Observer for triggering entry animations
 */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Execution fire limit safety configuration
            }
        });
    }, observerOptions);

    const targetElements = document.querySelectorAll('.reveal-item, .timeline-node');
    targetElements.forEach(el => scrollObserver.observe(el));
}
