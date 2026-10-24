const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => {
      btn.classList.remove('active');
      btn.setAttribute('aria-pressed', 'false');
    });
    button.classList.add('active');
    button.setAttribute('aria-pressed', 'true');

    const filter = button.getAttribute('data-filter');

    galleryItems.forEach(item => {
      const show = filter === 'all' || item.getAttribute('data-category') === filter;
      item.classList.toggle('hidden', !show);
    });
  });
});

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

let currentIndex = 0;
let lastFocused = null;

function getVisibleItems() {
  return Array.from(galleryItems).filter(item => !item.classList.contains('hidden'));
}

function showImage(visibleItems) {
  const item = visibleItems[currentIndex];
  lightboxImg.src = item.src;
  lightboxImg.alt = item.alt;
  lightboxCaption.textContent = item.alt;
}

function openLightbox(item) {
  const visibleItems = getVisibleItems();
  currentIndex = visibleItems.indexOf(item);
  lastFocused = item;
  showImage(visibleItems);
  lightbox.classList.add('active');
  document.body.classList.add('no-scroll');
  lightboxClose.focus();
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.classList.remove('no-scroll');
  if (lastFocused) lastFocused.focus();
}

function step(direction) {
  const visibleItems = getVisibleItems();
  currentIndex = (currentIndex + direction + visibleItems.length) % visibleItems.length;
  showImage(visibleItems);
}

galleryItems.forEach(item => {
  item.addEventListener('click', () => openLightbox(item));
  item.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openLightbox(item);
    }
  });
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', () => step(-1));
lightboxNext.addEventListener('click', () => step(1));

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') step(1);
  if (e.key === 'ArrowLeft') step(-1);
  if (e.key === 'Tab') {
    // keep focus inside the viewer
    const controls = [lightboxClose, lightboxPrev, lightboxNext];
    const i = controls.indexOf(document.activeElement);
    e.preventDefault();
    const next = e.shiftKey ? (i - 1 + controls.length) % controls.length : (i + 1) % controls.length;
    controls[next].focus();
  }
});
