'use strict';

var ESC_KEYCODE = 27;

// Finding map, creating arrays with initial datas
var HOUSES = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var HOUSE_TYPES = [
  'flat',
  'house',
  'bungalo'
];
var TIMES = [
  '12:00',
  '13:00',
  '14:00'
];
var PLACE_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var map = document.querySelector('.map');
var mapCards = document.querySelectorAll('.map__card');
var fragmentMapCard = document.createDocumentFragment();
var setupListElement = document.querySelector('.map__pins');
var filter = map.querySelector('.map__filters-container');
var mapCardTemplate = document.querySelector('#card-template').content.querySelector('.map__card');
var placeFeaturesLength = PLACE_FEATURES.length;

// Searching big red pin and all fieldsets of form
var mapPinMain = document.querySelector('.map__pin--main');
var noticeForm = document.querySelector('.notice__form');
var noticeHeader = noticeForm.querySelector('.notice__header');
var formElementTitle = noticeForm.querySelector('.form__element--title');
var formElementAddress = noticeForm.querySelector('.form__element--address');
var formElementType = noticeForm.querySelector('.form__element--type');
var formElementPrice = noticeForm.querySelector('.form__element--price');
var formElementTime = noticeForm.querySelector('.form__element--time');
var formElementRooms = noticeForm.querySelector('.form__element--rooms');
var formElementGuests = noticeForm.querySelector('.form__element--guests');
var formElementFeatures = noticeForm.querySelector('.form__element--features');
var formElementDescription = noticeForm.querySelector('.form__element--description');
var formElementPhotos = noticeForm.querySelector('.form__element--photos');
var formElementSubmit = noticeForm.querySelector('.form__element--submit');

// Creating functions for getting random values
var getRandomArrayIndex = function (array) { // random index
  return Math.floor(Math.random() * array.length);
};

var getRandomArrayWord = function (array) { // random word from array
  return array[getRandomArrayIndex(array)];
};
var getRandomNumber = function (min, max) { // random number from min to max
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getElementsNumber = function () { // random sum of elements from PLACE_FEATURES array
  return getRandomNumber(0, placeFeaturesLength);
};

var getRandomFeatures = function () { // random features for ads.offer.features from PLACE_FEATURES array
  var randomNumber = getElementsNumber();
  var features = [];
  while (features.length < randomNumber) {
    var randomElement = getRandomArrayWord(PLACE_FEATURES);
    if (features.includes(randomElement) === false) {
      features.push(randomElement);
    }
  }
  return features;
};

// Function for clearing card of ad
var onEscPress = document.addEventListener('keydown', function (event) {
  if (event.keyCode === ESC_KEYCODE) {
    clearCard();
  }
});

var clearCard = function () {
  mapCards = document.querySelectorAll('.map__card');
  var pinButtons = document.querySelectorAll('.map__pin');

  for (var h = 0; h < pinButtons.length; h++) {
    pinButtons[h].classList.remove('map__pin--active');
  }

  for (var m = 0; m < mapCards.length; m++) {
    map.removeChild(mapCards[m]);
  }

  document.removeEventListener('keydown', onEscPress);
};

// Function for rendering pins with certain attributes on map
var renderPin = function (arrayElement) {
  var pinButton = document.createElement('button');
  pinButton.classList.add('map__pin');
  var pinImage = document.createElement('img');
  setupListElement.appendChild(pinButton);
  pinButton.appendChild(pinImage);

  pinImage.src = arrayElement.author.avatar;
  pinImage.width = 40;
  pinImage.height = 40;
  pinImage.draggable = false;
  pinButton.style = 'left: ' + (arrayElement.location.x - 20) + 'px; top: ' + (arrayElement.location.y - 40) + 'px;';

  // Inserts card with ad in markup
  pinButton.addEventListener('click', function () {
    clearCard();

    pinButton.classList.add('map__pin--active');

    fragmentMapCard.appendChild(renderMapCard(arrayElement));
    map.insertBefore(fragmentMapCard, filter);
  });

  return pinButton;
};

// Function for rendering card of ad
var renderMapCard = function (arrayElement) {
  var mapCard = mapCardTemplate.cloneNode(true);

  mapCard.querySelector('h3').textContent = arrayElement.offer.title;
  mapCard.querySelector('p small').textContent = arrayElement.offer.address;
  mapCard.querySelector('.popup__price').textContent = arrayElement.offer.price + '₽/ночь';

  // Checks type of house
  var TYPES_OF_HOUSES = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом'
  };

  mapCard.querySelector('h4').textContent = TYPES_OF_HOUSES[arrayElement.offer.type];

  mapCard.querySelector('.popup__rooms-guests').textContent = arrayElement.offer.rooms + ' для ' + arrayElement.offer.guests + ' гостей';
  mapCard.querySelector('.popup__checkin-checkout').textContent = 'Заезд после ' + arrayElement.offer.checkin + ', выезд до ' + arrayElement.offer.checkout;

  for (var l = 0; l < arrayElement.offer.features.length; l++) {
    var featuresList = mapCard.querySelector('.popup__features');
    var featureElement = document.createElement('li');
    featuresList.appendChild(featureElement);
    featureElement.classList.add('feature--' + arrayElement.offer.features[l]);
  }

  mapCard.querySelector('.popup__description').textContent = arrayElement.offer.description;
  mapCard.querySelector('.popup__avatar').src = arrayElement.author.avatar;

  var popupClose = mapCard.querySelector('.popup__close');

  popupClose.addEventListener('click', function () {
    clearCard();
  });

  return mapCard;
};

// Creating array with advertisement datas
var ads = [];

for (var i = 0; i < 8; ++i) {
  var locationObject = {
    'x': getRandomNumber(300, 900),
    'y': getRandomNumber(100, 500),
  };

  ads[ads.length] = {
    'author': {
      'avatar': 'img/avatars/user' + 0 + (i + 1) + '.png',
    },

    'offer': {
      'title': getRandomArrayWord(HOUSES),
      'address': locationObject.x + ', ' + locationObject.y,
      'price': getRandomNumber(1000, 1000000),
      'type': getRandomArrayWord(HOUSE_TYPES),
      'rooms': getRandomNumber(1, 5),
      'guests': getRandomNumber(1, 100),
      'checkin': getRandomArrayWord(TIMES),
      'checkout': getRandomArrayWord(TIMES),
      'features': getRandomFeatures(),
      'description': '',
      'photos': [],
    },

    'location': locationObject
  };
}

// Creates fragment with pins
var fragment = document.createDocumentFragment();
for (var j = 0; j < ads.length; j++) {
  fragment.appendChild(renderPin(ads[j]));
}

setupListElement.appendChild(fragment); // inserts pins in markup


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
  map.classList.remove('map--faded'); // shows map with ads
  noticeForm.classList.remove('notice__form--disabled'); // shows form
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

// Changes first selected option
// when second selected option is changed -
// and vice versa
var arrivalTime = noticeForm.querySelector('#timein');
var leavingTime = noticeForm.querySelector('#timeout');

var fieldChange = function (selectOne, selectTwo) {
  selectOne.addEventListener('change', function () {
    selectTwo.selectedIndex = selectOne.selectedIndex;
  });

  selectTwo.addEventListener('change', function () {
    selectOne.selectedIndex = selectTwo.selectedIndex;
  });
};

fieldChange(arrivalTime, leavingTime);

// Changes price per night depending on the type of accomodation
// and sets min and max valid price for each type
var inputs = noticeForm.querySelectorAll('input[type=text]');
var accomodationType = noticeForm.querySelector('#type');
var accomodationPrice = noticeForm.querySelector('#price');
var accomodationAddress = noticeForm.querySelector('#address');
var accomodationPrices = {
  'bungalo': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000
};

accomodationType.addEventListener('change', function () {
  accomodationPrice.value = accomodationPrices[accomodationType.value];
});

// Sets available options in select with number of guests
var roomNumber = noticeForm.querySelector('#room_number');
var capacity = noticeForm.querySelector('#capacity');

var onRoomChange = function () {
  for (var p = 0; p < roomNumber.length; p++) {
    capacity.options[p].disabled = false;
  }

  if (roomNumber.options[0].selected) {
    capacity.options[0].disabled = true;
    capacity.options[1].disabled = true;
    capacity.options[3].disabled = true;
  } else if (roomNumber.options[1].selected) {
    capacity.options[0].disabled = true;
    capacity.options[3].disabled = true;
  } else if (roomNumber.options[2].selected) {
    capacity.options[3].disabled = true;
  } else if (roomNumber.options[3].selected) {
    capacity.options[0].disabled = true;
    capacity.options[1].disabled = true;
    capacity.options[2].disabled = true;
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

// Makes field available for reading only
accomodationAddress.style.pointerEvents = 'none';

// Checks value in the price field
// makes its border red if value is too big or too small
accomodationPrice.addEventListener('change', function () {
  getMinMaxValue();

  if (accomodationPrice.validity.rangeUnderflow || accomodationPrice.validity.rangeOverflow) {
    accomodationPrice.style.borderColor = '#ff0000';
  } else {
    accomodationPrice.style.borderColor = '#d9d9d3';
  }
});

// Checks if all text inputs are filled
var validity = function (evt) {
  for (var x = 0; x < inputs.length; x++) {
    if (!inputs[x].value) {
      inputs[x].style.borderColor = '#ff0000';
      evt.preventDefault();
    }
  }

  for (var y = 0; y < inputs.length; y++) {
    if (!inputs[y].valid) {
      inputs[y].style.borderColor = '#ff0000';
      evt.preventDefault();
    }
  }

  getMinMaxValue();

  if (accomodationPrice.validity.rangeUnderflow || accomodationPrice.validity.rangeOverflow) {
    accomodationPrice.style.borderColor = '#ff0000';
    evt.preventDefault();
  } else {
    accomodationPrice.style.borderColor = '#d9d9d3';
  }
};

validity();

noticeForm.addEventListener('submit', validity);
