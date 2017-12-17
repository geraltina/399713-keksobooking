'use strict';

window.renderPins = function (arrElem) {
  var fragment = document.createDocumentFragment();
  window.general.setupListElement = document.querySelector('.map__pins');
  fragment.appendChild(window.renderPin(arrElem));
  window.general.setupListElement.appendChild(fragment); // inserts pins in markup
};
