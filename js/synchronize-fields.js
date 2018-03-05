'use strict';

window.synchronizeFields = function (fieldOne, fieldTwo, arrayOne, arrayTwo, synchronize) {
  fieldOne.addEventListener('change', function () {
    var option = fieldOne.value;
    var elemIndex = arrayOne.indexOf(option);
    synchronize(fieldTwo, arrayTwo[elemIndex]);
  });
};
