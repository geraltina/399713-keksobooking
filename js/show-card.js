'use strict';

window.showCard = function (pin, elem) {
  var fragmentMapCard = document.createDocumentFragment();
  var filter = window.general.map.querySelector('.map__filters-container');

  // Inserts card with ad in markup
  pin.addEventListener('click', function () {
    window.clear.clearCard();

    pin.classList.add('map__pin--active');

    fragmentMapCard.appendChild(window.renderCard.renderMapCard(elem));
    window.general.map.insertBefore(fragmentMapCard, filter);
  });
};
