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
var popupClose = document.querySelector('.popup__close');

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

var placeFeaturesLength = PLACE_FEATURES.length;
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
  pinButton.addEventListener('click', function (evt) {

    pinButton = evt.target.parentElement;
    pinButton.classList.add('map__pin--active');

    fragmentMapCard.appendChild(renderMapCard(arrayElement));
    map.insertBefore(fragmentMapCard, filter);
  });

  pinButton.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      pinButton = evt.target.parentElement;
      pinButton.classList.add('map__pin--active');

      fragmentMapCard.appendChild(renderMapCard(arrayElement));
      map.insertBefore(fragmentMapCard, filter);
    }
  });

  return pinButton;
};

var renderMapCard = function (arrayElement) {
  var mapCard = mapCardTemplate.cloneNode(true);

  mapCard.querySelector('h3').textContent = arrayElement.offer.title;
  mapCard.querySelector('p small').textContent = arrayElement.offer.address;
  mapCard.querySelector('.popup__price').textContent = arrayElement.offer.price + '₽/ночь';

  if (arrayElement.offer.type === 'flat') { // if/else for ads.offer.type
    mapCard.querySelector('h4').textContent = 'Квартира';
  } else if (arrayElement.offer.type === 'bungalo') {
    mapCard.querySelector('h4').textContent = 'Бунгало';
  } else {
    mapCard.querySelector('h4').textContent = 'Дом';
  }

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

  var removeCard = function () {
    mapCards = document.querySelectorAll('.map__card');
    var pinButton = document.querySelectorAll('.map__pin');

    for (var h = 0; h <= ads.length; h++) {
      pinButton[h].classList.remove('map__pin--active');
    }

    for (var m = 0; m < mapCards.length; m++) {
      map.removeChild(mapCards[m]);
    }
  };

  var closePopup = function () {
    document.addEventListener('keydown', function (event) {
      if (event.keyCode === ESC_KEYCODE) {
        removeCard();
      }
    });

    popupClose.addEventListener('click', function () {
      mapCards = document.querySelectorAll('.map__card');
      var pinButton = document.querySelectorAll('.map__pin');
      for (var n = 0; n < mapCards.length; n++) {
        pinButton[n].classList.remove('map__pin--active');
        map.removeChild(mapCards[n]);
      }
    });

    popupClose.addEventListener('keydown', function () {
      if (event.keyCode === ENTER_KEYCODE) {
        mapCards = document.querySelectorAll('.map__card');
        var pinButton = document.querySelectorAll('.map__pin');
        for (var n = 0; n < mapCards.length; n++) {
          pinButton[n].classList.remove('map__pin--active');
          map.removeChild(mapCards[n]);
        }
      }
    });
  };

  var pinButton = document.querySelectorAll('.map__pin');
  for (var q = 0; q < arrayElement; q++) {
    pinButton[q].addEventListener('click', function () {
      removeCard();
      closePopup();
    });

    pinButton[q].addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        removeCard();
        closePopup();
      }
    });
  }

  return mapCard;
};

// Fragment with pins
var fragment = document.createDocumentFragment();
for (var j = 0; j < ads.length; j++) {
  fragment.appendChild(renderPin(ads[j]));
}

setupListElement.appendChild(fragment); // inserts pins in markup

// Creating interactive part of page
// Searching big red pin and all fieldsets of form
// and making them disabled
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
