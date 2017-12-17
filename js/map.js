'use strict';

window.map = (function () {
  window.data();

  var adsArray = window.data();
  for (var i = 0; i < adsArray.length; i++) {
    window.renderPins(adsArray[i]);
  }

  window.dragPin();
})();
