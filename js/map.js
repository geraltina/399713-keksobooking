'use strict';

window.map = (function () {
  var successHandler = function () {
    var adsArray = window.data();
    var fragment = document.createDocumentFragment();
    window.general.setupListElement = document.querySelector('.map__pins');

    for (var i = 0; i < adsArray.length; i++) {
      fragment.appendChild(window.renderPin(adsArray[i]));
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
