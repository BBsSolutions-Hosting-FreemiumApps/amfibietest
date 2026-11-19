(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var jaar = document.getElementById('jaar');
  if (jaar) jaar.textContent = String(new Date().getFullYear());

  var header = document.getElementById('site-header');
  function onScroll() {
    if (!header) return;
    header.classList.toggle('header-scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var menuButton = document.getElementById('menu-button');
  var nav = document.getElementById('nav');
  if (menuButton && nav) {
    menuButton.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Menu sluiten' : 'Menu openen');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        nav.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
      }
    });
  }

  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav a[href^="#"]'));
  var sections = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);
  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }

  var revealEls = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  var MODALS = {
    particulier: {
      eyebrow: 'Particulier',
      title: 'Een uitje met de amfibie-auto',
      img: 'assets/img/card-particulier.webp',
      alt: 'Vier personen varen met de amfibie-auto Corazon over het water',
      text: [
        'Of je nu gaat trouwen of wat te vieren hebt, een ritje met deze amfibie-auto geeft je in elk geval een leuke en onvergetelijke ervaring.',
        'Enkele mogelijkheden: huwelijk, verjaardag, een bijzondere wens, fotoshoot of een rondvaart door een stad naar eigen keus. Zelf een idee? Stel het gerust voor — we verkennen graag in overleg de mogelijkheden.'
      ]
    },
    bedrijfsuitje: {
      eyebrow: 'Bedrijfsuitje',
      title: 'Bedrijfsuitje met de Corazon',
      img: 'assets/img/card-bedrijfsuitje.webp',
      alt: 'Een enthousiaste groep aan boord van de amfibie-auto op het water',
      text: [
        'Een originele manier om je collega in het zonnetje te zetten: als jubilaris, bij een aankondiging of productpresentatie, voor een fotoshoot of als rondvaart door de stad.',
        'De Corazon wordt uitsluitend inclusief chauffeur verhuurd en is ideaal voor kleine groepen.'
      ]
    },
    bruiloft: {
      eyebrow: 'Bruiloft',
      title: 'Trouwen met de Corazon',
      img: 'assets/img/card-bruiloft.webp',
      alt: 'Een bruidspaar in de amfibie-auto Corazon op het water',
      text: [
        'Je liefde bezegelen met een huwelijk is een hoogtepunt in je leven. Op deze dag is alles bijzonder — deze amfibie-auto maakt het nog specialer.',
        'Of het nu bij het stadhuis of bij de feestzaal is: je familie en vrienden zullen verrast opkijken als jullie vanuit het water het land oprijden.'
      ]
    }
  };

  var backdrop = document.getElementById('modal-backdrop');
  var modalImg = document.getElementById('modal-img');
  var modalEyebrow = document.getElementById('modal-eyebrow');
  var modalTitle = document.getElementById('modal-title');
  var modalText = document.getElementById('modal-text');
  var modalClose = document.getElementById('modal-close');
  var modalCta = document.getElementById('modal-cta');
  var lastFocus = null;

  function openModal(key) {
    var data = MODALS[key];
    if (!data || !backdrop) return;
    lastFocus = document.activeElement;
    modalImg.src = data.img;
    modalImg.alt = data.alt;
    modalEyebrow.textContent = data.eyebrow;
    modalTitle.textContent = data.title;
    modalText.innerHTML = '';
    data.text.forEach(function (p) {
      var el = document.createElement('p');
      el.textContent = p;
      modalText.appendChild(el);
    });
    backdrop.hidden = false;
    document.body.style.overflow = 'hidden';
    if (modalClose) modalClose.focus();
  }

  function closeModal() {
    if (!backdrop) return;
    backdrop.hidden = true;
    document.body.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  Array.prototype.forEach.call(document.querySelectorAll('[data-modal]'), function (btn) {
    btn.addEventListener('click', function () { openModal(btn.getAttribute('data-modal')); });
  });
  if (backdrop) {
    backdrop.addEventListener('click', function (e) { if (e.target === backdrop) closeModal(); });
  }
  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalCta) modalCta.addEventListener('click', closeModal);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && backdrop && !backdrop.hidden) closeModal();
  });

  var form = document.getElementById('aanvraag-form');
  var status = document.getElementById('form-status');
  if (form && status) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        status.textContent = 'Controleer de verplichte velden (naam, e-mail en bericht).';
        form.reportValidity();
        return;
      }
      status.textContent = 'Bedankt voor je aanvraag! We nemen zo snel mogelijk contact met je op om de mogelijkheden door te nemen.';
      form.reset();
    });
  }
})();
