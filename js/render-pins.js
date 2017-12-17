'use strict';

window.renderPins = function () {
  var fragment = document.createDocumentFragment();
  var adsArray = window.data();
  window.general.setupListElement = document.querySelector('.map__pins');

  for (var i = 0; i < adsArray.length; i++) {
    fragment.appendChild(window.renderPin(adsArray[i]));
  }

  window.general.setupListElement.appendChild(fragment); // inserts pins in markup
};
