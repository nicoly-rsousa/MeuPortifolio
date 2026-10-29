'use strict';

// O conteúdo e os projetos continuam disponíveis mesmo sem JavaScript.
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const mobileQuery = window.matchMedia('(max-width: 760px)');

function setMenu(open) {
  menuToggle.setAttribute('aria-expanded', String(open));
  navLinks.hidden = mobileQuery.matches && !open;
}
setMenu(false);
mobileQuery.addEventListener('change', () => setMenu(false));
menuToggle.addEventListener('click', () => {
  setMenu(menuToggle.getAttribute('aria-expanded') !== 'true');
});
navLinks.addEventListener('click', (event) => {
  if (event.target.closest('a')) setMenu(false);
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menuToggle.focus();
  }
});

const filterButtons = document.querySelectorAll('[data-filter]');
const projectCards = document.querySelectorAll('.project-card');
const projectCount = document.querySelector('.project-count');
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
    let count = 0;
    projectCards.forEach((card) => {
      const visible = button.dataset.filter === 'all' || card.dataset.category === button.dataset.filter;
      card.hidden = !visible;
      if (visible) count += 1;
    });
    projectCount.textContent = `${count} ${count === 1 ? 'projeto' : 'projetos'}`;
  });
});

const dialog = document.querySelector('.image-dialog');
const dialogImage = dialog.querySelector('.dialog-image');
const dialogCaption = dialog.querySelector('.dialog-caption');
let imageTrigger;
document.querySelectorAll('[data-image]').forEach((button) => {
  button.addEventListener('click', () => {
    imageTrigger = button;
    dialogImage.src = button.dataset.image;
    dialogImage.alt = button.querySelector('img').alt;
    dialogCaption.textContent = button.dataset.caption;
    document.querySelector('#image-dialog-title').textContent = button.closest('.project-card').querySelector('h3').textContent;
    dialog.showModal();
    document.body.classList.add('dialog-open');
  });
});
dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  const bounds = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('dialog-open');
  dialogImage.removeAttribute('src');
  imageTrigger?.focus();
});

const sectionLinks = Array.from(navLinks.querySelectorAll('a'));
if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      sectionLinks.forEach((link) => {
        if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-15% 0px -60% 0px', threshold: 0 });
  document.querySelectorAll('main section[id]').forEach((section) => sectionObserver.observe(section));
}
document.querySelector('#year').textContent = new Date().getFullYear();
