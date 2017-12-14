'use strict';

window.formActivation = (function () {
  // Searching big red pin and all fieldsets of form
  var mapPinMain = document.querySelector('.map__pin--main');
  var noticeHeader = document.querySelector('.notice__header');
  var formElementTitle = document.querySelector('.form__element--title');
  var formElementAddress = document.querySelector('.form__element--address');
  var formElementType = document.querySelector('.form__element--type');
  var formElementPrice = document.querySelector('.form__element--price');
  var formElementTime = document.querySelector('.form__element--time');
  var formElementRooms = document.querySelector('.form__element--rooms');
  var formElementGuests = document.querySelector('.form__element--guests');
  var formElementFeatures = document.querySelector('.form__element--features');
  var formElementDescription = document.querySelector('.form__element--description');
  var formElementPhotos = document.querySelector('.form__element--photos');
  var formElementSubmit = document.querySelector('.form__element--submit');

  // Makes all fieldsets of form disabled
  noticeHeader.disabled = true;
  formElementTitle.disabled = true;
  formElementAddress.disabled = true;
  formElementType.disabled = true;
  formElementPrice.disabled = true;
  formElementTime.disabled = true;
  formElementRooms.disabled = true;
  formElementGuests.disabled = true;
  formElementFeatures.disabled = true;
  formElementDescription.disabled = true;
  formElementPhotos.disabled = true;
  formElementSubmit.disabled = true;

  // Once the big red pin is tapped - map and form are active
  mapPinMain.addEventListener('mouseup', function () {
    window.data.map.classList.remove('map--faded'); // shows map with ads
    window.data.noticeForm.classList.remove('notice__form--disabled'); // shows form
    noticeHeader.disabled = false;
    formElementTitle.disabled = false;
    formElementAddress.disabled = false;
    formElementType.disabled = false;
    formElementPrice.disabled = false;
    formElementTime.disabled = false;
    formElementRooms.disabled = false;
    formElementGuests.disabled = false;
    formElementFeatures.disabled = false;
    formElementDescription.disabled = false;
    formElementPhotos.disabled = false;
    formElementSubmit.disabled = false;
  });
})();
