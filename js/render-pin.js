'use strict';

// Function for rendering pins with certain attributes on map
window.renderPin = (function () {
  var fragmentMapCard = document.createDocumentFragment();
  var filter = window.data.map.querySelector('.map__filters-container');

  return {
    makePin: function (arrayElement) {
      var pinButton = document.createElement('button');
      pinButton.classList.add('map__pin');
      var pinImage = document.createElement('img');
      window.setupListElement.appendChild(pinButton);
      pinButton.appendChild(pinImage);

      pinImage.src = arrayElement.author.avatar;
      pinImage.width = 40;
      pinImage.height = 40;
      pinImage.draggable = false;
      pinButton.style = 'left: ' + (arrayElement.location.x - 20) + 'px; top: ' + (arrayElement.location.y - 40) + 'px;';

      // Inserts card with ad in markup
      pinButton.addEventListener('click', function () {
        window.clear.clearCard();

        pinButton.classList.add('map__pin--active');

        fragmentMapCard.appendChild(window.renderCard.renderMapCard(arrayElement));
        window.data.map.insertBefore(fragmentMapCard, filter);
      });

      return pinButton;
    }
  };
})();

// Creates fragment with pins
var fragment = document.createDocumentFragment();
var setupListElement = document.querySelector('.map__pins');
for (var j = 0; j < window.data.ads.length; j++) {
  fragment.appendChild(window.renderPin.makePin(window.data.ads[j]));
}

setupListElement.appendChild(fragment); // inserts pins in markup
