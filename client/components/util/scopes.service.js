'use strict';

/**
 * スコープに関するユーティリティ
 */
angular.module('angularFullstackApp')
  .service('Scopes', function () {

    return {

      /**
       * 指定されたイベントに一度だけ実行するリスナを登録してします。
       *
       * @param scope    スコープ
       * @param name     イベント名
       * @param listener イベントリスナ
       */
      once: function (scope, name, listener) {
        var off = scope.$on(name, function () {
          try {
            listener.apply(null, arguments);

          } finally {
            off();
          }
        });
      }

    }

  });
