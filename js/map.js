'use strict';

window.map = (function () {
  window.general.setupListElement = document.querySelector('.map__pins');
  var ads = [];
  var filter = document.querySelector('.map__filters');
  var filterHouseType = filter.querySelector('#housing-type');
  var filterHousePrice = filter.querySelector('#housing-price');
  var filterHouseRooms = filter.querySelector('#housing-rooms');
  var filterHouseGuests = filter.querySelector('#housing-guests');
  var filterHouseFeatures = filter.querySelector('#housing-features');
  var featureCheckboxes = filterHouseFeatures.querySelectorAll('input[type="checkbox"]');
  var setAdsFilter = function () {
    var check = function (it) {
      var isAny = function (filterValue, offerValue) {
        if (filterValue !== 'any') {
          if (offerValue !== +(filterValue)) {
            return false;
          } else {
            return true;
          }
        } else {
          return true;
        }
      };

      isAny(filterHouseType.value, it.offer.type); // checks type of house
      isAny(filterHouseRooms.value, it.offer.rooms); // checks number of rooms in the house
      isAny(filterHouseGuests.value, it.offer.guests); // checks number of guests in the house

      switch (filterHousePrice.value) { // checks price of the house
        case 'low':
          if (it.offer.price > 10000) {
            return false;
          }
          break;
        case 'middle':
          if (it.offer.price < 10000 && it.offer.price > 50000) {
            return false;
          }
          break;
        case 'high':
          if (it.offer.price < 50000) {
            return false;
          }
          break;
        default:
          return true;
      }

      for (var x = 0; x < featureCheckboxes.length; x++) { // checks features
        if (featureCheckboxes[x].checked) {
          if (it.offer.features[x] !== featureCheckboxes[x]) {
            return false;
          } else {
            return true;
          }
        } else {
          return true;
        }
      }

      return true;
    };

    var checkedOffers = ads.filter(check);
    var uniquePins = checkedOffers.filter(function (it, i) {
      return checkedOffers.indexOf(it) === i;
    });
    var filteredOffers = uniquePins.slice(0, 5);

    window.render(filteredOffers);
  };

  var removePins = function () {
    var pins = document.querySelectorAll('.map__pin');
    for (var j = 0; j < pins.length; j++) {
      if (!pins[j].classList.contains('map__pin--main')) {
        pins[j].remove();
      }
    }
  };

  var successHandler = function (pins) {
    ads = pins;
    var mapFilters = document.querySelectorAll('.map__filter');
    for (var x = 0; x < mapFilters.length; x++) {
      mapFilters[x].addEventListener('change', function () {
        removePins();
        setAdsFilter();
      });
    }
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
