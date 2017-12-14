'use strict';

// Creating arrays with advertisement datas
window.data = (function () {
  return {
    HOUSES: [
      'Большая уютная квартира',
      'Маленькая неуютная квартира',
      'Огромный прекрасный дворец',
      'Маленький ужасный дворец',
      'Красивый гостевой домик',
      'Некрасивый негостеприимный домик',
      'Уютное бунгало далеко от моря',
      'Неуютное бунгало по колено в воде'
    ],

    HOUSE_TYPES: [
      'flat',
      'house',
      'bungalo'
    ],

    TIMES: [
      '12:00',
      '13:00',
      '14:00'
    ],

    PLACE_FEATURES: [
      'wifi',
      'dishwasher',
      'parking',
      'washer',
      'elevator',
      'conditioner'
    ],

    map: document.querySelector('.map'),

    ads: []
  };
})();
