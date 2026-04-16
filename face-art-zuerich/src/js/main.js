/* ===================================================
   FACE ART ZÜRICH — Main JavaScript
   =================================================== */

(function () {
  'use strict';

  /* ===== Nav: transparent → scrolled ===== */
  const nav = document.getElementById('nav');

  function updateNav() {
    if (!nav) return;
    if (nav.dataset.navStatic) return; // static nav pages (e.g. hochzeiten) stay scrolled
    if (window.scrollY > 40) {
      nav.classList.add('nav--scrolled');
      nav.classList.remove('nav--transparent');
    } else {
      nav.classList.remove('nav--scrolled');
      nav.classList.add('nav--transparent');
    }
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav(); // run once on load

  /* ===== Logo image fallback ===== */
  document.querySelectorAll('.nav__logo-img').forEach(function (img) {
    img.addEventListener('error', function () {
      this.style.display = 'none';
      const text = this.closest('.nav__logo') && this.closest('.nav__logo').querySelector('.nav__logo-text');
      if (text) {
        text.style.display = 'flex';
        text.style.opacity = '1';
        text.style.pointerEvents = 'auto';
      }
    });
  });

  /* ===== Mobile menu toggle ===== */
  const navToggle = document.getElementById('navToggle');
  const navMenu   = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      const isOpen = navMenu.classList.toggle('nav__menu--open');
      navToggle.classList.toggle('nav__toggle--open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Menü schliessen' : 'Menü öffnen');
      // prevent body scroll when menu is open
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    navMenu.querySelectorAll('.nav__link:not(.nav__link--disabled)').forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('nav__menu--open');
        navToggle.classList.remove('nav__toggle--open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Menü öffnen');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (
        navMenu.classList.contains('nav__menu--open') &&
        !nav.contains(e.target)
      ) {
        navMenu.classList.remove('nav__menu--open');
        navToggle.classList.remove('nav__toggle--open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* ===== Contact Form ===== */
  const form    = document.getElementById('contactForm');
  const confirm = document.getElementById('formConfirm');

  if (form && confirm) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Basic validation
      const requiredFields = form.querySelectorAll('[required]');
      let valid = true;

      requiredFields.forEach(function (field) {
        field.style.borderColor = '';
        if (!field.value.trim()) {
          valid = false;
          field.style.borderColor = '#E07070';
        }
      });

      if (!valid) return;

      // Disable button during "send"
      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = 'Wird gesendet…';

      // Simulate send (replace with real backend)
      setTimeout(function () {
        form.reset();
        btn.disabled = false;
        btn.textContent = 'Senden';
        confirm.classList.add('contact-form__confirm--visible');

        // Hide confirmation after 6s
        setTimeout(function () {
          confirm.classList.remove('contact-form__confirm--visible');
        }, 6000);
      }, 900);
    });

    // Remove error border on input
    form.querySelectorAll('input, textarea').forEach(function (field) {
      field.addEventListener('input', function () {
        this.style.borderColor = '';
      });
    });
  }

  /* ===== Smooth scroll for anchor links ===== */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 74;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* ===== Fade-in on scroll ===== */
  if ('IntersectionObserver' in window) {
    const style = document.createElement('style');
    style.textContent = `
      .fade-in {
        opacity: 0;
        transform: translateY(24px);
        transition: opacity 0.55s ease, transform 0.55s ease;
      }
      .fade-in--visible {
        opacity: 1;
        transform: translateY(0);
      }
    `;
    document.head.appendChild(style);

    // Elements to animate
    const targets = document.querySelectorAll(
      '.service-card, .feature, .step, .benefit, .testimonial__text, .section__header, .pricing__card, .about-intro__img, .material-box'
    );

    targets.forEach(function (el) {
      el.classList.add('fade-in');
    });

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in--visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    targets.forEach(function (el) {
      observer.observe(el);
    });
  }

})();
