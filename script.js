/* ============================
   PORTFOLIO SCRIPT
   ============================ */

const isEN = document.documentElement.lang === 'en';

// ---- Scroll Progress Bar ----
const scrollProgressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    if (scrollProgressBar) scrollProgressBar.style.width = scrolled + '%';
}, { passive: true });


// ---- Header Glassmorphism on Scroll ----
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });


// ---- Back to Top ----
const backToTopBtn = document.getElementById('back-to-top');
if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        backToTopBtn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}


// ---- Typing Effect ----
const phrases = isEN
    ? ['Security Analyst', 'Cloud Engineer', 'Software Engineer']
    : ['Analista de Segurança', 'Cloud Engineer', 'Eng. de Software'];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingTimeout;

function typeEffect() {
    const el = document.getElementById('typing-subtitle');
    if (!el) return;

    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        el.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        el.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    let delay = isDeleting ? 55 : 95;

    if (!isDeleting && charIndex === currentPhrase.length) {
        delay = 1800;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 400;
    }

    typingTimeout = setTimeout(typeEffect, delay);
}

// Start typing after a short delay
setTimeout(typeEffect, 600);


// ---- Scroll Reveal (Intersection Observer) ----
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach((el, i) => {
    // Stagger delay for grouped elements (skill cards, timeline items)
    const parent = el.parentElement;
    if (parent && (parent.classList.contains('skills-grid') || parent.classList.contains('timeline'))) {
        el.style.transitionDelay = (i % 6) * 80 + 'ms';
    }
    revealObserver.observe(el);
});


// ---- Active Nav Link (Intersection Observer) ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.header__link');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`.header__link[href="#${entry.target.id}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    });
}, { threshold: 0.35, rootMargin: '-60px 0px -40% 0px' });

sections.forEach(section => navObserver.observe(section));


// ---- DISC Progress Bars (animated on viewport) ----
const discChart = document.querySelector('.disc-chart');
if (discChart) {
    const discObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.progress-fill').forEach((bar, i) => {
                    const targetWidth = bar.getAttribute('data-width');
                    if (targetWidth) {
                        setTimeout(() => {
                            bar.style.width = targetWidth;
                        }, i * 150);
                    }
                });
                discObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    discObserver.observe(discChart);
}


// ---- Modal ----
function openModal(title, company, date, desc) {
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalCompany').innerText = company;
    document.getElementById('modalDate').innerText = date;
    document.getElementById('modalDesc').innerHTML = desc;
    const modal = document.getElementById('jobModal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('jobModal').style.display = 'none';
    document.body.style.overflow = '';
}

window.addEventListener('click', (e) => {
    const modal = document.getElementById('jobModal');
    if (e.target === modal) closeModal();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});


// ---- Tabs (Extracurricular) ----
function openInterest(evt, name) {
    document.querySelectorAll('.interest-tab-content').forEach(el => {
        el.style.display = 'none';
        el.classList.remove('active-content');
    });
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active-btn');
    });

    const target = document.getElementById(name);
    if (target) {
        target.style.display = 'block';
        setTimeout(() => target.classList.add('active-content'), 10);
    }
    evt.currentTarget.classList.add('active-btn');
}


// ---- Mobile Menu ----
function toggleMenu() {
    const nav = document.querySelector('.header__nav');
    if (nav) nav.classList.toggle('active');
}

// Close mobile menu when a link is clicked
document.querySelectorAll('.header__link').forEach(link => {
    link.addEventListener('click', () => {
        const nav = document.querySelector('.header__nav');
        if (nav) nav.classList.remove('active');
    });
});
