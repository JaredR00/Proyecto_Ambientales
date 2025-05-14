document.addEventListener('DOMContentLoaded', function() {
    // Animación de números en las estadísticas
    const animateStats = () => {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const updateNumber = () => {
                current += step;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateNumber);
                } else {
                    stat.textContent = target;
                }
            };
            
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    updateNumber();
                    observer.unobserve(stat);
                }
            });
            
            observer.observe(stat);
        });
    };
    
    // Iniciar animación cuando la sección es visible
    const statsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateStats();
            statsObserver.unobserve(entries[0].target);
        }
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
    
    // Navegación
    const explorarBtn = document.getElementById('explorarBtn');
    const aprendebtn = document.getElementById('aprendeBtn');
    const juegosBtn = document.getElementById('juegosBtn');
    const ecoTipsBtn = document.getElementById('ecoTipsBtn');
    
    explorarBtn.addEventListener('click', () => {
        document.querySelector('.content-cards').scrollIntoView({
            behavior: 'smooth'
        });
    });
    
    aprendebtn.addEventListener('click', () => {
        window.location.href = 'aprende.html';
    });
    
    juegosBtn.addEventListener('click', () => {
        window.location.href = 'juegos.html';
    });
    
    ecoTipsBtn.addEventListener('click', () => {
        window.location.href = 'ecotips.html';
    });
    
    // Efecto hover en tarjetas
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'var(--shadow)';
        });
    });
    
    // Efecto hover en botón CTA
    const heroCta = document.querySelector('.hero-cta');
    heroCta.addEventListener('mouseenter', () => {
        heroCta.style.transform = 'translateY(-3px)';
        heroCta.style.boxShadow = '0 6px 16px rgba(0, 200, 83, 0.3)';
    });
    
    heroCta.addEventListener('mouseleave', () => {
        heroCta.style.transform = 'translateY(0)';
        heroCta.style.boxShadow = 'none';
    });
});
// Agrega esto junto con los otros event listeners
const ecoTipsBtn = document.getElementById('ecoTipsBtn');
if (ecoTipsBtn) {
    ecoTipsBtn.addEventListener('click', () => {
        window.location.href = 'eco-tips.html';
    });
}