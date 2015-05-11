'use strict';

angular.module('angularFullstackApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'pascalprecht.translate',
  'tmh.dynamicLocale',
  'ngLodash'
])

  .constant('LOCALES', [
    {
      name: 'ja_JP',
      display: '日本語',
      preferred: true
    }, {
      name: 'en_US',
      display: 'English'
    }
  ])

  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  })

  .config(function ($translateProvider, LOCALES) {

    var preferredLocale = LOCALES[0];
    angular.forEach(LOCALES, function (locale) {
      if (locale.preferred === true) {
        preferredLocale = locale;
      }
    });

    $translateProvider
      .useStaticFilesLoader({
        prefix: 'assets/i18n/locale-',
        suffix: '.json'
      })
      .preferredLanguage(preferredLocale.name)
      .useLocalStorage()
      .useMissingTranslationHandlerLog()
      .useSanitizeValueStrategy('escaped');
  })

  .config(function (tmhDynamicLocaleProvider) {
    tmhDynamicLocaleProvider
      .localeLocationPattern('bower_components/angular-i18n/angular-locale_{{locale}}.js');
  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .run(function ($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  });
