/**
 * MONEYFEST CAPITAL ADVISORS - INTERACTIVE RENDERING ENGINE
 * Framework-free high performance background & scroll controller loops
 */

document.addEventListener('DOMContentLoaded', () => {
    initInitialLoader();
    initAmbientEngine();
    initScrollAnimations();
    initMobileNavigation();
    initMobileHeaderScrollState();
    initEnquiryForm();
});

function initInitialLoader() {
    const loader = document.getElementById('initial-loader');
    const fill = document.getElementById('loader-progress-fill');
    if (!loader) return;

    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.floor(Math.random() * 8) + 6;
        if (progress >= 100) {
            progress = 100;
            if (fill) fill.style.width = '100%';
            clearInterval(progressInterval);
            
            setTimeout(() => {
                loader.classList.add('loaded');
            }, 1350); // Kept for 1 additional seconds before fade-out
        } else {
            if (fill) fill.style.width = progress + '%';
        }
    }, 90);
}

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
    let isTabVisible = true;

    document.addEventListener('visibilitychange', () => {
        isTabVisible = !document.hidden;
        if (isTabVisible) {
            requestAnimationFrame(renderLoop);
        }
    });

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    // Mobile performance scaling: allocate fewer particles on mobile devices
    const isMobile = window.innerWidth < 768;
    const nodeCount = isMobile ? 20 : 45;
    const goldParticlesCount = isMobile ? 25 : 60;
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
        const gridGap = isMobile ? 120 : 80;

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
        if (!isTabVisible) return;

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
        const maxDist = isMobile ? 100 : 150;
        for (let i = 0; i < nodeCount; i++) {
            for (let j = i + 1; j < nodeCount; j++) {
                let dx = nodes[i].x - nodes[j].x;
                let dy = nodes[i].y - nodes[j].y;
                let dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < maxDist) {
                    let proximityAlpha = (1 - (dist / maxDist)) * 0.06;
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

/**
 * Advisory Enquiry Form Handler & Real-Time Keypress Validation Engine
 */
function initEnquiryForm() {
    const form = document.getElementById('advisory-enquiry-form');
    const successCard = document.getElementById('enquiry-success-message');
    const resetBtn = document.getElementById('enquiry-reset-btn');
    const userNameSpan = document.getElementById('success-user-name');
    if (!form) return;

    const fieldIds = ['enquiry-name', 'enquiry-email', 'enquiry-mobile', 'enquiry-company', 'enquiry-industry', 'enquiry-message'];

    // Register real-time live validation on input, keyup, change, and blur for each field
    fieldIds.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field) return;

        ['input', 'keyup', 'change'].forEach(eventType => {
            field.addEventListener(eventType, () => {
                validateEnquiryField(fieldId, true);
            });
        });

        field.addEventListener('blur', () => {
            const group = field.closest('.form-group');
            if (group) group.dataset.touched = 'true';
            validateEnquiryField(fieldId, false);
        });
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Touch all fields to trigger validation messages on submit if empty
        fieldIds.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                const group = field.closest('.form-group');
                if (group) group.dataset.touched = 'true';
            }
        });

        let isFormValid = true;
        fieldIds.forEach(fieldId => {
            const isValid = validateEnquiryField(fieldId, false);
            if (!isValid) isFormValid = false;
        });

        if (!isFormValid) {
            const firstError = form.querySelector('.form-group.has-error input, .form-group.has-error select, .form-group.has-error textarea');
            if (firstError) firstError.focus();
            return;
        }

        const nameValue = document.getElementById('enquiry-name').value.trim();
        const emailValue = document.getElementById('enquiry-email').value.trim();
        const submitBtn = document.getElementById('enquiry-submit-btn');

        // Check if Web3Forms hCaptcha token is present & solved
        const hCaptchaInput = form.querySelector('[name="h-captcha-response"], [name="g-recaptcha-response"]');
        const hCaptchaValue = hCaptchaInput ? hCaptchaInput.value : '';

        if (form.querySelector('.h-captcha') && !hCaptchaValue) {
            alert('Please check the CAPTCHA box ("I am human") before submitting.');
            return;
        }

        // Display sending state
        if (submitBtn) {
            submitBtn.disabled = true;
            const btnText = submitBtn.querySelector('.btn-text');
            if (btnText) btnText.textContent = 'Transmitting Enquiry...';
        }

        // Build form payload using FormData (Web3Forms official recommended method)
        const formData = new FormData(form);
        const payload = Object.fromEntries(formData);
        
        // Ensure custom subject and proper field mappings are set
        const companyValue = document.getElementById('enquiry-company').value.trim();
        payload.subject = `New Advisory Enquiry: ${companyValue} - ${nameValue}`;
        payload.from_name = nameValue;

        const endpoint = 'https://api.web3forms.com/submit';

        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(async (response) => {
            const data = await response.json();
            if (response.status === 200 && data.success) {
                if (userNameSpan) userNameSpan.textContent = nameValue;
                form.style.display = 'none';
                if (successCard) successCard.style.display = 'block';
            } else {
                console.error('Web3Forms Error:', data);
                alert(data.message || 'Submission failed. Please check form details.');
            }
        })
        .catch(error => {
            console.error('Enquiry submission network error:', error);
            alert('A network error occurred. Please try again.');
        })
        .finally(() => {
            if (submitBtn) {
                submitBtn.disabled = false;
                const btnText = submitBtn.querySelector('.btn-text');
                if (btnText) btnText.textContent = 'Submit Advisory Enquiry';
            }
        });
    });

    if (resetBtn) {
        resetBtn.addEventListener('click', function () {
            form.reset();
            form.style.display = 'block';
            if (successCard) successCard.style.display = 'none';
            fieldIds.forEach(fieldId => {
                const field = document.getElementById(fieldId);
                if (field) {
                    const group = field.closest('.form-group');
                    if (group) {
                        group.classList.remove('has-error', 'is-valid');
                        delete group.dataset.touched;
                    }
                }
            });
        });
    }
}

/**
 * Validates individual enquiry form field and updates visual DOM states
 */
function validateEnquiryField(fieldId, isLive = false) {
    const field = document.getElementById(fieldId);
    if (!field) return true;

    let isValid = true;
    let errorMsg = '';

    if (fieldId === 'enquiry-name') {
        const val = field.value.trim();
        if (!val || val.length < 2) {
            isValid = false;
            errorMsg = 'Please enter your full name (at least 2 characters).';
        }
    } else if (fieldId === 'enquiry-email') {
        const val = field.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!val || !emailRegex.test(val)) {
            isValid = false;
            errorMsg = 'Please enter a valid email address (e.g., name@company.com).';
        }
    } else if (fieldId === 'enquiry-mobile') {
        const rawVal = field.value.trim();
        const digits = rawVal.replace(/[\s\-\(\)\+]/g, '');
        if (!rawVal || !/^\d{10,15}$/.test(digits)) {
            isValid = false;
            errorMsg = 'Please enter a valid 10-digit mobile number.';
        }
    } else if (fieldId === 'enquiry-company') {
        const val = field.value.trim();
        if (!val) {
            isValid = false;
            errorMsg = 'Please enter your company or organization name.';
        }
    } else if (fieldId === 'enquiry-industry') {
        const val = field.value;
        if (!val) {
            isValid = false;
            errorMsg = 'Please select your industry from the dropdown.';
        }
    } else if (fieldId === 'enquiry-message') {
        const val = field.value.trim();
        if (!val || val.length < 5) {
            isValid = false;
            errorMsg = 'Please share details on how we can assist you (at least 5 characters).';
        }
    }

    const group = field.closest('.form-group');
    if (group) {
        if (!isValid) {
            if (group.dataset.touched === 'true' || !isLive) {
                group.classList.add('has-error');
                group.classList.remove('is-valid');
                const errorSpan = group.querySelector('.error-msg');
                if (errorSpan) errorSpan.textContent = errorMsg;
            }
        } else {
            group.classList.remove('has-error');
            if (field.value.trim().length > 0) {
                group.classList.add('is-valid');
            }
        }
    }

    return isValid;
}
