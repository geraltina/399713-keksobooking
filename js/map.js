'use strict';

window.map = (function () {
  var successHandler = function (pins) {
    var fragment = document.createDocumentFragment();
    var NUMBER_OF_ADS = 10;
    window.general.setupListElement = document.querySelector('.map__pins');

    for (var i = 0; i < NUMBER_OF_ADS; i++) {
      fragment.appendChild(window.renderPin(pins[i]));
    }

    window.general.setupListElement.appendChild(fragment); // inserts pins in markup
  };

  var errorHandler = function (errorMessage) {
    var popupError = document.querySelector('.popup-error');
    var popupClose = document.querySelector('.popup-error__close');
    var popupText = document.querySelector('.popup-error__text');
    popupError.classList.remove('visuallyhidden');
    popupText.textContent = errorMessage;
    popupClose.addEventListener('click', function () {
      popupError.classList.add('visuallyhidden');
    });
  };

  window.backend.load(successHandler, errorHandler);
  window.dragPin();
})();
