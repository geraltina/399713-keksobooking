'use strict';

(function () {
  window.form = (function (pins) {
    var fragment = document.createDocumentFragment();
    window.general.setupListElement = document.querySelector('.map__pins');

    for (var i = 0; i < pins.length; i++) {
      fragment.appendChild(window.renderPin(pins[i]));
    }

    window.general.setupListElement.appendChild(fragment); // inserts pins in markup
  })();
})();
