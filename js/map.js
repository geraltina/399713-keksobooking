'use strict';

window.map = (function () {
  for (var i = 0; i < 8; ++i) {
    var locationObject = {
      'x': window.random.getRandomNumber(300, 900),
      'y': window.random.getRandomNumber(100, 500),
    };

    window.data.ads[window.data.ads.length] = {
      'author': {
        'avatar': 'img/avatars/user' + 0 + (i + 1) + '.png',
      },

      'offer': {
        'title': window.random.getRandomArrayWord(window.data.HOUSES),
        'address': locationObject.x + ', ' + locationObject.y,
        'price': window.random.getRandomNumber(1000, 1000000),
        'type': window.random.getRandomArrayWord(window.data.HOUSE_TYPES),
        'rooms': window.random.getRandomNumber(1, 5),
        'guests': window.random.getRandomNumber(1, 100),
        'checkin': window.random.getRandomArrayWord(window.data.TIMES),
        'checkout': window.random.getRandomArrayWord(window.data.TIMES),
        'features': window.random.getRandomFeatures(),
        'description': '',
        'photos': [],
      },

      'location': locationObject
    };
  }
})();
