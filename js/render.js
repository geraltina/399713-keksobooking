'use strict';

window.render = function (pins) {
  var fragment = document.createDocumentFragment();
  var adsNumber = pins.length > 5 ? 5 : pins.length;
  for (var i = 0; i < adsNumber; i++) {
    if (fragment.firstChild) {
      fragment.removeChild(window.renderPin(pins[i]));
    } else {
      fragment.appendChild(window.renderPin(pins[i]));
    }
  }
  window.general.setupListElement.appendChild(fragment); // inserts pins in markup
};
