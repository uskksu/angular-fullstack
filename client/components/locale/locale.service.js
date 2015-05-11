'use strict';

angular.module('angularFullstackApp')

  .factory('Locale', function ($rootScope, $q, $translate, $log, tmhDynamicLocale, lodash, LOCALES, Scopes) {

    var deferred_getLocales = $q.defer();
    var deferred_getCurrentLocale = $q.defer();

    var initialize = function () {
      if (!LOCALES || LOCALES.length === 0) {
        $log.error('There are no _LOCALES provided');
      }
      Scopes.once($rootScope, '$translateChangeSuccess', function (event, data) {
        deferred_getLocales.resolve(LOCALES);
        deferred_getCurrentLocale.resolve(getLocaleByName(data.language));
        setLocaleByName(data.language);
      });
    };

    var getLocaleByName = function (localeName) {
      return lodash.find(LOCALES, function (locale) {
        return locale.name === localeName;
      });
    };

    var setLocaleByName = function (localeName) {
      if (angular.isUndefined(getLocaleByName(localeName))) {
        $log.error('Locale name "' + localeName + '" is invalid');
        return;
      }
      angular.element('html').attr('lang', localeName);
      $translate.use(localeName);
      tmhDynamicLocale.set(localeName.toLowerCase().replace(/_/g, '-'));
    };

    return {
      initialize: initialize,
      setLocaleByName: setLocaleByName,
      getLocales: function () {
        return deferred_getLocales.promise;
      },
      getCurrentLocale: function () {
        return deferred_getCurrentLocale.promise;
      }
    };

  })

  .run(function (Locale) {
    Locale.initialize();
  });
