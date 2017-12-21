'use strict';

window.form = (function () {
  var arrivalTime = window.general.noticeForm.querySelector('#timein');
  var leavingTime = window.general.noticeForm.querySelector('#timeout');
  var accomodationTitle = window.general.noticeForm.querySelector('#title');
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

  // Changes price depending on accomodation type
  accomodationType.addEventListener('change', function () {
    accomodationPrice.value = accomodationPrices[accomodationType.value];
  });

  // Changes first selected option
  // when second selected option is changed -
  // and vice versa
  var syncValues = function (selectOne, selectTwo, arrayOne, arrayTwo) {
    for (var x = 0; x < selectOne.options.length; x++) {
      var elemOne = arrayOne[x];
      var elemTwo = arrayTwo[x];
      selectTwo.selectedIndex = arrayTwo.indexOf(elemTwo);
      selectOne.selectedIndex = arrayOne.indexOf(elemOne);
      selectOne.addEventListener('change', function () {
        selectTwo.selectedIndex = selectOne.selectedIndex;
      });

      selectTwo.addEventListener('change', function () {
        selectOne.selectedIndex = selectTwo.selectedIndex;
      });
    }
  };

  window.synchronizeFields(arrivalTime, leavingTime, ['12', '13', '14'], ['12', '13', '14'], syncValues);

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
  var syncMinValue = function (selectOne, selectTwo, arrayOne, arrayTwo) {
    for (var y = 0; y < selectOne.options.length; y++) {
      if (selectOne.value === arrayOne[y]) {
        selectTwo.min = arrayTwo[y];
      }
    }
  };

  // Checks value in the price field
  // makes its border red if value is too big or too small
  accomodationPrice.addEventListener('change', function () {
    window.synchronizeFields(accomodationType, accomodationPrice, ['flat', 'bungalo', 'house', 'palace'], ['1000', '0', '5000', '10000'], syncMinValue);

    if (accomodationPrice.validity.rangeUnderflow || accomodationPrice.validity.rangeOverflow) {
      accomodationPrice.style.borderColor = '#ff6d51';
    } else {
      accomodationPrice.style.borderColor = '#d9d9d3';
    }
  });

  // Checks if all text inputs are filled
  var inputs = document.querySelectorAll('input[type="text"]');
  for (var j = 0; j < inputs.length; j++) {
    var inputsValidity = function () {
      if (!inputs[j].validity.valid) {
        inputs[j].style.borderColor = '#ff6d51';
      } else {
        inputs[j].style.borderColor = '#d9d9d3';
      }
    };
  }

  var validity = function () {
    accomodationTitle.addEventListener('change', function () {
      if (!accomodationTitle.validity.valid) {
        accomodationTitle.style.borderColor = '#ff6d51';
      } else {
        accomodationTitle.style.borderColor = '#d9d9d3';
      }
    });

    window.general.accomodationAddress.addEventListener('change', function () {
      if (!window.general.accomodationAddress.validity.valid) {
        window.general.accomodationAddress.style.borderColor = '#ff6d51';
      } else {
        window.general.accomodationAddress.style.borderColor = '#d9d9d3';
      }
    });
  };

  validity();

  window.general.noticeForm.addEventListener('submit', inputsValidity);
})();
