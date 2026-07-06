// Smooth scroll untuk navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Navbar shadow effect on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Intersection Observer untuk animasi fade-in
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observasi semua card elements
document.querySelectorAll('.dest-card, .package-card, .accommodation-card, .testimonial-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Button click animations
document.querySelectorAll('.btn-primary, .btn-secondary, .btn-small').forEach(button => {
    button.addEventListener('click', function(e) {
        // Ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        // Hapus ripple sebelumnya jika ada
        const existingRipple = this.querySelector('.ripple');
        if (existingRipple) {
            existingRipple.remove();
        }

        this.appendChild(ripple);
    });
});

// Counter animation untuk stats
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Trigger counter animation ketika section muncul
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            entry.target.dataset.animated = 'true';
            document.querySelectorAll('.stat h3').forEach((stat, index) => {
                const values = [250, 120, 15000];
                animateCounter(stat, values[index]);
            });
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.hero-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Add ripple CSS
const style = document.createElement('style');
style.textContent = `
    .btn-primary,
    .btn-secondary,
    .btn-small,
    .btn-login {
        position: relative;
        overflow: hidden;
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    /* Loading animation */
    @keyframes shimmer {
        0% {
            background-position: -1000px 0;
        }
        100% {
            background-position: 1000px 0;
        }
    }

    .skeleton {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 1000px 100%;
        animation: shimmer 2s infinite;
    }

    /* Hover animations */
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .dest-card,
    .package-card,
    .accommodation-card,
    .testimonial-card {
        animation: slideInUp 0.6s ease-out forwards;
    }
`;
document.head.appendChild(style);

// Lazy loading untuk images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Smooth scroll pada hero buttons
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', () => {
        const destinasiSection = document.querySelector('#destinasi');
        if (destinasiSection) {
            destinasiSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Mobile menu toggle (untuk responsive)
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        navMenu.classList.toggle('active');
    }
}

// Scroll reveal animations
function revealOnScroll() {
    const reveals = document.querySelectorAll('.dest-card, .package-card, .accommodation-card');
    
    window.addEventListener('scroll', () => {
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    });
}

revealOnScroll();

// Intersection Observer untuk lazy loading background images
const bgImageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            if (element.dataset.bg) {
                element.style.backgroundImage = `url(${element.dataset.bg})`;
            }
            bgImageObserver.unobserve(element);
        }
    });
}, { rootMargin: '50px' });

document.querySelectorAll('[data-bg]').forEach(element => {
    bgImageObserver.observe(element);
});

// Add hover effect untuk pricing cards
document.querySelectorAll('.dest-card, .package-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.08)';
    });
});

// Form validation helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Contact form handler (jika ada)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Terima kasih! Kami akan segera menghubungi Anda.');
        contactForm.reset();
    });
}

// Performance optimization - request idle callback
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        // Load non-critical assets
        document.querySelectorAll('[data-lazy]').forEach(element => {
            const src = element.dataset.lazy;
            if (src) {
                element.src = src;
            }
        });
    });
}

// Accessibility improvements
document.querySelectorAll('button, a[href]').forEach(element => {
    element.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            element.click();
        }
    });
});

// Track user interactions
let userInteracted = false;
document.addEventListener('click', () => {
    userInteracted = true;
});

// Page visibility API
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('User left the page');
    } else {
        console.log('User returned to the page');
    }
});

// Console welcome message
console.log('%c🎉 Welcome to Arbain Tour!', 'color: #FF7043; font-size: 20px; font-weight: bold;');
console.log('%cHappy exploring Bandung!', 'color: #2C3E50; font-size: 14px;');

// Global payment redirect handler
document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-buy]');
    if (!btn) return;
    // Prevent default action (e.g. form submit or anchor navigation)
    try { e.preventDefault(); } catch (err) {}
    const name = btn.dataset.buyName || btn.dataset.name || btn.getAttribute('aria-label') || btn.textContent.trim();
    const price = btn.dataset.buyPrice || btn.dataset.price || '';
    const target = btn.dataset.buyTarget || 'pembayaran.html';

    // Try to find an image URL related to the product automatically.
    function extractUrlFromCss(bg) {
        // bg might be like 'url("assets/foo.jpg")' or 'none'
        if (!bg || bg === 'none') return '';
        const m = bg.match(/url\(["']?(.+?)["']?\)/);
        return m ? m[1] : '';
    }

    let imgUrl = '';
    if (btn.dataset.buyImg) {
        imgUrl = btn.dataset.buyImg;
    } else {
        // Walk up a few parent levels to find a background-image, data-bg, or an <img>
        let el = btn;
        for (let i = 0; i < 5 && el; i++) {
            // check data-bg attribute
            if (el.dataset && el.dataset.bg) {
                imgUrl = el.dataset.bg;
                break;
            }
            // computed background-image
            try {
                const bg = window.getComputedStyle(el).backgroundImage;
                const extracted = extractUrlFromCss(bg);
                if (extracted) { imgUrl = extracted; break; }
            } catch (err) {
                // ignore
            }
            // check for an <img> inside this element
            const img = el.querySelector && el.querySelector('img');
            if (img && (img.dataset && img.dataset.src || img.src)) {
                imgUrl = img.dataset && img.dataset.src ? img.dataset.src : img.src;
                break;
            }
            el = el.parentElement;
        }
    }

    let url = `${target}?name=${encodeURIComponent(name)}&price=${encodeURIComponent(price)}`;
    if (imgUrl) url += `&img=${encodeURIComponent(imgUrl)}`;
    window.location.href = url;
});
