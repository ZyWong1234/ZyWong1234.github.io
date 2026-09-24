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
  '.home-img, .skills-container, .portfolio-box, .resume-column, .contact form',
  { origin: 'bottom' },
);

/* Sideways reveals hold an element at translateX(80px) until it scrolls into
   view -- and with reset:true they snap back every time it leaves. On a phone
   that 80px is wider than the gutter, so the copy sits shifted and gets cut
   off at the screen edge. Reveal vertically instead once there is no room to
   spare, and re-apply on every crossing of the breakpoint -- reading the
   media query once at load leaves a rotated or resized window on the wrong
   setting. */
const sideways = window.matchMedia('(min-width: 769px)');
const fromLeft = '.home-content h1, .about-img';
const fromRight = '.home-content p, .about-content';

function applySideReveals() {
  const wide = sideways.matches;

  /* clean() detaches the reveal but leaves behind the inline transform it
     wrote, so the next reveal stacks its offset on top of the stale one. */
  [fromLeft, fromRight].forEach((selector) => {
    ScrollReveal().clean(selector);
    document
      .querySelectorAll(selector)
      .forEach((el) => el.removeAttribute('style'));
  });

  ScrollReveal().reveal(fromLeft, { origin: wide ? 'left' : 'bottom' });
  ScrollReveal().reveal(fromRight, { origin: wide ? 'right' : 'bottom' });
}

applySideReveals();
sideways.addEventListener('change', applySideReveals);

/*===================== contact form =======================================*/
/* FormSubmit takes the same fields over its JSON endpoint, so the message can
   be sent without navigating away. The <form action> stays the no-JS path. */
const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');

if (contactForm && formStatus) {
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const endpoint = contactForm.action.replace(
    'formsubmit.co/',
    'formsubmit.co/ajax/',
  );

  const setStatus = (message, state) => {
    formStatus.textContent = message;
    formStatus.className = state ? `form-status ${state}` : 'form-status';
  };

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    submitButton.disabled = true;
    setStatus('Sending\u2026');

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(
          Object.fromEntries(new FormData(contactForm).entries()),
        ),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      contactForm.reset();
      setStatus(
        "Thanks \u2014 your message is on its way. I'll get back to you soon.",
        'is-success',
      );
    } catch {
      setStatus(
        'That did not send. Please email zywong.hla@gmail.com directly.',
        'is-error',
      );
    } finally {
      submitButton.disabled = false;
    }
  });
}

/*===================== typed js ===========================================*/
new Typed('.multiple-text', {
  strings: [
    'Full-Stack Developer',
    'Backend Developer',
    'Web Developer',
    'Java Developer',
    'Cybersecurity Enthusiast',
  ],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true,
});
