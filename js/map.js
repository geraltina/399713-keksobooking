'use strict';

window.map = (function () {
  window.data();

  for (var i = 0; i < window.ads.length; i++) {
    window.renderPins(window.ads[i]);
  }

  window.dragPin();
})();
