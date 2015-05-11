'use strict';

angular.module('angularFullstackApp')
  .directive('localeSelect', function (Locale) {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'components/locale/locale-select.html',

      controller: function ($scope) {

        Locale.getCurrentLocale().then(function (currentLocale) {
          $scope.locale = currentLocale;
        });

        Locale.getLocales().then(function (locales) {
          $scope.locales = locales;
          $scope.visible = locales.length > 1;
        });

        $scope.changeLocale = function (localeName) {
          Locale.setLocaleByName(localeName);
        };
      }
    };
  });
