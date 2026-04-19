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

  /* ===== Accordion Hero ===== */
  var accAccordion = document.getElementById('accHeroAccordion');
  if (accAccordion) {
    var accPanels = accAccordion.querySelectorAll('.acc-panel');

    function setAccActive(index) {
      accPanels.forEach(function (panel, i) {
        panel.classList.toggle('acc-panel--active', i === index);
      });
    }

    accPanels.forEach(function (panel, i) {
      panel.addEventListener('mouseenter', function () { setAccActive(i); });
      panel.addEventListener('click',      function () { setAccActive(i); });
    });
  }

  /* ===== Gallery Accordions (feature sections) ===== */
  document.querySelectorAll('.gallery-acc').forEach(function (acc) {
    var panels = acc.querySelectorAll('.gallery-acc__panel');
    panels.forEach(function (panel, i) {
      panel.addEventListener('mouseenter', function () {
        panels.forEach(function (p, j) {
          p.classList.toggle('gallery-acc__panel--active', j === i);
        });
      });
      panel.addEventListener('click', function () {
        panels.forEach(function (p, j) {
          p.classList.toggle('gallery-acc__panel--active', j === i);
        });
      });
    });
  });

  /* ===== Photo Fan — drag interaction ===== */
  const photoCards = document.querySelectorAll('.photo-card');

  photoCards.forEach(function (card) {
    var startX, startY, origLeft, origTop, isDragging = false;
    var baseX = parseInt(getComputedStyle(card).getPropertyValue('--tx')) || 0;
    var baseY = parseInt(getComputedStyle(card).getPropertyValue('--ty')) || 0;

    function onPointerDown(e) {
      isDragging = true;
      card.classList.add('photo-card--dragging');
      startX = e.clientX;
      startY = e.clientY;
      // Read current rendered translate from inline style if snapped back
      origLeft = baseX;
      origTop  = baseY;
      document.addEventListener('pointermove', onPointerMove);
      document.addEventListener('pointerup',   onPointerUp);
      e.preventDefault();
    }

    function onPointerMove(e) {
      if (!isDragging) return;
      var dx = e.clientX - startX;
      var dy = e.clientY - startY;
      var newX = origLeft + dx;
      var newY = origTop  + dy;
      card.style.transform = 'translate(' + newX + 'px, ' + newY + 'px) rotate(var(--rot)) scale(1.06)';
    }

    function onPointerUp() {
      isDragging = false;
      card.classList.remove('photo-card--dragging');
      // Spring back
      card.style.transition = 'transform 0.55s cubic-bezier(0.34,1.4,0.64,1), box-shadow 0.25s ease';
      card.style.transform   = 'translate(var(--tx), var(--ty)) rotate(var(--rot)) scale(1)';
      setTimeout(function () { card.style.transition = ''; }, 600);
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerup',   onPointerUp);
    }

    card.addEventListener('pointerdown', onPointerDown);
  });



  /* ===== Expandable Gallery Cards ===== */
  const expandCards = document.querySelectorAll('.expand-card');
  if (expandCards.length) {
    // Set first card active
    expandCards[0].classList.add('active');
    
    expandCards.forEach((card, i) => {
      // Staggered entrance animation
      card.style.opacity = '0';
      card.style.transform = 'translateX(-60px)';
      setTimeout(() => {
        card.style.transition = 'flex-grow 0.7s cubic-bezier(0.25,0.1,0.25,1), box-shadow 0.7s ease, background-size 0.7s ease, border-color 0.3s ease, opacity 0.5s ease, transform 0.5s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateX(0)';
      }, 180 * i);

      card.addEventListener('click', () => {
        const idx = parseInt(card.dataset.index);
        expandCards.forEach(c => {
          if (c === card) {
            c.classList.add('active');
          } else {
            c.classList.remove('active');
          }
        });
      });
    });
  }



  /* ===== Newsletter Form ===== */
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('newsletterEmail');
      const confirm = document.getElementById('newsletterConfirm');
      if (email && email.value && email.checkValidity()) {
        confirm.classList.add('show');
        email.value = '';
        setTimeout(() => confirm.classList.remove('show'), 5000);
      }
    });
  }



  /* ===== Gallery Lightbox ===== */
  (function() {
    var items = document.querySelectorAll('[data-gallery-item]');
    var images = [];
    items.forEach(function(el) {
      var img = el.querySelector('img');
      if (img) images.push(img.src);
    });

    if (!images.length) return;

    // Create lightbox element
    var lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.id = 'lightbox';
    lb.innerHTML = '<button class="lightbox__close" aria-label="Schliessen"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg></button>' +
      '<button class="lightbox__nav lightbox__prev" aria-label="Vorheriges"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg></button>' +
      '<button class="lightbox__nav lightbox__next" aria-label="Nächstes"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg></button>' +
      '<img class="lightbox__img" src="" alt="Galerie Bild">';
    document.body.appendChild(lb);

    var lbImg = lb.querySelector('.lightbox__img');
    var currentIdx = 0;

    function openLightbox(idx) {
      currentIdx = idx;
      lbImg.src = images[idx];
      lb.classList.add('lightbox--open');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lb.classList.remove('lightbox--open');
      document.body.style.overflow = '';
    }

    function showPrev() {
      currentIdx = (currentIdx - 1 + images.length) % images.length;
      lbImg.src = images[currentIdx];
    }

    function showNext() {
      currentIdx = (currentIdx + 1) % images.length;
      lbImg.src = images[currentIdx];
    }

    items.forEach(function(el, i) {
      el.addEventListener('click', function() { openLightbox(i); });
    });

    lb.querySelector('.lightbox__close').addEventListener('click', closeLightbox);
    lb.querySelector('.lightbox__prev').addEventListener('click', showPrev);
    lb.querySelector('.lightbox__next').addEventListener('click', showNext);

    lb.addEventListener('click', function(e) {
      if (e.target === lb) closeLightbox();
    });

    document.addEventListener('keydown', function(e) {
      if (!lb.classList.contains('lightbox--open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    });
  })();

  /* ===== Mobile: show WhatsApp in nav menu ===== */
  (function() {
    var mq = window.matchMedia('(max-width: 980px)');
    var waDesktop = document.querySelector('.nav__whatsapp');
    var navMenu = document.getElementById('navMenu');
    if (!waDesktop || !navMenu) return;

    function update() {
      if (mq.matches) {
        // Add mobile WA link if not exists
        if (!navMenu.querySelector('.nav__link--wa-mobile')) {
          var a = document.createElement('a');
          a.href = 'https://wa.me/41764394928?text=Hallo%20Isa%2C%20ich%20m%C3%B6chte%20eine%20Anfrage%20stellen.';
          a.className = 'nav__link nav__link--wa-mobile';
          a.style.cssText = 'background:#25D366;color:#fff;text-align:center;margin-top:.75rem;border-radius:8px;padding:.75rem;font-weight:600;';
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
          a.textContent = '📱 Jetzt buchen via WhatsApp';
          navMenu.appendChild(a);
        }
      } else {
        var m = navMenu.querySelector('.nav__link--wa-mobile');
        if (m) m.remove();
      }
    }
    update();
    mq.addEventListener('change', update);
  })();

})();
