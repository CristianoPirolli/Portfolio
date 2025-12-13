// Matrix Rain Effect - REMOVIDO para melhor performance

// Smooth scrolling para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animação de fade-in para elementos quando aparecem na tela
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
});

// Observar todas as seções
document.querySelectorAll('section').forEach((section) => {
    observer.observe(section);
});

function initParticles(elementId, color) {
    particlesJS(elementId, {
        particles: {
            number: { value: 30, density: { enable: true, value_area: 1000 } },
            color: { value: color },
            shape: { type: 'circle' },
            opacity: { value: 0.3, random: false },
            size: { value: 2, random: true },
            line_linked: {
                enable: true,
                distance: 120,
                color: color,
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 1,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false,
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: { enable: false, mode: 'repulse' },
                onclick: { enable: false, mode: 'push' },
                resize: true
            }
        },
        retina_detect: false
    });
}

// Inicializar particles.js apenas nas seções principais para melhor performance
document.addEventListener('DOMContentLoaded', function() {
    // Carregar apenas 2 instâncias de particles para reduzir carga
    initParticles('particles-home', '#00bfff');
    initParticles('particles-projetos', '#00ff9f');
});

// ScrollReveal Config - Otimizado
ScrollReveal().reveal('.projeto-card', {
    delay: 100,
    distance: '30px',
    duration: 600,
    interval: 150,
    reset: false
});

ScrollReveal().reveal('.resume-card', {
    delay: 100,
    distance: '30px',
    duration: 600,
    interval: 150,
    reset: false
});

// Adicionar classes de animação aos ícones de habilidades
document.querySelectorAll('.skill-icons i').forEach((icon, index) => {
    icon.style.setProperty('--i', index);
});

// Efeito de digitação
const phrases = [
    'Desenvolvedor Python',
    'Backend Developer',
    'Amante de Tecnologia'
];

let currentPhraseIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
const typingElement = document.querySelector('.typing-text');

function typeText() {
    if (!typingElement) return;
    const currentPhrase = phrases[currentPhraseIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentPhrase.substring(0, currentCharIndex - 1);
        currentCharIndex--;
    } else {
        typingElement.textContent = currentPhrase.substring(0, currentCharIndex + 1);
        currentCharIndex++;
    }

    if (!isDeleting && currentCharIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(typeText, 2000);
    } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        setTimeout(typeText, 500);
    } else {
        setTimeout(typeText, isDeleting ? 100 : 200);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (typingElement) {
        setTimeout(typeText, 1000);
    }
});

// Portal visualização modal
const portalModal = document.getElementById('portal-modal');
const portalModalImage = portalModal?.querySelector('img');
const portalButtons = document.querySelectorAll('.portal-thumb');
const closePortalModal = portalModal?.querySelector('.portal-modal__close');

function openPortalModal(src) {
    if (!portalModal || !portalModalImage) return;
    portalModalImage.src = src;
    portalModal.classList.add('show');
    portalModal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
    if (!portalModal) return;
    portalModal.classList.remove('show');
    portalModal.setAttribute('aria-hidden', 'true');
}

portalButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const imageSrc = button.getAttribute('data-image');
        if (imageSrc) openPortalModal(imageSrc);
    });
});

closePortalModal?.addEventListener('click', closeModal);
portalModal?.addEventListener('click', (event) => {
    if (event.target === portalModal) closeModal();
});

// Menu mobile
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Throttle function para otimizar scroll
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Navbar scroll effect (otimizado com throttle)
const handleNavbarScroll = throttle(() => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 14, 39, 0.95)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 255, 159, 0.2)';
    } else {
        navbar.style.background = 'rgba(10, 14, 39, 0.85)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3), 0 0 15px rgba(0, 255, 159, 0.1)';
    }
}, 100);

window.addEventListener('scroll', handleNavbarScroll, { passive: true });

// Adicionar efeito de hover aos cards com movimento do mouse (otimizado com requestAnimationFrame)
document.querySelectorAll('.projeto-card, .resume-card, .skill-item').forEach(card => {
    let ticking = false;

    card.addEventListener('mousemove', (e) => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 30;
                const rotateY = (centerX - x) / 30;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
                ticking = false;
            });
            ticking = true;
        }
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Adicionar efeito de digitação animado nos números
function animateNumbers() {
    const stats = document.querySelectorAll('.stat-number');

    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                stat.textContent = target;
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current);
            }
        }, 16);
    });
}

// Observar quando elementos entram na viewport
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animação de fade-in a elementos
document.querySelectorAll('.projeto-card, .resume-card, .skill-item, .contato-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeInObserver.observe(el);
});
