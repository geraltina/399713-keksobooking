'use strict';

window.map = (function () {
  window.general.setupListElement = document.querySelector('.map__pins');
  var ads = [];
  var filter = document.querySelector('.map__filters');
  var filterHouseType = filter.querySelector('select[name="housing-type"]');
  var filterHousePrice = filter.querySelector('select[name="housing-price"]');
  var filterHouseRooms = filter.querySelector('select[name="housing-rooms"]');
  var filterHouseGuests = filter.querySelector('select[name="housing-guests"]');
  var filterHouseFeatures = filter.querySelector('#housing-features');
  var setAdsFilter = function () {
    var getHouseType = ads.filter(function (it) {
      return it.offer.type === filterHouseType.value;
    });
    var filteredPins = getHouseType;
    var uniquePins = filteredPins.filter(function (it, i) {
      return filteredPins.indexOf(it) === i;
    });
    window.render(uniquePins);
  };

  var changeTypeFilter = filterHouseType.addEventListener('change', function () {
    setAdsFilter();
  });

  var successHandler = function (pins) {
    ads = pins;
    setAdsFilter();
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
  window.general.noticeForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(window.general.noticeForm), function () {
      var popupSuccess = document.querySelector('.popup-success');
      var popupClose = document.querySelector('.popup-success__close');
      popupSuccess.classList.remove('visuallyhidden');
      popupClose.addEventListener('click', function () {
        popupSuccess.classList.add('visuallyhidden');
      });
    }, errorHandler);

    evt.preventDefault();
  });
  window.dragPin();
})();
