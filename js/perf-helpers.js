(function () {
  function onReady(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback);
    } else {
      callback();
    }
  }

  function enhanceImages() {
    // Auf Mobile: KEIN Lazy Loading für bessere Performance und keine Layout-Shifts
    if (window.innerWidth <= 991) {
      // Entferne lazy loading von allen Bildern auf Mobile
      var allImages = document.querySelectorAll('img[loading="lazy"]');
      allImages.forEach(function (img) {
        // Icons sollten nie lazy geladen werden (zu klein, verursachen Layout-Shifts)
        if (img.src.includes('icon') || img.closest('.service-item') || img.closest('.col-service')) {
          img.removeAttribute('loading');
        }
      });
      return; // Beende Funktion auf Mobile
    }
    
    // Desktop: Normales Lazy Loading
    var images = document.querySelectorAll('img:not([loading])');
    images.forEach(function (img) {
      if (img.closest('.brand-panel') || img.closest('.brand') || img.classList.contains('brand-logo')) {
        return;
      }
      // Icons nie lazy laden (zu klein, verursachen Layout-Shifts)
      if (img.src.includes('icon')) {
        return;
      }
      img.setAttribute('loading', 'lazy');
      img.setAttribute('decoding', 'async');
    });
  }

  onReady(function () {
    enhanceImages();
  });
})();

