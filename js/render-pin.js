'use strict';

// Function for rendering pins with certain attributes on map
(function () {
  window.renderPin = function (pin) {
    var pinButton = document.createElement('button');
    pinButton.classList.add('map__pin');
    var pinImage = document.createElement('img');
    window.general.setupListElement.appendChild(pinButton);
    pinButton.appendChild(pinImage);

    pinImage.src = pin.author.avatar;
    pinImage.width = 40;
    pinImage.height = 40;
    pinImage.draggable = false;
    pinButton.style = 'left: ' + (pin.location.x - 20) + 'px; top: ' + (pin.location.y - 40) + 'px;';

    window.showCard(pinButton, pin);

    return pinButton;
  };
})();
