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

  .factory('locale', function ($translate, $rootScope, $log, tmhDynamicLocale, LOCALES) {

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

    var currentLocaleName;
    var setLocaleByName = function (localeName) {
      if (angular.isUndefined(getLocaleByName(localeName))) {
        $log.error('Locale name "' + localeName + '" is invalid');
        return;
      }
      currentLocaleName = localeName;
      document.documentElement.setAttribute('lang', currentLocaleName);
      $translate.use(currentLocaleName);
      tmhDynamicLocale.set(currentLocaleName.toLowerCase().replace(/_/g, '-'));
    };
    setLocaleByName($translate.use());

    //$rootScope.$on('$translateChangeSuccess', function (event, data) {
    //  document.documentElement.setAttribute('lang', data.language);
    //  tmhDynamicLocale.set(data.language.toLowerCase().replace(/_/g, '-'));
    //});

    return {
      getLocales: function () {
        return LOCALES;
      },
      getCurrentLocale: function () {
        return getLocaleByName(currentLocaleName);
      },
      setLocaleByName: setLocaleByName
    };

  });
