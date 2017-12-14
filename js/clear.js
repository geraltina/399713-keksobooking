'use strict';
// Function for clearing card of ad
window.clear = (function () {
  var ESC_KEYCODE = 27;
  var onEscPress = document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      window.clear.clearCard();
    }
  });

  return {
    clearCard: function () {
      var mapCards = document.querySelectorAll('.map__card');
      var pinButtons = document.querySelectorAll('.map__pin');

      for (var h = 0; h < pinButtons.length; h++) {
        pinButtons[h].classList.remove('map__pin--active');
      }

      for (var m = 0; m < mapCards.length; m++) {
        window.data.map.removeChild(mapCards[m]);
      }

      document.removeEventListener('keydown', onEscPress);
    }
  };
})();
