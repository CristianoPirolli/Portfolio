// Smooth scrolling para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
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
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: color },
            shape: { type: 'circle' },
            opacity: { value: 0.5, random: false },
            size: { value: 3, random: true },
            line_linked: {
                enable: true,
                distance: 150,
                color: color,
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
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
                onhover: { enable: true, mode: 'repulse' },
                onclick: { enable: true, mode: 'push' },
                resize: true
            }
        },
        retina_detect: true
    });
}

// Inicializar particles.js para cada seção
document.addEventListener('DOMContentLoaded', function() {
    initParticles('particles-home', '#00bfff');    // Azul
    initParticles('particles-sobre', '#00ff9f');   // Verde
    initParticles('particles-resumo', '#ff9f00');  // Laranja
    initParticles('particles-projetos', '#ff00ff'); // Rosa
    initParticles('particles-contato', '#ffff00');  // Amarelo
});

// ScrollReveal Config
ScrollReveal().reveal('.projeto-card', {
    delay: 200,
    distance: '50px',
    duration: 1000,
    interval: 200
});

ScrollReveal().reveal('.skill-icons i', {
    delay: 200,
    distance: '20px',
    duration: 1000,
    interval: 100
});

ScrollReveal().reveal('.resume-card', {
    delay: 200,
    distance: '40px',
    duration: 1100,
    interval: 200
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

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
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

// Mudar navbar ao rolar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.8)';
    }
});
