/*======================== dependencies (bundled by Vite, no CDN) ============*/
import 'boxicons/css/boxicons.min.css';
import Typed from 'typed.js';
import ScrollReveal from 'scrollreveal';

/*======================== cached element lookups ============================*/
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const header = document.querySelector('header');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');

/*======================== mobile menu toggle ================================*/
menuIcon.addEventListener('click', () => {
  const isOpen = navbar.classList.toggle('active');
  menuIcon.classList.toggle('bx-x', isOpen);
  menuIcon.classList.toggle('bx-menu', !isOpen);
  menuIcon.setAttribute('aria-expanded', String(isOpen));
});

/*======================== close the menu after choosing a link =============*/
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navbar.classList.remove('active');
    menuIcon.classList.remove('bx-x');
    menuIcon.classList.add('bx-menu');
    menuIcon.setAttribute('aria-expanded', 'false');
  });
});

/*======================== scroll sections active link ======================*/
window.addEventListener('scroll', () => {
  const top = window.scrollY;

  sections.forEach((sec) => {
    const offset = sec.offsetTop - 150;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');
    if (!id) return;

    if (top >= offset && top < offset + height) {
      // A section may have no matching nav link, so guard before using it.
      const active = document.querySelector(`header nav a[href="#${id}"]`);
      if (!active) return;

      navLinks.forEach((link) => link.classList.remove('active'));
      active.classList.add('active');
    }
  });

  /*===================== sticky navbar ====================================*/
  header.classList.toggle('sticky', top > 100);
});

/*===================== scroll reveal ======================================*/
ScrollReveal({
  reset: true,
  distance: '80px',
  duration: 2000,
  delay: 200,
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal(
  '.home-img, .services-container, .portfolio-box, .contact form',
  { origin: 'bottom' },
);
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

/*===================== typed js ===========================================*/
new Typed('.multiple-text', {
  strings: ['Web Developer', 'Backend Developer'],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true,
});
