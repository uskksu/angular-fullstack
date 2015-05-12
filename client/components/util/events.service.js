'use strict';

/**
 * イベントに関するユーティリティ
 */
angular.module('angularFullstackApp')
  .service('Events', function () {

    return {

      /**
       * 指定されたイベントを停止します。
       *
       * @param event イベント
       * @returns {boolean} false
       */
      stop: function (event) {
        event.preventDefault();
        event.stopPropagation();
        return false;
      }

    }

  });
