'use strict';

(function () {
  window.map = (function () {
    var ANY = 'any';
    var ads = [];
    var filter = document.querySelector('.map__filters');
    var filterHouseType = filter.querySelector('#housing-type');
    var filterHousePrice = filter.querySelector('#housing-price');
    var filterHouseRooms = filter.querySelector('#housing-rooms');
    var filterHouseGuests = filter.querySelector('#housing-guests');
    var filterHouseFeatures = filter.querySelector('#housing-features');
    window.general.setupListElement = document.querySelector('.map__pins');
    var featureCheckboxes = filterHouseFeatures.querySelectorAll('input[type="checkbox"]');
    var setAdsFilter = function () {
      var check = function (it) {

        // checks if some filter has 'any' value
        var isAny = function (filterValue, offerValue) {
          if (filterValue !== ANY) {
            return String(offerValue) === filterValue;
          } else {
            return true;
          }
        };

        // checks type of houses,
        // number of rooms in houses
        // number of guests in houses
        var result = true;
        result = result && isAny(filterHouseType.value, it.offer.type) &&
        isAny(filterHouseRooms.value, it.offer.rooms) &&
        isAny(filterHouseGuests.value, it.offer.guests);

        // checks price of houses
        var filterPrice = function () {
          switch (filterHousePrice.value) { // checks price of the house
            case 'low':
              if (it.offer.price > 10000) {
                return false;
              }
              break;
            case 'high':
              if (it.offer.price < 50000) {
                return false;
              }
              break;
            case 'middle':
              if (it.offer.price < 10000 || it.offer.price > 50000) {
                return false;
              }
              break;
          }

          return true;
        };

        result = result && filterPrice();

        // checks features in houses
        var isChecked = function () {
          var featureCheckboxesArr = Array.from(featureCheckboxes);
          for (var x = 0; x < featureCheckboxesArr.length; x++) { // checks features
            if (featureCheckboxesArr[x].checked) {
              if (!it.offer.features.includes(featureCheckboxesArr[x].value)) {
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
      window.render(checkedOffers);
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
      window.debounce(setAdsFilter); // filters pins after 500 ms
    });

    // if everything is successfully loaded - sets filters
    var onSuccess = function (pins) {
      ads = pins;
      setAdsFilter();
    };

    // if smth is wrong - shows error message
    var onError = function (errorMessage) {
      var popupError = document.querySelector('.popup-error');
      var popupClose = document.querySelector('.popup-error__close');
      var popupText = document.querySelector('.popup-error__text');
      popupError.classList.remove('visuallyhidden');
      popupText.textContent = errorMessage;
      popupClose.addEventListener('click', function () {
        popupError.classList.add('visuallyhidden');
      });
    };

    // loads pins or shows error message
    window.general.mapPinMain.addEventListener('mouseup', function () {
      window.backend.load(onSuccess, onError);
    });

    // saves form data after submit and shows success message
    window.general.noticeForm.addEventListener('submit', function (evt) {
      window.backend.save(new FormData(window.general.noticeForm), function () {
        var popupSuccess = document.querySelector('.popup-success');
        var popupClose = document.querySelector('.popup-success__close');
        popupSuccess.classList.remove('visuallyhidden');
        popupClose.addEventListener('click', function () {
          popupSuccess.classList.add('visuallyhidden');
        });
      }, onError);

      evt.preventDefault();
    });

    // allows drag red pin around the map
    window.dragPin();
  })();
})();
