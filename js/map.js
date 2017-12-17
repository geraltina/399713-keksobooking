'use strict';

window.map = (function () {
  window.data();

  for (var i = 0; i < window.data().length; i++) {
    window.renderPins(window.data()[i]);
  }

  window.dragPin();
})();
