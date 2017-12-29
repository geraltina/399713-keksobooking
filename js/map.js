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
          return String(offerValue) === filterValue;
        } else {
          return true;
        }
      };

      var result = true;
      result = result && isAny(filterHouseType.value, it.offer.type); // checks type of house
      result = result && isAny(filterHouseRooms.value, it.offer.rooms); // checks number of rooms in the house
      result = result && isAny(filterHouseGuests.value, it.offer.guests); // checks number of guests in the house

      var filterPrice = function () {
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
        }

        return true;
      };

      result = result && filterPrice();

      var isChecked = function () {
        for (var x = 0; x < featureCheckboxes.length; x++) { // checks features
          if (featureCheckboxes[x].checked) {
            if (!it.offer.features.includes(it.offer.features[x])) {
              return false;
            }
          }
        }
        return true;
      };

      result = result && isChecked();

      return result;
    };

    var checkedOffers = ads.filter(check);
    var filteredOffers = checkedOffers.slice(0, 5);

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

  var mapFilter = document.querySelector('.map__filters');
  mapFilter.addEventListener('change', function () {
    removePins(); // removes pins before filtering
    setAdsFilter(); // filters pins
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
