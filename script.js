const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const filter = button.getAttribute('data-filter');

    galleryItems.forEach(item => {
      if (filter === 'all' || item.getAttribute('data-category') === filter) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
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

function getVisibleItems() {
  return Array.from(galleryItems).filter(items => !items.classList.contains('hidden'));
}

function showImage(visibleItems) {
  const item = visibleItems[currentIndex];
  lightboxImg.src = item.src;
  lightboxImg.alt = item.alt;
  lightboxCaption.textContent = item.alt;
  lightbox.classList.add('active');
}

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    const visibleItems = getVisibleItems();
    currentIndex = visibleItems.indexOf(item);
    showImage(visibleItems);
  });
});

lightboxClose.addEventListener('click', () => {
  lightbox.classList.remove('active');
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove('active');
  }
});

lightboxPrev.addEventListener('click', () => {
  const visibleItems = getVisibleItems();
  currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
  showImage(visibleItems);
});

lightboxNext.addEventListener('click', () => {
  const visibleItems = getVisibleItems();
  currentIndex = (currentIndex + 1) % visibleItems.length;
  showImage(visibleItems);
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape') lightbox.classList.remove('active');
  if (e.key === 'ArrowRight') lightboxNext.click();
  if (e.key === 'ArrowLeft') lightboxPrev.click();
});
