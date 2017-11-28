'use strict';

var map = document.querySelector('.map');
var mapPin = document.querySelector('.map__pin');
var houses = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var houseTypes = [
  'flat',
  'house',
  'bungalo'
];
var times = [
  '12:00',
  '13:00',
  '14:00'
];
var placeFeatures = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var getRandomArrayIndex = function (array) {
  return Math.floor(Math.random() * array.length);
};

var getRandomArrayWord = function (array) {
  return array[getRandomArrayIndex(array)];
};
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var ads = [];
var placeFeaturesLength = placeFeatures.length;
var getElementsNumber = function () {
  return getRandomNumber(0, placeFeaturesLength);
};

var getRandomFeatures = function () {
  var randomNumber = getElementsNumber();
  var features = [];
  while (features.length < randomNumber) {
    var randomElement = getRandomArrayWord(placeFeatures);
    if (features.includes(randomElement) === false) {
      features.push(randomElement);
    }
  }
  return features;
};

for (var i = 0; i <= 8; ++i) {
  ads[ads.length] = {
    'author': {
      'avatar': 'img/avatars/user' + 0 + i + '.png',
    },

    'offer': {
      'title': getRandomArrayWord(houses),
      'address': '{{location.x}}, {{location.y}}',
      'price': getRandomNumber(1000, 1000000),
      'type': getRandomArrayWord(houseTypes),
      'rooms': getRandomNumber(1, 5),
      'guests': getRandomNumber(1, 100),
      'checkin': getRandomArrayWord(times),
      'checkout': getRandomArrayWord(times),
      'features': getRandomFeatures(),
      'description': '',
      'photos': [],
    },

    'location': {
      'x': getRandomNumber(300, 900),
      'y': getRandomNumber(100, 500),
    }
  };
}

map.classList.remove('map--faded');

var setupListElement = document.querySelector('.map__pins');
var renderPin = function (arrayElement) {
  var pinElement = mapPin.cloneNode(true);

  pinElement.querySelector('img').src = arrayElement.author.avatar;
  pinElement.querySelector('img').width = 40;
  pinElement.querySelector('img').height = 40;
  pinElement.querySelector('img').draggable = false;
  pinElement.querySelector('img').style = 'left: ' + (arrayElement.location.x - 20) + 'px; top: ' + (arrayElement.location.y - 40) + 'px;';

  return pinElement;
};

var fragment = document.createDocumentFragment();
for (var y = 0; y < ads.length; y++) {
  fragment.appendChild(renderPin(ads[y]));
}

setupListElement.appendChild(fragment);
