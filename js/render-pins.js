'use strict';

window.renderPins = function (array) {
  var fragment = document.createDocumentFragment();
  window.general.setupListElement = document.querySelector('.map__pins');

  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(window.renderPin(array[i]));
  }

  window.general.setupListElement.appendChild(fragment); // inserts pins in markup
};
