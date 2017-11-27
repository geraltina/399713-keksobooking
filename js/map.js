'use strict';

var map = document.querySelector('.map');
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

var getRandomArrayWord = function (array) {
  return array[getRandomArrayIndex(array)];
};
var getRandomArrayIndex = function (array) {
  return Math.floor(Math.random() * array.length);
};
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var ads = [];
var placeFeaturesLength = placeFeatures.length;
var elementsNumber = getRandomNumber(0, placeFeaturesLength - 1);
for (var j = 0; j < placeFeaturesLength; j++) {
  while (ads.offer.features.length < elementsNumber) {
    ads.offer.features[j] = placeFeatures[j];
  }
}

for (var i = 0; i <= 8; ++i) {
  ads[ads.length] = {
    'author': {
      'avatar': 'img/avatars/user{{' + 0 + i + '}}.png'
    },

    'offer': {
      'title': getRandomArrayWord(houses),
      'address': '{{location.x}}, {{location.y}}',
      'price': getRandomNumber(1000, 1000000),
      'type': getRandomArrayWord(houseTypes),
      'rooms': getRandomNumber(1, 5),
      'guests': getRandomNumber(1, Infinity),
      'checkin': getRandomArrayWord(times),
      'checkout': getRandomArrayWord(times),
      'features': [],
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
