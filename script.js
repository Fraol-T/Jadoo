// ========================================
// HAMBURGER MENU TOGGLE
// ========================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

// Create overlay element for mobile menu
const overlay = document.createElement('div');
overlay.classList.add('nav-overlay');
document.body.prepend(overlay);

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

overlay.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;

        e.preventDefault();
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ========================================
// SCROLL-BASED NAV SHADOW
// ========================================
// const nav = document.querySelector('nav');
// window.addEventListener('scroll', () => {
//     if (window.scrollY > 50) {
//         nav.style.background = 'rgba(255, 255, 255, 0.95)';
//         nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.06)';
//         nav.style.position = 'sticky';
//         nav.style.top = '0';
//         nav.style.zIndex = '100';
//     } else {
//         nav.style.background = 'transparent';
//         nav.style.boxShadow = 'none';
//     }
// });

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
            btn.style.background = 'linear-gradient(135deg, #34d399, #059669)';
            emailInput.value = '';

            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.backgroundImage = 'linear-gradient(#FF946D, #FF7D68)';
            }, 3000);
        }
    });
}

// ========================================
// SCROLL REVEAL ANIMATION
// ========================================
const revealElements = document.querySelectorAll(
    '.service-card, .destination-card, .step, .booking-card, .testimonial-card'
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