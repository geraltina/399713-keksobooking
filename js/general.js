'use strict';

// Creating arrays with advertisement datas
window.general = (function () {
  return {
    map: document.querySelector('.map'),
    noticeForm: document.querySelector('.notice__form'),
    setupListElement: document.querySelector('.map__pins'),
    mapPinMain: document.querySelector('.map__pin--main'),
    accomodationAddress: document.querySelector('#address')
  };
})();
