'use strict';

window.form = (function () {
  var arrivalTime = window.general.noticeForm.querySelector('#timein');
  var leavingTime = window.general.noticeForm.querySelector('#timeout');
  var accomodationType = window.general.noticeForm.querySelector('#type');
  var accomodationPrice = window.general.noticeForm.querySelector('#price');
  var accomodationPrices = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };
  var roomNumber = window.general.noticeForm.querySelector('#room_number');
  var capacity = window.general.noticeForm.querySelector('#capacity');

  // Makes field available for reading only
  window.general.accomodationAddress.style.pointerEvents = 'none';

  // Changes price depending on accomodation type
  accomodationType.addEventListener('change', function () {
    accomodationPrice.value = accomodationPrices[accomodationType.value];
  });

  // Changes first selected option
  // when second selected option is changed -
  // and vice versa
  var fieldChange = function () {
    arrivalTime.addEventListener('change', function () {
      leavingTime.selectedIndex = arrivalTime.selectedIndex;
    });

    leavingTime.addEventListener('change', function () {
      arrivalTime.selectedIndex = leavingTime.selectedIndex;
    });
  };

  fieldChange();

  // Sets available options in select with number of guests
  var onRoomChange = function () {
    for (var i = 0; i < roomNumber.length; i++) {
      capacity.options[i].disabled = false;
    }

    // if there's 1 room, only one guest can be there
    // if there're 2 rooms, one or two guests can be there
    // if there're 3 rooms, one, two or three guests can be there
    // if there're 100 rooms, this house is not for guests at all
    if (roomNumber.options[0].selected) {
      capacity.options[0].disabled = true;
      capacity.options[1].disabled = true;
      capacity.options[3].disabled = true;

      capacity.options[2]. selected = true;
    } else if (roomNumber.options[1].selected) {
      capacity.options[0].disabled = true;
      capacity.options[3].disabled = true;

      capacity.options[1]. selected = true;
    } else if (roomNumber.options[2].selected) {
      capacity.options[3].disabled = true;

      capacity.options[0]. selected = true;
    } else if (roomNumber.options[3].selected) {
      capacity.options[0].disabled = true;
      capacity.options[1].disabled = true;
      capacity.options[2].disabled = true;

      capacity.options[3]. selected = true;
    }
  };

  window.addEventListener('load', onRoomChange);
  roomNumber.addEventListener('change', onRoomChange);

  // Sets min and max values for price input
  var getMinMaxValue = function () {
    if (accomodationType.value === 'bungalo') {
      accomodationPrice.min = 0;
      accomodationPrice.max = 999;
    } else if (accomodationType.value === 'flat') {
      accomodationPrice.min = 1000;
      accomodationPrice.max = 4999;
    } else if (accomodationType.value === 'house') {
      accomodationPrice.min = 5000;
      accomodationPrice.max = 9999;
    } else {
      accomodationPrice.min = 10000;
      accomodationPrice.max = 1000000;
    }
  };

  // Checks value in the price field
  // makes its border red if value is too big or too small
  accomodationPrice.addEventListener('invalid', function () {
    getMinMaxValue();

    if (accomodationPrice.validity.rangeUnderflow || accomodationPrice.validity.rangeOverflow) {
      accomodationPrice.style.borderColor = '#ff6d51';
    } else {
      accomodationPrice.style.borderColor = '#d9d9d3';
    }
  });

  // Checks if all text inputs are filled
  var inputs = document.querySelectorAll('input[type="text"]');
  var validity = function () {
    for (var j = 0; j < inputs.length; j++) {
      if (!inputs[j].valid) {
        inputs[j].style.borderColor = '#ff6d51';
      }
    }
  };

  validity();

  window.general.noticeForm.addEventListener('submit', validity);
})();
