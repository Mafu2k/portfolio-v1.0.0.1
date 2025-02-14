// Funkcja do obsługi animacji pojawiania się elementów
const animateOnScroll = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('animate');
          entry.target.style.transform = 'translateY(0)';
          entry.target.style.opacity = '1';
        }, index * 200);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '50px'
  });

  document.querySelectorAll('.project-card').forEach(el => observer.observe(el));
};

// Rozszerzony efekt hover dla kart projektów
const projectCardHover = () => {
  const cards = document.querySelectorAll('.project-card');

  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      cards.forEach(otherCard => {
        if (otherCard !== card) {
          otherCard.style.transform = 'scale(0.95)';
          otherCard.style.opacity = '0.7';
          otherCard.style.filter = 'blur(2px)';
        }
      });

      card.style.transform = 'scale(1.05)';
      card.style.zIndex = '10';
    });

    card.addEventListener('mouseleave', () => {
      cards.forEach(otherCard => {
        otherCard.style.transform = '';
        otherCard.style.opacity = '';
        otherCard.style.filter = '';
        otherCard.style.zIndex = '';
      });
    });
  });
};

// Inicjalizacja wszystkich funkcji po załadowaniu strony
document.addEventListener('DOMContentLoaded', () => {
  animateOnScroll();
  projectCardHover();
});
// Dodaj tę funkcję do istniejącego pliku animacje.js

function toggleFullscreen(card) {
  if (card.classList.contains('fullscreen')) {
    card.classList.remove('fullscreen');
  } else {
    // Zamknij inne otwarte karty
    document.querySelectorAll('.project-card.fullscreen').forEach(el => {
      el.classList.remove('fullscreen');
    });
    card.classList.add('fullscreen');
  }
}

// Obsługa kliknięcia poza kartą, aby zamknąć pełny ekran
document.addEventListener('click', (event) => {
  const fullscreenCard = document.querySelector('.project-card.fullscreen');
  if (fullscreenCard && !fullscreenCard.contains(event.target)) {
    fullscreenCard.classList.remove('fullscreen');
  }
});
