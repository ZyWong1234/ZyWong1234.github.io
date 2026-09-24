/* Shared behaviour for the individual project pages.
   Lighter than main.js: no typing effect and no scroll-spy, since these pages
   have no in-page section nav. */
import 'boxicons/css/boxicons.min.css';

const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const header = document.querySelector('header');

menuIcon.addEventListener('click', () => {
  const isOpen = navbar.classList.toggle('active');
  menuIcon.classList.toggle('bx-x', isOpen);
  menuIcon.classList.toggle('bx-menu', !isOpen);
  menuIcon.setAttribute('aria-expanded', String(isOpen));
});

navbar.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navbar.classList.remove('active');
    menuIcon.classList.remove('bx-x');
    menuIcon.classList.add('bx-menu');
    menuIcon.setAttribute('aria-expanded', 'false');
  });
});

window.addEventListener('scroll', () => {
  header.classList.toggle('sticky', window.scrollY > 100);
});
