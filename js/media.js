(function () {
  'use strict';

  /* ===== BEHEER: categorieën en video's (alleen Ben wijzigt dit blok) ===== */
  var CATEGORIEEN = [
    'kinderfeestje', 'eiland', 'evenement', 'festival',
    'amfibievoertuig', 'huwelijk', 'custom-cruise', 'vrijland', 'vip-car'
  ];

  var LABELS = {
    'kinderfeestje': 'Kinderfeestje',
    'eiland': 'Eiland',
    'evenement': 'Evenement',
    'festival': 'Festival',
    'amfibievoertuig': 'Amfibievoertuig',
    'huwelijk': 'Huwelijk',
    'custom-cruise': 'Custom-cruise',
    'vrijland': 'Vrijland',
    'vip-car': 'VIP-car'
  };

  var VIDEOS = [
    { yt: '7MMhwclSSr8', titel: "3 amfibie-auto's in Amsterdam (2024)", cats: ['evenement', 'festival', 'amfibievoertuig'] },
    { yt: '8Qzvr5p8qB4', titel: 'Going back into the water', cats: ['amfibievoertuig'] },
    { yt: 'rqYOnAaEsIo', titel: 'Dutton Commander gaat aan land op het eiland', cats: ['amfibievoertuig', 'eiland'] },
    { yt: 'se3sXRRHuFc', titel: 'De Vlerk Amphitours — RTL Plezier en Passie', cats: ['amfibievoertuig'] },
    { yt: '66FNBCt3vU8', titel: 'RTL: De Vlerk Amphitours', cats: ['amfibievoertuig'] },
    { yt: 'Xf79jIw8xGQ', titel: 'Varen met de amfibie-auto', cats: ['amfibievoertuig'] },
    { yt: 'mMHAjR47O7c', titel: 'DTRH 2018 — campingtour met amfibie-auto (zaterdag)', cats: ['evenement', 'festival'] },
    { yt: 'ySIS7qNXCKI', titel: 'DTRH 2018 — campingtour met amfibie-auto (zondag)', cats: ['evenement', 'festival'] },
    { yt: 'brOH9iKgud0', titel: 'Op stap met de amfibie-auto', cats: ['amfibievoertuig'] },
    { yt: 'mYTJJTB7JKw', titel: 'Onderweg met de amfibie-auto', cats: ['amfibievoertuig'] },
    { yt: '713y0p2gyg4', titel: 'Voor MP', cats: ['amfibievoertuig'] },
    { yt: 'eGDXijliCb0', titel: 'De Vlerk, het water in bij Maasbommel', cats: ['amfibievoertuig'] },
    { yt: 'xvKCHcqBtFs', titel: 'Amfibievoertuig de Corazon te water', cats: ['amfibievoertuig'] },
    { yt: 'mspV-22vtfM', titel: 'Huwelijksbootje', cats: ['huwelijk'] },
    { yt: '_HQED1aoi_w', titel: 'Amfibievoertuig de Corazon', cats: ['amfibievoertuig'] },
    { yt: 'BL3Ux8tmJyc', titel: 'Amfibievoertuig de Corazon te land', cats: ['amfibievoertuig'] },
    { yt: '7-Vp-TO2NQc', titel: 'Zo weer het land op!', cats: ['amfibievoertuig'] },
    { yt: '_aqThJ9tPrs', titel: 'Origineel huwelijksbootje!', cats: ['huwelijk'] },
    { yt: '_UrXoYcq7u0', titel: 'Hij drijft', cats: ['amfibievoertuig'] },
    { yt: 'hzihlHnei0E', titel: 'Landing met de Dutton Commander', cats: ['amfibievoertuig', 'eiland'] },
    { yt: 'aDd0waSis_w', titel: 'Te water', cats: ['amfibievoertuig'] }
  ];
  /* ===== EINDE BEHEER ===== */

  var chipsWrap = document.getElementById('filter-chips');
  var grid = document.getElementById('video-grid');
  var empty = document.getElementById('video-empty');
  if (!chipsWrap || !grid) return;

  var actief = 'alles';
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function label(cat) {
    return LABELS[cat] || cat.charAt(0).toUpperCase() + cat.slice(1).replace(/-/g, ' ');
  }

  function countVoor(cat) {
    if (cat === 'alles') return VIDEOS.length;
    return VIDEOS.filter(function (v) { return v.cats.indexOf(cat) !== -1; }).length;
  }

  function afspeelbaar(card, item) {
    var btn = card.querySelector('.media-card__play');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var frame = btn.closest('.media-card__frame');
      var iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube-nocookie.com/embed/' + item.yt + '?autoplay=1&rel=0';
      iframe.title = item.titel;
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.allowFullscreen = true;
      btn.remove();
      frame.appendChild(iframe);
    });
  }

  VIDEOS.forEach(function (item) {
    var card = document.createElement('article');
    card.className = 'media-card';
    card.dataset.cats = item.cats.join(' ');
    card.innerHTML =
      '<div class="media-card__frame">' +
        '<img class="media-card__img" src="https://i.ytimg.com/vi/' + item.yt + '/hqdefault.jpg" alt="Videovoorbeeld: ' + item.titel + '" width="480" height="270" loading="lazy" decoding="async" />' +
        '<button class="media-card__play" type="button" data-yt="' + item.yt + '" aria-label="Video afspelen: ' + item.titel + '">' +
          '<svg viewBox="0 0 60 42" aria-hidden="true"><path d="M0 8a8 8 0 0 1 8-8h44a8 8 0 0 1 8 8v26a8 8 0 0 1-8 8H8a8 8 0 0 1-8-8Z" fill="#e02b20"/><path d="M22 11.5 45 21 22 30.5Z" fill="#fff"/></svg>' +
        '</button>' +
      '</div>' +
      '<div class="media-card__body">' +
        '<h3 class="media-card__title">' + item.titel + '</h3>' +
        '<span class="media-card__tag">' + item.cats.map(label).join(', ') + '</span>' +
      '</div>';
    afspeelbaar(card, item);
    grid.appendChild(card);
  });

  var cards = Array.prototype.slice.call(grid.querySelectorAll('.media-card'));

  function pasFilterToe() {
    var zichtbaar = 0;
    cards.forEach(function (card) {
      var match = actief === 'alles' || card.dataset.cats.split(' ').indexOf(actief) !== -1;
      card.classList.toggle('is-hidden', !match);
      card.classList.remove('is-shown');
      if (match) {
        zichtbaar += 1;
        if (!reduceMotion) {
          void card.offsetWidth;
          card.classList.add('is-shown');
        }
      }
    });
    if (empty) empty.classList.toggle('is-visible', zichtbaar === 0);
  }

  function maakChip(cat, naam) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'chip';
    btn.setAttribute('aria-pressed', cat === actief ? 'true' : 'false');
    btn.innerHTML = naam + ' <span class="chip__count">' + countVoor(cat) + '</span>';
    btn.addEventListener('click', function () {
      actief = cat;
      Array.prototype.forEach.call(chipsWrap.querySelectorAll('.chip'), function (c) {
        c.setAttribute('aria-pressed', c === btn ? 'true' : 'false');
      });
      pasFilterToe();
    });
    chipsWrap.appendChild(btn);
  }

  maakChip('alles', 'Alles');
  CATEGORIEEN.forEach(function (cat) { maakChip(cat, label(cat)); });
  pasFilterToe();
})();
