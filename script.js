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

// Efeito de digitação
const phrases = [
    'Desenvolvedor Full Stack',
    'Python | Flask | Node.js',
    'Vue 3 | TypeScript',
    'Aprendizado Continuo'
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
        setTimeout(typeText, isDeleting ? 50 : 100);
    }
}

// Iniciar digitação após carregamento
if (typingElement) {
    setTimeout(typeText, 1000);
}

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

menuBtn?.addEventListener('click', () => {
    navLinks?.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks?.classList.remove('active');
    });
});

// Animação de fade-in simples usando IntersectionObserver
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeInObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Aplicar animação de fade-in a elementos
document.querySelectorAll('.projeto-card, .skill-item, .contato-item, .resume-card').forEach(el => {
    el.classList.add('fade-element');
    fadeInObserver.observe(el);
});
