/* ─── PLANET LOADER ──────────────────────────────────────────────────────────
 * Indicateur de chargement non-bloquant en forme de planète.
 * Se remplit progressivement — cliquer affiche le détail des éléments chargés.
 * ─────────────────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  /* ── 1. Intercepteur fetch ───────────────────────────────────────────────── */
  var _origFetch = window.fetch;
  window.fetch = function (url) {
    var p = _origFetch.apply(this, arguments);
    if (typeof url === 'string') {
      if (url.indexOf('country.json') !== -1) {
        p.then(function () { LP.markDone('data'); })
         .catch(function () { LP.markDone('data'); });
      }
      if (url.indexOf('/api/played') !== -1 || url.indexOf('/api/seed') !== -1) {
        p.then(function () { LP.markDone('api'); })
         .catch(function () { LP.markDone('api'); });
      }
    }
    return p;
  };

  /* ── 2. État des items ───────────────────────────────────────────────────── */
  var ITEMS = {
    fonts: { label: '🔤', done: false, optional: false },
    emoji: { label: '🏳️', done: false, optional: false },
    data:  { label: '🌍', done: false, optional: false },
    sw:    { label: '⚙️', done: false, optional: true  },
    api:   { label: '🏆', done: false, optional: true  },
  };

  /* ── 3. Variables UI ─────────────────────────────────────────────────────── */
  var _pct       = 0;
  var _allDone   = false;
  var _panelOpen = false;

  /* ── 4. Création du DOM ──────────────────────────────────────────────────── */
  function createUI() {
    var style = document.createElement('style');
    style.textContent = [
      '#lp-wrap{',
        'position:fixed;bottom:14px;left:14px;z-index:9500;',
        'display:flex;flex-direction:column-reverse;align-items:flex-start;gap:6px;',
        'pointer-events:none;',
      '}',
      '#lp-btn{',
        'width:44px;height:44px;cursor:pointer;pointer-events:all;',
        'border:none;background:none;padding:0;position:relative;',
        'outline:none;',
        'transition:transform 0.2s ease,opacity 0.5s ease;',
      '}',
      '#lp-btn:hover{transform:scale(1.12);}',
      '#lp-btn:focus{outline:none;}',
      '#lp-btn.lp-loading{animation:lpPulse 2.4s ease-in-out infinite;}',
      '#lp-btn.lp-done{animation:lpBoom 0.5s cubic-bezier(.34,1.56,.64,1) both;}',
      '#lp-pct-lbl{',
        'position:absolute;bottom:-16px;left:50%;transform:translateX(-50%);',
        'font-family:"DM Mono",monospace;font-size:0.52em;letter-spacing:.04em;',
        'color:#606880;white-space:nowrap;pointer-events:none;',
        'transition:color 0.4s;',
      '}',
      '#lp-btn.lp-done #lp-pct-lbl{color:#4fffb0;}',
      '#lp-panel{',
        'background:#161920;border:1px solid #2a2f42;border-radius:12px;',
        'padding:12px 16px;min-width:180px;pointer-events:all;',
        'box-shadow:0 8px 32px rgba(0,0,0,0.5);display:none;',
        'animation:lpSlideUp 0.25s cubic-bezier(.2,.9,.2,1) both;',
      '}',
      '.lp-row{',
        'display:flex;align-items:center;gap:8px;padding:5px 0;',
        'border-bottom:1px solid #1e2230;font-family:"DM Mono",monospace;font-size:0.8em;',
        'color:#606880;transition:color 0.3s;',
      '}',
      '.lp-row:last-child{border-bottom:none;}',
      '.lp-row.lp-done-row{color:#e8ecf5;}',
      '.lp-check{width:16px;text-align:center;font-size:0.9em;flex-shrink:0;transition:color 0.3s;}',
      '.lp-row.lp-done-row .lp-check{color:#4fffb0;}',
      '.lp-lbl{flex:1;line-height:1.4;}',
      '.lp-opt{font-size:0.75em;opacity:0.35;flex-shrink:0;}',
      '#lp-bar-wrap{margin-top:10px;height:4px;background:#1e2230;border-radius:99px;overflow:hidden;}',
      '#lp-bar-fill{height:100%;border-radius:99px;background:#4fffb0;width:0%;transition:width 0.4s ease,background 0.4s ease;}',
      '@keyframes lpPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}',
      '@keyframes lpBoom{0%{transform:scale(0.8)}60%{transform:scale(1.15)}100%{transform:scale(1)}}',
      '@keyframes lpSlideUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}',
      '@media(max-width:540px){',
        '#lp-btn{width:36px;height:36px;}',
        '#lp-panel{min-width:160px;padding:10px 12px;}',
        '#lp-wrap{bottom:10px;left:10px;}',
      '}',
    ].join('');
    document.head.appendChild(style);

    var wrap = document.createElement('div');
    wrap.id = 'lp-wrap';

    /* Panneau de détail */
    var panel = document.createElement('div');
    panel.id = 'lp-panel';

    Object.keys(ITEMS).forEach(function (k) {
      var row = document.createElement('div');
      row.className = 'lp-row';
      row.id = 'lp-row-' + k;
      row.innerHTML =
        '<span class="lp-check" id="lp-chk-' + k + '">○</span>' +
        '<span class="lp-lbl">' + ITEMS[k].label + '</span>' +
        (ITEMS[k].optional ? '<span class="lp-opt">✦</span>' : '');
      panel.appendChild(row);
    });

    var barWrap = document.createElement('div');
    barWrap.id = 'lp-bar-wrap';
    var barFill = document.createElement('div');
    barFill.id = 'lp-bar-fill';
    barWrap.appendChild(barFill);
    panel.appendChild(barWrap);

    /* Bouton planète SVG */
    var btn = document.createElement('button');
    btn.id = 'lp-btn';
    btn.className = 'lp-loading';
    btn.setAttribute('aria-label', '🪐');
    btn.innerHTML =
      '<svg viewBox="0 0 44 44" width="44" height="44" xmlns="http://www.w3.org/2000/svg">' +
        '<defs>' +
          '<clipPath id="lp-clip"><circle cx="22" cy="22" r="16"/></clipPath>' +
        '</defs>' +
        /* Corps sombre */
        '<circle cx="22" cy="22" r="16" fill="#0d1117"/>' +
        /* Remplissage liquide */
        '<rect id="lp-fill-a" x="6" y="39" width="32" height="32" fill="#ff4f7b" clip-path="url(#lp-clip)" opacity="0.9"/>' +
        '<rect id="lp-fill-b" x="6" y="40.5" width="32" height="32" fill="#ff4f7b" clip-path="url(#lp-clip)" opacity="0.5"/>' +
        /* Reflet doux */
        '<ellipse cx="17" cy="16" rx="5" ry="3" fill="white" opacity="0.06"/>' +
        /* Anneau de la planète */
        '<ellipse cx="22" cy="22" rx="21" ry="6" fill="none" stroke="#2a2f42" stroke-width="2.5"/>' +
        /* Arc de progression externe */
        '<circle id="lp-arc" cx="22" cy="22" r="20" fill="none" stroke="#4fffb0" stroke-width="1.5"' +
          ' stroke-dasharray="0 125.7" stroke-linecap="round"' +
          ' transform="rotate(-90 22 22)"/>' +
        /* Bordure planète */
        '<circle cx="22" cy="22" r="16" fill="none" stroke="#2a2f42" stroke-width="1"/>' +
        /* Label % */
        '<text id="lp-pct-lbl" x="22" y="27" text-anchor="middle"' +
          ' font-family="DM Mono,monospace" font-size="7" fill="#606880">0%</text>' +
      '</svg>';

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      _panelOpen = !_panelOpen;
      panel.style.display = _panelOpen ? 'block' : 'none';
    });

    document.addEventListener('click', function () {
      if (_panelOpen) {
        _panelOpen = false;
        panel.style.display = 'none';
      }
    });

    wrap.appendChild(panel);
    wrap.appendChild(btn);
    document.body.appendChild(wrap);
  }

  /* ── 5. Calcul du pourcentage ────────────────────────────────────────────── */
  function calcPct() {
    var reqKeys = Object.keys(ITEMS).filter(function (k) { return !ITEMS[k].optional; });
    var optKeys = Object.keys(ITEMS).filter(function (k) { return  ITEMS[k].optional; });
    var reqDone = reqKeys.filter(function (k) { return ITEMS[k].done; }).length;
    var optDone = optKeys.filter(function (k) { return ITEMS[k].done; }).length;
    var reqPct  = reqKeys.length > 0 ? (reqDone / reqKeys.length) * 80 : 80;
    var optPct  = optKeys.length > 0 ? (optDone / optKeys.length) * 20 : 20;
    return Math.round(reqPct + optPct);
  }

  /* ── 6. Mise à jour visuelle ─────────────────────────────────────────────── */
  function updateUI() {
    var fillA   = document.getElementById('lp-fill-a');
    var fillB   = document.getElementById('lp-fill-b');
    var arc     = document.getElementById('lp-arc');
    var pctLbl  = document.getElementById('lp-pct-lbl');
    var barFill = document.getElementById('lp-bar-fill');
    if (!fillA || !arc) return;

    var color = _pct < 40 ? '#ff4f7b' : _pct < 75 ? '#ffb34f' : '#4fffb0';

    /* Remplissage liquide : y de 39 (vide) → 5 (plein), range = 34px */
    var fillY = 39 - (_pct / 100) * 34;
    fillA.setAttribute('y', fillY.toFixed(1));
    fillB.setAttribute('y', (fillY + 1.5).toFixed(1));
    fillA.setAttribute('fill', color);
    fillB.setAttribute('fill', color);

    /* Arc externe : circonférence ≈ 2π×20 ≈ 125.7 */
    var circ  = 2 * Math.PI * 20;
    var drawn = (_pct / 100) * circ;
    arc.setAttribute('stroke-dasharray', drawn.toFixed(1) + ' ' + circ.toFixed(1));
    arc.setAttribute('stroke', color);

    if (pctLbl) pctLbl.textContent = _pct + '%';
    if (barFill) {
      barFill.style.width      = _pct + '%';
      barFill.style.background = color;
    }
  }

  /* ── 7. Marquer un item comme terminé ───────────────────────────────────── */
  var LP = window._LP = {
    markDone: function (key) {
      if (!ITEMS[key] || ITEMS[key].done) return;
      ITEMS[key].done = true;
      _pct = calcPct();

      var row = document.getElementById('lp-row-' + key);
      var chk = document.getElementById('lp-chk-' + key);
      if (row) row.classList.add('lp-done-row');
      if (chk) chk.textContent = '✓';

      updateUI();
      checkAllDone();
    }
  };

  /* ── 8. Vérifier si tout est chargé ─────────────────────────────────────── */
  function checkAllDone() {
    var reqKeys  = Object.keys(ITEMS).filter(function (k) { return !ITEMS[k].optional; });
    var allReady = reqKeys.every(function (k) { return ITEMS[k].done; });
    if (!allReady || _allDone) return;

    _allDone = true;
    _pct = 100;
    updateUI();

    var btn = document.getElementById('lp-btn');
    if (btn) {
      btn.classList.remove('lp-loading');
      btn.classList.add('lp-done');
      btn.setAttribute('aria-label', '✅');
    }

    /* Auto-masquage après 8 secondes */
    setTimeout(function () {
      var wrap = document.getElementById('lp-wrap');
      if (wrap) {
        wrap.style.transition = 'opacity 0.6s ease';
        wrap.style.opacity    = '0';
        setTimeout(function () { if (wrap) wrap.style.display = 'none'; }, 650);
      }
    }, 8000);
  }

  /* ── 9. Suivi des différents éléments ───────────────────────────────────── */
  function trackFonts() {
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () { LP.markDone('fonts'); });
    } else {
      var t = setTimeout(function () { LP.markDone('fonts'); }, 3000);
      document.addEventListener('DOMContentLoaded', function () {
        clearTimeout(t);
        LP.markDone('fonts');
      });
    }
  }

  function trackTwemoji() {
    var attempts = 0;
    function check() {
      if (typeof twemoji !== 'undefined') {
        LP.markDone('emoji');
        return;
      }
      if (++attempts < 60) setTimeout(check, 200);
      else LP.markDone('emoji'); /* abandon après 12s */
    }
    check();
  }

  function trackSW() {
    if (!('serviceWorker' in navigator)) { LP.markDone('sw'); return; }
    var _swDone = false;
    function done() {
      if (_swDone) return;
      _swDone = true;
      LP.markDone('sw');
    }
    window.addEventListener('load', function () {
      navigator.serviceWorker.getRegistration().then(done).catch(done);
      setTimeout(done, 6000);
    });
  }

  function trackAPITimeout() {
    /* Si l'API ne répond pas en 10s, on la marque quand même (optionnel) */
    setTimeout(function () { LP.markDone('api'); }, 10000);
  }

  /* ── 10. Initialisation ──────────────────────────────────────────────────── */
  function init() {
    function start() {
      createUI();
      trackFonts();
      trackTwemoji();
      trackSW();
      trackAPITimeout();
    }
    if (document.body) start();
    else document.addEventListener('DOMContentLoaded', start);
  }

  init();

})();
