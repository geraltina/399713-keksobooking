'use strict';

window.map = (function () {
  var adsArray = window.data();
  window.renderPins(adsArray);
  window.dragPin();
})();
