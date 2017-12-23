'use strict';

window.synchronizeFields = function (selectOne, selectTwo, arrayOne, arrayTwo, synchronization) {
  selectOne.addEventListener('change', function () {
    var option = selectOne.value;
    var elemIndex = arrayOne.indexOf(option);
    synchronization(selectTwo, arrayTwo[elemIndex]);
  });
};
