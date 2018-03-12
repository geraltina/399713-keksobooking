'use strict';

(function () {
  window.dragPin = (function () {
    var pinHandle = document.querySelector('.map__pin--main');
    pinHandle.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        var topCoords = window.general.mapPinMain.offsetTop - shift.y;
        var leftCoords = window.general.mapPinMain.offsetLeft - shift.x;

        if (topCoords > 100 && topCoords < 500 && leftCoords > 0 && leftCoords < 1200) {
          window.general.mapPinMain.style.top = topCoords + 'px';
          window.general.mapPinMain.style.left = leftCoords + 'px';
          window.general.accomodationAddress.value = 'x: ' + (leftCoords - 20) + ', y: ' + (topCoords + 44);
        }
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  })();
})();
