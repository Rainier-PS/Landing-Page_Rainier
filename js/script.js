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

function initSlider(sliderSelector, indicatorSelector) {
  const sliderContainer = document.querySelector(sliderSelector);
  const slidesContainer = sliderContainer.querySelector('.projects-slides');
  const slides = slidesContainer.querySelectorAll('.project-slide');
  const indicators = document.querySelectorAll(indicatorSelector);
  let currentIndex = 0;

  indicators.forEach(indicator => {
    indicator.addEventListener('click', () => {
      currentIndex = parseInt(indicator.getAttribute('data-slide'));
      updateSlidePosition();
    });
  });

  function updateSlidePosition() {
    slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateIndicators();
  }

  function updateIndicators() {
    indicators.forEach((indicator, i) => {
      indicator.classList.toggle('active', i === currentIndex);
    });
  }
}

initSlider('#projects', '#projects .slider-indicator');
initSlider('#awards', '#awards .slider-indicator');

document.querySelectorAll('img:not(#profile-pic)').forEach(img => {
    img.setAttribute('loading', 'lazy');
});

const lightbox = document.getElementById('imageLightbox');
const lightboxImg = document.getElementById('lightboxImg');
const closeBtn = document.getElementById('closeLightbox');
const openBtn = document.getElementById('openInNewTab');

function attachLightbox(selector) {
  document.querySelectorAll(selector).forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', e => {
      e.preventDefault();
      lightboxImg.src = img.src;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });
}

attachLightbox('#projects .project-card img');
attachLightbox('#awards .project-card img');

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
