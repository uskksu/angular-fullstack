'use strict';

angular.module('angularFullstackApp')
  .directive('localeSelect', function (locale) {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'components/locale/locale-select.html',
      controller: function ($scope) {

        $scope.locale  = locale.getCurrentLocale();
        $scope.locales = locale.getLocales();
        $scope.visible = $scope.locales && $scope.locales.length > 1;

        $scope.changeLocale = function (localeName) {
          locale.setLocaleByName(localeName);
        };
      }
    };
  });
