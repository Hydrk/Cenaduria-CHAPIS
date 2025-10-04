// CARRUSEL AUTOMÁTICO Y CONTROLES
let slideIndex = 0;
let carruselInterval;

function mostrarSlide(n) {
    const slides = document.querySelectorAll('.carrusel-slide');
    const indicadores = document.querySelectorAll('.indicador');
    
    // Oculta todos los slides
    slides.forEach(slide => slide.classList.remove('active'));
    indicadores.forEach(ind => ind.classList.remove('active'));
    
    // Ajusta el índice si se pasa de los límites
    if (n >= slides.length) slideIndex = 0;
    if (n < 0) slideIndex = slides.length - 1;
    
    // Muestra el slide actual
    if (slides[slideIndex]) {
        slides[slideIndex].classList.add('active');
        indicadores[slideIndex].classList.add('active');
    }
}

function moverCarrusel(n) {
    slideIndex += n;
    mostrarSlide(slideIndex);
    resetInterval();
}

function irASlide(n) {
    slideIndex = n;
    mostrarSlide(slideIndex);
    resetInterval();
}

// Carrusel automático
function iniciarCarrusel() {
    carruselInterval = setInterval(() => {
        slideIndex++;
        mostrarSlide(slideIndex);
    }, 5000); // Cambia cada 5 segundos
}

function resetInterval() {
    clearInterval(carruselInterval);
    iniciarCarrusel();
}

// Iniciar cuando la página cargue
document.addEventListener('DOMContentLoaded', function() {
    mostrarSlide(slideIndex);
    iniciarCarrusel();
    inicializarAnimaciones();
    
    // Pausar carrusel cuando el mouse está sobre él
    const carrusel = document.querySelector('.carrusel-container');
    if (carrusel) {
        carrusel.addEventListener('mouseenter', () => {
            clearInterval(carruselInterval);
        });
        
        carrusel.addEventListener('mouseleave', () => {
            iniciarCarrusel();
        });
    }
    
    // Navegación con teclado (opcional)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            moverCarrusel(-1);
        } else if (e.key === 'ArrowRight') {
            moverCarrusel(1);
        }
    });
    
    // Agregar event listeners a los botones e indicadores
    const prevBtn = document.querySelector('.carrusel-prev');
    const nextBtn = document.querySelector('.carrusel-next');
    const indicadores = document.querySelectorAll('.indicador');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => moverCarrusel(-1));
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => moverCarrusel(1));
    }
    
    indicadores.forEach((indicador, index) => {
        indicador.addEventListener('click', () => irASlide(index));
    });

    // ANIMACIONES AL ENTRAR A LA PÁGINA (UNA SOLA VEZ)
function inicializarAnimaciones() {
    const elementosAnimables = document.querySelectorAll(
        '.info-section, .antojito-card, header, .carrusel-container'
    );
    
    // Set para llevar registro de qué elementos ya fueron animados
    const elementosAnimados = new Set();
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !elementosAnimados.has(entry.target)) {
                setTimeout(() => {
                    entry.target.classList.add('animado');
                    elementosAnimados.add(entry.target);
                }, 100);
            }
        });
    }, {
        threshold: 0.1, // Se activa cuando el 10% del elemento es visible
        rootMargin: '0px 0px -50px 0px' // Se activa un poco antes de que entre completamente
    });
    
    // Observar todos los elementos animables
    elementosAnimables.forEach(elemento => {
        observer.observe(elemento);
    });
}
});