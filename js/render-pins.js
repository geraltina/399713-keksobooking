'use strict';

window.renderPins = function () {
  var fragment = document.createDocumentFragment();
  window.general.setupListElement = document.querySelector('.map__pins');

  for (var j = 0; j < window.ads.length; j++) {
    fragment.appendChild(window.renderPin(window.ads[j]));
  }

  window.general.setupListElement.appendChild(fragment); // inserts pins in markup
};
