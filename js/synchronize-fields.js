'use strict';

window.synchronizeFields = function (selectOne, selectTwo, arrayOne, arrayTwo, someFunction) {
  selectOne.addEventListener('change', function () {
    var option = selectOne.value;
    var elemIndex = arrayOne.indexOf(option);
    someFunction(selectTwo, arrayTwo[elemIndex]);
  });
};
