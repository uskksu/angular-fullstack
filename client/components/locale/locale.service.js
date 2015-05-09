'use strict';

angular.module('angularFullstackApp')

  .constant('LOCALES', [
    {
      name: 'ja_JP',
      display: '日本語'
    }, {
      name: 'en_US',
      display: 'English'
    }
  ])

  .factory('Locale', function ($translate, $log, tmhDynamicLocale, LOCALES) {

    if (!LOCALES || LOCALES.length === 0) {
      $log.error('There are no _LOCALES provided');
    }

    var getLocaleByName = function (localeName) {
      var result;
      angular.forEach(LOCALES, function (locale) {
        if (locale.name === localeName) {
          result = locale;
        }
      });
      return result;
    };

    var setLocaleByName = function (localeName) {
      if (angular.isUndefined(getLocaleByName(localeName))) {
        $log.error('Locale name "' + localeName + '" is invalid');
        return;
      }
      document.documentElement.setAttribute('lang', localeName);
      $translate.use(localeName);
      tmhDynamicLocale.set(localeName.toLowerCase().replace(/_/g, '-'));
    };

    return {
      getLocales: function () {
        return LOCALES;
      },
      getCurrentLocale: function () {
        return getLocaleByName($translate.use());
      },
      setLocaleByName: setLocaleByName
    };

  })

  .run(function ($rootScope, Locale, Scopes) {
    Scopes.once($rootScope, '$translateChangeSuccess', function (event, data) {
      Locale.setLocaleByName(data.language);
    });
  });
