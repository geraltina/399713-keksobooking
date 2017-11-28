'use strict';

/* Finding map, crating arrays with initial datas*/
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

/* Creating functions for getting random values*/
var getRandomArrayIndex = function (array) { // random index
  return Math.floor(Math.random() * array.length);
};

var getRandomArrayWord = function (array) { // random word from array
  return array[getRandomArrayIndex(array)];
};
var getRandomNumber = function (min, max) { // random number from min to max
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var placeFeaturesLength = placeFeatures.length;
var getElementsNumber = function () { // random sum of elements from placeFeatures array
  return getRandomNumber(0, placeFeaturesLength);
};

var getRandomFeatures = function () { // random features for ads.offer.features from placeFeatures array
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

/* Creating array with advertisement datas*/
var ads = [];
for (var i = 1; i <= 8; ++i) {
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

map.classList.remove('map--faded'); // shows map with ads

/* Function for rendering pins with certain attributes on map*/
var mapPin = document.querySelector('.map__pin');
mapPin.classList.remove('map__pin--main');
var setupListElement = document.querySelector('.map__pins');
var renderPin = function (arrayElement) {
  var pinElement = mapPin.cloneNode(true);

  pinElement.querySelector('img').src = arrayElement.author.avatar;
  pinElement.querySelector('img').width = 40;
  pinElement.querySelector('img').height = 40;
  pinElement.querySelector('img').draggable = false;
  pinElement.style = 'left: ' + (arrayElement.location.x - 20) + 'px; top: ' + (arrayElement.location.y - 40) + 'px;';

  return pinElement;
};

/* Fragment with pins*/
var fragment = document.createDocumentFragment();
for (var y = 0; y < ads.length; y++) {
  fragment.appendChild(renderPin(ads[y]));
}

setupListElement.appendChild(fragment); // inserts pins in markup

var mapCardTemplate = document.querySelector('template article.map__card');
var renderMapCard = function (arrayElement) {
  var mapCard = mapCardTemplate.cloneNode(true);

  mapCard.querySelector('h3').textContent = arrayElement.offer.title;
  mapCard.querySelector('p small').textContent = arrayElement.offer.address;
  mapCard.querySelector('.popup__price').textContent = arrayElement.offer.price + '&#x20bd;/ночь'

  if (arrayElement.offer.type === 'flat') { // if/else for ads.offer.type
    mapCard.querySelector('h4').textContent = 'Квартира';
  } else if (arrayElement.offer.type === 'bungalo') {
    mapCard.querySelector('h4').textContent = 'Бунгало';
  } else {
    mapCard.querySelector('h4').textContent = 'Дом';
  }

  mapCard.querySelector('.popup__rooms-guests').textContent = '{{offer.rooms}} для {{offer.guests}} гостей';
  mapCard.querySelector('.popup__checkin-checkout').textContent = 'Заезд после {{offer.checkin}}, выезд до {{offer.checkout}}';

  for (var l = 0; l < ads.offer.feature.length; l++) {
    mapCard.querySelector('.popup__features').innerHTML = '<li class="feature feature--' + ads.offer.feature[l] + '">' + ads.offer.feature[l] + '</li>';
  }

  mapCard.querySelector('.popup__description').textContent = arrayElement.offer.description;
  mapCard.querySelector('.popup__avatar').src = arrayElement.author.avatar;

  return mapCard;
};

var fragmentMapCard = document.createDocumentFragment();
for (var z = 0; z < ads.length; z++) {
  fragmentMapCard.appendChild(renderMapCard(ads[z]));
}

var filter = map.querySelector('.map__filters-container');
map.insertBefore(fragmentMapCard, filter);
