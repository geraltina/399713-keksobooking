'use strict';

(function () {
  var SERVER_URL = 'https://js.dump.academy/keksobooking';
  var SUCCESS_CODE = 200;
  var BAD_REQUEST = 400;
  var UNAUTHORIZED = 401;
  var NOT_FOUND = 404;
  var TIMEOUT = 408;

  var setup = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case SUCCESS_CODE:
          onLoad(xhr.response);
          break;

        case BAD_REQUEST:
          error = 'Неверный запрос';
          break;
        case UNAUTHORIZED:
          error = 'Пользователь не авторизован';
          break;
        case NOT_FOUND:
          error = 'Ничего не найдено';
          break;
        case TIMEOUT:
          error = 'Запрос не успел выполниться за ' + xhr.timeout + ' мс';
          break;

        default:
          error = 'Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 20000; // 20s

    return xhr;
  };

  window.backend = {
    save: function (data, onLoad, onError) {
      var xhr = setup(onLoad, onError);

      xhr.open('POST', SERVER_URL);
      xhr.send(data);
    },
    load: function (onLoad, onError) {
      var xhr = setup(onLoad, onError);

      xhr.open('GET', SERVER_URL + '/data');
      xhr.send();
    }
  };
})();
