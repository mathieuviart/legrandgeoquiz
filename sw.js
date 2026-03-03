// ─── SERVICE WORKER — LeGrandGeoQuiz ─────────────────────────────────────────
// Stratégie : Cache First pour les assets statiques, Network First pour l'API Daily.
// iOS Safari (standalone) nécessite un SW pour fonctionner offline.

var CACHE_NAME = 'geoquiz-v1';

// Assets à précacher au moment de l'installation
var PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.svg',
  '/country.json',
  '/css/styles.css',
  '/js/game.js',
  '/js/game-end.js',
  '/js/daily.js',
  '/js/data.js',
  '/js/hints.js',
  '/js/mobile.js',
  '/js/ribbon.js',
  '/js/seed.js',
  '/js/setup.js',
  '/js/translations.js',
  '/js/ui-effects.js',
  '/js/utils.js',
  '/js/zoom-prevention.js'
];

// ── Install : précacher tous les assets du jeu ────────────────────────────────
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(PRECACHE_URLS);
    }).then(function() {
      // Activer immédiatement sans attendre la fermeture des onglets
      return self.skipWaiting();
    })
  );
});

// ── Activate : supprimer les anciens caches ───────────────────────────────────
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames
          .filter(function(name) { return name !== CACHE_NAME; })
          .map(function(name) { return caches.delete(name); })
      );
    }).then(function() {
      // Prendre le contrôle de tous les clients immédiatement
      return self.clients.claim();
    })
  );
});

// ── Fetch : stratégie hybride ─────────────────────────────────────────────────
self.addEventListener('fetch', function(event) {
  var url = event.request.url;

  // Network First pour les appels API Daily (toujours tenter le réseau)
  if (url.indexOf('/api/') !== -1) {
    event.respondWith(
      fetch(event.request).catch(function() {
        // Offline : retourner une réponse d'erreur JSON propre
        return new Response(
          JSON.stringify({ error: 'offline', played: false }),
          { headers: { 'Content-Type': 'application/json' } }
        );
      })
    );
    return;
  }

  // Cache First pour tous les assets du jeu
  event.respondWith(
    caches.match(event.request).then(function(cached) {
      if (cached) return cached;

      // Pas en cache : tenter le réseau puis mettre en cache
      return fetch(event.request).then(function(response) {
        // Ne cacher que les réponses valides
        if (!response || response.status !== 200 || response.type === 'opaque') {
          return response;
        }
        var toCache = response.clone();
        caches.open(CACHE_NAME).then(function(cache) {
          cache.put(event.request, toCache);
        });
        return response;
      }).catch(function() {
        // Fallback ultime offline : index.html pour les navigations
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
      });
    })
  );
});