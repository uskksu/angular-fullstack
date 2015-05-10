'use strict';

angular.module('angularFullstackApp')
  .directive('localeSelect', function (Locale) {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'components/locale/locale-select.html',

      controller: function ($scope) {

        $scope.locale  = Locale.getCurrentLocale();
        $scope.locales = Locale.getLocales();
        $scope.visible = $scope.locales && $scope.locales.length > 1;

        $scope.changeLocale = function (localeName) {
          Locale.setLocaleByName(localeName);
        };
      }
    };
  });
