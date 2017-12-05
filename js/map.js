'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

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
  var pinButton = document.querySelectorAll('.map__pin');

  for (var h = 0; h <= ads.length; h++) {
    pinButton[h].classList.remove('map__pin--active');
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
  var typeOfHouse = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом'
  };

  mapCard.querySelector('h4').textContent = typeOfHouse[arrayElement.offer.type];

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

  popupClose.addEventListener('keydown', function () {
    if (event.keyCode === ENTER_KEYCODE) {
      clearCard();
    }
  });

  return mapCard;
};

// Creating array with advertisement datas
var ads = [];

for (var i = 1; i <= 8; ++i) {
  var locationObject = {
    'x': getRandomNumber(300, 900),
    'y': getRandomNumber(100, 500),
  };

  ads[ads.length] = {
    'author': {
      'avatar': 'img/avatars/user' + 0 + i + '.png',
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
