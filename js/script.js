const navToggle = document.getElementById('navToggle');
const navPanel = document.getElementById('navPanel');
const navOverlay = document.getElementById('navOverlay');

function toggleNav() {
    navPanel.classList.toggle('active');
    navOverlay.classList.toggle('active');
}

navToggle.addEventListener('click', toggleNav);
navOverlay.addEventListener('click', toggleNav);

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navPanel.classList.remove('active');
        navOverlay.classList.remove('active');
    });
});

const returnTop = document.getElementById('returnTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        returnTop.classList.add('visible');
    } else {
        returnTop.classList.remove('visible');
    }
});

returnTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

const slides = document.querySelectorAll('.project-slide');
const totalSlides = slides.length;
let currentSlide = 0;

document.querySelectorAll('.slider-indicator').forEach(indicator => {
    indicator.addEventListener('click', () => {
        currentSlide = parseInt(indicator.getAttribute('data-slide'));
        updateSlidePosition();
    });
});

function updateSlidePosition() {
    const slidesContainer = document.querySelector('.projects-slides');
    const isMobile = window.innerWidth <= 768;
    const slideWidth = 100;
    slidesContainer.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
    updateIndicators();
}

function updateIndicators() {
    document.querySelectorAll('.slider-indicator').forEach((indicator, index) => {
        if (index === currentSlide) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

document.querySelectorAll('img:not(#profile-pic)').forEach(img => {
    img.setAttribute('loading', 'lazy');
});

const lightbox = document.getElementById('imageLightbox');
const lightboxImg = document.getElementById('lightboxImg');
const closeBtn = document.getElementById('closeLightbox');
const openBtn = document.getElementById('openInNewTab');

document.querySelectorAll('#projects .project-card img').forEach(img => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', e => {
    e.preventDefault();
    lightboxImg.src = img.src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

closeBtn.addEventListener('click', () => {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
});

openBtn.addEventListener('click', () => {
  if (lightboxImg.src) window.open(lightboxImg.src, '_blank');
});

lightbox.addEventListener('click', e => {
  if (e.target === lightbox) {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
});

const themeToggle = document.getElementById('theme-toggle'); // fixed id to match HTML
const themeIconLight = document.getElementById('theme-toggle-light');
const themeIconDark = document.getElementById('theme-toggle-dark');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

if (themeToggle) {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else {
    document.documentElement.setAttribute('data-theme', prefersDark.matches ? 'dark' : 'light');
  }

  updateThemeIcon();

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon();
  });

  function updateThemeIcon() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (themeIconLight) themeIconLight.style.display = currentTheme === 'dark' ? 'none' : 'block';
    if (themeIconDark) themeIconDark.style.display = currentTheme === 'dark' ? 'block' : 'none';
  }

  prefersDark.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      const newTheme = e.matches ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      updateThemeIcon();
    }
  });
}
