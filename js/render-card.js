'use strict';
// Function for rendering card of ad
window.renderCard = (function () {
  var mapCardTemplate = document.querySelector('#card-template').content.querySelector('.map__card');
  return {
    renderMapCard: function (arrayElement) {
      var mapCard = mapCardTemplate.cloneNode(true);

      mapCard.querySelector('h3').textContent = arrayElement.offer.title;
      mapCard.querySelector('p small').textContent = arrayElement.offer.address;
      mapCard.querySelector('.popup__price').textContent = arrayElement.offer.price + '₽/ночь';

      // Checks type of house
      var TYPES_OF_HOUSES = {
        'flat': 'Квартира',
        'bungalo': 'Бунгало',
        'house': 'Дом'
      };

      mapCard.querySelector('h4').textContent = TYPES_OF_HOUSES[arrayElement.offer.type];

      mapCard.querySelector('.popup__rooms-guests').textContent = arrayElement.offer.rooms + ' комн. для ' + arrayElement.offer.guests + ' гостей';
      mapCard.querySelector('.popup__checkin-checkout').textContent = 'Заезд после ' + arrayElement.offer.checkin + ', выезд до ' + arrayElement.offer.checkout;

      for (var l = 0; l < arrayElement.offer.features.length; l++) {
        var featuresList = mapCard.querySelector('.popup__features');
        var featureElement = document.createElement('li');
        featuresList.appendChild(featureElement);
        featureElement.classList.add('feature--' + arrayElement.offer.features[l]);
      }

      mapCard.querySelector('.popup__description').textContent = arrayElement.offer.description;
      mapCard.querySelector('.popup__avatar').src = arrayElement.author.avatar;

      var popupClose = mapCard.querySelector('.popup__close');

      popupClose.addEventListener('click', function () {
        window.clear.clearCard();
      });

      return mapCard;
    }
  };
})();
