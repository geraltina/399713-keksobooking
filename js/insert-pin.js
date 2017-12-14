'use strict';

window.insertPin = (function () {
  var fragment = document.createDocumentFragment();
  window.data.setupListElement = document.querySelector('.map__pins');

  for (var j = 0; j < window.data.ads.length; j++) {
    fragment.appendChild(window.renderPin(window.data.ads[j]));
  }

  window.data.setupListElement.appendChild(fragment); // inserts pins in markup
})();
