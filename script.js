// ========================================
// ACCESSIBILITY & MOTION PREFERENCES
// ========================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ========================================
// HAMBURGER MENU TOGGLE & ACCESSIBILITY
// ========================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

// Create overlay element for mobile menu
const overlay = document.createElement('div');
overlay.classList.add('nav-overlay');
document.body.prepend(overlay);

function toggleMenu(open) {
    const isActive = open !== undefined ? open : !navLinks.classList.contains('active');
    hamburger.classList.toggle('active', isActive);
    navLinks.classList.toggle('active', isActive);
    overlay.classList.toggle('active', isActive);
    hamburger.setAttribute('aria-expanded', isActive);
    document.body.style.overflow = isActive ? 'hidden' : '';
}

hamburger.addEventListener('click', () => toggleMenu());
overlay.addEventListener('click', () => toggleMenu(false));

// Close menu on link click or Escape key press
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        toggleMenu(false);
    }
});

// ========================================
// STICKY NAV SCROLL SHADOW
// ========================================
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
        nav.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    } else {
        nav.style.boxShadow = 'none';
        nav.style.backgroundColor = 'rgba(255, 255, 255, 0.85)';
    }
});

// ========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (!targetId || targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: prefersReducedMotion ? 'auto' : 'smooth'
            });
        }
    });
});

// ========================================
// MICRO-INTERACTIONS
// ========================================
const heartIcon = document.querySelector('.heart-icon');
if (heartIcon) {
    heartIcon.addEventListener('click', () => {
        heartIcon.classList.toggle('active');
        if (heartIcon.classList.contains('active')) {
            heartIcon.src = 'assets/images/heart.svg';
        }
    });
}

// ========================================
// SUBSCRIBE FORM HANDLER
// ========================================
const subscribeForm = document.querySelector('.subscribe-field form');
if (subscribeForm) {
    subscribeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = subscribeForm.querySelector('input[type="email"]');
        const email = emailInput.value.trim();

        if (email) {
            const btn = subscribeForm.querySelector('.subscribe-btn');
            const originalText = btn.textContent;
            btn.textContent = '✓ Subscribed!';
            btn.style.backgroundImage = 'linear-gradient(135deg, #34d399, #059669)';
            emailInput.value = '';

            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.backgroundImage = 'linear-gradient(135deg, #FF946D, #FF7D68)';
            }, 3000);
        }
    });
}

// ========================================
// GSAP & SCROLLTRIGGER ANIMATIONS
// ========================================
if (!prefersReducedMotion && typeof gsap !== 'undefined') {
    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    // 1. Hero entrance stagger
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.8 } });
    heroTl.from('.hero-subtitle', { opacity: 0, y: 20, delay: 0.1 })
          .from('.hero h1', { opacity: 0, y: 30 }, '-=0.5')
          .from('.hero-text', { opacity: 0, y: 20 }, '-=0.5')
          .from('.hero-buttons', { opacity: 0, y: 20 }, '-=0.5')
          .from('.hero-image', { opacity: 0, scale: 0.95 }, '-=0.6');

    // 2. Scroll reveals
    if (typeof ScrollTrigger !== 'undefined') {
        // Service cards reveal
        gsap.from('.service-card', {
            scrollTrigger: {
                trigger: '.services-grid',
                start: 'top 82%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 40,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power2.out'
        });

        // Destination cards reveal
        gsap.from('.destination-card', {
            scrollTrigger: {
                trigger: '.destination-grid',
                start: 'top 82%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 45,
            duration: 0.75,
            stagger: 0.15,
            ease: 'power2.out'
        });

        // Booking section reveal
        gsap.from('.booking-steps', {
            scrollTrigger: {
                trigger: '.booking',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            x: -40,
            duration: 0.8,
            ease: 'power2.out'
        });

        gsap.from('.booking-card', {
            scrollTrigger: {
                trigger: '.booking',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            x: 40,
            duration: 0.8,
            ease: 'power2.out'
        });

        // Testimonial card reveal
        gsap.from('.testimonial-card', {
            scrollTrigger: {
                trigger: '.testimonials',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            scale: 0.94,
            y: 30,
            duration: 0.75,
            ease: 'power2.out'
        });

        // Sponsors stagger reveal
        gsap.from('.sponsors img', {
            scrollTrigger: {
                trigger: '.sponsors',
                start: 'top 88%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 20,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power2.out'
        });

        // Subscribe banner reveal
        gsap.from('.subscribe-field', {
            scrollTrigger: {
                trigger: '.subscribe',
                start: 'top 82%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 35,
            duration: 0.8,
            ease: 'power2.out'
        });
    }
} else if (!prefersReducedMotion) {
    // IntersectionObserver fallback if GSAP isn't present
    const revealElements = document.querySelectorAll(
        '.service-card, .destination-card, .step, .booking-card, .testimonial-card, .subscribe-field'
    );

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(el);
    });
}