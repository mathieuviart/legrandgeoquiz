// ─── ZOOM PREVENTION ONLY (Scrolling enabled) ────────────────────────────────
// Disable zoom gestures but allow normal scrolling

(function() {
  // 1. Prevent double-tap zoom — sans bloquer les clics légitimes
  var lastTouchEnd = 0;
  var lastTouchX   = 0;
  var lastTouchY   = 0;
  document.addEventListener('touchend', function(e) {
    var now = Date.now();
    var t   = e.changedTouches[0];
    var dx  = Math.abs(t.clientX - lastTouchX);
    var dy  = Math.abs(t.clientY - lastTouchY);
    // Double-tap détecté : même zone (<30px) en moins de 300ms
    if (now - lastTouchEnd <= 300 && dx < 30 && dy < 30) {
      e.preventDefault();
    }
    lastTouchEnd = now;
    lastTouchX   = t.clientX;
    lastTouchY   = t.clientY;
  }, { passive: false });

  // 2. Prevent pinch-to-zoom
  document.addEventListener('touchmove', function(e) {
    if (e.touches && e.touches.length > 1) {
      // Multiple fingers detected (pinch gesture), prevent zoom
      e.preventDefault();
    }
  }, { passive: false });

  // 3. Prevent zoom via keyboard (+ / - / 0)
  document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && 
        (e.key === '+' || e.key === '-' || e.key === '0' || e.key === '=' || e.key === '_')) {
      e.preventDefault();
    }
  });

  // 4. Disable pinch-zoom on mouse wheel (for desktop testing)
  document.addEventListener('wheel', function(e) {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
    }
  }, { passive: false });

  // 5. Clear any existing zoom level on load
  var metaViewport = document.querySelector('meta[name="viewport"]');
  if (metaViewport) {
    metaViewport.setAttribute('content', 
      'width=device-width, initial-scale=1.0, viewport-fit=cover, user-scalable=no, maximum-scale=1, minimum-scale=1'
    );
  }
})();
