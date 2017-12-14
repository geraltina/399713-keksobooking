'use strict';

// Functions for getting random values
window.random = (function () {
  return {
    getRandomArrayIndex: function (array) { // random index
      return Math.floor(Math.random() * array.length);
    },
    getRandomArrayWord: function (array) { // random word from array
      return array[this.getRandomArrayIndex(array)];
    },
    getRandomNumber: function (min, max) { // random number from min to max
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getElementsNumber: function (arrayLength) { // random sum of elements from some array
      return this.getRandomNumber(0, arrayLength);
    },
    getRandomFeatures: function () { // random features from PLACE_FEATURES array
      var placeFeaturesLength = window.general.PLACE_FEATURES.length;
      var randomNumber = window.random.getElementsNumber(placeFeaturesLength);
      var features = [];
      while (features.length < randomNumber) {
        var randomElement = window.random.getRandomArrayWord(window.general.PLACE_FEATURES);
        if (features.includes(randomElement) === false) {
          features.push(randomElement);
        }
      }
      return features;
    }
  };
})();
